# Quadrilateral Component Animations Guide

This guide documents all available animations in the `QuadrilateralComponent` and how to use them.

## Quick Reference Table

| # | Animation | Method | Purpose |
|---|-----------|--------|---------|
| 1 | **Angle Equality** | `animateAngleEquality()` | Moves one angle to another vertex to demonstrate they are equal |
| 2 | **Angle Sum** | `animateAngleSum()` | Shows two angles sum to 180° (supplementary angles) |
| 3 | **Side Equality** | `animateSideEquality()` | Rotates adjacent sides around a vertex to show they are equal |
| 4 | **Opposite Side Equality** | `animateOppositeSideEquality()` | Translates opposite sides to show they are equal in length |
| 5 | **Diagonal Equality** | `animateDiagonalEquality()` | Shows the two diagonals are equal in length |
| 6 | **Diagonal Bisection** | `animateDiagonalBisection()` | Shows diagonals bisect each other (divide into equal parts) |
| 7 | **Diagonal Perpendicular Bisection** | `animateDiagonalPerpendicularBisection()` | Shows diagonals are perpendicular AND bisect each other |
| 8 | **Parallel Lines** | `animateParallelLines()` | Moves quadrilateral along parallel tracks to show sides are parallel |
| 9 | **Update Side Colors** | `updateQuadSides()` | Changes side colors and blinking state (utility function) |
| 10 | **Trigger Parallel Animation** | `triggerParallelAnimation()` | Wrapper to trigger parallel animation with callback (utility function) |
| 11 | **Add Parallel Arrows** | `addParallelArrows()` | Adds chevron symbols to indicate parallel sides (utility function) |

## Table of Contents

