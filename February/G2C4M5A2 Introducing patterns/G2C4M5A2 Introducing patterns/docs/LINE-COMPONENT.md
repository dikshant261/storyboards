# Line Component Documentation

## Overview

The `LineComponent` is a flexible React component for rendering lines on the page. It supports three line types (horizontal, vertical, and slanted) and two subtypes (regular lines and arrows with arrowheads). The component uses a coordinate-based positioning system and supports various border styles including solid, dashed, and dotted lines.

## Features

- **Three Line Types**: Horizontal, vertical, and slanted/diagonal lines
- **Two Subtypes**: Regular lines and arrows with arrowheads
- **Flexible Styling**: Customizable border width, color, and style (solid, dashed, dotted, etc.)
- **Grid Cell Units**: Supports `gc` units for responsive sizing
- **Coordinate-Based Positioning**: Uses `[x1, y1, x2, y2]` coordinates for precise placement
- **Arrowhead Support**: Automatic arrowhead positioning and rotation for arrow subtype
- **Clickable**: Optional click handler support
- **Z-Index Control**: Configurable layering

## Props Reference

### Required Props

#### `componentType` (string, required)
Must be set to `"LineComponent"` to use this component.
- **Example**: `componentType: "LineComponent"`

#### `coordinates` (Array<number>, required)
Array of four numbers `[x1, y1, x2, y2]` defining the line endpoints.
- **x1, y1**: Starting point coordinates (in grid units)
- **x2, y2**: Ending point coordinates (in grid units)
- **Note**: For vertical lines, `x2` is automatically adjusted to `x1 + borderWidth`. For horizontal lines, `y2` is automatically adjusted to `y1 + borderWidth`.
- **Example**: `coordinates: [200, 300, 600, 300]` (horizontal line from x=200 to x=600 at y=300)

### Core Props

#### `lineType` (string, default: `'horizontal'`)
Type of line to render.
- **Values**: 
  - `'horizontal'`: Horizontal line (width spans from x1 to x2, height = borderWidth)
  - `'vertical'`: Vertical line (height spans from y1 to y2, width = borderWidth)
  - `'slanted'`: Diagonal/slanted line (connects x1,y1 to x2,y2 at any angle)
- **Example**: `lineType: "vertical"`

#### `lineSubtype` (string, default: `'line'`)
Subtype of the line.
- **Values**:
  - `'line'`: Regular line without arrowhead (default)
  - `'arrow'`: Line with arrowhead at the end point (x2, y2)
- **Example**: `lineSubtype: "arrow"`

### Styling Props

#### `borderWidth` (string, default: `'2gc'`)
Width/thickness of the line (supports `gc` units or pixels).
- **Values**: Size string with units (e.g., `'2gc'`, `'3px'`, `'5gc'`)
- **Note**: For vertical lines, this becomes the line width. For horizontal lines, this becomes the line height.
- **Example**: `borderWidth: "3gc"`

#### `borderColor` (string, default: `'#000000'`)
Color of the line.
- **Values**: Any valid CSS color value (hex, rgb, rgba, named colors)
- **Example**: `borderColor: "#FF0000"` (red line)

#### `borderStyle` (string, default: `'solid'`)
Style of the line border.
- **Values**: 
  - `'solid'`: Solid line
  - `'dashed'`: Dashed line
  - `'dotted'`: Dotted line
  - `'double'`: Double line
  - Any other valid CSS border-style value
- **Example**: `borderStyle: "dashed"`

#### `backgroundColor` (string, default: `'transparent'`)
Background color of the line container (usually transparent).
- **Values**: Any valid CSS color value
- **Example**: `backgroundColor: "transparent"`

### Arrowhead Props (for `lineSubtype: 'arrow'`)

#### `arrowheadSize` (string, default: `'10gc'`)
Size of the arrowhead triangle (supports `gc` units or pixels).
- **Values**: Size string with units (e.g., `'10gc'`, `'15px'`, `'20gc'`)
- **Note**: Larger values create bigger arrowheads
- **Example**: `arrowheadSize: "15gc"`

