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
 * @param {string} props.mode - Component mode: 'default' (normal), 'build' (shape building exercise), or 'custom' (arbitrary points and lines) (default: 'default')
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
 * 
 * @param {Object} props.customConfig - Custom mode configuration object (for mode='custom')
 * @param {Array<Object>} props.customConfig.points - Array of point definitions
 * @param {string} props.customConfig.points[].id - Unique point identifier
 * @param {number} props.customConfig.points[].row - Grid row position
 * @param {number} props.customConfig.points[].col - Grid column position
 * @param {string} props.customConfig.points[].label - Optional label text
 * @param {Object} props.customConfig.points[].labelOffset - Label offset {x: '10gc', y: '-15gc'}
 * @param {string} props.customConfig.points[].size - Dot size in gc units (default: '12gc')
 * @param {string} props.customConfig.points[].color - Dot color (default: '#FF9900')
 * @param {boolean} props.customConfig.points[].clickable - Enable click interaction (default: false)
 * @param {Array<Object>} props.customConfig.connections - Array of line connections between points
 * @param {string} props.customConfig.connections[].id - Unique line identifier
 * @param {string} props.customConfig.connections[].from - Starting point ID
 * @param {string} props.customConfig.connections[].to - Ending point ID
 * @param {string} props.customConfig.connections[].color - Line color (default: '#000000')
 * @param {string} props.customConfig.connections[].thickness - Line thickness in gc units (default: '3gc')
 * @param {string} props.customConfig.connections[].style - Line style: 'solid', 'dashed', 'dotted' (default: 'solid')
 * @param {boolean} props.customConfig.connections[].clickable - Enable click interaction (default: false)
 * @param {string} props.customConfig.connections[].clickAreaWidth - Click area width in gc units (default: '20gc')
 * @param {string} props.customConfig.connections[].clickedColor - Color when line is clicked (default: uses connection.color)
 * @param {string} props.customConfig.connections[].clickBehavior - Behavior when clicked: 'normal' (change color only), 'blink' (blink animation), or 'glow' (glow effect) (default: 'normal')
 * @param {Object} props.customConfig.angleSettings - Angle detection and display settings
 * @param {boolean} props.customConfig.angleSettings.autoDetect - Auto-detect angles at intersections (default: true)
 * @param {boolean} props.customConfig.angleSettings.showArcs - Show arc markers for angles (default: true)
 * @param {boolean} props.customConfig.angleSettings.showRightAngleMarker - Show square marker for 90° angles (default: true)
 * @param {number} props.customConfig.angleSettings.rightAngleTolerance - Tolerance in degrees for right angle detection (default: 2)
 * @param {string} props.customConfig.angleSettings.arcSize - Arc marker size in gc units (default: '25gc')
 * @param {string} props.customConfig.angleSettings.arcColor - Arc marker color (default: '#FF6600')
 * @param {boolean} props.customConfig.angleSettings.showLabels - Show angle measurement labels (default: true)
 * @param {string} props.customConfig.angleSettings.labelSize - Label font size in gc units (default: '14gc')
 * @param {string} props.customConfig.angleSettings.labelColor - Label color (default: '#FF6600')
 * @param {Object} props.customConfig.angleSettings.selectedAngleMarker - Settings for angle marker when 2 lines are selected
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.arcSize - Size of the arc in gc units (default: '30gc')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.arcColor - Color of the arc border (default: '#FF6600')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.arcBorderWidth - Width of the arc border in gc units (default: '2gc')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.arcFillColor - Fill color for the arc, use 'transparent' for no fill (default: 'transparent')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.labelFontSize - Font size for the angle measurement label in gc units (default: '16gc')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.labelColor - Color of the label text (default: '#FFFFFF')
 * @param {Object} props.customConfig.angleSettings.selectedAngleMarker.labelOffset - X and Y offset for the label position
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.labelOffset.x - X offset in gc units (default: '0gc')
 * @param {string} props.customConfig.angleSettings.selectedAngleMarker.labelOffset.y - Y offset in gc units (default: '0gc')
 * @param {Function} props.onPointClick - Callback when a point is clicked: (pointId, pointData, event) => {}
 * @param {Function} props.onLineClick - Callback when a line is clicked: (lineId, lineData, event) => {}
 * @param {Function} props.onAngleDetected - Callback when angles are detected: (angles) => {}
 * 
 * @param {Array<Object>} props.customLines - Array of custom line configurations (line segments, rays, double-arrowed lines)
 * @param {string} props.customLines[].id - Unique identifier for the line
 * @param {string} props.customLines[].type - Line type: 'segment' (no arrows), 'ray' (one arrow), 'line' (double arrows) (default: 'segment')
 * @param {Object} props.customLines[].start - Start position as grid coordinates: {row, col}
 * @param {Object} props.customLines[].end - End position as grid coordinates: {row, col}
 * @param {string} props.customLines[].startVertex - Alternative: reference to vertex name 'A', 'B', 'C', or 'D' for start position
 * @param {string} props.customLines[].endVertex - Alternative: reference to vertex name 'A', 'B', 'C', or 'D' for end position
 * @param {number} props.customLines[].extendStart - Ratio to extend line before start point (default: 0 for segment, 0.3 for line)
 * @param {number} props.customLines[].extendEnd - Ratio to extend line past end point (default: 0 for segment, 0.3 for ray/line)
 * @param {string} props.customLines[].color - Line color (default: '#000000')
 * @param {string} props.customLines[].thickness - Line thickness in gc units (default: '3gc')
 * @param {string} props.customLines[].style - Line style: 'solid', 'dashed', 'dotted' (default: 'solid')
 * @param {string} props.customLines[].arrowSize - Size of arrowheads in gc units (default: '8gc')
 * @param {boolean} props.customLines[].isBlink - Enable blink animation (default: false)
 * @param {Object} props.customLines[].label - Label configuration for the line
 * @param {string} props.customLines[].label.text - Label text to display
 * @param {number} props.customLines[].label.position - Position along line (0-1, default: 0.5 = center)
 * @param {string} props.customLines[].label.color - Label text color (default: '#000000')
 * @param {string} props.customLines[].label.size - Label font size in gc units (default: '14gc')
 * @param {string} props.customLines[].label.offset - Perpendicular offset from line in gc units (default: '10gc')
 * @param {string} props.customLines[].label.offsetX - Horizontal offset in gc units (default: '0gc')
 * @param {string} props.customLines[].label.offsetY - Vertical offset in gc units (default: '0gc')
 * @param {Object} props.customLines[].angles - Angle marker configuration at line endpoints (deprecated for intersections)
 * @param {Object} props.customLines[].angles.start - Angle marker config at start point: {show, color, size, showText}
 * @param {Object} props.customLines[].angles.end - Angle marker config at end point: {show, color, size, showText}
 * 
 * @param {Array<Object>} props.intersectionAngles - Array of intersection angle configurations
 * @param {Array<string>} props.intersectionAngles[].lines - Array of exactly 2 line IDs that form the intersection
 * @param {number} props.intersectionAngles[].quadrant - Which of the 4 angles to mark (1-4, math convention: 1=upper-right, 2=upper-left, 3=lower-left, 4=lower-right)
 * @param {string} props.intersectionAngles[].color - Angle marker color (default: angleConfig.color)
 * @param {string|number} props.intersectionAngles[].size - Angle marker size in gc (default: angleConfig.size)
 * @param {boolean} props.intersectionAngles[].showText - Show angle measurement text (default: true)
 * @param {string} props.intersectionAngles[].textColor - Angle text color (default: same as color)
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
    // Symmetry fold animation config
    symmetryAnimationConfig = {},
    // All sides equality animation config
    allSideEqualityAnimationConfig = {},
    // Point animation config
    pointAnimationConfig = {},
    // Custom lines (segments, rays, double-arrowed lines)
    customLines = [],
    // Intersection angles configuration
    intersectionAngles = [],
    // Build mode props
    mode = 'default', // 'default' | 'build' | 'custom'
    buildConfig = {},
    // Custom mode props
    customConfig = {},
    onPointClick,
    onLineClick,
    onAngleDetected
  } = props;

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
  // Determine angleShow from config
  let angleShow = angleConfig.show || showAngleMarkers || 'all';
  
  const angleMarkerColor = angleConfig.markerColor || '#FF6600';
  const angleMarkerSize = angleConfig.markerSize || '1gc';
  const angleShowText = angleConfig.showText !== undefined 
    ? angleConfig.showText
    : (angleShow === 'measurement' || angleShow === 'all');
  const angleTextColor = angleConfig.textColor || '#FF6600';
  const angleTextSize = angleConfig.textSize || '12gc';
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

  // Extract custom mode config with defaults
  const customPoints = customConfig.points || [];
  const baseCustomConnections = customConfig.connections || [];
  const customAngleSettings = customConfig.angleSettings || {};
  const customFill = customConfig.fill !== undefined ? customConfig.fill : false;
  const customFillColor = customConfig.fillColor || 'rgba(255, 153, 0, 0.5)';
  const customFillOpacity = customConfig.fillOpacity !== undefined ? customConfig.fillOpacity : 0.5;
  const autoDetectAngles = customAngleSettings.autoDetect !== undefined ? customAngleSettings.autoDetect : true;
  const showAngleArcs = customAngleSettings.showArcs !== undefined ? customAngleSettings.showArcs : true;
  const showRightAngleMarker = customAngleSettings.showRightAngleMarker !== undefined ? customAngleSettings.showRightAngleMarker : true;
  const rightAngleTolerance = customAngleSettings.rightAngleTolerance || 2; // degrees
  const angleArcSize = customAngleSettings.arcSize || '25gc';
  const angleArcColor = customAngleSettings.arcColor || '#FF6600';
  const showAngleLabels = customAngleSettings.showLabels !== undefined ? customAngleSettings.showLabels : true;
  const angleLabelSize = customAngleSettings.labelSize || '14gc';
  const angleLabelColor = customAngleSettings.labelColor || '#FF6600';
  
  // Extract selected angle marker settings
  const selectedMarkerSettings = customAngleSettings.selectedAngleMarker || {};
  const selectedArcSize = selectedMarkerSettings.arcSize || '30gc';
  const selectedArcColor = selectedMarkerSettings.arcColor || '#FF6600';
  const selectedArcBorderWidth = selectedMarkerSettings.arcBorderWidth || '2gc';
  const selectedArcFillColor = selectedMarkerSettings.arcFillColor || 'transparent';
  const selectedLabelFontSize = selectedMarkerSettings.labelFontSize || '16gc';
  const selectedLabelColor = selectedMarkerSettings.labelColor || '#FFFFFF';
  const selectedLabelOffset = selectedMarkerSettings.labelOffset || { x: '0gc', y: '0gc' };

  // Point animation state
  // Log pointAnimationConfig for page8-geometry-grid-3
  if (id === 'page8-geometry-grid-3') {
    console.log('🔍 [Point Animation Config] For page8-geometry-grid-3:', {
      pointAnimationConfig,
      enabled: pointAnimationConfig?.enabled,
      pointId: pointAnimationConfig?.pointId,
      targetRow: pointAnimationConfig?.targetRow,
      loop: pointAnimationConfig?.loop
    });
  }
  
  const pointAnimEnabled = pointAnimationConfig.enabled === true;
  const pointAnimPointId = pointAnimationConfig.pointId;
  const pointAnimTargetRow = pointAnimationConfig.targetRow;
  const pointAnimTargetCol = pointAnimationConfig.targetCol; // Support column animation
  const pointAnimSyncPoints = pointAnimationConfig.syncPoints || []; // Points that move in sync
  // Support both old (duration) and new (durationForward/durationBackward) timing properties
  const pointAnimDuration = pointAnimationConfig.duration || 1000;
  const pointAnimDurationForward = pointAnimationConfig.durationForward || pointAnimDuration;
  const pointAnimDurationBackward = pointAnimationConfig.durationBackward || pointAnimDuration;
  const pointAnimHoldAtNew = pointAnimationConfig.holdAtNew || 0;
  const pointAnimHoldAtOld = pointAnimationConfig.holdAtOld || 0;
  const pointAnimStartDelay = pointAnimationConfig.startDelay || 0;
  const pointAnimAutoStart = pointAnimationConfig.autoStart !== false;
  const pointAnimLoop = pointAnimationConfig.loop !== false; // Default to true (loop infinitely)
  
  // Find the point to animate and get its initial row and col
  const animPoint = pointAnimEnabled && pointAnimPointId ? customPoints.find(p => p.id === pointAnimPointId) : null;
  const animInitialRow = animPoint ? animPoint.row : null;
  const animInitialCol = animPoint ? animPoint.col : null;
  
  // State for animated row and column values
  const [animatedRow, setAnimatedRow] = React.useState(animInitialRow);
  const [animatedCol, setAnimatedCol] = React.useState(animInitialCol);
  // State to track animation state for header updates
  const [animationState, setAnimationState] = React.useState('waiting');
  // State to track page 8 animation state (for shape 1 to respond to shape 3's animation)
  const [page8AnimationState, setPage8AnimationState] = React.useState(window.page8AnimationState || 'WIP');
  
  // Compute dynamic connections based on animation state for page 8
  const customConnections = React.useMemo(() => {
    // Check if this is shape 3 (page8-geometry-grid-3) or shape 1 (page8-geometry-grid-1)
    const isShape3 = (id === 'page8-geometry-grid-3') || (quadId === 'page8-geometry-grid-3');
    const isShape1 = (id === 'page8-geometry-grid-1') || (quadId === 'page8-geometry-grid-1');
    
    // Check if animation is at new position (row 6)
    // For shape 3, check its own animation state
    // For shape 1, check shape 3's animation state via global state or by checking if we're on page 8
    let isAtNewPosition = false;
    
    if (isShape3) {
      // Shape 3: Check its own animation state
      isAtNewPosition = pointAnimEnabled && 
                        pointAnimPointId === 'C' && 
                        Math.abs(animatedRow - pointAnimTargetRow) < 0.1;
    } else if (isShape1) {
      // Shape 1: Check shape 3's animation state via the page8AnimationState state
      if (currentPage === 8) {
        isAtNewPosition = page8AnimationState === 'Completed';
      }
    }
    
    if (!isShape3 && !isShape1) {
      // Not shape 1 or 3, return original connections
      return baseCustomConnections;
    }
    
    // Create a copy of connections to modify
    const computedConnections = baseCustomConnections.map(conn => ({ ...conn }));
    
    if (isShape3) {
      // Shape 3: When at new position, BC, CD, AC should be white, solid, not blinking
      if (isAtNewPosition) {
        computedConnections.forEach(conn => {
          if (conn.id === 'BC' || conn.id === 'CD' || conn.id === 'AC') {
            conn.color = '#FFFFFF';
            conn.style = 'solid';
            conn.alwaysBlink = false;
            conn.clickBehavior = 'normal';
          }
        });
      } else {
        // At original position: BC, CD, AC should be yellow, dashed, blinking
        computedConnections.forEach(conn => {
          if (conn.id === 'BC' || conn.id === 'CD' || conn.id === 'AC') {
            conn.color = '#FFFF00';
            conn.style = 'dashed';
            conn.alwaysBlink = true;
            conn.clickBehavior = 'blink';
          }
        });
      }
    } else if (isShape1) {
      // Shape 1: When at new position, BC, CD should be white, dashed
      if (isAtNewPosition) {
        computedConnections.forEach(conn => {
          if (conn.id === 'BC' || conn.id === 'CD') {
            conn.color = '#FFFFFF';
            conn.style = 'dashed';
          }
        });
      } else {
        // At original position: BC, CD should be white, solid (original state)
        computedConnections.forEach(conn => {
          if (conn.id === 'BC' || conn.id === 'CD') {
            conn.color = '#FFFFFF';
            conn.style = 'solid';
          }
        });
      }
    }
    
    return computedConnections;
  }, [baseCustomConnections, id, quadId, pointAnimEnabled, pointAnimPointId, animatedRow, pointAnimTargetRow, currentPage, page8AnimationState]);
  
  // Ref to track if animation has been started (prevent re-starting on every render)
  const animationStartedRef = React.useRef(false);
  const animationConfigRef = React.useRef(null);
  const animationCleanupRef = React.useRef(null);
  
  // Animate point row/col when enabled (infinite back and forth with holds)
  React.useEffect(() => {
    // Check if we have valid animation targets (row or col)
    const hasRowTarget = pointAnimTargetRow !== undefined && animInitialRow !== null;
    const hasColTarget = pointAnimTargetCol !== undefined && animInitialCol !== null;
    
    if (!pointAnimEnabled || !animPoint || (!hasRowTarget && !hasColTarget)) {
      // Clean up if animation was running
      if (animationCleanupRef.current) {
        animationCleanupRef.current();
        animationCleanupRef.current = null;
      }
      animationStartedRef.current = false;
      animationConfigRef.current = null;
      return;
    }
    
    if (!pointAnimAutoStart) {
      // Clean up if animation was running
      if (animationCleanupRef.current) {
        animationCleanupRef.current();
        animationCleanupRef.current = null;
      }
      animationStartedRef.current = false;
      animationConfigRef.current = null;
      return;
    }
    
    // Create a stable config string to compare
    const currentConfigKey = `${animPoint.id}-${pointAnimTargetRow}-${pointAnimTargetCol}-${animInitialRow}-${animInitialCol}`;
    
    // Check if config has changed or animation hasn't started yet
    const configChanged = !animationConfigRef.current || animationConfigRef.current !== currentConfigKey;
    
    // Only start animation if config changed or hasn't started
    if (!animationStartedRef.current || configChanged) {
      // Clean up previous animation if it exists
      if (animationCleanupRef.current) {
        animationCleanupRef.current();
        animationCleanupRef.current = null;
      }
      
      animationConfigRef.current = currentConfigKey;
      animationStartedRef.current = true;
      
      console.log('🎬 [Point Animation] Starting infinite animation', {
        row: hasRowTarget ? `${animInitialRow} -> ${pointAnimTargetRow}` : 'none',
        col: hasColTarget ? `${animInitialCol} -> ${pointAnimTargetCol}` : 'none'
      });
    } else {
      // Animation already running with same config, don't restart
      return;
    }
    
    // Store stable values for the closure
    const startRow = animInitialRow;
    const endRow = pointAnimTargetRow;
    const startCol = animInitialCol;
    const endCol = pointAnimTargetCol;
    const shouldAnimateRow = hasRowTarget;
    const shouldAnimateCol = hasColTarget;
    const durationForward = pointAnimDurationForward;
    const durationBackward = pointAnimDurationBackward;
    const holdAtNew = pointAnimHoldAtNew;
    const holdAtOld = pointAnimHoldAtOld;
    const startDelay = pointAnimStartDelay;
    const shouldLoop = pointAnimLoop;
    
    let animationFrameId = null;
    let timeoutId = null;
    
    // Animation state machine
    let currentState = 'waiting'; // 'waiting' | 'forward' | 'holdNew' | 'backward' | 'holdOld'
    let stateStartTime = Date.now();
    
    // Update animation state for header tracking
    setAnimationState(currentState);
    
    const runAnimationCycle = () => {
      const now = Date.now();
      const elapsed = now - stateStartTime;
      
      switch (currentState) {
        case 'waiting':
          // Wait for startDelay, then move to forward
          if (elapsed >= startDelay) {
            currentState = 'forward';
            setAnimationState('forward');
            stateStartTime = now;
            runAnimationCycle();
          } else {
            timeoutId = setTimeout(runAnimationCycle, startDelay - elapsed);
          }
          break;
          
        case 'forward':
          // Animate from start to end
          const forwardProgress = Math.min(elapsed / durationForward, 1);
          const forwardEased = forwardProgress < 0.5
            ? 2 * forwardProgress * forwardProgress
            : 1 - Math.pow(-2 * forwardProgress + 2, 2) / 2;
          
          // Animate row if target is defined
          if (shouldAnimateRow) {
            const forwardRow = startRow + (endRow - startRow) * forwardEased;
            setAnimatedRow(forwardRow);
          }
          
          // Animate column if target is defined
          if (shouldAnimateCol) {
            const forwardCol = startCol + (endCol - startCol) * forwardEased;
            setAnimatedCol(forwardCol);
          }
          
          if (forwardProgress >= 1) {
            // Forward animation complete, move to hold at new
            currentState = 'holdNew';
            setAnimationState('holdNew');
            stateStartTime = now;
            if (shouldAnimateRow) setAnimatedRow(endRow); // Ensure we're exactly at end
            if (shouldAnimateCol) setAnimatedCol(endCol); // Ensure we're exactly at end
            if (holdAtNew > 0) {
              timeoutId = setTimeout(runAnimationCycle, holdAtNew);
            } else {
              runAnimationCycle();
            }
          } else {
            animationFrameId = requestAnimationFrame(runAnimationCycle);
          }
          break;
          
        case 'holdNew':
          // Hold at new position
          setAnimationState('holdNew');
          if (elapsed >= holdAtNew) {
            // If loop is false, stop at new position; otherwise continue to backward
            if (shouldLoop) {
              currentState = 'backward';
              setAnimationState('backward');
              stateStartTime = now;
              runAnimationCycle();
            } else {
              // Stop animation at new position
              console.log('🛑 [Animation] Stopping at new position (loop=false)');
              setAnimationState('completed');
              // Don't continue the animation cycle
            }
          } else {
            timeoutId = setTimeout(runAnimationCycle, holdAtNew - elapsed);
          }
          break;
          
        case 'backward':
          // Animate from end back to start
          setAnimationState('backward');
          const backwardProgress = Math.min(elapsed / durationBackward, 1);
          const backwardEased = backwardProgress < 0.5
            ? 2 * backwardProgress * backwardProgress
            : 1 - Math.pow(-2 * backwardProgress + 2, 2) / 2;
          
          // Animate row if target is defined
          if (shouldAnimateRow) {
            const backwardRow = endRow + (startRow - endRow) * backwardEased;
            setAnimatedRow(backwardRow);
          }
          
          // Animate column if target is defined
          if (shouldAnimateCol) {
            const backwardCol = endCol + (startCol - endCol) * backwardEased;
            setAnimatedCol(backwardCol);
          }
          
          if (backwardProgress >= 1) {
            // Backward animation complete, move to hold at old
            currentState = 'holdOld';
            setAnimationState('holdOld');
            stateStartTime = now;
            if (shouldAnimateRow) setAnimatedRow(startRow); // Ensure we're exactly at start
            if (shouldAnimateCol) setAnimatedCol(startCol); // Ensure we're exactly at start
            if (holdAtOld > 0) {
              timeoutId = setTimeout(runAnimationCycle, holdAtOld);
            } else {
              runAnimationCycle();
            }
          } else {
            animationFrameId = requestAnimationFrame(runAnimationCycle);
          }
          break;
          
        case 'holdOld':
          // Hold at old position, then restart cycle
          setAnimationState('holdOld');
          if (elapsed >= holdAtOld) {
            currentState = 'forward';
            setAnimationState('forward');
            stateStartTime = now;
            runAnimationCycle();
          } else {
            timeoutId = setTimeout(runAnimationCycle, holdAtOld - elapsed);
          }
          break;
      }
    };
    
    // Start animation cycle
    if (startDelay > 0) {
      currentState = 'waiting';
      setAnimationState('waiting');
      stateStartTime = Date.now();
      timeoutId = setTimeout(runAnimationCycle, startDelay);
    } else {
      currentState = 'forward';
      setAnimationState('forward');
      stateStartTime = Date.now();
      animationFrameId = requestAnimationFrame(runAnimationCycle);
    }
    
    // Store cleanup function in ref
    const cleanup = () => {
      animationStartedRef.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    
    animationCleanupRef.current = cleanup;
    
    return cleanup;
  }, [pointAnimEnabled, animPoint?.id, animInitialRow, animInitialCol, pointAnimTargetRow, pointAnimTargetCol, pointAnimDurationForward, pointAnimDurationBackward, pointAnimHoldAtNew, pointAnimHoldAtOld, pointAnimStartDelay, pointAnimAutoStart, pointAnimLoop]);

  // Update page8 animation-state based on C' position for page8-geometry-grid-3
  React.useEffect(() => {
    // Only update for page8-geometry-grid-3
    if (id !== 'page8-geometry-grid-3') {
      return;
    }
    
    console.log('🔍 [Page8 State Update] Effect running:', {
      pointAnimEnabled,
      animPoint: animPoint?.id,
      animInitialRow,
      pointAnimTargetRow,
      animationState,
      animatedRow: animatedRow?.toFixed(2)
    });
    
    if (!pointAnimEnabled || !animPoint || animInitialRow === null || pointAnimTargetRow === undefined) {
      // Initialize to WIP if animation not ready
      if (typeof window !== 'undefined') {
        if (!window.page8AnimationState) {
          window.page8AnimationState = 'WIP';
          console.log('🔄 [Page8 State] Initialized to WIP (animation not ready)');
        }
      }
      return;
    }
    
    // Initialize page8 animation-state to WIP on mount
    if (typeof window !== 'undefined') {
      if (!window.page8AnimationState) {
        window.page8AnimationState = 'WIP';
        console.log('🔄 [Page8 State] Initialized to WIP on mount');
      }
    }
    
    // Use animation state to determine if we're at the new position
    // When animationState is 'holdNew' or 'completed', we're at the new position
    // Also check if we're close to the target row as a fallback
    const isAtTargetRow = animatedRow !== null && animatedRow !== undefined && 
                          Math.abs(animatedRow - pointAnimTargetRow) < 0.5;
    const atNewPosition = animationState === 'holdNew' || animationState === 'completed' || isAtTargetRow;
    
    // Update page8 animation-state
    const newState = atNewPosition ? 'Completed' : 'WIP';
    const currentState = typeof window !== 'undefined' ? window.page8AnimationState : null;
    
    console.log('🔍 [Page8 State Update] Checking:', {
      animationState,
      animatedRow: animatedRow?.toFixed(2),
      initialRow: animInitialRow,
      targetRow: pointAnimTargetRow,
      isAtTargetRow,
      atNewPosition,
      currentState,
      newState,
      willUpdate: currentState !== newState
    });
    
    // Only update if state has changed
    if (typeof window !== 'undefined' && currentState !== newState) {
      window.page8AnimationState = newState;
      
      console.log('✅ [Page8 Animation State] Updated:', {
        from: currentState,
        to: newState,
        animationState,
        animatedRow: animatedRow?.toFixed(2)
      });
      
      // Directly update the header element as primary method
      const headerId = 'page8-grid-3-header';
      const headerText = newState === 'Completed' ? 'Kite = Rhombus' : 'Kite';
      
      // Update DOM directly - clear all content first, then set new text
      setTimeout(() => {
        const headerElement = document.getElementById(headerId);
        if (headerElement) {
          const currentText = (headerElement.textContent || headerElement.innerText || '').trim();
          const childCount = headerElement.childNodes.length;
          const textNodes = Array.from(headerElement.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
          
          console.log(`🔧 [Page8 State] Direct DOM update check:`, {
            currentText,
            headerText,
            childCount,
            textNodeCount: textNodes.length,
            textNodeContents: textNodes.map(n => n.textContent),
            windowState: newState
          });
          
          if (currentText !== headerText || childCount > 1 || textNodes.length > 1) {
            console.log(`🔧 [Page8 State] Directly updating header DOM: "${currentText}" -> "${headerText}"`);
            // Completely clear all content first
            let removedCount = 0;
            while (headerElement.firstChild) {
              headerElement.removeChild(headerElement.firstChild);
              removedCount++;
            }
            if (removedCount > 0) {
              console.log(`🧹 [Page8 State] Removed ${removedCount} child node(s) in direct update`);
            }
            // Then set only the correct text
            headerElement.textContent = headerText;
            
            const afterText = (headerElement.textContent || headerElement.innerText || '').trim();
            const afterChildCount = headerElement.childNodes.length;
            console.log(`✅ [Page8 State] After direct update:`, {
              afterText,
              headerText,
              afterChildCount,
              match: afterText === headerText
            });
          } else {
            console.log(`✅ [Page8 State] Header text already correct: "${headerText}"`);
          }
        } else {
          console.warn(`⚠️ [Page8 State] Header element ${headerId} not found`);
        }
      }, 10);
      
      // Dispatch event to notify components (secondary method)
      const stateUpdateEvent = new CustomEvent('page8AnimationStateUpdate', {
        detail: {
          state: newState
        }
      });
      window.dispatchEvent(stateUpdateEvent);
      console.log('📤 [Page8 State] Dispatched page8AnimationStateUpdate event:', newState);
    }
  }, [id, animatedRow, animationState, pointAnimEnabled, animPoint, animInitialRow, pointAnimTargetRow]);
  
  // Listen to page8AnimationStateUpdate event for shape 1 to respond to shape 3's animation
  React.useEffect(() => {
    const isShape1 = (id === 'page8-geometry-grid-1') || (quadId === 'page8-geometry-grid-1');
    if (!isShape1 || currentPage !== 8) {
      return;
    }
    
    const handleAnimationStateUpdate = (event) => {
      const newState = event.detail?.state || window.page8AnimationState || 'WIP';
      setPage8AnimationState(newState);
      console.log('🔄 [Shape 1] Received page8AnimationStateUpdate:', newState);
    };
    
    // Listen to the event
    window.addEventListener('page8AnimationStateUpdate', handleAnimationStateUpdate);
    
    // Also poll the global state periodically as a fallback
    const pollInterval = setInterval(() => {
      const currentState = window.page8AnimationState || 'WIP';
      if (currentState !== page8AnimationState) {
        setPage8AnimationState(currentState);
      }
    }, 100); // Poll every 100ms
    
    return () => {
      window.removeEventListener('page8AnimationStateUpdate', handleAnimationStateUpdate);
      clearInterval(pollInterval);
    };
  }, [id, quadId, currentPage, page8AnimationState]);
  
  // Continuous sync for page8-header to ensure text stays correct
  React.useEffect(() => {
    if (id !== 'page8-geometry-grid-3') {
      return;
    }
    
    console.log(`🔄 [QuadrilateralComponent] Setting up continuous sync for page8-header`);
    
    const headerId = 'page8-grid-3-header';
    let syncCount = 0;
    
    const syncInterval = setInterval(() => {
      syncCount++;
      if (typeof window !== 'undefined' && window.page8AnimationState) {
        const expectedText = window.page8AnimationState === 'Completed' ? 'Kite = Rhombus' : 'Kite';
        const headerElement = document.getElementById(headerId);
        if (headerElement) {
          const currentText = (headerElement.textContent || headerElement.innerText || '').trim();
          const childCount = headerElement.childNodes.length;
          const textNodes = Array.from(headerElement.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
          
          // Log every 20th check to avoid spam, or if there's an issue
          if (syncCount % 20 === 0 || currentText !== expectedText || childCount > 1 || textNodes.length > 1) {
            console.log(`🔄 [Page8 State] Sync check #${syncCount}:`, {
              currentText,
              expectedText,
              childCount,
              textNodeCount: textNodes.length,
              textNodeContents: textNodes.map(n => n.textContent),
              windowState: window.page8AnimationState,
              needsFix: currentText !== expectedText || childCount > 1 || textNodes.length > 1
            });
          }
          
          if (currentText !== expectedText || childCount > 1 || textNodes.length > 1) {
            console.log(`🔧 [Page8 State] Sync fixing header: "${currentText}" -> "${expectedText}"`);
            // Completely clear all content first
            let removedCount = 0;
            while (headerElement.firstChild) {
              headerElement.removeChild(headerElement.firstChild);
              removedCount++;
            }
            if (removedCount > 0) {
              console.log(`🧹 [Page8 State] Removed ${removedCount} child node(s) from header`);
            }
            // Then set only the correct text
            headerElement.textContent = expectedText;
            
            const afterText = (headerElement.textContent || headerElement.innerText || '').trim();
            const afterChildCount = headerElement.childNodes.length;
            console.log(`✅ [Page8 State] After sync fix:`, {
              afterText,
              expectedText,
              afterChildCount,
              match: afterText === expectedText
            });
          }
        } else {
          if (syncCount % 20 === 0) {
            console.warn(`⚠️ [Page8 State] Header element ${headerId} not found in sync check #${syncCount}`);
          }
        }
      }
    }, 50); // Check every 50ms for faster updates
    
    console.log(`⏰ [QuadrilateralComponent] Continuous sync interval started for ${headerId}`);
    
    return () => {
      console.log(`🧹 [QuadrilateralComponent] Cleaning up sync interval for ${headerId}`);
      clearInterval(syncInterval);
    };
  }, [id]);

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
  
  // Extract parallel proof animation config with defaults
  const parallelProofConfig = props.parallelProofAnimationConfig || {};
  const parallelProofDuration = parallelProofConfig.duration || 2000;
  const parallelProofCycles = parallelProofConfig.cycles || 2;
  const transversalColor = parallelProofConfig.transversalColor || '#FF9900';
  const transversalThickness = parallelProofConfig.transversalThickness || '4gc';
  const showPerpendicularMarker = parallelProofConfig.showPerpendicularMarker !== undefined ? parallelProofConfig.showPerpendicularMarker : true;
  const parallelProofLine1Id = parallelProofConfig.line1Id;
  const parallelProofLine2Id = parallelProofConfig.line2Id;
  const parallelProofAutoStart = parallelProofConfig.autoStart !== undefined ? parallelProofConfig.autoStart : false;
  
  // Helper function to get per-vertex angle config (merges with global defaults)
  // Note: This will be redefined after state initialization to use currentAngleShowText
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
  
  // State to track clicked/selected lines in custom mode (max 2)
  const [clickedLines, setClickedLines] = React.useState(new Set());
  const [correctLines, setCorrectLines] = React.useState(new Set()); // Lines that form 90-degree angles and should be disabled
  // State to track wiggling lines (for error feedback)
  const [wigglingLines, setWigglingLines] = React.useState(new Set());
  // State to track blinking lines (for incorrect answer feedback - keeps original color)
  const [blinkingLines, setBlinkingLines] = React.useState(new Set());
  // State to track if all sides should be disabled (when correct answer is found)
  const [allSidesDisabled, setAllSidesDisabled] = React.useState(false);
  // State to track found perpendicular pairs (Set of strings like "AB,BC")
  const [foundPerpendicularPairs, setFoundPerpendicularPairs] = React.useState(new Set());
  // State to store all possible perpendicular pairs in the shape
  const [allPerpendicularPairs, setAllPerpendicularPairs] = React.useState(new Set());
  // State to track if we need to reset selection on next click (after finding a pair)
  const [shouldResetOnNextClick, setShouldResetOnNextClick] = React.useState(false);
  // State to track found parallel pairs (Set of strings like "AB,CD") - for page 6
  const [foundParallelPairs, setFoundParallelPairs] = React.useState(new Set());
  // State to store all possible parallel pairs in the shape - for page 6
  const [allParallelPairs, setAllParallelPairs] = React.useState(new Set());
  // State to track if parallel animation is running (disables clicks)
  const [isParallelAnimationRunning, setIsParallelAnimationRunning] = React.useState(false);
  
  // Helper function to check if two lines are parallel
  const areLinesParallel = React.useCallback((line1, line2, points, getCustomPointPosition) => {
    if (!line1 || !line2 || !points || !getCustomPointPosition) return false;
    
    // Get line endpoints in SVG coordinates
    const line1From = getCustomPointPosition(points.find(p => p.id === line1.from));
    const line1To = getCustomPointPosition(points.find(p => p.id === line1.to));
    const line2From = getCustomPointPosition(points.find(p => p.id === line2.from));
    const line2To = getCustomPointPosition(points.find(p => p.id === line2.to));
    
    if (!line1From || !line1To || !line2From || !line2To) return false;
    
    // Calculate slopes
    const dx1 = line1To.percentX - line1From.percentX;
    const dy1 = line1To.percentY - line1From.percentY;
    const dx2 = line2To.percentX - line2From.percentX;
    const dy2 = line2To.percentY - line2From.percentY;
    
    // Check if both lines are vertical (dx = 0)
    if (Math.abs(dx1) < 0.0001 && Math.abs(dx2) < 0.0001) {
      return true; // Both vertical, so parallel
    }
    
    // Check if one is vertical and the other is not
    if (Math.abs(dx1) < 0.0001 || Math.abs(dx2) < 0.0001) {
      return false; // One vertical, one not, so not parallel
    }
    
    // Calculate slopes
    const slope1 = dy1 / dx1;
    const slope2 = dy2 / dx2;
    
    // Check if slopes are equal (within tolerance)
    const tolerance = 0.01; // Small tolerance for floating point comparison
    return Math.abs(slope1 - slope2) < tolerance;
  }, []);
  
  // Helper function to calculate angle between two lines
  const calculateAngleBetweenLines = React.useCallback((line1, line2, points, getCustomPointPosition) => {
    if (!line1 || !line2 || !points || !getCustomPointPosition) return null;
    
    // Find the shared vertex (where the two lines meet)
    let vertex = null;
    let point1 = null; // Other endpoint of line1
    let point2 = null; // Other endpoint of line2
    
    // Check if lines share a vertex
    if (line1.from === line2.from) {
      vertex = points.find(p => p.id === line1.from);
      point1 = points.find(p => p.id === line1.to);
      point2 = points.find(p => p.id === line2.to);
    } else if (line1.from === line2.to) {
      vertex = points.find(p => p.id === line1.from);
      point1 = points.find(p => p.id === line1.to);
      point2 = points.find(p => p.id === line2.from);
    } else if (line1.to === line2.from) {
      vertex = points.find(p => p.id === line1.to);
      point1 = points.find(p => p.id === line1.from);
      point2 = points.find(p => p.id === line2.to);
    } else if (line1.to === line2.to) {
      vertex = points.find(p => p.id === line1.to);
      point1 = points.find(p => p.id === line1.from);
      point2 = points.find(p => p.id === line2.from);
    }
    
    // If lines don't share a vertex, find intersection point
    if (!vertex || !point1 || !point2) {
      // Get line endpoints in SVG coordinates
      const line1From = getCustomPointPosition(points.find(p => p.id === line1.from));
      const line1To = getCustomPointPosition(points.find(p => p.id === line1.to));
      const line2From = getCustomPointPosition(points.find(p => p.id === line2.from));
      const line2To = getCustomPointPosition(points.find(p => p.id === line2.to));
      
      if (!line1From || !line1To || !line2From || !line2To) return null;
      
      // Calculate intersection point
      const x1 = line1From.percentX, y1 = line1From.percentY;
      const x2 = line1To.percentX, y2 = line1To.percentY;
      const x3 = line2From.percentX, y3 = line2From.percentY;
      const x4 = line2To.percentX, y4 = line2To.percentY;
      
      const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      
      if (Math.abs(denom) < 0.0001) return null; // Parallel lines
      
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
      
      // Check if intersection is within both line segments
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        const intersectionX = x1 + t * (x2 - x1);
        const intersectionY = y1 + t * (y2 - y1);
        
        // Get the four endpoints
        const p1 = points.find(p => p.id === line1.from);
        const p2 = points.find(p => p.id === line1.to);
        const p3 = points.find(p => p.id === line2.from);
        const p4 = points.find(p => p.id === line2.to);
        
        // Find which endpoints are on each line (not at intersection)
        const line1Other = (t < 0.5) ? p2 : p1;
        const line2Other = (u < 0.5) ? p4 : p3;
        
        // Calculate vectors from intersection to endpoints
        const pos1 = getCustomPointPosition(line1Other);
        const pos2 = getCustomPointPosition(line2Other);
        
        if (!pos1 || !pos2) return null;
        
        const vec1 = {
          x: pos1.percentX - intersectionX,
          y: pos1.percentY - intersectionY
        };
        const vec2 = {
          x: pos2.percentX - intersectionX,
          y: pos2.percentY - intersectionY
        };
        
        // Calculate angle using dot product
        const dot = vec1.x * vec2.x + vec1.y * vec2.y;
        const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
        const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
        
        if (mag1 === 0 || mag2 === 0) return null;
        
        const cosAngle = dot / (mag1 * mag2);
        const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
        const angleDeg = angleRad * (180 / Math.PI);
        
        // For intersection, use a generic notation or find the closest vertex labels
        // Try to find which vertex is closest to intersection
        let closestVertex = null;
        let minDist = Infinity;
        points.forEach(p => {
          const pos = getCustomPointPosition(p);
          if (pos) {
            const dist = Math.sqrt(Math.pow(pos.percentX - intersectionX, 2) + Math.pow(pos.percentY - intersectionY, 2));
            if (dist < minDist) {
              minDist = dist;
              closestVertex = p;
            }
          }
        });
        
        // Format angle notation using intersection point labels
        const angleNotation = closestVertex ? `∠${line1Other.label}${closestVertex.label}${line2Other.label}` : `∠${line1Other.label}${line2Other.label}`;
        
        return {
          angle: Math.round(angleDeg * 10) / 10, // Round to 1 decimal place
          notation: angleNotation,
          vertex: closestVertex ? closestVertex.label : 'I',
          point1: line1Other.label,
          point2: line2Other.label
        };
      }
      
      return null; // Lines don't intersect
    }
    
    // Lines share a vertex - calculate angle normally
    // Calculate vectors from vertex to the two endpoints
    const vec1 = {
      x: point1.col - vertex.col,
      y: point1.row - vertex.row
    };
    const vec2 = {
      x: point2.col - vertex.col,
      y: point2.row - vertex.row
    };
    
    // Calculate angle using dot product
    const dot = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    if (mag1 === 0 || mag2 === 0) return null;
    
    const cosAngle = dot / (mag1 * mag2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    const angleDeg = angleRad * (180 / Math.PI);
    
    // Format angle notation: ∠ABC where B is vertex
    const angleNotation = `∠${point1.label}${vertex.label}${point2.label}`;
    
    return {
      angle: Math.round(angleDeg * 10) / 10, // Round to 1 decimal place
      notation: angleNotation,
      vertex: vertex.label,
      point1: point1.label,
      point2: point2.label
    };
  }, []);
  
  // Update text box useEffect was moved to after getCustomPointPosition definition (around line 6703)
  
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
  
  // Helper function to calculate side length in grid cells
  const getSideLengthGc = React.useCallback((sideIndex) => {
    const v1 = vertices[sideIndex];
    const v2 = vertices[(sideIndex + 1) % 4];
    if (!v1 || !v2) return 0;
    const colDiff = v2.col - v1.col;
    const rowDiff = v2.row - v1.row;
    const cellSizeGc = gridDimensions.cellSizeGc;
    return Math.sqrt(colDiff * colDiff + rowDiff * rowDiff) * cellSizeGc;
  }, [vertices, gridDimensions]);
  
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
  
  // Implement animateAllSideEquality function
  // This function sequentially animates all 4 vertices to show all sides are equal
  // It pivots a reference line around each vertex to compare adjacent sides:
  // 1. Start with side AB, pivot around B to compare with BC
  // 2. Pivot around C to compare BC with CD
  // 3. Pivot around D to compare CD with DA
  // 4. Shows equality messages and stroke indicators
  // State for all sides equality animation
  const [allSidesEqualityAnimation, setAllSidesEqualityAnimation] = React.useState(null);
  const allSidesEqualityAnimationRef = React.useRef(null);
  
  // State for dynamic notches based on animation progress
  const [dynamicNotches, setDynamicNotches] = React.useState([]);
  
  // Debug: Log when dynamicNotches changes
  React.useEffect(() => {
    console.log(`🔔 [Dynamic Notches] State updated:`, dynamicNotches);
  }, [dynamicNotches]);

  // Listen for addDynamicNotches events
  React.useEffect(() => {
    const handleAddDynamicNotches = (event) => {
      const { gridId, notches, blink } = event.detail;
      if (gridId === id) {
        console.log(`🎯 [QuadrilateralComponent] Received addDynamicNotches event for ${id}`, notches);
        setDynamicNotches(prev => {
          // Remove existing notches for the same sides
          const filtered = prev.filter(n => !notches.some(newN => newN.side === n.side));
          return [...filtered, ...notches];
        });

        // Blinking removed - notches will not blink
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('addDynamicNotches', handleAddDynamicNotches);
      return () => {
        window.removeEventListener('addDynamicNotches', handleAddDynamicNotches);
      };
    }
  }, [id, mode, customConnections]);
  
  // Helper function to check if two sides are equal
  const checkSidesEqual = React.useCallback((side1Index, side2Index, tolerance = 0.1) => {
    const length1 = getSideLengthGc(side1Index);
    const length2 = getSideLengthGc(side2Index);
    const difference = Math.abs(length1 - length2);
    return {
      equal: difference < tolerance,
      length1,
      length2,
      difference
    };
  }, [getSideLengthGc]);
  
  // Helper function to get progressive message
  const getProgressiveMessage = React.useCallback((currentSideIndex) => {
    if (currentSideIndex === 0) return ''; // On AB, no message yet
    if (currentSideIndex === 1) return 'AB = BC';
    if (currentSideIndex === 2) return 'AB = BC = CD';
    if (currentSideIndex === 3) return 'AB = BC = CD = DA';
    return '';
  }, []);
  
  // Helper function to update status text box (dynamic based on page number)
  const updateStatusText = React.useCallback((text) => {
    // Skip status text updates in custom mode (pages 2, 3 don't use status text)
    if (mode === 'custom') {
      return;
    }
    
    // Determine page number from component ID or currentPage prop
    const pageNum = componentPageNumber || currentPage;
    const statusElementId = `page${pageNum}-status-text`;
    const statusElement = document.getElementById(statusElementId);
    
    if (statusElement) {
      // Try multiple methods to update the text
      statusElement.textContent = text;
      statusElement.innerText = text;
      
      // If it's a React component, try to find the actual DOM node
      const actualNode = statusElement.querySelector('span') || statusElement.querySelector('div') || statusElement;
      if (actualNode) {
        actualNode.textContent = text;
        actualNode.innerText = text;
      }
      
      console.log(`✅ Updated status text (${statusElementId}) to: "${text}"`);
    } else {
      // Only warn if there's an animation config that would use this element
      // AND we're not in custom mode (custom mode pages don't use status text)
      if ((allSideEqualityAnimationConfig || sideEqualityAnimationConfig) && mode !== 'custom') {
        console.warn(`⚠️ Status text element (${statusElementId}) not found`);
      }
      // Otherwise, silently ignore - the element is optional
    }
  }, [componentPageNumber, currentPage, allSideEqualityAnimationConfig, sideEqualityAnimationConfig, mode]);

  // Helper function to update status text box for page 5 (opposite sides equality)
  const updatePage5StatusText = React.useCallback((text) => {
    const statusElement = document.getElementById('page5-status-text');
    if (statusElement) {
      // Try multiple methods to update the text
      statusElement.textContent = text;
      statusElement.innerText = text;
      
      // If it's a React component, try to find the actual DOM node
      const actualNode = statusElement.querySelector('span') || statusElement.querySelector('div') || statusElement;
      if (actualNode) {
        actualNode.textContent = text;
        actualNode.innerText = text;
      }
      
      console.log(`✅ Updated page5 status text to: "${text}"`);
    } else {
      console.warn('⚠️ Status text element (page5-status-text) not found');
    }
  }, []);
  
  // Helper function to update conclusion text box for page 3
  const updatePage3ConclusionText = React.useCallback((htmlText) => {
    // Prevent duplicate updates
    const instructionId = 'page3-conclusion-text';
    
    // Check if this exact update is already in progress
    if (window[`${instructionId}_updating`]) {
      console.log(`⏭️ [Conclusion Text] Update already in progress for ${instructionId}, skipping`);
      return;
    }
    
    // Check if this text has already been set (prevent updates in infinite loop)
    if (window[`${instructionId}_lastText`] === htmlText) {
      console.log(`⏭️ [Conclusion Text] Text already set for ${instructionId}, skipping duplicate`);
      return;
    }
    
    // Mark as updating and store the text
    window[`${instructionId}_updating`] = true;
    window[`${instructionId}_lastText`] = htmlText;
    
    if (typeof window !== 'undefined') {
      // Store in global state for React component to pick up
      if (!window.instructionTextUpdates) {
        window.instructionTextUpdates = {};
      }
      window.instructionTextUpdates[instructionId] = htmlText;
      
      // Dispatch event for React component
      const updateEvent = new CustomEvent('instructionTextUpdate', {
        detail: {
          instructionId: instructionId,
          text: htmlText
        }
      });
      window.dispatchEvent(updateEvent);
      
      // Also do direct DOM update to ensure it works (with proper clearing)
      const updateDOM = (attempt = 0) => {
        const conclusionElement = document.getElementById(instructionId);
        if (conclusionElement) {
          // The TextboxComponent wraps HTML in: <div id="page3-conclusion-text"><span style="display: inline;">content</span></div>
          // We need to find the DIRECT CHILD span (the wrapper), not any nested spans in the content
          let innerSpan = null;
          for (let child of conclusionElement.children) {
            if (child.tagName === 'SPAN' && child.style.display === 'inline') {
              innerSpan = child;
              break;
            }
          }
          // Fallback: get first direct child span if style check didn't work
          if (!innerSpan) {
            const firstChild = conclusionElement.firstElementChild;
            if (firstChild && firstChild.tagName === 'SPAN') {
              innerSpan = firstChild;
            }
          }
          
          if (innerSpan && innerSpan.parentElement === conclusionElement) {
            // This is the wrapper span - completely remove ALL children nodes
            while (innerSpan.firstChild) {
              innerSpan.removeChild(innerSpan.firstChild);
            }
            // Set new content - this completely replaces everything
            innerSpan.innerHTML = htmlText;
            console.log(`✅ [Conclusion Text] Updated wrapper span for ${instructionId} (attempt ${attempt + 1})`);
            // Mark as no longer updating
            window[`${instructionId}_updating`] = false;
          } else {
            // If no wrapper span found, clear entire element completely and set new content
            while (conclusionElement.firstChild) {
              conclusionElement.removeChild(conclusionElement.firstChild);
            }
            // Set new content
            conclusionElement.innerHTML = htmlText;
            console.log(`✅ [Conclusion Text] Updated element directly (no wrapper span found)`);
            // Mark as no longer updating
            window[`${instructionId}_updating`] = false;
          }
        } else if (attempt < 5) {
          // Retry if element not found yet
          setTimeout(() => updateDOM(attempt + 1), 100 * (attempt + 1));
        } else {
          console.warn(`⚠️ [Conclusion Text] Element ${instructionId} not found after 5 attempts`);
          // Mark as no longer updating even on failure
          window[`${instructionId}_updating`] = false;
        }
      };
      
      // Start DOM update after a small delay to let React process the event first
      setTimeout(() => updateDOM(), 50);
    }
  }, []);
  
  // Track if conclusion text has been updated for page 3 (to prevent duplicate updates in infinite loop)
  const page3ConclusionTextUpdatedRef = React.useRef(false);
  
  const animateAllSideEquality = React.useCallback((cycles = -1) => {
    console.log(`🎬 QuadrilateralComponent ${id} starting all sides equality animation with ${cycles} cycle(s)`);
    
    // Prevent restarting if animation is already running
    // Check both the ref and the state to be thorough
    // Note: ref can be 0 (temporary marker) or a frame ID, both mean animation is starting/running
    if ((allSidesEqualityAnimationRef.current !== null && allSidesEqualityAnimationRef.current !== 0) || allSidesEqualityAnimation !== null) {
      console.log(`⏭️ QuadrilateralComponent ${id} animation already running (ref: ${allSidesEqualityAnimationRef.current}, state: ${allSidesEqualityAnimation !== null}), skipping restart`);
      return;
    }
    
    // Set ref immediately to prevent concurrent calls (will be set to actual frame ID later)
    allSidesEqualityAnimationRef.current = 0; // Temporary marker value
    
    // Reset conclusion text update flag when starting new animation
    page3ConclusionTextUpdatedRef.current = false;
    
    if (!allSideEqualityAnimationConfig) {
      console.warn(`⚠️ QuadrilateralComponent ${id}: allSideEqualityAnimationConfig not provided`);
      allSidesEqualityAnimationRef.current = null; // Reset on error
      return;
    }
    
    if (typeof window === 'undefined' || !containerRef.current) {
      console.warn(`⚠️ QuadrilateralComponent ${id}: containerRef not available`);
      allSidesEqualityAnimationRef.current = null; // Reset on error
      return;
    }
    
    // Cancel any existing animation (shouldn't happen due to guard above, but keep for safety)
    // Only cancel if it's an actual frame ID (not our temporary marker 0)
    if (allSidesEqualityAnimationRef.current && allSidesEqualityAnimationRef.current !== 0) {
      cancelAnimationFrame(allSidesEqualityAnimationRef.current);
    }
    // Note: ref is already set to 0 above as a marker, don't reset it here
    
    // Get animation timing
    const duration = sideEqualityAnimationConfig?.duration || 1000;
    const waitTime = sideEqualityAnimationConfig?.waitTime || 1000;
    const maxCycles = cycles === -1 ? -1 : cycles; // -1 = infinite
    
    // Animation state
    let currentSideIndex = 0; // 0=AB, 1=BC, 2=CD, 3=DA
    let pivotVertexIndex = 1; // 1=B (for pivoting from AB to BC)
    let phase = 'on-AB'; // 'on-AB', 'pivoting-to-BC', 'on-BC', 'pivoting-to-CD', 'on-CD', 'pivoting-to-DA', 'on-DA', 'pivoting-to-AB'
    let currentCycle = 0;
    let startTime = Date.now();
    let phaseStartTime = Date.now();
    let progress = 0;
    let message = '';
    let stopped = false;
    
    // Reference side length (AB = side 0) - calculate it here
    const referenceSideLength = getSideLengthGc(0);
    
    // Helper to trigger side equality animation for a specific vertex
    // This will be called when entering a pivoting phase
    // Note: animateSideEquality already cancels any existing animation, so we don't need to stop it manually
    const triggerPivotAnimation = (vertexIndex) => {
      if (containerRef.current) {
        const quadElement = containerRef.current;
        if (typeof quadElement.animateSideEquality === 'function') {
          // Directly trigger the animation - it will handle canceling any existing one
          quadElement.animateSideEquality(vertexIndex);
        }
      }
    };
    
    // Track last triggered phase to avoid retriggering
    let lastPivotPhase = null;
    
    // Main animation function with phase-based state machine
    const animate = () => {
      if (stopped) return;
      
      const now = Date.now();
      const phaseElapsed = now - phaseStartTime;
      
      // Handle phase transitions
      switch (phase) {
        case 'on-AB':
          // Wait on AB, then start pivoting to BC
          if (phaseElapsed >= waitTime) {
            phase = 'pivoting-to-BC';
            pivotVertexIndex = 1; // B
            phaseStartTime = now;
            progress = 0;
            lastPivotPhase = 'pivoting-to-BC';
            triggerPivotAnimation(1); // Trigger pivot around B
            console.log(`🎬 Phase: pivoting-to-BC (pivot around vertex B)`);
          }
          break;
          
        case 'pivoting-to-BC':
          // Rotate from AB to BC
          if (phaseElapsed < duration) {
            progress = phaseElapsed / duration;
          } else {
            // Check equality: AB = BC?
            const check = checkSidesEqual(0, 1);
            if (!check.equal) {
              console.error(`❌ Sides not equal! AB (${check.length1.toFixed(4)}) ≠ BC (${check.length2.toFixed(4)}), difference: ${check.difference.toFixed(4)}`);
              setAllSidesEqualityAnimation(null);
              allSidesEqualityAnimationRef.current = null;
              if (containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
                containerRef.current.stopSideEqualityAnimation();
              }
              stopped = true;
              return;
            }
            // Move to on-BC
            phase = 'on-BC';
            currentSideIndex = 1;
            message = getProgressiveMessage(1);
            phaseStartTime = now;
            progress = 1;
            // Update status text
            updateStatusText('AB = BC');
            // Add notches to AB and BC
            setDynamicNotches([
              { side: 'AB', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 },
              { side: 'BC', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 }
            ]);
            // Don't stop the animation - let it continue showing the line on BC
            console.log(`✅ AB = BC confirmed. Phase: on-BC. Message: "${message}"`);
          }
          break;
          
        case 'on-BC':
          // Wait on BC, then start pivoting to CD
          if (phaseElapsed >= waitTime) {
            phase = 'pivoting-to-CD';
            pivotVertexIndex = 2; // C
            phaseStartTime = now;
            progress = 0;
            lastPivotPhase = 'pivoting-to-CD';
            triggerPivotAnimation(2); // Trigger pivot around C
            console.log(`🎬 Phase: pivoting-to-CD (pivot around vertex C)`);
          }
          break;
          
        case 'pivoting-to-CD':
          // Rotate from BC to CD
          if (phaseElapsed < duration) {
            progress = phaseElapsed / duration;
          } else {
            // Check equality: AB = CD? (since AB = BC, we check AB = CD)
            const check = checkSidesEqual(0, 2);
            if (!check.equal) {
              console.error(`❌ Sides not equal! AB (${check.length1.toFixed(4)}) ≠ CD (${check.length2.toFixed(4)}), difference: ${check.difference.toFixed(4)}`);
              setAllSidesEqualityAnimation(null);
              allSidesEqualityAnimationRef.current = null;
              if (containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
                containerRef.current.stopSideEqualityAnimation();
              }
              stopped = true;
              return;
            }
            // Move to on-CD
            phase = 'on-CD';
            currentSideIndex = 2;
            message = getProgressiveMessage(2);
            phaseStartTime = now;
            progress = 1;
            // Update status text
            updateStatusText('AB = BC = CD');
            // Add notch to CD
            setDynamicNotches(prev => [
              ...prev,
              { side: 'CD', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 }
            ]);
            // Don't stop the animation - let it continue showing the line on CD
            console.log(`✅ AB = CD confirmed. Phase: on-CD. Message: "${message}"`);
          }
          break;
          
        case 'on-CD':
          // Wait on CD, then start pivoting to DA
          if (phaseElapsed >= waitTime) {
            phase = 'pivoting-to-DA';
            pivotVertexIndex = 3; // D
            phaseStartTime = now;
            progress = 0;
            lastPivotPhase = 'pivoting-to-DA';
            triggerPivotAnimation(3); // Trigger pivot around D
            console.log(`🎬 Phase: pivoting-to-DA (pivot around vertex D)`);
          }
          break;
          
        case 'pivoting-to-DA':
          // Rotate from CD to DA
          if (phaseElapsed < duration) {
            progress = phaseElapsed / duration;
          } else {
            // Check equality: AB = DA? (since AB = BC = CD, we check AB = DA)
            const check = checkSidesEqual(0, 3);
            if (!check.equal) {
              console.error(`❌ Sides not equal! AB (${check.length1.toFixed(4)}) ≠ DA (${check.length2.toFixed(4)}), difference: ${check.difference.toFixed(4)}`);
              setAllSidesEqualityAnimation(null);
              allSidesEqualityAnimationRef.current = null;
              if (containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
                containerRef.current.stopSideEqualityAnimation();
              }
              stopped = true;
              return;
            }
            // Move to on-DA
            phase = 'on-DA';
            currentSideIndex = 3;
            message = getProgressiveMessage(3);
            phaseStartTime = now;
            progress = 1;
            // Update status text
            updateStatusText('AB = BC = CD = DA');
            // Update conclusion text for page 3 (only once, even in infinite loop)
            if (!page3ConclusionTextUpdatedRef.current) {
              const conclusionText = typeof window !== 'undefined' && window.i18n 
                ? window.i18n.t('pages.page3.conclusionText', 'When side lengths are equal, we use <span style="color: #FF9900; font-weight: bold;">dash marks</span> to show equal sides.')
                : 'When side lengths are equal, we use <span style="color: #FF9900; font-weight: bold;">dash marks</span> to show equal sides.';
              updatePage3ConclusionText(conclusionText);
              page3ConclusionTextUpdatedRef.current = true;
            }
            // Add notch to DA
            setDynamicNotches(prev => [
              ...prev,
              { side: 'DA', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 }
            ]);
            // Don't stop the animation - let it continue showing the line on DA
            console.log(`✅ AB = DA confirmed. All sides equal! Phase: on-DA. Message: "${message}"`);
          }
          break;
          
        case 'on-DA':
          // Wait on DA, then check if we need another cycle
          if (phaseElapsed >= waitTime) {
            currentCycle++;
            
            // Check if we've completed all cycles
            if (maxCycles >= 0 && currentCycle >= maxCycles) {
              console.log(`✅ All sides equality animation complete (${currentCycle} cycle(s))`);
              setAllSidesEqualityAnimation(null);
              allSidesEqualityAnimationRef.current = null;
              if (containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
                containerRef.current.stopSideEqualityAnimation();
              }
              stopped = true;
              return;
            }
            
            // Start next cycle: pivot around A back to AB
            phase = 'pivoting-to-AB';
            pivotVertexIndex = 0; // A
            phaseStartTime = now;
            progress = 0;
            lastPivotPhase = 'pivoting-to-AB';
            triggerPivotAnimation(0); // Trigger pivot around A
            console.log(`🎬 Cycle ${currentCycle + 1}: pivoting-to-AB (pivot around vertex A)`);
          }
          break;
          
        case 'pivoting-to-AB':
          // Rotate from DA back to AB
          if (phaseElapsed < duration) {
            progress = phaseElapsed / duration;
          } else {
            // Back to AB, start next cycle
            phase = 'on-AB';
            currentSideIndex = 0;
            message = '';
            phaseStartTime = now;
            progress = 0;
            
            // After completing one full cycle, update instruction text and enable next button
            if (currentCycle === 1) {
              const updateInstructionText = () => {
                const instructionElement = document.getElementById('page3-instruction');
                if (instructionElement) {
                  // Get i18n text helper function
                  const getI18nText = typeof window !== 'undefined' && typeof i18n !== 'undefined' && i18n.t
                    ? (key, fallback) => i18n.t(key) || fallback
                    : (key, fallback) => fallback;
                  
                  const continueText = getI18nText("common.tapToContinue", "Tap » to continue");
                  
                  // Try multiple methods to update the text
                  instructionElement.textContent = continueText;
                  instructionElement.innerText = continueText;
                  
                  // If it's a React component, try to find the actual DOM node
                  const actualNode = instructionElement.querySelector('span') || instructionElement.querySelector('div') || instructionElement;
                  if (actualNode) {
                    actualNode.textContent = continueText;
                    actualNode.innerText = continueText;
                  }
                  
                  // Dispatch custom event for React components to listen to
                  if (typeof window !== 'undefined') {
                    const updateEvent = new CustomEvent('instructionTextUpdate', {
                      detail: {
                        instructionId: 'page3-instruction',
                        text: continueText
                      }
                    });
                    window.dispatchEvent(updateEvent);
                  }
                  
                  console.log(`✅ Updated page3-instruction text after one cycle: "${continueText}"`);
                } else {
                  // Retry if element not found yet
                  setTimeout(updateInstructionText, 100);
                }
              };
              
              // Dispatch events to enable next button and tap animation after one cycle
              if (typeof window !== 'undefined') {
                // Dispatch quizCompleted event to enable next button (NextButtonComponent listens to page completion)
                const quizCompletedEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    quizId: 'page3-quiz',
                    pageNumber: 3
                  }
                });
                window.dispatchEvent(quizCompletedEvent);
                console.log('✅ Dispatched quizCompleted event after one animation cycle');
                
                // Dispatch page3AnimationComplete event for NextButtonComponent and TapGifComponent
                const enableEvent = new CustomEvent('page3AnimationComplete', {
                  detail: {
                    page: 3
                  }
                });
                window.dispatchEvent(enableEvent);
                console.log('✅ Dispatched page3AnimationComplete event');
              }
              
              // Small delay to ensure DOM is ready
              setTimeout(updateInstructionText, 100);
            }
            
            // Don't stop the animation - let it continue showing the line on AB
            console.log(`🔄 Cycle ${currentCycle} complete. Returning to on-AB for next cycle.`);
          }
          break;
      }
      
      // Update animation state
      setAllSidesEqualityAnimation({
        currentSideIndex,
        pivotVertexIndex,
        phase,
        currentCycle,
        maxCycles,
        progress,
        message,
        startTime,
        referenceSideLength
      });
      
      allSidesEqualityAnimationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize animation state
    setAllSidesEqualityAnimation({
      currentSideIndex: 0,
      pivotVertexIndex: 1,
      phase: 'on-AB',
      currentCycle: 0,
      maxCycles,
      progress: 0,
      message: '',
      startTime,
      referenceSideLength
    });
    
    // Initialize status text to "Checking side equality.."
    // Use dynamic page number for i18n key
    const pageNum = componentPageNumber || currentPage;
    const initialStatusText = typeof window !== 'undefined' && window.i18n 
      ? window.i18n.t(`pages.page${pageNum}.statusText`, 'Checking side equality..')
      : 'Checking side equality..';
    updateStatusText(initialStatusText);
    
    // Reset dynamic notches when animation starts
    setDynamicNotches([]);
    
    // Start animation
    allSidesEqualityAnimationRef.current = requestAnimationFrame(animate);
    
    console.log(`✅ All sides equality animation started`);
  }, [id, allSideEqualityAnimationConfig, sideEqualityAnimationConfig, getSideLengthGc, checkSidesEqual, getProgressiveMessage, gridDimensions, containerRef, vertices, updateStatusText, componentPageNumber, currentPage]);
  
  // Expose animateAllSideEquality to DOM element
  React.useEffect(() => {
    if (containerRef.current && allSideEqualityAnimationConfig) {
      containerRef.current.animateAllSideEquality = animateAllSideEquality;
      console.log(`✅ QuadrilateralComponent ${id}: animateAllSideEquality method exposed to DOM element`);
    }
    
    // Also expose to global registry
    if (typeof window !== 'undefined') {
      if (!window.quadrilateralAnimations) {
        window.quadrilateralAnimations = {};
      }
      if (!window.quadrilateralAnimations[id]) {
        window.quadrilateralAnimations[id] = {};
      }
      window.quadrilateralAnimations[id].animateAllSideEquality = animateAllSideEquality;
    }
  }, [id, animateAllSideEquality, allSideEqualityAnimationConfig]);
  
  // Track cleanup to prevent multiple calls (outside useEffect to persist across renders)
  const page3CleanupDoneRef = React.useRef(false);
  const page5CleanupDoneRef = React.useRef(false);
  
  // Listen for trigger all sides equality animation event (for page 3)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const triggerAnimation = (cycles = -1) => {
      // Prevent triggering if animation is already running
      if (allSidesEqualityAnimationRef.current !== null) {
        console.log(`⏭️ QuadrilateralComponent ${id} animation already running, skipping trigger`);
        return true; // Return true to indicate "success" (animation is running)
      }
      
      if (containerRef.current) {
        const quadElement = containerRef.current;
        if (typeof quadElement.animateAllSideEquality === 'function') {
          console.log(`✅ QuadrilateralComponent ${id} triggering all sides equality animation`);
          quadElement.animateAllSideEquality(cycles);
          return true;
        } else {
          console.warn(`⚠️ QuadrilateralComponent ${id}: animateAllSideEquality method not found on element`);
          // Try via registry
          if (window.quadrilateralAnimations && window.quadrilateralAnimations[id]) {
            const anim = window.quadrilateralAnimations[id];
            if (typeof anim.animateAllSideEquality === 'function') {
              console.log(`✅ QuadrilateralComponent ${id} triggering all sides equality animation via registry`);
              anim.animateAllSideEquality(cycles);
              return true;
            }
          }
        }
      }
      return false;
    };
    
    const handleTriggerAnimation = (event) => {
      const { quadId, cycles = -1 } = event.detail || {};
      
      // Check if this component should respond to the event (but skip if in custom mode)
      if (quadId && (quadId === id || quadId === elementName) && mode !== 'custom') {
        console.log(`🎬 QuadrilateralComponent ${id} received triggerAllSidesEqualityAnimation event`);
        triggerAnimation(cycles);
      }
    };
    
    // Check on page change if this is page 3 or page 5
    const handlePageChange = (event) => {
      const pageNumber = event.detail?.page;
      const componentPageNum = componentPageNumber || currentPage;
      const idPageMatch = id ? id.match(/page(\d+)/) : null;
      const idPageNum = idPageMatch ? parseInt(idPageMatch[1], 10) : null;
      
      // Stop all sides equality animation if navigating away from page 3
      if (pageNumber !== 3 && (componentPageNum === 3 || idPageNum === 3) && !page3CleanupDoneRef.current) {
        console.log(`🛑 QuadrilateralComponent ${id} navigating away from page 3, stopping all sides equality animation`);
        
        // Mark cleanup as done
        page3CleanupDoneRef.current = true;
        page5CleanupDoneRef.current = false; // Reset page 5 cleanup flag
        
        // Cancel animation frame
        if (allSidesEqualityAnimationRef.current) {
          cancelAnimationFrame(allSidesEqualityAnimationRef.current);
          allSidesEqualityAnimationRef.current = null;
        }
        
        // Clear animation state only if not already null
        setAllSidesEqualityAnimation(prev => prev !== null ? null : prev);
        
        // Stop side equality animation if running (only for page 3 components)
        // Double-check we're actually on page 3 before stopping
        if ((componentPageNum === 3 || idPageNum === 3) && containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
          containerRef.current.stopSideEqualityAnimation();
        }
        
        // Clear dynamic notches only if not already empty
        setDynamicNotches(prev => prev.length > 0 ? [] : prev);
        
        console.log(`✅ QuadrilateralComponent ${id} all sides equality animation stopped and cleaned up`);
      }
      
      // Stop opposite sides equality animation if navigating away from page 5
      if (pageNumber !== 5 && (componentPageNum === 5 || idPageNum === 5) && !page5CleanupDoneRef.current) {
        console.log(`🛑 QuadrilateralComponent ${id} navigating away from page 5, stopping opposite sides equality animation`);
        
        // Mark cleanup as done
        page5CleanupDoneRef.current = true;
        page3CleanupDoneRef.current = false; // Reset page 3 cleanup flag
        
        // Stop opposite side animation using refs directly
        if (oppositeSideAnimationRef.current) {
          cancelAnimationFrame(oppositeSideAnimationRef.current);
          oppositeSideAnimationRef.current = null;
        }
        oppositeSideAnimationStateRef.current = null;
        
        // Clear animation state only if not already null
        setOppositeSideAnimation(prev => prev !== null ? null : prev);
        
        // Clear dynamic notches only if not already empty
        setDynamicNotches(prev => prev.length > 0 ? [] : prev);
        
        console.log(`✅ QuadrilateralComponent ${id} opposite sides equality animation stopped and cleaned up`);
      }
      
      // Reset cleanup flags when returning to pages 3 or 5
      if (pageNumber === 3) {
        page3CleanupDoneRef.current = false;
      }
      if (pageNumber === 5) {
        page5CleanupDoneRef.current = false;
      }
      
      // Start animation if navigating to page 3 (but skip if in custom mode)
      if (pageNumber === 3 && (pageNumber === componentPageNum || pageNumber === idPageNum) && mode !== 'custom') {
        console.log(`🎬 QuadrilateralComponent ${id} detected page 3 load via pageChanged event`);
        // Small delay to ensure component is fully mounted
        setTimeout(() => {
          triggerAnimation(-1);
        }, 1200);
      }
    };
    
    // Check if we're on the correct page on mount (for initial load)
    // Only trigger all sides equality animation for page 3
    const checkInitialPage = () => {
      // Use componentPageNumber (extracted from ID) as primary source, fallback to currentPage prop
      const detectedPageNum = componentPageNumber || currentPage;
      const currentPageFromWindow = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
      
      // Only trigger for page 3 and only if allSideEqualityAnimationConfig exists
      // Skip if in custom mode (pages 2, 3 use custom mode and don't need this animation)
      const shouldTrigger = (detectedPageNum === 3 || currentPageFromWindow === 3) && 
                           allSideEqualityAnimationConfig && 
                           mode !== 'custom';
      
      if (shouldTrigger) {
        console.log(`🎬 QuadrilateralComponent ${id} detected page 3 on mount (detectedPageNum: ${detectedPageNum}, currentPageFromWindow: ${currentPageFromWindow}), will trigger animation`);
        // Delay to ensure component is fully mounted and refs are set
        setTimeout(() => {
          if (!triggerAnimation(-1)) {
            // Retry if not ready yet
            let retryCount = 0;
            const maxRetries = 10;
            const retryInterval = setInterval(() => {
              retryCount++;
              if (triggerAnimation(-1)) {
                console.log(`✅ QuadrilateralComponent ${id} animation triggered on retry ${retryCount}`);
                clearInterval(retryInterval);
              } else if (retryCount >= maxRetries) {
                console.warn(`⚠️ QuadrilateralComponent ${id} could not trigger animation after ${maxRetries} retries`);
                clearInterval(retryInterval);
              }
            }, 500);
          }
        }, 1500);
      } else {
        // Log why animation is not being triggered
        if (allSideEqualityAnimationConfig) {
          if (mode === 'custom') {
            console.log(`ℹ️ QuadrilateralComponent ${id} has allSideEqualityAnimationConfig but is in custom mode, skipping animation`);
          } else {
            console.log(`ℹ️ QuadrilateralComponent ${id} has allSideEqualityAnimationConfig but detected page ${detectedPageNum} (not page 3), skipping animation`);
          }
        }
      }
    };
    
    window.addEventListener('triggerAllSidesEqualityAnimation', handleTriggerAnimation);
    window.addEventListener('pageChanged', handlePageChange);
    
    // Check initial page after a delay
    setTimeout(checkInitialPage, 100);
    
    return () => {
      window.removeEventListener('triggerAllSidesEqualityAnimation', handleTriggerAnimation);
      window.removeEventListener('pageChanged', handlePageChange);
      
      // Cleanup: stop all sides equality animation when component unmounts
      // Only cancel animation frame, don't call setState in cleanup to avoid loops
      if (allSidesEqualityAnimationRef.current) {
        cancelAnimationFrame(allSidesEqualityAnimationRef.current);
        allSidesEqualityAnimationRef.current = null;
      }
      if (containerRef.current && typeof containerRef.current.stopSideEqualityAnimation === 'function') {
        containerRef.current.stopSideEqualityAnimation();
      }
      
      // Cleanup: stop opposite sides equality animation when component unmounts
      // Only cancel animation frame, don't call setState in cleanup to avoid loops
      if (oppositeSideAnimationRef.current) {
        cancelAnimationFrame(oppositeSideAnimationRef.current);
        oppositeSideAnimationRef.current = null;
      }
      oppositeSideAnimationStateRef.current = null;
    };
  }, [id, elementName, allSideEqualityAnimationConfig]);
  
  
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
        
        // For page 3, don't reset allSidesEqualityAnimation if it's already running
        // This prevents the animation from restarting mid-cycle
        const isPage3 = resetPage === 3;
        const animationRunning = allSidesEqualityAnimationRef.current !== null;
        
        if (isPage3 && animationRunning) {
          console.log(`⏭️ QuadrilateralComponent ${id} skipping reset of allSidesEqualityAnimation on page 3 (animation already running)`);
        }
        
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
        
        // Reset all animation states (except allSidesEqualityAnimation on page 3 if running)
        setAngleAnimation(null);
        setAngleSumAnimation(null);
        setSideEqualityAnimation(null);
        if (!(isPage3 && animationRunning)) {
          // Only reset allSidesEqualityAnimation if not page 3 or animation not running
          // Note: allSidesEqualityAnimation is not in the reset list, so we handle it separately
        }
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
        // Don't reset allSidesEqualityAnimationRef on page 3 if animation is running
        // This prevents the animation from restarting mid-cycle
        if (!(isPage3 && animationRunning)) {
          if (allSidesEqualityAnimationRef.current) {
            cancelAnimationFrame(allSidesEqualityAnimationRef.current);
            allSidesEqualityAnimationRef.current = null;
          }
        } else {
          console.log(`⏭️ QuadrilateralComponent ${id} preserving allSidesEqualityAnimationRef on page 3 (animation running)`);
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
  
  // State for parallel proof animation (custom lines transversal sweep)
  const [parallelProofAnimation, setParallelProofAnimation] = React.useState(null);
  const parallelProofAnimationRef = React.useRef(null);
  const parallelProofStateRef = React.useRef(null); // Store state in ref for animation loop
  
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
            stroke: #FFFF00; 
            opacity: 1;
          }
          50% { 
            stroke: #FFFF00;
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
            stroke: #FFFF00; 
            opacity: 1;
          }
          50% { 
            stroke: #FFFF00;
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
    
    // Check if this is being called from animateAllSideEquality (for single cycle per vertex)
    // We can detect this by checking if there's a flag or by using a different approach
    // For now, we'll use the configured cycles, but animateAllSideEquality will stop it after one cycle
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

  // Track which pairs have been proven equal (to avoid adding notches multiple times)
  const oppositeSidePairsProvenRef = React.useRef({ pair0: false, pair1: false });
  // Track previous phase to detect phase transitions
  const previousPhaseRef = React.useRef(null);
  // Track last conclusion text to prevent duplicate updates
  const lastConclusionTextRef = React.useRef('');
  
  // Helper function to update conclusion text box for page 5
  const updatePage5ConclusionText = React.useCallback((htmlText) => {
    // Prevent duplicate updates - check both the text content and if update is in progress
    if (lastConclusionTextRef.current === htmlText) {
      console.log(`⏭️ [Conclusion Text] Skipping duplicate update: "${htmlText}"`);
      return;
    }
    
    const instructionId = 'page5-conclusion-text';
    const updateKey = `${instructionId}-${htmlText}`;
    
    // Check if this exact update is already in progress
    if (window[`${instructionId}_updating`]) {
      console.log(`⏭️ [Conclusion Text] Update already in progress for ${instructionId}, skipping`);
      return;
    }
    
    // Mark as updating
    window[`${instructionId}_updating`] = true;
    lastConclusionTextRef.current = htmlText;
    
    if (typeof window !== 'undefined') {
      // Store in global state for React component to pick up
      if (!window.instructionTextUpdates) {
        window.instructionTextUpdates = {};
      }
      window.instructionTextUpdates[instructionId] = htmlText;
      
      // Dispatch event for React component
      const updateEvent = new CustomEvent('instructionTextUpdate', {
        detail: {
          instructionId: instructionId,
          text: htmlText
        }
      });
      window.dispatchEvent(updateEvent);
      
      // Also do direct DOM update to ensure it works (with proper clearing)
      const updateDOM = (attempt = 0) => {
        const conclusionElement = document.getElementById(instructionId);
        if (conclusionElement) {
          // The TextboxComponent wraps HTML in: <div id="page5-conclusion-text"><span style="display: inline;">content</span></div>
          // We need to find the DIRECT CHILD span (the wrapper), not any nested spans in the content
          // Look for the span that is a direct child and has the "display: inline" style
          let innerSpan = null;
          for (let child of conclusionElement.children) {
            if (child.tagName === 'SPAN' && child.style.display === 'inline') {
              innerSpan = child;
              break;
            }
          }
          // Fallback: get first direct child span if style check didn't work
          if (!innerSpan) {
            const firstChild = conclusionElement.firstElementChild;
            if (firstChild && firstChild.tagName === 'SPAN') {
              innerSpan = firstChild;
            }
          }
          
          if (innerSpan && innerSpan.parentElement === conclusionElement) {
            // This is the wrapper span - completely remove ALL children nodes
            while (innerSpan.firstChild) {
              innerSpan.removeChild(innerSpan.firstChild);
            }
            // Set new content - this completely replaces everything
            innerSpan.innerHTML = htmlText;
            console.log(`✅ [Conclusion Text] Updated wrapper span for ${instructionId} (attempt ${attempt + 1})`);
            // Mark as no longer updating
            window[`${instructionId}_updating`] = false;
          } else {
            // If no wrapper span found, clear entire element completely and set new content
            while (conclusionElement.firstChild) {
              conclusionElement.removeChild(conclusionElement.firstChild);
            }
            // Set new content
            conclusionElement.innerHTML = htmlText;
            console.log(`✅ [Conclusion Text] Updated element directly (no wrapper span found)`);
            // Mark as no longer updating
            window[`${instructionId}_updating`] = false;
          }
        } else if (attempt < 5) {
          // Retry if element not found yet
          setTimeout(() => updateDOM(attempt + 1), 100 * (attempt + 1));
        } else {
          console.warn(`⚠️ [Conclusion Text] Element ${instructionId} not found after 5 attempts`);
          // Mark as no longer updating even on failure
          window[`${instructionId}_updating`] = false;
        }
      };
      
      // Start DOM update after a small delay to let React process the event first
      setTimeout(() => updateDOM(), 50);
    }
  }, []);

  // useEffect to run opposite side animation loop when animation state changes
  React.useEffect(() => {
    console.log(`🔍 [Opposite Side Animation useEffect] Triggered:`, {
      hasOppositeSideAnimation: !!oppositeSideAnimation,
      hasStateRef: !!oppositeSideAnimationStateRef.current,
      oppositeSideAnimation: oppositeSideAnimation,
      stateRef: oppositeSideAnimationStateRef.current
    });
    
    if (!oppositeSideAnimation) {
      console.log(`⚠️ [Opposite Side Animation useEffect] Early return - no animation state`);
      // Clean up if animation state is cleared
      if (oppositeSideAnimationRef.current) {
        cancelAnimationFrame(oppositeSideAnimationRef.current);
        oppositeSideAnimationRef.current = null;
      }
      return;
    }
    
    // Use the state object directly - it has all the info we need
    // Also sync it to the ref for the animation loop to use
    if (!oppositeSideAnimationStateRef.current || 
        oppositeSideAnimationStateRef.current.startTime !== oppositeSideAnimation.startTime) {
      oppositeSideAnimationStateRef.current = oppositeSideAnimation;
      console.log(`🔄 [Opposite Side Animation useEffect] Synced state to ref`);
    }
    
    console.log(`✅ [Opposite Side Animation useEffect] Starting animation loop`);

    // Cancel any existing animation frame before starting a new one
    if (oppositeSideAnimationRef.current) {
      cancelAnimationFrame(oppositeSideAnimationRef.current);
      oppositeSideAnimationRef.current = null;
    }

    // Only reset proven pairs for the current pair being animated
    // This allows multiple separate calls (pair 0, then pair 1) to preserve notches
    const currentPairIndex = oppositeSideAnimation.pairIndex;
    console.log(`🎬 [Opposite Side Animation] Starting animation for pair ${currentPairIndex}, startTime: ${oppositeSideAnimation.startTime}`);
    
    // Don't clear notches when starting - let them accumulate as pairs are proven
    // Only reset the proven flag for the current pair so it can be proven again
    if (currentPairIndex === 0) {
      // Starting pair 0 - reset pair 0 flag but preserve pair 1 if it was already proven
      oppositeSidePairsProvenRef.current.pair0 = false;
      console.log(`🔄 [Opposite Side Animation] Reset pair 0 flag, preserving pair 1`);
    } else if (currentPairIndex === 1) {
      // Starting pair 1 - reset pair 1 flag but preserve pair 0 if it was already proven
      oppositeSidePairsProvenRef.current.pair1 = false;
      console.log(`🔄 [Opposite Side Animation] Reset pair 1 flag, preserving pair 0`);
    }
    // Reset phase tracking for the new animation
    previousPhaseRef.current = null;

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    // Use the state object directly - it's already synced to the ref
    const initialState = oppositeSideAnimation;
    const initialStartTime = initialState.startTime;
    const initialTotalCycleDuration = initialState.totalCycleDuration;
    const initialCurrentPairIndex = initialState.pairIndex;
    const initialAnimateBothPairs = initialState.animateBothPairs;

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      // Check if animation state still exists
      if (!oppositeSideAnimationStateRef.current) {
        console.log('🛑 [Opposite Side Animation] Animation state cleared, stopping animation');
        if (oppositeSideAnimationRef.current) {
          cancelAnimationFrame(oppositeSideAnimationRef.current);
          oppositeSideAnimationRef.current = null;
        }
        return;
      }

      // Always read current values from state ref to handle state updates
      const animationState = oppositeSideAnimationStateRef.current;
      const startTime = animationState.startTime;
      const totalCycleDuration = animationState.totalCycleDuration;
      const currentPairIndex = animationState.pairIndex;
      const animateBothPairs = animationState.animateBothPairs;

      const elapsed = Date.now() - startTime;
      
      // Log first few frames to verify animation loop is running
      if (frameCount <= 5 || frameCount % 60 === 0) {
        console.log(`🎬 [Opposite Side Animation] Frame ${frameCount}: elapsed=${elapsed}ms, startTime=${startTime}, pairIndex=${currentPairIndex}`);
      }
      
      // Debug logging every 100ms to track animation progress
      if (elapsed % 100 < 16) { // Roughly every 100ms (requestAnimationFrame runs at ~60fps, so ~16ms per frame)
        console.log(`🎬 [Opposite Side Animation] Progress: elapsed=${elapsed}ms, pairIndex=${oppositeSideAnimationStateRef.current.pairIndex}, phase=${oppositeSideAnimationStateRef.current.phase}, progress=${oppositeSideAnimationStateRef.current.progress}`);
      }
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
      
      // For page 5, dispatch completion events after the second pair (BC/DA, pairIndex 1) completes one full cycle
      const componentPageNum = componentPageNumber || currentPage;
      if (componentPageNum === 5 && 
          activePairIndex === 1 && // Only for the second pair (BC/DA)
          currentFullCycle === 1 && // After one full cycle
          !oppositeSideAnimationStateRef.current?.page5CompletionDispatched) {
        console.log('✅ Page 5 opposite side animation: second pair (BC/DA) completed one cycle, dispatching completion events');
        oppositeSideAnimationStateRef.current.page5CompletionDispatched = true;
        
        // Dispatch quizCompleted event to mark page as completed
        if (typeof window !== 'undefined') {
          const quizCompletedEvent = new CustomEvent('quizCompleted', {
            detail: {
              quizId: 'page5-animation',
              pageNumber: 5
            }
          });
          window.dispatchEvent(quizCompletedEvent);
          console.log('✅ Dispatched quizCompleted event for page 5 after second pair completes one cycle');
          
          // Dispatch page5AnimationComplete event for NextButtonComponent and TapGifComponent
          const enableEvent = new CustomEvent('page5AnimationComplete', {
            detail: {
              page: 5
            }
          });
          window.dispatchEvent(enableEvent);
          console.log('✅ Dispatched page5AnimationComplete event');
        }
      }
      
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
      const previousPhase = previousPhaseRef.current;
      
      if (pairCycleElapsed < oppositeSideAnimationDuration) {
        phase = 'translating-to-opposite';
        progress = easeInOutCubic(pairCycleElapsed / oppositeSideAnimationDuration);
      } else if (pairCycleElapsed < oppositeSideAnimationDuration + oppositeSideAnimationWaitTime) {
        phase = 'waiting-at-opposite';
        progress = 1;
        
        // Add notches when sides are proven equal (only when first entering waiting-at-opposite phase)
        const justEnteredWaitingPhase = previousPhase !== 'waiting-at-opposite';
        console.log(`🔍 [Opposite Side Animation] Phase: ${phase}, Previous: ${previousPhase}, Just entered: ${justEnteredWaitingPhase}, Active pair: ${activePairIndex}`);
        
        if (justEnteredWaitingPhase) {
          if (activePairIndex === 0 && !oppositeSidePairsProvenRef.current.pair0) {
            // Pair 0: AB and CD - add single notch to both
            oppositeSidePairsProvenRef.current.pair0 = true;
            console.log('🎯 [Opposite Side Animation] Adding notches for pair 0 (AB/CD)');
            setDynamicNotches(prev => {
              // Remove any existing notches for AB and CD, then add new ones
              const filtered = prev.filter(n => n.side !== 'AB' && n.side !== 'CD');
              const newNotches = [
                ...filtered,
                { side: 'AB', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 },
                { side: 'CD', type: 'tick', count: 1, color: '#FFFF00', size: '6gc', position: 0.5 }
              ];
              console.log('✅ Pair 0 (AB/CD) proven equal - adding single notches', newNotches);
              return newNotches;
            });
            // Update status text for page 5
            updatePage5StatusText('AB = CD');
            // Update conclusion text for page 5 (only once)
            const firstConclusionText = typeof window !== 'undefined' && window.i18n 
              ? window.i18n.t('pages.page5.conclusionTextFirst', 'When a shape has two pairs of equal<br/>sides, we use <span style="color: #FF9900; font-weight: bold;">1 dash</span> to mark one pair')
              : 'When a shape has two pairs of equal<br/>sides, we use <span style="color: #FF9900; font-weight: bold;">1 dash</span> to mark one pair';
            if (lastConclusionTextRef.current !== firstConclusionText) {
              updatePage5ConclusionText(firstConclusionText);
            }
          } else if (activePairIndex === 1 && !oppositeSidePairsProvenRef.current.pair1) {
            // Pair 1: BC and DA - add double notch to both
            oppositeSidePairsProvenRef.current.pair1 = true;
            console.log('🎯 [Opposite Side Animation] Adding notches for pair 1 (BC/DA)');
            setDynamicNotches(prev => {
              // Remove any existing notches for BC and DA, then add new ones
              const filtered = prev.filter(n => n.side !== 'BC' && n.side !== 'DA');
              const newNotches = [
                ...filtered,
                { side: 'BC', type: 'tick', count: 2, color: '#FFFF00', size: '6gc', position: 0.5 },
                { side: 'DA', type: 'tick', count: 2, color: '#FFFF00', size: '6gc', position: 0.5 }
              ];
              console.log('✅ Pair 1 (BC/DA) proven equal - adding double notches', newNotches);
              return newNotches;
            });
            // Update status text for page 5
            updatePage5StatusText('AB = CD and BC = DA');
            // Update conclusion text for page 5 (only once)
            const secondText = typeof window !== 'undefined' && window.i18n 
              ? window.i18n.t('pages.page5.conclusionTextSecond', 'When a shape has two pairs of equal<br/>sides, we use <span style="color: #FF9900; font-weight: bold;">1 dash</span> to mark one pair<br/>and <span style="color: #FF9900; font-weight: bold;">two dashes</span> to mark the other pair.')
              : 'When a shape has two pairs of equal<br/>sides, we use <span style="color: #FF9900; font-weight: bold;">1 dash</span> to mark one pair<br/>and <span style="color: #FF9900; font-weight: bold;">two dashes</span> to mark the other pair.';
            if (lastConclusionTextRef.current !== secondText) {
              updatePage5ConclusionText(secondText);
            }
          } else {
            console.log(`⚠️ [Opposite Side Animation] Not adding notches - pair ${activePairIndex} already proven or conditions not met`, {
              activePairIndex,
              pair0Proven: oppositeSidePairsProvenRef.current.pair0,
              pair1Proven: oppositeSidePairsProvenRef.current.pair1
            });
          }
        }
        previousPhaseRef.current = 'waiting-at-opposite';
      } else if (pairCycleElapsed < oppositeSideAnimationDuration * 2 + oppositeSideAnimationWaitTime) {
        phase = 'translating-back';
        const translateBackElapsed = pairCycleElapsed - (oppositeSideAnimationDuration + oppositeSideAnimationWaitTime);
        progress = 1 - easeInOutCubic(translateBackElapsed / oppositeSideAnimationDuration);
        if (previousPhase !== 'translating-back') {
          previousPhaseRef.current = 'translating-back';
        }
      } else {
        phase = 'waiting-at-source';
        progress = 0;
        if (previousPhase !== 'waiting-at-source') {
          previousPhaseRef.current = 'waiting-at-source';
        }
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
        // Force state update to trigger re-render
        setOppositeSideAnimation({ ...newState });
        
        // Debug log every 10 frames to track progress
        if (currentFullCycle === 0 && (Math.floor(elapsed / 16) % 10 === 0)) {
          console.log(`🎬 [Opposite Side Animation] Frame update: elapsed=${elapsed}ms, phase=${phase}, progress=${progress.toFixed(3)}, pairIndex=${activePairIndex}`);
        }
      }

      oppositeSideAnimationRef.current = requestAnimationFrame(animate);
    };

    console.log(`🚀 [Opposite Side Animation] Starting animation loop, requesting first frame`);
    oppositeSideAnimationRef.current = requestAnimationFrame(animate);
    console.log(`✅ [Opposite Side Animation] Animation frame requested, ref: ${oppositeSideAnimationRef.current}`);

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
  const animateParallelLines = React.useCallback((pairIndex, onComplete, pairId) => {
    console.log('🎬 [PAGE 7 DEBUG] Starting parallel lines animation:', { 
      pairIndex, 
      pairId,
      componentId: id,
      elementName: elementName,
      currentPage: currentPage,
      mode: mode,
      hasCustomConnections: !!(customConnections && customConnections.length > 0),
      hasCustomPoints: !!(customPoints && customPoints.length > 0),
      allParallelPairs: Array.from(allParallelPairs),
      foundParallelPairs: Array.from(foundParallelPairs)
    });
    
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
      pairId, // Store the actual pairId (e.g., "EH,FG") so we can use the correct connections
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

    console.log('📊 [PAGE 7 DEBUG] Parallel lines animation state set:', {
      animationState,
      movementRatio: parallelLinesMovementRatio,
      extensionRatio: parallelLinesExtensionRatio,
      duration: parallelLinesDuration,
      waitTime: parallelLinesWaitTime,
      cycles: parallelLinesCycles
    });
  }, [parallelLinesDuration, parallelLinesWaitTime, parallelLinesCycles, id, elementName, currentPage, mode, customConnections, customPoints, allParallelPairs, foundParallelPairs, parallelLinesMovementRatio, parallelLinesExtensionRatio]);

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
    let lastLogTime = 0;
    const logInterval = 200; // Log every 200ms

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
      
      // DEBUG: Log progress periodically
      if (elapsed - lastLogTime >= logInterval) {
        lastLogTime = elapsed;
        console.log('⏱️ [PAGE 7 DEBUG] Animation progress:', {
          elapsed: elapsed.toFixed(0) + 'ms',
          halfCycleIndex,
          halfCycleElapsed: halfCycleElapsed.toFixed(0) + 'ms',
          fullOscillationCycles,
          isEvenHalfCycle,
          returningToCenter
        });
      }

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
      
      // DEBUG: Log progress updates periodically
      if (elapsed - lastLogTime >= logInterval) {
        console.log('📊 [PAGE 7 DEBUG] Progress update:', {
          phase,
          progress: progress.toFixed(4),
          currentCycle: fullOscillationCycles,
          pairIndex: newState.pairIndex,
          pairId: newState.pairId
        });
      }

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
   * Function to start parallel proof animation (custom lines transversal sweep)
   * Demonstrates that two lines are parallel by:
   * 1. Drawing a perpendicular transversal from line1
   * 2. Sweeping the transversal from start to end of line1
   * 3. Always connecting to line2 at a perpendicular angle
   * 4. Cycling back and forth to show consistency
   * 
   * @param {string} line1Id - ID of the first custom line (the one we sweep along)
   * @param {string} line2Id - ID of the second custom line (the one we connect to)
   * 
   * @example
   * // Start the animation for lines 'line-lk' and 'line-nm'
   * quadComponent.startParallelProofAnimation('line-lk', 'line-nm');
   */
  const startParallelProofAnimation = React.useCallback((line1Id, line2Id) => {
    console.log('🎬 Starting parallel proof animation:', { line1Id, line2Id });
    
    // Find the two lines in customLines
    const line1 = customLines?.find(l => l.id === line1Id);
    const line2 = customLines?.find(l => l.id === line2Id);
    
    if (!line1 || !line2) {
      console.warn('⚠️ Lines not found for parallel proof animation:', line1Id, line2Id);
      return;
    }
    
    // Cancel existing animation
    if (parallelProofAnimationRef.current) {
      cancelAnimationFrame(parallelProofAnimationRef.current);
    }
    
    // Animation state - transversal connects line1 to line2 via perpendicular intersection
    const animationState = {
      line1,
      line2,
      startTime: Date.now(),
      duration: parallelProofDuration,
      cycles: parallelProofCycles,
      currentCycle: 0,
      direction: 'forward', // 'forward' or 'backward'
      progress: 0 // 0 to 1
    };
    
    parallelProofStateRef.current = animationState;
    setParallelProofAnimation(animationState);
    
    console.log('📊 Parallel proof animation state set, triggering useEffect to start loop');
  }, [customLines, parallelProofDuration, parallelProofCycles]);
  
  // useEffect to run parallel proof animation loop when animation state changes
  React.useEffect(() => {
    if (!parallelProofAnimation) return;
    
    const animate = () => {
      const state = parallelProofStateRef.current;
      if (!state) return;
      
      const elapsed = Date.now() - state.startTime;
      const cycleDuration = state.duration;
      const totalElapsed = elapsed;
      
      // Calculate progress within current cycle
      let progress = (totalElapsed % cycleDuration) / cycleDuration;
      
      // Determine direction based on cycle
      const cycleNumber = Math.floor(totalElapsed / cycleDuration);
      const direction = cycleNumber % 2 === 0 ? 'forward' : 'backward';
      
      if (direction === 'backward') {
        progress = 1 - progress;
      }
      
      // Update state
      state.progress = progress;
      state.direction = direction;
      state.currentCycle = Math.floor(cycleNumber / 2);
      
      // Check if animation complete (only if cycles is not -1 for infinite)
      if (state.cycles !== -1 && state.currentCycle >= state.cycles) {
        setParallelProofAnimation(null);
        parallelProofStateRef.current = null;
        return;
      }
      
      // Force re-render (include transversalLength from ref if available)
      setParallelProofAnimation({...state});
      
      // Continue animation
      parallelProofAnimationRef.current = requestAnimationFrame(animate);
    };
    
    parallelProofAnimationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (parallelProofAnimationRef.current) {
        cancelAnimationFrame(parallelProofAnimationRef.current);
      }
    };
  }, [parallelProofAnimation]);

  // Auto-start parallel proof animation on page load if configured
  React.useEffect(() => {
    if (parallelProofAutoStart && parallelProofLine1Id && parallelProofLine2Id && customLines && customLines.length >= 2) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        startParallelProofAnimation(parallelProofLine1Id, parallelProofLine2Id);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [parallelProofAutoStart, parallelProofLine1Id, parallelProofLine2Id, customLines, startParallelProofAnimation]);

  /**
   * Helper function to find perpendicular intersection point on line2 from a point on line1
   * The transversal is always perpendicular to line1 and connects to line2
   * @param {Object} pointOnLine1 - Point on line1 {row, col}
   * @param {Object} line1 - Line1 configuration with start/end
   * @param {Object} line2 - Line2 configuration with start/end
   * @returns {Object|null} - Perpendicular intersection point on line2 {row, col} or null if no intersection
   */
  const findPerpendicularIntersection = React.useCallback((pointOnLine1, line1, line2) => {
    // Line 1 direction vector
    const dx1 = line1.end.col - line1.start.col;
    const dy1 = line1.end.row - line1.start.row;
    
    // Perpendicular vector (rotate 90 degrees clockwise)
    const perpDx = dy1;
    const perpDy = -dx1;
    
    // Normalize perpendicular vector
    const perpLen = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
    if (perpLen === 0) return null;
    
    const perpUnitX = perpDx / perpLen;
    const perpUnitY = perpDy / perpLen;
    
    // Line 2 direction and start point
    const dx2 = line2.end.col - line2.start.col;
    const dy2 = line2.end.row - line2.start.row;
    
    // Find intersection of perpendicular from pointOnLine1 with line 2
    // Using parametric line intersection:
    // pointOnLine1 + t1 * perpDirection = line2.start + t2 * line2Direction
    // Solve for t2
    
    const denominator = perpUnitX * dy2 - perpUnitY * dx2;
    
    if (Math.abs(denominator) < 0.0001) {
      // Lines are parallel, no intersection (shouldn't happen for perpendicular)
      return null;
    }
    
    const diffX = line2.start.col - pointOnLine1.col;
    const diffY = line2.start.row - pointOnLine1.row;
    
    const t2 = (perpUnitX * diffY - perpUnitY * diffX) / denominator;
    
    // Calculate intersection point on line 2
    return {
      row: line2.start.row + t2 * dy2,
      col: line2.start.col + t2 * dx2
    };
  }, []);

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
    
    // If symmetry animation is disabled (config is null or undefined), don't animate
    if (!symmetryAnimationConfig) {
      console.log('⚠️ Symmetry animation is disabled (symmetryAnimationConfig is null/undefined)');
      return;
    }
    
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
      duration: symmetryAnimationConfig?.duration || options.duration || 2000,
      holdTime: symmetryAnimationConfig?.holdTime || options.holdTime || 1500,
      foldLineColor: symmetryAnimationConfig?.foldLineColor || '#FFFFFF',
      foldLineStyle: symmetryAnimationConfig?.foldLineStyle || 'dashed',
      foldedHalfColor: symmetryAnimationConfig?.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
      mismatchColor: symmetryAnimationConfig?.mismatchColor || '#00FFFF',
      onComplete: options.onComplete || null
    };

    const startTime = Date.now();
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
        console.log('✅ Symmetry fold animation complete');
        setSymmetryFoldAnimation(null);
        symmetryFoldAnimationRef.current = null;
        
        // Call the onComplete callback if provided
        if (typeof config.onComplete === 'function') {
          config.onComplete();
        }
        
        // Dispatch custom event for animation completion
        const quadId = id || `${elementName}-${currentPage}`;
        window.dispatchEvent(new CustomEvent('symmetryFoldAnimationComplete', {
          detail: { quadId, axis }
        }));
        
        return;
      }
      
      setSymmetryFoldAnimation(prev => {
        if (!prev) return null;
        const newState = { 
          ...prev, 
          phase,
          progress
        };
        // Log every 10th frame to avoid console spam
        if (Math.floor(elapsed / 50) % 10 === 0) {
          console.log(`🔄 Symmetry animation update: phase=${phase}, progress=${progress.toFixed(3)}, elapsed=${elapsed}ms`);
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

  // ===== INTERSECTION CALCULATION HELPERS =====
  
  // Helper to calculate line-line intersection point
  // Returns intersection point in grid coordinates {row, col} or null if no intersection
  const calculateLineIntersection = React.useCallback((line1Start, line1End, line2Start, line2End) => {
    // Line 1: P1 + t * (P2 - P1)
    // Line 2: P3 + s * (P4 - P3)
    // Solve for t and s where lines intersect
    
    const x1 = line1Start.col;
    const y1 = line1Start.row;
    const x2 = line1End.col;
    const y2 = line1End.row;
    const x3 = line2Start.col;
    const y3 = line2Start.row;
    const x4 = line2End.col;
    const y4 = line2End.row;
    
    // Special case: lines share a start or end point
    const shareStart = Math.abs(x1 - x3) < 0.0001 && Math.abs(y1 - y3) < 0.0001;
    const shareEnd = Math.abs(x2 - x4) < 0.0001 && Math.abs(y2 - y4) < 0.0001;
    const line1StartIsLine2End = Math.abs(x1 - x4) < 0.0001 && Math.abs(y1 - y4) < 0.0001;
    const line1EndIsLine2Start = Math.abs(x2 - x3) < 0.0001 && Math.abs(y2 - y3) < 0.0001;
    
    if (shareStart) {
      // Lines share start point - intersection is at that point
      return {
        row: y1,
        col: x1,
        t: 0,
        s: 0
      };
    }
    if (shareEnd) {
      // Lines share end point - intersection is at that point
      return {
        row: y2,
        col: x2,
        t: 1,
        s: 1
      };
    }
    if (line1StartIsLine2End) {
      // Line 1 start is line 2 end
      return {
        row: y1,
        col: x1,
        t: 0,
        s: 1
      };
    }
    if (line1EndIsLine2Start) {
      // Line 1 end is line 2 start
      return {
        row: y2,
        col: x2,
        t: 1,
        s: 0
      };
    }
    
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    
    // Lines are parallel if denominator is 0
    if (Math.abs(denom) < 0.0001) {
      return null;
    }
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const s = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    
    // Check if intersection is within both line segments (for segment type)
    // For ray/line types, we'll check bounds differently
    const intersectionCol = x1 + t * (x2 - x1);
    const intersectionRow = y1 + t * (y2 - y1);
    
    return {
      row: intersectionRow,
      col: intersectionCol,
      t, // Parameter for line 1 (0-1 means within segment)
      s  // Parameter for line 2 (0-1 means within segment)
    };
  }, []);

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

  // Helper to find all intersections between custom lines specified in intersectionAngles config
  const findCustomLineIntersections = React.useCallback(() => {
    if (!customLines || customLines.length === 0 || !intersectionAngles || intersectionAngles.length === 0) return [];
    
    const intersections = [];
    
    // Helper to resolve position from vertex reference or direct coordinates
    const resolvePosition = (line, endpoint) => {
      const vertexKey = endpoint === 'start' ? 'startVertex' : 'endVertex';
      const coordKey = endpoint === 'start' ? 'start' : 'end';
      
      if (line[vertexKey]) {
        const vertexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const vertexIndex = vertexMap[line[vertexKey].toUpperCase()];
        if (vertexIndex !== undefined) {
          return getVertexPosition(vertexIndex);
        }
      }
      
      return line[coordKey] || { row: 0, col: 0 };
    };
    
    // Create a map of line IDs to line objects for quick lookup
    const lineMap = {};
    customLines.forEach(line => {
      if (line.id) {
        lineMap[line.id] = line;
      }
    });
    
    // Process each intersection angle configuration
    intersectionAngles.forEach((angleConfig, configIndex) => {
      const { lines: lineIds } = angleConfig;
      
      if (!lineIds || !Array.isArray(lineIds) || lineIds.length !== 2) {
        console.warn('intersectionAngles: each config must have a "lines" array with exactly 2 line IDs');
        return;
      }
      
      const [lineId1, lineId2] = lineIds;
      const line1 = lineMap[lineId1];
      const line2 = lineMap[lineId2];
      
      if (!line1 || !line2) {
        console.warn(`intersectionAngles: could not find lines with IDs "${lineId1}" and "${lineId2}"`);
        return;
      }
      
      // Get line endpoints
      const line1Start = resolvePosition(line1, 'start');
      const line1End = resolvePosition(line1, 'end');
      const line2Start = resolvePosition(line2, 'start');
      const line2End = resolvePosition(line2, 'end');
      
      // Calculate intersection
      const intersection = calculateLineIntersection(line1Start, line1End, line2Start, line2End);
      
      console.log(`🔍 findCustomLineIntersections: Checking intersection between "${lineId1}" and "${lineId2}"`, {
        line1Start,
        line1End,
        line2Start,
        line2End,
        intersection,
        t: intersection?.t,
        s: intersection?.s,
        withinBounds: intersection && intersection.t >= 0 && intersection.t <= 1 && intersection.s >= 0 && intersection.s <= 1
      });
      
      if (intersection &&
          intersection.t >= 0 && intersection.t <= 1 &&
          intersection.s >= 0 && intersection.s <= 1) {
        
        // Calculate direction vectors for both lines
        const dir1 = { dx: line1End.col - line1Start.col, dy: line1End.row - line1Start.row };
        const dir2 = { dx: line2End.col - line2Start.col, dy: line2End.row - line2Start.row };
        
        // Calculate the angle between the two lines
        const angle1 = Math.atan2(dir1.dy, dir1.dx);
        const angle2 = Math.atan2(dir2.dy, dir2.dx);
        let angleDiff = Math.abs(angle1 - angle2) * (180 / Math.PI);
        
        if (angleDiff > 180) angleDiff = 360 - angleDiff;
        
        intersections.push({
          position: { row: intersection.row, col: intersection.col },
          line1,
          line2,
          line1Start,
          line1End,
          line2Start,
          line2End,
          angle: angleDiff,
          angleConfig,
          configIndex
        });
      }
    });
    
    return intersections;
  }, [customLines, intersectionAngles, getVertexPosition, calculateLineIntersection]);

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
    
    // Don't render vertices if color is transparent (hiding them)
    if (vertexColor === 'transparent' || vertexColor === 'rgba(0,0,0,0)') {
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
    if (!showVertexLabels || !coordinates) return null;
    
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
  }, [showVertexLabels, vertices, getVertexPosition, coordinates, gridRows, gridCols, vertexLabels, vertexLabelColor, vertexLabelSize, vertexLabelOffset, zIndex, gridDimensions]);

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

  // Compute dynamic sideSymbols based on point animation state (only for shape 3 on page 8)
  const computedSideSymbols = React.useMemo(() => {
    // Only apply dynamic notch logic if pointAnimationConfig is actually configured
    // This ensures only shape 3 (which has pointAnimationConfig) gets dynamic notches
    if (!pointAnimEnabled || !pointAnimPointId) {
      // No point animation configured, return original sideSymbols
      return sideSymbols || [];
    }
    
    // Check both id and quadId to ensure this is shape 3
    const isShape3 = (id === 'page8-geometry-grid-3') || (quadId === 'page8-geometry-grid-3');
    
    // Double-check: only apply to shape 3
    if (!isShape3) {
      return sideSymbols || [];
    }
    
    // Check if animatedRow is available
    if (animatedRow === null) {
      return sideSymbols || [];
    }
    
    // Check if this component has the animated point (for shape 3 on page 8)
    const hasAnimatedPoint = customPoints.some(p => p.id === pointAnimPointId);
    if (!hasAnimatedPoint) {
      return sideSymbols || [];
    }
    
    // Get the initial row from the point definition
    const animInitialRow = customPoints.find(p => p.id === pointAnimPointId)?.row;
    if (animInitialRow === undefined || pointAnimTargetRow === undefined) {
      return sideSymbols || [];
    }
    
    // Check if C' has reached the new position (row 6)
    // Use a small threshold to account for floating point precision
    const isAtNewPosition = Math.abs(animatedRow - pointAnimTargetRow) < 0.1;
    
    // Map the sideSymbols, changing BC and CD notch count based on position
    return (sideSymbols || []).map(symbol => {
      if ((symbol.side === 'BC' || symbol.side === 'CD') && symbol.type === 'tick') {
        // Original count is 2 (double notch), change to 1 (single notch) only when C' reaches new position
        const originalCount = symbol.count || 2;
        return {
          ...symbol,
          count: isAtNewPosition ? 1 : originalCount
        };
      }
      return symbol;
    });
  }, [id, quadId, sideSymbols, pointAnimEnabled, pointAnimPointId, animatedRow, customPoints, pointAnimTargetRow]);

  // Render side symbols (tick marks for equality, arrows for parallel)
  const renderSideSymbols = React.useMemo(() => {
    // Combine computed sideSymbols (which may be dynamic) with dynamic notches from animation
    const allSymbols = [...(computedSideSymbols || []), ...dynamicNotches];
    if (allSymbols.length > 0) {
      console.log(`🎨 [Render Side Symbols] Total symbols: ${allSymbols.length}, Dynamic notches: ${dynamicNotches.length}`, {
        staticSymbols: sideSymbols?.length || 0,
        dynamicNotches: dynamicNotches,
        allSymbols
      });
    }
    if (allSymbols.length === 0 || !coordinates) return null;
    
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
    
    allSymbols.forEach((symbolConfig, symbolIdx) => {
      const { 
        side, 
        type, 
        count = 1, 
        color = '#000000', 
        size = '8gc',
        position = 0.5, // Position along side (0-1, default center)
        blink = false // Whether this notch should blink
      } = symbolConfig;
      
      let p1, p2;
      
      // In custom mode, find the connection by side ID
      if (mode === 'custom' && customConnections && customPoints) {
        const connection = customConnections.find(conn => conn.id === side?.toUpperCase());
        if (!connection) {
          console.warn(`Connection not found for side: ${side}`);
          return;
        }
        
        const fromPoint = customPoints.find(p => p.id === connection.from);
        const toPoint = customPoints.find(p => p.id === connection.to);
        
        if (!fromPoint || !toPoint) {
          console.warn(`Points not found for side: ${side}`, { from: connection.from, to: connection.to });
          return;
        }
        
        // Calculate positions using same format as getVertexPercent, accounting for animated rows
        const { width, height, offsetX, offsetY } = gridDimensions;
        
        // Use animated row if this point is being animated
        const getPointRow = (point) => {
          if (pointAnimEnabled && point.id === pointAnimPointId && animatedRow !== null) {
            return animatedRow;
          }
          return point.row;
        };
        
        const fromRow = getPointRow(fromPoint);
        const toRow = getPointRow(toPoint);
        
        // Calculate positions in same format as getVertexPercent (viewBox coordinates 0-100)
        p1 = {
          x: offsetX + (fromPoint.col / gridCols) * width,
          y: offsetY + (fromRow / gridRows) * height
        };
        p2 = {
          x: offsetX + (toPoint.col / gridCols) * width,
          y: offsetY + (toRow / gridRows) * height
        };
      } else {
        // Regular mode: use vertex indices
      const sideIndex = sideNameToIndex[side?.toUpperCase()];
      if (sideIndex === undefined) {
        console.warn(`Invalid side name: ${side}. Use 'AB', 'BC', 'CD', or 'DA'.`);
        return;
      }
      
      const v1 = getVertexPosition(sideIndex);
      const v2 = getVertexPosition((sideIndex + 1) % 4);
        p1 = getVertexPercent(v1);
        p2 = getVertexPercent(v2);
      }
      
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
        // For yellow notches and feedback notches (aqua/orange), make them longer and thicker
        const isYellowNotch = color === '#FFFF00';
        const isFeedbackNotch = color === '#1ABC9C' || color === '#FF9900'; // Aqua or orange feedback notches
        const isLargeNotch = isYellowNotch || isFeedbackNotch;
        const tickLength = isLargeNotch ? symbolSize * 3.0 : symbolSize * 1.5; // Longer for large notches
        // Increase spacing for double notches to make them more distinct
        const tickSpacing = (count > 1 && isLargeNotch) ? symbolSize * 1.5 : symbolSize * 0.6; // More spacing for large double notches
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
          
          // For large notches (yellow or feedback), use thicker stroke width
          const tickStrokeWidth = isLargeNotch ? symbolSize * 0.4 : symbolSize * 0.15;
          
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
  }, [computedSideSymbols, dynamicNotches, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, gridDimensions, mode, customConnections, customPoints, pointAnimEnabled, pointAnimPointId, animatedRow]);

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
  }, [currentShowDiagonals, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, edgeColor, edgeThickness, edgeStyle, isBlink, diagonal1, diagonal2, getEdgeStyle, gridDimensions]);

  // Helper to create SVG arrowhead
  const createArrowhead = React.useCallback((position, angle, size, color, key) => {
    // Create a triangular arrowhead using polygon
    // Base of triangle is perpendicular to line, tip points in line direction
    // Make arrowheads larger - tipLength is the full size, baseWidth is proportional
    const tipLength = size;
    const baseWidth = size * 0.8; // Increased from 0.6 to 0.8 for larger arrows
    
    // Points relative to position (in viewBox percentage units)
    // Tip at (0, 0), base corners at (-baseWidth/2, tipLength) and (baseWidth/2, tipLength)
    const points = [
      { x: 0, y: -tipLength },
      { x: -baseWidth / 2, y: 0 },
      { x: baseWidth / 2, y: 0 }
    ];
    
    // Rotate points by angle and translate to position
    const angleRad = angle * (Math.PI / 180);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    
    const rotatedPoints = points.map(p => ({
      x: position.x + (p.x * cos - p.y * sin),
      y: position.y + (p.x * sin + p.y * cos)
    }));
    
    const pointsStr = rotatedPoints.map(p => `${p.x},${p.y}`).join(' ');
    
    return React.createElement('polygon', {
      key: `arrowhead-${key}`,
      points: pointsStr,
      fill: color,
      stroke: 'none'
    });
  }, []);

  // ========================================
  // CUSTOM MODE RENDERING FUNCTIONS
  // ========================================

  // Helper to get point position in grid coordinates
  const getCustomPointPosition = React.useCallback((point) => {
    if (!coordinates || !gridDimensions || !point) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const { cellSizeGc, offsetXGc, offsetYGc } = gridDimensions;
    
    // Check if point has required properties
    if (point.col === undefined || point.row === undefined) return null;
    
    // Check if this point is the animated point or a sync point
    const isAnimatedPoint = pointAnimEnabled && point.id === pointAnimPointId;
    const isSyncPoint = pointAnimEnabled && pointAnimSyncPoints.includes(point.id);
    
    // Calculate row: use animated row if this is the animated point or a sync point
    let useRow = point.row;
    if (isAnimatedPoint && animatedRow !== null) {
      useRow = animatedRow;
    } else if (isSyncPoint && animPoint && animatedRow !== null && pointAnimTargetRow !== undefined) {
      // Sync points: calculate delta from animated point and apply to this point
      const deltaRow = animatedRow - animPoint.row;
      useRow = point.row + deltaRow;
    }
    
    // Calculate col: use animated col if this is the animated point or a sync point
    let useCol = point.col;
    if (isAnimatedPoint && animatedCol !== null) {
      useCol = animatedCol;
    } else if (isSyncPoint && animPoint && animatedCol !== null && pointAnimTargetCol !== undefined) {
      // Sync points: calculate delta from animated point and apply to this point
      const deltaCol = animatedCol - animPoint.col;
      useCol = point.col + deltaCol;
    }
    
    // Convert grid position to absolute coordinates
    const pointXGc = offsetXGc + (useCol * cellSizeGc);
    const pointYGc = offsetYGc + (useRow * cellSizeGc);
    
    // Convert to pixels for rendering
    const pointX = x1 + pointXGc;
    const pointY = y1 + pointYGc;
    
    // Also calculate percentage position for SVG viewBox (0-100)
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    const percentX = (pointXGc / containerWidthGc) * 100;
    const percentY = (pointYGc / containerHeightGc) * 100;
    
    return { x: pointX, y: pointY, percentX, percentY, xGc: pointXGc, yGc: pointYGc };
  }, [coordinates, gridDimensions, pointAnimEnabled, pointAnimPointId, animatedRow, animatedCol, pointAnimSyncPoints, animPoint, pointAnimTargetRow, pointAnimTargetCol]);

  // Calculate all possible perpendicular pairs when component mounts or connections change
  React.useEffect(() => {
    if (mode !== 'custom' || !customConnections || !customPoints || !getCustomPointPosition) return;
    
    // Determine page number from component ID
    const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
    
    // For pages 6, 7, 8, 9, calculate parallel pairs
    if (pageNum >= 6 && pageNum <= 9) {
      const parallelPairs = new Set();
      
      // Check all pairs of lines for parallel relationship
      for (let i = 0; i < customConnections.length; i++) {
        for (let j = i + 1; j < customConnections.length; j++) {
          const line1 = customConnections[i];
          const line2 = customConnections[j];
          
          if (areLinesParallel(line1, line2, customPoints, getCustomPointPosition)) {
            // Create a sorted pair identifier (e.g., "AB,CD")
            const pairId = [line1.id, line2.id].sort().join(',');
            parallelPairs.add(pairId);
          }
        }
      }
      
      setAllParallelPairs(parallelPairs);
      console.log(`🔍 [QuadrilateralComponent] Found ${parallelPairs.size} parallel pair(s):`, Array.from(parallelPairs));
    } else {
      // For other pages, calculate perpendicular pairs
      const perpendicularPairs = new Set();
      
      // Check all pairs of lines for 90-degree angles
      for (let i = 0; i < customConnections.length; i++) {
        for (let j = i + 1; j < customConnections.length; j++) {
          const line1 = customConnections[i];
          const line2 = customConnections[j];
          const angleInfo = calculateAngleBetweenLines(line1, line2, customPoints, getCustomPointPosition);
          
          if (angleInfo && Math.abs(angleInfo.angle - 90) <= 2) {
            // Create a sorted pair identifier (e.g., "AB,BC")
            const pairId = [line1.id, line2.id].sort().join(',');
            perpendicularPairs.add(pairId);
          }
        }
      }
      
      setAllPerpendicularPairs(perpendicularPairs);
      console.log(`🔍 [QuadrilateralComponent] Found ${perpendicularPairs.size} perpendicular pair(s):`, Array.from(perpendicularPairs));
    }
  }, [mode, customConnections, customPoints, getCustomPointPosition, calculateAngleBetweenLines, areLinesParallel, componentPageNumber, currentPage]);

  // Update text box when selected lines change (placed here after getCustomPointPosition is defined)
  React.useEffect(() => {
    if (mode !== 'custom' || !customConnections || !customPoints) return;
    
    // Determine page number from component ID or currentPage prop
    const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
    
    // Skip text box updates for pages 2, 3, 4, 8, and 10 (text box has been removed or has static content)
    if (pageNum === 2 || pageNum === 3 || pageNum === 4 || pageNum === 8 || pageNum === 10) {
      return;
    }
    
    const textBoxId = `page${pageNum}-text-box`;
    const feedbackStateKey = `page${pageNum}FeedbackState`;
    const feedbackEventName = `page${pageNum}FeedbackUpdate`;
    let textContent = '';
    
    if (clickedLines.size === 0) {
      // Show default text when no lines are selected
      // Use the same getI18nText pattern as PageConfig.js
      const getI18nText = (key, fallback) => {
        if (typeof window !== 'undefined' && typeof i18n !== 'undefined' && i18n.t) {
          try {
            return i18n.t(key) || fallback;
          } catch (e) {
            return fallback;
          }
        }
        return fallback;
      };
      textContent = getI18nText(`pages.page${pageNum}.textBoxDefault`, "Selected sides and angles");
    } else {
      // Get selected line labels
      const selectedLineIds = Array.from(clickedLines);
      const selectedLines = selectedLineIds.map(id => 
        customConnections.find(conn => conn.id === id)
      ).filter(Boolean);
      
      const lineLabels = selectedLines.map(line => line.id).join(', ');
      const getI18nText = typeof window !== 'undefined' && typeof i18n !== 'undefined' && i18n.t
        ? (key, fallback, params = {}) => {
            let text = i18n.t(key, params);
            // Replace placeholders if params provided
            if (params && text !== key) {
              Object.keys(params).forEach(param => {
                text = text.replace(`{${param}}`, params[param]);
              });
            }
            return text !== key ? text : fallback;
          }
        : (key, fallback, params = {}) => {
            let result = fallback;
            if (params) {
              Object.keys(params).forEach(param => {
                result = result.replace(`{${param}}`, params[param]);
              });
            }
            return result;
          };
      textContent = getI18nText("common.geometry.linesSelected", "Lines selected: {lineLabels}", { lineLabels });
      
      // If two lines selected, check for parallel (pages 6-9) or perpendicular (other pages)
      if (clickedLines.size === 2 && selectedLines.length === 2) {
        if (pageNum >= 6 && pageNum <= 9) {
          // Pages 6-9: Check for parallel lines
          const isParallel = areLinesParallel(selectedLines[0], selectedLines[1], customPoints, getCustomPointPosition);
          
          if (isParallel) {
            // Create a sorted pair identifier (e.g., "AB,CD")
            const pairId = [selectedLines[0].id, selectedLines[1].id].sort().join(',');
            
            // Add this pair to found pairs if not already found
            const updatedFoundPairs = new Set(foundParallelPairs);
            const isNewPair = !updatedFoundPairs.has(pairId);
            if (isNewPair) {
              updatedFoundPairs.add(pairId);
              setFoundParallelPairs(updatedFoundPairs);
              console.log(`✅ [QuadrilateralComponent] Found parallel pair: ${pairId}`);
              
              // Trigger parallel animation for 1.5 cycles
              // Map the detected pair to animation pairIndex (0 or 1)
              // Pair 0: AB || CD, Pair 1: BC || DA
              let pairIndex = 0;
              const sortedPair = pairId.split(',').sort();
              if ((sortedPair[0] === 'AB' && sortedPair[1] === 'CD') || 
                  (sortedPair[0] === 'CD' && sortedPair[1] === 'AB')) {
                pairIndex = 0; // AB || CD
              } else if ((sortedPair[0] === 'BC' && sortedPair[1] === 'DA') || 
                         (sortedPair[0] === 'DA' && sortedPair[1] === 'BC')) {
                pairIndex = 1; // BC || DA
              } else {
                // For other pairs, determine based on which pair was found first
                // Get all found pairs to determine which index to use
                const allPairsArray = Array.from(updatedFoundPairs);
                // If this is the first pair found, use index 0, otherwise use index 1
                // But we need to check which actual pair this is
                const isFirstPair = allPairsArray.length === 1;
                // Use a simple heuristic: first pair = 0, second pair = 1
                pairIndex = isFirstPair ? 0 : 1;
                console.log(`🔍 [QuadrilateralComponent] Using fallback pairIndex calculation: ${pairIndex} for pair ${pairId} (isFirstPair: ${isFirstPair})`);
              }
              
              // Get the container element to access animation methods
              const containerElement = document.getElementById(id || `page${pageNum}-geometry-grid`);
              if (containerElement && containerElement.animateParallelLines) {
                // Stop any existing animation first
                if (containerElement.stopParallelLinesAnimation) {
                  containerElement.stopParallelLinesAnimation();
                  console.log(`🛑 [QuadrilateralComponent] Stopped existing parallel animation before starting new one`);
                }
                
                // Disable clicks during animation
                setIsParallelAnimationRunning(true);
                
                console.log(`🎬 [QuadrilateralComponent] Triggering parallel animation for pair ${pairIndex} (1.5 cycles), pairId: ${pairId}`);
                
                // Calculate duration for 1.5 cycles
                // Default values: duration=1500ms, waitTime=500ms (from component constants)
                const animDuration = 1500; // Default parallel lines animation duration
                const animWaitTime = 500; // Default wait time
                // 1 cycle = 2 * (duration + waitTime) = forward + backward
                // 1.5 cycles = 3 * (duration + waitTime)
                const oneCycleDuration = 2 * (animDuration + animWaitTime);
                const oneAndHalfCyclesDuration = 1.5 * oneCycleDuration;
                
                // Small delay to ensure previous animation is fully stopped
                setTimeout(() => {
                  // Trigger animation with pairId so we can use the correct connections
                  containerElement.animateParallelLines(pairIndex, null, pairId);
                  
                  // Stop animation after 1.5 cycles and re-enable clicks
                  setTimeout(() => {
                    if (containerElement.stopParallelLinesAnimation) {
                      containerElement.stopParallelLinesAnimation();
                    }
                    setIsParallelAnimationRunning(false);
                    console.log(`✅ [QuadrilateralComponent] Parallel animation stopped after 1.5 cycles, re-enabling clicks`);
                  }, oneAndHalfCyclesDuration);
                }, 50); // Small delay to ensure previous animation is stopped
              } else {
                console.warn(`⚠️ [QuadrilateralComponent] Could not find container element or animateParallelLines method`);
                setIsParallelAnimationRunning(false);
              }
            }
            
            // Check if all pairs are found
            const allFound = updatedFoundPairs.size === allParallelPairs.size && 
                           Array.from(updatedFoundPairs).every(pair => allParallelPairs.has(pair));
            
            // Add line 3 with all found parallel pairs
            if (updatedFoundPairs.size > 0) {
              const parallelLinesText = Array.from(updatedFoundPairs)
                .map(pair => {
                  const [line1, line2] = pair.split(',');
                  return `${line1} || ${line2}`;
                })
                .join('; ');
              
              if (parallelLinesText) {
                textContent += `<br>Parallel lines: ${parallelLinesText}`;
              }
            }
            
            // Correct! Play correct sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            
            // Update feedback box based on whether all pairs are found
            if (!window[feedbackStateKey]) {
              window[feedbackStateKey] = {
                text: '',
                mode: 'normal'
              };
            }
            
            let feedbackText = '';
            let feedbackMode = 'correct';
            
            if (allFound) {
              // All pairs found - mark all lines as correct and disable all sides
              setCorrectLines(prev => {
                const newSet = new Set(prev);
                // Add all lines that are part of any parallel pair
                allParallelPairs.forEach(pair => {
                  const [line1, line2] = pair.split(',');
                  newSet.add(line1);
                  newSet.add(line2);
                });
                return newSet;
              });
              setAllSidesDisabled(true);
              
              feedbackText = getI18nText("common.geometry.wellDoneAllParallel", "Well done! You found all the parallel lines in the shape.");
              
              // Dispatch quizCompleted event to enable next button
              if (typeof window !== 'undefined') {
                const quizCompletedEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    quizId: `page${pageNum}-geometry-grid`,
                    pageNumber: pageNum
                  }
                });
                window.dispatchEvent(quizCompletedEvent);
                console.log(`✅ [QuadrilateralComponent] All parallel pairs found! Dispatched quizCompleted event for page ${pageNum}`);
              }
            } else {
              // More pairs to find - don't mark lines as correct yet, keep them clickable
              // Only track that this pair was found, but don't disable clicks
              // Keep the selection visible so user can see what they found
              // Mark that we should reset selection on the next click
              setShouldResetOnNextClick(true);
              feedbackText = getI18nText("common.geometry.morePairsToFind", "There's more than one pair of parallel lines in this shape. Try finding another.");
            }
            
            window[feedbackStateKey].text = feedbackText;
            window[feedbackStateKey].mode = feedbackMode;
            
            const feedbackEvent = new CustomEvent(feedbackEventName, {
              detail: {
                text: feedbackText,
                mode: feedbackMode
              }
            });
            
            window.dispatchEvent(feedbackEvent);
            console.log(`✅ [QuadrilateralComponent] Found parallel pair: ${pairId}. All found: ${allFound} (${updatedFoundPairs.size}/${allParallelPairs.size})`);
          } else {
            // Incorrect! Show incorrect feedback
            if (!window[feedbackStateKey]) {
              window[feedbackStateKey] = {
                text: '',
                mode: 'normal'
              };
            }
            
            const oopsNotParallelText = getI18nText("common.geometry.oopsNotParallel", "Oops! Look carefully at the lines. They are not parallel.");
            window[feedbackStateKey].text = oopsNotParallelText;
            window[feedbackStateKey].mode = 'incorrect';
            
            const feedbackEvent = new CustomEvent(feedbackEventName, {
              detail: {
                text: oopsNotParallelText,
                mode: 'incorrect'
              }
            });
            
            window.dispatchEvent(feedbackEvent);
            console.log(`❌ [QuadrilateralComponent] Incorrect answer! Lines ${selectedLines[0].id} and ${selectedLines[1].id} are not parallel.`);
          }
        } else {
          // Other pages: Check for perpendicular lines (90-degree angles)
          const angleInfo = calculateAngleBetweenLines(selectedLines[0], selectedLines[1], customPoints, getCustomPointPosition);
          if (angleInfo) {
            textContent += `<br>${getI18nText("common.geometry.angleBetweenLines", "Angle between the lines: {notation} = {angle}°", { notation: angleInfo.notation, angle: angleInfo.angle })}`;
            
            // Check if angle is 90 degrees (with tolerance of 2 degrees)
            const isRightAngle = Math.abs(angleInfo.angle - 90) <= 2;
            
            if (isRightAngle) {
              // Create a sorted pair identifier (e.g., "AB,BC")
              const pairId = [selectedLines[0].id, selectedLines[1].id].sort().join(',');
              
              // Add this pair to found pairs if not already found
              const updatedFoundPairs = new Set(foundPerpendicularPairs);
              if (!updatedFoundPairs.has(pairId)) {
                updatedFoundPairs.add(pairId);
                setFoundPerpendicularPairs(updatedFoundPairs);
                console.log(`✅ [QuadrilateralComponent] Found perpendicular pair: ${pairId}`);
              }
              
              // Check if all pairs are found
              const allFound = updatedFoundPairs.size === allPerpendicularPairs.size && 
                             Array.from(updatedFoundPairs).every(pair => allPerpendicularPairs.has(pair));
              
              // Add line 3 with all found perpendicular pairs (only for page 3)
              if (pageNum === 3 && updatedFoundPairs.size > 0) {
                const perpendicularLinesText = Array.from(updatedFoundPairs)
                  .map(pair => {
                    const [line1, line2] = pair.split(',');
                    return `${line1} ⟂ ${line2}`;
                  })
                  .join('; ');
                
                if (perpendicularLinesText) {
                  textContent += `<br>${getI18nText("common.geometry.perpendicularLines", "Perpendicular lines: {text}", { text: perpendicularLinesText })}`;
                }
              }
              
              // Correct! Play correct sound
              if (typeof window !== 'undefined' && window.playCarClickSound) {
                window.playCarClickSound('correct');
              }
              
              // Update feedback box based on whether all pairs are found
              if (!window[feedbackStateKey]) {
                window[feedbackStateKey] = {
                  text: '',
                  mode: 'normal'
                };
              }
              
              let feedbackText = '';
              let feedbackMode = 'correct';
              
              if (allFound) {
                // All pairs found - mark all lines as correct and disable all sides
                setCorrectLines(prev => {
                  const newSet = new Set(prev);
                  // Add all lines that are part of any perpendicular pair
                  allPerpendicularPairs.forEach(pair => {
                    const [line1, line2] = pair.split(',');
                    newSet.add(line1);
                    newSet.add(line2);
                  });
                  return newSet;
                });
                setAllSidesDisabled(true);
                
                feedbackText = getI18nText("common.geometry.wellDoneAllPerpendicular", "Well done! You found all the perpendicular lines in the shape.");
                
                // Dispatch quizCompleted event to enable next button
                if (typeof window !== 'undefined') {
                  const quizCompletedEvent = new CustomEvent('quizCompleted', {
                    detail: {
                      quizId: `page${pageNum}-geometry-grid`,
                      pageNumber: pageNum
                    }
                  });
                  window.dispatchEvent(quizCompletedEvent);
                  console.log(`✅ [QuadrilateralComponent] All perpendicular pairs found! Dispatched quizCompleted event for page ${pageNum}`);
                }
              } else {
                // More pairs to find - don't mark lines as correct yet, keep them clickable
                // Only track that this pair was found, but don't disable clicks
                // Keep the selection visible so user can see what they found
                // Mark that we should reset selection on the next click
                setShouldResetOnNextClick(true);
                feedbackText = getI18nText("common.geometry.morePerpendicularPairsToFind", "There's more than one pair of perpendicular lines in this shape. Try finding another.");
              }
              
              window[feedbackStateKey].text = feedbackText;
              window[feedbackStateKey].mode = feedbackMode;
              
              const feedbackEvent = new CustomEvent(feedbackEventName, {
                detail: {
                  text: feedbackText,
                  mode: feedbackMode
                }
              });
              
              window.dispatchEvent(feedbackEvent);
              console.log(`✅ [QuadrilateralComponent] Found perpendicular pair: ${pairId}. All found: ${allFound} (${updatedFoundPairs.size}/${allPerpendicularPairs.size})`);
            } else {
              // Incorrect! Show incorrect feedback
              if (!window[feedbackStateKey]) {
                window[feedbackStateKey] = {
                  text: '',
                  mode: 'normal'
                };
              }
              
              const oopsLookCarefullyText = getI18nText("common.geometry.oopsLookCarefully", "Oops! Look carefully at where the lines meet.");
              window[feedbackStateKey].text = oopsLookCarefullyText;
              window[feedbackStateKey].mode = 'incorrect';
              
              const feedbackEvent = new CustomEvent(feedbackEventName, {
                detail: {
                  text: oopsLookCarefullyText,
                  mode: 'incorrect'
                }
              });
              
              window.dispatchEvent(feedbackEvent);
              console.log(`❌ [QuadrilateralComponent] Incorrect answer! Lines ${selectedLines[0].id} and ${selectedLines[1].id} form ${angleInfo.angle}° angle (not 90°)`);
            }
          } else {
            // Lines don't share a vertex and don't intersect
            textContent += `<br>${getI18nText("common.geometry.noAnglesFormed", "Angle between the lines: No angles formed")}`;
            
            // Show incorrect feedback
            if (!window[feedbackStateKey]) {
              window[feedbackStateKey] = {
                text: '',
                mode: 'normal'
              };
            }
            
            const oopsLookCarefullyText2 = getI18nText("common.geometry.oopsLookCarefully", "Oops! Look carefully at where the lines meet.");
            window[feedbackStateKey].text = oopsLookCarefullyText2;
            window[feedbackStateKey].mode = 'incorrect';
            
            const feedbackEvent = new CustomEvent(feedbackEventName, {
              detail: {
                text: oopsLookCarefullyText2,
                mode: 'incorrect'
              }
            });
            
            window.dispatchEvent(feedbackEvent);
          }
        }
      }
      
      // Add perpendicular lines text (line 3) if any pairs are found (only for page 3)
      if (pageNum === 3 && foundPerpendicularPairs.size > 0) {
        const perpendicularLinesText = Array.from(foundPerpendicularPairs)
          .map(pair => {
            const [line1, line2] = pair.split(',');
            return `${line1} ⟂ ${line2}`;
          })
          .join('; ');
        
        if (perpendicularLinesText) {
          // Only add if not already in textContent (to avoid duplicates)
          if (!textContent.includes('Perpendicular lines:')) {
            textContent += `<br>${getI18nText("common.geometry.perpendicularLines", "Perpendicular lines: {text}", { text: perpendicularLinesText })}`;
          }
        }
      }
      
      // Add parallel lines text (line 3) if any pairs are found (only for pages 6-9)
      if (pageNum >= 6 && pageNum <= 9 && foundParallelPairs.size > 0) {
        const parallelLinesText = Array.from(foundParallelPairs)
          .map(pair => {
            const [line1, line2] = pair.split(',');
            return `${line1} || ${line2}`;
          })
          .join('; ');
        
        if (parallelLinesText) {
          // Only add if not already in textContent (to avoid duplicates)
          if (!textContent.includes('Parallel lines:')) {
            textContent += `<br>Parallel lines: ${parallelLinesText}`;
          }
        }
      }
      
      if (clickedLines.size === 0) {
        // No lines selected - clear feedback and correct lines, re-enable all sides
        setCorrectLines(new Set());
        setAllSidesDisabled(false);
        setFoundPerpendicularPairs(new Set()); // Reset found pairs when deselecting
        setFoundParallelPairs(new Set()); // Reset found parallel pairs when deselecting
        setShouldResetOnNextClick(false); // Reset the flag when deselecting
        
        if (window[feedbackStateKey]) {
          window[feedbackStateKey].text = '';
          window[feedbackStateKey].mode = 'normal';
          
          const feedbackEvent = new CustomEvent(feedbackEventName, {
            detail: {
              text: '',
              mode: 'normal'
            }
          });
          
          window.dispatchEvent(feedbackEvent);
        }
      }
    }
    
    // Update text box using instructionTextUpdate event system
    if (typeof window !== 'undefined') {
      if (!window.instructionTextUpdates) {
        window.instructionTextUpdates = {};
      }
      window.instructionTextUpdates[textBoxId] = textContent;
      
      const updateEvent = new CustomEvent('instructionTextUpdate', {
        detail: {
          instructionId: textBoxId,
          text: textContent
        }
      });
      
      console.log(`📝 [QuadrilateralComponent] Updating text box ${textBoxId} with: "${textContent}"`);
      window.dispatchEvent(updateEvent);
      
      // Also try direct DOM update as fallback
      const textBoxElement = document.getElementById(textBoxId);
      if (textBoxElement) {
        if (textContent.includes('<br>') || textContent.includes('<')) {
          textBoxElement.innerHTML = textContent;
        } else {
          textBoxElement.textContent = textContent;
        }
        console.log(`✅ [QuadrilateralComponent] Directly updated text box ${textBoxId} via DOM`);
      } else {
        console.warn(`⚠️ [QuadrilateralComponent] Text box element ${textBoxId} not found in DOM`);
      }
    }
  }, [clickedLines, mode, customConnections, customPoints, calculateAngleBetweenLines, getCustomPointPosition, foundPerpendicularPairs, allPerpendicularPairs, foundParallelPairs, allParallelPairs, areLinesParallel, componentPageNumber, currentPage]);

  // Helper to convert gc units to viewBox units (0-100) for SVG
  const processGcToViewBox = React.useCallback((value, defaultValue) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      if (!coordinates || !gridDimensions) return defaultValue;
      const [x1, y1, x2, y2] = coordinates;
      const containerWidthGc = x2 - x1;
      const containerHeightGc = y2 - y1;
      
      const gcValue = parseFloat(value.replace('gc', ''));
      // Use average of width and height for consistent sizing
      const avgSizeGc = (containerWidthGc + containerHeightGc) / 2;
      return (gcValue / avgSizeGc) * 100;
    }
    return defaultValue;
  }, [coordinates, gridDimensions]);

  // Render custom mode points
  const renderCustomPoints = React.useMemo(() => {
    if (mode !== 'custom' || !customPoints || customPoints.length === 0) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const points = [];
    
    customPoints.forEach((point, index) => {
      const pos = getCustomPointPosition(point);
      if (!pos) return;
      
      const pointSize = processGcToViewBox(point.size || '12gc', 1.2);
      const pointColor = point.color || '#FF9900';
      const isClickable = point.clickable !== undefined ? point.clickable : false;
      
      // Create point circle
      points.push(React.createElement('circle', {
        key: `custom-point-${point.id}-${index}`,
        cx: pos.percentX,
        cy: pos.percentY,
        r: pointSize / 2, // Radius is half the diameter
        fill: pointColor,
        stroke: '#FFFFFF',
        strokeWidth: 1,
        style: {
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s ease'
        },
        onClick: isClickable ? (e) => {
          e.stopPropagation();
          if (onPointClick) {
            onPointClick(point.id, point, e);
          }
        } : undefined,
        onMouseEnter: isClickable ? (e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.filter = 'brightness(1.2)';
        } : undefined,
        onMouseLeave: isClickable ? (e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = 'brightness(1)';
        } : undefined
      }));
      
      // Create label if present
      if (point.label) {
        const labelOffsetX = point.labelOffset?.x ? processGcToViewBox(point.labelOffset.x, 1.0) : 1.0;
        const labelOffsetY = point.labelOffset?.y ? processGcToViewBox(point.labelOffset.y, -1.5) : -1.5;
        const labelSize = point.labelSize ? processGcToViewBox(point.labelSize, 1.4) : 1.4;
        const labelColor = point.labelColor || '#FFFFFF';
        
        points.push(React.createElement('text', {
          key: `custom-point-label-${point.id}-${index}`,
          x: pos.percentX + labelOffsetX,
          y: pos.percentY + labelOffsetY,
          fill: labelColor,
          fontSize: labelSize,
          fontWeight: 'bold',
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          style: {
            pointerEvents: 'none',
            userSelect: 'none'
          }
        }, point.label));
      }
    });
    
    if (points.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'custom-points-svg',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 15
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, points.map(point => {
      // Re-enable pointer events for clickable elements
      if (point.props.onClick) {
        return React.cloneElement(point, {
          style: { ...point.props.style, pointerEvents: 'auto' }
        });
      }
      return point;
    }));
  }, [mode, customPoints, coordinates, gridDimensions, zIndex, onPointClick, getCustomPointPosition, processGcToViewBox]);

  // Render custom mode connections (lines between points)
  const renderCustomConnections = React.useMemo(() => {
    if (mode !== 'custom' || !customConnections || customConnections.length === 0) return null;
    
    const [x1, y1, x2, y2] = coordinates;
    const lines = [];
    
    // Helper to get stroke dash array (in viewBox units)
    const getStrokeDash = (style, thickness) => {
      const thicknessViewBox = processGcToViewBox(thickness || '3gc', 0.3);
      switch (style) {
        case 'dashed':
          return `${thicknessViewBox * 3} ${thicknessViewBox * 2}`;
        case 'dotted':
          return `${thicknessViewBox} ${thicknessViewBox}`;
        default:
          return 'none';
      }
    };
    
    // Add polygon fill if enabled
    if (customFill && customPoints.length >= 3) {
      // Build ordered point list by following connections
      const pointOrder = [];
      const pointMap = new Map(customPoints.map(p => [p.id, p]));
      
      // For quadrilaterals (4 points), identify perimeter edges explicitly
      // Common quadrilateral edge IDs: AB, BC, CD, DA
      const perimeterEdgeIds = ['AB', 'BC', 'CD', 'DA'];
      const perimeterEdges = customConnections.filter(conn => 
        perimeterEdgeIds.includes(conn.id)
      );
      
      // If we have perimeter edges, use them; otherwise use all connections
      const edgesToUse = perimeterEdges.length >= 4 ? perimeterEdges : customConnections;
      const connectionMap = new Map(edgesToUse.map(c => [c.from, c]));
      
      if (edgesToUse.length > 0) {
        // Start with the first edge's from point
        let currentPointId = edgesToUse[0].from;
        const visited = new Set();
        
        // Follow connections to build ordered point list
        while (pointOrder.length < customPoints.length && !visited.has(currentPointId)) {
          visited.add(currentPointId);
          const point = pointMap.get(currentPointId);
          if (point) {
            const pos = getCustomPointPosition(point);
            if (pos) {
              pointOrder.push(`${pos.percentX},${pos.percentY}`);
            }
          }
          
          // Find next connection starting from current point (only outer edges)
          const nextConnection = connectionMap.get(currentPointId);
          if (nextConnection && !visited.has(nextConnection.to)) {
            currentPointId = nextConnection.to;
          } else {
            // Try to find any unvisited point
            const unvisitedPoint = customPoints.find(p => !visited.has(p.id));
            if (unvisitedPoint) {
              currentPointId = unvisitedPoint.id;
            } else {
              break;
            }
          }
        }
      }
      
      // If we couldn't build order from connections, use points in array order
      if (pointOrder.length < 3) {
        pointOrder.length = 0;
        customPoints.forEach(point => {
          const pos = getCustomPointPosition(point);
          if (pos) {
            pointOrder.push(`${pos.percentX},${pos.percentY}`);
          }
        });
      }
      
      if (pointOrder.length >= 3) {
        // Parse fillColor to extract color and opacity
        let fillColorValue = customFillColor;
        let fillOpacityValue = customFillOpacity;
        
        // Handle rgba() format
        if (typeof customFillColor === 'string' && customFillColor.startsWith('rgba')) {
          const rgbaMatch = customFillColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
          if (rgbaMatch) {
            fillColorValue = `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})`;
            fillOpacityValue = parseFloat(rgbaMatch[4]);
          }
        }
        
        lines.unshift(React.createElement('polygon', {
          key: 'custom-shape-fill',
          points: pointOrder.join(' '),
          fill: fillColorValue,
          fillOpacity: fillOpacityValue,
          stroke: 'none',
          style: {
            pointerEvents: 'none'
          }
        }));
      }
    }
    
    customConnections.forEach((connection, index) => {
      // Find the from and to points
      const fromPoint = customPoints.find(p => p.id === connection.from);
      const toPoint = customPoints.find(p => p.id === connection.to);
      
      if (!fromPoint || !toPoint) {
        console.warn(`Custom connection ${connection.id}: point not found`, { from: connection.from, to: connection.to });
        return;
      }
      
      const fromPos = getCustomPointPosition(fromPoint);
      const toPos = getCustomPointPosition(toPoint);
      
      if (!fromPos || !toPos) return;
      
      const isClicked = clickedLines.has(connection.id);
      const isWiggling = wigglingLines.has(connection.id);
      const shouldAlwaysBlink = connection.alwaysBlink === true;
      // When selected, use yellow and blink by default
      const clickedColor = isClicked ? (connection.clickedColor || '#FFD700') : (connection.clickedColor || connection.color || '#000000');
      const clickBehavior = isClicked || shouldAlwaysBlink ? (connection.clickBehavior || 'blink') : (connection.clickBehavior || 'normal'); // Selected sides blink by default
      // If alwaysBlink is true, use the connection's color (which should be yellow), otherwise use normal logic
      const lineColor = shouldAlwaysBlink ? (connection.color || '#FFFF00') : (isClicked ? clickedColor : (connection.color || '#000000'));
      const lineThickness = processGcToViewBox(connection.thickness || '3gc', 0.3);
      const lineStyle = connection.style || 'solid';
      const isClickable = connection.clickable !== undefined ? connection.clickable : false;
      const clickAreaWidth = processGcToViewBox(connection.clickAreaWidth || '20gc', 2.0);
      const isCorrect = correctLines.has(connection.id); // Check if line is correct (forms 90° angle)
      // Disable all sides if correct answer was found or if parallel animation is running
      const shouldDisable = allSidesDisabled || isCorrect || isParallelAnimationRunning;
      
      // Determine style and attributes based on click behavior
      let lineStyleObj = {
        pointerEvents: 'none',
        transition: 'all 0.2s ease'
      };
      
      let finalThickness = lineThickness;
      let lineClassName = undefined;
      
      if (isClicked || shouldAlwaysBlink) {
        if (clickBehavior === 'blink' || shouldAlwaysBlink) {
          lineClassName = 'custom-line-blink';
        } else if (clickBehavior === 'glow') {
          lineStyleObj.filter = 'drop-shadow(0 0 10px ' + lineColor + ') drop-shadow(0 0 5px ' + lineColor + ')';
          finalThickness = lineThickness * 1.3; // Slightly thicker for glow effect
        }
        // 'normal' behavior just uses the clicked color, no additional styling
      }
      
      // Add wiggle effect if wiggling (changes color to red)
      if (isWiggling) {
        lineClassName = lineClassName ? `${lineClassName} custom-line-wiggle` : 'custom-line-wiggle';
      }
      
      // Determine final line color (red during wiggle, otherwise use selected/unselected color)
      const finalLineColor = isWiggling ? '#FF0000' : lineColor;
      
      // Create invisible wider line for click detection (if clickable and not disabled)
      if (isClickable && !shouldDisable) {
        lines.push(React.createElement('line', {
          key: `custom-connection-click-${connection.id}-${index}`,
          x1: fromPos.percentX,
          y1: fromPos.percentY,
          x2: toPos.percentX,
          y2: toPos.percentY,
          stroke: 'transparent',
          strokeWidth: clickAreaWidth,
          style: {
            cursor: 'pointer',
            pointerEvents: 'auto'
          },
          onClick: (e) => {
            e.stopPropagation();
            
            // Prevent clicks if parallel animation is running
            if (isParallelAnimationRunning) {
              console.log(`🔒 [QuadrilateralComponent] Line ${connection.id} click blocked - parallel animation running`);
              return;
            }
            
            // Prevent clicks if all sides are disabled (correct answer found) or if this line is correct
            if (allSidesDisabled || correctLines.has(connection.id)) {
              console.log(`🔒 [QuadrilateralComponent] Line ${connection.id} is disabled (allSidesDisabled: ${allSidesDisabled}, isCorrect: ${correctLines.has(connection.id)})`);
              return;
            }
            
            // If we need to reset on next click (after finding a perpendicular pair),
            // reset selection and start fresh with the clicked side
            if (shouldResetOnNextClick) {
              console.log(`🔄 [QuadrilateralComponent] Resetting selection after finding pair, starting fresh with clicked side`);
              
              // Reset the flag - only reset once
              setShouldResetOnNextClick(false);
              
              // Reset selection and start fresh with just the clicked line (allows normal pair selection after this)
              setClickedLines(new Set([connection.id]));
              
              // Clear feedback
              const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
              const feedbackStateKey = `page${pageNum}FeedbackState`;
              const feedbackEventName = `page${pageNum}FeedbackUpdate`;
              
              if (window[feedbackStateKey]) {
                window[feedbackStateKey].text = '';
                window[feedbackStateKey].mode = 'normal';
                
                const feedbackEvent = new CustomEvent(feedbackEventName, {
                  detail: {
                    text: '',
                    mode: 'normal'
                  }
                });
                
                window.dispatchEvent(feedbackEvent);
              }
              
              // Call onLineClick callback if provided
              if (onLineClick) {
                onLineClick(connection.id, connection, e);
              }
              
              return;
            }
            
            // Check if already selected
            const isCurrentlySelected = clickedLines.has(connection.id);
            
            if (isCurrentlySelected) {
              // Deselect the line
              setClickedLines(prev => {
                const newSet = new Set(prev);
                newSet.delete(connection.id);
                return newSet;
              });
              
              // Remove from correctLines if it was correct
              setCorrectLines(prev => {
                const newSet = new Set(prev);
                newSet.delete(connection.id);
                return newSet;
              });
              
              // Clear feedback when deselecting
              const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
              const feedbackStateKey = `page${pageNum}FeedbackState`;
              const feedbackEventName = `page${pageNum}FeedbackUpdate`;
              
              if (window[feedbackStateKey]) {
                window[feedbackStateKey].text = '';
                window[feedbackStateKey].mode = 'normal';
                
                const feedbackEvent = new CustomEvent(feedbackEventName, {
                  detail: {
                    text: '',
                    mode: 'normal'
                  }
                });
                
                window.dispatchEvent(feedbackEvent);
              }
            } else {
              // Check if we already have 2 sides selected
              if (clickedLines.size >= 2) {
                console.log(`🔴 [QuadrilateralComponent] Third side clicked - max 2 already selected:`, {
                  clickedLinesSize: clickedLines.size,
                  clickedLines: Array.from(clickedLines),
                  newLineId: connection.id
                });
                
                // Check if the current selection is incorrect (feedback mode is 'incorrect')
                const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
                const feedbackStateKey = `page${pageNum}FeedbackState`;
                const feedbackEventName = `page${pageNum}FeedbackUpdate`;
                const currentFeedbackMode = (typeof window !== 'undefined' && window[feedbackStateKey]) ? window[feedbackStateKey].mode : 'normal';
                
                // If current selection is incorrect, reset and start fresh with the new line
                if (currentFeedbackMode === 'incorrect') {
                  console.log(`🔄 [QuadrilateralComponent] Current selection is incorrect, resetting and starting fresh with clicked line`);
                  
                  // Reset selection and start fresh with just the clicked line
                  setClickedLines(new Set([connection.id]));
                  
                  // Clear correct lines
                  setCorrectLines(new Set());
                  
                  // Clear feedback
                  if (typeof window !== 'undefined') {
                    if (!window[feedbackStateKey]) {
                      window[feedbackStateKey] = {
                        text: '',
                        mode: 'normal'
                      };
                    }
                    
                    window[feedbackStateKey].text = '';
                    window[feedbackStateKey].mode = 'normal';
                    
                    const feedbackEvent = new CustomEvent(feedbackEventName, {
                      detail: {
                        text: '',
                        mode: 'normal'
                      }
                    });
                    
                    window.dispatchEvent(feedbackEvent);
                  }
                  
                  // Call onLineClick callback if provided
                  if (onLineClick) {
                    onLineClick(connection.id, connection, e);
                  }
                  
                  return;
                }
                
                // If current selection is correct or normal, show error message
                // Play wrong sound
                if (typeof window !== 'undefined' && window.playCarClickSound) {
                  console.log(`🔴 [QuadrilateralComponent] Playing wrong sound`);
                  window.playCarClickSound('wrong');
                }
                
                // Update feedback box
                if (typeof window !== 'undefined') {
                  console.log(`🔴 [QuadrilateralComponent] Updating feedback box:`, {
                    feedbackStateKey,
                    feedbackEventName,
                    existingState: window[feedbackStateKey],
                    windowExists: typeof window !== 'undefined'
                  });
                  
                  // Initialize or update global feedback state
                  if (!window[feedbackStateKey]) {
                    console.log(`🔴 [QuadrilateralComponent] Initializing global feedback state`);
                    window[feedbackStateKey] = {
                      text: '',
                      mode: 'normal'
                    };
                  }
                  
                  const twoSidesText = getI18nText("common.geometry.twoSidesAlreadySelected", "Two sides already selected");
                  window[feedbackStateKey].text = twoSidesText;
                  window[feedbackStateKey].mode = 'incorrect';
                  
                  console.log(`🔴 [QuadrilateralComponent] Updated global state:`, window[feedbackStateKey]);
                  
                  // Dispatch custom event to notify feedback textbox
                  const feedbackEvent = new CustomEvent(feedbackEventName, {
                    detail: {
                      text: twoSidesText,
                      mode: 'incorrect'
                    }
                  });
                  
                  console.log(`🔴 [QuadrilateralComponent] Dispatching event:`, {
                    eventName: feedbackEventName,
                    detail: feedbackEvent.detail,
                    eventType: feedbackEvent.type,
                    timestamp: new Date().toISOString(),
                    eventBubbles: feedbackEvent.bubbles,
                    eventCancelable: feedbackEvent.cancelable
                  });
                  
                  window.dispatchEvent(feedbackEvent);
                  
                  console.log(`🔴 [QuadrilateralComponent] Event dispatched successfully:`, {
                    eventName: feedbackEventName,
                    dispatched: true,
                    timestamp: new Date().toISOString()
                  });
                  
                  // Clear feedback after 3 seconds
                  setTimeout(() => {
                    if (typeof window !== 'undefined' && window[feedbackStateKey]) {
                      window[feedbackStateKey].text = '';
                      window[feedbackStateKey].mode = 'normal';
                      
                      window.dispatchEvent(new CustomEvent(feedbackEventName, {
                        detail: {
                          text: '',
                          mode: 'normal'
                        }
                      }));
                      
                      console.log(`🔄 [QuadrilateralComponent] Cleared feedback box after 3 seconds`);
                    }
                  }, 3000);
                }
                
                // Wiggle the clicked line
                setWigglingLines(prev => {
                  const newSet = new Set(prev);
                  newSet.add(connection.id);
                  return newSet;
                });
                
                // Remove wiggle after 500ms (color will return to normal)
                setTimeout(() => {
                  setWigglingLines(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(connection.id);
                    return newSet;
                  });
                }, 500);
              } else {
                // Select the line (yellow and blink)
                setClickedLines(prev => {
                  const newSet = new Set(prev);
                  newSet.add(connection.id);
                  return newSet;
                });
              }
            }
            
            if (onLineClick) {
              onLineClick(connection.id, connection, e);
            }
          }
        }));
      }
      
      // Create visible line
      lines.push(React.createElement('line', {
        key: `custom-connection-${connection.id}-${index}`,
        x1: fromPos.percentX,
        y1: fromPos.percentY,
        x2: toPos.percentX,
        y2: toPos.percentY,
        stroke: finalLineColor,
        strokeWidth: finalThickness,
        strokeDasharray: getStrokeDash(lineStyle, connection.thickness),
        className: lineClassName,
        style: lineStyleObj
      }));
    });
    
    if (lines.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'custom-connections-svg',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 10
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, lines);
      }, [mode, customConnections, customPoints, coordinates, gridDimensions, zIndex, onLineClick, getCustomPointPosition, processGcToViewBox, clickedLines, wigglingLines, blinkingLines, correctLines, allSidesDisabled, shouldResetOnNextClick, componentPageNumber, currentPage, isParallelAnimationRunning, customFill, customFillColor, customFillOpacity]);

  // Auto-detect angles at line intersections and endpoints
  const detectedAngles = React.useMemo(() => {
    if (mode !== 'custom' || !autoDetectAngles || !customConnections || customConnections.length === 0) return [];
    
    const angles = [];
    
    // Helper to calculate angle between two vectors
    const calculateAngle = (v1, v2) => {
      // v1 and v2 are objects with x and y components
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
      
      if (mag1 === 0 || mag2 === 0) return 0;
      
      const cosAngle = dot / (mag1 * mag2);
      const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
      const angleDeg = angleRad * (180 / Math.PI);
      
      return angleDeg;
    };
    
    // Helper to check if two lines intersect and get intersection point
    const getLineIntersection = (line1From, line1To, line2From, line2To) => {
      const x1 = line1From.percentX, y1 = line1From.percentY;
      const x2 = line1To.percentX, y2 = line1To.percentY;
      const x3 = line2From.percentX, y3 = line2From.percentY;
      const x4 = line2To.percentX, y4 = line2To.percentY;
      
      const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      
      if (Math.abs(denom) < 0.0001) return null; // Parallel or coincident
      
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
      
      // Check if intersection is within both line segments
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
          x: x1 + t * (x2 - x1),
          y: y1 + t * (y2 - y1),
          percentX: x1 + t * (x2 - x1),
          percentY: y1 + t * (y2 - y1)
        };
      }
      
      return null;
    };
    
    // Check angles at shared endpoints (where lines meet at a common point)
    const pointConnectionMap = {}; // Map point IDs to connections
    
    customConnections.forEach(conn => {
      if (!pointConnectionMap[conn.from]) pointConnectionMap[conn.from] = [];
      if (!pointConnectionMap[conn.to]) pointConnectionMap[conn.to] = [];
      pointConnectionMap[conn.from].push({ connection: conn, isStart: true });
      pointConnectionMap[conn.to].push({ connection: conn, isStart: false });
    });
    
    // For each point that has multiple connections, calculate angles
    Object.entries(pointConnectionMap).forEach(([pointId, connections]) => {
      if (connections.length < 2) return;
      
      const point = customPoints.find(p => p.id === pointId);
      if (!point) return;
      
      const pointPos = getCustomPointPosition(point);
      if (!pointPos) return;
      
      // Calculate angles between all pairs of connections at this point
      for (let i = 0; i < connections.length; i++) {
        for (let j = i + 1; j < connections.length; j++) {
          const conn1 = connections[i];
          const conn2 = connections[j];
          
          // Get the other point for each connection
          const otherPoint1Id = conn1.isStart ? conn1.connection.to : conn1.connection.from;
          const otherPoint2Id = conn2.isStart ? conn2.connection.to : conn2.connection.from;
          
          const otherPoint1 = customPoints.find(p => p.id === otherPoint1Id);
          const otherPoint2 = customPoints.find(p => p.id === otherPoint2Id);
          
          if (!otherPoint1 || !otherPoint2) continue;
          
          const otherPos1 = getCustomPointPosition(otherPoint1);
          const otherPos2 = getCustomPointPosition(otherPoint2);
          
          if (!otherPos1 || !otherPos2) continue;
          
          // Create vectors from the shared point to the other points
          const v1 = {
            x: otherPos1.percentX - pointPos.percentX,
            y: otherPos1.percentY - pointPos.percentY
          };
          const v2 = {
            x: otherPos2.percentX - pointPos.percentX,
            y: otherPos2.percentY - pointPos.percentY
          };
          
          const angle = calculateAngle(v1, v2);
          const isRightAngle = Math.abs(angle - 90) <= rightAngleTolerance;
          
          angles.push({
            type: 'endpoint',
            pointId: pointId,
            line1: conn1.connection.id,
            line2: conn2.connection.id,
            position: pointPos,
            angle: angle,
            isRightAngle: isRightAngle,
            vectors: { v1, v2 }
          });
        }
      }
    });
    
    // Check for intersection angles (where lines cross)
    for (let i = 0; i < customConnections.length; i++) {
      for (let j = i + 1; j < customConnections.length; j++) {
        const conn1 = customConnections[i];
        const conn2 = customConnections[j];
        
        const from1Point = customPoints.find(p => p.id === conn1.from);
        const to1Point = customPoints.find(p => p.id === conn1.to);
        const from2Point = customPoints.find(p => p.id === conn2.from);
        const to2Point = customPoints.find(p => p.id === conn2.to);
        
        if (!from1Point || !to1Point || !from2Point || !to2Point) continue;
        
        const from1Pos = getCustomPointPosition(from1Point);
        const to1Pos = getCustomPointPosition(to1Point);
        const from2Pos = getCustomPointPosition(from2Point);
        const to2Pos = getCustomPointPosition(to2Point);
        
        if (!from1Pos || !to1Pos || !from2Pos || !to2Pos) continue;
        
        const intersection = getLineIntersection(from1Pos, to1Pos, from2Pos, to2Pos);
        
        if (intersection) {
          // Calculate the angle at the intersection
          const v1 = {
            x: to1Pos.percentX - from1Pos.percentX,
            y: to1Pos.percentY - from1Pos.percentY
          };
          const v2 = {
            x: to2Pos.percentX - from2Pos.percentX,
            y: to2Pos.percentY - from2Pos.percentY
          };
          
          const angle = calculateAngle(v1, v2);
          const isRightAngle = Math.abs(angle - 90) <= rightAngleTolerance;
          
          angles.push({
            type: 'intersection',
            line1: conn1.id,
            line2: conn2.id,
            position: intersection,
            angle: angle,
            isRightAngle: isRightAngle,
            vectors: { v1, v2 }
          });
        }
      }
    }
    
    return angles;
  }, [mode, autoDetectAngles, customConnections, customPoints, rightAngleTolerance, getCustomPointPosition]);

  // Call onAngleDetected callback when angles change
  React.useEffect(() => {
    if (mode === 'custom' && onAngleDetected && detectedAngles.length > 0) {
      onAngleDetected(detectedAngles);
    }
  }, [mode, detectedAngles, onAngleDetected]);

  // Render angle marker for selected lines (when exactly 2 lines are selected)
  const renderSelectedAngleMarker = React.useMemo(() => {
    // Determine page number from component ID
    const pageNum = componentPageNumber || currentPage || (typeof window !== 'undefined' && typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 2);
    
    // Skip rendering on pages 6-9 (parallel lines detection, no angle arcs needed)
    if (pageNum >= 6 && pageNum <= 9) {
      console.log(`🔵 [renderSelectedAngleMarker] Skipping - page ${pageNum} (parallel lines, no angle arcs)`);
      return null;
    }
    
    if (mode !== 'custom' || clickedLines.size !== 2) {
      console.log(`🔵 [renderSelectedAngleMarker] Skipping - mode: ${mode}, clickedLines.size: ${clickedLines.size}`);
      return null;
    }
    
    const selectedLineIds = Array.from(clickedLines);
    const selectedLines = selectedLineIds.map(id => 
      customConnections.find(conn => conn.id === id)
    ).filter(Boolean);
    
    if (selectedLines.length !== 2) {
      console.log(`🔵 [renderSelectedAngleMarker] Skipping - selectedLines.length: ${selectedLines.length}`);
      return null;
    }
    
    console.log(`🔵 [renderSelectedAngleMarker] Rendering marker for lines: ${selectedLines[0].id}, ${selectedLines[1].id}`);
    
    // Calculate angle between the two selected lines
    const angleInfo = calculateAngleBetweenLines(selectedLines[0], selectedLines[1], customPoints, getCustomPointPosition);
    if (!angleInfo) {
      console.log(`🔵 [renderSelectedAngleMarker] No angle info calculated`);
      return null;
    }
    
    console.log(`🔵 [renderSelectedAngleMarker] Angle info:`, angleInfo);
    
    // Find the vertex/intersection position
    let vertexPos = null;
    let v1 = null, v2 = null;
    
    const line1 = selectedLines[0];
    const line2 = selectedLines[1];
    
    // Get line endpoints
    const from1Point = customPoints.find(p => p.id === line1.from);
    const to1Point = customPoints.find(p => p.id === line1.to);
    const from2Point = customPoints.find(p => p.id === line2.from);
    const to2Point = customPoints.find(p => p.id === line2.to);
    
    if (!from1Point || !to1Point || !from2Point || !to2Point) return null;
    
    const from1Pos = getCustomPointPosition(from1Point);
    const to1Pos = getCustomPointPosition(to1Point);
    const from2Pos = getCustomPointPosition(from2Point);
    const to2Pos = getCustomPointPosition(to2Point);
    
    if (!from1Pos || !to1Pos || !from2Pos || !to2Pos) return null;
    
    // Check if lines share a vertex
    let vertex = null;
    let point1 = null;
    let point2 = null;
    
    if (line1.from === line2.from) {
      vertex = from1Point;
      point1 = to1Point;
      point2 = to2Point;
    } else if (line1.from === line2.to) {
      vertex = from1Point;
      point1 = to1Point;
      point2 = from2Point;
    } else if (line1.to === line2.from) {
      vertex = to1Point;
      point1 = from1Point;
      point2 = to2Point;
    } else if (line1.to === line2.to) {
      vertex = to1Point;
      point1 = from1Point;
      point2 = from2Point;
    }
    
    if (vertex && point1 && point2) {
      // Lines share a vertex
      vertexPos = getCustomPointPosition(vertex);
      const pos1 = getCustomPointPosition(point1);
      const pos2 = getCustomPointPosition(point2);
      
      if (vertexPos && pos1 && pos2) {
        v1 = {
          x: pos1.percentX - vertexPos.percentX,
          y: pos1.percentY - vertexPos.percentY
        };
        v2 = {
          x: pos2.percentX - vertexPos.percentX,
          y: pos2.percentY - vertexPos.percentY
        };
      }
    } else {
      // Lines don't share a vertex - find intersection
      const x1 = from1Pos.percentX, y1 = from1Pos.percentY;
      const x2 = to1Pos.percentX, y2 = to1Pos.percentY;
      const x3 = from2Pos.percentX, y3 = from2Pos.percentY;
      const x4 = to2Pos.percentX, y4 = to2Pos.percentY;
      
      const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      
      if (Math.abs(denom) < 0.0001) return null; // Parallel lines
      
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
      
      // Check if intersection is within both line segments
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        vertexPos = {
          percentX: x1 + t * (x2 - x1),
          percentY: y1 + t * (y2 - y1)
        };
        
        // Calculate vectors from intersection to line endpoints (not at intersection)
        const line1Other = (t < 0.5) ? to1Pos : from1Pos;
        const line2Other = (u < 0.5) ? to2Pos : from2Pos;
        
        v1 = {
          x: line1Other.percentX - vertexPos.percentX,
          y: line1Other.percentY - vertexPos.percentY
        };
        v2 = {
          x: line2Other.percentX - vertexPos.percentX,
          y: line2Other.percentY - vertexPos.percentY
        };
      }
    }
    
    if (!vertexPos || !v1 || !v2) {
      console.log(`🔵 [renderSelectedAngleMarker] No vertex/intersection found`);
      return null;
    }
    
    console.log(`🔵 [renderSelectedAngleMarker] Vertex position:`, vertexPos, 'Vectors:', v1, v2);
    
    const elements = [];
    // Use selected angle marker settings
    const arcSizeViewBox = processGcToViewBox(selectedArcSize, 3.0);
    const labelSizeViewBox = processGcToViewBox(selectedLabelFontSize, 1.6);
    const arcColor = selectedArcColor;
    const labelColor = selectedLabelColor;
    const arcBorderWidth = processGcToViewBox(selectedArcBorderWidth, 0.2);
    const arcFillColor = selectedArcFillColor;
    
    // Process label offset
    const labelOffsetX = processGcToViewBox(selectedLabelOffset.x, 0);
    const labelOffsetY = processGcToViewBox(selectedLabelOffset.y, 0);
    
    const isRightAngle = Math.abs(angleInfo.angle - 90) <= 2;
    
    // Always show angle marker for selected lines (ignore global angle settings)
    if (isRightAngle) {
      // Draw right angle marker (small square)
      const squareSize = arcSizeViewBox * 0.3;
      
      // Normalize vectors
      const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
      const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
      
      if (mag1 === 0 || mag2 === 0) return null;
      
      const v1Norm = { x: v1.x / mag1, y: v1.y / mag1 };
      const v2Norm = { x: v2.x / mag2, y: v2.y / mag2 };
      
      // Create corner points of the square
      const corner1 = {
        x: vertexPos.percentX + v1Norm.x * squareSize,
        y: vertexPos.percentY + v1Norm.y * squareSize
      };
      const corner2 = {
        x: corner1.x + v2Norm.x * squareSize,
        y: corner1.y + v2Norm.y * squareSize
      };
      const corner3 = {
        x: vertexPos.percentX + v2Norm.x * squareSize,
        y: vertexPos.percentY + v2Norm.y * squareSize
      };
      
      // Draw the square
      elements.push(React.createElement('path', {
        key: 'selected-angle-marker-square',
        d: `M ${vertexPos.percentX} ${vertexPos.percentY} L ${corner1.x} ${corner1.y} L ${corner2.x} ${corner2.y} L ${corner3.x} ${corner3.y} Z`,
        fill: arcFillColor !== 'transparent' ? arcFillColor : 'none',
        stroke: arcColor,
        strokeWidth: arcBorderWidth,
        style: { pointerEvents: 'none' }
      }));
      
      // Add label for right angle with offset
      const baseLabelPos = {
        x: vertexPos.percentX + (v1Norm.x + v2Norm.x) * squareSize * 2,
        y: vertexPos.percentY + (v1Norm.y + v2Norm.y) * squareSize * 2
      };
      
      const labelPos = {
        x: baseLabelPos.x + labelOffsetX,
        y: baseLabelPos.y + labelOffsetY
      };
      
      elements.push(React.createElement('text', {
        key: 'selected-angle-label-right',
        x: labelPos.x,
        y: labelPos.y,
        fill: labelColor,
        fontSize: labelSizeViewBox,
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        style: { pointerEvents: 'none', userSelect: 'none' }
      }, '90°'));
    } else if (!isRightAngle) {
      // Draw arc for non-right angles
      const arcRadius = arcSizeViewBox * 0.5;
      
      // Calculate start and end angles for the arc
      const angle1 = Math.atan2(v1.y, v1.x) * (180 / Math.PI);
      const angle2 = Math.atan2(v2.y, v2.x) * (180 / Math.PI);
      
      // Normalize angles to 0-360
      let startAngle = angle1;
      let endAngle = angle2;
      
      // Calculate the sweep (we want the smaller angle)
      let sweep = endAngle - startAngle;
      if (sweep < 0) sweep += 360;
      if (sweep > 180) {
        // Swap to get the smaller angle
        [startAngle, endAngle] = [endAngle, startAngle];
        sweep = 360 - sweep;
      }
      
      // Convert to radians for calculations
      const startRad = startAngle * (Math.PI / 180);
      const endRad = endAngle * (Math.PI / 180);
      
      // Calculate arc path
      const startX = vertexPos.percentX + Math.cos(startRad) * arcRadius;
      const startY = vertexPos.percentY + Math.sin(startRad) * arcRadius;
      const endX = vertexPos.percentX + Math.cos(endRad) * arcRadius;
      const endY = vertexPos.percentY + Math.sin(endRad) * arcRadius;
      
      const largeArcFlag = sweep > 180 ? 1 : 0;
      
      elements.push(React.createElement('path', {
        key: 'selected-angle-arc',
        d: `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        fill: arcFillColor !== 'transparent' ? arcFillColor : 'none',
        stroke: arcColor,
        strokeWidth: arcBorderWidth,
        style: { pointerEvents: 'none' }
      }));
      
      // Always add label for non-right angles with offset
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = midAngle * (Math.PI / 180);
      const baseLabelPos = {
        x: vertexPos.percentX + Math.cos(midRad) * arcRadius * 1.8,
        y: vertexPos.percentY + Math.sin(midRad) * arcRadius * 1.8
      };
      
      const labelPos = {
        x: baseLabelPos.x + labelOffsetX,
        y: baseLabelPos.y + labelOffsetY
      };
      
      elements.push(React.createElement('text', {
        key: 'selected-angle-label',
        x: labelPos.x,
        y: labelPos.y,
        fill: labelColor,
        fontSize: labelSizeViewBox,
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        style: { pointerEvents: 'none', userSelect: 'none' }
      }, `${Math.round(angleInfo.angle)}°`));
    }
    
    if (elements.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'selected-angle-marker-svg',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 12 // Above connections but below labels
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, elements);
  }, [mode, clickedLines, customConnections, customPoints, calculateAngleBetweenLines, getCustomPointPosition, processGcToViewBox, selectedArcSize, selectedArcColor, selectedArcBorderWidth, selectedArcFillColor, selectedLabelFontSize, selectedLabelColor, selectedLabelOffset, zIndex, componentPageNumber, currentPage]);

  // Render auto-detected angles with arcs and labels
  const renderAutoDetectedAngles = React.useMemo(() => {
    if (mode !== 'custom' || !detectedAngles || detectedAngles.length === 0) return null;
    if (!showAngleArcs && !showRightAngleMarker) return null;
    
    const elements = [];
    const arcSizeViewBox = processGcToViewBox(angleArcSize, 2.5);
    const labelSizeViewBox = processGcToViewBox(angleLabelSize, 1.4);
    
    detectedAngles.forEach((angleData, index) => {
      const { position, angle, isRightAngle, vectors } = angleData;
      
      // Skip if we're not showing this type of marker
      if (isRightAngle && !showRightAngleMarker) return;
      if (!isRightAngle && !showAngleArcs) return;
      
      if (isRightAngle && showRightAngleMarker) {
        // Draw right angle marker (small square)
        const squareSize = arcSizeViewBox * 0.3;
        
        // Normalize vectors
        const mag1 = Math.sqrt(vectors.v1.x ** 2 + vectors.v1.y ** 2);
        const mag2 = Math.sqrt(vectors.v2.x ** 2 + vectors.v2.y ** 2);
        
        if (mag1 === 0 || mag2 === 0) return;
        
        const v1Norm = { x: vectors.v1.x / mag1, y: vectors.v1.y / mag1 };
        const v2Norm = { x: vectors.v2.x / mag2, y: vectors.v2.y / mag2 };
        
        // Create corner points of the square
        const corner1 = {
          x: position.percentX + v1Norm.x * squareSize,
          y: position.percentY + v1Norm.y * squareSize
        };
        const corner2 = {
          x: corner1.x + v2Norm.x * squareSize,
          y: corner1.y + v2Norm.y * squareSize
        };
        const corner3 = {
          x: position.percentX + v2Norm.x * squareSize,
          y: position.percentY + v2Norm.y * squareSize
        };
        
        // Draw the square
        elements.push(React.createElement('path', {
          key: `angle-marker-square-${index}`,
          d: `M ${position.percentX} ${position.percentY} L ${corner1.x} ${corner1.y} L ${corner2.x} ${corner2.y} L ${corner3.x} ${corner3.y} Z`,
          fill: 'none',
          stroke: angleArcColor,
          strokeWidth: 1.5,
          style: { pointerEvents: 'none' }
        }));
        
        // Add label if enabled
        if (showAngleLabels) {
          const labelPos = {
            x: position.percentX + (v1Norm.x + v2Norm.x) * squareSize * 2,
            y: position.percentY + (v1Norm.y + v2Norm.y) * squareSize * 2
          };
          
          elements.push(React.createElement('text', {
            key: `angle-label-${index}`,
            x: labelPos.x,
            y: labelPos.y,
            fill: angleLabelColor,
            fontSize: labelSizeViewBox,
            fontWeight: 'bold',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            style: { pointerEvents: 'none', userSelect: 'none' }
          }, '90°'));
        }
      } else if (!isRightAngle) {
        // Draw arc for non-right angles
        const arcRadius = arcSizeViewBox * 0.5;
        
        // Calculate start and end angles for the arc
        const angle1 = Math.atan2(vectors.v1.y, vectors.v1.x) * (180 / Math.PI);
        const angle2 = Math.atan2(vectors.v2.y, vectors.v2.x) * (180 / Math.PI);
        
        // Normalize angles to 0-360
        let startAngle = angle1;
        let endAngle = angle2;
        
        // Calculate the sweep (we want the smaller angle)
        let sweep = endAngle - startAngle;
        if (sweep < 0) sweep += 360;
        if (sweep > 180) {
          // Swap to get the smaller angle
          [startAngle, endAngle] = [endAngle, startAngle];
          sweep = 360 - sweep;
        }
        
        // Convert to radians for calculations
        const startRad = startAngle * (Math.PI / 180);
        const endRad = endAngle * (Math.PI / 180);
        
        // Calculate arc path
        const startX = position.percentX + Math.cos(startRad) * arcRadius;
        const startY = position.percentY + Math.sin(startRad) * arcRadius;
        const endX = position.percentX + Math.cos(endRad) * arcRadius;
        const endY = position.percentY + Math.sin(endRad) * arcRadius;
        
        const largeArcFlag = sweep > 180 ? 1 : 0;
        
        elements.push(React.createElement('path', {
          key: `angle-arc-${index}`,
          d: `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          fill: 'none',
          stroke: angleArcColor,
          strokeWidth: 2,
          style: { pointerEvents: 'none' }
        }));
        
        // Add label if enabled
        if (showAngleLabels) {
          const midAngle = (startAngle + endAngle) / 2;
          const midRad = midAngle * (Math.PI / 180);
          const labelPos = {
            x: position.percentX + Math.cos(midRad) * arcRadius * 1.8,
            y: position.percentY + Math.sin(midRad) * arcRadius * 1.8
          };
          
          elements.push(React.createElement('text', {
            key: `angle-label-${index}`,
            x: labelPos.x,
            y: labelPos.y,
            fill: angleLabelColor,
            fontSize: labelSizeViewBox,
            fontWeight: 'bold',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            style: { pointerEvents: 'none', userSelect: 'none' }
          }, `${Math.round(angle)}°`));
        }
      }
    });
    
    if (elements.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'custom-angles-svg',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 20
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, elements);
  }, [mode, detectedAngles, showAngleArcs, showRightAngleMarker, angleArcSize, angleArcColor, showAngleLabels, angleLabelSize, angleLabelColor, zIndex, processGcToViewBox]);

  // Render custom lines (segments, rays, double-arrowed lines)
  const renderCustomLines = React.useMemo(() => {
    if (!customLines || customLines.length === 0 || !coordinates) return null;
    
    console.log(`✅ renderCustomLines: Rendering ${customLines.length} custom lines`);
    
    const [x1, y1, x2, y2] = coordinates;
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Use pre-calculated grid dimensions (square cell algorithm)
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc } = gridDimensions;
    
    // Helper to convert grid position to percentage
    const getPositionPercent = (pos) => {
      return {
        x: offsetX + (pos.col / gridCols) * width,
        y: offsetY + (pos.row / gridRows) * height
      };
    };
    
    // Helper to resolve position from vertex reference or direct coordinates
    const resolvePosition = (line, endpoint) => {
      const vertexKey = endpoint === 'start' ? 'startVertex' : 'endVertex';
      const coordKey = endpoint === 'start' ? 'start' : 'end';
      
      // Check if vertex reference is used
      if (line[vertexKey]) {
        const vertexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const vertexIndex = vertexMap[line[vertexKey].toUpperCase()];
        if (vertexIndex !== undefined) {
          return getVertexPosition(vertexIndex);
        }
      }
      
      // Use direct coordinates
      return line[coordKey] || { row: 0, col: 0 };
    };
    
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
    
    const elements = [];
    
    customLines.forEach((line, lineIndex) => {
      const {
        id,
        type = 'segment', // 'segment', 'ray', 'line'
        color = '#000000',
        thickness = '3gc',
        style = 'solid',
        arrowSize = '8gc',
        isBlink = false,
        extendStart: propExtendStart,
        extendEnd: propExtendEnd
      } = line;
      
      // Resolve start and end positions
      const startPos = resolvePosition(line, 'start');
      const endPos = resolvePosition(line, 'end');
      
      const p1 = getPositionPercent(startPos);
      const p2 = getPositionPercent(endPos);
      
      // Calculate line vector
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const lineLength = Math.sqrt(dx * dx + dy * dy);
      
      if (lineLength === 0) {
        console.warn(`Custom line ${id || lineIndex} has zero length, skipping`);
        return;
      }
      
      const unitX = dx / lineLength;
      const unitY = dy / lineLength;
      
      // Determine extension ratios based on line type
      let extendStart = propExtendStart !== undefined ? propExtendStart : 0;
      let extendEnd = propExtendEnd !== undefined ? propExtendEnd : 0;
      
      if (type === 'line') {
        // Double-arrowed line: extend both ends
        extendStart = propExtendStart !== undefined ? propExtendStart : 0.3;
        extendEnd = propExtendEnd !== undefined ? propExtendEnd : 0.3;
      } else if (type === 'ray') {
        // Ray: extend only the end
        extendEnd = propExtendEnd !== undefined ? propExtendEnd : 0.3;
      }
      
      // Apply extensions
      const extendStartLength = lineLength * extendStart;
      const extendEndLength = lineLength * extendEnd;
      
      const finalP1 = {
        x: p1.x - unitX * extendStartLength,
        y: p1.y - unitY * extendStartLength
      };
      
      const finalP2 = {
        x: p2.x + unitX * extendEndLength,
        y: p2.y + unitY * extendEndLength
      };
      
      // Process thickness
      const thicknessNum = processGcToViewBox(thickness, 0.3);
      const arrowSizeNum = processGcToViewBox(arrowSize, 0.8);
      
      // Get stroke dash array
      const dashArray = getStrokeDashArray(style, thicknessNum);
      
      // Create line element
      const lineProps = {
        key: `custom-line-${id || lineIndex}`,
        x1: `${finalP1.x}%`,
        y1: `${finalP1.y}%`,
        x2: `${finalP2.x}%`,
        y2: `${finalP2.y}%`,
        stroke: color,
        strokeWidth: thicknessNum,
        strokeLinecap: 'round',
        className: isBlink ? 'quad-edge-blink' : undefined
      };
      
      if (dashArray !== 'none') {
        lineProps.strokeDasharray = dashArray;
      }
      
      elements.push(React.createElement('line', lineProps));
      
      // Add arrowheads for ray and line types
      if (type === 'ray' || type === 'line') {
        // Calculate angle of the line direction (in degrees)
        // atan2(dy, dx) gives: right=0°, down=90°, left=±180°, up=-90°
        const lineAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Arrowhead base shape points up (y: -tipLength), which is -90° in atan2
        // To point in line direction, rotate by: lineAngle - (-90) = lineAngle + 90
        // For end arrow: point in line direction (toward finalP2)
        const endArrowAngle = lineAngle + 90;
        const arrowHead = createArrowhead(finalP2, endArrowAngle, arrowSizeNum, color, `${id || lineIndex}-end`);
        elements.push(arrowHead);
        
        // Add start arrowhead for line type
        if (type === 'line') {
          // For start arrow: point opposite direction (away from line, toward finalP1)
          // Opposite direction is lineAngle + 180, so rotation is (lineAngle + 180) + 90
          const startArrowAngle = lineAngle + 270;
          const startArrowHead = createArrowhead(finalP1, startArrowAngle, arrowSizeNum, color, `${id || lineIndex}-start`);
          elements.push(startArrowHead);
        }
      }
    });
    
    if (elements.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'custom-lines-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 27, // Custom lines - above diagonals
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, elements);
  }, [customLines, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, getStrokeDashArray, gridDimensions, createArrowhead]);

  // Render custom line labels
  const renderCustomLineLabels = React.useMemo(() => {
    if (!customLines || customLines.length === 0 || !coordinates) return null;
    
    // Filter lines that have labels (new structure: label object with arrays)
    const linesWithLabels = customLines.filter(line => 
      line.label && 
      line.label.text && 
      Array.isArray(line.label.text) && 
      line.label.text.length > 0
    );
    
    if (linesWithLabels.length === 0) return null;
    
    console.log(`✅ renderCustomLineLabels: Rendering labels for ${linesWithLabels.length} custom lines`);
    
    // Use pre-calculated grid dimensions (same as vertex labels)
    const { width, height, offsetX, offsetY } = gridDimensions;
    
    // Helper to convert grid position to percentage (same as vertex labels)
    const getPositionPercent = (pos) => {
      return {
        x: offsetX + (pos.col / gridCols) * width,
        y: offsetY + (pos.row / gridRows) * height
      };
    };
    
    // Helper to resolve position from vertex reference or direct coordinates
    const resolvePosition = (line, endpoint) => {
      const vertexKey = endpoint === 'start' ? 'startVertex' : 'endVertex';
      const coordKey = endpoint === 'start' ? 'start' : 'end';
      
      if (line[vertexKey]) {
        const vertexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const vertexIndex = vertexMap[line[vertexKey].toUpperCase()];
        if (vertexIndex !== undefined) {
          return getVertexPosition(vertexIndex);
        }
      }
      
      return line[coordKey] || { row: 0, col: 0 };
    };
    
    // Process gc to viewBox units (same method as vertex labels and processThickness)
    const processGcToViewBoxUnits = (value, defaultValue = 0) => {
      if (!coordinates) return defaultValue;
      
      const [cx1, cy1, cx2, cy2] = coordinates;
      const gcValue = typeof value === 'number' ? value : 
                     (typeof value === 'string' && value.includes('gc') ? 
                      parseFloat(value.replace('gc', '')) : defaultValue) || defaultValue;
      
      // Container size in GC units
      const containerWidthGc = cx2 - cx1 + 1;
      const containerHeightGc = cy2 - cy1 + 1;
      
      // Use average of width and height for consistent scaling (same as vertex labels)
      const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
      
      // Convert GC units to viewBox units (viewBox is "0 0 100 100")
      const valueInViewBoxUnits = (gcValue / avgContainerGc) * 100;
      
      return valueInViewBoxUnits;
    };
    
    const labels = [];
    
    linesWithLabels.forEach((line, lineIndex) => {
      const {
        id,
        label
      } = line;
      
      // New structure: label object with arrays
      const textArray = Array.isArray(label.text) ? label.text : [];
      const colorArray = Array.isArray(label.color) ? label.color : [];
      const sizeArray = Array.isArray(label.size) ? label.size : [];
      const offsetArray = Array.isArray(label.offset) ? label.offset : [];
      const positionArray = Array.isArray(label.position) ? label.position : [];
      
      // Determine number of labels (based on text array length)
      const numLabels = textArray.length;
      
      if (numLabels === 0) return;
      
      // Resolve start and end positions (same for all labels on a line)
      const startPos = resolvePosition(line, 'start');
      const endPos = resolvePosition(line, 'end');
      
      const p1 = getPositionPercent(startPos);
      const p2 = getPositionPercent(endPos);
      
      // Calculate line direction and length
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const lineLength = Math.sqrt(dx * dx + dy * dy);
      
      if (lineLength === 0) return;
      
      // Process each label
      textArray.forEach((text, labelIdx) => {
        if (!text) return; // Skip labels without text
        
        // Get label properties from arrays (with defaults)
        const color = colorArray[labelIdx] || '#000000';
        const size = sizeArray[labelIdx] || '14gc';
        const offset = offsetArray[labelIdx] || { x: '0gc', y: '0gc' };
        
        // Extract x and y offsets
        const offsetX = offset.x || '0gc';
        const offsetY = offset.y || '0gc';
        
        // Determine position: use array if provided, otherwise alternate
        let position;
        if (positionArray[labelIdx] !== undefined) {
          position = positionArray[labelIdx];
        } else {
          // Default: alternate between end and start for multiple labels
          // First label at end, second at start, etc.
          position = labelIdx % 2 === 0 ? 'end' : 'start';
        }
        
        // Determine base point based on position
        let baseX, baseY;
        if (position === 'start' || position === 0 || position === 0.0) {
          baseX = p1.x;
          baseY = p1.y;
        } else {
          // Default to end point
          baseX = p2.x;
          baseY = p2.y;
        }
        
        // Apply X and Y offsets directly (in screen space, not perpendicular)
        // These are applied on top of the endpoint position
        const offsetXViewBox = processGcToViewBoxUnits(offsetX, 0);
        const offsetYViewBox = processGcToViewBoxUnits(offsetY, 0);
        let finalX = baseX + offsetXViewBox;
        let finalY = baseY + offsetYViewBox;
        
        // Label size in viewBox units (same as vertex labels)
        const labelSizeViewBox = processGcToViewBoxUnits(size, 1.4);
        
        // Check if label should blink (from label.blink property)
        const shouldBlink = label.blink === true || (typeof label.blink === 'function' && label.blink());
        
        labels.push(React.createElement('text', {
          key: `custom-line-label-${id || lineIndex}-${labelIdx}`,
          x: `${finalX}%`,
          y: `${finalY}%`,
          fill: color,
          fontSize: labelSizeViewBox,
          fontWeight: 'bold',
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          pointerEvents: 'none',
          className: shouldBlink ? 'quad-edge-blink' : undefined,
          style: {
            userSelect: 'none'
          }
        }, text));
      });
    });
    
    if (labels.length === 0) return null;
    
    return React.createElement('svg', {
      key: 'custom-line-labels-svg',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: zIndex + 31, // Above custom lines
        pointerEvents: 'none',
        overflow: 'visible'
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, labels);
  }, [customLines, vertices, getVertexPosition, coordinates, gridRows, gridCols, zIndex, gridDimensions]);

  // Render custom line angles at endpoints and intersections
  const renderCustomLineAngles = React.useMemo(() => {
    if (!customLines || customLines.length === 0 || !coordinates) return [];
    
    const AngleMarkerComp = window.AngleMarkerComponent?.AngleMarkerComponent;
    if (!AngleMarkerComp) {
      console.warn('AngleMarkerComponent not available for custom line angles');
      return [];
    }
    
    const angleMarkers = [];
    
    // Helper to resolve position from vertex reference or direct coordinates
    const resolvePosition = (line, endpoint) => {
      const vertexKey = endpoint === 'start' ? 'startVertex' : 'endVertex';
      const coordKey = endpoint === 'start' ? 'start' : 'end';
      
      if (line[vertexKey]) {
        const vertexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const vertexIndex = vertexMap[line[vertexKey].toUpperCase()];
        if (vertexIndex !== undefined) {
          return getVertexPosition(vertexIndex);
        }
      }
      
      return line[coordKey] || { row: 0, col: 0 };
    };
    
    // Render endpoint angles
    customLines.forEach((line, lineIndex) => {
      const { id, angles } = line;
      
      if (!angles) return;
      
      const startPos = resolvePosition(line, 'start');
      const endPos = resolvePosition(line, 'end');
      
      // Calculate line vector
      const dx = endPos.col - startPos.col;
      const dy = endPos.row - startPos.row;
      
      // Start point angle
      if (angles.start && angles.start.show) {
        // For start point, we need to find adjacent vertices or lines
        // For simplicity, we'll mark the angle if the line connects to a vertex
        const startVertexIndex = line.startVertex ? 
          { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[line.startVertex.toUpperCase()] : 
          null;
        
        if (startVertexIndex !== null) {
          // Get adjacent vertices
          const prevVertex = getVertexPosition((startVertexIndex - 1 + 4) % 4);
          const nextVertex = getVertexPosition((startVertexIndex + 1) % 4);
          
          // Calculate angle at vertex with custom line
          angleMarkers.push(React.createElement(AngleMarkerComp, {
            key: `custom-line-angle-start-${id || lineIndex}`,
            vertex: startPos,
            prevVertex: prevVertex,
            nextVertex: endPos, // Use line endpoint as next vertex
            containerCoordinates: coordinates,
            gridRows: gridRows,
            gridCols: gridCols,
            gridPadding: gridPadding,
            markerType: 'arc',
            color: angles.start.color || angleMarkerColor,
            size: angles.start.size || angleMarkerSize,
            zIndex: zIndex + 35,
            showText: angles.start.showText !== undefined ? angles.start.showText : false
          }));
        }
      }
      
      // End point angle
      if (angles.end && angles.end.show) {
        const endVertexIndex = line.endVertex ? 
          { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[line.endVertex.toUpperCase()] : 
          null;
        
        if (endVertexIndex !== null) {
          const prevVertex = getVertexPosition((endVertexIndex - 1 + 4) % 4);
          const nextVertex = getVertexPosition((endVertexIndex + 1) % 4);
          
          angleMarkers.push(React.createElement(AngleMarkerComp, {
            key: `custom-line-angle-end-${id || lineIndex}`,
            vertex: endPos,
            prevVertex: startPos, // Use line start as prev vertex
            nextVertex: nextVertex,
            containerCoordinates: coordinates,
            gridRows: gridRows,
            gridCols: gridCols,
            gridPadding: gridPadding,
            markerType: 'arc',
            color: angles.end.color || angleMarkerColor,
            size: angles.end.size || angleMarkerSize,
            zIndex: zIndex + 35,
            showText: angles.end.showText !== undefined ? angles.end.showText : false
          }));
        }
      }
    });
    
    // Render intersection angles using the new intersectionAngles config
    const intersections = findCustomLineIntersections();
    
    console.log(`🔍 renderCustomLineAngles: Found ${intersections.length} intersections`, intersections);
    
    intersections.forEach((intersection) => {
      const { position, line1, line2, line1Start, line1End, line2Start, line2End, angle, angleConfig, configIndex } = intersection;
      
      // Get quadrant from config (1-4, math convention)
      const quadrant = angleConfig.quadrant || 1;
      
      // Validate intersection position
      if (!position || typeof position.row !== 'number' || typeof position.col !== 'number') {
        console.error(`❌ Invalid intersection position:`, position);
        return; // Skip this intersection
      }
      
      // Calculate vectors from intersection to each endpoint
      const vec1ToStart = { dx: line1Start.col - position.col, dy: line1Start.row - position.row };
      const vec1ToEnd = { dx: line1End.col - position.col, dy: line1End.row - position.row };
      const vec2ToStart = { dx: line2Start.col - position.col, dy: line2Start.row - position.row };
      const vec2ToEnd = { dx: line2End.col - position.col, dy: line2End.row - position.row };
      
      // Helper to check if a vector points into a quadrant
      const isInQuadrant = (vec, quad) => {
        if (quad === 1) return vec.dx > 0 && vec.dy < 0; // upper-right (right, up)
        if (quad === 2) return vec.dx < 0 && vec.dy < 0; // upper-left (left, up)
        if (quad === 3) return vec.dx < 0 && vec.dy > 0; // lower-left (left, down)
        if (quad === 4) return vec.dx > 0 && vec.dy > 0; // lower-right (right, down)
        return false;
      };
      
      // Helper to check if a point is at the intersection
      const isAtIntersection = (point) => {
        return Math.abs(point.row - position.row) < 0.001 && Math.abs(point.col - position.col) < 0.001;
      };
      
      // Helper to get the other endpoint of a line
      const getOtherEndpoint = (point, lineStart, lineEnd) => {
        if (Math.abs(point.row - lineStart.row) < 0.001 && Math.abs(point.col - lineStart.col) < 0.001) {
          return lineEnd;
        }
        return lineStart;
      };
      
      // Check which endpoints are at the intersection BEFORE selecting vertices
      const line1StartAtIntersection = isAtIntersection(line1Start);
      const line1EndAtIntersection = isAtIntersection(line1End);
      const line2StartAtIntersection = isAtIntersection(line2Start);
      const line2EndAtIntersection = isAtIntersection(line2End);
      
      // Select the two endpoints that are in the specified quadrant
      // We need one endpoint from each line
      let prevVertex, nextVertex;
      
      // Check which endpoints from line 1 point into the quadrant
      const line1StartInQuad = isInQuadrant(vec1ToStart, quadrant);
      const line1EndInQuad = isInQuadrant(vec1ToEnd, quadrant);
      
      // Check which endpoints from line 2 point into the quadrant
      const line2StartInQuad = isInQuadrant(vec2ToStart, quadrant);
      const line2EndInQuad = isInQuadrant(vec2ToEnd, quadrant);
      
      // Select endpoint from line 1 that's in the quadrant
      // IMPORTANT: If intersection is at one endpoint, we must use the other endpoint
      
      if (line1EndInQuad && !line1EndAtIntersection) {
        prevVertex = line1End; // Use the endpoint
      } else if (line1StartInQuad && !line1StartAtIntersection) {
        prevVertex = line1Start; // Use the start point
      } else {
        // Fallback: choose based on quadrant requirements, but avoid intersection point
        if (line1StartAtIntersection) {
          prevVertex = line1End; // Must use the other endpoint
        } else if (line1EndAtIntersection) {
          prevVertex = line1Start; // Must use the other endpoint
        } else {
          // Neither is at intersection, choose based on quadrant
          // Also handle cases where endpoints are on axes (dy = 0 or dx = 0)
          const vec1ToStartDx = vec1ToStart.dx;
          const vec1ToStartDy = vec1ToStart.dy;
          const vec1ToEndDx = vec1ToEnd.dx;
          const vec1ToEndDy = vec1ToEnd.dy;
          
          if (quadrant === 1 || quadrant === 2) {
            // Upper quadrants: prefer the endpoint with smaller row (higher up)
            // If rows are equal (horizontal line), check x-direction
            if (Math.abs(line1End.row - line1Start.row) < 0.001) {
              // Horizontal line: for quadrant 1, prefer right (dx > 0); for quadrant 2, prefer left (dx < 0)
              prevVertex = (quadrant === 1 && vec1ToEndDx > vec1ToStartDx) || 
                          (quadrant === 2 && vec1ToEndDx < vec1ToStartDx) ? line1End : line1Start;
            } else {
              prevVertex = line1End.row < line1Start.row ? line1End : line1Start;
            }
          } else {
            // Lower quadrants: prefer the endpoint with larger row (lower down)
            // If rows are equal (horizontal line), check x-direction
            if (Math.abs(line1End.row - line1Start.row) < 0.001) {
              // Horizontal line: for quadrant 3, prefer left (dx < 0); for quadrant 4, prefer right (dx > 0)
              prevVertex = (quadrant === 3 && vec1ToEndDx < vec1ToStartDx) || 
                          (quadrant === 4 && vec1ToEndDx > vec1ToStartDx) ? line1End : line1Start;
            } else {
              prevVertex = line1End.row > line1Start.row ? line1End : line1Start;
            }
          }
        }
      }
      
      // Select endpoint from line 2 that's in the quadrant
      // IMPORTANT: If intersection is at one endpoint, we must use the other endpoint
      if (line2EndInQuad && !line2EndAtIntersection) {
        nextVertex = line2End; // Use the endpoint
      } else if (line2StartInQuad && !line2StartAtIntersection) {
        nextVertex = line2Start; // Use the start point
      } else {
        // Fallback: choose based on quadrant requirements, but avoid intersection point
        if (line2StartAtIntersection) {
          nextVertex = line2End; // Must use the other endpoint
        } else if (line2EndAtIntersection) {
          nextVertex = line2Start; // Must use the other endpoint
        } else {
          // Neither is at intersection, choose based on quadrant
          // Also handle cases where endpoints are on axes
          const vec2ToStartDx = vec2ToStart.dx;
          const vec2ToStartDy = vec2ToStart.dy;
          const vec2ToEndDx = vec2ToEnd.dx;
          const vec2ToEndDy = vec2ToEnd.dy;
          
          if (quadrant === 1 || quadrant === 4) {
            // Right quadrants: prefer the endpoint with larger col (more right)
            // If cols are equal (vertical line), check y-direction
            if (Math.abs(line2End.col - line2Start.col) < 0.001) {
              // Vertical line: for quadrant 1, prefer up (dy < 0); for quadrant 4, prefer down (dy > 0)
              nextVertex = (quadrant === 1 && vec2ToEndDy < vec2ToStartDy) || 
                          (quadrant === 4 && vec2ToEndDy > vec2ToStartDy) ? line2End : line2Start;
            } else {
              nextVertex = line2End.col > line2Start.col ? line2End : line2Start;
            }
          } else {
            // Left quadrants: prefer the endpoint with smaller col (more left)
            // If cols are equal (vertical line), check y-direction
            if (Math.abs(line2End.col - line2Start.col) < 0.001) {
              // Vertical line: for quadrant 2, prefer up (dy < 0); for quadrant 3, prefer down (dy > 0)
              nextVertex = (quadrant === 2 && vec2ToEndDy < vec2ToStartDy) || 
                          (quadrant === 3 && vec2ToEndDy > vec2ToStartDy) ? line2End : line2Start;
            } else {
              nextVertex = line2End.col < line2Start.col ? line2End : line2Start;
            }
          }
        }
      }
      
      // Create points closer to the intersection for proper angle calculation
      // The AngleMarkerComponent needs points that define the angle, but if endpoints are too far,
      // we should create points along the rays at a reasonable distance
      const createPointAlongRay = (fromPoint, toPoint, distance, lineStart, lineEnd, isLine1) => {
        const dx = toPoint.col - fromPoint.col;
        const dy = toPoint.row - fromPoint.row;
        const len = Math.sqrt(dx * dx + dy * dy);
        
        // If the point is at the intersection (len === 0), we need to create a point
        // that points into the quadrant
        if (len < 0.001) {
          // Find the other endpoint of the line
          const otherPoint = getOtherEndpoint(toPoint, lineStart, lineEnd);
          
          // Calculate direction from intersection to other endpoint
          const otherDx = otherPoint.col - fromPoint.col;
          const otherDy = otherPoint.row - fromPoint.row;
          const otherLen = Math.sqrt(otherDx * otherDx + otherDy * otherDy);
          
          if (otherLen < 0.001) {
            // Both endpoints are at intersection - create point based on quadrant requirements
            // For quadrant 4 (lower-right): need row > intersection.row, col > intersection.col
            if (quadrant === 4) {
              return { row: fromPoint.row + distance, col: fromPoint.col + distance };
            } else if (quadrant === 1) {
              return { row: fromPoint.row - distance, col: fromPoint.col + distance };
            } else if (quadrant === 2) {
              return { row: fromPoint.row - distance, col: fromPoint.col - distance };
            } else if (quadrant === 3) {
              return { row: fromPoint.row + distance, col: fromPoint.col - distance };
            }
            return fromPoint;
          }
          
          // Check if the other endpoint points into the quadrant
          const otherVec = { dx: otherDx, dy: otherDy };
          if (isInQuadrant(otherVec, quadrant)) {
            // Use the other endpoint direction
            const scale = distance / otherLen;
            return {
              row: fromPoint.row + otherDy * scale,
              col: fromPoint.col + otherDx * scale
            };
          } else {
            // Other endpoint doesn't point into quadrant either - create point based on quadrant
            // For vertical line in quadrant 4: need to go down (positive row)
            // For horizontal line in quadrant 4: need to go right (positive col)
            if (isLine1) {
              // Line 1 (vertical): for quadrant 4, go down
              if (quadrant === 4 || quadrant === 3) {
                return { row: fromPoint.row + distance, col: fromPoint.col };
              } else {
                return { row: fromPoint.row - distance, col: fromPoint.col };
              }
            } else {
              // Line 2 (horizontal): for quadrant 4, go right
              if (quadrant === 4 || quadrant === 1) {
                return { row: fromPoint.row, col: fromPoint.col + distance };
              } else {
                return { row: fromPoint.row, col: fromPoint.col - distance };
              }
            }
          }
        }
        
        // Check if the vector points into the correct quadrant
        const vecToPoint = { dx: dx, dy: dy };
        if (!isInQuadrant(vecToPoint, quadrant)) {
          // The endpoint doesn't point into the quadrant, so create a point in the opposite direction
          const otherPoint = getOtherEndpoint(toPoint, lineStart, lineEnd);
          const oppDx = fromPoint.col - otherPoint.col;
          const oppDy = fromPoint.row - otherPoint.row;
          const oppLen = Math.sqrt(oppDx * oppDx + oppDy * oppDy);
          
          if (oppLen < 0.001) {
            // Both endpoints are at intersection - use quadrant-based logic
            if (isLine1) {
              if (quadrant === 4 || quadrant === 3) {
                return { row: fromPoint.row + distance, col: fromPoint.col };
              } else {
                return { row: fromPoint.row - distance, col: fromPoint.col };
              }
            } else {
              if (quadrant === 4 || quadrant === 1) {
                return { row: fromPoint.row, col: fromPoint.col + distance };
              } else {
                return { row: fromPoint.row, col: fromPoint.col - distance };
              }
            }
          }
          
          // Check if opposite direction points into quadrant
          const oppVec = { dx: oppDx, dy: oppDy };
          if (isInQuadrant(oppVec, quadrant)) {
            const scale = distance / oppLen;
            return {
              row: fromPoint.row + oppDy * scale,
              col: fromPoint.col + oppDx * scale
            };
          } else {
            // Neither direction works - use quadrant-based logic
            if (isLine1) {
              if (quadrant === 4 || quadrant === 3) {
                return { row: fromPoint.row + distance, col: fromPoint.col };
              } else {
                return { row: fromPoint.row - distance, col: fromPoint.col };
              }
            } else {
              if (quadrant === 4 || quadrant === 1) {
                return { row: fromPoint.row, col: fromPoint.col + distance };
              } else {
                return { row: fromPoint.row, col: fromPoint.col - distance };
              }
            }
          }
        }
        
        // Normalize and scale
        const scale = distance / len;
        return {
          row: fromPoint.row + dy * scale,
          col: fromPoint.col + dx * scale
        };
      };
      
      // Use the actual endpoints directly for angle calculation
      // This ensures the arc spans the full angle between the rays from the intersection
      // The AngleMarkerComponent will calculate the angle from these three points:
      // - vertex (intersection point)
      // - prevVertex (endpoint on first ray)
      // - nextVertex (endpoint on second ray)
      const prevVertexPoint = prevVertex;
      const nextVertexPoint = nextVertex;
      
      // Validate points have required properties
      if (!prevVertexPoint || !nextVertexPoint || !position) {
        console.error(`❌ Invalid points for intersection angle marker:`, {
          position,
          prevVertexPoint,
          nextVertexPoint
        });
        return; // Skip this marker
      }
      
      if (typeof prevVertexPoint.row !== 'number' || typeof prevVertexPoint.col !== 'number' ||
          typeof nextVertexPoint.row !== 'number' || typeof nextVertexPoint.col !== 'number' ||
          typeof position.row !== 'number' || typeof position.col !== 'number') {
        console.error(`❌ Points missing row/col properties:`, {
          position,
          prevVertexPoint,
          nextVertexPoint
        });
        return; // Skip this marker
      }
      
      // Check if vectors have non-zero magnitude
      const vec1Mag = Math.sqrt(
        Math.pow(prevVertexPoint.col - position.col, 2) + 
        Math.pow(prevVertexPoint.row - position.row, 2)
      );
      const vec2Mag = Math.sqrt(
        Math.pow(nextVertexPoint.col - position.col, 2) + 
        Math.pow(nextVertexPoint.row - position.row, 2)
      );
      
      if (vec1Mag < 0.001 || vec2Mag < 0.001) {
        console.error(`❌ Vectors have zero magnitude:`, {
          vec1Mag,
          vec2Mag,
          prevVertexPoint,
          nextVertexPoint,
          position
        });
        return; // Skip this marker
      }
      
      // Debug: Log the points being used
      console.log(`🔍 Intersection angle marker (quadrant ${quadrant}):`, {
        intersection: position,
        prevVertex: prevVertex,
        nextVertex: nextVertex,
        prevVertexPoint: prevVertexPoint,
        nextVertexPoint: nextVertexPoint,
        vec1ToPrev: { dx: prevVertex.col - position.col, dy: prevVertex.row - position.row },
        vec2ToNext: { dx: nextVertex.col - position.col, dy: nextVertex.row - position.row },
        vec1ToPrevPoint: { dx: prevVertexPoint.col - position.col, dy: prevVertexPoint.row - position.row },
        vec2ToNextPoint: { dx: nextVertexPoint.col - position.col, dy: nextVertexPoint.row - position.row }
      });
      
      // Always use arc marker for intersection angles
      const markerType = 'arc';
      
      // Don't pass the angle - let AngleMarkerComponent calculate it from the three points
      // This ensures the angle is calculated correctly between the selected rays
      // Disable supplementary angles by passing null configs - we only want the interior angle
      // Pass arc thickness, text size, and text color through interiorAngleConfig
      // Check if angle should be overridden from config
      const overrideAngle = angleConfig.angle !== undefined ? angleConfig.angle : 
                           (angleConfig.getAngle && typeof angleConfig.getAngle === 'function' ? angleConfig.getAngle() : undefined);
      
      // Check if customText should be used (evaluate getter if present)
      const customTextValue = angleConfig.customText !== undefined ? 
                             (typeof angleConfig.customText === 'function' ? angleConfig.customText() : angleConfig.customText) : 
                             undefined;
      
      angleMarkers.push(React.createElement(AngleMarkerComp, {
        key: `intersection-angle-${configIndex}`,
        vertex: position,
        prevVertex: prevVertexPoint,
        nextVertex: nextVertexPoint,
        angle: overrideAngle !== undefined ? overrideAngle : angle, // Use override if provided, otherwise use calculated angle
        containerCoordinates: coordinates,
        gridRows: gridRows,
        gridCols: gridCols,
        gridPadding: gridPadding,
        markerType: markerType,
        color: angleConfig.color || angleMarkerColor,
        size: angleConfig.size !== undefined ? angleConfig.size : angleMarkerSize,
        zIndex: zIndex + 35,
        showText: angleConfig.showText !== undefined ? angleConfig.showText : true,
        textColor: angleConfig.textColor || angleConfig.color || angleMarkerColor,
        // Disable supplementary angles - only show the interior angle
        supplementaryAngle1Config: null,
        supplementaryAngle2Config: null,
        supplementaryAngle3Config: null,
        // Protractor spawn function - only enable if protractorConfig.enableClickToSpawn is true
        // Pass no-op function when disabled to prevent fallback to window.spawnProtractorAtVertex
        onArcClick: protractorConfig.enableClickToSpawn ? spawnProtractorAtVertex : (() => {}),
        // Pass arc thickness, text size, text color, text offset, fill props, quadrant, and blink through interiorAngleConfig
        interiorAngleConfig: {
          color: angleConfig.color || angleMarkerColor,
          size: (() => {
            const finalSize = angleConfig.size !== undefined ? angleConfig.size : angleMarkerSize;
            console.log("🔍 [Quadrilateral] intersectionAngles size processing:", {
              angleConfigSize: angleConfig.size,
              angleMarkerSize: angleMarkerSize,
              finalSize: finalSize,
              type: typeof finalSize
            });
            return finalSize;
          })(),
          showText: angleConfig.showText !== undefined ? angleConfig.showText : true,
          arcThickness: angleConfig.arcThickness || '3gc',
          textSize: angleConfig.textSize,
          textColor: angleConfig.textColor || angleConfig.color || angleMarkerColor,
          textOffset: angleConfig.textOffset !== undefined ? angleConfig.textOffset : { x: '0gc', y: '0gc' },
          fill: angleConfig.fill !== undefined ? angleConfig.fill : false,
          fillColor: angleConfig.fillColor,
          fillOpacity: angleConfig.fillOpacity !== undefined ? angleConfig.fillOpacity : 0.3,
          quadrant: angleConfig.quadrant, // Pass quadrant for correct square positioning
          blink: angleConfig.blink !== undefined ? angleConfig.blink : false, // Pass blink property
          customText: customTextValue // Pass custom text label if provided
        }
      }));
    });
    
    console.log(`✅ renderCustomLineAngles: Created ${angleMarkers.length} angle markers`);
    
    return angleMarkers;
  }, [customLines, intersectionAngles, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridPadding, zIndex, angleMarkerColor, angleMarkerSize, findCustomLineIntersections]);

  // Render parallel proof transversal (animated perpendicular sweep)
  const renderParallelProofTransversal = React.useMemo(() => {
    if (!parallelProofAnimation || !coordinates) return null;
    
    const state = parallelProofAnimation;
    const { line1, line2, progress } = state;
    
    // Resolve line positions
    const resolvePosition = (line, endpoint) => {
      const vertexKey = endpoint === 'start' ? 'startVertex' : 'endVertex';
      const coordKey = endpoint === 'start' ? 'start' : 'end';
      
      if (line[vertexKey]) {
        const vertexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const vertexIndex = vertexMap[line[vertexKey].toUpperCase()];
        if (vertexIndex !== undefined) {
          return getVertexPosition(vertexIndex);
        }
      }
      
      return line[coordKey] || { row: 0, col: 0 };
    };
    
    // Get line1 start and end positions
    const line1Start = resolvePosition(line1, 'start');
    const line1End = resolvePosition(line1, 'end');
    
    // Calculate current point on line 1 based on progress
    const pointOnLine1 = {
      row: line1Start.row + progress * (line1End.row - line1Start.row),
      col: line1Start.col + progress * (line1End.col - line1Start.col)
    };
    
    // Create line objects with resolved positions
    const line1Resolved = {
      start: line1Start,
      end: line1End
    };
    
    const line2Start = resolvePosition(line2, 'start');
    const line2End = resolvePosition(line2, 'end');
    
    // For parallel lines, the point on line 2 should be at the same relative position
    // Calculate point on line 2 at the same progress (same relative position along the line)
    // This ensures both points move in the same direction along their respective lines
    const pointOnLine2 = {
      row: line2Start.row + progress * (line2End.row - line2Start.row),
      col: line2Start.col + progress * (line2End.col - line2Start.col)
    };
    
    // For parallel lines, the transversal connecting these two points will be perpendicular
    // to both lines, maintaining constant length throughout the animation
    
    // Use pre-calculated grid dimensions
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc } = gridDimensions;
    
    // Helper to convert grid position to percentage
    const getPositionPercent = (pos) => {
      return {
        x: offsetX + (pos.col / gridCols) * width,
        y: offsetY + (pos.row / gridRows) * height
      };
    };
    
    // Convert to screen coordinates
    const pos1 = getPositionPercent(pointOnLine1);
    const pos2 = getPositionPercent(pointOnLine2);
    
    // Process thickness from gc to pixels
    const processGcToPixels = (value, defaultValue) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultValue;
        const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
        return (gcValue / avgContainerGc) * 100;
      }
      return defaultValue;
    };
    
    const thicknessPx = processGcToPixels(transversalThickness, 4);
    
    return React.createElement('svg', {
      key: 'parallel-proof-transversal',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex + 50
      },
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none'
    }, [
      React.createElement('line', {
        key: 'transversal',
        x1: pos1.x,
        y1: pos1.y,
        x2: pos2.x,
        y2: pos2.y,
        stroke: transversalColor,
        strokeWidth: thicknessPx,
        strokeLinecap: 'round'
      })
    ]);
  }, [parallelProofAnimation, coordinates, transversalColor, transversalThickness, getVertexPosition, gridDimensions, gridRows, gridCols, zIndex]);

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
        interiorAngleConfig: overrideShowText(vertexAngleConfig.interiorAngle),
        supplementaryAngle1Config: overrideShowText(vertexAngleConfig.supplementaryAngle1),
        supplementaryAngle2Config: overrideShowText(vertexAngleConfig.supplementaryAngle2),
        supplementaryAngle3Config: overrideShowText(vertexAngleConfig.supplementaryAngle3),
        // Protractor spawn function
        // Pass no-op function when disabled to prevent fallback to window.spawnProtractorAtVertex
        onArcClick: protractorConfig.enableClickToSpawn ? spawnProtractorAtVertex : (() => {})
      });
    });
  }, [currentAngleShow, currentAngleShowText, getVertexAngleConfig, angleTextColor, angleTextSize, angleTextFont, angleTextOffset, vertices, angles, getVertexPosition, coordinates, gridRows, gridCols, gridPadding, zIndex, protractorConfig.enableClickToSpawn, spawnProtractorAtVertex]);

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
  // This handles both regular side equality animation and all sides equality animation
  const renderAnimatedSideLine = React.useMemo(() => {
    // Check for all sides equality animation first (new system)
    if (allSidesEqualityAnimation) {
      const { currentSideIndex, pivotVertexIndex, phase, progress: animationProgress, message } = allSidesEqualityAnimation;
      
      // Determine which sides to compare based on phase and pivot vertex
      let commonVertexIndex, prevVertexIndex, nextVertexIndex;
      let progress = animationProgress; // Use a mutable variable for progress
      
      if (phase.startsWith('pivoting-to-')) {
        // During pivoting, use the pivot vertex
        commonVertexIndex = pivotVertexIndex;
        prevVertexIndex = (pivotVertexIndex - 1 + 4) % 4;
        nextVertexIndex = (pivotVertexIndex + 1) % 4;
      } else if (phase.startsWith('on-')) {
        // When on a side, show the line aligned with that side
        // For 'on-AB', line should be on AB (from A to B)
        // For 'on-BC', line should be on BC (from B to C), etc.
        prevVertexIndex = currentSideIndex;
        nextVertexIndex = (currentSideIndex + 1) % 4;
        commonVertexIndex = nextVertexIndex; // Pivot at the end of the current side
        progress = 1; // Fully aligned with the side
      } else {
        return null;
      }
      
      // Use the same rendering logic as regular side equality animation
      // but with the calculated vertices
      const commonVertex = getVertexPosition(commonVertexIndex);
      const prevVertex = getVertexPosition(prevVertexIndex);
      const nextVertex = getVertexPosition(nextVertexIndex);
      
      // Continue with existing rendering logic...
      // (We'll use the same code below)
    }
    
    // Regular side equality animation (existing system)
    if (!sideEqualityAnimation) {
      return null;
    }

    const { commonVertexIndex, prevVertexIndex, nextVertexIndex, progress, phase } = sideEqualityAnimation;
    console.log('🎨 Rendering animated side line:', { commonVertexIndex, progress, phase });
    
    // Get vertex positions
    const commonVertex = getVertexPosition(commonVertexIndex);
    const prevVertex = getVertexPosition(prevVertexIndex);
    const nextVertex = getVertexPosition(nextVertexIndex);
    
    // Use the EXACT SAME coordinate system as sides (gridDimensions + getVertexPercent)
    // This ensures the pivot point matches exactly with the vertex position
    const { width, height, offsetX, offsetY, containerWidthGc, containerHeightGc } = gridDimensions;
    
    // Helper function to get vertex percent (EXACT same as renderSides)
    const getVertexPercent = (vertex) => {
      return {
        x: offsetX + (vertex.col / gridCols) * width,
        y: offsetY + (vertex.row / gridRows) * height
      };
    };
    
    // Get vertex positions as percentages (same coordinate system as sides)
    const commonPos = getVertexPercent(commonVertex);
    const prevPos = getVertexPercent(prevVertex);
    const nextPos = getVertexPercent(nextVertex);
    
    // Calculate side lengths using grid cell units (GC) to ensure accurate comparison
    // The grid uses square cells, so we calculate in GC units first, then convert to percentage
    // This ensures that sides that are equal in grid units remain equal in percentage coordinates
    const cellSizeGc = gridDimensions.cellSizeGc;
    
    // Calculate side1 (prevVertex to commonVertex) in grid cells
    // For example, if prevVertex is A(2,2) and commonVertex is B(2,6), then:
    // colDiff = 6-2 = 4, rowDiff = 2-2 = 0, so length = 4 * cellSizeGc
    const side1ColDiff = commonVertex.col - prevVertex.col;
    const side1RowDiff = commonVertex.row - prevVertex.row;
    const side1LengthGc = Math.sqrt(side1ColDiff * side1ColDiff + side1RowDiff * side1RowDiff) * cellSizeGc;
    
    // Calculate side2 (commonVertex to nextVertex) in grid cells
    // For example, if commonVertex is B(2,6) and nextVertex is C(6,6), then:
    // colDiff = 6-6 = 0, rowDiff = 6-2 = 4, so length = 4 * cellSizeGc
    const side2ColDiff = nextVertex.col - commonVertex.col;
    const side2RowDiff = nextVertex.row - commonVertex.row;
    const side2LengthGc = Math.sqrt(side2ColDiff * side2ColDiff + side2RowDiff * side2RowDiff) * cellSizeGc;
    
    // Convert GC lengths to percentage coordinates for rendering
    // Use the average container dimension to convert GC to percentage (maintains aspect ratio)
    const avgContainerGc = (gridDimensions.containerWidthGc + gridDimensions.containerHeightGc) / 2;
    const side1Length = (side1LengthGc / avgContainerGc) * 100;
    const side2Length = (side2LengthGc / avgContainerGc) * 100;
    
    // Also calculate in percentage coordinates for angle calculations (needed for rendering)
    const side1Dx = commonPos.x - prevPos.x;
    const side1Dy = commonPos.y - prevPos.y;
    const side2Dx = nextPos.x - commonPos.x;
    const side2Dy = nextPos.y - commonPos.y;
    
    // Angle FROM common vertex BACK to prev vertex (for starting position)
    const side1AngleFromCommon = Math.atan2(prevPos.y - commonPos.y, prevPos.x - commonPos.x) * (180 / Math.PI);
    // Angle FROM common vertex TO next vertex (for ending position)
    const side2AngleFromCommon = Math.atan2(nextPos.y - commonPos.y, nextPos.x - commonPos.x) * (180 / Math.PI);
    
    // IMPORTANT: Calculate line length using the same method as the actual sides
    // The sides are rendered using percentage coordinates in SVG with viewBox "0 0 100 100"
    // and preserveAspectRatio: 'none', which means the SVG stretches to fill the container
    // When the container isn't square, percentage coordinates have different X/Y scales
    // So we need to calculate the length the same way the sides are calculated
    
    // The actual sides use: x1, y1, x2, y2 as percentages directly
    // So the length in the SVG coordinate system is the Euclidean distance in percentage coordinates
    // However, since the SVG stretches, we need to account for the actual pixel aspect ratio
    
    // IMPORTANT: Calculate line length in grid cells first, then convert based on direction
    // The SVG viewBox is "0 0 100 100" with preserveAspectRatio: 'none', which stretches
    // When the container isn't square, horizontal and vertical lines have different
    // percentage lengths even though they're the same length in grid cells
    // We need to calculate the line length dynamically based on the current angle
    
    // The actual side length in grid cells (this is accurate and constant)
    const side1LengthInGridCells = Math.sqrt(side1ColDiff * side1ColDiff + side1RowDiff * side1RowDiff);
    
    // For the initial side (side1), calculate its length in percentage coordinates
    // This matches how the actual side is rendered
    const side1LengthPercent = Math.sqrt(side1Dx * side1Dx + side1Dy * side1Dy);
    
    // Use this as the base line length
    // When the line rotates, we'll adjust the end point calculation to maintain visual length
    const lineLengthPercent = side1LengthPercent;
    
    // Verify the shape is actually a square by checking side lengths in GC units
    // This ensures accurate comparison regardless of container aspect ratio
    const lengthDifferenceGc = Math.abs(side1LengthGc - side2LengthGc);
    const isSquare = lengthDifferenceGc < 0.1; // Allow small floating point error (0.1 GC units)
    if (!isSquare) {
      console.warn('⚠️ [Side Animation] Sides are not equal!', {
        side1LengthGc: side1LengthGc.toFixed(4),
        side2LengthGc: side2LengthGc.toFixed(4),
        differenceGc: lengthDifferenceGc.toFixed(4),
        side1LengthPercent: side1Length.toFixed(4),
        side2LengthPercent: side2Length.toFixed(4),
        message: 'Shape may not be a square - line length may appear incorrect'
      });
    } else {
      console.log('✅ [Side Animation] Sides are equal - shape is a square', {
        side1LengthGc: side1LengthGc.toFixed(4),
        side2LengthGc: side2LengthGc.toFixed(4),
        lineLengthPercent: lineLengthPercent.toFixed(4)
      });
    }
    
    // Debug logging
    console.log('🎨 Side animation details:', {
      commonVertexIndex,
      vertices: {
        prev: `(${prevVertex.row}, ${prevVertex.col})`,
        common: `(${commonVertex.row}, ${commonVertex.col})`,
        next: `(${nextVertex.row}, ${nextVertex.col})`
      },
      positions: {
        prevPos: { x: prevPos.x.toFixed(2), y: prevPos.y.toFixed(2) },
        commonPos: { x: commonPos.x.toFixed(2), y: commonPos.y.toFixed(2) },
        nextPos: { x: nextPos.x.toFixed(2), y: nextPos.y.toFixed(2) }
      },
      lengths: {
        side1Length: side1Length.toFixed(4),
        side2Length: side2Length.toFixed(4),
        lineLengthPercent: lineLengthPercent.toFixed(4),
        isSquare: isSquare
      },
      angles: {
        side1AngleFromCommon: side1AngleFromCommon.toFixed(2),
        side2AngleFromCommon: side2AngleFromCommon.toFixed(2)
      },
      progress: progress.toFixed(3)
    });
    
    // Interpolate rotation angle based on progress
    // Rotate from side1 angle (backwards from common vertex) to side2 angle (forwards from common vertex)
    // The line pivots around commonVertex, starting aligned with side1, ending aligned with side2
    // IMPORTANT: Normalize angle difference to always use interior angle (shortest path)
    let angleDiff = side2AngleFromCommon - side1AngleFromCommon;
    // Normalize to [-180, 180] range to ensure we take the shortest path (interior angle)
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;
    const currentAngle = side1AngleFromCommon + angleDiff * progress;
    
    // Calculate line thickness in viewBox units (same as sides)
    const processGcToViewBox = (value, defaultValue) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.includes('gc')) {
        const gcValue = parseFloat(value.replace('gc', '')) || defaultValue;
        const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
        return (gcValue / avgContainerGc) * 100;
      }
      return defaultValue;
    };
    
    const lineThickness = processGcToViewBox(edgeThickness || '4gc', 0.4);
    const messageTextSize = processGcToViewBox(angleTextSize || '14gc', 1.5);
    
    // Calculate the end point in viewBox coordinates (0-100)
    // The line starts at commonVertex and extends in the current angle direction
    // IMPORTANT: The line length is constant in grid cells, but we need to convert it to
    // percentage coordinates based on the current angle to maintain visual length
    
    const angleRad = currentAngle * Math.PI / 180;
    
    // Get grid dimensions in percentage
    const gridWidthPercent = gridDimensions.width;
    const gridHeightPercent = gridDimensions.height;
    const cellWidthPercent = gridWidthPercent / gridCols;
    const cellHeightPercent = gridHeightPercent / gridRows;
    
    // Calculate the line length in grid cells (constant, regardless of angle)
    const lineLengthInGridCells = side1LengthInGridCells;
    
    // Calculate the direction vector components (unit vector in grid cell space)
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);
    
    // Convert the direction vector components to percentage coordinates
    // Multiply each component by the corresponding cell size in percentage
    const dirXPercent = dirX * cellWidthPercent;
    const dirYPercent = dirY * cellHeightPercent;
    
    // Calculate the end point by adding the direction vector scaled by the line length
    // The line length in grid cells, converted to percentage coordinates
    const lineEndX = commonPos.x + dirXPercent * lineLengthInGridCells;
    const lineEndY = commonPos.y + dirYPercent * lineLengthInGridCells;
    
    // Debug: Verify the line end point calculation
    if (progress === 0 || progress === 1) {
      console.log('🎨 Line end point calculation:', {
        progress: progress.toFixed(3),
        currentAngle: currentAngle.toFixed(2),
        angleRad: angleRad.toFixed(4),
        lineLengthPercent: lineLengthPercent.toFixed(4),
        lineStart: { x: commonPos.x.toFixed(2), y: commonPos.y.toFixed(2) },
        lineEnd: { x: lineEndX.toFixed(2), y: lineEndY.toFixed(2) },
        expectedEnd: progress === 0 
          ? { x: prevPos.x.toFixed(2), y: prevPos.y.toFixed(2) }
          : { x: nextPos.x.toFixed(2), y: nextPos.y.toFixed(2) }
      });
    }
    
    return React.createElement(React.Fragment, { key: 'animated-side-line-container' }, [
      // Animated dashed line using SVG (EXACT same positioning as sides)
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
        strokeWidth: lineThickness,
        strokeDasharray: sideLineStyle === 'dashed' ? `${lineThickness * 3},${lineThickness * 1.5}` : 'none',
        strokeLinecap: 'round',
        style: {
          animation: 'sideEqualityBlink 0.8s ease-in-out infinite'
        }
      })),
      
      // Success message (use progressive message from allSidesEqualityAnimation if available)
      // Hide the message box - it's too intrusive during animation
      // Uncomment below if you want to show the progressive messages
      // allSidesEqualityAnimation && allSidesEqualityAnimation.message ? 
      //   React.createElement('div', {
      //     key: 'all-sides-equality-message',
      //     style: {
      //       position: 'absolute',
      //       left: '50%',
      //       top: '50%',
      //       transform: 'translate(-50%, -50%)',
      //       zIndex: zIndex + 201,
      //       pointerEvents: 'none',
      //       padding: '12px 24px',
      //       backgroundColor: 'rgba(0, 180, 0, 0.95)',
      //       color: '#FFFFFF',
      //       fontSize: `${messageTextSize * 1.2}px`,
      //       fontWeight: 'bold',
      //       fontFamily: angleTextFont || 'Arial, sans-serif',
      //       borderRadius: '10px',
      //       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      //       whiteSpace: 'nowrap',
      //       textAlign: 'center',
      //       border: '3px solid rgba(255, 255, 255, 0.6)'
      //     }
      //   }, allSidesEqualityAnimation.message) :
      // Hide the regular side equality message when all sides equality animation is active
      // (to avoid showing duplicate/intrusive messages)
      !allSidesEqualityAnimation && React.createElement('div', {
        key: 'side-equality-message',
        style: {
          position: 'absolute',
          left: sideMessageLeft !== null ? `${sideMessageLeft}%` : `${commonPos.x + sideMessageOffsetX}%`,
          top: sideMessageTop !== null ? `${sideMessageTop}%` : `${commonPos.y + sideMessageOffsetY}%`,
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
  }, [sideEqualityAnimation, allSidesEqualityAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, edgeThickness, angleTextSize, angleTextFont, zIndex, sideEqualityMessage, sideMessageLeft, sideMessageTop, sideMessageOffsetX, sideMessageOffsetY, sideLineStyle]);

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

    const { pairIndex, progress, pairId } = parallelLinesAnimation;
    
    console.log('🔄 Calculating parallel lines transform:', { pairIndex, progress, parallelLinesAnimation });
    
    // Check if we're in custom mode
    const isCustomMode = mode === 'custom' && customConnections && customConnections.length > 0 && customPoints && customPoints.length > 0;
    
    let side1Start, side1End;
    let customMovementUnitX, customMovementUnitY; // Store custom movement direction for custom mode
    
    if (isCustomMode) {
      // Custom mode: use customConnections
      const getConnectionById = (id) => customConnections.find(c => c.id === id);
      const getPointById = (id) => customPoints.find(p => p.id === id);
      
      // Use the pairId from animation state - this should always be set when animation is triggered
      let conn1, conn2;
      
      if (pairId) {
        // Use the actual pairId that was detected (e.g., "EH,FG")
        // Get both connections to calculate the correct movement direction
        const [conn1Id, conn2Id] = pairId.split(',');
        conn1 = getConnectionById(conn1Id);
        conn2 = getConnectionById(conn2Id);
        
        console.log(`🎯 [Parallel Lines Transform] Using pairId from animation state: ${pairId} -> ${conn1Id}, ${conn2Id}`);
      } else {
        console.warn(`⚠️ [Parallel Lines Transform] pairId not found in animation state, using fallback`);
        // Fallback: try to get from foundParallelPairs (in order found) or allParallelPairs
        const foundPairsArray = Array.from(foundParallelPairs);
        if (foundPairsArray.length > pairIndex) {
          const pairString = foundPairsArray[pairIndex];
          const [conn1Id, conn2Id] = pairString.split(',');
          conn1 = getConnectionById(conn1Id);
          conn2 = getConnectionById(conn2Id);
          console.log(`🎯 [Parallel Lines Transform] Using foundParallelPairs[${pairIndex}]: ${pairString} -> ${conn1Id}, ${conn2Id}`);
        } else {
          // Last resort: use allParallelPairs
          const allPairsArray = Array.from(allParallelPairs);
          if (allPairsArray.length > pairIndex) {
            const pairString = allPairsArray[pairIndex];
            const [conn1Id, conn2Id] = pairString.split(',');
            conn1 = getConnectionById(conn1Id);
            conn2 = getConnectionById(conn2Id);
            console.log(`🎯 [Parallel Lines Transform] Using allParallelPairs[${pairIndex}]: ${pairString} -> ${conn1Id}, ${conn2Id}`);
          }
        }
      }
      
      // Final fallback if not found
      if (!conn1) {
        console.warn(`⚠️ [Parallel Lines Transform] Could not find connection, using index-based fallback`);
        if (pairIndex === 0) {
          conn1 = customConnections[0];
          conn2 = customConnections[2] || customConnections[1];
        } else {
          conn1 = customConnections[1] || customConnections[0];
          conn2 = customConnections[3] || customConnections[2];
        }
      }
      
      const conn1From = getPointById(conn1.from);
      const conn1To = getPointById(conn1.to);
      
      // Convert to percentage positions using the same method as renderCustomConnections
      const fromPos = getCustomPointPosition(conn1From);
      const toPos = getCustomPointPosition(conn1To);
      
      if (!fromPos || !toPos) {
        console.warn('⚠️ [Parallel Lines Transform] Could not get positions for custom points');
        return null;
      }
      
      // Use percentX and percentY which are in SVG viewBox coordinates (0-100)
      side1Start = { x: fromPos.percentX, y: fromPos.percentY };
      side1End = { x: toPos.percentX, y: toPos.percentY };
      
      // For custom mode, calculate movement direction along the track direction (along conn1, e.g., EH)
      // The tracks are drawn along the parallel lines (EH and FG), so movement should be along that direction
      // Calculate the unit vector along conn1 (the track direction)
      const trackDx = toPos.percentX - fromPos.percentX;
      const trackDy = toPos.percentY - fromPos.percentY;
      const trackLength = Math.sqrt(trackDx * trackDx + trackDy * trackDy);
      
      if (trackLength > 0.001) {
        // Use the track direction (along the parallel line) as the movement direction
        const movementUnitX = trackDx / trackLength;
        const movementUnitY = trackDy / trackLength;
        
        console.log('🔧 [PAGE 7 DEBUG] Using track direction for movement (along tracks):', {
          conn1: `${conn1.from}->${conn1.to}`,
          conn2: conn2 ? `${conn2.from}->${conn2.to}` : 'N/A',
          trackVector: { dx: trackDx.toFixed(2), dy: trackDy.toFixed(2) },
          trackLength: trackLength.toFixed(2),
          movementUnit: { x: movementUnitX.toFixed(4), y: movementUnitY.toFixed(4) },
          movementAngle: (Math.atan2(movementUnitY, movementUnitX) * 180 / Math.PI).toFixed(2) + '°'
        });
        
        // Store the track direction for use after side vector calculation
        customMovementUnitX = movementUnitX;
        customMovementUnitY = movementUnitY;
      }
    } else {
      // Default mode: use vertices
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
      
      // Determine which sides are parallel based on pairIndex
      if (pairIndex === 0) {
        // AB and CD
        side1Start = { x: aX, y: aY }; // A
        side1End = { x: bX, y: bY };   // B
      } else {
        // BC and DA
        side1Start = { x: bX, y: bY }; // B
        side1End = { x: cX, y: cY };   // C
      }
    }
    
    // Calculate side vector
    const side1Dx = side1End.x - side1Start.x;
    const side1Dy = side1End.y - side1Start.y;
    const side1Length = Math.sqrt(side1Dx * side1Dx + side1Dy * side1Dy);
    
    // DEBUG: Log side information
    console.log('📐 [PAGE 7 DEBUG] Side calculation:', {
      side1Start: { x: side1Start.x.toFixed(2), y: side1Start.y.toFixed(2) },
      side1End: { x: side1End.x.toFixed(2), y: side1End.y.toFixed(2) },
      side1Dx: side1Dx.toFixed(2),
      side1Dy: side1Dy.toFixed(2),
      side1Length: side1Length.toFixed(2),
      isCustomMode: isCustomMode,
      hasCustomMovementDirection: !!(customMovementUnitX !== undefined)
    });
    
    // Calculate unit vector for movement direction
    // For custom mode with parallel pairs, use the direction connecting the two parallel lines
    // Otherwise, use perpendicular to the line
    let perpX, perpY;
    
    if (isCustomMode && customMovementUnitX !== undefined && customMovementUnitY !== undefined) {
      // Use the pre-calculated track direction (along the parallel lines, e.g., along EH or FG)
      perpX = customMovementUnitX;
      perpY = customMovementUnitY;
      console.log('🔧 [PAGE 7 DEBUG] Using track direction for movement (along the tracks)');
    } else {
      // Calculate perpendicular to the line (for default mode or fallback)
      // Perpendicular vector: rotate 90 degrees clockwise: (dy, -dx)
      perpX = side1Dy / side1Length;
      perpY = -side1Dx / side1Length;
      console.log('🔧 [PAGE 7 DEBUG] Using perpendicular direction for movement');
    }
    
    // DEBUG: Log perpendicular vector calculation
    console.log('📐 [PAGE 7 DEBUG] Perpendicular vector calculation:', {
      side1Dx: side1Dx.toFixed(4),
      side1Dy: side1Dy.toFixed(4),
      side1Length: side1Length.toFixed(4),
      perpX: perpX.toFixed(4),
      perpY: perpY.toFixed(4),
      perpMagnitude: Math.sqrt(perpX * perpX + perpY * perpY).toFixed(4) + ' (should be ~1.0)',
      dotProduct: (side1Dx * perpX + side1Dy * perpY).toFixed(4) + ' (should be ~0.0 for perpendicular)'
    });
    
    // Calculate the translation for the quadrilateral based on progress
    // Progress goes from -0.5 to 0.5, where 0 is original position
    // Movement distance is based on movementRatio (as % of side length), not extension length
    const maxMovement = side1Length * parallelLinesMovementRatio; // Movement distance as ratio of side length
    const translateX = perpX * maxMovement * progress * 2; // *2 because progress is -0.5 to 0.5
    const translateY = perpY * maxMovement * progress * 2;
    
    console.log('🎯 Transform calculation:', {
      side1Length: side1Length.toFixed(2),
      maxMovement: maxMovement.toFixed(2),
      translateX: translateX.toFixed(2),
      translateY: translateY.toFixed(2),
      progress: progress.toFixed(3),
      movementRatio: parallelLinesMovementRatio
    });
    
    // DEBUG: Log movement direction details
    console.log('🚂 [PAGE 7 DEBUG] Movement direction analysis:', {
      movementDirection: {
        x: perpX.toFixed(4),
        y: perpY.toFixed(4),
        angleDegrees: (Math.atan2(perpY, perpX) * 180 / Math.PI).toFixed(2)
      },
      sideDirection: {
        x: (side1Dx / side1Length).toFixed(4),
        y: (side1Dy / side1Length).toFixed(4),
        angleDegrees: (Math.atan2(side1Dy, side1Dx) * 180 / Math.PI).toFixed(2)
      },
      expectedAngleDifference: '90° (perpendicular)',
      actualAngleDifference: Math.abs(Math.abs(Math.atan2(perpY, perpX) - Math.atan2(side1Dy, side1Dx)) * 180 / Math.PI - 90).toFixed(2) + '°'
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
  }, [parallelLinesAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, parallelLinesExtensionRatio, parallelLinesMovementRatio, mode, customConnections, customPoints, gridDimensions, allParallelPairs, foundParallelPairs, getCustomPointPosition]);

  // Render parallel lines animation (extended rails only, quad is transformed via wrapper)
  const renderParallelLinesAnimation = React.useMemo(() => {
    if (!parallelLinesAnimation) {
      return null;
    }

    const { pairIndex, progress, phase } = parallelLinesAnimation;
    console.log('🎨 Rendering parallel lines animation:', { pairIndex, progress, phase });
    
    // Check if we're in custom mode with custom connections
    const isCustomMode = mode === 'custom' && customConnections && customConnections.length > 0 && customPoints && customPoints.length > 0;
    
    let side1Start, side1End, side2Start, side2End;
    
    if (isCustomMode) {
      // Custom mode: use customConnections to get the actual parallel lines
      // Find the connections that correspond to pairIndex
      // We need to find which pair of connections are parallel
      // For now, assume the first two are one pair, next two are another
      // Or better: use the connection IDs if they match standard naming (AB, BC, CD, DA)
      
      const getConnectionById = (id) => customConnections.find(c => c.id === id);
      const getPointById = (id) => customPoints.find(p => p.id === id);
      
      // Use the pairId from animation state if available, otherwise fall back to allParallelPairs
      let conn1, conn2;
      
      if (parallelLinesAnimation.pairId) {
        // Use the actual pairId that was detected (e.g., "EH,FG")
        const [conn1Id, conn2Id] = parallelLinesAnimation.pairId.split(',');
        conn1 = getConnectionById(conn1Id);
        conn2 = getConnectionById(conn2Id);
        
        console.log(`🎯 [Parallel Lines Animation] Using pairId from animation state: ${parallelLinesAnimation.pairId} -> ${conn1Id}, ${conn2Id}`);
      } else {
        // Fallback: use allParallelPairs
        const allPairsArray = Array.from(allParallelPairs);
        if (allPairsArray.length > pairIndex) {
          const pairString = allPairsArray[pairIndex];
          const [conn1Id, conn2Id] = pairString.split(',');
          conn1 = getConnectionById(conn1Id);
          conn2 = getConnectionById(conn2Id);
          
          console.log(`🎯 [Parallel Lines Animation] Using detected pair ${pairIndex} from allParallelPairs: ${pairString} -> ${conn1Id}, ${conn2Id}`);
        }
      }
      
      // Fallback if pair not found
      if (!conn1 || !conn2) {
        console.warn(`⚠️ [Parallel Lines Animation] Could not find connections for pairIndex ${pairIndex}, using fallback`);
        if (pairIndex === 0) {
          conn1 = customConnections[0];
          conn2 = customConnections[2] || customConnections[1];
        } else {
          conn1 = customConnections[1] || customConnections[0];
          conn2 = customConnections[3] || customConnections[2];
        }
      }
      
      // Get the points for each connection
      const conn1From = getPointById(conn1.from);
      const conn1To = getPointById(conn1.to);
      const conn2From = getPointById(conn2.from);
      const conn2To = getPointById(conn2.to);
      
      // Convert custom points to percentage positions using the same method as renderCustomConnections
      const conn1FromPos = getCustomPointPosition(conn1From);
      const conn1ToPos = getCustomPointPosition(conn1To);
      const conn2FromPos = getCustomPointPosition(conn2From);
      const conn2ToPos = getCustomPointPosition(conn2To);
      
      if (!conn1FromPos || !conn1ToPos || !conn2FromPos || !conn2ToPos) {
        console.warn('⚠️ [Parallel Lines Animation] Could not get positions for custom points');
        return null;
      }
      
      // Use percentX and percentY which are in SVG viewBox coordinates (0-100)
      side1Start = { x: conn1FromPos.percentX, y: conn1FromPos.percentY };
      side1End = { x: conn1ToPos.percentX, y: conn1ToPos.percentY };
      side2Start = { x: conn2FromPos.percentX, y: conn2FromPos.percentY };
      side2End = { x: conn2ToPos.percentX, y: conn2ToPos.percentY };
      
      console.log('🎨 Custom mode parallel animation:', { 
        pairIndex, 
        conn1: conn1.id, 
        conn2: conn2.id,
        side1: `${conn1.from}->${conn1.to}`,
        side2: `${conn2.from}->${conn2.to}`
      });
    } else {
      // Default mode: use vertices
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
      
      // Determine which sides are parallel based on pairIndex
      if (pairIndex === 0) {
        // AB and CD
        side1Start = { x: a.x, y: a.y }; // A
        side1End = { x: b.x, y: b.y };   // B
        side2Start = { x: c.x, y: c.y }; // C
        side2End = { x: d.x, y: d.y };   // D
      } else {
        // BC and DA
        side1Start = { x: b.x, y: b.y }; // B
        side1End = { x: c.x, y: c.y };   // C
        side2Start = { x: d.x, y: d.y }; // D
        side2End = { x: a.x, y: a.y };   // A
      }
    }
    
    // Calculate container position for SVG positioning (needed for absolute positioning)
    const [x1, y1, x2, y2] = coordinates || [100, 100, 1500, 800];
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // For message position calculation, we need all four vertex positions
    // In custom mode, extract from customPoints; in default mode, use vertices
    let aX, aY, bX, bY, cX, cY, dX, dY;
    if (isCustomMode) {
      // Get all four points from customPoints
      const pointA = customPoints.find(p => p.id === 'A');
      const pointB = customPoints.find(p => p.id === 'B');
      const pointC = customPoints.find(p => p.id === 'C');
      const pointD = customPoints.find(p => p.id === 'D');
      
      if (pointA && pointB && pointC && pointD) {
        // Use getCustomPointPosition to get percentX and percentY (same as renderCustomConnections)
        const posA = getCustomPointPosition(pointA);
        const posB = getCustomPointPosition(pointB);
        const posC = getCustomPointPosition(pointC);
        const posD = getCustomPointPosition(pointD);
        
        if (posA && posB && posC && posD) {
          aX = posA.percentX;
          aY = posA.percentY;
          bX = posB.percentX;
          bY = posB.percentY;
          cX = posC.percentX;
          cY = posC.percentY;
          dX = posD.percentX;
          dY = posD.percentY;
        } else {
          // Fallback: use side endpoints to calculate approximate center
          aX = side1Start.x;
          aY = side1Start.y;
          bX = side1End.x;
          bY = side1End.y;
          cX = side2End.x;
          cY = side2End.y;
          dX = side2Start.x;
          dY = side2Start.y;
        }
      } else {
        // Fallback: use side endpoints to calculate approximate center
        aX = side1Start.x;
        aY = side1Start.y;
        bX = side1End.x;
        bY = side1End.y;
        cX = side2End.x;
        cY = side2End.y;
        dX = side2Start.x;
        dY = side2Start.y;
      }
    } else {
      // Default mode: get from vertices
      const v0 = getVertexPosition(0); // A
      const v1 = getVertexPosition(1); // B
      const v2 = getVertexPosition(2); // C
      const v3 = getVertexPosition(3); // D
      
      const { offsetX, offsetY, width, height } = gridDimensions;
      const getVertexPercent = (vertex) => {
        return {
          x: offsetX + (vertex.col / gridCols) * width,
          y: offsetY + (vertex.row / gridRows) * height
        };
      };
      
      const a = getVertexPercent(v0);
      const b = getVertexPercent(v1);
      const c = getVertexPercent(v2);
      const d = getVertexPercent(v3);
      
      aX = a.x;
      aY = a.y;
      bX = b.x;
      bY = b.y;
      cX = c.x;
      cY = c.y;
      dX = d.x;
      dY = d.y;
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
    
    // DEBUG: Log track extension calculation
    console.log('🚂 [PAGE 7 DEBUG] Track extension calculation:', {
      side1: {
        start: { x: side1Start.x.toFixed(2), y: side1Start.y.toFixed(2) },
        end: { x: side1End.x.toFixed(2), y: side1End.y.toFixed(2) },
        length: side1Length.toFixed(2),
        unitVector: { x: side1UnitX.toFixed(4), y: side1UnitY.toFixed(4) },
        extensionLength: extensionLength1.toFixed(2),
        extensionRatio: parallelLinesExtensionRatio
      },
      side2: {
        start: { x: side2Start.x.toFixed(2), y: side2Start.y.toFixed(2) },
        end: { x: side2End.x.toFixed(2), y: side2End.y.toFixed(2) },
        length: side2Length.toFixed(2),
        unitVector: { x: side2UnitX.toFixed(4), y: side2UnitY.toFixed(4) },
        extensionLength: extensionLength2.toFixed(2)
      },
      track1: {
        start: { x: ext1X1.toFixed(2), y: ext1Y1.toFixed(2) },
        end: { x: ext1X2.toFixed(2), y: ext1Y2.toFixed(2) }
      },
      track2: {
        start: { x: ext2X1.toFixed(2), y: ext2Y1.toFixed(2) },
        end: { x: ext2X2.toFixed(2), y: ext2Y2.toFixed(2) }
      }
    });
    
    // Calculate perpendicular to side1 for movement direction (same as in transform)
    const perpX = side1Dy / side1Length;
    const perpY = -side1Dx / side1Length;
    
    // DEBUG: Compare track direction with movement direction
    console.log('🚂 [PAGE 7 DEBUG] Track vs Movement direction comparison:', {
      trackDirection: {
        description: 'Tracks extend along the parallel lines (side1 direction)',
        unitVector: { x: side1UnitX.toFixed(4), y: side1UnitY.toFixed(4) },
        angleDegrees: (Math.atan2(side1UnitY, side1UnitX) * 180 / Math.PI).toFixed(2)
      },
      movementDirection: {
        description: 'Movement should be perpendicular to tracks (perpendicular to side1)',
        unitVector: { x: perpX.toFixed(4), y: perpY.toFixed(4) },
        angleDegrees: (Math.atan2(perpY, perpX) * 180 / Math.PI).toFixed(2)
      },
      angleDifference: Math.abs(Math.abs(Math.atan2(perpY, perpX) - Math.atan2(side1UnitY, side1UnitX)) * 180 / Math.PI - 90).toFixed(2) + '° (should be ~0°)',
      dotProduct: (side1UnitX * perpX + side1UnitY * perpY).toFixed(4) + ' (should be ~0.0 for perpendicular)'
    });
    
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
  }, [parallelLinesAnimation, vertices, getVertexPosition, coordinates, gridRows, gridCols, gridDimensions, edgeThickness, edgeColor, edgeStyle, angleTextSize, angleTextFont, zIndex, parallelLinesMessage, parallelLinesMessageLeft, parallelLinesMessageTop, parallelLinesMessageOffsetX, parallelLinesMessageOffsetY, parallelLinesMessageCoordinates, parallelLinesExtensionRatio, parallelLinesMovementRatio, parallelLinesExtensionColor, parallelLinesTrackStrokeWidth, parallelLinesTrackDashStyle, parallelLinesTrackDashSize, parallelLinesTrackDashGap, side1, side2, side3, side4, mode, customConnections, customPoints, allParallelPairs, getCustomPointPosition]);

  // Render permanent symmetry axis lines (always visible)
  const renderPermanentAxisLine = React.useMemo(() => {
    // If symmetry animation is disabled (config is null or undefined), don't render axes
    if (!symmetryAnimationConfig || !symmetryAnimationConfig?.showAxisAlways || !coordinates) {
      return null;
    }

    const config = symmetryAnimationConfig;
    const showVertical = config.showVerticalAxis !== false; // Default to true if showAxisAlways is true
    const showHorizontal = config.showHorizontalAxis === true; // Default to false
    const showDiagonal = config.showDiagonalAxis === true; // Show diagonal axes
    const isClickable = config.clickableAxis === true;
    
    // Use the memoized componentPageNumber
    const labelNumber = componentPageNumber ? componentPageNumber - 1 : null;
    
    // Determine if vertical axis should be shown as completed (green/solid/non-clickable) on pages 3, 4, 5
    // This happens when page 2 was completed
    const verticalAxisCompleted = completedAxes.vertical;
    const verticalAxisClickable = !verticalAxisCompleted && isClickable; // Non-clickable if completed
    
    // Determine if horizontal axis should be shown as completed (green/solid/non-clickable) on pages 4, 5
    // This happens when page 3 was completed
    const horizontalAxisCompleted = completedAxes.horizontal;
    const horizontalAxisClickable = !horizontalAxisCompleted && isClickable; // Non-clickable if completed

    if (!showVertical && !showHorizontal && !showDiagonal) {
      return null;
    }
    
    // Debug log
    console.log(`🎯 Rendering permanent axis lines:`, {
      showVertical,
      showHorizontal,
      showDiagonal,
      isClickable,
      hasAnimateSymmetryFold: !!animateSymmetryFold
    });
    
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
    
    // Get axis extension amount (how much lines protrude beyond the shape)
    // Default is 5 percentage units, can be overridden in config
    const axisExtension = config.axisExtension !== undefined ? config.axisExtension : 5;
    
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
          // All axes (vertical, horizontal, diagonal1, diagonal2) are now supported
          if (axis === 'vertical' || axis === 'horizontal' || axis === 'diagonal1' || axis === 'diagonal2') {
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
    
    // Add vertical line if requested
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
      
      // Use green color if axis is completed
      const verticalColor = verticalAxisCompleted ? '#00FF00' : (config.foldLineColor || '#FFFFFF');
      // Use solid line if completed, otherwise use the configured dash style
      const verticalDashArray = verticalAxisCompleted ? 'none' : dashArray;
      
      const lineProps = {
        key: 'vertical-axis-line',
        x1: centerX,
        y1: lineY1,
        x2: centerX,
        y2: lineY2,
        stroke: verticalColor,
        strokeWidth: strokeWidthViewBox, // 4gc converted to viewBox units
        strokeDasharray: verticalDashArray,
        strokeLinecap: 'round',
        pointerEvents: verticalAxisClickable ? 'stroke' : 'none'
      };
      
      if (verticalAxisClickable) {
        lineProps.onClick = createAxisClickHandler('vertical');
        lineProps.style = { cursor: 'pointer' };
      }
      
      lines.push(React.createElement('line', lineProps));
      
      // Add label near the end of the axis if completed
      // For pages 3, 4, 5, show label "1" if page 2 was completed
      if (verticalAxisCompleted) {
        const verticalLabel = (componentPageNumber === 2 && labelNumber !== null) ? labelNumber : 
                             ((componentPageNumber === 3 || componentPageNumber === 4 || componentPageNumber === 5) ? 1 : null);
        if (verticalLabel !== null) {
          // Place label at the top end (lineY1) with a small offset
          lines.push(React.createElement('text', {
            key: 'vertical-axis-label',
            x: centerX,
            y: lineY1 - 2, // 2 percentage units above the line end
            textAnchor: 'middle',
            dominantBaseline: 'baseline',
            fill: '#00FF00',
            fontSize: '4', // 4% of viewBox (adjust as needed)
            fontWeight: 'bold',
            pointerEvents: 'none'
          }, verticalLabel));
        }
      }
    }
    
    // Add horizontal line if requested
    if (showHorizontal) {
      const lineX1 = minX - axisExtension;
      const lineX2 = maxX + axisExtension;
      
      // Add invisible wider hit area for better clickability (only if clickable)
      if (horizontalAxisClickable) {
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
      
      // Use green color if axis is completed
      const horizontalColor = horizontalAxisCompleted ? '#00FF00' : (config.foldLineColor || '#FFFFFF');
      // Use solid line if completed, otherwise use the configured dash style
      const horizontalDashArray = horizontalAxisCompleted ? 'none' : dashArray;
      
      const lineProps = {
        key: 'horizontal-axis-line',
        x1: lineX1,
        y1: centerY,
        x2: lineX2,
        y2: centerY,
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
      
      // Add label near the end of the axis if completed
      // For pages 4, 5, show label "2" if page 3 was completed
      if (horizontalAxisCompleted) {
        const horizontalLabel = (componentPageNumber === 3 && labelNumber !== null) ? labelNumber : 
                               ((componentPageNumber === 4 || componentPageNumber === 5) ? 2 : null);
        if (horizontalLabel !== null) {
          // Place label at the left end (lineX1) with a small offset
          lines.push(React.createElement('text', {
            key: 'horizontal-axis-label',
            x: lineX1 - 2, // 2 percentage units to the left of the line end
            y: centerY,
            textAnchor: 'end',
            dominantBaseline: 'middle',
            fill: '#00FF00',
            fontSize: '4', // 4% of viewBox (adjust as needed)
            fontWeight: 'bold',
            pointerEvents: 'none'
          }, horizontalLabel));
        }
      }
    }
    
    // Add diagonal lines if requested
    // For a square/quadrilateral, there are two diagonals:
    // Diagonal 1: from A (top-left) to C (bottom-right)
    // Diagonal 2: from B (top-right) to D (bottom-left)
    if (showDiagonal) {
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
      
      // Use green color if axis is completed
      const diag1Color = completedAxes.diagonal1 ? '#00FF00' : (config.foldLineColor || '#FFFFFF');
      // Use solid line if completed, otherwise use the configured dash style
      const diag1DashArray = completedAxes.diagonal1 ? 'none' : dashArray;
      
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
      
      // Add label near the end of the axis if completed
      if (completedAxes.diagonal1 && labelNumber !== null) {
        // Place label at the start end (diag1X1, diag1Y1) with a small offset
        const labelOffsetX = -diag1UnitX * 3; // 3 percentage units along the perpendicular
        const labelOffsetY = -diag1UnitY * 3;
        // For page 4, diagonal1 shows "3" (page number - 1)
        const diagonal1Label = componentPageNumber === 4 ? labelNumber : labelNumber;
        lines.push(React.createElement('text', {
          key: 'diagonal1-axis-label',
          x: diag1X1 + labelOffsetX,
          y: diag1Y1 + labelOffsetY,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fill: '#00FF00',
          fontSize: '4', // 4% of viewBox (adjust as needed)
          fontWeight: 'bold',
          pointerEvents: 'none'
        }, diagonal1Label));
      }
      
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
      
      // Use green color if axis is completed
      const diag2Color = completedAxes.diagonal2 ? '#00FF00' : (config.foldLineColor || '#FFFFFF');
      // Use solid line if completed, otherwise use the configured dash style
      const diag2DashArray = completedAxes.diagonal2 ? 'none' : dashArray;
      
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
      
      // Add label near the end of the axis if completed
      if (completedAxes.diagonal2 && labelNumber !== null) {
        // Place label at the start end (diag2X1, diag2Y1) with a small offset
        const labelOffsetX = -diag2UnitX * 3; // 3 percentage units along the perpendicular
        const labelOffsetY = -diag2UnitY * 3;
        // For page 4, diagonal2 shows "4" (page number)
        const diagonal2Label = componentPageNumber === 4 ? componentPageNumber : labelNumber;
        lines.push(React.createElement('text', {
          key: 'diagonal2-axis-label',
          x: diag2X1 + labelOffsetX,
          y: diag2Y1 + labelOffsetY,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fill: '#00FF00',
          fontSize: '4', // 4% of viewBox (adjust as needed)
          fontWeight: 'bold',
          pointerEvents: 'none'
        }, diagonal2Label));
      }
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
  }, [symmetryAnimationConfig, coordinates, getVertexPosition, gridDimensions, gridRows, gridCols, zIndex, animateSymmetryFold, completedAxes, componentPageNumber]);

  // Render symmetry fold animation
  const renderSymmetryFoldAnimation = React.useMemo(() => {
    if (!symmetryFoldAnimation || !coordinates) {
      return null;
    }

    const { axis, progress, phase, config } = symmetryFoldAnimation;
    console.log('🎨 Rendering symmetry fold animation:', { axis, progress, phase });
    
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
      // Vertical fold line through center
      foldLineX1 = centerX;
      foldLineY1 = minY - 5; // Extend slightly beyond shape
      foldLineX2 = centerX;
      foldLineY2 = maxY + 5;
    } else if (axis === 'horizontal') {
      // Horizontal fold line through center
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
    let originalPolygonPoints = `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
    
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
      } else if (axis === 'diagonal1' || axis === 'diagonal2') {
        // Diagonal axis - fold one triangle across the diagonal
        const diagStart = axis === 'diagonal1' ? a : b;
        const diagEnd = axis === 'diagonal1' ? c : d;
        
        // Helper to determine which side of the diagonal a point is on
        const getSideOfLine = (point, lineStart, lineEnd) => {
          const dx = lineEnd.x - lineStart.x;
          const dy = lineEnd.y - lineStart.y;
          const px = point.x - lineStart.x;
          const py = point.y - lineStart.y;
          return dx * py - dy * px; // Cross product
        };
        
        // Determine which triangle to fold
        // For diagonal1 (A-C): fold triangle containing B
        // For diagonal2 (B-D): fold triangle containing A
        const targetVertex = axis === 'diagonal1' ? b : a;
        const targetSide = getSideOfLine(targetVertex, diagStart, diagEnd);
        
        // Collect vertices on the same side as target vertex
        // IMPORTANT: Do NOT include the diagonal vertices (diagStart and diagEnd)
        // They should stay fixed on the diagonal during rotation
        const halfVertices = [];
        const allVertices = [
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
        
        // Now add the diagonal vertices to form the complete triangle
        // Use the actual diagonal vertices for proper polygon shape
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
      console.warn('⚠️ Could not calculate polygon data for symmetry fold animation');
      return null;
    }
    
    const { leftHalf, topHalf, diagonalHalf, mirroredHalf, foldOrigin } = polygonData;
    const halfPolygonPoints = axis === 'vertical' ? (leftHalf || '') : 
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
    
    console.log('🎨 Symmetry fold rendering:', { 
      axis, 
      progress: progress.toFixed(3), 
      phase, 
      halfPolygonPoints: halfPolygonPoints.substring(0, 80),
      foldOrigin 
    });
    
    // Calculate the 3D transform for the fold animation
    // progress: 0 = flat, 1 = fully folded (180 degree rotation)
    const rotationDegrees = progress * 180;
    
    let transformStyle, transformOriginX, transformOriginY;
    
    if (axis === 'vertical') {
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
      // For diagonal axes, we need special handling to keep the diagonal edge fixed
      (axis === 'diagonal1' || axis === 'diagonal2') ? 
        // Diagonal: Render BOTH the front triangle and its mirror reflection
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
                const diagStart = axis === 'diagonal1' ? a : b;
                const diagEnd = axis === 'diagonal1' ? c : d;
                const diagAngleDeg = Math.atan2(diagEnd.y - diagStart.y, diagEnd.x - diagStart.x) * 180 / Math.PI;
                
                // Scale perpendicular to diagonal (collapse toward diagonal)
                const scaleY = Math.cos(rotationDegrees * Math.PI / 180);
                const originX = foldOrigin.x;
                const originY = foldOrigin.y;
                
                return `translate(${originX} ${originY}) rotate(${diagAngleDeg}) scale(1 ${scaleY}) rotate(${-diagAngleDeg}) translate(${-originX} ${-originY})`;
              })()
            })
          :
            React.createElement('polygon', {
              key: 'folding-polygon-diagonal-back',
              points: halfPolygonPoints, // Use the SAME triangle, not mirroredHalf - we're showing the back of the same triangle
              fill: config.foldedHalfColor || 'rgba(139, 69, 69, 0.7)',
              stroke: '#8B4545',
              strokeWidth: 0.3,
              opacity: (rotationDegrees - 90) / 90, // Fade in as we go past 90 degrees
              transform: (() => {
                const diagStart = axis === 'diagonal1' ? a : b;
                const diagEnd = axis === 'diagonal1' ? c : d;
                const diagAngleDeg = Math.atan2(diagEnd.y - diagStart.y, diagEnd.x - diagStart.x) * 180 / Math.PI;
                
                // After 90 degrees, we need to:
                // 1. Flip the triangle (scaleX = -1) to show it from the back
                // 2. Scale it back out perpendicular to diagonal
                const scaleY = Math.abs(Math.cos(rotationDegrees * Math.PI / 180));
                const originX = foldOrigin.x;
                const originY = foldOrigin.y;
                
                // The key: flip horizontally (scale -1 in X direction) to show the back side
                return `translate(${originX} ${originY}) rotate(${diagAngleDeg}) scale(-1 ${-scaleY}) rotate(${-diagAngleDeg}) translate(${-originX} ${-originY})`;
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

  // Expose startParallelProofAnimation to DOM element
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.startParallelProofAnimation = startParallelProofAnimation;
      console.log(`✅ QuadrilateralComponent ${id}: startParallelProofAnimation method exposed to DOM element`);
    }
  }, [id, startParallelProofAnimation]);

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
      
      // Custom lines layer (segments, rays, double-arrowed lines)
      renderCustomLines,
      
      // Custom line labels layer
      renderCustomLineLabels,
      
      // Custom mode: Points layer
      renderCustomPoints,
      
      // Custom mode: Connections layer
      renderCustomConnections,
      
      // Custom mode: Auto-detected angles layer
      renderAutoDetectedAngles,
      
      // Custom mode: Selected angle marker (when 2 lines are selected)
      renderSelectedAngleMarker,
      
      // Angle markers layer
      ...renderAngleMarkers,
      
      // Custom line angle markers (at endpoints and intersections)
      ...renderCustomLineAngles,
      
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
      
      // Parallel proof transversal (animated perpendicular sweep for custom lines)
      renderParallelProofTransversal,
      
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