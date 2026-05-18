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
 * @param {string} props.angleConfig.arcSizeGc - Size of angle arc (and animated sum arc) in gc units; uses markerSize if not set
 * @param {string} props.angleConfig.rightAngleSizeGc - Size of right-angle L markers in gc units; uses arcSizeGc if not set
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
 * @param {Array<Object>} props.sideSymbols - Array of side symbols for equality (ticks) or parallel (arrows)
 * @param {string} props.sideSymbols[].side - Side name: 'AB', 'BC', 'CD', or 'DA'
 * @param {string} props.sideSymbols[].type - Symbol type: 'tick' for equal length, 'arrow' for parallel sides
 * @param {number} props.sideSymbols[].count - Number of symbols (default: 1). Same count = same property (e.g., 1 tick = equal to other sides with 1 tick)
 * @param {string} props.sideSymbols[].color - Symbol color (default: '#000000')
 * @param {string} props.sideSymbols[].size - Symbol size in gc units (default: '8gc')
 * @param {string} props.sideSymbols[].thickness - Tick stroke thickness in gc (default: size-based)
 * @param {number} props.sideSymbols[].position - Position along side as ratio 0-1 (default: 0.5 = center)
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
 * @param {string} props.angleSumAnimationConfig.semicircleSizeGc - Size of the 180° semicircle in gc units (default: derived from arc size, ~1.25× then +15%)
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
 * @param {number} props.parallelLinesAnimationConfig.trackLength - Length of the parallel tracks as ratio of side length (default: uses extensionRatio). Overrides extensionRatio if provided
 * @param {number} props.parallelLinesAnimationConfig.movementRatio - How far the quadrilateral moves as ratio of side length (default: 0.5). 0.5 = moves 50% of side length in each direction
 * @param {number} props.parallelLinesAnimationConfig.travelDistance - Alternative to movementRatio (same effect)
 * @param {string} props.parallelLinesAnimationConfig.extensionColor - Color for dashed extensions (default: '#888888')
 * @param {string} props.parallelLinesAnimationConfig.message - Custom message to display (default: 'These sides are parallel!')
 * @param {Object} props.parallelLinesAnimationConfig.messagePosition - Message position configuration
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.left - Absolute left position in percentage
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.top - Absolute top position in percentage
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.offsetX - Horizontal offset in percentage (default: 0)
 * @param {number} props.parallelLinesAnimationConfig.messagePosition.offsetY - Vertical offset in percentage (default: -8)
 * @param {Array<number>} props.parallelLinesAnimationConfig.messageCoordinates - Message position using absolute grid coordinates [x, y] (overrides messagePosition if provided). Uses same coordinate system as component coordinates.
 * @param {string} props.parallelLinesAnimationConfig.trackStrokeWidth - Stroke width for parallel tracks in gc units (default: uses edgeThickness)
 * @param {string} props.parallelLinesAnimationConfig.trackDashStyle - Dash style for parallel tracks: 'solid', 'dashed', 'dotted' (default: 'dashed')
 * @param {number} props.parallelLinesAnimationConfig.trackDashSize - Size of dashes as multiplier of line thickness (default: 1). Smaller values = smaller dashes
 * @param {number} props.parallelLinesAnimationConfig.trackDashGap - Size of gaps as multiplier of line thickness (default: 0.5). Smaller values = smaller gaps
 * @param {number} props.parallelLinesAnimationConfig.animationSpeed - Speed of parallel animation (default: 1). Values > 1 = faster, < 1 = slower. Overrides speed/speedFactor if provided
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
    showProperties: propShowProperties = 'none', // Default to 'none' to hide property panel unless explicitly enabled
    showPropertyPanel: propShowPropertyPanel = undefined, // Boolean prop to toggle property panel (takes precedence over showProperties)
    containerBorder = false,
    containerBorderWidth = '4gc',
    containerBorderColor = '#000000',
    containerBorderStyle = 'solid',
    gridPadding = 0,
    draggable: propDraggable = true,
    onVertexChange,
    sideColor = '#000000',
    diagonalColor = '#999999',
    zIndex = 50,
    // New edge styling props
    edgeColor = '#000000',
    edgeThickness = '4gc',
    edgeStyle = 'solid',
    isBlink = false,
    fillColor = null, // Fill color for the shape (null = no fill)
    side1,
    side2,
    side3,
    side4,
    sideSymbols = [], // Array of side symbols for equality (ticks) or parallel (arrows)
    showSideSymbolsAfterAnimation = false, // When true, side symbols are hidden until quadrilateralShowSideSymbols event
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
    // Diagonal angle bisection animation config (diagonals bisect interior angles)
    diagonalAngleBisectionAnimationConfig = {},
    // Diagonal angle bisection arc size (overrides config.arcSize if set); e.g. "30gc"
    diagonalAngleBisectionArcSize: diagonalAngleBisectionArcSizeProp,
    // Parallel lines animation config
    parallelLinesAnimationConfig = {},
    // Symmetry fold animation config
    symmetryAnimationConfig = {},
    // Build mode props
    mode = 'default', // 'default' | 'build'
    buildConfig = {}
  } = props;

  // Get quad ID for display state
  const quadId = id || `${elementName}-${currentPage}`;
  
  // When showSideSymbolsAfterAnimation is true, hide side symbols until quadrilateralShowSideSymbols event (never show on load/navigation)
  const sideSymbolsEventFiredRef = React.useRef(false);
  const [sideSymbolsVisible, setSideSymbolsVisible] = React.useState(false);
  React.useEffect(() => {
    if (!showSideSymbolsAfterAnimation) {
      sideSymbolsEventFiredRef.current = true;
      setSideSymbolsVisible(true);
      return;
    }
    sideSymbolsEventFiredRef.current = false;
    setSideSymbolsVisible(false);
    const handler = (e) => {
      if (e.detail && e.detail.quadId === quadId) {
        sideSymbolsEventFiredRef.current = true;
        setSideSymbolsVisible(true);
      }
    };
    window.addEventListener('quadrilateralShowSideSymbols', handler);
    return () => window.removeEventListener('quadrilateralShowSideSymbols', handler);
  }, [showSideSymbolsAfterAnimation, quadId]);
  const effectiveSideSymbols = (showSideSymbolsAfterAnimation && !sideSymbolsEventFiredRef.current) ? [] : sideSymbols;
  
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
  // Extract vertex config with defaults
  const vertexColor = vertexConfig.color || '#FF9900';
  const showVertexLabels = vertexConfig.showLabels || false;
  const vertexLabels = vertexConfig.labels || ['A', 'B', 'C', 'D'];
  const vertexLabelColor = vertexConfig.labelColor || '#FFFFFF'; // White font
  const vertexLabelSize = vertexConfig.labelSize || '36gc'; // 36gc font size
  const vertexLabelOffset = vertexConfig.labelOffset || '40gc'; // Increased default to prevent overlap
  const vertexAnimated = vertexConfig.animated !== undefined ? vertexConfig.animated : true; // Default to animated

  // Extract angle config with defaults (support deprecated showAngleMarkers for backward compatibility)
  // Determine angleShow from config; respect explicit 'none' (e.g. page 4 load without arcs)
  let angleShow = (angleConfig && angleConfig.show !== undefined)
    ? angleConfig.show
    : (showAngleMarkers || 'all');
  // Page 4: arcs must not show on load; they are shown by animation Step 1 (quadDisplayChanged)
  if (id === 'page4-shape-display') {
    angleShow = 'none';
  }

  const angleMarkerColor = angleConfig.markerColor || '#FF6600';
  const angleMarkerSize = angleConfig.markerSize || '1gc';
  const angleArcSizeGc = angleConfig.arcSizeGc || angleMarkerSize;
  const angleRightAngleSizeGc = angleConfig.rightAngleSizeGc || angleArcSizeGc;
  const angleShowText = angleConfig.showText !== undefined 
    ? angleConfig.showText
    : (angleShow === 'measurement' || angleShow === 'all');
  const angleTextColor = angleConfig.textColor || '#FF6600';
  const angleTextSize = angleConfig.textSize || '28gc';
  const angleTextFont = angleConfig.textFont || 'Arial, sans-serif';
  const angleTextOffset = angleConfig.textOffset || '35gc';

  // Use props directly - state will be updated via events
  const showGrid = propShowGrid;
  const showDiagonals = propShowDiagonals;
  
  // Determine showProperties: check propShowPropertyPanel (boolean), then propShowProperties (string)
  const showProperties = propShowPropertyPanel !== undefined
    ? (propShowPropertyPanel ? 'panel' : 'none')
    : propShowProperties;
  const draggable = propDraggable;

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
  // Disable default message - can be enabled via config if needed
  const equalityMessage = angleAnimationConfig.message || angleAnimationConfig.equalityMessage || '';
  
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
  const sumMessage = angleSumAnimationConfig.message || ''; // Empty: do not show "These angles add up..." by default
  // First show extended line, then move arc (0.25 = first 25% of duration line only, then arc moves)
  const sumExtensionFirstRatio = angleSumAnimationConfig.extensionFirstRatio ?? 0.25;
  
  // Sum message position configuration
  const sumMessagePosition = angleSumAnimationConfig.messagePosition || angleSumAnimationConfig.messageCoordinates || {};
  const sumMessageLeft = sumMessagePosition.left !== undefined ? sumMessagePosition.left : null;
  const sumMessageTop = sumMessagePosition.top !== undefined ? sumMessagePosition.top : null;
  const sumMessageOffsetX = sumMessagePosition.offsetX || sumMessagePosition.offsetLeft || 0;
  const sumMessageOffsetY = sumMessagePosition.offsetY || sumMessagePosition.offsetTop || -8;
  
  // 180° text configuration
  const deg180TextFontSize = angleSumAnimationConfig.deg180TextFontSize || angleSumAnimationConfig.fontSize180 || 1.25; // Multiplier for base font size
  const deg180TextOffsetY = angleSumAnimationConfig.deg180TextOffsetY || angleSumAnimationConfig.offsetY180 || null; // Custom Y offset (null = auto-calculate)
  // Semicircle (180° arc) size in gc; null = derive from arc size (1.25× then +15%)
  const sumSemicircleSizeGc = angleSumAnimationConfig.semicircleSizeGc || null;
  
  // Extract side equality animation config with defaults
  const sideAnimationDuration = sideEqualityAnimationConfig.duration || 1000; // Rotation duration
  const sideAnimationWaitTime = sideEqualityAnimationConfig.waitTime || 1000; // Wait time at each position
  const sideAnimationCycles = sideEqualityAnimationConfig.cycles !== undefined ? sideEqualityAnimationConfig.cycles : -1; // -1 = infinite
  const sideStopAfterRotateToSide2 = sideEqualityAnimationConfig.stopAfterRotateToSide2 === true; // if true, rotate to next side once then stop (no back-and-forth)
  const sideEqualityMessage = sideEqualityAnimationConfig.message || 'Adjacent sides are equal!';
  const sideEqualityMessages = sideEqualityAnimationConfig.messages; // optional array [msgForVertex0, msgForVertex1, msgForVertex2, msgForVertex3]
  const sideLineStyle = sideEqualityAnimationConfig.lineStyle || sideEqualityAnimationConfig.style || 'dashed'; // 'dashed' | 'solid'
  const sideMessageFontSize = sideEqualityAnimationConfig.messageFontSize || sideEqualityAnimationConfig.fontSize || '14gc';
  const sideMessageAtCenter = sideEqualityAnimationConfig.messageAtCenter === true;
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
  const diagonalEqualityMessage = diagonalEqualityAnimationConfig.message !== undefined ? diagonalEqualityAnimationConfig.message : 'Diagonals are equal in length!';
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
  const diagonalBisectionCycles = diagonalBisectionAnimationConfig.cycles !== undefined ? diagonalBisectionAnimationConfig.cycles : 2;
  const diagonalBisectionColor1 = diagonalBisectionAnimationConfig.color1 || '#FF6600';
  const diagonalBisectionColor2 = diagonalBisectionAnimationConfig.color2 || '#3399FF';
  const diagonalBisectionLineStyle = diagonalBisectionAnimationConfig.lineStyle || 'dashed';
  // Messages for each diagonal
  const diagonalBisectionMessageAC = diagonalBisectionAnimationConfig.messageAC || 'O bisects diagonal AC';
  const diagonalBisectionMessageBD = diagonalBisectionAnimationConfig.messageBD || 'O bisects diagonal BD';
  
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
  
  // Extract diagonal angle bisection animation config with defaults
  const diagonalAngleBisectionBackAndForthCount = diagonalAngleBisectionAnimationConfig.backAndForthCount ?? 4;
  const halfCycleDuration = diagonalAngleBisectionAnimationConfig.halfCycleDuration ?? 500;
  const diagonalAngleBisectionDuration = diagonalAngleBisectionAnimationConfig.duration ?? ((diagonalAngleBisectionBackAndForthCount * 2 + 1) * halfCycleDuration);
  const diagonalAngleBisectionWaitTime = diagonalAngleBisectionAnimationConfig.waitTime || 1000;
  const diagonalAngleBisectionCycles = diagonalAngleBisectionAnimationConfig.cycles !== undefined ? diagonalAngleBisectionAnimationConfig.cycles : 1;
  const diagonalAngleBisectionArcColor = diagonalAngleBisectionAnimationConfig.arcColor || '#FF6600';
  const diagonalAngleBisectionArcSize = diagonalAngleBisectionArcSizeProp ?? diagonalAngleBisectionAnimationConfig.arcSize ?? '30gc';
  const diagonalAngleBisectionFillOpacity = diagonalAngleBisectionAnimationConfig.fillOpacity || 0.5;
  // Original arc stays in place; replica is yellow while moving; when overlapped: green if equal, red if not
  const diagonalAngleBisectionMovingColor = diagonalAngleBisectionAnimationConfig.movingColor || '#FFD700';
  const diagonalAngleBisectionOverlapEqualColor = diagonalAngleBisectionAnimationConfig.overlapEqualColor || '#00FF00';
  const diagonalAngleBisectionOverlapNotEqualColor = diagonalAngleBisectionAnimationConfig.overlapNotEqualColor || '#FF0000';
  const diagonalAngleBisectionOverlapEqual = diagonalAngleBisectionAnimationConfig.overlapEqual !== false;
  
  // Extract rotational symmetry animation config with defaults
  const rotationalSymmetryAnimationConfig = symmetryAnimationConfig?.rotationalSymmetryAnimationConfig || {};
  const rotationalSymmetryDuration = rotationalSymmetryAnimationConfig.duration || 2000;
  const rotationalSymmetryPauseDuration = rotationalSymmetryAnimationConfig.pauseDuration || 500;
  const rotationalSymmetryOverlayColor = rotationalSymmetryAnimationConfig.overlayColor || '#FFFF00';
  const rotationalSymmetryMatchColor = rotationalSymmetryAnimationConfig.matchColor || '#00FF00';
  const rotationalSymmetryCentroidSize = rotationalSymmetryAnimationConfig.centroidSize || '25gc';
  const rotationalSymmetryCentroidColor = rotationalSymmetryAnimationConfig.centroidColor || '#FF9900';
  const rotationalSymmetryAngleFontSize = rotationalSymmetryAnimationConfig.angleFontSize || '30gc';
  const rotationalSymmetryAngleColor = rotationalSymmetryAnimationConfig.angleColor || '#FFFFFF';
  const rotationalSymmetryLineStyle = rotationalSymmetryAnimationConfig.lineStyle || 'dashed';
  const rotationalSymmetryAngleLabel = rotationalSymmetryAnimationConfig.angleLabel || 'Rotation Angle';
  
  // Extract parallel lines animation config with defaults
  // Speed: use animationSpeed if provided, otherwise use speed or speedFactor, default to 1
  const parallelLinesSpeed = parallelLinesAnimationConfig.animationSpeed !== undefined 
    ? parallelLinesAnimationConfig.animationSpeed 
    : (parallelLinesAnimationConfig.speed || parallelLinesAnimationConfig.speedFactor || 1); // Speed multiplier (1 = normal, 0.5 = half speed, 2 = double speed)
  const parallelLinesBaseDuration = parallelLinesAnimationConfig.duration || 1500; // Base duration for one direction
  const parallelLinesDuration = parallelLinesBaseDuration / parallelLinesSpeed; // Apply speed multiplier (divide by speed to make it slower when speed < 1)
  const parallelLinesWaitTime = parallelLinesAnimationConfig.waitTime || 500; // Pause at each end
  const parallelLinesCycles = parallelLinesAnimationConfig.cycles !== undefined ? parallelLinesAnimationConfig.cycles : -1; // -1 = infinite
  // Track length: use trackLength if provided, otherwise use extensionRatio, default to 1
  const parallelLinesExtensionRatio = parallelLinesAnimationConfig.trackLength !== undefined 
    ? parallelLinesAnimationConfig.trackLength 
    : (parallelLinesAnimationConfig.extensionRatio !== undefined ? parallelLinesAnimationConfig.extensionRatio : 1); // Extension as ratio of side length
  const parallelLinesMovementRatio = parallelLinesAnimationConfig.movementRatio !== undefined ? parallelLinesAnimationConfig.movementRatio : (parallelLinesAnimationConfig.travelDistance !== undefined ? parallelLinesAnimationConfig.travelDistance : 0.5); // Movement distance as ratio of side length (default: 0.5 = 50% of side length)
  const parallelLinesExtensionColor = parallelLinesAnimationConfig.extensionColor || '#888888';
  // Track stroke width: use trackStrokeWidth if provided, otherwise use edgeThickness
  const parallelLinesTrackStrokeWidth = parallelLinesAnimationConfig.trackStrokeWidth || edgeThickness || '4gc';
  // Track dash style: 'solid', 'dashed', 'dotted' (default: 'dashed')
  const parallelLinesTrackDashStyle = parallelLinesAnimationConfig.trackDashStyle || 'dashed';
  // Track dash size: multiplier of line thickness (default: 1 for smaller dashes)
  const parallelLinesTrackDashSize = parallelLinesAnimationConfig.trackDashSize !== undefined ? parallelLinesAnimationConfig.trackDashSize : 1;
  // Track dash gap: multiplier of line thickness (default: 0.5 for smaller gaps)
  const parallelLinesTrackDashGap = parallelLinesAnimationConfig.trackDashGap !== undefined ? parallelLinesAnimationConfig.trackDashGap : 0.5;
  // Use empty string if message is explicitly set to empty, otherwise use default
  const parallelLinesMessage = parallelLinesAnimationConfig.message !== undefined 
    ? parallelLinesAnimationConfig.message 
    : 'These sides are parallel!';
  
  // Parallel lines message position configuration
  const parallelLinesMessagePosition = parallelLinesAnimationConfig.messagePosition || {};
  const parallelLinesMessageCoordinates = parallelLinesAnimationConfig.messageCoordinates || null; // Absolute coordinates [x, y]
  
  // If messageCoordinates is provided, convert absolute coordinates to percentages
  let parallelLinesMessageLeft = parallelLinesMessagePosition.left !== undefined ? parallelLinesMessagePosition.left : null;
  let parallelLinesMessageTop = parallelLinesMessagePosition.top !== undefined ? parallelLinesMessagePosition.top : null;
  
  // Override with absolute coordinates if provided
  if (parallelLinesMessageCoordinates && Array.isArray(parallelLinesMessageCoordinates) && parallelLinesMessageCoordinates.length >= 2) {
    // Absolute coordinates will be converted to percentages in the render function
    parallelLinesMessageLeft = null; // Will be calculated from absolute coordinates
    parallelLinesMessageTop = null; // Will be calculated from absolute coordinates
  }
  
  const parallelLinesMessageOffsetX = parallelLinesMessagePosition.offsetX || 0;
  const parallelLinesMessageOffsetY = parallelLinesMessagePosition.offsetY || -8;
  
  // Helper function to get per-vertex angle config (merges with global defaults)
  // Note: This will be redefined after state initialization to use currentAngleShowText
  const getVertexAngleConfigBase = React.useCallback((vertexIndex, useShowText) => {
    const vertexKeys = ['angleA', 'angleB', 'angleC', 'angleD'];
    const vertexKey = vertexKeys[vertexIndex];
    const vertexAngleConfig = angleConfig[vertexKey] || {};
    
    // Global defaults (use angleArcSizeGc for arc size so arcs are visible)
    const globalDefaults = {
      size: angleArcSizeGc,
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
  }, [angleConfig, angleArcSizeGc, angleMarkerSize, angleMarkerColor]);

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
  // Vertices where 90° right-angle marker is revealed after protractor measurement (page 4 all-angles-90 flow)
  const [rightAngleRevealedVertices, setRightAngleRevealedVertices] = React.useState([]);
  // Override diagonal styles (e.g. set both to orange/solid after "diagonals not equal" animation)
  const [overrideDiagonal1, setOverrideDiagonal1] = React.useState(null);
  const [overrideDiagonal2, setOverrideDiagonal2] = React.useState(null);
  
  // Create getVertexAngleConfig that uses currentAngleShowText
  const getVertexAngleConfig = React.useCallback((vertexIndex) => {
    return getVertexAngleConfigBase(vertexIndex, currentAngleShowText);
  }, [getVertexAngleConfigBase, currentAngleShowText]);
  
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
        case 'diagonal1':
          setOverrideDiagonal1(value);
          break;
        case 'diagonal2':
          setOverrideDiagonal2(value);
          break;
        case 'showAngleArcs':
        case 'showAngleText':
          // Get values from event detail
          const showArcs = property === 'showAngleArcs' ? value : (event.detail?.showAngleArcs !== undefined ? event.detail.showAngleArcs : true);
          const showText = property === 'showAngleText' ? value : (event.detail?.showAngleText !== undefined ? event.detail.showAngleText : true);
          
          if (!showArcs && !showText) {
            setCurrentAngleShow('none');
            setCurrentAngleShowText(false);
          } else if (!showArcs) {
            setCurrentAngleShow('measurement');
            setCurrentAngleShowText(true);
          } else if (!showText) {
            setCurrentAngleShow('arc');
            setCurrentAngleShowText(false);
          } else {
            setCurrentAngleShow('all');
            setCurrentAngleShowText(true);
          }
          break;
      }
    };
    
    // No need to check global state - rely on events only
    if (typeof window !== 'undefined') {
      window.addEventListener('quadDisplayChanged', handleDisplayChange);
      
      return () => {
        window.removeEventListener('quadDisplayChanged', handleDisplayChange);
      };
    }
  }, [quadId, currentShowGrid, currentShowDiagonals, currentShowProperties, currentDraggable, currentShowVertexLabels]);
  
  // State for current vertices
  const [vertices, setVertices] = React.useState(defaultVertices);
  
  // Build mode: Track if target has been achieved
  const [buildTargetAchieved, setBuildTargetAchieved] = React.useState(false);
  
  // Build mode: Track if success animation is playing
  const [buildSuccessAnimating, setBuildSuccessAnimating] = React.useState(false);
  
  // Build mode: Validation logic - check if current vertices match target
  React.useEffect(() => {
    if (mode !== 'build' || !resolvedTargetVertices || buildTargetAchieved) {
      return;
    }
    
    let targetMatched = false;
    
    if (buildTargetType === 'coordinates') {
      // Coordinate matching mode - compare vertex positions with tolerance
      targetMatched = vertices.every((v, index) => {
        const target = resolvedTargetVertices[index];
        const rowDiff = Math.abs(v.row - target.row);
        const colDiff = Math.abs(v.col - target.col);
        return rowDiff <= buildTolerance && colDiff <= buildTolerance;
      });
      
      if (targetMatched) {
        console.log('🎯 Build mode: Target coordinates achieved!', { vertices, target: resolvedTargetVertices, tolerance: buildTolerance });
      }
    } else if (buildTargetType === 'shape') {
      // Shape type matching mode - check if current shape properties match target shape
      if (typeof window.QuadrilateralConfig === 'undefined') {
        console.warn('QuadrilateralConfig not available for shape validation');
        return;
      }
      
      const currentProperties = window.QuadrilateralConfig.analyzeProperties(vertices);
      const targetConfig = window.QuadrilateralConfig.getConfig(buildTargetShape);
      
      if (currentProperties && targetConfig) {
        // Compare key properties to determine if shape matches
        const targetProps = targetConfig.properties;
        
        // Check parallel sides
        const parallelMatch = currentProperties.parallelSides === targetProps.parallelSides;
        
        // Check equal sides
        const equalSidesMatch = currentProperties.equalSides === targetProps.equalSides;
        
        // Check right angles
        const rightAnglesMatch = currentProperties.allRightAngles === targetProps.allRightAngles;
        
        // Check diagonals (for stricter matching)
        const diagonalsEqualMatch = currentProperties.diagonalsEqual === targetProps.diagonalsEqual;
        const diagonalsBisectMatch = currentProperties.diagonalsBisecting === targetProps.diagonalsBisecting;
        const diagonalsPerpendicularMatch = currentProperties.diagonalsPerpendicular === targetProps.diagonalsPerpendicular;
        
        // For shape matching, check primary properties
        targetMatched = parallelMatch && equalSidesMatch && rightAnglesMatch;
        
        // For specific shapes, also check diagonal properties
        if (targetMatched && buildTargetShape === 'SQUARE') {
          targetMatched = targetMatched && diagonalsPerpendicularMatch;
        }
        
        if (targetMatched) {
          console.log(`🎯 Build mode: Target shape ${buildTargetShape} achieved!`, { currentProperties, targetProps });
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
  }, [mode, vertices, resolvedTargetVertices, buildTargetAchieved, buildTargetType, buildTargetShape, buildTolerance, buildOnTargetAchieved, buildSuccessAnimation]);
  
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
  
  // Listen for page state reset events to reset the quadrilateral
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handlePageStateReset = (event) => {
      const resetPage = event.detail?.page;
      // Use currentPage prop as the source of truth for which page this component belongs to
      const componentPageNum = currentPage;
      
      // Also check if component ID matches the page pattern (e.g., "page3-shape-display")
      const idPageMatch = id ? id.match(/page(\d+)/) : null;
      const idPageNum = idPageMatch ? parseInt(idPageMatch[1], 10) : null;
      
      // Also check current page from window as fallback
      const currentPageFromWindow = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
      
      // Reset if this component is on the page being reset
      // Check componentPageNum, idPageNum, and currentPageFromWindow
      if (resetPage && (resetPage === componentPageNum || resetPage === idPageNum || resetPage === currentPageFromWindow)) {
        console.log(`🔄 QuadrilateralComponent ${id} resetting for page ${resetPage}`);
        
        // Reset vertices to initial/default values
        if (initialVertices && initialVertices.length === 4) {
          setVertices([...initialVertices]); // Create new array to trigger re-render
        } else if (typeof window.QuadrilateralConfig !== 'undefined') {
          const defaultVerts = window.QuadrilateralConfig.getDefaultVertices(currentQuadType, gridRows, gridCols);
          setVertices(defaultVerts);
        }
        
        // Reset display states to initial prop values
        setCurrentShowDiagonals(propShowDiagonals);
        setCurrentShowGrid(propShowGrid);
        // Recalculate showProperties from props (propShowPropertyPanel takes precedence)
        const resetShowProperties = propShowPropertyPanel !== undefined
          ? (propShowPropertyPanel ? 'panel' : 'none')
          : propShowProperties;
        setCurrentShowProperties(resetShowProperties);
        setCurrentDraggable(propDraggable);
        
        // Reset all animation states
        setAngleAnimation(null);
        setAngleSumAnimation(null);
        setSideEqualityAnimation(null);
        setOppositeSideAnimation(null);
        setDiagonalEqualityAnimation(null);
        setDiagonalBisectionAnimation(null);
        setDiagonalPerpendicularAnimation(null);
        setSymmetryFoldAnimation(null);
        setParallelLinesAnimation(null);
        
        // Clear animation refs and state refs
        if (angleAnimationRef.current) {
          cancelAnimationFrame(angleAnimationRef.current);
          angleAnimationRef.current = null;
        }
        if (angleAnimationStateRef.current) {
          angleAnimationStateRef.current = null;
        }
        if (angleSumAnimationRef.current) {
          cancelAnimationFrame(angleSumAnimationRef.current);
          angleSumAnimationRef.current = null;
        }
        if (sideEqualityAnimationRef.current) {
          cancelAnimationFrame(sideEqualityAnimationRef.current);
          sideEqualityAnimationRef.current = null;
        }
        if (oppositeSideAnimationRef.current) {
          cancelAnimationFrame(oppositeSideAnimationRef.current);
          oppositeSideAnimationRef.current = null;
        }
        if (diagonalEqualityInitialTimeoutRef.current) {
          clearTimeout(diagonalEqualityInitialTimeoutRef.current);
          diagonalEqualityInitialTimeoutRef.current = null;
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
        if (diagonalAngleBisectionAnimationRef.current) {
          cancelAnimationFrame(diagonalAngleBisectionAnimationRef.current);
          diagonalAngleBisectionAnimationRef.current = null;
        }
        if (symmetryFoldAnimationRef.current) {
          cancelAnimationFrame(symmetryFoldAnimationRef.current);
          symmetryFoldAnimationRef.current = null;
        }
        if (parallelLinesAnimationRef.current) {
          cancelAnimationFrame(parallelLinesAnimationRef.current);
          parallelLinesAnimationRef.current = null;
        }
        if (parallelLinesAnimationStateRef.current) {
          parallelLinesAnimationStateRef.current = null;
        }
        if (diagonalEqualityAnimationStateRef.current) {
          diagonalEqualityAnimationStateRef.current = null;
        }
        if (oppositeSideAnimationStateRef.current) {
          oppositeSideAnimationStateRef.current = null;
        }
        
        console.log(`✅ QuadrilateralComponent ${id} reset complete`);
      }
    };
    
    // Also listen for global reset event
    const handleGlobalReset = (event) => {
      const resetPage = event.detail?.page;
      // Check if component ID matches the page pattern
      if (resetPage && id && id.includes(`page${resetPage}-`)) {
        handlePageStateReset(event);
      }
    };
    
    window.addEventListener('pageStateReset', handlePageStateReset);
    window.addEventListener('globalPageReset', handleGlobalReset);
    
    return () => {
      window.removeEventListener('pageStateReset', handlePageStateReset);
      window.removeEventListener('globalPageReset', handleGlobalReset);
    };
  }, [id, currentPage, currentQuadType, gridRows, gridCols, initialVertices]);

  // State for angle equality animation
  const [angleAnimation, setAngleAnimation] = React.useState(null);
  const angleAnimationRef = React.useRef(null);
  const angleAnimationStateRef = React.useRef(null); // Store state in ref for animation loop
  
  // State for angle sum animation
  const [angleSumAnimation, setAngleSumAnimation] = React.useState(null);
  const angleSumAnimationRef = React.useRef(null);
  
  // Vertex colors after equality tick (so moving arc in sum animation matches static arc color)
  const [equalityVertexColors, setEqualityVertexColors] = React.useState({});
  React.useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const handler = (e) => {
      const { vertexColors } = e.detail || {};
      if (vertexColors && typeof vertexColors === 'object') {
        setEqualityVertexColors((prev) => ({ ...prev, ...vertexColors }));
      }
    };
    container.addEventListener('angleMarkersEqualityUpdated', handler);
    return () => container.removeEventListener('angleMarkersEqualityUpdated', handler);
  }, []);
  
  // When supplementary angle animation runs: hide angle measurement labels (they are DOM nodes added by sequence)
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const container = containerRef?.current;
    if (!container) return;
    const labels = container.querySelectorAll('.angle-measurement-label');
    labels.forEach((el) => {
      el.style.display = angleSumAnimation ? 'none' : '';
    });
  }, [angleSumAnimation]);
  
  // State for side equality animation
  const [sideEqualityAnimation, setSideEqualityAnimation] = React.useState(null);
  const sideEqualityAnimationRef = React.useRef(null);
  
  // State for opposite side equality animation
  const [oppositeSideAnimation, setOppositeSideAnimation] = React.useState(null);
  const oppositeSideAnimationRef = React.useRef(null);
  const oppositeSideAnimationStateRef = React.useRef(null); // Store state in ref for animation loop
  
  // State for diagonal equality animation
  const [diagonalEqualityAnimation, setDiagonalEqualityAnimation] = React.useState(null);
  const diagonalEqualityAnimationRef = React.useRef(null);
  const diagonalEqualityAnimationStateRef = React.useRef(null);
  const diagonalEqualityInitialTimeoutRef = React.useRef(null); // First frame kicked via setTimeout(0)
  const diagonalEqualityLoopRef = React.useRef(null); // Store loop function to prevent recreation
  
  // State for diagonal bisection animation
  const [diagonalBisectionAnimation, setDiagonalBisectionAnimation] = React.useState(null);
  const diagonalBisectionAnimationRef = React.useRef(null);
  
  // State for diagonal perpendicular bisection animation
  const [diagonalPerpendicularAnimation, setDiagonalPerpendicularAnimation] = React.useState(null);
  const diagonalPerpendicularAnimationRef = React.useRef(null);
  
  // State for parallel lines animation
  const [parallelLinesAnimation, setParallelLinesAnimation] = React.useState(null);
  const parallelLinesAnimationRef = React.useRef(null);
  const parallelLinesAnimationStateRef = React.useRef(null); // Store state in ref for animation loop
  
  // State for symmetry fold animation
  const [symmetryFoldAnimation, setSymmetryFoldAnimation] = React.useState(null);
  const symmetryFoldAnimationRef = React.useRef(null);
  const symmetryFoldLogRef = React.useRef({ atDiagonal: null, atEnd: null });
  const symmetryFoldCoordLogRef = React.useRef({ atStart: null, atDiagonal: null, atEnd: null });
  
  // State for rotational symmetry animation
  const [rotationalSymmetryAnimation, setRotationalSymmetryAnimation] = React.useState(null);
  const rotationalSymmetryAnimationRef = React.useRef(null);
  
  // State for diagonal angle bisection animation (diagonals bisect interior angles)
  const [diagonalAngleBisectionAnimation, setDiagonalAngleBisectionAnimation] = React.useState(null);
  const diagonalAngleBisectionAnimationRef = React.useRef(null);

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
      // Fixed semicircle radius (matches renderAnimatedAngleSumArcs viewBox units)
      const semicircleRadius = 60;
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
  }, [angleSumAnimation]);

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
  const animateAngleEquality = React.useCallback((sourceVertexIndex, targetVertexIndex, duration = animationDuration, onComplete) => {
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
    const animationState = {
      sourceVertexIndex,
      targetVertexIndex,
      onComplete, // Store the callback
      startTime,
      duration,
      progress: 0,
      isComplete: false
    };
    
    // Store state in ref immediately
    angleAnimationStateRef.current = animationState;
    setAngleAnimation(animationState);

    console.log('📊 Angle equality animation state set, triggering useEffect to start loop');
  }, [angles, animationDuration, animationHoldTime]);

  // useEffect to run angle equality animation loop when animation state changes
  React.useEffect(() => {
    if (!angleAnimation || !angleAnimationStateRef.current) {
      return;
    }


    const startTime = angleAnimationStateRef.current.startTime;
    const duration = angleAnimationStateRef.current.duration;

    const animate = () => {
      if (!angleAnimationRef.current || !angleAnimationStateRef.current) {
        return;
      }

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const isComplete = progress >= 1;

      if (isComplete) {
        const callback = angleAnimationStateRef.current?.onComplete;
        angleAnimationStateRef.current = null;
        setAngleAnimation(null);
        if (angleAnimationRef.current) {
          cancelAnimationFrame(angleAnimationRef.current);
          angleAnimationRef.current = null;
        }

        if (typeof callback === 'function') {
          console.log('✅ Calling onComplete callback for angle equality animation');
          callback();
        } else {
          console.warn('⚠️ onComplete callback not found or not a function');
        }

        return;
      }

      const currentState = angleAnimationStateRef.current;
      if (currentState) {
        const newState = {
          ...currentState,
          progress,
          isComplete: false,
          blinkStartTime: isComplete && !currentState.isComplete ? Date.now() : currentState.blinkStartTime
        };
        angleAnimationStateRef.current = newState;
        setAngleAnimation(newState);
      }

      angleAnimationRef.current = requestAnimationFrame(animate);
    };

    angleAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (angleAnimationRef.current) {
        cancelAnimationFrame(angleAnimationRef.current);
        angleAnimationRef.current = null;
      }
    };
  }, [angleAnimation]);

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
  const animateAngleSum = React.useCallback((vertex1Index, vertex2Index, duration = sumAnimationDuration, mode = sumAnimationMode, onComplete = null) => {
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
    const extensionDelayMs = duration * sumExtensionFirstRatio;
    const arcMoveDuration = Math.max(duration - extensionDelayMs, 1);
    setAngleSumAnimation({
      vertex1Index,
      vertex2Index,
      startTime,
      duration,
      mode,
      progress: 0,
      rawProgress: 0,
      angle1,
      angle2,
      sum,
      onComplete,
      extensionDelayMs
    });


    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // First phase: extension line only (arc stays at source). Second phase: arc moves.
      const arcElapsed = Math.max(0, elapsed - extensionDelayMs);
      const arcProgress = Math.min(arcElapsed / arcMoveDuration, 1);
      const easedProgress = easeInOutCubic(arcProgress);
      
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
        // Call onComplete callback if provided
        if (onComplete && typeof onComplete === 'function') {
          console.log('✅ Calling onComplete callback for angle sum animation');
          onComplete();
        }
      }
    };

    angleSumAnimationRef.current = requestAnimationFrame(animate);
  }, [angles, sumAnimationDuration, sumAnimationMode, sumExtensionFirstRatio]);

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

      // One-shot mode: stop after rotating to side2 and waiting; leave line visible on side2 (do not clear state)
      if (sideStopAfterRotateToSide2 && cycleElapsed >= sideAnimationDuration + sideAnimationWaitTime) {
        sideEqualityAnimationRef.current = null;
        setSideEqualityAnimation(prev => prev ? { ...prev, phase: 'waiting-at-side2', progress: 1 } : null);
        return;
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
  }, [sideAnimationDuration, sideAnimationWaitTime, sideAnimationCycles, sideStopAfterRotateToSide2]);

  /**
   * Function to stop the opposite side equality animation
   */
  const stopOppositeSideAnimation = React.useCallback(() => {
    if (oppositeSideAnimationRef.current) {
      cancelAnimationFrame(oppositeSideAnimationRef.current);
      oppositeSideAnimationRef.current = null;
    }
    oppositeSideAnimationStateRef.current = null;
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
    
    const animationState = {
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
    };
    
    // Store state in ref immediately
    oppositeSideAnimationStateRef.current = animationState;
    setOppositeSideAnimation(animationState);

    console.log('📊 Opposite side equality animation state set, triggering useEffect to start loop');
  }, [oppositeSideAnimationDuration, oppositeSideAnimationWaitTime, oppositeSideAnimationCycles]);

  // useEffect to run opposite side animation loop when animation state changes
  React.useEffect(() => {
    if (!oppositeSideAnimation || !oppositeSideAnimationStateRef.current) {
      return;
    }


    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startTime = oppositeSideAnimationStateRef.current.startTime;
    const totalCycleDuration = oppositeSideAnimationStateRef.current.totalCycleDuration;
    const currentPairIndex = oppositeSideAnimationStateRef.current.pairIndex;
    const animateBothPairs = oppositeSideAnimationStateRef.current.animateBothPairs;

    const animate = () => {
      if (!oppositeSideAnimationRef.current || !oppositeSideAnimationStateRef.current) {
        return;
      }

      const elapsed = Date.now() - startTime;
      const fullCycle = totalCycleDuration * 2;
      const pairsMultiplier = animateBothPairs ? 2 : 1;
      const totalCyclesForBothPairs = fullCycle * pairsMultiplier;
      const currentFullCycle = Math.floor(elapsed / totalCyclesForBothPairs);
      const cycleElapsed = elapsed % totalCyclesForBothPairs;

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

      // Check maxCycles from the state ref, not the closure variable
      const maxCycles = oppositeSideAnimationStateRef.current?.maxCycles ?? oppositeSideAnimationCycles;
      if (maxCycles >= 0 && currentFullCycle >= maxCycles) {
        console.log('✅ Opposite side animation complete', { currentFullCycle, maxCycles });
        oppositeSideAnimationStateRef.current = null;
        setOppositeSideAnimation(null);
        if (oppositeSideAnimationRef.current) {
          cancelAnimationFrame(oppositeSideAnimationRef.current);
          oppositeSideAnimationRef.current = null;
        }
        return;
      }

      let phase, progress;
      if (pairCycleElapsed < oppositeSideAnimationDuration) {
        phase = 'translating-to-opposite';
        progress = easeInOutCubic(pairCycleElapsed / oppositeSideAnimationDuration);
      } else if (pairCycleElapsed < oppositeSideAnimationDuration + oppositeSideAnimationWaitTime) {
        phase = 'waiting-at-opposite';
        progress = 1;
      } else if (pairCycleElapsed < oppositeSideAnimationDuration * 2 + oppositeSideAnimationWaitTime) {
        phase = 'translating-back';
        const translateBackElapsed = pairCycleElapsed - (oppositeSideAnimationDuration + oppositeSideAnimationWaitTime);
        progress = 1 - easeInOutCubic(translateBackElapsed / oppositeSideAnimationDuration);
      } else {
        phase = 'waiting-at-source';
        progress = 0;
      }

      const currentState = oppositeSideAnimationStateRef.current;
      if (currentState) {
        const newState = {
          ...currentState,
          pairIndex: activePairIndex,
          currentCycle: currentFullCycle,
          phase,
          progress
        };
        oppositeSideAnimationStateRef.current = newState;
        setOppositeSideAnimation(newState);
      }

      oppositeSideAnimationRef.current = requestAnimationFrame(animate);
    };

    oppositeSideAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (oppositeSideAnimationRef.current) {
        cancelAnimationFrame(oppositeSideAnimationRef.current);
        oppositeSideAnimationRef.current = null;
      }
    };
  }, [oppositeSideAnimation, oppositeSideAnimationDuration, oppositeSideAnimationWaitTime, oppositeSideAnimationCycles]);

  /**
   * Function to stop the diagonal equality animation
   */
  const stopDiagonalEqualityAnimation = React.useCallback(() => {
    if (diagonalEqualityInitialTimeoutRef.current) {
      clearTimeout(diagonalEqualityInitialTimeoutRef.current);
      diagonalEqualityInitialTimeoutRef.current = null;
    }
    if (diagonalEqualityAnimationRef.current) {
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
      diagonalEqualityAnimationRef.current = null;
    }
    diagonalEqualityAnimationStateRef.current = null;
    diagonalEqualityLoopRef.current = null;
    setDiagonalEqualityAnimation(null);
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
    console.log('📊 Animation config:', {
      duration: diagonalEqualityDuration,
      waitTime: diagonalEqualityWaitTime,
      cycles: diagonalEqualityCycles
    });

    if (diagonalEqualityAnimationRef.current) {
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
      diagonalEqualityAnimationRef.current = null;
    }

    const startTime = Date.now();
    const totalCycleDuration = diagonalEqualityDuration + diagonalEqualityWaitTime;
    const durationMs = diagonalEqualityDuration;
    const waitTimeMs = diagonalEqualityWaitTime;
    const cycles = diagonalEqualityCycles >= 0 ? Math.max(1, diagonalEqualityCycles) : 1;

    const animationState = {
      startTime,
      translationDuration: durationMs,
      waitTime: waitTimeMs,
      totalCycleDuration,
      maxCycles: diagonalEqualityCycles,
      currentCycle: 0,
      phase: 'translating-to-target',
      progress: 0
    };

    console.log('📊 Setting diagonal equality animation state...', animationState);

    diagonalEqualityAnimationStateRef.current = animationState;
    setDiagonalEqualityAnimation(animationState);

    const quadId = id || `${elementName}-${currentPage}`;
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Use frame-based elapsed time so backgrounded tabs (rAF throttled) don't complete immediately
    let animationElapsedMs = 0;
    let lastRafTime = null;

    let frameCount = 0;
    
    // Define loop function and store in ref so it persists across re-renders
    const loop = (rafTime) => {
      const stateNow = diagonalEqualityAnimationStateRef.current;
      if (!stateNow) {
        diagonalEqualityAnimationRef.current = null;
        diagonalEqualityLoopRef.current = null;
        return;
      }

      if (lastRafTime != null) {
        animationElapsedMs += Math.min(rafTime - lastRafTime, 100);
      }
      lastRafTime = rafTime;
      frameCount += 1;

      const elapsed = animationElapsedMs;
      const fullCycle = totalCycleDuration * 2;
      const currentFullCycle = fullCycle > 0 ? Math.floor(elapsed / fullCycle) : 0;
      const cycleElapsed = fullCycle > 0 ? elapsed % fullCycle : 0;

      const MIN_ELAPSED_MS = 5000;
      const minElapsedToComplete = Math.max(MIN_ELAPSED_MS, fullCycle * cycles);
      const canComplete = diagonalEqualityCycles >= 0 && currentFullCycle >= diagonalEqualityCycles && elapsed >= minElapsedToComplete;

      if (canComplete) {
        diagonalEqualityAnimationStateRef.current = null;
        setDiagonalEqualityAnimation(null);
        if (diagonalEqualityAnimationRef.current) {
          cancelAnimationFrame(diagonalEqualityAnimationRef.current);
          diagonalEqualityAnimationRef.current = null;
        }
        diagonalEqualityLoopRef.current = null;
        window.dispatchEvent(new CustomEvent('diagonalEqualityAnimationComplete', { detail: { quadId } }));
        return;
      }

      let phase, progress;
      if (cycleElapsed < durationMs) {
        phase = 'translating-to-target';
        progress = easeInOutCubic(cycleElapsed / durationMs);
      } else if (cycleElapsed < durationMs + waitTimeMs) {
        phase = 'waiting-at-target';
        progress = 1;
      } else if (cycleElapsed < durationMs * 2 + waitTimeMs) {
        phase = 'translating-back';
        const translateBackElapsed = cycleElapsed - (durationMs + waitTimeMs);
        progress = 1 - easeInOutCubic(translateBackElapsed / durationMs);
      } else {
        phase = 'waiting-at-source';
        progress = 0;
      }

      const newState = { ...stateNow, currentCycle: currentFullCycle, phase, progress };
      diagonalEqualityAnimationStateRef.current = newState;
      setDiagonalEqualityAnimation(newState);

      const nextFrameId = requestAnimationFrame(diagonalEqualityLoopRef.current);
      diagonalEqualityAnimationRef.current = nextFrameId;
    };
    
    // Store loop in ref so it persists
    diagonalEqualityLoopRef.current = loop;

    // Kick first frame: use both setTimeout and double-rAF so one of them runs (rAF can be throttled when tab backgrounded)
    const hasPerformanceNow = typeof performance !== 'undefined' && typeof performance.now === 'function';
    const firstFrameTime = hasPerformanceNow ? performance.now() : startTime;
    let firstFrameScheduled = false;
    const runFirstFrame = (source) => {
      if (firstFrameScheduled) return;
      firstFrameScheduled = true;
      if (diagonalEqualityInitialTimeoutRef.current) {
        clearTimeout(diagonalEqualityInitialTimeoutRef.current);
        diagonalEqualityInitialTimeoutRef.current = null;
      }
      const hasState = !!diagonalEqualityAnimationStateRef.current;
      if (hasState && diagonalEqualityLoopRef.current) {
        diagonalEqualityLoopRef.current(firstFrameTime);
      }
    };
    diagonalEqualityInitialTimeoutRef.current = setTimeout(() => runFirstFrame('setTimeout'), 50);
    requestAnimationFrame(() => requestAnimationFrame((t) => runFirstFrame('rAF')));
  }, [diagonalEqualityDuration, diagonalEqualityWaitTime, diagonalEqualityCycles, id, elementName, currentPage]);

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
    console.log('🎬 Starting diagonal bisection animation (rotation-based)');

    // Cancel any existing animation
    if (diagonalBisectionAnimationRef.current) {
      cancelAnimationFrame(diagonalBisectionAnimationRef.current);
    }

    const startTime = Date.now();
    // One cycle = rotate to other half (e.g. BO→OD) + rotate back (OD→BO) + hold
    const singleCycleDuration = diagonalBisectionDuration * 2 + diagonalBisectionWaitTime;
    const partDuration = singleCycleDuration * diagonalBisectionCycles;
    const totalDuration = partDuration * 2;
    
    let acHoldingEventDispatched = false;
    let bdHoldingEventDispatched = false;
    
    setDiagonalBisectionAnimation({
      startTime,
      rotateDuration: diagonalBisectionDuration,
      waitTime: diagonalBisectionWaitTime,
      partDuration,
      totalDuration,
      currentDiagonal: 'ac',
      phase: 'rotating',
      cyclePhase: 'to', // 'to' | 'back' | 'holding'
      progress: 0
    });

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const quadId = id || `${elementName}-${currentPage}`;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= totalDuration) {
        setDiagonalBisectionAnimation(null);
        diagonalBisectionAnimationRef.current = null;
        window.dispatchEvent(new CustomEvent('diagonalBisectionAnimationComplete', { detail: { quadId } }));
        return;
      }
      
      let currentDiagonal, phase, cyclePhase, progress;
      
      if (elapsed < partDuration) {
        currentDiagonal = 'ac';
        const partElapsed = elapsed;
        const cycleElapsed = partElapsed % singleCycleDuration;
        
        if (cycleElapsed < diagonalBisectionDuration) {
          phase = 'rotating';
          cyclePhase = 'to';
          progress = easeInOutCubic(cycleElapsed / diagonalBisectionDuration);
        } else if (cycleElapsed < diagonalBisectionDuration * 2) {
          phase = 'rotating';
          cyclePhase = 'back';
          progress = easeInOutCubic((cycleElapsed - diagonalBisectionDuration) / diagonalBisectionDuration);
          if (!acHoldingEventDispatched) {
            acHoldingEventDispatched = true;
            window.dispatchEvent(new CustomEvent('diagonalBisectionACProven', { detail: { quadId } }));
          }
        } else {
          phase = 'holding';
          cyclePhase = 'holding';
          progress = 0;
        }
      } else {
        currentDiagonal = 'bd';
        const partElapsed = elapsed - partDuration;
        const cycleElapsed = partElapsed % singleCycleDuration;
        
        if (cycleElapsed < diagonalBisectionDuration) {
          phase = 'rotating';
          cyclePhase = 'to';
          progress = easeInOutCubic(cycleElapsed / diagonalBisectionDuration);
        } else if (cycleElapsed < diagonalBisectionDuration * 2) {
          phase = 'rotating';
          cyclePhase = 'back';
          progress = easeInOutCubic((cycleElapsed - diagonalBisectionDuration) / diagonalBisectionDuration);
          if (!bdHoldingEventDispatched) {
            bdHoldingEventDispatched = true;
            window.dispatchEvent(new CustomEvent('diagonalBisectionBDProven', { detail: { quadId } }));
          }
        } else {
          phase = 'holding';
          cyclePhase = 'holding';
          progress = 0;
        }
      }
      
      setDiagonalBisectionAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          currentDiagonal,
          phase,
          cyclePhase,
          progress
        };
      });

      diagonalBisectionAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalBisectionAnimationRef.current = requestAnimationFrame(animate);
  }, [diagonalBisectionDuration, diagonalBisectionWaitTime, diagonalBisectionCycles, id, elementName, currentPage]);

  /**
   * Function to stop the rotational symmetry animation
   */
  const stopRotationalSymmetryAnimation = React.useCallback(() => {
    if (rotationalSymmetryAnimationRef.current) {
      cancelAnimationFrame(rotationalSymmetryAnimationRef.current);
      rotationalSymmetryAnimationRef.current = null;
    }
    setRotationalSymmetryAnimation(null);
    console.log('🛑 Rotational symmetry animation stopped');
  }, []);

  /**
   * Function to trigger rotational symmetry animation
   * Rotates a dashed overlay shape around the centroid, pausing when it matches the original
   * 
   * @example
   * quadComponent.animateRotationalSymmetry();
   * quadComponent.stopRotationalSymmetryAnimation();
   */
  const animateRotationalSymmetry = React.useCallback(() => {
    console.log('🎬 Starting rotational symmetry animation');

    if (rotationalSymmetryAnimationRef.current) {
      cancelAnimationFrame(rotationalSymmetryAnimationRef.current);
    }

    const startTime = Date.now();
    // Rotational order from shape config: square → 4 (90,180,270,360), rectangle/parallelogram → 2 (180,360), etc.
    const config = typeof window.QuadrilateralConfig !== 'undefined' ? window.QuadrilateralConfig.getConfig(currentQuadType) : null;
    const order = (config && config.properties && config.properties.rotationalSymmetry != null)
      ? config.properties.rotationalSymmetry
      : 2;
    const matchAngles = order >= 1 ? Array.from({ length: order }, (_, i) => (i + 1) * (360 / order)) : [360];
    const quadId = id || `${elementName}-${currentPage}`;
    
    // Total time excluding pauses
    const rotationDuration = rotationalSymmetryDuration;
    // Total time including pauses at each match angle
    const totalDuration = rotationDuration + (rotationalSymmetryPauseDuration * matchAngles.length);
    console.log('[RotSymmetry] start', { quadId, rotationDuration, pauseDuration: rotationalSymmetryPauseDuration, totalDuration, matchAngles, order });
    
    setRotationalSymmetryAnimation({
      startTime,
      rotationDuration,
      pauseDuration: rotationalSymmetryPauseDuration,
      totalDuration,
      currentAngle: 0,
      phase: 'rotating',
      matchAngles,
      currentMatchIndex: -1
    });

    const dispatchedMatchIndices = new Set(); // Dispatch match event once per angle, outside setState

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= totalDuration) {
        console.log('[RotSymmetry] animation finished, dispatching rotationalSymmetryAnimationComplete', { quadId, elapsed, totalDuration });
        setRotationalSymmetryAnimation(null);
        rotationalSymmetryAnimationRef.current = null;
        window.dispatchEvent(new CustomEvent('rotationalSymmetryAnimationComplete', { 
          detail: { quadId, order }
        }));
        console.log('✅ Rotational symmetry animation complete');
        return;
      }
      
      let currentAngle, phase, matchIndex = -1;
      
      // Time spent in previous pauses (so rotation progress is based on "active" time only)
      let pauseTimeAccumulated = 0;
      
      // Check if we're in a pause (pause at exact times so angle and timing stay in sync)
      for (let i = 0; i < matchAngles.length; i++) {
        const angleProgress = matchAngles[i] / 360;
        const timeToReachAngle = rotationDuration * angleProgress;
        const pauseStartTime = timeToReachAngle + (i * rotationalSymmetryPauseDuration);
        const pauseEndTime = pauseStartTime + rotationalSymmetryPauseDuration;
        
        if (elapsed >= pauseStartTime && elapsed < pauseEndTime) {
          // We're in a pause — hold exactly at this match angle
          currentAngle = matchAngles[i];
          phase = 'paused';
          matchIndex = i;
          
          // Dispatch match event once per angle (outside setState so listener runs reliably)
          if (!dispatchedMatchIndices.has(matchIndex)) {
            dispatchedMatchIndices.add(matchIndex);
            console.log('[RotSymmetry] dispatching rotationalSymmetryMatch', { quadId, angle: currentAngle, matchIndex });
            window.dispatchEvent(new CustomEvent('rotationalSymmetryMatch', {
              detail: { quadId, angle: currentAngle, matchIndex }
            }));
          }
          
          setRotationalSymmetryAnimation(prev => {
            if (!prev) return null;
            return { ...prev, currentAngle, phase, currentMatchIndex: matchIndex };
          });
          
          rotationalSymmetryAnimationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        if (elapsed >= pauseEndTime) {
          pauseTimeAccumulated += rotationalSymmetryPauseDuration;
        }
      }
      
      // We're rotating: use linear progress so we hit each match angle exactly when we pause (no overshoot/snap)
      const adjustedElapsed = elapsed - pauseTimeAccumulated;
      const progress = Math.min(adjustedElapsed / rotationDuration, 1);
      currentAngle = progress * 360;
      phase = 'rotating';
      
      setRotationalSymmetryAnimation(prev => {
        if (!prev) return null;
        return { ...prev, currentAngle, phase, currentMatchIndex: -1 };
      });

      rotationalSymmetryAnimationRef.current = requestAnimationFrame(animate);
    };

    rotationalSymmetryAnimationRef.current = requestAnimationFrame(animate);
  }, [rotationalSymmetryDuration, rotationalSymmetryPauseDuration, id, elementName, currentPage, currentQuadType]);

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
   * Function to stop the diagonal angle bisection animation
   */
  const stopDiagonalAngleBisectionAnimation = React.useCallback(() => {
    if (diagonalAngleBisectionAnimationRef.current) {
      cancelAnimationFrame(diagonalAngleBisectionAnimationRef.current);
      diagonalAngleBisectionAnimationRef.current = null;
    }
    setDiagonalAngleBisectionAnimation(null);
    console.log('🛑 Diagonal angle bisection animation stopped');
  }, []);

  /**
   * Function to trigger diagonal angle bisection animation
   * Demonstrates that a diagonal bisects the interior angles at its endpoints.
   * At each vertex along the diagonal, one half-angle arc rotates to overlay on the other.
   * 
   * @param {number} diagonalIndex - Which diagonal (0 = AC, 1 = BD)
   * @param {Function} onComplete - Callback when animation completes
   * 
   * @example
   * // Animate diagonal AC bisecting angles at A and C
   * window.animateDiagonalAngleBisection_myQuad(0);
   * // Animate diagonal BD bisecting angles at B and D
   * window.animateDiagonalAngleBisection_myQuad(1);
   * // Or use the helper method:
   * quadComponent.animateDiagonalAngleBisection(0, () => console.log('done'));
   */
  const animateDiagonalAngleBisection = React.useCallback((diagonalIndex, onComplete) => {
    console.log('[DiagonalAngleBisection] START', { diagonalIndex, quadId: id || `${elementName}-${currentPage}` });
    
    // Validate diagonalIndex (0 = AC, 1 = BD)
    if (diagonalIndex !== 0 && diagonalIndex !== 1) {
      console.warn('❌ Invalid diagonal index for angle bisection animation (must be 0 or 1)');
      return;
    }

    // Cancel any existing animation
    if (diagonalAngleBisectionAnimationRef.current) {
      cancelAnimationFrame(diagonalAngleBisectionAnimationRef.current);
    }

    const quadId = id || `${elementName}-${currentPage}`;
    const startTime = Date.now();
    
    // Determine the two vertices for this diagonal
    // Diagonal 0 (AC): vertices 0 and 2
    // Diagonal 1 (BD): vertices 1 and 3
    const vertex1Index = diagonalIndex === 0 ? 0 : 1;
    const vertex2Index = diagonalIndex === 0 ? 2 : 3;
    
    // Duration for one vertex animation (rotate + hold)
    const vertexAnimationDuration = diagonalAngleBisectionDuration + diagonalAngleBisectionWaitTime;
    // Duration for both vertices (sequential)
    const totalDuration = vertexAnimationDuration * 2 * diagonalAngleBisectionCycles;

    const initialState = {
      startTime,
      diagonalIndex,
      vertex1Index,
      vertex2Index,
      rotateDuration: diagonalAngleBisectionDuration,
      waitTime: diagonalAngleBisectionWaitTime,
      totalCycles: diagonalAngleBisectionCycles,
      currentCycle: 0,
      currentVertex: vertex1Index,
      phase: 'rotating', // 'rotating', 'holding'
      progress: 0
    };
    console.log('[DiagonalAngleBisection] setState initial', { currentVertex: vertex1Index, phase: 'rotating', progress: 0 });
    setDiagonalAngleBisectionAnimation(initialState);

    let vertex1HoldEventDispatched = false;
    let vertex2HoldEventDispatched = false;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= totalDuration) {
        console.log('✅ Diagonal angle bisection animation complete');
        setDiagonalAngleBisectionAnimation(null);
        diagonalAngleBisectionAnimationRef.current = null;
        window.dispatchEvent(new CustomEvent('diagonalAngleBisectionAnimationComplete', { 
          detail: { quadId, diagonalIndex } 
        }));
        if (typeof onComplete === 'function') {
          onComplete();
        }
        return;
      }

      // Calculate which cycle and which part we're in
      const cycleTime = vertexAnimationDuration * 2; // Time for one full cycle (both vertices)
      const currentCycle = Math.floor(elapsed / cycleTime);
      const cycleElapsed = elapsed % cycleTime;
      
      // Determine current vertex and phase
      let currentVertexIndex, phase, progress;
      
      if (cycleElapsed < vertexAnimationDuration) {
        // First vertex
        currentVertexIndex = vertex1Index;
        const vertexElapsed = cycleElapsed;
        
        if (vertexElapsed < diagonalAngleBisectionDuration) {
          phase = 'rotating';
          progress = easeInOutCubic(vertexElapsed / diagonalAngleBisectionDuration);
        } else {
          phase = 'holding';
          progress = 1;
          if (!vertex1HoldEventDispatched) {
            vertex1HoldEventDispatched = true;
            window.dispatchEvent(new CustomEvent('diagonalAngleBisectionVertexProven', { 
              detail: { quadId, diagonalIndex, vertexIndex: vertex1Index } 
            }));
          }
        }
      } else {
        // Second vertex
        currentVertexIndex = vertex2Index;
        const vertexElapsed = cycleElapsed - vertexAnimationDuration;
        
        if (vertexElapsed < diagonalAngleBisectionDuration) {
          phase = 'rotating';
          progress = easeInOutCubic(vertexElapsed / diagonalAngleBisectionDuration);
        } else {
          phase = 'holding';
          progress = 1;
          if (!vertex2HoldEventDispatched) {
            vertex2HoldEventDispatched = true;
            window.dispatchEvent(new CustomEvent('diagonalAngleBisectionVertexProven', { 
              detail: { quadId, diagonalIndex, vertexIndex: vertex2Index } 
            }));
          }
        }
      }

      const nextState = {
        currentCycle,
        currentVertex: currentVertexIndex,
        phase,
        progress
      };
      if (progress === 0 || progress >= 0.99 || phase === 'holding') {
        console.log('[DiagonalAngleBisection] animate loop', nextState);
      }
      setDiagonalAngleBisectionAnimation(prev => {
        if (!prev) return null;
        return { ...prev, ...nextState };
      });

      diagonalAngleBisectionAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalAngleBisectionAnimationRef.current = requestAnimationFrame(animate);
  }, [diagonalAngleBisectionDuration, diagonalAngleBisectionWaitTime, diagonalAngleBisectionCycles, id, elementName, currentPage]);

  /**
   * Function to stop the parallel lines animation
   */
  const stopParallelLinesAnimation = React.useCallback(() => {
    if (parallelLinesAnimationRef.current) {
      cancelAnimationFrame(parallelLinesAnimationRef.current);
      parallelLinesAnimationRef.current = null;
    }
    parallelLinesAnimationStateRef.current = null;
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
  const animateParallelLines = React.useCallback((pairIndex, onComplete) => {
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
    
    const animationState = {
      pairIndex,
      onComplete, // Store the callback
      startTime,
      moveDuration: parallelLinesDuration,
      waitTime: parallelLinesWaitTime,
      halfCycleDuration,
      totalCycles: parallelLinesCycles, // Renamed from maxCycles to totalCycles for consistency
      currentCycle: 0,
      phase: 'moving-forward', // 'moving-forward', 'waiting-forward', 'moving-backward', 'waiting-backward'
      progress: 0 // -0.5 to 0.5, where 0 is original position
    };
    
    // Store state in ref immediately
    parallelLinesAnimationStateRef.current = animationState;
    setParallelLinesAnimation(animationState);

    console.log('📊 Parallel lines animation state set, triggering useEffect to start loop');
  }, [parallelLinesDuration, parallelLinesWaitTime, parallelLinesCycles, id, elementName, currentPage]);

  // useEffect to run parallel lines animation loop when animation state changes
  React.useEffect(() => {
    if (!parallelLinesAnimation || !parallelLinesAnimationStateRef.current) {
      return;
    }


    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startTime = parallelLinesAnimationStateRef.current.startTime;
    const halfCycleDuration = parallelLinesAnimationStateRef.current.halfCycleDuration;
    const totalCycles = parallelLinesAnimationStateRef.current.totalCycles;
    const pairIndex = parallelLinesAnimationStateRef.current.pairIndex;
    const onComplete = parallelLinesAnimationStateRef.current.onComplete;

    let returningToCenter = false;
    let returnToCenterStartTime = null;
    let returnToCenterStartProgress = null;

    const animate = () => {
      if (!parallelLinesAnimationRef.current || !parallelLinesAnimationStateRef.current) {
        return;
      }

      const elapsed = Date.now() - startTime;
      const halfCycleIndex = Math.floor(elapsed / halfCycleDuration);
      const halfCycleElapsed = elapsed % halfCycleDuration;
      const fullOscillationCycles = Math.floor(halfCycleIndex / 2);
      
      let phase, progress;
      const isEvenHalfCycle = halfCycleIndex % 2 === 0;

      if (!returningToCenter && parallelLinesCycles >= 0 && fullOscillationCycles >= parallelLinesCycles) {
        let currentProgress;
        if (halfCycleElapsed < parallelLinesDuration) {
          const t = easeInOutCubic(halfCycleElapsed / parallelLinesDuration);
          if (halfCycleIndex === 0) {
            currentProgress = t * 0.5;
          } else if (isEvenHalfCycle) {
            currentProgress = -0.5 + t;
          } else {
            currentProgress = 0.5 - t;
          }
        } else {
          if (halfCycleIndex === 0 || isEvenHalfCycle) {
            currentProgress = 0.5;
          } else {
            currentProgress = -0.5;
          }
        }

        if (Math.abs(currentProgress) > 0.01) {
          returningToCenter = true;
          returnToCenterStartTime = Date.now();
          returnToCenterStartProgress = currentProgress;
          console.log('🔄 Animation cycles complete, returning to center from progress:', currentProgress);
        } else {
          console.log('✅ Parallel lines animation complete (at center)');
          const callback = parallelLinesAnimationStateRef.current?.onComplete;
          parallelLinesAnimationStateRef.current = null;
          setParallelLinesAnimation(null);
          if (parallelLinesAnimationRef.current) {
            cancelAnimationFrame(parallelLinesAnimationRef.current);
            parallelLinesAnimationRef.current = null;
          }

          if (typeof callback === 'function') {
            console.log('📞 Calling onComplete callback for parallel lines animation');
            callback();
          } else {
            console.warn('⚠️ onComplete callback not found or not a function');
          }

          const quadId = id || `${elementName}-${currentPage}`;
          window.dispatchEvent(new CustomEvent('parallelLinesAnimationComplete', {
            detail: { quadId, pairIndex }
          }));

          return;
        }
      }

      if (returningToCenter) {
        const returnElapsed = Date.now() - returnToCenterStartTime;
        const returnDuration = parallelLinesDuration;
        const returnT = Math.min(returnElapsed / returnDuration, 1);
        const easedT = easeInOutCubic(returnT);

        progress = returnToCenterStartProgress * (1 - easedT);
        phase = progress > 0 ? 'returning-to-center-forward' : 'returning-to-center-backward';

        if (returnT >= 1 || Math.abs(progress) < 0.01) {
          progress = 0;
          phase = 'at-center';

          console.log('✅ Parallel lines animation complete (returned to center)');
          const callback = parallelLinesAnimationStateRef.current?.onComplete;
          parallelLinesAnimationStateRef.current = null;
          setParallelLinesAnimation(null);
          if (parallelLinesAnimationRef.current) {
            cancelAnimationFrame(parallelLinesAnimationRef.current);
            parallelLinesAnimationRef.current = null;
          }

          if (typeof callback === 'function') {
            console.log('📞 Calling onComplete callback for parallel lines animation (returned to center)');
            callback();
          } else {
            console.warn('⚠️ onComplete callback not found or not a function (returned to center)');
          }

          const quadId = id || `${elementName}-${currentPage}`;
          window.dispatchEvent(new CustomEvent('parallelLinesAnimationComplete', {
            detail: { quadId, pairIndex }
          }));

          return;
        }
      } else {
        if (halfCycleElapsed < parallelLinesDuration) {
          const t = easeInOutCubic(halfCycleElapsed / parallelLinesDuration);

          if (halfCycleIndex === 0) {
            phase = 'moving-forward';
            progress = t * 0.5;
          } else if (isEvenHalfCycle) {
            phase = 'moving-forward';
            progress = -0.5 + t;
          } else {
            phase = 'moving-backward';
            progress = 0.5 - t;
          }
        } else {
          if (halfCycleIndex === 0 || isEvenHalfCycle) {
            phase = 'waiting-forward';
            progress = 0.5;
          } else {
            phase = 'waiting-backward';
            progress = -0.5;
          }
        }
      }

      const currentState = parallelLinesAnimationStateRef.current;
      if (!currentState) {
        if (parallelLinesAnimationRef.current) {
          cancelAnimationFrame(parallelLinesAnimationRef.current);
          parallelLinesAnimationRef.current = null;
        }
        setParallelLinesAnimation(null);
        return;
      }

      const newState = {
        ...currentState,
        currentCycle: fullOscillationCycles,
        phase,
        progress
      };

      parallelLinesAnimationStateRef.current = newState;
      setParallelLinesAnimation(newState);

      parallelLinesAnimationRef.current = requestAnimationFrame(animate);
    };

    parallelLinesAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (parallelLinesAnimationRef.current) {
        cancelAnimationFrame(parallelLinesAnimationRef.current);
        parallelLinesAnimationRef.current = null;
      }
    };
  }, [parallelLinesAnimation, parallelLinesDuration, parallelLinesWaitTime, parallelLinesCycles, id, elementName, currentPage]);

  /**
   * Function to stop the symmetry fold animation
   */
  const stopSymmetryFoldAnimation = React.useCallback(() => {
    if (symmetryFoldAnimationRef.current) {
      cancelAnimationFrame(symmetryFoldAnimationRef.current);
      symmetryFoldAnimationRef.current = null;
    }
    setSymmetryFoldAnimation(null);
    console.log('🛑 Symmetry fold animation stopped');
  }, []);

  /**
   * Function to trigger symmetry fold animation
   * Demonstrates whether a shape has line symmetry by:
   * 1. Drawing a dashed fold line through the center (vertical or horizontal)
   * 2. Creating a semi-transparent clone of one half
   * 3. Animating the clone with a flip/fold transform
   * 4. Showing the mismatch between the folded half and the other half
   * 
   * @param {string} axis - 'vertical' | 'horizontal' - which axis to fold along
   * @param {Object} options - Animation options
   * @param {number} options.duration - Animation duration in ms (default: 2000)
   * @param {number} options.holdTime - Time to hold at folded position (default: 1500)
   * @param {Function} options.onComplete - Callback when animation finishes
   * 
   * @example
   * // Fold along vertical axis
   * quadComponent.animateSymmetryFold('vertical');
   * // Fold along horizontal axis with callback
   * quadComponent.animateSymmetryFold('horizontal', { onComplete: () => console.log('done') });
   * // Stop the animation:
   * quadComponent.stopSymmetryFoldAnimation();
   */
  const animateSymmetryFold = React.useCallback((axis = 'vertical', options = {}) => {
    console.log('🎬 Symmetry fold animation started', { axis });
    
    // Validate axis
    if (axis !== 'vertical' && axis !== 'horizontal' && axis !== 'diagonal1' && axis !== 'diagonal2') {
      console.warn('❌ Invalid axis for symmetry fold animation (must be "vertical", "horizontal", "diagonal1", or "diagonal2")');
      return;
    }

    // Cancel any existing animation
    if (symmetryFoldAnimationRef.current) {
      cancelAnimationFrame(symmetryFoldAnimationRef.current);
    }

    // Extract config with defaults
    const config = {
      duration: symmetryAnimationConfig.duration || options.duration || 2000,
      holdTime: symmetryAnimationConfig.holdTime || options.holdTime || 1500,
      foldLineColor: symmetryAnimationConfig.foldLineColor || '#FFFFFF',
      foldLineStyle: symmetryAnimationConfig.foldLineStyle || 'dashed',
      foldedHalfColor: symmetryAnimationConfig.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
      mismatchColor: symmetryAnimationConfig.mismatchColor || '#00FFFF',
      onComplete: options.onComplete || null
    };

    const startTime = Date.now();
    symmetryFoldLogRef.current = { atDiagonal: null, atEnd: null };
    // New cycle: Original -> Fold -> Original -> Fold -> Hold
    // Phase 1: Fold (0 to 1) - duration
    // Phase 2: Unfold (1 to 0) - duration  
    // Phase 3: Fold again (0 to 1) - duration
    // Phase 4: Hold at folded (1) - holdTime
    const totalDuration = config.duration + config.duration + config.duration + config.holdTime; // 3*duration + holdTime
    
    setSymmetryFoldAnimation({
      axis,
      startTime,
      config,
      totalDuration,
      phase: 'folding', // 'folding', 'unfolding', 'folding2', 'holding', 'complete'
      progress: 0 // 0 to 1 for fold progress
    });


    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      let phase, progress;
      
      if (elapsed < config.duration) {
        // Phase 1: First fold (0 to 1)
        phase = 'folding';
        progress = easeInOutCubic(elapsed / config.duration);
      } else if (elapsed < config.duration * 2) {
        // Phase 2: Unfold back to original (1 to 0)
        phase = 'unfolding';
        const unfoldElapsed = elapsed - config.duration;
        progress = 1 - easeInOutCubic(unfoldElapsed / config.duration);
      } else if (elapsed < config.duration * 3) {
        // Phase 3: Fold again to other side (0 to 1)
        phase = 'folding2';
        const fold2Elapsed = elapsed - config.duration * 2;
        progress = easeInOutCubic(fold2Elapsed / config.duration);
      } else if (elapsed < totalDuration) {
        // Phase 4: Hold at folded position (1)
        phase = 'holding';
        progress = 1;
      } else {
        // Animation complete
        console.log('✅ Symmetry fold animation complete', { axis });
        setSymmetryFoldAnimation(null);
        symmetryFoldAnimationRef.current = null;
        
        const quadId = id || `${elementName}-${currentPage}`;
        window.dispatchEvent(new CustomEvent('symmetryFoldAnimationComplete', {
          detail: { quadId, axis }
        }));
        
        // After diagonal AC (diagonal1) completes, run the same animation for diagonal BD (diagonal2)
        if (axis === 'diagonal1') {
          const nextOptions = {
            duration: config.duration,
            holdTime: config.holdTime,
            onComplete: config.onComplete || undefined
          };
          setTimeout(() => {
            animateSymmetryFold('diagonal2', nextOptions);
          }, 0);
        } else {
          // Only call caller's onComplete after the last diagonal (BD) finishes
          if (typeof config.onComplete === 'function') {
            config.onComplete();
          }
        }
        
        return;
      }
      
      // Log when fold is at the diagonal (progress ≈ 0.5) and when fold reaches the other end (progress = 1)
      const foldPhase = (phase === 'folding' || phase === 'folding2');
      if (foldPhase && progress >= 0.5 && symmetryFoldLogRef.current.atDiagonal !== phase) {
        symmetryFoldLogRef.current.atDiagonal = phase;
        console.log('📐 Symmetry fold at diagonal', { axis, phase, progress: Math.round(progress * 100) / 100 });
      }
      if (foldPhase && progress >= 0.99 && symmetryFoldLogRef.current.atEnd !== phase) {
        symmetryFoldLogRef.current.atEnd = phase;
        console.log('📐 Symmetry fold reached other end', { axis, phase, progress: 1 });
      }
      
      setSymmetryFoldAnimation(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          phase,
          progress
        };
      });

      symmetryFoldAnimationRef.current = requestAnimationFrame(animate);
    };

    symmetryFoldAnimationRef.current = requestAnimationFrame(animate);
  }, [symmetryAnimationConfig, id, elementName, currentPage]);

  // Calculate diagonal intersection point (used by animateMeasureDiagonalAngle and protractor snap points)
  const diagonalIntersection = React.useMemo(() => {
    const A = vertices[0];
    const B = vertices[1];
    const C = vertices[2];
    const D = vertices[3];
    const x1 = A.col, y1 = A.row;
    const x2 = C.col, y2 = C.row;
    const x3 = B.col, y3 = B.row;
    const x4 = D.col, y4 = D.row;
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 0.0001) return null;
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    return {
      col: x1 + t * (x2 - x1),
      row: y1 + t * (y2 - y1)
    };
  }, [vertices]);

  const animateMeasureDiagonalAngle = React.useCallback(() => {
    if (!diagonalIntersection) {
      console.warn('❌ No diagonal intersection found');
      return;
    }
    const container = containerRef.current;
    if (!container || typeof container.getBoundingClientRect !== 'function') {
      console.warn('❌ Quad container not available for protractor placement');
      return;
    }
    const rect = container.getBoundingClientRect();
    const precisionGridCols = 1600;
    const precisionGridRows = 900;
    const viewW = typeof window !== 'undefined' ? window.innerWidth : precisionGridCols;
    const viewH = typeof window !== 'undefined' ? window.innerHeight : precisionGridRows;
    const localX = (diagonalIntersection.col / gridCols) * rect.width;
    const localY = (diagonalIntersection.row / gridRows) * rect.height;
    const screenX = rect.left + localX;
    const screenY = rect.top + localY;
    const intersectionPrecision = {
      col: (screenX / viewW) * precisionGridCols,
      row: (screenY / viewH) * precisionGridRows
    };
    const C = vertices[2];
    const localCx = (C.col / gridCols) * rect.width;
    const localCy = (C.row / gridRows) * rect.height;
    const screenCx = rect.left + localCx;
    const screenCy = rect.top + localCy;
    const angleACDeg = Math.atan2(screenCy - screenY, screenCx - screenX) * (180 / Math.PI);
    const D = vertices[3];
    const B = vertices[1];
    const localDx = (D.col / gridCols) * rect.width;
    const localDy = (D.row / gridRows) * rect.height;
    const screenDx = rect.left + localDx;
    const screenDy = rect.top + localDy;
    const localBx = (B.col / gridCols) * rect.width;
    const localBy = (B.row / gridRows) * rect.height;
    const screenBx = rect.left + localBx;
    const screenBy = rect.top + localBy;
    const angleToD = Math.atan2(screenDy - screenY, screenDx - screenX) * (180 / Math.PI);
    const angleToB = Math.atan2(screenBy - screenY, screenBx - screenX) * (180 / Math.PI);
    const angleBDDeg = angleToD;
    const I = diagonalIntersection;
    const A = vertices[0];
    const localAx = (A.col / gridCols) * rect.width;
    const localAy = (A.row / gridRows) * rect.height;
    const screenAx = rect.left + localAx;
    const screenAy = rect.top + localAy;
    const dxA = screenAx - screenX;
    const dyA = screenAy - screenY;
    const distToA = Math.sqrt(dxA * dxA + dyA * dyA);
    const angleFromIToAGrid = Math.atan2(A.row - I.row, A.col - I.col) * (180 / Math.PI);
    const angleFromIToBGrid = Math.atan2(B.row - I.row, B.col - I.col) * (180 / Math.PI);
    const angleFromIToCGrid = Math.atan2(C.row - I.row, C.col - I.col) * (180 / Math.PI);
    // Measure angle AOB: baseline = OB, measurement arm = OA (arm aligns with vertex A).
    const baselineRotationDeg = angleFromIToBGrid;
    let armAngleDeg = angleFromIToAGrid - angleFromIToBGrid;
    while (armAngleDeg < -180) armAngleDeg += 360;
    while (armAngleDeg > 180) armAngleDeg -= 360;
    if (armAngleDeg < 0) armAngleDeg = -armAngleDeg;
    const radiusPixels = (100 / precisionGridCols) * viewW;
    const containerSize = radiusPixels * 2.5;
    const armLengthViewBox = (containerSize > 0 && distToA > 0) ? (distToA * 300) / containerSize : 80;
    const angleAC = Math.atan2(C.row - A.row, C.col - A.col) * (180 / Math.PI);
    const angleBD = Math.atan2(D.row - B.row, D.col - B.col) * (180 / Math.PI);
    let angleDiff = Math.abs(angleAC - angleBD);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;
    if (angleDiff > 90) angleDiff = 180 - angleDiff;
    const diagonalAngle = Math.round(angleDiff);

    // Debug: measuring angle AOB — baseline OB, arm to A
    console.log('[MeasureDiagonal] Angle AOB:', {
      baseline: 'OB (ray from O to B)',
      armAlignsWith: 'vertex A',
      angleFromIToBGrid: baselineRotationDeg,
      angleFromIToAGrid,
      armAngleDeg,
      diagonalAngle,
      suppliedToProtractor: { armAngle: armAngleDeg, armLength: armLengthViewBox, protractorRotation: baselineRotationDeg }
    });

    if (typeof window === 'undefined' || !window.spawnProtractorAtVertex || !window.updateProtractor) return;

    const moveDuration = 1000;
    const rotateBodyDuration = 500;
    const rotateArmDuration = 500;
    const delay = 500;
    const offsetRows = 100;
    const initialPosition = {
      col: intersectionPrecision.col,
      row: Math.max(0, intersectionPrecision.row - offsetRows)
    };

    const spawnOptions = {
      protractorType: 'semicircular',
      radius: '100gc',
      color: '#FF6600',
      armColor: '#FF0000',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      showArm: true,
      armAngle: 0,
      armLength: armLengthViewBox,
      snapToDegrees: 1,
      anglePrecision: 0,
      isDraggable: false,
      isRotatable: false,
      isProtractorRotatable: false,
      protractorRotation: 0,
      mode: 'display',
      label: '',
      baseline: { show: false },
      snapPoints: [{ x: intersectionPrecision.col, y: intersectionPrecision.row, label: 'Diagonal intersection' }]
    };

    const protractorId = window.spawnProtractorAtVertex(initialPosition, spawnOptions);
    if (!protractorId) return;

    const easeInOutCubic = (t) => t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const runMoveToIntersection = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / moveDuration);
        const eased = easeInOutCubic(t);
        const col = initialPosition.col + (intersectionPrecision.col - initialPosition.col) * eased;
        const row = initialPosition.row + (intersectionPrecision.row - initialPosition.row) * eased;
        window.updateProtractor(protractorId, { centerPoint: { col, row } });
        if (t < 1) requestAnimationFrame(tick);
        else {
          setTimeout(runRotateBody, delay);
        }
      };
      requestAnimationFrame(tick);
    };

    // Baseline = OB (ray from O to B); rotation aligns protractor 0° with OB so we measure angle AOB when arm points to A.
    const runRotateBody = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / rotateBodyDuration);
        const eased = easeInOutCubic(t);
        const rotation = baselineRotationDeg * eased;
        const baselineAligned = t >= 1;
        if (baselineAligned) {
          console.log('[MeasureDiagonal] Final baseline rotation sent to protractor (baseline = OB):', { protractorRotation: rotation, baselineRotationDeg });
        }
        window.updateProtractor(protractorId, {
          protractorRotation: rotation,
          baseline: { show: false }
        });
        if (t < 1) requestAnimationFrame(tick);
        else {
          setTimeout(runRotateArm, delay);
        }
      };
      requestAnimationFrame(tick);
    };

    const runRotateArm = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / rotateArmDuration);
        const eased = easeInOutCubic(t);
        const arm = armAngleDeg * eased;
        if (t >= 1) {
          console.log('[MeasureDiagonal] Final update to protractor:', { armAngle: arm, armLength: armLengthViewBox, label: `${diagonalAngle}°` });
        }
        window.updateProtractor(protractorId, { armAngle: arm, armLength: armLengthViewBox, label: t >= 1 ? `${diagonalAngle}°` : '' });
        if (t < 1) requestAnimationFrame(tick);
        else {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('measureDiagonalAngleComplete', {
              detail: { quadId: id, angle: diagonalAngle }
            }));
          }, 100);
        }
      };
      requestAnimationFrame(tick);
    };

    setTimeout(runMoveToIntersection, delay);
  }, [diagonalIntersection, vertices, gridRows, gridCols, id]);

  // Animate measuring angle at a specific vertex with protractor
  // After arm aligns, waits measurementHoldAfterAlignMs (prop), then hides protractor and shows 90° right-angle marker.
  // vertexIndex: 0=A, 1=B, 2=C, 3=D
  const animateMeasureAngleAtVertex = React.useCallback((vertexIndex, onComplete) => {
    const container = containerRef.current;
    if (!container || typeof container.getBoundingClientRect !== 'function') {
      console.warn('❌ Quad container not available for protractor placement');
      return;
    }
    if (typeof window === 'undefined' || !window.spawnProtractorAtVertex || !window.updateProtractor) return;
    if (!gridDimensions) return;

    const holdAfterAlignMs = protractorConfig.measurementHoldAfterAlignMs ?? 2000;

    const rect = container.getBoundingClientRect();
    const precisionGridCols = 1600;
    const precisionGridRows = 900;
    const viewW = typeof window !== 'undefined' ? window.innerWidth : precisionGridCols;
    const viewH = typeof window !== 'undefined' ? window.innerHeight : precisionGridRows;
    const { width, height, offsetX, offsetY } = gridDimensions;

    // Same as getVertexPercent: vertex position in container (0-100 percent)
    const getVertexPercent = (v) => ({
      x: offsetX + (v.col / gridCols) * width,
      y: offsetY + (v.row / gridRows) * height
    });

    // Get the three vertices for the angle: prev-vertex-next
    const vertex = vertices[vertexIndex];
    const prevVertex = vertices[(vertexIndex + 3) % 4];
    const nextVertex = vertices[(vertexIndex + 1) % 4];

    // Convert vertex to screen coordinates using centered grid (same as sides rendering)
    const vertexPercent = getVertexPercent(vertex);
    const screenX = rect.left + (vertexPercent.x / 100) * rect.width;
    const screenY = rect.top + (vertexPercent.y / 100) * rect.height;
    const vertexPrecision = {
      col: (screenX / viewW) * precisionGridCols,
      row: (screenY / viewH) * precisionGridRows
    };

    // Angles in screen space so protractor aligns with drawn quad
    const prevPercent = getVertexPercent(prevVertex);
    const nextPercent = getVertexPercent(nextVertex);
    const screenPrevX = rect.left + (prevPercent.x / 100) * rect.width;
    const screenPrevY = rect.top + (prevPercent.y / 100) * rect.height;
    const screenNextX = rect.left + (nextPercent.x / 100) * rect.width;
    const screenNextY = rect.top + (nextPercent.y / 100) * rect.height;
    const angleToNext = Math.atan2(screenNextY - screenY, screenNextX - screenX) * (180 / Math.PI);
    const angleToPrev = Math.atan2(screenPrevY - screenY, screenPrevX - screenX) * (180 / Math.PI);

    // User convention: Baseline (0°) = along ray to PREV vertex; Arm = rotates to NEXT vertex.
    // A: baseline DA (D→A), arm to B → ∠DAB. B: baseline AB (A→B), arm to C → ∠ABC. C: baseline BC (B→C), arm to D → ∠BCD. D: baseline CD (C→D), arm to A → ∠CDA.
    let interiorAngle = angleToNext - angleToPrev;
    while (interiorAngle < 0) interiorAngle += 360;
    while (interiorAngle > 360) interiorAngle -= 360;
    if (interiorAngle > 180) interiorAngle = 360 - interiorAngle;

    // Arm length in gc (so it scales with grid): distance from vertex to next in grid cells × cell size in gc
    const distGrid = Math.sqrt((nextVertex.col - vertex.col) ** 2 + (nextVertex.row - vertex.row) ** 2);
    const cellSizeGc = gridDimensions.cellSizeGc ?? 50;
    const armLengthGc = distGrid * cellSizeGc;
    const armLengthGcStr = `${Math.max(1, armLengthGc)}gc`;

    const moveDuration = 1000;
    const rotateBodyDuration = 500;
    const rotateArmDuration = 500;
    const delay = 500;
    const offsetRows = 100;

    // Initial position above vertex
    const initialPosition = {
      col: vertexPrecision.col,
      row: Math.max(0, vertexPrecision.row - offsetRows)
    };

    const spawnOptions = {
      protractorType: 'semicircular',
      radius: '100gc',
      color: '#FF6600',
      armColor: '#FF0000',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      showArm: true,
      armAngle: 0,
      armLength: armLengthGcStr,
      angleDisplay: { show: true, size: '28gc' },
      snapToDegrees: 1,
      anglePrecision: 0,
      isDraggable: false,
      isRotatable: false,
      isProtractorRotatable: false,
      protractorRotation: 0,
      mode: 'display',
      label: '',
      baseline: { show: false },
      snapPoints: [{ x: vertexPrecision.col, y: vertexPrecision.row, label: ['A', 'B', 'C', 'D'][vertexIndex] }]
    };

    const protractorId = window.spawnProtractorAtVertex(initialPosition, spawnOptions);
    if (!protractorId) return;

    const easeInOutCubic = (t) => t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Step 1: Move to vertex
    const runMoveToVertex = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / moveDuration);
        const eased = easeInOutCubic(t);
        const col = initialPosition.col + (vertexPrecision.col - initialPosition.col) * eased;
        const row = initialPosition.row + (vertexPrecision.row - initialPosition.row) * eased;
        window.updateProtractor(protractorId, { centerPoint: { col, row } });
        if (t < 1) requestAnimationFrame(tick);
        else setTimeout(runRotateBody, delay);
      };
      requestAnimationFrame(tick);
    };

    // Step 2: Rotate body to align baseline with PREV vertex (e.g. at A, baseline along DA)
    const runRotateBody = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / rotateBodyDuration);
        const eased = easeInOutCubic(t);
        const rotation = angleToPrev * eased;
        window.updateProtractor(protractorId, {
          protractorRotation: rotation,
          baseline: { show: false }
        });
        if (t < 1) requestAnimationFrame(tick);
        else setTimeout(runRotateArm, delay);
      };
      requestAnimationFrame(tick);
    };

    // Step 3: Rotate arm to measure angle
    const runRotateArm = () => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / rotateArmDuration);
        const eased = easeInOutCubic(t);
        const arm = interiorAngle * eased;
        const measuredAngle = Math.round(interiorAngle);
        window.updateProtractor(protractorId, { 
          armAngle: arm, 
          armLength: armLengthGcStr, 
          label: t >= 1 ? `${measuredAngle}°` : '' 
        });
        if (t < 1) requestAnimationFrame(tick);
        else {
          // Wait holdAfterAlignMs, then hide protractor and show 90° right-angle marker (same color/size as arcs)
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.removeProtractor && protractorId) {
              window.removeProtractor(protractorId);
            }
            setRightAngleRevealedVertices(prev => (prev.includes(vertexIndex) ? prev : [...prev, vertexIndex]));
            if (onComplete) onComplete(measuredAngle, protractorId);
          }, holdAfterAlignMs);
        }
      };
      requestAnimationFrame(tick);
    };

    setTimeout(runMoveToVertex, delay);
  }, [vertices, gridRows, gridCols, gridDimensions, protractorConfig.measurementHoldAfterAlignMs]);

  // Cancel all animation frames and timeouts only on unmount (not when effect deps change).
  // This prevents the "register animations" effect cleanup from canceling in-flight animations on re-render.
  React.useEffect(() => {
    return () => {
      if (angleAnimationRef.current) {
        cancelAnimationFrame(angleAnimationRef.current);
        angleAnimationRef.current = null;
      }
      if (diagonalEqualityInitialTimeoutRef.current) {
        clearTimeout(diagonalEqualityInitialTimeoutRef.current);
        diagonalEqualityInitialTimeoutRef.current = null;
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
      if (diagonalAngleBisectionAnimationRef.current) {
        cancelAnimationFrame(diagonalAngleBisectionAnimationRef.current);
        diagonalAngleBisectionAnimationRef.current = null;
      }
      if (parallelLinesAnimationRef.current) {
        cancelAnimationFrame(parallelLinesAnimationRef.current);
        parallelLinesAnimationRef.current = null;
      }
      if (symmetryFoldAnimationRef.current) {
        cancelAnimationFrame(symmetryFoldAnimationRef.current);
        symmetryFoldAnimationRef.current = null;
      }
      if (rotationalSymmetryAnimationRef.current) {
        cancelAnimationFrame(rotationalSymmetryAnimationRef.current);
        rotationalSymmetryAnimationRef.current = null;
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
      
      // Global console helper: run adjacent angles supplementary animation (right-angle marker moving A→B, B→C, etc.)
      // Usage: runAdjacentAnglesAnimation()           — run all 4 pairs in sequence (page 4 quad)
      //        runAdjacentAnglesAnimation(4)           — same, explicitly page 4
      //        runAdjacentAnglesAnimation(4, 0)        — run only A→B (pairIndex 0)
      //        runAdjacentAnglesAnimation(4, 1, 1500) — run only B→C with 1500ms duration
      window.runAdjacentAnglesAnimation = function(pageNum, pairIndex, duration) {
        const page = pageNum != null ? pageNum : 4;
        const quadId = `page${page}-shape-display`;
        const el = document.getElementById(quadId);
        const registry = (window.quadrilateralAnimations && window.quadrilateralAnimations[quadId]) || null;
        const fn = (el && typeof el.animateAngleSum === 'function')
          ? el.animateAngleSum.bind(el)
          : (registry && typeof registry.animateSum === 'function' ? registry.animateSum : null);
        if (!fn) {
          console.warn('runAdjacentAnglesAnimation: quad not found for', quadId, '- ensure you are on page 4 and shape is visible.');
          return;
        }
        const pairs = [[0, 1], [1, 2], [2, 3], [3, 0]];
        const dur = duration != null && duration > 0 ? duration : 2000;
        if (pairIndex === undefined || pairIndex === null) {
          const run = (i) => {
            if (i >= pairs.length) return;
            const [v1, v2] = pairs[i];
            fn(v1, v2, dur, 'adjacent', () => run(i + 1));
          };
          run(0);
        } else {
          const idx = Math.max(0, Math.min(3, Math.floor(pairIndex)));
          const [v1, v2] = pairs[idx];
          fn(v1, v2, dur, 'adjacent');
        }
      };
      
      // Store side equality animation
      const safeSideFunctionName = `animateSideEquality_${quadId.replace(/-/g, '_')}`;
      window[safeSideFunctionName] = animateSideEquality;
      window.quadrilateralAnimations[quadId].animateSideEquality = animateSideEquality;
      window.quadrilateralAnimations[elementName].animateSideEquality = animateSideEquality;
      
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
      
      // Store diagonal angle bisection animation
      const safeDiagonalAngleBisectionFunctionName = `animateDiagonalAngleBisection_${quadId.replace(/-/g, '_')}`;
      window[safeDiagonalAngleBisectionFunctionName] = animateDiagonalAngleBisection;
      window.quadrilateralAnimations[quadId].animateDiagonalAngleBisection = animateDiagonalAngleBisection;
      window.quadrilateralAnimations[elementName].animateDiagonalAngleBisection = animateDiagonalAngleBisection;
      
      // Global console helper: trigger diagonal angle bisection from browser console
      // Usage: triggerDiagonalAngleBisection(5)        — run both diagonals on page 5
      //        triggerDiagonalAngleBisection(5, 0)    — diagonal AC only
      //        triggerDiagonalAngleBisection(5, 1)    — diagonal BD only
      window.triggerDiagonalAngleBisection = function(pageNum, diagonalIndex) {
        const page = pageNum != null ? pageNum : 5;
        const quadId = `page${page}-shape-display`;
        const el = document.getElementById(quadId);
        const registry = (window.quadrilateralAnimations && window.quadrilateralAnimations[quadId]) || null;
        const fn = (el && typeof el.animateDiagonalAngleBisection === 'function')
          ? el.animateDiagonalAngleBisection.bind(el)
          : (registry && typeof registry.animateDiagonalAngleBisection === 'function' ? registry.animateDiagonalAngleBisection : null);
        if (!fn) {
          console.warn('triggerDiagonalAngleBisection: quad not found for', quadId, '- try page 5 and ensure shape is visible.');
          return;
        }
        if (diagonalIndex === undefined || diagonalIndex === null) {
          fn(0, function() { fn(1); });
        } else {
          fn(diagonalIndex);
        }
      };
      
      // Store parallel lines animation
      const safeParallelLinesFunctionName = `animateParallelLines_${quadId.replace(/-/g, '_')}`;
      window[safeParallelLinesFunctionName] = animateParallelLines;
      window.quadrilateralAnimations[quadId].animateParallelLines = animateParallelLines;
      window.quadrilateralAnimations[elementName].animateParallelLines = animateParallelLines;
      
      // Store symmetry fold animation
      const safeSymmetryFoldFunctionName = `animateSymmetryFold_${quadId.replace(/-/g, '_')}`;
      window[safeSymmetryFoldFunctionName] = animateSymmetryFold;
      window.quadrilateralAnimations[quadId].animateSymmetryFold = animateSymmetryFold;
      window.quadrilateralAnimations[elementName].animateSymmetryFold = animateSymmetryFold;
      
      // Store rotational symmetry animation
      const safeRotationalSymmetryFunctionName = `animateRotationalSymmetry_${quadId.replace(/-/g, '_')}`;
      window[safeRotationalSymmetryFunctionName] = animateRotationalSymmetry;
      window.quadrilateralAnimations[quadId].animateRotationalSymmetry = animateRotationalSymmetry;
      window.quadrilateralAnimations[elementName].animateRotationalSymmetry = animateRotationalSymmetry;
      
      // Global console helper: trigger rotational symmetry animation from browser console
      // Usage: runRotationalSymmetryAnimation()     — run on default page (4)
      //        runRotationalSymmetryAnimation(4)   — run on page 4
      window.runRotationalSymmetryAnimation = function(pageNum) {
        const page = pageNum != null ? pageNum : 4;
        const targetQuadId = `page${page}-shape-display`;
        const el = document.getElementById(targetQuadId);
        const registry = (window.quadrilateralAnimations && window.quadrilateralAnimations[targetQuadId]) || null;
        const fn = (el && typeof el.animateRotationalSymmetry === 'function')
          ? el.animateRotationalSymmetry.bind(el)
          : (registry && typeof registry.animateRotationalSymmetry === 'function' ? registry.animateRotationalSymmetry : null);
        if (!fn) {
          console.warn('runRotationalSymmetryAnimation: quad not found for', targetQuadId, '- try runRotationalSymmetryAnimation(4) or ensure the shape is visible on that page.');
          return;
        }
        fn();
      };
      
      // Expose as helper methods on the container element
      containerRef.current.animateAngleEquality = animateAngleEquality;
      containerRef.current.stopAngleEqualityAnimation = stopAngleEqualityAnimation;
      containerRef.current.animateAngleSum = animateAngleSum;
      containerRef.current.stopAngleSumAnimation = stopAngleSumAnimation;
      containerRef.current.animateSideEquality = animateSideEquality;
      containerRef.current.stopSideEqualityAnimation = stopSideEqualityAnimation;
      containerRef.current.animateOppositeSideEquality = animateOppositeSideEquality;
      containerRef.current.stopOppositeSideAnimation = stopOppositeSideAnimation;
      containerRef.current.animateDiagonalEquality = animateDiagonalEquality;
      containerRef.current.stopDiagonalEqualityAnimation = stopDiagonalEqualityAnimation;
      containerRef.current.animateDiagonalBisection = animateDiagonalBisection;
      containerRef.current.stopDiagonalBisectionAnimation = stopDiagonalBisectionAnimation;
      containerRef.current.animateDiagonalPerpendicularBisection = animateDiagonalPerpendicularBisection;
      containerRef.current.stopDiagonalPerpendicularAnimation = stopDiagonalPerpendicularAnimation;
      containerRef.current.animateDiagonalAngleBisection = animateDiagonalAngleBisection;
      containerRef.current.stopDiagonalAngleBisectionAnimation = stopDiagonalAngleBisectionAnimation;
      containerRef.current.animateMeasureDiagonalAngle = animateMeasureDiagonalAngle;
      containerRef.current.animateMeasureAngleAtVertex = animateMeasureAngleAtVertex;
      containerRef.current.animateParallelLines = animateParallelLines;
      containerRef.current.stopParallelLinesAnimation = stopParallelLinesAnimation;
      containerRef.current.animateSymmetryFold = animateSymmetryFold;
      containerRef.current.stopSymmetryFoldAnimation = stopSymmetryFoldAnimation;
      containerRef.current.animateRotationalSymmetry = animateRotationalSymmetry;
      containerRef.current.stopRotationalSymmetryAnimation = stopRotationalSymmetryAnimation;
      containerRef.current.quadId = quadId;
      
    }
    
    // Cleanup: only remove global/container refs (do NOT cancel animation frames here;
    // that is done in the unmount-only effect above to avoid canceling in-flight animations on re-render)
    return () => {
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
      const safeDiagonalAngleBisectionFunctionName = `animateDiagonalAngleBisection_${quadId.replace(/-/g, '_')}`;
      if (window[safeDiagonalAngleBisectionFunctionName]) {
        delete window[safeDiagonalAngleBisectionFunctionName];
      }
      const safeParallelLinesFunctionName = `animateParallelLines_${quadId.replace(/-/g, '_')}`;
      if (window[safeParallelLinesFunctionName]) {
        delete window[safeParallelLinesFunctionName];
      }
      const safeSymmetryFoldFunctionName = `animateSymmetryFold_${quadId.replace(/-/g, '_')}`;
      if (window[safeSymmetryFoldFunctionName]) {
        delete window[safeSymmetryFoldFunctionName];
      }
      const safeRotationalSymmetryFunctionName = `animateRotationalSymmetry_${quadId.replace(/-/g, '_')}`;
      if (window[safeRotationalSymmetryFunctionName]) {
        delete window[safeRotationalSymmetryFunctionName];
      }
      if (window.quadrilateralAnimations) {
        if (window.quadrilateralAnimations[quadId]) {
          delete window.quadrilateralAnimations[quadId].animateEquality;
          delete window.quadrilateralAnimations[quadId].animateSum;
          delete window.quadrilateralAnimations[quadId].animateDiagonalEquality;
          delete window.quadrilateralAnimations[quadId].animateDiagonalBisection;
          delete window.quadrilateralAnimations[quadId].animateDiagonalPerpendicularBisection;
          delete window.quadrilateralAnimations[quadId].animateDiagonalAngleBisection;
        }
        if (window.quadrilateralAnimations[elementName]) {
          delete window.quadrilateralAnimations[elementName].animateEquality;
          delete window.quadrilateralAnimations[elementName].animateSum;
          delete window.quadrilateralAnimations[elementName].animateDiagonalEquality;
          delete window.quadrilateralAnimations[elementName].animateDiagonalBisection;
          delete window.quadrilateralAnimations[elementName].animateDiagonalPerpendicularBisection;
          delete window.quadrilateralAnimations[elementName].animateDiagonalAngleBisection;
        }
      }
      if (containerRef.current) {
        delete containerRef.current.animateAngleEquality;
        delete containerRef.current.stopAngleEqualityAnimation;
        delete containerRef.current.animateAngleSum;
        delete containerRef.current.stopAngleSumAnimation;
        delete containerRef.current.animateDiagonalEquality;
        delete containerRef.current.stopDiagonalEqualityAnimation;
        delete containerRef.current.animateDiagonalBisection;
        delete containerRef.current.stopDiagonalBisectionAnimation;
        delete containerRef.current.animateDiagonalPerpendicularBisection;
        delete containerRef.current.stopDiagonalPerpendicularAnimation;
        delete containerRef.current.animateDiagonalAngleBisection;
        delete containerRef.current.stopDiagonalAngleBisectionAnimation;
        delete containerRef.current.animateMeasureDiagonalAngle;
        delete containerRef.current.animateMeasureAngleAtVertex;
        delete containerRef.current.animateSymmetryFold;
        delete containerRef.current.stopSymmetryFoldAnimation;
        delete containerRef.current.quadId;
      }
    };
  }, [animateAngleEquality, stopAngleEqualityAnimation, animateAngleSum, stopAngleSumAnimation, animateDiagonalEquality, stopDiagonalEqualityAnimation, animateDiagonalBisection, stopDiagonalBisectionAnimation, animateDiagonalPerpendicularBisection, stopDiagonalPerpendicularAnimation, animateDiagonalAngleBisection, stopDiagonalAngleBisectionAnimation, animateMeasureDiagonalAngle, animateMeasureAngleAtVertex, animateSymmetryFold, stopSymmetryFoldAnimation, animateParallelLines, stopParallelLinesAnimation, animateSideEquality, stopSideEqualityAnimation, animateOppositeSideEquality, stopOppositeSideAnimation, id, elementName, currentPage]);

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
    
    console.log('📍 [Quadrilateral] Calculating protractor snap points...');
    console.log('   Vertices (raw):', vertices);
    console.log('   Grid dimensions:', { rows: gridRows, cols: gridCols });
    console.log('   Diagonal intersection:', diagonalIntersection);
    console.log('   Show diagonals:', currentShowDiagonals);
    
    // Add all vertices as snap points
    vertices.forEach((vertex, index) => {
      const labels = ['A', 'B', 'C', 'D'];
      
      // Normalize vertex to integer grid position to ensure alignment
      const normalizedVertex = normalizeVertex(vertex);
      
      // Validate vertex coordinates are within grid bounds
      if (normalizedVertex.row < 0 || normalizedVertex.row >= gridRows || 
          normalizedVertex.col < 0 || normalizedVertex.col >= gridCols) {
        console.warn(`   ⚠️ Vertex ${labels[index]} has invalid coordinates: (row=${normalizedVertex.row}, col=${normalizedVertex.col})`);
        console.warn(`      Expected range: row [0-${gridRows-1}], col [0-${gridCols-1}]`);
      }
      
      // Check if vertex was normalized (had fractional values)
      if (vertex.row !== normalizedVertex.row || vertex.col !== normalizedVertex.col) {
        console.warn(`   ⚠️ Vertex ${labels[index]} was NORMALIZED: (${vertex.row}, ${vertex.col}) → (${normalizedVertex.row}, ${normalizedVertex.col})`);
        console.warn(`      Original vertex had non-integer coordinates!`);
      }
      
      // Use normalized coordinates for snap points to ensure exact grid alignment
      const snapPoint = {
        x: normalizedVertex.col,  // x = column in quad grid (normalized to integer)
        y: normalizedVertex.row,  // y = row in quad grid (normalized to integer)
        label: `Vertex ${labels[index]}`
      };
      snapPoints.push(snapPoint);
      console.log(`   ✅ Added snap point: ${snapPoint.label} at (x=${snapPoint.x}, y=${snapPoint.y})`);
      console.log(`      Quad grid position: row ${normalizedVertex.row}/${gridRows-1}, col ${normalizedVertex.col}/${gridCols-1}`);
    });
    
    // Add diagonal intersection if it exists and diagonals are shown
    if (diagonalIntersection && currentShowDiagonals) {
      // Normalize diagonal intersection to integer grid position
      const normalizedIntersection = normalizeVertex(diagonalIntersection);
      
      // Note: Normalization is expected when intersection doesn't fall exactly on grid point
      if (diagonalIntersection.row !== normalizedIntersection.row || 
          diagonalIntersection.col !== normalizedIntersection.col) {
        console.log(`   ℹ️ Diagonal intersection normalized to grid: (${diagonalIntersection.row.toFixed(2)}, ${diagonalIntersection.col.toFixed(2)}) → (${normalizedIntersection.row}, ${normalizedIntersection.col})`);
      }
      
      const intersectionPoint = {
        x: normalizedIntersection.col,  // Normalized to integer
        y: normalizedIntersection.row,  // Normalized to integer
        label: 'Diagonal Intersection'
      };
      snapPoints.push(intersectionPoint);
      console.log(`   ✅ Added snap point: ${intersectionPoint.label} at (x=${intersectionPoint.x}, y=${intersectionPoint.y})`);
    } else {
      console.log('   ⚠️ Diagonal intersection not added:', {
        hasIntersection: !!diagonalIntersection,
        showDiagonals: currentShowDiagonals
      });
    }
    
    console.log(`📍 [Quadrilateral] Total snap points: ${snapPoints.length}`, snapPoints);
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
      return {
        x: actualX,
        y: actualY
      };
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
    return {
      col: result.col,
      row: result.row
    };
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
      const debugKey = `debugQuadCoordinates_${id || elementName || 'default'}`;
      window[debugKey] = debugCoordinates;
      
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
      
      console.log(`🔍 Debug function available: window['${debugKey}']()`);
      console.log(`   Call this function to print vertex and snap point coordinates for "${id || elementName || 'default'}"`);
      console.log(`📍 Vertex coordinates:`);
      console.log(`   - window.showVertex("A", "${id || elementName || 'default'}") - show any vertex (A, B, C, or D)`);
      console.log(`   - window.showVertexA("${id || elementName || 'default'}") (recommended for Vertex A)`);
      console.log(`   - window['${vertexAKey}']() (bracket notation for hyphenated names)`);
      console.log(`   - window.showVertexA() (shows first quadrilateral)`);
      console.log(`🔴 Visual verification:`);
      console.log(`   - window.placeVertex("A", "${id || elementName || 'default'}") - place dot for any vertex`);
      console.log(`   - window.placeAllVertices("${id || elementName || 'default'}") - place dots for all vertices`);
      console.log(`   - window.placeVertexADot("${id || elementName || 'default'}") - place dot for Vertex A`);
      console.log(`   - window.removeAllPrecisionDots() to remove all dots`);
      
      // Also add a global function if this is the first quadrilateral
      if (!window.debugAllQuadCoordinates) {
        window.debugAllQuadCoordinates = () => {
          console.log('🔍 Calling debug for all quadrilaterals...');
          Object.keys(window).forEach(key => {
            if (key.startsWith('debugQuadCoordinates_')) {
              console.log(`\n📐 Calling ${key}...`);
              window[key]();
            }
          });
        };
        console.log('🔍 Global debug function available: window.debugAllQuadCoordinates()');
        console.log('   Call this to print coordinates for all quadrilaterals');
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
      
      // Debug log for first vertex
      if (vertexIndex === 0 && isCorrect) {
        console.log(`✅ [Quadrilateral] Vertex ${vertexIndex} is correctly placed!`, {
          current: { row: currentVertexPos.row, col: currentVertexPos.col },
          target: { row: targetVertex.row, col: targetVertex.col },
          diff: { row: rowDiff, col: colDiff },
          tolerance: buildTolerance
        });
      }
      
      return isCorrect;
    }
    
    // For shape matching, all vertices need to be correct, so check if overall target is achieved
    return buildTargetAchieved;
  }, [mode, resolvedTargetVertices, buildTargetType, buildTolerance, buildTargetAchieved]);

  // Render vertices as hotspots
  const renderVertices = React.useMemo(() => {
    const HotspotComp = window.HotspotComponent?.HotspotComponent;
    if (!HotspotComp || !coordinates) {
      if (!HotspotComp) {
        // HotspotComponent may not be loaded yet - this is expected during initial render
        // Vertices will be rendered once HotspotComponent is available
        console.log('ℹ️ [Quadrilateral] HotspotComponent not yet available - vertices will render when component loads');
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
      
      // Debug: Log vertex placement status
      if (mode === 'build') {
        console.log(`🎯 [Quadrilateral] Vertex ${index} placement check:`, {
          currentVertex: { row: currentVertex.row, col: currentVertex.col },
          targetVertex: resolvedTargetVertices?.[index],
          isCorrectlyPlaced,
          isDraggable,
          animated: isCorrectlyPlaced ? false : true,
          mode,
          buildTargetType,
          buildTolerance
        });
      }
      
      // Calculate position as percentage within container (EXACT same formula as grid points)
      const xPercent = offsetX + (currentVertex.col / gridCols) * width;
      const yPercent = offsetY + (currentVertex.row / gridRows) * height;
      
      // Debug: Log vertex position calculation
      if (index === 0) {
        console.log('📍 [Quadrilateral] Vertex position calculation (using EXACT same percentages as gridArea):');
        console.log(`   Using percentages directly from gridDimensions (matches gridArea):`);
        console.log(`   Grid area: width=${width.toFixed(2)}%, height=${height.toFixed(2)}%`);
        console.log(`   Grid offset: offsetX=${offsetX.toFixed(2)}%, offsetY=${offsetY.toFixed(2)}%`);
        console.log(`   Vertex ${index} at grid (${currentVertex.col}, ${currentVertex.row}): ${xPercent.toFixed(2)}%, ${yPercent.toFixed(2)}%`);
        console.log(`   Formula: offsetX (${offsetX.toFixed(2)}%) + (col/${gridCols}) × width (${width.toFixed(2)}%)`);
        console.log(`   For (0,0): ${offsetX.toFixed(2)}% + (0/${gridCols}) × ${width.toFixed(2)}% = ${offsetX.toFixed(2)}%`);
        console.log(`   ✅ This should EXACTLY match grid point (0,0) at: left=${offsetX.toFixed(2)}%, top=${offsetY.toFixed(2)}%`);
      }
      
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
      
      // Debug: Log position object being passed
      if (index === 0) {
        console.log('🔍 [Quadrilateral] Passing position to hotspot:', JSON.stringify(positionObj, null, 2));
        console.log('🔍 [Quadrilateral] Position object structure:', {
          hasPosition: !!positionObj,
          hasCss: !!positionObj.css,
          left: positionObj.css.left,
          top: positionObj.css.top
        });
        console.log('🔍 [Quadrilateral] Expected hotspot left:', `${xPercent}%`);
        console.log('🔍 [Quadrilateral] Expected hotspot top:', `${yPercent}%`);
        console.log('🔍 [Quadrilateral] Grid point (0,0) should be at: left=18.75%, top=0%');
        console.log('🔍 [Quadrilateral] Hotspot should calculate: left = 18.75 + 0/2 = 18.75%, top = 0 + 0/2 = 0%');
      }
      
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
        innerCircleSize: '0gc', // Set to 0 to remove inner circle (black marks)
        animated: isCorrectlyPlaced ? false : vertexAnimated, // Use vertexConfig.animated if provided
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
      
      // Debug: Verify props
      if (index === 0) {
        console.log('🔍 [Quadrilateral] Hotspot props:', {
          hasPosition: !!hotspotProps.position,
          positionType: typeof hotspotProps.position,
          hasCoordinates: 'coordinates' in hotspotProps
        });
      }
      
      return React.createElement(HotspotComp, hotspotProps);
    });
    
    // Return array of vertex elements (will be rendered inside grid component)
    return vertexElements;
  }, [vertices, getVertexPosition, id, elementName, currentPage, zIndex, vertexColor, currentDraggable, handleVertexDragStart, coordinates, gridRows, gridCols, gridDimensions, isVertexCorrectlyPlaced, mode, resolvedTargetVertices, buildTargetType, buildTolerance, buildTargetAchieved, snapPoint, vertexAnimated]);

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
    
    // Use GridCellFontUtils if available (same as layout-components.js)
    if (typeof thickness === 'string' && thickness.includes('gc')) {
      if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const result = window.GridCellFontUtils.processGcProperty(thickness, 'borderWidth');
        
        // GridCellFontUtils returns pixels (as string "Xpx" or number)
        let thicknessPx;
        if (typeof result === 'string') {
          thicknessPx = parseFloat(result.replace('px', '')) || 4;
        } else if (typeof result === 'number') {
          thicknessPx = result;
        } else {
          thicknessPx = 4; // Fallback
        }
        
        // Convert pixels to viewBox units
        // Get container dimensions in pixels
        const [x1, y1, x2, y2] = coordinates;
        const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        
        const containerWidthPx = ((x2 - x1 + 1) / gridSystemCols) * (typeof window !== 'undefined' ? window.innerWidth : 1600);
        const containerHeightPx = ((y2 - y1 + 1) / gridSystemRows) * (typeof window !== 'undefined' ? window.innerHeight : 900);
        
        // Use average for consistent scaling
        const avgContainerPx = (containerWidthPx + containerHeightPx) / 2;
        
        // Convert pixels to viewBox units (viewBox is "0 0 100 100")
        // 1 viewBox unit = avgContainerPx / 100 pixels
        const thicknessInViewBoxUnits = (thicknessPx / avgContainerPx) * 100;
        
        return thicknessInViewBoxUnits;
      }
    }
    
    // Fallback: if not gc unit or GridCellFontUtils not available, use manual conversion
    if (typeof thickness === 'string' && thickness.includes('gc')) {
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
    }
    
    // If already a number, assume it's already in viewBox units
    if (typeof thickness === 'number') {
      return thickness;
    }
    
    // Default fallback
    return 0.4;
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
    
    // Debug log for edge color (only log once per component mount to avoid spam)
    if (id && !getEdgeStyle._logged) {
      console.log(`🎨 [Quadrilateral ${id}] Edge color: ${color} (global: ${globalColor}, override: ${override?.color || 'none'})`);
      getEdgeStyle._logged = true;
    }
    
    const thicknessNum = processThickness(thickness);
    const dashArray = getStrokeDashArray(style, thicknessNum);
    
    return {
      color,
      thickness: thicknessNum,
      style,
      blink,
      dashArray
    };
  }, [processThickness, getStrokeDashArray, id]);

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
    
    // Debug: Log grid dimensions used for sides
    if (vertices && vertices.length > 0) {
      const firstVertex = getVertexPosition(0);
      const firstPercent = getVertexPercent(firstVertex);
      console.log('📐 [Quadrilateral] Sides rendering using grid dimensions (CONTAINER-RELATIVE):');
      console.log(`   Container: ${containerWidthGc}gc × ${containerHeightGc}gc`);
      console.log(`   Grid: ${gridWidthGc}gc × ${gridHeightGc}gc (${width.toFixed(2)}% × ${height.toFixed(2)}% of container)`);
      console.log(`   Offset: ${offsetXGc}gc, ${offsetYGc}gc (${offsetX.toFixed(2)}%, ${offsetY.toFixed(2)}% of container)`);
      console.log(`   First vertex (${firstVertex.col}, ${firstVertex.row}): ${firstPercent.x.toFixed(2)}%, ${firstPercent.y.toFixed(2)}% (in SVG viewBox 0-100 = full container)`);
      console.log(`   ✅ SVG positioned at: left=0%, top=0%, width=100%, height=100% (relative to quadrilateral wrapper, same as grid component)`);
    }
    
    const elements = [];
    const sideOverrides = [side1, side2, side3, side4];
    
    // Add polygon fill if fillColor is provided
    if (fillColor) {
      const polygonPoints = vertices.map((vertex, index) => {
        const v = getVertexPosition(index);
        const p = getVertexPercent(v);
        return `${p.x},${p.y}`;
      }).join(' ');
      
      elements.push(React.createElement('polygon', {
        key: 'shape-fill',
        points: polygonPoints,
        fill: fillColor,
        fillOpacity: 1,
        stroke: 'none'
      }));
    }
    
    // Add lines for the edges
    for (let i = 0; i < 4; i++) {
      const v1 = getVertexPosition(i);
      const v2 = getVertexPosition((i + 1) % 4);
      
      const p1 = getVertexPercent(v1);
      const p2 = getVertexPercent(v2);
      
      // Get style for this side with override
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
      
      elements.push(React.createElement('line', lineProps));
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
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, elements);
  }, [vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, side1, side2, side3, side4, getEdgeStyle, gridDimensions, fillColor]);

  // Render side symbols (tick marks for equality, arrows for parallel)
  const renderSideSymbols = React.useMemo(() => {
    if (!effectiveSideSymbols || effectiveSideSymbols.length === 0 || !coordinates) return null;
    
    // Use pre-calculated grid dimensions
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc } = gridDimensions;
    
    // Helper to get vertex percent (same as renderSides)
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Map side names to indices: AB=0, BC=1, CD=2, DA=3
    const sideNameToIndex = { 'AB': 0, 'BC': 1, 'CD': 2, 'DA': 3 };
    
    // Process gc to viewBox units
    const processGcToViewBox = (value, defaultValue) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultValue;
        const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
        return (gcValue / avgContainerGc) * 100;
      }
      return defaultValue;
    };
    
    const symbols = [];
    
    effectiveSideSymbols.forEach((symbolConfig, symbolIdx) => {
      const { 
        side, 
        type, 
        count = 1, 
        color = '#000000', 
        size = '8gc',
        thickness,
        position = 0.5 // Position along side (0-1, default center)
      } = symbolConfig;
      
      const sideIndex = sideNameToIndex[side?.toUpperCase()];
      if (sideIndex === undefined) {
        console.warn(`Invalid side name: ${side}. Use 'AB', 'BC', 'CD', or 'DA'.`);
        return;
      }
      
      // Get vertices for this side
      const v1 = getVertexPosition(sideIndex);
      const v2 = getVertexPosition((sideIndex + 1) % 4);
      const p1 = getVertexPercent(v1);
      const p2 = getVertexPercent(v2);
      
      // Calculate side vector and perpendicular
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const sideLength = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / sideLength;
      const unitY = dy / sideLength;
      const perpX = -unitY; // Perpendicular (for tick marks)
      const perpY = unitX;
      
      // Position along the side
      const posX = p1.x + dx * position;
      const posY = p1.y + dy * position;
      
      // Symbol size in viewBox units
      const symbolSize = processGcToViewBox(size, 1.5);
      
      if (type === 'tick' || type === 'ticks') {
        // Tick marks for equal length (congruent segments)
        // Multiple ticks are drawn perpendicular to the side
        const tickLength = symbolSize * 1.5; // Length of each tick
        const tickSpacing = symbolSize * 0.6; // Spacing between multiple ticks
        const totalWidth = (count - 1) * tickSpacing;
        const tickStrokeWidth = thickness !== undefined && thickness !== null
          ? processGcToViewBox(thickness, symbolSize * 0.15)
          : symbolSize * 0.15;
        
        for (let i = 0; i < count; i++) {
          // Offset along the side for multiple ticks
          const tickOffset = i * tickSpacing - totalWidth / 2;
          const tickX = posX + unitX * tickOffset;
          const tickY = posY + unitY * tickOffset;
          
          // Draw tick perpendicular to side
          const x1 = tickX + perpX * tickLength / 2;
          const y1 = tickY + perpY * tickLength / 2;
          const x2 = tickX - perpX * tickLength / 2;
          const y2 = tickY - perpY * tickLength / 2;
          
          symbols.push(React.createElement('line', {
            key: `symbol-${symbolIdx}-tick-${i}`,
            x1, y1, x2, y2,
            stroke: color,
            strokeWidth: tickStrokeWidth,
            strokeLinecap: 'round'
          }));
        }
      } else if (type === 'arrow' || type === 'arrows') {
        // Arrow marks for parallel lines
        // Arrows point along the direction of the side
        const arrowSize = symbolSize;
        const arrowSpacing = symbolSize * 1.2; // Spacing between multiple arrows
        const totalWidth = (count - 1) * arrowSpacing;
        
        for (let i = 0; i < count; i++) {
          // Offset along the side for multiple arrows
          const arrowOffset = i * arrowSpacing - totalWidth / 2;
          const arrowX = posX + unitX * arrowOffset;
          const arrowY = posY + unitY * arrowOffset;
          
          // Arrow head (chevron shape pointing along the side)
          // Tip of arrow
          const tipX = arrowX + unitX * arrowSize * 0.5;
          const tipY = arrowY + unitY * arrowSize * 0.5;
          // Left wing
          const leftX = arrowX - unitX * arrowSize * 0.5 + perpX * arrowSize * 0.4;
          const leftY = arrowY - unitY * arrowSize * 0.5 + perpY * arrowSize * 0.4;
          // Right wing
          const rightX = arrowX - unitX * arrowSize * 0.5 - perpX * arrowSize * 0.4;
          const rightY = arrowY - unitY * arrowSize * 0.5 - perpY * arrowSize * 0.4;
          
          // Draw arrow as a filled triangle/chevron
          symbols.push(React.createElement('polygon', {
            key: `symbol-${symbolIdx}-arrow-${i}`,
            points: `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`,
            fill: color,
            stroke: color,
            strokeWidth: symbolSize * 0.1,
            strokeLinejoin: 'round'
          }));
        }
      }
    });
    
    if (symbols.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'side-symbols-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 30, // Above sides
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, symbols);
  }, [effectiveSideSymbols, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, gridDimensions]);

  // Render diagonals using SVG for precise vertex-to-vertex connection
  const renderDiagonals = React.useMemo(() => {
    if (!currentShowDiagonals || !coordinates) {
      console.log(`🔍 renderDiagonals: Skipping - currentShowDiagonals=${currentShowDiagonals}, coordinates=${coordinates ? 'exists' : 'null'}`);
      return null;
    }
    
    console.log(`✅ renderDiagonals: Rendering diagonals - currentShowDiagonals=${currentShowDiagonals}`);
    
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
    
    // Use override props when set (e.g. after "diagonals not equal" animation: both orange, solid)
    const effectiveDiagonal1 = overrideDiagonal1 !== null && overrideDiagonal1 !== undefined ? overrideDiagonal1 : diagonal1;
    const effectiveDiagonal2 = overrideDiagonal2 !== null && overrideDiagonal2 !== undefined ? overrideDiagonal2 : diagonal2;
    // Get styles for diagonals with overrides
    const diag1Style = getEdgeStyle(edgeColor, edgeThickness, edgeStyle, isBlink, effectiveDiagonal1);
    const diag2Style = getEdgeStyle(edgeColor, edgeThickness, edgeStyle, isBlink, effectiveDiagonal2);
    
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
    
    const svgElement = React.createElement('svg', {
      key: 'diagonals-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 26, // Diagonals - above sides so they're visible
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, [
      React.createElement('line', diag1Props),
      React.createElement('line', diag2Props)
    ]);
    
    console.log(`✅ renderDiagonals: Created SVG with diagonals - color1=${diag1Style.color}, color2=${diag2Style.color}, thickness1=${diag1Style.thickness}, thickness2=${diag2Style.thickness}`);
    console.log(`   Original thickness prop: ${diagonal1?.thickness || diagonal2?.thickness || edgeThickness}`);
    console.log(`   SVG z-index: ${zIndex + 26} (sides use ${zIndex + 25})`);
    console.log(`   Diagonal 1: (${p0.x.toFixed(2)}%, ${p0.y.toFixed(2)}%) to (${p2.x.toFixed(2)}%, ${p2.y.toFixed(2)}%)`);
    console.log(`   Diagonal 2: (${p1.x.toFixed(2)}%, ${p1.y.toFixed(2)}%) to (${p3.x.toFixed(2)}%, ${p3.y.toFixed(2)}%)`);
    
    return svgElement;
  }, [currentShowDiagonals, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, diagonal1, diagonal2, overrideDiagonal1, overrideDiagonal2, getEdgeStyle, gridDimensions]);

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
    if (currentAngleShow === 'none') return [];
    
    const AngleMarkerComp = window.AngleMarkerComponent?.AngleMarkerComponent;
    if (!AngleMarkerComp) {
      console.warn('AngleMarkerComponent not available');
      return [];
    }
    
    // When supplementary angle animation is running, remove fills from angle arcs
    const overrideFillForSumAnimation = (config) => {
      if (!config || !angleSumAnimation) return config;
      return { ...config, fill: false };
    };
    
    return vertices.map((vertex, index) => {
      const prevIndex = (index - 1 + 4) % 4;
      const nextIndex = (index + 1) % 4;
      
      const currentVertex = getVertexPosition(index);
      const prevVertex = getVertexPosition(prevIndex);
      const nextVertex = getVertexPosition(nextIndex);
      
      // Get per-vertex config (merges with global defaults)
      const vertexAngleConfig = getVertexAngleConfig(index);
      
      // Use interior angle config as defaults (fallback if per-angle configs not provided)
      const defaultConfig = vertexAngleConfig.interiorAngle || {
        size: angleArcSizeGc,
        color: angleMarkerColor,
        showText: currentAngleShowText,
        textMode: 'both'
      };
      const effectiveDefault = angleSumAnimation ? { ...defaultConfig, fill: false } : defaultConfig;
      
      // Always override showText with currentAngleShowText to respect checkbox state
      // If checkbox is unchecked, hide text regardless of config
      const finalShowText = currentAngleShowText ? (effectiveDefault.showText !== false) : false;
      
      // Helper to override showText in per-angle configs to respect checkbox state
      const overrideShowText = (config) => {
        if (!config) return config;
        return {
          ...config,
          showText: currentAngleShowText ? (config.showText !== false) : false
        };
      };

      // After protractor measurement (e.g. page 4 all-angles-90), show 90° right-angle marker instead of arc at revealed vertices
      const isRevealedRightAngle = rightAngleRevealedVertices.includes(index);
      const markerType = isRevealedRightAngle ? 'rightAngle' : currentAngleShow;
      // Right-angle L uses rightAngleSizeGc (or arc size); other markers use config size or arc size
      const sizeForMarker = (markerType === 'rightAngle') ? angleRightAngleSizeGc : (effectiveDefault.size ?? angleArcSizeGc);
      
      return React.createElement(AngleMarkerComp, {
        key: `angle-${index}`,
        vertex: currentVertex,
        prevVertex: prevVertex,
        nextVertex: nextVertex,
        angle: angles[index],
        containerCoordinates: coordinates,
        gridRows: gridRows,
        gridCols: gridCols,
        gridPadding: gridPadding,
        markerType: markerType,
        color: effectiveDefault.color,
        size: sizeForMarker,
        zIndex: zIndex + 100,
        showText: finalShowText,
        textColor: angleTextColor,
        textSize: angleTextSize,
        textFont: angleTextFont,
        textOffset: angleTextOffset,
        textMode: effectiveDefault.textMode,
        // Per-angle configurations (with showText overridden; fill false when angle sum animation runs)
        interiorAngleConfig: overrideShowText(overrideFillForSumAnimation(vertexAngleConfig.interiorAngle)),
        supplementaryAngle1Config: overrideShowText(overrideFillForSumAnimation(vertexAngleConfig.supplementaryAngle1)),
        supplementaryAngle2Config: overrideShowText(overrideFillForSumAnimation(vertexAngleConfig.supplementaryAngle2)),
        supplementaryAngle3Config: overrideShowText(overrideFillForSumAnimation(vertexAngleConfig.supplementaryAngle3)),
        // Protractor spawn function
        onArcClick: protractorConfig.enableClickToSpawn ? spawnProtractorAtVertex : null
      });
    });
  }, [currentAngleShow, currentAngleShowText, rightAngleRevealedVertices, getVertexAngleConfig, angleArcSizeGc, angleRightAngleSizeGc, angleMarkerSize, angleTextColor, angleTextSize, angleTextFont, angleTextOffset, vertices, angles, getVertexPosition, coordinates, gridRows, gridCols, gridPadding, zIndex, protractorConfig.enableClickToSpawn, spawnProtractorAtVertex, angleSumAnimation]);

  // Render animated angle equality arc
  const renderAnimatedAngleArc = React.useMemo(() => {
    if (!angleAnimation) {
      return null;
    }

    const { sourceVertexIndex, targetVertexIndex, progress, isComplete, blinkStartTime } = angleAnimation;
    // console.log('🎨 Rendering animated arc:', { sourceVertexIndex, targetVertexIndex, progress, isComplete });
    
    // Always log when progress is 0 or 1 for debugging
    const check1 = progress === 0;
    const check2 = progress === 1;
    const check3 = isComplete === true;
    const shouldLog = check1 || check2 || check3;
    
    if (shouldLog) {
      console.log('🔍 DEBUG: Condition matched! Will log position details...');
    }
    
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
    
    // Get angle configs - use same arc size prop as static angle arcs (angleArcSizeGc)
    const sourceConfig = getVertexAngleConfig(sourceVertexIndex);
    const targetConfig = getVertexAngleConfig(targetVertexIndex);
    const arcConfig = sourceConfig.interiorAngle || {
      size: angleArcSizeGc,
      color: angleMarkerColor,
      fill: true,
      fillColor: angleMarkerColor,
      fillOpacity: 0.5
    };
    // Use equality-tick color if set (so moving arc matches static arc at source vertex)
    const movingArcColor = equalityVertexColors[sourceVertexIndex] ?? arcConfig.color ?? angleMarkerColor;
    
    // Same as angle marker: fixed viewBox and radius; visual size from prop only (container)
    const viewBoxSize = 100;
    const radius = 40;
    
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
    // Use the EXACT SAME positioning calculation as angle markers
    // Angle markers recalculate from containerCoordinates, so we do the same
    const sourcePos = getVertexPosition(sourceVertexIndex);
    const targetPos = getVertexPosition(targetVertexIndex);
    
    // Use the EXACT same calculation as AngleMarkerComponent (see angle-marker-component.js lines 95-135)
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    // Parse gridPadding (same as angle markers)
    let paddingGc = 0;
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      paddingGc = parseFloat(gridPadding) || 0;
    } else if (typeof gridPadding === 'number') {
      paddingGc = gridPadding;
    }
    
    // Calculate adjusted dimensions after padding (same as angle markers)
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells) - SAME as angle markers
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert to percentages (SAME as angle markers)
    const width = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const height = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    // Calculate position as percentage within container (EXACT same formula as angle markers)
    // Use EXACT same formula: offsetX + (col / gridCols) * width
    const sourceXPercent = offsetX + (sourcePos.col / gridCols) * width;
    const sourceYPercent = offsetY + (sourcePos.row / gridRows) * height;
    const targetXPercent = offsetX + (targetPos.col / gridCols) * width;
    const targetYPercent = offsetY + (targetPos.row / gridRows) * height;
    
    // Positions are container-relative percentages (0-100%) - same as angle markers
    const sourceLeft = sourceXPercent;
    const sourceTop = sourceYPercent;
    const targetLeft = targetXPercent;
    const targetTop = targetYPercent;
    
    // Calculate rotation needed to align angles
    const rotationDiff = targetStartAngle - sourceStartAngle;
    
    // Interpolate position and rotation based on progress
    // When complete, lock to target position
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = isComplete ? 1 : easeInOutCubic(progress);
    
    const currentLeft = sourceLeft + (targetLeft - sourceLeft) * easedProgress;
    const currentTop = sourceTop + (targetTop - sourceTop) * easedProgress;
    
    // Debug logging: Compare with angle marker positions
    // Log at start (progress === 0) and end (progress === 1 or isComplete === true)
    const shouldLogDebug = (progress === 0) || (progress === 1) || (isComplete === true);
    if (shouldLogDebug) {
      console.log('🔍 About to log detailed position info...');
      try {
        const phase = (progress === 0) ? 'START' : 'END';
        
        console.log(`🎯 [Angle Equality Animation] Position Calculation (${phase}):`);
        console.log(`   Progress: ${progress} (type: ${typeof progress}), isComplete: ${isComplete} (type: ${typeof isComplete})`);
        console.log(`   Source vertex (${sourceVertexIndex}): grid(${sourcePos.col}, ${sourcePos.row}) → position(${sourceLeft.toFixed(2)}%, ${sourceTop.toFixed(2)}%)`);
        console.log(`   Target vertex (${targetVertexIndex}): grid(${targetPos.col}, ${targetPos.row}) → position(${targetLeft.toFixed(2)}%, ${targetTop.toFixed(2)}%)`);
        console.log(`   Current animated position: (${currentLeft.toFixed(2)}%, ${currentTop.toFixed(2)}%)`);
        console.log(`   Container: [${x1}, ${y1}, ${x2}, ${y2}] = ${containerWidthGc}gc × ${containerHeightGc}gc`);
        console.log(`   Grid: ${gridWidthGc.toFixed(1)}gc × ${gridHeightGc.toFixed(1)}gc (${width.toFixed(2)}% × ${height.toFixed(2)}%)`);
        console.log(`   Offset: ${offsetXGc.toFixed(1)}gc, ${offsetYGc.toFixed(1)}gc (${offsetX.toFixed(2)}%, ${offsetY.toFixed(2)}%)`);
        console.log(`   Padding: ${paddingGc}gc`);
        
        // Compare with all vertex positions
        console.log('   📍 All vertex positions (for comparison):');
        for (let i = 0; i < 4; i++) {
          const v = getVertexPosition(i);
          const vXPercent = offsetX + (v.col / gridCols) * width;
          const vYPercent = offsetY + (v.row / gridRows) * height;
          const labels = ['A', 'B', 'C', 'D'];
          console.log(`      Vertex ${labels[i]} (${i}): grid(${v.col}, ${v.row}) → position(${vXPercent.toFixed(2)}%, ${vYPercent.toFixed(2)}%)`);
        }
        console.log('✅ Detailed position logging completed');
      } catch (error) {
        console.error('❌ Error in detailed position logging:', error, error.stack);
      }
    }
    
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
    
    // Container size: use same arc size prop as static angle arc (arcConfig.size), same conversion as angle-marker-component
    const arcSizeFromProp = arcConfig.size != null ? arcConfig.size : angleArcSizeGc;
    const arcSizeGcStr = (typeof arcSizeFromProp === 'string' && arcSizeFromProp.includes('gc'))
      ? arcSizeFromProp
      : `${typeof arcSizeFromProp === 'number' ? Math.max(arcSizeFromProp, 0.5) : 1}gc`;
    let responsiveArcSize = '50px';
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      responsiveArcSize = window.GridCellFontUtils.processGcProperty(arcSizeGcStr, 'width');
    }
    
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
          width: responsiveArcSize,  // Responsive size using gc units
          height: responsiveArcSize, // Responsive size using gc units
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
      style: {
        width: '100%',   // Fill the responsive container
        height: '100%',  // Fill the responsive container
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
      // Success message (shown when animation completes) - only if message is provided
      isComplete && equalityMessage && equalityMessage.trim() && React.createElement('div', {
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
  }, [angleAnimation, vertices, angles, getVertexPosition, getVertexAngleConfig, coordinates, gridRows, gridCols, gridPadding, gridDimensions, angleArcSizeGc, angleMarkerSize, angleMarkerColor, angleTextSize, angleTextFont, angleTextColor, zIndex, equalityMessage, messageLeft, messageTop, messageOffsetX, messageOffsetY]);

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
    
    // Get angle configs - use same arc size prop as static angle arcs (angleArcSizeGc)
    const sourceConfig = getVertexAngleConfig(sourceVertexIndex);
    const targetConfig = getVertexAngleConfig(targetVertexIndex);
    const arcConfig = sourceConfig.interiorAngle || {
      size: angleArcSizeGc,
      color: angleMarkerColor,
      fill: true,
      fillColor: angleMarkerColor,
      fillOpacity: 0.5
    };
    // Use equality-tick color if set (so moving arc matches static arc at source vertex)
    const movingArcColor = equalityVertexColors[sourceVertexIndex] ?? arcConfig.color ?? angleMarkerColor;
    
    // Same as angle marker: fixed viewBox and radius; visual size comes only from prop angleArcSizeGc (container)
    const viewBoxSize = 100;
    const radius = 40;
    
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
    
    // For 90° angles (e.g. square adjacent supplementary), use right-angle L marker — same config as static right-angle at angle A
    const useRightAngleMarker = Math.abs(angle1 - 90) < 5;
    // Match static right-angle: leg = 50% of viewBox (angle-marker uses half of rightAngleSizePx in viewBox rightAngleSizePx)
    const rightAngleViewBoxSize = viewBoxSize; // 100
    const rightAngleLegLength = rightAngleViewBoxSize / 2; // 50
    const rightAnglePathData = `M 0 0 L ${-rightAngleLegLength} 0 M 0 0 L 0 ${rightAngleLegLength}`;
    // Stroke: match static right-angle (angle-marker arcStrokeWidth 10, same ratio in viewBox 100)
    const rightAngleStrokeWidth = 10;
    // Orientation: match static. First leg (180° in local) must point toward prev → rotation so 180° + rotation = sourceStartAngle → rotation = sourceStartAngle - 180; then add currentRotation.
    const rightAngleBaseRotation = sourceStartAngle - 180;
    
    // Calculate transform to move from source to target
    // Use the EXACT SAME positioning calculation as angle markers
    // Angle markers recalculate from containerCoordinates, so we do the same
    const sourcePos = getVertexPosition(sourceVertexIndex);
    const targetPos = getVertexPosition(targetVertexIndex);
    
    // Use the EXACT same calculation as AngleMarkerComponent (see angle-marker-component.js lines 95-135)
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    // Parse gridPadding (same as angle markers)
    let paddingGc = 0;
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      paddingGc = parseFloat(gridPadding) || 0;
    } else if (typeof gridPadding === 'number') {
      paddingGc = gridPadding;
    }
    
    // Calculate adjusted dimensions after padding (same as angle markers)
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells) - SAME as angle markers
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert to percentages (SAME as angle markers)
    const width = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const height = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    // Calculate position as percentage within container (EXACT same formula as angle markers)
    // Use EXACT same formula: offsetX + (col / gridCols) * width
    const sourceXPercent = offsetX + (sourcePos.col / gridCols) * width;
    const sourceYPercent = offsetY + (sourcePos.row / gridRows) * height;
    const targetXPercent = offsetX + (targetPos.col / gridCols) * width;
    const targetYPercent = offsetY + (targetPos.row / gridRows) * height;
    
    // Positions are container-relative percentages (0-100%) - same as angle markers
    const sourceLeft = sourceXPercent;
    const sourceTop = sourceYPercent;
    const targetLeft = targetXPercent;
    const targetTop = targetYPercent;
    
    // Calculate rotation needed to align source arc to target supplementary angle
    const rotationDiff = targetStartAngle - sourceStartAngle;
    
    // Interpolate position and rotation based on progress
    // When complete, lock to target position
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = isComplete ? 1 : easeInOutCubic(progress);
    
    const currentLeft = sourceLeft + (targetLeft - sourceLeft) * easedProgress;
    const currentTop = sourceTop + (targetTop - sourceTop) * easedProgress;
    
    // Debug logging: Compare with angle marker positions
    // Log at start (progress === 0) and end (progress === 1 or isComplete === true)
    const shouldLogDebug = (progress === 0) || (progress === 1) || (isComplete === true);
    if (shouldLogDebug) {
      console.log('🔍 About to log detailed position info...');
      try {
        const phase = (progress === 0) ? 'START' : 'END';
        
        console.log(`🎯 [Angle Equality Animation] Position Calculation (${phase}):`);
        console.log(`   Progress: ${progress} (type: ${typeof progress}), isComplete: ${isComplete} (type: ${typeof isComplete})`);
        console.log(`   Source vertex (${sourceVertexIndex}): grid(${sourcePos.col}, ${sourcePos.row}) → position(${sourceLeft.toFixed(2)}%, ${sourceTop.toFixed(2)}%)`);
        console.log(`   Target vertex (${targetVertexIndex}): grid(${targetPos.col}, ${targetPos.row}) → position(${targetLeft.toFixed(2)}%, ${targetTop.toFixed(2)}%)`);
        console.log(`   Current animated position: (${currentLeft.toFixed(2)}%, ${currentTop.toFixed(2)}%)`);
        console.log(`   Container: [${x1}, ${y1}, ${x2}, ${y2}] = ${containerWidthGc}gc × ${containerHeightGc}gc`);
        console.log(`   Grid: ${gridWidthGc.toFixed(1)}gc × ${gridHeightGc.toFixed(1)}gc (${width.toFixed(2)}% × ${height.toFixed(2)}%)`);
        console.log(`   Offset: ${offsetXGc.toFixed(1)}gc, ${offsetYGc.toFixed(1)}gc (${offsetX.toFixed(2)}%, ${offsetY.toFixed(2)}%)`);
        console.log(`   Padding: ${paddingGc}gc`);
        
        // Compare with all vertex positions
        console.log('   📍 All vertex positions (for comparison):');
        for (let i = 0; i < 4; i++) {
          const v = getVertexPosition(i);
          const vXPercent = offsetX + (v.col / gridCols) * width;
          const vYPercent = offsetY + (v.row / gridRows) * height;
          const labels = ['A', 'B', 'C', 'D'];
          console.log(`      Vertex ${labels[i]} (${i}): grid(${v.col}, ${v.row}) → position(${vXPercent.toFixed(2)}%, ${vYPercent.toFixed(2)}%)`);
        }
        console.log('✅ Detailed position logging completed');
      } catch (error) {
        console.error('❌ Error in detailed position logging:', error, error.stack);
      }
    }
    const currentRotation = rotationDiff * easedProgress;
    
    // Calculate opacity (fade in, then blinking when complete)
    let opacity = 1;
    if (progress < 0.1) {
      opacity = progress / 0.1; // Fade in
    }
    
    // Container size: use same arc size prop as static angle arc (arcConfig.size), same conversion as angle-marker-component
    const arcSizeFromProp = arcConfig.size != null ? arcConfig.size : angleArcSizeGc;
    const arcSizeGcStr = (typeof arcSizeFromProp === 'string' && arcSizeFromProp.includes('gc'))
      ? arcSizeFromProp
      : `${typeof arcSizeFromProp === 'number' ? Math.max(arcSizeFromProp, 0.5) : 1}gc`;
    let responsiveSumArcSize = '50px';
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      responsiveSumArcSize = window.GridCellFontUtils.processGcProperty(arcSizeGcStr, 'width');
    }
    
    // Use angleRightAngleSizeGc for moving right-angle (same prop as static right-angle markers)
    const rightAngleSizeGcStr = (typeof angleRightAngleSizeGc === 'string' && angleRightAngleSizeGc.includes('gc'))
      ? angleRightAngleSizeGc
      : `${typeof angleRightAngleSizeGc === 'number' ? Math.max(angleRightAngleSizeGc, 0.5) : 1}gc`;
    const movingRightAngleSizePx = useRightAngleMarker
      ? (() => {
          if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
            const result = window.GridCellFontUtils.processGcProperty(rightAngleSizeGcStr, 'width');
            const px = typeof result === 'string' ? parseFloat(String(result).replace(/px/g, '').trim()) : (typeof result === 'number' ? result : 48);
            return Math.max(24, Math.min(120, !isNaN(px) ? px : 48));
          }
          const gcValue = parseFloat(String(rightAngleSizeGcStr).replace(/gc/g, '').trim()) || 48;
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          return Math.max(24, Math.min(120, (gcValue / gridSystemCols) * viewportWidth));
        })()
      : 0;
    
    // Right-angle moving marker: same offset as static (legLength * sqrt(2) toward interior), interpolated from source to target
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    if (useRightAngleMarker) {
      const rightAngleLegLengthPx = movingRightAngleSizePx / 2;
      const offsetScale = Math.SQRT2;
      const sourceOffsetX = rightAngleLegLengthPx * offsetScale * Math.cos((sourceStartAngle - 45) * (Math.PI / 180));
      const sourceOffsetY = rightAngleLegLengthPx * offsetScale * Math.sin((sourceStartAngle - 45) * (Math.PI / 180));
      const targetOffsetX = rightAngleLegLengthPx * offsetScale * Math.cos((targetStartAngle - 45) * (Math.PI / 180));
      const targetOffsetY = rightAngleLegLengthPx * offsetScale * Math.sin((targetStartAngle - 45) * (Math.PI / 180));
      currentOffsetX = sourceOffsetX + (targetOffsetX - sourceOffsetX) * easedProgress;
      currentOffsetY = sourceOffsetY + (targetOffsetY - sourceOffsetY) * easedProgress;
    }
    
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
    // 180° label font size: 30gc (use GridCellFontUtils for consistent gc scaling)
    let deg180FontSize = '30px';
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      deg180FontSize = window.GridCellFontUtils.processGcProperty('30gc', 'fontSize');
    }
    
    // Dashed line stroke width: match side (edge) thickness
    const dashedLineStrokeWidth = processGcToPixels(edgeThickness || '4gc', 4);
    
    // Semicircle (180° arc) - fixed viewBox, same container size in gc as arc
    const semicircleRadius = 60;
    const semicircleViewBoxSize = 120;
    
    // Semicircle size in gc: use config prop if set, else derive from arc size (1.25× then +15%)
    const arcSizeNum = (typeof arcSizeFromProp === 'string' && arcSizeFromProp.includes('gc'))
      ? parseFloat(arcSizeFromProp.replace('gc', '').trim()) || 1
      : (typeof arcSizeFromProp === 'number' ? arcSizeFromProp : 1);
    const semicircleSizeGcStr = (sumSemicircleSizeGc && typeof sumSemicircleSizeGc === 'string' && sumSemicircleSizeGc.includes('gc'))
      ? sumSemicircleSizeGc
      : `${arcSizeNum * 1.25 * 1.15}gc`;
    let responsiveSemicircleSize = '50px';
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      responsiveSemicircleSize = window.GridCellFontUtils.processGcProperty(semicircleSizeGcStr, 'width');
    }
    
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
    
    // Extended dashed line: same coordinate system as sides (viewBox 0 0 100 100), from target vertex along side
    const sideDx = targetLeft - sourceLeft;
    const sideDy = targetTop - sourceTop;
    const sideLengthPercent = Math.sqrt(sideDx * sideDx + sideDy * sideDy) || 0.01;
    // Extension = 30% of the side length (dashed line extends past target by 30% of the side)
    const extensionLengthPercent = 0.75 * sideLengthPercent;
    const minExtensionPercent = 3;
    const extensionLength = Math.max(extensionLengthPercent, minExtensionPercent);
    const unitX = sideDx / sideLengthPercent;
    const unitY = sideDy / sideLengthPercent;
    const extX2 = targetLeft + extensionLength * unitX;
    const extY2 = targetTop + extensionLength * unitY;
    // Semicircle diameter should align with the side (dashed line); +180 flips so the arc is on the correct side of the line
    const sideAngleDeg = Math.atan2(sideDy, sideDx) * (180 / Math.PI);
    const semicircleRotationDeg = sideAngleDeg - 90 + 180;
    const edgeThicknessGc = typeof edgeThickness === 'string' && edgeThickness.includes('gc')
      ? parseFloat(edgeThickness.replace('gc', '')) || 4
      : (typeof edgeThickness === 'number' ? edgeThickness : 4);
    const extensionStrokeViewBox = containerWidthGc > 0 ? (edgeThicknessGc / containerWidthGc) * 100 : 0.5;
    // Semicircle stroke width: same as angle arc (moving arc uses strokeWidth 8 in viewBox 100; scale to semicircle viewBox)
    const angleArcStrokeWidth = 8;
    const semicircleStrokeViewBox = angleArcStrokeWidth * (semicircleViewBoxSize / viewBoxSize);
    
    const movingMarkerRotation = useRightAngleMarker ? (rightAngleBaseRotation + currentRotation + 180) : currentRotation;
    const movingMarkerTransform = useRightAngleMarker
      ? `translate(-50%, -50%) translate(${currentOffsetX}px, ${currentOffsetY}px) rotate(${movingMarkerRotation}deg)`
      : `translate(-50%, -50%) rotate(${movingMarkerRotation}deg)`;
    return React.createElement(React.Fragment, { key: 'animated-angle-sum-arc-container' }, [
      // Animated marker: right-angle L (when 90°) or circular arc (source interior angle moving to target supplementary angle)
      React.createElement('div', {
        key: 'animated-sum-arc',
        style: {
          position: 'absolute',
          left: `${currentLeft}%`,
          top: `${currentTop}%`,
          width: useRightAngleMarker ? `${movingRightAngleSizePx}px` : responsiveSumArcSize,
          height: useRightAngleMarker ? `${movingRightAngleSizePx}px` : responsiveSumArcSize,
          transform: movingMarkerTransform,
          transformOrigin: 'center center',
          zIndex: zIndex + 200,
          opacity: isComplete ? undefined : opacity, // CSS animation handles opacity when complete
          pointerEvents: 'none',
          transition: !isComplete && progress < 0.1 ? 'opacity 0.1s ease-in' : 'none',
          animation: isComplete ? 'angleEqualityBlink 1s ease-in-out infinite' : 'none'
        }
      }, React.createElement('svg', {
        viewBox: `${-viewBoxSize/2} ${-viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        style: {
          width: '100%',   // Fill the responsive container
          height: '100%',  // Fill the responsive container
          overflow: 'visible'
        }
      }, useRightAngleMarker ? [
        // Right-angle L marker (90°): same config as static; stroke color yellow for visibility while moving
        React.createElement('path', {
          key: 'right-angle',
          d: rightAnglePathData,
          fill: 'none',
          stroke: '#FFFF00',
          strokeWidth: rightAngleStrokeWidth,
          strokeOpacity: opacity,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        })
      ] : [
        // Filled arc sector (same color as angle arc at source vertex)
        React.createElement('path', {
          key: 'fill',
          d: fillPathData,
          fill: movingArcColor,
          fillOpacity: (arcConfig.fillOpacity ?? 0.5) * opacity,
          stroke: 'none'
        }),
        // Arc stroke (same color as angle arc at source vertex)
        React.createElement('path', {
          key: 'stroke',
          d: arcPathData,
          fill: 'none',
          stroke: movingArcColor,
          strokeWidth: 8,
          strokeOpacity: opacity,
          strokeLinecap: 'round'
        })
      ])),
      
      // Semicircle (180° arc) - appears when animation completes; size = 1.25x arc size prop; diameter aligned with the side
      isComplete && React.createElement('div', {
        key: 'semicircle-180',
        style: {
          position: 'absolute',
          left: `${targetLeft}%`,
          top: `${targetTop}%`,
          width: responsiveSemicircleSize,
          height: responsiveSemicircleSize,
          transform: `translate(-50%, -50%) rotate(${semicircleRotationDeg}deg)`,
          transformOrigin: 'center center',
          zIndex: zIndex + 201,
          pointerEvents: 'none'
        }
      }, React.createElement('svg', {
        viewBox: `${-semicircleViewBoxSize/2} ${-semicircleViewBoxSize/2} ${semicircleViewBoxSize} ${semicircleViewBoxSize}`,
        width: '100%',
        height: '100%',
        style: {
          overflow: 'visible'
        }
      }, [
        React.createElement('path', {
          key: 'semicircle-stroke',
          d: semicirclePathData,
          fill: 'none',
          stroke: movingArcColor,
          strokeWidth: semicircleStrokeViewBox,
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
      
      // Extended dashed line: show from start (line-first phase), then arc moves; same coords as sides SVG
      React.createElement('svg', {
        key: 'angle-sum-extended-line',
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('line', {
        x1: targetLeft,
        y1: targetTop,
        x2: extX2,
        y2: extY2,
        stroke: edgeColor,
        strokeWidth: extensionStrokeViewBox,
        strokeOpacity: 1,
        strokeDasharray: '4 3',
        strokeLinecap: 'round'
      })),
      
      // "180°" text inside the shape, 15gc from the semicircle
      isComplete && (() => {
        // Interior direction at target = bisector of the two edges (target→source and target→other)
        const otherCol = sourceVertexIndex === targetPrevIndex ? targetNext.col : targetPrev.col;
        const otherRow = sourceVertexIndex === targetPrevIndex ? targetNext.row : targetPrev.row;
        const otherLeft = offsetX + (otherCol / gridCols) * width;
        const otherTop = offsetY + (otherRow / gridRows) * height;
        const toSourceX = sourceLeft - targetLeft;
        const toSourceY = sourceTop - targetTop;
        const toOtherX = otherLeft - targetLeft;
        const toOtherY = otherTop - targetTop;
        const lenSource = Math.sqrt(toSourceX * toSourceX + toSourceY * toSourceY) || 1e-6;
        const lenOther = Math.sqrt(toOtherX * toOtherX + toOtherY * toOtherY) || 1e-6;
        const ux = toSourceX / lenSource + toOtherX / lenOther;
        const uy = toSourceY / lenSource + toOtherY / lenOther;
        const lenB = Math.sqrt(ux * ux + uy * uy) || 1e-6;
        const dirX = ux / lenB;
        const dirY = uy / lenB;
        // Distance = semicircle radius (in %) + 15gc (in %)
        let containerWidthPx = 800;
        try {
          if (containerRef?.current?.getBoundingClientRect) {
            const rect = containerRef.current.getBoundingClientRect();
            if (rect && typeof rect.width === 'number') containerWidthPx = rect.width;
          }
        } catch (_) {}
        const semicircleSizePx = parseFloat(String(responsiveSemicircleSize).replace(/px/g, '')) || 50;
        const semicircleRadiusPercent = containerWidthPx > 0 ? 0.5 * (semicircleSizePx / containerWidthPx) * 100 : 6.25;
        let dist15gcPx = 15;
        if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
          dist15gcPx = parseFloat(String(window.GridCellFontUtils.processGcProperty('15gc', 'width')).replace(/px/g, '')) || 15;
        }
        const dist15gcPercent = containerWidthPx > 0 ? (dist15gcPx / containerWidthPx) * 100 : 2;
        const distancePercent = 1.5 * (semicircleRadiusPercent + dist15gcPercent);
        const offsetXLabel = dirX * distancePercent;
        const offsetYLabel = dirY * distancePercent;
        const labelLeft = deg180TextOffsetY !== null ? targetLeft : targetLeft + offsetXLabel;
        const labelTop = deg180TextOffsetY !== null ? targetTop + deg180TextOffsetY : targetTop + offsetYLabel;
        return React.createElement('div', {
          key: '180-deg-text',
          style: {
            position: 'absolute',
            left: `${labelLeft}%`,
            top: `${labelTop}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'angleEqualityBlink 1s ease-in-out infinite',
            fontSize: deg180FontSize,
            fontWeight: 'bold',
            fontFamily: angleTextFont || 'Arial, sans-serif',
            color: 'orange',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }
        }, '180°');
      })(),
      
      // Success message (only if sumMessage is set; default is empty so "These angles add up..." is not shown)
      isComplete && sumMessage && React.createElement('div', {
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
  }, [angleSumAnimation, equalityVertexColors, vertices, angles, getVertexPosition, getVertexAngleConfig, coordinates, gridRows, gridCols, angleArcSizeGc, angleRightAngleSizeGc, angleMarkerSize, angleMarkerColor, angleTextSize, angleTextFont, angleTextColor, zIndex, sumMessage, sumMessageLeft, sumMessageTop, sumMessageOffsetX, sumMessageOffsetY, deg180TextFontSize, deg180TextOffsetY, sumSemicircleSizeGc, edgeThickness, edgeColor, gridPadding]);

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
          size: protractorConfig.angleDisplaySize || '28gc',
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
  // Uses same coordinate system as renderSides: gridDimensions and getVertexPercent (container-relative 0-100)
  const renderAnimatedSideLine = React.useMemo(() => {
    if (!sideEqualityAnimation || !coordinates || !gridDimensions) {
      return null;
    }

    const { commonVertexIndex, prevVertexIndex, nextVertexIndex, progress } = sideEqualityAnimation;
    
    // Get vertex positions (row, col)
    const commonVertex = getVertexPosition(commonVertexIndex);
    const prevVertex = getVertexPosition(prevVertexIndex);
    const nextVertex = getVertexPosition(nextVertexIndex);
    
    // Same formula as renderSides: percentage within container with centered grid
    const { width, height, offsetX, offsetY } = gridDimensions;
    const getVertexPercent = (vertex) => ({
      x: offsetX + (vertex.col / gridCols) * width,
      y: offsetY + (vertex.row / gridRows) * height
    });
    
    const commonPercent = getVertexPercent(commonVertex);
    const prevPercent = getVertexPercent(prevVertex);
    const nextPercent = getVertexPercent(nextVertex);
    
    // Use the shorter rotation (internal angle) so the line pivots inside the shape, not outside
    const side1AngleFromCommon = Math.atan2(prevPercent.y - commonPercent.y, prevPercent.x - commonPercent.x) * (180 / Math.PI);
    const side2AngleFromCommon = Math.atan2(nextPercent.y - commonPercent.y, nextPercent.x - commonPercent.x) * (180 / Math.PI);
    let angleDiff = side2AngleFromCommon - side1AngleFromCommon;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff <= -180) angleDiff += 360;
    const currentAngle = side1AngleFromCommon + angleDiff * progress;
    const angleRad = currentAngle * Math.PI / 180;
    
    // Keep the moving line's VISUAL (pixel) length constant throughout the animation.
    // ViewBox has preserveAspectRatio="none", so the same viewBox length looks different at different angles.
    // Compute side1's pixel length once, then for each frame use viewBox length k so pixel length stays the same.
    const viewW = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewH = typeof window !== 'undefined' ? window.innerHeight : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const [x1, y1, x2, y2] = coordinates;
    const containerWidthPx = ((x2 - x1 + 1) / gridSystemCols) * viewW;
    const containerHeightPx = ((y2 - y1 + 1) / gridSystemRows) * viewH;
    const dx1 = (prevPercent.x - commonPercent.x) / 100;
    const dy1 = (prevPercent.y - commonPercent.y) / 100;
    const side1PixelLength = Math.sqrt(Math.pow(dx1 * containerWidthPx, 2) + Math.pow(dy1 * containerHeightPx, 2));
    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);
    const denom = Math.sqrt(Math.pow(containerWidthPx * cosA, 2) + Math.pow(containerHeightPx * sinA, 2));
    const k = denom > 1e-6 ? (side1PixelLength * 100) / denom : 0;
    const lineEndX = commonPercent.x + cosA * k;
    const lineEndY = commonPercent.y + sinA * k;
    
    // Line thickness in viewBox units (viewBox 0-100)
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
    const messageTextSize = processGcToPixels(sideMessageFontSize, 14);
    const lineThicknessViewBox = 0.5;
    const strokeDashViewBox = sideLineStyle === 'dashed' ? `${lineThicknessViewBox * 2}, ${lineThicknessViewBox}` : 'none';
    
    let msgLeft, msgTop;
    if (sideMessageAtCenter) {
      const fourthVertexIndex = (commonVertexIndex + 2) % 4;
      const fourthVertex = getVertexPosition(fourthVertexIndex);
      const fourthPercent = getVertexPercent(fourthVertex);
      const centerX = (commonPercent.x + prevPercent.x + nextPercent.x + fourthPercent.x) / 4;
      const centerY = (commonPercent.y + prevPercent.y + nextPercent.y + fourthPercent.y) / 4;
      msgLeft = `${centerX}%`;
      msgTop = `${centerY}%`;
    } else {
      msgLeft = sideMessageLeft !== null ? `${sideMessageLeft}%` : `${commonPercent.x + sideMessageOffsetX}%`;
      msgTop = sideMessageTop !== null ? `${sideMessageTop}%` : `${commonPercent.y + sideMessageOffsetY}%`;
    }
    // Update message at end of rotation (progress >= 1), not at start
    const showEndMessage = progress >= 1;
    const displayMessage = showEndMessage
      ? (Array.isArray(sideEqualityMessages) && sideEqualityMessages[commonVertexIndex] ? sideEqualityMessages[commonVertexIndex] : sideEqualityMessage)
      : (commonVertexIndex === 1 ? '' : (Array.isArray(sideEqualityMessages) && sideEqualityMessages[(commonVertexIndex + 3) % 4] ? sideEqualityMessages[(commonVertexIndex + 3) % 4] : sideEqualityMessage));
    
    return React.createElement(React.Fragment, { key: 'animated-side-line-container' }, [
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
        x1: commonPercent.x,
        y1: commonPercent.y,
        x2: lineEndX,
        y2: lineEndY,
        stroke: 'orange',
        strokeWidth: lineThicknessViewBox,
        strokeDasharray: strokeDashViewBox,
        strokeLinecap: 'round',
        style: {
          animation: 'sideEqualityBlink 0.8s ease-in-out infinite'
        }
      })),
      ...(displayMessage ? [React.createElement('div', {
        key: 'side-equality-message',
        style: {
          position: 'absolute',
          left: msgLeft,
          top: msgTop,
          transform: sideMessageAtCenter ? 'translate(-50%, -50%)' : 'translate(-50%, -100%)',
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
      }, displayMessage)] : [])
    ]);
  }, [sideEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, edgeThickness, sideMessageFontSize, angleTextFont, zIndex, sideEqualityMessage, sideEqualityMessages, sideMessageLeft, sideMessageTop, sideMessageOffsetX, sideMessageOffsetY, sideLineStyle, sideMessageAtCenter]);

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
    
    // Calculate positions in percentage - use EXACT same method as renderSides
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = ((x2 - x1 + 1) / gridSystemCols) * 100;
    const containerHeightPercent = ((y2 - y1 + 1) / gridSystemRows) * 100;
    
    // Use pre-calculated grid dimensions (square cell algorithm) - same as renderSides
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as renderSides: offsetX + (col / gridCols) * width
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Get source and target positions using the same method as regular sides
    const sourceStartPercent = getVertexPercent(sourceStartVertex);
    const sourceEndPercent = getVertexPercent(sourceEndVertex);
    const targetStartPercent = getVertexPercent(targetStartVertex);
    const targetEndPercent = getVertexPercent(targetEndVertex);
    
    // Calculate translation offset based on progress
    // The line translates from source position to target position
    const translateX = (targetStartPercent.x - sourceStartPercent.x) * progress;
    const translateY = (targetStartPercent.y - sourceStartPercent.y) * progress;
    
    // Current line position (source + translation) - preserves exact side length
    const currentStartX = sourceStartPercent.x + translateX;
    const currentStartY = sourceStartPercent.y + translateY;
    const currentEndX = sourceEndPercent.x + translateX;
    const currentEndY = sourceEndPercent.y + translateY;
    
    // Determine color and animation based on pair index
    const lineColor = pairIndex === 0 ? oppositeSideColor1 : oppositeSideColor2;
    const blinkAnimation = pairIndex === 0 ? 'oppositeSideBlinkOrange' : 'oppositeSideBlinkBlue';
    
    console.log('🎨 Opposite side animation details:', {
      pairIndex,
      sourceStart: `(${sourceStartPercent.x.toFixed(2)}%, ${sourceStartPercent.y.toFixed(2)}%)`,
      sourceEnd: `(${sourceEndPercent.x.toFixed(2)}%, ${sourceEndPercent.y.toFixed(2)}%)`,
      targetStart: `(${targetStartPercent.x.toFixed(2)}%, ${targetStartPercent.y.toFixed(2)}%)`,
      translateX: translateX.toFixed(2),
      translateY: translateY.toFixed(2),
      progress: progress.toFixed(3)
    });
    
    return React.createElement(React.Fragment, { key: 'animated-opposite-side-line-container' }, [
      // Animated line using SVG (matching sides rendering - positioned same as regular sides)
      React.createElement('svg', {
        key: 'animated-opposite-side-line',
        style: {
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('line', {
        x1: `${currentStartX}%`,
        y1: `${currentStartY}%`,
        x2: `${currentEndX}%`,
        y2: `${currentEndY}%`,
        stroke: lineColor,
        strokeWidth: edgeThickness || '4gc',
        strokeDasharray: oppositeSideLineStyle === 'dashed' ? '8, 4' : 'none',
        strokeLinecap: 'round',
        style: {
          animation: `${blinkAnimation} 0.8s ease-in-out infinite`
        }
      }))
    ]);
  }, [oppositeSideAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, edgeThickness, zIndex, oppositeSideLineStyle, oppositeSideColor1, oppositeSideColor2]);

  // Render animated diagonal equality line
  const renderAnimatedDiagonalEquality = React.useMemo(() => {
    if (!diagonalEqualityAnimation) {
      return null;
    }

    const { progress, phase } = diagonalEqualityAnimation;
    // Get diagonal vertices
    // Diagonal 1: A (0) to C (2)
    // Diagonal 2: B (1) to D (3)
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Use the same coordinate calculation as renderDiagonals
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Use pre-calculated grid dimensions (square cell algorithm) - EXACT same as renderDiagonals
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions as percentages within container, accounting for centered grid
    // Use EXACT same formula as renderDiagonals: offsetX + (col / gridCols) * width
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Source diagonal: AC (0 to 2) - use same calculation as renderDiagonals
    const p0 = getVertexPercent(v0);
    const p2 = getVertexPercent(v2);
    const sourceStartXPercent = p0.x;
    const sourceStartYPercent = p0.y;
    const sourceEndXPercent = p2.x;
    const sourceEndYPercent = p2.y;
    
    // Target diagonal: BD (1 to 3) - use same calculation as renderDiagonals
    const p1 = getVertexPercent(v1);
    const p3 = getVertexPercent(v3);
    const targetStartXPercent = p1.x;
    const targetStartYPercent = p1.y;
    const targetEndXPercent = p3.x;
    const targetEndYPercent = p3.y;
    
    // Calculate diagonal lengths for alignment
    const sourceDx = sourceEndXPercent - sourceStartXPercent;
    const sourceDy = sourceEndYPercent - sourceStartYPercent;
    const targetDx = targetEndXPercent - targetStartXPercent;
    const targetDy = targetEndYPercent - targetStartYPercent;
    
    // Pivot at diagonal intersection (so the dashed line rotates around the intersection point)
    const pivotX = diagonalIntersection != null
      ? offsetX + (diagonalIntersection.col / gridCols) * width
      : (sourceStartXPercent + sourceEndXPercent) / 2;
    const pivotY = diagonalIntersection != null
      ? offsetY + (diagonalIntersection.row / gridRows) * height
      : (sourceStartYPercent + sourceEndYPercent) / 2;
    
    // Calculate rotation angle to align source diagonal with target diagonal
    const sourceAngle = Math.atan2(sourceDy, sourceDx);
    const targetAngle = Math.atan2(targetDy, targetDx);
    const rotationAngle = (targetAngle - sourceAngle) * (180 / Math.PI);
    const currentRotation = rotationAngle * progress;
    
    // No translation when pivoting at intersection (both diagonals pass through it)
    
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
    
    // Use same thickness calculation as diagonals (processThickness for viewBox units)
    const diagonalThickness = processThickness(edgeThickness || '4gc');
    const messageTextSize = processGcToPixels(angleTextSize || '14gc', 14);
    
    // Calculate message position (at target diagonal midpoint)
    // Use absolute page coordinates for message (same as angle equality animation)
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    const pageContainerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const pageContainerTop = ((y1 - 1) / gridSystemRows) * 100;
    const pageContainerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const pageContainerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    const targetMidX = (targetStartXPercent + targetEndXPercent) / 2;
    const targetMidY = (targetStartYPercent + targetEndYPercent) / 2;
    const messageLeft = diagonalEqualityMessageLeft !== null ? diagonalEqualityMessageLeft : 
      pageContainerLeft + (targetMidX / 100) * pageContainerWidthPercent + diagonalEqualityMessageOffsetX;
    const messageTop = diagonalEqualityMessageTop !== null ? diagonalEqualityMessageTop : 
      pageContainerTop + (targetMidY / 100) * pageContainerHeightPercent + diagonalEqualityMessageOffsetY;
    
    // Calculate dash array based on line style
    // Use getStrokeDashArray for consistent styling (dotted: 0, thickness*3)
    const dashArray = getStrokeDashArray(diagonalEqualityLineStyle, diagonalThickness);
    
    return React.createElement(React.Fragment, { key: 'animated-diagonal-equality-container' }, [
      // Animated line using SVG - positioned same as renderDiagonals (0%, 0%, 100%, 100% relative to wrapper)
      // SVG transforms work independently of CSS 3D contexts
      React.createElement('svg', {
        key: 'animated-diagonal-equality-line',
        'data-diagonal-equality-animation': 'true',
        style: {
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, React.createElement('g', {
        transform: `translate(${pivotX}, ${pivotY}) rotate(${currentRotation}) translate(${-pivotX}, ${-pivotY})`
      }, React.createElement('line', {
        x1: sourceStartXPercent,
        y1: sourceStartYPercent,
        x2: sourceEndXPercent,
        y2: sourceEndYPercent,
        stroke: diagonalEqualityColor,
        strokeWidth: diagonalThickness, // Use same thickness as diagonals (in viewBox units)
        strokeDasharray: dashArray,
        strokeLinecap: 'round',
        style: {
          animation: phase === 'waiting-at-target' ? 'diagonalEqualityBlink 0.8s ease-in-out infinite' : 'none'
        }
      }))),
      
      // Success message (only show if message is not empty)
      (diagonalEqualityMessage && diagonalEqualityMessage.trim() !== '' && (phase === 'waiting-at-target' || progress > 0.8)) && React.createElement('div', {
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
  }, [diagonalEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, diagonalIntersection, processThickness, getStrokeDashArray, edgeThickness, angleTextSize, angleTextFont, zIndex, diagonalEqualityMessage, diagonalEqualityMessageLeft, diagonalEqualityMessageTop, diagonalEqualityMessageOffsetX, diagonalEqualityMessageOffsetY, diagonalEqualityLineStyle, diagonalEqualityColor]);

  // Render animated diagonal bisection (dashed line rotating from one half to the other)
  // Animation: AO rotates around O to overlay on OC (proving AC is bisected),
  //            then BO rotates around O to overlay on OD (proving BD is bisected)
  const renderAnimatedDiagonalBisection = React.useMemo(() => {
    if (!diagonalBisectionAnimation) {
      return null;
    }

    const { progress, phase, cyclePhase = 'to', currentDiagonal } = diagonalBisectionAnimation;
    
    // Get diagonal vertices
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Use the same coordinate calculation as renderDiagonals
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Use pre-calculated grid dimensions (square cell algorithm) - same as renderDiagonals
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Calculate vertex positions as percentages within container
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    const pA = getVertexPercent(v0);
    const pB = getVertexPercent(v1);
    const pC = getVertexPercent(v2);
    const pD = getVertexPercent(v3);
    
    // Calculate intersection point O (using line intersection formula)
    const denom = (pA.x - pC.x) * (pB.y - pD.y) - (pA.y - pC.y) * (pB.x - pD.x);
    let oX, oY;
    
    if (Math.abs(denom) < 0.0001) {
      // Lines are parallel, use midpoint of AC
      oX = (pA.x + pC.x) / 2;
      oY = (pA.y + pC.y) / 2;
    } else {
      const t = ((pA.x - pB.x) * (pB.y - pD.y) - (pA.y - pB.y) * (pB.x - pD.x)) / denom;
      oX = pA.x + t * (pC.x - pA.x);
      oY = pA.y + t * (pC.y - pA.y);
    }
    
    // Calculate angles from O to each vertex (for rotation)
    const angleOA = Math.atan2(pA.y - oY, pA.x - oX);
    const angleOC = Math.atan2(pC.y - oY, pC.x - oX);
    const angleOB = Math.atan2(pB.y - oY, pB.x - oX);
    const angleOD = Math.atan2(pD.y - oY, pD.x - oX);
    
    // Calculate distances from O to each vertex
    const distOA = Math.sqrt((pA.x - oX) ** 2 + (pA.y - oY) ** 2);
    const distOC = Math.sqrt((pC.x - oX) ** 2 + (pC.y - oY) ** 2);
    const distOB = Math.sqrt((pB.x - oX) ** 2 + (pB.y - oY) ** 2);
    const distOD = Math.sqrt((pD.x - oX) ** 2 + (pD.y - oY) ** 2);
    
    // Determine rotation direction (shortest path)
    const normalizeAngle = (a) => {
      while (a > Math.PI) a -= 2 * Math.PI;
      while (a < -Math.PI) a += 2 * Math.PI;
      return a;
    };
    
    // For AC: rotate from OA direction to OC direction
    let rotationAC = normalizeAngle(angleOC - angleOA);
    // For BD: rotate from OB direction to OD direction
    let rotationBD = normalizeAngle(angleOD - angleOB);
    
    // Calculate line thickness
    const diagonalThickness = processThickness(edgeThickness || '4gc');
    
    // Calculate dash array based on line style
    const dashArray = getStrokeDashArray(diagonalBisectionLineStyle, diagonalThickness);
    
    // Determine what to render based on current diagonal and cycle phase
    // 'to': progress 0→1 = start half → other half (e.g. AO→OC). 'back': progress 0→1 = other half → start (OC→AO).
    let lineStartX, lineStartY, lineEndX, lineEndY, currentRotation, lineLength, color;
    
    if (currentDiagonal === 'ac') {
      lineLength = distOA;
      if (cyclePhase === 'to') {
        currentRotation = angleOA + rotationAC * progress;
      } else if (cyclePhase === 'back') {
        currentRotation = angleOC - rotationAC * progress; // OD→BO style: from OC back to OA
      } else {
        currentRotation = angleOA;
      }
      lineStartX = oX;
      lineStartY = oY;
      lineEndX = oX + Math.cos(currentRotation) * lineLength;
      lineEndY = oY + Math.sin(currentRotation) * lineLength;
      color = diagonalBisectionColor1;
    } else {
      lineLength = distOB;
      if (cyclePhase === 'to') {
        currentRotation = angleOB + rotationBD * progress;
      } else if (cyclePhase === 'back') {
        currentRotation = angleOD - rotationBD * progress; // OD back to BO
      } else {
        currentRotation = angleOB;
      }
      lineStartX = oX;
      lineStartY = oY;
      lineEndX = oX + Math.cos(currentRotation) * lineLength;
      lineEndY = oY + Math.sin(currentRotation) * lineLength;
      color = diagonalBisectionColor2;
    }
    
    return React.createElement(React.Fragment, { key: 'animated-diagonal-bisection-container' }, [
      // Animated dashed line using SVG
      React.createElement('svg', {
        key: 'animated-diagonal-bisection-line',
        'data-diagonal-bisection-animation': 'true',
        style: {
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        // The rotating dashed line
        React.createElement('line', {
          key: 'rotating-line',
          x1: lineStartX,
          y1: lineStartY,
          x2: lineEndX,
          y2: lineEndY,
          stroke: color,
          strokeWidth: diagonalThickness,
          strokeDasharray: dashArray,
          strokeLinecap: 'round',
          style: {
            animation: phase === 'holding' ? 'diagonalBisectionBlink 0.8s ease-in-out infinite' : 'none'
          }
        }),
        // Highlight intersection point O
        React.createElement('circle', {
          key: 'intersection-point-o',
          cx: oX,
          cy: oY,
          r: 0.8,
          fill: '#00AA00',
          stroke: '#FFFFFF',
          strokeWidth: 0.2
        })
      ])
    ]);
  }, [diagonalBisectionAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, processThickness, getStrokeDashArray, edgeThickness, zIndex, diagonalBisectionColor1, diagonalBisectionColor2, diagonalBisectionLineStyle]);

  // Render animated rotational symmetry (rotating dashed overlay shape)
  const renderAnimatedRotationalSymmetry = React.useMemo(() => {
    if (!rotationalSymmetryAnimation) {
      return null;
    }

    const { currentAngle, phase } = rotationalSymmetryAnimation;
    
    // Get vertex positions in grid space (col, row) — same scale in both directions
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Use pre-calculated grid dimensions
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Same mapping the main shape uses: grid (col, row) → container percentage
    const gridToPercent = (col, row) => ({
      x: offsetX + (col / gridCols) * width,
      y: offsetY + (row / gridRows) * height
    });
    
    // Get centroid in grid space (diagonal intersection)
    const centroid = diagonalIntersection;
    if (!centroid) return null;
    
    const cCol = centroid.col;
    const cRow = centroid.row;
    
    // Rotate a point in grid space around (cCol, cRow); grid has square cells so angles/lengths stay correct
    const rotateInGrid = (col, row, angleDeg) => {
      const rad = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const dCol = col - cCol;
      const dRow = row - cRow;
      return {
        col: cCol + dCol * cos - dRow * sin,
        row: cRow + dCol * sin + dRow * cos
      };
    };
    
    // Rotate each vertex in grid space, then convert to container percentage
    const rotatedA = rotateInGrid(v0.col, v0.row, currentAngle);
    const rotatedB = rotateInGrid(v1.col, v1.row, currentAngle);
    const rotatedC = rotateInGrid(v2.col, v2.row, currentAngle);
    const rotatedD = rotateInGrid(v3.col, v3.row, currentAngle);
    
    const pA = gridToPercent(rotatedA.col, rotatedA.row);
    const pB = gridToPercent(rotatedB.col, rotatedB.row);
    const pC = gridToPercent(rotatedC.col, rotatedC.row);
    const pD = gridToPercent(rotatedD.col, rotatedD.row);
    
    const centroidPercent = gridToPercent(cCol, cRow);
    
    // Calculate line thickness
    const overlayThickness = processThickness(edgeThickness || '6gc');
    
    // Calculate dash array
    const dashArray = getStrokeDashArray(rotationalSymmetryLineStyle, overlayThickness);
    
    // Determine color based on phase
    const overlayColor = phase === 'paused' ? rotationalSymmetryMatchColor : rotationalSymmetryOverlayColor;
    
    // Calculate centroid size in viewBox units
    const centroidSizeGc = parseFloat(rotationalSymmetryCentroidSize.replace('gc', '')) || 25;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    const centroidSizePixels = (centroidSizeGc / gridSystemCols) * viewportWidth;
    const centroidRadius = (centroidSizePixels / viewportWidth) * 100; // Convert to viewBox percentage
    
    // Calculate angle text size
    const angleFontSizeGc = parseFloat(rotationalSymmetryAngleFontSize.replace('gc', '')) || 30;
    const angleFontSizePixels = (angleFontSizeGc / gridSystemCols) * viewportWidth;
    
    // Position angle display just above the shape, 300 gc left of previous position, 100 gc down
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const offsetLeftGc = 400;
    const offsetLeftPercent = (offsetLeftGc / gridSystemCols) * 100;
    const offsetDownGc = 75;
    const offsetDownPercent = (offsetDownGc / gridSystemRows) * 100;
    const angleDisplayRight = 5 + offsetLeftPercent; // move left = increase right %
    const angleDisplayTop = 2 + offsetDownPercent; // just above the shape, then 100 gc down
    
    return React.createElement(React.Fragment, { key: 'animated-rotational-symmetry-container' }, [
      // SVG for dashed overlay shape
      React.createElement('svg', {
        key: 'rotational-symmetry-overlay',
        'data-rotational-symmetry-animation': 'true',
        style: {
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 210,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        // Rotated quadrilateral overlay
        React.createElement('polygon', {
          key: 'rotated-quad',
          points: `${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`,
          fill: 'none',
          stroke: overlayColor,
          strokeWidth: overlayThickness,
          strokeDasharray: dashArray,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          style: {
            animation: phase === 'paused' ? 'angleEqualityBlink 0.8s ease-in-out infinite' : 'none'
          }
        }),
        // Centroid point
        React.createElement('circle', {
          key: 'centroid-point',
          cx: centroidPercent.x,
          cy: centroidPercent.y,
          r: centroidRadius,
          fill: rotationalSymmetryCentroidColor,
          stroke: '#FFFFFF',
          strokeWidth: 0.15,
          style: {
            animation: 'angleEqualityBlink 1s ease-in-out infinite'
          }
        })
      ]),
      
      // Angle display text (just above the shape, 300 gc left of previous position)
      React.createElement('div', {
        key: 'angle-display',
        style: {
          position: 'absolute',
          right: `${angleDisplayRight}%`,
          top: `${angleDisplayTop}%`,
          zIndex: zIndex + 211,
          pointerEvents: 'none',
          fontSize: `${angleFontSizePixels}px`,
          fontWeight: 'bold',
          fontFamily: angleTextFont || 'Arial, sans-serif',
          color: rotationalSymmetryAngleColor,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }
      }, `${rotationalSymmetryAngleLabel} : ${Math.round(currentAngle)} deg`)
    ]);
  }, [rotationalSymmetryAnimation, vertices, getVertexPosition, gridDimensions, gridRows, gridCols, diagonalIntersection, processThickness, getStrokeDashArray, edgeThickness, rotationalSymmetryLineStyle, rotationalSymmetryOverlayColor, rotationalSymmetryMatchColor, rotationalSymmetryCentroidSize, rotationalSymmetryCentroidColor, rotationalSymmetryAngleFontSize, rotationalSymmetryAngleColor, rotationalSymmetryAngleLabel, angleTextFont, zIndex]);

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

  // Render animated diagonal angle bisection (half-angle arc rotating to overlay)
  // Shows that a diagonal bisects the interior angles at its endpoints
  const renderAnimatedDiagonalAngleBisection = React.useMemo(() => {
    if (!diagonalAngleBisectionAnimation) {
      console.log('[DiagonalAngleBisection] render: no animation state, return null');
      return null;
    }

    const { diagonalIndex, currentVertex, phase, progress } = diagonalAngleBisectionAnimation;
    const logRender = progress === 0 || progress >= 0.99 || phase === 'holding' || Math.abs(progress - 0.5) < 0.05;
    if (logRender) {
      console.log('[DiagonalAngleBisection] render', { diagonalIndex, currentVertex, phase, progress: Math.round(progress * 100) / 100 });
    }

    // Get the vertex being animated
    const vertexPos = getVertexPosition(currentVertex);
    const prevIndex = (currentVertex - 1 + 4) % 4;
    const nextIndex = (currentVertex + 1) % 4;
    const prevVertex = getVertexPosition(prevIndex);
    const nextVertex = getVertexPosition(nextIndex);
    
    // Get the diagonal endpoint (the opposite vertex along the diagonal)
    const diagonalEndIndex = diagonalIndex === 0 
      ? (currentVertex === 0 ? 2 : 0)  // AC diagonal
      : (currentVertex === 1 ? 3 : 1); // BD diagonal
    const diagonalEnd = getVertexPosition(diagonalEndIndex);

    // Calculate the interior angle at this vertex (fallback if angles[] is null e.g. AngleMarkerUtils not loaded)
    let interiorAngle = angles[currentVertex];
    if (interiorAngle === null || interiorAngle === undefined) {
      const vec1 = { x: prevVertex.col - vertexPos.col, y: prevVertex.row - vertexPos.row };
      const vec2 = { x: nextVertex.col - vertexPos.col, y: nextVertex.row - vertexPos.row };
      const dot = vec1.x * vec2.x + vec1.y * vec2.y;
      const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
      const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
      if (mag1 === 0 || mag2 === 0) return null;
      const cosAngle = dot / (mag1 * mag2);
      interiorAngle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
    }

    // Calculate vectors from vertex to adjacent vertices and diagonal endpoint
    const vecToPrev = {
      x: prevVertex.col - vertexPos.col,
      y: prevVertex.row - vertexPos.row
    };
    const vecToNext = {
      x: nextVertex.col - vertexPos.col,
      y: nextVertex.row - vertexPos.row
    };
    const vecToDiag = {
      x: diagonalEnd.col - vertexPos.col,
      y: diagonalEnd.row - vertexPos.row
    };

    // Calculate angles (from positive x-axis)
    const angleToPrev = Math.atan2(vecToPrev.y, vecToPrev.x) * (180 / Math.PI);
    const angleToNext = Math.atan2(vecToNext.y, vecToNext.x) * (180 / Math.PI);
    const angleToDiag = Math.atan2(vecToDiag.y, vecToDiag.x) * (180 / Math.PI);

    // Calculate the two half-angles
    // Half-angle 1: from prev vertex to diagonal
    // Half-angle 2: from diagonal to next vertex
    // We need to determine sweep direction for each

    // Calculate cross products to determine sweep direction
    const crossPrevDiag = vecToPrev.x * vecToDiag.y - vecToPrev.y * vecToDiag.x;
    const crossDiagNext = vecToDiag.x * vecToNext.y - vecToDiag.y * vecToNext.x;
    const crossPrevNext = vecToPrev.x * vecToNext.y - vecToPrev.y * vecToNext.x;

    // Determine which half-angle should be animated
    // We animate half-angle 1 (prev to diagonal) rotating to overlay half-angle 2 (diagonal to next)
    const halfAngle = interiorAngle / 2;
    
    // Determine sweep direction (interior direction)
    const interiorSweep = crossPrevNext > 0 ? 1 : 0;
    
    // Calculate SVG arc parameters
    const viewBoxSize = 100;
    const radius = 40;

    // Half-angle 1: from prev to diagonal (static, stays in place)
    const halfAngle1Start = angleToPrev;
    const halfAngle1End = interiorSweep === 1 
      ? halfAngle1Start + halfAngle 
      : halfAngle1Start - halfAngle;

    // Half-angle 2: from diagonal to next (this one gets animated)
    const halfAngle2Start = angleToDiag;
    const halfAngle2End = interiorSweep === 1 
      ? halfAngle2Start + halfAngle 
      : halfAngle2Start - halfAngle;

    // Convert to radians for arc path calculations
    const toRad = (deg) => deg * (Math.PI / 180);
    
    // Half-angle 1 (e.g. ABD): arc from prev to diagonal — original, stays fixed
    const arc1X1 = radius * Math.cos(toRad(halfAngle1Start));
    const arc1Y1 = radius * Math.sin(toRad(halfAngle1Start));
    const arc1X2 = radius * Math.cos(toRad(halfAngle1End));
    const arc1Y2 = radius * Math.sin(toRad(halfAngle1End));
    const arc1LargeArc = halfAngle > 180 ? 1 : 0;
    const fillPath1 = `M 0 0 L ${arc1X1} ${arc1Y1} A ${radius} ${radius} 0 ${arc1LargeArc} ${interiorSweep} ${arc1X2} ${arc1Y2} Z`;

    // Half-angle 2 (e.g. CBD): arc from diagonal to next — static arc that stays at CBD (left behind when replica moves)
    const arc2X1 = radius * Math.cos(toRad(halfAngle2Start));
    const arc2Y1 = radius * Math.sin(toRad(halfAngle2Start));
    const arc2X2 = radius * Math.cos(toRad(halfAngle2End));
    const arc2Y2 = radius * Math.sin(toRad(halfAngle2End));
    const fillPath2 = `M 0 0 L ${arc2X1} ${arc2Y1} A ${radius} ${radius} 0 ${arc1LargeArc} ${interiorSweep} ${arc2X2} ${arc2Y2} Z`;

    // Replica: same path as half-angle 1 (fillPath1). We rotate the replica from CBD to ABD and back 4 times, then end at ABD.
    const rotationNeeded = halfAngle2Start - halfAngle1Start;
    let normalizedRotation = rotationNeeded;
    while (normalizedRotation > 180) normalizedRotation -= 360;
    while (normalizedRotation <= -180) normalizedRotation += 360;

    // backAndForthCount back-and-forth = (2*count) half-segments + 1 final "to ABD"
    const numSegments = diagonalAngleBisectionBackAndForthCount * 2 + 1;
    let currentRotation;
    if (phase === 'holding' || progress >= 1) {
      currentRotation = 0;
    } else {
      const u = progress * numSegments;
      const segment = Math.min(Math.floor(u), numSegments - 1);
      const segProgress = u - segment;
      const easeInOutCubic = (t) => t <= 0 ? 0 : t >= 1 ? 1 : (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const segEased = easeInOutCubic(segProgress);
      if (segment % 2 === 0) {
        currentRotation = normalizedRotation * (1 - segEased);
      } else {
        currentRotation = normalizedRotation * segEased;
      }
    }
    if (logRender) {
      console.log('[DiagonalAngleBisection] rotation', { normalizedRotation, progress, currentRotation, originalDeg: 0, replicaDeg: currentRotation });
    }

    // Calculate position using same coordinate system as other elements
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    let paddingGcVal = 0;
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      paddingGcVal = parseFloat(gridPadding) || 0;
    } else if (typeof gridPadding === 'number') {
      paddingGcVal = gridPadding;
    }
    
    const adjustedWidthGc = containerWidthGc - 2 * paddingGcVal;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGcVal;
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    const width = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const height = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    const posXPercent = offsetX + (vertexPos.col / gridCols) * width;
    const posYPercent = offsetY + (vertexPos.row / gridRows) * height;
    if (logRender) {
      console.log('[DiagonalAngleBisection] position & elements', { posXPercent: posXPercent.toFixed(2), posYPercent: posYPercent.toFixed(2), originalTransform: 'translate(-50%,-50%) rotate(0deg)', replicaTransform: `translate(-50%,-50%) rotate(${currentRotation}deg)` });
    }

    // Arc size from config in gc (e.g. "30gc"). Use 100-row reference so 30gc is a visible fraction of viewport (not 900-row which gives tiny 72px).
    const arcSizeGcStr = (typeof diagonalAngleBisectionArcSize === 'string' && diagonalAngleBisectionArcSize.includes('gc'))
      ? diagonalAngleBisectionArcSize
      : `${typeof diagonalAngleBisectionArcSize === 'number' ? diagonalAngleBisectionArcSize : 30}gc`;
    const arcSizeNum = parseFloat(String(arcSizeGcStr).replace(/gc/g, '').trim()) || 30;
    const refRows = 100;
    const viewportHeight = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 900;
    const responsiveArcSizePx = arcSizeNum * (viewportHeight / refRows);
    const responsiveArcSize = `${Math.round(responsiveArcSizePx)}px`;

    // Calculate opacity for blinking effect when holding (or when waiting at CBD)
    let opacity = diagonalAngleBisectionFillOpacity;
    if (phase === 'holding') {
      const blinkCycle = (Date.now() % 1000) / 1000;
      opacity = blinkCycle < 0.5 
        ? diagonalAngleBisectionFillOpacity 
        : diagonalAngleBisectionFillOpacity * 0.5;
    }

    // Replica is "at ABD" (waiting on ABD) when rotation is close to 0 (overlapping static ABD arc)
    const atABD = (phase === 'rotating' && Math.abs(currentRotation) < 4) || (phase === 'holding' && progress >= 1);
    const overlapColor = diagonalAngleBisectionOverlapEqual ? diagonalAngleBisectionOverlapEqualColor : diagonalAngleBisectionOverlapNotEqualColor;
    const replicaColor = atABD ? overlapColor : diagonalAngleBisectionMovingColor;
    const replicaOpacity = atABD ? (opacity * 0.9) : diagonalAngleBisectionFillOpacity;

    return React.createElement('div', {
      key: 'diagonal-angle-bisection-container',
      'data-diag-angle-bisection': 'container',
      id: 'diagonal-angle-bisection-root',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 200
      }
    }, [
      // 1) Static arc at CBD (half-angle 2) — stays put, left behind when replica moves
      React.createElement('div', {
        key: 'diag-angle-cbd-static-wrap',
        style: {
          position: 'absolute',
          left: `${posXPercent}%`,
          top: `${posYPercent}%`,
          width: responsiveArcSize,
          height: responsiveArcSize,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1
        }
      }, React.createElement('svg', {
        key: 'diag-angle-cbd-static-svg',
        viewBox: `-${viewBoxSize/2} -${viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        style: { width: '100%', height: '100%', overflow: 'visible' }
      }, React.createElement('path', {
        key: 'cbd-static-path',
        d: fillPath2,
        fill: diagonalAngleBisectionArcColor,
        fillOpacity: opacity,
        stroke: diagonalAngleBisectionArcColor,
        strokeWidth: 2
      }))),
      // 2) Static arc at ABD (half-angle 1) — never moves
      React.createElement('div', {
        key: 'diag-angle-original-wrap',
        style: {
          position: 'absolute',
          left: `${posXPercent}%`,
          top: `${posYPercent}%`,
          width: responsiveArcSize,
          height: responsiveArcSize,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2
        }
      }, React.createElement('svg', {
        key: 'diag-angle-original-svg',
        viewBox: `-${viewBoxSize/2} -${viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        style: { width: '100%', height: '100%', overflow: 'visible' }
      }, React.createElement('path', {
        key: 'original-path',
        d: fillPath1,
        fill: (atABD && diagonalAngleBisectionOverlapEqual) ? diagonalAngleBisectionOverlapEqualColor : diagonalAngleBisectionArcColor,
        fillOpacity: opacity,
        stroke: (atABD && diagonalAngleBisectionOverlapEqual) ? diagonalAngleBisectionOverlapEqualColor : diagonalAngleBisectionArcColor,
        strokeWidth: 3
      }))),
      // 3) Replica arc (same shape as ABD) — starts at CBD, rotates to superimpose on ABD
      React.createElement('div', {
        key: 'diag-angle-replica-wrap',
        style: {
          position: 'absolute',
          left: `${posXPercent}%`,
          top: `${posYPercent}%`,
          width: responsiveArcSize,
          height: responsiveArcSize,
          transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
          pointerEvents: 'none',
          zIndex: 3
        }
      }, React.createElement('svg', {
        key: 'diag-angle-replica-svg',
        viewBox: `-${viewBoxSize/2} -${viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        style: { width: '100%', height: '100%', overflow: 'visible' }
      }, React.createElement('path', {
        key: 'replica-path',
        d: fillPath1,
        fill: replicaColor,
        fillOpacity: replicaOpacity,
        stroke: replicaColor,
        strokeWidth: 2,
        style: (atABD && diagonalAngleBisectionOverlapEqual) ? { animation: 'angleEqualityBlink 0.8s ease-in-out infinite' } : undefined
      }))),
      
      
      // Notches on both static arcs (ABD and CBD) when equal
      phase === 'holding' && diagonalAngleBisectionOverlapEqual && React.createElement('div', {
        key: 'equality-notch-container',
        style: {
          position: 'absolute',
          left: `${posXPercent}%`,
          top: `${posYPercent}%`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }
      }, React.createElement('svg', {
        key: 'equality-notch-svg',
        viewBox: `-${viewBoxSize/2} -${viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`,
        style: {
          width: responsiveArcSize,
          height: responsiveArcSize,
          overflow: 'visible'
        }
      }, (() => {
        const belowArc = 15;
        const aboveArc = 15 * 0.5;
        const makeNotch = (midAngleDeg, key) => {
          const midAngleRad = toRad(midAngleDeg);
          const notchRadius = radius;
          const notchX = notchRadius * Math.cos(midAngleRad);
          const notchY = notchRadius * Math.sin(midAngleRad);
          const radialX = Math.cos(midAngleRad);
          const radialY = Math.sin(midAngleRad);
          return React.createElement('line', {
            key,
            x1: notchX - belowArc * radialX,
            y1: notchY - belowArc * radialY,
            x2: notchX + aboveArc * radialX,
            y2: notchY + aboveArc * radialY,
            stroke: '#FFFFFF',
            strokeWidth: 3,
            strokeLinecap: 'round'
          });
        };
        const midABD = (halfAngle1Start + halfAngle1End) / 2;
        const midCBD = (halfAngle2Start + halfAngle2End) / 2;
        return [makeNotch(midABD, 'notch-abd'), makeNotch(midCBD, 'notch-cbd')];
      })() ) )
    ]);
  }, [diagonalAngleBisectionAnimation, vertices, getVertexPosition, angles, coordinates, gridRows, gridCols, gridPadding, zIndex, diagonalAngleBisectionBackAndForthCount, diagonalAngleBisectionArcColor, diagonalAngleBisectionArcSize, diagonalAngleBisectionFillOpacity, diagonalAngleBisectionMovingColor, diagonalAngleBisectionOverlapEqualColor, diagonalAngleBisectionOverlapNotEqualColor, diagonalAngleBisectionOverlapEqual]);

  // Calculate transform for parallel lines animation (to apply to original quad)
  const parallelLinesTransform = React.useMemo(() => {
    if (!parallelLinesAnimation) {
      return null;
    }

    const { pairIndex, progress } = parallelLinesAnimation;
    
    console.log('🔄 Calculating parallel lines transform:', { pairIndex, progress, parallelLinesAnimation });
    
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
    
    console.log('🎯 Transform calculation:', {
      side1Length: side1Length.toFixed(2),
      maxMovement: maxMovement.toFixed(2),
      translateX: translateX.toFixed(2),
      translateY: translateY.toFixed(2),
      progress: progress.toFixed(3),
      movementRatio: parallelLinesMovementRatio
    });
    
    // translateX and translateY are in SVG percentage units (0-100 range)
    // Since the wrapper div will be 100% of container, and SVG uses same coordinate system,
    // we can use the percentage values directly for CSS transform
    // CSS transform translate() with % is relative to element's own dimensions
    // Since wrapper is 100% of container, and SVG is also sized to container,
    // the percentage values should align
    
    const transformStyle = {
      transform: `translate(${translateX}%, ${translateY}%)`,
      position: 'relative',
      width: '100%',
      height: '100%',
      willChange: 'transform' // Optimize for animation
    };
    
    console.log('✅ Transform style:', transformStyle);
    
    return transformStyle;
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
    
    // Use the same coordinate conversion as sides rendering (via gridDimensions)
    // This ensures parallel lines align correctly with the quadrilateral sides
    const { offsetX, offsetY, width, height } = gridDimensions;
    
    // Helper function to convert vertex to percentage (same as getVertexPercent used for sides)
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Convert vertex positions to percentage using the same method as sides
    const a = getVertexPercent(v0);
    const b = getVertexPercent(v1);
    const c = getVertexPercent(v2);
    const d = getVertexPercent(v3);
    
    const aX = a.x;
    const aY = a.y;
    const bX = b.x;
    const bY = b.y;
    const cX = c.x;
    const cY = c.y;
    const dX = d.x;
    const dY = d.y;
    
    // Calculate container position for SVG positioning (needed for absolute positioning)
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
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
    
    // Calculate track stroke width in viewBox units (0-100)
    const processGcToViewBox = (value, defaultViewBox) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultViewBox;
        // Convert gc to viewBox units: (gcValue / containerSizeGc) * 100
        const avgContainerGc = (containerWidth + containerHeight) / 2;
        return (gcValue / avgContainerGc) * 100;
      }
      return defaultViewBox;
    };
    const trackStrokeWidthViewBox = processGcToViewBox(parallelLinesTrackStrokeWidth, 0.5);
    
    // Calculate dash array based on config
    let trackDashArray = 'none'; // Default: solid line
    if (parallelLinesTrackDashStyle === 'dashed') {
      // Use smaller dashes: dashSize * lineThickness, gapSize * lineThickness
      const dashLength = lineThickness * parallelLinesTrackDashSize;
      const gapLength = lineThickness * parallelLinesTrackDashGap;
      trackDashArray = `${dashLength}, ${gapLength}`;
    } else if (parallelLinesTrackDashStyle === 'dotted') {
      // Dotted: very small dashes with gaps
      const dotLength = lineThickness * 0.5;
      const gapLength = lineThickness * 1.5;
      trackDashArray = `${dotLength}, ${gapLength}`;
    }
    // 'solid' or any other value = 'none' (no dashes)
    
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
    
    // Calculate message position
    let messageLeft, messageTop;
    
    // If messageCoordinates (absolute coordinates [x, y]) are provided, convert them to percentages
    if (parallelLinesMessageCoordinates && Array.isArray(parallelLinesMessageCoordinates) && parallelLinesMessageCoordinates.length >= 2) {
      const [msgX, msgY] = parallelLinesMessageCoordinates;
      // Convert absolute grid coordinates to percentages (same system as component coordinates)
      const messageLeftPercent = ((msgX - 1) / gridSystemCols) * 100;
      const messageTopPercent = ((msgY - 1) / gridSystemRows) * 100;
      messageLeft = messageLeftPercent + parallelLinesMessageOffsetX;
      messageTop = messageTopPercent + parallelLinesMessageOffsetY;
    } else if (parallelLinesMessageLeft !== null && parallelLinesMessageTop !== null) {
      // Use explicit percentage positions if provided
      messageLeft = parallelLinesMessageLeft + parallelLinesMessageOffsetX;
      messageTop = parallelLinesMessageTop + parallelLinesMessageOffsetY;
    } else {
      // Default: center of the animation
      // Use the same coordinate system as the SVG (0-100 viewBox)
      const centerX = (aX + bX + cX + dX) / 4;
      const centerY = (aY + bY + cY + dY) / 4;
      messageLeft = containerLeft + (centerX / 100) * containerWidthPercent + parallelLinesMessageOffsetX;
      messageTop = containerTop + (centerY / 100) * containerHeightPercent + parallelLinesMessageOffsetY;
    }
    
    return React.createElement(React.Fragment, { key: 'parallel-lines-animation-container' }, [
      // Rail extensions SVG (the dashed extended lines)
      // Positioned same as sides SVG (absolute, full container, viewBox 0-100)
      React.createElement('svg', {
        key: 'parallel-lines-rails',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: zIndex, // Below sides (sides use zIndex + 25) - use base zIndex to ensure rails are behind
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
          strokeWidth: trackStrokeWidthViewBox, // ViewBox units
          strokeDasharray: trackDashArray,
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
          strokeWidth: trackStrokeWidthViewBox, // ViewBox units
          strokeDasharray: trackDashArray,
          strokeLinecap: 'round'
        })
      ]),
      
      // Success message (only render if message is not empty)
      parallelLinesMessage && parallelLinesMessage.trim() !== '' ? React.createElement('div', {
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
      }, parallelLinesMessage) : null
    ]);
  }, [parallelLinesAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, edgeThickness, edgeColor, edgeStyle, angleTextSize, angleTextFont, zIndex, parallelLinesMessage, parallelLinesMessageLeft, parallelLinesMessageTop, parallelLinesMessageOffsetX, parallelLinesMessageOffsetY, parallelLinesMessageCoordinates, parallelLinesExtensionRatio, parallelLinesMovementRatio, parallelLinesExtensionColor, parallelLinesTrackStrokeWidth, parallelLinesTrackDashStyle, parallelLinesTrackDashSize, parallelLinesTrackDashGap, side1, side2, side3, side4]);

  // Render symmetry fold animation
  const renderSymmetryFoldAnimation = React.useMemo(() => {
    if (!symmetryFoldAnimation || !coordinates) {
      return null;
    }

    const { axis, progress, phase, config } = symmetryFoldAnimation;
    
    // Get all vertex positions
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = getVertexPosition(3); // D
    
    // Use the same coordinate conversion as sides rendering
    const { offsetX, offsetY, width, height } = gridDimensions;
    
    // Helper function to convert vertex to percentage
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Convert vertex positions to percentage
    const a = getVertexPercent(v0);
    const b = getVertexPercent(v1);
    const c = getVertexPercent(v2);
    const d = getVertexPercent(v3);
    
    // Calculate bounding box of the quadrilateral
    const minX = Math.min(a.x, b.x, c.x, d.x);
    const maxX = Math.max(a.x, b.x, c.x, d.x);
    const minY = Math.min(a.y, b.y, c.y, d.y);
    const maxY = Math.max(a.y, b.y, c.y, d.y);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    // Calculate fold line based on axis
    let foldLineX1, foldLineY1, foldLineX2, foldLineY2;
    if (axis === 'vertical') {
      foldLineX1 = centerX;
      foldLineY1 = minY - 5;
      foldLineX2 = centerX;
      foldLineY2 = maxY + 5;
    } else if (axis === 'horizontal') {
      foldLineX1 = minX - 5;
      foldLineY1 = centerY;
      foldLineX2 = maxX + 5;
      foldLineY2 = centerY;
    } else if (axis === 'diagonal1') {
      // Diagonal A to C (extend beyond vertices)
      const dx = c.x - a.x; const dy = c.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const ex = (dx / len) * 10; const ey = (dy / len) * 10;
      foldLineX1 = a.x - ex; foldLineY1 = a.y - ey;
      foldLineX2 = c.x + ex; foldLineY2 = c.y + ey;
    } else {
      // diagonal2: B to D
      const dx = d.x - b.x; const dy = d.y - b.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const ex = (dx / len) * 10; const ey = (dy / len) * 10;
      foldLineX1 = b.x - ex; foldLineY1 = b.y - ey;
      foldLineX2 = d.x + ex; foldLineY2 = d.y + ey;
    }
    
    // Calculate the folded half polygon
    // For vertical axis: fold left half over to right
    // For horizontal axis: fold top half over to bottom
    let foldedPolygonPoints = '';
    let originalPolygonPoints = `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
    
    // Calculate clipped polygon for the left/top half
    // This creates the semi-transparent overlay that flips
    const clipAndMirrorPolygon = () => {
      // For a parallelogram ABCD where A is top-left, B is top-right, C is bottom-right, D is bottom-left
      // We need to calculate where the fold line intersects the shape edges
      
      if (axis === 'vertical') {
        // Find intersection points of vertical line x=centerX with shape edges
        // Edges: AB (top), BC (right), CD (bottom), DA (left)
        const intersections = [];
        
        // Check intersection with AB (top edge)
        if ((a.x <= centerX && b.x >= centerX) || (a.x >= centerX && b.x <= centerX)) {
          const t = (centerX - a.x) / (b.x - a.x);
          const y = a.y + t * (b.y - a.y);
          intersections.push({ x: centerX, y, edge: 'AB' });
        }
        
        // Check intersection with CD (bottom edge)
        if ((c.x <= centerX && d.x >= centerX) || (c.x >= centerX && d.x <= centerX)) {
          const t = (centerX - d.x) / (c.x - d.x);
          const y = d.y + t * (c.y - d.y);
          intersections.push({ x: centerX, y, edge: 'CD' });
        }
        
        // Create left half polygon (vertices to the left of centerX + intersection points)
        const leftVertices = [];
        
        // Add vertices that are on the left side
        if (a.x <= centerX) leftVertices.push({ ...a, name: 'A' });
        if (b.x <= centerX) leftVertices.push({ ...b, name: 'B' });
        if (c.x <= centerX) leftVertices.push({ ...c, name: 'C' });
        if (d.x <= centerX) leftVertices.push({ ...d, name: 'D' });
        
        // Add intersection points
        intersections.forEach(pt => leftVertices.push(pt));
        
        // Sort vertices by angle from centroid to form proper polygon
        const leftCentroidX = leftVertices.reduce((sum, v) => sum + v.x, 0) / leftVertices.length;
        const leftCentroidY = leftVertices.reduce((sum, v) => sum + v.y, 0) / leftVertices.length;
        leftVertices.sort((va, vb) => {
          const angleA = Math.atan2(va.y - leftCentroidY, va.x - leftCentroidX);
          const angleB = Math.atan2(vb.y - leftCentroidY, vb.x - leftCentroidX);
          return angleA - angleB;
        });
        
        // Mirror the left half across the fold line (x = centerX)
        // New x = centerX + (centerX - oldX) = 2*centerX - oldX
        const mirroredVertices = leftVertices.map(v => ({
          x: 2 * centerX - v.x,
          y: v.y
        }));
        
        return {
          leftHalf: leftVertices.map(v => `${v.x},${v.y}`).join(' '),
          mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
          foldOrigin: { x: centerX, y: centerY }
        };
      } else if (axis === 'horizontal') {
        // Horizontal axis - fold top half over bottom
        const intersections = [];
        
        // Check intersection with DA (left edge)
        if ((d.y <= centerY && a.y >= centerY) || (d.y >= centerY && a.y <= centerY)) {
          const t = (centerY - d.y) / (a.y - d.y);
          const x = d.x + t * (a.x - d.x);
          intersections.push({ x, y: centerY, edge: 'DA' });
        }
        
        // Check intersection with BC (right edge)
        if ((b.y <= centerY && c.y >= centerY) || (b.y >= centerY && c.y <= centerY)) {
          const t = (centerY - b.y) / (c.y - b.y);
          const x = b.x + t * (c.x - b.x);
          intersections.push({ x, y: centerY, edge: 'BC' });
        }
        
        // Create top half polygon
        const topVertices = [];
        
        if (a.y <= centerY) topVertices.push({ ...a, name: 'A' });
        if (b.y <= centerY) topVertices.push({ ...b, name: 'B' });
        if (c.y <= centerY) topVertices.push({ ...c, name: 'C' });
        if (d.y <= centerY) topVertices.push({ ...d, name: 'D' });
        
        intersections.forEach(pt => topVertices.push(pt));
        
        // Sort vertices
        const topCentroidX = topVertices.reduce((sum, v) => sum + v.x, 0) / topVertices.length;
        const topCentroidY = topVertices.reduce((sum, v) => sum + v.y, 0) / topVertices.length;
        topVertices.sort((va, vb) => {
          const angleA = Math.atan2(va.y - topCentroidY, va.x - topCentroidX);
          const angleB = Math.atan2(vb.y - topCentroidY, vb.x - topCentroidX);
          return angleA - angleB;
        });
        
        // Mirror the top half across the fold line (y = centerY)
        const mirroredVertices = topVertices.map(v => ({
          x: v.x,
          y: 2 * centerY - v.y
        }));
        
        return {
          topHalf: topVertices.map(v => `${v.x},${v.y}`).join(' '),
          mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
          foldOrigin: { x: centerX, y: centerY }
        };
      } else {
        // Diagonal axis (diagonal1: A-C, diagonal2: B-D)
        // For a quadrilateral, the diagonal divides it into two triangles.
        // For diagonal1 (A-C): triangles are ABC and ACD. D reflects to B.
        // For diagonal2 (B-D): triangles are ABD and BCD. A reflects to C.
        // Use actual vertex positions instead of mathematical reflection to avoid aspect ratio distortion.
        
        const L1 = axis === 'diagonal1' ? a : b;
        const L2 = axis === 'diagonal1' ? c : d;
        
        let halfVertices, mirroredVertices;
        
        if (axis === 'diagonal1') {
          // Diagonal A-C: one half is triangle ACD (vertices A, C, D), mirrors to ABC (A, C, B)
          // Create vertex pairs: each halfVertex corresponds to its mirror
          const vertexPairs = [
            { half: { x: a.x, y: a.y }, mirror: { x: a.x, y: a.y } }, // A stays A
            { half: { x: c.x, y: c.y }, mirror: { x: c.x, y: c.y } }, // C stays C
            { half: { x: d.x, y: d.y }, mirror: { x: b.x, y: b.y } }  // D becomes B
          ];
          
          // Sort by angle from centroid of halfVertices, maintaining pair correspondence
          const cx = vertexPairs.reduce((s, p) => s + p.half.x, 0) / vertexPairs.length;
          const cy = vertexPairs.reduce((s, p) => s + p.half.y, 0) / vertexPairs.length;
          vertexPairs.sort((pa, pb) => 
            Math.atan2(pa.half.y - cy, pa.half.x - cx) - Math.atan2(pb.half.y - cy, pb.half.x - cx)
          );
          
          halfVertices = vertexPairs.map(p => p.half);
          mirroredVertices = vertexPairs.map(p => p.mirror);
        } else {
          // Diagonal B-D: one half is triangle ABD (vertices A, B, D), mirrors to BCD (C, B, D)
          const vertexPairs = [
            { half: { x: a.x, y: a.y }, mirror: { x: c.x, y: c.y } }, // A becomes C
            { half: { x: b.x, y: b.y }, mirror: { x: b.x, y: b.y } }, // B stays B
            { half: { x: d.x, y: d.y }, mirror: { x: d.x, y: d.y } }  // D stays D
          ];
          
          // Sort by angle from centroid of halfVertices, maintaining pair correspondence
          const cx = vertexPairs.reduce((s, p) => s + p.half.x, 0) / vertexPairs.length;
          const cy = vertexPairs.reduce((s, p) => s + p.half.y, 0) / vertexPairs.length;
          vertexPairs.sort((pa, pb) => 
            Math.atan2(pa.half.y - cy, pa.half.x - cx) - Math.atan2(pb.half.y - cy, pb.half.x - cx)
          );
          
          halfVertices = vertexPairs.map(p => p.half);
          mirroredVertices = vertexPairs.map(p => p.mirror);
        }
        
        // For diagonal fold, the transform origin should be the midpoint of the diagonal line
        const diagonalMidX = (L1.x + L2.x) / 2;
        const diagonalMidY = (L1.y + L2.y) / 2;
        
        return {
          diagonalHalf: halfVertices.map(v => `${v.x},${v.y}`).join(' '),
          mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
          foldOrigin: { x: diagonalMidX, y: diagonalMidY }
        };
      }
    };
    
    const polygonData = clipAndMirrorPolygon();
    if (!polygonData) {
      console.warn('⚠️ Could not calculate polygon data for symmetry fold animation');
      return null;
    }
    
    const { leftHalf, topHalf, diagonalHalf, mirroredHalf, foldOrigin } = polygonData;
    const halfPolygonPoints = axis === 'vertical' ? (leftHalf || '') : (axis === 'horizontal' ? (topHalf || '') : (diagonalHalf || ''));
    
    if (!halfPolygonPoints || !mirroredHalf || !foldOrigin) {
      console.warn('⚠️ Could not determine polygon data for symmetry fold animation:', { 
        hasLeftHalf: !!leftHalf, 
        hasTopHalf: !!topHalf, 
        hasDiagonalHalf: !!diagonalHalf,
        hasMirroredHalf: !!mirroredHalf,
        hasFoldOrigin: !!foldOrigin,
        axis 
      });
      return null;
    }
    
    // Calculate the transform/morph for the fold animation
    const rotationDegrees = progress * 180;
    let transformStyle;
    let transformOriginX, transformOriginY;
    let useDirectMorph = false;
    let morphedPolygonPoints = halfPolygonPoints;
    
    if (axis === 'vertical') {
      transformStyle = `rotateY(${rotationDegrees}deg)`;
      transformOriginX = `${foldOrigin.x}%`;
      transformOriginY = '50%';
    } else if (axis === 'horizontal') {
      transformStyle = `rotateX(-${rotationDegrees}deg)`;
      transformOriginX = '50%';
      transformOriginY = `${foldOrigin.y}%`;
    } else {
      // For diagonal folds, use direct 2D morphing instead of 3D transform
      // This keeps vertices A and C fixed on the diagonal while interpolating between
      // the original triangle and its reflection
      useDirectMorph = true;
      
      // Both folding and folding2: same triangle (ADC) folds onto the other (ABC)
      // Phase 1 (folding): ADC -> ABC. Phase 2 (unfolding): back to ADC. Phase 3 (folding2): ADC -> ABC again.
      // So source is always the folding half (ADC), target is always the mirrored half (ABC).
      const sourcePoints = halfPolygonPoints.split(' ').map((p) => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      const targetPoints = mirroredHalf.split(' ').map((p) => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      
      // Interpolate between source and target based on progress
      // When fully folded (progress >= 1), use exact target so overlay superimposes with no mismatch
      const snapToTarget = progress >= 0.9999;
      const interpolatedPoints = snapToTarget
        ? targetPoints.map(p => ({ x: p.x, y: p.y }))
        : sourcePoints.map((src, i) => {
            const tgt = targetPoints[i] || src;
            const isOnDiagonal = Math.abs(src.x - tgt.x) < 0.01 && Math.abs(src.y - tgt.y) < 0.01;
            if (isOnDiagonal) {
              return { x: src.x, y: src.y };
            }
            return {
              x: src.x + (tgt.x - src.x) * progress,
              y: src.y + (tgt.y - src.y) * progress
            };
          });
      
      morphedPolygonPoints = interpolatedPoints.map(p => `${p.x},${p.y}`).join(' ');
      transformStyle = 'none';
      transformOriginX = '50%';
      transformOriginY = '50%';
    }
    
    // Coordinate logging: overlay (folding) vs shape (quad), and mismatch check when fully folded
    const overlayPoints = morphedPolygonPoints.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    const shapeQuad = [a, b, c, d];
    const expectedTargetPoints = (mirroredHalf || '').split(' ').filter(Boolean).map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    
    if (phase === 'folding' && progress < 0.02) {
      symmetryFoldCoordLogRef.current = { atStart: null, atDiagonal: null, atEnd: null };
    }
    const coordLog = symmetryFoldCoordLogRef.current;
    const TOLERANCE = 0.5;
    
    if (progress < 0.05 && coordLog.atStart !== phase) {
      symmetryFoldCoordLogRef.current.atStart = phase;
      console.log('📐 Symmetry fold coordinates (start)', { axis, phase }, {
        overlay: overlayPoints.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`),
        shape: shapeQuad.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`)
      });
    }
    if (progress >= 0.45 && progress <= 0.55 && coordLog.atDiagonal !== phase) {
      symmetryFoldCoordLogRef.current.atDiagonal = phase;
      console.log('📐 Symmetry fold coordinates (at diagonal)', { axis, phase }, {
        overlay: overlayPoints.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`),
        shape: shapeQuad.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`)
      });
    }
    if (progress >= 0.98 && coordLog.atEnd !== phase) {
      symmetryFoldCoordLogRef.current.atEnd = phase;
      console.log('📐 Symmetry fold coordinates (reached other end)', { axis, phase }, {
        overlay: overlayPoints.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`),
        expectedTarget: expectedTargetPoints.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`),
        shape: shapeQuad.map(p => `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`)
      });
      if (useDirectMorph && overlayPoints.length === expectedTargetPoints.length) {
        const mismatches = overlayPoints.map((p, i) => {
          const q = expectedTargetPoints[i];
          const dx = (q && (p.x - q.x)) || 0;
          const dy = (q && (p.y - q.y)) || 0;
          const delta = Math.sqrt(dx * dx + dy * dy);
          return delta > TOLERANCE ? { i, overlay: p, expected: q, delta } : null;
        }).filter(Boolean);
        if (mismatches.length > 0) {
          console.warn('📐 Symmetry fold MISMATCH (overlay vs expected target)', { axis, phase }, mismatches);
        } else {
          console.log('📐 Symmetry fold overlay matches expected target (no mismatch)');
        }
      }
    }
    
    return React.createElement(React.Fragment, { key: 'symmetry-fold-animation-container' }, [
      // Fold line (dashed white line)
      React.createElement('svg', {
        key: 'symmetry-fold-line',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 100,
          pointerEvents: 'none',
          overflow: 'visible'
        },
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none'
      }, [
        React.createElement('line', {
          key: 'fold-line',
          x1: foldLineX1,
          y1: foldLineY1,
          x2: foldLineX2,
          y2: foldLineY2,
          stroke: config.foldLineColor || '#FFFFFF',
          strokeWidth: 0.5,
          strokeDasharray: '2,2',
          strokeLinecap: 'round'
        })
      ]),
      
      // Folding half (the animated polygon that flips)
      // For diagonal folds: use direct SVG morphing (no 3D transform wrapper)
      // For vertical/horizontal: use div wrapper for CSS 3D transforms
      useDirectMorph ? 
        React.createElement('svg', {
          key: 'symmetry-folding-half-svg-direct',
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
        }, [
          React.createElement('polygon', {
            key: 'folding-polygon-morphed',
            points: morphedPolygonPoints,
            fill: config.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
            stroke: '#8B4545',
            strokeWidth: 0.3
          })
        ])
      :
        // Use 3D transform wrapper for CSS 3D transforms (vertical/horizontal folds)
        React.createElement('div', {
        key: 'symmetry-folding-half-wrapper',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          zIndex: zIndex + 200, // Higher z-index to ensure it's above everything during animation
          pointerEvents: 'none',
          overflow: 'visible',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          isolation: 'isolate' // Create isolated stacking context to prevent interference with other transforms
        }
      }, [
        React.createElement('div', {
          key: 'symmetry-folding-half-container',
          style: {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            transformOrigin: `${transformOriginX} ${transformOriginY}`,
            transform: transformStyle,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible' // Changed to 'visible' so it's visible on both sides
          }
        }, [
          React.createElement('svg', {
            key: 'symmetry-folding-half-svg',
            style: {
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible'
            },
            viewBox: '0 0 100 100',
            preserveAspectRatio: 'none'
          }, [
            React.createElement('polygon', {
              key: 'folding-polygon',
              points: halfPolygonPoints,
              fill: config.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
              stroke: '#8B4545',
              strokeWidth: 0.3
            })
          ])
        ])
      ]),
      
      // Mismatch indicator removed - should not change color during folding
    ]);
  }, [symmetryFoldAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, zIndex]);

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
    'data-quad-type': currentQuadType
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
    
    // Symmetry fold animation (fold line and folding half)
    renderSymmetryFoldAnimation,
    
    // Quadrilateral wrapper (applies transform when parallel lines animation is active)
    // Isolated from 3D transform contexts to prevent interference
    React.createElement('div', {
      key: 'quadrilateral-wrapper',
      className: buildSuccessAnimating ? 'build-success-pulse' : undefined,
      style: {
        position: parallelLinesTransform ? 'relative' : 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        overflow: 'visible', // So right-angle markers (L) and angle arcs are not clipped
        ...(parallelLinesTransform ? {
          transform: parallelLinesTransform.transform,
          willChange: 'transform',
          transformStyle: 'flat' // Explicitly use flat transform style to avoid 3D context interference
        } : {}),
        zIndex: zIndex + 20, // Ensure wrapper creates stacking context above rails
        isolation: 'isolate' // Create new stacking context, isolated from 3D transforms
      }
    }, [
      // Build mode: Target wireframe (behind main shape)
      renderTargetWireframe,
      
      // Build mode: Target vertex markers (behind main shape)
      renderTargetVertexMarkers,
      
      // Sides layer (SVG)
      renderSides,
      
      // Side symbols layer (tick marks for equality, arrows for parallel)
      renderSideSymbols,
      
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
      
      // Animated opposite side line for opposite side equality
      renderAnimatedOppositeSideLine,
      
      // Animated diagonal equality line
      renderAnimatedDiagonalEquality,
      
      // Animated diagonal bisection tick marks
      renderAnimatedDiagonalBisection,
      
      // Animated rotational symmetry overlay
      renderAnimatedRotationalSymmetry,
      
      // Animated diagonal perpendicular bisection (tick marks + right angle)
      renderAnimatedDiagonalPerpendicular,
      
      // Animated diagonal angle bisection (half-angle arcs showing diagonal bisects angles)
      renderAnimatedDiagonalAngleBisection,
      
      // Vertex labels layer (moved inside wrapper so they move with the quad during animation)
      renderVertexLabels
    ]),
    
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