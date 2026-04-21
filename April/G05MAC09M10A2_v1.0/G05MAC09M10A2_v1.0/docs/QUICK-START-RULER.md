# Quick Start: Ruler Component

## Basic Setup

Add a ruler to your page in 3 simple steps:

### 1. Ensure the component is loaded

Check that `ruler-component.js` is included in your HTML:

```html
<script src="js/components/ruler-component.js"></script>
```

### 2. Add ruler to PageConfig

```javascript
{
  id: "my-ruler",
  name: "ruler-1",
  type: "custom",
  coordinates: [800, 450, 800, 450], // Center position
  zIndex: 5000,
  props: {
    componentType: "RulerComponent",
    rulerType: "metric",
    length: "30cm",
    mode: "interactive"
  }
}
```

### 3. That's it!

The ruler will appear on your page, ready to be dragged and used for measurements.

## Common Configurations

### Metric Ruler (30cm)

```javascript
props: {
  componentType: "RulerComponent",
  rulerType: "metric",
  length: "30cm",
  width: "30gc",
  mode: "interactive"
}
```

### Imperial Ruler (12 inches)

```javascript
props: {
  componentType: "RulerComponent",
  rulerType: "imperial",
  length: "12in",
  width: "30gc",
  mode: "interactive"
}
```

### With Measurement Markers

```javascript
props: {
  componentType: "RulerComponent",
  rulerType: "metric",
  length: "30cm",
  measurementMarkers: {
    enabled: true,
    maxMarkers: 2,
    allowClick: true,
    allowDrag: true,
    snapToTicks: true,
    color: "#FF0000",
    showDistance: true
  }
}
```

## Interaction Guide

### Moving the Ruler
- Click and drag anywhere on the ruler to move it

### Rotating the Ruler
- Hold **Ctrl** (Windows/Linux) or **Cmd** (Mac) while dragging to rotate

### Adding Measurement Markers
- Click anywhere on the ruler to add a marker (up to 2 markers)
- Markers will snap to tick marks for precision

### Measuring Distance
- Add two markers by clicking on the ruler
- The distance between them will be displayed automatically

### Removing Markers
- Click on a marker to remove it

## Quick Examples

### Example 1: Simple Static Ruler

```javascript
{
  id: "static-ruler",
  name: "ruler-1",
  type: "custom",
  coordinates: [400, 300, 400, 300],
  zIndex: 5000,
  props: {
    componentType: "RulerComponent",
    rulerType: "metric",
    length: "15cm",
    mode: "static", // Can't be moved or rotated
    measurementMarkers: { enabled: false }
  }
}
```

### Example 2: Interactive Measuring Ruler

```javascript
{
  id: "measuring-ruler",
  name: "ruler-2",
  type: "custom",
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: "RulerComponent",
    rulerType: "metric",
    length: "30cm",
    mode: "interactive",
    isDraggable: true,
    isRotatable: true,
    measurementMarkers: {
      enabled: true,
      maxMarkers: 2,
      allowClick: true,
      allowDrag: true,
      snapToTicks: true,
      color: "#0066FF",
      showDistance: true
    },
    onMeasure: (distance, unit, markers) => {
      console.log(`Distance measured: ${distance}${unit}`);
    }
  }
}
```

### Example 3: Custom Styled Ruler

```javascript
{
  id: "custom-ruler",
  name: "ruler-3",
  type: "custom",
  coordinates: [1200, 600, 1200, 600],
  zIndex: 5000,
  props: {
    componentType: "RulerComponent",
    rulerType: "imperial",
    length: "6in",
    width: "40gc", // Wider ruler
    color: "#006633", // Dark green
    backgroundColor: "rgba(144, 238, 144, 0.7)", // Light green glass
    mode: "interactive",
    majorTickInterval: 1, // Every inch
    minorTickInterval: 0.125, // 1/8 inch
    measurementMarkers: {
      enabled: true,
      color: "#CC0000"
    }
  }
}
```

## Tips

1. **Positioning**: Use grid coordinates to place rulers precisely
2. **Multiple Rulers**: You can have multiple rulers with different units on the same page
3. **Z-Index**: Set appropriate z-index to ensure rulers appear above/below other elements
4. **Performance**: Use `mode: "static"` for non-interactive rulers to improve performance
5. **Precision**: Enable `snapToTicks` for accurate measurements

## Troubleshooting

### Ruler not appearing?
- Check that `ruler-component.js` is loaded
- Verify coordinates are within visible area
- Check z-index isn't obscured by other elements

### Can't rotate?
- Hold Ctrl/Cmd while dragging
- Ensure `isRotatable: true`
- Check that `mode` is 'rotatable' or 'interactive'

### Markers not working?
- Ensure `measurementMarkers.enabled: true`
- Check that `mode` is not 'static'
- Verify clicks aren't blocked by other elements

## Next Steps

For more detailed information, see:
- `RULER-COMPONENT.md` - Complete documentation
- `js/components/ruler-component.js` - Source code with inline comments
- `PROTRACTOR-COMPONENT.md` - Similar component for angles

## Support

The ruler component is built with the same architecture as the protractor component, so many patterns and techniques are transferable between them.

