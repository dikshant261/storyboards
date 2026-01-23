# Angle Sum Animation (180°)

A feature that animates two angles moving and combining to visually demonstrate that they add up to 180°.

## How It Works

1. **Takes two filled arcs** from two vertices (e.g., vertex A and vertex B, interior angles)
2. **Animates them moving** to a target location based on the selected animation mode
3. **Combines them** to show they form 180° (a straight line or half circle)
4. **Proves the sum** by visually demonstrating the angles together equal 180°

## Usage

### Method 1: Helper Method (Recommended - Easiest)

```javascript
// Get the quadrilateral element by ID or querySelector
const quadElement = document.getElementById('page1-quadrilateral-demo');
// Or: const quadElement = document.querySelector('[data-element-name="quadrilateral-demo"]');

// Use the helper method directly
quadElement.animateAngleSum(0, 1); // Uses default duration and mode from props
quadElement.animateAngleSum(0, 1, 3000); // Custom duration
quadElement.animateAngleSum(0, 1, 3000, 'neutral'); // Custom duration and mode
```

### Method 2: Using the Registry

```javascript
// Use the registry with the exact ID or name
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSum(0, 1, 2000, 'adjacent');
// Or by element name
window.quadrilateralAnimations['quadrilateral-demo'].animateSum(0, 1, 2000, 'adjacent');
```

### Method 3: Using the Function Name (Hyphens replaced with underscores)

```javascript
// For quadrilateral with id: "page1-quadrilateral-demo"
// Function name becomes: animateAngleSum_page1_quadrilateral_demo
window.animateAngleSum_page1_quadrilateral_demo(0, 1, 2000, 'adjacent');
```

### Method 4: Find Available Animations

```javascript
// List all available animations
console.log(Object.keys(window.quadrilateralAnimations || {}));

// Then use the one you need
const animFunc = window.quadrilateralAnimations['page1-quadrilateral-demo'];
if (animFunc && animFunc.animateSum) {
  animFunc.animateSum(0, 1, 2000, 'adjacent');
}
```

## Examples

### Show that angle A and angle B add up to 180°

```javascript
// In a parallelogram or rectangle where adjacent angles sum to 180°
// Using registry (recommended):
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSum(0, 1); // A and B

// Or using function name (hyphens become underscores):
window.animateAngleSum_page1_quadrilateral_demo(0, 1); // A and B
```

### Show that angle C and angle D add up to 180°

```javascript
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSum(2, 3); // C and D
```

### Custom duration and animation mode

```javascript
// Slower animation (3 seconds) with 'neutral' mode
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSum(0, 1, 3000, 'neutral');

// Faster animation (1 second) with 'straightLine' mode
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSum(0, 1, 1000, 'straightLine');
```

## Animation Modes

The animation supports three modes that control how the arcs move:

### 1. `'adjacent'` (Default)
- **Behavior**: Moves the first arc to the second angle's position, places them side-by-side
- **Use case**: Best for showing adjacent angles that sum to 180°
- **Visual**: Both arcs appear at the second vertex, positioned next to each other

### 2. `'neutral'`
- **Behavior**: Moves both arcs to a neutral center location (midpoint between the two vertices)
- **Use case**: Best for emphasizing the combination without favoring either vertex
- **Visual**: Both arcs meet at the center of the quadrilateral

### 3. `'straightLine'`
- **Behavior**: Rotates and positions arcs to form a straight line (180°)
- **Use case**: Best for visually demonstrating the straight line property
- **Visual**: Arcs are rotated and positioned to clearly show they form 180°

## Display Modes

When the animation completes, you can choose how the final result is displayed:

### 1. `'sideBySide'` (Default)
- **Behavior**: Shows both arcs adjacent to each other at the target location
- **Visual**: Two separate arcs positioned next to each other, clearly showing both angles

### 2. `'merged'`
- **Behavior**: Shows a single combined 180° arc (half circle)
- **Visual**: The two angles merge into one continuous 180° arc, emphasizing the sum

## Animation Details

- **Easing**: Uses cubic ease-in-out for smooth motion
- **Opacity**: Fades in at start, holds during movement
- **Transform**: Combines translation and rotation to position arcs correctly
- **Visual**: Shows filled arc sectors with stroke outlines
- **Blinking**: Arcs blink continuously at destination to highlight the result
- **Message**: Displays success message "These angles add up to 180°!" when complete

## Requirements

