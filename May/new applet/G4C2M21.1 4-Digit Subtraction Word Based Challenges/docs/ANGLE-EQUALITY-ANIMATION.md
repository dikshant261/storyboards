# Angle Equality Animation

A feature that animates a filled arc from one vertex to another, superimposing perfectly to visually prove that two angles are equal.

## How It Works

1. **Takes the filled arc** from the source vertex (e.g., vertex A, interior angle)
2. **Animates it moving** to the target vertex (e.g., vertex C, interior angle)
3. **Superimposes perfectly** by rotating and translating to match the target angle's orientation
4. **Proves equality** by showing the arc fits exactly over the target angle

## Usage

### Method 1: Helper Method (Recommended - Easiest)

```javascript
// Get the quadrilateral element by ID or querySelector
const quadElement = document.getElementById('page1-quadrilateral-demo');
// Or: const quadElement = document.querySelector('[data-element-name="quadrilateral-demo"]');

// Use the helper method directly
quadElement.animateAngleEquality(0, 2); // Uses default duration from props
quadElement.animateAngleEquality(0, 2, 3000); // Custom duration
```

### Method 2: Using the Registry

```javascript
// Use the registry with the exact ID or name
window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2, 2000);
// Or by element name
window.quadrilateralAnimations['quadrilateral-demo'](0, 2, 2000);
```

### Method 3: Using the Function Name (Hyphens replaced with underscores)

```javascript
// For quadrilateral with id: "page1-quadrilateral-demo"
// Function name becomes: animateAngleEquality_page1_quadrilateral_demo
window.animateAngleEquality_page1_quadrilateral_demo(0, 2, 2000);
```

### Method 4: Find Available Animations

```javascript
// List all available animations
console.log(Object.keys(window.quadrilateralAnimations || {}));

// Then use the one you need
const animFunc = window.quadrilateralAnimations['page1-quadrilateral-demo'];
if (animFunc) {
  animFunc(0, 2, 2000);
}
```

### Vertex Indices

- **0** = Vertex A
- **1** = Vertex B
- **2** = Vertex C
- **3** = Vertex D

### Parameters

```javascript
element.animateAngleEquality(sourceVertexIndex, targetVertexIndex, duration)
// Or
window.quadrilateralAnimations['<quadId>'](sourceVertexIndex, targetVertexIndex, duration)
```

- `sourceVertexIndex` (number): Source vertex index (0-3)
- `targetVertexIndex` (number): Target vertex index (0-3)
- `duration` (number, optional): Animation duration in milliseconds (default: from `angleAnimationConfig.duration` prop or 2000ms)

### Examples

#### Show that angle A equals angle C

```javascript
// In a square or rectangle where opposite angles are equal
// Using registry (recommended):
window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2); // A to C

// Or using function name (hyphens become underscores):
window.animateAngleEquality_page1_quadrilateral_demo(0, 2); // A to C
```

#### Show that angle B equals angle D

```javascript
window.quadrilateralAnimations['page1-quadrilateral-demo'](1, 3); // B to D
```

#### Custom duration

```javascript
// Slower animation (3 seconds)
window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2, 3000);

// Faster animation (1 second)
window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2, 1000);
```

## Finding the Quadrilateral ID

The function is available in two ways:

### Option 1: Registry (Easier)
```javascript
// Check console for available animations when page loads
// Or list them:
console.log(Object.keys(window.quadrilateralAnimations || {}));

// Use with exact ID or name:
window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2);
```

### Option 2: Function Name
```javascript
// Function name uses underscores instead of hyphens
// If your quadrilateral has:
id: "page1-quadrilateral-demo"
// Then use:
window.animateAngleEquality_page1_quadrilateral_demo(0, 2);

// If your quadrilateral has:
elementName: "quad-demo"
currentPage: 1
// Then use:
window.animateAngleEquality_quad_demo_1(0, 2);
```

## Animation Details

- **Easing**: Uses cubic ease-in-out for smooth motion
- **Opacity**: Fades in at start, holds during movement, fades out at end
- **Transform**: Combines translation and rotation to superimpose perfectly
- **Visual**: Shows filled arc sector with stroke outline

## Requirements

- Both source and target angles must be calculated (not null)
- Both vertices must exist (indices 0-3)
- Interior angle arcs should be visible for best effect

## Props Configuration

### angleAnimationConfig Object

Configure animation behavior via the `angleAnimationConfig` prop:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | `2000` | Animation duration in milliseconds |
| `speed` | `number` | `2000` | Alternative to `duration` (same effect) |
| `holdTime` | `number` | `500` | Deprecated - arc now stays and blinks |
| `message` | `string` | `'The angles are perfectly equal!'` | Message displayed when animation completes |
| `equalityMessage` | `string` | `'The angles are perfectly equal!'` | Alternative to `message` (same effect) |
| `messagePosition` | `Object` | `{ offsetX: 0, offsetY: -8 }` | Message position configuration (see below) |
| `messageCoordinates` | `Object` | Same as `messagePosition` | Alternative to `messagePosition` (same effect) |

