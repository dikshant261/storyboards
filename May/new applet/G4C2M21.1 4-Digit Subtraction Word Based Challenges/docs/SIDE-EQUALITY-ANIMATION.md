# Side Equality Animation

## Overview

The **Side Equality Animation** feature provides a visual demonstration that two adjacent sides of a quadrilateral are equal in length. The animation creates a dashed copy of one side and rotates it around the common vertex to perfectly superimpose on the adjacent side, proving that both sides have the same length.

## How It Works

The animation:
1. Creates a dashed line copy of one adjacent side (orange/yellow blinking)
2. Rotates this dashed line around the common vertex
3. Superimposes the dashed line on the other adjacent side
4. Waits for a configurable duration
5. Rotates back to the original side
6. Repeats for a specified number of cycles (or infinitely)
7. Displays a customizable message while the animation is active

## Visual Characteristics

- **Line Style**: Dashed (orange/yellow blinking effect)
- **Line Thickness**: Matches the quadrilateral side thickness
- **Animation**: Smooth rotation with cubic easing
- **Message**: Customizable text with blinking effect

## Usage

### Basic Usage

```javascript
// In PageConfig.js
{
  type: 'quadrilateral',
  props: {
    // ... other quadrilateral props ...
    
    sideEqualityAnimationConfig: {
      duration: 1000,      // Rotation duration in ms
      waitTime: 1000,      // Wait time at each position in ms
      cycles: 3,           // Number of cycles (-1 for infinite)
      message: 'Adjacent sides are equal!'
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

// Animate sides AB and BC around vertex B (index 1)
quadElement.animateSideEquality(1);

// Stop the animation
quadElement.stopSideEqualityAnimation();
```

#### Method 2: Global Function

```javascript
// Using the auto-generated global function (hyphens replaced with underscores)
window.animateSideEquality_page1_quadrilateral_demo(1);
```

#### Method 3: Global Registry

```javascript
// Using the global registry (supports hyphens in IDs)
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSideEquality(1);

// Or using element name
window.quadrilateralAnimations['myQuad'].animateSideEquality(1);
```

### Vertex Index Reference

The common vertex index specifies which vertex is shared by the two adjacent sides:

- `0` = Vertex A (animates sides DA and AB around A)
- `1` = Vertex B (animates sides AB and BC around B)
- `2` = Vertex C (animates sides BC and CD around C)
- `3` = Vertex D (animates sides CD and DA around D)

## Configuration Reference

### `sideEqualityAnimationConfig` Object

All properties are optional with sensible defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | number | 1000 | Rotation duration in milliseconds |
| `waitTime` | number | 1000 | Wait time at each position in milliseconds |
| `cycles` | number | -1 | Number of complete cycles. Use -1 for infinite loop, 0+ for finite cycles |
| `message` | string | 'Adjacent sides are equal!' | Text message displayed during animation |
| `lineStyle` | string | 'dashed' | Line style: 'dashed' or 'solid' |
| `style` | string | 'dashed' | Alternative to lineStyle (same effect) |
| `messagePosition` | object | See below | Position configuration for the message |

### `messagePosition` Object

Configure where the message appears:

**Option 1: Relative to Common Vertex (Default)**

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

### Example 1: Finite Cycles with Custom Message

```javascript
sideEqualityAnimationConfig: {
  duration: 1500,     // 1.5 seconds rotation
  waitTime: 1000,     // 1 second wait
  cycles: 5,          // Repeat 5 times then stop
  message: 'These sides have equal length!',
  messagePosition: {
    offsetX: 0,
    offsetY: -15
  }
}
```

### Example 2: Infinite Loop Animation

```javascript
sideEqualityAnimationConfig: {
  duration: 800,      // Fast rotation
  waitTime: 500,      // Short wait
  cycles: -1,         // Loop forever
  message: 'AB = BC',
  messagePosition: {
    left: 50,         // Center of viewport
    top: 20           // Near top
  }
}
```

### Example 3: Slow, Detailed Demonstration

```javascript
sideEqualityAnimationConfig: {
  duration: 2500,     // Slow rotation for clarity
  waitTime: 2000,     // Long pause for observation
  cycles: 2,          // Show twice
  message: 'Notice how the sides match perfectly!',
  messagePosition: {
    offsetX: 0,
    offsetY: -10
  }
}
```

### Example 4: Solid Line Style

```javascript
sideEqualityAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 3,
  message: 'Adjacent sides are equal!',
  lineStyle: 'solid',  // Use solid line instead of dashed
  messagePosition: {
    offsetX: 0,
    offsetY: -12
  }
}
```

## Console API

When the quadrilateral component loads, it logs the available animation methods:

```
✅ Side equality animation available:
   - Helper method: element.animateSideEquality(commonVertexIndex)
   - Stop method: element.stopSideEqualityAnimation()
   - Global function: window.animateSideEquality_myQuad(commonVertexIndex)
   - Registry: window.quadrilateralAnimations['myQuad'].animateSideEquality(commonVertexIndex)
```

## Code Examples

### Example: Animate Different Vertex Pairs