- Both angles must be calculated (not null)
- Both vertices must exist (indices 0-3)
- Interior angle arcs should be visible for best effect
- The two vertices must be different

## Props Configuration

### angleSumAnimationConfig Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | `2000` | Animation duration in milliseconds |
| `speed` | `number` | `2000` | Alternative to `duration` (same effect) |
| `animationMode` | `string` | `'adjacent'` | Animation mode: `'adjacent'` \| `'neutral'` \| `'straightLine'` |
| `displayMode` | `string` | `'sideBySide'` | Display mode: `'sideBySide'` \| `'merged'` |
| `message` | `string` | `'These angles add up to 180°!'` | Message displayed when animation completes |
| `messagePosition` | `Object` | `{ offsetX: 0, offsetY: -8 }` | Message position configuration (see below) |
| `messageCoordinates` | `Object` | Same as `messagePosition` | Alternative to `messagePosition` (same effect) |

### `messagePosition` Object Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `left` | `number` | `null` | Absolute left position in percentage of viewport (null = relative to target) |
| `top` | `number` | `null` | Absolute top position in percentage of viewport (null = relative to target) |
| `offsetX` | `number` | `0` | Horizontal offset from target in percentage |
| `offsetY` | `number` | `-8` | Vertical offset from target in percentage (-8 = 8% above) |
| `offsetLeft` | `number` | `0` | Alternative to `offsetX` (same effect) |
| `offsetTop` | `number` | `-8` | Alternative to `offsetY` (same effect) |

### Example with Props

```javascript
{
  props: {
    componentType: "QuadrilateralComponent",
    angleSumAnimationConfig: {
      duration: 3000,  // 3 second animation
      animationMode: 'adjacent',  // Move first arc to second vertex
      displayMode: 'sideBySide',  // Show both arcs side-by-side
      message: 'These angles add up to 180°!',  // Custom message (optional)
      messagePosition: {
        offsetX: 0,    // Center horizontally on target
        offsetY: -10   // Position 10% above target
      }
    }
  }
}
```

## Configuration

You can configure the animation via props in `PageConfig.js`:

```javascript
{
  id: "page1-quadrilateral-demo",
  name: "quadrilateral-demo",
  type: "custom",
  coordinates: [50, 50, 1000, 700],
  zIndex: 40,
  props: {
    componentType: "QuadrilateralComponent",
    // ... other props ...
    
    // Angle sum animation configuration
    angleSumAnimationConfig: {
      duration: 2000,  // Animation duration in milliseconds
      animationMode: 'adjacent',  // 'adjacent' | 'neutral' | 'straightLine'
      displayMode: 'sideBySide',  // 'sideBySide' | 'merged'
      message: 'These angles add up to 180°!',
      messagePosition: {
        offsetX: 0,
        offsetY: -8
      }
    }
  }
}
```

## Message Position Examples

### Example 1: Relative to Target (Default)
```javascript
angleSumAnimationConfig: {
  duration: 2000,
  messagePosition: {
    offsetX: 0,   // Centered on target horizontally
    offsetY: -8   // 8% above target (default)
  }
}
```

### Example 2: Position Below Target
```javascript
angleSumAnimationConfig: {
  duration: 2000,
  messagePosition: {
    offsetX: 0,   // Centered horizontally
    offsetY: 5    // 5% below target
  }
}
```

### Example 3: Absolute Position (Fixed on Screen)
```javascript
angleSumAnimationConfig: {
  duration: 2000,
  messagePosition: {
    left: 50,  // 50% from left edge of viewport
    top: 20    // 20% from top edge of viewport
  }
}
```

## Stopping the Animation

To stop an ongoing animation:

```javascript
// Using helper method
quadElement.stopAngleSumAnimation();

// The animation will also stop automatically when it completes
```

## Complete Example

```javascript
// Get the quadrilateral element
const quad = document.getElementById('page1-quadrilateral-demo');

// Start animation: show that angles A (0) and B (1) sum to 180°
quad.animateAngleSum(0, 1, 2000, 'adjacent');

// After 3 seconds, stop it
setTimeout(() => {
  quad.stopAngleSumAnimation();
}, 3000);
```

## Notes

- The animation validates that both angles exist before starting
- If either angle is null or vertices are invalid, the animation won't start
- The animation uses the same blinking CSS animation as the equality animation
- Message styling matches the equality animation (green background, white text, blinking)
- Both arcs maintain their original colors and styles from the angle configuration

