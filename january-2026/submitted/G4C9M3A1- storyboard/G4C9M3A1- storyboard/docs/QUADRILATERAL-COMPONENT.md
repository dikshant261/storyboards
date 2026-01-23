# Quadrilateral Component Documentation

## Overview

The Quadrilateral Component is a comprehensive, interactive system for displaying and manipulating various types of quadrilaterals on a custom grid. It features draggable vertices that snap to grid points, real-time property analysis, angle markers, and visual property indicators.

## Features

- **9 Quadrilateral Types**: Square, Rectangle, Parallelogram, Rhombus, Trapezoid, Isosceles Trapezoid, Right Trapezoid, Kite, and Irregular Quadrilateral
- **Interactive Grid System**: Custom grid with configurable rows and columns
- **Draggable Vertices**: Snap-to-grid functionality with visual feedback
- **Real-time Property Analysis**: Automatic detection of geometric properties
- **Angle Markers**: Visual representation of angles with multiple display modes
- **Property Panel**: Comprehensive display of all quadrilateral properties
- **Diagonal Display**: Optional diagonal lines with custom styling

## Component Structure

The system consists of 5 main files:

1. **quadrilateral-config.js** - Configuration and property definitions
2. **quad-grid-component.js** - Grid rendering and snapping logic
3. **angle-marker-component.js** - Angle visualization
4. **property-panel-component.js** - Property display panel
5. **quadrilateral-component.js** - Main integration component

## Basic Usage

### Simple Example

```javascript
{
  id: "my-quadrilateral",
  name: "demo-quad",
  type: "custom",
  coordinates: [100, 100, 1000, 700],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    gridRows: 10,
    gridCols: 10,
    showGrid: true,
    showDiagonals: false,
    showAngleMarkers: "all",
    showProperties: "panel",
    draggable: true
  }
}
```

## Props Reference

### Main Component Props

#### `componentType` (string, required)
Must be set to `"QuadrilateralComponent"` to use this component.

#### `quadType` (string, default: 'SQUARE')
Type of quadrilateral to display. Available types:
- `'SQUARE'` - All sides equal, all angles 90°
- `'RECTANGLE'` - Opposite sides equal, all angles 90°
- `'PARALLELOGRAM'` - Opposite sides parallel and equal
- `'RHOMBUS'` - All sides equal, opposite angles equal
- `'TRAPEZOID'` - One pair of parallel sides
- `'ISOSCELES_TRAPEZOID'` - One pair parallel, non-parallel sides equal
- `'RIGHT_TRAPEZOID'` - One pair parallel, two right angles
- `'KITE'` - Two pairs of adjacent sides equal
- `'IRREGULAR'` - No special properties

#### `gridRows` (number, default: 10)
Number of rows in the quad grid. Vertices snap to the intersections of these rows.

#### `gridCols` (number, default: 10)
Number of columns in the quad grid. Vertices snap to the intersections of these columns.

#### `coordinates` (Array<number>, required)
Container position in the main grid system: `[x1, y1, x2, y2]`
- Defines the bounding box for the entire quadrilateral component
- Example: `[100, 100, 1000, 700]`

#### `vertices` (Array<Object>, optional)
Custom initial vertex positions. If not provided, uses default positions from config.
- Format: `[{row: 0, col: 0}, {row: 0, col: 10}, {row: 10, col: 10}, {row: 10, col: 0}]`
- Vertices are in order: Top-left, Top-right, Bottom-right, Bottom-left

#### `showGrid` (boolean, default: true)
Whether to display the quad grid lines and points.

#### `showDiagonals` (boolean, default: false)
Whether to display the quadrilateral's diagonals.

#### `showAngleMarkers` (string, default: 'all')
Type of angle markers to display:
- `'none'` - No angle markers
- `'arc'` - Arc markers only
- `'measurement'` - Degree measurements only
- `'rightAngle'` - Right-angle squares only (for 90° angles)
- `'all'` - All applicable markers

#### `showProperties` (string, default: 'panel')
Property display mode:
- `'none'` - No property display
- `'panel'` - Show property panel
- `'visual'` - Show visual indicators on diagram (future feature)
- `'both'` - Show panel and visual indicators (future feature)

#### `draggable` (boolean, default: true)
Whether vertices can be dragged to new positions.

