/**
 * Quad Grid Component
 * 
 * A custom grid system for the quadrilateral component.
 * Renders grid lines and intersection points (quadGridPoints).
 * Provides snapping logic for vertex dragging with visual feedback.
 */

/**
 * QuadGrid Component
 * @param {Object} props - Component props
 * @param {number} props.gridRows - Number of rows in the grid
 * @param {number} props.gridCols - Number of columns in the grid
 * @param {Array<number>} props.coordinates - Container position [x1, y1, x2, y2]
 * @param {number} props.zIndex - Z-index for layering
 * @param {string|number} props.gridPadding - Padding around the grid in gc units (default: 0)
 * @param {string|number} props.containerBorderWidth - Container border width in gc units (default: 0) - automatically subtracted from available space
 * @param {string} props.gridLineColor - Color of grid lines (default: 'rgba(200, 200, 200, 0.3)')
 * @param {string} props.gridPointColor - Color of grid points (default: 'rgba(150, 150, 150, 0.5)')
 * @param {string} props.highlightColor - Color for highlighted snap point (default: 'rgba(255, 153, 0, 0.8)')
 * @param {boolean} props.showPoints - Whether to show grid points (default: true)
 * @param {boolean} props.showLines - Whether to show grid lines (default: true)
 * @param {Object} props.snapPoint - Currently highlighted snap point {row, col} or null
 * @param {Function} props.onGridPointHover - Callback when hovering over grid point
 * @param {Array} props.vertices - Array of vertex React elements to render inside the grid component
 */