### Layout Props

#### `zIndex` (number|string, default: `1000`)
Z-index value for layering (higher values appear on top).
- **Values**: Number or string representing z-index
- **Example**: `zIndex: 50`

#### `cursor` (string, default: `'default'`)
Cursor style when hovering over the line.
- **Values**: CSS cursor value (e.g., `'default'`, `'pointer'`, `'crosshair'`)
- **Example**: `cursor: "pointer"`

### Interaction Props

#### `onClick` (Function, optional)
Click handler function called when the line is clicked.
- **Signature**: `(event) => void`
- **Parameters**:
  - `event`: React synthetic event
- **Example**: 
  ```javascript
  onClick: (e) => {
    console.log("Line clicked!");
    // Your custom logic here
  }
  ```

## Line Types

### Horizontal Lines

Horizontal lines extend from left to right (or right to left).

**Characteristics:**
- Height = `borderWidth`
- Width spans from `x1` to `x2` in coordinates
- Uses `borderTop` CSS property for rendering
- Arrowhead (if enabled) appears at the right edge (if x2 > x1) or left edge (if x2 < x1)

**Example:**
```javascript
{
  componentType: "LineComponent",
  lineType: "horizontal",
  coordinates: [200, 300, 600, 300], // From x=200 to x=600 at y=300
  borderWidth: "3gc",
  borderColor: "#000000",
  borderStyle: "dashed"
}
```

### Vertical Lines

Vertical lines extend from top to bottom (or bottom to top).

**Characteristics:**
- Width = `borderWidth`
- Height spans from `y1` to `y2` in coordinates
- Uses `borderLeft` CSS property for rendering
- Arrowhead (if enabled) appears at the bottom edge (if y2 > y1) or top edge (if y2 < y1)

**Example:**
```javascript
{
  componentType: "LineComponent",
  lineType: "vertical",
  coordinates: [400, 200, 400, 500], // From y=200 to y=500 at x=400
  borderWidth: "3gc",
  borderColor: "#FF0000",
  borderStyle: "dotted"
}
```

### Slanted Lines

Slanted/diagonal lines connect two points at any angle.

**Characteristics:**
- Calculates length using distance formula: `√((x2-x1)² + (y2-y1)²)`
- Calculates angle using `atan2(dy, dx)`
- Uses CSS `transform: rotate()` to achieve the correct angle
- Width = calculated pixel length, Height = `borderWidth`
- Uses `borderTop` CSS property, then rotated
- Arrowhead (if enabled) appears at the end point and rotates to match line direction

**Example:**
```javascript
{
  componentType: "LineComponent",
  lineType: "slanted",
  coordinates: [100, 100, 500, 400], // Diagonal line
  borderWidth: "3gc",
  borderColor: "#0000FF",
  borderStyle: "dashed"
}
```

## Line Subtypes

### Regular Line (`lineSubtype: 'line'`)

The default subtype, renders a simple line without any arrowhead.

**Example:**
```javascript
{
  componentType: "LineComponent",
  lineType: "horizontal",
  lineSubtype: "line", // or omit (default)
  coordinates: [200, 300, 600, 300],
  borderWidth: "3gc",
  borderColor: "#000000"
}
```

### Arrow (`lineSubtype: 'arrow'`)

Renders a line with an arrowhead at the end point (x2, y2). The arrowhead automatically:
- Points in the direction of the line (from x1,y1 toward x2,y2)
- Matches the line color
- Sizes according to `arrowheadSize` prop
- Works with all line types (horizontal, vertical, slanted)

**Example:**
```javascript
{
  componentType: "LineComponent",
  lineType: "horizontal",
  lineSubtype: "arrow",
  coordinates: [600, 300, 1000, 300],
  borderWidth: "3gc",
  borderColor: "#000000",
  borderStyle: "dashed",
  arrowheadSize: "12gc"
}
```