#### `onVertexChange` (Function, optional)
Callback function called when vertices are moved.
- Signature: `(newVertices) => void`
- Parameter: Array of new vertex positions `[{row, col}, ...]`

#### `sideColor` (string, default: '#000000')
Color for the quadrilateral sides.
- Accepts any CSS color value

#### `diagonalColor` (string, default: '#999999')
Color for diagonal lines (when `showDiagonals` is true).

#### `vertexColor` (string, default: '#FF9900')
Color for vertex hotspots.

#### `zIndex` (number, default: 50)
Base z-index for the component. Sub-elements use offsets from this value.

## Quadrilateral Types

### 1. Square
**Properties:**
- All sides equal
- All angles 90°
- Diagonals equal, perpendicular, and bisect each other
- 4 lines of symmetry
- Rotational symmetry of order 4

**Configuration:**
```javascript
quadType: "SQUARE"
```

### 2. Rectangle
**Properties:**
- Opposite sides equal
- All angles 90°
- Diagonals equal and bisect each other
- 2 lines of symmetry
- Rotational symmetry of order 2

**Configuration:**
```javascript
quadType: "RECTANGLE"
```

### 3. Parallelogram
**Properties:**
- Opposite sides parallel and equal
- Opposite angles equal
- Adjacent angles supplementary
- Diagonals bisect each other
- Rotational symmetry of order 2

**Configuration:**
```javascript
quadType: "PARALLELOGRAM"
```

### 4. Rhombus
**Properties:**
- All sides equal
- Opposite sides parallel
- Opposite angles equal
- Diagonals perpendicular and bisect each other
- 2 lines of symmetry
- Rotational symmetry of order 2

**Configuration:**
```javascript
quadType: "RHOMBUS"
```

### 5. Trapezoid
**Properties:**
- One pair of parallel sides
- No other special properties

**Configuration:**
```javascript
quadType: "TRAPEZOID"
```

### 6. Isosceles Trapezoid
**Properties:**
- One pair of parallel sides
- Non-parallel sides equal
- Diagonals equal
- 1 line of symmetry

**Configuration:**
```javascript
quadType: "ISOSCELES_TRAPEZOID"
```

### 7. Right Trapezoid
**Properties:**
- One pair of parallel sides
- Two right angles (adjacent)

**Configuration:**
```javascript
quadType: "RIGHT_TRAPEZOID"
```

### 8. Kite
**Properties:**
- Two pairs of adjacent sides equal
- One diagonal bisects the other
- Diagonals perpendicular
- 1 line of symmetry

**Configuration:**
```javascript
quadType: "KITE"
```

### 9. Irregular Quadrilateral
**Properties:**
- No special properties
- General four-sided polygon

**Configuration:**
```javascript
quadType: "IRREGULAR"
```

## Property Analysis

The component automatically analyzes and displays the following properties:

### 1. Parallel Sides
- **None**: No parallel sides
- **One pair**: One pair of opposite sides parallel
- **Two pairs**: Both pairs of opposite sides parallel

### 2. Equal Sides
- **None**: No equal sides
- **One opposite pair**: One pair of opposite sides equal
- **Two opposite pairs**: Both pairs of opposite sides equal
- **Two adjacent pairs**: Two pairs of adjacent sides equal (kite)
- **All four**: All sides equal

### 3. Opposite Angles Equal
Boolean property indicating if opposite angles are equal.

### 4. Adjacent Angles Supplementary
Boolean property indicating if adjacent angles sum to 180°.

### 5. All Right Angles
Boolean property indicating if all angles are 90°.

### 6. Diagonals Equal
Boolean property indicating if both diagonals have equal length.

### 7. Diagonals Bisect Each Other
Boolean property indicating if diagonals intersect at their midpoints.

### 8. Diagonals Perpendicular
Boolean property indicating if diagonals meet at 90°.

### 9. Line Symmetry
Number of lines of symmetry (0, 1, 2, or 4).

### 10. Rotational Symmetry
Order of rotational symmetry (1 = none, 2, 4).

## Complete Examples

### Example 1: Basic Square

```javascript
{
  id: "square-demo",
  name: "square-example",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    gridRows: 10,
    gridCols: 10,
    showGrid: true,
    showDiagonals: true,
    showAngleMarkers: "all",
    showProperties: "panel",
    draggable: true,
    sideColor: "#000000",
    diagonalColor: "#0066CC",
    vertexColor: "#FF6600"
  }
}
```

