# Measurement Arm Configuration

## Overview

The measurement arm props have been reorganized into a nested `measurementArm` object for better organization and clarity. The arm now supports solid/dashed styles, extendable length, and configurable z-index.

## Props Structure

### New Nested Object Format

```javascript
measurementArm: {
  show: true,             // Show/hide the measurement arm
  angle: 0,               // Initial angle (0-360 degrees)
  color: "#FF0000",       // Arm color (hex, rgb, or named color)
  style: "solid",         // "solid" or "dashed"
  extendable: false,      // Extend beyond protractor edge
  zIndex: 10              // Z-index (higher = on top)
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | Boolean | `true` | Show or hide the measurement arm |
| `angle` | Number | `0` | Initial angle in degrees (0-360) |
| `color` | String | `"#FF0000"` | Color of the arm and angle display |
| `style` | String | `"solid"` | Line style: `"solid"` or `"dashed"` |
| `extendable` | Boolean | `false` | Extend arm 1.5x beyond protractor edge |
| `zIndex` | Number | `10` | Z-index for layering (protractor body is at 5) |

## Usage Examples

### Basic Solid Arm (Default)

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 45,
    color: "#FF0000",
    style: "solid"
  }
}
```

**Result:** Standard red solid line at 45°

---

### Dashed Arm

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 60,
    color: "#0066CC",
    style: "dashed"    // Dashed line!
  }
}
```

**Result:** Blue dashed line at 60°
- Useful for indicating auxiliary lines
- Good for educational diagrams showing construction lines

---

### Extendable Arm

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 90,
    color: "#00AA00",
    extendable: true   // Extends beyond protractor!
  }
}
```

**Result:** Green arm that extends 1.5x the normal length
- Goes beyond the protractor edge
- Useful for measuring larger angles or showing direction
- Great for ray visualization

---

### Extendable Dashed Arm (Construction Line)

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 120,
    color: "#666666",
    style: "dashed",
    extendable: true    // Long dashed line!
  }
}
```

**Result:** Gray dashed line extending beyond protractor
- Perfect for geometry construction visualizations
- Shows extended rays or construction lines
- Educational contexts for angle bisectors, etc.

---

### Custom Z-Index (Above Everything)

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 180,
    color: "#FF00FF",
    zIndex: 20         // Very high z-index
  }
}
```

**Result:** Arm always appears on top
- Default z-index is 10 (protractor body is at 5)
- Increase for arms that should be on top of other elements
- Decrease if you want arms behind something

---

### Hidden Arm

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: false   // No arm displayed
  }
}
```

**Result:** Protractor without measurement arm
- Clean protractor display
- User can still rotate if `isRotatable: true`
- Arm can be toggled dynamically

---

## Visual Comparison

### Solid vs Dashed

```
Solid Arm:
    Center ————————→ Arrowhead
    
Dashed Arm:
    Center — — — —→ Arrowhead
```

### Normal vs Extendable

```
Normal Length:
    [Protractor Edge]
    Center ————→ End
    
Extendable (1.5x):
    [Protractor Edge]
    Center ————————————→ End (extends beyond)
```

## Z-Index Layering

```
Layer 15+: Custom high-priority elements
Layer 10:  Measurement Arm (default)
Layer 5:   Protractor Face (draggable)
Layer 1:   Rotation Ring
```

The measurement arm's default z-index of 10 ensures it appears above the protractor body (z-index 5) but can be customized as needed.

## Legacy Props Support (Backward Compatibility)

The old individual props are still supported for backward compatibility:

```javascript
// Old format (still works)
{
  showArm: true,
  armAngle: 45,
  armColor: "#FF0000"
}

// New format (recommended)
{
  measurementArm: {
    show: true,
    angle: 45,
    color: "#FF0000"
  }
}
```

**Note:** If both formats are provided, the new `measurementArm` object takes precedence.

## Common Use Cases

### 1. Standard Angle Measurement

```javascript
measurementArm: {
  show: true,
  style: "solid",
  color: "#C0392B"
}
```

---

### 2. Construction Lines (Geometry Education)

```javascript
measurementArm: {
  show: true,
  style: "dashed",
  color: "#888888",
  extendable: true
}
```

---

### 3. Multiple Arms (Using Multiple Protractors)

```javascript
// First protractor with solid arm
{
  measurementArm: {
    show: true,
    angle: 30,
    color: "#FF0000",
    style: "solid"
  }
}

// Overlay with dashed construction line
{
  measurementArm: {
    show: true,
    angle: 60,
    color: "#0000FF",
    style: "dashed",
    extendable: true
  }
}
```

---

### 4. Ray Visualization

```javascript
measurementArm: {
  show: true,
  angle: 45,
  color: "#FF6600",
  style: "solid",
  extendable: true,    // Shows ray extending to infinity
  zIndex: 15           // Ensure it's on top
}
```

---

## Dynamic Arm Control

The arm can be dynamically controlled through state:

```javascript
// Toggle arm visibility
const [showArm, setShowArm] = React.useState(true);

measurementArm: {
  show: showArm,
  style: "solid"
}

// Button to toggle
<button onClick={() => setShowArm(!showArm)}>
  {showArm ? "Hide" : "Show"} Arm
</button>
```

## Callbacks

The `onAngleChange` callback still works at the top level:

```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    angle: 0
  },
  onAngleChange: (angle) => {
    console.log("📐 Current angle:", angle + "°");
  }
}
```

## Complete Example

```javascript
{
  id: "advanced-protractor",
  name: "advanced-protractor",
  type: "custom",
  coordinates: [1100, 200, 1100, 200],
  zIndex: 5000,
  props: {
    componentType: "ProtractorComponent",
    centerPoint: { row: 400, col: 1200 },
    
    // Protractor settings
    protractorType: "semicircular",
    radius: "150gc",
    color: "#2C3E50",
    
    // Measurement arm with all features
    measurementArm: {
      show: true,
      angle: 45,
      color: "#E74C3C",
      style: "dashed",      // Dashed line
      extendable: true,     // Extends beyond edge
      zIndex: 12            // Above everything
    },
    
    // Interaction
    mode: "interactive",
    isDraggable: true,
    isRotatable: true,
    
    // Callbacks
    onAngleChange: (angle) => {
      console.log("Angle:", angle);
    }
  }
}
```

## Summary

The new nested `measurementArm` object provides:
- ✅ Better organization (all arm props in one place)
- ✅ Solid and dashed line styles
- ✅ Extendable arms (beyond protractor edge)
- ✅ Configurable z-index for layering
- ✅ Backward compatibility with legacy props
- ✅ Cleaner, more intuitive API

Use dashed, extendable arms for geometry education and construction line visualizations!

