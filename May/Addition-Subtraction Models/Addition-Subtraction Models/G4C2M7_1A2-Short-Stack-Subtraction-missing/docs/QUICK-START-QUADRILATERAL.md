# Quadrilateral Component - Quick Start Guide

## Installation

The component is already integrated. Just ensure all files are loaded in index.html (already done).

## Quick Examples

### 1. Simple Square (5 seconds)

```javascript
{
  id: "my-square",
  name: "square",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE"
  }
}
```

### 2. Interactive Rectangle (10 seconds)

```javascript
{
  id: "my-rectangle",
  name: "rectangle",
  type: "custom",
  coordinates: [100, 100, 900, 650],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "RECTANGLE",
    showDiagonals: true,
    showAngleMarkers: "all",
    draggable: true
  }
}
```

### 3. Custom Grid Size (15 seconds)

```javascript
{
  id: "my-rhombus",
  name: "rhombus",
  type: "custom",
  coordinates: [100, 100, 1000, 700],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "RHOMBUS",
    gridRows: 15,
    gridCols: 15,
    showGrid: true,
    showDiagonals: true
  }
}
```

### 4. Custom Colors (20 seconds)

```javascript
{
  id: "my-kite",
  name: "kite",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "KITE",
    sideColor: "#0066CC",
    diagonalColor: "#FF6600",
    vertexColor: "#00CC66",
    showDiagonals: true
  }
}
```

### 5. With Callback (30 seconds)

```javascript
{
  id: "interactive-quad",
  name: "quad",
  type: "custom",
  coordinates: [100, 100, 900, 700],
  zIndex: 50,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "PARALLELOGRAM",
    draggable: true,
    onVertexChange: (newVertices) => {
      console.log("Vertices:", newVertices);
      const props = QuadrilateralConfig.analyzeProperties(newVertices);
      console.log("Properties:", props);
    }
  }
}
```

## All Quadrilateral Types

Copy-paste any of these:

```javascript
quadType: "SQUARE"
quadType: "RECTANGLE"
quadType: "PARALLELOGRAM"
quadType: "RHOMBUS"
quadType: "TRAPEZOID"
quadType: "ISOSCELES_TRAPEZOID"
quadType: "RIGHT_TRAPEZOID"
quadType: "KITE"
quadType: "IRREGULAR"
```

## All Props (Default Values)

```javascript
{
  componentType: "QuadrilateralComponent",  // REQUIRED
  quadType: "SQUARE",                       // Default: "SQUARE"
  gridRows: 10,                             // Default: 10
  gridCols: 10,                             // Default: 10
  coordinates: [x1, y1, x2, y2],            // REQUIRED
  showGrid: true,                           // Default: true
  showDiagonals: false,                     // Default: false
  showAngleMarkers: "all",                  // Default: "all"
  showProperties: "panel",                  // Default: "panel"
  draggable: true,                          // Default: true
  sideColor: "#000000",                     // Default: black
  diagonalColor: "#999999",                 // Default: gray
  vertexColor: "#FF9900",                   // Default: orange
  zIndex: 50                                // Default: 50
}
```

## Angle Marker Options

```javascript
showAngleMarkers: "none"        // No markers
showAngleMarkers: "arc"         // Arc only
showAngleMarkers: "measurement" // Degrees only
showAngleMarkers: "rightAngle"  // Right-angle squares
showAngleMarkers: "all"         // Everything
```

## Property Display Options

```javascript
showProperties: "none"   // No property display
showProperties: "panel"  // Show panel (default)
```

## Programmatic Access

### Get Configuration
```javascript
const config = QuadrilateralConfig.getConfig('SQUARE');
console.log(config);
```

### Analyze Vertices
```javascript
const vertices = [
  { row: 0, col: 0 },
  { row: 0, col: 10 },
  { row: 10, col: 10 },
  { row: 10, col: 0 }
];
const properties = QuadrilateralConfig.analyzeProperties(vertices);
console.log(properties);
```

### Get All Types
```javascript
const types = QuadrilateralConfig.getAllTypes();
console.log(types);
// ['SQUARE', 'RECTANGLE', 'PARALLELOGRAM', 'RHOMBUS', ...]
```

## Common Use Cases

### 1. Educational Demo
Show a specific quadrilateral with all properties:
```javascript
quadType: "SQUARE",
showGrid: true,
showDiagonals: true,
showAngleMarkers: "all",
showProperties: "panel",
draggable: false  // Prevent changes
```

### 2. Interactive Exercise
Let students manipulate and explore:
```javascript
quadType: "IRREGULAR",
showGrid: true,
draggable: true,
showAngleMarkers: "measurement",
onVertexChange: checkStudentWork
```

### 3. Property Comparison
Show multiple quadrilaterals side by side:
```javascript
// Quad 1: coordinates: [100, 100, 600, 600]
// Quad 2: coordinates: [700, 100, 1200, 600]
```

### 4. Minimal Display
Just the shape, no extras:
```javascript
showGrid: false,
showDiagonals: false,
showAngleMarkers: "none",
showProperties: "none",
draggable: false
```

## Troubleshooting

### Quad doesn't appear
- Check `componentType: "QuadrilateralComponent"` is set
- Verify coordinates are within viewport
- Check z-index isn't too low

### Grid not showing
- Set `showGrid: true`
- Check container coordinates

### Can't drag vertices
- Set `draggable: true`
- Check z-index of other elements

### Properties not displaying
- Set `showProperties: "panel"`
- Check panel position (right of container)

## Tips

1. **Grid Size**: 10-15 rows/cols works best
2. **Container Size**: Minimum 500×400 for good visibility
3. **Colors**: Use contrasting colors for clarity
4. **Z-Index**: Leave room for panel (uses zIndex + 200)
5. **Performance**: Avoid grids larger than 20×20

## Next Steps

1. Read full documentation: `QUADRILATERAL-COMPONENT.md`
2. Check implementation details: `IMPLEMENTATION-SUMMARY.md`
3. Explore examples in `js/PageConfig.js`

## Support

For detailed API reference, see `QUADRILATERAL-COMPONENT.md`
For technical implementation, see component source files
For examples, see `js/PageConfig.js` page 1