### Example 2: Non-draggable Rectangle

```javascript
{
  id: "rectangle-static",
  name: "rectangle-example",
  type: "custom",
  coordinates: [200, 150, 1000, 650],
  zIndex: 40,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "RECTANGLE",
    gridRows: 12,
    gridCols: 15,
    showGrid: false,
    showDiagonals: false,
    showAngleMarkers: "rightAngle",
    showProperties: "panel",
    draggable: false,
    sideColor: "#CC0000"
  }
}
```

### Example 3: Interactive Rhombus with Callback

```javascript
{
  id: "rhombus-interactive",
  name: "rhombus-example",
  type: "custom",
  coordinates: [100, 100, 900, 700],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "RHOMBUS",
    gridRows: 10,
    gridCols: 10,
    showGrid: true,
    showDiagonals: true,
    showAngleMarkers: "all",
    showProperties: "panel",
    draggable: true,
    onVertexChange: (newVertices) => {
      console.log("Vertices changed:", newVertices);
      // Analyze new properties
      const props = QuadrilateralConfig.analyzeProperties(newVertices);
      console.log("New properties:", props);
    },
    sideColor: "#9900CC",
    diagonalColor: "#FF9900"
  }
}
```

### Example 4: Custom Vertices

```javascript
{
  id: "custom-quad",
  name: "custom-example",
  type: "custom",
  coordinates: [100, 100, 1000, 700],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "IRREGULAR",
    gridRows: 12,
    gridCols: 12,
    vertices: [
      { row: 2, col: 3 },   // Top-left
      { row: 1, col: 9 },   // Top-right
      { row: 10, col: 8 },  // Bottom-right
      { row: 8, col: 1 }    // Bottom-left
    ],
    showGrid: true,
    showDiagonals: true,
    showAngleMarkers: "measurement",
    showProperties: "panel",
    draggable: true
  }
}
```

## Angle Markers

### Types of Angle Markers

#### Arc Markers
Curved arcs showing the angle at each vertex.
- Automatically sized proportionally
- Color customizable via angle marker color

#### Right Angle Squares
Special marker for 90° angles (within 2° tolerance).
- Displays as a small square at the vertex
- Only shown for right angles

#### Angle Measurements
Displays the exact angle value in degrees.
- Shows as a label near the vertex
- Rounded to nearest degree

### Marker Display Modes

```javascript
showAngleMarkers: "none"        // No markers
showAngleMarkers: "arc"         // Arc only
showAngleMarkers: "measurement" // Degrees only
showAngleMarkers: "rightAngle"  // Right-angle squares only
showAngleMarkers: "all"         // All applicable markers
```

## Grid System

### QuadGrid Coordinates

The component uses an internal grid coordinate system:
- Rows numbered from 0 to `gridRows`
- Columns numbered from 0 to `gridCols`
- Grid points are intersections where vertices can snap
- Independent from the main page grid system

### Snapping Behavior

