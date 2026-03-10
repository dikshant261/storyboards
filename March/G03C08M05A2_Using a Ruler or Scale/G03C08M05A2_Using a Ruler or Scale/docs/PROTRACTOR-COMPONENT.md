# Protractor Component

A flexible, interactive protractor component for measuring angles in educational materials. Supports both semicircular (180°) and circular (360°) configurations with multiple interaction modes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Interaction Modes](#interaction-modes)
- [Visual Configurations](#visual-configurations)
- [Integration Examples](#integration-examples)
- [Advanced Features](#advanced-features)

## Features

- **Multiple Visual Modes**: Semicircular (0-180°) or circular (0-360°) protractors
- **Flexible Interaction**: Static, draggable, rotatable, or fully interactive modes
- **Measurement Arm**: Optional rotatable arm with real-time angle display
- **Grid Integration**: Works seamlessly with the grid positioning system
- **Snap Features**: Snap-to-grid and snap-to-degree functionality
- **Touch Support**: Full mobile device support with touch events
- **Customizable Styling**: Colors, sizes, marks, and labels fully configurable
- **Component Integration**: Can be attached to other components like quadrilaterals

## Installation

The protractor component is loaded as part of the component system. Include it in your HTML after the core dependencies:

```html
<!-- Core Dependencies -->
<script src="js/react.development.js"></script>
<script src="js/react-dom.development.js"></script>
<script src="js/GridCellFontUtils.js"></script>
<script src="js/GridPrecisionConfig.js"></script>

<!-- Component Dependencies -->
<script src="js/components/shared-utilities.js"></script>
<script src="js/components/draggable-component.js"></script>

<!-- Protractor Component -->
<script src="js/components/protractor-component.js"></script>

<!-- Elements Registry -->
<script src="js/components/elements-registry.js"></script>
```

## Basic Usage

### Static Protractor (Display Only)

```javascript
const protractor = {
  type: 'protractor',
  coordinates: [800, 450, 800, 450], // Center position
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'semicircular',
    mode: 'static',
    radius: '100gc',
    showArm: false
  }
};
```

### Interactive Protractor (Draggable & Rotatable)

```javascript
const interactiveProtractor = {
  type: 'protractor',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'semicircular',
    mode: 'interactive',
    isDraggable: true,
    isRotatable: true,
    showArm: true,
    armAngle: 45,
    onAngleChange: (angle) => {
      console.log('Angle changed:', angle);
    }
  }
};
```

### Circular Protractor

```javascript
const circularProtractor = {
  type: 'protractor',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'circular',
    mode: 'interactive',
    radius: '120gc',
    showArm: true,
    armColor: '#0066FF',
    snapToDegrees: 5,
    onAngleChange: (angle) => {
      updateAngleDisplay(angle);
    }
  }
};
```

## Props Reference

### Position & Grid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `coordinates` | `[x1, y1, x2, y2]` | `[800, 450, 800, 450]` | Grid coordinates for protractor position |
| `centerPoint` | `{row, col}` | `null` | Alternative way to specify center using grid position |
| `zIndex` | `number` | `5000` | Z-index for layering |

### Visual Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `protractorType` | `string` | `'semicircular'` | Type: `'semicircular'` or `'circular'` |
| `radius` | `string/number` | `'100gc'` | Radius of protractor (supports gc units) |
| `color` | `string` | `'#333'` | Color of protractor markings |
| `backgroundColor` | `string` | `'rgba(255,255,255,0.9)'` | Background color of protractor |
| `showDegreeMarks` | `boolean` | `true` | Show degree tick marks |
| `showDegreeLabels` | `boolean` | `true` | Show degree number labels |
| `degreeInterval` | `number` | `10` | Interval for minor degree marks |
| `labelInterval` | `number` | `30` | Interval for degree labels |
| `protractorRotation` | `number` | `0` | Rotate entire protractor (degrees) |
| `opacity` | `number` | `1` | Protractor opacity (0-1) |

### Interactive Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `string` | `'interactive'` | Interaction mode: `'static'`, `'draggable'`, `'rotatable'`, `'interactive'` |
| `isDraggable` | `boolean` | `true` | Enable dragging the entire protractor |
| `isRotatable` | `boolean` | `true` | Enable rotating the measurement arm |
| `cursor` | `string` | `'move'` | CSS cursor style |

### Measurement Arm Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showArm` | `boolean` | `true` | Show measurement arm |
| `armLength` | `string/number` | `'auto'` | Arm length (`'auto'` = 80% of radius, or gc units) |
| `armColor` | `string` | `'#FF0000'` | Color of measurement arm |
| `armAngle` | `number` | `0` | Initial angle of arm (degrees, 0 = top) |
| `onAngleChange` | `function` | `null` | Callback when arm angle changes: `(angle) => {}` |

### Snap & Precision

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapToGrid` | `boolean` | `false` | Snap center point to grid when dragging |
| `snapToDegrees` | `number` | `0` | Snap arm rotation to degree intervals (0 = no snap) |
| `anglePrecision` | `number` | `1` | Decimal places for angle display |

### Integration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attachToElement` | `string` | `null` | ID of element to attach to |
| `measureMode` | `string` | `'single'` | Measurement mode: `'single'` or `'difference'` |

### Events

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `function` | Callback when protractor is clicked: `(event) => {}` |
| `onAngleChange` | `function` | Callback when measurement arm angle changes: `(angle) => {}` |

## Interaction Modes

### Static Mode

Display-only protractor with no user interaction.

```javascript
props: {
  mode: 'static',
  showArm: false
}
```

### Draggable Mode

User can drag the protractor but cannot rotate the arm.

```javascript
props: {
  mode: 'draggable',
  isDraggable: true,
  isRotatable: false
}
```

### Rotatable Mode

User can rotate the measurement arm but cannot move the protractor.

```javascript
props: {
  mode: 'rotatable',
  isDraggable: false,
  isRotatable: true,
  showArm: true
}
```

### Interactive Mode (Full)

User can both drag the protractor and rotate the measurement arm.

```javascript
props: {
  mode: 'interactive',
  isDraggable: true,
  isRotatable: true,
  showArm: true
}
```

## Visual Configurations

### Semicircular Protractor

Classic half-circle protractor (0-180°):

```javascript
props: {
  protractorType: 'semicircular',
  radius: '100gc',
  showDegreeMarks: true,
  showDegreeLabels: true,
  degreeInterval: 10,  // Minor marks every 10°
  labelInterval: 30    // Labels at 0°, 30°, 60°, etc.
}
```

### Circular Protractor

Full circle protractor (0-360°):

```javascript
props: {
  protractorType: 'circular',
  radius: '120gc',
  showDegreeMarks: true,
  showDegreeLabels: true,
  degreeInterval: 10,
  labelInterval: 45  // Labels at 0°, 45°, 90°, etc.
}
```

### Custom Styling

```javascript
props: {
  protractorType: 'semicircular',
  radius: '150gc',
  color: '#0066CC',
  backgroundColor: 'rgba(230, 240, 255, 0.95)',
  armColor: '#FF6600',
  showDegreeMarks: true,
  degreeInterval: 5,  // More precise markings
  labelInterval: 15
}
```

## Integration Examples

### Measuring Angles in a Quadrilateral

```javascript
// Page configuration
page1: {
  elements: {
    // Quadrilateral
    quad1: {
      type: 'quadrilateral',
      coordinates: [100, 100, 700, 500],
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 200, col: 200 },
          { row: 200, col: 600 },
          { row: 500, col: 600 },
          { row: 500, col: 200 }
        ]
      }
    },
    
    // Protractor aligned with first vertex
    protractor1: {
      type: 'protractor',
      centerPoint: { row: 200, col: 200 },
      zIndex: 6000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        showArm: true,
        armAngle: 0,
        snapToDegrees: 1,
        onAngleChange: (angle) => {
          console.log('Vertex angle:', angle);
        }
      }
    }
  }
}
```

### Using with Angle Markers

```javascript
// Combine protractor with angle marker component
page1: {
  elements: {
    line1: {
      type: 'line',
      coordinates: [400, 300, 600, 300],
      props: {
        componentType: 'LineComponent',
        lineType: 'horizontal',
        borderColor: '#000'
      }
    },
    
    line2: {
      type: 'line',
      coordinates: [400, 300, 500, 200],
      props: {
        componentType: 'LineComponent',
        lineType: 'slanted',
        borderColor: '#000'
      }
    },
    
    protractor: {
      type: 'protractor',
      centerPoint: { row: 300, col: 400 },
      zIndex: 5500,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'rotatable',
        radius: '100gc',
        protractorRotation: 0,
        showArm: true,
        armAngle: 45,
        armColor: '#FF0000'
      }
    }
  }
}
```

### Interactive Quiz Activity

```javascript
// Quiz: Measure the angle and input the answer
page1: {
  elements: {
    question: {
      type: 'text',
      coordinates: [50, 50, 1550, 150],
      props: {
        text: 'Use the protractor to measure the angle, then enter your answer:',
        fontSize: '20gc'
      }
    },
    
    protractor: {
      type: 'protractor',
      coordinates: [800, 450, 800, 450],
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '120gc',
        showArm: true,
        armAngle: 65,  // Actual angle to measure
        snapToDegrees: 1,
        onAngleChange: (angle) => {
          // Store student's measurement
          window.studentAnswer = angle;
        }
      }
    },
    
    inputBox: {
      type: 'textbox',
      coordinates: [700, 700, 900, 750],
      props: {
        placeholder: 'Enter angle (°)',
        onSubmit: (value) => {
          // Check answer
          const correct = Math.abs(parseFloat(value) - window.studentAnswer) < 2;
          showFeedback(correct);
        }
      }
    }
  }
}
```

## Advanced Features

### Snap to Degrees

Make the arm snap to specific degree intervals:

```javascript
props: {
  snapToDegrees: 5,  // Snaps to 0°, 5°, 10°, 15°, etc.
  anglePrecision: 0  // Display as whole numbers
}
```

### Rotated Protractor Base

Rotate the entire protractor (useful for measuring specific angles):

```javascript
props: {
  protractorType: 'semicircular',
  protractorRotation: 45,  // Rotate entire protractor 45°
  showArm: true,
  armAngle: 0
}
```

### Custom Arm Length

```javascript
props: {
  showArm: true,
  armLength: '150gc',  // Longer arm
  armColor: '#00AA00'
}
```

### High Precision Markings

```javascript
props: {
  degreeInterval: 1,   // Mark every degree
  labelInterval: 10,   // Label every 10°
  showDegreeMarks: true,
  showDegreeLabels: true
}
```

## Utility Functions

The component exports utility functions via `window.ProtractorComponent.ProtractorUtils`:

### `calculateAngleFromPoints(center, point1, point2)`

Calculate the angle between two points relative to a center point.

```javascript
const ProtractorUtils = window.ProtractorComponent.ProtractorUtils;
const angle = ProtractorUtils.calculateAngleFromPoints(
  { x: 400, y: 300 },  // Center
  { x: 500, y: 300 },  // Point 1
  { x: 450, y: 250 }   // Point 2
);
console.log('Angle:', angle);
```

### `calculateAngleToPoint(center, point)`

Calculate angle from center to a point (0° = east/right).

```javascript
const angle = ProtractorUtils.calculateAngleToPoint(
  { x: 400, y: 300 },
  { x: 450, y: 250 }
);
```

### `snapAngleToDegrees(angle, interval)`

Snap an angle to the nearest interval.

```javascript
const snapped = ProtractorUtils.snapAngleToDegrees(47.3, 5);
// Returns: 45
```

### `formatAngleDisplay(angle, precision)`

Format angle for display.

```javascript
const formatted = ProtractorUtils.formatAngleDisplay(45.678, 2);
// Returns: "45.68°"
```

### `normalizeAngle(angle)`

Normalize angle to 0-360 range.

```javascript
const normalized = ProtractorUtils.normalizeAngle(450);
// Returns: 90
```

## Best Practices

1. **Positioning**: Use `centerPoint` for precise grid alignment, or `coordinates` for flexible placement.

2. **Visual Clarity**: For overlapping elements, use higher `zIndex` values (5000-6000 range).

3. **User Feedback**: Always provide visual feedback when using interactive modes:
   ```javascript
   onAngleChange: (angle) => {
     displayAngleValue(angle);
     playSound('click');
   }
   ```

4. **Mobile Support**: The component automatically supports touch events. Test on mobile devices.

5. **Performance**: Use `React.memo` is already applied. For multiple protractors, consider lazy loading.

6. **Accessibility**: When used in quizzes, provide alternative input methods for users who cannot use the interactive features.

## Browser Compatibility

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Full support with touch events

## Troubleshooting

### Protractor not visible

- Check `zIndex` - ensure it's higher than overlapping elements
- Verify `opacity` is not set to 0
- Ensure coordinates are within viewport

### Arm not rotating

- Verify `isRotatable: true` and `mode` is not `'static'`
- Check that `showArm: true`
- Ensure event handlers are not being blocked

### Snapping not working

- Set `snapToDegrees` to a value > 0
- Verify the component is in a rotatable mode

### Touch events not working on mobile

- Ensure parent elements don't have `pointer-events: none`
- Check for conflicting touch handlers

## Examples Repository

See the `/examples` folder for complete working examples:

- Basic static protractor
- Interactive measurement tool
- Angle quiz game
- Integration with quadrilaterals
- Custom styled protractors

## License

Part of the ANC3-LM-W4-QUAD-BUILDER component library.

