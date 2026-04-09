# Ruler Component

A flexible, interactive ruler component for measuring distances and creating visual guides in educational materials. Supports multiple unit systems (metric, imperial, grid units) with interactive measurement markers and draggable/rotatable functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Interaction Modes](#interaction-modes)
- [Measurement Features](#measurement-features)
- [Integration Examples](#integration-examples)
- [Advanced Features](#advanced-features)

## Features

- **Multiple Unit Systems**: Metric (cm/mm), Imperial (inches), or arbitrary grid units
- **Flexible Interaction**: Static, draggable, rotatable, or fully interactive modes
- **Measurement Markers**: Interactive draggable pins that snap to tick marks
- **Glass Effect Styling**: Beautiful transparent glass appearance (clearer than protractor)
- **Grid Integration**: Works seamlessly with the grid positioning system
- **Touch Support**: Full mobile device support with touch events
- **Customizable Appearance**: Adjustable length, colors, tick marks, and labels
- **Line Drawing Integration**: Can be used to guide line creation

## Installation

The ruler component is loaded as part of the component system. Include it in your HTML after the core dependencies:

```html
<!-- Core Dependencies -->
<script src="js/react.development.js"></script>
<script src="js/react-dom.development.js"></script>
<script src="js/GridCellFontUtils.js"></script>
<script src="js/GridPrecisionConfig.js"></script>

<!-- Component Dependencies -->
<script src="js/components/shared-utilities.js"></script>
<script src="js/components/draggable-component.js"></script>

<!-- Ruler Component -->
<script src="js/components/ruler-component.js"></script>

<!-- Elements Registry -->
<script src="js/components/elements-registry.js"></script>
```

## Basic Usage

### Static Ruler (Display Only)

```javascript
const ruler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450], // Center position
  zIndex: 5000,
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    mode: 'static',
    length: '30cm',
    width: '30gc'
  }
};
```

### Interactive Ruler (Draggable & Rotatable)

```javascript
const interactiveRuler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    mode: 'interactive',
    length: '30cm',
    width: '30gc',
    isDraggable: true,
    isRotatable: true,
    measurementMarkers: {
      enabled: true,
      maxMarkers: 2,
      allowClick: true,
      allowDrag: true,
      snapToTicks: true,
      color: '#FF0000',
      showDistance: true
    }
  }
};
```

### Imperial Ruler

```javascript
const imperialRuler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'RulerComponent',
    rulerType: 'imperial',
    length: '12in',
    width: '30gc',
    mode: 'interactive',
    majorTickInterval: 1, // 1 inch
    minorTickInterval: 0.125, // 1/8 inch
    labelInterval: 1
  }
};
```

## Props Reference

### Visual Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rulerType` | `'metric' \| 'imperial' \| 'grid'` | `'metric'` | Unit system for the ruler |
| `length` | `string \| number` | `'30cm'` | Ruler length (e.g., '30cm', '300gc', '12in') |
| `width` | `string \| number` | `'30gc'` | Ruler width (narrow dimension) |
| `color` | `string` | `'#333'` | Color for tick marks and labels |
| `backgroundColor` | `string` | `'rgba(255, 255, 255, 0.75)'` | Ruler background (glass effect) |
| `showTickMarks` | `boolean` | `true` | Show/hide tick marks |
| `showLabels` | `boolean` | `true` | Show/hide measurement labels |
| `majorTickInterval` | `number` | `10` | Interval for major ticks (mm for metric) |
| `minorTickInterval` | `number` | `1` | Interval for minor ticks (mm for metric) |
| `labelInterval` | `number` | `10` | Interval for labels (mm for metric) |

### Interaction Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'static' \| 'draggable' \| 'rotatable' \| 'interactive'` | `'interactive'` | Interaction mode |
| `isDraggable` | `boolean` | `true` | Enable dragging |
| `isRotatable` | `boolean` | `true` | Enable rotation (Ctrl/Cmd + drag) |
| `rotation` | `number` | `0` | Initial rotation angle in degrees |
| `cursor` | `string` | `'move'` | CSS cursor style |
| `opacity` | `number` | `1` | Ruler opacity (0-1) |

### Measurement Markers Configuration

The `measurementMarkers` prop is an object with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable measurement markers |
| `maxMarkers` | `number` | `2` | Maximum number of markers (typically 2) |
| `allowClick` | `boolean` | `true` | Allow clicking ruler to add markers |
| `allowDrag` | `boolean` | `true` | Allow dragging markers along ruler |
| `snapToTicks` | `boolean` | `true` | Snap markers to tick marks |
| `color` | `string` | `'#FF0000'` | Marker color |
| `showDistance` | `boolean` | `true` | Show distance between markers |

Example:

```javascript
measurementMarkers: {
  enabled: true,
  maxMarkers: 2,
  allowClick: true,
  allowDrag: true,
  snapToTicks: true,
  color: '#FF0000',
  showDistance: true
}
```

### Line Drawing Configuration

The `lineDrawing` prop is an object for future line drawing integration:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable line drawing features |
| `mode` | `'click' \| 'guide'` | `'click'` | Click to spawn lines or act as guide |
| `integration` | `boolean` | `true` | Integrate with line-component |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onMeasure` | `(distance, unit, markers) => void` | Called when measurement changes |
| `onMarkerAdd` | `(marker) => void` | Called when a marker is added |
| `onMarkerRemove` | `(marker) => void` | Called when a marker is removed |
| `onRotate` | `(angle) => void` | Called when ruler is rotated |
| `onPositionChange` | `(position) => void` | Called when ruler is moved |
| `onClick` | `(event) => void` | Called when ruler is clicked |

### Grid Integration

| Prop | Type | Description |
|------|------|-------------|
| `coordinates` | `[number, number, number, number]` | Grid-based positioning [x1, y1, x2, y2] |
| `centerPoint` | `{row: number, col: number}` | Alternative grid-based center position |
| `zIndex` | `number` | Z-index for layering (default: 5000) |

## Interaction Modes

### Static Mode

Display only, no interaction:

```javascript
mode: 'static',
isDraggable: false,
isRotatable: false
```

### Draggable Mode

Can be moved but not rotated:

```javascript
mode: 'draggable',
isDraggable: true,
isRotatable: false
```

### Rotatable Mode

Can be rotated but not moved:

```javascript
mode: 'rotatable',
isDraggable: false,
isRotatable: true
```

### Interactive Mode

Full interaction (drag and rotate):

```javascript
mode: 'interactive',
isDraggable: true,
isRotatable: true
```

**Rotation Controls:**
- **Mouse**: Hold Ctrl (Windows/Linux) or Cmd (Mac) while dragging to rotate
- **Touch**: Use two-finger rotation gesture

## Measurement Features

### Adding Markers

With `measurementMarkers.allowClick: true`, click anywhere on the ruler to add a marker. The marker will snap to the nearest tick mark if `snapToTicks: true`.

### Dragging Markers

With `measurementMarkers.allowDrag: true`, click and drag markers along the ruler length to adjust their position.

### Measuring Distance

When two markers are placed, the distance between them is automatically calculated and displayed (if `showDistance: true`).

### Removing Markers

Click on a marker to remove it, or add more than `maxMarkers` to automatically remove the oldest marker.

### Example with Callbacks

```javascript
const ruler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    length: '30cm',
    mode: 'interactive',
    measurementMarkers: {
      enabled: true,
      maxMarkers: 2,
      allowClick: true,
      allowDrag: true,
      snapToTicks: true,
      color: '#0066FF',
      showDistance: true
    },
    onMeasure: (distance, unit, markers) => {
      console.log(`Distance: ${distance}${unit}`);
      console.log('Marker positions:', markers);
    },
    onMarkerAdd: (marker) => {
      console.log('Marker added:', marker);
    },
    onMarkerRemove: (marker) => {
      console.log('Marker removed:', marker);
    }
  }
};
```

## Integration Examples

### Using with PageConfig

```javascript
const pageConfig = {
  1: {
    elements: {
      ruler1: {
        type: 'ruler',
        coordinates: [800, 300, 800, 300],
        zIndex: 5000,
        props: {
          componentType: 'RulerComponent',
          rulerType: 'metric',
          length: '30cm',
          width: '30gc',
          mode: 'interactive',
          measurementMarkers: {
            enabled: true,
            maxMarkers: 2,
            showDistance: true
          }
        }
      },
      
      imperialRuler: {
        type: 'ruler',
        coordinates: [800, 600, 800, 600],
        zIndex: 5000,
        props: {
          componentType: 'RulerComponent',
          rulerType: 'imperial',
          length: '12in',
          width: '30gc',
          mode: 'interactive',
          rotation: 45 // Start at 45-degree angle
        }
      }
    }
  }
};
```

### Multiple Rulers with Different Units

```javascript
const elements = {
  metricRuler: {
    type: 'ruler',
    coordinates: [400, 300, 400, 300],
    props: {
      componentType: 'RulerComponent',
      rulerType: 'metric',
      length: '15cm',
      measurementMarkers: { enabled: true, color: '#FF0000' }
    }
  },
  
  imperialRuler: {
    type: 'ruler',
    coordinates: [1200, 300, 1200, 300],
    props: {
      componentType: 'RulerComponent',
      rulerType: 'imperial',
      length: '6in',
      measurementMarkers: { enabled: true, color: '#0000FF' }
    }
  },
  
  gridRuler: {
    type: 'ruler',
    coordinates: [800, 600, 800, 600],
    props: {
      componentType: 'RulerComponent',
      rulerType: 'grid',
      length: '200gc',
      measurementMarkers: { enabled: true, color: '#00FF00' }
    }
  }
};
```

## Advanced Features

### Custom Styling

```javascript
const customRuler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    length: '30cm',
    width: '40gc', // Wider ruler
    color: '#0066CC', // Blue tick marks and labels
    backgroundColor: 'rgba(173, 216, 230, 0.7)', // Light blue glass
    majorTickInterval: 5, // Major tick every 5mm
    minorTickInterval: 1,
    labelInterval: 10,
    measurementMarkers: {
      enabled: true,
      color: '#FF6600', // Orange markers
      showDistance: true
    }
  }
};
```

### Different Ruler Lengths

```javascript
// Short ruler (15cm)
const shortRuler = {
  props: {
    componentType: 'RulerComponent',
    length: '15cm'
  }
};