const QuadGridComponent = React.memo((props) => {
  const {
    gridRows = 10,
    gridCols = 10,
    coordinates,
    zIndex = 10,
    gridPadding = 0,
    containerBorderWidth = 0,
    gridLineColor = 'rgba(200, 200, 200, 0.3)',
    gridPointColor = 'rgba(150, 150, 150, 0.5)',
    highlightColor = 'rgba(255, 153, 0, 0.8)',
    showPoints = true,
    showLines = true,
    snapPoint = null,
    onGridPointHover,
    vertices = []
  } = props;

  // Calculate position - grid component is a child of quadrilateral container,
  // so it should fill the parent container (0%, 0%, 100%, 100%)
  // Use position: absolute to ensure it's at the top-left corner
  const containerStyle = React.useMemo(() => {
    return {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      zIndex: zIndex + 150, // Higher than quadrilateral wrapper to allow hotspots on top
      pointerEvents: 'none' // Grid lines/points don't capture clicks, but vertices container will
    };
  }, [zIndex]);

  // Parse gridPadding value (supports gc units or raw numbers)
  const paddingGc = React.useMemo(() => {
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      return parseFloat(gridPadding) || 0;
    }
    return typeof gridPadding === 'number' ? gridPadding : 0;
  }, [gridPadding]);
  
  // Parse containerBorderWidth value (supports gc units or raw numbers)
  const borderWidthGc = React.useMemo(() => {
    if (typeof containerBorderWidth === 'string' && containerBorderWidth.endsWith('gc')) {
      return parseFloat(containerBorderWidth) || 0;
    }
    return typeof containerBorderWidth === 'number' ? containerBorderWidth : 0;
  }, [containerBorderWidth]);

  // Calculate centered grid area with square cells
  const gridArea = React.useMemo(() => {
    // Get container dimensions from coordinates
    let containerWidthGc = 0;
    let containerHeightGc = 0;
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      const [x1, y1, x2, y2] = coordinates;
      containerWidthGc = x2 - x1;
      containerHeightGc = y2 - y1;
    }
    
    // Subtract padding from both dimensions
    // NOTE: Border is drawn on top of the container, so it doesn't reduce available space
    // The grid should fill the container's content area, and the border is drawn over it
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size for each dimension IN GC UNITS
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    
    // Use the smaller cell size to ensure square cells IN GC UNITS
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    const isWidthConstrained = widthPerCell <= heightPerCell;
    
    // Calculate final grid dimensions IN GC UNITS (always square cells in GC)
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate centering offsets within the container IN GC UNITS
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert to percentages for CSS positioning
    // NOTE: These percentages are relative to container dimensions, so cells will
    // appear square only if the container's rendered pixel aspect ratio matches
    // its GC aspect ratio. If the viewport distorts the container, cells will appear non-square.
    const gridWidth = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const gridHeight = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    return {
      width: gridWidth,
      height: gridHeight,
      offsetX: offsetX,
      offsetY: offsetY,
      // Also return GC values for coordinate conversion
      widthGc: gridWidthGc,
      heightGc: gridHeightGc,
      offsetXGc: offsetXGc,
      offsetYGc: offsetYGc,
      cellSizeGc: cellSizeGc
    };
  }, [gridRows, gridCols, coordinates, paddingGc]);

  // Generate grid lines
  const gridLines = React.useMemo(() => {
    if (!showLines) return [];
    
    const lines = [];
    const { width, height, offsetX, offsetY } = gridArea;
    
    // Vertical lines
    for (let col = 0; col <= gridCols; col++) {
      const xPercent = offsetX + (col / gridCols) * width;
      lines.push({
        key: `v-${col}`,
        style: {
          position: 'absolute',
          left: `${xPercent}%`,
          top: `${offsetY}%`,
          width: '1px',
          height: `${height}%`,
          backgroundColor: gridLineColor,
          pointerEvents: 'none'
        }
      });
    }
    
    // Horizontal lines
    for (let row = 0; row <= gridRows; row++) {
      const yPercent = offsetY + (row / gridRows) * height;
      lines.push({
        key: `h-${row}`,
        style: {
          position: 'absolute',
          left: `${offsetX}%`,
          top: `${yPercent}%`,
          width: `${width}%`,
          height: '1px',
          backgroundColor: gridLineColor,
          pointerEvents: 'none'
        }
      });
    }
    
    return lines;
  }, [showLines, gridRows, gridCols, gridLineColor, gridArea]);

  // Generate grid points
  const gridPoints = React.useMemo(() => {
    if (!showPoints) return [];
    
    const points = [];
    const { width, height, offsetX, offsetY } = gridArea;
    
    for (let row = 0; row <= gridRows; row++) {
      for (let col = 0; col <= gridCols; col++) {
        const xPercent = offsetX + (col / gridCols) * width;
        const yPercent = offsetY + (row / gridRows) * height;
        
        const isHighlighted = snapPoint && snapPoint.row === row && snapPoint.col === col;
        
        points.push({
          key: `p-${row}-${col}`,
          row,
          col,
          style: {
            position: 'absolute',
            left: `${xPercent}%`,
            top: `${yPercent}%`,
            width: isHighlighted ? '8px' : '4px',
            height: isHighlighted ? '8px' : '4px',
            borderRadius: '50%',
            backgroundColor: isHighlighted ? highlightColor : gridPointColor,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'all 0.1s ease',
            zIndex: isHighlighted ? 100 : 1
          }
        });
      }
    }
    
    return points;
  }, [showPoints, gridRows, gridCols, gridPointColor, highlightColor, snapPoint, gridArea]);

  // Add ref to measure actual rendered size
  const gridContainerRef = React.useRef(null);
  
  // Measure actual rendered size after mount
  return React.createElement('div', {
    ref: gridContainerRef,
    className: 'quad-grid-component',
    style: containerStyle,
    'data-grid-rows': gridRows,
    'data-grid-cols': gridCols
  }, [
    // Grid lines layer
    showLines && React.createElement('div', {
      key: 'grid-lines',
      className: 'quad-grid-lines',
      style: { position: 'relative', width: '100%', height: '100%' }
    }, gridLines.map(line => 
      React.createElement('div', {
        key: line.key,
        style: line.style
      })
    )),
    
    // Grid points layer
    showPoints && React.createElement('div', {
      key: 'grid-points',
      className: 'quad-grid-points',
      style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
    }, gridPoints.map(point => 
      React.createElement('div', {
        key: point.key,
        className: 'quad-grid-point',
        style: point.style,
        'data-row': point.row,
        'data-col': point.col
      })
    )),
    
    // Vertices layer (positioned relative to grid component, same as grid points)
    vertices.length > 0 && React.createElement('div', {
        key: 'vertices-container',
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto' // Allow clicks on hotspots
        }
      }, vertices),
  ]);
});

/**
 * Utility functions for grid snapping
 */
