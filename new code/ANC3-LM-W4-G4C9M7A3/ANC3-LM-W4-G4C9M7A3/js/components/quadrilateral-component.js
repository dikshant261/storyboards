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
 * @param {string} props.showAngleMarkers - Angle marker type (default: 'all') - DEPRECATED: use effectiveAngleConfig.show instead
 * @param {Object} props.effectiveAngleConfig - Angle marker and text configuration object
 * @param {string} props.effectiveAngleConfig.show - Show angle markers: 'none', 'arc', 'measurement', 'rightAngle', 'all' (default: 'all')
 * @param {string} props.effectiveAngleConfig.markerColor - Color for angle markers/arcs (default: '#FF6600')
 * @param {string} props.effectiveAngleConfig.markerSize - Size of angle markers in gc units (default: '1gc')
 * @param {boolean} props.effectiveAngleConfig.showText - Show angle measurement text (default: true when show includes 'measurement' or 'all')
 * @param {string} props.effectiveAngleConfig.textColor - Color for angle text (default: '#FF6600')
 * @param {string} props.effectiveAngleConfig.textSize - Font size for angle text in gc units (default: '12gc')
 * @param {string} props.effectiveAngleConfig.textFont - Font family for angle text (default: 'Arial, sans-serif')
 * @param {string} props.effectiveAngleConfig.textOffset - Offset of text from vertex in gc units (default: '35gc')
 * @param {Object} props.effectiveAngleConfig.angleA - Per-vertex config for vertex A
 * @param {Object} props.effectiveAngleConfig.angleA.interiorAngle - Config for interior angle at vertex A
 * @param {boolean} props.effectiveAngleConfig.angleA.interiorAngle.show - Show interior angle arc (default: false)
 * @param {string|number} props.effectiveAngleConfig.angleA.interiorAngle.size - Size of interior angle arc (default: uses effectiveAngleConfig.markerSize)
 * @param {string} props.effectiveAngleConfig.angleA.interiorAngle.color - Color of interior angle arc (default: uses effectiveAngleConfig.markerColor)
 * @param {boolean} props.effectiveAngleConfig.angleA.interiorAngle.showText - Show text label for interior angle (default: uses effectiveAngleConfig.showText)
 * @param {string} props.effectiveAngleConfig.angleA.interiorAngle.textMode - Text display mode: 'name' (angle name only), 'measure' (angle measure only), or 'both' (name + measure) (default: 'both')
 * @param {boolean} props.effectiveAngleConfig.angleA.interiorAngle.fill - Fill the arc with color (default: false)
 * @param {string} props.effectiveAngleConfig.angleA.interiorAngle.fillColor - Fill color for the arc (default: same as color)
 * @param {number} props.effectiveAngleConfig.angleA.interiorAngle.fillOpacity - Fill opacity (0-1) (default: 0.3)
 * @param {boolean} props.effectiveAngleConfig.angleA.interiorAngle.blinkFill - Blink the arc fill animation (default: false)
 * @param {boolean} props.effectiveAngleConfig.angleA.interiorAngle.animateDraw - Animate the arc being drawn (default: false)
 * @param {number} props.effectiveAngleConfig.angleA.interiorAngle.drawLoops - Number of times to loop the draw animation (default: 1, use 0 for infinite)
 * @param {number} props.effectiveAngleConfig.angleA.interiorAngle.drawDuration - Duration of draw animation in seconds (default: 2)
 * @param {Object} props.effectiveAngleConfig.angleA.supplementaryAngle1 - Config for supplementary angle 1 at vertex A (same structure as interiorAngle)
 * @param {Object} props.effectiveAngleConfig.angleA.supplementaryAngle2 - Config for supplementary angle 2 at vertex A (same structure as interiorAngle)
 * @param {Object} props.effectiveAngleConfig.angleA.supplementaryAngle3 - Config for supplementary angle 3 at vertex A (same structure as interiorAngle)
 * @param {Object} props.effectiveAngleConfig.angleB - Per-vertex config for vertex B (same structure as angleA)
 * @param {Object} props.effectiveAngleConfig.angleC - Per-vertex config for vertex C (same structure as angleA)
 * @param {Object} props.effectiveAngleConfig.angleD - Per-vertex config for vertex D (same structure as angleA)
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
  // Log props received at component level
  console.log(`🔍 [Quadrilateral] ========== Component RENDERED ==========`, {
    id: props.id,
    currentPage: props.currentPage,
    quadType: props.quadType
  });
  
  if (props.id === 'page2-shape-display' || props.id === 'page5-shape-display' || props.id === 'page7-shape-display') {
    console.log(`🔍 [Quadrilateral] Component received props:`, {
      hasEffectiveAngleConfig: 'effectiveAngleConfig' in props,
      effectiveAngleConfig: props.effectiveAngleConfig,
      effectiveAngleConfigType: typeof props.effectiveAngleConfig,
      effectiveAngleConfigKeys: props.effectiveAngleConfig ? Object.keys(props.effectiveAngleConfig) : [],
      angleA: props.effectiveAngleConfig?.angleA,
      angleB: props.effectiveAngleConfig?.angleB,
      angleBInteriorAngle: props.effectiveAngleConfig?.angleB?.interiorAngle,
      angleBShow: props.effectiveAngleConfig?.angleB?.interiorAngle?.show,
      angleC: props.effectiveAngleConfig?.angleC,
      page2StateKey: props.page2StateKey,
      windowPage2State: typeof window !== 'undefined' ? window.page2State : 'N/A'
    });
  }
  
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
    showAngleMarkers = 'all', // Deprecated, use effectiveAngleConfig.show
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
    diagonal1,
    diagonal2,
    // Vertex config (grouped)
    vertexConfig = {},
    // Angle config (grouped)
    effectiveAngleConfig: propAngleConfig = {},
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
    // Symmetry fold animation config
    symmetryAnimationConfig = {},
    // Build mode props
    mode = 'default', // 'default' | 'build'
    buildConfig = {},
    // Processed styles (can override container style, e.g., position: 'fixed' for screen-relative positioning)
    processedStyles = {}
  } = props;

  // Track page2State for page 2 to trigger re-renders when state changes (needed early for effectiveAngleConfig)
  const [page2State, setPage2State] = React.useState(() => {
    if (currentPage === 2 && typeof window !== 'undefined') {
      return window.page2State || 'C';
    }
    return null;
  });

  // Listen for page2State changes on page 2
  React.useEffect(() => {
    if (currentPage !== 2) return;
    
    const checkPage2State = () => {
      if (typeof window !== 'undefined' && window.page2State) {
        setPage2State(prevState => {
          if (prevState !== window.page2State) {
            console.log(`[STATE:page2State] Changed: ${prevState || 'undefined'} → ${window.page2State} (QuadrilateralComponent - interval check)`);
            return window.page2State;
          }
          return prevState;
        });
      }
    };
    
    // Check immediately
    checkPage2State();
    
    // Set up interval to check for state changes (since window.page2State might be changed directly)
    const interval = setInterval(checkPage2State, 100);
    
    // Also listen for custom events if state changes are dispatched
    const handleStateChange = () => checkPage2State();
    window.addEventListener('page2StateChanged', handleStateChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('page2StateChanged', handleStateChange);
    };
  }, [currentPage]);

  // Merge angleConfig with state-based overrides for pages 2, 4, and 6 when pageState = 'complete' (needed early)
  // Read window.pageXState directly to ensure we get the latest value even if props are cached
  const getCurrentPageState = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2State || null;
    if (currentPage === 4) return window.page4State || null;
    if (currentPage === 6) return window.page6State || null;
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific state
  const getPageState = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2State || 'C';
    if (currentPage === 4) return window.page4State || 'C';
    if (currentPage === 6) return window.page6State || 'C';
    return null;
  }, [currentPage]);
  
  // Track page-specific state for pages 2, 4, and 6 to trigger re-renders when state changes
  const [pageState, setPageState] = React.useState(() => getPageState());
  
  // Listen for page-specific state changes on pages 2, 4, and 6
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;
    
    const checkPageState = () => {
      const newState = getPageState();
      if (newState !== null) {
        setPageState(prevState => {
          if (prevState !== newState) {
            console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${newState} (QuadrilateralComponent - interval check)`);
            return newState;
          }
          return prevState;
        });
      }
    };
    
    // Check immediately
    checkPageState();
    
    // Set up interval to check for state changes
    const interval = setInterval(checkPageState, 100);
    
    // Listen for state change events
    const getPageStateChangedEventName = () => {
      if (currentPage === 2) return 'pageStateChanged';
      if (currentPage === 4) return 'page4StateChanged';
      if (currentPage === 6) return 'page6StateChanged';
      return null;
    };
    
    const stateEventName = getPageStateChangedEventName();
    const handleStateChange = (event) => {
      if (event.detail && event.detail.state !== undefined) {
        setPageState(prevState => {
          if (prevState !== event.detail.state) {
            console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${event.detail.state} (QuadrilateralComponent - event)`);
            return event.detail.state;
          }
          return prevState;
        });
      } else {
        checkPageState();
      }
    };
    
    if (stateEventName) {
      window.addEventListener(stateEventName, handleStateChange);
    }
    
    return () => {
      clearInterval(interval);
      if (stateEventName) {
        window.removeEventListener(stateEventName, handleStateChange);
      }
    };
  }, [currentPage, getPageState]);
  
  const currentWindowPageState = getCurrentPageState();
  const effectiveAngleConfig = React.useMemo(() => {
    const actualPageState = getCurrentPageState();
    // When state is complete on pages 2, 4, 6: no angle config, no interior angle markers; shape stays visible with measurement text only
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && actualPageState === 'complete') {
      let freshConfig = propAngleConfig;
      const getPropsFunctionName = currentPage === 2 ? 'page2ShapeDisplayGetProps' : 
                                   currentPage === 4 ? 'page4ShapeDisplayGetProps' : 
                                   currentPage === 6 ? 'page6ShapeDisplayGetProps' : null;
      if (typeof window !== 'undefined' && getPropsFunctionName && window[getPropsFunctionName]) {
        try {
          const freshProps = window[getPropsFunctionName]();
          if (freshProps && freshProps.effectiveAngleConfig) {
            freshConfig = freshProps.effectiveAngleConfig;
          }
        } catch (error) {
          console.error('❌ [Quadrilateral] Error calling getProps:', error);
        }
      }
      return { ...freshConfig, show: 'none' };
    }
    return propAngleConfig;
  }, [currentPage, propAngleConfig, getCurrentPageState, pageState]);

  // When state is complete on pages 2, 4, 6, or on page 3 (same as page 2 complete), use side symbols from getProps
  // Page 3: prefer props.sideSymbols when passed (registry/page config), then getter, then build from measurement globals
  const page2MeasBC = typeof window !== 'undefined' ? window.page2MeasurementBC_cm : undefined;
  const page2MeasAB = typeof window !== 'undefined' ? window.page2MeasurementAB_cm : undefined;
  const page2MeasAC = typeof window !== 'undefined' ? window.page2MeasurementAC_cm : undefined;
  const page4MeasBC = typeof window !== 'undefined' ? window.page4MeasurementBC_cm : undefined;
  const page4MeasAB = typeof window !== 'undefined' ? window.page4MeasurementAB_cm : undefined;
  const page4MeasAC = typeof window !== 'undefined' ? window.page4MeasurementAC_cm : undefined;
  const page6MeasBC = typeof window !== 'undefined' ? window.page6MeasurementBC_cm : undefined;
  const page6MeasAB = typeof window !== 'undefined' ? window.page6MeasurementAB_cm : undefined;
  const page6MeasAC = typeof window !== 'undefined' ? window.page6MeasurementAC_cm : undefined;
  const effectiveSideSymbols = React.useMemo(() => {
    const stateComplete = getCurrentPageState() === 'complete';
    // Page 3: use side symbols from props first, then getter, then build from globals (so labels show after completing page 2 and navigating to page 3)
    if (currentPage === 3) {
      if (sideSymbols && sideSymbols.length > 0) return sideSymbols;
      if (typeof window !== 'undefined' && typeof window.page2ShapeDisplayGetProps === 'function') {
        try {
          const fresh = window.page2ShapeDisplayGetProps();
          if (fresh && fresh.sideSymbols && fresh.sideSymbols.length > 0) return fresh.sideSymbols;
        } catch (e) {}
      }
      const built = [
        ...(page2MeasBC != null ? [{ side: 'BC', type: 'label', label: `${page2MeasBC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page2MeasAB != null ? [{ side: 'AB', type: 'label', label: `${page2MeasAB} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page2MeasAC != null ? [{ side: 'CA', type: 'label', label: `${page2MeasAC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
      ].filter(Boolean);
      if (built.length > 0) return built;
      // Page 3 fallback: always show side labels (default lengths when no measurements yet, e.g. opening page 3 directly)
      const defaultLabels = [
        { side: 'BC', type: 'label', label: '20 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'AB', type: 'label', label: '16 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'CA', type: 'label', label: '15 cm', color: '#FF6600', size: '24gc', position: 0.5 }
      ];
      return defaultLabels;
    }
    // Page 5: exact replica of page 3 pattern but using page 4 getter and page4 measurement globals
    if (currentPage === 5) {
      if (sideSymbols && sideSymbols.length > 0) return sideSymbols;
      if (typeof window !== 'undefined' && typeof window.page4ShapeDisplayGetProps === 'function') {
        try {
          const fresh = window.page4ShapeDisplayGetProps();
          if (fresh && fresh.sideSymbols && fresh.sideSymbols.length > 0) return fresh.sideSymbols;
        } catch (e) {}
      }
      const built = [
        ...(page4MeasBC != null ? [{ side: 'BC', type: 'label', label: `${page4MeasBC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page4MeasAB != null ? [{ side: 'AB', type: 'label', label: `${page4MeasAB} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page4MeasAC != null ? [{ side: 'CA', type: 'label', label: `${page4MeasAC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
      ].filter(Boolean);
      if (built.length > 0) return built;
      const defaultLabels = [
        { side: 'BC', type: 'label', label: '20 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'AB', type: 'label', label: '16 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'CA', type: 'label', label: '15 cm', color: '#FF6600', size: '24gc', position: 0.5 }
      ];
      return defaultLabels;
    }
    // Page 7: exact replica of page 3 pattern but using page 6 getter and page6 measurement globals
    if (currentPage === 7) {
      if (sideSymbols && sideSymbols.length > 0) return sideSymbols;
      if (typeof window !== 'undefined' && typeof window.page6ShapeDisplayGetProps === 'function') {
        try {
          const fresh = window.page6ShapeDisplayGetProps();
          if (fresh && fresh.sideSymbols && fresh.sideSymbols.length > 0) return fresh.sideSymbols;
        } catch (e) {}
      }
      const built = [
        ...(page6MeasBC != null ? [{ side: 'BC', type: 'label', label: `${page6MeasBC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page6MeasAB != null ? [{ side: 'AB', type: 'label', label: `${page6MeasAB} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
        ...(page6MeasAC != null ? [{ side: 'CA', type: 'label', label: `${page6MeasAC} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
      ].filter(Boolean);
      if (built.length > 0) return built;
      // Page 7 = same as page 6 (obtuse triangle): default side lengths 20, 20, 20 cm
      const defaultLabels = [
        { side: 'BC', type: 'label', label: '20 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'AB', type: 'label', label: '20 cm', color: '#FF6600', size: '24gc', position: 0.5 },
        { side: 'CA', type: 'label', label: '20 cm', color: '#FF6600', size: '24gc', position: 0.5 }
      ];
      return defaultLabels;
    }
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && stateComplete) {
      const getPropsFn = currentPage === 2 ? window.page2ShapeDisplayGetProps : currentPage === 4 ? window.page4ShapeDisplayGetProps : window.page6ShapeDisplayGetProps;
      if (typeof window !== 'undefined' && typeof getPropsFn === 'function') {
        try {
          const fresh = getPropsFn();
          if (fresh && fresh.sideSymbols && fresh.sideSymbols.length > 0) return fresh.sideSymbols;
        } catch (e) {}
      }
    }
    return sideSymbols;
  }, [currentPage, sideSymbols, getCurrentPageState, pageState, page2MeasBC, page2MeasAB, page2MeasAC, page4MeasBC, page4MeasAB, page4MeasAC, page6MeasBC, page6MeasAB, page6MeasAC]);

  // Get quad ID for display state
  const quadId = id || `${elementName}-${currentPage}`;
  
  // Initialize global completed pages tracker if it doesn't exist
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.completedQuizPages) {
      window.completedQuizPages = new Set();
    }
  }, []);
  
  // State to track completed axes (for green color and labels)
  const [completedAxes, setCompletedAxes] = React.useState({
    vertical: false,
    horizontal: false,
    diagonal1: false,
    diagonal2: false
  });
  
  // Extract page number from component ID
  const componentPageNumber = React.useMemo(() => {
    if (id) {
      const pageMatch = id.match(/page(\d+)/);
      if (pageMatch) {
        return parseInt(pageMatch[1], 10);
      }
    }
    return currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null);
  }, [id, currentPage]);
  
  // Initialize completed axes based on previously completed pages
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (!window.completedQuizPages) {
      window.completedQuizPages = new Set();
      return;
    }
    
    const completed = {
      vertical: false,
      horizontal: false,
      diagonal1: false,
      diagonal2: false
    };
    
    // Check if page 2 was completed (vertical axis)
    if (window.completedQuizPages.has(2)) {
      completed.vertical = true;
    }
    
    // Check if page 3 was completed (horizontal axis)
    if (window.completedQuizPages.has(3)) {
      completed.horizontal = true;
    }
    
    // Check if page 4 was completed (diagonal axes)
    if (window.completedQuizPages.has(4)) {
      completed.diagonal1 = true;
      completed.diagonal2 = true;
    }
    
    setCompletedAxes(completed);
  }, [componentPageNumber]); // Only run when component page changes
  
  // Listen for quiz completion events to update axis colors
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleQuizCompleted = (event) => {
      const pageNumber = event.detail?.pageNumber;
      
      // Store completed page in global tracker
      if (!window.completedQuizPages) {
        window.completedQuizPages = new Set();
      }
      window.completedQuizPages.add(pageNumber);
      
      // Update axes for all components on all pages
      setCompletedAxes(prev => {
        const updated = { ...prev };
        if (pageNumber === 2) {
          updated.vertical = true;
        } else if (pageNumber === 3) {
          updated.horizontal = true;
        } else if (pageNumber === 4) {
          updated.diagonal1 = true;
          updated.diagonal2 = true;
        }
        return updated;
      });
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);
    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, []);
  
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
  
  // State for layout recalculation and container readiness
  const containerRef = React.useRef(null);
  
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
        containerHeightGc: 500,
        width: 100,
        height: 100,
        offsetX: 0,
        offsetY: 0
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
  // Extract vertex config with defaults (only if vertexConfig is not null/false)
  const vertexColor = (vertexConfig && vertexConfig.color) || '#FF9900';
  const showVertexLabels = (vertexConfig && vertexConfig.showLabels) || false;
  const vertexLabels = (vertexConfig && vertexConfig.labels) || ['A', 'B', 'C', 'D'];
  const vertexLabelColor = (vertexConfig && vertexConfig.labelColor) || '#FFFFFF'; // White font
  const vertexLabelSize = (vertexConfig && vertexConfig.labelSize) || '36gc'; // 36gc font size
  const vertexLabelOffset = (vertexConfig && vertexConfig.labelOffset) || '40gc'; // Increased default to prevent overlap
  const vertexLabelOffsets = (vertexConfig && vertexConfig.labelOffsets) || null; // Array of {x, y} offsets for each label (in gc units)
  const vertexInnerCircleSize = (vertexConfig && vertexConfig.innerCircleSize) || '6gc'; // Size of center dot (default: 6gc)
  const vertexAnimated = (vertexConfig && vertexConfig.animated !== undefined) ? vertexConfig.animated : true; // Default to animated
  const vertexAnimations = (vertexConfig && vertexConfig.vertexAnimations) || null; // Array of per-vertex animation flags [A, B, C, D]

  // Extract angle config with defaults (support deprecated showAngleMarkers for backward compatibility)
  // Determine angleShow from config
  let angleShow = effectiveAngleConfig.show || showAngleMarkers || 'all';
  
  console.log(`🔍 [Quadrilateral] Angle config extracted:`, {
    id: props.id,
    angleShow,
    effectiveAngleConfigShow: effectiveAngleConfig.show,
    showAngleMarkers,
    angleB: effectiveAngleConfig.angleB,
    angleBInteriorAngle: effectiveAngleConfig.angleB?.interiorAngle,
    angleBShow: effectiveAngleConfig.angleB?.interiorAngle?.show
  });
  
  const angleMarkerColor = effectiveAngleConfig.markerColor || '#FF6600';
  const angleMarkerSize = effectiveAngleConfig.markerSize || '1gc';
  const angleShowText = effectiveAngleConfig.showText !== undefined 
    ? effectiveAngleConfig.showText
    : (angleShow === 'measurement' || angleShow === 'all');
  const angleTextColor = effectiveAngleConfig.textColor || '#FF6600';
  const angleTextSize = effectiveAngleConfig.textSize || '12gc';
  const angleTextFont = effectiveAngleConfig.textFont || 'Arial, sans-serif';
  const angleTextOffset = effectiveAngleConfig.textOffset || '35gc';

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
    const vertexAngleConfig = effectiveAngleConfig[vertexKey] || {};
    
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
      
      // Get global show setting from the outer effectiveAngleConfig
      const globalShow = effectiveAngleConfig.show;
      
      // Log the angleConfig we received
      if (angleType === 'interiorAngle' && (currentPage === 4 || currentPage === 5 || currentPage === 7)) {
        console.log(`🔍 [Quadrilateral] getVertexAngleConfigBase for vertex ${vertexIndex}, angleType=${angleType}:`, {
          angleConfig,
          angleConfigShow: angleConfig?.show,
          angleConfigShowType: typeof angleConfig?.show,
          angleConfigShowIsFalse: angleConfig?.show === false,
          globalShow
        });
      }
      
      // Check if this angle is enabled
      let isEnabled = angleConfig.show !== undefined ? angleConfig.show : false;
      
      // Special case: if global show is 'all' and this is an interior angle, enable it
      // OR if pageState is 'complete' on pages 2, 4, or 6, enable interior angles
      // BUT: respect explicit show: false (don't override it)
      // EXCEPTION: For right angles (90°), we still need to enable it so the square can render
      if (!isEnabled && angleType === 'interiorAngle') {
        const currentPageState = getPageState();
        const isComplete = (currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete';
        const configuredAngle = angleConfig.angle;
        const isRightAngle = configuredAngle !== undefined && Math.abs(configuredAngle - 90) < 2;
        
        // Only auto-enable if show is not explicitly false, OR if it's a right angle (needs square rendering)
        if ((angleConfig.show !== false && (globalShow === 'all' || isComplete)) || (isRightAngle && angleConfig.show === false)) {
          isEnabled = true;
          if (isRightAngle && angleConfig.show === false) {
            console.log(`🔍 [Quadrilateral] Enabling ${angleType} for vertex ${vertexIndex} - right angle needs square rendering (show=false for arc)`);
          } else {
            console.log(`🔍 [Quadrilateral] Enabling ${angleType} for vertex ${vertexIndex} (global show=${globalShow}, page${currentPage}State=${currentPageState})`);
          }
        } else if (angleConfig.show === false && !isRightAngle) {
          console.log(`🔍 [Quadrilateral] Respecting explicit show=false for ${angleType} at vertex ${vertexIndex}`);
        }
      }
      
      if (!isEnabled) {
        const currentPageState = getPageState();
        const isComplete = (currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete';
        if (isComplete && angleType === 'interiorAngle') {
          console.log(`⚠️ [Quadrilateral] ${angleType} disabled for vertex ${vertexIndex}, angleConfig.show=${angleConfig.show}, globalShow=${globalShow}`);
        }
        return null;
      }
      
      const currentPageState = getPageState();
      const isComplete = (currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete';
      if (isComplete && angleType === 'interiorAngle') {
        console.log(`✅ [Quadrilateral] ${angleType} enabled for vertex ${vertexIndex}, angleConfig:`, angleConfig);
      }
      
      // Respect explicit show: false - BUT for right angles (90°), we still need to pass the config
      // so the AngleMarker can detect it's a right angle and render the square instead of the arc
      if (angleConfig.show === false) {
        const configuredAngle = angleConfig.angle;
        const isRightAngle = configuredAngle !== undefined && Math.abs(configuredAngle - 90) < 2;
        
        if (isRightAngle) {
          // For right angles, still return the config with show: false (so arc doesn't render)
          // but the AngleMarker can detect it's a right angle and render the square
          console.log(`🔍 [Quadrilateral] Right angle detected at vertex ${vertexIndex} with show=false - returning config for square rendering`);
          return {
            show: false, // Arc should not render
            size: angleConfig.size !== undefined ? angleConfig.size : globalDefaults.size,
            thickness: angleConfig.thickness !== undefined ? angleConfig.thickness : (angleConfig.strokeWidth !== undefined ? angleConfig.strokeWidth : '4gc'),
            color: angleConfig.color || globalDefaults.color,
            showText: angleConfig.showText !== undefined ? angleConfig.showText : globalDefaults.showText,
            textMode: angleConfig.textMode || globalDefaults.textMode,
            textSize: angleConfig.textSize !== undefined ? angleConfig.textSize : undefined,
            fill: angleConfig.fill !== undefined ? angleConfig.fill : false,
            fillColor: angleConfig.fillColor || angleConfig.color || globalDefaults.color,
            fillOpacity: angleConfig.fillOpacity !== undefined ? angleConfig.fillOpacity : 0.3,
            blinkFill: angleConfig.blinkFill !== undefined ? angleConfig.blinkFill : false,
            animateDraw: angleConfig.animateDraw !== undefined ? angleConfig.animateDraw : false,
            drawLoops: angleConfig.drawLoops !== undefined ? angleConfig.drawLoops : 1,
            drawDuration: angleConfig.drawDuration !== undefined ? angleConfig.drawDuration : 2,
            angle: angleConfig.angle // Include the angle value (90°) so AngleMarker can detect it's a right angle
          };
        } else {
          // For non-right angles with show: false, return null to disable completely
          console.log(`⚠️ [Quadrilateral] Returning null for ${angleType} at vertex ${vertexIndex} - explicit show=false (not a right angle)`);
          return null;
        }
      }
      
      // Preserve the original show value if it was explicitly set to false (for right angles)
      // Otherwise default to true since isEnabled is true
      const finalShow = angleConfig.show === false ? false : true;
      
      return {
        show: finalShow, // Preserve show: false if explicitly set, otherwise true
        size: angleConfig.size !== undefined ? angleConfig.size : globalDefaults.size,
        thickness: angleConfig.thickness !== undefined ? angleConfig.thickness : (angleConfig.strokeWidth !== undefined ? angleConfig.strokeWidth : '4gc'),
        color: angleConfig.color || globalDefaults.color,
        showText: angleConfig.showText !== undefined ? angleConfig.showText : globalDefaults.showText,
        textMode: angleConfig.textMode || globalDefaults.textMode,
        textSize: angleConfig.textSize !== undefined ? angleConfig.textSize : undefined, // Pass through textSize if provided
        fill: angleConfig.fill !== undefined ? angleConfig.fill : false,
        fillColor: angleConfig.fillColor || angleConfig.color || globalDefaults.color,
        fillOpacity: angleConfig.fillOpacity !== undefined ? angleConfig.fillOpacity : 0.3,
        blinkFill: angleConfig.blinkFill !== undefined ? angleConfig.blinkFill : false,
        animateDraw: angleConfig.animateDraw !== undefined ? angleConfig.animateDraw : false,
        drawLoops: angleConfig.drawLoops !== undefined ? angleConfig.drawLoops : 1,
        drawDuration: angleConfig.drawDuration !== undefined ? angleConfig.drawDuration : 2,
        angle: angleConfig.angle // Include the angle value if provided (e.g., 60°)
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
  }, [effectiveAngleConfig, angleMarkerSize, angleMarkerColor, currentPage, page2State]);

  // Get default vertices from config if not provided
  const defaultVertices = React.useMemo(() => {
    if (initialVertices && initialVertices.length >= 3) {
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
    if (buildTargetType === 'coordinates' && buildTargetVertices && buildTargetVertices.length >= 3) {
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
  
  // Update currentAngleShow and currentAngleShowText when effectiveAngleConfig changes
  React.useEffect(() => {
    setCurrentAngleShow(angleShow);
    setCurrentAngleShowText(angleShowText);
    console.log(`🔍 [Quadrilateral] Updated angle show state: angleShow=${angleShow}, angleShowText=${angleShowText}, effectiveAngleConfig.show=${effectiveAngleConfig.show}`);
  }, [angleShow, angleShowText, effectiveAngleConfig]);
  
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
  
  // Compute number of vertices and whether this is a triangle
  const numVertices = vertices?.length || 4;
  const isTriangle = numVertices === 3;
  
  // Build mode: Track if target has been achieved
  const [buildTargetAchieved, setBuildTargetAchieved] = React.useState(false);
  
  // Build mode: Track if success animation is playing
  const [buildSuccessAnimating, setBuildSuccessAnimating] = React.useState(false);
  
  // Helper function to get page-specific step
  const getPageStep = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2Step || 1;
    if (currentPage === 4) return window.page4Step || 1;
    if (currentPage === 6) return window.page6Step || 1;
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific protractor flow config
  const getPageProtractorFlowConfig = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2ProtractorFlowConfig;
    if (currentPage === 4) return window.page4ProtractorFlowConfig;
    if (currentPage === 6) return window.page6ProtractorFlowConfig;
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific step changed event name
  const getPageStepChangedEventName = React.useCallback(() => {
    if (currentPage === 2) return 'page2StepChanged';
    if (currentPage === 4) return 'page4StepChanged';
    if (currentPage === 6) return 'page6StepChanged';
    return null;
  }, [currentPage]);
  
  // Track page-specific step for pages 2, 4, and 6 to trigger re-renders when step changes
  const [pageStep, setPageStep] = React.useState(() => getPageStep());
  
  // Listen for page-specific step and state changes on pages 2, 4, and 6
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;
    
    const checkPageStep = () => {
      const newStep = getPageStep();
      if (newStep !== null && newStep !== undefined) {
        setPageStep(prevStep => {
          if (prevStep !== newStep) {
            console.log(`[STATE:page${currentPage}Step] Changed: ${prevStep || 'undefined'} → ${newStep} (QuadrilateralComponent - interval check)`);
            return newStep;
          }
          return prevStep;
        });
      }
    };
    
    const checkPageState = () => {
      const newState = getPageState();
      if (newState !== null) {
        setPageState(prevState => {
          if (prevState !== newState) {
            console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${newState} (QuadrilateralComponent - interval check)`);
            return newState;
          }
          return prevState;
        });
      }
    };
    
    // Check immediately
    checkPageStep();
    checkPageState();
    
    // Set up interval to check for step changes
    const interval = setInterval(() => {
      checkPageStep();
      checkPageState();
    }, 100);
    
    // Also listen for custom events if step changes are dispatched
    const stepEventName = getPageStepChangedEventName();
    const handleStepChange = (event) => {
      if (event.detail && event.detail.step !== undefined) {
        setPageStep(prevStep => {
          if (prevStep !== event.detail.step) {
            console.log(`[STATE:page${currentPage}Step] Changed: ${prevStep || 'undefined'} → ${event.detail.step} (QuadrilateralComponent - event)`);
            return event.detail.step;
          }
          return prevStep;
        });
      } else {
        checkPageStep();
      }
    };
    
    // Listen for state change events
    const getPageStateChangedEventName = () => {
      if (currentPage === 2) return 'pageStateChanged';
      if (currentPage === 4) return 'page4StateChanged';
      if (currentPage === 6) return 'page6StateChanged';
      return null;
    };
    
    const stateEventName = getPageStateChangedEventName();
    const handleStateChange = (event) => {
      if (event.detail && event.detail.state !== undefined) {
        setPageState(prevState => {
          if (prevState !== event.detail.state) {
            console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${event.detail.state} (QuadrilateralComponent - event)`);
            return event.detail.state;
          }
          return prevState;
        });
      } else {
        checkPageState();
      }
    };
    
    if (stepEventName) {
      window.addEventListener(stepEventName, handleStepChange);
    }
    if (stateEventName) {
      window.addEventListener(stateEventName, handleStateChange);
    }
    
    return () => {
      clearInterval(interval);
      if (stepEventName) {
        window.removeEventListener(stepEventName, handleStepChange);
      }
      if (stateEventName) {
        window.removeEventListener(stateEventName, handleStateChange);
      }
    };
  }, [currentPage, getPageStep, getPageState, getPageStepChangedEventName]);
  
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
        if (targetMatched && (buildTargetShape === 'SQUARE' || buildTargetShape === 'RHOMBUS')) {
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
        if (initialVertices && initialVertices.length >= 3) {
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
  const diagonalEqualityAnimationStateRef = React.useRef(null); // Store state in ref for animation loop
  
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
    if (diagonalEqualityAnimationRef.current) {
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
      diagonalEqualityAnimationRef.current = null;
    }
    diagonalEqualityAnimationStateRef.current = null;
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
    console.log('📊 Animation config:', { 
      duration: diagonalEqualityDuration, 
      waitTime: diagonalEqualityWaitTime, 
      cycles: diagonalEqualityCycles 
    });

    // Cancel any existing animation
    if (diagonalEqualityAnimationRef.current) {
      console.log('⚠️ Cancelling existing diagonal equality animation');
      cancelAnimationFrame(diagonalEqualityAnimationRef.current);
      diagonalEqualityAnimationRef.current = null;
    }

    const startTime = Date.now();
    const totalCycleDuration = diagonalEqualityDuration + diagonalEqualityWaitTime;
    
    // Create animation state object
    const animationState = {
      startTime,
      translationDuration: diagonalEqualityDuration,
      waitTime: diagonalEqualityWaitTime,
      totalCycleDuration,
      maxCycles: diagonalEqualityCycles,
      currentCycle: 0,
      phase: 'translating-to-target', // 'translating-to-target', 'waiting-at-target', 'translating-back', 'waiting-at-source'
      progress: 0
    };
    
    console.log('📊 Setting diagonal equality animation state...', animationState);
    
    // Store state in ref immediately so the loop can access it
    diagonalEqualityAnimationStateRef.current = animationState;
    
    // Set React state (async, but ref is available immediately)
    setDiagonalEqualityAnimation(animationState);

    console.log('📊 Diagonal equality animation state set, triggering useEffect to start loop');
  }, [diagonalEqualityDuration, diagonalEqualityWaitTime, diagonalEqualityCycles, id, elementName, currentPage]);

  // useEffect to run animation loop when animation state changes
  React.useEffect(() => {
    if (!diagonalEqualityAnimation || !diagonalEqualityAnimationStateRef.current) {
      return;
    }


    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startTime = diagonalEqualityAnimationStateRef.current.startTime;
    const totalCycleDuration = diagonalEqualityAnimationStateRef.current.totalCycleDuration;

    const animate = () => {
      if (!diagonalEqualityAnimationRef.current || !diagonalEqualityAnimationStateRef.current) {
        console.log('🛑 Animation loop stopped - refs cleared');
        return;
      }

      const elapsed = Date.now() - startTime;
      const fullCycle = totalCycleDuration * 2;
      const currentFullCycle = Math.floor(elapsed / fullCycle);
      const cycleElapsed = elapsed % fullCycle;

      if (diagonalEqualityCycles >= 0 && currentFullCycle >= diagonalEqualityCycles) {
        console.log('✅ Animation complete (max cycles reached)');
        diagonalEqualityAnimationStateRef.current = null;
        setDiagonalEqualityAnimation(null);
        if (diagonalEqualityAnimationRef.current) {
          cancelAnimationFrame(diagonalEqualityAnimationRef.current);
          diagonalEqualityAnimationRef.current = null;
        }

        const quadId = id || `${elementName}-${currentPage}`;
        window.dispatchEvent(new CustomEvent('diagonalEqualityAnimationComplete', {
          detail: { quadId }
        }));

        return;
      }

      let phase, progress;
      if (cycleElapsed < diagonalEqualityDuration) {
        phase = 'translating-to-target';
        progress = easeInOutCubic(cycleElapsed / diagonalEqualityDuration);
      } else if (cycleElapsed < diagonalEqualityDuration + diagonalEqualityWaitTime) {
        phase = 'waiting-at-target';
        progress = 1;
      } else if (cycleElapsed < diagonalEqualityDuration * 2 + diagonalEqualityWaitTime) {
        phase = 'translating-back';
        const translateBackElapsed = cycleElapsed - (diagonalEqualityDuration + diagonalEqualityWaitTime);
        progress = 1 - easeInOutCubic(translateBackElapsed / diagonalEqualityDuration);
      } else {
        phase = 'waiting-at-source';
        progress = 0;
      }

      const frameCount = Math.floor(elapsed / 16);
      if (frameCount % 10 === 0 || frameCount < 5) {
        console.log('🔄 Animation loop:', { elapsed, frameCount, phase, progress: progress.toFixed(3) });
      }

      const currentState = diagonalEqualityAnimationStateRef.current;
      if (currentState) {
        const newState = { 
          ...currentState, 
          currentCycle: currentFullCycle,
          phase,
          progress
        };
        diagonalEqualityAnimationStateRef.current = newState;
        setDiagonalEqualityAnimation(newState);
      }

      diagonalEqualityAnimationRef.current = requestAnimationFrame(animate);
    };

    diagonalEqualityAnimationRef.current = requestAnimationFrame(animate);
    console.log('✅ Animation loop started in useEffect, ref:', diagonalEqualityAnimationRef.current);

    return () => {
      if (diagonalEqualityAnimationRef.current) {
        cancelAnimationFrame(diagonalEqualityAnimationRef.current);
        diagonalEqualityAnimationRef.current = null;
        console.log('🛑 Animation loop cleanup');
      }
    };
  }, [diagonalEqualityAnimation, diagonalEqualityDuration, diagonalEqualityWaitTime, diagonalEqualityCycles, id, elementName, currentPage]);

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
    console.log('🎬 Starting symmetry fold animation:', { axis });
    
    // Validate axis
    // For triangles: triangle-axis-0, triangle-axis-1, triangle-axis-2, or triangle-axis-A, etc.
    // For quadrilaterals: vertical, horizontal, diagonal1, diagonal2
    const isTriangleAxis = isTriangle && axis.startsWith('triangle-axis-');
    const isQuadAxis = ['vertical', 'horizontal', 'diagonal1', 'diagonal2'].includes(axis);
    
    if (!isTriangleAxis && !isQuadAxis) {
      console.warn('❌ Invalid axis for symmetry fold animation. For triangles, use "triangle-axis-0/1/2" or "triangle-axis-A/B/C". For quadrilaterals, use "vertical", "horizontal", "diagonal1", or "diagonal2"');
      return;
    }

    // Cancel any existing animation
    if (symmetryFoldAnimationRef.current) {
      cancelAnimationFrame(symmetryFoldAnimationRef.current);
      symmetryFoldAnimationRef.current = null;
    }
    // Clear any existing animation state
    setSymmetryFoldAnimation(null);

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
    // Infinite cycle: Fold -> Hold -> Unfold -> Hold -> Repeat
    // Phase 1: Fold (0 to 1) - duration
    // Phase 2: Hold at folded (1) - holdTime
    // Phase 3: Unfold (1 to 0) - duration
    // Phase 4: Hold at unfolded (0) - holdTime
    const totalDuration = config.duration * 2 + config.holdTime * 2; // Full cycle duration
    
    setSymmetryFoldAnimation({
      axis,
      startTime,
      config,
      totalDuration,
      phase: 'folding', // 'folding', 'holding', 'unfolding', 'holding2'
      progress: 0 // 0 to 1 for fold progress
    });


    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Calculate position in the infinite cycle
      const cycleTime = elapsed % totalDuration;
      
      let phase, progress;
      
      if (cycleTime < config.duration) {
        // Phase 1: Fold (0 to 1)
        phase = 'folding';
        progress = easeInOutCubic(cycleTime / config.duration);
      } else if (cycleTime < config.duration + config.holdTime) {
        // Phase 2: Hold at folded position (1)
        phase = 'holding';
        progress = 1;
      } else if (cycleTime < config.duration * 2 + config.holdTime) {
        // Phase 3: Unfold (1 to 0)
        phase = 'unfolding';
        const unfoldProgress = (cycleTime - config.duration - config.holdTime) / config.duration;
        progress = 1 - easeInOutCubic(unfoldProgress);
      } else {
        // Phase 4: Hold at unfolded position (0)
        phase = 'holding2';
        progress = 0;
      }
      
      setSymmetryFoldAnimation(prev => {
        if (!prev) return null;
        const newState = { 
          ...prev, 
          phase,
          progress
        };
        // Log only important milestones (phase transitions)
        if (progress <= 0.01 || progress >= 0.99 || prev.phase !== phase) {
          console.log(`🔄 Symmetry animation: axis=${axis}, phase=${phase}, progress=${progress.toFixed(3)}, cycle=${Math.floor(elapsed / totalDuration) + 1}`);
        }
        return newState;
      });

      symmetryFoldAnimationRef.current = requestAnimationFrame(animate);
    };

    symmetryFoldAnimationRef.current = requestAnimationFrame(animate);
  }, [symmetryAnimationConfig, id, elementName, currentPage]);

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
      
      // Store symmetry fold animation
      const safeSymmetryFoldFunctionName = `animateSymmetryFold_${quadId.replace(/-/g, '_')}`;
      window[safeSymmetryFoldFunctionName] = animateSymmetryFold;
      window.quadrilateralAnimations[quadId].animateSymmetryFold = animateSymmetryFold;
      window.quadrilateralAnimations[elementName].animateSymmetryFold = animateSymmetryFold;
      
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
      containerRef.current.animateParallelLines = animateParallelLines;
      containerRef.current.stopParallelLinesAnimation = stopParallelLinesAnimation;
      containerRef.current.animateSymmetryFold = animateSymmetryFold;
      containerRef.current.stopSymmetryFoldAnimation = stopSymmetryFoldAnimation;
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
      if (symmetryFoldAnimationRef.current) {
        cancelAnimationFrame(symmetryFoldAnimationRef.current);
        symmetryFoldAnimationRef.current = null;
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
      const safeSymmetryFoldFunctionName = `animateSymmetryFold_${quadId.replace(/-/g, '_')}`;
      if (window[safeSymmetryFoldFunctionName]) {
        delete window[safeSymmetryFoldFunctionName];
      }
      if (window.quadrilateralAnimations) {
        if (window.quadrilateralAnimations[quadId]) {
          delete window.quadrilateralAnimations[quadId].animateEquality;
          delete window.quadrilateralAnimations[quadId].animateSum;
          delete window.quadrilateralAnimations[quadId].animateDiagonalEquality;
          delete window.quadrilateralAnimations[quadId].animateDiagonalBisection;
          delete window.quadrilateralAnimations[quadId].animateDiagonalPerpendicularBisection;
        }
        if (window.quadrilateralAnimations[elementName]) {
          delete window.quadrilateralAnimations[elementName].animateEquality;
          delete window.quadrilateralAnimations[elementName].animateSum;
          delete window.quadrilateralAnimations[elementName].animateDiagonalEquality;
          delete window.quadrilateralAnimations[elementName].animateDiagonalBisection;
          delete window.quadrilateralAnimations[elementName].animateDiagonalPerpendicularBisection;
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
        delete containerRef.current.animateSymmetryFold;
        delete containerRef.current.stopSymmetryFoldAnimation;
        delete containerRef.current.quadId;
      }
    };
  }, [animateAngleEquality, stopAngleEqualityAnimation, animateAngleSum, stopAngleSumAnimation, animateDiagonalEquality, stopDiagonalEqualityAnimation, animateDiagonalBisection, stopDiagonalBisectionAnimation, animateDiagonalPerpendicularBisection, stopDiagonalPerpendicularAnimation, animateSymmetryFold, stopSymmetryFoldAnimation, animateParallelLines, stopParallelLinesAnimation, animateSideEquality, stopSideEqualityAnimation, animateOppositeSideEquality, stopOppositeSideAnimation, id, elementName, currentPage]);

  // Calculate diagonal intersection point for protractor snap points
  const diagonalIntersection = React.useMemo(() => {
    // Triangles don't have diagonals
    if (isTriangle || !vertices || vertices.length < 4) {
      return null;
    }
    
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
  }, [vertices, isTriangle]);

  // Normalize vertex to nearest integer grid position (used only for validation)
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
      
      // Use original vertex coordinates (preserve fractional values for precision)
      // Only normalize for validation purposes
      const normalizedVertex = normalizeVertex(vertex);
      
      // Validate vertex coordinates are within grid bounds (allow 0..gridRows and 0..gridCols so edge vertices like row=10 for 10-row grid are valid)
      if (normalizedVertex.row < 0 || normalizedVertex.row > gridRows ||
          normalizedVertex.col < 0 || normalizedVertex.col > gridCols) {
        console.warn(`   ⚠️ Vertex ${labels[index]} has invalid coordinates: (row=${normalizedVertex.row}, col=${normalizedVertex.col})`);
        console.warn(`      Expected range: row [0-${gridRows}], col [0-${gridCols}]`);
      }
      
      // Use original coordinates for snap points to preserve precision
      // The protractor component can handle fractional coordinates
      const snapPoint = {
        x: vertex.col,  // x = column in quad grid (preserve fractional values)
        y: vertex.row,  // y = row in quad grid (preserve fractional values)
        label: `Vertex ${labels[index]}`
      };
      snapPoints.push(snapPoint);
      console.log(`   ✅ Added snap point: ${snapPoint.label} at (x=${snapPoint.x}, y=${snapPoint.y})`);
      console.log(`      Quad grid position: row ${vertex.row}/${gridRows-1}, col ${vertex.col}/${gridCols-1}`);
    });
    
    // Add diagonal intersection if it exists and diagonals are shown
    if (diagonalIntersection && currentShowDiagonals) {
      // Use original diagonal intersection coordinates (preserve fractional values)
      const snapPoint = {
        x: diagonalIntersection.col,  // Preserve fractional values
        y: diagonalIntersection.row,  // Preserve fractional values
        label: 'Diagonal Intersection'
      };
      snapPoints.push(snapPoint);
      console.log(`   ✅ Added snap point: ${snapPoint.label} at (x=${snapPoint.x}, y=${snapPoint.y})`);
      console.log(`      Quad grid position: row ${diagonalIntersection.row.toFixed(2)}/${gridRows-1}, col ${diagonalIntersection.col.toFixed(2)}/${gridCols-1}`);
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
      
      // Validate: check if vertex is at expected position (allow edge: row/col up to gridRows/gridCols inclusive)
      if (vertex.col < 0 || vertex.col > gridCols || vertex.row < 0 || vertex.row > gridRows) {
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
    // If vertexConfig is explicitly null or false, don't render vertices
    if (vertexConfig === null || vertexConfig === false) {
      return [];
    }
    
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
      
      // Validate that percentages are valid numbers
      if (isNaN(xPercent) || isNaN(yPercent) || !isFinite(xPercent) || !isFinite(yPercent)) {
        console.warn(`⚠️ [Quadrilateral] Invalid position calculated for vertex ${index}: xPercent=${xPercent}, yPercent=${yPercent}`);
        // Skip this vertex if position is invalid
        return null;
      }
      
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
      // Create a new object each time (not memoized) to ensure React detects the change
      // IMPORTANT: Always create a new object reference to break React.memo caching
      const positionObj = {
        css: {
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          width: '0%',
          height: '0%'
        },
        // Add a unique identifier to force new object reference
        _key: `${index}-${xPercent}-${yPercent}`
      };
      
      // Debug: Log position object being passed
      if (index === 0) {
        console.log('🔍 [Quadrilateral] Passing position to hotspot:', JSON.stringify(positionObj, null, 2));
        console.log('🔍 [Quadrilateral] Position object structure:', {
          hasPosition: !!positionObj,
          hasCss: !!positionObj.css,
          left: positionObj.css?.left,
          top: positionObj.css?.top,
          gridDimensions: gridDimensions
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
        coordinates: undefined, // Explicitly set to undefined to prevent fallback
        zIndex: zIndex + 100, // Highest z-index - hotspots should be on top
        backgroundColor: isCorrectlyPlaced ? colorWithOpacity(vertexColor, 0.5) : vertexColor,
        borderColor: isCorrectlyPlaced ? colorWithOpacity(vertexColor, 0.5) : vertexColor,
        borderWidth: '2gc',
        size: '20gc',
        innerCircleSize: vertexInnerCircleSize, // Center dot size (default: 6gc)
        animated: (() => {
          if (isCorrectlyPlaced) {
            return false;
          }
          
          // Check if this vertex should blink based on protractor flow config for pages 2, 4, and 6
          if (isTriangle && (currentPage === 2 || currentPage === 4 || currentPage === 6) && pageState && pageStep) {
            const flowConfig = getPageProtractorFlowConfig();
            if (flowConfig) {
              const blinkingVertex = flowConfig.helpers.getBlinkingVertex(pageState, pageStep);
              if (blinkingVertex) {
                // Map vertex labels to indices: A=0, B=1, C=2
                const vertexIndexMap = { 'A': 0, 'B': 1, 'C': 2 };
                const targetIndex = vertexIndexMap[blinkingVertex];
                if (targetIndex === index) {
                  return true;
                }
              }
            }
          }
          
          // Use per-vertex animation if provided, otherwise global
          return vertexAnimations && vertexAnimations[index] !== undefined ? vertexAnimations[index] : vertexAnimated;
        })(),
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
    }).filter(Boolean); // Filter out null returns (invalid positions)
    
    // Return array of vertex elements (will be rendered inside grid component)
    return vertexElements;
  }, [vertices, getVertexPosition, id, elementName, currentPage, zIndex, vertexColor, vertexInnerCircleSize, currentDraggable, handleVertexDragStart, coordinates, gridRows, gridCols, gridDimensions, isVertexCorrectlyPlaced, mode, resolvedTargetVertices, buildTargetType, buildTolerance, buildTargetAchieved, snapPoint, vertexAnimated, vertexAnimations, page2State]);

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
    
    // Process individual label offsets if provided, otherwise use default pattern
    let labelOffsets;
    if (vertexLabelOffsets && Array.isArray(vertexLabelOffsets) && vertexLabelOffsets.length > 0) {
      // Use individual offsets provided in config (convert from gc to viewBox units)
      labelOffsets = vertexLabelOffsets.map(offset => {
        const xOffset = offset.x ? processGcToViewBoxUnits(offset.x) : 0;
        const yOffset = offset.y ? processGcToViewBoxUnits(offset.y) : 0;
        return { x: xOffset, y: yOffset };
      });
    } else {
      // Default label positions offset from vertices (top-left, top-right, bottom-right, bottom-left)
      labelOffsets = [
      { x: -labelOffsetViewBox, y: -labelOffsetViewBox }, // A: top-left
      { x: labelOffsetViewBox, y: -labelOffsetViewBox },  // B: top-right
      { x: labelOffsetViewBox, y: labelOffsetViewBox },   // C: bottom-right
      { x: -labelOffsetViewBox, y: labelOffsetViewBox }   // D: bottom-left
    ];
    }
    
    const labels = [];
    for (let i = 0; i < numVertices; i++) {
      const vertex = getVertexPosition(i);
      if (!vertex) continue; // Skip if vertex doesn't exist (safety check)
      const vertexPos = getVertexViewBox(vertex);
      const offset = labelOffsets[i] || labelOffsets[0] || { x: 0, y: 0 }; // Fallback to first offset or zero if not enough offsets
      
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
  }, [currentShowVertexLabels, vertices, getVertexPosition, coordinates, gridRows, gridCols, vertexLabels, vertexLabelColor, vertexLabelSize, vertexLabelOffset, vertexLabelOffsets, zIndex, gridDimensions, numVertices]);

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
    
    // For triangle on pages 2, 4, and 6: Use config to determine which sides should blink
    if (isTriangle && (currentPage === 2 || currentPage === 4 || currentPage === 6) && pageState && pageStep) {
      // Get blinking side from config
      let blinkingSide = null;
      const flowConfig = getPageProtractorFlowConfig();
      if (flowConfig) {
        const stepConfig = flowConfig.helpers.getStepConfig(pageState, pageStep);
        if (stepConfig) {
          // Handle dynamic side blinking (for state A step 3)
          if (stepConfig.sideBlinkingDynamic && typeof stepConfig.sideBlinkingDynamic === 'function') {
            const stateConfig = flowConfig.states[pageState];
            const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
            if (chosenBaseline) {
              blinkingSide = stepConfig.sideBlinkingDynamic(chosenBaseline);
            }
          } else {
            blinkingSide = stepConfig.sideBlinking;
          }
        }
      }
      
      // Map side names to indices: AB=0, BC=1, CA=2
      const sideIndexMap = { 'AB': 0, 'BA': 0, 'BC': 1, 'CB': 1, 'CA': 2, 'AC': 2 };
      
      // Handle single side or array of sides
      const sidesToBlink = Array.isArray(blinkingSide) ? blinkingSide : (blinkingSide ? [blinkingSide] : []);
      
      sidesToBlink.forEach(sideName => {
        const sideIndex = sideIndexMap[sideName];
        if (sideIndex !== undefined) {
          sideOverrides[sideIndex] = {
            ...sideOverrides[sideIndex],
            color: '#FF9900', // Orange color
            isBlink: true // Enable blinking
          };
          console.log(`[STATE:sideBlink] Making side ${sideName} (index ${sideIndex}) orange and blink (page${currentPage}State=${pageState}, page${currentPage}Step=${pageStep})`);
        }
      });
    }
    
    // Add polygon fill if fillColor is provided
    if (fillColor) {
      const polygonPoints = vertices.slice(0, numVertices).map((vertex, index) => {
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
    for (let i = 0; i < numVertices; i++) {
      const v1 = getVertexPosition(i);
      const v2 = getVertexPosition((i + 1) % numVertices);
      
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
  }, [vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, side1, side2, side3, side4, getEdgeStyle, gridDimensions, fillColor, numVertices, isTriangle, currentPage, pageState, pageStep, getPageProtractorFlowConfig]);

  // Render side symbols (tick marks for equality, arrows for parallel, or side length labels when complete)
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
    
    // Map side names to indices
    // For quadrilaterals: AB=0, BC=1, CD=2, DA=3
    // For triangles: AB=0, BC=1, CA=2
    const sideNameToIndex = isTriangle 
      ? { 'AB': 0, 'BC': 1, 'CA': 2 }
      : { 'AB': 0, 'BC': 1, 'CD': 2, 'DA': 3 };
    
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
        position = 0.5, // Position along side (0-1, default center)
        label = null // Optional label text to display near the symbol
      } = symbolConfig;
      
      const sideIndex = sideNameToIndex[side?.toUpperCase()];
      if (sideIndex === undefined) {
        const validSides = isTriangle ? 'AB, BC, CA' : 'AB, BC, CD, DA';
        console.warn(`Invalid side name: ${side}. Use ${validSides}.`);
        return;
      }
      
      // Get vertices for this side
      const v1 = getVertexPosition(sideIndex);
      const v2 = getVertexPosition((sideIndex + 1) % numVertices);
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
      
      if (type === 'label' || type === 'text') {
        // Side length (or other) label only — text at midpoint of side, rotated to be parallel to the side
        if (!label) return;
        const labelSize = Math.max(symbolSize * 1.2, 2.5);
        const labelOffset = symbolSize * 1.5;
        const labelX = posX + perpX * labelOffset;
        const labelY = posY + perpY * labelOffset;
        let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (side?.toUpperCase() !== 'BC') angleDeg += 180;
        symbols.push(React.createElement('text', {
          key: `symbol-${symbolIdx}-label`,
          x: labelX,
          y: labelY,
          fill: color,
          fontSize: labelSize,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          transform: `rotate(${angleDeg}, ${labelX}, ${labelY})`
        }, label));
      } else if (type === 'tick' || type === 'ticks') {
        // Tick marks for equal length (congruent segments)
        // Multiple ticks are drawn perpendicular to the side
        const tickLength = symbolSize * 1.5; // Length of each tick
        const tickSpacing = symbolSize * 0.6; // Spacing between multiple ticks
        const totalWidth = (count - 1) * tickSpacing;
        
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
            strokeWidth: symbolSize * 0.15,
            strokeLinecap: 'round'
          }));
        }
        
        // Add label text if provided
        if (label) {
          const labelOffset = symbolSize * 2; // Offset label from tick mark
          const labelX = posX + perpX * labelOffset;
          const labelY = posY + perpY * labelOffset;
          const labelSize = symbolSize * 0.8; // Font size relative to symbol size
          
          symbols.push(React.createElement('text', {
            key: `symbol-${symbolIdx}-label`,
            x: labelX,
            y: labelY,
            fill: color,
            fontSize: labelSize,
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
          }, label));
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
  }, [effectiveSideSymbols, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, gridDimensions, isTriangle, numVertices]);

  // Render diagonals using SVG for precise vertex-to-vertex connection
  const renderDiagonals = React.useMemo(() => {
    // Triangles don't have diagonals
    if (isTriangle) {
      return null;
    }
    
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
  }, [currentShowDiagonals, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, diagonal1, diagonal2, getEdgeStyle, gridDimensions, isTriangle]);

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
    console.log(`🔍 [Quadrilateral] renderAngleMarkers called:`, {
      currentAngleShow,
      currentPage,
      numVertices,
      verticesLength: vertices.length
    });
    
    if (currentAngleShow === 'none') {
      console.log(`⚠️ [Quadrilateral] renderAngleMarkers returning empty - currentAngleShow is 'none'`);
      return [];
    }
    
    const AngleMarkerComp = window.AngleMarkerComponent?.AngleMarkerComponent;
    if (!AngleMarkerComp) {
      console.warn('⚠️ [Quadrilateral] AngleMarkerComponent not available');
      return [];
    }
    
    console.log(`✅ [Quadrilateral] Creating ${numVertices} angle markers`);
    return vertices.slice(0, numVertices).map((vertex, index) => {
      console.log(`🔍 [Quadrilateral] Creating angle marker for vertex ${index}`);
      const prevIndex = (index - 1 + numVertices) % numVertices;
      const nextIndex = (index + 1) % numVertices;
      
      const currentVertex = getVertexPosition(index);
      const prevVertex = getVertexPosition(prevIndex);
      const nextVertex = getVertexPosition(nextIndex);
      
      // Get per-vertex config (merges with global defaults)
      const vertexAngleConfig = getVertexAngleConfig(index);
      
      // Log for debugging on pages 2, 4, and 6 when complete
      const currentPageState = getPageState();
      if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete') {
        console.log(`🔍 [Quadrilateral] renderAngleMarkers vertex ${index}:`, {
          interiorAngle: vertexAngleConfig.interiorAngle,
          currentAngleShow,
          currentAngleShowText
        });
      }
      
      // Use interior angle config as defaults (fallback if per-angle configs not provided)
      const defaultConfig = vertexAngleConfig.interiorAngle || {
        size: angleMarkerSize,
        color: angleMarkerColor,
        showText: currentAngleShowText,
        textMode: 'both'
      };
      
      // If interiorAngle is null but we want to show it (pageState=complete), create a default config
      const isComplete = (currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete';
      if (!vertexAngleConfig.interiorAngle && isComplete && currentAngleShow !== 'none') {
        console.log(`⚠️ [Quadrilateral] interiorAngle is null for vertex ${index}, creating default config`);
        vertexAngleConfig.interiorAngle = {
          show: true,
          showText: true,
          angle: 60,
          textMode: 'measure',
          size: angleMarkerSize,
          color: angleMarkerColor
        };
        // Update defaultConfig to use the new interiorAngle
        Object.assign(defaultConfig, vertexAngleConfig.interiorAngle);
      }
      
      // Always override showText with currentAngleShowText to respect checkbox state
      // If checkbox is unchecked, hide text regardless of config
      const finalShowText = currentAngleShowText ? (defaultConfig.showText !== false) : false;
      
      // Helper to override showText in per-angle configs to respect checkbox state
      const overrideShowText = (config) => {
        if (!config) {
          const currentPageState = getPageState();
          const isComplete = (currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete';
          if (isComplete) {
            console.log(`⚠️ [Quadrilateral] overrideShowText received null config for vertex ${index}`);
          }
          return config;
        }
        return {
          ...config,
          showText: currentAngleShowText ? (config.showText !== false) : false
        };
      };
      
      const interiorAngleConfigFinal = overrideShowText(vertexAngleConfig.interiorAngle);
      
      // Log what we're passing to AngleMarkerComponent (for page 5 and page 2)
      if ((currentPage === 2 && page2State === 'complete') || currentPage === 5 || currentPage === 7) {
        console.log(`🎨 [Quadrilateral] Creating AngleMarker for vertex ${index}:`, {
          interiorAngleConfig: interiorAngleConfigFinal,
          interiorAngleConfigShow: interiorAngleConfigFinal?.show,
          interiorAngleConfigSize: interiorAngleConfigFinal?.size,
          interiorAngleConfigThickness: interiorAngleConfigFinal?.thickness,
          interiorAngleConfigColor: interiorAngleConfigFinal?.color,
          interiorAngleConfigFill: interiorAngleConfigFinal?.fill,
          interiorAngleConfigFillColor: interiorAngleConfigFinal?.fillColor,
          interiorAngleConfigFillOpacity: interiorAngleConfigFinal?.fillOpacity,
          interiorAngleConfigTextSize: interiorAngleConfigFinal?.textSize,
          interiorAngleConfigAngle: interiorAngleConfigFinal?.angle,
          originalInteriorAngle: vertexAngleConfig.interiorAngle,
          originalShow: vertexAngleConfig.interiorAngle?.show,
          defaultConfig,
          markerType: currentAngleShow,
          showText: finalShowText,
          vertexAngleConfigInteriorAngle: vertexAngleConfig.interiorAngle,
          componentProps: {
            color: defaultConfig.color,
            size: defaultConfig.size,
            textSize: angleTextSize
          }
        });
      }
      
      // Use configured angle if available, otherwise use calculated angle
      const angleToUse = vertexAngleConfig.interiorAngle?.angle !== undefined 
        ? vertexAngleConfig.interiorAngle.angle 
        : angles[index];
      
      console.log(`🔍 [Quadrilateral] Creating AngleMarker for vertex ${index}:`, {
        angleToUse,
        interiorAngleConfig: interiorAngleConfigFinal,
        interiorAngleShow: interiorAngleConfigFinal?.show,
        interiorAngleAngle: interiorAngleConfigFinal?.angle,
        markerType: currentAngleShow,
        isRightAngle: Math.abs(angleToUse - 90) < 2
      });
      
      return React.createElement(AngleMarkerComp, {
        key: `angle-${index}`,
        vertex: currentVertex,
        prevVertex: prevVertex,
        nextVertex: nextVertex,
        angle: angleToUse,
        containerCoordinates: coordinates,
        gridRows: gridRows,
        gridCols: gridCols,
        gridPadding: gridPadding,
        markerType: currentAngleShow,
        color: defaultConfig.color,
        size: defaultConfig.size,
        zIndex: zIndex + 100,
        showText: finalShowText,
        textColor: angleTextColor,
        textSize: angleTextSize,
        textFont: angleTextFont,
        textOffset: angleTextOffset,
        textMode: defaultConfig.textMode,
        // Per-angle configurations (with showText overridden to respect checkbox)
        interiorAngleConfig: interiorAngleConfigFinal,
        supplementaryAngle1Config: overrideShowText(vertexAngleConfig.supplementaryAngle1),
        supplementaryAngle2Config: overrideShowText(vertexAngleConfig.supplementaryAngle2),
        supplementaryAngle3Config: overrideShowText(vertexAngleConfig.supplementaryAngle3),
        // Protractor spawn function
        onArcClick: protractorConfig.enableClickToSpawn ? spawnProtractorAtVertex : null
      });
    });
  }, [currentAngleShow, currentAngleShowText, getVertexAngleConfig, angleTextColor, angleTextSize, angleTextFont, angleTextOffset, vertices, angles, getVertexPosition, coordinates, gridRows, gridCols, gridPadding, zIndex, protractorConfig.enableClickToSpawn, spawnProtractorAtVertex, numVertices, currentPage, pageState, angleMarkerSize, angleMarkerColor, getPageState]);

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
    
    const viewBoxSize = radius * 3;
    
    // Convert viewBoxSize to responsive gc units
    let responsiveArcSize = `${viewBoxSize}px`; // Fallback to pixels
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      // Use gc units for responsiveness - same as angle-marker-component
      responsiveArcSize = window.GridCellFontUtils.processGcProperty(`${viewBoxSize}gc`);
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
  }, [angleAnimation, vertices, angles, getVertexPosition, getVertexAngleConfig, coordinates, gridRows, gridCols, gridPadding, gridDimensions, angleMarkerSize, angleMarkerColor, angleTextSize, angleTextFont, angleTextColor, zIndex, equalityMessage, messageLeft, messageTop, messageOffsetX, messageOffsetY]);

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
    
    const viewBoxSize = radius * 3;
    
    // Convert viewBoxSize to responsive gc units
    let responsiveSumArcSize = `${viewBoxSize}px`; // Fallback to pixels
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      responsiveSumArcSize = window.GridCellFontUtils.processGcProperty(`${viewBoxSize}gc`);
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
    
    // Calculate semicircle (180° arc) for when animation completes
    // Make it bigger than the original arc (1.5x radius)
    const semicircleRadius = radius * 1.5;
    const semicircleViewBoxSize = semicircleRadius * 3;
    
    // Convert semicircle viewBoxSize to responsive gc units
    let responsiveSemicircleSize = `${semicircleViewBoxSize}px`; // Fallback to pixels
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      responsiveSemicircleSize = window.GridCellFontUtils.processGcProperty(`${semicircleViewBoxSize}gc`);
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
    
    return React.createElement(React.Fragment, { key: 'animated-angle-sum-arc-container' }, [
      // Animated arc (source interior angle moving to target supplementary angle)
      React.createElement('div', {
        key: 'animated-sum-arc',
        style: {
          position: 'absolute',
          left: `${currentLeft}%`,
          top: `${currentTop}%`,
          width: responsiveSumArcSize,  // Responsive size using gc units
          height: responsiveSumArcSize, // Responsive size using gc units
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
        // Calculate centroid based on number of vertices
        let centerRow, centerCol;
        if (isTriangle) {
          // Triangle: average of 3 vertices
          centerRow = (vertices[0].row + vertices[1].row + vertices[2].row) / 3;
          centerCol = (vertices[0].col + vertices[1].col + vertices[2].col) / 3;
        } else {
          // Quadrilateral: average of 4 vertices
          centerRow = (vertices[0].row + vertices[1].row + vertices[2].row + vertices[3].row) / 4;
          centerCol = (vertices[0].col + vertices[1].col + vertices[2].col + vertices[3].col) / 4;
        }
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
  }, [protractorConfig, protractorSnapPoints, vertices, gridToGridCell, id, elementName, currentPage, zIndex, isTriangle]);

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
    // Only log occasionally to avoid console spam (every 10% progress or phase changes)
    if (Math.floor(progress * 10) % 1 === 0 || progress === 0 || progress === 1) {
    console.log('🎨 Rendering animated side line:', { commonVertexIndex, progress, phase });
    }
    
    // Get vertex positions
    const commonVertex = getVertexPosition(commonVertexIndex);
    const prevVertex = getVertexPosition(prevVertexIndex);
    const nextVertex = getVertexPosition(nextVertexIndex);
    
    // Calculate positions in percentage
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Convert grid positions to percentage within container
    const commonXPercent = (commonVertex.col / gridCols) * 100;
    const commonYPercent = (commonVertex.row / gridRows) * 100;
    const prevXPercent = (prevVertex.col / gridCols) * 100;
    const prevYPercent = (prevVertex.row / gridRows) * 100;
    const nextXPercent = (nextVertex.col / gridCols) * 100;
    const nextYPercent = (nextVertex.row / gridRows) * 100;
    
    // Convert container coordinates to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    // Calculate absolute positions in percentage
    const commonLeft = containerLeft + (commonXPercent / 100) * containerWidthPercent;
    const commonTop = containerTop + (commonYPercent / 100) * containerHeightPercent;
    const prevLeft = containerLeft + (prevXPercent / 100) * containerWidthPercent;
    const prevTop = containerTop + (prevYPercent / 100) * containerHeightPercent;
    const nextLeft = containerLeft + (nextXPercent / 100) * containerWidthPercent;
    const nextTop = containerTop + (nextYPercent / 100) * containerHeightPercent;
    
    // Calculate side1 (prevVertex to commonVertex) - AB
    // This is the side we're copying initially
    const side1Length = Math.sqrt(
      Math.pow(commonLeft - prevLeft, 2) + Math.pow(commonTop - prevTop, 2)
    );
    // Angle FROM common vertex BACK to prev vertex (for starting position)
    const side1AngleFromCommon = Math.atan2(prevTop - commonTop, prevLeft - commonLeft) * (180 / Math.PI);
    
    // Calculate side2 (commonVertex to nextVertex) - BC
    // This is the target side we're rotating to
    const side2Length = Math.sqrt(
      Math.pow(nextLeft - commonLeft, 2) + Math.pow(nextTop - commonTop, 2)
    );
    // Angle FROM common vertex TO next vertex (for ending position)
    const side2AngleFromCommon = Math.atan2(nextTop - commonTop, nextLeft - commonLeft) * (180 / Math.PI);
    
    // Use the average length (they should be equal for equal sides)
    // Or use side2Length as that's the target we're proving equals side1
    const lineLength = side2Length;
    
    // Debug logging - only log when sides are equal (at completion) to avoid spam
    const sidesEqual = Math.abs(side1Length - side2Length) < 0.1;
    if (sidesEqual && (progress === 1 || Math.floor(progress * 10) % 2 === 0)) {
      console.log('✅ [Side Animation] Sides are equal - shape is a square', {
        side1LengthGc: side1Length.toFixed(4),
        side2LengthGc: side2Length.toFixed(4),
        lineLengthPercent: lineLengthPercent.toFixed(4)
    });
    }
    
    // Interpolate rotation angle based on progress
    // Rotate from side1 angle to side2 angle
    const currentAngle = side1AngleFromCommon + (side2AngleFromCommon - side1AngleFromCommon) * progress;
    
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
    
    // Calculate length in percentage units (matching the SVG coordinate system used for sides)
    // The sides use viewBox="0 0 100 100" with percentage coordinates
    // So we calculate the distance in percentage units within the container
    const deltaXPercent = nextXPercent - commonXPercent;
    const deltaYPercent = nextYPercent - commonYPercent;
    const lineLengthPercent = Math.sqrt(deltaXPercent * deltaXPercent + deltaYPercent * deltaYPercent);
    
    // Only log line end point calculation occasionally to avoid spam
    if (progress === 1 || Math.floor(progress * 20) % 4 === 0) {
      console.log('🎨 Line end point calculation:', {
        progress: progress.toFixed(3),
        currentAngle: currentAngle.toFixed(2),
        angleRad: angleRad.toFixed(4),
        lineLengthPercent: lineLengthPercent.toFixed(4),
        lineStart: { x: commonXPercent.toFixed(2) + '%', y: commonYPercent.toFixed(2) + '%' },
        lineEnd: { x: lineEndX.toFixed(2) + '%', y: lineEndY.toFixed(2) + '%' }
      });
    }
    
    // Render using SVG matching the sides coordinate system
    // The line starts at common vertex and extends in the current angle direction
    // Calculate the end point in viewBox coordinates (0-100)
    const angleRad = currentAngle * Math.PI / 180;
    const lineEndX = commonXPercent + Math.cos(angleRad) * lineLengthPercent;
    const lineEndY = commonYPercent + Math.sin(angleRad) * lineLengthPercent;
    
    return React.createElement(React.Fragment, { key: 'animated-side-line-container' }, [
      // Animated dashed line using SVG (matching sides rendering)
      React.createElement('svg', {
        key: 'animated-side-line',
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
        x1: commonXPercent,
        y1: commonYPercent,
        x2: lineEndX,
        y2: lineEndY,
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
  }, [sideEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, edgeThickness, angleTextSize, angleTextFont, zIndex, sideEqualityMessage, sideMessageLeft, sideMessageTop, sideMessageOffsetX, sideMessageOffsetY, sideLineStyle]);

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
    console.log('🎨 Rendering animated diagonal equality:', { progress, phase });
    
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
    
    // Debug logging for transform values
    if (Math.floor(progress * 100) % 25 === 0 || progress === 0 || progress === 1) {
      console.log('🎯 Diagonal equality transform:', {
        progress: progress.toFixed(3),
        phase,
        translateX: translateX.toFixed(2),
        translateY: translateY.toFixed(2),
        rotation: currentRotation.toFixed(2),
        sourceMid: { x: sourceMidX.toFixed(2), y: sourceMidY.toFixed(2) },
        targetMid: { x: targetMidX.toFixed(2), y: targetMidY.toFixed(2) }
      });
    }
    
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
        transform: `translate(${sourceMidX}, ${sourceMidY}) rotate(${currentRotation}) translate(${-sourceMidX}, ${-sourceMidY}) translate(${translateX}, ${translateY})`
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
  }, [diagonalEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, processThickness, getStrokeDashArray, edgeThickness, angleTextSize, angleTextFont, zIndex, diagonalEqualityMessage, diagonalEqualityMessageLeft, diagonalEqualityMessageTop, diagonalEqualityMessageOffsetX, diagonalEqualityMessageOffsetY, diagonalEqualityLineStyle, diagonalEqualityColor]);

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

  // Render permanent symmetry axis lines (always visible)
  const renderPermanentAxisLine = React.useMemo(() => {
    if (!symmetryAnimationConfig?.showAxisAlways || !coordinates) {
      return null;
    }

    const config = symmetryAnimationConfig;
    // For triangles: use triangleAxes prop (array of vertex indices: 0=A, 1=B, 2=C)
    // For quadrilaterals: use showVerticalAxis, showHorizontalAxis, showDiagonalAxis
    const triangleAxes = isTriangle ? (config.triangleAxes || []) : [];
    const showVertical = isTriangle ? false : (config.showVerticalAxis !== false); // Default to true if showAxisAlways is true
    const showHorizontal = isTriangle ? false : (config.showHorizontalAxis === true); // Default to false
    const showDiagonal = config.showDiagonalAxis === true; // Show diagonal axes
    const isClickable = config.clickableAxis === true;
    
    // Use the memoized componentPageNumber
    const labelNumber = componentPageNumber ? componentPageNumber - 1 : null;
    
    // All axes are always white, dashed, and clickable
    const verticalAxisCompleted = false; // Always show as white/dashed
    const verticalAxisClickable = isClickable; // Always clickable
    
    // All axes are always white, dashed, and clickable
    const horizontalAxisCompleted = false; // Always show as white/dashed
    const horizontalAxisClickable = isClickable; // Always clickable

    // Debug log
    console.log(`🎯 Rendering permanent axis lines:`, {
      showVertical,
      showHorizontal,
      showDiagonal,
      isClickable,
      hasAnimateSymmetryFold: !!animateSymmetryFold,
      triangleAxes: isTriangle ? triangleAxes : null
    });
    
    // Get all vertex positions
    const v0 = getVertexPosition(0); // A
    const v1 = getVertexPosition(1); // B
    const v2 = getVertexPosition(2); // C
    const v3 = !isTriangle ? getVertexPosition(3) : null; // D (only for quadrilaterals)
    
    // Use the same coordinate conversion as sides rendering
    const { offsetX, offsetY, width, height } = gridDimensions;
    
    // Helper function to convert vertex to percentage
    const getVertexPercent = (vertex) => {
      if (!vertex) return null;
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
    
    // Calculate bounding box based on number of vertices
    const vertexPoints = isTriangle ? [a, b, c] : [a, b, c, d];
    const minX = Math.min(...vertexPoints.map(p => p.x));
    const maxX = Math.max(...vertexPoints.map(p => p.x));
    const minY = Math.min(...vertexPoints.map(p => p.y));
    const maxY = Math.max(...vertexPoints.map(p => p.y));
    
    // Get axis extension amount (how much lines protrude beyond the shape)
    // Default is 5 percentage units, can be overridden in config
    const axisExtension = config.axisExtension !== undefined ? config.axisExtension : 5;
    
    // Helper function to calculate triangle axis from a vertex
    // vertexIndex: 0=A, 1=B, 2=C
    const calculateTriangleAxis = (vertexIndex) => {
      const vertices = [a, b, c];
      const vertexLabels = ['A', 'B', 'C'];
      const vertex = vertices[vertexIndex];
      const otherVertices = vertices.filter((_, i) => i !== vertexIndex);
      
      // Calculate centroid
      const centroid = {
        x: (a.x + b.x + c.x) / 3,
        y: (a.y + b.y + c.y) / 3
      };
      
      // Calculate midpoint of opposite side
      const oppositeMidpoint = {
        x: (otherVertices[0].x + otherVertices[1].x) / 2,
        y: (otherVertices[0].y + otherVertices[1].y) / 2
      };
      
      // Calculate direction vector from vertex through centroid to opposite midpoint
      const dirX = oppositeMidpoint.x - vertex.x;
      const dirY = oppositeMidpoint.y - vertex.y;
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      const unitX = dirX / length;
      const unitY = dirY / length;
      
      return {
        start: {
          x: vertex.x - unitX * axisExtension,
          y: vertex.y - unitY * axisExtension
        },
        end: {
          x: oppositeMidpoint.x + unitX * axisExtension,
          y: oppositeMidpoint.y + unitY * axisExtension
        },
        vertexIndex,
        vertexLabel: vertexLabels[vertexIndex]
      };
    };
    
    // Calculate triangle axes based on triangleAxes prop
    const triangleAxisData = isTriangle ? triangleAxes.map(vIdx => {
      // Convert vertex label to index if needed ('A' -> 0, 'B' -> 1, 'C' -> 2)
      let vertexIndex = vIdx;
      if (typeof vIdx === 'string') {
        vertexIndex = vIdx.toUpperCase() === 'A' ? 0 : (vIdx.toUpperCase() === 'B' ? 1 : 2);
      }
      return calculateTriangleAxis(vertexIndex);
    }) : [];
    
    // Check if any axes should be shown (after triangleAxisData is calculated)
    const hasTriangleAxes = isTriangle && triangleAxisData.length > 0;
    const hasQuadAxes = !isTriangle && (showVertical || showHorizontal || showDiagonal);
    
    if (!hasTriangleAxes && !hasQuadAxes) {
      return null;
    }
    
    // Calculate center for quadrilaterals
    let centerX, centerY;
    if (isTriangle) {
      // For triangles, use centroid
      const centroid = {
        x: (a.x + b.x + c.x) / 3,
        y: (a.y + b.y + c.y) / 3
      };
      centerX = centroid.x;
      centerY = centroid.y;
    } else {
      // Quadrilateral: use bounding box center
      centerX = (minX + maxX) / 2;
      centerY = (minY + maxY) / 2;
    }
    
    // Determine dash array based on style
    let dashArray = 'none';
    if (config.foldLineStyle === 'dashed') {
      dashArray = '2,2';
    } else if (config.foldLineStyle === 'dotted') {
      dashArray = '1,1';
    }
    
    // Convert 4gc to viewBox units for strokeWidth
    // viewBox is 0-100, so we need to convert gc to percentage of container
    // Get actual container dimensions from coordinates [x1, y1, x2, y2]
    const axisLineWidthGc = 4; // 4gc as requested
    let containerWidthGc = 0;
    let containerHeightGc = 0;
    
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      containerWidthGc = coordinates[2] - coordinates[0]; // x2 - x1
      containerHeightGc = coordinates[3] - coordinates[1]; // y2 - y1
    } else {
      // Fallback: estimate from grid dimensions
      containerWidthGc = (maxX - minX) * (gridCols / 100); // Approximate conversion
      containerHeightGc = (maxY - minY) * (gridRows / 100);
    }
    
    const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
    const strokeWidthViewBox = avgContainerGc > 0 ? (axisLineWidthGc / avgContainerGc) * 100 : 0.5;
    
    const lines = [];
    
    // Width of the invisible hit area around lines (in percentage units)
    // This makes the lines much easier to click
    const hitAreaWidth = 2; // 2 percentage units on each side
    
    // Handle click on axis line - create handler function
    const createAxisClickHandler = (axis) => {
      return (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log(`🖱️ Axis clicked: ${axis}`, event);
        console.log(`   animateSymmetryFold available:`, !!animateSymmetryFold);
        
        // Toggle symmetry animation along the clicked axis
        if (animateSymmetryFold) {
          // Support triangle axes (triangle-axis-0, triangle-axis-1, triangle-axis-2, or triangle-axis-A, etc.)
          // and quadrilateral axes (vertical, horizontal, diagonal1, diagonal2)
          const isTriangleAxis = axis.startsWith('triangle-axis-');
          const isQuadAxis = ['vertical', 'horizontal', 'diagonal1', 'diagonal2'].includes(axis);
          
          if (isTriangleAxis || isQuadAxis) {
            console.log(`🎬 Calling animateSymmetryFold with axis="${axis}"`);
            animateSymmetryFold(axis, {
              duration: config.duration || 2000,
              holdTime: config.holdTime || 1500
            });
          } else {
            console.warn(`⚠️ Invalid axis for animation: ${axis}`);
          }
        } else {
          console.error(`❌ animateSymmetryFold is not available!`);
        }
      };
    };
    
    // Add triangle axes if requested
    if (isTriangle && triangleAxisData.length > 0) {
      triangleAxisData.forEach((axisData, axisIdx) => {
        const { start, end, vertexIndex, vertexLabel } = axisData;
        const lineX1 = start.x;
        const lineY1 = start.y;
        const lineX2 = end.x;
        const lineY2 = end.y;
        
        // Create axis identifier (e.g., 'triangle-axis-A' or 'triangle-axis-0')
        const axisId = `triangle-axis-${vertexLabel}`;
        const axisKey = `triangle-axis-${vertexIndex}`;
        
        // All axes are always white, dashed, and clickable
        const axisClickable = isClickable;
        
        // Add invisible wider hit area for better clickability (only if clickable)
        if (axisClickable) {
          // For diagonal line, create a path-based hit area
          const dx = lineX2 - lineX1;
          const dy = lineY2 - lineY1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const perpX = -dy / length * hitAreaWidth;
          const perpY = dx / length * hitAreaWidth;
          const hitPath = `M ${lineX1 - perpX} ${lineY1 - perpY} L ${lineX1 + perpX} ${lineY1 + perpY} L ${lineX2 + perpX} ${lineY2 + perpY} L ${lineX2 - perpX} ${lineY2 - perpY} Z`;
          lines.push(React.createElement('path', {
            key: `${axisKey}-hit-area`,
            d: hitPath,
            fill: 'transparent',
            stroke: 'none',
            onClick: createAxisClickHandler(axisKey),
            style: { cursor: 'pointer' },
            pointerEvents: 'all'
          }));
        }
        
        // Always use white color and dashed style
        const axisColor = config.foldLineColor || '#FFFFFF';
        const axisDashArray = dashArray;
        
        const lineProps = {
          key: `${axisKey}-line`,
          x1: lineX1,
          y1: lineY1,
          x2: lineX2,
          y2: lineY2,
          stroke: axisColor,
          strokeWidth: strokeWidthViewBox,
          strokeDasharray: axisDashArray,
          strokeLinecap: 'round',
          pointerEvents: axisClickable ? 'stroke' : 'none'
        };
        
        if (axisClickable) {
          lineProps.onClick = createAxisClickHandler(axisKey);
          lineProps.style = { cursor: 'pointer' };
        }
        
        lines.push(React.createElement('line', lineProps));
      });
    }
    
    // Add vertical line if requested (for quadrilaterals)
    if (showVertical) {
      const lineY1 = minY - axisExtension;
      const lineY2 = maxY + axisExtension;
      
      // Add invisible wider hit area for better clickability (only if clickable)
      if (verticalAxisClickable) {
        lines.push(React.createElement('rect', {
          key: 'vertical-axis-hit-area',
          x: centerX - hitAreaWidth,
          y: lineY1,
          width: hitAreaWidth * 2,
          height: lineY2 - lineY1,
          fill: 'transparent',
          stroke: 'none',
          onClick: createAxisClickHandler('vertical'),
          style: { cursor: 'pointer' },
          pointerEvents: 'all'
        }));
      }
      
      // Always use white color and dashed style
      const verticalColor = config.foldLineColor || '#FFFFFF';
      const verticalDashArray = dashArray;
      
      const lineProps = {
        key: 'vertical-axis-line',
        x1: centerX,
        y1: lineY1,
        x2: centerX,
        y2: lineY2,
        stroke: verticalColor,
        strokeWidth: strokeWidthViewBox,
        strokeDasharray: verticalDashArray,
        strokeLinecap: 'round',
        pointerEvents: verticalAxisClickable ? 'stroke' : 'none'
      };
      
      if (verticalAxisClickable) {
        lineProps.onClick = createAxisClickHandler('vertical');
        lineProps.style = { cursor: 'pointer' };
      }
      
      lines.push(React.createElement('line', lineProps));
    }
    
    // Add horizontal line if requested
    if (showHorizontal) {
      let lineX1, lineY1, lineX2, lineY2;
      
      if (isTriangle && horizontalAxisStart && horizontalAxisEnd) {
        // Triangle: use median-based axis
        lineX1 = horizontalAxisStart.x;
        lineY1 = horizontalAxisStart.y;
        lineX2 = horizontalAxisEnd.x;
        lineY2 = horizontalAxisEnd.y;
      } else {
        // Quadrilateral: use bounding box center
        lineX1 = minX - axisExtension;
        lineX2 = maxX + axisExtension;
        lineY1 = centerY;
        lineY2 = centerY;
      }
      
      // Add invisible wider hit area for better clickability (only if clickable)
      if (horizontalAxisClickable) {
        if (isTriangle) {
          // For diagonal line, create a path-based hit area
          const dx = lineX2 - lineX1;
          const dy = lineY2 - lineY1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const perpX = -dy / length * hitAreaWidth;
          const perpY = dx / length * hitAreaWidth;
          const hitPath = `M ${lineX1 - perpX} ${lineY1 - perpY} L ${lineX1 + perpX} ${lineY1 + perpY} L ${lineX2 + perpX} ${lineY2 + perpY} L ${lineX2 - perpX} ${lineY2 - perpY} Z`;
          lines.push(React.createElement('path', {
            key: 'horizontal-axis-hit-area',
            d: hitPath,
            fill: 'transparent',
            stroke: 'none',
            onClick: createAxisClickHandler('horizontal'),
            style: { cursor: 'pointer' },
            pointerEvents: 'all'
          }));
        } else {
          lines.push(React.createElement('rect', {
            key: 'horizontal-axis-hit-area',
            x: lineX1,
            y: centerY - hitAreaWidth,
            width: lineX2 - lineX1,
            height: hitAreaWidth * 2,
            fill: 'transparent',
            stroke: 'none',
            onClick: createAxisClickHandler('horizontal'),
            style: { cursor: 'pointer' },
            pointerEvents: 'all'
          }));
        }
      }
      
      // Always use white color and dashed style
      const horizontalColor = config.foldLineColor || '#FFFFFF';
      const horizontalDashArray = dashArray;
      
      const lineProps = {
        key: 'horizontal-axis-line',
        x1: lineX1,
        y1: lineY1,
        x2: lineX2,
        y2: lineY2,
        stroke: horizontalColor,
        strokeWidth: strokeWidthViewBox, // 4gc converted to viewBox units
        strokeDasharray: horizontalDashArray,
        strokeLinecap: 'round',
        pointerEvents: horizontalAxisClickable ? 'stroke' : 'none'
      };
      
      if (horizontalAxisClickable) {
        lineProps.onClick = createAxisClickHandler('horizontal');
        lineProps.style = { cursor: 'pointer' };
      }
      
      lines.push(React.createElement('line', lineProps));
    }
    
    // Add diagonal lines if requested
    // For a square/quadrilateral, there are two diagonals:
    // Diagonal 1: from A (top-left) to C (bottom-right)
    // Diagonal 2: from B (top-right) to D (bottom-left)
    // Triangles don't have diagonals, so skip if it's a triangle
    if (showDiagonal && !isTriangle && d) {
      // Diagonal 1: A to C - extend beyond vertices
      const diag1Length = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
      const diag1UnitX = (c.x - a.x) / diag1Length;
      const diag1UnitY = (c.y - a.y) / diag1Length;
      const diag1X1 = a.x - diag1UnitX * axisExtension;
      const diag1Y1 = a.y - diag1UnitY * axisExtension;
      const diag1X2 = c.x + diag1UnitX * axisExtension;
      const diag1Y2 = c.y + diag1UnitY * axisExtension;
      
      // Add invisible wider hit area for better clickability (diagonal 1)
      if (isClickable) {
        // Create a path that represents a wider area around the diagonal line
        const perpX = -diag1UnitY * hitAreaWidth;
        const perpY = diag1UnitX * hitAreaWidth;
        const hitPath = `M ${diag1X1 - perpX} ${diag1Y1 - perpY} L ${diag1X1 + perpX} ${diag1Y1 + perpY} L ${diag1X2 + perpX} ${diag1Y2 + perpY} L ${diag1X2 - perpX} ${diag1Y2 - perpY} Z`;
        lines.push(React.createElement('path', {
          key: 'diagonal1-axis-hit-area',
          d: hitPath,
          fill: 'transparent',
          stroke: 'none',
          onClick: createAxisClickHandler('diagonal1'),
          style: { cursor: 'pointer' },
          pointerEvents: 'all'
        }));
      }
      
      // Always use white color and dashed style
      const diag1Color = config.foldLineColor || '#FFFFFF';
      const diag1DashArray = dashArray;
      
      const diag1Props = {
        key: 'diagonal-axis-line-1',
        x1: diag1X1,
        y1: diag1Y1,
        x2: diag1X2,
        y2: diag1Y2,
        stroke: diag1Color,
        strokeWidth: strokeWidthViewBox, // 4gc converted to viewBox units
        strokeDasharray: diag1DashArray,
        strokeLinecap: 'round',
        pointerEvents: isClickable ? 'stroke' : 'none'
      };
      
      if (isClickable) {
        // For diagonal, we'll use 'diagonal1' as the axis identifier
        diag1Props.onClick = createAxisClickHandler('diagonal1');
        diag1Props.style = { cursor: 'pointer' };
      }
      
      lines.push(React.createElement('line', diag1Props));
      
      // Diagonal 2: B to D - extend beyond vertices
      const diag2Length = Math.sqrt(Math.pow(d.x - b.x, 2) + Math.pow(d.y - b.y, 2));
      const diag2UnitX = (d.x - b.x) / diag2Length;
      const diag2UnitY = (d.y - b.y) / diag2Length;
      const diag2X1 = b.x - diag2UnitX * axisExtension;
      const diag2Y1 = b.y - diag2UnitY * axisExtension;
      const diag2X2 = d.x + diag2UnitX * axisExtension;
      const diag2Y2 = d.y + diag2UnitY * axisExtension;
      
      // Add invisible wider hit area for better clickability (diagonal 2)
      if (isClickable) {
        // Create a path that represents a wider area around the diagonal line
        const perpX = -diag2UnitY * hitAreaWidth;
        const perpY = diag2UnitX * hitAreaWidth;
        const hitPath = `M ${diag2X1 - perpX} ${diag2Y1 - perpY} L ${diag2X1 + perpX} ${diag2Y1 + perpY} L ${diag2X2 + perpX} ${diag2Y2 + perpY} L ${diag2X2 - perpX} ${diag2Y2 - perpY} Z`;
        lines.push(React.createElement('path', {
          key: 'diagonal2-axis-hit-area',
          d: hitPath,
          fill: 'transparent',
          stroke: 'none',
          onClick: createAxisClickHandler('diagonal2'),
          style: { cursor: 'pointer' },
          pointerEvents: 'all'
        }));
      }
      
      // Always use white color and dashed style
      const diag2Color = config.foldLineColor || '#FFFFFF';
      const diag2DashArray = dashArray;
      
      const diag2Props = {
        key: 'diagonal-axis-line-2',
        x1: diag2X1,
        y1: diag2Y1,
        x2: diag2X2,
        y2: diag2Y2,
        stroke: diag2Color,
        strokeWidth: strokeWidthViewBox, // 4gc converted to viewBox units
        strokeDasharray: diag2DashArray,
        strokeLinecap: 'round',
        pointerEvents: isClickable ? 'stroke' : 'none'
      };
      
      if (isClickable) {
        // For diagonal, we'll use 'diagonal2' as the axis identifier
        diag2Props.onClick = createAxisClickHandler('diagonal2');
        diag2Props.style = { cursor: 'pointer' };
      }
      
      lines.push(React.createElement('line', diag2Props));
    }
    
    if (lines.length === 0) {
      return null;
    }
    
    const svgProps = {
      key: 'permanent-axis-lines',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 200, // Above vertices (zIndex + 150) and shape to ensure clicks work
        pointerEvents: isClickable ? 'auto' : 'none', // Allow clicks if clickable
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    };
    
    // Add debug click handler to SVG if clickable
    if (isClickable) {
      svgProps.onClick = (event) => {
        // Only log if clicking on the SVG background, not on a line
        if (event.target === event.currentTarget) {
          console.log('🖱️ SVG background clicked (not on a line)', event);
        }
      };
    }
    
    return React.createElement('svg', svgProps, lines);
  }, [symmetryAnimationConfig, coordinates, getVertexPosition, gridDimensions, gridRows, gridCols, zIndex, animateSymmetryFold, completedAxes, componentPageNumber, isTriangle]);

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
    const v3 = !isTriangle ? getVertexPosition(3) : null; // D (only for quadrilaterals)
    
    // Use the same coordinate conversion as sides rendering
    const { offsetX, offsetY, width, height } = gridDimensions;
    
    // Helper function to convert vertex to percentage
    const getVertexPercent = (vertex) => {
      if (!vertex) return null;
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
    
    // Calculate bounding box based on number of vertices
    const vertexPoints = isTriangle ? [a, b, c] : [a, b, c, d];
    const minX = Math.min(...vertexPoints.map(p => p.x));
    const maxX = Math.max(...vertexPoints.map(p => p.x));
    const minY = Math.min(...vertexPoints.map(p => p.y));
    const maxY = Math.max(...vertexPoints.map(p => p.y));
    
    // For triangles, calculate centroid and median-based axes
    let centerX, centerY;
    if (isTriangle) {
      // Calculate centroid (intersection of medians)
      const centroid = {
        x: (a.x + b.x + c.x) / 3,
        y: (a.y + b.y + c.y) / 3
      };
      centerX = centroid.x;
      centerY = centroid.y;
    } else {
      centerX = (minX + maxX) / 2;
      centerY = (minY + maxY) / 2;
    }
    
    // Helper function to calculate triangle axis from a vertex (same as in renderPermanentAxisLine)
    const calculateTriangleAxisForAnimation = (vertexIndex) => {
      const vertices = [a, b, c];
      const vertex = vertices[vertexIndex];
      const otherVertices = vertices.filter((_, i) => i !== vertexIndex);
      
      // Calculate midpoint of opposite side
      const oppositeMidpoint = {
        x: (otherVertices[0].x + otherVertices[1].x) / 2,
        y: (otherVertices[0].y + otherVertices[1].y) / 2
      };
      
      const extension = 5;
      const dx = oppositeMidpoint.x - vertex.x;
      const dy = oppositeMidpoint.y - vertex.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      
      return {
        x1: vertex.x - unitX * extension,
        y1: vertex.y - unitY * extension,
        x2: oppositeMidpoint.x + unitX * extension,
        y2: oppositeMidpoint.y + unitY * extension
      };
    };
    
    // Calculate fold line based on axis
    let foldLineX1, foldLineY1, foldLineX2, foldLineY2;
    if (isTriangle && axis.startsWith('triangle-axis-')) {
      // Triangle axis: extract vertex index from axis name (triangle-axis-0, triangle-axis-A, etc.)
      const axisPart = axis.replace('triangle-axis-', '');
      let vertexIndex = parseInt(axisPart);
      if (isNaN(vertexIndex)) {
        // Convert letter to index
        vertexIndex = axisPart.toUpperCase() === 'A' ? 0 : (axisPart.toUpperCase() === 'B' ? 1 : 2);
      }
      const axisLine = calculateTriangleAxisForAnimation(vertexIndex);
      foldLineX1 = axisLine.x1;
      foldLineY1 = axisLine.y1;
      foldLineX2 = axisLine.x2;
      foldLineY2 = axisLine.y2;
    } else if (axis === 'vertical') {
      // Quadrilateral: vertical fold line through center
      foldLineX1 = centerX;
      foldLineY1 = minY - 5; // Extend slightly beyond shape
      foldLineX2 = centerX;
      foldLineY2 = maxY + 5;
    } else if (axis === 'horizontal') {
      // Quadrilateral: horizontal fold line through center
      foldLineX1 = minX - 5;
      foldLineY1 = centerY;
      foldLineX2 = maxX + 5;
      foldLineY2 = centerY;
    } else if (axis === 'diagonal1') {
      // Diagonal 1: A to C (extended beyond vertices)
      const extension = 5;
      const dx = c.x - a.x;
      const dy = c.y - a.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      foldLineX1 = a.x - unitX * extension;
      foldLineY1 = a.y - unitY * extension;
      foldLineX2 = c.x + unitX * extension;
      foldLineY2 = c.y + unitY * extension;
    } else if (axis === 'diagonal2') {
      // Diagonal 2: B to D (extended beyond vertices)
      // Triangles don't have diagonal2, so return early
      if (isTriangle || !d) {
        console.warn('Diagonal2 axis not supported for triangles');
        return null;
      }
      const extension = 5;
      const dx = d.x - b.x;
      const dy = d.y - b.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      foldLineX1 = b.x - unitX * extension;
      foldLineY1 = b.y - unitY * extension;
      foldLineX2 = d.x + unitX * extension;
      foldLineY2 = d.y + unitY * extension;
    }
    
    // Calculate the folded half polygon
    // For vertical axis: fold left half over to right
    // For horizontal axis: fold top half over to bottom
    let foldedPolygonPoints = '';
    // For triangles, only use 3 vertices; for quadrilaterals, use all 4
    let originalPolygonPoints = isTriangle 
      ? `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`
      : `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
    
    // Calculate clipped polygon for the left/top half
    // This creates the semi-transparent overlay that flips
    const clipAndMirrorPolygon = () => {
      // Helper function to reflect a point across an arbitrary line
      const reflectPointAcrossLine = (point, lineStart, lineEnd) => {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const lengthSq = dx * dx + dy * dy;
        // Project point onto line, then reflect
        const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSq;
        const projX = lineStart.x + t * dx;
        const projY = lineStart.y + t * dy;
        return {
          x: 2 * projX - point.x,
          y: 2 * projY - point.y
        };
      };
      
      // For a parallelogram ABCD where A is top-left, B is top-right, C is bottom-right, D is bottom-left
      // We need to calculate where the fold line intersects the shape edges
      
      // Handle triangle axes (median-based)
      if (isTriangle && axis.startsWith('triangle-axis-')) {
        // For triangle axes, the fold line is a median (from vertex through centroid to opposite midpoint)
        // This is a diagonal line, so we need to find which side of the line each vertex is on
        
        const foldLineStart = { x: foldLineX1, y: foldLineY1 };
        const foldLineEnd = { x: foldLineX2, y: foldLineY2 };
        
        // Helper to determine which side of the line a point is on
        const getSideOfLine = (point, lineStart, lineEnd) => {
          const dx = lineEnd.x - lineStart.x;
          const dy = lineEnd.y - lineStart.y;
          const px = point.x - lineStart.x;
          const py = point.y - lineStart.y;
          return dx * py - dy * px; // Cross product
        };
        
        // Find intersection of fold line with triangle edges
        const findLineEdgeIntersection = (lineStart, lineEnd, edgeStart, edgeEnd) => {
          const lineDx = lineEnd.x - lineStart.x;
          const lineDy = lineEnd.y - lineStart.y;
          const edgeDx = edgeEnd.x - edgeStart.x;
          const edgeDy = edgeEnd.y - edgeStart.y;
          
          const denom = lineDx * edgeDy - lineDy * edgeDx;
          if (Math.abs(denom) < 0.0001) return null; // Parallel lines
          
          const t = ((edgeStart.x - lineStart.x) * edgeDy - (edgeStart.y - lineStart.y) * edgeDx) / denom;
          const s = ((edgeStart.x - lineStart.x) * lineDy - (edgeStart.y - lineStart.y) * lineDx) / denom;
          
          if (s >= 0 && s <= 1) { // Intersection is on the edge
            return {
              x: lineStart.x + t * lineDx,
              y: lineStart.y + t * lineDy
            };
          }
          return null;
        };
        
        // Determine which triangle half to fold
        // For a median from vertex A to midpoint of BC:
        // - The median divides triangle ABC into two triangles: ABD and ACD (where D is midpoint of BC)
        // - We fold triangle ABD (the one containing the axis vertex and one vertex from the opposite side)
        // Extract vertex index from axis name
        const axisPart = axis.replace('triangle-axis-', '');
        let vertexIndex = parseInt(axisPart);
        if (isNaN(vertexIndex)) {
          vertexIndex = axisPart.toUpperCase() === 'A' ? 0 : (axisPart.toUpperCase() === 'B' ? 1 : 2);
        }
        const axisVertex = [a, b, c][vertexIndex];
        const otherVertices = [a, b, c].filter((_, i) => i !== vertexIndex);
        
        // The opposite side is the edge between the two other vertices
        // The median passes through the midpoint of this edge
        // Calculate the midpoint directly to avoid floating point errors from intersection calculation
        const midpoint = {
          x: (otherVertices[0].x + otherVertices[1].x) / 2,
          y: (otherVertices[0].y + otherVertices[1].y) / 2
        };
        
        // The triangle half to fold is the one containing the axis vertex and one of the other vertices
        // For a median from A to midpoint of BC:
        // - Triangle ABD (A, B, midpoint of BC) folds onto triangle ACD (A, C, midpoint of BC)
        // We'll fold triangle ABD, which contains: axis vertex (A), first other vertex (B), and midpoint
        const halfVertices = [];
        
        // Add the axis vertex
        halfVertices.push({ ...axisVertex, name: ['A', 'B', 'C'][vertexIndex] });
        
        // Add the first other vertex (this forms triangle ABD when axis is from A)
        halfVertices.push({ ...otherVertices[0], name: otherVertices[0] === a ? 'A' : (otherVertices[0] === b ? 'B' : 'C') });
        
        // Add the midpoint (this point lies on the fold line, so it won't move when reflected)
        halfVertices.push({ ...midpoint, name: 'midpoint' });
        
        // Sort vertices to form proper polygon (by angle from centroid)
        if (halfVertices.length >= 3) {
          const halfCentroidX = halfVertices.reduce((sum, v) => sum + v.x, 0) / halfVertices.length;
          const halfCentroidY = halfVertices.reduce((sum, v) => sum + v.y, 0) / halfVertices.length;
          halfVertices.sort((va, vb) => {
            const angleA = Math.atan2(va.y - halfCentroidY, va.x - halfCentroidX);
            const angleB = Math.atan2(vb.y - halfCentroidY, vb.x - halfCentroidX);
            return angleA - angleB;
          });
        } else {
          console.warn(`⚠️ Not enough vertices in triangle half: ${halfVertices.length}`);
          return null;
        }
        
        // Mirror the half across the fold line
        // Note: The midpoint lies on the fold line, so it should remain unchanged after reflection
        const mirroredVertices = halfVertices.map(v => {
          // If this is the midpoint, it's on the fold line, so don't reflect it
          if (v.name === 'midpoint') {
            return { ...v };
          }
          // Reflect other vertices across the fold line
          return reflectPointAcrossLine(v, foldLineStart, foldLineEnd);
        });
        
        // For triangles, after mirroring, ensure vertices are in correct order
        // The mirrored triangle should match the other half of the original triangle
        // Sort mirrored vertices by angle to ensure proper polygon rendering
        if (mirroredVertices.length >= 3 && isTriangle) {
          const mirroredCentroidX = mirroredVertices.reduce((sum, v) => sum + v.x, 0) / mirroredVertices.length;
          const mirroredCentroidY = mirroredVertices.reduce((sum, v) => sum + v.y, 0) / mirroredVertices.length;
          mirroredVertices.sort((va, vb) => {
            const angleA = Math.atan2(va.y - mirroredCentroidY, va.x - mirroredCentroidX);
            const angleB = Math.atan2(vb.y - mirroredCentroidY, vb.x - mirroredCentroidX);
            return angleA - angleB;
          });
        }
        
        // Calculate fold origin (midpoint of fold line)
        const foldOriginX = (foldLineStart.x + foldLineEnd.x) / 2;
        const foldOriginY = (foldLineStart.y + foldLineEnd.y) / 2;
        
        // Debug: Log polygon data for triangle axes and verify reflection (only once per animation start)
        if (isTriangle && axis.startsWith('triangle-axis-') && !window._polygonDataLogged) {
          window._polygonDataLogged = true;
          setTimeout(() => { window._polygonDataLogged = false; }, 100);
          
          // Calculate what the other half should be (the half we're NOT folding)
          // Use the same midpoint calculation
          const expectedMidpoint = {
            x: (otherVertices[0].x + otherVertices[1].x) / 2,
            y: (otherVertices[0].y + otherVertices[1].y) / 2
          };
          const otherHalfVertices = [
            { ...axisVertex, name: ['A', 'B', 'C'][vertexIndex] },
            { ...otherVertices[1], name: otherVertices[1] === a ? 'A' : (otherVertices[1] === b ? 'B' : 'C') },
            { ...expectedMidpoint, name: 'midpoint' }
          ];
          
          // Sort other half vertices for comparison
          const otherHalfCentroidX = otherHalfVertices.reduce((sum, v) => sum + v.x, 0) / otherHalfVertices.length;
          const otherHalfCentroidY = otherHalfVertices.reduce((sum, v) => sum + v.y, 0) / otherHalfVertices.length;
          otherHalfVertices.sort((va, vb) => {
            const angleA = Math.atan2(va.y - otherHalfCentroidY, va.x - otherHalfCentroidX);
            const angleB = Math.atan2(vb.y - otherHalfCentroidY, vb.x - otherHalfCentroidX);
            return angleA - angleB;
          });
          
          // Compare mirrored vertices with expected other half
          const mirroredStr = mirroredVertices.map(v => `(${v.x.toFixed(2)},${v.y.toFixed(2)})`).join(' ');
          const expectedStr = otherHalfVertices.map(v => `(${v.x.toFixed(2)},${v.y.toFixed(2)})`).join(' ');
          const matches = mirroredVertices.every((mv, i) => {
            const ev = otherHalfVertices[i];
            return Math.abs(mv.x - ev.x) < 0.01 && Math.abs(mv.y - ev.y) < 0.01;
          });
          
          console.log(`🔍 Triangle axis ${axis}: ${matches ? '✅ MATCHES' : '❌ MISMATCH'}`);
          
          if (!matches) {
            console.warn(`   Mirrored: ${mirroredStr}`);
            console.warn(`   Expected: ${expectedStr}`);
          }
        }
        
        return {
          diagonalHalf: halfVertices.map(v => `${v.x},${v.y}`).join(' '),
          mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
          foldOrigin: { x: foldOriginX, y: foldOriginY }
        };
      } else if (axis === 'vertical') {
        // Find intersection points of vertical line x=centerX with shape edges
        const intersections = [];
        
        if (isTriangle) {
          // For triangles, check all 3 edges: AB, BC, CA
          // A vertical line will intersect exactly 2 edges of a triangle
          
          // Check intersection with AB edge (from A to B)
          if ((a.x <= centerX && b.x >= centerX) || (a.x >= centerX && b.x <= centerX)) {
            const t = (centerX - a.x) / (b.x - a.x);
            if (t >= 0 && t <= 1) {
              const y = a.y + t * (b.y - a.y);
              intersections.push({ x: centerX, y, edge: 'AB' });
            }
          }
          
          // Check intersection with BC edge (from B to C)
          if ((b.x <= centerX && c.x >= centerX) || (b.x >= centerX && c.x <= centerX)) {
            const t = (centerX - b.x) / (c.x - b.x);
            if (t >= 0 && t <= 1) {
              const y = b.y + t * (c.y - b.y);
              intersections.push({ x: centerX, y, edge: 'BC' });
            }
          }
          
          // Check intersection with CA edge (from C to A)
          if ((c.x <= centerX && a.x >= centerX) || (c.x >= centerX && a.x <= centerX)) {
            const t = (centerX - c.x) / (a.x - c.x);
            if (t >= 0 && t <= 1) {
              const y = c.y + t * (a.y - c.y);
              intersections.push({ x: centerX, y, edge: 'CA' });
            }
          }
          
          // For triangles, construct the left half polygon
          // This should include: vertices on the left side + intersection points
          const leftVertices = [];
          
          // Add vertices that are on the left side (or on the axis)
          if (a.x <= centerX) leftVertices.push({ ...a, name: 'A' });
          if (b.x <= centerX) leftVertices.push({ ...b, name: 'B' });
          if (c.x <= centerX) leftVertices.push({ ...c, name: 'C' });
          
          // Add intersection points (these are on the axis)
          intersections.forEach(pt => leftVertices.push(pt));
          
          // For triangles, we need to ensure we have a proper triangle polygon
          // Sort vertices by angle from centroid to form proper polygon
          if (leftVertices.length > 0) {
            const leftCentroidX = leftVertices.reduce((sum, v) => sum + v.x, 0) / leftVertices.length;
            const leftCentroidY = leftVertices.reduce((sum, v) => sum + v.y, 0) / leftVertices.length;
            leftVertices.sort((va, vb) => {
              const angleA = Math.atan2(va.y - leftCentroidY, va.x - leftCentroidX);
              const angleB = Math.atan2(vb.y - leftCentroidY, vb.x - leftCentroidX);
              return angleA - angleB;
            });
          }
          
          // Mirror the left half across the fold line (x = centerX)
          const mirroredVertices = leftVertices.map(v => ({
            x: 2 * centerX - v.x,
            y: v.y
          }));
          
          return {
            leftHalf: leftVertices.map(v => `${v.x},${v.y}`).join(' '),
            mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
            foldOrigin: { x: centerX, y: centerY }
          };
        } else {
          // Quadrilateral logic (original code)
          // Check intersection with AB (top edge)
          if ((a.x <= centerX && b.x >= centerX) || (a.x >= centerX && b.x <= centerX)) {
            const t = (centerX - a.x) / (b.x - a.x);
            const y = a.y + t * (b.y - a.y);
            intersections.push({ x: centerX, y, edge: 'AB' });
          }
          
          // Check intersection with CD edge
          if (d && ((c.x <= centerX && d.x >= centerX) || (c.x >= centerX && d.x <= centerX))) {
            const t = (centerX - d.x) / (c.x - d.x);
            const y = d.y + t * (c.y - d.y);
            intersections.push({ x: centerX, y, edge: 'CD' });
          }
          
          // Check intersection with DA edge
          if (d && ((d.x <= centerX && a.x >= centerX) || (d.x >= centerX && a.x <= centerX))) {
            const t = (centerX - d.x) / (a.x - d.x);
            const y = d.y + t * (a.y - d.y);
            intersections.push({ x: centerX, y, edge: 'DA' });
          }
          
          // Create left half polygon
          const leftVertices = [];
          if (a.x <= centerX) leftVertices.push({ ...a, name: 'A' });
          if (b.x <= centerX) leftVertices.push({ ...b, name: 'B' });
          if (c.x <= centerX) leftVertices.push({ ...c, name: 'C' });
          if (d && d.x <= centerX) leftVertices.push({ ...d, name: 'D' });
          intersections.forEach(pt => leftVertices.push(pt));
          
          // Sort vertices by angle from centroid
          const leftCentroidX = leftVertices.reduce((sum, v) => sum + v.x, 0) / leftVertices.length;
          const leftCentroidY = leftVertices.reduce((sum, v) => sum + v.y, 0) / leftVertices.length;
          leftVertices.sort((va, vb) => {
            const angleA = Math.atan2(va.y - leftCentroidY, va.x - leftCentroidX);
            const angleB = Math.atan2(vb.y - leftCentroidY, vb.x - leftCentroidX);
            return angleA - angleB;
          });
          
          // Mirror the left half across the fold line
          const mirroredVertices = leftVertices.map(v => ({
            x: 2 * centerX - v.x,
            y: v.y
          }));
          
          return {
            leftHalf: leftVertices.map(v => `${v.x},${v.y}`).join(' '),
            mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
            foldOrigin: { x: centerX, y: centerY }
          };
        }
      } else if (axis === 'horizontal') {
        // Horizontal axis - fold top half over bottom
        const intersections = [];
        
        if (isTriangle) {
          // For triangles, check all 3 edges: AB, BC, CA
          // A horizontal line will intersect exactly 2 edges of a triangle
          
          // Check intersection with AB edge (from A to B)
          if ((a.y <= centerY && b.y >= centerY) || (a.y >= centerY && b.y <= centerY)) {
            const t = (centerY - a.y) / (b.y - a.y);
            if (t >= 0 && t <= 1) {
              const x = a.x + t * (b.x - a.x);
              intersections.push({ x, y: centerY, edge: 'AB' });
            }
          }
          
          // Check intersection with BC edge (from B to C)
          if ((b.y <= centerY && c.y >= centerY) || (b.y >= centerY && c.y <= centerY)) {
            const t = (centerY - b.y) / (c.y - b.y);
            if (t >= 0 && t <= 1) {
              const x = b.x + t * (c.x - b.x);
              intersections.push({ x, y: centerY, edge: 'BC' });
            }
          }
          
          // Check intersection with CA edge (from C to A)
          if ((c.y <= centerY && a.y >= centerY) || (c.y >= centerY && a.y <= centerY)) {
            const t = (centerY - c.y) / (a.y - c.y);
            if (t >= 0 && t <= 1) {
              const x = c.x + t * (a.x - c.x);
              intersections.push({ x, y: centerY, edge: 'CA' });
            }
          }
          
          // Create top half polygon
          const topVertices = [];
          if (a.y <= centerY) topVertices.push({ ...a, name: 'A' });
          if (b.y <= centerY) topVertices.push({ ...b, name: 'B' });
          if (c.y <= centerY) topVertices.push({ ...c, name: 'C' });
          intersections.forEach(pt => topVertices.push(pt));
          
          // Sort vertices by angle from centroid
          if (topVertices.length > 0) {
            const topCentroidX = topVertices.reduce((sum, v) => sum + v.x, 0) / topVertices.length;
            const topCentroidY = topVertices.reduce((sum, v) => sum + v.y, 0) / topVertices.length;
            topVertices.sort((va, vb) => {
              const angleA = Math.atan2(va.y - topCentroidY, va.x - topCentroidX);
              const angleB = Math.atan2(vb.y - topCentroidY, vb.x - topCentroidX);
              return angleA - angleB;
            });
          }
          
          // Mirror the top half across the fold line
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
          // Quadrilateral logic
          // Check intersection with DA edge
          if (d && ((d.y <= centerY && a.y >= centerY) || (d.y >= centerY && a.y <= centerY))) {
            const t = (centerY - d.y) / (a.y - d.y);
            const x = d.x + t * (a.x - d.x);
            intersections.push({ x, y: centerY, edge: 'DA' });
          }
          
          // Check intersection with BC edge
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
          if (d && d.y <= centerY) topVertices.push({ ...d, name: 'D' });
          intersections.forEach(pt => topVertices.push(pt));
          
          // Sort vertices
          const topCentroidX = topVertices.reduce((sum, v) => sum + v.x, 0) / topVertices.length;
          const topCentroidY = topVertices.reduce((sum, v) => sum + v.y, 0) / topVertices.length;
          topVertices.sort((va, vb) => {
            const angleA = Math.atan2(va.y - topCentroidY, va.x - topCentroidX);
            const angleB = Math.atan2(vb.y - topCentroidY, vb.x - topCentroidX);
            return angleA - angleB;
          });
          
          // Mirror the top half across the fold line
          const mirroredVertices = topVertices.map(v => ({
            x: v.x,
            y: 2 * centerY - v.y
          }));
          
          return {
            topHalf: topVertices.map(v => `${v.x},${v.y}`).join(' '),
            mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
            foldOrigin: { x: centerX, y: centerY }
          };
        }
      } else if (axis === 'diagonal1' || axis === 'diagonal2') {
        // Diagonal axis - fold one triangle across the diagonal
        // For triangles, this could be an altitude (from vertex to point on opposite side)
        // For quadrilaterals, this is a diagonal from vertex to vertex
        
        let diagStart, diagEnd;
        
        if (isTriangle) {
          // For triangles, diagonal1 is typically A to C (vertex to vertex)
          // But it could also be an altitude (e.g., A to D on side BC)
          // For now, assume diagonal1 = A to C, diagonal2 = B to A (which doesn't make sense, so skip)
          if (axis === 'diagonal1') {
            diagStart = a;
            diagEnd = c;
          } else {
            // diagonal2 doesn't make sense for triangles (would need B to ?)
            console.warn('Diagonal2 axis not supported for triangles');
            return null;
          }
        } else {
          // Quadrilateral: diagonal1 = A to C, diagonal2 = B to D
          diagStart = axis === 'diagonal1' ? a : b;
          diagEnd = axis === 'diagonal1' ? c : d;
        }
        
        // Helper to determine which side of the diagonal a point is on
        const getSideOfLine = (point, lineStart, lineEnd) => {
          const dx = lineEnd.x - lineStart.x;
          const dy = lineEnd.y - lineStart.y;
          const px = point.x - lineStart.x;
          const py = point.y - lineStart.y;
          return dx * py - dy * px; // Cross product
        };
        
        // Helper to find intersection of line with triangle edge
        const findLineEdgeIntersection = (lineStart, lineEnd, edgeStart, edgeEnd) => {
          // Line equation: lineStart + t * (lineEnd - lineStart)
          // Edge equation: edgeStart + s * (edgeEnd - edgeStart)
          const lineDx = lineEnd.x - lineStart.x;
          const lineDy = lineEnd.y - lineStart.y;
          const edgeDx = edgeEnd.x - edgeStart.x;
          const edgeDy = edgeEnd.y - edgeStart.y;
          
          const denom = lineDx * edgeDy - lineDy * edgeDx;
          if (Math.abs(denom) < 0.0001) return null; // Parallel lines
          
          const t = ((edgeStart.x - lineStart.x) * edgeDy - (edgeStart.y - lineStart.y) * edgeDx) / denom;
          const s = ((edgeStart.x - lineStart.x) * lineDy - (edgeStart.y - lineStart.y) * lineDx) / denom;
          
          if (s >= 0 && s <= 1) { // Intersection is on the edge
            return {
              x: lineStart.x + t * lineDx,
              y: lineStart.y + t * lineDy
            };
          }
          return null;
        };
        
        // For triangles, check if the axis intersects an edge (altitude case)
        let intersectionPoint = null;
        if (isTriangle && axis === 'diagonal1') {
          // Check if A-C intersects BC (altitude from A to BC)
          const bcIntersection = findLineEdgeIntersection(a, c, b, c);
          if (bcIntersection) {
            intersectionPoint = bcIntersection;
            // For altitude AD, we want to fold triangle ABD onto ACD
            // So we use A, B, and intersection point D
            diagEnd = intersectionPoint;
          }
        }
        
        // Determine which triangle to fold
        // For diagonal1 (A-C or A-D): fold triangle containing B
        const targetVertex = isTriangle ? b : (axis === 'diagonal1' ? b : a);
        const targetSide = getSideOfLine(targetVertex, diagStart, diagEnd);
        
        // Collect vertices on the same side as target vertex
        // IMPORTANT: Do NOT include the diagonal vertices (diagStart and diagEnd)
        // They should stay fixed on the diagonal during rotation
        const halfVertices = [];
        const allVertices = isTriangle 
          ? [
              { ...a, name: 'A' }, 
              { ...b, name: 'B' }, 
              { ...c, name: 'C' }
            ]
          : [
              { ...a, name: 'A' }, 
              { ...b, name: 'B' }, 
              { ...c, name: 'C' }, 
              { ...d, name: 'D' }
            ];
        
        allVertices.forEach(vertex => {
          const side = getSideOfLine(vertex, diagStart, diagEnd);
          // Include vertices strictly on the same side (not on the diagonal line)
          if (Math.sign(side) === Math.sign(targetSide) && Math.abs(side) > 0.01) {
            halfVertices.push(vertex);
          }
        });
        
        // Now add the diagonal endpoints to form the complete triangle polygon
        // For altitude case, diagEnd is the intersection point
        halfVertices.push({ ...diagStart, name: 'diagStart' });
        halfVertices.push({ ...diagEnd, name: 'diagEnd' });
        
        // Sort vertices to form a proper polygon (by angle from centroid)
        const diagMidX = (diagStart.x + diagEnd.x) / 2;
        const diagMidY = (diagStart.y + diagEnd.y) / 2;
        
        halfVertices.sort((va, vb) => {
          const angleA = Math.atan2(va.y - diagMidY, va.x - diagMidX);
          const angleB = Math.atan2(vb.y - diagMidY, vb.x - diagMidX);
          return angleA - angleB;
        });
        
        // Mirror the triangle across the diagonal
        const mirroredVertices = halfVertices.map(v => 
          reflectPointAcrossLine(v, diagStart, diagEnd)
        );
        
        return {
          diagonalHalf: halfVertices.map(v => `${v.x},${v.y}`).join(' '),
          mirroredHalf: mirroredVertices.map(v => `${v.x},${v.y}`).join(' '),
          foldOrigin: { x: diagMidX, y: diagMidY }
        };
      }
    };
    
    const polygonData = clipAndMirrorPolygon();
    if (!polygonData) {
      console.warn('⚠️ Could not calculate polygon data for symmetry fold animation', { axis, isTriangle });
      return null;
    }
    
    
    const { leftHalf, topHalf, diagonalHalf, mirroredHalf, foldOrigin } = polygonData;
    const halfPolygonPoints = (isTriangle && axis.startsWith('triangle-axis-')) ? (diagonalHalf || '') :
                              axis === 'vertical' ? (leftHalf || '') : 
                              axis === 'horizontal' ? (topHalf || '') :
                              (diagonalHalf || '');
    
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
    
    
    // Calculate the 3D transform for the fold animation
    // progress: 0 = flat, 1 = fully folded (190 degree rotation for better alignment)
    // Use 190° to ensure complete alignment and avoid floating point precision issues
    const rotationDegrees = progress >= 0.9999 ? 190.0 : progress * 190;
    
    let transformStyle, transformOriginX, transformOriginY;
    
    if (isTriangle && axis.startsWith('triangle-axis-')) {
      // Triangle axis: use diagonal rotation (similar to diagonal axes)
      // Calculate the angle of the fold line
      const foldAngleDeg = Math.atan2(foldLineY2 - foldLineY1, foldLineX2 - foldLineX1) * 180 / Math.PI;
      
      // Rotate around the fold line by rotating coordinate system
      transformStyle = `rotateZ(${foldAngleDeg}deg) rotateX(${rotationDegrees}deg) rotateZ(${-foldAngleDeg}deg)`;
      transformOriginX = `${foldOrigin.x}%`;
      transformOriginY = `${foldOrigin.y}%`;
    } else if (axis === 'vertical') {
      transformStyle = `rotateY(${rotationDegrees}deg)`;
      transformOriginX = `${foldOrigin.x}%`;
      transformOriginY = '50%';
    } else if (axis === 'horizontal') {
      transformStyle = `rotateX(-${rotationDegrees}deg)`;
      transformOriginX = '50%';
      transformOriginY = `${foldOrigin.y}%`;
    } else if (axis === 'diagonal1' || axis === 'diagonal2') {
      // For diagonal, we need a different approach
      // The issue with rotate3d is that it rotates in 3D space, moving all points including diagonal vertices
      // 
      // Better approach: Use CSS clip-path to show only the part of a full rotation that matches
      // OR: Animate by scaling perpendicular to the diagonal (simpler visual effect)
      // OR: Use SVG transform with proper anchor points
      
      // For triangles, diagonal axes shouldn't be used, but guard against it
      if (isTriangle || !d) {
        console.warn('Diagonal axis animation not supported for triangles');
        return null;
      }
      
      const diagStart = axis === 'diagonal1' ? a : b;
      const diagEnd = axis === 'diagonal1' ? c : d;
      
      // Calculate the angle of the diagonal
      const diagAngleDeg = Math.atan2(diagEnd.y - diagStart.y, diagEnd.x - diagStart.x) * 180 / Math.PI;
      
      // Use a simpler approach: scale the triangle perpendicular to the diagonal
      // As it "folds", it appears to collapse perpendicular to the fold line
      // At 90 degrees (progress=0.5), scale = 0
      // At 0 or 180 degrees (progress=0 or 1), scale = 1
      const scalePerp = Math.cos(rotationDegrees * Math.PI / 180);
      
      // Transform sequence:
      // 1. Rotate to align diagonal with X-axis
      // 2. Scale Y to simulate fold (collapse perpendicular to diagonal)
      // 3. Rotate back
      // But this only shows collapse, not actual rotation visibility
      
      // Better: For visual fold effect showing both sides
      // Use rotateX but with the coordinate system aligned to the diagonal
      // The key is setting transform-origin to a point ON the diagonal line
      
      // Use diagonal midpoint as origin
      transformStyle = `rotateZ(${diagAngleDeg}deg) rotateX(${rotationDegrees}deg) rotateZ(${-diagAngleDeg}deg)`;
      transformOriginX = `${foldOrigin.x}%`;
      transformOriginY = `${foldOrigin.y}%`;
    }
    
    return React.createElement(React.Fragment, { key: 'symmetry-fold-animation-container' }, [
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
      // For diagonal axes and triangle axes, we need special handling to keep the diagonal edge fixed
      ((axis === 'diagonal1' || axis === 'diagonal2') || (isTriangle && axis.startsWith('triangle-axis-'))) ? 
        // Diagonal/Triangle axis: Render BOTH the front triangle and its mirror reflection
        // As it rotates, we show the appropriate one based on rotation angle
        React.createElement('svg', {
          key: 'symmetry-folding-half-svg-diagonal',
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
          // Show the original triangle when rotating from 0-90 degrees
          // Show the mirrored triangle when rotating from 90-180 degrees
          rotationDegrees < 90 ? 
            React.createElement('polygon', {
              key: 'folding-polygon-diagonal-front',
              points: halfPolygonPoints,
              fill: config.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
              stroke: '#8B4545',
              strokeWidth: 0.3,
              opacity: 1 - (rotationDegrees / 90), // Fade out as we approach 90 degrees
              transform: (() => {
                let diagStart, diagEnd;
                if (isTriangle && axis.startsWith('triangle-axis-')) {
                  diagStart = { x: foldLineX1, y: foldLineY1 };
                  diagEnd = { x: foldLineX2, y: foldLineY2 };
                } else {
                  diagStart = axis === 'diagonal1' ? a : b;
                  diagEnd = axis === 'diagonal1' ? c : d;
                }
                const diagAngleDeg = Math.atan2(diagEnd.y - diagStart.y, diagEnd.x - diagStart.x) * 180 / Math.PI;
                
                // Scale perpendicular to diagonal (collapse toward diagonal)
                // As rotation goes from 0° to 90°, scale goes from 1 to 0 (collapsing)
                // At 0°: scale = 1 (fully visible)
                // At 90°: scale = 0 (fully collapsed)
                // At 180° and beyond (up to 190°): scale = 0 (still collapsed, front polygon not visible)
                const scaleY = rotationDegrees >= 90 ? 0 : Math.max(0, Math.cos(rotationDegrees * Math.PI / 180));
                const originX = foldOrigin.x;
                const originY = foldOrigin.y;
                return `translate(${originX} ${originY}) rotate(${diagAngleDeg}) scale(1 ${scaleY}) rotate(${-diagAngleDeg}) translate(${-originX} ${-originY})`;
              })()
            })
          :
            React.createElement('polygon', {
              key: 'folding-polygon-diagonal-back',
              points: mirroredHalf, // Use the mirrored polygon for the back side
              fill: config.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
              stroke: '#8B4545',
              strokeWidth: 0.3,
              // Fade in as we go past 90 degrees, ensure exactly 1.0 at 180° and beyond (up to 190°)
              // Use progress check to ensure exact 1.0 at completion
              opacity: (progress >= 0.9999 || rotationDegrees >= 180.0) ? 1.0 : Math.max(0, Math.min(1, (rotationDegrees - 90) / 90)),
              transform: (() => {
                let diagStart, diagEnd;
                if (isTriangle && axis.startsWith('triangle-axis-')) {
                  diagStart = { x: foldLineX1, y: foldLineY1 };
                  diagEnd = { x: foldLineX2, y: foldLineY2 };
                } else {
                  diagStart = axis === 'diagonal1' ? a : b;
                  diagEnd = axis === 'diagonal1' ? c : d;
                }
                const diagAngleDeg = Math.atan2(diagEnd.y - diagStart.y, diagEnd.x - diagStart.x) * 180 / Math.PI;
                
                // After 90 degrees, scale it back out perpendicular to diagonal
                // The mirrored polygon is already on the correct side, we just need to scale it
                // As rotation goes from 90° to 180°, scale goes from 0 to 1 (expanding)
                // At 90°: scale = 0 (just starting to appear)
                // At 180°: scale = 1 (fully expanded to match the other half)
                // Use -cos to get the correct scaling: -cos(90°) = 0, -cos(180°) = 1
                // Ensure scale reaches exactly 1.0 at 180° for perfect alignment
                // Check both progress and rotationDegrees to handle floating point precision
                // Scale calculation for 190° rotation: at 190°, scale should be 1.0
                // Be more aggressive: force scaleY = 1.0 when progress > 0.95 or rotationDegrees > 170
                let scaleY;
                if (progress >= 0.95 || rotationDegrees >= 170.0) {
                  scaleY = 1.0; // Force exact 1.0 when close to completion
                } else if (rotationDegrees <= 90) {
                  scaleY = 0; // Ensure exact 0 at 90° and below
                } else {
                  // Between 90° and 170°: use -cos for smooth transition
                  // -cos(90°) = 0, -cos(180°) = 1
                  scaleY = -Math.cos(rotationDegrees * Math.PI / 180);
                  // Ensure it's positive (cos is negative in this range)
                  scaleY = Math.max(0, scaleY);
                }
                // Don't clamp if we've explicitly set it to 1.0
                if (scaleY !== 1.0) {
                  scaleY = Math.max(0, Math.min(1, scaleY));
                }
                
                // Debug: Log scale values at key points
                if (progress >= 0.90 || rotationDegrees >= 160) {
                  const currentOpacity = (progress >= 0.9999 || rotationDegrees >= 180.0) ? 1.0 : Math.max(0, Math.min(1, (rotationDegrees - 90) / 90));
                  console.log(`🔍 Back polygon: progress=${progress.toFixed(3)}, rotation=${rotationDegrees.toFixed(1)}°, scaleY=${scaleY.toFixed(3)}, opacity=${currentOpacity.toFixed(3)}`);
                }
                
                const originX = foldOrigin.x;
                const originY = foldOrigin.y;
                
                // When scaleY = 1.0, the mirrored polygon should already be in the correct position
                // after reflection. Skip the transform to avoid any floating point precision issues
                // that might cause misalignment
                if (scaleY >= 0.9999) {
                  // At full scale, no transform needed - mirrored polygon is already in correct position
                  // Use empty string instead of 'none' for SVG compatibility
                  return '';
                }
                
                // Scale perpendicular to diagonal (expand back out)
                const transform = `translate(${originX} ${originY}) rotate(${diagAngleDeg}) scale(1 ${scaleY}) rotate(${-diagAngleDeg}) translate(${-originX} ${-originY})`;
                
                // Debug: Log transform at completion
                if (progress >= 0.999 && scaleY >= 0.999) {
                  console.log(`🔍 Final transform: scaleY=${scaleY.toFixed(3)}, origin=(${originX.toFixed(2)}, ${originY.toFixed(2)}), diagAngle=${diagAngleDeg.toFixed(1)}°`);
                }
                
                return transform;
              })()
            })
        ])
      :
        // Vertical/Horizontal: Use CSS 3D transforms as before
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
            transformOrigin: `${foldOrigin.x}% ${foldOrigin.y}%`,
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
  }, [symmetryFoldAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, zIndex, isTriangle]);

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
    let style;
    
    if (!coordinates) {
      style = {
        position: 'absolute',
        inset: 0
      };
      
      if (containerBorder) {
        const borderWidthPx = convertGcToPixels(containerBorderWidth);
        style.border = `${borderWidthPx}px ${containerBorderStyle} ${containerBorderColor}`;
      }
    } else {
      const [x1, y1, x2, y2] = coordinates;
      const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const left = ((x1 - 1) / gridSystemCols) * 100;
      const top = ((y1 - 1) / gridSystemRows) * 100;
      const width = ((x2 - x1 + 1) / gridSystemCols) * 100;
      const height = ((y2 - y1 + 1) / gridSystemRows) * 100;
      
      style = {
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
    }
    
    // Merge processedStyles to allow overrides (e.g., position: 'fixed' for screen-relative positioning)
    return {
      ...style,
      ...processedStyles
    };
  }, [coordinates, containerBorder, containerBorderWidth, containerBorderColor, containerBorderStyle, convertGcToPixels, processedStyles]);

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
        pointerEvents: 'none' // Don't block clicks - individual hotspots will have pointerEvents: 'auto'
      }
    }, renderVertices),
    
    // Animated parallel lines rails (rendered before quad so they appear behind)
    renderParallelLinesAnimation,
    
    // Permanent symmetry axis line (always visible if configured)
    renderPermanentAxisLine,
    
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
      
      // Animated diagonal perpendicular bisection (tick marks + right angle)
      renderAnimatedDiagonalPerpendicular,
      
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
      showAngleMarkers: 'all', // Deprecated: use effectiveAngleConfig.show
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
      effectiveAngleConfig: {
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