```javascript
// Get the quadrilateral element
const quad = document.getElementById('myQuad');

// Animate sides around vertex A (0)
quad.animateSideEquality(0);

// After some time, switch to vertex C (2)
setTimeout(() => {
  quad.stopSideEqualityAnimation();
  quad.animateSideEquality(2);
}, 10000);
```

### Example: Triggered by User Interaction

```javascript
// Create buttons to trigger different animations
document.getElementById('animateVertexB').addEventListener('click', () => {
  const quad = document.getElementById('myQuad');
  quad.animateSideEquality(1);  // Animate around vertex B
});

document.getElementById('stopAnimation').addEventListener('click', () => {
  const quad = document.getElementById('myQuad');
  quad.stopSideEqualityAnimation();
});
```

### Example: Sequential Animations

```javascript
const quad = document.getElementById('myQuad');

// Show that all adjacent sides are equal (for a rhombus/square)
async function demonstrateAllSides() {
  for (let i = 0; i < 4; i++) {
    console.log(`Demonstrating vertex ${i}...`);
    quad.animateSideEquality(i);
    
    // Wait for 3 complete cycles (rotation + wait) * 2 (back and forth) * cycles
    const cycleDuration = (1000 + 1000) * 2;
    const totalWait = cycleDuration * 3;
    
    await new Promise(resolve => setTimeout(resolve, totalWait + 500));
    quad.stopSideEqualityAnimation();
    
    // Brief pause between demonstrations
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

demonstrateAllSides();
```

## Technical Details

### Animation Phases

The animation cycles through four phases:

1. **rotating-to-side2**: Animating from side1 to side2 (progress 0 → 1)
2. **waiting-at-side2**: Holding position at side2 (progress = 1)
3. **rotating-to-side1**: Animating from side2 back to side1 (progress 1 → 0)
4. **waiting-at-side1**: Holding position at side1 (progress = 0)

### Animation State

The component maintains the following state during animation:

```javascript
{
  commonVertexIndex: number,     // The shared vertex
  prevVertexIndex: number,       // Previous vertex in sequence
  nextVertexIndex: number,       // Next vertex in sequence
  startTime: number,             // Animation start timestamp
  rotationDuration: number,      // Duration of rotation phase
  waitTime: number,              // Duration of wait phase
  totalCycleDuration: number,    // rotation + wait
  maxCycles: number,             // Total cycles to complete
  currentCycle: number,          // Current cycle count
  phase: string,                 // Current animation phase
  progress: number               // Current progress (0 to 1)
}
```

### Coordinate System

The animation uses the same percentage-based coordinate system as the quadrilateral component, ensuring accurate positioning across different viewport sizes and grid configurations.

## Integration with Other Features

The side equality animation works seamlessly with:

- **Angle Animations**: Can run side and angle animations simultaneously
- **Vertex Dragging**: Animation stops when vertices are dragged
- **Protractor Integration**: Both can be active at the same time
- **Property Panel**: Properties update in real-time during animation

## Best Practices

1. **Cycle Count**: Use finite cycles (e.g., 2-5) for teaching demos, infinite (-1) for continuous displays
2. **Duration**: Balance speed with clarity - too fast may be hard to follow, too slow may be boring
   - Fast: 500-800ms (for confident students)
   - Medium: 1000-1500ms (recommended)
   - Slow: 2000-3000ms (for detailed examination)
3. **Wait Time**: Allow sufficient time for observation at each position
4. **Message Position**: Position messages to avoid overlapping with the quadrilateral or other UI elements
5. **Multiple Animations**: Stop existing animations before starting new ones to avoid confusion

## Troubleshooting

### Animation Doesn't Start

**Issue**: Calling `animateSideEquality()` but nothing happens

**Solutions**:
- Verify the quadrilateral element exists and is rendered
- Check that the vertex index is valid (0-3)
- Check browser console for error messages
- Ensure configuration is properly set in PageConfig.js

### Animation Stops Immediately

**Issue**: Animation starts but stops after less than one cycle

**Solutions**:
- Check that `cycles` is not set to 0
- Verify `duration` and `waitTime` are reasonable values (>0)
- Check if another animation is being started immediately after

### Message Not Visible

**Issue**: Animation runs but message doesn't appear

**Solutions**:
- Check message position - it may be off-screen
- Verify message text is provided in config
- Check z-index conflicts with other elements
- Inspect message styling in browser dev tools

### Animation Not Smooth

**Issue**: Animation appears jerky or stutters

**Solutions**:
- Reduce other animations running simultaneously
- Check browser performance
- Verify `duration` value is not too small (< 300ms)

## Related Documentation

- [QUADRILATERAL-COMPONENT.md](QUADRILATERAL-COMPONENT.md) - Main quadrilateral component documentation
- [ANGLE-EQUALITY-ANIMATION.md](ANGLE-EQUALITY-ANIMATION.md) - Angle equality animation feature
- [ANGLE-SUM-ANIMATION.md](ANGLE-SUM-ANIMATION.md) - Angle sum (180°) animation feature
- [PageConfig.js](js/PageConfig.js) - Configuration examples

