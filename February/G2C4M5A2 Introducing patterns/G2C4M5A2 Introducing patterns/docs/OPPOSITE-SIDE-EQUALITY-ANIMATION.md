# Opposite Side Equality Animation

## Overview

The **Opposite Side Equality Animation** feature provides a visual demonstration that opposite sides of a quadrilateral are equal in length. The animation creates a copy of one side and translates it in a straight line to superimpose on the opposite side, proving that both sides have the same length.

This is particularly useful for demonstrating properties of parallelograms, rectangles, rhombuses, and squares.

## How It Works

The animation:
1. Creates a copy of one side (e.g., AB)
2. Translates this copy in a straight line toward the opposite side (e.g., CD)
3. Superimposes the copy on the opposite side
4. Waits for a configurable duration
5. Translates back to the original position
6. Repeats for a specified number of cycles (or infinitely)
7. Displays a customizable message while the animation is active

## Side Pairs

The quadrilateral has two pairs of opposite sides:

- **Pair 0**: Side AB (vertices 0→1) and Side CD (vertices 2→3)
- **Pair 1**: Side BC (vertices 1→2) and Side DA (vertices 3→0)

## Visual Characteristics

- **Line Style**: Dashed or solid (configurable)
- **Line Thickness**: Matches the quadrilateral side thickness
- **Colors**: 
  - Pair 0 (AB/CD): Orange/yellow blinking (default)
  - Pair 1 (BC/DA): Blue/cyan blinking (default)
- **Animation**: Smooth translation with cubic easing
- **Message**: Customizable text with blinking effect

## Usage

### Basic Usage

```javascript
// In PageConfig.js
{
  type: 'quadrilateral',
  props: {
    // ... other quadrilateral props ...
    
    oppositeSideAnimationConfig: {
      duration: 1000,      // Translation duration in ms
      waitTime: 1000,      // Wait time at each position in ms
      cycles: 3,           // Number of cycles (-1 for infinite)
      message: 'Opposite sides are equal!'
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

// Animate pair 0 (AB → CD)
quadElement.animateOppositeSideEquality(0);

// Animate pair 1 (BC → DA)
quadElement.animateOppositeSideEquality(1);

// Animate both pairs sequentially
quadElement.animateOppositeSideEquality();

// Stop the animation
quadElement.stopOppositeSideAnimation();
```

#### Method 2: Global Function

```javascript
// Using the auto-generated global function (hyphens replaced with underscores)
window.animateOppositeSideEquality_page1_quadrilateral_demo(0);  // Pair 0
window.animateOppositeSideEquality_page1_quadrilateral_demo(1);  // Pair 1
window.animateOppositeSideEquality_page1_quadrilateral_demo();   // Both pairs
```

#### Method 3: Global Registry

```javascript
// Using the global registry (supports hyphens in IDs)
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateOppositeSideEquality(0);

// Or using element name
window.quadrilateralAnimations['myQuad'].animateOppositeSideEquality(1);
```

### Pair Index Reference

- `0` = Animate AB → CD (Side 0 translates to Side 2)
- `1` = Animate BC → DA (Side 1 translates to Side 3)
- `undefined` = Animate both pairs sequentially

## Configuration Reference

### `oppositeSideAnimationConfig` Object

All properties are optional with sensible defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | number | 1000 | Translation duration in milliseconds |
| `waitTime` | number | 1000 | Wait time at each position in milliseconds |
| `cycles` | number | -1 | Number of complete cycles. Use -1 for infinite loop, 0+ for finite cycles |
| `message` | string | 'Opposite sides are equal!' | Text message displayed during animation |
| `lineStyle` | string | 'dashed' | Line style: 'dashed' or 'solid' |
| `style` | string | 'dashed' | Alternative to lineStyle (same effect) |
| `color1` | string | 'orange' | Line color for pair 0 (AB/CD) |
| `color` | string | 'orange' | Alternative to color1 (same effect) |
| `color2` | string | '#3399FF' | Line color for pair 1 (BC/DA) |
| `messagePosition` | object | See below | Position configuration for the message |

### `messagePosition` Object

Configure where the message appears:

**Option 1: Relative to Line Midpoint (Default)**

```javascript
messagePosition: {
  offsetX: 0,     // Horizontal offset in percentage (0 = centered)
  offsetY: -12    // Vertical offset in percentage (negative = above)
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

### Example 1: Animate One Pair

```javascript
oppositeSideAnimationConfig: {
  duration: 1500,
  waitTime: 1000,
  cycles: 5,
  message: 'AB = CD',
  lineStyle: 'solid',
  color1: '#FF6600'
}