## Complete Examples

### Example 1: Simple Horizontal Line

```javascript
{
  id: "page2-line-1",
  name: "page2-line-1",
  type: "custom",
  coordinates: [200, 300, 600, 300],
  zIndex: 50,
  props: {
    componentType: "LineComponent",
    lineType: "horizontal",
    lineSubtype: "line",
    borderWidth: "3gc",
    borderColor: "#000000",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    cursor: "default"
  }
}
```

### Example 2: Vertical Arrow

```javascript
{
  id: "page2-vertical-arrow",
  name: "page2-vertical-arrow",
  type: "custom",
  coordinates: [400, 200, 400, 500],
  zIndex: 50,
  props: {
    componentType: "LineComponent",
    lineType: "vertical",
    lineSubtype: "arrow",
    borderWidth: "3gc",
    borderColor: "#FF0000",
    borderStyle: "solid",
    arrowheadSize: "15gc",
    backgroundColor: "transparent"
  }
}
```

### Example 3: Slanted Dashed Arrow

```javascript
{
  id: "page2-slanted-arrow",
  name: "page2-slanted-arrow",
  type: "custom",
  coordinates: [100, 100, 500, 400],
  zIndex: 50,
  props: {
    componentType: "LineComponent",
    lineType: "slanted",
    lineSubtype: "arrow",
    borderWidth: "3gc",
    borderColor: "#0000FF",
    borderStyle: "dashed",
    arrowheadSize: "12gc",
    backgroundColor: "transparent"
  }
}
```

### Example 4: Clickable Line

```javascript
{
  id: "page2-clickable-line",
  name: "page2-clickable-line",
  type: "custom",
  coordinates: [100, 100, 300, 100],
  zIndex: 50,
  props: {
    componentType: "LineComponent",
    lineType: "horizontal",
    lineSubtype: "line",
    borderWidth: "5gc",
    borderColor: "#00FF00",
    borderStyle: "solid",
    cursor: "pointer",
    onClick: (e) => {
      console.log("Line clicked!");
      alert("You clicked the line!");
    }
  }
}
```

## Coordinate System

The line component uses a grid-based coordinate system:

- **Grid Dimensions**: Typically 1600 columns × 900 rows (configurable via `GridPrecisionConfig`)
- **Coordinates**: `[x1, y1, x2, y2]` where:
  - `x1, y1`: Starting point (top-left is approximately 1,1)
  - `x2, y2`: Ending point
- **Positioning**: Coordinates are converted to percentage-based CSS positioning for responsiveness

**Important Notes:**
- For vertical lines: `x2` is automatically set to `x1 + borderWidth` (the line width)
- For horizontal lines: `y2` is automatically set to `y1 + borderWidth` (the line height)
- For slanted lines: Both x2 and y2 are used as specified

## Arrowhead Implementation

The arrowhead is implemented using CSS border triangles:

- **Shape**: Created using `borderLeft`, `borderRight`, and `borderBottom` CSS properties
- **Positioning**: Positioned absolutely at the end of the line container
- **Rotation**: Automatically rotated to point in the direction of the line
- **Color**: Matches the `borderColor` of the line
- **Size**: Controlled by `arrowheadSize` prop

**Arrowhead Positioning:**
- **Horizontal lines (x2 > x1)**: Right edge, pointing right
- **Horizontal lines (x2 < x1)**: Left edge, pointing left
- **Vertical lines (y2 > y1)**: Bottom edge, pointing down
- **Vertical lines (y2 < y1)**: Top edge, pointing up
- **Slanted lines**: End point, pointing in calculated direction

## Best Practices

1. **Use Appropriate Line Types**: Choose `horizontal`, `vertical`, or `slanted` based on your needs
2. **Coordinate Planning**: Plan your coordinates carefully - for horizontal/vertical lines, ensure the non-varying coordinate matches
3. **Border Width**: Use `gc` units for responsive sizing that scales with the grid
4. **Arrowhead Size**: Make arrowhead size proportional to line width (typically 3-5x the borderWidth)
5. **Z-Index Management**: Set appropriate z-index values to control layering
6. **Border Styles**: Use `dashed` or `dotted` for guidelines, `solid` for emphasis
7. **Color Contrast**: Ensure line colors have sufficient contrast against the background