const QuadGridUtils = {
  /**
   * Convert screen coordinates to grid coordinates
   * @param {number} screenX - Screen X position in pixels
   * @param {number} screenY - Screen Y position in pixels
   * @param {DOMRect} containerRect - Bounding rect of the grid container
   * @param {number} gridRows - Number of grid rows
   * @param {number} gridCols - Number of grid columns
   * @param {number} paddingGc - Padding in gc units (default: 0)
   * @param {Array<number>} containerCoordinates - Container [x1, y1, x2, y2] for aspect ratio calculation
   * @returns {Object} Grid coordinates {row, col}
   */
  screenToGrid(screenX, screenY, containerRect, gridRows, gridCols, paddingGc = 0, containerCoordinates = null) {
    // Get container dimensions in gc units for proper calculation
    let containerWidthGc = containerRect.width;
    let containerHeightGc = containerRect.height;
    
    if (containerCoordinates && Array.isArray(containerCoordinates) && containerCoordinates.length === 4) {
      const [x1, y1, x2, y2] = containerCoordinates;
      containerWidthGc = x2 - x1;
      containerHeightGc = y2 - y1;
    }
    
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
    
    // Convert to pixel offsets
    const scaleX = containerRect.width / containerWidthGc;
    const scaleY = containerRect.height / containerHeightGc;
    const offsetX = offsetXGc * scaleX;
    const offsetY = offsetYGc * scaleY;
    const gridWidth = gridWidthGc * scaleX;
    const gridHeight = gridHeightGc * scaleY;
    
    // Calculate relative position within container
    const relativeX = screenX - containerRect.left;
    const relativeY = screenY - containerRect.top;
    
    // Adjust for grid offset and scale to grid coordinates
    const gridX = relativeX - offsetX;
    const gridY = relativeY - offsetY;
    
    // Convert to grid coordinates (0 to gridCols/gridRows)
    const col = Math.round((gridX / gridWidth) * gridCols);
    const row = Math.round((gridY / gridHeight) * gridRows);
    
    // Clamp to grid bounds
    return {
      row: Math.max(0, Math.min(gridRows, row)),
      col: Math.max(0, Math.min(gridCols, col))
    };
  },

  /**
   * Convert grid coordinates to screen percentage
   * @param {number} row - Grid row
   * @param {number} col - Grid column
   * @param {number} gridRows - Number of grid rows
   * @param {number} gridCols - Number of grid columns
   * @returns {Object} Percentage coordinates {x, y} (0-100)
   */
  gridToPercent(row, col, gridRows, gridCols) {
    return {
      x: (col / gridCols) * 100,
      y: (row / gridRows) * 100
    };
  },

  /**
   * Convert grid coordinates to page coordinate system
   * @param {number} row - Grid row
   * @param {number} col - Grid column
   * @param {number} gridRows - Number of grid rows
   * @param {number} gridCols - Number of grid columns
   * @param {Array<number>} containerCoordinates - Container [x1, y1, x2, y2]
   * @param {number} paddingGc - Padding in gc units (default: 0)
   * @returns {Array<number>} Page coordinates [x, y]
   */
  gridToPageCoordinates(row, col, gridRows, gridCols, containerCoordinates, paddingGc = 0) {
    const [x1, y1, x2, y2] = containerCoordinates;
    
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
    
    // Calculate position within the grid
    const x = x1 + offsetXGc + (col / gridCols) * gridWidthGc;
    const y = y1 + offsetYGc + (row / gridRows) * gridHeightGc;
    
    return [Math.round(x), Math.round(y)];
  },

  /**
   * Calculate snap point from mouse position
   * @param {number} mouseX - Mouse X in screen pixels
   * @param {number} mouseY - Mouse Y in screen pixels
   * @param {DOMRect} containerRect - Grid container bounds
   * @param {number} gridRows - Number of rows
   * @param {number} gridCols - Number of columns
   * @param {Array} occupiedPoints - Array of occupied {row, col} points
   * @param {number} paddingGc - Padding in gc units (default: 0)
   * @param {Array<number>} containerCoordinates - Container [x1, y1, x2, y2] for aspect ratio calculation
   * @returns {Object} Snapped grid point {row, col}
   */
  calculateSnapPoint(mouseX, mouseY, containerRect, gridRows, gridCols, occupiedPoints = [], paddingGc = 0, containerCoordinates = null) {
    const snapPoint = this.screenToGrid(mouseX, mouseY, containerRect, gridRows, gridCols, paddingGc, containerCoordinates);
    
    // Check if point is already occupied
    const isOccupied = occupiedPoints.some(p => p.row === snapPoint.row && p.col === snapPoint.col);
    
    if (isOccupied) {
      // Try to find nearest unoccupied point
      let minDistance = Infinity;
      let nearestPoint = snapPoint;
      
      for (let r = 0; r <= gridRows; r++) {
        for (let c = 0; c <= gridCols; c++) {
          const occupied = occupiedPoints.some(p => p.row === r && p.col === c);
          if (!occupied) {
            const distance = Math.sqrt(Math.pow(r - snapPoint.row, 2) + Math.pow(c - snapPoint.col, 2));
            if (distance < minDistance) {
              minDistance = distance;
              nearestPoint = { row: r, col: c };
            }
          }
        }
      }
      
      return nearestPoint;
    }
    
    return snapPoint;
  },

  /**
   * Check if two grid points are the same
   * @param {Object} point1 - First point {row, col}
   * @param {Object} point2 - Second point {row, col}
   * @returns {boolean} True if same point
   */
  pointsEqual(point1, point2) {
    if (!point1 || !point2) return false;
    return point1.row === point2.row && point1.col === point2.col;
  }
};

// Export components and utilities
if (typeof window !== 'undefined') {
  window.QuadGridComponent = {
    QuadGridComponent,
    QuadGridUtils
  };
}

console.log('✅ Quad grid component loaded successfully');

