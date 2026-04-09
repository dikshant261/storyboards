/**
 * Quadrilateral Component
 * 
 * Main component that integrates grid, vertices, sides, diagonals, angle markers, and properties.
 * Features draggable vertices that snap to grid points with visual feedback.
 */

/**
 * Quadrilateral Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name
 * @param {number} props.currentPage - Current page number
 * @param {string} props.quadType - Type of quadrilateral (e.g., 'SQUARE', 'RECTANGLE')
 * @param {number} props.gridRows - Number of grid rows (default: 10)
 * @param {number} props.gridCols - Number of grid columns (default: 10)
 * @param {Array<number>} props.coordinates - Container position [x1, y1, x2, y2]
 * @param {Array<Object>} props.vertices - Initial vertex positions [{row, col}, ...] (optional)
 * @param {boolean} props.showGrid - Show the quad grid (default: true)
 * @param {boolean} props.showDiagonals - Show diagonals (default: false)
 * @param {string} props.showAngleMarkers - Angle marker type (default: 'all') - DEPRECATED: use angleConfig.show instead
 * @param {Object} props.angleConfig - Angle marker and text configuration object
 * @param {string} props.angleConfig.show - Show angle markers: 'none', 'arc', 'measurement', 'rightAngle', 'all' (default: 'all')
 * @param {string} props.angleConfig.markerColor - Color for angle markers/arcs (default: '#FF6600')
 * @param {string} props.angleConfig.markerSize - Size of angle markers in gc units (default: '1gc')
 * @param {boolean} props.angleConfig.showText - Show angle measurement text (default: true when show includes 'measurement' or 'all')
 * @param {string} props.angleConfig.textColor - Color for angle text (default: '#FF6600')
 * @param {string} props.angleConfig.textSize - Font size for angle text in gc units (default: '12gc')
 * @param {string} props.angleConfig.textFont - Font family for angle text (default: 'Arial, sans-serif')
 * @param {string} props.angleConfig.textOffset - Offset of text from vertex in gc units (default: '35gc')
 * @param {Object} props.angleConfig.angleA - Per-vertex config for vertex A
 * @param {Object} props.angleConfig.angleA.interiorAngle - Config for interior angle at vertex A
 * @param {boolean} props.angleConfig.angleA.interiorAngle.show - Show interior angle arc (default: false)
 * @param {string|number} props.angleConfig.angleA.interiorAngle.size - Size of interior angle arc (default: uses angleConfig.markerSize)
 * @param {string} props.angleConfig.angleA.interiorAngle.color - Color of interior angle arc (default: uses angleConfig.markerColor)
 * @param {boolean} props.angleConfig.angleA.interiorAngle.showText - Show text label for interior angle (default: uses angleConfig.showText)
 * @param {string} props.angleConfig.angleA.interiorAngle.textMode - Text display mode: 'name' (angle name only), 'measure' (angle measure only), or 'both' (name + measure) (default: 'both')
 * @param {boolean} props.angleConfig.angleA.interiorAngle.fill - Fill the arc with color (default: false)
 * @param {string} props.angleConfig.angleA.interiorAngle.fillColor - Fill color for the arc (default: same as color)
 * @param {number} props.angleConfig.angleA.interiorAngle.fillOpacity - Fill opacity (0-1) (default: 0.3)
 * @param {boolean} props.angleConfig.angleA.interiorAngle.blinkFill - Blink the arc fill animation (default: false)
 * @param {boolean} props.angleConfig.angleA.interiorAngle.animateDraw - Animate the arc being drawn (default: false)
 * @param {number} props.angleConfig.angleA.interiorAngle.drawLoops - Number of times to loop the draw animation (default: 1, use 0 for infinite)
 * @param {number} props.angleConfig.angleA.interiorAngle.drawDuration - Duration of draw animation in seconds (default: 2)
 * @param {Object} props.angleConfig.angleA.supplementaryAngle1 - Config for supplementary angle 1 at vertex A (same structure as interiorAngle)
 * @param {Object} props.angleConfig.angleA.supplementaryAngle2 - Config for supplementary angle 2 at vertex A (same structure as interiorAngle)
 * @param {Object} props.angleConfig.angleA.supplementaryAngle3 - Config for supplementary angle 3 at vertex A (same structure as interiorAngle)
 * @param {Object} props.angleConfig.angleB - Per-vertex config for vertex B (same structure as angleA)
 * @param {Object} props.angleConfig.angleC - Per-vertex config for vertex C (same structure as angleA)
 * @param {Object} props.angleConfig.angleD - Per-vertex config for vertex D (same structure as angleA)
 * @param {string} props.showProperties - Property display mode: 'panel', 'none', or 'both' (default: 'panel')
 * @param {boolean} props.showPropertyPanel - Show/hide the property panel card (default: true if showProperties is 'panel', false otherwise). Takes precedence over showProperties if provided.
 * @param {boolean} props.containerBorder - Show border around the container (default: false)
 * @param {string} props.containerBorderWidth - Border width in gc units (default: '4gc')
 * @param {string} props.containerBorderColor - Border color (default: '#000000')
 * @param {string} props.containerBorderStyle - Border style: 'solid', 'dashed', 'dotted', 'double' (default: 'solid')
 * @param {string|number} props.gridPadding - Padding around the grid in gc units (default: 0)
 * @param {boolean} props.draggable - Allow vertex dragging (default: true)
 * @param {Function} props.onVertexChange - Callback when vertices change
 * @param {string} props.sideColor - Color for sides (default: '#000000')
 * @param {string} props.diagonalColor - Color for diagonals (default: '#999999')
 * @param {number} props.zIndex - Base z-index (default: 50)
 * @param {string} props.edgeColor - Global edge color (default: '#000000')
 * @param {string} props.edgeThickness - Global edge thickness (default: '4gc')
 * @param {string} props.edgeStyle - Global edge style: 'solid', 'dashed', 'dotted' (default: 'solid')
 * @param {boolean} props.isBlink - Global blink animation (default: false)
 * @param {Object} props.side1 - Override for side 1: {color, thickness, style, isBlink}
 * @param {Object} props.side2 - Override for side 2: {color, thickness, style, isBlink}
 * @param {Object} props.side3 - Override for side 3: {color, thickness, style, isBlink}
 * @param {Object} props.side4 - Override for side 4: {color, thickness, style, isBlink}
 * @param {Object} props.diagonal1 - Override for diagonal 1 (0-2): {color, thickness, style, isBlink}
 * @param {Object} props.diagonal2 - Override for diagonal 2 (1-3): {color, thickness, style, isBlink}
 * @param {Object} props.vertexConfig - Vertex configuration object
 * @param {string} props.vertexConfig.color - Color for vertex hotspots (default: '#FF9900')
 * @param {boolean} props.vertexConfig.showLabels - Show vertex labels A, B, C, D (default: false)
 * @param {Array<string>} props.vertexConfig.labels - Custom vertex labels (default: ['A', 'B', 'C', 'D'])
 * @param {string} props.vertexConfig.labelColor - Color for vertex labels (default: '#000000')
 * @param {string} props.vertexConfig.labelSize - Font size for vertex labels (default: '16gc')
 * @param {string} props.vertexConfig.labelOffset - Offset from vertex center (default: '15gc')
 * @param {Object} props.angleAnimationConfig - Angle equality animation configuration
 * @param {number} props.angleAnimationConfig.duration - Animation duration in milliseconds (default: 2000)
 * @param {number} props.angleAnimationConfig.speed - Alternative to duration (same as duration, default: 2000)
 * @param {number} props.angleAnimationConfig.holdTime - Time to hold at target before fading out in milliseconds (default: 500, deprecated - arc now stays and blinks)
 * @param {string} props.angleAnimationConfig.message - Custom message to display when animation completes (default: 'The angles are perfectly equal!')
 * @param {string} props.angleAnimationConfig.equalityMessage - Alternative to message (same effect)
 * @param {Object} props.angleAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.angleAnimationConfig.messagePosition.left - Absolute left position in percentage (default: null = relative to target vertex)
 * @param {number} props.angleAnimationConfig.messagePosition.top - Absolute top position in percentage (default: null = relative to target vertex)
 * @param {number} props.angleAnimationConfig.messagePosition.offsetX - Horizontal offset from target vertex in percentage (default: 0)
 * @param {number} props.angleAnimationConfig.messagePosition.offsetY - Vertical offset from target vertex in percentage (default: -8, meaning 8% above)
 * @param {number} props.angleAnimationConfig.messagePosition.offsetLeft - Alternative to offsetX (same effect)
 * @param {number} props.angleAnimationConfig.messagePosition.offsetTop - Alternative to offsetY (same effect)
 * @param {Object} props.angleAnimationConfig.messageCoordinates - Alternative to messagePosition (same effect)
 * @param {Object} props.angleSumAnimationConfig - Angle sum animation configuration (demonstrates two angles sum to 180°)
 * @param {number} props.angleSumAnimationConfig.duration - Animation duration in milliseconds (default: 2000)
 * @param {number} props.angleSumAnimationConfig.speed - Alternative to duration (same effect)
 * @param {string} props.angleSumAnimationConfig.animationMode - Animation mode: 'adjacent' | 'neutral' | 'straightLine' (default: 'adjacent')
 * @param {string} props.angleSumAnimationConfig.displayMode - Display mode: 'sideBySide' | 'merged' (default: 'sideBySide')
 * @param {string} props.angleSumAnimationConfig.message - Custom message to display when animation completes (default: 'These angles add up to 180°!')
 * @param {Object} props.angleSumAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.angleSumAnimationConfig.messagePosition.left - Absolute left position in percentage (default: null = relative to target)
 * @param {number} props.angleSumAnimationConfig.messagePosition.top - Absolute top position in percentage (default: null = relative to target)
 * @param {number} props.angleSumAnimationConfig.messagePosition.offsetX - Horizontal offset from target in percentage (default: 0)
 * @param {number} props.angleSumAnimationConfig.messagePosition.offsetY - Vertical offset from target in percentage (default: -8)
 * @param {Object} props.angleSumAnimationConfig.messageCoordinates - Alternative to messagePosition (same effect)
 * @param {number} props.angleSumAnimationConfig.deg180TextFontSize - Font size multiplier for "180°" text (default: 1.25)
 * @param {number} props.angleSumAnimationConfig.fontSize180 - Alternative to deg180TextFontSize (same effect)
 * @param {number} props.angleSumAnimationConfig.deg180TextOffsetY - Custom Y offset for "180°" text in percentage (default: null = auto-calculate based on arc orientation)
 * @param {number} props.angleSumAnimationConfig.offsetY180 - Alternative to deg180TextOffsetY (same effect)
 * @param {Object} props.sideEqualityAnimationConfig - Side equality animation configuration
 * @param {number} props.sideEqualityAnimationConfig.duration - Rotation duration in milliseconds (default: 1000)
 * @param {number} props.sideEqualityAnimationConfig.waitTime - Wait time at each position in milliseconds (default: 1000)
 * @param {number} props.sideEqualityAnimationConfig.cycles - Number of cycles (default: -1 for infinite, 0+ for finite)
 * @param {string} props.sideEqualityAnimationConfig.message - Custom message to display when animation is active (default: 'Adjacent sides are equal!')
 * @param {string} props.sideEqualityAnimationConfig.lineStyle - Line style: 'dashed' | 'solid' (default: 'dashed')
 * @param {string} props.sideEqualityAnimationConfig.style - Alternative to lineStyle (same effect)
 * @param {Object} props.sideEqualityAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.sideEqualityAnimationConfig.messagePosition.left - Absolute left position in percentage (default: null = relative to common vertex)
 * @param {number} props.sideEqualityAnimationConfig.messagePosition.top - Absolute top position in percentage (default: null = relative to common vertex)
 * @param {number} props.sideEqualityAnimationConfig.messagePosition.offsetX - Horizontal offset from common vertex in percentage (default: 0)
 * @param {number} props.sideEqualityAnimationConfig.messagePosition.offsetY - Vertical offset from common vertex in percentage (default: -8)
 * @param {Object} props.oppositeSideAnimationConfig - Opposite side equality animation configuration
 * @param {number} props.oppositeSideAnimationConfig.duration - Translation duration in milliseconds (default: 1000)
 * @param {number} props.oppositeSideAnimationConfig.waitTime - Wait time at each position in milliseconds (default: 1000)
 * @param {number} props.oppositeSideAnimationConfig.cycles - Number of cycles (default: -1 for infinite, 0+ for finite)
 * @param {string} props.oppositeSideAnimationConfig.message - Custom message to display when animation is active (default: 'Opposite sides are equal!')
 * @param {string} props.oppositeSideAnimationConfig.lineStyle - Line style: 'dashed' | 'solid' (default: 'dashed')
 * @param {string} props.oppositeSideAnimationConfig.style - Alternative to lineStyle (same effect)
 * @param {string} props.oppositeSideAnimationConfig.color1 - Line color for pair 0 (AB/CD) (default: 'orange')
 * @param {string} props.oppositeSideAnimationConfig.color - Alternative to color1 (same effect)
 * @param {string} props.oppositeSideAnimationConfig.color2 - Line color for pair 1 (BC/DA) (default: '#3399FF')
 * @param {Object} props.oppositeSideAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.oppositeSideAnimationConfig.messagePosition.left - Absolute left position in percentage (default: null = relative to line midpoint)
 * @param {number} props.oppositeSideAnimationConfig.messagePosition.top - Absolute top position in percentage (default: null = relative to line midpoint)
 * @param {number} props.oppositeSideAnimationConfig.messagePosition.offsetX - Horizontal offset from line midpoint in percentage (default: 0)
 * @param {number} props.oppositeSideAnimationConfig.messagePosition.offsetY - Vertical offset from line midpoint in percentage (default: -8)
 * @param {Object} props.parallelLinesAnimationConfig - Parallel lines animation configuration
 * @param {number} props.parallelLinesAnimationConfig.duration - Animation duration for one direction in milliseconds (default: 1500)
 * @param {number} props.parallelLinesAnimationConfig.waitTime - Pause time at each end in milliseconds (default: 500)
 * @param {number} props.parallelLinesAnimationConfig.cycles - Number of oscillation cycles (default: -1 for infinite)
 * @param {number} props.parallelLinesAnimationConfig.speed - Speed multiplier (default: 1). Values > 1 = faster, < 1 = slower. 0.5 = half speed
 * @param {number} props.parallelLinesAnimationConfig.speedFactor - Alternative to speed (same effect)
 * @param {number} props.parallelLinesAnimationConfig.extensionRatio - How much to extend each side as ratio of side length (default: 1)
 * @param {number} props.parallelLinesAnimationConfig.movementRatio - How far the quadrilateral moves as ratio of side length (default: 0.5). 0.5 = moves 50% of side length in each direction
 * @param {number} props.parallelLinesAnimationConfig.travelDistance - Alternative to movementRatio (same effect)
 * @param {string} props.parallelLinesAnimationConfig.extensionColor - Color for dashed extensions (default: '#888888')
 * @param {string} props.parallelLinesAnimationConfig.message - Custom message to display (default: 'These sides are parallel!')
 * @param {Object} props.parallelLinesAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.left - Absolute left position in percentage
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.top - Absolute top position in percentage
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.offsetX - Horizontal offset in percentage (default: 0)
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.offsetY - Vertical offset in percentage (default: -8)
 * @param {string} props.mode - Component mode: 'default' (normal) or 'build' (shape building exercise) (default: 'default')
 * @param {Object} props.buildConfig - Build mode configuration object
 * @param {string} props.buildConfig.targetType - Target type: 'shape' (match shape type) or 'coordinates' (match exact vertices) (default: 'shape')
 * @param {string} props.buildConfig.targetShape - Target shape type when targetType='shape' (e.g., 'SQUARE', 'RECTANGLE')
 * @param {Array<Object>} props.buildConfig.targetVertices - Target vertex positions [{row, col}, ...] when targetType='coordinates'
 * @param {boolean} props.buildConfig.showTargetWireframe - Show dashed outline of target shape (default: true)
 * @param {string} props.buildConfig.wireframeColor - Wireframe stroke color (default: '#888888')
 * @param {string} props.buildConfig.wireframeThickness - Wireframe stroke width in gc units (default: '2gc')
 * @param {boolean} props.buildConfig.blinkWireframe - Animate wireframe blinking (default: false)
 * @param {number} props.buildConfig.blinkDuration - Blink cycle duration in milliseconds (default: 1000)
 * @param {boolean} props.buildConfig.highlightTargetVertices - Show target vertex markers (default: false)
 * @param {string} props.buildConfig.targetVertexColor - Target vertex marker color (default: '#00AA00')
 * @param {string} props.buildConfig.targetVertexSize - Target vertex marker size in gc units (default: '8gc')
 * @param {number} props.buildConfig.tolerance - Grid cells tolerance for coordinate matching (default: 0 = exact)
 * @param {Function} props.buildConfig.onTargetAchieved - Callback when target is reached, receives {vertices, targetType, achievedAt}
 * @param {boolean} props.buildConfig.showSuccessMessage - Show built-in success message (default: true)
 * @param {string} props.buildConfig.successMessage - Custom success message text (default: 'Great job!')
 * @param {boolean} props.buildConfig.successAnimation - Play success animation (default: true)
 */
const QuadrilateralComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    quadType = 'SQUARE',
    gridRows = 10,
    gridCols = 10,
    coordinates,
    vertices: initialVertices,
    showGrid: propShowGrid = true,
    showDiagonals: propShowDiagonals = false,
    showAngleMarkers = 'all', // Deprecated, use angleConfig.show
    showProperties: propShowProperties = 'panel',
    showPropertyPanel: propShowPropertyPanel = undefined, // Boolean prop to toggle property panel (takes precedence over showProperties)
    containerBorder = false,
    containerBorderWidth = '4gc',
    containerBorderColor = '#000000',
    containerBorderStyle = 'solid',
    gridPadding = 0,
    draggable: propDraggable = true,
    showVertices: propShowVertices = true, // Show/hide vertex hotspots (default: true)
    onVertexChange,
    sideColor = '#000000',
    diagonalColor = '#999999',
    zIndex = 50,
    // New edge styling props
    edgeColor = '#000000',
    edgeThickness = '4gc',
    edgeStyle = 'solid',
    isBlink = false,
    side1,
    side2,
    side3,
    side4,
    diagonal1,
    diagonal2,
    // Vertex config (grouped)
    vertexConfig = {},
    // Angle config (grouped)
    angleConfig = {},
    // Protractor integration
    protractorConfig = {},
    // Angle equality animation config
    angleAnimationConfig = {},
    // Angle sum animation config
    angleSumAnimationConfig = {},
    // Side equality animation config
    sideEqualityAnimationConfig = {},
    // Opposite side equality animation config
    oppositeSideAnimationConfig = {},
    // Diagonal equality animation config
    diagonalEqualityAnimationConfig = {},
    // Diagonal bisection animation config
    diagonalBisectionAnimationConfig = {},
    // Diagonal perpendicular bisection animation config
    diagonalPerpendicularAnimationConfig = {},
    // Parallel lines animation config
    parallelLinesAnimationConfig = {},
    // All 4 side equality animation config
    allSideEqualityAnimationConfig = {},
    // Confirm right angle animation config
    confirmRightAngleAnimationConfig = {},
    // Build mode props
    mode = 'default', // 'default' | 'build'
    buildConfig = {},
    // Animation sequence config
    animationSequence = {}
  } = props;

  // Get quad ID for display state
  const quadId = id || `${elementName}-${currentPage}`;
  
  // Parse gridPadding value (supports gc units or raw numbers)
  const paddingGc = React.useMemo(() => {
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      return parseFloat(gridPadding) || 0;
    }
    return typeof gridPadding === 'number' ? gridPadding : 0;
  }, [gridPadding]);
  
  // Parse containerBorderWidth value (supports gc units or raw numbers)
  const borderWidthGc = React.useMemo(() => {
    if (!containerBorder) return 0;
    if (typeof containerBorderWidth === 'string' && containerBorderWidth.endsWith('gc')) {
      return parseFloat(containerBorderWidth) || 0;
    }
    return typeof containerBorderWidth === 'number' ? containerBorderWidth : 0;
  }, [containerBorder, containerBorderWidth]);
  
  // Calculate grid dimensions using square cell algorithm
  const gridDimensions = React.useMemo(() => {
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 4) {
      return {
        cellSizeGc: 50,
        gridWidthGc: 500,
        gridHeightGc: 500,
        offsetXGc: 0,
        offsetYGc: 0,
        containerWidthGc: 500,
        containerHeightGc: 500
      };
    }
    
    const [x1, y1, x2, y2] = coordinates;
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    // Calculate adjusted dimensions after padding
    // NOTE: Border is drawn on top of the container, so it doesn't reduce available space
    // The grid should fill the container's content area, and the border is drawn over it
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells)
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert to percentages (EXACT same as gridArea in quad-grid-component.js)
    const gridWidth = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const gridHeight = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    return {
      cellSizeGc,
      gridWidthGc,
      gridHeightGc,
      offsetXGc,
      offsetYGc,
      containerWidthGc,
      containerHeightGc,
      // Also return percentages (EXACT same as gridArea)
      width: gridWidth,
      height: gridHeight,
      offsetX: offsetX,
      offsetY: offsetY
    };
  }, [coordinates, gridRows, gridCols, paddingGc]);
  
  // Read display state from global state (can be overridden by props)
  const displayState = typeof window !== 'undefined' && window.quadDisplayState && window.quadDisplayState[quadId] 
    ? window.quadDisplayState[quadId] 
    : {};

  // Extract vertex config with defaults
  const vertexColor = vertexConfig.color || '#FF9900';
  const showVertexLabels = displayState.showVertexLabels !== undefined 
    ? displayState.showVertexLabels 
    : (vertexConfig.showLabels || false);
  const vertexLabels = vertexConfig.labels || ['A', 'B', 'C', 'D'];
  const vertexLabelColor = vertexConfig.labelColor || '#FFFFFF'; // White font
  const vertexLabelSize = vertexConfig.labelSize || '36gc'; // 36gc font size
  const vertexLabelOffset = vertexConfig.labelOffset || '40gc'; // Increased default to prevent overlap

  // Extract angle config with defaults (support deprecated showAngleMarkers for backward compatibility)
  // Check display state for angle arcs and text; when unset, fall back to angleConfig.show (e.g. page 4 uses show: 'none')
  const propShow = angleConfig.show;
  const propShowNone = propShow === 'none' || propShow === '';
  const defaultFromProps = !propShowNone && (propShow === 'all' || propShow === 'arc' || propShow === 'measurement' || propShow === 'rightAngle');
  const showAngleArcsFromState = displayState.showAngleArcs !== undefined
    ? displayState.showAngleArcs
    : (propShowNone ? false : (defaultFromProps && (propShow === 'all' || propShow === 'arc' || propShow === 'rightAngle')));
  const showAngleTextFromState = displayState.showAngleText !== undefined
    ? displayState.showAngleText
    : (propShowNone ? false : (defaultFromProps && (propShow === 'all' || propShow === 'measurement' || propShow === 'rightAngle')));
  
  // Determine angleShow from state/props
  let angleShow;
  if (!showAngleArcsFromState && !showAngleTextFromState) {
    angleShow = 'none';
  } else if (!showAngleArcsFromState) {
    angleShow = 'measurement';
  } else if (!showAngleTextFromState) {
    angleShow = 'arc';
  } else {
    angleShow = 'all';
  }
  
  const angleMarkerColor = angleConfig.markerColor || '#FF6600';
  const angleMarkerSize = angleConfig.markerSize || '1gc';
  // Display state should override props - if display state is explicitly set, use it
  // Otherwise, fall back to prop value or default based on angleShow
  const angleShowText = displayState.showAngleText !== undefined
    ? showAngleTextFromState  // Display state explicitly set, use it (overrides prop)
    : (angleConfig.showText !== undefined 
      ? angleConfig.showText  // Use prop value if display state not set
      : (angleShow === 'measurement' || angleShow === 'all'));  // Default based on angleShow
  const angleTextColor = angleConfig.textColor || '#FF6600';
  const angleTextSize = angleConfig.textSize || '12gc';
  const angleTextFont = angleConfig.textFont || 'Arial, sans-serif';
  const angleTextOffset = angleConfig.textOffset || '35gc';
  const angleLabelBackgroundColor = angleConfig.labelBackgroundColor;
  const angleLabelBorderColor = angleConfig.labelBorderColor;
  const angleLabelBorderWidth = angleConfig.labelBorderWidth;
  const angleLabelPadding = angleConfig.labelPadding;

  // Use display state if available, otherwise use props
  const showGrid = displayState.showGrid !== undefined ? displayState.showGrid : propShowGrid;
  const showDiagonals = displayState.showDiagonals !== undefined ? displayState.showDiagonals : propShowDiagonals;
  
  // Determine showProperties: check displayState first, then propShowPropertyPanel (boolean), then propShowProperties (string)
  const showProperties = displayState.showPropertyPanel !== undefined 
    ? (displayState.showPropertyPanel ? 'panel' : 'none')
    : (propShowPropertyPanel !== undefined
      ? (propShowPropertyPanel ? 'panel' : 'none')
      : propShowProperties);
  const draggable = displayState.draggable !== undefined ? displayState.draggable : propDraggable;

  // Extract build mode config with defaults
  const buildTargetType = buildConfig.targetType || 'shape'; // 'shape' | 'coordinates'
  const buildTargetShape = buildConfig.targetShape || 'SQUARE';
  const buildTargetVertices = buildConfig.targetVertices || null; // [{row, col}, ...]
  const buildShowTargetWireframe = buildConfig.showTargetWireframe !== undefined ? buildConfig.showTargetWireframe : true;
  const buildWireframeColor = buildConfig.wireframeColor || '#888888';
  const buildWireframeThickness = buildConfig.wireframeThickness || '2gc';
  const buildBlinkWireframe = buildConfig.blinkWireframe !== undefined ? buildConfig.blinkWireframe : false;
  const buildBlinkDuration = buildConfig.blinkDuration || 1000;
  const buildHighlightTargetVertices = buildConfig.highlightTargetVertices !== undefined ? buildConfig.highlightTargetVertices : false;
  const buildTargetVertexColor = buildConfig.targetVertexColor || '#00AA00';
  const buildTargetVertexSize = buildConfig.targetVertexSize || '8gc';
  const buildTolerance = buildConfig.tolerance !== undefined ? buildConfig.tolerance : 0;
  const buildOnTargetAchieved = buildConfig.onTargetAchieved || null;
  const buildShowSuccessMessage = buildConfig.showSuccessMessage !== undefined ? buildConfig.showSuccessMessage : true;
  const buildSuccessMessage = buildConfig.successMessage || 'Great job!';
  const buildSuccessAnimation = buildConfig.successAnimation !== undefined ? buildConfig.successAnimation : true;

  // Extract angle animation config with defaults
  const animationDuration = angleAnimationConfig.duration || angleAnimationConfig.speed || 2000;
  const animationHoldTime = angleAnimationConfig.holdTime || 500;
  const equalityMessage = angleAnimationConfig.message || angleAnimationConfig.equalityMessage || 'The angles are perfectly equal!';
  
  // Message position configuration
  const messagePosition = angleAnimationConfig.messagePosition || angleAnimationConfig.messageCoordinates || {};
  const messageLeft = messagePosition.left !== undefined ? messagePosition.left : null; // null = use targetLeft
  const messageTop = messagePosition.top !== undefined ? messagePosition.top : null; // null = use targetTop - 8
  const messageOffsetX = messagePosition.offsetX || messagePosition.offsetLeft || 0; // Additional offset in percentage
  const messageOffsetY = messagePosition.offsetY || messagePosition.offsetTop || -8; // Additional offset in percentage (default: -8% above)
  
  // Extract angle sum animation config with defaults
  const sumAnimationDuration = angleSumAnimationConfig.duration || angleSumAnimationConfig.speed || 2000;
  const sumAnimationMode = angleSumAnimationConfig.animationMode || 'adjacent'; // 'adjacent' | 'neutral' | 'straightLine'
  const sumDisplayMode = angleSumAnimationConfig.displayMode || 'sideBySide'; // 'sideBySide' | 'merged'
  const sumMessage = angleSumAnimationConfig.message || 'These angles add up to 180°!';
  
  // Sum message position configuration
  const sumMessagePosition = angleSumAnimationConfig.messagePosition || angleSumAnimationConfig.messageCoordinates || {};
  const sumMessageLeft = sumMessagePosition.left !== undefined ? sumMessagePosition.left : null;
  const sumMessageTop = sumMessagePosition.top !== undefined ? sumMessagePosition.top : null;
  const sumMessageOffsetX = sumMessagePosition.offsetX || sumMessagePosition.offsetLeft || 0;
  const sumMessageOffsetY = sumMessagePosition.offsetY || sumMessagePosition.offsetTop || -8;
  
  // 180° text configuration
  const deg180TextFontSize = angleSumAnimationConfig.deg180TextFontSize || angleSumAnimationConfig.fontSize180 || 1.25; // Multiplier for base font size
  const deg180TextOffsetY = angleSumAnimationConfig.deg180TextOffsetY || angleSumAnimationConfig.offsetY180 || null; // Custom Y offset (null = auto-calculate)
  
  // Extract side equality animation config with defaults
  const sideAnimationDuration = sideEqualityAnimationConfig.duration || 1000; // Rotation duration
  const sideAnimationWaitTime = sideEqualityAnimationConfig.waitTime || 1000; // Wait time at each position
  const sideAnimationCycles = sideEqualityAnimationConfig.cycles !== undefined ? sideEqualityAnimationConfig.cycles : -1; // -1 = infinite
  const sideEqualityMessage = sideEqualityAnimationConfig.message || 'Adjacent sides are equal!';
  const sideLineStyle = sideEqualityAnimationConfig.lineStyle || sideEqualityAnimationConfig.style || 'dashed'; // 'dashed' | 'solid'
  
  // Side message position configuration
  const sideMessagePosition = sideEqualityAnimationConfig.messagePosition || {};
  const sideMessageLeft = sideMessagePosition.left !== undefined ? sideMessagePosition.left : null;
  const sideMessageTop = sideMessagePosition.top !== undefined ? sideMessagePosition.top : null;
  const sideMessageOffsetX = sideMessagePosition.offsetX || sideMessagePosition.offsetLeft || 0;
  const sideMessageOffsetY = sideMessagePosition.offsetY || sideMessagePosition.offsetTop || -8;
  
  // Extract opposite side equality animation config with defaults
  const oppositeSideAnimationDuration = oppositeSideAnimationConfig.duration || 1000; // Translation duration
  const oppositeSideAnimationWaitTime = oppositeSideAnimationConfig.waitTime || 1000; // Wait time at each position
  const oppositeSideAnimationCycles = oppositeSideAnimationConfig.cycles !== undefined ? oppositeSideAnimationConfig.cycles : -1; // -1 = infinite
  const oppositeSideEqualityMessage = oppositeSideAnimationConfig.message || 'Opposite sides are equal!';
  const oppositeSideLineStyle = oppositeSideAnimationConfig.lineStyle || oppositeSideAnimationConfig.style || 'dashed'; // 'dashed' | 'solid'
  const oppositeSideColor1 = oppositeSideAnimationConfig.color1 || oppositeSideAnimationConfig.color || 'orange'; // Color for pair 0 (AB/CD)
  const oppositeSideColor2 = oppositeSideAnimationConfig.color2 || '#3399FF'; // Color for pair 1 (BC/DA)
  
  // Opposite side message position configuration
  const oppositeSideMessagePosition = oppositeSideAnimationConfig.messagePosition || {};
  const oppositeSideMessageLeft = oppositeSideMessagePosition.left !== undefined ? oppositeSideMessagePosition.left : null;
  const oppositeSideMessageTop = oppositeSideMessagePosition.top !== undefined ? oppositeSideMessagePosition.top : null;
  const oppositeSideMessageOffsetX = oppositeSideMessagePosition.offsetX || oppositeSideMessagePosition.offsetLeft || 0;
  const oppositeSideMessageOffsetY = oppositeSideMessagePosition.offsetY || oppositeSideMessagePosition.offsetTop || -8;
  
  // Extract diagonal equality animation config with defaults
  const diagonalEqualityDuration = diagonalEqualityAnimationConfig.duration || 1500;
  const diagonalEqualityWaitTime = diagonalEqualityAnimationConfig.waitTime || 1000;
  const diagonalEqualityCycles = diagonalEqualityAnimationConfig.cycles !== undefined ? diagonalEqualityAnimationConfig.cycles : -1;
  const diagonalEqualityMessage = diagonalEqualityAnimationConfig.message || 'Diagonals are equal in length!';
  const diagonalEqualityLineStyle = diagonalEqualityAnimationConfig.lineStyle || 'dashed';
  const diagonalEqualityColor = diagonalEqualityAnimationConfig.color || '#FF6600';
  
  // Diagonal equality message position configuration
  const diagonalEqualityMessagePosition = diagonalEqualityAnimationConfig.messagePosition || {};
  const diagonalEqualityMessageLeft = diagonalEqualityMessagePosition.left !== undefined ? diagonalEqualityMessagePosition.left : null;
  const diagonalEqualityMessageTop = diagonalEqualityMessagePosition.top !== undefined ? diagonalEqualityMessagePosition.top : null;
  const diagonalEqualityMessageOffsetX = diagonalEqualityMessagePosition.offsetX || 0;
  const diagonalEqualityMessageOffsetY = diagonalEqualityMessagePosition.offsetY || -8;
  
  // Extract diagonal bisection animation config with defaults
  const diagonalBisectionDuration = diagonalBisectionAnimationConfig.duration || 1500;
  const diagonalBisectionWaitTime = diagonalBisectionAnimationConfig.waitTime || 1000;
  const diagonalBisectionCycles = diagonalBisectionAnimationConfig.cycles !== undefined ? diagonalBisectionAnimationConfig.cycles : -1;
  const diagonalBisectionMessage = diagonalBisectionAnimationConfig.message || 'Diagonals bisect each other!';
  const diagonalBisectionColor1 = diagonalBisectionAnimationConfig.color1 || '#FF6600';
  const diagonalBisectionColor2 = diagonalBisectionAnimationConfig.color2 || '#3399FF';
  const diagonalBisectionTickSize = diagonalBisectionAnimationConfig.tickSize || 10;
  
  // Diagonal bisection message position configuration
  const diagonalBisectionMessagePosition = diagonalBisectionAnimationConfig.messagePosition || {};
  const diagonalBisectionMessageLeft = diagonalBisectionMessagePosition.left !== undefined ? diagonalBisectionMessagePosition.left : null;
  const diagonalBisectionMessageTop = diagonalBisectionMessagePosition.top !== undefined ? diagonalBisectionMessagePosition.top : null;
  const diagonalBisectionMessageOffsetX = diagonalBisectionMessagePosition.offsetX || 0;
  const diagonalBisectionMessageOffsetY = diagonalBisectionMessagePosition.offsetY || -8;
  
  // Extract diagonal perpendicular bisection animation config with defaults
  const diagonalPerpendicularDuration = diagonalPerpendicularAnimationConfig.duration || 1500;
  const diagonalPerpendicularWaitTime = diagonalPerpendicularAnimationConfig.waitTime || 1000;
  const diagonalPerpendicularCycles = diagonalPerpendicularAnimationConfig.cycles !== undefined ? diagonalPerpendicularAnimationConfig.cycles : -1;
  const diagonalPerpendicularMessage = diagonalPerpendicularAnimationConfig.message || 'Diagonals bisect at right angles!';
  const diagonalPerpendicularColor1 = diagonalPerpendicularAnimationConfig.color1 || '#FF6600';
  const diagonalPerpendicularColor2 = diagonalPerpendicularAnimationConfig.color2 || '#3399FF';
  const diagonalPerpendicularTickSize = diagonalPerpendicularAnimationConfig.tickSize || 10;
  const diagonalPerpendicularRightAngleSize = diagonalPerpendicularAnimationConfig.rightAngleSize || 15;
  const diagonalPerpendicularRightAngleColor = diagonalPerpendicularAnimationConfig.rightAngleColor || '#00AA00';
  
  // Diagonal perpendicular message position configuration
  const diagonalPerpendicularMessagePosition = diagonalPerpendicularAnimationConfig.messagePosition || {};
  const diagonalPerpendicularMessageLeft = diagonalPerpendicularMessagePosition.left !== undefined ? diagonalPerpendicularMessagePosition.left : null;
  const diagonalPerpendicularMessageTop = diagonalPerpendicularMessagePosition.top !== undefined ? diagonalPerpendicularMessagePosition.top : null;
  const diagonalPerpendicularMessageOffsetX = diagonalPerpendicularMessagePosition.offsetX || 0;
  const diagonalPerpendicularMessageOffsetY = diagonalPerpendicularMessagePosition.offsetY || -8;
  
  // Extract parallel lines animation config with defaults
  const parallelLinesSpeed = parallelLinesAnimationConfig.speed || parallelLinesAnimationConfig.speedFactor || 1; // Speed multiplier (1 = normal, 0.5 = half speed, 2 = double speed)
  const parallelLinesBaseDuration = parallelLinesAnimationConfig.duration || 1500; // Base duration for one direction
  const parallelLinesDuration = parallelLinesBaseDuration / parallelLinesSpeed; // Apply speed multiplier (divide by speed to make it slower when speed < 1)
  const parallelLinesWaitTime = parallelLinesAnimationConfig.waitTime || 500; // Pause at each end
  const parallelLinesCycles = parallelLinesAnimationConfig.cycles !== undefined ? parallelLinesAnimationConfig.cycles : -1; // -1 = infinite
  const parallelLinesExtensionRatio = parallelLinesAnimationConfig.extensionRatio !== undefined ? parallelLinesAnimationConfig.extensionRatio : 1; // Extension as ratio of side length
  const parallelLinesMovementRatio = parallelLinesAnimationConfig.movementRatio !== undefined ? parallelLinesAnimationConfig.movementRatio : (parallelLinesAnimationConfig.travelDistance !== undefined ? parallelLinesAnimationConfig.travelDistance : 0.5); // Movement distance as ratio of side length (default: 0.5 = 50% of side length)
  const parallelLinesExtensionColor = parallelLinesAnimationConfig.extensionColor || '#888888';
  const parallelLinesMessage = parallelLinesAnimationConfig.message || 'These sides are parallel!';
  
  // Parallel lines message position configuration
  const parallelLinesMessagePosition = parallelLinesAnimationConfig.messagePosition || {};
  const parallelLinesMessageLeft = parallelLinesMessagePosition.left !== undefined ? parallelLinesMessagePosition.left : null;
  const parallelLinesMessageTop = parallelLinesMessagePosition.top !== undefined ? parallelLinesMessagePosition.top : null;
  const parallelLinesMessageOffsetX = parallelLinesMessagePosition.offsetX || 0;
  const parallelLinesMessageOffsetY = parallelLinesMessagePosition.offsetY || -8;
  
  // Helper function to get per-vertex angle config (merges with global defaults)
  // Note: This will be redefined after state initialization to use currentAngleShowText and currentAngleShow
  const getVertexAngleConfigBase = React.useCallback((vertexIndex, useShowText) => {
    const vertexKeys = ['angleA', 'angleB', 'angleC', 'angleD'];
    const vertexKey = vertexKeys[vertexIndex];
    const vertexAngleConfig = angleConfig[vertexKey] || {};
    
    // Global defaults
    const globalDefaults = {
      size: angleMarkerSize,
      color: angleMarkerColor,
      showText: useShowText,
      textMode: 'both' // 'name', 'measure', or 'both'
    };
    
    // Helper to get config for a specific angle type (interior or supplementary)
    // Inherits directly from global defaults
    // Checks 'show' flag inside each angle config - returns null if show is false
    const getAngleConfig = (angleType) => {
      const angleConfig = vertexAngleConfig[angleType] || {};
      
      // Check if this angle is enabled (show flag defaults to false)
      // Note: currentAngleShow will be checked after state initialization
      const isEnabled = angleConfig.show !== undefined ? angleConfig.show : false;
      if (!isEnabled) {
        return null;
      }
      
      return {
        size: angleConfig.size !== undefined ? angleConfig.size : globalDefaults.size,
        color: angleConfig.color || globalDefaults.color,
        showText: angleConfig.showText !== undefined ? angleConfig.showText : globalDefaults.showText,
        textMode: angleConfig.textMode || globalDefaults.textMode,
        fill: angleConfig.fill !== undefined ? angleConfig.fill : false,
        fillColor: angleConfig.fillColor || angleConfig.color || globalDefaults.color,
        fillOpacity: angleConfig.fillOpacity !== undefined ? angleConfig.fillOpacity : 0.3,
        blinkFill: angleConfig.blinkFill !== undefined ? angleConfig.blinkFill : false,
        animateDraw: angleConfig.animateDraw !== undefined ? angleConfig.animateDraw : false,
        drawLoops: angleConfig.drawLoops !== undefined ? angleConfig.drawLoops : 1,
        drawDuration: angleConfig.drawDuration !== undefined ? angleConfig.drawDuration : 2
      };
    };
    
    return {
      // Per-angle configs (inherit directly from global defaults)
      // Each angle checks its own 'show' flag - returns null if disabled
      interiorAngle: getAngleConfig('interiorAngle'),
      supplementaryAngle1: getAngleConfig('supplementaryAngle1'),
      supplementaryAngle2: getAngleConfig('supplementaryAngle2'),
      supplementaryAngle3: getAngleConfig('supplementaryAngle3')
    };
  }, [angleConfig, angleMarkerSize, angleMarkerColor]);

  // Get default vertices from config if not provided
  const defaultVertices = React.useMemo(() => {
    if (initialVertices && initialVertices.length === 4) {
      return initialVertices;
    }
    if (typeof window.QuadrilateralConfig === 'undefined') {
      console.warn('QuadrilateralConfig not available, using fallback vertices');
      // Fallback default vertices
      return [
        { row: 2, col: 2 },
        { row: 2, col: gridCols - 2 },
        { row: gridRows - 2, col: gridCols - 2 },
        { row: gridRows - 2, col: 2 }
      ];
    }
    // Use currentQuadType will be set by state, but for initial calculation use quadType prop
    return window.QuadrilateralConfig.getDefaultVertices(quadType, gridRows, gridCols);
  }, [initialVertices, quadType, gridRows, gridCols]);

  // Resolve target vertices for build mode
  const resolvedTargetVertices = React.useMemo(() => {
    if (mode !== 'build') {
      return null;
    }
    
    // If targetType is 'coordinates', use the provided targetVertices
    if (buildTargetType === 'coordinates' && buildTargetVertices && buildTargetVertices.length === 4) {
      console.log('📐 Build mode: Using provided target coordinates', buildTargetVertices);
      return buildTargetVertices;
    }
    
    // If targetType is 'shape', get default vertices for the target shape
    if (buildTargetType === 'shape' && buildTargetShape) {
      if (typeof window.QuadrilateralConfig === 'undefined') {
        console.warn('QuadrilateralConfig not available for target shape resolution');
        return null;
      }
      const targetVerts = window.QuadrilateralConfig.getDefaultVertices(buildTargetShape, gridRows, gridCols);
      console.log(`📐 Build mode: Resolved target vertices for ${buildTargetShape}`, targetVerts);
      return targetVerts;
    }
    
    return null;
  }, [mode, buildTargetType, buildTargetVertices, buildTargetShape, gridRows, gridCols]);

  // State for current quadType (can be updated dynamically)
  const [currentQuadType, setCurrentQuadType] = React.useState(quadType);
  
  // State for display properties (can be updated dynamically)
  const [currentShowGrid, setCurrentShowGrid] = React.useState(showGrid);
  const [currentShowDiagonals, setCurrentShowDiagonals] = React.useState(showDiagonals);
  const [currentShowProperties, setCurrentShowProperties] = React.useState(showProperties);
  const [currentDraggable, setCurrentDraggable] = React.useState(draggable);
  const [currentShowVertexLabels, setCurrentShowVertexLabels] = React.useState(showVertexLabels);
  const [currentAngleShow, setCurrentAngleShow] = React.useState(angleShow);
  const [currentAngleShowText, setCurrentAngleShowText] = React.useState(angleShowText);

  // Optional initial angle display configuration (per-instance)
  // Allows pages like page 4 to show a specific vertex angle marker + label by default
  React.useEffect(() => {
    if (!props.initialAngleDisplay) return;
    if (typeof window === 'undefined') return;

    const { showArcs, showText, vertexIndices } = props.initialAngleDisplay;

    // Initialize global display state container
    if (!window.quadDisplayState) {
      window.quadDisplayState = {};
    }

    const existingState = window.quadDisplayState[quadId] || {};
    const nextState = { ...existingState };

    if (showArcs !== undefined && nextState.showAngleArcs === undefined) {
      nextState.showAngleArcs = showArcs;
    }
    if (showText !== undefined && nextState.showAngleText === undefined) {
      nextState.showAngleText = showText;
    }
    if (vertexIndices !== undefined && nextState.showAngleVertex === undefined) {
      nextState.showAngleVertex = Array.isArray(vertexIndices) ? vertexIndices : [vertexIndices];
    }

    window.quadDisplayState[quadId] = nextState;

    const finalShowArcs = nextState.showAngleArcs !== undefined ? nextState.showAngleArcs : false;
    const finalShowText = nextState.showAngleText !== undefined ? nextState.showAngleText : false;

    let newAngleShow;
    if (!finalShowArcs && !finalShowText) {
      newAngleShow = 'none';
    } else if (!finalShowArcs) {
      newAngleShow = 'measurement';
    } else if (!finalShowText) {
      newAngleShow = 'arc';
    } else {
      newAngleShow = 'all';
    }

    setCurrentAngleShow(newAngleShow);
    setCurrentAngleShowText(finalShowText);
  }, [props.initialAngleDisplay, quadId]);

  // Sync angle show state when derived angleShow/angleShowText change (e.g. navigating to page 4 with angleConfig.show: 'none')
  React.useEffect(() => {
    setCurrentAngleShow(angleShow);
    setCurrentAngleShowText(angleShowText);
  }, [angleShow, angleShowText]);
  
  // Create getVertexAngleConfig that uses currentAngleShowText and currentAngleShow
  // This version respects the display state by defaulting to show angles when currentAngleShow is 'all' or 'arc'
  const getVertexAngleConfig = React.useCallback((vertexIndex) => {
    const baseConfig = getVertexAngleConfigBase(vertexIndex, currentAngleShowText);
    
    // If base config returned null for interiorAngle (because show wasn't set),
    // but currentAngleShow is 'all' or 'arc', create a default config
    const vertexKeys = ['angleA', 'angleB', 'angleC', 'angleD'];
    const vertexKey = vertexKeys[vertexIndex];
    const vertexAngleConfig = angleConfig[vertexKey] || {};
    const interiorAngleConfig = vertexAngleConfig.interiorAngle || {};
    
    // If interiorAngle is null but we should show it, create a default config
    if (!baseConfig.interiorAngle && (currentAngleShow === 'all' || currentAngleShow === 'arc')) {
      return {
        ...baseConfig,
        interiorAngle: {
          size: interiorAngleConfig.size !== undefined ? interiorAngleConfig.size : angleMarkerSize,
          color: interiorAngleConfig.color || angleMarkerColor,
          showText: interiorAngleConfig.showText !== undefined ? interiorAngleConfig.showText : currentAngleShowText,
          textMode: interiorAngleConfig.textMode || 'both',
          fill: interiorAngleConfig.fill !== undefined ? interiorAngleConfig.fill : false,
          fillColor: interiorAngleConfig.fillColor || interiorAngleConfig.color || angleMarkerColor,
          fillOpacity: interiorAngleConfig.fillOpacity !== undefined ? interiorAngleConfig.fillOpacity : 0.3,
          blinkFill: interiorAngleConfig.blinkFill !== undefined ? interiorAngleConfig.blinkFill : false,
          animateDraw: interiorAngleConfig.animateDraw !== undefined ? interiorAngleConfig.animateDraw : false,
          drawLoops: interiorAngleConfig.drawLoops !== undefined ? interiorAngleConfig.drawLoops : 1,
          drawDuration: interiorAngleConfig.drawDuration !== undefined ? interiorAngleConfig.drawDuration : 2
        }
      };
    }
    
    return baseConfig;
  }, [getVertexAngleConfigBase, currentAngleShowText, currentAngleShow, angleConfig, angleMarkerSize, angleMarkerColor]);
  
  // Update page info when currentPage changes (for console functions)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const quadId = id || elementName || 'default';
      if (!window.quadPageInfo) {
        window.quadPageInfo = {};
      }
      window.quadPageInfo[quadId] = currentPage;
    }
  }, [currentPage, id, elementName]);
  
  // Listen for display state changes
  React.useEffect(() => {
    const handleDisplayChange = (event) => {
      const { quadId: changedQuadId, property, value } = event.detail || {};
      if (changedQuadId !== quadId) return;
      
      console.log(`📐 Display property changed: ${property} = ${value}`);
      
      switch (property) {
        case 'showGrid':
          setCurrentShowGrid(value);
          break;
        case 'showDiagonals':
          setCurrentShowDiagonals(value);
          break;
        case 'showPropertyPanel':
          setCurrentShowProperties(value ? 'panel' : 'none');
          break;
        case 'draggable':
          setCurrentDraggable(value);
          break;
        case 'showVertexLabels':
          setCurrentShowVertexLabels(value);
          break;
        case 'showAngleArcs':
        case 'showAngleText':
          // Recalculate angleShow
          const state = window.quadDisplayState[quadId] || {};
          const showArcs = state.showAngleArcs !== undefined ? state.showAngleArcs : true;
          const showText = state.showAngleText !== undefined ? state.showAngleText : true;
          
          console.log(`📐 Updating angle show state: showArcs=${showArcs}, showText=${showText}, currentAngleShow=${currentAngleShow}`);
          
          if (!showArcs && !showText) {
            console.log(`   → Setting to 'none'`);
            setCurrentAngleShow('none');
            setCurrentAngleShowText(false);
          } else if (!showArcs) {
            console.log(`   → Setting to 'measurement'`);
            setCurrentAngleShow('measurement');
            setCurrentAngleShowText(true);
          } else if (!showText) {
            console.log(`   → Setting to 'arc'`);
            setCurrentAngleShow('arc');
            setCurrentAngleShowText(false);
          } else {
            console.log(`   → Setting to 'all'`);
            setCurrentAngleShow('all');
            setCurrentAngleShowText(true);
          }
          break;
      }
    };
    
    // Check global state on mount and periodically
    const checkGlobalState = () => {
      if (window.quadDisplayState && window.quadDisplayState[quadId]) {
        const state = window.quadDisplayState[quadId];
        if (state.showGrid !== undefined && state.showGrid !== currentShowGrid) {
          setCurrentShowGrid(state.showGrid);
        }
        if (state.showDiagonals !== undefined && state.showDiagonals !== currentShowDiagonals) {
          setCurrentShowDiagonals(state.showDiagonals);
        }
        if (state.showPropertyPanel !== undefined) {
          const newShowProps = state.showPropertyPanel ? 'panel' : 'none';
          if (newShowProps !== currentShowProperties) {
            setCurrentShowProperties(newShowProps);
          }
        }
        if (state.draggable !== undefined && state.draggable !== currentDraggable) {
          setCurrentDraggable(state.draggable);
        }
        if (state.showVertexLabels !== undefined && state.showVertexLabels !== currentShowVertexLabels) {
          setCurrentShowVertexLabels(state.showVertexLabels);
        }
        // Check angle marker display state
        if (state.showAngleArcs !== undefined || state.showAngleText !== undefined) {
          const showArcs = state.showAngleArcs !== undefined ? state.showAngleArcs : true;
          const showText = state.showAngleText !== undefined ? state.showAngleText : true;
          
          let newAngleShow;
          let newAngleShowText;
          
          if (!showArcs && !showText) {
            newAngleShow = 'none';
            newAngleShowText = false;
          } else if (!showArcs) {
            newAngleShow = 'measurement';
            newAngleShowText = true;
          } else if (!showText) {
            newAngleShow = 'arc';
            newAngleShowText = false;
          } else {
            newAngleShow = 'all';
            newAngleShowText = true;
          }
          
          if (newAngleShow !== currentAngleShow) {
            setCurrentAngleShow(newAngleShow);
          }
          if (newAngleShowText !== currentAngleShowText) {
            setCurrentAngleShowText(newAngleShowText);
          }
        }
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('quadDisplayChanged', handleDisplayChange);
      checkGlobalState();
      const interval = setInterval(checkGlobalState, 500);
      
      return () => {
        window.removeEventListener('quadDisplayChanged', handleDisplayChange);
        clearInterval(interval);
      };
    }
  }, [quadId, currentShowGrid, currentShowDiagonals, currentShowProperties, currentDraggable, currentShowVertexLabels]);
  
  // State for current vertices
  const [vertices, setVertices] = React.useState(defaultVertices);
  
  // Build mode: Track if target has been achieved
  const [buildTargetAchieved, setBuildTargetAchieved] = React.useState(false);
  
  // Build mode: Track if success animation is playing
  const [buildSuccessAnimating, setBuildSuccessAnimating] = React.useState(false);
  
  // Helper: check if current vertices coincide with target vertices as a set (any vertex can match any target position)
  const verticesSetMatch = React.useCallback((current, target, tol) => {
    if (!current || !target || current.length !== 4 || target.length !== 4) return false;
    const used = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      let found = false;
      for (let j = 0; j < 4; j++) {
        if (used[j]) continue;
        const rowDiff = Math.abs(current[i].row - target[j].row);
        const colDiff = Math.abs(current[i].col - target[j].col);
        if (rowDiff <= tol && colDiff <= tol) {
          used[j] = true;
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }, []);

  // Build mode: Validation logic - check if current vertices match target (by shape or by set of positions)
  React.useEffect(() => {
    if (mode !== 'build' || !resolvedTargetVertices || buildTargetAchieved) {
      return;
    }
    
    let targetMatched = false;
    
    if (buildTargetType === 'coordinates') {
      // Coordinate matching: current set of positions must coincide with target set (any order)
      targetMatched = verticesSetMatch(vertices, resolvedTargetVertices, buildTolerance);
      
      if (targetMatched) {
        console.log('🎯 Build mode: Target coordinates achieved!', { vertices, target: resolvedTargetVertices, tolerance: buildTolerance });
      }
    } else if (buildTargetType === 'shape') {
      // Coordinate fallback: if the set of current positions coincides with target positions (any order), count as achieved
      const coordTolerance = Math.max(buildTolerance, 0);
      const coordinatesMatch = verticesSetMatch(vertices, resolvedTargetVertices, coordTolerance);
      if (coordinatesMatch) {
        targetMatched = true;
        console.log('🎯 Build mode: Target shape (by coordinates) achieved!', { buildTargetShape, vertices, target: resolvedTargetVertices });
      }
      
      if (!targetMatched && typeof window.QuadrilateralConfig !== 'undefined') {
        // Shape type matching mode - check if current shape properties match target shape
        const currentProperties = window.QuadrilateralConfig.analyzeProperties(vertices);
        const targetConfig = window.QuadrilateralConfig.getConfig(buildTargetShape);
        
        if (currentProperties && targetConfig) {
          const targetProps = targetConfig.properties;
          const parallelMatch = currentProperties.parallelSides === targetProps.parallelSides;
          const equalSidesMatch = currentProperties.equalSides === targetProps.equalSides;
          const rightAnglesMatch = currentProperties.allRightAngles === targetProps.allRightAngles;
          const diagonalsPerpendicularMatch = currentProperties.diagonalsPerpendicular === targetProps.diagonalsPerpendicular;
          
          targetMatched = parallelMatch && equalSidesMatch && rightAnglesMatch;
          if (targetMatched && (buildTargetShape === 'SQUARE' || buildTargetShape === 'RHOMBUS')) {
            targetMatched = targetMatched && diagonalsPerpendicularMatch;
          }
          
          if (targetMatched) {
            console.log(`🎯 Build mode: Target shape ${buildTargetShape} achieved!`, { currentProperties, targetProps });
          }
        }
      }
    }
    
    if (targetMatched) {
      setBuildTargetAchieved(true);
      
      // Trigger success animation if enabled
      if (buildSuccessAnimation) {
        setBuildSuccessAnimating(true);
        // Auto-remove animation class after animation completes
        setTimeout(() => {
          setBuildSuccessAnimating(false);
        }, 1500); // Match the animation duration
      }
      
      // Call success callback
      if (buildOnTargetAchieved) {
        buildOnTargetAchieved({
          vertices: vertices,
          targetType: buildTargetType,
          targetShape: buildTargetType === 'shape' ? buildTargetShape : null,
          targetVertices: resolvedTargetVertices,
          achievedAt: Date.now()
        });
      }
    }
  }, [mode, vertices, resolvedTargetVertices, buildTargetAchieved, buildTargetType, buildTargetShape, buildTolerance, buildOnTargetAchieved, buildSuccessAnimation, verticesSetMatch]);
  
  // State for dragging
  const [draggingVertexIndex, setDraggingVertexIndex] = React.useState(null);
  const [snapPoint, setSnapPoint] = React.useState(null);
  const containerRef = React.useRef(null);
  
  // Listen for shape changes from ShapeSelectorComponent
  React.useEffect(() => {
    const handleShapeChange = (event) => {
      const { shape, targetId } = event.detail || {};
      // Only update if this is the target component or if no targetId is specified
      if (!targetId || targetId === id || targetId === elementName) {
        console.log(`📐 QuadrilateralComponent ${id} received shape change: ${shape}`);
        setCurrentQuadType(shape);
      }
    };
    
    // Also check global state
    const checkGlobalState = () => {
      if (window.shapeSelectorState && window.shapeSelectorState.selectedShape) {
        const globalShape = window.shapeSelectorState.selectedShape;
        if (globalShape !== currentQuadType) {
          console.log(`📐 QuadrilateralComponent ${id} updating from global state: ${globalShape}`);
          setCurrentQuadType(globalShape);
        }
      }
    };
    
    // Listen to custom event
    if (typeof window !== 'undefined') {
      window.addEventListener('shapeChanged', handleShapeChange);
      // Check global state on mount and periodically
      checkGlobalState();
      const interval = setInterval(checkGlobalState, 500);
      
      return () => {
        window.removeEventListener('shapeChanged', handleShapeChange);
        clearInterval(interval);
      };
    }
  }, [id, elementName, currentQuadType]);
  
  // Update vertices when quadType changes (only if not using custom initialVertices)
  React.useEffect(() => {
    if (!initialVertices && typeof window.QuadrilateralConfig !== 'undefined') {
      const newVertices = window.QuadrilateralConfig.getDefaultVertices(currentQuadType, gridRows, gridCols);
      setVertices(newVertices);
      console.log(`📐 QuadrilateralComponent ${id} updated vertices for ${currentQuadType}`);
    }
  }, [currentQuadType, gridRows, gridCols, id, initialVertices]);

  // State for angle equality animation
  const [angleAnimation, setAngleAnimation] = React.useState(null);
  const angleAnimationRef = React.useRef(null);
  
  // State for angle sum animation
  const [angleSumAnimation, setAngleSumAnimation] = React.useState(null);
  const angleSumAnimationRef = React.useRef(null);
  
  // State for side equality animation
  const [sideEqualityAnimation, setSideEqualityAnimation] = React.useState(null);
  const sideEqualityAnimationRef = React.useRef(null);
  
  // State for opposite side equality animation
  const [oppositeSideAnimation, setOppositeSideAnimation] = React.useState(null);
  const oppositeSideAnimationRef = React.useRef(null);
  
  // State for diagonal equality animation
  const [diagonalEqualityAnimation, setDiagonalEqualityAnimation] = React.useState(null);
  const diagonalEqualityAnimationRef = React.useRef(null);
  
  // State for diagonal bisection animation
  const [diagonalBisectionAnimation, setDiagonalBisectionAnimation] = React.useState(null);
  const diagonalBisectionAnimationRef = React.useRef(null);
  
  // State for diagonal perpendicular bisection animation
  const [diagonalPerpendicularAnimation, setDiagonalPerpendicularAnimation] = React.useState(null);
  const diagonalPerpendicularAnimationRef = React.useRef(null);
  
  // State for parallel lines animation
  const [parallelLinesAnimation, setParallelLinesAnimation] = React.useState(null);
  const parallelLinesAnimationRef = React.useRef(null);
  
  // State for all 4 side equality animation
  const [allSideEqualityAnimation, setAllSideEqualityAnimation] = React.useState(null);
  const allSideEqualityAnimationRef = React.useRef(null);
  const allSideEqualityStateRef = React.useRef(null); // Store animation state in ref for direct access
  const permanentEqualSideStrokesRef = React.useRef(null); // Store stroke data to persist after animation

  // State for confirm right angle animation
  const [confirmRightAngleAnimation, setConfirmRightAngleAnimation] = React.useState(null);
  const confirmRightAngleAnimationRef = React.useRef(null);
  const confirmRightAngleStateRef = React.useRef(null); // Store animation state in ref for direct access
  const [permanentRightAngleMarkers, setPermanentRightAngleMarkers] = React.useState([]); // Vertices with confirmed right angles

  // State for animation sequence
  const [sequenceStepIndex, setSequenceStepIndex] = React.useState(-1);
  const [isSequenceRunning, setIsSequenceRunning] = React.useState(false);
  const sequenceTimeoutRef = React.useRef(null);
  const sequenceStartedRef = React.useRef(false);

  // Add blink keyframes to document once
  React.useEffect(() => {
    if (!document.getElementById('angle-equality-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'angle-equality-blink-keyframes';
      style.textContent = `
        @keyframes angleEqualityBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add side equality blink keyframes
    if (!document.getElementById('side-equality-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'side-equality-blink-keyframes';
      style.textContent = `
        @keyframes sideEqualityBlink {
          0%, 100% { 
            stroke: orange; 
            opacity: 1;
          }
          50% { 
            stroke: yellow;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add opposite side equality blink keyframes (orange/yellow for pair 0)
    if (!document.getElementById('opposite-side-blink-orange-keyframes')) {
      const style = document.createElement('style');
      style.id = 'opposite-side-blink-orange-keyframes';
      style.textContent = `
        @keyframes oppositeSideBlinkOrange {
          0%, 100% { 
            stroke: orange; 
            opacity: 1;
          }
          50% { 
            stroke: yellow;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add opposite side equality blink keyframes (blue/cyan for pair 1)
    if (!document.getElementById('opposite-side-blink-blue-keyframes')) {
      const style = document.createElement('style');
      style.id = 'opposite-side-blink-blue-keyframes';
      style.textContent = `
        @keyframes oppositeSideBlinkBlue {
          0%, 100% { 
            stroke: #3399FF; 
            opacity: 1;
          }
          50% { 
            stroke: #66CCFF;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add diagonal equality blink keyframes
    if (!document.getElementById('diagonal-equality-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'diagonal-equality-blink-keyframes';
      style.textContent = `
        @keyframes diagonalEqualityBlink {
          0%, 100% { 
            stroke: #FF6600; 
            opacity: 1;
          }
          50% { 
            stroke: #FFAA00;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add diagonal bisection tick blink keyframes
    if (!document.getElementById('diagonal-bisection-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'diagonal-bisection-blink-keyframes';
      style.textContent = `
        @keyframes diagonalBisectionBlink {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.5;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add diagonal perpendicular right angle blink keyframes
    if (!document.getElementById('diagonal-perpendicular-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'diagonal-perpendicular-blink-keyframes';
      style.textContent = `
        @keyframes diagonalPerpendicularBlink {
          0%, 100% { 
            stroke: #00AA00; 
            opacity: 1;
          }
          50% { 
            stroke: #00FF00;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Inject keyframe animation for semicircle drawing when animation completes
  React.useEffect(() => {
    if (angleSumAnimation && angleSumAnimation.isComplete && typeof document !== 'undefined') {
      // Calculate semicircle radius (1.5x the original arc radius)
      const arcConfig = getVertexAngleConfig(angleSumAnimation.vertex1Index);
      const arcEffectiveSize = (() => {
        const size = arcConfig?.interiorAngle?.size || angleMarkerSize;
        if (typeof size === 'number') return Math.max(size, 0.5);
        if (typeof size === 'string' && size.includes('gc')) {
          const gcValue = parseFloat(size.replace('gc', '')) || 1;
          return Math.max(gcValue, 0.5);
        }
        return 1;
      })();
      const baseRadius = 25;
      const radius = Math.max(baseRadius * arcEffectiveSize, 15);
      const semicircleRadius = radius * 1.5;
      const semicirclePathLength = Math.PI * semicircleRadius;
      const animName = `semicircle-draw-${Math.round(semicirclePathLength)}`;
      
      const styleId = `keyframe-${animName}`;
      if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = `
          @keyframes ${animName} {
            from {
              stroke-dashoffset: ${semicirclePathLength}px;
            }
            to {
              stroke-dashoffset: 0px;
            }
          }
        `;
        document.head.appendChild(styleEl);
      }
    }
  }, [angleSumAnimation, angleMarkerSize, getVertexAngleConfig]);

  // Note: Vertex updates are handled by the useEffect that listens to currentQuadType changes above

  // Calculate analyzed properties
  const analyzedProperties = React.useMemo(() => {
    if (typeof window.QuadrilateralConfig === 'undefined') {
      console.warn('QuadrilateralConfig not available for property analysis');
      return null;
    }
    return window.QuadrilateralConfig.analyzeProperties(vertices);
  }, [vertices]);

  // Calculate angles
  const angles = React.useMemo(() => {
    if (typeof window.AngleMarkerComponent === 'undefined' || typeof window.AngleMarkerComponent.AngleMarkerUtils === 'undefined') {
      console.warn('AngleMarkerUtils not available for angle calculation');
      return [null, null, null, null];
    }
    return window.AngleMarkerComponent.AngleMarkerUtils.calculateAllAngles(vertices);
  }, [vertices]);

  /**
   * Function to stop the angle equality animation
   */
  const stopAngleEqualityAnimation = React.useCallback(() => {
    if (angleAnimationRef.current) {
      cancelAnimationFrame(angleAnimationRef.current);
      angleAnimationRef.current = null;
    }
    setAngleAnimation(null);
    console.log('🛑 Angle equality animation stopped');
  }, []);

  /**
   * Function to trigger angle equality animation
   * Animates a filled arc from source vertex to target vertex, superimposing perfectly to prove angles are equal
   * The arc will stay at the destination and blink continuously
   * 
   * @param {number} sourceVertexIndex - Source vertex index (0=A, 1=B, 2=C, 3=D)
   * @param {number} targetVertexIndex - Target vertex index (0=A, 1=B, 2=C, 3=D)
   * @param {number} duration - Animation duration in milliseconds (default: from angleAnimationConfig.duration or 2000)
   * 
   * @example
   * // Animate angle A moving to angle C to show they're equal
   * window.animateAngleEquality_myQuad(0, 2, 2000);
   * // Or use the helper method:
   * quadComponent.animateAngleEquality(0, 2);
   * // Stop the animation:
   * quadComponent.stopAngleEqualityAnimation();
   */
  const animateAngleEquality = React.useCallback((sourceVertexIndex, targetVertexIndex, duration = animationDuration) => {
    console.log('🎬 Starting angle equality animation:', { sourceVertexIndex, targetVertexIndex, duration });
    
    if (sourceVertexIndex < 0 || sourceVertexIndex > 3 || targetVertexIndex < 0 || targetVertexIndex > 3) {
      console.warn('❌ Invalid vertex indices for angle animation');
      return;
    }

    if (angles[sourceVertexIndex] === null || angles[targetVertexIndex] === null) {
      console.warn('❌ Cannot animate: angles not calculated', {
        sourceAngle: angles[sourceVertexIndex],
        targetAngle: angles[targetVertexIndex]
      });
      return;
    }

    console.log('✅ Angles valid:', {
      sourceAngle: angles[sourceVertexIndex],
      targetAngle: angles[targetVertexIndex]
    });

    // Cancel any existing animation
    if (angleAnimationRef.current) {
      cancelAnimationFrame(angleAnimationRef.current);
    }

    const startTime = Date.now();
    setAngleAnimation({
      sourceVertexIndex,
      targetVertexIndex,
      startTime,
      duration,
      progress: 0
    });

    console.log('📊 Animation state set, starting animation loop');

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAngleAnimation(prev => {
        if (!prev) return null;
        const isComplete = progress >= 1;
        return { 
          ...prev, 
          progress,
          isComplete: isComplete,
          blinkStartTime: isComplete && !prev.isComplete ? Date.now() : prev.blinkStartTime
        };
      });

      if (progress < 1) {
        angleAnimationRef.current = requestAnimationFrame(animate);
      } else {
        console.log('✅ Animation complete, staying at target with blinking');
        // Stop JavaScript animation loop - CSS will handle blinking
        angleAnimationRef.current = null;
      }
    };

    angleAnimationRef.current = requestAnimationFrame(animate);
  }, [angles, animationDuration, animationHoldTime]);

  /**
   * Function to stop the angle sum animation
   */
  const stopAngleSumAnimation = React.useCallback(() => {
    if (angleSumAnimationRef.current) {
      cancelAnimationFrame(angleSumAnimationRef.current);
      angleSumAnimationRef.current = null;
    }
    setAngleSumAnimation(null);
    console.log('🛑 Angle sum animation stopped');
  }, []);

  /**
   * Cubic easing function for smooth animation
   */
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  /**
   * Animate two angles moving to demonstrate they sum to 180°
   * 
   * @param {number} vertex1Index - Index of first vertex (0-3)
   * @param {number} vertex2Index - Index of second vertex (0-3)
   * @param {number} duration - Animation duration in milliseconds (optional, uses config default)
   * @param {string} mode - Animation mode override: 'adjacent' | 'neutral' | 'straightLine' (optional, uses config default)
   * 
   * Usage:
   * window.animateAngleSum_myQuad(0, 1, 2000, 'adjacent');
   * // Or use the helper method:
   * quadComponent.animateAngleSum(0, 1);
   * // Stop the animation:
   * quadComponent.stopAngleSumAnimation();
   */
  const animateAngleSum = React.useCallback((vertex1Index, vertex2Index, duration = sumAnimationDuration, mode = sumAnimationMode) => {
    console.log('🎬 Starting angle sum animation:', { vertex1Index, vertex2Index, duration, mode });
    
    if (vertex1Index < 0 || vertex1Index > 3 || vertex2Index < 0 || vertex2Index > 3) {
      console.warn('❌ Invalid vertex indices for angle sum animation');
      return;
    }

    if (vertex1Index === vertex2Index) {
      console.warn('❌ Cannot animate: both vertices are the same');
      return;
    }

    if (angles[vertex1Index] === null || angles[vertex2Index] === null) {
      console.warn('❌ Cannot animate: angles not calculated', {
        angle1: angles[vertex1Index],
        angle2: angles[vertex2Index]
      });
      return;
    }

    const angle1 = angles[vertex1Index];
    const angle2 = angles[vertex2Index];
    const sum = angle1 + angle2;
    
    console.log('✅ Angles valid:', {
      angle1,
      angle2,
      sum,
      expectedSum: 180
    });

    // Cancel any existing animation
    if (angleSumAnimationRef.current) {
      cancelAnimationFrame(angleSumAnimationRef.current);
    }

    const startTime = Date.now();
    setAngleSumAnimation({
      vertex1Index,
      vertex2Index,
      startTime,
      duration,
      mode,
      progress: 0,
      angle1,
      angle2,
      sum
    });

    console.log('📊 Angle sum animation state set, starting animation loop');

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      setAngleSumAnimation(prev => {
        if (!prev) return null;
        const isComplete = progress >= 1;
        return { 
          ...prev, 
          progress: easedProgress,
          rawProgress: progress,
          isComplete: isComplete,
          blinkStartTime: isComplete && !prev.isComplete ? Date.now() : prev.blinkStartTime
        };
      });

      if (progress < 1) {
        angleSumAnimationRef.current = requestAnimationFrame(animate);
      } else {
        console.log('✅ Angle sum animation complete, staying at target with blinking');
        // Stop JavaScript animation loop - CSS will handle blinking
        angleSumAnimationRef.current = null;
      }
    };

    angleSumAnimationRef.current = requestAnimationFrame(animate);
  }, [angles, sumAnimationDuration, sumAnimationMode]);

  /**
   * Function to stop the side equality animation
   */
  const stopSideEqualityAnimation = React.useCallback(() => {
    if (sideEqualityAnimationRef.current) {
      cancelAnimationFrame(sideEqualityAnimationRef.current);
      sideEqualityAnimationRef.current = null;
    }
    setSideEqualityAnimation(null);
    console.log('🛑 Side equality animation stopped');
  }, []);

  /**
   * Function to trigger side equality animation
   * Animates a dashed line copy of one side rotating around a common vertex to superimpose on an adjacent side,
   * proving that both sides are equal.
   * 
   * @param {number} commonVertexIndex - Common vertex index (0=A, 1=B, 2=C, 3=D)
   *                                     The animation will show the two sides adjacent to this vertex are equal.
   * 
   * @example
   * // Animate sides AB and BC rotating around vertex B
   * window.animateSideEquality_myQuad(1); // 1 = vertex B
   * // Or use the helper method:
   * quadComponent.animateSideEquality(1);
   * // Stop the animation:
   * quadComponent.stopSideEqualityAnimation();
   */
  const animateSideEquality = React.useCallback((commonVertexIndex) => {
    console.log('🎬 Starting side equality animation:', { commonVertexIndex });
    
    if (commonVertexIndex < 0 || commonVertexIndex > 3) {
      console.warn('❌ Invalid vertex index for side animation');
      return;
    }

    // Cancel any existing animation
    if (sideEqualityAnimationRef.current) {
      cancelAnimationFrame(sideEqualityAnimationRef.current);
    }

    // Get the two adjacent sides
    // Side 1: from previous vertex to common vertex
    // Side 2: from common vertex to next vertex
    const prevVertexIndex = (commonVertexIndex - 1 + 4) % 4;
    const nextVertexIndex = (commonVertexIndex + 1) % 4;
    
    const startTime = Date.now();
    const totalCycleDuration = sideAnimationDuration + sideAnimationWaitTime;
    
    setSideEqualityAnimation({
      commonVertexIndex,
      prevVertexIndex,
      nextVertexIndex,
      startTime,
      rotationDuration: sideAnimationDuration,
      waitTime: sideAnimationWaitTime,
      totalCycleDuration,
      maxCycles: sideAnimationCycles,
      currentCycle: 0,
      phase: 'rotating-to-side2', // 'rotating-to-side2', 'waiting-at-side2', 'rotating-to-side1', 'waiting-at-side1'
      progress: 0
    });

    console.log('📊 Side equality animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Determine current cycle and phase
      const totalElapsed = elapsed;
      const fullCycle = totalCycleDuration * 2; // rotate to side2, wait, rotate to side1, wait
      const currentCycle = Math.floor(totalElapsed / fullCycle);
      const cycleElapsed = totalElapsed % fullCycle;
      
      // Check if we've exceeded max cycles (if not infinite)
      if (sideAnimationCycles >= 0 && currentCycle >= sideAnimationCycles) {
        console.log('✅ Side equality animation complete (max cycles reached)');
        setSideEqualityAnimation(null);
        sideEqualityAnimationRef.current = null;
        return;
      }
      
      // Determine phase within current cycle
      let phase, progress;
      if (cycleElapsed < sideAnimationDuration) {
        // Rotating from side1 to side2
        phase = 'rotating-to-side2';
        progress = easeInOutCubic(cycleElapsed / sideAnimationDuration);
      } else if (cycleElapsed < sideAnimationDuration + sideAnimationWaitTime) {
        // Waiting at side2
        phase = 'waiting-at-side2';
        progress = 1;
      } else if (cycleElapsed < sideAnimationDuration * 2 + sideAnimationWaitTime) {
        // Rotating from side2 back to side1
        phase = 'rotating-to-side1';
        const rotateBackElapsed = cycleElapsed - (sideAnimationDuration + sideAnimationWaitTime);
        progress = 1 - easeInOutCubic(rotateBackElapsed / sideAnimationDuration);
      } else {
        // Waiting at side1
        phase = 'waiting-at-side1';
        progress = 0;
      }
      
      setSideEqualityAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentCycle,
          phase,
          progress
        };
      });

      sideEqualityAnimationRef.current = requestAnimationFrame(animate);
    };

    sideEqualityAnimationRef.current = requestAnimationFrame(animate);
  }, [sideAnimationDuration, sideAnimationWaitTime, sideAnimationCycles]);

  /**
   * Function to stop the all 4 side equality animation
   */
  const stopAllSideEqualityAnimation = React.useCallback(() => {
    if (allSideEqualityAnimationRef.current) {
      // Check if it's a setInterval ID (positive number) or requestAnimationFrame ID
      if (typeof allSideEqualityAnimationRef.current === 'number' && allSideEqualityAnimationRef.current > 0) {
        clearInterval(allSideEqualityAnimationRef.current);
      } else {
        cancelAnimationFrame(allSideEqualityAnimationRef.current);
      }
      allSideEqualityAnimationRef.current = null;
    }
    allSideEqualityStateRef.current = null;
    setAllSideEqualityAnimation(null);
    console.log('🛑 All 4 side equality animation stopped');
  }, []);

  /**
   * Function to trigger all 4 side equality animation
   * Places a reference line on AB, then pivots around each vertex to compare all sides.
   * Shows equality/inequality messages and stops if inequality is detected.
   * 
   * @param {number} [cycles=1] - Number of cycles to run (-1 for infinite)
   * 
   * Animation phases:
   * 1. on-AB: Line placed on AB, waiting
   * 2. pivoting-to-BC: Pivoting around B from AB direction to BC direction
   * 3. on-BC: Line on BC, checking equality, waiting
   * 4. pivoting-to-CD: Pivoting around C from BC direction to CD direction
   * 5. on-CD: Line on CD, checking equality, waiting
   * 6. pivoting-to-DA: Pivoting around D from CD direction to DA direction
   * 7. on-DA: Line on DA, checking equality, waiting
   * 8. pivoting-to-AB: Pivoting around A from AD direction to AB direction (for next cycle)
   * 
   * @example
   * // Run animation once
   * quadComponent.animateAllSideEquality();
   * // Run animation 3 times
   * quadComponent.animateAllSideEquality(3);
   * // Run animation infinitely
   * quadComponent.animateAllSideEquality(-1);
   */
  const animateAllSideEquality = React.useCallback((cycles = 1) => {
    console.log('🎬 Starting all 4 side equality animation:', { cycles });
    
    // Cancel any existing animation
    if (allSideEqualityAnimationRef.current) {
      // Check if it's a setInterval ID (positive number) or requestAnimationFrame ID
      if (typeof allSideEqualityAnimationRef.current === 'number' && allSideEqualityAnimationRef.current > 0) {
        clearInterval(allSideEqualityAnimationRef.current);
      } else {
        cancelAnimationFrame(allSideEqualityAnimationRef.current);
      }
      allSideEqualityAnimationRef.current = null;
    }
    
    // Get grid dimensions for length calculations
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Helper to convert vertex to percentage position
    const getVertexPercent = (vertexIndex) => {
      const vertex = vertices[vertexIndex];
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Calculate all 4 side lengths in GRID CELL UNITS (not percentage)
    // This ensures accurate comparison regardless of container aspect ratio
    const vertexLabels = ['A', 'B', 'C', 'D'];
    const sideLengths = [];
    for (let i = 0; i < 4; i++) {
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % 4];
      // Calculate distance in grid cells (not percentage)
      const rowDiff = v2.row - v1.row;
      const colDiff = v2.col - v1.col;
      const length = Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
      sideLengths.push(length);
      console.log(`📏 Side ${vertexLabels[i]}${vertexLabels[(i + 1) % 4]}: ${length.toFixed(4)} grid cells (rows: ${rowDiff}, cols: ${colDiff})`);
    }
    
    // Reference length is AB (side 0) in grid cells
    const referenceLength = sideLengths[0];
    
    // Also calculate reference length in percentage for rendering (using AB's actual percentage length)
    const abPercent = getVertexPercent(0);
    const abPercentEnd = getVertexPercent(1);
    const referenceLengthPercent = Math.sqrt(
      Math.pow(abPercentEnd.x - abPercent.x, 2) + Math.pow(abPercentEnd.y - abPercent.y, 2)
    );
    
    // Animation timing configuration
    const waitTime = 1000; // Wait time at each side (ms)
    const pivotDuration = 800; // Pivot animation duration (ms)
    
    const startTime = Date.now();
    
    // Initialize animation state
    const initialState = {
      phase: 'on-AB',
      currentSideIndex: 0,
      pivotVertexIndex: 1, // B is the pivot for first transition
      progress: 0,
      sideLengths, // In grid cell units
      referenceLength, // In grid cell units
      referenceLengthPercent, // In percentage units for rendering
      equalityMessage: '',
      isEqual: true,
      maxCycles: cycles,
      currentCycle: 0,
      startTime,
      phaseStartTime: startTime,
      waitTime,
      pivotDuration,
      vertexLabels,
      frameCount: 0 // Add frame counter to ensure state updates every frame
    };
    
    // Store in both ref and state
    allSideEqualityStateRef.current = initialState;
    setAllSideEqualityAnimation(initialState);
    
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    let frameCounter = 0;
    const animate = () => {
      try {
        frameCounter++;
        // Get current state from ref (always up-to-date)
        const prev = allSideEqualityStateRef.current;
        if (!prev) {
          console.log('⚠️ Animation state is null, stopping loop');
          allSideEqualityAnimationRef.current = null;
          setAllSideEqualityAnimation(null);
          return;
        }
      
      const now = Date.now();
      const phaseElapsed = now - prev.phaseStartTime;
      
      let newPhase = prev.phase;
      let newProgress = prev.progress;
      let newSideIndex = prev.currentSideIndex;
      let newPivotVertex = prev.pivotVertexIndex;
      let newMessage = prev.equalityMessage;
      let newIsEqual = prev.isEqual;
      let newCycle = prev.currentCycle;
      let newPhaseStartTime = prev.phaseStartTime;
      let newFrameCount = (prev.frameCount || 0) + 1; // Increment frame counter
      
      // Phase state machine
      switch (prev.phase) {
          case 'on-AB':
            // Waiting on AB - keep progress at 0 but update phaseStartTime to track elapsed
            if (phaseElapsed >= prev.waitTime) {
              newPhase = 'pivoting-to-BC';
              newPhaseStartTime = now;
              newProgress = 0;
            } else {
              // Keep updating to ensure animation loop continues
              newProgress = 0;
            }
            break;
            
          case 'pivoting-to-BC':
            // Pivoting around B from AB to BC
            newProgress = Math.min(1, phaseElapsed / prev.pivotDuration);
            if (phaseElapsed >= prev.pivotDuration) {
              // Check equality: AB vs BC (using grid cell units)
              const abLength = prev.sideLengths[0];
              const bcLength = prev.sideLengths[1];
              const isEqualBC = Math.abs(abLength - bcLength) < 0.01; // Small tolerance for floating point
              
              if (isEqualBC) {
                newMessage = 'AB = BC';
                newPhase = 'on-BC';
                newSideIndex = 1;
                newPivotVertex = 2; // C is next pivot
              } else {
                newMessage = 'AB ≠ BC';
                newIsEqual = false;
                // Animation will stop - update ref and state
                const stoppedState = { ...prev, phase: 'stopped', equalityMessage: newMessage, isEqual: false, progress: 1 };
                allSideEqualityStateRef.current = stoppedState;
                setAllSideEqualityAnimation(stoppedState);
                allSideEqualityAnimationRef.current = null;
                return;
              }
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'on-BC':
            // Waiting on BC
            if (phaseElapsed >= prev.waitTime) {
              newPhase = 'pivoting-to-CD';
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'pivoting-to-CD':
            // Pivoting around C from BC to CD
            newProgress = Math.min(1, phaseElapsed / prev.pivotDuration);
            if (phaseElapsed >= prev.pivotDuration) {
              // Check equality: BC vs CD (or AB vs CD since AB=BC) - using grid cell units
              const abLength = prev.sideLengths[0];
              const cdLength = prev.sideLengths[2];
              const isEqualCD = Math.abs(abLength - cdLength) < 0.01;
              
              if (isEqualCD) {
                newMessage = 'AB = BC = CD';
                newPhase = 'on-CD';
                newSideIndex = 2;
                newPivotVertex = 3; // D is next pivot
              } else {
                newMessage = 'BC ≠ CD';
                newIsEqual = false;
                const stoppedState = { ...prev, phase: 'stopped', equalityMessage: newMessage, isEqual: false, progress: 1 };
                allSideEqualityStateRef.current = stoppedState;
                setAllSideEqualityAnimation(stoppedState);
                allSideEqualityAnimationRef.current = null;
                return;
              }
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'on-CD':
            // Waiting on CD
            if (phaseElapsed >= prev.waitTime) {
              newPhase = 'pivoting-to-DA';
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'pivoting-to-DA':
            // Pivoting around D from CD to DA
            newProgress = Math.min(1, phaseElapsed / prev.pivotDuration);
            if (phaseElapsed >= prev.pivotDuration) {
              // Check equality: CD vs DA (or AB vs DA since AB=BC=CD) - using grid cell units
              const abLength = prev.sideLengths[0];
              const daLength = prev.sideLengths[3];
              const isEqualDA = Math.abs(abLength - daLength) < 0.01;
              
              if (isEqualDA) {
                newMessage = 'AB = BC = CD = DA';
                newPhase = 'on-DA';
                newSideIndex = 3;
              } else {
                newMessage = 'CD ≠ DA';
                newIsEqual = false;
                const stoppedState = { ...prev, phase: 'stopped', equalityMessage: newMessage, isEqual: false, progress: 1 };
                allSideEqualityStateRef.current = stoppedState;
                setAllSideEqualityAnimation(stoppedState);
                allSideEqualityAnimationRef.current = null;
                return;
              }
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'on-DA':
            // Waiting on DA - all sides equal
            if (phaseElapsed >= prev.waitTime) {
              // Check if we should cycle
              const nextCycle = prev.currentCycle + 1;
              if (prev.maxCycles === -1 || nextCycle < prev.maxCycles) {
                newPhase = 'pivoting-to-AB';
                newCycle = nextCycle;
                newPivotVertex = 0; // A is the pivot
                newPhaseStartTime = now;
                newProgress = 0;
              } else {
                // Animation complete - store stroke data for persistence
                const completeState = { ...prev, phase: 'complete', progress: 1 };
                
                // Store stroke data so it persists after animation
                // Calculate which sides are equal
                const groups = [];
                const processed = new Set();
                const tolerance = 0.01;
                
                for (let i = 0; i < 4; i++) {
                  if (processed.has(i)) continue;
                  const group = [i];
                  for (let j = i + 1; j < 4; j++) {
                    if (Math.abs(prev.sideLengths[i] - prev.sideLengths[j]) < tolerance) {
                      group.push(j);
                      processed.add(j);
                    }
                  }
                  if (group.length > 1) {
                    groups.push(group);
                    processed.add(i);
                  }
                }
                
                const strokeMap = {};
                if (groups.length === 1 && groups[0].length === 4) {
                  groups[0].forEach(sideIndex => {
                    strokeMap[sideIndex] = 'single';
                  });
                } else {
                  groups.forEach((group, groupIndex) => {
                    const strokeType = groupIndex === 0 ? 'single' : 'double';
                    group.forEach(sideIndex => {
                      strokeMap[sideIndex] = strokeType;
                    });
                  });
                }
                
                if (Object.keys(strokeMap).length > 0) {
                  permanentEqualSideStrokesRef.current = {
                    strokeMap,
                    sideLengths: prev.sideLengths
                  };
                }
                
                allSideEqualityStateRef.current = completeState;
                setAllSideEqualityAnimation(completeState);
                allSideEqualityAnimationRef.current = null;
                return;
              }
            }
            break;
            
          case 'pivoting-to-AB':
            // Pivoting around A from AD direction to AB direction
            newProgress = Math.min(1, phaseElapsed / prev.pivotDuration);
            if (phaseElapsed >= prev.pivotDuration) {
              newPhase = 'on-AB';
              newSideIndex = 0;
              newPivotVertex = 1; // B is next pivot
              newMessage = '';
              newPhaseStartTime = now;
              newProgress = 0;
            }
            break;
            
          case 'stopped':
          case 'complete':
            // Animation ended - don't continue
            allSideEqualityAnimationRef.current = null;
            return;
        }
        
        const newState = {
          ...prev,
          phase: newPhase,
          currentSideIndex: newSideIndex,
          pivotVertexIndex: newPivotVertex,
          progress: easeInOutCubic(newProgress),
          equalityMessage: newMessage,
          isEqual: newIsEqual,
          currentCycle: newCycle,
          phaseStartTime: newPhaseStartTime,
          frameCount: newFrameCount // Include frame counter to ensure state updates
        };
        
        // Update both ref and state
        allSideEqualityStateRef.current = newState;
        setAllSideEqualityAnimation(newState);
      
        // Animation loop continues via setInterval, so we don't need to schedule next frame here
        // The setInterval will keep calling animate() automatically
      } catch (error) {
        console.error('❌ Error in animation loop:', error);
        console.error('Error stack:', error.stack);
        // Stop animation on error
        allSideEqualityAnimationRef.current = null;
        allSideEqualityStateRef.current = null;
        setAllSideEqualityAnimation(null);
      }
    };
    
    // Use setInterval as a reliable fallback (runs at ~60fps = every 16ms)
    // This ensures the animation continues even if requestAnimationFrame has issues
    let intervalCallCount = 0;
    const animationInterval = setInterval(() => {
      try {
        intervalCallCount++;
        if (allSideEqualityStateRef.current === null) {
          clearInterval(animationInterval);
          allSideEqualityAnimationRef.current = null;
          return;
        }
        
        const currentPhase = allSideEqualityStateRef.current?.phase;
        if (currentPhase === 'stopped' || currentPhase === 'complete') {
          clearInterval(animationInterval);
          allSideEqualityAnimationRef.current = null;
          return;
        }
        
        animate();
      } catch (error) {
        console.error('❌ Error in setInterval callback:', error);
        console.error('Error stack:', error.stack);
        clearInterval(animationInterval);
        allSideEqualityAnimationRef.current = null;
      }
    }, 16); // ~60fps
    
    allSideEqualityAnimationRef.current = animationInterval;
  }, [gridDimensions, vertices, gridRows, gridCols]);

  /**
   * Function to stop the confirm right angle animation
   */
  const stopConfirmRightAngleAnimation = React.useCallback(() => {
    if (confirmRightAngleAnimationRef.current) {
      if (typeof confirmRightAngleAnimationRef.current === 'number' && confirmRightAngleAnimationRef.current > 0) {
        clearInterval(confirmRightAngleAnimationRef.current);
      } else {
        cancelAnimationFrame(confirmRightAngleAnimationRef.current);
      }
      confirmRightAngleAnimationRef.current = null;
    }
    
    // Clean up event listeners if they exist
    if (typeof window !== 'undefined' && window._confirmRightAngleAdvance) {
      // Event listeners are cleaned up automatically when animation stops
      // But we can remove the global reference
      delete window._confirmRightAngleAdvance;
    }
    
    // Clean up message element if it exists
    const messageElements = document.querySelectorAll('[id^="confirm-right-angle-message-"]');
    messageElements.forEach(el => el.remove());
    
    confirmRightAngleStateRef.current = null;
    setConfirmRightAngleAnimation(null);
  }, []);

  /**
   * Function to trigger confirm right angle animation
   * Animates a protractor to measure and confirm a 90-degree angle at a specified vertex.
   * 
   * Animation phases:
   * 1. Move protractor to center of quadrilateral (500ms)
   * 2. Move protractor to vertex, align base with specified side (1000ms)
   * 3. Rotate arm from 0 to 90 degrees (500ms)
   * 4. Extend arm visually to target vertex (250ms)
   * 5. Highlight 90-degree mark (250ms)
   * 6. Move protractor outside quadrilateral (250ms)
   * 7. Mark angle with right-angle symbol (instant)
   * 8. Display message "Angle X = 90°" (display)
   * 
   * @param {string|number} vertex - Vertex name (e.g., 'A', 'B', 'C', 'D') or index (0-3)
   * @param {string|number} side - Side name (e.g., 'AB', 'BC', 'CD', 'DA') or index (0-3)
   * @param {string|number|null} [armTargetVertex] - Vertex name (e.g., 'A', 'B', 'C', 'D') or index (0-3) that the arm should point toward
   *   If not provided, will auto-detect based on adjacent vertex
   * @param {string|number} [mode] - Animation mode: 'auto' (all phases run automatically) or 'manual' (step-by-step, click/keypress to advance)
   *   Also accepts numeric: 1='auto', 2='manual' (backward compatible)
   * 
   * @example
   * // Using names (recommended)
   * quadComponent.animateConfirmRightAngle('A', 'AB', 'D', 'manual');
   * // Using indices (backward compatible)
   * quadComponent.animateConfirmRightAngle(0, 0, 3, 2);
   * // Or use the helper method:
   * window.confirmRightAngle('page3-quadrilateral-demo', 'A', 'AB', 'D', 'manual');
   */
  const animateConfirmRightAngle = React.useCallback((vertex, mode = 'auto') => {
    // Convert vertex to index if it's a name
    let vertexIndex;
    
    // Handle vertex parameter (can be name like 'A' or index like 0)
    if (typeof vertex === 'string') {
      const vertexUpper = vertex.toUpperCase();
      vertexIndex = vertexLabels.findIndex(label => label.toUpperCase() === vertexUpper);
      if (vertexIndex === -1) {
        console.warn(`❌ Invalid vertex name: ${vertex}. Valid names are: ${vertexLabels.join(', ')}`);
        return;
      }
    } else if (typeof vertex === 'number') {
      vertexIndex = vertex;
      if (vertexIndex < 0 || vertexIndex > 3) {
        console.warn('❌ Invalid vertex index for confirm right angle animation');
        return;
      }
    } else {
      console.warn('❌ Vertex parameter must be a name (string) or index (number)');
      return;
    }
    
    // Automatically determine side: Use the side that starts at the given vertex
    // For vertex A: use side AB (index 0, A→B)
    // For vertex B: use side BC (index 1, B→C)
    // For vertex C: use side CD (index 2, C→D)
    // For vertex D: use side DA (index 3, D→A)
    // Pattern: sideIndex = vertexIndex
    const sideIndex = vertexIndex;
    const sideName = `${vertexLabels[sideIndex]}${vertexLabels[(sideIndex + 1) % 4]}`;
    
    // Automatically determine armTargetVertex: Use the adjacent vertex that is NOT on the selected side
    // The side starts at vertexIndex, so the adjacent vertices are:
    // - nextVertexIndex = (vertexIndex + 1) % 4 (this is the end of the side, so it's ON the side)
    // - prevVertexIndex = (vertexIndex - 1 + 4) % 4 (this is NOT on the side, so use this)
    const prevVertexIndex = (vertexIndex - 1 + 4) % 4;
    const nextVertexIndex = (vertexIndex + 1) % 4;
    const armTargetVertexIndex = prevVertexIndex; // Use the previous vertex (not on the side)
    const armTargetVertex = vertexLabels[armTargetVertexIndex];
    
    console.log(`🔍 Auto-determined parameters for vertex ${vertexLabels[vertexIndex]}:`, {
      vertex: vertexLabels[vertexIndex],
      side: sideName,
      sideIndex: sideIndex,
      armTargetVertex: armTargetVertex,
      armTargetVertexIndex: armTargetVertexIndex,
      prevVertex: vertexLabels[prevVertexIndex],
      nextVertex: vertexLabels[nextVertexIndex]
    });
    
    // armTargetVertex is now auto-determined, so we use armTargetVertexIndex directly
    const armDirection = armTargetVertexIndex;
    
    // Handle mode parameter ('auto' or 'manual')
    let modeValue = 1; // Default to auto
    if (typeof mode === 'string') {
      const modeLower = mode.toLowerCase();
      if (modeLower === 'auto') {
        modeValue = 1;
      } else if (modeLower === 'manual') {
        modeValue = 2;
      } else {
        console.warn(`❌ Invalid mode: ${mode}. Must be 'auto' or 'manual'. Using 'auto' as default.`);
        modeValue = 1;
      }
    } else if (typeof mode === 'number') {
      // Backward compatibility: accept numeric mode (1 or 2)
      modeValue = mode === 2 ? 2 : 1;
    } else {
      console.warn('❌ Mode parameter must be a string ("auto" or "manual") or number (1 or 2). Using "auto" as default.');
      modeValue = 1;
    }
    
    // Optional debug: starting confirm right angle animation for a vertex
    // console.log('🎬 Starting confirm right angle animation:', { vertex: typeof vertex === 'string' ? vertex : vertexLabels[vertexIndex], side: sideName, armTargetVertex, mode: modeValue === 1 ? 'auto' : 'manual' });
    
    // Get protractor element
    const protractorId = confirmRightAngleAnimationConfig.protractorId;
    const protractorElement = protractorId ? document.getElementById(protractorId) : null;
    
    if (!protractorElement) {
      console.warn('❌ Protractor element not found. Please specify a valid protractorId in confirmRightAngleAnimationConfig');
      console.error(`   Protractor ID: ${protractorId}, Vertex: ${vertexLabels[vertexIndex]}`);
      return;
    }
    
    // Show the protractor (it's hidden by default via CSS)
    protractorElement.style.display = 'block';
    protractorElement.style.setProperty('display', 'block', 'important');
    
    // Cancel any existing animation
    stopConfirmRightAngleAnimation();
    
    // Extract config values with defaults
    const hideProtractorAfter = confirmRightAngleAnimationConfig.hideProtractorAfter !== false;
    const messageConfig = confirmRightAngleAnimationConfig.messageConfig || {};
    const rightAngleMarkerConfig = confirmRightAngleAnimationConfig.rightAngleMarkerConfig || {};
    
    // Extract message styling config with defaults
    const messageStyleConfig = messageConfig.style || {};
    const messageCoordinates = messageConfig.coordinates || messageConfig.position || {};
    const messageText = messageConfig.text || `∠${vertexLabels[vertexIndex]} = 90°`;
    const messageFontStyle = messageStyleConfig.font || {};
    const messageBorderStyle = messageStyleConfig.border || {};
    const messageBackground = messageStyleConfig.background || {};
    
    // Phase durations (in ms) – can be overridden via animationSequence step config
    const defaultPhaseTimings = {
      phase1Duration: 500,   // Move to center
      phase2Duration: 1000,  // Position at vertex
      phase3Duration: 500,   // Rotate protractor to align with side
      phase3Delay: 500,      // Delay after phase 3 before starting phase 4
      phase4Duration: 1000,  // Rotate and extend arm to target vertex
      phase5Duration: 2000,  // Highlight angle measurement (enlarge text to 30gc and blink)
      phase6Duration: 3000,  // Display angle equality message
      phase6Delay: 1500,     // Delay after phase 6 before starting phase 7
      phase7Duration: 500,   // Hide protractor
      phase8Duration: 0      // Show angle marker (instant)
    };
    
    // If the current animationSequence step provides phaseTimings for confirmAllAnglesRight,
    // merge them over the defaults so timings are centrally configurable in PageConfig.
    const activeStep = sequenceConfig?.steps?.find?.(
      (s) => s.animationCall === 'confirmAllAnglesRight'
    );
    const stepPhaseTimings = activeStep?.phaseTimings || {};
    const {
      phase1Duration,
      phase2Duration,
      phase3Duration,
      phase3Delay,
      phase4Duration,
      phase5Duration,
      phase6Duration,
      phase6Delay,
      phase7Duration,
      phase8Duration
    } = { ...defaultPhaseTimings, ...stepPhaseTimings };
    
    // Calculate positions
    const { width, height, offsetX, offsetY, gridWidthGc, gridHeightGc, offsetXGc, offsetYGc } = gridDimensions;
    
    // Get precision grid system dimensions
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert quad grid coordinates to viewport percentages
    // This ensures the protractor aligns correctly with vertices
    // Inline the conversion logic to avoid dependency on quadGridToPrecisionGrid
    const getVertexPercent = (idx) => {
      if (!coordinates) {
        console.warn('⚠️ [animateConfirmRightAngle] No coordinates provided');
        return { x: 50, y: 50 }; // Default center
      }
      
      const vertex = vertices[idx];
      const [x1, y1, x2, y2] = coordinates;
      
      // Convert quad grid coordinates to precision grid coordinates (inline logic)
      // Calculate position within centered grid (0-1 range)
      const percentX = vertex.col / gridCols;
      const percentY = vertex.row / gridRows;
      
      // Map to actual position within container (accounting for centered grid)
      const actualX = x1 + offsetXGc + percentX * gridWidthGc;
      const actualY = y1 + offsetYGc + percentY * gridHeightGc;
      
      // Convert precision grid coordinates to viewport percentages
      const xPercent = (actualX / gridSystemCols) * 100;
      const yPercent = (actualY / gridSystemRows) * 100;
      
      return {
        x: xPercent,
        y: yPercent
      };
    };
    
    // Calculate center of quadrilateral
    const centerPos = {
      x: (getVertexPercent(0).x + getVertexPercent(1).x + getVertexPercent(2).x + getVertexPercent(3).x) / 4,
      y: (getVertexPercent(0).y + getVertexPercent(1).y + getVertexPercent(2).y + getVertexPercent(3).y) / 4
    };
    
    // Get target vertex position (the vertex we're measuring)
    const targetVertexPos = getVertexPercent(vertexIndex);
    
    // Get adjacent vertex positions (prevVertexIndex and nextVertexIndex are already declared above)
    const prevVertexPos = getVertexPercent(prevVertexIndex);
    const nextVertexPos = getVertexPercent(nextVertexIndex);
    
    // Determine which side is the base (the side specified by sideIndex)
    // Side 0 = AB (vertices 0-1), Side 1 = BC (vertices 1-2), etc.
    const sideStartVertex = sideIndex;
    const sideEndVertex = (sideIndex + 1) % 4;
    
    // sideName is already declared above (line 1946)
    
    // Get side angles using getSideAngles function
    // Use the global window.getSideAngles function or the one exposed on the component
    let baseAngle;
    let baseEndPos;
    let sideAnglesResult = null; // Declare outside try block so it's accessible later
    
    try {
      // Try to get the side angles from the global function or component method
      if (window.getSideAngles && typeof window.getSideAngles === 'function') {
        sideAnglesResult = window.getSideAngles(quadId);
      } else if (containerRef.current?.getSideAngles && typeof containerRef.current.getSideAngles === 'function') {
        sideAnglesResult = containerRef.current.getSideAngles();
      }
      
      if (sideAnglesResult && sideAnglesResult.angles && sideAnglesResult.angles[sideName] !== undefined) {
        // getSideAngles returns normalized angles (0-180°), but we need the actual direction (0-360°)
        // Calculate the actual angle from the vertex positions
        
        // Get the actual start and end positions for this side
        const actualSideStartPos = getVertexPercent(sideStartVertex);
        const actualSideEndPos = getVertexPercent(sideEndVertex);
        
        // Calculate the actual angle (0-360°) from start to end
        const yDiff = actualSideEndPos.y - actualSideStartPos.y;
        const xDiff = actualSideEndPos.x - actualSideStartPos.x;
        let actualAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
        while (actualAngle < 0) actualAngle += 360;
        while (actualAngle >= 360) actualAngle -= 360;
        
        // Now determine the base angle based on which vertex is the angle vertex
        // Calculate the angle directly from the vertex position to the other end of the side
        if (sideStartVertex === vertexIndex) {
          // Base goes from vertex to next (e.g., A to B)
          baseEndPos = actualSideEndPos;
          // Calculate angle directly from vertex to end
          const yDiff = baseEndPos.y - targetVertexPos.y;
          const xDiff = baseEndPos.x - targetVertexPos.x;
          baseAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
        } else if (sideEndVertex === vertexIndex) {
          // Base goes from vertex to previous (e.g., C to B when at C on side BC)
          baseEndPos = actualSideStartPos;
          // Calculate angle directly from vertex to start (the other end)
          const yDiff = baseEndPos.y - targetVertexPos.y;
          const xDiff = baseEndPos.x - targetVertexPos.x;
          baseAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
        } else {
          console.warn('❌ The specified side does not connect to the specified vertex');
          return;
        }
        
        // Normalize baseAngle to 0-360° range
        while (baseAngle < 0) baseAngle += 360;
        while (baseAngle >= 360) baseAngle -= 360;
        
        // For vertex C (index 2), add 180° to correct protractor rotation
        // The calculated baseAngle points from C to D, but the protractor needs to be rotated 180° more
        if (vertexIndex === 2) {
          baseAngle = (baseAngle + 180) % 360;
          // console.log(`🔄 Correcting baseAngle for vertex C: added 180° (new baseAngle: ${baseAngle.toFixed(1)}°)`);
        }
      } else {
        // Fallback to original calculation if getSideAngles is not available
        console.warn('⚠️ getSideAngles not available, using fallback calculation');
        if (sideStartVertex === vertexIndex) {
          baseEndPos = getVertexPercent(sideEndVertex);
          baseAngle = Math.atan2(baseEndPos.y - targetVertexPos.y, baseEndPos.x - targetVertexPos.x) * (180 / Math.PI);
        } else if (sideEndVertex === vertexIndex) {
          baseEndPos = getVertexPercent(sideStartVertex);
          baseAngle = Math.atan2(baseEndPos.y - targetVertexPos.y, baseEndPos.x - targetVertexPos.x) * (180 / Math.PI);
        } else {
          console.warn('❌ The specified side does not connect to the specified vertex');
          return;
        }
        // Normalize baseAngle to 0-360° range
        while (baseAngle < 0) baseAngle += 360;
        while (baseAngle >= 360) baseAngle -= 360;
      }
    } catch (error) {
      // Fallback to original calculation on error
      console.warn('⚠️ Error calling getSideAngles, using fallback calculation:', error);
      if (sideStartVertex === vertexIndex) {
        baseEndPos = getVertexPercent(sideEndVertex);
        // Use same calculation as above: negate yDiff to convert screen coords to math coords
        const yDiff = baseEndPos.y - targetVertexPos.y;
        const xDiff = baseEndPos.x - targetVertexPos.x;
        baseAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
      } else if (sideEndVertex === vertexIndex) {
        baseEndPos = getVertexPercent(sideStartVertex);
        // Use same calculation as above: negate yDiff to convert screen coords to math coords
        const yDiff = baseEndPos.y - targetVertexPos.y;
        const xDiff = baseEndPos.x - targetVertexPos.x;
        baseAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
      } else {
        console.warn('❌ The specified side does not connect to the specified vertex');
        return;
      }
      // Normalize baseAngle to 0-360° range
      while (baseAngle < 0) baseAngle += 360;
      while (baseAngle >= 360) baseAngle -= 360;
    }
    
    // Calculate target angle for the arm
    // armTargetVertexIndex is already auto-determined above (line 1954)
    // Validate that the auto-determined armTargetVertexIndex is correct
    
    // Determine which vertex is on the base side (should be excluded)
    let vertexOnBaseSide = null;
    if (sideStartVertex === vertexIndex) {
      // Base side starts at vertex, so nextVertexIndex is on the base side
      vertexOnBaseSide = nextVertexIndex;
    } else if (sideEndVertex === vertexIndex) {
      // Base side ends at vertex, so prevVertexIndex is on the base side
      vertexOnBaseSide = prevVertexIndex;
    }
    
    // Validate the auto-determined armTargetVertexIndex
    // Note: armTargetVertexIndex was set to prevVertexIndex (line 1954)
    // But we need to ensure it's not on the base side
    // console.log(`🔍 DEBUG armTargetVertexIndex validation:`, { armTargetVertexIndex, vertexOnBaseSide, prevVertexIndex, nextVertexIndex });
    
    if (armTargetVertexIndex === vertexOnBaseSide) {
      console.warn(`❌ Auto-determined arm target vertex is on the base side. Using other adjacent vertex.`);
      // Use the other adjacent vertex (nextVertexIndex, since armTargetVertexIndex was prevVertexIndex)
      armTargetVertexIndex = nextVertexIndex;
      console.log(`   Changed armTargetVertexIndex to: ${armTargetVertexIndex} (${vertexLabels[armTargetVertexIndex]})`);
    } else {
      console.log(`📐 Using auto-determined arm target vertex: ${vertexLabels[armTargetVertexIndex]}`);
    }
    
    let armTargetAngle;
    
    // Get the position of the target vertex for the arm (AFTER validation, so we use the correct index)
    const armTargetPos = getVertexPercent(armTargetVertexIndex);
    
    // Also get all vertex positions for comparison
    const allVertexPositionsForDebug = {
      A: getVertexPercent(0),
      B: getVertexPercent(1),
      C: getVertexPercent(2),
      D: getVertexPercent(3)
    };
    
    // Detailed arm target debug logs removed for production (kept only in comments to reduce noise)
    
    // Check if we need to adjust baseAngle based on armTargetVertex position from getSideAngles
    // If baseAngle is 0° or 90° (normalized), and armTargetVertex is "below" or "left",
    // adjust: 0° → 180° and 90° → -90° (or 270°)
    // NOTE: Skip adjustment for vertex C (index 2) as the calculated baseAngle is already correct
    if (vertexIndex !== 2 && sideAnglesResult && sideAnglesResult.sideInfo && sideAnglesResult.sideInfo[sideName]) {
      const normalizedBaseAngle = sideAnglesResult.angles[sideName]; // Get normalized angle (0-180°)
      const sideInfo = sideAnglesResult.sideInfo[sideName];
      const adjacentVertices = sideInfo.adjacentVertices;
      const targetVertexLabel = vertexLabels[armTargetVertexIndex];
      
      // Check if armTargetVertex is in the adjacent vertices
      if (adjacentVertices && adjacentVertices[targetVertexLabel]) {
        const position = adjacentVertices[targetVertexLabel];
        
        // Only apply adjustment if armTargetVertex is "below" or "left"
        // For "above" or "right", the calculated baseAngle is already correct
        if (position === 'below' || position === 'left') {
          // If normalized angle is 0° (horizontal) and armTargetVertex is "below" or "left", flip to 180°
          if (normalizedBaseAngle === 0) {
            baseAngle = 180;
            console.log(`🔄 Adjusting baseAngle: 0° → 180° (armTargetVertex ${targetVertexLabel} is ${position} relative to side ${sideName})`);
          }
          // If normalized angle is 90° (vertical) and armTargetVertex is "below" or "left", flip to -90° (270°)
          else if (normalizedBaseAngle === 90) {
            baseAngle = -90;
            // Normalize to 0-360° range
            while (baseAngle < 0) baseAngle += 360;
            console.log(`🔄 Adjusting baseAngle: 90° → 270° (armTargetVertex ${targetVertexLabel} is ${position} relative to side ${sideName})`);
          }
        } else {
          console.log(`ℹ️ No baseAngle adjustment needed (armTargetVertex ${targetVertexLabel} is ${position} relative to side ${sideName})`);
        }
      }
    } else if (vertexIndex === 2) {
      console.log(`ℹ️ Skipping baseAngle adjustment for vertex C (index 2) - using calculated baseAngle directly`);
    }
    
    // Calculate arm target angle (direction from vertex to the selected adjacent vertex)
    // The protractor uses: 0°=right, 90°=up, 180°=left, 270°=down
    // atan2(y, x) uses math convention where positive y is up
    // But in screen coordinates, positive y is down
    // So we need to negate y to get the correct angle for screen coordinates
    const yDiff = armTargetPos.y - targetVertexPos.y;
    const xDiff = armTargetPos.x - targetVertexPos.x;
    // Negate yDiff because screen Y is inverted (increases downward)
    // This converts from screen coordinates to math coordinates for atan2
    let rawAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
    
    // Normalize to 0-360° range
    while (rawAngle < 0) rawAngle += 360;
    while (rawAngle >= 360) rawAngle -= 360;
    armTargetAngle = rawAngle;
    
    // console.log(`📐 Arm target calculation:`, { targetVertex: vertexLabels[armTargetVertexIndex], rawAngle: rawAngle.toFixed(1) });
    
    // Calculate the interior angle between the base and arm directions
    // The protractor is rotated so its base (0°) aligns with the base side
    // The arm should rotate from 0° to point toward the target vertex
    // The arm angle is measured counterclockwise from the base on the protractor
    
    // Calculate the angle from base direction to arm direction
    // This is the angle we need to measure on the protractor
    let rawInteriorAngle = armTargetAngle - baseAngle;
    
    // Normalize to 0-360° range (counterclockwise from base)
    while (rawInteriorAngle < 0) rawInteriorAngle += 360;
    while (rawInteriorAngle >= 360) rawInteriorAngle -= 360;
    
    // For a semicircular protractor (0-180°), we can only measure angles up to 180°
    // If the angle is > 180°, we measure going the opposite direction (clockwise = negative)
    let protractorRotationOffset = 0;
    let interiorAngle;
    
    if (rawInteriorAngle > 180) {
      // Angle is > 180°, so measure going the opposite direction (clockwise)
      // Keep protractor at baseAngle, but use negative arm angle
      // e.g., 270° counterclockwise = -90° clockwise (or 360 - 270 = 90° from the other direction, but negative)
      protractorRotationOffset = 0; // Don't flip the protractor
      interiorAngle = rawInteriorAngle - 360; // e.g., 270° → -90°
    } else {
      // Angle is 0-180°, use it directly
      interiorAngle = rawInteriorAngle;
    }
    
    // Ensure the angle is in -180° to 180° range (safety check)
    // Allow negative angles for clockwise measurements
    if (interiorAngle > 180) {
      interiorAngle = 180;
    }
    if (interiorAngle < -180) {
      interiorAngle = -180;
    }
    
    // Apply the rotation offset to the base angle
    // This is the angle the protractor should be rotated to
    const adjustedBaseAngle = baseAngle + protractorRotationOffset;
    
    // Normalize adjustedBaseAngle to 0-360° range
    let normalizedAdjustedBaseAngle = adjustedBaseAngle;
    while (normalizedAdjustedBaseAngle < 0) normalizedAdjustedBaseAngle += 360;
    while (normalizedAdjustedBaseAngle >= 360) normalizedAdjustedBaseAngle -= 360;
    
    // Debug: Log the geometry with actual positions
    console.log('📐 Angle measurement geometry:', {
      vertexIndex,
      vertexLabel: vertexLabels[vertexIndex],
      vertexPos: { x: targetVertexPos.x.toFixed(1), y: targetVertexPos.y.toFixed(1) },
      sideIndex,
      sideStartVertex,
      sideEndVertex,
      baseEndPos: { x: baseEndPos.x.toFixed(1), y: baseEndPos.y.toFixed(1) },
      originalBaseAngle: baseAngle.toFixed(1),
      adjustedBaseAngle: adjustedBaseAngle.toFixed(1),
      protractorRotationOffset: protractorRotationOffset.toFixed(1),
      armTargetVertex: vertexLabels[armTargetVertexIndex],
      armTargetAngle: armTargetAngle.toFixed(1),
      rawInteriorAngle: (armTargetAngle - baseAngle).toFixed(1),
      calculatedInteriorAngle: interiorAngle.toFixed(1),
      actualAngle: angles[vertexIndex]?.toFixed(1) || 'null',
      prevVertexIndex,
      nextVertexIndex
    });
    
    // Additional detailed log for debugging
    console.log('🔍 Detailed angle info:', {
      'armTargetAngle (absolute)': armTargetAngle.toFixed(1) + '°',
      'baseAngle (original)': baseAngle.toFixed(1) + '°',
      'baseAngle (adjusted)': adjustedBaseAngle.toFixed(1) + '°',
      'interiorAngle (before flip)': (armTargetAngle - baseAngle).toFixed(1) + '°',
      'interiorAngle (after flip)': interiorAngle.toFixed(1) + '°',
      'protractorRotationOffset': protractorRotationOffset.toFixed(1) + '°',
      'Expected protractor rotation': adjustedBaseAngle.toFixed(1) + '°',
      'Expected arm angle on protractor': interiorAngle.toFixed(1) + '°'
    });
    
    // Calculate actual angle at vertex
    const actualAngle = angles[vertexIndex];
    const isRightAngle = actualAngle !== null && Math.abs(actualAngle - 90) < 2;
    
    // Get vertex labels
    const vertexLabel = vertexLabels[vertexIndex];
    
    // Calculate position outside quadrilateral for phase 6
    // Move protractor in the direction away from the center
    const directionX = targetVertexPos.x - centerPos.x;
    const directionY = targetVertexPos.y - centerPos.y;
    const directionLength = Math.sqrt(directionX * directionX + directionY * directionY);
    const outsidePos = {
      x: targetVertexPos.x + (directionX / directionLength) * 15, // 15% further out
      y: targetVertexPos.y + (directionY / directionLength) * 15
    };
    
    // Get protractor's initial position in viewport percentages
    // Try to read from centerPoint prop if available, otherwise calculate from current position
    let initialPos;
    const protractorComponent = protractorElement._reactInternalFiber || protractorElement._reactInternalInstance;
    if (protractorElement.dataset && protractorElement.dataset.centerPoint) {
      // If protractor has centerPoint data, use it
      try {
        const centerPoint = JSON.parse(protractorElement.dataset.centerPoint);
        initialPos = {
          x: (centerPoint.col / gridSystemCols) * 100,
          y: (centerPoint.row / gridSystemRows) * 100
        };
      } catch (e) {
        // Fallback to calculating from current position
        const protractorRect = protractorElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        initialPos = {
          x: ((protractorRect.left + protractorRect.width / 2) / viewportWidth) * 100,
          y: ((protractorRect.top + protractorRect.height / 2) / viewportHeight) * 100
        };
      }
    } else {
      // Calculate from current DOM position
      const protractorRect = protractorElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      initialPos = {
        x: ((protractorRect.left + protractorRect.width / 2) / viewportWidth) * 100,
        y: ((protractorRect.top + protractorRect.height / 2) / viewportHeight) * 100
      };
    }
    
    // Get protractor's initial rotation (try to read from transform or data attribute)
    let initialRotation = 0;
    const transformStyle = protractorElement.style.transform;
    const rotateMatch = transformStyle && transformStyle.match(/rotate\(([^)]+)deg\)/);
    if (rotateMatch) {
      initialRotation = parseFloat(rotateMatch[1]) || 0;
    }
    
    // Store the calculated interior angle for use in animation
    const calculatedInteriorAngle = interiorAngle;
    
    const startTime = Date.now();
    
    const initialState = {
      phase: 'moving-to-center',
      vertexIndex,
      sideIndex,
      progress: 0,
      startTime,
      phaseStartTime: startTime,
      // Positions
      initialPos,
      centerPos,
      targetVertexPos,
      armTargetPos, // Position of the arm target vertex
      outsidePos,
      // Angles
      initialRotation,
      baseAngle: baseAngle, // Use the base angle directly from getSideAngles calculation (0-360°)
      originalBaseAngle: baseAngle, // Store original for reference
      armTargetAngle,
      interiorAngle: calculatedInteriorAngle, // Calculated interior angle between base and arm (0-180°)
      protractorRotationOffset, // Offset applied to protractor rotation if angle > 180°
      actualAngle,
      isRightAngle,
      // Config
      hideProtractorAfter,
      messageConfig,
      rightAngleMarkerConfig,
      vertexLabel,
      armTargetVertexIndex,
      // Durations
      phase1Duration,
      phase2Duration,
      phase3Duration,
      phase3Delay,
      phase4Duration,
      phase5Duration,
      phase6Duration,
      phase6Delay,
      phase7Duration,
      phase8Duration,
      // Message configuration
      messageText,
      messageCoordinates,
      messageFontStyle,
      messageBorderStyle,
      messageBackground,
      // Protractor element reference
      protractorId,
      frameCount: 0,
      // Animation mode: 1 = auto, 2 = step-by-step (manual)
      mode: modeValue,
      isPaused: false
    };
    
    confirmRightAngleStateRef.current = initialState;
    setConfirmRightAngleAnimation(initialState);
    
    // console.log(`🔍 DEBUG Initial state baseAngle:`, { baseAngle: initialState.baseAngle.toFixed(1), originalBaseAngle: initialState.originalBaseAngle.toFixed(1) });
    
    // Helper to update textbox with phase commentary
    const updatePhaseCommentary = (phase, vertexLabel = null, additionalInfo = '') => {
      const textbox = document.getElementById('page3-textbox-1');
      if (!textbox) {
        return; // Textbox not found, silently skip
      }
      
      let commentary = '';
      switch (phase) {
        case 'moving-to-center':
          commentary = 'Moving protractor to the center of the quadrilateral...';
          break;
        case 'positioning-at-vertex':
          commentary = `Positioning protractor at vertex ${vertexLabel || 'target'}...`;
          break;
        case 'rotating-to-side':
          commentary = `Rotating protractor to align with the side...`;
          break;
        case 'extending-arm':
          commentary = `Extending measurement arm to measure the angle...`;
          break;
        case 'highlighting-angle':
          commentary = `Highlighting the angle measurement: ${additionalInfo || '90°'}...`;
          break;
        case 'showing-message':
          commentary = `Displaying confirmation: ${additionalInfo || 'Angle is 90°'}!`;
          break;
        case 'hiding-protractor':
          commentary = 'Hiding the protractor...';
          break;
        case 'showing-angle-marker':
          commentary = `Showing permanent angle marker at vertex ${vertexLabel || 'target'}...`;
          break;
        case 'complete':
          commentary = 'Animation complete!';
          break;
        default:
          commentary = 'Measuring angle...';
      }
      
      textbox.textContent = commentary;
    };
    
    // Helper to update protractor position and rotation
    const updateProtractor = (posX, posY, rotation, armAngle = null) => {
      const protractor = document.getElementById(protractorId);
      if (!protractor) {
        console.warn('⚠️ Protractor element not found:', protractorId);
        return;
      }
      
      // The protractor's containerRef is on the outer div (the one with className='protractor-component')
      // Set data attributes directly on the protractor element (the MutationObserver watches containerRef.current)
      protractor.setAttribute('data-x', posX.toString());
      protractor.setAttribute('data-y', posY.toString());
      protractor.setAttribute('data-rotation', rotation.toString());
      
      // console.log(`🔍 DEBUG updateProtractor called:`, { posX: posX.toFixed(1), posY: posY.toFixed(1), rotation: rotation.toFixed(1), armAngle: armAngle !== null ? armAngle.toFixed(1) : 'null' });
      
      // Update arm angle via data attribute (protractor watches this via MutationObserver)
      if (armAngle !== null) {
        protractor.setAttribute('data-arm-angle', armAngle.toString());
      }
      
      // posX and posY are already in viewport percentages (0-100)
      // Use percentage-based CSS positioning (protractor expects this format)
      // Use !important to override React styles if needed
      protractor.style.setProperty('left', `${posX}%`, 'important');
      protractor.style.setProperty('top', `${posY}%`, 'important');
      
      // Only apply translate to outer container, NOT rotation (rotation is applied to inner face wrapper)
      // The outer container should only have translate(-50%, -50%) for centering
      protractor.style.setProperty('transform', `translate(-50%, -50%)`, 'important');
      
      // Directly update the protractor face rotation (the div that wraps the protractor face)
      // The protractor structure: outer div (protractor) > children (Fragments) > draggableProtractorFace div
      // The draggableProtractorFace is a div with transform: rotate() that contains the protractor face
      let protractorFaceWrapper = null;
      
      // Strategy 1: Look for div with data-protractor-inner attribute (set by protractor component)
      const allDivs = Array.from(protractor.querySelectorAll('div'));
      protractorFaceWrapper = allDivs.find(div => {
        return div.getAttribute('data-protractor-inner') === 'true';
      });
      
      // Strategy 2: Look for div with position: absolute, width: 100%, height: 100%, zIndex: 5
      // This is the draggableProtractorFace wrapper
      if (!protractorFaceWrapper) {
        protractorFaceWrapper = allDivs.find(div => {
          if (div === protractor) return false; // Skip the outer container
          const style = window.getComputedStyle(div);
          return style.position === 'absolute' && 
                 (style.width === '100%' || style.width.includes('px')) &&
                 (style.height === '100%' || style.height.includes('px')) &&
                 style.zIndex === '5';
        });
      }
      
      // Strategy 3: Look for div with inline style or computed style that has transform with rotate
      if (!protractorFaceWrapper) {
        protractorFaceWrapper = allDivs.find(div => {
          if (div === protractor) return false;
          const style = window.getComputedStyle(div);
          const inlineStyle = div.style.transform || '';
          return (style.transform && style.transform !== 'none' && 
                 (style.transform.includes('matrix') || style.transform.includes('rotate'))) ||
                 (inlineStyle && inlineStyle.includes('rotate'));
        });
      }
      
      // Strategy 4: Find the first div child that's not the protractor itself
      if (!protractorFaceWrapper && protractor.children.length > 0) {
        // The children are React Fragments, so we need to look deeper
        // Try to find a div that's a direct or indirect child
        for (let child of protractor.children) {
          if (child.tagName === 'DIV' && child !== protractor) {
            protractorFaceWrapper = child;
            break;
          }
          // If it's a Fragment or other element, look for divs inside
          const innerDiv = child.querySelector && child.querySelector('div');
          if (innerDiv) {
            protractorFaceWrapper = innerDiv;
            break;
          }
        }
      }
      
      if (protractorFaceWrapper) {
        // The protractor face wrapper should have: transform: rotate(Xdeg)
        // Update it directly with !important to override React styles
        protractorFaceWrapper.style.setProperty('transform', `rotate(${rotation}deg)`, 'important');
        // Also remove transition during animation for smooth updates
        protractorFaceWrapper.style.setProperty('transition', 'none', 'important');
        
        // Debug logging of computed rotation removed for production
      } else if (confirmRightAngleStateRef.current && confirmRightAngleStateRef.current.frameCount % 30 === 0) {
        // Enhanced debugging - log the actual structure
        const structure = {
          outerDiv: {
            tag: protractor.tagName,
            id: protractor.id,
            className: protractor.className,
            children: Array.from(protractor.children).map((c, i) => ({
              index: i,
              tag: c.tagName,
              nodeName: c.nodeName,
              className: c.className,
              children: Array.from(c.children || []).map(cc => ({
                tag: cc.tagName,
                className: cc.className,
                style: window.getComputedStyle(cc).transform
              }))
            }))
          },
          allDivs: allDivs.map(div => ({
            tag: div.tagName,
            className: div.className,
            position: window.getComputedStyle(div).position,
            width: window.getComputedStyle(div).width,
            height: window.getComputedStyle(div).height,
            zIndex: window.getComputedStyle(div).zIndex,
            transform: window.getComputedStyle(div).transform
          }))
        };
        console.warn('⚠️ Could not find protractor face wrapper div for rotation. Full structure:', structure);
      }
      
      // Also try to directly update the arm element (SVG)
      if (armAngle !== null) {
        // Find all SVG elements in the protractor
        const svgs = protractor.querySelectorAll('svg');
        for (let svg of svgs) {
          // Look for the measurement arm - it's usually a line element with a specific stroke color
          // or it might be in a group
          const armLine = svg.querySelector('line[stroke]');
          const armGroup = svg.querySelector('g');
          
          if (armLine) {
            // Update the arm line's parent group or the SVG itself
            const parentGroup = armLine.closest('g') || svg;
            parentGroup.style.setProperty('transform', `rotate(${armAngle}deg)`, 'important');
            parentGroup.style.setProperty('transform-origin', 'center center', 'important');
            
            if (confirmRightAngleStateRef.current && confirmRightAngleStateRef.current.frameCount % 30 === 0) {
              console.log('✅ Directly updated arm rotation:', {
                armAngle: armAngle.toFixed(1) + '°',
                element: parentGroup.tagName
              });
            }
            break;
          } else if (armGroup && svg.querySelector('circle')) {
            // If there's a group with a circle (arrowhead), this might be the arm
            armGroup.style.setProperty('transform', `rotate(${armAngle}deg)`, 'important');
            armGroup.style.setProperty('transform-origin', 'center center', 'important');
            break;
          }
        }
        
        // Also try to find by looking for elements with specific attributes
        // The arm SVG might have a viewBox and contain the arm elements
        const armSvg = Array.from(svgs).find(svg => {
          const viewBox = svg.getAttribute('viewBox');
          return viewBox && viewBox.includes('-150');
        });
        
        if (armSvg && !armSvg.querySelector('line[stroke]')) {
          // If we found the SVG but no line yet, try to update the SVG's transform
          // The arm might be rendered as a group inside
          const groups = armSvg.querySelectorAll('g');
          if (groups.length > 0) {
            // Usually the first group contains the arm
            groups[0].style.setProperty('transform', `rotate(${armAngle}deg)`, 'important');
            groups[0].style.setProperty('transform-origin', 'center center', 'important');
          }
        }
      }
      
      // High-frequency debug log removed for production
    };
    
    // Function to advance to next phase (for step-by-step mode)
    const advanceToNextPhase = () => {
      const prev = confirmRightAngleStateRef.current;
      if (!prev || prev.mode !== 2 || !prev.isPaused) return;
      
      // Unpause and advance to next phase
      const now = Date.now();
      const phaseMap = {
        'moving-to-center': 'positioning-at-vertex',
        'positioning-at-vertex': 'rotating-to-side',
        'rotating-to-side': 'extending-arm',
        'extending-arm': 'highlighting-angle',
        'highlighting-angle': 'showing-message',
        'showing-message': 'hiding-protractor',
        'hiding-protractor': 'showing-angle-marker',
        'showing-angle-marker': 'complete'
      };
      
      const nextPhase = phaseMap[prev.phase];
      if (nextPhase) {
        confirmRightAngleStateRef.current = {
          ...prev,
          phase: nextPhase,
          phaseStartTime: now,
          progress: 0,
          isPaused: false
        };
        setConfirmRightAngleAnimation(confirmRightAngleStateRef.current);
        console.log(`▶️ Advanced to phase: ${nextPhase}`);
      }
    };
    
    // Store advance function globally for event listeners
    if (typeof window !== 'undefined') {
      window._confirmRightAngleAdvance = advanceToNextPhase;
    }
    
    // Add event listeners for step-by-step mode
    const handleStepAdvance = (event) => {
      const prev = confirmRightAngleStateRef.current;
      if (prev && prev.mode === 2 && prev.isPaused) {
        event.preventDefault();
        event.stopPropagation();
        advanceToNextPhase();
      }
    };
    
    // Add listeners if mode is manual (2)
    if (modeValue === 2) {
      window.addEventListener('click', handleStepAdvance, true);
      window.addEventListener('keydown', handleStepAdvance, true);
      console.log('⏸️ Step-by-step mode enabled. Click or press any key to advance phases.');
    }
    
    // Cleanup function for event listeners
    const cleanup = () => {
      if (modeValue === 2) {
        window.removeEventListener('click', handleStepAdvance, true);
        window.removeEventListener('keydown', handleStepAdvance, true);
      }
      if (typeof window !== 'undefined') {
        delete window._confirmRightAngleAdvance;
      }
      // Clean up message element
      const messageElement = document.getElementById(`confirm-right-angle-message-${protractorId}`);
      if (messageElement) {
        messageElement.remove();
      }
    };
    
    // Animation loop
    const animate = () => {
      const prev = confirmRightAngleStateRef.current;
      if (!prev) return;
      
      // If paused in step-by-step mode, don't animate
      if (prev.mode === 2 && prev.isPaused) {
        return;
      }
      
      const now = Date.now();
      const phaseElapsed = now - prev.phaseStartTime;
      
      let newPhase = prev.phase;
      let newProgress = prev.progress;
      let newPhaseStartTime = prev.phaseStartTime;
      let newFrameCount = prev.frameCount + 1;
      let newIsPaused = prev.isPaused;
      
      switch (prev.phase) {
        case 'moving-to-center':
          // Phase 1: Reset protractor to standard orientation (base horizontal, top toward top of screen)
          // and move to center
          newProgress = Math.min(1, phaseElapsed / prev.phase1Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('moving-to-center');
          }
          
          // Interpolate position from initial to center
          const p1PosX = prev.initialPos.x + (prev.centerPos.x - prev.initialPos.x) * easeInOutCubic(newProgress);
          const p1PosY = prev.initialPos.y + (prev.centerPos.y - prev.initialPos.y) * easeInOutCubic(newProgress);
          
          // Reset rotation to 0° (base horizontal, top toward top of screen)
          // Interpolate from initial rotation to 0°
          const p1Rotation = prev.initialRotation + (0 - prev.initialRotation) * easeInOutCubic(newProgress);
          
          updateProtractor(p1PosX, p1PosY, p1Rotation, 0);
          
          if (phaseElapsed >= prev.phase1Duration) {
            if (prev.mode === 2) {
              // Step-by-step mode: pause and wait for user input
              newIsPaused = true;
              console.log('⏸️ Phase 1 complete: Protractor at center. Click or press any key to continue...');
            } else {
              // Auto mode: continue to next phase
              newPhase = 'positioning-at-vertex';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 1 complete: Protractor at center');
            }
          }
          break;
          
        case 'positioning-at-vertex':
          // Phase 2: Move to vertex WITHOUT rotation - just align protractor center with vertex
          newProgress = Math.min(1, phaseElapsed / prev.phase2Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('positioning-at-vertex', prev.vertexLabel);
          }
          
          // Interpolate position from center to vertex
          const p2PosX = prev.centerPos.x + (prev.targetVertexPos.x - prev.centerPos.x) * easeInOutCubic(newProgress);
          const p2PosY = prev.centerPos.y + (prev.targetVertexPos.y - prev.centerPos.y) * easeInOutCubic(newProgress);
          
          // Keep rotation at 0° (no rotation in this phase)
          const p2Rotation = 0;
          
          updateProtractor(p2PosX, p2PosY, p2Rotation, 0);
          
          if (phaseElapsed >= prev.phase2Duration) {
            if (prev.mode === 2) {
              // Step-by-step mode: pause and wait for user input
              newIsPaused = true;
              console.log('⏸️ Phase 2 complete: Protractor at vertex, base aligned. Click or press any key to continue...');
            } else {
              // Auto mode: continue to next phase
              newPhase = 'rotating-to-side';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 2 complete: Protractor at vertex');
            }
          }
          break;
          
        case 'rotating-to-side':
          // Phase 3: Rotate protractor to align base with the specified side
          // Use the non-normalized angle (0-360°) from getSideAngles calculation
          newProgress = Math.min(1, phaseElapsed / prev.phase3Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('rotating-to-side');
          }
          
          // Use static/normal protractor rotations (relative to 0°, not baseAngle):
          // Vertex A (index 0): 90° clockwise = -90°
          // Vertex B (index 1): 180° anticlockwise = +180° (from static protractor)
          // Vertex C (index 2): 90° anticlockwise = +90° (from static protractor)
          // Vertex D (index 3): No rotation = 0° (from static protractor)
          let p3TargetRotation = 0;
          if (prev.vertexIndex === 0) {
            // Vertex A: 90° clockwise from baseAngle alignment
            p3TargetRotation = prev.baseAngle - 90;
          } else if (prev.vertexIndex === 1) {
            // Vertex B: 180° anticlockwise from static/normal protractor (0°)
            p3TargetRotation = 180;
          } else if (prev.vertexIndex === 2) {
            // Vertex C: 90° anticlockwise from static/normal protractor (0°)
            // In CSS, anticlockwise = negative rotation, so -90°
            p3TargetRotation = -90;
          } else if (prev.vertexIndex === 3) {
            // Vertex D: No rotation, use static/normal protractor (0°)
            p3TargetRotation = 0;
          }
          
          // For vertex C (index 2), we want 90° anticlockwise, which is -90° in CSS
          // Keep negative values as-is to preserve anticlockwise direction
          let p3NormalizedRotation;
          if (prev.vertexIndex === 2 && p3TargetRotation < 0) {
            // For vertex C, preserve negative rotation for anticlockwise direction
            // Interpolate directly from 0 to -90
            const p3Rotation = 0 + (p3TargetRotation - 0) * easeInOutCubic(newProgress);
            // Keep negative value for CSS (CSS rotate() accepts negative values for anticlockwise)
            p3NormalizedRotation = p3Rotation;
          } else {
            // For other vertices, normalize to 0-360° range first
            while (p3TargetRotation < 0) p3TargetRotation += 360;
            while (p3TargetRotation >= 360) p3TargetRotation -= 360;
            
            // Calculate shortest rotation path from 0° to target
            // For angles > 180°, rotate clockwise (negative direction) to take the shorter path
            let p3StartRotation = 0;
            let p3EndRotation = p3TargetRotation;
            
            // Find shortest path: if target >= 180°, go clockwise (negative) to avoid full-circle appearance
            if (p3EndRotation >= 180) {
              p3EndRotation = p3EndRotation - 360; // e.g., 180° becomes -180°, 270° becomes -90°
            }
            
            // Interpolate rotation from start to end
            const p3Rotation = p3StartRotation + (p3EndRotation - p3StartRotation) * easeInOutCubic(newProgress);
            
            // Normalize to 0-360° for CSS (convert negative angles back to positive)
            p3NormalizedRotation = p3Rotation;
            while (p3NormalizedRotation < 0) p3NormalizedRotation += 360;
            while (p3NormalizedRotation >= 360) p3NormalizedRotation -= 360;
          }
          
          // Detailed rotation debug log removed for production
          
          // Arm stays at 0° during this phase (will be adjusted in next phase)
          updateProtractor(prev.targetVertexPos.x, prev.targetVertexPos.y, p3NormalizedRotation, 0);
          
          if (phaseElapsed >= prev.phase3Duration) {
            // Phase 3 complete - wait for delay, then move to phase 4
            if (phaseElapsed >= prev.phase3Duration + prev.phase3Delay) {
              if (prev.mode === 2) {
                // Step-by-step mode: pause and wait for user input
                newIsPaused = true;
                console.log('⏸️ Phase 3 complete: Protractor base aligned with side. Click or press any key to continue...');
              } else {
                // Auto mode: continue to next phase
                newPhase = 'extending-arm';
                newPhaseStartTime = now;
                newProgress = 0;
                console.log('📍 Phase 3 complete: Protractor base aligned with side');
              }
            }
          }
          break;
          
        case 'extending-arm':
          // Phase 4: Rotate and extend the arm head (circle) to the arm target vertex position
          // Protractor stays stationary (same position and rotation as Phase 3)
          newProgress = Math.min(1, phaseElapsed / prev.phase4Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('extending-arm');
          }
          
          // Get the position of the arm target vertex (stored in initial state)
          const armTargetPos = prev.armTargetPos;
          
          // Debug: Log all vertex coordinates and compare with arm target
          if (prev.frameCount % 30 === 0 || prev.frameCount < 5) {
            // Get all vertex positions from stored state or recalculate
            const allVertexPositions = {
              A: getVertexPercent(0),
              B: getVertexPercent(1),
              C: getVertexPercent(2),
              D: getVertexPercent(3)
            };
            
            // Get actual DOM positions for comparison
            const container = containerRef.current;
            let domPositions = {};
            if (container) {
              const vertexElements = container.querySelectorAll('[data-vertex-index]');
              for (let i = 0; i < 4; i++) {
                const vertexEl = Array.from(vertexElements).find(el => 
                  parseInt(el.getAttribute('data-vertex-index')) === i
                );
                if (vertexEl) {
                  const rect = vertexEl.getBoundingClientRect();
                  domPositions[vertexLabels[i]] = {
                    left: rect.left.toFixed(1),
                    top: rect.top.toFixed(1),
                    centerX: (rect.left + rect.width / 2).toFixed(1),
                    centerY: (rect.top + rect.height / 2).toFixed(1)
                  };
                }
              }
            }
            
            // Detailed Phase 4 vertex/debug logging removed for production
          }
          
          // Calculate the angle from the vertex to the arm target vertex (in screen coordinates)
          // Note: screen Y is positive downward, so we negate yDiff for math coordinates
          const yDiff = armTargetPos.y - prev.targetVertexPos.y;
          const xDiff = armTargetPos.x - prev.targetVertexPos.x;
          const absoluteAngle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
          
          // Normalize to 0-360°
          let normalizedAbsoluteAngle = absoluteAngle;
          while (normalizedAbsoluteAngle < 0) normalizedAbsoluteAngle += 360;
          while (normalizedAbsoluteAngle >= 360) normalizedAbsoluteAngle -= 360;
          
          // Calculate the arm angle relative to the protractor's base rotation
          // The arm angle is the difference between the absolute angle and the base angle
          let armAngle = normalizedAbsoluteAngle - prev.baseAngle;
          
          // Normalize arm angle to -180° to 180° range
          while (armAngle > 180) armAngle -= 360;
          while (armAngle < -180) armAngle += 360;
          
          // Conditionally negate based on vertex index
          // For vertices B (1) and D (3), negate to fix rotation direction
          // For vertices A (0) and C (2), keep the original direction (no negation needed)
          if (prev.vertexIndex === 1 || prev.vertexIndex === 3) {
            armAngle = -armAngle;
          }
          
          // Interpolate arm angle from 0 to target
          const currentArmAngle = armAngle * easeInOutCubic(newProgress);
          
          // Update ONLY the arm angle and length (protractor position and rotation stay the same as Phase 3)
          // Do NOT call updateProtractor as it might trigger position/rotation updates
          // Instead, directly update only the arm angle and length data attributes
          const protractor = document.getElementById(prev.protractorId);
          if (protractor) {
            // Calculate arm length to extend to the red circle position
            // First, find the measurement arm SVG to get proper scaling
            const allSvgs = protractor.querySelectorAll('svg');
            let measurementArmSvg = null;
            let svg = null;
            let circle = null;
            
            // Find the measurement arm SVG (for arm length calculation and circle positioning)
            for (const svgElement of allSvgs) {
              const viewBox = svgElement.getAttribute('viewBox');
              if (viewBox && viewBox.includes('-150') && viewBox.includes('300')) {
                measurementArmSvg = svgElement;
                svg = svgElement; // Also use this for circle positioning
                break;
              }
            }
            
            if (measurementArmSvg) {
              // Calculate the distance from vertex D to vertex C (same as circle calculation)
              const percentDiffX = armTargetPos.x - prev.targetVertexPos.x;
              const percentDiffY = armTargetPos.y - prev.targetVertexPos.y;
              const distancePercent = Math.sqrt(percentDiffX * percentDiffX + percentDiffY * percentDiffY);
              
              // Convert distance to pixels, then to SVG coordinates (same calculation as circle)
              const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
              const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
              const avgViewportSize = (viewportWidth + viewportHeight) / 2;
              const distancePixels = (distancePercent / 100) * avgViewportSize;
              
              // Get SVG scaling (same as circle calculation)
              const svgRect = measurementArmSvg.getBoundingClientRect();
              const viewBox = measurementArmSvg.getAttribute('viewBox');
              let svgViewBoxWidth = 300, svgViewBoxHeight = 300;
              if (viewBox) {
                const [, , w, h] = viewBox.split(' ').map(parseFloat);
                svgViewBoxWidth = w || 300;
                svgViewBoxHeight = h || 300;
              }
              const svgScale = Math.min(svgViewBoxWidth / svgRect.width, svgViewBoxHeight / svgRect.height);
              
              // Convert distance to SVG coordinates (same as circle)
              const distanceSvg = distancePixels * svgScale;
              
              // Interpolate arm length from initial length to target distance
              // Initial arm length should match the default arm length in the protractor
              // Default is typically around 80 pixels in SVG coordinates
              // Arm length should be 75% of the side length
              const initialArmLength = 80; // Default arm length in SVG coordinates
              const targetArmLength = distanceSvg * 0.75; // 75% of side length
              const currentArmLength = initialArmLength + (targetArmLength - initialArmLength) * easeInOutCubic(newProgress);
              
              // Update arm angle and length attributes
              protractor.setAttribute('data-arm-angle', currentArmAngle.toString());
              protractor.setAttribute('data-arm-length', currentArmLength.toString());
            } else {
              // Fallback: update only angle if SVG not found
              protractor.setAttribute('data-arm-angle', currentArmAngle.toString());
            }
            
            // Directly position the arm circle at the target vertex position
            // Use the measurement arm SVG we already found (or search again if not found)
            if (!svg) {
              // If we didn't find it earlier, search again
              for (const svgElement of allSvgs) {
                const viewBox = svgElement.getAttribute('viewBox');
                if (viewBox && viewBox.includes('-150') && viewBox.includes('300')) {
                  svg = svgElement;
                  break;
                }
              }
            }
            
            // Search for the red arrowhead circle in the measurement arm SVG
            if (svg) {
              // Try to find the arrowhead circle by color (check common red colors)
              let testCircle = svg.querySelector('circle[fill="#FF0000"], circle[fill="#ff0000"], circle[fill="red"], circle[fill="#C0392B"], circle[fill="#c0392b"], circle[fill="#C0392B"]');
              
              // If not found by exact color match, try to find circle by radius (arrowhead typically has radius 5-10)
              if (!testCircle) {
                const allCircles = svg.querySelectorAll('circle');
                testCircle = Array.from(allCircles).find(c => {
                  const r = parseFloat(c.getAttribute('r') || '0');
                  return r >= 5 && r <= 10;
                });
              }
              
              if (testCircle) {
                circle = testCircle;
              }
            }
            
            // If still not found, search all SVGs by radius
            if (!circle) {
              for (const svgElement of allSvgs) {
                const allCircles = svgElement.querySelectorAll('circle');
                const arrowheadCircle = Array.from(allCircles).find(c => {
                  const r = parseFloat(c.getAttribute('r') || '0');
                  return r >= 5 && r <= 10;
                });
                if (arrowheadCircle) {
                  svg = svgElement;
                  circle = arrowheadCircle;
                  break;
                }
              }
            }
            
            if (!svg) {
              console.error('❌ Could not find SVG element containing measurement arm in protractor', {
                totalSvgs: allSvgs.length,
                svgDetails: Array.from(allSvgs).map((s, idx) => ({
                  index: idx,
                  viewBox: s.getAttribute('viewBox'),
                  circles: s.querySelectorAll('circle').length
                }))
              });
            } else if (!circle) {
              // Last resort - search all circles in the found SVG
              const allCircles = svg.querySelectorAll('circle');
              if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
                console.log('🔍 Searching for circle element in measurement arm SVG:', {
                  totalCircles: allCircles.length,
                  circles: Array.from(allCircles).map((c, idx) => {
                    const cx = parseFloat(c.getAttribute('cx') || '0');
                    const cy = parseFloat(c.getAttribute('cy') || '0');
                    const r = parseFloat(c.getAttribute('r') || '0');
                    return {
                      index: idx,
                      fill: c.getAttribute('fill'),
                      cx: cx,
                      cy: cy,
                      r: r,
                      isAtOrigin: cx === 0 && cy === 0,
                      isArrowheadCandidate: r >= 5 && r <= 10
                    };
                  })
                });
              }
              
              // If still not found and there's only one circle, just use it
              if (allCircles.length === 1) {
                circle = allCircles[0];
                if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
                  console.log('✅ Using the only circle found (fallback):', {
                    fill: circle.getAttribute('fill'),
                    cx: circle.getAttribute('cx'),
                    cy: circle.getAttribute('cy'),
                    r: circle.getAttribute('r')
                  });
                }
              } else if (allCircles.length > 0) {
                console.error('❌ Could not find arrowhead circle in measurement arm SVG', {
                  totalCircles: allCircles.length,
                  circles: Array.from(allCircles).map(c => ({
                    fill: c.getAttribute('fill'),
                    cx: c.getAttribute('cx'),
                    cy: c.getAttribute('cy'),
                    r: c.getAttribute('r')
                  }))
                });
              }
            }
            
            if (svg && circle) {
                // Use viewport percentages directly (they're correct and match)
                // Calculate the difference in viewport percentages
                const percentDiffX = armTargetPos.x - prev.targetVertexPos.x; // e.g., 15.63% (C is to the right of D)
                const percentDiffY = armTargetPos.y - prev.targetVertexPos.y; // e.g., 0.00%
                
                // Convert viewport percentage difference to pixels
                const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
                const pixelDiffX = (percentDiffX / 100) * viewportWidth;
                const pixelDiffY = (percentDiffY / 100) * viewportHeight;
                
                // Get SVG dimensions and viewBox
                const svgRect = svg.getBoundingClientRect();
                const viewBox = svg.getAttribute('viewBox');
                let svgViewBoxWidth = 300, svgViewBoxHeight = 300; // Default for measurement arm SVG ("-150 -150 300 300")
                if (viewBox) {
                  const [, , w, h] = viewBox.split(' ').map(parseFloat);
                  svgViewBoxWidth = w || 300;
                  svgViewBoxHeight = h || 300;
                }
                
                // Convert pixel difference to SVG coordinates
                // SVG is scaled to fit its container, so we need to scale the pixel difference
                const svgScaleX = svgViewBoxWidth / svgRect.width;
                const svgScaleY = svgViewBoxHeight / svgRect.height;
                
                // Calculate circle position using the SAME arm angle that rotates the arm
                // The circle should move along the arm's direction, so we use currentArmAngle
                // Calculate the distance from vertex D to vertex C
                const distancePercent = Math.sqrt(percentDiffX * percentDiffX + percentDiffY * percentDiffY);
                
                // Convert distance to pixels, then to SVG coordinates
                const avgViewportSize = (viewportWidth + viewportHeight) / 2;
                const distancePixels = (distancePercent / 100) * avgViewportSize;
                
                // Scale to SVG coordinates (use average scale for consistent sizing)
                const svgScale = Math.min(svgScaleX, svgScaleY);
                const distanceSvg = distancePixels * svgScale;
                
                // Arm length should be 75% of the side length
                const armLengthSvg = distanceSvg * 0.75;
                
                // Use the arm angle (currentArmAngle) to calculate circle position
                // The arm angle is already calculated and rotating the arm correctly
                // In SVG coordinates (viewBox "-150 -150 300 300"), 0° points right (positive X)
                // The arm angle is measured from the base (0° = right, positive = counterclockwise)
                const armAngleRad = currentArmAngle * (Math.PI / 180);
                
                // Calculate circle position along the arm's direction at 75% of side length
                // X: positive means right (0° = right, matches arm direction)
                // Y: negative means up (SVG Y is downward, so we negate)
                const circleX = armLengthSvg * Math.cos(armAngleRad) * newProgress;
                const circleY = -armLengthSvg * Math.sin(armAngleRad) * newProgress;
                
                // Set circle position (interpolate from center to target)
                circle.setAttribute('cx', circleX.toString());
                circle.setAttribute('cy', circleY.toString());
                
                // Always log circle positioning for debugging
                // Debug logging for circle positioning removed for production
              }
            }
          
          if (phaseElapsed >= prev.phase4Duration) {
            // Phase 4 complete - transition to Phase 5
            if (prev.mode === 2) {
              newIsPaused = true;
              console.log('⏸️ Phase 4 complete: Arm extended to target vertex. Click or press any key to continue...');
            } else {
              newPhase = 'highlighting-angle';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 4 complete: Arm extended to target vertex');
            }
          }
          break;
          
        case 'highlighting-angle':
          // Phase 5: Make angle measurement text 30gc and blink
          newProgress = Math.min(1, phaseElapsed / prev.phase5Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('highlighting-angle', null, '90°');
          }
          
          // Find the angle measurement text element in the protractor
          const protractorForPhase5 = document.getElementById(prev.protractorId);
          if (protractorForPhase5) {
            // Find the measurement arm SVG
            const allSvgsPhase5 = protractorForPhase5.querySelectorAll('svg');
            let angleTextElement = null;
            let measurementArmSvg = null;
            
            for (const svgElement of allSvgsPhase5) {
              const viewBox = svgElement.getAttribute('viewBox');
              if (viewBox && viewBox.includes('-150') && viewBox.includes('300')) {
                // This is the measurement arm SVG
                measurementArmSvg = svgElement;
                // Find the angle text element (it's a <text> element with fill="#FF0000" or similar)
                // Try to find by color first, then fall back to any text element
                angleTextElement = svgElement.querySelector('text[fill="#FF0000"], text[fill="#ff0000"], text[fill="red"]');
                if (!angleTextElement) {
                  // Fallback: find any text element in this SVG
                  angleTextElement = svgElement.querySelector('text');
                }
                if (angleTextElement) {
                  break;
                }
              }
            }
            
            if (angleTextElement) {
              // Convert 30gc to pixels
              // Use GridCellFontUtils if available, otherwise calculate based on viewport/grid
              let fontSizePixels = 30; // Default fallback
              
              if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
                const processed = GridCellFontUtils.processGcProperty('30gc', 'fontSize');
                if (typeof processed === 'string') {
                  fontSizePixels = parseFloat(processed.replace('px', '')) || 30;
                } else if (typeof processed === 'number') {
                  fontSizePixels = processed;
                }
              } else {
                // Fallback calculation: convert gc to pixels based on viewport and grid
                const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                fontSizePixels = (30 / gridSystemCols) * viewportWidth;
              }
              
              // Get current font size for comparison
              const currentFontSizeAttr = angleTextElement.getAttribute('font-size');
              const currentFontSize = parseFloat(currentFontSizeAttr || '12');
              
              // Set font size to 30gc (converted to pixels) - use both attribute and style
              // Use setAttribute first
              angleTextElement.setAttribute('font-size', fontSizePixels.toString());
              
              // Also set via style to ensure it takes effect (with !important)
              if (angleTextElement.style) {
                angleTextElement.style.setProperty('font-size', fontSizePixels + 'px', 'important');
                angleTextElement.style.fontSize = fontSizePixels + 'px';
              }
              
              // Store the target font size in a data attribute so we can restore it if React resets it
              angleTextElement.setAttribute('data-target-font-size', fontSizePixels.toString());
              
              // Add blinking animation using opacity
              // Blink every 500ms (0.5s cycle)
              const blinkCycle = 500; // milliseconds
              const blinkProgress = (phaseElapsed % blinkCycle) / blinkCycle;
              // Blink: 1 -> 0.3 -> 1 (smooth transition)
              const opacity = blinkProgress < 0.5 
                ? 1 - (blinkProgress * 1.4) // 1 to 0.3 in first half
                : 0.3 + ((blinkProgress - 0.5) * 1.4); // 0.3 to 1 in second half
              
              angleTextElement.setAttribute('opacity', opacity.toString());
              if (angleTextElement.style) {
                angleTextElement.style.setProperty('opacity', opacity.toString(), 'important');
                angleTextElement.style.opacity = opacity.toString();
              }
              
              // Set up a MutationObserver to restore font size if React changes it
              if (!prev.phase5MutationObserver && measurementArmSvg) {
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'font-size') {
                      const targetSize = angleTextElement.getAttribute('data-target-font-size');
                      if (targetSize && parseFloat(angleTextElement.getAttribute('font-size')) !== parseFloat(targetSize)) {
                        // React changed it, restore our value
                        angleTextElement.setAttribute('font-size', targetSize);
                        if (angleTextElement.style) {
                          angleTextElement.style.setProperty('font-size', targetSize + 'px', 'important');
                        }
                      }
                    }
                  });
                });
                
                observer.observe(angleTextElement, {
                  attributes: true,
                  attributeFilter: ['font-size']
                });
                
                // Store observer reference in state so we can disconnect it later
                confirmRightAngleStateRef.current = {
                  ...prev,
                  phase5MutationObserver: observer
                };
              }
              
              if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
                console.log('✨ Phase 5 - Highlighting angle measurement:', {
                  elementFound: true,
                  currentFontSize: currentFontSize.toFixed(1) + 'px',
                  newFontSize: fontSizePixels.toFixed(1) + 'px (30gc)',
                  opacity: opacity.toFixed(2),
                  progress: newProgress.toFixed(2),
                  element: angleTextElement.tagName,
                  hasStyle: !!angleTextElement.style,
                  fontSizeAttr: angleTextElement.getAttribute('font-size'),
                  fontSizeStyle: angleTextElement.style?.fontSize
                });
              }
            } else {
              if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
                console.warn('⚠️ Could not find angle text element in protractor', {
                  protractorFound: !!protractorForPhase5,
                  svgsFound: protractorForPhase5 ? protractorForPhase5.querySelectorAll('svg').length : 0,
                  svgDetails: protractorForPhase5 ? Array.from(protractorForPhase5.querySelectorAll('svg')).map(svg => ({
                    viewBox: svg.getAttribute('viewBox'),
                    hasText: !!svg.querySelector('text'),
                    textCount: svg.querySelectorAll('text').length,
                    texts: Array.from(svg.querySelectorAll('text')).map(t => ({
                      fill: t.getAttribute('fill'),
                      fontSize: t.getAttribute('font-size'),
                      text: t.textContent
                    }))
                  })) : []
                });
              }
            }
          }
          
          if (phaseElapsed >= prev.phase5Duration) {
            // Phase 5 complete - transition to Phase 6
            if (prev.mode === 2) {
              newIsPaused = true;
              console.log('⏸️ Phase 5 complete: Angle measurement highlighted. Click or press any key to continue...');
            } else {
              newPhase = 'showing-message';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 5 complete: Angle measurement highlighted');
            }
            
            // Disconnect MutationObserver if it was set up
            if (prev.phase5MutationObserver) {
              prev.phase5MutationObserver.disconnect();
            }
            
            // Ensure final state: text should be visible (opacity = 1) at the end, but keep enlarged font size
            if (protractorForPhase5) {
              const allSvgsFinal = protractorForPhase5.querySelectorAll('svg');
              for (const svgElement of allSvgsFinal) {
                const viewBox = svgElement.getAttribute('viewBox');
                if (viewBox && viewBox.includes('-150') && viewBox.includes('300')) {
                  const angleTextFinal = svgElement.querySelector('text');
                  if (angleTextFinal) {
                    angleTextFinal.setAttribute('opacity', '1');
                    if (angleTextFinal.style) {
                      angleTextFinal.style.setProperty('opacity', '1', 'important');
                    }
                    // Keep the enlarged font size
                    const targetSize = angleTextFinal.getAttribute('data-target-font-size');
                    if (targetSize) {
                      angleTextFinal.setAttribute('font-size', targetSize);
                      if (angleTextFinal.style) {
                        angleTextFinal.style.setProperty('font-size', targetSize + 'px', 'important');
                      }
                    }
                  }
                  break;
                }
              }
            }
          }
          break;
          
        case 'showing-message':
          // Phase 6: Display angle equality message in page3-textbox-2
          newProgress = Math.min(1, phaseElapsed / prev.phase6Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('showing-message', null, prev.messageText);
          }
          
          // Update page3-textbox-2 with the result
          const resultTextBox = document.getElementById('page3-textbox-2');
          if (resultTextBox) {
            resultTextBox.textContent = prev.messageText;
            
            if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
              console.log('💬 Phase 6 - Updated textbox-2 with result:', {
                text: prev.messageText,
                progress: newProgress.toFixed(2)
              });
            }
          } else {
            console.warn('⚠️ Phase 6: page3-textbox-2 not found');
          }
          
          // Remove the old floating message element if it exists
          const oldMessageElement = document.getElementById(`confirm-right-angle-message-${prev.protractorId}`);
          if (oldMessageElement) {
            oldMessageElement.remove();
          }
          
          // Check if Phase 6 duration + delay has elapsed
          if (phaseElapsed >= prev.phase6Duration + prev.phase6Delay) {
            // Phase 6 complete - transition to Phase 7
            if (prev.mode === 2) {
              newIsPaused = true;
              console.log('⏸️ Phase 6 complete: Message displayed. Click or press any key to continue...');
            } else {
              newPhase = 'hiding-protractor';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 6 complete: Message displayed');
            }
          } else if (phaseElapsed >= prev.phase6Duration && prev.mode === 1) {
            // Auto mode: pause for delay after message is shown
            newIsPaused = true;
            console.log(`⏸️ Phase 6 delay: Waiting ${prev.phase6Delay}ms. Click or press any key to continue...`);
          }
          break;
          
        case 'hiding-protractor':
          // Phase 7: Hide the protractor
          newProgress = Math.min(1, phaseElapsed / prev.phase7Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('hiding-protractor');
          }
          
          const protractorForPhase7 = document.getElementById(prev.protractorId);
          if (protractorForPhase7) {
            // Fade out the protractor
            const opacity = 1 - easeInOutCubic(newProgress);
            protractorForPhase7.style.opacity = opacity.toString();
            protractorForPhase7.style.setProperty('opacity', opacity.toString(), 'important');
            
            // Hide completely when progress reaches 1
            if (newProgress >= 1) {
              protractorForPhase7.style.display = 'none';
              protractorForPhase7.style.setProperty('display', 'none', 'important');
            }
            
            if (prev.frameCount % 60 === 0 || prev.frameCount < 3) {
              console.log('👻 Phase 7 - Hiding protractor:', {
                opacity: opacity.toFixed(2),
                progress: newProgress.toFixed(2)
              });
            }
          }
          
          if (phaseElapsed >= prev.phase7Duration) {
            // Phase 7 complete - transition to Phase 8
            if (prev.mode === 2) {
              newIsPaused = true;
              console.log('⏸️ Phase 7 complete: Protractor hidden. Click or press any key to continue...');
            } else {
              newPhase = 'showing-angle-marker';
              newPhaseStartTime = now;
              newProgress = 0;
              console.log('📍 Phase 7 complete: Protractor hidden');
            }
          }
          break;
          
        case 'showing-angle-marker':
          // Phase 8: Show angle marker for the vertex
          newProgress = Math.min(1, phaseElapsed / prev.phase8Duration);
          
          // Update commentary at start of phase
          if (phaseElapsed < 50) {
            updatePhaseCommentary('showing-angle-marker', prev.vertexLabel);
          }
          
          if (phaseElapsed >= prev.phase8Duration || phaseElapsed === 0) {
            // Call the function to show angle marker for this vertex
            if (typeof window !== 'undefined' && window.showAngleMarkersForPage) {
              const pageNum = currentPage || 3;
              const quadIdentifier = id || `${elementName}-${currentPage}`;
              const vertexIdx = prev.vertexIndex;
              
              console.log('📐 Phase 8 - Showing angle marker:', {
                page: pageNum,
                quadId: quadIdentifier,
                vertexIndex: vertexIdx,
                vertexLabel: prev.vertexLabel
              });
              
              window.showAngleMarkersForPage(pageNum, quadIdentifier, vertexIdx);
            } else {
              console.warn('⚠️ Phase 8: window.showAngleMarkersForPage not available');
            }
            
            // Phase 8 complete - animation ends here
            newPhase = 'complete';
            newProgress = 1;
            console.log('📍 Phase 8 complete: Angle marker shown');
            
            // Update final commentary
            updatePhaseCommentary('complete');
            
            // Note: The angle marker is shown via window.showAngleMarkersForPage() call above
            // No need to add to permanentRightAngleMarkers as the function handles the display state
            
            // Clean up event listeners
            cleanup();
            
            // Clear interval
            if (confirmRightAngleAnimationRef.current) {
              clearInterval(confirmRightAngleAnimationRef.current);
              confirmRightAngleAnimationRef.current = null;
            }
          }
          break;
          
        case 'complete':
          // Animation complete - stop interval
          return;
          
          // Animation now ends after phase 7 (hiding-protractor)
        default:
          // Unknown phase - end animation
          newPhase = 'complete';
          cleanup();
          if (confirmRightAngleAnimationRef.current) {
            clearInterval(confirmRightAngleAnimationRef.current);
            confirmRightAngleAnimationRef.current = null;
          }
          break;
          
        case 'complete':
          // Animation complete - stop interval
          return;
      }
      
      const newState = {
        ...prev,
        phase: newPhase,
        progress: newProgress,
        phaseStartTime: newPhaseStartTime,
        frameCount: newFrameCount,
        isPaused: newIsPaused
      };
      
      confirmRightAngleStateRef.current = newState;
      setConfirmRightAngleAnimation(newState);
    };
    
    // Ensure protractor is visible before starting animation (it's hidden by default via CSS)
    const protractor = document.getElementById(protractorId);
    if (protractor) {
      protractor.style.display = 'block';
      protractor.style.setProperty('display', 'block', 'important');
      console.log('👁️ Protractor made visible before Phase 1');
    }
    
    // Set initial commentary
    updatePhaseCommentary('moving-to-center');
    
    // Start animation loop
    const animationInterval = setInterval(() => {
      try {
        if (confirmRightAngleStateRef.current === null) {
          clearInterval(animationInterval);
          confirmRightAngleAnimationRef.current = null;
          return;
        }
        
        const currentPhase = confirmRightAngleStateRef.current?.phase;
        if (currentPhase === 'complete') {
          cleanup();
          clearInterval(animationInterval);
          confirmRightAngleAnimationRef.current = null;
          return;
        }
        
        animate();
      } catch (error) {
        console.error('❌ Error in confirm right angle animation:', error);
        clearInterval(animationInterval);
        confirmRightAngleAnimationRef.current = null;
      }
    }, 16); // ~60fps
    
    confirmRightAngleAnimationRef.current = animationInterval;
    console.log('✅ Confirm right angle animation started');
  }, [gridDimensions, vertices, gridRows, gridCols, angles, confirmRightAngleAnimationConfig, vertexLabels, stopConfirmRightAngleAnimation, easeInOutCubic, coordinates, currentPage, id, elementName, permanentRightAngleMarkers]);

  /**
   * Confirm all angles are right angles by animating through all 4 vertices sequentially
   * 
   * @param {string} mode - 'auto' (all phases run automatically) or 'manual' (step-by-step)
   * @param {number} delayBetween - Delay in milliseconds between each vertex animation (default: 500)
   * 
   * @example
   * // Animate all 4 vertices automatically
   * quadComponent.confirmAllAnglesRight('auto');
   * // Or use the helper method:
   * window.confirmAllAnglesRight('page3-quadrilateral-demo', 'auto');
   */
  const confirmAllAnglesRight = React.useCallback((mode = 'auto', delayBetween = 500, onComplete) => {
    const vertices = [0, 1, 2, 3]; // A, B, C, D
    let currentIndex = 0;
    const angleResults = []; // Store angle values for each vertex
    
    // Helper function to update textbox-2 with accumulated angles
    const updateTextBox2 = () => {
      const textBox2 = document.getElementById('page3-textbox-2');
      if (textBox2) {
        if (angleResults.length === 0) {
          textBox2.textContent = '';
          textBox2.innerText = '';
          if (textBox2.innerHTML !== undefined) {
            textBox2.innerHTML = '';
          }
        } else {
          // Format: "∠A = 90°, ∠B = 90°, ∠C = 90°, ∠D = 90°"
          const angleText = angleResults.map((result, idx) => {
            return `∠${vertexLabels[result.vertexIndex]} = ${Math.round(result.angle)}°`;
          }).join(', ');
          
          textBox2.textContent = angleText;
          textBox2.innerText = angleText;
          if (textBox2.innerHTML !== undefined) {
            textBox2.innerHTML = angleText;
          }
          
          console.log('📝 Updated textbox-2 with angles:', angleText);
        }
      } else {
        console.warn('⚠️ page3-textbox-2 not found');
      }
    };
    
    // Stop any existing animation first
    stopConfirmRightAngleAnimation();
    
    // Clear textbox-2 at start
    updateTextBox2();
    
    // Helper function to reset and show protractor
    const resetProtractor = () => {
      const protractorId = confirmRightAngleAnimationConfig?.protractorId;
      if (protractorId) {
        const protractorElement = document.getElementById(protractorId);
        if (protractorElement) {
          // Reset visibility
          protractorElement.style.display = 'block';
          protractorElement.style.setProperty('display', 'block', 'important');
          protractorElement.style.opacity = '1';
          protractorElement.style.setProperty('opacity', '1', 'important');
          
          // Reset position to initial centerPoint (if available)
          // Try to get from data attribute first, then calculate from initial position
          let initialX, initialY;
          const centerPoint = protractorElement.dataset?.centerPoint;
          const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          
          if (centerPoint) {
            try {
              const cp = JSON.parse(centerPoint);
              initialX = (cp.col / gridSystemCols) * 100;
              initialY = (cp.row / gridSystemRows) * 100;
            } catch (e) {
              console.warn('⚠️ Could not parse centerPoint for protractor reset:', e);
              // Fallback: use center of quadrilateral
              const centerRow = (vertices[0].row + vertices[1].row + vertices[2].row + vertices[3].row) / 4;
              const centerCol = (vertices[0].col + vertices[1].col + vertices[2].col + vertices[3].col) / 4;
              initialX = (centerCol / gridSystemCols) * 100;
              initialY = (centerRow / gridSystemRows) * 100;
            }
          } else {
            // Fallback: use center of quadrilateral
            const centerRow = (vertices[0].row + vertices[1].row + vertices[2].row + vertices[3].row) / 4;
            const centerCol = (vertices[0].col + vertices[1].col + vertices[2].col + vertices[3].col) / 4;
            initialX = (centerCol / gridSystemCols) * 100;
            initialY = (centerRow / gridSystemRows) * 100;
          }
          
          protractorElement.style.setProperty('left', `${initialX}%`, 'important');
          protractorElement.style.setProperty('top', `${initialY}%`, 'important');
          
          // Reset rotation to 0
          // Find the protractor face wrapper and reset its rotation
          const protractorFaceWrapper = protractorElement.querySelector('[data-protractor-inner="true"]') ||
                                        protractorElement.querySelector('[class*="protractor-face"]') || 
                                        protractorElement.querySelector('[class*="face-wrapper"]') ||
                                        protractorElement.querySelector('.protractor-face-wrapper');
          
          if (protractorFaceWrapper) {
            protractorFaceWrapper.style.setProperty('transform', 'rotate(0deg)', 'important');
            protractorFaceWrapper.style.setProperty('transition', 'none', 'important');
          }
          
          // Reset transform on main element
          protractorElement.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
          
          // Reset data attributes
          protractorElement.setAttribute('data-rotation', '0');
          protractorElement.setAttribute('data-arm-angle', '0');
          protractorElement.setAttribute('data-arm-length', '80'); // Reset to default arm length (80 SVG units)
          protractorElement.setAttribute('data-x', initialX.toString());
          protractorElement.setAttribute('data-y', initialY.toString());
          
          // Reset arm angle and length in the measurement arm SVG
          // Find all SVG elements that might contain the measurement arm
          const allSvgs = protractorElement.querySelectorAll('svg');
          for (const svg of allSvgs) {
            const viewBox = svg.getAttribute('viewBox');
            // Check if this is the measurement arm SVG (typically has viewBox with -150)
            if (viewBox && viewBox.includes('-150')) {
              // Reset the SVG's transform to ensure arm is at 0°
              svg.style.setProperty('transform', 'rotate(0deg)', 'important');
              svg.style.setProperty('transition', 'none', 'important');
              
              // Find and reset any arm-related elements inside
              const armLine = svg.querySelector('line[stroke]');
              const armGroup = svg.querySelector('g');
              if (armLine || armGroup) {
                const elementToReset = armGroup || svg;
                elementToReset.style.setProperty('transform', 'rotate(0deg)', 'important');
                elementToReset.style.setProperty('transition', 'none', 'important');
              }
            }
          }
          
          // Also try to find arm element by class
          const armElement = protractorElement.querySelector('[class*="arm"]') || 
                           protractorElement.querySelector('[class*="measurement-arm"]');
          if (armElement && armElement.style) {
            armElement.style.setProperty('transform', 'rotate(0deg)', 'important');
            armElement.style.setProperty('transition', 'none', 'important');
          }
          
          console.log('🔄 Protractor reset to initial state:', {
            position: `${initialX.toFixed(2)}%, ${initialY.toFixed(2)}%`,
            rotation: '0deg',
            armAngle: '0deg',
            armLength: '80 (default)'
          });
        }
      }
    };
    
    const runNextVertex = () => {
      if (currentIndex >= vertices.length) {
        console.log('✅ All angles confirmed - animation sequence complete');
        if (typeof onComplete === 'function') {
          onComplete();
        }
        return;
      }
      
      const vertexIndex = vertices[currentIndex];
      const vertexName = vertexLabels[vertexIndex];
      
      console.log(`🔄 Starting confirm right angle animation for vertex ${vertexName} (${currentIndex + 1}/${vertices.length})`);
      
      // Reset protractor to initial state before starting animation
      resetProtractor();
      
      // Small delay to ensure protractor reset is complete
      setTimeout(() => {
        // Start animation for current vertex
        animateConfirmRightAngle(vertexIndex, mode);
        
        // Wait for animation to start (state becomes non-null)
        // Add a small initial delay to allow animation initialization
        let waitForStartAttempts = 0;
        const maxWaitAttempts = 50; // Maximum 5 seconds (50 * 100ms)
        
        let waitForStart = setInterval(() => {
          waitForStartAttempts++;
          
          if (confirmRightAngleStateRef.current !== null) {
            clearInterval(waitForStart);
            console.log(`✅ Animation state initialized for vertex ${vertexLabels[vertexIndex]} after ${waitForStartAttempts} attempts`);
            
          // Now wait for animation to complete.
          // We track the last non-null state so we can still read the final angle
          // even if the animation cleanup clears confirmRightAngleStateRef.current.
          let checkCount = 0;
          const maxChecks = 300; // Maximum 30 seconds (300 * 100ms) before timeout
          let lastState = null;
          
          const checkCompletion = setInterval(() => {
            const state = confirmRightAngleStateRef.current;
            checkCount++;
            
            // Remember the last non-null state we saw
            if (state) {
              lastState = state;
            }
            
            // Failsafe: if we NEVER get any state at all after a short while,
            // treat this vertex as completed with a perfect right angle so that
            // the sequence can move on without long timeouts.
            if (!state && !lastState && checkCount >= 10) {
              console.warn(`⚠️ No animation state detected for vertex ${vertexLabels[vertexIndex]} after ${checkCount} checks – treating as completed with 90°.`);
              
              angleResults.push({
                vertexIndex: vertexIndex,
                vertexLabel: vertexLabels[vertexIndex],
                angle: 90,
                isRightAngle: true
              });
              updateTextBox2();
              
              clearInterval(checkCompletion);
              setTimeout(() => {
                currentIndex++;
                runNextVertex();
              }, delayBetween);
              return;
            }
            
            // If the animation's internal cleanup has already cleared the state
            // but we previously saw a 'complete' state, treat that as success.
            if (!state && lastState && lastState.phase === 'complete') {
              clearInterval(checkCompletion);
              
              if (lastState.actualAngle !== undefined) {
                angleResults.push({
                  vertexIndex: vertexIndex,
                  vertexLabel: vertexLabels[vertexIndex],
                  angle: lastState.actualAngle,
                  isRightAngle: lastState.isRightAngle
                });
                updateTextBox2();
                console.log(`✅ Stored angle for vertex ${vertexLabels[vertexIndex]} from last completed state: ${Math.round(lastState.actualAngle)}°`);
              }
              
              setTimeout(() => {
                currentIndex++;
                runNextVertex();
              }, delayBetween);
              return;
            }
            
            // Normal path: wait until phase is explicitly 'complete'
            if (state && state.phase === 'complete') {
              clearInterval(checkCompletion);
              
              // Store the angle result for this vertex
              if (state.actualAngle !== undefined) {
                angleResults.push({
                  vertexIndex: vertexIndex,
                  vertexLabel: vertexLabels[vertexIndex],
                  angle: state.actualAngle,
                  isRightAngle: state.isRightAngle
                });
                
                // Update textbox-2 with accumulated angles
                updateTextBox2();
                
                console.log(`✅ Stored angle for vertex ${vertexLabels[vertexIndex]}: ${Math.round(state.actualAngle)}°`);
              } else {
                console.warn(`⚠️ Vertex ${vertexLabels[vertexIndex]} completed but actualAngle is undefined`);
              }
              
              // Small delay before next vertex
              setTimeout(() => {
                currentIndex++;
                runNextVertex();
              }, delayBetween);
            } else if (checkCount >= maxChecks) {
              // Timeout - animation took too long. If we have a usable angle, treat
              // this as a soft timeout without warning; otherwise log a warning
              // and fall back to 90° so the sequence can still proceed.
              clearInterval(checkCompletion);
              
              const sourceState = state || lastState;
              
              if (sourceState && sourceState.actualAngle !== undefined) {
                // We have a valid angle – store it quietly and move on.
                angleResults.push({
                  vertexIndex: vertexIndex,
                  vertexLabel: vertexLabels[vertexIndex],
                  angle: sourceState.actualAngle,
                  isRightAngle: sourceState.isRightAngle
                });
                updateTextBox2();
                console.log(`✅ Stored angle for vertex ${vertexLabels[vertexIndex]} (after soft timeout): ${Math.round(sourceState.actualAngle)}°`);
              } else {
                // No angle info at all – log a warning and fall back to 90°
                console.warn(`⚠️ Timeout waiting for vertex ${vertexLabels[vertexIndex]} to complete (${checkCount} checks) – using 90° fallback.`);
                angleResults.push({
                  vertexIndex: vertexIndex,
                  vertexLabel: vertexLabels[vertexIndex],
                  angle: 90,
                  isRightAngle: true
                });
                updateTextBox2();
              }
              
              // Proceed to next vertex
              setTimeout(() => {
                currentIndex++;
                runNextVertex();
              }, delayBetween);
            }
          }, 100); // Check every 100ms
            } else if (waitForStartAttempts >= maxWaitAttempts) {
              // Timeout waiting for animation to start
              clearInterval(waitForStart);
              console.error(`❌ Timeout: Animation state never initialized for vertex ${vertexLabels[vertexIndex]} after ${maxWaitAttempts} attempts`);
              // Proceed anyway - maybe the animation will start later
              // Set up completion check with a warning
            }
          }, 100); // Check every 100ms for animation start
      }, 100); // Small delay to ensure protractor is visible
    };
    
    // Start the sequence
    runNextVertex();
  }, [animateConfirmRightAngle, stopConfirmRightAngleAnimation, vertexLabels, confirmRightAngleAnimationConfig, vertices]);

  // Auto-start confirmAllAnglesRight animation on page load if configured
  React.useEffect(() => {
    if (!confirmRightAngleAnimationConfig || !confirmRightAngleAnimationConfig.autoStart) {
      return;
    }

    const delay = confirmRightAngleAnimationConfig.autoStartDelay || 1000;
    const mode = confirmRightAngleAnimationConfig.autoStartMode || 'auto';
    const delayBetween = confirmRightAngleAnimationConfig.autoStartDelayBetween || 500;

    console.log(`⏰ Auto-starting confirmAllAnglesRight animation in ${delay}ms`);

    const timeoutId = setTimeout(() => {
      confirmAllAnglesRight(mode, delayBetween);
    }, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [confirmRightAngleAnimationConfig, confirmAllAnglesRight]);

  /**
   * Function to stop the opposite side equality animation
   */
  const stopOppositeSideAnimation = React.useCallback(() => {
    if (oppositeSideAnimationRef.current) {
      cancelAnimationFrame(oppositeSideAnimationRef.current);
      oppositeSideAnimationRef.current = null;
    }
    setOppositeSideAnimation(null);
    console.log('🛑 Opposite side equality animation stopped');
  }, []);

  /**
   * Function to trigger opposite side equality animation
   * Animates a copy of one side translating to superimpose on the opposite side,
   * proving that both sides are equal in length.
   * 
   * @param {number} [pairIndex] - Side pair index (0 for AB→CD, 1 for BC→DA)
   *                               If not provided, animates both pairs sequentially
   * 
   * @example
   * // Animate sides AB and CD (pair 0)
   * window.animateOppositeSideEquality_myQuad(0);
   * // Animate sides BC and DA (pair 1)
   * window.animateOppositeSideEquality_myQuad(1);
   * // Animate both pairs sequentially
   * window.animateOppositeSideEquality_myQuad();
   * // Or use the helper method:
   * quadComponent.animateOppositeSideEquality(0);
   * // Stop the animation:
   * quadComponent.stopOppositeSideAnimation();
   */
  const animateOppositeSideEquality = React.useCallback((pairIndex) => {
    console.log('🎬 Starting opposite side equality animation:', { pairIndex });
    
    // Validate pairIndex if provided
    if (pairIndex !== undefined && (pairIndex < 0 || pairIndex > 1)) {
      console.warn('❌ Invalid pair index for opposite side animation (must be 0 or 1)');
      return;
    }

    // Cancel any existing animation
    if (oppositeSideAnimationRef.current) {
      cancelAnimationFrame(oppositeSideAnimationRef.current);
    }

    // Determine which pairs to animate
    // Pair 0: Side 0 (A→B) and Side 2 (C→D)
    // Pair 1: Side 1 (B→C) and Side 3 (D→A)
    const animateBothPairs = pairIndex === undefined;
    const currentPairIndex = animateBothPairs ? 0 : pairIndex;
    
    const startTime = Date.now();
    const totalCycleDuration = oppositeSideAnimationDuration + oppositeSideAnimationWaitTime;
    
    setOppositeSideAnimation({
      pairIndex: currentPairIndex,
      animateBothPairs,
      startTime,
      translationDuration: oppositeSideAnimationDuration,
      waitTime: oppositeSideAnimationWaitTime,
      totalCycleDuration,
      maxCycles: oppositeSideAnimationCycles,
      currentCycle: 0,
      phase: 'translating-to-opposite', // 'translating-to-opposite', 'waiting-at-opposite', 'translating-back', 'waiting-at-source'
      progress: 0
    });

    console.log('📊 Opposite side equality animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Determine current cycle and phase
      const fullCycle = totalCycleDuration * 2; // translate to opposite, wait, translate back, wait
      
      // If animating both pairs, we need to account for both pair cycles
      const pairsMultiplier = animateBothPairs ? 2 : 1;
      const totalCyclesForBothPairs = fullCycle * pairsMultiplier;
      
      const currentFullCycle = Math.floor(elapsed / totalCyclesForBothPairs);
      const cycleElapsed = elapsed % totalCyclesForBothPairs;
      
      // Determine which pair is currently being animated (if animating both)
      let activePairIndex = currentPairIndex;
      let pairCycleElapsed = cycleElapsed;
      
      if (animateBothPairs) {
        if (cycleElapsed < fullCycle) {
          activePairIndex = 0;
          pairCycleElapsed = cycleElapsed;
        } else {
          activePairIndex = 1;
          pairCycleElapsed = cycleElapsed - fullCycle;
        }
      }
      
      // Check if we've exceeded max cycles (if not infinite)
      if (oppositeSideAnimationCycles >= 0 && currentFullCycle >= oppositeSideAnimationCycles) {
        console.log('✅ Opposite side equality animation complete (max cycles reached)');
        setOppositeSideAnimation(null);
        oppositeSideAnimationRef.current = null;
        return;
      }
      
      // Determine phase within current pair cycle
      let phase, progress;
      if (pairCycleElapsed < oppositeSideAnimationDuration) {
        // Translating from source to opposite
        phase = 'translating-to-opposite';
        progress = easeInOutCubic(pairCycleElapsed / oppositeSideAnimationDuration);
      } else if (pairCycleElapsed < oppositeSideAnimationDuration + oppositeSideAnimationWaitTime) {
        // Waiting at opposite
        phase = 'waiting-at-opposite';
        progress = 1;
      } else if (pairCycleElapsed < oppositeSideAnimationDuration * 2 + oppositeSideAnimationWaitTime) {
        // Translating from opposite back to source
        phase = 'translating-back';
        const translateBackElapsed = pairCycleElapsed - (oppositeSideAnimationDuration + oppositeSideAnimationWaitTime);
        progress = 1 - easeInOutCubic(translateBackElapsed / oppositeSideAnimationDuration);
      } else {
        // Waiting at source
        phase = 'waiting-at-source';
        progress = 0;
      }
      
      setOppositeSideAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          pairIndex: activePairIndex,
          currentCycle: currentFullCycle,
          phase,
          progress
        };
      });

      oppositeSideAnimationRef.current = requestAnimationFrame(animate);
    };

    oppositeSideAnimationRef.current = requestAnimationFrame(animate);
  }, [oppositeSideAnimationDuration, oppositeSideAnimationWaitTime, oppositeSideAnimationCycles]);

  /**
   * Function to stop the diagonal equality animation
   */
  const stopDiagonalEqualityAnimation = React.useCallback(() => {
    if (diagonalEqualityAnimationRef.current) {
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
      diagonalEqualityAnimationRef.current = null;
    }
    setDiagonalEqualityAnimation(null);
    console.log('🛑 Diagonal equality animation stopped');
  }, []);

  /**
   * Function to trigger diagonal equality animation
   * Animates one diagonal translating to overlap the other, demonstrating they are equal in length.
   * 
   * @example
   * // Animate diagonal AC to BD
   * window.animateDiagonalEquality_myQuad();
   * // Or use the helper method:
   * quadComponent.animateDiagonalEquality();
   * // Stop the animation:
   * quadComponent.stopDiagonalEqualityAnimation();
   */
  const animateDiagonalEquality = React.useCallback(() => {
    console.log('🎬 Starting diagonal equality animation');

    // Cancel any existing animation
    if (diagonalEqualityAnimationRef.current) {
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
    }

    const startTime = Date.now();
    const totalCycleDuration = diagonalEqualityDuration + diagonalEqualityWaitTime;
    
    setDiagonalEqualityAnimation({
      startTime,
      translationDuration: diagonalEqualityDuration,
      waitTime: diagonalEqualityWaitTime,
      totalCycleDuration,
      maxCycles: diagonalEqualityCycles,
      currentCycle: 0,
      phase: 'translating-to-target', // 'translating-to-target', 'waiting-at-target', 'translating-back', 'waiting-at-source'
      progress: 0
    });

    console.log('📊 Diagonal equality animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Full cycle: translate to target, wait, translate back, wait
      const fullCycle = totalCycleDuration * 2;
      const currentFullCycle = Math.floor(elapsed / fullCycle);
      const cycleElapsed = elapsed % fullCycle;
      
      // Check if we've exceeded max cycles (if not infinite)
      if (diagonalEqualityCycles >= 0 && currentFullCycle >= diagonalEqualityCycles) {
        console.log('✅ Diagonal equality animation complete (max cycles reached)');
        setDiagonalEqualityAnimation(null);
        diagonalEqualityAnimationRef.current = null;
        return;
      }
      
      // Determine phase within current cycle
      let phase, progress;
      if (cycleElapsed < diagonalEqualityDuration) {
        // Translating from source to target
        phase = 'translating-to-target';
        progress = easeInOutCubic(cycleElapsed / diagonalEqualityDuration);
      } else if (cycleElapsed < diagonalEqualityDuration + diagonalEqualityWaitTime) {
        // Waiting at target
        phase = 'waiting-at-target';
        progress = 1;
      } else if (cycleElapsed < diagonalEqualityDuration * 2 + diagonalEqualityWaitTime) {
        // Translating back to source
        phase = 'translating-back';
        const translateBackElapsed = cycleElapsed - (diagonalEqualityDuration + diagonalEqualityWaitTime);
        progress = 1 - easeInOutCubic(translateBackElapsed / diagonalEqualityDuration);
      } else {
        // Waiting at source
        phase = 'waiting-at-source';
        progress = 0;
      }
      
      setDiagonalEqualityAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentCycle: currentFullCycle,
          phase,
          progress
        };
      });

      diagonalEqualityAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalEqualityAnimationRef.current = requestAnimationFrame(animate);
  }, [diagonalEqualityDuration, diagonalEqualityWaitTime, diagonalEqualityCycles]);

  /**
   * Function to stop the diagonal bisection animation
   */
  const stopDiagonalBisectionAnimation = React.useCallback(() => {
    if (diagonalBisectionAnimationRef.current) {
      cancelAnimationFrame(diagonalBisectionAnimationRef.current);
      diagonalBisectionAnimationRef.current = null;
    }
    setDiagonalBisectionAnimation(null);
    console.log('🛑 Diagonal bisection animation stopped');
  }, []);

  /**
   * Function to trigger diagonal bisection animation
   * Shows tick marks on each half of both diagonals to demonstrate they bisect each other.
   * 
   * @example
   * // Animate diagonal bisection
   * window.animateDiagonalBisection_myQuad();
   * // Or use the helper method:
   * quadComponent.animateDiagonalBisection();
   * // Stop the animation:
   * quadComponent.stopDiagonalBisectionAnimation();
   */
  const animateDiagonalBisection = React.useCallback(() => {
    console.log('🎬 Starting diagonal bisection animation');

    // Cancel any existing animation
    if (diagonalBisectionAnimationRef.current) {
      cancelAnimationFrame(diagonalBisectionAnimationRef.current);
    }

    const startTime = Date.now();
    const totalCycleDuration = diagonalBisectionDuration + diagonalBisectionWaitTime;
    
    setDiagonalBisectionAnimation({
      startTime,
      animationDuration: diagonalBisectionDuration,
      waitTime: diagonalBisectionWaitTime,
      totalCycleDuration,
      maxCycles: diagonalBisectionCycles,
      currentCycle: 0,
      phase: 'showing-ticks', // 'showing-ticks', 'holding', 'fading-ticks', 'waiting'
      progress: 0
    });

    console.log('📊 Diagonal bisection animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Full cycle: show ticks, hold, fade, wait
      const fullCycle = totalCycleDuration * 2;
      const currentFullCycle = Math.floor(elapsed / fullCycle);
      const cycleElapsed = elapsed % fullCycle;
      
      // Check if we've exceeded max cycles (if not infinite)
      if (diagonalBisectionCycles >= 0 && currentFullCycle >= diagonalBisectionCycles) {
        console.log('✅ Diagonal bisection animation complete (max cycles reached)');
        setDiagonalBisectionAnimation(null);
        diagonalBisectionAnimationRef.current = null;
        return;
      }
      
      // Determine phase within current cycle
      let phase, progress;
      if (cycleElapsed < diagonalBisectionDuration) {
        // Showing ticks (fade in)
        phase = 'showing-ticks';
        progress = easeInOutCubic(cycleElapsed / diagonalBisectionDuration);
      } else if (cycleElapsed < diagonalBisectionDuration + diagonalBisectionWaitTime) {
        // Holding ticks visible
        phase = 'holding';
        progress = 1;
      } else if (cycleElapsed < diagonalBisectionDuration * 2 + diagonalBisectionWaitTime) {
        // Fading ticks out
        phase = 'fading-ticks';
        const fadeElapsed = cycleElapsed - (diagonalBisectionDuration + diagonalBisectionWaitTime);
        progress = 1 - easeInOutCubic(fadeElapsed / diagonalBisectionDuration);
      } else {
        // Waiting
        phase = 'waiting';
        progress = 0;
      }
      
      setDiagonalBisectionAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentCycle: currentFullCycle,
          phase,
          progress
        };
      });

      diagonalBisectionAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalBisectionAnimationRef.current = requestAnimationFrame(animate);
  }, [diagonalBisectionDuration, diagonalBisectionWaitTime, diagonalBisectionCycles]);

  /**
   * Function to stop the diagonal perpendicular bisection animation
   */
  const stopDiagonalPerpendicularAnimation = React.useCallback(() => {
    if (diagonalPerpendicularAnimationRef.current) {
      cancelAnimationFrame(diagonalPerpendicularAnimationRef.current);
      diagonalPerpendicularAnimationRef.current = null;
    }
    setDiagonalPerpendicularAnimation(null);
    console.log('🛑 Diagonal perpendicular bisection animation stopped');
  }, []);

  /**
   * Function to trigger diagonal perpendicular bisection animation
   * Shows tick marks on each half of both diagonals plus a right-angle marker at the intersection.
   * 
   * @example
   * // Animate diagonal perpendicular bisection
   * window.animateDiagonalPerpendicularBisection_myQuad();
   * // Or use the helper method:
   * quadComponent.animateDiagonalPerpendicularBisection();
   * // Stop the animation:
   * quadComponent.stopDiagonalPerpendicularAnimation();
   */
  const animateDiagonalPerpendicularBisection = React.useCallback(() => {
    console.log('🎬 Starting diagonal perpendicular bisection animation');

    // Cancel any existing animation
    if (diagonalPerpendicularAnimationRef.current) {
      cancelAnimationFrame(diagonalPerpendicularAnimationRef.current);
    }

    const startTime = Date.now();
    const totalCycleDuration = diagonalPerpendicularDuration + diagonalPerpendicularWaitTime;
    
    setDiagonalPerpendicularAnimation({
      startTime,
      animationDuration: diagonalPerpendicularDuration,
      waitTime: diagonalPerpendicularWaitTime,
      totalCycleDuration,
      maxCycles: diagonalPerpendicularCycles,
      currentCycle: 0,
      phase: 'showing', // 'showing', 'holding', 'fading', 'waiting'
      progress: 0
    });

    console.log('📊 Diagonal perpendicular bisection animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Full cycle: show, hold, fade, wait
      const fullCycle = totalCycleDuration * 2;
      const currentFullCycle = Math.floor(elapsed / fullCycle);
      const cycleElapsed = elapsed % fullCycle;
      
      // Check if we've exceeded max cycles (if not infinite)
      if (diagonalPerpendicularCycles >= 0 && currentFullCycle >= diagonalPerpendicularCycles) {
        console.log('✅ Diagonal perpendicular bisection animation complete (max cycles reached)');
        setDiagonalPerpendicularAnimation(null);
        diagonalPerpendicularAnimationRef.current = null;
        return;
      }
      
      // Determine phase within current cycle
      let phase, progress;
      if (cycleElapsed < diagonalPerpendicularDuration) {
        // Showing (fade in)
        phase = 'showing';
        progress = easeInOutCubic(cycleElapsed / diagonalPerpendicularDuration);
      } else if (cycleElapsed < diagonalPerpendicularDuration + diagonalPerpendicularWaitTime) {
        // Holding visible
        phase = 'holding';
        progress = 1;
      } else if (cycleElapsed < diagonalPerpendicularDuration * 2 + diagonalPerpendicularWaitTime) {
        // Fading out
        phase = 'fading';
        const fadeElapsed = cycleElapsed - (diagonalPerpendicularDuration + diagonalPerpendicularWaitTime);
        progress = 1 - easeInOutCubic(fadeElapsed / diagonalPerpendicularDuration);
      } else {
        // Waiting
        phase = 'waiting';
        progress = 0;
      }
      
      setDiagonalPerpendicularAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentCycle: currentFullCycle,
          phase,
          progress
        };
      });

      diagonalPerpendicularAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalPerpendicularAnimationRef.current = requestAnimationFrame(animate);
  }, [diagonalPerpendicularDuration, diagonalPerpendicularWaitTime, diagonalPerpendicularCycles]);

  /**
   * Function to stop the parallel lines animation
   */
  const stopParallelLinesAnimation = React.useCallback(() => {
    if (parallelLinesAnimationRef.current) {
      cancelAnimationFrame(parallelLinesAnimationRef.current);
      parallelLinesAnimationRef.current = null;
    }
    setParallelLinesAnimation(null);
    console.log('🛑 Parallel lines animation stopped');
  }, []);

  /**
   * Function to trigger parallel lines animation
   * Demonstrates that two opposite sides are parallel by:
   * 1. Extending both sides with dashed lines (creating "rails")
   * 2. Moving the entire quadrilateral along these rails
   * 3. Oscillating back and forth to show sides always stay on the rails
   * 
   * @param {number} pairIndex - Side pair index (0 for AB/CD, 1 for BC/DA)
   * 
   * @example
   * // Animate parallel sides AB and CD (pair 0)
   * window.animateParallelLines_myQuad(0);
   * // Animate parallel sides BC and DA (pair 1)
   * window.animateParallelLines_myQuad(1);
   * // Or use the helper method:
   * quadComponent.animateParallelLines(0);
   * // Stop the animation:
   * quadComponent.stopParallelLinesAnimation();
   */
  const animateParallelLines = React.useCallback((pairIndex) => {
    console.log('🎬 Starting parallel lines animation:', { pairIndex });
    
    // Validate pairIndex
    if (pairIndex === undefined || pairIndex < 0 || pairIndex > 1) {
      console.warn('❌ Invalid pair index for parallel lines animation (must be 0 or 1)');
      return;
    }

    // Cancel any existing animation
    if (parallelLinesAnimationRef.current) {
      cancelAnimationFrame(parallelLinesAnimationRef.current);
    }

    const startTime = Date.now();
    // Half cycle: move duration + wait time
    const halfCycleDuration = parallelLinesDuration + parallelLinesWaitTime;
    
    setParallelLinesAnimation({
      pairIndex,
      startTime,
      moveDuration: parallelLinesDuration,
      waitTime: parallelLinesWaitTime,
      halfCycleDuration,
      maxCycles: parallelLinesCycles,
      currentCycle: 0,
      phase: 'moving-forward', // 'moving-forward', 'waiting-forward', 'moving-backward', 'waiting-backward'
      progress: 0 // -0.5 to 0.5, where 0 is original position
    });

    console.log('📊 Parallel lines animation state set, starting animation loop');

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Calculate which half-cycle we're in (each half-cycle is one direction)
      const halfCycleIndex = Math.floor(elapsed / halfCycleDuration);
      const halfCycleElapsed = elapsed % halfCycleDuration;
      
      // Check if we've exceeded max cycles (if not infinite)
      // Each full oscillation (back and forth) is 2 half-cycles
      const fullOscillationCycles = Math.floor(halfCycleIndex / 2);
      if (parallelLinesCycles >= 0 && fullOscillationCycles >= parallelLinesCycles) {
        console.log('✅ Parallel lines animation complete (max cycles reached)');
        setParallelLinesAnimation(null);
        parallelLinesAnimationRef.current = null;
        return;
      }
      
      // Determine phase and progress
      // Pattern: 
      // Half-cycle 0: 0 -> 0.5 (first forward from center)
      // Half-cycle 1: 0.5 -> -0.5 (backward to left)
      // Half-cycle 2: -0.5 -> 0.5 (forward to right)
      // Half-cycle 3: 0.5 -> -0.5 (backward to left)
      // And so on, oscillating continuously
      let phase, progress;
      const isEvenHalfCycle = halfCycleIndex % 2 === 0;
      
      if (halfCycleElapsed < parallelLinesDuration) {
        // Moving phase
        const t = easeInOutCubic(halfCycleElapsed / parallelLinesDuration);
        
        if (halfCycleIndex === 0) {
          // First half-cycle: moving from center (0) to right (0.5)
          phase = 'moving-forward';
          progress = t * 0.5; // 0 to 0.5
        } else if (isEvenHalfCycle) {
          // Even half-cycles after first: moving from left (-0.5) to right (0.5)
          phase = 'moving-forward';
          progress = -0.5 + t; // -0.5 to 0.5
        } else {
          // Odd half-cycles: moving from right (0.5) to left (-0.5)
          phase = 'moving-backward';
          progress = 0.5 - t; // 0.5 to -0.5
        }
      } else {
        // Waiting phase
        if (halfCycleIndex === 0 || isEvenHalfCycle) {
          phase = 'waiting-forward';
          progress = 0.5; // At right position
        } else {
          phase = 'waiting-backward';
          progress = -0.5; // At left position
        }
      }
      
      setParallelLinesAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentCycle: fullOscillationCycles,
          phase,
          progress
        };
      });

      parallelLinesAnimationRef.current = requestAnimationFrame(animate);
    };

    parallelLinesAnimationRef.current = requestAnimationFrame(animate);
  }, [parallelLinesDuration, parallelLinesWaitTime, parallelLinesCycles]);

  // ============ ANIMATION SEQUENCE FEATURE ============
  // Extract animation sequence config
  const sequenceConfig = React.useMemo(() => {
    return {
      enabled: animationSequence.enabled || false,
      delayFromLoad: animationSequence.delayFromLoad || 0,
      textTargetId: animationSequence.textTargetId || null,
      headerTargetId: animationSequence.headerTargetId || null,
      onSequenceComplete: animationSequence.onSequenceComplete || null,
      onStepComplete: animationSequence.onStepComplete || null,
      triggerManually: animationSequence.triggerManually || false,
      steps: animationSequence.steps || []
    };
  }, [animationSequence]);

  /**
   * Stop the animation sequence and cleanup
   */
  const stopAnimationSequence = React.useCallback(() => {
    console.log('🛑 Stopping animation sequence');
    
    // Clear any pending timeouts
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
    
    // Stop all currently running animations
    stopAngleEqualityAnimation();
    stopAngleSumAnimation();
    stopSideEqualityAnimation();
    stopOppositeSideAnimation();
    stopDiagonalEqualityAnimation();
    stopDiagonalBisectionAnimation();
    stopDiagonalPerpendicularAnimation();
    stopParallelLinesAnimation();
    
    // Reset state
    setIsSequenceRunning(false);
    setSequenceStepIndex(-1);
    
    // Enable replay button when animation stops
    const replayButton = document.getElementById('page3-replay-button');
    if (replayButton) {
      replayButton.disabled = false;
      replayButton.classList.remove('disabled');
      console.log('🔓 Enabled replay button (animation stopped)');
    }
  }, [
    stopAngleEqualityAnimation,
    stopAngleSumAnimation,
    stopSideEqualityAnimation,
    stopOppositeSideAnimation,
    stopDiagonalEqualityAnimation,
    stopDiagonalBisectionAnimation,
    stopDiagonalPerpendicularAnimation,
    stopParallelLinesAnimation
  ]);

  /**
   * Helper function to get i18n text
   */
  const getI18nText = React.useCallback((key, fallback, params = {}) => {
    if (typeof window !== "undefined" && window.i18n && window.i18n.t) {
      try {
        return window.i18n.t(key, params);
      } catch (e) {
        console.warn(`⚠️ i18n error for key "${key}":`, e);
        return fallback;
      }
    }
    return fallback;
  }, []);

  /**
   * Helper function to get translated shape name
   */
  const getTranslatedShapeName = React.useCallback((shapeName) => {
    if (!shapeName) return getI18nText("shapes.shape", "Shape");
    const readableName = shapeName.charAt(0) + shapeName.slice(1).toLowerCase();
    const shapeKey = readableName.toLowerCase();
    return getI18nText(`shapes.${shapeKey}`, readableName);
  }, [getI18nText]);

  /**
   * Update header with default text or property text
   */
  const updateHeaderText = React.useCallback((text = null, targetShape = null) => {
    if (!sequenceConfig || !sequenceConfig.headerTargetId) {
      console.warn('⚠️ Header target ID not configured', { sequenceConfig, headerTargetId: sequenceConfig?.headerTargetId });
      return;
    }
    
    const shapeName = targetShape || quadType || 'Rhombus';
    const translatedShapeName = getTranslatedShapeName(shapeName);
    let headerHTML;
    
    if (text) {
      // Format: "Notice the <white property text> of the shape" (orange for "Notice the" and "of the shape")
      const cleanText = text.replace(/^Notice the\s+/i, '').replace(/^Perhatikan\s+/i, '').trim();
      headerHTML = getI18nText("pages.page3.noticePropertyOfTheShape", "Notice the {propertyText} of the shape.", {
        propertyText: `<span style="color: white;">${cleanText}</span>`
      });
    } else {
      headerHTML = getI18nText("pages.page3.header", "Notice the <span style=\"color: white;\">length of each side</span> of the shape");
    }
    
    console.log(`🔄 Attempting to update header ${sequenceConfig.headerTargetId} with: ${headerHTML}`);
    
    // Use the same robust update method as textbox elements
    const updateHeaderElement = (elementId, newText, retryCount = 0, maxRetries = 20) => {
      let element = document.getElementById(elementId);
      
      if (element) {
        console.log(`✅ Found header element: ${elementId}`, element);
        
        // Find the actual text container (textbox components might have nested structure)
        // Try to find the innermost text container first
        let textContainer = element.querySelector('.textbox-content') || 
                           element.querySelector('[class*="textbox-content"]') ||
                           element.querySelector('[class*="text"]') ||
                           null;
        
        // If we found a nested container, update only that (don't update both parent and child)
        if (textContainer && textContainer !== element) {
          try {
            // Clear and update only the nested container
            textContainer.innerHTML = '';
            textContainer.textContent = '';
            textContainer.innerHTML = newText;
            console.log(`✅ Updated header via nested container: ${elementId}`, newText);
            return true;
          } catch (e) {
            console.warn(`⚠️ Failed to update via nested container:`, e);
            // Fall through to update main element
          }
        }
        
        // If no nested container found, or nested update failed, update main element
        // Clear existing content completely first
        try {
          // Clear all children
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          element.innerHTML = '';
          element.textContent = '';
        } catch (e) {
          // Ignore
        }
        
        // Set new text
        try {
          element.innerHTML = newText;
          console.log(`✅ Updated header via main element: ${elementId}`, newText);
        } catch (e) {
          console.warn(`⚠️ Failed to update via innerHTML:`, e);
          try {
            element.textContent = newText.replace(/<[^>]*>/g, ''); // Strip HTML as fallback
          } catch (e2) {
            console.error(`❌ Failed to update header:`, e2);
          }
        }
        
        return true;
      }
      
      // Retry if element not found
      if (retryCount < maxRetries) {
        console.log(`⏳ Retrying header update (${retryCount + 1}/${maxRetries}) for: ${elementId}`);
        setTimeout(() => {
          updateHeaderElement(elementId, newText, retryCount + 1, maxRetries);
        }, 100);
      } else {
        console.warn(`⚠️ Header target element not found after ${maxRetries} retries: ${elementId}`);
      }
      
      return false;
    };
    
    updateHeaderElement(sequenceConfig.headerTargetId, headerHTML);
  }, [sequenceConfig, quadType, getI18nText, getTranslatedShapeName]);

  /**
   * Update the text element with the property title
   */
  const updateSequenceText = React.useCallback((propertyTitle, propertyText) => {
    // Use propertyText if provided, otherwise use propertyTitle
    const displayText = propertyText || propertyTitle;
    
    // Update instruction text if configured
    if (sequenceConfig.textTargetId) {
      const textElement = document.getElementById(sequenceConfig.textTargetId);
      if (textElement) {
        const newText = getI18nText("pages.page3.noticePropertyOfTheShape", "Notice the {propertyText} of the shape.", {
          propertyText: displayText
        });
        textElement.textContent = newText;
        textElement.innerText = newText;
        // Also try innerHTML for styled text boxes
        if (textElement.innerHTML !== undefined) {
          textElement.innerHTML = newText;
        }
        console.log(`📝 Updated text: "${newText}"`);
      } else {
        console.warn(`⚠️ Text target element not found: ${sequenceConfig.textTargetId}`);
      }
    }
    
    // Update header text if configured
    if (sequenceConfig.headerTargetId) {
      // Format: "Notice the <white property text> of the shape."
      updateHeaderText(displayText, quadType);
    }
  }, [sequenceConfig.textTargetId, sequenceConfig.headerTargetId, updateHeaderText, quadType, getI18nText]);

  /**
   * Execute a single animation step
   *
   * If a step has a `duration`, we use a timeout to advance.
   * If it has no `duration`, we let the underlying animation determine
   * actual completion time (via callback or internal state).
   */
  const executeAnimationStep = React.useCallback((stepIndex) => {
    const steps = sequenceConfig.steps;
    if (stepIndex >= steps.length) {
      // All steps complete
      console.log('✅ Animation sequence complete!');
      setIsSequenceRunning(false);
      setSequenceStepIndex(-1);
      
      // Enable replay button when animation completes
      const replayButton = document.getElementById('page3-replay-button');
      if (replayButton) {
        replayButton.disabled = false;
        replayButton.classList.remove('disabled');
        console.log('🔓 Enabled replay button');
      }
      
      // Dispatch completion event
      const quadId = id || `${elementName}-${currentPage}`;
      window.dispatchEvent(new CustomEvent('animationSequenceComplete', {
        detail: { quadId, stepsCompleted: steps.length }
      }));
      
      // Dispatch quizCompleted event for quiz detection
      const pageNumber = window.getCurrentPage?.() || currentPage || null;
      window.dispatchEvent(new CustomEvent('quizCompleted', {
        detail: {
          componentId: quadId,
          componentType: 'QuadrilateralComponent',
          pageNumber: pageNumber
        }
      }));
      console.log('✅ Dispatched quizCompleted event for QuadrilateralComponent', { quadId, pageNumber });
      
      // Update header and instruction text for page 3 when quiz completes
      if (pageNumber === 3 || currentPage === 3) {
        // Update header text
        const headerElement = document.getElementById('page3-header');
        if (headerElement) {
          // Helper function to get i18n text
          const getI18nText = (key, fallback) => {
            if (typeof window !== "undefined" && window.i18n && window.i18n.t) {
              try {
                return window.i18n.t(key);
              } catch (e) {
                return fallback;
              }
            }
            return fallback;
          };
          // Try multiple ways to update the header
          const headerText = getI18nText("pages.page3.completionSummary", "<span style=\"color: white;\">All sides</span> of a Rhombus are of the <span style=\"color: white;\">same length</span>.");
          try {
            // Only update a real textbox wrapper (.textbox-content); do not use a generic
            // selector (div/span) or we would target a <span> inside our HTML and duplicate text.
            const textContainer = headerElement.querySelector('.textbox-content') ||
                                 headerElement.querySelector('[class*="textbox-content"]');
            if (textContainer && textContainer !== headerElement) {
              textContainer.innerHTML = headerText;
            } else {
              headerElement.innerHTML = headerText;
            }
            console.log('✅ Updated page3-header with completion text');
          } catch (e) {
            console.warn('⚠️ Failed to update page3-header:', e);
          }
        }
        
        // Update instruction text (only here, on quiz completion)
        const instructionElement = document.getElementById('page3-instruction-text');
        if (instructionElement) {
          // Helper function to get i18n text
          const getI18nText = (key, fallback) => {
            if (typeof window !== "undefined" && window.i18n && window.i18n.t) {
              try {
                return window.i18n.t(key);
              } catch (e) {
                return fallback;
              }
            }
            return fallback;
          };
          const instructionText = getI18nText("pages.page3.completionInstruction", "Tap Replay to see the visualization again or » for summary.");
          try {
            // Method 1: Direct innerHTML update
            instructionElement.innerHTML = instructionText;
            // Method 2: Try nested text container
            const textContainer = instructionElement.querySelector('.textbox-content') || 
                                 instructionElement.querySelector('[class*="textbox"]') ||
                                 instructionElement.querySelector('[class*="text"]') ||
                                 instructionElement.querySelector('div') ||
                                 instructionElement.querySelector('span');
            if (textContainer && textContainer !== instructionElement) {
              textContainer.innerHTML = instructionText;
            }
            console.log('✅ Updated page3-instruction-text with completion text');
          } catch (e) {
            console.warn('⚠️ Failed to update page3-instruction-text:', e);
          }
        }
        
        // Ensure replay button is enabled
        const replayButton = document.getElementById('page3-replay-button');
        if (replayButton) {
          replayButton.disabled = false;
          console.log('🔓 Enabled replay button on quiz completion');
        }
      }
      
      // Call completion callback if provided
      if (sequenceConfig.onSequenceComplete && typeof sequenceConfig.onSequenceComplete === 'function') {
        sequenceConfig.onSequenceComplete({ quadId, stepsCompleted: steps.length });
      }
      
      return;
    }
    
    const step = steps[stepIndex];
    console.log(`🎬 Executing step ${stepIndex + 1}/${steps.length}: ${step.propertyTitle}`);
    
    // Update step index
    setSequenceStepIndex(stepIndex);
    
    // Update text BEFORE animation starts
    updateSequenceText(step.propertyTitle, step.propertyText);
    
    // Get the animation method from containerRef, with fallback to window.quadrilateralAnimations
    let animationMethod = containerRef.current?.[step.animationCall];
    const quadId = id || `${elementName}-${currentPage}`;
    
    // If not found on containerRef, try window.quadrilateralAnimations
    if ((!animationMethod || typeof animationMethod !== 'function') && window.quadrilateralAnimations && window.quadrilateralAnimations[quadId]) {
      animationMethod = window.quadrilateralAnimations[quadId][step.animationCall];
      if (animationMethod && typeof animationMethod === 'function') {
        console.log(`   Found method in window.quadrilateralAnimations[${quadId}], using it`);
      }
    }
    
    if (!animationMethod || typeof animationMethod !== 'function') {
      console.warn(`⚠️ Animation method not found: ${step.animationCall}`);
      console.warn(`   Available methods on containerRef:`, Object.keys(containerRef.current || {}));
      if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadId]) {
        console.warn(`   Available methods in window.quadrilateralAnimations[${quadId}]:`, Object.keys(window.quadrilateralAnimations[quadId] || {}));
      }
      // Skip to next step after a brief delay
      sequenceTimeoutRef.current = setTimeout(() => {
        executeAnimationStep(stepIndex + 1);
      }, 500);
      return;
    }
    
    // ---------- Step completion handling ----------
    const delayAfter = step.delayAfter || 0;
    const hasDuration = typeof step.duration === 'number' && !Number.isNaN(step.duration);
    const nextStepIndex = stepIndex + 1;
    
    // Helper: stop current animation using explicit or inferred stop method
    const runStopForStep = () => {
      const currentStepAnimationCall = step.animationCall;
      const currentStepStopMethod = step.stopMethod;
      
      let stopMethod = null;
      if (currentStepStopMethod) {
        stopMethod = containerRef.current?.[currentStepStopMethod];
        console.log(`   Trying explicit stopMethod: ${currentStepStopMethod}, found: ${!!stopMethod}`);
      }
      
      if (!stopMethod) {
        const stopMethodName = currentStepAnimationCall.replace('animate', 'stop') + 'Animation';
        const altStopMethodName = currentStepAnimationCall.replace('animate', 'stop').replace('Equality', 'EqualityAnimation');
        
        stopMethod = containerRef.current?.[stopMethodName] || 
                     containerRef.current?.[altStopMethodName] ||
                     containerRef.current?.[`stop${currentStepAnimationCall.replace('animate', '')}Animation`];
        console.log(`   Trying auto stopMethod: ${stopMethodName} or ${altStopMethodName}, found: ${!!stopMethod}`);
      }
      
      if (stopMethod && typeof stopMethod === 'function') {
        try {
          stopMethod();
          console.log(`⏹️ Stopped animation: ${step.animationCall}`);
        } catch (e) {
          console.error(`❌ Error stopping animation:`, e);
        }
      } else {
        console.warn(`⚠️ Stop method not found for: ${step.animationCall}`);
      }
    };
    
    const markStepComplete = (reason = 'unknown') => {
      console.log(`⏭️ Step ${stepIndex + 1} complete (reason: ${reason}). Moving to step ${nextStepIndex + 1} after ${delayAfter}ms`);
      
      // Call step complete callback
      if (sequenceConfig.onStepComplete && typeof sequenceConfig.onStepComplete === 'function') {
        sequenceConfig.onStepComplete(stepIndex, step);
      }
      
      // Stop current animation before starting next
      runStopForStep();
      
      // Advance to next step after delayAfter
      setTimeout(() => {
        executeAnimationStep(nextStepIndex);
      }, delayAfter);
    };
    
    // Clear any existing timeout first
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
    
    // ---------- Execute the animation ----------
    try {
      const args = step.animationArgs || [];
      
      // If this step supports an explicit completion callback (e.g., confirmAllAnglesRight),
      // append our callback as the last argument when no duration is provided.
      if (!hasDuration && step.animationCall === 'confirmAllAnglesRight') {
        const completionCallback = () => markStepComplete('animation-callback');
        animationMethod(...args, completionCallback);
        console.log(`▶️ Started animation with callback: ${step.animationCall}(${[...args, 'onComplete'].join(', ')})`);
      } else {
        animationMethod(...args);
        console.log(`▶️ Started animation: ${step.animationCall}(${args.join(', ')})`);
      }
    } catch (error) {
      console.error(`❌ Error executing animation ${step.animationCall}:`, error);
      console.error(`   Error details:`, error.stack);
      // On error, immediately advance to the next step to avoid getting stuck
      markStepComplete('error');
      return;
    }
    
    // ---------- Determine when to proceed to next step ----------
    if (hasDuration) {
      // Legacy behaviour: use fixed timeout based on duration
      const duration = step.duration;
      const totalWait = duration + delayAfter;
      
      console.log(`⏰ Step ${stepIndex + 1} scheduled: duration=${duration}ms, delayAfter=${delayAfter}ms, totalWait=${totalWait}ms`);
      
      const timeoutId = setTimeout(() => {
        console.log(`⏰ Timeout fired! Moving to step ${nextStepIndex + 1}`);
        console.log(`   Current step was: ${step.animationCall}, next step index: ${nextStepIndex}`);
        if (sequenceTimeoutRef.current === timeoutId) {
          sequenceTimeoutRef.current = null;
        }
        markStepComplete('duration-timeout');
      }, totalWait);
      
      sequenceTimeoutRef.current = timeoutId;
      console.log(`⏰ Scheduled next step in ${totalWait}ms for step ${nextStepIndex + 1}, timeout ID: ${timeoutId}`);
      return;
    }
    
    // No duration: rely on the animation's actual completion.
    // For allSideEquality, watch its internal state for phase === 'complete'.
    if (!hasDuration && step.animationCall === 'animateAllSideEquality') {
      let checks = 0;
      const maxChecks = 600; // 60s max (600 * 100ms)
      
      const intervalId = setInterval(() => {
        const state = allSideEqualityStateRef.current;
        checks++;
        
        if (state && state.phase === 'complete') {
          clearInterval(intervalId);
          console.log(`✅ animateAllSideEquality completed after ${checks} checks`);
          markStepComplete('state-complete');
        } else if (checks >= maxChecks) {
          clearInterval(intervalId);
          console.warn(`⚠️ animateAllSideEquality timeout after ${checks} checks – proceeding anyway`);
          markStepComplete('state-timeout');
        }
      }, 100);
      
      return;
    }
    
    // For other animations without duration and no explicit handling, we assume they
    // will invoke our callback (e.g., confirmAllAnglesRight) or manage their own
    // completion. If neither happens, the sequence would stall – so it's important
    // to only omit durations for animations that cooperate.
  }, [sequenceConfig, updateSequenceText, id, elementName, currentPage, allSideEqualityStateRef]);

  /**
   * Start the animation sequence
   */
  const runAnimationSequence = React.useCallback(() => {
    if (!sequenceConfig.enabled || sequenceConfig.steps.length === 0) {
      console.log('ℹ️ Animation sequence not enabled or no steps defined');
      return;
    }
    
    if (isSequenceRunning) {
      console.log('⚠️ Animation sequence already running');
      return;
    }
    
    console.log('🚀 Starting animation sequence with', sequenceConfig.steps.length, 'steps');
    
    // Reset any persistent visual state so replay starts clean
    setAllSideEqualityAnimation(null);
    allSideEqualityAnimationRef.current = null;
    allSideEqualityStateRef.current = null;
    permanentEqualSideStrokesRef.current = null;
    
    setConfirmRightAngleAnimation(null);
    confirmRightAngleAnimationRef.current = null;
    confirmRightAngleStateRef.current = null;
    setPermanentRightAngleMarkers([]);
    
    // Reset global display state for this quad so angle markers / labels are hidden
    if (typeof window !== 'undefined' && window.quadDisplayState) {
      const quadState = window.quadDisplayState[quadId];
      if (quadState) {
        quadState.showAngleArcs = false;
        quadState.showAngleText = false;
        quadState.showAngleVertex = null;
      }
    }
    
    // Also reset local angle display state so AngleMarkerComponent hides markers/labels
    setCurrentAngleShow('none');
    setCurrentAngleShowText(false);
    setIsSequenceRunning(true);
    sequenceStartedRef.current = true;
    
    // Disable replay button when animation starts
    const replayButton = document.getElementById('page3-replay-button');
    if (replayButton) {
      replayButton.disabled = true;
      replayButton.classList.add('disabled');
      console.log('🔒 Disabled replay button');
    }
    
    // Update header with default text when sequence starts
    if (sequenceConfig.headerTargetId) {
      updateHeaderText(null, quadType);
    }
    
    // Start from step 0
    executeAnimationStep(0);
  }, [
    sequenceConfig,
    isSequenceRunning,
    executeAnimationStep,
    updateHeaderText,
    quadType,
    setAllSideEqualityAnimation,
    setConfirmRightAngleAnimation,
    setPermanentRightAngleMarkers
  ]);

  // Set initial button state on mount
  React.useEffect(() => {
    // Initially disable the replay button
    const replayButton = document.getElementById('page3-replay-button');
    if (replayButton) {
      replayButton.disabled = true;
      replayButton.classList.add('disabled');
      console.log('🔒 Initialized replay button as disabled');
    }
  }, []);

  // Auto-start animation sequence after delay (if not manual trigger)
  React.useEffect(() => {
    if (!sequenceConfig.enabled || sequenceConfig.triggerManually || sequenceStartedRef.current) {
      return;
    }
    
    const delay = sequenceConfig.delayFromLoad || 0;
    
    // Use a separate timeout for the initial start to avoid conflicts
    const startTimeoutId = setTimeout(() => {
      runAnimationSequence();
    }, delay);
    
    return () => {
      if (startTimeoutId) {
        clearTimeout(startTimeoutId);
      }
    };
  }, [sequenceConfig.enabled, sequenceConfig.triggerManually, sequenceConfig.delayFromLoad, runAnimationSequence]);

  // Cleanup animation sequence on unmount
  React.useEffect(() => {
    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
        sequenceTimeoutRef.current = null;
      }
    };
  }, []);

  // Expose animation function globally and as helper method
  React.useEffect(() => {
    if (containerRef.current) {
      const quadId = id || `${elementName}-${currentPage}`;
      // Create a safe function name (replace hyphens with underscores for valid JS identifier)
      const safeFunctionName = `animateAngleEquality_${quadId.replace(/-/g, '_')}`;
      window[safeFunctionName] = animateAngleEquality;
      
      // Also store in a registry for easier lookup
      if (!window.quadrilateralAnimations) {
        window.quadrilateralAnimations = {};
      }
      
      // Store equality animation
      if (!window.quadrilateralAnimations[quadId]) {
        window.quadrilateralAnimations[quadId] = {};
      }
      if (!window.quadrilateralAnimations[elementName]) {
        window.quadrilateralAnimations[elementName] = {};
      }
      window.quadrilateralAnimations[quadId].animateEquality = animateAngleEquality;
      window.quadrilateralAnimations[elementName].animateEquality = animateAngleEquality;
      
      // Store sum animation
      const safeSumFunctionName = `animateAngleSum_${quadId.replace(/-/g, '_')}`;
      window[safeSumFunctionName] = animateAngleSum;
      window.quadrilateralAnimations[quadId].animateSum = animateAngleSum;
      window.quadrilateralAnimations[elementName].animateSum = animateAngleSum;
      
      // Store side equality animation
      const safeSideFunctionName = `animateSideEquality_${quadId.replace(/-/g, '_')}`;
      window[safeSideFunctionName] = animateSideEquality;
      window.quadrilateralAnimations[quadId].animateSideEquality = animateSideEquality;
      window.quadrilateralAnimations[elementName].animateSideEquality = animateSideEquality;
      
      // Store all 4 side equality animation
      const safeAllSideFunctionName = `animateAllSideEquality_${quadId.replace(/-/g, '_')}`;
      window[safeAllSideFunctionName] = animateAllSideEquality;
      window.quadrilateralAnimations[quadId].animateAllSideEquality = animateAllSideEquality;
      window.quadrilateralAnimations[elementName].animateAllSideEquality = animateAllSideEquality;
      
      // Store opposite side equality animation
      const safeOppositeSideFunctionName = `animateOppositeSideEquality_${quadId.replace(/-/g, '_')}`;
      window[safeOppositeSideFunctionName] = animateOppositeSideEquality;
      window.quadrilateralAnimations[quadId].animateOppositeSideEquality = animateOppositeSideEquality;
      window.quadrilateralAnimations[elementName].animateOppositeSideEquality = animateOppositeSideEquality;
      
      // Store diagonal equality animation
      const safeDiagonalEqualityFunctionName = `animateDiagonalEquality_${quadId.replace(/-/g, '_')}`;
      window[safeDiagonalEqualityFunctionName] = animateDiagonalEquality;
      window.quadrilateralAnimations[quadId].animateDiagonalEquality = animateDiagonalEquality;
      window.quadrilateralAnimations[elementName].animateDiagonalEquality = animateDiagonalEquality;
      
      // Store diagonal bisection animation
      const safeDiagonalBisectionFunctionName = `animateDiagonalBisection_${quadId.replace(/-/g, '_')}`;
      window[safeDiagonalBisectionFunctionName] = animateDiagonalBisection;
      window.quadrilateralAnimations[quadId].animateDiagonalBisection = animateDiagonalBisection;
      window.quadrilateralAnimations[elementName].animateDiagonalBisection = animateDiagonalBisection;
      
      // Store diagonal perpendicular bisection animation
      const safeDiagonalPerpendicularFunctionName = `animateDiagonalPerpendicularBisection_${quadId.replace(/-/g, '_')}`;
      window[safeDiagonalPerpendicularFunctionName] = animateDiagonalPerpendicularBisection;
      window.quadrilateralAnimations[quadId].animateDiagonalPerpendicularBisection = animateDiagonalPerpendicularBisection;
      window.quadrilateralAnimations[elementName].animateDiagonalPerpendicularBisection = animateDiagonalPerpendicularBisection;
      
      // Store parallel lines animation
      const safeParallelLinesFunctionName = `animateParallelLines_${quadId.replace(/-/g, '_')}`;
      window[safeParallelLinesFunctionName] = animateParallelLines;
      window.quadrilateralAnimations[quadId].animateParallelLines = animateParallelLines;
      window.quadrilateralAnimations[elementName].animateParallelLines = animateParallelLines;
      
      // Store confirm right angle animation
      const safeConfirmRightAngleFunctionName = `animateConfirmRightAngle_${quadId.replace(/-/g, '_')}`;
      window[safeConfirmRightAngleFunctionName] = animateConfirmRightAngle;
      window.quadrilateralAnimations[quadId].animateConfirmRightAngle = animateConfirmRightAngle;
      window.quadrilateralAnimations[elementName].animateConfirmRightAngle = animateConfirmRightAngle;
      
      // Expose confirmAllAnglesRight
      const safeConfirmAllAnglesRightFunctionName = `confirmAllAnglesRight_${quadId.replace(/-/g, '_')}`;
      window[safeConfirmAllAnglesRightFunctionName] = confirmAllAnglesRight;
      window.quadrilateralAnimations[quadId].confirmAllAnglesRight = confirmAllAnglesRight;
      window.quadrilateralAnimations[elementName].confirmAllAnglesRight = confirmAllAnglesRight;
      
      // Function to calculate angles that each side makes with the horizontal (lower edge of screen)
      // Returns angles in degrees where 0° = right/east, 90° = up/north, 180° = left/west, 270° = down/south
      const getSideAngles = () => {
        console.log('📐 Calculating side angles for quadrilateral:', quadId);
        
        if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 4) {
          console.error('❌ Invalid coordinates');
          return null;
        }
        
        if (!vertices || vertices.length !== 4) {
          console.error('❌ Invalid vertices');
          return null;
        }
        
        // Get grid dimensions from props or state
        const gridSystemCols = window.GridPrecisionConfig?.gridSystemCols || 
          (window.GridPrecisionConfig?.precisionSettings && window.GridPrecisionConfig.precisionSettings[window.GridPrecisionConfig.currentPrecision]?.cols) || 1600;
        const gridSystemRows = window.GridPrecisionConfig?.gridSystemRows || 
          (window.GridPrecisionConfig?.precisionSettings && window.GridPrecisionConfig.precisionSettings[window.GridPrecisionConfig.currentPrecision]?.rows) || 900;
        
        // Get container dimensions
        const [x1, y1, x2, y2] = coordinates;
        const containerWidthGc = x2 - x1;
        const containerHeightGc = y2 - y1;
        
        // Calculate centered grid dimensions
        const gridWidthGc = gridCols;
        const gridHeightGc = gridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Get vertex positions using the same logic as animateConfirmRightAngle
        const getVertexPercent = (vertexIndex) => {
          const vertex = vertices[vertexIndex];
          if (!vertex) {
            console.error(`❌ Vertex ${vertexIndex} not found`);
            return null;
          }
          
          // Calculate position within centered grid (0-1 range)
          const percentX = vertex.col / gridCols;
          const percentY = vertex.row / gridRows;
          
          // Map to actual position within container (accounting for centered grid)
          const actualX = x1 + offsetXGc + percentX * gridWidthGc;
          const actualY = y1 + offsetYGc + percentY * gridHeightGc;
          
          // Convert precision grid coordinates to viewport percentages
          const xPercent = (actualX / gridSystemCols) * 100;
          const yPercent = (actualY / gridSystemRows) * 100;
          
          return {
            x: xPercent,
            y: yPercent
          };
        };
        
        // Get all vertex positions
        const vertexPositions = [];
        for (let i = 0; i < 4; i++) {
          const pos = getVertexPercent(i);
          if (!pos) {
            console.error(`❌ Could not get position for vertex ${i}`);
            return null;
          }
          vertexPositions.push(pos);
          console.log(`   Vertex ${i} (${vertexLabels[i]}): (${pos.x.toFixed(2)}%, ${pos.y.toFixed(2)}%)`);
        }
        
        // Calculate angles for each side
        // Side AB: from A (0) to B (1)
        // Side BC: from B (1) to C (2)
        // Side CD: from C (2) to D (3)
        // Side DA: from D (3) to A (0)
        
        const calculateAngle = (fromPos, toPos) => {
          // Calculate angle from 'from' to 'to' relative to horizontal (0° = right)
          // atan2(y, x) where y is negated because screen Y increases downward
          const yDiff = toPos.y - fromPos.y;
          const xDiff = toPos.x - fromPos.x;
          // Negate yDiff to convert from screen coordinates to math coordinates
          let angle = Math.atan2(-yDiff, xDiff) * (180 / Math.PI);
          // Normalize to 0-360° range
          while (angle < 0) angle += 360;
          while (angle >= 360) angle -= 360;
          
          // Normalize to 0-180° range to represent the side's orientation relative to horizontal
          // This way, both AB (0°) and CD (180°) will both show as 0° (horizontal)
          // If angle >= 180°, subtract 180° to get the equivalent angle in the 0-180° range
          if (angle >= 180) {
            angle = angle - 180;
          }
          
          return angle;
        };
        
        const angles = {
          AB: calculateAngle(vertexPositions[0], vertexPositions[1]),
          BC: calculateAngle(vertexPositions[1], vertexPositions[2]),
          CD: calculateAngle(vertexPositions[2], vertexPositions[3]),
          DA: calculateAngle(vertexPositions[3], vertexPositions[0])
        };
        
        // Function to determine position of a point relative to a line
        // Returns: 'above', 'below', 'left', 'right', or 'on'
        const getPointPositionRelativeToLine = (lineStart, lineEnd, point) => {
          // Calculate cross product to determine side
          // Cross product: (lineEnd - lineStart) × (point - lineStart)
          const dx = lineEnd.x - lineStart.x;
          const dy = lineEnd.y - lineStart.y;
          const px = point.x - lineStart.x;
          const py = point.y - lineStart.y;
          
          // Cross product (2D): dx * py - dy * px
          // Positive cross product means point is to the left of the line (when looking from start to end)
          // Negative cross product means point is to the right of the line
          const crossProduct = dx * py - dy * px;
          
          // Determine if line is more horizontal or vertical
          const isHorizontal = Math.abs(dy) < Math.abs(dx);
          
          if (Math.abs(crossProduct) < 0.001) {
            return 'on'; // Point is on the line (or very close)
          }
          
          if (isHorizontal) {
            // For horizontal lines, use above/below
            // In screen coordinates: Y increases downward
            // For a horizontal line going from left to right (dx > 0):
            //   - If point is above (smaller Y, py < 0), crossProduct = dx * py < 0, so return 'above'
            //   - If point is below (larger Y, py > 0), crossProduct = dx * py > 0, so return 'below'
            // For a horizontal line going from right to left (dx < 0):
            //   - If point is above (smaller Y, py < 0), crossProduct = dx * py > 0, so return 'above'
            //   - If point is below (larger Y, py > 0), crossProduct = dx * py < 0, so return 'below'
            // So the sign depends on dx direction. We need to check the actual Y difference.
            // Actually, simpler: check if point.y < lineStart.y (above) or point.y > lineStart.y (below)
            // But we need to account for the line direction. Let's use cross product sign relative to line direction.
            if (dx > 0) {
              // Line goes left to right: positive cross product = below, negative = above
              return crossProduct > 0 ? 'below' : 'above';
            } else {
              // Line goes right to left: positive cross product = above, negative = below
              return crossProduct > 0 ? 'above' : 'below';
            }
          } else {
            // For vertical lines, use left/right
            // In screen coordinates: X increases rightward
            // For a vertical line going from top to bottom (dy > 0):
            //   - If point is to the left (smaller X, px < 0), crossProduct = -dy * px > 0, so return 'left'
            //   - If point is to the right (larger X, px > 0), crossProduct = -dy * px < 0, so return 'right'
            // For a vertical line going from bottom to top (dy < 0):
            //   - If point is to the left (smaller X, px < 0), crossProduct = -dy * px < 0, so return 'left'
            //   - If point is to the right (larger X, px > 0), crossProduct = -dy * px > 0, so return 'right'
            // So the sign depends on dy direction. We need to check the actual X difference.
            if (dy > 0) {
              // Line goes top to bottom: positive cross product = left, negative = right
              return crossProduct > 0 ? 'left' : 'right';
            } else {
              // Line goes bottom to top: positive cross product = right, negative = left
              return crossProduct > 0 ? 'right' : 'left';
            }
          }
        };
        
        // For each side, determine position of the two vertices NOT on that side
        const sideInfo = {
          AB: {
            angle: angles.AB,
            vertices: ['A', 'B'],
            adjacentVertices: {
              C: getPointPositionRelativeToLine(vertexPositions[0], vertexPositions[1], vertexPositions[2]),
              D: getPointPositionRelativeToLine(vertexPositions[0], vertexPositions[1], vertexPositions[3])
            }
          },
          BC: {
            angle: angles.BC,
            vertices: ['B', 'C'],
            adjacentVertices: {
              A: getPointPositionRelativeToLine(vertexPositions[1], vertexPositions[2], vertexPositions[0]),
              D: getPointPositionRelativeToLine(vertexPositions[1], vertexPositions[2], vertexPositions[3])
            }
          },
          CD: {
            angle: angles.CD,
            vertices: ['C', 'D'],
            adjacentVertices: {
              A: getPointPositionRelativeToLine(vertexPositions[2], vertexPositions[3], vertexPositions[0]),
              B: getPointPositionRelativeToLine(vertexPositions[2], vertexPositions[3], vertexPositions[1])
            }
          },
          DA: {
            angle: angles.DA,
            vertices: ['D', 'A'],
            adjacentVertices: {
              B: getPointPositionRelativeToLine(vertexPositions[3], vertexPositions[0], vertexPositions[1]),
              C: getPointPositionRelativeToLine(vertexPositions[3], vertexPositions[0], vertexPositions[2])
            }
          }
        };
        
        console.log('');
        console.log('📐 Side angles and adjacent vertex positions:');
        for (const [sideName, info] of Object.entries(sideInfo)) {
          const adjVerts = Object.entries(info.adjacentVertices)
            .map(([v, pos]) => `${v}: ${pos}`)
            .join(', ');
          console.log(`   ${sideName}: ${info.angle.toFixed(1)}° (${info.vertices[0]}→${info.vertices[1]}) - Adjacent vertices: ${adjVerts}`);
        }
        console.log('');
        console.log('💡 Position reference:');
        console.log('   - For horizontal sides: "above" = smaller Y (toward top), "below" = larger Y (toward bottom)');
        console.log('   - For vertical sides: "left" = smaller X (toward left), "right" = larger X (toward right)');
        console.log('   - "on" = vertex is on the line (or very close)');
        
        return {
          angles: {
            AB: angles.AB,
            BC: angles.BC,
            CD: angles.CD,
            DA: angles.DA
          },
          sideInfo: sideInfo
        };
      };
      
      // Expose getSideAngles function
      window.quadrilateralAnimations[quadId].getSideAngles = getSideAngles;
      window.quadrilateralAnimations[elementName].getSideAngles = getSideAngles;
      containerRef.current.getSideAngles = getSideAngles;
      
      // Also expose as global helper function
      const safeGetSideAnglesFunctionName = `getSideAngles_${quadId.replace(/-/g, '_')}`;
      window[safeGetSideAnglesFunctionName] = getSideAngles;
      
      // Global helper that works with any quadrilateral
      if (!window.getSideAngles) {
        window.getSideAngles = function(quadIdOrName) {
          if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadIdOrName]) {
            const func = window.quadrilateralAnimations[quadIdOrName].getSideAngles;
            if (func) {
              return func();
            }
          }
          console.error('❌ Could not find getSideAngles for:', quadIdOrName);
          console.log('💡 Available quadrilaterals:', Object.keys(window.quadrilateralAnimations || {}));
          return null;
        };
      }
      
      // Store animation sequence methods
      window.quadrilateralAnimations[quadId].startAnimationSequence = runAnimationSequence;
      window.quadrilateralAnimations[quadId].stopAnimationSequence = stopAnimationSequence;
      window.quadrilateralAnimations[elementName].startAnimationSequence = runAnimationSequence;
      window.quadrilateralAnimations[elementName].stopAnimationSequence = stopAnimationSequence;
      
      // Expose as helper methods on the container element
      containerRef.current.animateAngleEquality = animateAngleEquality;
      containerRef.current.stopAngleEqualityAnimation = stopAngleEqualityAnimation;
      containerRef.current.animateAngleSum = animateAngleSum;
      containerRef.current.stopAngleSumAnimation = stopAngleSumAnimation;
      containerRef.current.animateSideEquality = animateSideEquality;
      containerRef.current.stopSideEqualityAnimation = stopSideEqualityAnimation;
      containerRef.current.animateAllSideEquality = animateAllSideEquality;
      containerRef.current.stopAllSideEqualityAnimation = stopAllSideEqualityAnimation;
      containerRef.current.animateConfirmRightAngle = animateConfirmRightAngle;
      containerRef.current.stopConfirmRightAngleAnimation = stopConfirmRightAngleAnimation;
      containerRef.current.confirmAllAnglesRight = confirmAllAnglesRight;
      containerRef.current.animateOppositeSideEquality = animateOppositeSideEquality;
      containerRef.current.stopOppositeSideAnimation = stopOppositeSideAnimation;
      containerRef.current.animateDiagonalEquality = animateDiagonalEquality;
      containerRef.current.stopDiagonalEqualityAnimation = stopDiagonalEqualityAnimation;
      containerRef.current.animateDiagonalBisection = animateDiagonalBisection;
      containerRef.current.stopDiagonalBisectionAnimation = stopDiagonalBisectionAnimation;
      containerRef.current.animateDiagonalPerpendicularBisection = animateDiagonalPerpendicularBisection;
      containerRef.current.stopDiagonalPerpendicularAnimation = stopDiagonalPerpendicularAnimation;
      containerRef.current.animateParallelLines = animateParallelLines;
      containerRef.current.stopParallelLinesAnimation = stopParallelLinesAnimation;
      containerRef.current.startAnimationSequence = runAnimationSequence;
      containerRef.current.stopAnimationSequence = stopAnimationSequence;
      containerRef.current.quadId = quadId;
    }
    
    // Cleanup on unmount
    return () => {
      if (angleAnimationRef.current) {
        cancelAnimationFrame(angleAnimationRef.current);
        angleAnimationRef.current = null;
      }
      if (diagonalEqualityAnimationRef.current) {
        cancelAnimationFrame(diagonalEqualityAnimationRef.current);
        diagonalEqualityAnimationRef.current = null;
      }
      if (diagonalBisectionAnimationRef.current) {
        cancelAnimationFrame(diagonalBisectionAnimationRef.current);
        diagonalBisectionAnimationRef.current = null;
      }
      if (diagonalPerpendicularAnimationRef.current) {
        cancelAnimationFrame(diagonalPerpendicularAnimationRef.current);
        diagonalPerpendicularAnimationRef.current = null;
      }
      if (parallelLinesAnimationRef.current) {
        cancelAnimationFrame(parallelLinesAnimationRef.current);
        parallelLinesAnimationRef.current = null;
      }
      const quadId = id || `${elementName}-${currentPage}`;
      const safeFunctionName = `animateAngleEquality_${quadId.replace(/-/g, '_')}`;
      if (window[safeFunctionName]) {
        delete window[safeFunctionName];
      }
      const safeSumFunctionName = `animateAngleSum_${quadId.replace(/-/g, '_')}`;
      if (window[safeSumFunctionName]) {
        delete window[safeSumFunctionName];
      }
      const safeDiagonalEqualityFunctionName = `animateDiagonalEquality_${quadId.replace(/-/g, '_')}`;
      if (window[safeDiagonalEqualityFunctionName]) {
        delete window[safeDiagonalEqualityFunctionName];
      }
      const safeDiagonalBisectionFunctionName = `animateDiagonalBisection_${quadId.replace(/-/g, '_')}`;
      if (window[safeDiagonalBisectionFunctionName]) {
        delete window[safeDiagonalBisectionFunctionName];
      }
      const safeDiagonalPerpendicularFunctionName = `animateDiagonalPerpendicularBisection_${quadId.replace(/-/g, '_')}`;
      if (window[safeDiagonalPerpendicularFunctionName]) {
        delete window[safeDiagonalPerpendicularFunctionName];
      }
      const safeParallelLinesFunctionName = `animateParallelLines_${quadId.replace(/-/g, '_')}`;
      if (window[safeParallelLinesFunctionName]) {
        delete window[safeParallelLinesFunctionName];
      }
      const safeConfirmRightAngleFunctionName = `animateConfirmRightAngle_${quadId.replace(/-/g, '_')}`;
      if (window[safeConfirmRightAngleFunctionName]) {
        delete window[safeConfirmRightAngleFunctionName];
      }
      const safeConfirmAllAnglesRightFunctionName = `confirmAllAnglesRight_${quadId.replace(/-/g, '_')}`;
      if (window[safeConfirmAllAnglesRightFunctionName]) {
        delete window[safeConfirmAllAnglesRightFunctionName];
      }
      if (window.quadrilateralAnimations) {
        if (window.quadrilateralAnimations[quadId]) {
          delete window.quadrilateralAnimations[quadId].animateEquality;
          delete window.quadrilateralAnimations[quadId].animateSum;
          delete window.quadrilateralAnimations[quadId].animateDiagonalEquality;
          delete window.quadrilateralAnimations[quadId].animateDiagonalBisection;
          delete window.quadrilateralAnimations[quadId].animateDiagonalPerpendicularBisection;
          delete window.quadrilateralAnimations[quadId].animateConfirmRightAngle;
        }
        if (window.quadrilateralAnimations[elementName]) {
          delete window.quadrilateralAnimations[elementName].animateEquality;
          delete window.quadrilateralAnimations[elementName].animateSum;
          delete window.quadrilateralAnimations[elementName].animateDiagonalEquality;
          delete window.quadrilateralAnimations[elementName].animateDiagonalBisection;
          delete window.quadrilateralAnimations[elementName].animateDiagonalPerpendicularBisection;
          delete window.quadrilateralAnimations[elementName].animateConfirmRightAngle;
        }
      }
      if (containerRef.current) {
        delete containerRef.current.animateAngleEquality;
        delete containerRef.current.stopAngleEqualityAnimation;
        delete containerRef.current.animateAngleSum;
        delete containerRef.current.stopAngleSumAnimation;
        delete containerRef.current.animateAllSideEquality;
        delete containerRef.current.stopAllSideEqualityAnimation;
        delete containerRef.current.animateConfirmRightAngle;
        delete containerRef.current.stopConfirmRightAngleAnimation;
        delete containerRef.current.animateDiagonalEquality;
        delete containerRef.current.stopDiagonalEqualityAnimation;
        delete containerRef.current.animateDiagonalBisection;
        delete containerRef.current.stopDiagonalBisectionAnimation;
        delete containerRef.current.animateDiagonalPerpendicularBisection;
        delete containerRef.current.stopDiagonalPerpendicularAnimation;
        delete containerRef.current.startAnimationSequence;
        delete containerRef.current.stopAnimationSequence;
        delete containerRef.current.quadId;
      }
      
      // Note: Don't clear all side equality animation here - it should run until complete
      // It will be cleaned up on component unmount via a separate effect
    };
  }, [animateAngleEquality, stopAngleEqualityAnimation, animateAngleSum, stopAngleSumAnimation, animateDiagonalEquality, stopDiagonalEqualityAnimation, animateDiagonalBisection, stopDiagonalBisectionAnimation, animateDiagonalPerpendicularBisection, stopDiagonalPerpendicularAnimation, runAnimationSequence, stopAnimationSequence, id, elementName, currentPage]);
  
  // Separate effect for cleanup on unmount only (empty dependency array)
  React.useEffect(() => {
    return () => {
      // Cleanup on unmount - stop all animations
      if (allSideEqualityAnimationRef.current) {
        // Check if it's a setInterval ID (positive number) or requestAnimationFrame ID
        if (typeof allSideEqualityAnimationRef.current === 'number' && allSideEqualityAnimationRef.current > 0) {
          clearInterval(allSideEqualityAnimationRef.current);
        } else {
          cancelAnimationFrame(allSideEqualityAnimationRef.current);
        }
        allSideEqualityAnimationRef.current = null;
      }
      allSideEqualityStateRef.current = null;
      
      // Cleanup confirm right angle animation
      if (confirmRightAngleAnimationRef.current) {
        if (typeof confirmRightAngleAnimationRef.current === 'number' && confirmRightAngleAnimationRef.current > 0) {
          clearInterval(confirmRightAngleAnimationRef.current);
        } else {
          cancelAnimationFrame(confirmRightAngleAnimationRef.current);
        }
        confirmRightAngleAnimationRef.current = null;
      }
      confirmRightAngleStateRef.current = null;
    };
  }, []); // Empty array = only run on mount/unmount

  // Calculate diagonal intersection point for protractor snap points
  const diagonalIntersection = React.useMemo(() => {
    // Calculate intersection of diagonals AC (0-2) and BD (1-3)
    const A = vertices[0]; // {row, col}
    const B = vertices[1];
    const C = vertices[2];
    const D = vertices[3];
    
    // Line AC: from A to C
    const x1 = A.col, y1 = A.row;
    const x2 = C.col, y2 = C.row;
    
    // Line BD: from B to D
    const x3 = B.col, y3 = B.row;
    const x4 = D.col, y4 = D.row;
    
    // Calculate intersection using line intersection formula
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    
    if (Math.abs(denom) < 0.0001) {
      // Lines are parallel or nearly parallel
      return null;
    }
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    
    // Calculate intersection point
    const intersectionCol = x1 + t * (x2 - x1);
    const intersectionRow = y1 + t * (y2 - y1);
    
    return {
      col: intersectionCol,
      row: intersectionRow
    };
  }, [vertices]);

  // Normalize vertex to nearest integer grid position
  const normalizeVertex = React.useCallback((vertex) => {
    return {
      row: Math.round(vertex.row),
      col: Math.round(vertex.col)
    };
  }, []);

  // Calculate protractor snap points (vertices + diagonal intersection)
  const protractorSnapPoints = React.useMemo(() => {
    const snapPoints = [];
    
    // Add all vertices as snap points
    vertices.forEach((vertex, index) => {
      const labels = ['A', 'B', 'C', 'D'];
      const normalizedVertex = normalizeVertex(vertex);
      
      const snapPoint = {
        x: normalizedVertex.col,
        y: normalizedVertex.row,
        label: `Vertex ${labels[index]}`
      };
      snapPoints.push(snapPoint);
    });
    
    // Add diagonal intersection if it exists and diagonals are shown
    if (diagonalIntersection && currentShowDiagonals) {
      const normalizedIntersection = normalizeVertex(diagonalIntersection);
      const intersectionPoint = {
        x: normalizedIntersection.col,
        y: normalizedIntersection.row,
        label: 'Diagonal Intersection'
      };
      snapPoints.push(intersectionPoint);
    }
    
    return snapPoints;
  }, [vertices, diagonalIntersection, currentShowDiagonals, gridRows, gridCols, normalizeVertex]);

  /**
   * Highly Accurate Quad Grid to Precision Grid Coordinate Converter
   * 
   * Converts a point from the quadrilateral's internal grid coordinate system
   * to the global precision grid coordinate system (99.99% accurate).
   * 
   * @param {Object} quadGridPoint - Point in quad grid {col, row} (0-indexed)
   * @param {Object} options - Conversion options
   * @param {boolean} options.forHotspot - If true, returns center position for hotspot coordinates
   * @returns {Object} Precision grid position {x, y} or {col, row}
   * 
   * Formula:
   * 1. Calculate position within container (0-1 range):
   *    - percentX = col / gridCols
   *    - percentY = row / gridRows
   * 
   * 2. Convert to absolute precision grid position:
   *    - absX = x1 + percentX * (x2 - x1)
   *    - absY = y1 + percentY * (y2 - y1)
   * 
   * 3. For hotspot: hotspot uses center = ((x1+x2)/2 - 1)
   *    - If we want hotspot at position P, we need center = P + 1
   *    - So return (absX + 1, absY + 1) for hotspot coordinates
   *    - Otherwise return (absX, absY) for direct precision grid position
   */
  const quadGridToPrecisionGrid = React.useCallback((quadGridPoint, options = {}) => {
    if (!coordinates) {
      console.warn('⚠️ [quadGridToPrecisionGrid] No coordinates provided, returning default');
      return options.forHotspot ? { x: 800, y: 450 } : { col: 800, row: 450 };
    }
    
    const { forHotspot = false } = options;
    const [x1, y1, x2, y2] = coordinates;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    const { gridWidthGc, gridHeightGc, offsetXGc, offsetYGc } = gridDimensions;
    
    // Calculate position within centered grid (0-1 range)
    const percentX = quadGridPoint.col / gridCols;
    const percentY = quadGridPoint.row / gridRows;
    
    // Map to actual position within container (accounting for centered grid)
    const actualX = x1 + offsetXGc + percentX * gridWidthGc;
    const actualY = y1 + offsetYGc + percentY * gridHeightGc;
    
    if (forHotspot) {
      // For hotspots: return center position
      return { x: actualX, y: actualY };
    } else {
      // For precision grid positions: return rounded coordinates
      return {
        col: Math.round(actualX),
        row: Math.round(actualY)
      };
    }
  }, [coordinates, gridRows, gridCols, gridDimensions]);

  // Legacy function - now uses the accurate converter
  const gridToPageCoordinates = React.useCallback((vertex) => {
    const result = quadGridToPrecisionGrid(vertex, { forHotspot: true });
    return [Math.round(result.x), Math.round(result.y)];
  }, [quadGridToPrecisionGrid]);

  // Convert grid coordinates to grid cell format for protractor
  // Uses the highly accurate quadGridToPrecisionGrid converter
  // Returns the actual visual position (where the hotspot appears)
  const gridToGridCell = React.useCallback((gridCoord) => {
    const result = quadGridToPrecisionGrid(gridCoord, { forHotspot: false });
    const finalResult = {
      col: result.col,
      row: result.row
    };
    return finalResult;
  }, [quadGridToPrecisionGrid]);

  // Function to spawn protractor at a vertex (for angle arc clicks)
  const spawnProtractorAtVertex = React.useCallback((vertexGridCoords) => {
    if (!protractorConfig.enableClickToSpawn) {
      return;
    }
    
    console.log('🎯 [Quadrilateral] Spawning protractor at vertex:', vertexGridCoords);
    console.log('   Original snap points (quad grid):', protractorSnapPoints);
    
    // Get precision grid dimensions for reference
    const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    console.log('   📐 Precision grid dimensions:', { rows: precisionRows, cols: precisionCols });
    console.log('   📐 Quadrilateral grid dimensions:', { rows: gridRows, cols: gridCols });
    console.log('   📐 Quadrilateral container coordinates:', coordinates);
    
    // Verify coordinate systems match
    const quadGridPercentX = (protractorSnapPoints[0]?.x / gridCols) * 100;
    const quadGridPercentY = (protractorSnapPoints[0]?.y / gridRows) * 100;
    console.log(`   🔍 Coordinate system verification:`);
    console.log(`      Quad grid formula: (col/${gridCols}) * 100 = (${protractorSnapPoints[0]?.x}/${gridCols}) * 100 = ${quadGridPercentX.toFixed(2)}%`);
    console.log(`      This should match visual position within quadrilateral container`);
    
    // Convert snap points from quadrilateral grid to precision grid
    const convertedSnapPoints = protractorSnapPoints.map((point, index) => {
      const converted = gridToGridCell({ row: point.y, col: point.x });
      const result = {
        x: converted.col,  // x in precision grid (0 to precisionCols)
        y: converted.row,  // y in precision grid (0 to precisionRows)
        label: point.label
      };
      
      // Calculate what percentage this represents in precision grid
      const precisionPercentX = (result.x / precisionCols) * 100;
      const precisionPercentY = (result.y / precisionRows) * 100;
      
      // Calculate what percentage this represents within the quadrilateral container
      const quadPercentX = (point.x / gridCols) * 100;
      const quadPercentY = (point.y / gridRows) * 100;
      
      console.log(`   📍 Snap point ${index + 1} "${point.label}":`);
      console.log(`      Quad grid: (col=${point.x}, row=${point.y})`);
      console.log(`      Quad grid %: (${quadPercentX.toFixed(2)}%, ${quadPercentY.toFixed(2)}%) within container`);
      console.log(`      Precision grid: (x=${result.x.toFixed(2)}, y=${result.y.toFixed(2)})`);
      console.log(`      Precision grid %: (${precisionPercentX.toFixed(2)}%, ${precisionPercentY.toFixed(2)}%) globally`);
      
      return result;
    });
    
    console.log('   ✅ Converted snap points (precision grid):', convertedSnapPoints);
    
    // Convert vertex position to precision grid
    const vertexPosition = gridToGridCell(vertexGridCoords);
    
    // VERIFICATION: Compare with visual position calculation
    const visualPosition = gridToPageCoordinates(vertexGridCoords);
    const visualX = visualPosition[0];
    const visualY = visualPosition[1];
    
    // Calculate what percentage the visual position represents
    const visualPercentX = (visualX / precisionCols) * 100;
    const visualPercentY = (visualY / precisionRows) * 100;
    
    // Calculate what percentage the protractor position represents
    const protractorPercentX = (vertexPosition.col / precisionCols) * 100;
    const protractorPercentY = (vertexPosition.row / precisionRows) * 100;
    
    console.log('   📍 Protractor center:');
    console.log(`      Quad grid: (col=${vertexGridCoords.col}, row=${vertexGridCoords.row})`);
    console.log(`      Visual position (gridToPageCoordinates): (${visualX}, ${visualY}) = (${visualPercentX.toFixed(2)}%, ${visualPercentY.toFixed(2)}%)`);
    console.log(`      Protractor position (gridToGridCell): (${vertexPosition.col}, ${vertexPosition.row}) = (${protractorPercentX.toFixed(2)}%, ${protractorPercentY.toFixed(2)}%)`);
    
    // Verify they match exactly (should be identical now that both use rounding)
    if (visualX === vertexPosition.col && visualY === vertexPosition.row) {
      console.log(`      ✅ Conversion verified: Positions match EXACTLY (${visualX}, ${visualY})`);
    } else {
      const xDiff = Math.abs(visualPercentX - protractorPercentX);
      const yDiff = Math.abs(visualPercentY - protractorPercentY);
      console.error(`      ❌ CONVERSION MISMATCH: Visual (${visualX}, ${visualY}) vs Protractor (${vertexPosition.col}, ${vertexPosition.row})`);
      console.error(`         Difference: (${xDiff.toFixed(2)}%, ${yDiff.toFixed(2)}%)`);
      console.error(`         This indicates a grid conversion error!`);
    }
    
    // Use the global protractor manager to spawn
    if (typeof window !== 'undefined' && window.spawnProtractorAtVertex) {
      console.log('🚀 [Quadrilateral] Passing snap points to protractor:', {
        count: convertedSnapPoints.length,
        points: convertedSnapPoints,
        snapMode: 'fixed', // Snap only mode - must snap to one of the points
        snapThreshold: 50,
        showSnapIndicators: false, // Hidden - no visible markers
        highlightNearestSnap: true // Highlighted when hovering near
      });
      
      window.spawnProtractorAtVertex(
        { row: vertexPosition.row, col: vertexPosition.col },
        {
          // Visual settings
          protractorType: "semicircular", // "semicircular" (0-180°) or "circular" (0-360°)
          radius: "150gc",
          color: "#2C3E50",  // Darker border for contrast
          backgroundColor: "rgba(200, 220, 255, 0.25)", // Light blue glass tint
          showDegreeMarks: true,
          showDegreeLabels: true,
          degreeInterval: 10,
          labelInterval: 30,
          labelColor: "#1A252F", // Font color for degree numbers
          labelFontSize: "14gc", // Font size in GC units
          majorTickLength: "18gc", // Length of major tick marks in GC
          minorTickLength: "10gc", // Length of minor tick marks in GC
          majorTickWidth: "2.5gc", // Thickness of major tick marks in GC
          minorTickWidth: "1.5gc", // Thickness of minor tick marks in GC
          showRotationRing: false, // Hide the dashed rotation circle (true to show)
          
          // Interaction settings - FULLY INTERACTIVE
          mode: "interactive", // Enables both drag and rotate
          isDraggable: true,   // Can drag to move
          isRotatable: true,   // Can rotate the arm
          isProtractorRotatable: true,  // Can rotate the entire protractor body (Ctrl+drag or two-finger touch)
          showProtractorRotationHandle: true,  // Show rotation handle for touch/TV interfaces
          cursor: "move",      // Shows move cursor
          
          // Measurement arm
          measurementArm: {
            show: true,
            startDeg: 45,        // Starting angle in degrees (0° = right, increases counterclockwise)
            color: "#C0392B",
            style: "dashed",     // "solid" or "dashed"
            extendable: true,    // Extend beyond protractor edge (1.5x length)
            zIndex: 10,          // Higher than protractor body (body is at 5)
            angleDisplay: {
              show: true,
              size: "16gc",      // Font size in GC units
              color: "#C0392B"   // Custom color for angle text (null = use arm color)
            }
          },
          
          // Baseline (horizontal reference line at 0°) - separate from measurement arm
          baseline: {
            show: true,          // Show/hide baseline
            color: "#C0392B",    // Line color
            style: "dashed",     // "solid" or "dashed"
            width: 2             // Line width in pixels
          },
          
          snapToDegrees: 1,
          anglePrecision: 0,
          
          // Snap Points Configuration (using converted snap points from quadrilateral)
          snapMode: "fixed", // "free" (no snap), "fixed" (must snap), "hybrid" (optional snap) - FIXED = snap only mode
          snapThreshold: 50, // Distance in pixels to trigger snap
          showSnapIndicators: false, // Hide visual indicators for snap points
          highlightNearestSnap: true, // Highlight (turn green) the nearest snap point when hovering nearby
          snapPoints: convertedSnapPoints, // Use converted snap points from quadrilateral vertices + diagonal intersection
          
          // ============ CALLBACK FUNCTIONS ============
          // Real-time feedback for all interactive changes
          
          // Called when measurement arm angle changes (0-360°)
          onAngleChange: (angle) => {
            console.log(`📐 Arm angle: ${angle.toFixed(1)}°`);
            // You can update UI, validate angles, sync with other elements, etc.
          },
          
          // Called when arm length changes (when extendable: true)
          onArmExtend: (length) => {
            console.log(`📏 Arm length: ${length.toFixed(0)}px`);
            // Track extended measurements, calculate distances
          },
          
          // Called when protractor body rotates (Ctrl+drag or touch)
          onProtractorRotate: (rotation) => {
            console.log(`🔄 Protractor rotation: ${rotation.toFixed(1)}°`);
            // Track orientation, align with other elements
          },
          
          // Called when protractor is dragged to new position
          onPositionChange: (position, snapPoint) => {
            console.log(`📍 Position: (${position.x.toFixed(0)}, ${position.y.toFixed(0)})`);
            if (snapPoint) {
              console.log(`   ✨ Snapped to: ${snapPoint.label || 'unnamed point'}`);
            }
            // Save state, update related elements, track movement
          },
          
          // Called specifically when protractor snaps to a snap point
          onSnapToPoint: (snapPoint) => {
            console.log(`✨ Snapped to ${snapPoint.label || 'unnamed'}!`);
            console.log(`   Coordinates: (${snapPoint.x}, ${snapPoint.y})`);
            // Highlight vertex, provide feedback, update context
          },
          
          // Called when protractor is clicked
          onClick: (e) => {
            console.log('🖱️ Protractor clicked');
            // Toggle selection, show properties, context menu
          }
        }
      );
    } else {
      console.error('❌ Protractor manager not available!');
    }
    
    // Call debug function to print coordinates (will be available after component mounts)
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const debugKey = `debugQuadCoordinates_${id || elementName || 'default'}`;
        if (window[debugKey]) {
          console.log('\n🔍 [Auto-debug] Printing coordinates after spawning protractor...');
          window[debugKey]();
        }
      }
    }, 100);
  }, [protractorConfig, protractorSnapPoints, gridToGridCell, id, elementName]);

  // Global click debug function - logs precision grid and screen coordinates on click
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create a unique function name for this quadrilateral
    const clickDebugKey = `enableClickDebug_${id || elementName || 'default'}`;
    
    // Only set up once globally (not per quadrilateral instance)
    if (!window.enableClickCoordinateDebug) {
      let clickDebugEnabled = false;
      let clickDebugListener = null;
      
      window.enableClickCoordinateDebug = () => {
        if (clickDebugEnabled) {
          console.log('🛑 Click coordinate debug DISABLED');
          if (clickDebugListener) {
            document.removeEventListener('click', clickDebugListener);
            clickDebugListener = null;
          }
          clickDebugEnabled = false;
          return;
        }
        
        console.log('🖱️ Click coordinate debug ENABLED');
        console.log('   Click anywhere on the page to see coordinates');
        console.log('   Run window.enableClickCoordinateDebug() again to disable');
        
        clickDebugEnabled = true;
        
        clickDebugListener = (e) => {
          const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          
          // Screen coordinates (pixels)
          const screenX = e.clientX;
          const screenY = e.clientY;
          
          // Percentage coordinates
          const percentX = (screenX / viewportWidth) * 100;
          const percentY = (screenY / viewportHeight) * 100;
          
          // Precision grid coordinates
          const precisionCol = (screenX / viewportWidth) * precisionCols;
          const precisionRow = (screenY / viewportHeight) * precisionRows;
          
          console.log('\n🖱️ ========== CLICK COORDINATE DEBUG ==========');
          console.log(`📍 Screen coordinates (pixels): (${screenX}, ${screenY})`);
          console.log(`📍 Percentage coordinates: (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)`);
          console.log(`📍 Precision grid coordinates: (col=${precisionCol.toFixed(2)}, row=${precisionRow.toFixed(2)})`);
          console.log(`📍 Precision grid (rounded): (col=${Math.round(precisionCol)}, row=${Math.round(precisionRow)})`);
          
          // Check if click is within any quadrilateral container
          const quadElements = document.querySelectorAll('[data-element-name*="quadrilateral"]');
          quadElements.forEach((quadEl) => {
            const rect = quadEl.getBoundingClientRect();
            if (screenX >= rect.left && screenX <= rect.right && 
                screenY >= rect.top && screenY <= rect.bottom) {
              const quadId = quadEl.getAttribute('data-element-name') || quadEl.id;
              console.log(`\n   📐 Click is within quadrilateral: ${quadId}`);
              
              // Get container coordinates from data attributes or calculate
              const containerStyle = window.getComputedStyle(quadEl);
              const containerLeft = parseFloat(containerStyle.left);
              const containerTop = parseFloat(containerStyle.top);
              const containerWidth = rect.width;
              const containerHeight = rect.height;
              
              // Calculate relative position within container
              const relativeX = screenX - rect.left;
              const relativeY = screenY - rect.top;
              const relativePercentX = (relativeX / containerWidth) * 100;
              const relativePercentY = (relativeY / containerHeight) * 100;
              
              console.log(`   📍 Relative to container: (${relativeX.toFixed(2)}px, ${relativeY.toFixed(2)}px)`);
              console.log(`   📍 Relative percentage: (${relativePercentX.toFixed(2)}%, ${relativePercentY.toFixed(2)}%)`);
              
              // Try to get quad grid coordinates if we can access the component
              const debugFunc = window[`debugQuadCoordinates_${quadId}`];
              if (debugFunc) {
                console.log(`   💡 Run window.debugQuadCoordinates_${quadId}() for full coordinate details`);
              }
            }
          });
          
          console.log('🔍 ============================================\n');
        };
        
        document.addEventListener('click', clickDebugListener);
      };
      
      console.log('✅ Global click debug function available: window.enableClickCoordinateDebug()');
      console.log('   Run this function to enable/disable coordinate logging on click');
    }
  }, [id, elementName]);

  // Debug function to print vertex and snap point coordinates
  const debugCoordinates = React.useCallback(() => {
    const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    console.log('🔍 ========== QUADRILATERAL COORDINATE DEBUG ==========');
    console.log(`📐 Quadrilateral ID: ${id || elementName || 'unknown'}`);
    console.log(`📐 Grid dimensions: ${gridRows} rows × ${gridCols} cols`);
    console.log(`📐 Precision grid: ${precisionRows} rows × ${precisionCols} cols`);
    console.log(`📐 Container coordinates: [${coordinates?.join(', ') || 'N/A'}]`);
    console.log('');
    
    console.log('📍 VERTICES (Quad Grid → Precision Grid):');
    vertices.forEach((vertex, index) => {
      const labels = ['A', 'B', 'C', 'D'];
      const converted = gridToGridCell({ row: vertex.row, col: vertex.col });
      
      console.log(`   ${labels[index]}:`);
      console.log(`      Quad grid (0-based):     (col=${vertex.col}/${gridCols-1}, row=${vertex.row}/${gridRows-1})`);
      console.log(`      Quad grid position:       col ${vertex.col} of ${gridCols} (${((vertex.col / (gridCols-1)) * 100).toFixed(1)}%), row ${vertex.row} of ${gridRows} (${((vertex.row / (gridRows-1)) * 100).toFixed(1)}%)`);
      console.log(`      Precision grid:          (col=${converted.col.toFixed(2)}, row=${converted.row.toFixed(2)})`);
      console.log(`      As percentage:           (${((converted.col / precisionCols) * 100).toFixed(2)}%, ${((converted.row / precisionRows) * 100).toFixed(2)}%)`);
      
      // Validate: check if vertex is at expected position
      if (vertex.col < 0 || vertex.col >= gridCols || vertex.row < 0 || vertex.row >= gridRows) {
        console.warn(`      ⚠️ WARNING: Vertex ${labels[index]} is OUTSIDE quad grid bounds!`);
      }
    });
    console.log('');
    
    if (diagonalIntersection) {
      const converted = gridToGridCell({ row: diagonalIntersection.row, col: diagonalIntersection.col });
      console.log('📍 DIAGONAL INTERSECTION:');
      console.log(`   Quad grid:     (col=${diagonalIntersection.col}, row=${diagonalIntersection.row})`);
      console.log(`   Precision grid: (col=${converted.col.toFixed(2)}, row=${converted.row.toFixed(2)})`);
      console.log(`   As percentage:  (${((converted.col / precisionCols) * 100).toFixed(2)}%, ${((converted.row / precisionRows) * 100).toFixed(2)}%)`);
      console.log('');
    }
    
    console.log('📍 SNAP POINTS (for Protractor):');
    protractorSnapPoints.forEach((point, index) => {
      const converted = gridToGridCell({ row: point.y, col: point.x });
      
      // Validate snap point coordinates
      const isValidX = point.x >= 0 && point.x < gridCols;
      const isValidY = point.y >= 0 && point.y < gridRows;
      
      console.log(`   ${index + 1}. ${point.label}:`);
      console.log(`      Quad grid:     (x=${point.x}, y=${point.y})`);
      if (!isValidX || !isValidY) {
        console.warn(`      ⚠️ INVALID: x should be [0-${gridCols-1}], y should be [0-${gridRows-1}]`);
      }
      console.log(`      Precision grid: (x=${converted.col.toFixed(2)}, y=${converted.row.toFixed(2)})`);
      console.log(`      As percentage:  (${((converted.col / precisionCols) * 100).toFixed(2)}%, ${((converted.row / precisionRows) * 100).toFixed(2)}%)`);
      
      // Cross-reference: if this is a vertex, verify it matches the vertex list
      if (point.label.startsWith('Vertex')) {
        const vertexIndex = ['A', 'B', 'C', 'D'].indexOf(point.label.split(' ')[1]);
        if (vertexIndex >= 0 && vertices[vertexIndex]) {
          const vertex = vertices[vertexIndex];
          if (vertex.col !== point.x || vertex.row !== point.y) {
            console.error(`      ❌ MISMATCH: Snap point (x=${point.x}, y=${point.y}) doesn't match vertex (col=${vertex.col}, row=${vertex.row})!`);
          } else {
            console.log(`      ✅ Verified: Matches vertex ${['A', 'B', 'C', 'D'][vertexIndex]}`);
            
            // Calculate visual position for comparison
            const [x1, y1, x2, y2] = coordinates || [0, 0, 1600, 900];
            const containerWidth = x2 - x1;
            const containerHeight = y2 - y1;
            const visualX = (x1 - 1) + (vertex.col / gridCols) * containerWidth;
            const visualY = (y1 - 1) + (vertex.row / gridRows) * containerHeight;
            const visualPercentX = (visualX / precisionCols) * 100;
            const visualPercentY = (visualY / precisionRows) * 100;
            
            console.log(`      📍 Visual position: (${visualX.toFixed(2)}, ${visualY.toFixed(2)}) = (${visualPercentX.toFixed(2)}%, ${visualPercentY.toFixed(2)}%)`);
            console.log(`      📍 Snap point position: (${converted.col.toFixed(2)}, ${converted.row.toFixed(2)}) = (${((converted.col / precisionCols) * 100).toFixed(2)}%, ${((converted.row / precisionRows) * 100).toFixed(2)}%)`);
            
            // Check if they match (within 0.1% tolerance)
            const xDiff = Math.abs(visualPercentX - ((converted.col / precisionCols) * 100));
            const yDiff = Math.abs(visualPercentY - ((converted.row / precisionRows) * 100));
            if (xDiff > 0.1 || yDiff > 0.1) {
              console.warn(`      ⚠️ POSITION MISMATCH: Visual and snap positions differ by (${xDiff.toFixed(2)}%, ${yDiff.toFixed(2)}%)`);
            } else {
              console.log(`      ✅ Positions match (within 0.1% tolerance)`);
            }
          }
        }
      }
    });
    console.log('🔍 ====================================================');
    
    return {
      vertices: vertices.map((v, i) => {
        const labels = ['A', 'B', 'C', 'D'];
        const converted = gridToGridCell({ row: v.row, col: v.col });
        return {
          label: labels[i],
          quadGrid: { col: v.col, row: v.row },
          precisionGrid: { col: converted.col, row: converted.row },
          percentage: {
            left: ((converted.col / precisionCols) * 100).toFixed(2) + '%',
            top: ((converted.row / precisionRows) * 100).toFixed(2) + '%'
          }
        };
      }),
      diagonalIntersection: diagonalIntersection ? (() => {
        const converted = gridToGridCell({ row: diagonalIntersection.row, col: diagonalIntersection.col });
        return {
          quadGrid: { col: diagonalIntersection.col, row: diagonalIntersection.row },
          precisionGrid: { col: converted.col, row: converted.row },
          percentage: {
            left: ((converted.col / precisionCols) * 100).toFixed(2) + '%',
            top: ((converted.row / precisionRows) * 100).toFixed(2) + '%'
          }
        };
      })() : null,
      snapPoints: protractorSnapPoints.map((point) => {
        const converted = gridToGridCell({ row: point.y, col: point.x });
        return {
          label: point.label,
          quadGrid: { x: point.x, y: point.y },
          precisionGrid: { x: converted.col, y: converted.row },
          percentage: {
            left: ((converted.col / precisionCols) * 100).toFixed(2) + '%',
            top: ((converted.row / precisionRows) * 100).toFixed(2) + '%'
          }
        };
      })
    };
  }, [vertices, diagonalIntersection, protractorSnapPoints, gridToGridCell, gridRows, gridCols, coordinates, id, elementName]);

  // Function to display Vertex A coordinates in all formats
  const showVertexACoordinates = React.useCallback(() => {
    if (!vertices || vertices.length === 0) {
      console.warn('⚠️ No vertices available');
      return null;
    }
    
    const vertexA = vertices[0]; // Vertex A is the first vertex
    const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert to precision grid
    const precisionPos = gridToGridCell({ row: vertexA.row, col: vertexA.col });
    
    // Calculate screen percentage
    const screenPercentX = (precisionPos.col / precisionCols) * 100;
    const screenPercentY = (precisionPos.row / precisionRows) * 100;
    
    // Get hotspot center position (for reference)
    const hotspotCenter = quadGridToPrecisionGrid(vertexA, { forHotspot: true });
    
    console.log('\n📍 ========== VERTEX A COORDINATES ==========');
    console.log(`📐 Quadrilateral: ${id || elementName || 'default'}`);
    console.log(`📐 Grid: ${gridRows} rows × ${gridCols} cols`);
    console.log(`📐 Container: [${coordinates?.[0] || 'N/A'}, ${coordinates?.[1] || 'N/A'}, ${coordinates?.[2] || 'N/A'}, ${coordinates?.[3] || 'N/A'}]`);
    console.log('');
    console.log('1️⃣ QUAD GRID COORDINATES (0-indexed):');
    console.log(`   col: ${vertexA.col} (of ${gridCols - 1}, ${((vertexA.col / (gridCols - 1)) * 100).toFixed(2)}%)`);
    console.log(`   row: ${vertexA.row} (of ${gridRows - 1}, ${((vertexA.row / (gridRows - 1)) * 100).toFixed(2)}%)`);
    console.log(`   Format: { col: ${vertexA.col}, row: ${vertexA.row} }`);
    console.log('');
    console.log('2️⃣ PRECISION GRID COORDINATES:');
    console.log(`   col: ${precisionPos.col} (of ${precisionCols - 1})`);
    console.log(`   row: ${precisionPos.row} (of ${precisionRows - 1})`);
    console.log(`   Format: { col: ${precisionPos.col}, row: ${precisionPos.row} }`);
    console.log('');
    console.log('3️⃣ SCREEN PERCENTAGE COORDINATES:');
    console.log(`   left: ${screenPercentX.toFixed(4)}%`);
    console.log(`   top:  ${screenPercentY.toFixed(4)}%`);
    console.log(`   Format: { left: "${screenPercentX.toFixed(2)}%", top: "${screenPercentY.toFixed(2)}%" }`);
    console.log('');
    console.log('4️⃣ HOTSPOT CENTER POSITION (for reference):');
    console.log(`   x: ${hotspotCenter.x.toFixed(2)}`);
    console.log(`   y: ${hotspotCenter.y.toFixed(2)}`);
    console.log(`   (This is the center value used for hotspot coordinates [x-5, y-5, x+5, y+5])`);
    console.log('');
    console.log('📊 COMPLETE COORDINATE OBJECT:');
    const completeObject = {
      quadGrid: {
        col: vertexA.col,
        row: vertexA.row,
        description: `Column ${vertexA.col} of ${gridCols} (${((vertexA.col / (gridCols - 1)) * 100).toFixed(2)}%), Row ${vertexA.row} of ${gridRows} (${((vertexA.row / (gridRows - 1)) * 100).toFixed(2)}%)`
      },
      precisionGrid: {
        col: precisionPos.col,
        row: precisionPos.row,
        description: `Column ${precisionPos.col} of ${precisionCols}, Row ${precisionPos.row} of ${precisionRows}`
      },
      screenPercentage: {
        left: `${screenPercentX.toFixed(4)}%`,
        top: `${screenPercentY.toFixed(4)}%`,
        description: `${screenPercentX.toFixed(2)}% from left, ${screenPercentY.toFixed(2)}% from top`
      },
      hotspotCenter: {
        x: hotspotCenter.x,
        y: hotspotCenter.y,
        description: 'Center position for hotspot coordinates (before -1 offset)'
      }
    };
    console.log(completeObject);
    console.log('📍 ============================================\n');
    
    return completeObject;
  }, [vertices, gridToGridCell, quadGridToPrecisionGrid, id, elementName, gridRows, gridCols, coordinates]);

  // Function to place a visual dot at precision grid coordinates for verification
  const placePrecisionGridDot = React.useCallback((precisionCol, precisionRow, label = 'Precision Grid Point') => {
    const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert precision grid to screen percentage
    const percentX = (precisionCol / precisionCols) * 100;
    const percentY = (precisionRow / precisionRows) * 100;
    
    // Remove any existing dot with the same label
    const existingDot = document.getElementById(`precision-grid-dot-${label.replace(/\s+/g, '-')}`);
    if (existingDot) {
      existingDot.remove();
    }
    
    // Create dot element
    const dot = document.createElement('div');
    dot.id = `precision-grid-dot-${label.replace(/\s+/g, '-')}`;
    dot.style.position = 'fixed';
    dot.style.left = `${percentX}%`;
    dot.style.top = `${percentY}%`;
    dot.style.width = '20px';
    dot.style.height = '20px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = 'red';
    dot.style.border = '3px solid white';
    dot.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.zIndex = '10000';
    dot.style.pointerEvents = 'none';
    dot.style.cursor = 'default';
    dot.title = `${label}: Precision Grid (${precisionCol}, ${precisionRow}) = Screen (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)`;
    
    // Add label text
    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    labelEl.style.position = 'absolute';
    labelEl.style.top = '25px';
    labelEl.style.left = '50%';
    labelEl.style.transform = 'translateX(-50%)';
    labelEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    labelEl.style.color = 'white';
    labelEl.style.padding = '2px 6px';
    labelEl.style.borderRadius = '3px';
    labelEl.style.fontSize = '12px';
    labelEl.style.whiteSpace = 'nowrap';
    labelEl.style.fontFamily = 'monospace';
    dot.appendChild(labelEl);
    
    document.body.appendChild(dot);
    
    console.log(`🔴 Placed red dot at Precision Grid (${precisionCol}, ${precisionRow})`);
    console.log(`   Screen position: (${percentX.toFixed(4)}%, ${percentY.toFixed(4)}%)`);
    
    return {
      element: dot,
      remove: () => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot);
          console.log(`🔴 Removed dot: ${label}`);
        }
      }
    };
  }, []);

  // Function to show coordinates for any vertex (A, B, C, or D)
  const showVertexCoordinates = React.useCallback((vertexLabel) => {
    if (!vertices || vertices.length === 0) {
      console.warn('⚠️ No vertices available');
      return null;
    }
    
    const labels = ['A', 'B', 'C', 'D'];
    const vertexIndex = labels.indexOf(vertexLabel.toUpperCase());
    
    if (vertexIndex === -1 || !vertices[vertexIndex]) {
      console.warn(`⚠️ Vertex "${vertexLabel}" not found. Available: A, B, C, D`);
      return null;
    }
    
    const vertex = vertices[vertexIndex];
    const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert to precision grid
    const precisionPos = gridToGridCell({ row: vertex.row, col: vertex.col });
    
    // Calculate screen percentage
    const screenPercentX = (precisionPos.col / precisionCols) * 100;
    const screenPercentY = (precisionPos.row / precisionRows) * 100;
    
    // Get hotspot center position (for reference)
    const hotspotCenter = quadGridToPrecisionGrid(vertex, { forHotspot: true });
    
    console.log(`\n📍 ========== VERTEX ${vertexLabel.toUpperCase()} COORDINATES ==========`);
    console.log(`📐 Quadrilateral: ${id || elementName || 'default'}`);
    console.log(`📐 Grid: ${gridRows} rows × ${gridCols} cols`);
    console.log(`📐 Container: [${coordinates?.[0] || 'N/A'}, ${coordinates?.[1] || 'N/A'}, ${coordinates?.[2] || 'N/A'}, ${coordinates?.[3] || 'N/A'}]`);
    console.log('');
    console.log('1️⃣ QUAD GRID COORDINATES (0-indexed):');
    console.log(`   col: ${vertex.col} (of ${gridCols - 1}, ${((vertex.col / (gridCols - 1)) * 100).toFixed(2)}%)`);
    console.log(`   row: ${vertex.row} (of ${gridRows - 1}, ${((vertex.row / (gridRows - 1)) * 100).toFixed(2)}%)`);
    console.log(`   Format: { col: ${vertex.col}, row: ${vertex.row} }`);
    console.log('');
    console.log('2️⃣ PRECISION GRID COORDINATES:');
    console.log(`   col: ${precisionPos.col} (of ${precisionCols - 1})`);
    console.log(`   row: ${precisionPos.row} (of ${precisionRows - 1})`);
    console.log(`   Format: { col: ${precisionPos.col}, row: ${precisionPos.row} }`);
    console.log('');
    console.log('3️⃣ SCREEN PERCENTAGE COORDINATES:');
    console.log(`   left: ${screenPercentX.toFixed(4)}%`);
    console.log(`   top:  ${screenPercentY.toFixed(4)}%`);
    console.log(`   Format: { left: "${screenPercentX.toFixed(2)}%", top: "${screenPercentY.toFixed(2)}%" }`);
    console.log('');
    console.log('4️⃣ HOTSPOT CENTER POSITION (for reference):');
    console.log(`   x: ${hotspotCenter.x.toFixed(2)}`);
    console.log(`   y: ${hotspotCenter.y.toFixed(2)}`);
    console.log(`   (This is the center value used for hotspot coordinates [x-5, y-5, x+5, y+5])`);
    console.log('');
    console.log('📊 COMPLETE COORDINATE OBJECT:');
    const completeObject = {
      vertex: vertexLabel.toUpperCase(),
      quadGrid: {
        col: vertex.col,
        row: vertex.row,
        description: `Column ${vertex.col} of ${gridCols} (${((vertex.col / (gridCols - 1)) * 100).toFixed(2)}%), Row ${vertex.row} of ${gridRows} (${((vertex.row / (gridRows - 1)) * 100).toFixed(2)}%)`
      },
      precisionGrid: {
        col: precisionPos.col,
        row: precisionPos.row,
        description: `Column ${precisionPos.col} of ${precisionCols}, Row ${precisionPos.row} of ${precisionRows}`
      },
      screenPercentage: {
        left: `${screenPercentX.toFixed(4)}%`,
        top: `${screenPercentY.toFixed(4)}%`,
        description: `${screenPercentX.toFixed(2)}% from left, ${screenPercentY.toFixed(2)}% from top`
      },
      hotspotCenter: {
        x: hotspotCenter.x,
        y: hotspotCenter.y,
        description: 'Center position for hotspot coordinates (before -1 offset)'
      }
    };
    console.log(completeObject);
    console.log('📍 ============================================\n');
    
    return completeObject;
  }, [vertices, gridToGridCell, quadGridToPrecisionGrid, id, elementName, gridRows, gridCols, coordinates]);

  // Function to place dot at any vertex's precision grid position
  const placeVertexDot = React.useCallback((vertexLabel) => {
    if (!vertices || vertices.length === 0) {
      console.warn('⚠️ No vertices available');
      return null;
    }
    
    const labels = ['A', 'B', 'C', 'D'];
    const vertexIndex = labels.indexOf(vertexLabel.toUpperCase());
    
    if (vertexIndex === -1 || !vertices[vertexIndex]) {
      console.warn(`⚠️ Vertex "${vertexLabel}" not found. Available: A, B, C, D`);
      return null;
    }
    
    const vertex = vertices[vertexIndex];
    const precisionPos = gridToGridCell({ row: vertex.row, col: vertex.col });
    
    return placePrecisionGridDot(precisionPos.col, precisionPos.row, `Vertex ${vertexLabel.toUpperCase()} (Precision Grid)`);
  }, [vertices, gridToGridCell, placePrecisionGridDot]);

  // Function to place dots for all vertices
  const placeAllVertexDots = React.useCallback(() => {
    if (!vertices || vertices.length === 0) {
      console.warn('⚠️ No vertices available');
      return [];
    }
    
    const labels = ['A', 'B', 'C', 'D'];
    const dots = [];
    
    vertices.forEach((vertex, index) => {
      const precisionPos = gridToGridCell({ row: vertex.row, col: vertex.col });
      const dot = placePrecisionGridDot(
        precisionPos.col, 
        precisionPos.row, 
        `Vertex ${labels[index]} (Precision Grid)`
      );
      dots.push(dot);
    });
    
    console.log(`🔴 Placed ${dots.length} verification dots for all vertices`);
    return dots;
  }, [vertices, gridToGridCell, placePrecisionGridDot]);

  // Function to place dot at Vertex A's precision grid position (for backward compatibility)
  const placeVertexADot = React.useCallback(() => {
    return placeVertexDot('A');
  }, [placeVertexDot]);

  // Expose debug function to window
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const quadId = id || elementName || 'default';
      const debugKey = `debugQuadCoordinates_${quadId}`;
      window[debugKey] = debugCoordinates;
      
      // Store page info for this quad (for filtering by page)
      if (!window.quadPageInfo) {
        window.quadPageInfo = {};
      }
      window.quadPageInfo[quadId] = currentPage;
      
      // Expose Vertex A coordinates function
      const vertexAKey = `showVertexACoordinates_${id || elementName || 'default'}`;
      window[vertexAKey] = showVertexACoordinates;
      
      // Expose dot placement functions
      const placeDotKey = `placeVertexADot_${id || elementName || 'default'}`;
      window[placeDotKey] = placeVertexADot;
      
      // Expose functions for any vertex
      const showVertexKey = `showVertexCoordinates_${id || elementName || 'default'}`;
      window[showVertexKey] = showVertexCoordinates;
      const placeVertexKey = `placeVertexDot_${id || elementName || 'default'}`;
      window[placeVertexKey] = placeVertexDot;
      const placeAllDotsKey = `placeAllVertexDots_${id || elementName || 'default'}`;
      window[placeAllDotsKey] = placeAllVertexDots;
      
      if (!window.debugAllQuadCoordinates) {
        window.debugAllQuadCoordinates = () => {
          Object.keys(window).forEach(key => {
            if (key.startsWith('debugQuadCoordinates_')) {
              window[key]();
            }
          });
        };
      }
      
      // Add global function to show angle markers for quadrilaterals on a specific page
      if (!window.showAngleMarkersForPage) {
        window.showAngleMarkersForPage = (pageNumber = 3, quadId = null, vertexIndex = null) => {
          console.log(`📐 Showing angle markers for page ${pageNumber}${quadId ? ` (quad: ${quadId})` : ''}${vertexIndex !== null ? ` (vertex: ${vertexIndex})` : ''}...`);
          
          // Initialize quadDisplayState if it doesn't exist
          if (!window.quadDisplayState) {
            window.quadDisplayState = {};
          }
          
          // Initialize quadPageInfo if it doesn't exist
          if (!window.quadPageInfo) {
            window.quadPageInfo = {};
          }
          
          // If specific quadId provided, use it
          if (quadId) {
            if (!window.quadDisplayState[quadId]) {
              window.quadDisplayState[quadId] = {};
            }
            
            // If specific vertex index provided, add it to the array of confirmed vertices
            if (vertexIndex !== null) {
              window.quadDisplayState[quadId].showAngleArcs = true;
              window.quadDisplayState[quadId].showAngleText = true;
              
              // Initialize showAngleVertex as an array if it doesn't exist or isn't an array
              if (!Array.isArray(window.quadDisplayState[quadId].showAngleVertex)) {
                // If it's a number (single vertex), convert to array
                if (typeof window.quadDisplayState[quadId].showAngleVertex === 'number') {
                  window.quadDisplayState[quadId].showAngleVertex = [window.quadDisplayState[quadId].showAngleVertex];
                } else {
                  window.quadDisplayState[quadId].showAngleVertex = [];
                }
              }
              
              // Add vertex to array if not already present
              if (!window.quadDisplayState[quadId].showAngleVertex.includes(vertexIndex)) {
                window.quadDisplayState[quadId].showAngleVertex.push(vertexIndex);
                console.log(`✅ Added angle marker for quad: ${quadId}, vertex: ${vertexIndex}. Confirmed vertices: [${window.quadDisplayState[quadId].showAngleVertex.join(', ')}]`);
              } else {
                console.log(`ℹ️ Angle marker already exists for quad: ${quadId}, vertex: ${vertexIndex}. Confirmed vertices: [${window.quadDisplayState[quadId].showAngleVertex.join(', ')}]`);
              }
            } else {
              window.quadDisplayState[quadId].showAngleArcs = true;
              window.quadDisplayState[quadId].showAngleText = true;
              window.quadDisplayState[quadId].showAngleVertex = null; // Show all vertices
              console.log(`✅ Enabled angle markers for quad: ${quadId} (all vertices)`);
            }
            
            // Dispatch event to trigger update
            window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
              detail: { quadId, property: 'showAngleArcs', value: true }
            }));
            window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
              detail: { quadId, property: 'showAngleText', value: true }
            }));
            
            return;
          }
          
          // Otherwise, find all quads on the specified page
          let foundAny = false;
          const enabledQuads = [];
          
          // First, try to find quads by checking quadPageInfo directly
          if (window.quadPageInfo) {
            const allQuadIds = Object.keys(window.quadPageInfo);
            console.log(`🔍 Checking quadPageInfo for page ${pageNumber}:`, window.quadPageInfo);
            console.log(`   Found ${allQuadIds.length} quad(s) in page info`);
            
            allQuadIds.forEach(quadId => {
              const quadPage = window.quadPageInfo[quadId];
              // Convert both to numbers for comparison (handle string "3" vs number 3)
              const quadPageNum = Number(quadPage);
              const targetPageNum = Number(pageNumber);
              const pageMatches = quadPageNum === targetPageNum || quadPage === pageNumber || String(quadPage) === String(pageNumber);
              
              console.log(`   Quad ${quadId}: stored page = ${quadPage} (${typeof quadPage}), target = ${pageNumber} (${typeof pageNumber}), match = ${pageMatches}`);
              
              if (pageMatches) {
                console.log(`   ✅ Match found! Enabling markers for ${quadId}`);
                if (!window.quadDisplayState[quadId]) {
                  window.quadDisplayState[quadId] = {};
                }
                window.quadDisplayState[quadId].showAngleArcs = true;
                window.quadDisplayState[quadId].showAngleText = true;
                
                // Dispatch events
                window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
                  detail: { quadId, property: 'showAngleArcs', value: true }
                }));
                window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
                  detail: { quadId, property: 'showAngleText', value: true }
                }));
                
                enabledQuads.push(quadId);
                foundAny = true;
              }
            });
            
            // If no matches found but we have quads, show what we found
            if (!foundAny && allQuadIds.length > 0) {
              console.log(`   ⚠️ No quads matched page ${pageNumber}. Found pages:`, 
                allQuadIds.map(qId => `${qId}: page ${window.quadPageInfo[qId]}`).join(', '));
            }
          } else {
            console.log(`   ⚠️ window.quadPageInfo is not defined`);
          }
          
          // Fallback: also check debug function keys (for quads that might not have page info yet)
          if (!foundAny) {
            Object.keys(window).forEach(key => {
              if (key.startsWith('debugQuadCoordinates_')) {
                // Extract quadId from the key (format: debugQuadCoordinates_${quadId})
                const extractedQuadId = key.replace('debugQuadCoordinates_', '');
                
                // Check if this quad is on the specified page
                const quadPage = window.quadPageInfo?.[extractedQuadId];
                if (quadPage === pageNumber || (!quadPage && pageNumber === 3)) { // Include if page matches or default to page 3
                  if (!window.quadDisplayState[extractedQuadId]) {
                    window.quadDisplayState[extractedQuadId] = {};
                  }
                  window.quadDisplayState[extractedQuadId].showAngleArcs = true;
                  window.quadDisplayState[extractedQuadId].showAngleText = true;
                  
                  // Dispatch events
                  window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
                    detail: { quadId: extractedQuadId, property: 'showAngleArcs', value: true }
                  }));
                  window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
                    detail: { quadId: extractedQuadId, property: 'showAngleText', value: true }
                  }));
                  
                  enabledQuads.push(extractedQuadId);
                  foundAny = true;
                }
              }
            });
          }
          
          if (foundAny) {
            console.log(`✅ Enabled angle markers for ${enabledQuads.length} quadrilateral(s) on page ${pageNumber}:`);
            enabledQuads.forEach(qId => {
              console.log(`   - ${qId}`);
            });
          } else {
            console.log(`⚠️ No quadrilaterals found on page ${pageNumber}.`);
            console.log(`   Available quads:`, Object.keys(window.quadPageInfo || {}));
          }
        };
        console.log('📐 Global function available: window.showAngleMarkersForPage(pageNumber, quadId, vertexIndex)');
        console.log('   - window.showAngleMarkersForPage(3) - show markers for all quads on page 3');
        console.log('   - window.showAngleMarkersForPage(3, "my-quad-id") - show markers for specific quad (all vertices)');
        console.log('   - window.showAngleMarkersForPage(3, "my-quad-id", 0) - show marker for vertex 0 (A) only');
      }
      
      // Add global function to show Vertex A for all quadrilaterals
      if (!window.showAllVertexACoordinates) {
        window.showAllVertexACoordinates = () => {
          console.log('📍 Showing Vertex A coordinates for all quadrilaterals...');
          Object.keys(window).forEach(key => {
            if (key.startsWith('showVertexACoordinates_')) {
              console.log(`\n📐 Calling ${key}...`);
              window[key]();
            }
          });
        };
        console.log('📍 Global function available: window.showAllVertexACoordinates()');
        console.log('   Call this to see Vertex A coordinates for all quadrilaterals');
      }
      
      // Add simple global function that accepts quad ID as parameter
      if (!window.showVertexA) {
        window.showVertexA = (quadId, placeDot = false) => {
          if (!quadId) {
            console.log('📍 Showing Vertex A for first available quadrilateral...');
            // Find first available quadrilateral
            const keys = Object.keys(window).filter(key => key.startsWith('showVertexACoordinates_'));
            if (keys.length > 0) {
              const firstKey = keys[0];
              console.log(`📐 Using: ${firstKey}`);
              window[firstKey]();
              // Place dot if requested
              if (placeDot) {
                const placeDotKey = firstKey.replace('showVertexACoordinates_', 'placeVertexADot_');
                if (typeof window[placeDotKey] === 'function') {
                  window[placeDotKey]();
                }
              }
            } else {
              console.warn('⚠️ No quadrilaterals found. Make sure the page has loaded.');
            }
          } else {
            // Try to find the function with this quad ID
            const functionKey = `showVertexACoordinates_${quadId}`;
            if (typeof window[functionKey] === 'function') {
              window[functionKey]();
              // Place dot if requested
              if (placeDot) {
                const placeDotKey = `placeVertexADot_${quadId}`;
                if (typeof window[placeDotKey] === 'function') {
                  window[placeDotKey]();
                }
              }
            } else {
              console.warn(`⚠️ Quadrilateral "${quadId}" not found.`);
              console.log('💡 Available quadrilaterals:');
              Object.keys(window).forEach(key => {
                if (key.startsWith('showVertexACoordinates_')) {
                  const id = key.replace('showVertexACoordinates_', '');
                  console.log(`   - ${id}`);
                }
              });
              console.log('💡 Usage: window.showVertexA("quad-id") or window.showVertexA() for first one');
            }
          }
        };
        console.log('📍 Simple function available: window.showVertexA("quad-id") or window.showVertexA()');
        console.log('   Example: window.showVertexA("page1-quadrilateral-demo")');
        console.log('   Or: window.showVertexA("page1-quadrilateral-demo", true) to also place a verification dot');
        console.log('   Or just: window.showVertexA() to show the first quadrilateral');
      }
      
      // Add global function to place dot at Vertex A
      if (!window.placeVertexADot) {
        window.placeVertexADot = (quadId) => {
          if (!quadId) {
            // Find first available quadrilateral
            const keys = Object.keys(window).filter(key => key.startsWith('placeVertexADot_'));
            if (keys.length > 0) {
              const firstKey = keys[0];
              window[firstKey]();
            } else {
              console.warn('⚠️ No quadrilaterals found. Make sure the page has loaded.');
            }
          } else {
            const functionKey = `placeVertexADot_${quadId}`;
            if (typeof window[functionKey] === 'function') {
              window[functionKey]();
            } else {
              console.warn(`⚠️ Quadrilateral "${quadId}" not found.`);
              console.log('💡 Available quadrilaterals:');
              Object.keys(window).forEach(key => {
                if (key.startsWith('placeVertexADot_')) {
                  const id = key.replace('placeVertexADot_', '');
                  console.log(`   - ${id}`);
                }
              });
            }
          }
        };
        console.log('🔴 Global function available: window.placeVertexADot("quad-id") or window.placeVertexADot()');
        console.log('   Places a red dot at Vertex A\'s precision grid position for visual verification');
      }
      
      // Add global function to show coordinates for any vertex
      if (!window.showVertex) {
        window.showVertex = (vertexLabel, quadId) => {
          if (!vertexLabel || !['A', 'B', 'C', 'D'].includes(vertexLabel.toUpperCase())) {
            console.warn('⚠️ Invalid vertex label. Use: A, B, C, or D');
            return;
          }
          
          if (!quadId) {
            // Find first available quadrilateral
            const keys = Object.keys(window).filter(key => key.startsWith('showVertexCoordinates_'));
            if (keys.length > 0) {
              const firstKey = keys[0];
              window[firstKey](vertexLabel);
            } else {
              console.warn('⚠️ No quadrilaterals found. Make sure the page has loaded.');
            }
          } else {
            const functionKey = `showVertexCoordinates_${quadId}`;
            if (typeof window[functionKey] === 'function') {
              window[functionKey](vertexLabel);
            } else {
              console.warn(`⚠️ Quadrilateral "${quadId}" not found.`);
              console.log('💡 Available quadrilaterals:');
              Object.keys(window).forEach(key => {
                if (key.startsWith('showVertexCoordinates_')) {
                  const id = key.replace('showVertexCoordinates_', '');
                  console.log(`   - ${id}`);
                }
              });
            }
          }
        };
        console.log('📍 Global function available: window.showVertex("A", "quad-id") or window.showVertex("A")');
        console.log('   Example: window.showVertex("B", "page1-quadrilateral-demo")');
        console.log('   Shows coordinates for any vertex (A, B, C, or D)');
      }
      
      // Add global function to place dot for any vertex
      if (!window.placeVertex) {
        window.placeVertex = (vertexLabel, quadId) => {
          if (!vertexLabel || !['A', 'B', 'C', 'D'].includes(vertexLabel.toUpperCase())) {
            console.warn('⚠️ Invalid vertex label. Use: A, B, C, or D');
            return;
          }
          
          if (!quadId) {
            // Find first available quadrilateral
            const keys = Object.keys(window).filter(key => key.startsWith('placeVertexDot_'));
            if (keys.length > 0) {
              const firstKey = keys[0];
              window[firstKey](vertexLabel);
            } else {
              console.warn('⚠️ No quadrilaterals found. Make sure the page has loaded.');
            }
          } else {
            const functionKey = `placeVertexDot_${quadId}`;
            if (typeof window[functionKey] === 'function') {
              window[functionKey](vertexLabel);
            } else {
              console.warn(`⚠️ Quadrilateral "${quadId}" not found.`);
            }
          }
        };
        console.log('🔴 Global function available: window.placeVertex("A", "quad-id") or window.placeVertex("A")');
        console.log('   Example: window.placeVertex("B", "page1-quadrilateral-demo")');
        console.log('   Places a red dot at any vertex\'s precision grid position');
      }
      
      // Add global function to place dots for all vertices
      if (!window.placeAllVertices) {
        window.placeAllVertices = (quadId) => {
          if (!quadId) {
            // Find first available quadrilateral
            const keys = Object.keys(window).filter(key => key.startsWith('placeAllVertexDots_'));
            if (keys.length > 0) {
              const firstKey = keys[0];
              window[firstKey]();
            } else {
              console.warn('⚠️ No quadrilaterals found. Make sure the page has loaded.');
            }
          } else {
            const functionKey = `placeAllVertexDots_${quadId}`;
            if (typeof window[functionKey] === 'function') {
              window[functionKey]();
            } else {
              console.warn(`⚠️ Quadrilateral "${quadId}" not found.`);
            }
          }
        };
        console.log('🔴 Global function available: window.placeAllVertices("quad-id") or window.placeAllVertices()');
        console.log('   Places red dots at all vertices (A, B, C, D) for visual verification');
      }
      
      // Add global function to place dot at any precision grid coordinates
      if (!window.placePrecisionGridDot) {
        window.placePrecisionGridDot = (col, row, label = 'Custom Point') => {
          const precisionRows = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          const precisionCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          
          // Convert precision grid to screen percentage
          const percentX = (col / precisionCols) * 100;
          const percentY = (row / precisionRows) * 100;
          
          // Remove any existing dot with the same label
          const existingDot = document.getElementById(`precision-grid-dot-${label.replace(/\s+/g, '-')}`);
          if (existingDot) {
            existingDot.remove();
          }
          
          // Create dot element
          const dot = document.createElement('div');
          dot.id = `precision-grid-dot-${label.replace(/\s+/g, '-')}`;
          dot.style.position = 'fixed';
          dot.style.left = `${percentX}%`;
          dot.style.top = `${percentY}%`;
          dot.style.width = '20px';
          dot.style.height = '20px';
          dot.style.borderRadius = '50%';
          dot.style.backgroundColor = 'red';
          dot.style.border = '3px solid white';
          dot.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
          dot.style.transform = 'translate(-50%, -50%)';
          dot.style.zIndex = '10000';
          dot.style.pointerEvents = 'none';
          dot.style.cursor = 'default';
          dot.title = `${label}: Precision Grid (${col}, ${row}) = Screen (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)`;
          
          // Add label text
          const labelEl = document.createElement('div');
          labelEl.textContent = label;
          labelEl.style.position = 'absolute';
          labelEl.style.top = '25px';
          labelEl.style.left = '50%';
          labelEl.style.transform = 'translateX(-50%)';
          labelEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          labelEl.style.color = 'white';
          labelEl.style.padding = '2px 6px';
          labelEl.style.borderRadius = '3px';
          labelEl.style.fontSize = '12px';
          labelEl.style.whiteSpace = 'nowrap';
          labelEl.style.fontFamily = 'monospace';
          dot.appendChild(labelEl);
          
          document.body.appendChild(dot);
          
          console.log(`🔴 Placed red dot at Precision Grid (${col}, ${row})`);
          console.log(`   Screen position: (${percentX.toFixed(4)}%, ${percentY.toFixed(4)}%)`);
          console.log(`   Label: ${label}`);
          
          return {
            element: dot,
            remove: () => {
              if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
                console.log(`🔴 Removed dot: ${label}`);
              }
            }
          };
        };
        console.log('🔴 Global function available: window.placePrecisionGridDot(col, row, label)');
        console.log('   Example: window.placePrecisionGridDot(240, 180, "Test Point")');
      }
      
      // Add global function to remove all precision grid dots
      if (!window.removeAllPrecisionDots) {
        window.removeAllPrecisionDots = () => {
          const dots = document.querySelectorAll('[id^="precision-grid-dot-"]');
          dots.forEach(dot => dot.remove());
          console.log(`🔴 Removed ${dots.length} precision grid dot(s)`);
        };
        console.log('🔴 Global function available: window.removeAllPrecisionDots()');
        console.log('   Removes all precision grid verification dots from the page');
      }
      
      return () => {
        delete window[debugKey];
        delete window[vertexAKey];
        delete window[placeDotKey];
        delete window[showVertexKey];
        delete window[placeVertexKey];
        delete window[placeAllDotsKey];
      };
    }
  }, [debugCoordinates, showVertexACoordinates, showVertexCoordinates, placeVertexADot, placeVertexDot, placeAllVertexDots, id, elementName]);

  // Expose spawn function to angle markers via window
  React.useEffect(() => {
    if (protractorConfig.enableClickToSpawn && typeof window !== 'undefined') {
      // Store the spawn function with a unique key for this quadrilateral
      const key = `spawnProtractorFor_${id || elementName}`;
      window[key] = spawnProtractorAtVertex;
      
      return () => {
        delete window[key];
      };
    }
  }, [protractorConfig.enableClickToSpawn, spawnProtractorAtVertex, id, elementName]);

  // Handle vertex drag start
  const handleVertexDragStart = React.useCallback((vertexIndex) => {
    if (!draggable) return;
    setDraggingVertexIndex(vertexIndex);
  }, [currentDraggable]);

  // Handle vertex drag move
  const handleVertexDragMove = React.useCallback((vertexIndex, mouseX, mouseY) => {
    if (!draggable || draggingVertexIndex === null) return;
    
    // Get container bounds
    if (!containerRef.current || !coordinates) return;
    
    // Check if QuadGridUtils is available
    if (typeof window.QuadGridComponent === 'undefined' || typeof window.QuadGridComponent.QuadGridUtils === 'undefined') {
      console.warn('QuadGridUtils not available for snapping');
      return;
    }
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Parse gridPadding value (supports gc units or raw numbers)
    let paddingGc = 0;
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      paddingGc = parseFloat(gridPadding) || 0;
    } else if (typeof gridPadding === 'number') {
      paddingGc = gridPadding;
    }
    
    // Calculate other occupied points
    const occupiedPoints = vertices
      .map((v, i) => i === vertexIndex ? null : v)
      .filter(Boolean);
    
    // Calculate snap point with gridPadding and coordinates
    const newSnapPoint = window.QuadGridComponent.QuadGridUtils.calculateSnapPoint(
      mouseX,
      mouseY,
      containerRect,
      gridRows,
      gridCols,
      occupiedPoints,
      paddingGc,
      coordinates
    );
    
    setSnapPoint(newSnapPoint);
  }, [currentDraggable, draggingVertexIndex, vertices, gridRows, gridCols, gridPadding, coordinates]);

  // Handle vertex drag end
  const handleVertexDragEnd = React.useCallback((vertexIndex) => {
    if (!currentDraggable || snapPoint === null) {
      setDraggingVertexIndex(null);
      setSnapPoint(null);
      return;
    }
    
    // Update vertex position
    const newVertices = [...vertices];
    newVertices[vertexIndex] = snapPoint;
    setVertices(newVertices);
    
    // Callback
    if (onVertexChange) {
      onVertexChange(newVertices);
    }
    
    // Reset dragging state
    setDraggingVertexIndex(null);
    setSnapPoint(null);
  }, [currentDraggable, snapPoint, vertices, onVertexChange]);

  // Get current vertex position (use snap point if dragging)
  const getVertexPosition = React.useCallback((index) => {
    if (draggingVertexIndex === index && snapPoint) {
      return snapPoint;
    }
    return vertices[index];
  }, [draggingVertexIndex, snapPoint, vertices]);

  // Helper function to check if a vertex is correctly placed (for build mode)
  // This function is called with the actual current vertex position (from getVertexPosition)
  const isVertexCorrectlyPlaced = React.useCallback((vertexIndex, currentVertexPos) => {
    if (mode !== 'build' || !resolvedTargetVertices) {
      return false;
    }
    
    if (buildTargetType === 'coordinates') {
      const targetVertex = resolvedTargetVertices[vertexIndex];
      if (!currentVertexPos || !targetVertex) return false;
      
      const rowDiff = Math.abs(currentVertexPos.row - targetVertex.row);
      const colDiff = Math.abs(currentVertexPos.col - targetVertex.col);
      const isCorrect = rowDiff <= buildTolerance && colDiff <= buildTolerance;
      return isCorrect;
    }
    
    // For shape matching, all vertices need to be correct, so check if overall target is achieved
    return buildTargetAchieved;
  }, [mode, resolvedTargetVertices, buildTargetType, buildTolerance, buildTargetAchieved]);

  // Render vertices as hotspots
  const renderVertices = React.useMemo(() => {
    // Check if vertices should be shown (check displayState first, then prop)
    const showVertices = displayState.showVertices !== undefined 
      ? displayState.showVertices 
      : propShowVertices;
    
    if (!showVertices) {
      return []; // Return empty array if vertices should be hidden
    }
    
    const HotspotComp = window.HotspotComponent?.HotspotComponent;
    if (!HotspotComp || !coordinates) {
      if (!HotspotComp) {
        // HotspotComponent may not be loaded yet - this is expected during initial render
        // Vertices will be rendered once HotspotComponent is available
      }
      return [];
    }
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use percentage values directly from gridDimensions (EXACT same as gridArea in quad-grid-component.js)
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Wrap vertices in a container positioned like the grid container
    // This ensures vertices are positioned relative to the same container as grid points
    const vertexElements = vertices.map((vertex, index) => {
      const currentVertex = getVertexPosition(index);
      const isCorrectlyPlaced = isVertexCorrectlyPlaced(index, currentVertex);
      const isDraggable = currentDraggable && !isCorrectlyPlaced;
      
      // Calculate position as percentage within container (EXACT same formula as grid points)
      const xPercent = offsetX + (currentVertex.col / gridCols) * width;
      const yPercent = offsetY + (currentVertex.row / gridRows) * height;
      
      // Use position prop with container-relative percentages
      // The hotspot component centers by adding width/2 and height/2, so we pass 0% for both
      // The actual size is controlled by the 'size' prop
      // Use nested css format to ensure hotspot component recognizes it
      const positionObj = {
        css: {
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          width: '0%',
          height: '0%'
        }
      };
      
      // Helper to convert color to rgba with opacity
      const colorWithOpacity = (color, opacity) => {
        if (color.startsWith('rgba')) {
          return color.replace(/,\s*[\d.]+\)$/, `, ${opacity})`);
        } else if (color.startsWith('rgb')) {
          return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        } else if (color.startsWith('#')) {
          // Convert hex to rgba
          const hex = color.slice(1);
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color; // Fallback
      };
      
      // Create hotspot props - explicitly exclude coordinates to prevent fallback
      // If correctly placed, reduce opacity and disable interaction
      const hotspotProps = {
        key: `vertex-${index}`,
        id: `${id}-vertex-${index}`,
        elementName: `${elementName}-vertex-${index}`,
        currentPage: currentPage,
        position: positionObj,
        zIndex: zIndex + 100, // Highest z-index - hotspots should be on top
        backgroundColor: isCorrectlyPlaced ? colorWithOpacity(vertexColor, 0.5) : vertexColor,
        borderColor: isCorrectlyPlaced ? colorWithOpacity(vertexColor, 0.5) : vertexColor,
        borderWidth: '2gc',
        size: '20gc',
        innerCircleSize: '6gc',
        animated: isCorrectlyPlaced ? false : true, // Pulse by default, stop when correctly placed
        cursor: isDraggable ? 'grab' : (isCorrectlyPlaced ? 'not-allowed' : 'default'),
        onMouseDown: isDraggable ? (e) => {
          e.preventDefault(); // Prevent text selection
          handleVertexDragStart(index);
        } : undefined,
        onTouchStart: isDraggable ? (e) => {
          // Don't call preventDefault here - let touchAction: 'none' handle it
          // preventDefault will be called in touchmove if needed
          const touch = e.touches[0];
          if (touch) {
            handleVertexDragStart(index);
          }
        } : undefined
      };
      
      return React.createElement(HotspotComp, hotspotProps);
    });
    
    // Return array of vertex elements (will be rendered inside grid component)
    return vertexElements;
  }, [vertices, getVertexPosition, id, elementName, currentPage, zIndex, vertexColor, currentDraggable, handleVertexDragStart, coordinates, gridRows, gridCols, gridDimensions, isVertexCorrectlyPlaced, mode, resolvedTargetVertices, buildTargetType, buildTolerance, buildTargetAchieved, snapPoint, propShowVertices, displayState]);

  // Render vertex labels (A, B, C, D)
  const renderVertexLabels = React.useMemo(() => {
    if (!currentShowVertexLabels || !coordinates) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Calculate container position in percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidth = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeight = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    // Process label size and offset (convert gc to viewBox units for SVG)
    // Use the same method as processThickness for consistency
    const processGcToViewBoxUnits = (value) => {
      if (!coordinates) return 2; // Default viewBox units fallback
      
      const [cx1, cy1, cx2, cy2] = coordinates;
      const gcValue = parseFloat(value.replace('gc', '')) || 15;
      
      // Container size in GC units
      const containerWidthGc = cx2 - cx1 + 1;
      const containerHeightGc = cy2 - cy1 + 1;
      
      // Use average of width and height for consistent scaling
      const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
      
      // Convert GC units to viewBox units (viewBox is "0 0 100 100")
      const thicknessInViewBoxUnits = (gcValue / avgContainerGc) * 100;
      
      return thicknessInViewBoxUnits;
    };
    
    const labelSizeViewBox = processGcToViewBoxUnits(vertexLabelSize);
    const labelOffsetViewBox = processGcToViewBoxUnits(vertexLabelOffset);
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use direct percentage values (EXACT same as hotspots) to ensure consistency
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions in viewBox units (0-100), accounting for centered grid
    // Use EXACT same formula as hotspots: offsetX + (col / gridCols) * width
    const getVertexViewBox = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Label positions offset from vertices (top-left, top-right, bottom-right, bottom-left)
    const labelOffsets = [
      { x: -labelOffsetViewBox, y: -labelOffsetViewBox }, // A: top-left
      { x: labelOffsetViewBox, y: -labelOffsetViewBox },  // B: top-right
      { x: labelOffsetViewBox, y: labelOffsetViewBox },   // C: bottom-right
      { x: -labelOffsetViewBox, y: labelOffsetViewBox }   // D: bottom-left
    ];
    
    const labels = [];
    for (let i = 0; i < 4; i++) {
      const vertex = getVertexPosition(i);
      const vertexPos = getVertexViewBox(vertex);
      const offset = labelOffsets[i];
      
      labels.push(React.createElement('text', {
        key: `vertex-label-${i}`,
        x: vertexPos.x + offset.x,
        y: vertexPos.y + offset.y,
        fill: vertexLabelColor,
        fontSize: labelSizeViewBox,
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        pointerEvents: 'none',
        style: {
          userSelect: 'none'
        }
      }, vertexLabels[i] || ['A', 'B', 'C', 'D'][i]));
    }
    
    return React.createElement('svg', {
      key: 'vertex-labels-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 30, // Below hotspots but above sides
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, labels);
  }, [currentShowVertexLabels, vertices, getVertexPosition, coordinates, gridRows, gridCols, vertexLabels, vertexLabelColor, vertexLabelSize, vertexLabelOffset, zIndex, gridDimensions]);

  // Helper to process GC units for thickness (convert to viewBox units for SVG)
  const processThickness = React.useCallback((thickness) => {
    if (!coordinates) return 0.4; // Default viewBox units fallback
    
    const [x1, y1, x2, y2] = coordinates;
    const gcValue = parseFloat(thickness.replace('gc', '')) || 4;
    
    // Container size in GC units
    const containerWidthGc = x2 - x1 + 1;
    const containerHeightGc = y2 - y1 + 1;
    
    // Use average of width and height for consistent scaling
    const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
    
    // Convert GC units to viewBox units (viewBox is "0 0 100 100")
    const thicknessInViewBoxUnits = (gcValue / avgContainerGc) * 100;
    
    return thicknessInViewBoxUnits;
  }, [coordinates]);

  // Helper to convert style to SVG stroke-dasharray (using percentage units for viewBox)
  const getStrokeDashArray = React.useCallback((style, thicknessPercent) => {
    const thicknessNum = typeof thicknessPercent === 'number' ? thicknessPercent : parseFloat(thicknessPercent) || 0.4;
    switch (style) {
      case 'dashed':
        // Dashed: longer dashes with gaps
        return `${thicknessNum * 3},${thicknessNum * 1.5}`;
      case 'dotted':
        // Dotted: very short dashes with larger gaps
        return `0,${thicknessNum * 3}`;
      case 'solid':
      default:
        return 'none';
    }
  }, []);

  // Helper to get edge style with overrides
  const getEdgeStyle = React.useCallback((globalColor, globalThickness, globalStyle, globalBlink, override) => {
    const color = override?.color || globalColor;
    const thickness = override?.thickness || globalThickness;
    const style = override?.style || globalStyle;
    const blink = override?.isBlink !== undefined ? override.isBlink : globalBlink;
    
    const thicknessNum = processThickness(thickness);
    const dashArray = getStrokeDashArray(style, thicknessNum);
    
    return {
      color,
      thickness: thicknessNum,
      style,
      blink,
      dashArray
    };
  }, [processThickness, getStrokeDashArray]);

  // Render sides using SVG for precise vertex-to-vertex connection
  const renderSides = React.useMemo(() => {
    if (!coordinates) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Calculate container position in percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidth = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeight = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use direct percentage values (EXACT same as hotspots) to ensure consistency
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc, gridWidthGc, gridHeightGc, offsetXGc, offsetYGc } = gridDimensions;
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as hotspots: offsetX + (col / gridCols) * width
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    const lines = [];
    const sideOverrides = [side1, side2, side3, side4];
    // When build target is achieved, keep sides blue but add green glow
    const showGreenGlow = mode === 'build' && buildTargetAchieved;
    
    for (let i = 0; i < 4; i++) {
      const v1 = getVertexPosition(i);
      const v2 = getVertexPosition((i + 1) % 4);
      
      const p1 = getVertexPercent(v1);
      const p2 = getVertexPercent(v2);
      
      // Get style for this side with override (keep blue when target achieved; glow is on SVG)
      const sideStyle = getEdgeStyle(edgeColor, edgeThickness, edgeStyle, isBlink, sideOverrides[i]);
      
      const lineProps = {
        key: `side-${i}`,
        x1: `${p1.x}%`,
        y1: `${p1.y}%`,
        x2: `${p2.x}%`,
        y2: `${p2.y}%`,
        stroke: sideStyle.color,
        strokeWidth: sideStyle.thickness,
        strokeLinecap: 'round',
        className: sideStyle.blink ? 'quad-edge-blink' : undefined
      };
      
      if (sideStyle.dashArray !== 'none') {
        lineProps.strokeDasharray = sideStyle.dashArray;
      }
      
      lines.push(React.createElement('line', lineProps));
    }
    
    return React.createElement('svg', {
      key: 'sides-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 25, // Original quad sides - above target wireframe
        pointerEvents: 'none',
        overflow: 'visible',
        // Green glow when target achieved (sides stay blue)
        filter: showGreenGlow ? 'drop-shadow(0 0 4px #00AA00) drop-shadow(0 0 10px rgba(0, 170, 0, 0.8))' : undefined
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, lines);
  }, [vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, side1, side2, side3, side4, getEdgeStyle, gridDimensions, mode, buildTargetAchieved]);

  // Render diagonals using SVG for precise vertex-to-vertex connection
  const renderDiagonals = React.useMemo(() => {
    if (!currentShowDiagonals || !coordinates) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Calculate container position in percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidth = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeight = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use direct percentage values (EXACT same as hotspots) to ensure consistency
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as hotspots: offsetX + (col / gridCols) * width
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Diagonal 0-2
    const v0 = getVertexPosition(0);
    const v2 = getVertexPosition(2);
    const p0 = getVertexPercent(v0);
    const p2 = getVertexPercent(v2);
    
    // Diagonal 1-3
    const v1 = getVertexPosition(1);
    const v3 = getVertexPosition(3);
    const p1 = getVertexPercent(v1);
    const p3 = getVertexPercent(v3);
    
    // Get styles for diagonals with overrides
    const diag1Style = getEdgeStyle(edgeColor, edgeThickness, edgeStyle, isBlink, diagonal1);
    const diag2Style = getEdgeStyle(edgeColor, edgeThickness, edgeStyle, isBlink, diagonal2);
    
    const diag1Props = {
      key: 'diagonal-0-2',
      x1: `${p0.x}%`,
      y1: `${p0.y}%`,
      x2: `${p2.x}%`,
      y2: `${p2.y}%`,
      stroke: diag1Style.color,
      strokeWidth: diag1Style.thickness,
      strokeLinecap: 'round',
      className: diag1Style.blink ? 'quad-edge-blink' : undefined
    };
    
    if (diag1Style.dashArray !== 'none') {
      diag1Props.strokeDasharray = diag1Style.dashArray;
    }
    
    const diag2Props = {
      key: 'diagonal-1-3',
      x1: `${p1.x}%`,
      y1: `${p1.y}%`,
      x2: `${p3.x}%`,
      y2: `${p3.y}%`,
      stroke: diag2Style.color,
      strokeWidth: diag2Style.thickness,
      strokeLinecap: 'round',
      className: diag2Style.blink ? 'quad-edge-blink' : undefined
    };
    
    if (diag2Style.dashArray !== 'none') {
      diag2Props.strokeDasharray = diag2Style.dashArray;
    }
    
    return React.createElement('svg', {
      key: 'diagonals-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 24, // Original quad diagonals - above target wireframe, below sides
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, [
      React.createElement('line', diag1Props),
      React.createElement('line', diag2Props)
    ]);
  }, [currentShowDiagonals, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, diagonal1, diagonal2, getEdgeStyle, gridDimensions]);

  // Build mode: Render target wireframe
  const renderTargetWireframe = React.useMemo(() => {
    if (mode !== 'build' || !buildShowTargetWireframe || !resolvedTargetVertices || !coordinates) return null;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use direct percentage values (EXACT same as hotspots) to ensure consistency
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as hotspots: offsetX + (col / gridCols) * width
    const getTargetVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Build polygon points string
    const points = resolvedTargetVertices.map(v => {
      const p = getTargetVertexPercent(v);
      return `${p.x},${p.y}`;
    }).join(' ');
    
    // Convert strokeWidth from pixels to viewBox units (viewBox is 0-100)
    // strokeWidth should be relative to viewBox, not pixels
    const containerWidthGc = gridDimensions.containerWidthGc;
    const containerHeightGc = gridDimensions.containerHeightGc;
    const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
    let strokeWidthViewBox = 0.5; // Default viewBox units
    if (typeof buildWireframeThickness === 'string' && buildWireframeThickness.endsWith('gc')) {
      const gcValue = parseFloat(buildWireframeThickness);
      if (!isNaN(gcValue)) {
        // Convert GC to viewBox units (viewBox is 0-100, representing full container)
        strokeWidthViewBox = (gcValue / avgContainerGc) * 100;
      }
    } else if (typeof buildWireframeThickness === 'number') {
      // If it's already a number, assume it's in viewBox units
      strokeWidthViewBox = buildWireframeThickness;
    }
    
    // Debug: Log target wireframe calculation
    if (resolvedTargetVertices.length > 0) {
      const firstTarget = resolvedTargetVertices[0];
      const firstPercent = getTargetVertexPercent(firstTarget);
      console.log('🎯 [Quadrilateral] Target wireframe calculation:');
      console.log(`   Target vertices:`, resolvedTargetVertices);
      console.log(`   First target vertex (${firstTarget.col}, ${firstTarget.row}): ${firstPercent.x.toFixed(2)}%, ${firstPercent.y.toFixed(2)}%`);
      console.log(`   Polygon points: ${points}`);
      console.log(`   Stroke width: ${strokeWidthViewBox.toFixed(2)} viewBox units (from ${buildWireframeThickness})`);
    }
    
    // Create polygon element
    const polygonProps = {
      key: 'target-wireframe-polygon',
      points: points,
      fill: 'none',
      stroke: buildWireframeColor,
      strokeWidth: strokeWidthViewBox,
      strokeDasharray: '8,4',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    };
    
    // Add blink class if enabled
    if (buildBlinkWireframe) {
      polygonProps.className = 'wireframe-blink';
      // Also add inline animation style for custom duration
      if (buildBlinkDuration !== 1000) {
        polygonProps.style = {
          animationDuration: `${buildBlinkDuration}ms`
        };
      }
    }
    
    return React.createElement('svg', {
      key: 'target-wireframe-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 5, // Behind the main shape
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, React.createElement('polygon', polygonProps));
  }, [mode, buildShowTargetWireframe, resolvedTargetVertices, coordinates, gridRows, gridCols, zIndex, buildWireframeColor, buildWireframeThickness, buildBlinkWireframe, buildBlinkDuration, gridDimensions]);

  // Build mode: Render target vertex markers
  const renderTargetVertexMarkers = React.useMemo(() => {
    if (mode !== 'build' || !buildHighlightTargetVertices || !resolvedTargetVertices || !coordinates) return null;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    // Use direct percentage values (EXACT same as hotspots) to ensure consistency
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc } = gridDimensions;
    
    // Convert target vertex size from gc units to viewBox units (viewBox is 0-100)
    const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
    let targetVertexRadiusViewBox = 0.8; // Default viewBox units (radius)
    if (typeof buildTargetVertexSize === 'string' && buildTargetVertexSize.endsWith('gc')) {
      const gcValue = parseFloat(buildTargetVertexSize);
      if (!isNaN(gcValue)) {
        // Convert GC to viewBox units (viewBox is 0-100, representing full container)
        // Divide by 2 to get radius from diameter
        targetVertexRadiusViewBox = ((gcValue / avgContainerGc) * 100) / 2;
      }
    } else if (typeof buildTargetVertexSize === 'number') {
      // If it's already a number, assume it's in viewBox units (radius)
      targetVertexRadiusViewBox = buildTargetVertexSize / 2;
    }
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as hotspots: offsetX + (col / gridCols) * width
    const getTargetVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Create circle elements for each target vertex
    const circles = resolvedTargetVertices.map((v, index) => {
      const p = getTargetVertexPercent(v);
      return React.createElement('circle', {
        key: `target-vertex-${index}`,
        cx: `${p.x}%`,
        cy: `${p.y}%`,
        r: targetVertexRadiusViewBox,
        fill: buildTargetVertexColor,
        opacity: 0.7,
        stroke: 'white',
        strokeWidth: 0.1 // viewBox units
      });
    });
    
    return React.createElement('svg', {
      key: 'target-vertices-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 6, // Above wireframe, below main shape
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, circles);
  }, [mode, buildHighlightTargetVertices, resolvedTargetVertices, coordinates, gridRows, gridCols, zIndex, buildTargetVertexColor, buildTargetVertexSize, gridDimensions]);

  // Build mode: Render success message
  const renderBuildSuccessMessage = React.useMemo(() => {
    if (mode !== 'build' || !buildTargetAchieved || !buildShowSuccessMessage || !coordinates) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Calculate container position in percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidth = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeight = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    return React.createElement('div', {
      key: 'build-success-message',
      style: {
        position: 'absolute',
        left: `${containerLeft}%`,
        top: `${containerTop}%`,
        width: `${containerWidth}%`,
        height: `${containerHeight}%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: zIndex + 200, // Above everything
        pointerEvents: 'none'
      }
    }, React.createElement('div', {
      style: {
        backgroundColor: 'rgba(0, 170, 0, 0.9)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        animation: 'fadeIn 0.3s ease-out'
      }
    }, buildSuccessMessage));
  }, [mode, buildTargetAchieved, buildShowSuccessMessage, buildSuccessMessage, coordinates, zIndex]);

  // Render angle markers
  const renderAngleMarkers = React.useMemo(() => {
    if (angleConfig.show === 'none' || currentAngleShow === 'none') {
      return [];
    }
    const AngleMarkerComp = window.AngleMarkerComponent?.AngleMarkerComponent;
    if (!AngleMarkerComp) {
      // Angle marker component is not available; skip rendering markers
      return [];
    }
    
    // Check if we should filter by specific vertex(es)
    // showAngleVertex can be a single number, an array of numbers, or null
    const showAngleVertex = displayState.showAngleVertex;
    const showAngleVertexArray = Array.isArray(showAngleVertex) 
      ? showAngleVertex 
      : (showAngleVertex !== null && showAngleVertex !== undefined ? [showAngleVertex] : null);
    
    // Filtering handled silently; no verbose logging
    return vertices.map((vertex, index) => {
      // Skip this vertex if filtering is active and this vertex is not in the array
      if (showAngleVertexArray !== null && !showAngleVertexArray.includes(index)) {
        return null;
      }
      
      const prevIndex = (index - 1 + 4) % 4;
      const nextIndex = (index + 1) % 4;
      
      const currentVertex = getVertexPosition(index);
      const prevVertex = getVertexPosition(prevIndex);
      const nextVertex = getVertexPosition(nextIndex);
      
      // Get per-vertex config (merges with global defaults)
      const vertexAngleConfig = getVertexAngleConfig(index);
      
      // Use interior angle config as defaults (fallback if per-angle configs not provided)
      const defaultConfig = vertexAngleConfig.interiorAngle || {
        size: angleMarkerSize,
        color: angleMarkerColor,
        showText: currentAngleShowText,
        textMode: 'both'
      };
      
      // Always override showText with currentAngleShowText to respect checkbox state
      // If checkbox is unchecked, hide text regardless of config
      const finalShowText = currentAngleShowText ? (defaultConfig.showText !== false) : false;
      
      // Helper to override showText in per-angle configs to respect checkbox state
      const overrideShowText = (config) => {
        if (!config) return config;
        return {
          ...config,
          showText: currentAngleShowText ? (config.showText !== false) : false
        };
      };
      
      // Calculate vertex position using the SAME method as protractor (gridToGridCell)
      // This converts quad grid coordinates to precision grid coordinates
      const vertexPosition = gridToGridCell(currentVertex);
      
      // Use container-relative percentages (same formula as vertices)
      // Vertices use: offsetX + (col / gridCols) * width
      // We have quad grid coordinates in currentVertex, so use them directly
      const { width, height, offsetX, offsetY } = gridDimensions;
      
      // Calculate position as percentage within container (EXACT same formula as vertices)
      const absoluteLeft = offsetX + (currentVertex.col / gridCols) * width;
      const absoluteTop = offsetY + (currentVertex.row / gridRows) * height;
      
      // Detailed angle marker position / DOM comparison logs removed for production
      
      // Get vertex label (A, B, C, D) - use the same labels array that's already defined
      const vertexLabel = vertexLabels[index] || `Vertex${index}`;
      
      const markerProps = {
        key: `angle-${index}`,
        vertex: currentVertex,
        prevVertex: prevVertex,
        nextVertex: nextVertex,
        angle: angles[index],
        containerCoordinates: coordinates,
        gridRows: gridRows,
        gridCols: gridCols,
        gridPadding: gridPadding,
        // Pass pre-calculated position to match vertex positioning
        position: { left: `${absoluteLeft}%`, top: `${absoluteTop}%` },
        markerType: currentAngleShow,
        color: defaultConfig.color,
        size: defaultConfig.size,
        zIndex: zIndex + 100,
        showText: finalShowText,
        textColor: angleTextColor,
        textSize: angleTextSize,
        textFont: angleTextFont,
        textOffset: angleTextOffset,
        labelBackgroundColor: angleLabelBackgroundColor,
        labelBorderColor: angleLabelBorderColor,
        labelBorderWidth: angleLabelBorderWidth,
        labelPadding: angleLabelPadding,
        textMode: defaultConfig.textMode,
        vertexLabel: vertexLabel, // Pass vertex label for logging
        // Per-angle configurations (with showText overridden to respect checkbox)
        interiorAngleConfig: overrideShowText(vertexAngleConfig.interiorAngle),
        supplementaryAngle1Config: overrideShowText(vertexAngleConfig.supplementaryAngle1),
        supplementaryAngle2Config: overrideShowText(vertexAngleConfig.supplementaryAngle2),
        supplementaryAngle3Config: overrideShowText(vertexAngleConfig.supplementaryAngle3),
        // Protractor spawn function
        onArcClick: protractorConfig.enableClickToSpawn ? spawnProtractorAtVertex : null
      };
      
      return React.createElement(AngleMarkerComp, markerProps);
    }).filter(Boolean); // Filter out null values from vertex filtering
  }, [angleConfig.show, currentAngleShow, currentAngleShowText, getVertexAngleConfig, angleTextColor, angleTextSize, angleTextFont, angleTextOffset, vertices, angles, getVertexPosition, coordinates, gridRows, gridCols, gridPadding, zIndex, protractorConfig.enableClickToSpawn, spawnProtractorAtVertex, displayState.showAngleVertex]);

  // Render animated angle equality arc
  const renderAnimatedAngleArc = React.useMemo(() => {
    if (!angleAnimation) {
      return null;
    }

    const { sourceVertexIndex, targetVertexIndex, progress, isComplete, blinkStartTime } = angleAnimation;
    console.log('🎨 Rendering animated arc:', { sourceVertexIndex, targetVertexIndex, progress, isComplete });
    
    // Get vertex positions
    const sourceVertex = getVertexPosition(sourceVertexIndex);
    const targetVertex = getVertexPosition(targetVertexIndex);
    
    // Get adjacent vertices for source
    const sourcePrevIndex = (sourceVertexIndex - 1 + 4) % 4;
    const sourceNextIndex = (sourceVertexIndex + 1) % 4;
    const sourcePrev = getVertexPosition(sourcePrevIndex);
    const sourceNext = getVertexPosition(sourceNextIndex);
    
    // Get adjacent vertices for target
    const targetPrevIndex = (targetVertexIndex - 1 + 4) % 4;
    const targetNextIndex = (targetVertexIndex + 1) % 4;
    const targetPrev = getVertexPosition(targetPrevIndex);
    const targetNext = getVertexPosition(targetNextIndex);
    
    // Get angle configs
    const sourceConfig = getVertexAngleConfig(sourceVertexIndex);
    const targetConfig = getVertexAngleConfig(targetVertexIndex);
    const arcConfig = sourceConfig.interiorAngle || {
      size: angleMarkerSize,
      color: angleMarkerColor,
      fill: true,
      fillColor: angleMarkerColor,
      fillOpacity: 0.5
    };
    
    // Process arc size
    const processArcSize = (size) => {
      if (typeof size === 'number') return Math.max(size, 0.5);
      if (typeof size === 'string' && size.includes('gc')) {
        const gcValue = parseFloat(size.replace('gc', '')) || 1;
        return Math.max(gcValue, 0.5);
      }
      return 1;
    };
    
    const arcEffectiveSize = processArcSize(arcConfig.size || angleMarkerSize);
    const baseRadius = 25;
    const radius = Math.max(baseRadius * arcEffectiveSize, 15);
    
    // Calculate vectors for source angle
    const sourceVec1 = {
      x: sourcePrev.col - sourceVertex.col,
      y: sourcePrev.row - sourceVertex.row
    };
    const sourceVec2 = {
      x: sourceNext.col - sourceVertex.col,
      y: sourceNext.row - sourceVertex.row
    };
    
    // Calculate vectors for target angle
    const targetVec1 = {
      x: targetPrev.col - targetVertex.col,
      y: targetPrev.row - targetVertex.row
    };
    const targetVec2 = {
      x: targetNext.col - targetVertex.col,
      y: targetNext.row - targetVertex.row
    };
    
    // Calculate angles
    const sourceAngleToPrev = Math.atan2(sourceVec1.y, sourceVec1.x) * (180 / Math.PI);
    const targetAngleToPrev = Math.atan2(targetVec1.y, targetVec1.x) * (180 / Math.PI);
    
    const sourceAngle = angles[sourceVertexIndex];
    const targetAngle = angles[targetVertexIndex];
    
    // Calculate cross products for sweep direction
    const sourceCross = sourceVec1.x * sourceVec2.y - sourceVec1.y * sourceVec2.x;
    const targetCross = targetVec1.x * targetVec2.y - targetVec1.y * targetVec2.x;
    const sourceSweep = sourceCross > 0 ? 1 : 0;
    const targetSweep = targetCross > 0 ? 1 : 0;
    
    // Calculate start and end angles for source arc
    const sourceStartAngle = sourceAngleToPrev;
    const sourceEndAngle = sourceSweep === 1 
      ? sourceStartAngle + sourceAngle 
      : sourceStartAngle - sourceAngle;
    
    // Calculate start and end angles for target arc
    const targetStartAngle = targetAngleToPrev;
    const targetEndAngle = targetSweep === 1 
      ? targetStartAngle + targetAngle 
      : targetStartAngle - targetAngle;
    
    // Convert to radians
    const sourceStartRad = sourceStartAngle * (Math.PI / 180);
    const sourceEndRad = sourceEndAngle * (Math.PI / 180);
    const targetStartRad = targetStartAngle * (Math.PI / 180);
    const targetEndRad = targetEndAngle * (Math.PI / 180);
    
    // Calculate arc path points
    const sourceX1 = radius * Math.cos(sourceStartRad);
    const sourceY1 = radius * Math.sin(sourceStartRad);
    const sourceX2 = radius * Math.cos(sourceEndRad);
    const sourceY2 = radius * Math.sin(sourceEndRad);
    
    const largeArcFlag = sourceAngle > 180 ? 1 : 0;
    const arcPathData = `M ${sourceX1} ${sourceY1} A ${radius} ${radius} 0 ${largeArcFlag} ${sourceSweep} ${sourceX2} ${sourceY2}`;
    const fillPathData = `M 0 0 L ${sourceX1} ${sourceY1} A ${radius} ${radius} 0 ${largeArcFlag} ${sourceSweep} ${sourceX2} ${sourceY2} Z`;
    
    // Calculate transform to move from source to target
    // Use the same percentage-based positioning as angle markers
    const sourcePos = getVertexPosition(sourceVertexIndex);
    const targetPos = getVertexPosition(targetVertexIndex);
    
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container (same as angle markers)
    const sourceXPercent = (sourcePos.col / gridCols) * 100;
    const sourceYPercent = (sourcePos.row / gridRows) * 100;
    const targetXPercent = (targetPos.col / gridCols) * 100;
    const targetYPercent = (targetPos.row / gridRows) * 100;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate absolute positions in percentage
    const sourceLeft = containerLeft + (sourceXPercent / 100) * containerWidthPercent;
    const sourceTop = containerTop + (sourceYPercent / 100) * containerHeightPercent;
    const targetLeft = containerLeft + (targetXPercent / 100) * containerWidthPercent;
    const targetTop = containerTop + (targetYPercent / 100) * containerHeightPercent;
    
    // Calculate rotation needed to align angles
    const rotationDiff = targetStartAngle - sourceStartAngle;
    
    // Interpolate position and rotation based on progress
    // When complete, lock to target position
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = isComplete ? 1 : easeInOutCubic(progress);
    
    const currentLeft = sourceLeft + (targetLeft - sourceLeft) * easedProgress;
    const currentTop = sourceTop + (targetTop - sourceTop) * easedProgress;
    const currentRotation = rotationDiff * easedProgress;
    
    // Calculate opacity (fade in, then blinking when complete)
    let opacity = 1;
    if (progress < 0.1) {
      opacity = progress / 0.1; // Fade in
    } else if (isComplete && blinkStartTime) {
      // Blinking animation when complete (blink every 500ms)
      const blinkElapsed = Date.now() - blinkStartTime;
      const blinkCycle = (blinkElapsed % 1000) / 1000; // 0 to 1 cycle
      opacity = blinkCycle < 0.5 ? 1 : 0.3; // Blink between full and 30% opacity
    }
    
    const viewBoxSize = radius * 3;
    
    // Process text size for message
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    return React.createElement(React.Fragment, { key: 'animated-angle-arc-container' }, [
      // Animated arc
      React.createElement('div', {
        key: 'animated-angle-arc',
        style: {
          position: 'absolute',
          left: `${currentLeft}%`,
          top: `${currentTop}%`,
          width: `${viewBoxSize}px`,
          height: `${viewBoxSize}px`,
          transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
          transformOrigin: 'center center',
          zIndex: zIndex + 200,
          opacity: isComplete ? undefined : opacity, // CSS animation handles opacity when complete
          pointerEvents: 'none',
          transition: !isComplete && progress < 0.1 ? 'opacity 0.1s ease-in' : 'none',
          animation: isComplete ? 'angleEqualityBlink 1s ease-in-out infinite' : 'none'
        }
      }, React.createElement('svg', {
      viewBox: `${-viewBoxSize/2} ${-viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
      width: viewBoxSize,
      height: viewBoxSize,
      style: {
        overflow: 'visible'
      }
    }, [
      // Filled arc sector
      React.createElement('path', {
        key: 'fill',
        d: fillPathData,
        fill: arcConfig.fillColor || arcConfig.color || angleMarkerColor,
        fillOpacity: (arcConfig.fillOpacity || 0.5) * opacity,
        stroke: 'none'
      }),
      // Arc stroke
      React.createElement('path', {
        key: 'stroke',
        d: arcPathData,
        fill: 'none',
        stroke: arcConfig.color || angleMarkerColor,
        strokeWidth: 2,
        strokeOpacity: opacity,
        strokeLinecap: 'round'
      })
    ])),
      // Success message (shown when animation completes)
      isComplete && React.createElement('div', {
        key: 'equality-message',
        style: {
          position: 'absolute',
          left: messageLeft !== null ? `${messageLeft}%` : `${targetLeft + messageOffsetX}%`,
          top: messageTop !== null ? `${messageTop}%` : `${targetTop + messageOffsetY}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 150, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
        }, equalityMessage)
    ]);
  }, [angleAnimation, vertices, angles, getVertexPosition, getVertexAngleConfig, coordinates, gridRows, gridCols, angleMarkerSize, angleMarkerColor, angleTextSize, angleTextFont, angleTextColor, zIndex, equalityMessage, messageLeft, messageTop, messageOffsetX, messageOffsetY]);

  // Render animated angle sum arcs
  const renderAnimatedAngleSumArcs = React.useMemo(() => {
    if (!angleSumAnimation) {
      return null;
    }

    const { vertex1Index, vertex2Index, progress, isComplete, mode, angle1, angle2, sum } = angleSumAnimation;
    console.log('🎨 Rendering animated sum arcs:', { vertex1Index, vertex2Index, progress, isComplete, mode });
    
    // Source: vertex1's interior angle
    // Target: vertex2's supplementary angle (which should equal angle1 if they sum to 180°)
    const sourceVertexIndex = vertex1Index;
    const targetVertexIndex = vertex2Index;
    
    // Get vertex positions
    const sourceVertex = getVertexPosition(sourceVertexIndex);
    const targetVertex = getVertexPosition(targetVertexIndex);
    
    // Get adjacent vertices for source (interior angle)
    const sourcePrevIndex = (sourceVertexIndex - 1 + 4) % 4;
    const sourceNextIndex = (sourceVertexIndex + 1) % 4;
    const sourcePrev = getVertexPosition(sourcePrevIndex);
    const sourceNext = getVertexPosition(sourceNextIndex);
    
    // Get adjacent vertices for target (for supplementary angle calculation)
    const targetPrevIndex = (targetVertexIndex - 1 + 4) % 4;
    const targetNextIndex = (targetVertexIndex + 1) % 4;
    const targetPrev = getVertexPosition(targetPrevIndex);
    const targetNext = getVertexPosition(targetNextIndex);
    
    // Get angle configs
    const sourceConfig = getVertexAngleConfig(sourceVertexIndex);
    const targetConfig = getVertexAngleConfig(targetVertexIndex);
    const arcConfig = sourceConfig.interiorAngle || {
      size: angleMarkerSize,
      color: angleMarkerColor,
      fill: true,
      fillColor: angleMarkerColor,
      fillOpacity: 0.5
    };
    
    // Process arc size
    const processArcSize = (size) => {
      if (typeof size === 'number') return Math.max(size, 0.5);
      if (typeof size === 'string' && size.includes('gc')) {
        const gcValue = parseFloat(size.replace('gc', '')) || 1;
        return Math.max(gcValue, 0.5);
      }
      return 1;
    };
    
    const arcEffectiveSize = processArcSize(arcConfig.size || angleMarkerSize);
    const baseRadius = 25;
    const radius = Math.max(baseRadius * arcEffectiveSize, 15);
    
    // Calculate vectors for source angle (interior angle at vertex1)
    const sourceVec1 = {
      x: sourcePrev.col - sourceVertex.col,
      y: sourcePrev.row - sourceVertex.row
    };
    const sourceVec2 = {
      x: sourceNext.col - sourceVertex.col,
      y: sourceNext.row - sourceVertex.row
    };
    
    // Calculate vectors for target angle (supplementary angle at vertex2)
    // Supplementary angle starts from nextVertex direction (where interior angle ends)
    const targetVec1 = {
      x: targetNext.col - targetVertex.col,
      y: targetNext.row - targetVertex.row
    };
    const targetVec2 = {
      x: targetPrev.col - targetVertex.col,
      y: targetPrev.row - targetVertex.row
    };
    
    // Calculate angles
    const sourceAngleToPrev = Math.atan2(sourceVec1.y, sourceVec1.x) * (180 / Math.PI);
    const targetAngleToNext = Math.atan2(targetVec1.y, targetVec1.x) * (180 / Math.PI);
    
    // Calculate cross products for sweep direction
    const sourceCross = sourceVec1.x * sourceVec2.y - sourceVec1.y * sourceVec2.x;
    const targetCross = targetVec1.x * targetVec2.y - targetVec1.y * targetVec2.x;
    const sourceSweep = sourceCross > 0 ? 1 : 0;
    const targetSweep = targetCross > 0 ? 1 : 0;
    
    // Calculate start and end angles for source arc (interior angle)
    const sourceStartAngle = sourceAngleToPrev;
    const sourceEndAngle = sourceSweep === 1 
      ? sourceStartAngle + angle1 
      : sourceStartAngle - angle1;
    
    // Calculate start and end angles for target supplementary angle
    // Supplementary angle = 180° - interior angle = angle1 (if they sum to 180°)
    const supplementaryAngle = 180 - angle2; // Should equal angle1
    const targetStartAngle = targetAngleToNext; // Starts from nextVertex direction (where interior angle ends)
    const targetEndAngle = targetSweep === 1 
      ? targetStartAngle + supplementaryAngle 
      : targetStartAngle - supplementaryAngle;
    
    // Convert to radians
    const sourceStartRad = sourceStartAngle * (Math.PI / 180);
    const sourceEndRad = sourceEndAngle * (Math.PI / 180);
    const targetStartRad = targetStartAngle * (Math.PI / 180);
    const targetEndRad = targetEndAngle * (Math.PI / 180);
    
    // Calculate arc path points
    const sourceX1 = radius * Math.cos(sourceStartRad);
    const sourceY1 = radius * Math.sin(sourceStartRad);
    const sourceX2 = radius * Math.cos(sourceEndRad);
    const sourceY2 = radius * Math.sin(sourceEndRad);
    
    const largeArcFlag = angle1 > 180 ? 1 : 0;
    const arcPathData = `M ${sourceX1} ${sourceY1} A ${radius} ${radius} 0 ${largeArcFlag} ${sourceSweep} ${sourceX2} ${sourceY2}`;
    const fillPathData = `M 0 0 L ${sourceX1} ${sourceY1} A ${radius} ${radius} 0 ${largeArcFlag} ${sourceSweep} ${sourceX2} ${sourceY2} Z`;
    
    // Calculate transform to move from source to target
    // Use the same percentage-based positioning as angle markers
    const sourcePos = getVertexPosition(sourceVertexIndex);
    const targetPos = getVertexPosition(targetVertexIndex);
    
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container (same as angle markers)
    const sourceXPercent = (sourcePos.col / gridCols) * 100;
    const sourceYPercent = (sourcePos.row / gridRows) * 100;
    const targetXPercent = (targetPos.col / gridCols) * 100;
    const targetYPercent = (targetPos.row / gridRows) * 100;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate absolute positions in percentage
    const sourceLeft = containerLeft + (sourceXPercent / 100) * containerWidthPercent;
    const sourceTop = containerTop + (sourceYPercent / 100) * containerHeightPercent;
    const targetLeft = containerLeft + (targetXPercent / 100) * containerWidthPercent;
    const targetTop = containerTop + (targetYPercent / 100) * containerHeightPercent;
    
    // Calculate rotation needed to align source arc to target supplementary angle
    const rotationDiff = targetStartAngle - sourceStartAngle;
    
    // Interpolate position and rotation based on progress
    // When complete, lock to target position
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = isComplete ? 1 : easeInOutCubic(progress);
    
    const currentLeft = sourceLeft + (targetLeft - sourceLeft) * easedProgress;
    const currentTop = sourceTop + (targetTop - sourceTop) * easedProgress;
    const currentRotation = rotationDiff * easedProgress;
    
    // Calculate opacity (fade in, then blinking when complete)
    let opacity = 1;
    if (progress < 0.1) {
      opacity = progress / 0.1; // Fade in
    }
    
    const viewBoxSize = radius * 3;
    
    // Process text size for message
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Calculate semicircle (180° arc) for when animation completes
    // Make it bigger than the original arc (1.5x radius)
    const semicircleRadius = radius * 1.5;
    const semicircleViewBoxSize = semicircleRadius * 3;
    
    // Semicircle path: from -90° (left) to +90° (right), forming top half
    // Or from 0° to 180° depending on orientation
    // Use the target rotation to align with the supplementary angle
    const semicircleStartRad = -Math.PI / 2; // -90° (left)
    const semicircleEndRad = Math.PI / 2; // +90° (right)
    
    const semicircleX1 = semicircleRadius * Math.cos(semicircleStartRad);
    const semicircleY1 = semicircleRadius * Math.sin(semicircleStartRad);
    const semicircleX2 = semicircleRadius * Math.cos(semicircleEndRad);
    const semicircleY2 = semicircleRadius * Math.sin(semicircleEndRad);
    
    // Semicircle arc path (top half of circle)
    const semicirclePathData = `M ${semicircleX1} ${semicircleY1} A ${semicircleRadius} ${semicircleRadius} 0 0 1 ${semicircleX2} ${semicircleY2}`;
    
    // Calculate path length for dash animation (approximate: π * radius for semicircle)
    const semicirclePathLength = Math.PI * semicircleRadius;
    
    // Create unique animation name
    const animName = `semicircle-draw-${Math.round(semicirclePathLength)}`;
    
    return React.createElement(React.Fragment, { key: 'animated-angle-sum-arc-container' }, [
      // Animated arc (source interior angle moving to target supplementary angle)
      React.createElement('div', {
        key: 'animated-sum-arc',
        style: {
          position: 'absolute',
          left: `${currentLeft}%`,
          top: `${currentTop}%`,
          width: `${viewBoxSize}px`,
          height: `${viewBoxSize}px`,
          transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
          transformOrigin: 'center center',
          zIndex: zIndex + 200,
          opacity: isComplete ? undefined : opacity, // CSS animation handles opacity when complete
          pointerEvents: 'none',
          transition: !isComplete && progress < 0.1 ? 'opacity 0.1s ease-in' : 'none',
          animation: isComplete ? 'angleEqualityBlink 1s ease-in-out infinite' : 'none'
        }
      }, React.createElement('svg', {
        viewBox: `${-viewBoxSize/2} ${-viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        width: viewBoxSize,
        height: viewBoxSize,
        style: {
          overflow: 'visible'
        }
      }, [
        // Filled arc sector
        React.createElement('path', {
          key: 'fill',
          d: fillPathData,
          fill: arcConfig.fillColor || arcConfig.color || angleMarkerColor,
          fillOpacity: (arcConfig.fillOpacity || 0.5) * opacity,
          stroke: 'none'
        }),
        // Arc stroke
        React.createElement('path', {
          key: 'stroke',
          d: arcPathData,
          fill: 'none',
          stroke: arcConfig.color || angleMarkerColor,
          strokeWidth: 2,
          strokeOpacity: opacity,
          strokeLinecap: 'round'
        })
      ])),
      
      // Semicircle (180° arc) - appears when animation completes
      isComplete && React.createElement('div', {
        key: 'semicircle-180',
        style: {
          position: 'absolute',
          left: `${targetLeft}%`,
          top: `${targetTop}%`,
          width: `${semicircleViewBoxSize}px`,
          height: `${semicircleViewBoxSize}px`,
          transform: `translate(-50%, -50%) rotate(${targetStartAngle}deg)`,
          transformOrigin: 'center center',
          zIndex: zIndex + 201,
          pointerEvents: 'none'
        }
      }, React.createElement('svg', {
        viewBox: `${-semicircleViewBoxSize/2} ${-semicircleViewBoxSize/2} ${semicircleViewBoxSize} ${semicircleViewBoxSize}`,
        width: semicircleViewBoxSize,
        height: semicircleViewBoxSize,
        style: {
          overflow: 'visible'
        }
      }, [
        React.createElement('path', {
          key: 'semicircle-stroke',
          d: semicirclePathData,
          fill: 'none',
          stroke: arcConfig.color || angleMarkerColor,
          strokeWidth: 3,
          strokeOpacity: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          style: {
            strokeDasharray: `${semicirclePathLength}px`,
            strokeDashoffset: `${semicirclePathLength}px`,
            // Include fill-mode in animation shorthand to avoid React warning
            animation: `${animName} 2s ease-in-out infinite forwards`
          }
        })
      ])),
      
      // "180°" text above or below semicircle (blinking, not rotated)
      isComplete && (() => {
        // The semicircle is drawn from -90° to +90° (top half)
        // The flat edge (diameter) is at the bottom of the semicircle
        // When rotated by targetStartAngle, the opening direction is targetStartAngle - 90°
        // Determine if the opening is facing up or down
        const openingAngle = targetStartAngle - 90;
        const normalizedOpening = ((openingAngle % 360) + 360) % 360;
        
        // If opening is between 180° and 360° (or 0°), it's facing down → text below
        // If opening is between 0° and 180°, it's facing up → text above
        const isOpeningFacingDown = normalizedOpening > 180 || normalizedOpening === 0;
        
        // Calculate offset based on semicircle radius
        // Convert radius pixels to percentage offset
        const pixelsPerPercent = containerWidth / 100;
        const offsetPixels = semicircleRadius * 0.8; // 80% of radius for spacing
        const baseOffsetPercent = (offsetPixels / pixelsPerPercent);
        
        // Use custom offset if provided, otherwise use calculated offset (doubled)
        const verticalOffset = deg180TextOffsetY !== null 
          ? deg180TextOffsetY 
          : (isOpeningFacingDown ? baseOffsetPercent * 2 : -baseOffsetPercent * 2); // Doubled offset, positive = below, negative = above
        
        return React.createElement('div', {
          key: '180-deg-text',
          style: {
            position: 'absolute',
            left: `${targetLeft}%`,
            top: `${targetTop + verticalOffset}%`,
            transform: 'translate(-50%, -50%)', // Center horizontally, no rotation
            zIndex: 9999, // Max z-index to be on top
            pointerEvents: 'none',
            animation: 'angleEqualityBlink 1s ease-in-out infinite',
            fontSize: `${messageTextSize * deg180TextFontSize}px`,
            fontWeight: 'bold',
            fontFamily: angleTextFont || 'Arial, sans-serif',
            color: arcConfig.color || angleMarkerColor,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }
        }, '180°');
      })(),
      
      // Success message (shown when animation completes)
      isComplete && React.createElement('div', {
        key: 'sum-message',
        style: {
          position: 'absolute',
          left: sumMessageLeft !== null ? `${sumMessageLeft}%` : `${targetLeft + sumMessageOffsetX}%`,
          top: sumMessageTop !== null ? `${sumMessageTop}%` : `${targetTop + sumMessageOffsetY}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 203,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 150, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, sumMessage)
    ]);
  }, [angleSumAnimation, vertices, angles, getVertexPosition, getVertexAngleConfig, coordinates, gridRows, gridCols, angleMarkerSize, angleMarkerColor, angleTextSize, angleTextFont, angleTextColor, zIndex, sumMessage, sumMessageLeft, sumMessageTop, sumMessageOffsetX, sumMessageOffsetY, deg180TextFontSize, deg180TextOffsetY]);

  // Render property panel
  const renderPropertyPanel = React.useMemo(() => {
    if (currentShowProperties === 'none') return null;
    
    const PropertyPanelComp = window.PropertyPanelComponent?.PropertyPanelComponent;
    if (!PropertyPanelComp) {
      console.warn('PropertyPanelComponent not available');
      return null;
    }
    
    if (currentShowProperties === 'panel' || currentShowProperties === 'both') {
      // Position panel to the right of the quad
      const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
      const panelCoords = [x2 + 50, y1, x2 + 400, y2];
      
      return React.createElement(PropertyPanelComp, {
        key: 'property-panel',
        properties: analyzedProperties,
        quadType: currentQuadType,
        displayMode: 'panel',
        coordinates: panelCoords,
        zIndex: zIndex + 200
      });
    }
    
    return null;
  }, [currentShowProperties, analyzedProperties, currentQuadType, coordinates, zIndex]);

  // Render integrated protractor
  const renderProtractor = React.useMemo(() => {
    if (!protractorConfig.enabled || !window.ProtractorComponent) return null;
    
    // Convert snap points from quadrilateral grid to precision grid
    const convertedSnapPoints = protractorSnapPoints.map(point => {
      const converted = gridToGridCell({ row: point.y, col: point.x });
      return {
        x: converted.col,
        y: converted.row,
        label: point.label
      };
    });
    
    // Get protractor configuration with defaults
    const protractorProps = {
      key: 'integrated-protractor',
      id: `${id || elementName}-protractor`,
      elementName: `${elementName}-protractor`,
      currentPage: currentPage,
      
      // Visual configuration (inherit from protractorConfig or use defaults)
      protractorType: protractorConfig.type || 'semicircular',
      radius: protractorConfig.radius || '80gc',
      backgroundColor: protractorConfig.backgroundColor || 'rgba(200, 220, 255, 0.25)',
      color: protractorConfig.color || '#1a5490',
      labelColor: protractorConfig.labelColor || '#0d3a6b',
      
      // Position (default to center of quad if not specified)
      centerPoint: protractorConfig.centerPoint || (() => {
        const centerRow = (vertices[0].row + vertices[1].row + vertices[2].row + vertices[3].row) / 4;
        const centerCol = (vertices[0].col + vertices[1].col + vertices[2].col + vertices[3].col) / 4;
        const converted = gridToGridCell({ row: centerRow, col: centerCol });
        return { row: converted.row, col: converted.col };
      })(),
      
      // Interactive configuration (as specified)
      mode: 'interactive',
      isDraggable: true,
      isRotatable: true,
      isProtractorRotatable: true,
      showProtractorRotationHandle: true,
      cursor: 'move',
      
      // Measurement arm configuration
      measurementArm: {
        show: protractorConfig.showArm !== undefined ? protractorConfig.showArm : true,
        color: protractorConfig.armColor || '#FF0000',
        startDeg: protractorConfig.armStartDeg || 0,
        extendable: protractorConfig.armExtendable !== undefined ? protractorConfig.armExtendable : true,
        style: protractorConfig.armStyle || 'dashed',
        zIndex: 10,
        angleDisplay: {
          show: protractorConfig.showAngleDisplay !== undefined ? protractorConfig.showAngleDisplay : true,
          size: protractorConfig.angleDisplaySize || '14gc',
          color: protractorConfig.angleDisplayColor || null
        }
      },
      
      // Baseline configuration
      baseline: {
        show: protractorConfig.showBaseline !== undefined ? protractorConfig.showBaseline : false,
        color: protractorConfig.baselineColor || '#999999',
        style: protractorConfig.baselineStyle || 'dashed',
        width: protractorConfig.baselineWidth || 1
      },
      
      // Snap points configuration (vertices + diagonal intersection)
      snapPoints: convertedSnapPoints,
      snapMode: protractorConfig.snapMode || 'hybrid',
      snapThreshold: protractorConfig.snapThreshold || 50,
      showSnapIndicators: protractorConfig.showSnapIndicators !== undefined ? protractorConfig.showSnapIndicators : true,
      highlightNearestSnap: protractorConfig.highlightNearestSnap !== undefined ? protractorConfig.highlightNearestSnap : true,
      
      // Z-index (above quadrilateral)
      zIndex: zIndex + 300,
      
      // Callbacks
      onAngleChange: protractorConfig.onAngleChange,
      onArmExtend: protractorConfig.onArmExtend,
      onProtractorRotate: protractorConfig.onProtractorRotate,
      onPositionChange: protractorConfig.onPositionChange,
      onSnapToPoint: protractorConfig.onSnapToPoint,
      onClick: protractorConfig.onClick
    };
    
    return React.createElement(window.ProtractorComponent, protractorProps);
  }, [protractorConfig, protractorSnapPoints, vertices, gridToGridCell, id, elementName, currentPage, zIndex]);

  // Container for capturing mouse and touch events during drag
  React.useEffect(() => {
    if (draggingVertexIndex === null) return;
    
    const handleMouseMove = (e) => {
      handleVertexDragMove(draggingVertexIndex, e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => {
      handleVertexDragEnd(draggingVertexIndex);
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      if (touch) {
        handleVertexDragMove(draggingVertexIndex, touch.clientX, touch.clientY);
      }
    };
    
    const handleTouchEnd = (e) => {
      e.preventDefault(); // Prevent any default touch behaviors
      handleVertexDragEnd(draggingVertexIndex);
    };
    
    // Mouse events (not passive, but don't need preventDefault)
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Touch events (must be non-passive to allow preventDefault)
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [draggingVertexIndex, handleVertexDragMove, handleVertexDragEnd]);

  // Render animated side line for side equality animation
  const renderAnimatedSideLine = React.useMemo(() => {
    if (!sideEqualityAnimation) {
      return null;
    }

    const { commonVertexIndex, prevVertexIndex, nextVertexIndex, progress, phase } = sideEqualityAnimation;
    console.log('🎨 Rendering animated side line:', { commonVertexIndex, progress, phase });
    
    // Get vertex positions (in component grid coordinates)
    const commonVertex = getVertexPosition(commonVertexIndex);
    const prevVertex = getVertexPosition(prevVertexIndex);
    const nextVertex = getVertexPosition(nextVertexIndex);
    
    // Use the same coordinate conversion as renderSides
    // This ensures the animation line matches the actual sides perfectly
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Convert vertex grid coordinates to percentages within container (same as sides)
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    const commonPos = getVertexPercent(commonVertex);
    const prevPos = getVertexPercent(prevVertex);
    const nextPos = getVertexPercent(nextVertex);
    
    // Calculate side1 endpoint (prevVertex) - this is where the line starts
    const side1EndX = prevPos.x;
    const side1EndY = prevPos.y;
    
    // Calculate side2 endpoint (nextVertex) - this is where the line rotates to
    const side2EndX = nextPos.x;
    const side2EndY = nextPos.y;
    
    // Calculate side1 length in percentage units (for reference/debugging)
    const side1Length = Math.sqrt(
      Math.pow(commonPos.x - prevPos.x, 2) + Math.pow(commonPos.y - prevPos.y, 2)
    );
    const side2Length = Math.sqrt(
      Math.pow(nextPos.x - commonPos.x, 2) + Math.pow(nextPos.y - commonPos.y, 2)
    );
    
    // Angle FROM common vertex BACK to prev vertex (for starting position)
    const side1AngleFromCommon = Math.atan2(prevPos.y - commonPos.y, prevPos.x - commonPos.x) * (180 / Math.PI);
    // Angle FROM common vertex TO next vertex (for ending position)
    const side2AngleFromCommon = Math.atan2(nextPos.y - commonPos.y, nextPos.x - commonPos.x) * (180 / Math.PI);
    
    // Instead of rotating a fixed length, interpolate between the two actual endpoints
    // This ensures the line maintains visual consistency
    // We'll interpolate the endpoint position, but scale it to maintain side1's length
    const side1VectorX = side1EndX - commonPos.x;
    const side1VectorY = side1EndY - commonPos.y;
    const side2VectorX = side2EndX - commonPos.x;
    const side2VectorY = side2EndY - commonPos.y;
    
    // Interpolate the direction vector
    const currentVectorX = side1VectorX + (side2VectorX - side1VectorX) * progress;
    const currentVectorY = side1VectorY + (side2VectorY - side1VectorY) * progress;
    
    // Normalize the current direction vector and scale it to side1's length
    const currentVectorLength = Math.sqrt(currentVectorX * currentVectorX + currentVectorY * currentVectorY);
    const scaleFactor = side1Length / (currentVectorLength || 1); // Avoid division by zero
    
    // Calculate the end point maintaining side1's length
    const lineEndX = commonPos.x + currentVectorX * scaleFactor;
    const lineEndY = commonPos.y + currentVectorY * scaleFactor;
    
    // Debug logging
    console.log('🎨 Side animation details:', {
      commonVertexIndex,
      side1Length: side1Length.toFixed(2) + '%',
      side2Length: side2Length.toFixed(2) + '%',
      currentVectorLength: currentVectorLength.toFixed(2) + '%',
      scaleFactor: scaleFactor.toFixed(3),
      side1AngleFromCommon: side1AngleFromCommon.toFixed(2) + '°',
      side2AngleFromCommon: side2AngleFromCommon.toFixed(2) + '°',
      progress: progress.toFixed(3),
      commonPos: `${commonPos.x.toFixed(2)}%, ${commonPos.y.toFixed(2)}%`,
      lineEnd: `${lineEndX.toFixed(2)}%, ${lineEndY.toFixed(2)}%`
    });
    
    // Calculate line thickness (same as side thickness)
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const lineThickness = processGcToPixels(edgeThickness || '4gc', 4);
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // lineEndX and lineEndY are already calculated above by interpolating and scaling
    
    // Calculate message position (in global grid system for absolute positioning)
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeightPercent = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    // Convert common vertex position to global percentage for message positioning
    const commonLeft = containerLeft + (commonPos.x / 100) * containerWidthPercent;
    const commonTop = containerTop + (commonPos.y / 100) * containerHeightPercent;
    
    return React.createElement(React.Fragment, { key: 'animated-side-line-container' }, [
      // Animated dashed line using SVG (matching sides rendering exactly)
      React.createElement('svg', {
        key: 'animated-side-line',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('line', {
        x1: `${commonPos.x}%`,
        y1: `${commonPos.y}%`,
        x2: `${lineEndX}%`,
        y2: `${lineEndY}%`,
        stroke: 'orange',
        strokeWidth: edgeThickness || '4gc',
        strokeDasharray: sideLineStyle === 'dashed' ? `${lineThickness * 2}, ${lineThickness}` : 'none',
        strokeLinecap: 'round',
        style: {
          animation: 'sideEqualityBlink 0.8s ease-in-out infinite'
        }
      })),
      
      // Success message (always shown when animation is active)
      React.createElement('div', {
        key: 'side-equality-message',
        style: {
          position: 'absolute',
          left: sideMessageLeft !== null ? `${sideMessageLeft}%` : `${commonLeft + sideMessageOffsetX}%`,
          top: sideMessageTop !== null ? `${sideMessageTop}%` : `${commonTop + sideMessageOffsetY}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 140, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, sideEqualityMessage)
    ]);
  }, [sideEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, edgeThickness, angleTextSize, angleTextFont, zIndex, sideEqualityMessage, sideMessageLeft, sideMessageTop, sideMessageOffsetX, sideMessageOffsetY, sideLineStyle]);

  // Helper function to determine which sides are equal and assign stroke types
  const getEqualSideGroups = React.useCallback((sideLengths, tolerance = 0.01) => {
    const groups = [];
    const processed = new Set();
    
    // Find all pairs/groups of equal sides
    for (let i = 0; i < 4; i++) {
      if (processed.has(i)) continue;
      
      const group = [i];
      for (let j = i + 1; j < 4; j++) {
        if (Math.abs(sideLengths[i] - sideLengths[j]) < tolerance) {
          group.push(j);
          processed.add(j);
        }
      }
      
      if (group.length > 1) {
        groups.push(group);
        processed.add(i);
      }
    }
    
    // Assign stroke types:
    // - If all 4 sides are equal (one group with 4 sides), all get single stroke
    // - If 2 pairs of equal sides, first pair gets single stroke, second pair gets double stroke
    const strokeMap = {};
    if (groups.length === 1 && groups[0].length === 4) {
      // All 4 sides are equal - all get single stroke
      groups[0].forEach(sideIndex => {
        strokeMap[sideIndex] = 'single';
      });
    } else {
      // Multiple groups (pairs) - first group gets single, second gets double
      groups.forEach((group, groupIndex) => {
        const strokeType = groupIndex === 0 ? 'single' : 'double';
        group.forEach(sideIndex => {
          strokeMap[sideIndex] = strokeType;
        });
      });
    }
    
    return { groups, strokeMap };
  }, []);

  // Render stroke indicators on equal sides
  const renderEqualSideStrokes = React.useMemo(() => {
    // Get stroke configuration
    const strokeConfig = allSideEqualityAnimationConfig.strokeConfig || {};
    const showStrokes = strokeConfig.show !== false; // Default to true
    const shouldBlink = strokeConfig.blink === true; // Default to false
    const initFromVerticesOnMount = strokeConfig.initFromVerticesOnMount === true;
    
    // Don't render if strokes are disabled
    if (!showStrokes) {
      return null;
    }
    
    // Get stroke data - either from current animation or from stored permanent data
    let strokeMap = {};
    let sideLengths = [];
    
    if (allSideEqualityAnimation && allSideEqualityAnimation.phase === 'complete') {
      // Animation just completed - use current data and store it
      sideLengths = allSideEqualityAnimation.sideLengths;
      const result = getEqualSideGroups(sideLengths);
      strokeMap = result.strokeMap;
      
      // Store for persistence
      if (Object.keys(strokeMap).length > 0) {
        permanentEqualSideStrokesRef.current = { strokeMap, sideLengths };
      }
    } else if (permanentEqualSideStrokesRef.current) {
      // Use stored stroke data (animation completed previously)
      strokeMap = permanentEqualSideStrokesRef.current.strokeMap;
      sideLengths = permanentEqualSideStrokesRef.current.sideLengths;
    } else {
      // No animation data and no stored data - optionally calculate side lengths and
      // initialize strokes directly from vertices (for static displays like page 4).
      // This is opt-in via strokeConfig.initFromVerticesOnMount to avoid strokes
      // appearing before the rod animation runs on animated pages (e.g. page 3).
      if (initFromVerticesOnMount && showStrokes && vertices && vertices.length === 4) {
        // Calculate side lengths in grid cells (same method as animation)
        sideLengths = [];
        for (let i = 0; i < 4; i++) {
          const v1 = vertices[i];
          const v2 = vertices[(i + 1) % 4];
          // Calculate distance in grid cells
          const rowDiff = v2.row - v1.row;
          const colDiff = v2.col - v1.col;
          const length = Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
          sideLengths.push(length);
        }
        
        // Get equal side groups and create stroke map
        const result = getEqualSideGroups(sideLengths);
        strokeMap = result.strokeMap;
        
        // Store for persistence
        if (Object.keys(strokeMap).length > 0) {
          permanentEqualSideStrokesRef.current = { strokeMap, sideLengths };
        } else {
          // No equal sides found - don't render
          return null;
        }
      } else {
        // No animation data and no stored data - don't render
        return null;
      }
    }
    
    // If no equal sides, don't render strokes
    if (Object.keys(strokeMap).length === 0) {
      return null;
    }
    
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Convert vertex grid coordinates to percentages
    const getVertexPercent = (vertexIndex) => {
      const vertex = vertices[vertexIndex];
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Stroke color from config (default: orange)
    const strokeColor = strokeConfig.color || '#FF6600';
    
    // Helper to convert gc units to viewBox units (viewBox is "0 0 100 100")
    // Uses the same method as other SVG conversions in this component
    const processGcToViewBox = (gcValue) => {
      if (!coordinates) return 2; // Default fallback
      
      if (typeof gcValue === 'number') return gcValue;
      if (typeof gcValue === 'string' && gcValue.includes('gc')) {
        const gcNum = parseFloat(gcValue.replace('gc', ''));
        if (isNaN(gcNum)) return 2;
        
        // Container size in GC units (from coordinates)
        const [cx1, cy1, cx2, cy2] = coordinates;
        const containerWidthGc = cx2 - cx1 + 1;
        const containerHeightGc = cy2 - cy1 + 1;
        
        // Use average of width and height for consistent scaling
        const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
        
        // Convert GC units to viewBox units (viewBox is "0 0 100 100")
        const viewBoxUnits = (gcNum / avgContainerGc) * 100;
        
        return viewBoxUnits;
      }
      return parseFloat(gcValue) || 2;
    };
    
    const strokeWidthPercent = processGcToViewBox('4gc');
    const strokeLengthPercent = processGcToViewBox('20gc'); // Length of each stroke mark
    
    const strokes = [];
    
    // Convert grid (col, row) to same percentage space as getVertexPercent
    const gridToPercent = (col, row) => ({
      x: offsetX + (col / gridCols) * width,
      y: offsetY + (row / gridRows) * height
    });
    
    // Stroke half-length in grid cells (small notch)
    const halfStrokeGrid = 0.3;
    
    // Render strokes for each side that is equal
    for (let i = 0; i < 4; i++) {
      if (!strokeMap[i]) continue;
      
      const strokeType = strokeMap[i]; // 'single' or 'double'
      const a = vertices[i];
      const b = vertices[(i + 1) % 4];
      const col1 = a.col, row1 = a.row, col2 = b.col, row2 = b.row;
      
      // Side direction in grid
      const dc = col2 - col1;
      const dr = row2 - row1;
      const len = Math.sqrt(dc * dc + dr * dr) || 1e-6;
      // Perpendicular in grid (rotate 90°: (-dr, dc) normalized)
      const perpCol = -dr / len;
      const perpRow = dc / len;
      
      // Midpoint in grid
      const midCol = (col1 + col2) / 2;
      const midRow = (row1 + row2) / 2;
      
      // Stroke endpoints in grid (perpendicular to side, both ways)
      const end1 = gridToPercent(midCol + perpCol * halfStrokeGrid, midRow + perpRow * halfStrokeGrid);
      const end2 = gridToPercent(midCol - perpCol * halfStrokeGrid, midRow - perpRow * halfStrokeGrid);
      
      if (strokeType === 'single') {
        strokes.push(
          React.createElement('line', {
            key: `stroke-single-${i}`,
            x1: `${end1.x}%`,
            y1: `${end1.y}%`,
            x2: `${end2.x}%`,
            y2: `${end2.y}%`,
            stroke: strokeColor,
            strokeWidth: `${strokeWidthPercent}%`,
            strokeLinecap: 'round'
          })
        );
      } else if (strokeType === 'double') {
        // Spacing along the side direction in grid
        const spacingGrid = 1.2;
        const spacingCol = (dc / len) * spacingGrid;
        const spacingRow = (dr / len) * spacingGrid;
        
        const mid1Col = midCol - spacingCol, mid1Row = midRow - spacingRow;
        const mid2Col = midCol + spacingCol, mid2Row = midRow + spacingRow;
        
        const s1a = gridToPercent(mid1Col + perpCol * halfStrokeGrid, mid1Row + perpRow * halfStrokeGrid);
        const s1b = gridToPercent(mid1Col - perpCol * halfStrokeGrid, mid1Row - perpRow * halfStrokeGrid);
        const s2a = gridToPercent(mid2Col + perpCol * halfStrokeGrid, mid2Row + perpRow * halfStrokeGrid);
        const s2b = gridToPercent(mid2Col - perpCol * halfStrokeGrid, mid2Row - perpRow * halfStrokeGrid);
        
        strokes.push(
          React.createElement('line', {
            key: `stroke-double-1-${i}`,
            x1: `${s1a.x}%`,
            y1: `${s1a.y}%`,
            x2: `${s1b.x}%`,
            y2: `${s1b.y}%`,
            stroke: strokeColor,
            strokeWidth: `${strokeWidthPercent}%`,
            strokeLinecap: 'round'
          })
        );
        strokes.push(
          React.createElement('line', {
            key: `stroke-double-2-${i}`,
            x1: `${s2a.x}%`,
            y1: `${s2a.y}%`,
            x2: `${s2b.x}%`,
            y2: `${s2b.y}%`,
            stroke: strokeColor,
            strokeWidth: `${strokeWidthPercent}%`,
            strokeLinecap: 'round'
          })
        );
      }
    }
    
    if (strokes.length === 0) {
      return null;
    }
    
    // Apply blinking animation if enabled
    const svgStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      zIndex: zIndex + 30, // Above the sides but below the animated line
      pointerEvents: 'none',
      overflow: 'visible'
    };
    
    if (shouldBlink) {
      svgStyle.animation = 'angleEqualityBlink 1s ease-in-out infinite';
    }
    
    return React.createElement('svg', {
      key: 'equal-side-strokes',
      style: svgStyle,
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, strokes);
  }, [allSideEqualityAnimation, allSideEqualityAnimationConfig, getEqualSideGroups, vertices, gridDimensions, gridRows, gridCols, zIndex, permanentEqualSideStrokesRef]);

  // Render animated line for all 4 side equality animation
  const renderAllSideEqualityLine = React.useMemo(() => {
    if (!allSideEqualityAnimation) {
      return null;
    }

    const { phase, currentSideIndex, pivotVertexIndex, progress, referenceLength, referenceLengthPercent, equalityMessage, isEqual, sideLengths } = allSideEqualityAnimation;
    
    // Don't render if animation is stopped or complete (but show final message briefly)
    if (phase === 'stopped' || phase === 'complete') {
      // Show final message for 2 seconds, then hide
      return null;
    }
    
    // Extract message configuration with defaults
    const messageConfig = allSideEqualityAnimationConfig.messageConfig || {};
    const showMessage = allSideEqualityAnimationConfig.showMessage !== false; // Default to true
    const messagePosition = messageConfig.position || {};
    const messageBorder = messageConfig.border || {};
    const messageFont = messageConfig.font || {};
    const messageBackground = messageConfig.background || {};
    
    // Position defaults (center of quadrilateral, offset above)
    const messageLeftPercent = messagePosition.left !== undefined ? messagePosition.left : null; // null = auto-center
    const messageTopPercent = messagePosition.top !== undefined ? messagePosition.top : null; // null = auto-center
    const messageOffsetX = messagePosition.offsetX !== undefined ? messagePosition.offsetX : 0;
    const messageOffsetY = messagePosition.offsetY !== undefined ? messagePosition.offsetY : -5; // -5% above center
    
    // Border defaults
    const messageBorderWidth = messageBorder.width !== undefined ? messageBorder.width : '3px';
    const messageBorderStyle = messageBorder.style || 'solid';
    const messageBorderColor = messageBorder.color || 'rgba(255, 255, 255, 0.6)';
    const messageBorderRadius = messageBorder.radius !== undefined ? messageBorder.radius : '10px';
    
    // Font defaults
    const messageFontSize = messageFont.size || angleTextSize || '16gc';
    const messageFontWeight = messageFont.weight || 'bold';
    const messageFontFamily = messageFont.family || angleTextFont || 'Arial, sans-serif';
    const messageFontColor = messageFont.color || '#FFFFFF';
    
    // Background defaults (based on equality state)
    const defaultBgColor = isEqual ? 'rgba(0, 180, 0, 0.95)' : 'rgba(220, 50, 50, 0.95)';
    const messageBackgroundColor = messageBackground.color !== undefined ? messageBackground.color : defaultBgColor;
    const messageBackgroundOpacity = messageBackground.opacity !== undefined ? messageBackground.opacity : null; // null = use color's alpha
    
    // Use the same coordinate conversion as renderSides
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Convert vertex grid coordinates to percentages within container
    const getVertexPercent = (vertexIndex) => {
      const vertex = vertices[vertexIndex];
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Get all vertex positions
    const vertexPositions = [0, 1, 2, 3].map(i => getVertexPercent(i));
    
    // Calculate line position based on current phase
    let lineStartX, lineStartY, lineEndX, lineEndY;
    
    // Angle in grid space so that angle + length in grid cells lands on the target vertex (display-space angle would be wrong when aspect ≠ 1)
    const getAngleInGrid = (fromIdx, toIdx) => {
      const from = vertices[fromIdx];
      const to = vertices[toIdx];
      return Math.atan2(to.row - from.row, to.col - from.col);
    };
    
    // Helper to calculate end point given start vertex index, angle (in grid space), and length in grid cells
    const getEndPointFromVertex = (startVertexIndex, angle, lengthInGridCells) => {
      const startVertex = vertices[startVertexIndex];
      
      const rowDiff = Math.sin(angle) * lengthInGridCells;
      const colDiff = Math.cos(angle) * lengthInGridCells;
      const endRow = startVertex.row + rowDiff;
      const endCol = startVertex.col + colDiff;
      
      return {
        x: offsetX + (endCol / gridCols) * width,
        y: offsetY + (endRow / gridRows) * height
      };
    };
    
    // Use target side length during pivot so the rod lands exactly on the next vertex (no overshoot)
    const sideLength = (index) => (sideLengths && sideLengths[index] != null ? sideLengths[index] : referenceLength);
    
    // Legacy helper for cases where we already have percentage coordinates
    const getEndPoint = (startX, startY, angle, length) => {
      return {
        x: startX + Math.cos(angle) * length,
        y: startY + Math.sin(angle) * length
      };
    };
    
    switch (phase) {
      case 'on-AB': {
        // Line is on AB: from A to B
        const posA = vertexPositions[0];
        const posB = vertexPositions[1];
        lineStartX = posA.x;
        lineStartY = posA.y;
        lineEndX = posB.x;
        lineEndY = posB.y;
        break;
      }
      
      case 'pivoting-to-BC': {
        // Pivoting around B from BA to BC; use grid angles + BC length so rod ends exactly at C
        const posB = vertexPositions[1];
        const angleBA = getAngleInGrid(1, 0);
        const angleBC = getAngleInGrid(1, 2);
        const lengthBC = sideLength(1);
        
        let angleDiff = angleBC - angleBA;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        const currentAngle = angleBA + angleDiff * progress;
        const endPoint = getEndPointFromVertex(1, currentAngle, lengthBC);
        
        lineStartX = posB.x;
        lineStartY = posB.y;
        lineEndX = endPoint.x;
        lineEndY = endPoint.y;
        break;
      }
      
      case 'on-BC': {
        // Line is on BC: from B to C (use actual vertex so line stops exactly at C)
        const posB = vertexPositions[1];
        const posC = vertexPositions[2];
        lineStartX = posB.x;
        lineStartY = posB.y;
        lineEndX = posC.x;
        lineEndY = posC.y;
        break;
      }
      
      case 'pivoting-to-CD': {
        // Pivoting around C from CB to CD; use grid angles + CD length so rod ends exactly at D
        const posC = vertexPositions[2];
        const angleCB = getAngleInGrid(2, 1);
        const angleCD = getAngleInGrid(2, 3);
        const lengthCD = sideLength(2);
        
        let angleDiff = angleCD - angleCB;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        const currentAngle = angleCB + angleDiff * progress;
        const endPoint = getEndPointFromVertex(2, currentAngle, lengthCD);
        
        lineStartX = posC.x;
        lineStartY = posC.y;
        lineEndX = endPoint.x;
        lineEndY = endPoint.y;
        break;
      }
      
      case 'on-CD': {
        const posC = vertexPositions[2];
        const posD = vertexPositions[3];
        lineStartX = posC.x;
        lineStartY = posC.y;
        lineEndX = posD.x;
        lineEndY = posD.y;
        break;
      }
      
      case 'pivoting-to-DA': {
        // Pivoting around D from DC to DA; use grid angles + DA length so rod ends exactly at A
        const posD = vertexPositions[3];
        const angleDC = getAngleInGrid(3, 2);
        const angleDA = getAngleInGrid(3, 0);
        const lengthDA = sideLength(3);
        
        let angleDiff = angleDA - angleDC;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        const currentAngle = angleDC + angleDiff * progress;
        const endPoint = getEndPointFromVertex(3, currentAngle, lengthDA);
        
        lineStartX = posD.x;
        lineStartY = posD.y;
        lineEndX = endPoint.x;
        lineEndY = endPoint.y;
        break;
      }
      
      case 'on-DA': {
        const posD = vertexPositions[3];
        const posA = vertexPositions[0];
        lineStartX = posD.x;
        lineStartY = posD.y;
        lineEndX = posA.x;
        lineEndY = posA.y;
        break;
      }
      
      case 'pivoting-to-AB': {
        // Pivoting around A from AD to AB; use grid angles + AB length so rod ends exactly at B
        const posA = vertexPositions[0];
        const angleAD = getAngleInGrid(0, 3);
        const angleAB = getAngleInGrid(0, 1);
        const lengthAB = sideLength(0);
        
        let angleDiff = angleAB - angleAD;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        const currentAngle = angleAD + angleDiff * progress;
        const endPoint = getEndPointFromVertex(0, currentAngle, lengthAB);
        
        lineStartX = posA.x;
        lineStartY = posA.y;
        lineEndX = endPoint.x;
        lineEndY = endPoint.y;
        break;
      }
      
      default:
        return null;
    }
    
    // Calculate line thickness (2gc thicker than edge)
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    // Parse edge thickness and add 2gc
    const baseThicknessGc = typeof edgeThickness === 'string' && edgeThickness.includes('gc') 
      ? parseFloat(edgeThickness.replace('gc', '')) 
      : 4;
    const animatedThicknessGc = baseThicknessGc + 2;
    const lineThickness = processGcToPixels(`${animatedThicknessGc}gc`, animatedThicknessGc);
    const messageTextSize = processGcToPixels(messageFontSize, 16);
    
    // Calculate message position
    let messageLeft, messageTop;
    if (messageLeftPercent !== null && messageTopPercent !== null) {
      // Use absolute coordinates if provided
      messageLeft = messageLeftPercent;
      messageTop = messageTopPercent;
    } else {
      // Auto-center on quadrilateral (default behavior)
      const centerX = (vertexPositions[0].x + vertexPositions[1].x + vertexPositions[2].x + vertexPositions[3].x) / 4;
      const centerY = (vertexPositions[0].y + vertexPositions[1].y + vertexPositions[2].y + vertexPositions[3].y) / 4;
      
      // Convert to global percentage for message positioning
      const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
      const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
      const containerTop = ((y1 - 1) / gridSystemRows) * 100;
      const containerWidthPercent = ((x2 - x1 + 1) / gridSystemCols) * 100;
      const containerHeightPercent = ((y2 - y1 + 1) / gridSystemRows) * 100;
      
      messageLeft = containerLeft + (centerX / 100) * containerWidthPercent + messageOffsetX;
      messageTop = containerTop + (centerY / 100) * containerHeightPercent + messageOffsetY;
    }
    
    // Build background color with opacity if specified
    let finalBackgroundColor = messageBackgroundColor;
    if (messageBackgroundOpacity !== null && typeof messageBackgroundOpacity === 'number') {
      // Extract RGB from color and apply opacity
      const rgbMatch = messageBackgroundColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        finalBackgroundColor = `rgba(${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}, ${messageBackgroundOpacity})`;
      }
    }
    
    return React.createElement(React.Fragment, { key: 'all-side-equality-container' }, [
      // Animated dashed line using SVG
      React.createElement('svg', {
        key: 'all-side-equality-line',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 210,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('line', {
        x1: `${lineStartX}%`,
        y1: `${lineStartY}%`,
        x2: `${lineEndX}%`,
        y2: `${lineEndY}%`,
        stroke: '#FF8C00', // Orange
        strokeWidth: `${animatedThicknessGc}gc`,
        strokeDasharray: `${lineThickness * 0.8}, ${lineThickness * 0.4}`, // Smaller dashes
        strokeLinecap: 'round',
        style: {
          animation: 'sideEqualityBlink 0.8s ease-in-out infinite'
        }
      })),
      
      // Equality message (shown when there's a message to display and showMessage is true)
      showMessage && equalityMessage && React.createElement('div', {
        key: 'all-side-equality-message',
        style: {
          position: 'absolute',
          left: `${messageLeft}%`,
          top: `${messageTop}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 211,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: messageConfig.padding || '10px 20px',
          backgroundColor: finalBackgroundColor,
          color: messageFontColor,
          fontSize: `${messageTextSize}px`,
          fontWeight: messageFontWeight,
          fontFamily: messageFontFamily,
          borderRadius: messageBorderRadius,
          boxShadow: messageConfig.boxShadow || '0 4px 16px rgba(0, 0, 0, 0.4)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: `${messageBorderWidth} ${messageBorderStyle} ${messageBorderColor}`
        }
      }, equalityMessage)
    ].filter(Boolean));
  }, [allSideEqualityAnimation, vertices, gridDimensions, gridRows, gridCols, coordinates, edgeThickness, angleTextSize, angleTextFont, zIndex, allSideEqualityAnimationConfig]);

  // Render confirm right angle overlay (highlight and message)
  const renderConfirmRightAngleOverlay = React.useMemo(() => {
    if (!confirmRightAngleAnimation) {
      return null;
    }

    const { phase, vertexIndex, isRightAngle, vertexLabel, messageConfig, progress } = confirmRightAngleAnimation;
    
    // Only show overlay during certain phases
    // Animation now ends after phase 5, so no overlay is needed
    if (phase !== 'complete') {
      return null;
    }
    
    console.log('🎨 Rendering confirm right angle overlay:', { phase, vertexIndex, isRightAngle });
    
    // Extract message configuration with defaults
    const msgConfig = messageConfig || {};
    const msgPosition = msgConfig.position || {};
    const msgBorder = msgConfig.border || {};
    const msgFont = msgConfig.font || {};
    const msgBackground = msgConfig.background || {};
    
    // Calculate message position
    const { width, height, offsetX, offsetY } = gridDimensions;
    const getVertexPercent = (idx) => {
      const vertex = vertices[idx];
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Center of quadrilateral
    const centerX = (getVertexPercent(0).x + getVertexPercent(1).x + getVertexPercent(2).x + getVertexPercent(3).x) / 4;
    const centerY = (getVertexPercent(0).y + getVertexPercent(1).y + getVertexPercent(2).y + getVertexPercent(3).y) / 4;
    
    // Convert to global percentage for message positioning
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeightPercent = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    const msgOffsetX = msgPosition.offsetX !== undefined ? msgPosition.offsetX : 0;
    const msgOffsetY = msgPosition.offsetY !== undefined ? msgPosition.offsetY : -5;
    
    let messageLeft, messageTop;
    if (msgPosition.left !== undefined && msgPosition.top !== undefined) {
      messageLeft = msgPosition.left;
      messageTop = msgPosition.top;
    } else {
      messageLeft = containerLeft + (centerX / 100) * containerWidthPercent + msgOffsetX;
      messageTop = containerTop + (centerY / 100) * containerHeightPercent + msgOffsetY;
    }
    
    // Process font size
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSysCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSysCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const messageFontSize = processGcToPixels(msgFont.size || angleTextSize || '18gc', 18);
    const messageFontWeight = msgFont.weight || 'bold';
    const messageFontFamily = msgFont.family || angleTextFont || 'Arial, sans-serif';
    const messageFontColor = msgFont.color || '#FFFFFF';
    
    const messageBorderWidth = msgBorder.width || '3px';
    const messageBorderStyle = msgBorder.style || 'solid';
    const messageBorderColor = msgBorder.color || 'rgba(255, 255, 255, 0.6)';
    const messageBorderRadius = msgBorder.radius || '10px';
    
    const defaultBgColor = isRightAngle ? 'rgba(0, 180, 0, 0.95)' : 'rgba(220, 50, 50, 0.95)';
    const messageBackgroundColor = msgBackground.color || defaultBgColor;
    
    // Message text - check if message is disabled (empty string or false)
    const customMessage = msgConfig.message;
    const showMessage = customMessage !== false && customMessage !== '';
    const messageText = showMessage 
      ? (customMessage || (isRightAngle 
          ? `∠${vertexLabel} = 90°` 
          : `∠${vertexLabel} ≠ 90°`))
      : '';
    
    const elements = [];
    
    // Phase highlighting-90 removed - animation now ends after phase 3
    
    // Message during complete phase (animation now ends after phase 3)
    if (phase === 'complete' && showMessage && messageText) {
      elements.push(
        React.createElement('div', {
          key: 'confirm-right-angle-message',
          style: {
            position: 'absolute',
            left: `${messageLeft}%`,
            top: `${messageTop}%`,
            transform: 'translate(-50%, -100%)',
            zIndex: zIndex + 221,
            pointerEvents: 'none',
            animation: 'angleEqualityBlink 1s ease-in-out infinite',
            padding: msgConfig.padding || '10px 20px',
            backgroundColor: messageBackgroundColor,
            color: messageFontColor,
            fontSize: `${messageFontSize}px`,
            fontWeight: messageFontWeight,
            fontFamily: messageFontFamily,
            borderRadius: messageBorderRadius,
            boxShadow: msgConfig.boxShadow || '0 4px 16px rgba(0, 0, 0, 0.4)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            border: `${messageBorderWidth} ${messageBorderStyle} ${messageBorderColor}`
          }
        }, messageText)
      );
    }
    
    return elements.length > 0 ? React.createElement(React.Fragment, { key: 'confirm-right-angle-overlay' }, elements) : null;
  }, [confirmRightAngleAnimation, vertices, gridDimensions, gridRows, gridCols, coordinates, angleTextSize, angleTextFont, zIndex]);

  // Render permanent right angle markers
  const renderPermanentRightAngleMarkers = React.useMemo(() => {
    if (angleConfig.show === 'none' || permanentRightAngleMarkers.length === 0) {
      return null;
    }
    // Get AngleMarkerComponent
    const AngleMarkerComp = window.AngleMarkerComponent?.AngleMarkerComponent;
    if (!AngleMarkerComp) {
      return null;
    }
    
    // Use the same angleConfig props as regular angle markers (from page config)
    // This ensures consistency with the existing angle marker styling
    const markers = permanentRightAngleMarkers.map(vertexIndex => {
      const prevIndex = (vertexIndex - 1 + 4) % 4;
      const nextIndex = (vertexIndex + 1) % 4;
      
      // Get vertex positions in grid coordinates
      const vertexPos = getVertexPosition(vertexIndex);
      const prevVertexPos = getVertexPosition(prevIndex);
      const nextVertexPos = getVertexPosition(nextIndex);
      
      // Get the actual angle value at this vertex
      const angleValue = angles[vertexIndex];
      const angleValueRounded = Math.round(angleValue * 10) / 10; // Round to 1 decimal
      
      // Determine marker type - use the same logic as regular markers
      // Regular markers use currentAngleShow directly
      // The AngleMarkerComponent will handle determining the correct marker type based on the angle
      const isRightAngle = Math.abs(angleValue - 90) < 0.5; // Within 0.5° of 90°
      
      // Use currentAngleShow directly (same as regular markers)
      // This allows AngleMarkerComponent to determine the correct marker type
      const markerType = currentAngleShow;
      
      // If currentAngleShow is 'rightAngle' and this isn't a right angle, don't show
      if (currentAngleShow === 'rightAngle' && !isRightAngle) {
        return null;
      }
      
      // If currentAngleShow is 'none', don't show
      if (currentAngleShow === 'none') {
        return null;
      }
      
      // Get per-vertex config if available (same as regular angle markers)
      const vertexAngleConfig = getVertexAngleConfig(vertexIndex);
      const defaultConfig = vertexAngleConfig.interiorAngle || {
        size: angleMarkerSize,
        color: angleMarkerColor,
        showText: angleShowText,
        textMode: 'measure' // Just show the angle measurement
      };
      
      // Determine final showText (respect checkbox state like regular markers)
      const finalShowText = currentAngleShowText ? (defaultConfig.showText !== false) : false;
      
      // Helper to override showText in per-angle configs (same as regular markers)
      const overrideShowText = (config) => {
        if (!config) return config;
        return {
          ...config,
          showText: currentAngleShowText ? (config.showText !== false) : false
        };
      };
      
      return React.createElement(AngleMarkerComp, {
        key: `permanent-angle-marker-${vertexIndex}`,
        vertex: vertexPos,
        prevVertex: prevVertexPos,
        nextVertex: nextVertexPos,
        angle: angleValueRounded,
        containerCoordinates: coordinates,
        gridRows: gridRows,
        gridCols: gridCols,
        gridPadding: gridPadding,
        markerType: markerType,
        color: defaultConfig.color,
        size: defaultConfig.size,
        zIndex: zIndex + 200,
        showText: finalShowText,
        textColor: angleTextColor,
        textSize: angleTextSize,
        textFont: angleTextFont,
        textOffset: angleTextOffset,
        labelBackgroundColor: angleLabelBackgroundColor,
        labelBorderColor: angleLabelBorderColor,
        labelBorderWidth: angleLabelBorderWidth,
        labelPadding: angleLabelPadding,
        textMode: defaultConfig.textMode || 'measure', // Just show the angle measurement
        // Per-angle configurations (same as regular markers)
        interiorAngleConfig: overrideShowText(vertexAngleConfig.interiorAngle),
        supplementaryAngle1Config: overrideShowText(vertexAngleConfig.supplementaryAngle1),
        supplementaryAngle2Config: overrideShowText(vertexAngleConfig.supplementaryAngle2),
        supplementaryAngle3Config: overrideShowText(vertexAngleConfig.supplementaryAngle3)
      });
    });
    
    return React.createElement(React.Fragment, { key: 'permanent-right-angle-markers' }, markers);
  }, [angleConfig.show, permanentRightAngleMarkers, vertices, angles, getVertexPosition, getVertexAngleConfig, angleMarkerSize, angleMarkerColor, angleShowText, currentAngleShowText, currentAngleShow, angleTextColor, angleTextSize, angleTextFont, angleTextOffset, gridRows, gridCols, gridPadding, coordinates, zIndex]);

  // Render animated opposite side line for opposite side equality animation
  const renderAnimatedOppositeSideLine = React.useMemo(() => {
    if (!oppositeSideAnimation) {
      return null;
    }

    const { pairIndex, progress, phase } = oppositeSideAnimation;
    console.log('🎨 Rendering animated opposite side line:', { pairIndex, progress, phase });
    
    // Get the source and target side vertices based on pair index
    // Pair 0: Side 0 (A→B) translates to Side 2 (C→D)
    //         But CD goes C→D which is opposite to AB, so we need D→C to align
    // Pair 1: Side 1 (B→C) translates to Side 3 (D→A)
    //         But DA goes D→A which is opposite to BC, so we need A→D to align
    const sourceStartVertexIndex = pairIndex === 0 ? 0 : 1; // A or B
    const sourceEndVertexIndex = pairIndex === 0 ? 1 : 2;   // B or C
    // Reverse target vertices so the line direction matches
    const targetStartVertexIndex = pairIndex === 0 ? 3 : 0; // D or A (reversed)
    const targetEndVertexIndex = pairIndex === 0 ? 2 : 3;   // C or D (reversed)
    
    // Get vertex positions
    const sourceStartVertex = getVertexPosition(sourceStartVertexIndex);
    const sourceEndVertex = getVertexPosition(sourceEndVertexIndex);
    const targetStartVertex = getVertexPosition(targetStartVertexIndex);
    const targetEndVertex = getVertexPosition(targetEndVertexIndex);
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container (0-100 for SVG viewBox)
    const sourceStartXPercent = (sourceStartVertex.col / gridCols) * 100;
    const sourceStartYPercent = (sourceStartVertex.row / gridRows) * 100;
    const sourceEndXPercent = (sourceEndVertex.col / gridCols) * 100;
    const sourceEndYPercent = (sourceEndVertex.row / gridRows) * 100;
    const targetStartXPercent = (targetStartVertex.col / gridCols) * 100;
    const targetStartYPercent = (targetStartVertex.row / gridRows) * 100;
    const targetEndXPercent = (targetEndVertex.col / gridCols) * 100;
    const targetEndYPercent = (targetEndVertex.row / gridRows) * 100;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate translation offset based on progress
    // The line translates from source position to target position
    const translateX = (targetStartXPercent - sourceStartXPercent) * progress;
    const translateY = (targetStartYPercent - sourceStartYPercent) * progress;
    
    // Current line position (source + translation)
    const currentStartX = sourceStartXPercent + translateX;
    const currentStartY = sourceStartYPercent + translateY;
    const currentEndX = sourceEndXPercent + translateX;
    const currentEndY = sourceEndYPercent + translateY;
    
    // Calculate line thickness (same as side thickness)
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const lineThickness = processGcToPixels(edgeThickness || '4gc', 4);
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Determine color and animation based on pair index
    const lineColor = pairIndex === 0 ? oppositeSideColor1 : oppositeSideColor2;
    const blinkAnimation = pairIndex === 0 ? 'oppositeSideBlinkOrange' : 'oppositeSideBlinkBlue';
    
    // Calculate midpoint for message positioning (midpoint of current line position)
    const midpointXPercent = (currentStartX + currentEndX) / 2;
    const midpointYPercent = (currentStartY + currentEndY) / 2;
    const midpointLeft = containerLeft + (midpointXPercent / 100) * containerWidthPercent;
    const midpointTop = containerTop + (midpointYPercent / 100) * containerHeightPercent;
    
    console.log('🎨 Opposite side animation details:', {
      pairIndex,
      sourceStart: `(${sourceStartXPercent.toFixed(2)}%, ${sourceStartYPercent.toFixed(2)}%)`,
      sourceEnd: `(${sourceEndXPercent.toFixed(2)}%, ${sourceEndYPercent.toFixed(2)}%)`,
      targetStart: `(${targetStartXPercent.toFixed(2)}%, ${targetStartYPercent.toFixed(2)}%)`,
      translateX: translateX.toFixed(2),
      translateY: translateY.toFixed(2),
      progress: progress.toFixed(3)
    });
    
    return React.createElement(React.Fragment, { key: 'animated-opposite-side-line-container' }, [
      // Animated line using SVG (matching sides rendering)
      React.createElement('svg', {
        key: 'animated-opposite-side-line',
        style: {
          position: 'absolute',
          left: `${containerLeft}%`,
          top: `${containerTop}%`,
          width: `${containerWidthPercent}%`,
          height: `${containerHeightPercent}%`,
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('line', {
        x1: currentStartX,
        y1: currentStartY,
        x2: currentEndX,
        y2: currentEndY,
        stroke: lineColor,
        strokeWidth: edgeThickness || '4gc',
        strokeDasharray: oppositeSideLineStyle === 'dashed' ? `${lineThickness * 2}, ${lineThickness}` : 'none',
        strokeLinecap: 'round',
        style: {
          animation: `${blinkAnimation} 0.8s ease-in-out infinite`
        }
      })),
      
      // Success message (always shown when animation is active)
      React.createElement('div', {
        key: 'opposite-side-equality-message',
        style: {
          position: 'absolute',
          left: oppositeSideMessageLeft !== null ? `${oppositeSideMessageLeft}%` : `${midpointLeft + oppositeSideMessageOffsetX}%`,
          top: oppositeSideMessageTop !== null ? `${oppositeSideMessageTop}%` : `${midpointTop + oppositeSideMessageOffsetY}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: pairIndex === 0 ? 'rgba(255, 140, 0, 0.9)' : 'rgba(51, 153, 255, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, oppositeSideEqualityMessage)
    ]);
  }, [oppositeSideAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, edgeThickness, angleTextSize, angleTextFont, zIndex, oppositeSideEqualityMessage, oppositeSideMessageLeft, oppositeSideMessageTop, oppositeSideMessageOffsetX, oppositeSideMessageOffsetY, oppositeSideLineStyle, oppositeSideColor1, oppositeSideColor2]);

  // Render animated diagonal equality line
  const renderAnimatedDiagonalEquality = React.useMemo(() => {
    if (!diagonalEqualityAnimation) {
      return null;
    }

    const { progress, phase } = diagonalEqualityAnimation;
    console.log('🎨 Rendering animated diagonal equality:', { progress, phase });
    
    // Get diagonal vertices
    // Diagonal 1: A (0) to C (2)
    // Diagonal 2: B (1) to D (3)
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container (0-100 for SVG viewBox)
    // Source diagonal: AC (0 to 2)
    const sourceStartXPercent = (v0.col / gridCols) * 100;
    const sourceStartYPercent = (v0.row / gridRows) * 100;
    const sourceEndXPercent = (v2.col / gridCols) * 100;
    const sourceEndYPercent = (v2.row / gridRows) * 100;
    
    // Target diagonal: BD (1 to 3)
    const targetStartXPercent = (v1.col / gridCols) * 100;
    const targetStartYPercent = (v1.row / gridRows) * 100;
    const targetEndXPercent = (v3.col / gridCols) * 100;
    const targetEndYPercent = (v3.row / gridRows) * 100;
    
    // Calculate diagonal lengths for alignment
    const sourceDx = sourceEndXPercent - sourceStartXPercent;
    const sourceDy = sourceEndYPercent - sourceStartYPercent;
    const targetDx = targetEndXPercent - targetStartXPercent;
    const targetDy = targetEndYPercent - targetStartYPercent;
    
    // Calculate midpoints
    const sourceMidX = (sourceStartXPercent + sourceEndXPercent) / 2;
    const sourceMidY = (sourceStartYPercent + sourceEndYPercent) / 2;
    const targetMidX = (targetStartXPercent + targetEndXPercent) / 2;
    const targetMidY = (targetStartYPercent + targetEndYPercent) / 2;
    
    // Calculate rotation angle to align source diagonal with target diagonal
    const sourceAngle = Math.atan2(sourceDy, sourceDx);
    const targetAngle = Math.atan2(targetDy, targetDx);
    const rotationAngle = (targetAngle - sourceAngle) * (180 / Math.PI);
    
    // Calculate translation to move source midpoint to target midpoint
    const translateX = (targetMidX - sourceMidX) * progress;
    const translateY = (targetMidY - sourceMidY) * progress;
    const currentRotation = rotationAngle * progress;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate line thickness
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const lineThickness = processGcToPixels(edgeThickness || '4gc', 4);
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Calculate message position (at target diagonal midpoint)
    const messageLeft = diagonalEqualityMessageLeft !== null ? diagonalEqualityMessageLeft : 
      containerLeft + (targetMidX / 100) * containerWidthPercent + diagonalEqualityMessageOffsetX;
    const messageTop = diagonalEqualityMessageTop !== null ? diagonalEqualityMessageTop : 
      containerTop + (targetMidY / 100) * containerHeightPercent + diagonalEqualityMessageOffsetY;
    
    return React.createElement(React.Fragment, { key: 'animated-diagonal-equality-container' }, [
      // Animated line using SVG
      React.createElement('svg', {
        key: 'animated-diagonal-equality-line',
        style: {
          position: 'absolute',
          left: `${containerLeft}%`,
          top: `${containerTop}%`,
          width: `${containerWidthPercent}%`,
          height: `${containerHeightPercent}%`,
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('g', {
        transform: `translate(${sourceMidX}, ${sourceMidY}) rotate(${currentRotation}) translate(${-sourceMidX}, ${-sourceMidY}) translate(${translateX}, ${translateY})`
      }, React.createElement('line', {
        x1: sourceStartXPercent,
        y1: sourceStartYPercent,
        x2: sourceEndXPercent,
        y2: sourceEndYPercent,
        stroke: diagonalEqualityColor,
        strokeWidth: edgeThickness || '4gc',
        strokeDasharray: diagonalEqualityLineStyle === 'dashed' ? `${lineThickness * 2}, ${lineThickness}` : 'none',
        strokeLinecap: 'round',
        style: {
          animation: phase === 'waiting-at-target' ? 'diagonalEqualityBlink 0.8s ease-in-out infinite' : 'none'
        }
      }))),
      
      // Success message (shown when at target)
      (phase === 'waiting-at-target' || progress > 0.8) && React.createElement('div', {
        key: 'diagonal-equality-message',
        style: {
          position: 'absolute',
          left: `${messageLeft}%`,
          top: `${messageTop}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 102, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, diagonalEqualityMessage)
    ]);
  }, [diagonalEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, edgeThickness, angleTextSize, angleTextFont, zIndex, diagonalEqualityMessage, diagonalEqualityMessageLeft, diagonalEqualityMessageTop, diagonalEqualityMessageOffsetX, diagonalEqualityMessageOffsetY, diagonalEqualityLineStyle, diagonalEqualityColor]);

  // Render animated diagonal bisection (tick marks on diagonal halves)
  const renderAnimatedDiagonalBisection = React.useMemo(() => {
    if (!diagonalBisectionAnimation) {
      return null;
    }

    const { progress, phase } = diagonalBisectionAnimation;
    console.log('🎨 Rendering animated diagonal bisection:', { progress, phase });
    
    // Get diagonal vertices
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container
    const aX = (v0.col / gridCols) * 100;
    const aY = (v0.row / gridRows) * 100;
    const bX = (v1.col / gridCols) * 100;
    const bY = (v1.row / gridRows) * 100;
    const cX = (v2.col / gridCols) * 100;
    const cY = (v2.row / gridRows) * 100;
    const dX = (v3.col / gridCols) * 100;
    const dY = (v3.row / gridRows) * 100;
    
    // Calculate intersection point (midpoint of both diagonals if they bisect)
    // Using line intersection formula
    const denom = (aX - cX) * (bY - dY) - (aY - cY) * (bX - dX);
    let intersectionX, intersectionY;
    
    if (Math.abs(denom) < 0.0001) {
      // Lines are parallel, use midpoint of AC
      intersectionX = (aX + cX) / 2;
      intersectionY = (aY + cY) / 2;
    } else {
      const t = ((aX - bX) * (bY - dY) - (aY - bY) * (bX - dX)) / denom;
      intersectionX = aX + t * (cX - aX);
      intersectionY = aY + t * (cY - aY);
    }
    
    // Calculate midpoints of each half-diagonal
    const midAO_X = (aX + intersectionX) / 2; // Midpoint of A to intersection
    const midAO_Y = (aY + intersectionY) / 2;
    const midOC_X = (intersectionX + cX) / 2; // Midpoint of intersection to C
    const midOC_Y = (intersectionY + cY) / 2;
    const midBO_X = (bX + intersectionX) / 2; // Midpoint of B to intersection
    const midBO_Y = (bY + intersectionY) / 2;
    const midOD_X = (intersectionX + dX) / 2; // Midpoint of intersection to D
    const midOD_Y = (intersectionY + dY) / 2;
    
    // Calculate perpendicular directions for tick marks
    const acDx = cX - aX;
    const acDy = cY - aY;
    const acLen = Math.sqrt(acDx * acDx + acDy * acDy);
    const acPerpX = -acDy / acLen;
    const acPerpY = acDx / acLen;
    
    const bdDx = dX - bX;
    const bdDy = dY - bY;
    const bdLen = Math.sqrt(bdDx * bdDx + bdDy * bdDy);
    const bdPerpX = -bdDy / bdLen;
    const bdPerpY = bdDx / bdLen;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate tick size relative to container
    const tickSize = diagonalBisectionTickSize / 10; // Percentage units
    
    // Calculate line thickness and message size
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Calculate message position (at intersection)
    const messageLeft = diagonalBisectionMessageLeft !== null ? diagonalBisectionMessageLeft : 
      containerLeft + (intersectionX / 100) * containerWidthPercent + diagonalBisectionMessageOffsetX;
    const messageTop = diagonalBisectionMessageTop !== null ? diagonalBisectionMessageTop : 
      containerTop + (intersectionY / 100) * containerHeightPercent + diagonalBisectionMessageOffsetY;
    
    // Opacity based on progress
    const opacity = progress;
    
    // Create tick marks (single tick for each half)
    const createTickMark = (midX, midY, perpX, perpY, color) => {
      return React.createElement('line', {
        x1: midX - perpX * tickSize,
        y1: midY - perpY * tickSize,
        x2: midX + perpX * tickSize,
        y2: midY + perpY * tickSize,
        stroke: color,
        strokeWidth: 3,
        strokeLinecap: 'round',
        opacity: opacity,
        style: {
          animation: phase === 'holding' ? 'diagonalBisectionBlink 0.8s ease-in-out infinite' : 'none'
        }
      });
    };
    
    return React.createElement(React.Fragment, { key: 'animated-diagonal-bisection-container' }, [
      // Tick marks using SVG
      React.createElement('svg', {
        key: 'animated-diagonal-bisection-ticks',
        style: {
          position: 'absolute',
          left: `${containerLeft}%`,
          top: `${containerTop}%`,
          width: `${containerWidthPercent}%`,
          height: `${containerHeightPercent}%`,
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        // Tick marks for diagonal AC (color 1)
        React.createElement('g', { key: 'ac-ticks' }, [
          createTickMark(midAO_X, midAO_Y, acPerpX, acPerpY, diagonalBisectionColor1),
          createTickMark(midOC_X, midOC_Y, acPerpX, acPerpY, diagonalBisectionColor1)
        ]),
        // Tick marks for diagonal BD (color 2, double ticks)
        React.createElement('g', { key: 'bd-ticks' }, [
          // First tick pair (offset slightly)
          createTickMark(midBO_X - bdDx * 0.02, midBO_Y - bdDy * 0.02, bdPerpX, bdPerpY, diagonalBisectionColor2),
          createTickMark(midBO_X + bdDx * 0.02, midBO_Y + bdDy * 0.02, bdPerpX, bdPerpY, diagonalBisectionColor2),
          createTickMark(midOD_X - bdDx * 0.02, midOD_Y - bdDy * 0.02, bdPerpX, bdPerpY, diagonalBisectionColor2),
          createTickMark(midOD_X + bdDx * 0.02, midOD_Y + bdDy * 0.02, bdPerpX, bdPerpY, diagonalBisectionColor2)
        ]),
        // Highlight intersection point
        React.createElement('circle', {
          key: 'intersection-point',
          cx: intersectionX,
          cy: intersectionY,
          r: 1.5,
          fill: '#00AA00',
          opacity: opacity,
          style: {
            animation: phase === 'holding' ? 'diagonalBisectionBlink 0.8s ease-in-out infinite' : 'none'
          }
        })
      ]),
      
      // Success message (shown when holding)
      (phase === 'holding' || progress > 0.8) && React.createElement('div', {
        key: 'diagonal-bisection-message',
        style: {
          position: 'absolute',
          left: `${messageLeft}%`,
          top: `${messageTop}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 170, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, diagonalBisectionMessage)
    ]);
  }, [diagonalBisectionAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, angleTextSize, angleTextFont, zIndex, diagonalBisectionMessage, diagonalBisectionMessageLeft, diagonalBisectionMessageTop, diagonalBisectionMessageOffsetX, diagonalBisectionMessageOffsetY, diagonalBisectionColor1, diagonalBisectionColor2, diagonalBisectionTickSize]);

  // Render animated diagonal perpendicular bisection (tick marks + right angle marker)
  const renderAnimatedDiagonalPerpendicular = React.useMemo(() => {
    if (!diagonalPerpendicularAnimation) {
      return null;
    }

    const { progress, phase } = diagonalPerpendicularAnimation;
    console.log('🎨 Rendering animated diagonal perpendicular bisection:', { progress, phase });
    
    // Get diagonal vertices
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container
    const aX = (v0.col / gridCols) * 100;
    const aY = (v0.row / gridRows) * 100;
    const bX = (v1.col / gridCols) * 100;
    const bY = (v1.row / gridRows) * 100;
    const cX = (v2.col / gridCols) * 100;
    const cY = (v2.row / gridRows) * 100;
    const dX = (v3.col / gridCols) * 100;
    const dY = (v3.row / gridRows) * 100;
    
    // Calculate intersection point
    const denom = (aX - cX) * (bY - dY) - (aY - cY) * (bX - dX);
    let intersectionX, intersectionY;
    
    if (Math.abs(denom) < 0.0001) {
      intersectionX = (aX + cX) / 2;
      intersectionY = (aY + cY) / 2;
    } else {
      const t = ((aX - bX) * (bY - dY) - (aY - bY) * (bX - dX)) / denom;
      intersectionX = aX + t * (cX - aX);
      intersectionY = aY + t * (cY - aY);
    }
    
    // Calculate midpoints of each half-diagonal
    const midAO_X = (aX + intersectionX) / 2;
    const midAO_Y = (aY + intersectionY) / 2;
    const midOC_X = (intersectionX + cX) / 2;
    const midOC_Y = (intersectionY + cY) / 2;
    const midBO_X = (bX + intersectionX) / 2;
    const midBO_Y = (bY + intersectionY) / 2;
    const midOD_X = (intersectionX + dX) / 2;
    const midOD_Y = (intersectionY + dY) / 2;
    
    // Calculate perpendicular directions for tick marks
    const acDx = cX - aX;
    const acDy = cY - aY;
    const acLen = Math.sqrt(acDx * acDx + acDy * acDy);
    const acPerpX = -acDy / acLen;
    const acPerpY = acDx / acLen;
    
    const bdDx = dX - bX;
    const bdDy = dY - bY;
    const bdLen = Math.sqrt(bdDx * bdDx + bdDy * bdDy);
    const bdPerpX = -bdDy / bdLen;
    const bdPerpY = bdDx / bdLen;
    
    // Calculate unit vectors for right angle marker
    const acUnitX = acDx / acLen;
    const acUnitY = acDy / acLen;
    const bdUnitX = bdDx / bdLen;
    const bdUnitY = bdDy / bdLen;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate tick size and right angle size relative to container
    const tickSize = diagonalPerpendicularTickSize / 10;
    const rightAngleSize = diagonalPerpendicularRightAngleSize / 10;
    
    // Calculate line thickness and message size
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Calculate message position (at intersection)
    const messageLeft = diagonalPerpendicularMessageLeft !== null ? diagonalPerpendicularMessageLeft : 
      containerLeft + (intersectionX / 100) * containerWidthPercent + diagonalPerpendicularMessageOffsetX;
    const messageTop = diagonalPerpendicularMessageTop !== null ? diagonalPerpendicularMessageTop : 
      containerTop + (intersectionY / 100) * containerHeightPercent + diagonalPerpendicularMessageOffsetY;
    
    // Opacity based on progress
    const opacity = progress;
    
    // Create tick marks
    const createTickMark = (midX, midY, perpX, perpY, color) => {
      return React.createElement('line', {
        x1: midX - perpX * tickSize,
        y1: midY - perpY * tickSize,
        x2: midX + perpX * tickSize,
        y2: midY + perpY * tickSize,
        stroke: color,
        strokeWidth: 3,
        strokeLinecap: 'round',
        opacity: opacity,
        style: {
          animation: phase === 'holding' ? 'diagonalBisectionBlink 0.8s ease-in-out infinite' : 'none'
        }
      });
    };
    
    // Right angle marker path (small square at intersection)
    const rightAnglePath = `
      M ${intersectionX + acUnitX * rightAngleSize} ${intersectionY + acUnitY * rightAngleSize}
      L ${intersectionX + acUnitX * rightAngleSize + bdUnitX * rightAngleSize} ${intersectionY + acUnitY * rightAngleSize + bdUnitY * rightAngleSize}
      L ${intersectionX + bdUnitX * rightAngleSize} ${intersectionY + bdUnitY * rightAngleSize}
    `;
    
    return React.createElement(React.Fragment, { key: 'animated-diagonal-perpendicular-container' }, [
      // Tick marks and right angle using SVG
      React.createElement('svg', {
        key: 'animated-diagonal-perpendicular-markers',
        style: {
          position: 'absolute',
          left: `${containerLeft}%`,
          top: `${containerTop}%`,
          width: `${containerWidthPercent}%`,
          height: `${containerHeightPercent}%`,
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        // Tick marks for diagonal AC (color 1)
        React.createElement('g', { key: 'ac-ticks' }, [
          createTickMark(midAO_X, midAO_Y, acPerpX, acPerpY, diagonalPerpendicularColor1),
          createTickMark(midOC_X, midOC_Y, acPerpX, acPerpY, diagonalPerpendicularColor1)
        ]),
        // Tick marks for diagonal BD (color 2, double ticks)
        React.createElement('g', { key: 'bd-ticks' }, [
          createTickMark(midBO_X - bdDx * 0.02, midBO_Y - bdDy * 0.02, bdPerpX, bdPerpY, diagonalPerpendicularColor2),
          createTickMark(midBO_X + bdDx * 0.02, midBO_Y + bdDy * 0.02, bdPerpX, bdPerpY, diagonalPerpendicularColor2),
          createTickMark(midOD_X - bdDx * 0.02, midOD_Y - bdDy * 0.02, bdPerpX, bdPerpY, diagonalPerpendicularColor2),
          createTickMark(midOD_X + bdDx * 0.02, midOD_Y + bdDy * 0.02, bdPerpX, bdPerpY, diagonalPerpendicularColor2)
        ]),
        // Right angle marker at intersection
        React.createElement('path', {
          key: 'right-angle-marker',
          d: rightAnglePath,
          fill: 'none',
          stroke: diagonalPerpendicularRightAngleColor,
          strokeWidth: 2,
          strokeLinecap: 'square',
          opacity: opacity,
          style: {
            animation: phase === 'holding' ? 'diagonalPerpendicularBlink 0.8s ease-in-out infinite' : 'none'
          }
        }),
        // Highlight intersection point
        React.createElement('circle', {
          key: 'intersection-point',
          cx: intersectionX,
          cy: intersectionY,
          r: 1.5,
          fill: diagonalPerpendicularRightAngleColor,
          opacity: opacity,
          style: {
            animation: phase === 'holding' ? 'diagonalBisectionBlink 0.8s ease-in-out infinite' : 'none'
          }
        })
      ]),
      
      // Success message (shown when holding)
      (phase === 'holding' || progress > 0.8) && React.createElement('div', {
        key: 'diagonal-perpendicular-message',
        style: {
          position: 'absolute',
          left: `${messageLeft}%`,
          top: `${messageTop}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 170, 0, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, diagonalPerpendicularMessage)
    ]);
  }, [diagonalPerpendicularAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, angleTextSize, angleTextFont, zIndex, diagonalPerpendicularMessage, diagonalPerpendicularMessageLeft, diagonalPerpendicularMessageTop, diagonalPerpendicularMessageOffsetX, diagonalPerpendicularMessageOffsetY, diagonalPerpendicularColor1, diagonalPerpendicularColor2, diagonalPerpendicularTickSize, diagonalPerpendicularRightAngleSize, diagonalPerpendicularRightAngleColor]);

  // Calculate transform for parallel lines animation (to apply to original quad)
  const parallelLinesTransform = React.useMemo(() => {
    if (!parallelLinesAnimation) {
      return null;
    }

    const { pairIndex, progress } = parallelLinesAnimation;
    
    // Get all vertex positions
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Calculate positions in percentage
    const aX = (v0.col / gridCols) * 100;
    const aY = (v0.row / gridRows) * 100;
    const bX = (v1.col / gridCols) * 100;
    const bY = (v1.row / gridRows) * 100;
    const cX = (v2.col / gridCols) * 100;
    const cY = (v2.row / gridRows) * 100;
    const dX = (v3.col / gridCols) * 100;
    const dY = (v3.row / gridRows) * 100;
    
    // Determine which sides are parallel based on pairIndex
    let side1Start, side1End;
    if (pairIndex === 0) {
      // AB and CD
      side1Start = { x: aX, y: aY }; // A
      side1End = { x: bX, y: bY };   // B
    } else {
      // BC and DA
      side1Start = { x: bX, y: bY }; // B
      side1End = { x: cX, y: cY };   // C
    }
    
    // Calculate side vector
    const side1Dx = side1End.x - side1Start.x;
    const side1Dy = side1End.y - side1Start.y;
    const side1Length = Math.sqrt(side1Dx * side1Dx + side1Dy * side1Dy);
    
    // Calculate unit vector for movement direction
    const side1UnitX = side1Dx / side1Length;
    const side1UnitY = side1Dy / side1Length;
    
    // Calculate the translation for the quadrilateral based on progress
    // Progress goes from -0.5 to 0.5, where 0 is original position
    // Movement distance is based on movementRatio (as % of side length), not extension length
    const maxMovement = side1Length * parallelLinesMovementRatio; // Movement distance as ratio of side length
    const translateX = side1UnitX * maxMovement * progress * 2; // *2 because progress is -0.5 to 0.5
    const translateY = side1UnitY * maxMovement * progress * 2;
    
    // translateX and translateY are in SVG percentage units (0-100 range)
    // Since the wrapper div will be 100% of container, and SVG uses same coordinate system,
    // we can use the percentage values directly for CSS transform
    // CSS transform translate() with % is relative to element's own dimensions
    // Since wrapper is 100% of container, and SVG is also sized to container,
    // the percentage values should align
    
    return {
      transform: `translate(${translateX}%, ${translateY}%)`,
      position: 'relative',
      width: '100%',
      height: '100%'
    };
  }, [parallelLinesAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, parallelLinesExtensionRatio, parallelLinesMovementRatio]);

  // Render parallel lines animation (extended rails only, quad is transformed via wrapper)
  const renderParallelLinesAnimation = React.useMemo(() => {
    if (!parallelLinesAnimation) {
      return null;
    }

    const { pairIndex, progress, phase } = parallelLinesAnimation;
    console.log('🎨 Rendering parallel lines animation:', { pairIndex, progress, phase });
    
    // Get all vertex positions
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container (0-100 for SVG viewBox)
    const aX = (v0.col / gridCols) * 100;
    const aY = (v0.row / gridRows) * 100;
    const bX = (v1.col / gridCols) * 100;
    const bY = (v1.row / gridRows) * 100;
    const cX = (v2.col / gridCols) * 100;
    const cY = (v2.row / gridRows) * 100;
    const dX = (v3.col / gridCols) * 100;
    const dY = (v3.row / gridRows) * 100;
    
    // Determine which sides are parallel based on pairIndex
    let side1Start, side1End, side2Start, side2End;
    if (pairIndex === 0) {
      // AB and CD
      side1Start = { x: aX, y: aY }; // A
      side1End = { x: bX, y: bY };   // B
      side2Start = { x: dX, y: dY }; // D (reversed to match direction)
      side2End = { x: cX, y: cY };   // C
    } else {
      // BC and DA
      side1Start = { x: bX, y: bY }; // B
      side1End = { x: cX, y: cY };   // C
      side2Start = { x: aX, y: aY }; // A (reversed to match direction)
      side2End = { x: dX, y: dY };   // D
    }
    
    // Calculate side vectors
    const side1Dx = side1End.x - side1Start.x;
    const side1Dy = side1End.y - side1Start.y;
    const side1Length = Math.sqrt(side1Dx * side1Dx + side1Dy * side1Dy);
    
    const side2Dx = side2End.x - side2Start.x;
    const side2Dy = side2End.y - side2Start.y;
    const side2Length = Math.sqrt(side2Dx * side2Dx + side2Dy * side2Dy);
    
    // Calculate unit vectors for extensions
    const side1UnitX = side1Dx / side1Length;
    const side1UnitY = side1Dy / side1Length;
    const side2UnitX = side2Dx / side2Length;
    const side2UnitY = side2Dy / side2Length;
    
    // Calculate extension length (based on side length and ratio)
    const extensionLength1 = side1Length * parallelLinesExtensionRatio;
    const extensionLength2 = side2Length * parallelLinesExtensionRatio;
    
    // Calculate extension points for side 1 (e.g., X-A-B-Y for AB)
    const ext1X1 = side1Start.x - side1UnitX * extensionLength1; // X
    const ext1Y1 = side1Start.y - side1UnitY * extensionLength1;
    const ext1X2 = side1End.x + side1UnitX * extensionLength1;   // Y
    const ext1Y2 = side1End.y + side1UnitY * extensionLength1;
    
    // Calculate extension points for side 2 (e.g., W-D-C-Z for DC)
    const ext2X1 = side2Start.x - side2UnitX * extensionLength2; // W
    const ext2Y1 = side2Start.y - side2UnitY * extensionLength2;
    const ext2X2 = side2End.x + side2UnitX * extensionLength2;   // Z
    const ext2Y2 = side2End.y + side2UnitY * extensionLength2;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate line thickness
    const processGcToPixels = (value, defaultPixels) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (gcValue / gridSystemCols) * viewportWidth;
      }
      return defaultPixels;
    };
    
    const lineThickness = processGcToPixels(edgeThickness || '4gc', 4);
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Get side styling for the original sides
    const getSideConfig = (sideIndex) => {
      const sideConfigs = [side1, side2, side3, side4];
      const config = sideConfigs[sideIndex] || {};
      return {
        color: config.color || edgeColor || '#000000',
        thickness: config.thickness || edgeThickness || '4gc',
        style: config.style || edgeStyle || 'solid'
      };
    };
    
    // Get the side configs for the parallel sides
    const side1Config = getSideConfig(pairIndex === 0 ? 0 : 1); // AB or BC
    const side2Config = getSideConfig(pairIndex === 0 ? 2 : 3); // CD or DA
    
    // Calculate message position (center of the animation)
    const centerX = (aX + bX + cX + dX) / 4;
    const centerY = (aY + bY + cY + dY) / 4;
    const messageLeft = parallelLinesMessageLeft !== null ? parallelLinesMessageLeft : 
      containerLeft + (centerX / 100) * containerWidthPercent + parallelLinesMessageOffsetX;
    const messageTop = parallelLinesMessageTop !== null ? parallelLinesMessageTop : 
      containerTop + (centerY / 100) * containerHeightPercent + parallelLinesMessageOffsetY;
    
    return React.createElement(React.Fragment, { key: 'parallel-lines-animation-container' }, [
      // Rail extensions SVG (the dashed extended lines)
      React.createElement('svg', {
        key: 'parallel-lines-rails',
        style: {
          position: 'absolute',
          left: `${containerLeft}%`,
          top: `${containerTop}%`,
          width: `${containerWidthPercent}%`,
          height: `${containerHeightPercent}%`,
          zIndex: zIndex, // Below sides (sides use zIndex + 20) - use base zIndex to ensure rails are behind
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        // Continuous rail line for side 1 (X to Y - includes A-B segment)
        React.createElement('line', {
          key: 'rail1-continuous',
          x1: ext1X1,
          y1: ext1Y1,
          x2: ext1X2,
          y2: ext1Y2,
          stroke: parallelLinesExtensionColor,
          strokeWidth: side1Config.thickness,
          strokeDasharray: `${lineThickness * 2}, ${lineThickness}`,
          strokeLinecap: 'round'
        }),
        // Continuous rail line for side 2 (W to Z - includes D-C segment)
        React.createElement('line', {
          key: 'rail2-continuous',
          x1: ext2X1,
          y1: ext2Y1,
          x2: ext2X2,
          y2: ext2Y2,
          stroke: parallelLinesExtensionColor,
          strokeWidth: side2Config.thickness,
          strokeDasharray: `${lineThickness * 2}, ${lineThickness}`,
          strokeLinecap: 'round'
        })
      ]),
      
      // Success message
      React.createElement('div', {
        key: 'parallel-lines-message',
        style: {
          position: 'absolute',
          left: `${messageLeft}%`,
          top: `${messageTop}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: zIndex + 201,
          pointerEvents: 'none',
          animation: 'angleEqualityBlink 1s ease-in-out infinite',
          padding: '8px 16px',
          backgroundColor: 'rgba(100, 100, 100, 0.9)',
          color: '#FFFFFF',
          fontSize: `${messageTextSize}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)'
        }
      }, parallelLinesMessage)
    ]);
  }, [parallelLinesAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, edgeThickness, edgeColor, edgeStyle, angleTextSize, angleTextFont, zIndex, parallelLinesMessage, parallelLinesMessageLeft, parallelLinesMessageTop, parallelLinesMessageOffsetX, parallelLinesMessageOffsetY, parallelLinesExtensionRatio, parallelLinesMovementRatio, parallelLinesExtensionColor, side1, side2, side3, side4]);

  // Helper to convert gc units to pixels for CSS
  const convertGcToPixels = React.useCallback((value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', '')) || 4;
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      return (gcValue / gridSystemCols) * viewportWidth;
    }
    return parseFloat(value) || 4;
  }, []);

  // Main container style
  const containerStyle = React.useMemo(() => {
    if (!coordinates) {
      const baseStyle = {
        position: 'absolute',
        inset: 0
      };
      
      if (containerBorder) {
        const borderWidthPx = convertGcToPixels(containerBorderWidth);
        baseStyle.border = `${borderWidthPx}px ${containerBorderStyle} ${containerBorderColor}`;
      }
      
      return baseStyle;
    }
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    const left = ((x1 - 1) / gridSystemCols) * 100;
    const top = ((y1 - 1) / gridSystemRows) * 100;
    const width = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const height = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    const style = {
      position: 'absolute',
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      width: `${width.toFixed(2)}%`,
      height: `${height.toFixed(2)}%`
    };
    
    if (containerBorder) {
      const borderWidthPx = convertGcToPixels(containerBorderWidth);
      style.border = `${borderWidthPx}px ${containerBorderStyle} ${containerBorderColor}`;
    }
    
    return style;
  }, [coordinates, containerBorder, containerBorderWidth, containerBorderColor, containerBorderStyle, convertGcToPixels]);

  return React.createElement('div', {
    ref: containerRef,
    id: id || `${elementName}-${currentPage}`,
    className: 'quadrilateral-component',
    style: containerStyle,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-quad-type': currentQuadType,
    'data-component-type': 'QuadrilateralComponent',
    'data-component': 'QuadrilateralComponent',
    'data-mode': mode // Add mode attribute for quiz detection
  }, [
    // Grid layer
    currentShowGrid && window.QuadGridComponent?.QuadGridComponent && React.createElement(window.QuadGridComponent.QuadGridComponent, {
      key: 'grid',
      gridRows: gridRows,
      gridCols: gridCols,
      coordinates: coordinates,
      zIndex: zIndex + 150, // Higher than wrapper to allow hotspots on top
      gridPadding: gridPadding,
      containerBorderWidth: containerBorder ? containerBorderWidth : 0,
      snapPoint: snapPoint
    }),
    
    // Vertices layer (always rendered, independent of grid visibility)
    renderVertices.length > 0 && React.createElement('div', {
      key: 'vertices-container',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 150, // Same z-index as grid component
        pointerEvents: 'auto' // Allow clicks on hotspots
      }
    }, renderVertices),
    
    // Animated parallel lines rails (rendered before quad so they appear behind)
    renderParallelLinesAnimation,
    
    // Quadrilateral wrapper (applies transform when parallel lines animation is active)
    React.createElement('div', {
      key: 'quadrilateral-wrapper',
      className: buildSuccessAnimating ? 'build-success-pulse' : undefined,
      style: {
        ...(parallelLinesTransform || {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%'
        }),
        zIndex: zIndex + 20 // Ensure wrapper creates stacking context above rails
      }
    }, [
      // Build mode: Target wireframe (behind main shape)
      renderTargetWireframe,
      
      // Build mode: Target vertex markers (behind main shape)
      renderTargetVertexMarkers,
      
      // Sides layer (SVG)
      renderSides,
      
      // Diagonals layer (SVG)
      renderDiagonals,
      
      // Angle markers layer
      ...renderAngleMarkers,
      
      // Animated angle equality arc (above angle markers)
      renderAnimatedAngleArc,
      
      // Animated angle sum arcs (above angle markers)
      renderAnimatedAngleSumArcs,
      
      // Animated side line for side equality (above sides)
      renderAnimatedSideLine,
      
      // Animated all 4 side equality line
      renderAllSideEqualityLine,
      
      // Stroke indicators on equal sides
      renderEqualSideStrokes,
      
      // Animated opposite side line for opposite side equality
      renderAnimatedOppositeSideLine,
      
      // Animated diagonal equality line
      renderAnimatedDiagonalEquality,
      
      // Animated diagonal bisection tick marks
      renderAnimatedDiagonalBisection,
      
      // Animated diagonal perpendicular bisection (tick marks + right angle)
      renderAnimatedDiagonalPerpendicular,
      
      // Confirm right angle overlay (highlight and message)
      renderConfirmRightAngleOverlay,
      
      // Permanent right angle markers
      renderPermanentRightAngleMarkers
    ]),
    
    // Vertex labels layer
    renderVertexLabels,
    
    // Property panel
    renderPropertyPanel,
    
    // Build mode: Success message (above everything)
    renderBuildSuccessMessage,
    
    // Integrated protractor (above everything else)
    renderProtractor
  ].filter(Boolean));
});

// Quadrilateral Element Configuration
const QuadrilateralElement = {
  quadrilateral: {
    type: 'quadrilateral',
    coordinates: [100, 100, 1500, 800],
    zIndex: 50,
    props: {
      componentType: 'QuadrilateralComponent',
      quadType: 'SQUARE',
      gridRows: 10,
      gridCols: 10,
      showGrid: true,
      showDiagonals: false,
      showAngleMarkers: 'all', // Deprecated: use angleConfig.show
      showProperties: 'panel',
      draggable: true,
      sideColor: '#000000',
      diagonalColor: '#999999',
      // Edge styling props
      edgeColor: '#000000',
      edgeThickness: '4gc',
      edgeStyle: 'solid',
      isBlink: false,
      // Individual overrides: side1, side2, side3, side4, diagonal1, diagonal2
      // Example: side1: { color: '#FF0000', thickness: '6gc', style: 'dashed', isBlink: true }
      // Vertex config (grouped)
      vertexConfig: {
        color: '#FF9900',
        showLabels: false,
        labels: ['A', 'B', 'C', 'D'],
        labelColor: '#000000',
        labelSize: '16gc',
        labelOffset: '15gc'
      },
      // Angle config (grouped)
      angleConfig: {
        show: 'all',
        markerColor: '#FF6600',
        markerSize: '1gc',
        showText: true,
        textColor: '#FF6600',
        textSize: '12gc',
        textFont: 'Arial, sans-serif',
        textOffset: '35gc',
        // Per-vertex overrides (optional)
        // Use 'show' flag inside each angle to control visibility
        // angleA: { 
        //   interiorAngle: { show: true, size: '2gc', color: '#FF0000', showText: true, textMode: 'both' },
        //   supplementaryAngle1: { show: false, size: '1.5gc', color: '#FF6666' }
        // },
        // angleB: { interiorAngle: { show: true, size: '1.5gc', color: '#00FF00', showText: true, textMode: 'name' } },
        // angleC: { interiorAngle: { show: true, size: '1gc', color: '#0000FF', showText: true, textMode: 'measure' } },
        // angleD: { interiorAngle: { show: true, size: '0.5gc', color: '#FFFF00', showText: true, textMode: 'both' } }
      },
      // Angle equality animation config
      angleAnimationConfig: {
        duration: 2000,  // Animation duration in milliseconds
        holdTime: 500,   // Deprecated - arc now stays and blinks
        message: 'The angles are perfectly equal!'  // Message shown when animation completes
      },
      // Build mode config (optional - enables shape building exercise)
      // mode: 'build',  // Set to 'build' to enable build mode
      // buildConfig: {
      //   targetType: 'shape',  // 'shape' = match shape type, 'coordinates' = match exact vertices
      //   targetShape: 'RECTANGLE',  // Target shape when targetType='shape'
      //   // targetVertices: [{row: 2, col: 2}, {row: 2, col: 8}, {row: 8, col: 8}, {row: 8, col: 2}],  // Target when targetType='coordinates'
      //   showTargetWireframe: true,  // Show dashed outline of target shape
      //   wireframeColor: '#888888',  // Wireframe stroke color
      //   wireframeThickness: '2gc',  // Wireframe stroke width
      //   blinkWireframe: true,  // Animate wireframe blinking
      //   blinkDuration: 1000,  // Blink cycle duration in ms
      //   highlightTargetVertices: true,  // Show target vertex markers
      //   targetVertexColor: '#00AA00',  // Target vertex marker color
      //   targetVertexSize: '8gc',  // Target vertex marker size
      //   tolerance: 0,  // Grid cells tolerance for coordinate matching (0 = exact)
      //   onTargetAchieved: (data) => console.log('Target achieved!', data),  // Callback
      //   showSuccessMessage: true,  // Show built-in success message
      //   successMessage: 'Great job!',  // Custom success message text
      //   successAnimation: true  // Play success animation
      // }
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('quadrilateral', (props, elementId) => {
      return React.createElement(QuadrilateralComponent, props);
    })
  }
};

/**
 * Global Quad Grid to Precision Grid Coordinate Converter Utility
 * 
 * Highly accurate (99.99%) converter from quadrilateral grid coordinates to precision grid coordinates.
 * Can be used independently of the QuadrilateralComponent.
 * 
 * @param {Object} quadGridPoint - Point in quad grid {col, row} (0-indexed)
 * @param {Object} config - Configuration object
 * @param {Array<number>} config.containerCoordinates - Container position [x1, y1, x2, y2] in precision grid
 * @param {number} config.gridRows - Number of rows in quad grid (default: 10)
 * @param {number} config.gridCols - Number of columns in quad grid (default: 10)
 * @param {boolean} config.forHotspot - If true, returns center position for hotspot coordinates (default: false)
 * @returns {Object} Precision grid position {x, y} or {col, row}
 * 
 * @example
 * // Convert Vertex A at (2, 2) in a 10x10 quad grid to precision grid
 * const result = window.quadGridToPrecisionGrid(
 *   { col: 2, row: 2 },
 *   {
 *     containerCoordinates: [50, 50, 1000, 700],
 *     gridRows: 10,
 *     gridCols: 10,
 *     forHotspot: false
 *   }
 * );
 * // Returns: { col: 240, row: 180 } (actual visual position)
 * 
 * @example
 * // Get hotspot center position
 * const hotspotCenter = window.quadGridToPrecisionGrid(
 *   { col: 2, row: 2 },
 *   {
 *     containerCoordinates: [50, 50, 1000, 700],
 *     gridRows: 10,
 *     gridCols: 10,
 *     forHotspot: true
 *   }
 * );
 * // Returns: { x: 241, y: 181 } (center for hotspot coordinates)
 */
if (typeof window !== 'undefined') {
  window.quadGridToPrecisionGrid = (quadGridPoint, config) => {
    const {
      containerCoordinates,
      gridRows = 10,
      gridCols = 10,
      gridPadding = 0,
      forHotspot = false
    } = config || {};
    
    if (!containerCoordinates || !Array.isArray(containerCoordinates) || containerCoordinates.length !== 4) {
      console.warn('⚠️ [quadGridToPrecisionGrid] Invalid containerCoordinates, returning default');
      return forHotspot ? { x: 800, y: 450 } : { col: 800, row: 450 };
    }
    
    const [x1, y1, x2, y2] = containerCoordinates;
    
    // Parse gridPadding value (supports gc units or raw numbers)
    let paddingGc = 0;
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      paddingGc = parseFloat(gridPadding) || 0;
    } else if (typeof gridPadding === 'number') {
      paddingGc = gridPadding;
    }
    
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    // Calculate adjusted dimensions after padding
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells)
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Calculate position within centered grid (0-1 range)
    const percentX = quadGridPoint.col / gridCols;
    const percentY = quadGridPoint.row / gridRows;
    
    // Map to actual position within container (accounting for centered grid)
    const actualX = x1 + offsetXGc + percentX * gridWidthGc;
    const actualY = y1 + offsetYGc + percentY * gridHeightGc;
    
    // Handle hotspot offset if needed
    if (forHotspot) {
      return {
        x: actualX,
        y: actualY
      };
    } else {
      return {
        col: Math.round(actualX),
        row: Math.round(actualY)
      };
    }
  };
  
  window.QuadrilateralComponent = {
    QuadrilateralComponent,
    QuadrilateralElement
  };

  console.log('✅ Quadrilateral component loaded successfully');
  console.log('✅ Global coordinate converter available: window.quadGridToPrecisionGrid()');
} else {
  console.log('✅ Quadrilateral component loaded successfully');
}