// Then call:
quadElement.animateOppositeSideEquality(0);  // Only AB → CD
```

### Example 2: Animate Both Pairs with Different Colors

```javascript
oppositeSideAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 3,
  message: 'Opposite sides are equal!',
  lineStyle: 'dashed',
  color1: 'orange',    // For AB/CD pair
  color2: '#00CCFF'    // For BC/DA pair
}

// Then call:
quadElement.animateOppositeSideEquality();  // Both pairs sequentially
```

### Example 3: Infinite Loop Animation

```javascript
oppositeSideAnimationConfig: {
  duration: 800,
  waitTime: 500,
  cycles: -1,         // Loop forever
  message: 'Parallelogram property!',
  messagePosition: {
    left: 50,
    top: 20
  }
}
```

### Example 4: Custom Colors

```javascript
oppositeSideAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 3,
  message: 'Opposite sides are equal!',
  lineStyle: 'solid',
  color1: '#FF0000',   // Red for pair 0
  color2: '#00FF00'    // Green for pair 1
}
```

## Console API

When the quadrilateral component loads, it logs the available animation methods:

```
✅ Opposite side equality animation available:
   - Helper method: element.animateOppositeSideEquality(pairIndex) // 0=AB/CD, 1=BC/DA, undefined=both
   - Stop method: element.stopOppositeSideAnimation()
   - Global function: window.animateOppositeSideEquality_myQuad(pairIndex)
   - Registry: window.quadrilateralAnimations['myQuad'].animateOppositeSideEquality(pairIndex)
```

## Animation Phases

The animation cycles through four phases:

1. **translating-to-opposite**: Animating from source to opposite (progress 0 → 1)
2. **waiting-at-opposite**: Holding position at opposite side (progress = 1)
3. **translating-back**: Animating from opposite back to source (progress 1 → 0)
4. **waiting-at-source**: Holding position at source (progress = 0)

When animating both pairs, the animation completes one full cycle for pair 0, then one full cycle for pair 1.

## Technical Details

### Animation State

The component maintains the following state during animation:

```javascript
{
  pairIndex: number,           // Current pair being animated (0 or 1)
  animateBothPairs: boolean,   // Whether animating both pairs
  startTime: number,           // Animation start timestamp
  translationDuration: number, // Duration of translation phase
  waitTime: number,            // Duration of wait phase
  totalCycleDuration: number,  // translation + wait
  maxCycles: number,           // Total cycles to complete
  currentCycle: number,        // Current cycle count
  phase: string,               // Current animation phase
  progress: number             // Current progress (0 to 1)
}
```

### Coordinate System

The animation uses the same percentage-based coordinate system as the quadrilateral component, ensuring accurate positioning across different viewport sizes and grid configurations.

## Integration with Other Features

The opposite side equality animation works seamlessly with:

- **Adjacent Side Animation**: Can run both animations (though one at a time is recommended for clarity)
- **Angle Animations**: Can run simultaneously
- **Vertex Dragging**: Animation continues during drag
- **Protractor Integration**: Both can be active at the same time

## Best Practices

1. **Pair Selection**: Choose the appropriate pair based on what you're demonstrating
2. **Both Pairs**: Use `animateOppositeSideEquality()` without arguments to show both pairs are equal
3. **Colors**: Use distinct colors for pair 0 and pair 1 to make it clear which sides are being compared
4. **Duration**: Balance speed with clarity
   - Fast: 500-800ms
   - Medium: 1000-1500ms (recommended)
   - Slow: 2000-3000ms
5. **Message**: Keep messages concise and relevant to what's being demonstrated

## Troubleshooting

### Animation Doesn't Start

**Issue**: Calling `animateOppositeSideEquality()` but nothing happens

**Solutions**:
- Verify the quadrilateral element exists and is rendered
- Check that the pair index is valid (0, 1, or undefined)
- Check browser console for error messages

### Animation Stops Immediately

**Issue**: Animation starts but stops after less than one cycle

**Solutions**:
- Check that `cycles` is not set to 0
- Verify `duration` and `waitTime` are reasonable values (>0)

### Wrong Color Displayed

**Issue**: Animation uses wrong color for the pair

**Solutions**:
- Verify `color1` is set for pair 0 and `color2` is set for pair 1
- Check that the pair index is correct when calling the function

## Related Documentation

- [SIDE-EQUALITY-ANIMATION.md](SIDE-EQUALITY-ANIMATION.md) - Adjacent side equality animation
- [QUADRILATERAL-COMPONENT.md](QUADRILATERAL-COMPONENT.md) - Main quadrilateral component documentation
- [ANGLE-EQUALITY-ANIMATION.md](ANGLE-EQUALITY-ANIMATION.md) - Angle equality animation feature
- [ANGLE-SUM-ANIMATION.md](ANGLE-SUM-ANIMATION.md) - Angle sum (180°) animation feature