// Long ruler (50cm)
const longRuler = {
  props: {
    componentType: 'RulerComponent',
    length: '50cm'
  }
};

// Custom pixel length
const customLengthRuler = {
  props: {
    componentType: 'RulerComponent',
    length: '400gc' // 400 grid cells
  }
};
```

### Measurement Precision

```javascript
const preciseRuler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    length: '30cm',
    majorTickInterval: 1, // Every 1mm gets a major tick
    minorTickInterval: 0.5, // Half-millimeter ticks
    labelInterval: 5, // Label every 5mm
    measurementMarkers: {
      enabled: true,
      snapToTicks: true, // Snap to 0.5mm precision
      showDistance: true
    }
  }
};
```

### Programmatic Control

You can programmatically control the ruler through callbacks:

```javascript
let rulerAngle = 0;

const ruler = {
  type: 'ruler',
  coordinates: [800, 450, 800, 450],
  props: {
    componentType: 'RulerComponent',
    rulerType: 'metric',
    rotation: rulerAngle,
    onRotate: (angle) => {
      rulerAngle = angle;
      console.log('Ruler rotated to:', angle);
      // You can trigger other actions based on rotation
    },
    onPositionChange: (position) => {
      console.log('Ruler moved to:', position);
      // Trigger position-dependent logic
    },
    onMeasure: (distance, unit, markers) => {
      if (distance > 150) { // If distance > 15cm (150mm)
        console.log('Warning: Measurement exceeds threshold!');
      }
    }
  }
};
```

## Utility Functions

The `RulerUtils` object provides utility functions for unit conversion and calculations:

```javascript
// Access via window.RulerComponent.RulerUtils

