# Snap Point Format Simplification

## Change Summary

Simplified the snap point array format from `{row, col, label}` to `{x, y, label}` for better clarity and consistency.

## Before (Old Format)

```javascript
snapPoints: [
  { row: 300, col: 800, label: "Top Left" },
  { row: 300, col: 1200, label: "Top Right" },
  { row: 500, col: 800, label: "Bottom Left" }
]
```

**Issues:**
- `row` and `col` naming was confusing
- `row` represented Y coordinate, `col` represented X coordinate
- Counterintuitive for users familiar with (x, y) conventions

## After (New Format)

```javascript
snapPoints: [
  { x: 800, y: 300, label: "Top Left" },
  { x: 1200, y: 300, label: "Top Right" },
  { x: 800, y: 500, label: "Bottom Left" }
]
```

**Benefits:**
- ✅ Clear and intuitive `{x, y}` coordinate format
- ✅ Matches common coordinate system conventions
- ✅ Easier to understand: `x` is horizontal, `y` is vertical
- ✅ Simpler for users: `{x: 800, y: 300}` or just `{800, 300}`

## Files Updated

1. **`js/components/protractor-component.js`**
   - Updated prop documentation
   - Updated `findNearestSnapPoint()` to use `point.x` and `point.y`
   - Updated `handleDragMove()` to use `{x, y}`
   - Updated `handleDragEnd()` to use `{x, y}`
   - Updated snap indicators rendering to use `{x, y}`

2. **`js/PageConfig.js`**
   - Updated example snap points on Page 1

3. **`PROTRACTOR-SNAP-POINTS.md`**
   - Updated all documentation examples
   - Updated snap point format specification
   - Updated usage examples

4. **`QUICK-TEST-SNAP-POINTS.md`**
   - Updated all test examples
   - Updated configuration snippets

## Migration Guide

If you have existing code using the old format, simply rename the properties:

```javascript
// Old format
{ row: 300, col: 800, label: "Point A" }

// New format
{ x: 800, y: 300, label: "Point A" }
```

**Note:** The values are also swapped! In the old format:
- `row` was the Y coordinate (vertical)
- `col` was the X coordinate (horizontal)

In the new format:
- `x` is the X coordinate (horizontal) 
- `y` is the Y coordinate (vertical)

## Examples

### Simple Format (No Labels)

```javascript
snapPoints: [
  { x: 800, y: 300 },
  { x: 1200, y: 300 },
  { x: 1000, y: 500 }
]
```

### With Labels

```javascript
snapPoints: [
  { x: 800, y: 300, label: "Top" },
  { x: 1200, y: 300, label: "Right" },
  { x: 1000, y: 500, label: "Bottom" }
]
```

### Quadrilateral Vertices

```javascript
snapPoints: [
  { x: 650, y: 250, label: "∠A" },
  { x: 850, y: 250, label: "∠B" },
  { x: 850, y: 450, label: "∠C" },
  { x: 650, y: 450, label: "∠D" }
]
```

## Technical Details

### Coordinate System

The coordinates still use the same grid system:
- Grid: 1600 columns × 900 rows (default)
- X range: 0 to 1600
- Y range: 0 to 900
- Origin (0, 0) is top-left corner

### Conversion to Pixels

Internal conversion remains the same, just with clearer naming:

```javascript
// Convert grid coordinates to viewport percentage
const xPercent = (point.x / gridCols) * 100;
const yPercent = (point.y / gridRows) * 100;

// Convert grid coordinates to pixels
const pixelX = (point.x / gridCols) * viewportWidth;
const pixelY = (point.y / gridRows) * viewportHeight;
```

### Distance Calculation

```javascript
const distance = Math.sqrt(
  Math.pow(currentX - snapPoint.x, 2) + 
  Math.pow(currentY - snapPoint.y, 2)
);
```

## Backward Compatibility

⚠️ **Breaking Change:** The old `{row, col}` format is no longer supported. All snap points must use the new `{x, y}` format.

If you have existing configurations, update them using the migration guide above.

## Testing

All snap functionality has been tested with the new format:
- ✅ Snap point detection
- ✅ Distance calculations
- ✅ Visual indicators
- ✅ All three snap modes (free, fixed, hybrid)
- ✅ Mouse centering during drag
- ✅ Position persistence after snap

## Summary

This change makes the snap point API more intuitive and user-friendly by using standard `{x, y}` coordinate notation instead of the confusing `{row, col}` format. The functionality remains exactly the same, only the naming has been simplified.