1. [Core Animation Methods](#core-animation-methods)
2. [Utility Functions](#utility-functions)
3. [Access Methods](#access-methods)
4. [Configuration Options](#configuration-options)
5. [Examples](#examples)

---

## Core Animation Methods

### 1. Angle Equality Animation

**Purpose**: Moves one angle to another vertex to visually demonstrate they are equal.

**Method**: `animateAngleEquality(sourceVertexIndex, targetVertexIndex, duration)`

**Parameters**:
- `sourceVertexIndex` (number, 0-3): Index of the source vertex (0=A, 1=B, 2=C, 3=D)
- `targetVertexIndex` (number, 0-3): Index of the target vertex where the angle will move
- `duration` (number, optional): Animation duration in milliseconds (default: from config)

**Stop Method**: `stopAngleEqualityAnimation()`

**Example**:
```javascript
// Move angle A to angle C to show they're equal
element.animateAngleEquality(0, 2, 2000);

// Stop the animation
element.stopAngleEqualityAnimation();
```

**Configuration** (in `PageConfig.js`):
```javascript
angleAnimationConfig: {
  duration: 2000, // milliseconds
  message: "The angles are perfectly equal!",
  messagePosition: {
    offsetX: 0,
    offsetY: -8 // 8% above target vertex
  }
}
```

---

### 2. Angle Sum Animation

**Purpose**: Demonstrates that two angles sum to 180° (supplementary angles).

**Method**: `animateAngleSum(vertex1Index, vertex2Index, duration, mode)`

**Parameters**:
- `vertex1Index` (number, 0-3): First vertex index
- `vertex2Index` (number, 0-3): Second vertex index
- `duration` (number, optional): Animation duration in milliseconds
- `mode` (string, optional): Animation mode - `'adjacent'` | `'neutral'` | `'straightLine'` (default: from config)

**Stop Method**: `stopAngleSumAnimation()`

**Example**:
```javascript
// Show angles at vertices A and B sum to 180°
element.animateAngleSum(0, 1, 2000, 'adjacent');

// Stop the animation
element.stopAngleSumAnimation();
```

**Configuration**:
```javascript
angleSumAnimationConfig: {
  duration: 2000,
  animationMode: 'adjacent', // 'adjacent' | 'neutral' | 'straightLine'
  displayMode: 'sideBySide', // 'sideBySide' | 'merged'
  message: "These angles add up to 180°!"
}
```

---

### 3. Side Equality Animation

**Purpose**: Rotates adjacent sides around a common vertex to show they are equal in length.

**Method**: `animateSideEquality(commonVertexIndex)`

**Parameters**:
- `commonVertexIndex` (number, 0-3): The vertex where the two sides meet

**Stop Method**: `stopSideEqualityAnimation()`

**Example**:
```javascript
// Rotate sides around vertex B (index 1) to show AB = BC
element.animateSideEquality(1);

// Stop the animation
element.stopSideEqualityAnimation();
```

**Configuration**:
```javascript
sideEqualityAnimationConfig: {
  duration: 1000, // Rotation duration
  waitTime: 1000, // Wait time at each position
  cycles: -1, // -1 for infinite, 0+ for finite
  message: "Adjacent sides are equal!"
}
```

---

### 4. Opposite Side Equality Animation

**Purpose**: Translates opposite sides to demonstrate they are equal in length.

**Method**: `animateOppositeSideEquality(pairIndex)`

**Parameters**:
- `pairIndex` (number | undefined): 
  - `0` = Animate AB and CD
  - `1` = Animate BC and DA
  - `undefined` = Animate both pairs

**Stop Method**: `stopOppositeSideAnimation()`

**Example**:
```javascript
// Animate AB and CD to show they're equal
element.animateOppositeSideEquality(0);

// Animate BC and DA to show they're equal
element.animateOppositeSideEquality(1);

// Animate both pairs
element.animateOppositeSideEquality();

// Stop the animation
element.stopOppositeSideAnimation();
```

**Configuration**:
```javascript
oppositeSideAnimationConfig: {
  duration: 1000, // Translation duration
  waitTime: 1000, // Wait time at each position
  cycles: -1, // -1 for infinite
  message: "Opposite sides are equal!",
  color1: 'orange', // Color for pair 0 (AB/CD)
  color2: '#3399FF' // Color for pair 1 (BC/DA)
}
```

---

### 5. Diagonal Equality Animation

**Purpose**: Shows that the two diagonals are equal in length.

**Method**: `animateDiagonalEquality()`

**Parameters**: None

**Stop Method**: `stopDiagonalEqualityAnimation()`

**Example**:
```javascript
// Show diagonals are equal
element.animateDiagonalEquality();

// Stop the animation
element.stopDiagonalEqualityAnimation();
```

---

### 6. Diagonal Bisection Animation

**Purpose**: Demonstrates that the diagonals bisect each other (divide into equal parts).

**Method**: `animateDiagonalBisection()`

**Parameters**: None

**Stop Method**: `stopDiagonalBisectionAnimation()`

**Example**:
```javascript
// Show diagonals bisect each other
element.animateDiagonalBisection();

// Stop the animation
element.stopDiagonalBisectionAnimation();
```

---

### 7. Diagonal Perpendicular Bisection Animation

**Purpose**: Shows that diagonals are perpendicular to each other AND bisect each other.

**Method**: `animateDiagonalPerpendicularBisection()`

**Parameters**: None

**Stop Method**: `stopDiagonalPerpendicularAnimation()`

**Example**:
```javascript
// Show diagonals are perpendicular and bisect
element.animateDiagonalPerpendicularBisection();

// Stop the animation
element.stopDiagonalPerpendicularAnimation();
```

---

### 8. Parallel Lines Animation

**Purpose**: Moves the quadrilateral along parallel tracks to demonstrate that opposite sides are parallel.

**Method**: `animateParallelLines(pairIndex, onComplete)`

**Parameters**:
- `pairIndex` (number): 
  - `0` = Animate AB and CD (first pair)
  - `1` = Animate BC and DA (second pair)
- `onComplete` (function, optional): Callback function called when animation finishes

**Stop Method**: `stopParallelLinesAnimation()`

**Example**:
```javascript
// Animate AB and CD to show they're parallel
element.animateParallelLines(0, () => {
  console.log('Animation complete!');
  // Add symbols or update UI here
});

// Animate BC and DA
element.animateParallelLines(1);

// Stop the animation
element.stopParallelLinesAnimation();
```

**Configuration**:
```javascript
parallelLinesAnimationConfig: {
  duration: 1500, // Animation duration for one direction
  waitTime: 500, // Pause time at each end
  cycles: 2, // Number of oscillation cycles (-1 for infinite)
  speed: 1, // Speed multiplier (>1 = faster, <1 = slower)
  trackLength: 2, // Length of parallel tracks as ratio of side length
  movementRatio: 0.5, // How far quad moves (0.5 = 50% of side length)
  trackStrokeWidth: "3gc", // Stroke width of tracks
  message: "These sides are parallel!" // (can be empty string to disable)
}
```

**Important**: The animation always returns to the original (center) position after completing the specified cycles, ensuring the quadrilateral ends where it started.

---

## Utility Functions

These functions are available via `window.QuadrilateralAnimations` and provide additional control over the quadrilateral.

### 9. Update Side Colors

**Purpose**: Change the color and blinking state of specific sides.

**Method**: `window.QuadrilateralAnimations.updateQuadSides(quadComponentId, side1Color, side2Color, side1Blink, side2Blink, side1Index, side2Index)`

**Parameters**:
- `quadComponentId` (string): ID of the quadrilateral component
- `side1Color` (string): Color for first side (e.g., `'#00FF00'`)
- `side2Color` (string): Color for second side
- `side1Blink` (boolean): Whether first side should blink
- `side2Blink` (boolean): Whether second side should blink
- `side1Index` (number, optional): Index of first side (0=AB, 1=BC, 2=CD, 3=DA, default: 0)
- `side2Index` (number, optional): Index of second side (default: 2)

**Example**:
```javascript
// Make AB and CD green and blinking
window.QuadrilateralAnimations.updateQuadSides(
  'page3-shape-display',
  '#00FF00', // AB color
  '#00FF00', // CD color
  true,      // AB blink
  true,      // CD blink
  0,         // AB index
  2          // CD index
);

// Stop blinking (set blink to false)
window.QuadrilateralAnimations.updateQuadSides(
  'page3-shape-display',
  '#00FF00',
  '#00FF00',
  false,     // Stop blinking
  false,
  0,
  2
);
```

---

### 10. Trigger Parallel Animation

**Purpose**: Wrapper function to trigger parallel lines animation with a completion callback.

**Method**: `window.QuadrilateralAnimations.triggerParallelAnimation(quadComponentId, pairIndex, onComplete)`

**Parameters**:
- `quadComponentId` (string): ID of the quadrilateral component
- `pairIndex` (number): 0 for AB/CD, 1 for BC/DA
- `onComplete` (function): Callback when animation completes

**Example**:
```javascript
window.QuadrilateralAnimations.triggerParallelAnimation(
  'page3-shape-display',
  0, // AB and CD
  () => {
    console.log('Parallel animation complete!');
    // Add symbols or update UI
  }
);
```

---

### 11. Add Parallel Arrows

**Purpose**: Add chevron symbols (single or double) to indicate parallel sides.

**Method**: `window.QuadrilateralAnimations.addParallelArrows(quadComponentId, side1Index, side2Index, pairName, arrowColor, doubleChevron)`

**Parameters**:
- `quadComponentId` (string): ID of the quadrilateral component
- `side1Index` (number): Index of first side (0=AB, 1=BC, 2=CD, 3=DA)
- `side2Index` (number): Index of second side
- `pairName` (string): Name for the pair (used for data attribute, e.g., `'AB-CD'`)
- `arrowColor` (string): Color for the chevrons (e.g., `'#FF6600'`)
- `doubleChevron` (boolean): If `true`, draw double chevron (||), if `false`, single chevron (|)

**Example**:
```javascript
// Add single chevron arrows for AB and CD
window.QuadrilateralAnimations.addParallelArrows(
  'page3-shape-display',
  0,          // AB
  2,          // CD
  'AB-CD',    // Pair name
  '#006400',  // Dark green
  false       // Single chevron
);

// Add double chevron arrows for BC and DA
window.QuadrilateralAnimations.addParallelArrows(
  'page3-shape-display',
  1,          // BC
  3,          // DA
  'BC-DA',    // Pair name
  '#CC4400',  // Dark orange
  true        // Double chevron
);
```

**Note**: The arrows are added directly to the quadrilateral's SVG, so they move with the quad during animations.

---

## Access Methods

There are three ways to access animation methods:

### Method 1: Direct Element Access

Get the element by ID and call methods directly:

```javascript
const quadElement = document.getElementById('page3-shape-display');
quadElement.animateParallelLines(0);
```

### Method 2: Global Window Functions

Functions are exposed as global window functions with the component ID:

```javascript
// Function name format: animate[AnimationName]_[componentId]
window.animateParallelLines_page3_shape_display(0);
window.animateAngleEquality_page3_shape_display(0, 2, 2000);
```

### Method 3: Registry Access

Access via the `window.quadrilateralAnimations` registry:

```javascript
// By component ID
window.quadrilateralAnimations['page3-shape-display'].animateParallelLines(0);

// By element name
window.quadrilateralAnimations['shape-display'].animateParallelLines(0);
```

---

## Configuration Options

All animations can be configured in `PageConfig.js` when defining the quadrilateral component. Here's a comprehensive example:

```javascript
{
  id: "page3-shape-display",
  name: "shape-display",
  type: "custom",
  coordinates: [0, 0, 880, 800],
  props: {
    componentType: "QuadrilateralComponent",
    
    // Basic shape configuration
    quadType: "PARALLELOGRAM",
    vertices: [[100, 100], [300, 100], [250, 200], [50, 200]],
    gridRows: 20,
    gridCols: 20,
    
    // Visual styling
    fillColor: "#25CEFC",
    edgeColor: "#F08080",
    edgeThickness: "6gc",
    
    // Vertex configuration
    vertexConfig: {
      showLabels: true,
      animated: false, // Disable pulsating markers
      innerCircleSize: "0gc" // Remove black marks
    },
    
    // Angle equality animation config
    angleAnimationConfig: {
      duration: 2000,
      message: "The angles are perfectly equal!",
      messagePosition: {
        offsetX: 0,
        offsetY: -8
      }
    },
    
    // Parallel lines animation config
    parallelLinesAnimationConfig: {
      duration: 1500,
      waitTime: 500,
      cycles: 2,
      speed: 1,
      trackLength: 2,
      movementRatio: 0.5,
      trackStrokeWidth: "3gc",
      message: "" // Empty string to disable built-in message
    },
    
    // Other animation configs...
    sideEqualityAnimationConfig: { /* ... */ },
    oppositeSideAnimationConfig: { /* ... */ },
    // etc.
  }
}
```

---

## Examples

### Example 1: Complete Parallel Lines Animation Sequence

This example shows how to create a complete animation sequence for demonstrating parallel sides:

```javascript
// Step 1: Display initial message
updateMessageBox("Opposite sides are parallel because they maintain the same distance between them.");

// Step 2: Highlight and blink AB and CD
setTimeout(() => {
  window.QuadrilateralAnimations.updateQuadSides(
    'page3-shape-display',
    '#00FF00', // Green
    '#00FF00',
    true,  // Blink
    true,
    0,     // AB
    2      // CD
  );
  
  // Step 3: Trigger parallel animation
  setTimeout(() => {
    window.QuadrilateralAnimations.triggerParallelAnimation(
      'page3-shape-display',
      0, // AB and CD
      () => {
        // Step 4: Animation complete - add symbols
        setTimeout(() => {
          window.QuadrilateralAnimations.updateQuadSides(
            'page3-shape-display',
            '#00FF00',
            '#00FF00',
            false, // Stop blinking
            false,
            0,
            2
          );
          
          window.QuadrilateralAnimations.addParallelArrows(
            'page3-shape-display',
            0, 2, 'AB-CD', '#006400', false
          );
        }, 500);
      }
    );
  }, 1000);
}, 1000);
```

### Example 2: Using the QuadAnimationSequenceComponent

For complex sequences, use the `QuadAnimationSequenceComponent`:

```javascript
{
  id: "page3-animation-sequence",
  type: "custom",
  props: {
    componentType: "QuadAnimationSequenceComponent",
    sequenceConfig: {
      quadComponentId: "page3-shape-display",
      messageBoxId: "page3-messagebox",
      
      firstPair: {
        side1Index: 0, // AB
        side2Index: 2, // CD
        highlightColor: "#00FF00",
        chevronColor: "#006400",
        doubleChevron: false,
        provenMessage: "AB and CD are parallel to each other"
      },
      
      secondPair: {
        side1Index: 1, // BC
        side2Index: 3, // DA
        highlightColor: "#FF6600",
        chevronColor: "#CC4400",
        doubleChevron: true,
        provenMessage: "BC and DA are parallel to each other"
      },
      
      timing: {
        messageDuration: 1000,
        sideHighlightDuration: 1000,
        parallelAnimationCycles: 2,
        symbolDelay: 500
      },
      
      conclusionMessage: "Two pairs of opposite sides are parallel"
    }
  }
}
```

### Example 3: Angle Equality Demonstration

```javascript
const quadElement = document.getElementById('my-quad');

// Show that angle A equals angle C
quadElement.animateAngleEquality(0, 2, 2000);

// After 3 seconds, stop the animation
setTimeout(() => {
  quadElement.stopAngleEqualityAnimation();
}, 3000);
```

### Example 4: Side Equality with Custom Colors

```javascript
// First, highlight the sides
window.QuadrilateralAnimations.updateQuadSides(
  'my-quad',
  '#FF6600', // Orange
  '#FF6600',
  false,
  false,
  0, // AB
  1  // BC
);

// Then animate to show they're equal
const quadElement = document.getElementById('my-quad');
quadElement.animateSideEquality(1); // Rotate around vertex B
```

---

## Tips and Best Practices

1. **Always stop animations before starting new ones** to avoid conflicts:
   ```javascript
   element.stopParallelLinesAnimation();
   element.animateParallelLines(0);
   ```

2. **Use callbacks for sequential animations**:
   ```javascript
   element.animateParallelLines(0, () => {
     // This runs after animation completes
     element.animateParallelLines(1);
   });
   ```

3. **Coordinate messages with animations** using the message box component or the built-in message system.

4. **Use utility functions for side highlighting** - they're more reliable than direct DOM manipulation.

5. **Test animation timing** - some animations may need delays between steps for better UX.

6. **Use the QuadAnimationSequenceComponent** for complex multi-step sequences rather than managing timeouts manually.

---

## Troubleshooting

### Animation not starting?
- Check that the element ID is correct
- Verify the component is fully rendered (use `setTimeout` if needed)
- Check browser console for errors

### Animation not stopping?
- Call the corresponding `stop*` method
- Check if multiple animations are running simultaneously

### Symbols not appearing?
- Ensure `addParallelArrows` is called after the animation completes
- Check that the `quadComponentId` matches the actual component ID
- Verify the SVG structure hasn't changed

### Colors not updating?
- Use `window.QuadrilateralAnimations.updateQuadSides` instead of direct DOM manipulation
- Ensure the side indices are correct (0=AB, 1=BC, 2=CD, 3=DA)

---

## Related Files

- `js/components/quadrilateral-component.js` - Main component with all animation methods
- `js/components/quadrilateral-animations.js` - Utility functions for side colors and symbols
- `js/components/quad-animation-sequence-component.js` - Component for complex animation sequences
- `js/PageConfig.js` - Configuration for all components

---

*Last updated: December 2025*

