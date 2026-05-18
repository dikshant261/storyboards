# Parallel Lines Animation

## Overview

The **Parallel Lines Animation** feature provides a visual demonstration that two opposite sides of a quadrilateral are parallel. The animation extends both sides with dashed "rails" and slides the entire quadrilateral along these rails, proving that the sides remain parallel throughout the motion.

This is particularly useful for demonstrating properties of parallelograms, trapezoids, rectangles, rhombuses, and squares.

## How It Works

The animation:
1. Extends both parallel sides with dashed lines (equal length on each end, creating "rails")
2. Keeps the original sides with their existing style and color
3. Moves the entire quadrilateral along these rails
4. Oscillates back and forth smoothly
5. Shows that both parallel sides always stay on their respective rails
6. Displays a customizable message while the animation is active

## Side Pairs

The quadrilateral has two pairs of potentially parallel sides:

- **Pair 0**: Side AB (vertices 0→1) and Side CD (vertices 2→3)
- **Pair 1**: Side BC (vertices 1→2) and Side DA (vertices 3→0)

## Visual Characteristics

- **Rail Extensions**: Dashed lines extending from each end of the parallel sides
- **Extension Length**: Configurable, defaults to equal to the side length
- **Original Sides**: Retain their original color, thickness, and style during animation
- **Quadrilateral Movement**: Entire shape (vertices, sides) moves together along the rails
- **Animation**: Smooth oscillation with cubic easing
- **Message**: Customizable text with blinking effect

## Usage

### Basic Usage

```javascript
// In PageConfig.js
{
  type: 'quadrilateral',
  props: {
    // ... other quadrilateral props ...
    
    parallelLinesAnimationConfig: {
      duration: 1500,        // Animation duration for one direction in ms
      waitTime: 500,         // Pause time at each end in ms
      cycles: 3,             // Number of oscillation cycles (-1 for infinite)
      speed: 0.5,            // Speed multiplier (0.5 = half speed, 1 = normal, 2 = double speed)
      extensionRatio: 1,     // Extension length as ratio of side length
      extensionColor: '#888888',  // Color for dashed extensions
      message: 'These sides are parallel!'
    }
  }
}
```

### Triggering the Animation

The animation can be triggered using several methods:

#### Method 1: Direct Element Reference

```javascript
// Get the quadrilateral element by ID
const quadElement = document.getElementById('page1-quadrilateral-demo');

// Animate pair 0 (AB and CD)
quadElement.animateParallelLines(0);

// Animate pair 1 (BC and DA)
quadElement.animateParallelLines(1);

// Stop the animation
quadElement.stopParallelLinesAnimation();
```

#### Method 2: Global Function

```javascript
// Using the auto-generated global function (hyphens replaced with underscores)
window.animateParallelLines_page1_quadrilateral_demo(0);  // Pair 0
window.animateParallelLines_page1_quadrilateral_demo(1);  // Pair 1
```

#### Method 3: Global Registry

```javascript
// Using the global registry (supports hyphens in IDs)
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateParallelLines(0);

// Or using element name
window.quadrilateralAnimations['myQuad'].animateParallelLines(1);
```

### Pair Index Reference

- `0` = Animate AB and CD (Side 0 and Side 2)
- `1` = Animate BC and DA (Side 1 and Side 3)

## Configuration Reference

### `parallelLinesAnimationConfig` Object

All properties are optional with sensible defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | number | 1500 | Animation duration for one direction in milliseconds |
| `waitTime` | number | 500 | Pause time at each end position in milliseconds |
| `cycles` | number | -1 | Number of complete oscillation cycles. Use -1 for infinite loop, 0+ for finite cycles |
| `speed` | number | 1 | Speed multiplier. 1 = normal speed, 0.5 = half speed, 2 = double speed. Divides duration to control speed |
| `speedFactor` | number | 1 | Alternative to speed (same effect) |
| `extensionRatio` | number | 1 | How much to extend each side as a ratio of the side length (1 = equal to side length) |
| `movementRatio` | number | 0.5 | How far the quadrilateral moves as a ratio of the side length. 0.5 = moves 50% of side length in each direction |
| `travelDistance` | number | 0.5 | Alternative to movementRatio (same effect) |
| `extensionColor` | string | '#888888' | Color for the dashed extension lines |
| `message` | string | 'These sides are parallel!' | Text message displayed during animation |
| `messagePosition` | object | See below | Position configuration for the message |