### `messagePosition` Object Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `left` | `number` | `null` | Absolute left position in percentage of viewport (null = relative to target vertex) |
| `top` | `number` | `null` | Absolute top position in percentage of viewport (null = relative to target vertex) |
| `offsetX` | `number` | `0` | Horizontal offset from target vertex in percentage |
| `offsetY` | `number` | `-8` | Vertical offset from target vertex in percentage (-8 = 8% above) |
| `offsetLeft` | `number` | `0` | Alternative to `offsetX` (same effect) |
| `offsetTop` | `number` | `-8` | Alternative to `offsetY` (same effect) |

### Example with Props

```javascript
{
  props: {
    componentType: "QuadrilateralComponent",
    angleAnimationConfig: {
      duration: 3000,  // 3 second animation
      message: 'The angles are perfectly equal!',  // Custom message (optional)
      messagePosition: {
        offsetX: 0,    // Center horizontally on target vertex
        offsetY: -10   // Position 10% above target vertex
      }
    }
```

### Message Position Examples

#### Example 1: Relative to Target Vertex (Default)
```javascript
angleAnimationConfig: {
  duration: 2000,
  messagePosition: {
    offsetX: 0,   // Centered on vertex horizontally
    offsetY: -8   // 8% above vertex (default)
  }
}
```

#### Example 2: Position Below Vertex
```javascript
angleAnimationConfig: {
  duration: 2000,
  messagePosition: {
    offsetX: 0,   // Centered horizontally
    offsetY: 5    // 5% below vertex
  }
}
```

#### Example 3: Position to the Right of Vertex
```javascript
angleAnimationConfig: {
  duration: 2000,
  messagePosition: {
    offsetX: 5,   // 5% to the right
    offsetY: -8   // 8% above
  }
}
```

#### Example 4: Absolute Position (Fixed on Screen)
```javascript
angleAnimationConfig: {
  duration: 2000,
  messagePosition: {
    left: 50,  // 50% from left edge of viewport
    top: 20    // 20% from top edge of viewport
  }
}
```

#### Example 5: Custom Message with Custom Position
```javascript
angleAnimationConfig: {
  duration: 2500,
  message: 'These angles match!',
  messagePosition: {
    offsetX: -3,  // 3% to the left
    offsetY: -12  // 12% above
  }
}
  }
}
```

## Configuration

You can configure the animation speed/duration via props:

```javascript
{
  id: "page1-quadrilateral-demo",
  name: "quadrilateral-demo",
  type: "custom",
  coordinates: [50, 50, 1000, 700],
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    // Animation configuration
    angleAnimationConfig: {
      duration: 3000,  // Animation duration in milliseconds (default: 2000)
      holdTime: 1000   // Time to hold at target before fading out (default: 500)
    },
    angleConfig: {
      angleA: {
        interiorAngle: {
          show: true,
          fill: true,
          fillColor: "#FF6600",
          fillOpacity: 0.5
        }
      },
      angleC: {
        interiorAngle: {
          show: true,
          fill: true,
          fillColor: "#FF6600",
          fillOpacity: 0.5
        }
      }
    }
  }
}
```

### Integration Example

```javascript
// In your PageConfig or component
{
  id: "page1-quadrilateral-demo",
  name: "quadrilateral-demo",
  type: "custom",
  coordinates: [50, 50, 1000, 700],
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    angleAnimationConfig: {
      duration: 2500,  // Slower animation
      holdTime: 800    // Hold longer at target
    },
    angleConfig: {
      angleA: {
        interiorAngle: {
          show: true,
          fill: true,
          fillColor: "#FF6600",
          fillOpacity: 0.5
        }
      },
      angleC: {
        interiorAngle: {
          show: true,
          fill: true,
          fillColor: "#FF6600",
          fillOpacity: 0.5
        }
      }
    }
  }
}

// Then trigger animation (multiple ways):
setTimeout(() => {
  // Method 1: Helper method (recommended)
  const quadEl = document.getElementById('page1-quadrilateral-demo');
  quadEl.animateAngleEquality(0, 2); // Uses duration from props (2500ms)
  
  // Method 2: Registry
  window.quadrilateralAnimations['page1-quadrilateral-demo'](0, 2);
  
  // Method 3: Override duration
  quadEl.animateAngleEquality(0, 2, 1500); // Custom duration overrides prop
}, 1000);
```

## Visual Effect

The animation:
1. **Starts** at source vertex with filled arc visible
2. **Moves** smoothly to target vertex
3. **Rotates** to align with target angle orientation
4. **Superimposes** perfectly over target angle
5. **Stays at target** and **blinks continuously** to highlight the equality
6. **Shows success message** "The angles are perfectly equal!" above the target vertex

The continuous blinking at the destination and the success message visually emphasize that the angles are equal, as the arc from one angle fits perfectly over the other!

## Stopping the Animation

To stop the blinking animation:

```javascript
// Using helper method
const quadEl = document.getElementById('page1-quadrilateral-demo');
quadEl.stopAngleEqualityAnimation();
```

## Notes

- The animation **stays at the destination and blinks continuously** (does not fade out)
- Use `stopAngleEqualityAnimation()` to stop the blinking
- Only one animation can run at a time (new animation cancels previous)
- The arc uses the same styling as the source vertex's interior angle configuration
- Works best when both angles have `fill: true` enabled for visual clarity
- The blinking uses CSS animation for smooth, performant effect