// Convert units
const inches = RulerUtils.convertUnits(254, 'mm', 'inches'); // 254mm to inches = 10"

// Format measurement
const formatted = RulerUtils.formatMeasurement(15.5, 'cm', 1); // "15.5cm"

// Get ruler dimensions
const dimensions = RulerUtils.getRulerDimensions('metric', '30cm');
// Returns: { lengthInUnits: 300, unit: 'mm', displayUnit: 'cm' }
```

## Tips and Best Practices

1. **Unit Consistency**: Keep measurements in one unit system per page to avoid confusion

2. **Marker Colors**: Use contrasting colors for markers to make them easily visible

3. **Rotation Hint**: Consider adding instructions that users should hold Ctrl/Cmd to rotate

4. **Mobile Optimization**: On touch devices, the ruler automatically supports touch events

5. **Z-Index Management**: Use appropriate z-index values to ensure rulers appear above or below other elements as needed

6. **Performance**: For multiple rulers, consider using `mode: 'static'` for non-interactive ones

7. **Accessibility**: The ruler includes pointer-events management for better interaction

## Browser Compatibility

The ruler component works in all modern browsers that support:
- ES6+ JavaScript
- React 18+
- CSS transforms
- SVG rendering

## Troubleshooting

### Ruler not appearing
- Check that `ruler-component.js` is loaded before `elements-registry.js`
- Verify coordinates are within the visible grid
- Check z-index doesn't conflict with other elements

### Markers not working
- Ensure `measurementMarkers.enabled: true`
- Check that `mode` is not `'static'`
- Verify click events aren't blocked by other elements

### Rotation not working
- Hold Ctrl (Windows/Linux) or Cmd (Mac) while dragging
- Ensure `isRotatable: true`
- Check that `mode` allows rotation

### Glass effect not visible
- Verify SVG gradients are rendering correctly
- Check `backgroundColor` opacity value
- Ensure browser supports SVG filters

## Future Enhancements

Planned features for future versions:
- Line drawing integration (spawn lines from ruler edge)
- Multiple marker sets for comparing measurements
- Angle measurement between ruler and other objects
- Custom tick mark patterns
- Export measurement data
- Ruler presets (common educational ruler sizes)

## Related Components

- **ProtractorComponent**: For measuring angles
- **LineComponent**: For drawing and measuring lines
- **QuadrilateralComponent**: For shape measurement
- **GridComponent**: For grid-based positioning

## Support

For issues, questions, or contributions, please refer to the main project documentation.