## Troubleshooting

### Arrowhead Not Visible

**Symptoms**: Arrow subtype is set but arrowhead doesn't appear

**Possible Causes & Solutions:**
1. **Arrowhead too small**: Increase `arrowheadSize` (e.g., `"20gc"` instead of `"10gc"`)
2. **Z-index too low**: Increase `zIndex` value
3. **Container overflow**: Ensure parent container has `overflow: visible` (component handles this)
4. **Color mismatch**: Verify `borderColor` is visible against background
5. **Check console**: Look for "LineComponent: Arrowhead not created" messages

### Line Not Rendering

**Symptoms**: Line component doesn't appear on page

**Possible Causes & Solutions:**
1. **Missing coordinates**: Ensure `coordinates` array has exactly 4 numbers
2. **Invalid coordinates**: Check that coordinates are within grid bounds
3. **Zero dimensions**: For horizontal lines, ensure x1 ≠ x2. For vertical, ensure y1 ≠ y2
4. **Z-index too low**: Line might be behind other elements
5. **Transparent color**: Verify `borderColor` is not transparent

### Slanted Line Angle Incorrect

**Symptoms**: Slanted line doesn't connect the specified points correctly

**Possible Causes & Solutions:**
1. **Coordinate calculation**: Verify coordinates are correct
2. **Viewport size**: Slanted lines use viewport dimensions for pixel calculation - ensure viewport is properly sized
3. **Transform origin**: Component uses `transform-origin: 0 0` for correct rotation

### Arrowhead Direction Wrong

**Symptoms**: Arrowhead points in wrong direction

**Possible Causes & Solutions:**
1. **Coordinate order**: Ensure coordinates go from start (x1,y1) to end (x2,y2)
2. **Line direction**: For horizontal lines, x2 should be > x1 for right-pointing arrow
3. **Rotation calculation**: Check browser console for rotation values

## API Summary

### Props Summary Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentType` | String | Required | Must be `"LineComponent"` |
| `coordinates` | Array<number> | Required | `[x1, y1, x2, y2]` positioning |
| `lineType` | String | `'horizontal'` | `'horizontal'`, `'vertical'`, or `'slanted'` |
| `lineSubtype` | String | `'line'` | `'line'` or `'arrow'` |
| `borderWidth` | String | `'2gc'` | Line thickness (supports gc) |
| `borderColor` | String | `'#000000'` | Line color |
| `borderStyle` | String | `'solid'` | `'solid'`, `'dashed'`, `'dotted'`, etc. |
| `backgroundColor` | String | `'transparent'` | Container background color |
| `arrowheadSize` | String | `'10gc'` | Arrowhead size (supports gc) |
| `zIndex` | Number/String | `1000` | Z-index value |
| `cursor` | String | `'default'` | Cursor style |
| `onClick` | Function | Optional | Click handler |

## Version History

- **v1.0.0**: Initial release with horizontal, vertical, and slanted line support
- **v1.1.0**: Added arrow subtype with arrowhead support
- **v1.1.1**: Fixed arrowhead positioning and rotation logic
- **v1.1.2**: Improved arrowhead visibility and container overflow handling

## Related Components

- **HotspotComponent**: For clickable circular hotspots
- **TileComponent**: For rectangular tiles with mode support
- **TableGridComponent**: For structured data tables

## Notes

- The component uses CSS borders for line rendering, which allows for dashed/dotted styles
- Arrowheads are created using CSS border triangles for performance
- All positioning is percentage-based for responsive behavior
- The component automatically handles coordinate adjustments for horizontal/vertical lines
- Grid cell units (`gc`) are converted to pixels based on viewport and grid dimensions