When dragging vertices:
1. Mouse position is converted to nearest grid point
2. Grid point is highlighted with visual feedback
3. On release, vertex snaps to highlighted point
4. Occupied points are avoided (vertices can't overlap)

### Grid Visibility

```javascript
showGrid: true  // Show grid lines and points
showGrid: false // Hide grid (vertices still snap)
```

## Property Panel

The property panel displays:
1. **Quadrilateral Type Name**
2. **10 Geometric Properties** with checkmarks/crosses
3. **Angle Measurements** for all four angles

### Property Display Format

Each property shows:
- ✓ (checkmark) for active properties
- × (cross) for inactive properties
- Descriptive text value
- Color coding (green for active, gray for inactive)

## Configuration API

### QuadrilateralConfig Object

```javascript
// Get configuration for a quadrilateral type
QuadrilateralConfig.getConfig('SQUARE')

// Get default vertices for a type
QuadrilateralConfig.getDefaultVertices('RECTANGLE', 10, 10)

// Get all available types
QuadrilateralConfig.getAllTypes()

// Analyze properties from vertices
const properties = QuadrilateralConfig.analyzeProperties([
  { row: 0, col: 0 },
  { row: 0, col: 10 },
  { row: 10, col: 10 },
  { row: 10, col: 0 }
])
```

### Utility Functions

```javascript
// Grid coordinate conversion
QuadGridUtils.screenToGrid(mouseX, mouseY, containerRect, gridRows, gridCols)
QuadGridUtils.gridToPercent(row, col, gridRows, gridCols)
QuadGridUtils.gridToPageCoordinates(row, col, gridRows, gridCols, containerCoords)

// Angle calculations
AngleMarkerUtils.calculateAngle(vertex, prevVertex, nextVertex)
AngleMarkerUtils.calculateAllAngles(vertices)
AngleMarkerUtils.isRightAngle(angle, tolerance)
AngleMarkerUtils.anglesEqual(angle1, angle2, tolerance)
```

## Styling and Customization

### Colors

```javascript
sideColor: "#000000"      // Black sides
diagonalColor: "#0066CC"  // Blue diagonals
vertexColor: "#FF9900"    // Orange vertices
```

### Grid Appearance

Grid styling is defined in the component:
- Grid lines: Light gray, semi-transparent
- Grid points: Small circles, semi-transparent
- Snap highlight: Orange, larger circle

### Z-Index Layering

Component uses stacked z-index values:
- Base: `zIndex`
- Grid: `zIndex + 10`
- Diagonals: `zIndex + 15`
- Sides: `zIndex + 20`
- Vertices: `zIndex + 50`
- Angle markers: `zIndex + 100`
- Property panel: `zIndex + 200`

## Integration with Other Components

The quadrilateral component integrates with:
1. **LineComponent** - For drawing sides and diagonals
2. **HotspotComponent** - For draggable vertices
3. **GridPrecisionConfig** - For coordinate conversion
4. **GridCellFontUtils** - For GC unit processing

## Best Practices

1. **Grid Size**: Use 10-15 rows/cols for optimal snapping
2. **Container Size**: Ensure adequate space (minimum 600x500 grid units)
3. **Property Panel**: Position panel outside quad container for visibility
4. **Vertex Dragging**: Enable grid display when dragging for better feedback
5. **Color Contrast**: Use contrasting colors for sides vs. diagonals
6. **Performance**: Avoid very large grids (>20×20) for smooth dragging

## Troubleshooting

### Vertices Not Dragging

**Problem**: Clicking vertices doesn't initiate drag

**Solutions:**
- Check `draggable: true` is set
- Verify z-index allows interaction
- Check if grid container is covering vertices
- Ensure mouse events aren't blocked

### Property Panel Not Visible

**Problem**: Panel doesn't appear

**Solutions:**
- Check `showProperties` is not 'none'
- Verify panel coordinates are within viewport
- Check z-index is high enough
- Confirm QuadrilateralConfig is loaded

### Grid Not Showing

**Problem**: Grid lines invisible

**Solutions:**
- Check `showGrid: true`
- Verify container coordinates are valid
- Check grid colors aren't matching background
- Ensure quad-grid-component.js is loaded

### Incorrect Property Detection

**Problem**: Properties not matching expected values

**Solutions:**
- Check vertex positions are accurate
- Verify tolerance values in config
- Test with default vertices first
- Log analyzed properties for debugging

## Advanced Usage

### Dynamic Type Switching

```javascript
// In your page logic
const switchQuadType = (newType) => {
  // Update element props
  const element = document.getElementById('my-quad');
  if (element) {
    // Trigger re-render with new type
    window.updateElementProps('my-quad', {
      quadType: newType
    });
  }
};
```

### Custom Property Analysis

```javascript
const analyzeCustomQuad = (vertices) => {
  const props = QuadrilateralConfig.analyzeProperties(vertices);
  
  // Add custom checks
  const customProps = {
    ...props,
    isConvex: checkConvexity(vertices),
    area: calculateArea(vertices),
    perimeter: calculatePerimeter(vertices)
  };
  
  return customProps;
};
```

## Version History

- **v1.0.0**: Initial release
  - 9 quadrilateral types
  - Interactive grid with snapping
  - Real-time property analysis
  - Angle markers with multiple modes
  - Comprehensive property panel

## Related Documentation

- [Hotspot Component](HOTSPOT-COMPONENT.md)
- [Line Component](LINE-COMPONENT.md)
- [Grid Positioning System](gridpositions.md)

## Support

For issues or questions about the Quadrilateral Component, refer to the inline code documentation or check the examples in PageConfig.js.