### `messagePosition` Object

Configure where the message appears:

**Option 1: Relative to Quadrilateral Center (Default)**

```javascript
messagePosition: {
  offsetX: 0,     // Horizontal offset in percentage (0 = centered)
  offsetY: -8     // Vertical offset in percentage (negative = above)
}
```

**Option 2: Absolute Position**

```javascript
messagePosition: {
  left: 50,    // Absolute left position in percentage of viewport
  top: 30      // Absolute top position in percentage of viewport
}
```

## Examples

### Example 1: Basic Parallel Lines Demo

```javascript
parallelLinesAnimationConfig: {
  duration: 1500,
  waitTime: 500,
  cycles: 3,
  message: 'AB is parallel to CD'
}

// Then call:
quadElement.animateParallelLines(0);
```

### Example 1b: Half Speed Animation

```javascript
parallelLinesAnimationConfig: {
  duration: 1500,
  waitTime: 500,
  cycles: 3,
  speed: 0.5,  // Half speed - animation will take twice as long
  message: 'AB is parallel to CD'
}

// Then call:
quadElement.animateParallelLines(0);
```

### Example 1c: Custom Movement Distance

```javascript
parallelLinesAnimationConfig: {
  duration: 1500,
  waitTime: 500,
  cycles: 3,
  movementRatio: 0.3,  // Move only 30% of side length in each direction (smaller movement)
  extensionRatio: 1.5,  // Extend rails 1.5x side length (longer rails)
  message: 'AB is parallel to CD'
}

// Or for larger movement:
parallelLinesAnimationConfig: {
  duration: 1500,
  waitTime: 500,
  cycles: 3,
  movementRatio: 0.75,  // Move 75% of side length in each direction (larger movement)
  extensionRatio: 2,    // Extend rails 2x side length to accommodate larger movement
  message: 'AB is parallel to CD'
}
```

### Example 2: Infinite Loop with Custom Extensions

```javascript
parallelLinesAnimationConfig: {
  duration: 2000,
  waitTime: 800,
  cycles: -1,           // Loop forever
  extensionRatio: 1.5,  // Longer extensions (1.5x side length)
  extensionColor: '#666666',
  message: 'Parallel sides of a parallelogram',
  messagePosition: {
    left: 50,
    top: 15
  }
}
```

### Example 3: Quick Demo

```javascript
parallelLinesAnimationConfig: {
  duration: 800,
  waitTime: 300,
  cycles: 5,
  extensionRatio: 0.75,  // Shorter extensions
  message: 'BC || DA'
}

// Then call:
quadElement.animateParallelLines(1);  // Pair 1 (BC and DA)
```

### Example 4: Slow, Detailed Demonstration

```javascript
parallelLinesAnimationConfig: {
  duration: 3000,       // Slow movement
  waitTime: 1500,       // Long pause at ends
  cycles: 2,
  extensionRatio: 1.2,
  extensionColor: '#555555',
  message: 'Notice how the sides stay on the rails - they are parallel!',
  messagePosition: {
    offsetX: 0,
    offsetY: -15
  }
}
```

## Console API

When the quadrilateral component loads, it logs the available animation methods:

```
✅ Parallel lines animation available:
   - Helper method: element.animateParallelLines(pairIndex) // 0=AB/CD, 1=BC/DA
   - Stop method: element.stopParallelLinesAnimation()
   - Global function: window.animateParallelLines_myQuad(pairIndex)
   - Registry: window.quadrilateralAnimations['myQuad'].animateParallelLines(pairIndex)
```

## Animation Phases

The animation cycles through the following phases:

1. **moving-forward**: Quadrilateral slides forward along the rails (progress 0 → 0.5)
2. **waiting-forward**: Holding position at forward end (progress = 0.5)
3. **moving-backward**: Quadrilateral slides backward through center to opposite end (progress 0.5 → -0.5)
4. **waiting-backward**: Holding position at backward end (progress = -0.5)
5. **returning-center**: Returns to original position (progress -0.5 → 0)

## Technical Details

### Animation State

The component maintains the following state during animation:

```javascript
{
  pairIndex: number,         // Which pair is being animated (0 or 1)
  startTime: number,         // Animation start timestamp
  moveDuration: number,      // Duration of movement phase
  waitTime: number,          // Duration of wait phase
  halfCycleDuration: number, // moveDuration + waitTime
  fullCycleDuration: number, // Complete cycle duration
  maxCycles: number,         // Total cycles to complete
  currentCycle: number,      // Current cycle count
  phase: string,             // Current animation phase
  progress: number           // Current progress (-0.5 to 0.5)
}
```

### Rail Extension Calculation

For each parallel side:
- Extension before start point = side length × extensionRatio
- Extension after end point = side length × extensionRatio
- Total rail length = original side + 2 × extension

### Movement Calculation

- Maximum movement distance = extension length × 0.5
- Progress range: -0.5 to 0.5 (0 = original position)
- Movement is along the direction of the first parallel side

### Coordinate System

The animation uses the same percentage-based coordinate system as the quadrilateral component, ensuring accurate positioning across different viewport sizes and grid configurations.

## Integration with Other Features

The parallel lines animation works seamlessly with:

- **Other Animations**: Can run after other animations complete
- **Vertex Dragging**: Animation uses current vertex positions
- **Side Styling**: Original side colors/styles are preserved
- **Property Panel**: Properties display normally during animation

## Best Practices

1. **Pair Selection**: Choose the pair that's actually parallel in your quadrilateral
2. **Extension Ratio**: Use 1.0 for standard demos, adjust for visual clarity
3. **Duration**: Balance speed with clarity
   - Fast: 800-1200ms
   - Medium: 1500-2000ms (recommended)
   - Slow: 2500-3500ms
4. **Cycles**: Use finite cycles (2-5) for teaching demos, infinite (-1) for continuous displays
5. **Message**: Keep messages concise and relevant to what's being demonstrated

## Troubleshooting

### Animation Doesn't Start

**Issue**: Calling `animateParallelLines()` but nothing happens

**Solutions**:
- Verify the quadrilateral element exists and is rendered
- Check that the pair index is valid (0 or 1)
- Check browser console for error messages
- Ensure pairIndex parameter is provided (it's required)

### Animation Looks Wrong

**Issue**: Quadrilateral doesn't move smoothly or rails look incorrect

**Solutions**:
- Verify the sides are actually parallel in your quadrilateral
- Check that vertices are positioned correctly
- Try adjusting the extensionRatio for better visibility

### Rails Don't Extend Properly

**Issue**: Extension lines are too short or too long

**Solutions**:
- Adjust `extensionRatio` in the config
- Default is 1.0 (equal to side length)
- Use smaller values (0.5-0.8) for shorter extensions
- Use larger values (1.2-2.0) for longer extensions

### Message Not Visible

**Issue**: Animation runs but message doesn't appear

**Solutions**:
- Check message position - it may be off-screen
- Verify message text is provided in config
- Adjust messagePosition offsets
- Check z-index conflicts with other elements

## Related Documentation

- [QUADRILATERAL-COMPONENT.md](QUADRILATERAL-COMPONENT.md) - Main quadrilateral component documentation
- [OPPOSITE-SIDE-EQUALITY-ANIMATION.md](OPPOSITE-SIDE-EQUALITY-ANIMATION.md) - Opposite side equality animation
- [SIDE-EQUALITY-ANIMATION.md](SIDE-EQUALITY-ANIMATION.md) - Adjacent side equality animation
- [ANGLE-EQUALITY-ANIMATION.md](ANGLE-EQUALITY-ANIMATION.md) - Angle equality animation feature

