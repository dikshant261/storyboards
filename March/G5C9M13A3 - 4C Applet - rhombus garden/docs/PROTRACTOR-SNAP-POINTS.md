# Protractor Snap Points Feature

## Overview

The protractor component now supports **snap points** - predefined positions where the protractor can automatically align when dragged nearby. This feature includes three different snap modes for different use cases.

## Features

### Snap Modes

1. **Free Mode** (`snapMode: "free"`)
   - No snapping behavior
   - Protractor can be dropped anywhere
   - Default behavior

2. **Fixed Mode** (`snapMode: "fixed"`)
   - Protractor MUST snap to one of the defined snap points
   - Cannot be dropped at arbitrary positions
   - If dropped away from snap points, automatically snaps to the nearest one
   - Use case: When you want to restrict protractor placement to specific positions only

3. **Hybrid Mode** (`snapMode: "hybrid"`)
   - Protractor can be dropped anywhere
   - Automatically snaps when dragged near a snap point (within threshold)
   - Provides magnetic snapping while allowing free placement
   - Use case: Most flexible - helps with precise placement while allowing freedom

### Visual Indicators

- Each snap point is shown as a circular indicator on the screen
- **Orange indicators**: Normal snap points
- **Green indicators**: Currently nearest snap point when dragging
- **Labels**: Optional text labels for each snap point
- Indicators glow when the protractor is near them
- Can be hidden with `showSnapIndicators: false`

### Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapPoints` | Array | `[]` | Array of snap point objects: `[{x, y, label}, ...]` |
| `snapMode` | String | `"free"` | Snap mode: `"free"`, `"fixed"`, or `"hybrid"` |
| `snapThreshold` | Number | `50` | Distance in pixels to trigger snap |
| `showSnapIndicators` | Boolean | `true` | Show/hide visual snap point indicators |

## Usage Examples

### Basic Hybrid Snapping

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Snap configuration
  snapMode: "hybrid",
  snapThreshold: 50,
  showSnapIndicators: true,
  snapPoints: [
    { x: 800, y: 300, label: "Top Left" },
    { x: 1200, y: 300, label: "Top Right" },
    { x: 1000, y: 500, label: "Center" }
  ]
}
```

### Fixed Snapping (Restricted Placement)

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Fixed mode - must snap to one of these points
  snapMode: "fixed",
  snapThreshold: 75,
  snapPoints: [
    { x: 400, y: 200 },
    { x: 800, y: 400 },
    { x: 1200, y: 600 }
  ]
}
```

### Quadrilateral Vertex Snapping

```javascript
{
  componentType: "ProtractorComponent",
  
  // Snap to quadrilateral vertices
  snapMode: "hybrid",
  snapThreshold: 60,
  snapPoints: [
    { x: 650, y: 250, label: "Vertex A" },
    { x: 850, y: 250, label: "Vertex B" },
    { x: 850, y: 450, label: "Vertex C" },
    { x: 650, y: 450, label: "Vertex D" }
  ]
}
```

### No Snapping (Free Placement)

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Free mode - no snapping
  snapMode: "free"
  // No need to define snapPoints
}
```

## Snap Point Format

Each snap point is an object with the following properties:

```javascript
{
  x: 800,          // Grid X coordinate (required)
  y: 450,          // Grid Y coordinate (required)
  label: "Point A" // Optional text label shown below indicator
}
```

**Simplified format:** Just `{x, y}` coordinates in grid units (matches the grid system used throughout the application).

## Behavior Details

### During Dragging

1. As you drag the protractor, the system continuously checks distance to all snap points
2. The nearest snap point (within threshold) is highlighted in green
3. All other snap points remain orange
4. Console logs show when entering/exiting snap zones

### On Drop

**Free Mode:**
- Protractor stays exactly where you dropped it
- No position adjustment

**Hybrid Mode:**
- If dropped within threshold of a snap point → snaps to that point
- If dropped away from all snap points → stays where dropped
- Provides visual feedback during dragging

**Fixed Mode:**
- If dropped within threshold of a snap point → snaps to that point
- If dropped away from all snap points → snaps to the absolute nearest point
- Ensures protractor is always at a valid snap point

### Visual Feedback

The snap indicators provide real-time visual feedback:

```css
Normal snap point:
- Orange border (#FF6600)
- Light orange fill (rgba(255, 102, 0, 0.2))
- Subtle glow

Nearest snap point (when dragging):
- Green border (#00FF00)
- Light green fill (rgba(0, 255, 0, 0.2))
- Bright glow effect
```

## Dynamic Snap Points

Snap points can be dynamically updated based on other elements:

```javascript
// Example: Update snap points when quadrilateral moves
const getQuadVertices = () => {
  // Get current quadrilateral vertices
  return [
    { x: quad.vertices[0].col, y: quad.vertices[0].row, label: "A" },
    { x: quad.vertices[1].col, y: quad.vertices[1].row, label: "B" },
    { x: quad.vertices[2].col, y: quad.vertices[2].row, label: "C" },
    { x: quad.vertices[3].col, y: quad.vertices[3].row, label: "D" }
  ];
};

// Use in protractor props
{
  snapPoints: getQuadVertices()
}
```

## Console Logging

The snap system provides helpful console logs:

```
📍 Snapped to: Top Left
📍 Snapped to: Vertex A (250, 650)
⚠️ Fixed mode: Snapping to nearest point
```

## Best Practices

1. **Choose the Right Mode:**
   - Use `free` when placement doesn't matter
   - Use `hybrid` for most interactive scenarios (best UX)
   - Use `fixed` when placement must be restricted (e.g., educational exercises)

2. **Set Appropriate Threshold:**
   - Too small (< 30px): Hard to trigger snaps
   - Too large (> 100px): Snaps from too far away
   - Recommended: 40-60px for most cases

3. **Label Important Points:**
   - Add labels to help users understand snap points
   - Keep labels short (e.g., "A", "B", "C" or "Top", "Bottom")

4. **Visual Clarity:**
   - Use snap points sparingly (3-6 points is ideal)
   - Too many snap points can be visually cluttered
   - Can hide indicators with `showSnapIndicators: false` if needed

5. **Combine with Other Features:**
   - Use with `onAngleChange` to track measurements at snap points
   - Combine with quadrilateral vertex positions for angle measurement exercises

## Integration with Quadrilaterals

Example of using protractor with quadrilateral angle markers:

```javascript
// Page configuration with quadrilateral and snapping protractor
{
  // Quadrilateral
  {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    showAngleMarkers: "all"
  },
  
  // Protractor with vertex snapping
  {
    componentType: "ProtractorComponent",
    snapMode: "hybrid",
    snapThreshold: 50,
    snapPoints: [
      { x: 650, y: 250, label: "∠A" },
      { x: 850, y: 250, label: "∠B" },
      { x: 850, y: 450, label: "∠C" },
      { x: 650, y: 450, label: "∠D" }
    ]
  }
}
```

## Technical Notes

- Snap points use grid coordinates (row, col) for consistency with other components
- Distance calculations convert to pixels for threshold checking
- Snap indicators are rendered with fixed positioning (always visible)
- Z-index set to 9999 to ensure indicators are always on top
- Snap detection runs during drag move and drag end events

## Performance Considerations

- Distance calculations run on every drag move event
- For large numbers of snap points (> 20), consider optimizing
- Snap indicators are memoized to prevent unnecessary re-renders
- Indicator updates only when nearestSnapPoint state changes

