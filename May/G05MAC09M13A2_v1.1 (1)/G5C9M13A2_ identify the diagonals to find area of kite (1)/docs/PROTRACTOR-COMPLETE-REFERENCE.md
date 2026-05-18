# Protractor Component - Complete Reference

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [All Props Reference](#all-props-reference)
4. [Visual Configuration](#visual-configuration)
5. [Interactive Features](#interactive-features)
6. [Measurement Arm](#measurement-arm)
7. [Baseline](#baseline)
8. [Snap Points](#snap-points)
9. [Rotation Features](#rotation-features)
10. [Callback Functions](#callback-functions)
11. [Usage Examples](#usage-examples)
12. [Platform-Specific Features](#platform-specific-features)
13. [Advanced Configurations](#advanced-configurations)

---

## Overview

The Protractor Component is a fully interactive, customizable protractor for measuring and visualizing angles. It supports both semicircular (180°) and circular (360°) displays, with extensive customization options.

### Key Features
✅ Semicircular (0-180°) and Circular (0-360°) modes  
✅ Fully draggable and interactive  
✅ Rotatable measurement arm with dynamic extension  
✅ Rotatable protractor body (desktop, touch, TV)  
✅ Snap-to-point functionality (free, fixed, hybrid modes)  
✅ Configurable appearance (glass effect, colors, sizes)  
✅ GC (Grid Cell) unit support for responsive sizing  
✅ Touch and TV interface support  
✅ Real-time angle measurement display  
✅ Optional baseline for angle reference  

---

## Quick Start

### Basic Protractor

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 800 },
  protractorType: "semicircular",
  radius: "100gc",
  mode: "interactive"
}
```

### Interactive Protractor with All Features

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Visual
  protractorType: "semicircular",
  radius: "100gc",
  backgroundColor: "rgba(200, 220, 255, 0.25)",
  labelColor: "#1a5490",
  
  // Interaction
  mode: "interactive",
  isDraggable: true,
  isRotatable: true,
  isProtractorRotatable: true,
  showProtractorRotationHandle: true,
  
  // Measurement Arm
  measurementArm: {
    show: true,
    color: "#FF0000",
    startDeg: 45,
    extendable: true,
    style: "dashed",
    angleDisplay: {
      show: true,
      size: "14gc",
      color: "#FF0000"
    }
  },
  
  // Baseline
  baseline: {
    show: true,
    color: "#999999",
    style: "dashed"
  },
  
  // Snap Points
  snapPoints: [
    { x: 300, y: 500, label: "Point A" },
    { x: 600, y: 800, label: "Point B" }
  ],
  snapMode: "hybrid",
  snapThreshold: 50
}
```

---

## All Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | auto-generated | Unique identifier for the protractor |
| `elementName` | string | - | Name of the element |
| `currentPage` | number | - | Current page number |
| `zIndex` | number | 5000 | Stack order of the protractor |

### Position Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `centerPoint` | object | `{row: 450, col: 800}` | Center position in grid coordinates `{row, col}` |
| `coordinates` | array | `[800, 450, 800, 450]` | Alternative position format `[col1, row1, col2, row2]` |

### Visual Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `protractorType` | string | `"semicircular"` | Type: `"semicircular"` (180°) or `"circular"` (360°) |
| `radius` | string/number | `"100gc"` | Radius in GC units or pixels |
| `color` | string | `"#333"` | Color of degree marks and lines |
| `backgroundColor` | string | `"rgba(255,255,255,0.9)"` | Background color (use rgba for glass effect) |
| `opacity` | number | 1 | Overall opacity (0-1) |
| `labelColor` | string | `"#333"` | Color of degree labels (text) |
| `protractorRotation` | number | 0 | Initial rotation angle of protractor body (degrees) |

### Degree Marks & Labels Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showDegreeMarks` | boolean | `true` | Show tick marks for degrees |
| `showDegreeLabels` | boolean | `true` | Show degree number labels |
| `degreeInterval` | number | 10 | Interval for tick marks (every N degrees) |
| `labelInterval` | number | 30 | Interval for degree labels (every N degrees) |
| `labelFontSize` | string | `"12gc"` | Font size of degree labels in GC units |

### Tick Mark Sizing Props (GC Units)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `majorTickLength` | string | `"15gc"` | Length of major tick marks (labeled degrees) |
| `minorTickLength` | string | `"8gc"` | Length of minor tick marks (unlabeled degrees) |
| `majorTickWidth` | string | `"2gc"` | Width/thickness of major tick marks |
| `minorTickWidth` | string | `"1gc"` | Width/thickness of minor tick marks |

### Interactive Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | string | `"interactive"` | Mode: `"interactive"`, `"static"`, `"rotatable"`, `"draggable"` |
| `isDraggable` | boolean | `true` | Enable dragging to move protractor |
| `isRotatable` | boolean | `true` | Enable rotating the measurement arm |
| `isProtractorRotatable` | boolean | `false` | Enable rotating entire protractor body |
| `cursor` | string | `"move"` | CSS cursor style when hovering |
| `onClick` | function | - | Click handler function |

### Rotation UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showRotationRing` | boolean | `true` | Show the outer rotation ring indicator |
| `showProtractorRotationHandle` | boolean | `false` | Show blue rotation handle (for touch/TV) |

### Measurement Arm Props (Nested Object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `measurementArm` | object | See below | Configuration for the measurement arm |
| `measurementArm.show` | boolean | `true` | Show/hide the measurement arm |
| `measurementArm.length` | string/number | `"auto"` | Arm length (`"auto"` = 80% of radius, or GC units) |
| `measurementArm.color` | string | `"#FF0000"` | Color of the measurement arm |
| `measurementArm.angle` | number | 0 | Initial angle in degrees (0-360°, 0° = right) |
| `measurementArm.startDeg` | number | 0 | Starting degree (overrides `angle`) |
| `measurementArm.style` | string | `"solid"` | Line style: `"solid"` or `"dashed"` |
| `measurementArm.extendable` | boolean | `false` | Allow dynamic arm extension by dragging arrowhead |
| `measurementArm.zIndex` | number | 10 | Z-index of arm (higher = on top) |

### Angle Display Props (Nested in measurementArm)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `measurementArm.angleDisplay` | object | See below | Configuration for angle display |
| `measurementArm.angleDisplay.show` | boolean | `true` | Show/hide angle measurement display |
| `measurementArm.angleDisplay.size` | string | `"14gc"` | Font size of angle display in GC units |
| `measurementArm.angleDisplay.color` | string | `null` | Color of angle text (null = use arm color) |

### Baseline Props (Separate Object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseline` | object | See below | Configuration for the baseline reference line |
| `baseline.show` | boolean | `false` | Show/hide baseline (horizontal reference) |
| `baseline.color` | string | `"#999999"` | Color of the baseline |
| `baseline.style` | string | `"dashed"` | Line style: `"solid"` or `"dashed"` |
| `baseline.width` | number | 1 | Line width in pixels |

### Snap Points Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapPoints` | array | `[]` | Array of snap points: `[{x, y, label?}, ...]` |
| `snapMode` | string | `"free"` | Snap mode: `"free"`, `"fixed"`, `"hybrid"` |
| `snapThreshold` | number | 50 | Distance in pixels to trigger snap |
| `showSnapIndicators` | boolean | `true` | Show visual markers for snap points |
| `highlightNearestSnap` | boolean | `true` | Highlight nearest snap point (green) when nearby |

### Precision & Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapToGrid` | boolean | `false` | Enable grid snapping (legacy) |
| `snapToDegrees` | number | 0 | Snap arm rotation to degree intervals (0 = no snap) |
| `anglePrecision` | number | 1 | Decimal places for angle display |

### Integration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attachToElement` | string/object | - | Attach protractor to another element |
| `measureMode` | string | `"single"` | Measurement mode: `"single"` or `"continuous"` |

### Callback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onAngleChange` | function | - | Called when arm angle changes: `(angle) => {}` |
| `onArmExtend` | function | - | Called when arm length changes: `(length) => {}` |
| `onProtractorRotate` | function | - | Called when protractor rotates: `(rotation) => {}` |
| `onPositionChange` | function | - | Called when position changes: `(position, snapPoint) => {}` |
| `onSnapToPoint` | function | - | Called when snaps to point: `(snapPoint) => {}` |
| `onClick` | function | - | Called when clicked: `(event) => {}` |

### Legacy Props (Backward Compatibility)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showArm` | boolean | - | Use `measurementArm.show` instead |
| `armLength` | string/number | - | Use `measurementArm.length` instead |
| `armColor` | string | - | Use `measurementArm.color` instead |
| `armAngle` | number | - | Use `measurementArm.angle` or `startDeg` instead |
| `onAngleChange` | function | - | Callback when angle changes |

---

## Visual Configuration

### Protractor Type

#### Semicircular (180°)
```javascript
{
  protractorType: "semicircular",
  // Shows 0-180° with flat base at bottom
  // Arc curves upward
  // 0° on right, 90° at top, 180° on left
}
```

#### Circular (360°)
```javascript
{
  protractorType: "circular",
  // Shows full 0-360° circle
  // 0° on right, increases counterclockwise
}
```

### Glass Effect

Create a realistic glass/transparent effect:

```javascript
{
  backgroundColor: "rgba(200, 220, 255, 0.25)",  // Semi-transparent blue
  color: "#1a5490",           // Darker blue for marks
  labelColor: "#0d3a6b",      // Even darker for labels
  opacity: 0.95               // Slight transparency
}
```

### Custom Sizing with GC Units

All size properties support GC (Grid Cell) units for responsive scaling:

```javascript
{
  radius: "100gc",           // Protractor size
  labelFontSize: "12gc",     // Label text size
  majorTickLength: "15gc",   // Major tick marks
  minorTickLength: "8gc",    // Minor tick marks
  majorTickWidth: "2gc",     // Thick marks
  minorTickWidth: "1gc"      // Thin marks
}
```

### Color Customization

```javascript
{
  color: "#FF0000",                    // Tick marks color
  backgroundColor: "rgba(255,255,0,0.5)", // Yellow transparent
  labelColor: "#0000FF",               // Blue labels
  measurementArm: {
    color: "#00FF00"                   // Green arm
  },
  baseline: {
    color: "#999999"                   // Gray baseline
  }
}
```

---

## Interactive Features

### Dragging

Enable dragging to move the protractor:

```javascript
{
  mode: "interactive",  // or "draggable"
  isDraggable: true,
  cursor: "move"        // Shows move cursor on hover
}
```

**How to use:**
- Click and drag anywhere on the protractor face
- Protractor centers on mouse pointer during drag

### Rotation Ring

A visual indicator for rotation (dashed circle):

```javascript
{
  showRotationRing: true  // Show dashed ring around protractor
}
```

**Note:** The rotation ring is visual only. Use `isProtractorRotatable` for actual rotation.

---

## Measurement Arm

The measurement arm is a line that rotates to measure angles.

### Basic Configuration

```javascript
{
  measurementArm: {
    show: true,           // Show the arm
    color: "#FF0000",     // Red color
    length: "auto",       // Auto = 80% of radius
    startDeg: 0,          // Start at 0° (pointing right)
    style: "solid",       // Solid line
    zIndex: 10            // Above protractor body
  }
}
```

### Arm Styles

```javascript
// Solid line
measurementArm: { style: "solid" }

// Dashed line
measurementArm: { style: "dashed" }
```

### Arm Length

```javascript
// Auto-size (80% of protractor radius)
measurementArm: { length: "auto" }

// Fixed length in GC units
measurementArm: { length: "80gc" }

// Fixed length in pixels
measurementArm: { length: 150 }
```

### Arm Rotation

**Interactive rotation:**
```javascript
{
  isRotatable: true,  // Enable arm rotation
  measurementArm: {
    startDeg: 45      // Start at 45°
  }
}
```

**How to rotate:**
- Click and drag the arm line
- Arm rotates around protractor center
- Angle increases counterclockwise (0° = right)

### Dynamic Arm Extension

Enable the arm to extend beyond the protractor edge:

```javascript
{
  measurementArm: {
    extendable: true,  // Enable dynamic extension
    length: "auto"     // Default = 1.5x radius when extendable
  }
}
```

**How to extend:**
- Drag the **arrowhead** radially (toward/away from center)
- Minimum length: 1x radius
- Maximum length: 3x radius
- Default extended length: 1.5x radius

**Combined arrowhead interaction:**
- Drag arrowhead **radially** → Extends arm length
- Drag arrowhead **tangentially** → Rotates arm angle
- Intelligent detection based on drag direction

### Angle Display

Show the current angle measurement:

```javascript
{
  measurementArm: {
    angleDisplay: {
      show: true,          // Show angle display
      size: "14gc",        // Font size in GC units
      color: "#FF0000"     // Color (null = use arm color)
    }
  },
  anglePrecision: 1        // Decimal places (1 = "45.0°")
}
```

**Display position:** Outside the arrowhead, clearly visible

**Angle measurement:**
- 0° = Right (3 o'clock)
- 90° = Up (12 o'clock)
- 180° = Left (9 o'clock)
- 270° = Down (6 o'clock)
- Increases counterclockwise (0-360°)

---

## Baseline

A reference line (typically horizontal) for angle measurements.

### Configuration

```javascript
{
  baseline: {
    show: true,           // Show baseline
    color: "#999999",     // Gray color
    style: "dashed",      // Dashed line
    width: 1              // Line width in pixels
  }
}
```

### Baseline Styles

```javascript
// Dashed baseline
baseline: { style: "dashed" }

// Solid baseline
baseline: { style: "solid" }
```

### Use Cases

- **Educational:** Show the reference line for angle measurements
- **Alignment:** Provide a visual horizontal reference
- **Comparison:** Compare arm angle to baseline

**Note:** The baseline rotates with the protractor body when using protractor rotation.

---

## Snap Points

Snap points allow the protractor to "snap" to specific positions when dragged nearby.

### Basic Setup

```javascript
{
  snapPoints: [
    { x: 300, y: 500, label: "Vertex A" },
    { x: 600, y: 800, label: "Vertex B" },
    { x: 900, y: 600, label: "Vertex C" }
  ],
  snapMode: "hybrid",        // Snap when near, but allow free drop
  snapThreshold: 50,         // Snap within 50 pixels
  showSnapIndicators: true,  // Show orange circles
  highlightNearestSnap: true // Turn nearest point green
}
```

### Snap Point Format

```javascript
{
  x: 300,              // X coordinate in grid units
  y: 500,              // Y coordinate in grid units
  label: "Point A"     // Optional label (shown in tooltip)
}
```

### Snap Modes

#### Free Mode (No Snapping)
```javascript
snapMode: "free"
```
- Protractor can be dropped anywhere
- Snap points are ignored
- No snapping behavior

#### Fixed Mode (Must Snap)
```javascript
snapMode: "fixed"
```
- Protractor MUST snap to a point
- Cannot drop freely
- Always snaps to nearest point on drop

#### Hybrid Mode (Optional Snapping)
```javascript
snapMode: "hybrid"
```
- Protractor snaps when near a point (within threshold)
- Can drop freely if not near any point
- Best of both worlds

### Snap Threshold

Distance in pixels to trigger snapping:

```javascript
snapThreshold: 50   // Snap within 50 pixels
snapThreshold: 100  // Snap within 100 pixels (more aggressive)
snapThreshold: 25   // Snap within 25 pixels (less aggressive)
```

### Snap Indicators

Visual markers for snap points:

```javascript
// Show all snap points
{
  showSnapIndicators: true,
  highlightNearestSnap: true
}
// Result: All points shown as orange circles, nearest turns green

// Show only nearest
{
  showSnapIndicators: false,
  highlightNearestSnap: true
}
// Result: Only nearest point shown (green)

// Hide all indicators
{
  showSnapIndicators: false,
  highlightNearestSnap: false
}
// Result: Snapping works, but no visual indicators
```

### Snap Point Use Cases

1. **Align with vertices:** Snap to quadrilateral corners
2. **Fixed positions:** Restrict protractor to specific locations
3. **Multiple measurements:** Quickly move between pre-defined points
4. **Educational tools:** Guide students to measure specific angles

---

## Rotation Features

The protractor supports two types of rotation:
1. **Measurement Arm Rotation** - Rotates the arm only
2. **Protractor Body Rotation** - Rotates the entire protractor

### Measurement Arm Rotation

```javascript
{
  isRotatable: true,  // Enable arm rotation
  measurementArm: {
    startDeg: 45      // Initial angle
  }
}
```

**How to use:**
- Drag the measurement arm line
- Arm rotates independently of protractor body

### Protractor Body Rotation

Rotate the entire protractor (marks, labels, baseline, everything):

```javascript
{
  isProtractorRotatable: true,            // Enable body rotation
  showProtractorRotationHandle: true,     // Show blue rotation handle
  protractorRotation: 0                   // Initial rotation (degrees)
}
```

### Desktop Rotation

**Ctrl/Cmd + Drag:**
- Hold **Ctrl** (Windows/Linux) or **Cmd** (Mac)
- Click and drag the protractor face
- Entire protractor rotates around center

```javascript
{
  isProtractorRotatable: true
}
```

### Touch Device Rotation

**Two-Finger Gesture:**
- Place two fingers on the protractor
- Rotate fingers in circular motion
- Protractor rotates based on midpoint

```javascript
{
  isProtractorRotatable: true
}
```

### Rotation Handle (Touch/TV)

A visual handle for easy rotation on touch and TV interfaces:

```javascript
{
  isProtractorRotatable: true,
  showProtractorRotationHandle: true  // Show blue circular button
}
```

**Features:**
- Blue circular button with rotation icon (⟲)
- Positioned above protractor center
- Touch-friendly size (40×40px)
- Drag to rotate protractor
- Works on all platforms (desktop, touch, TV)

**When to use:**
- Always show for touch interfaces
- Essential for TV (no keyboard)
- Optional for desktop (Ctrl+drag alternative)

### Platform-Specific Recommendations

| Platform | `isProtractorRotatable` | `showProtractorRotationHandle` |
|----------|------------------------|--------------------------------|
| Desktop | `true` | `false` (Ctrl+drag is efficient) |
| Tablet | `true` | `true` (Two-finger + handle) |
| Phone | `true` | `true` (Handle easier on small screen) |
| TV | `true` | `true` (Handle is essential) |

---

## Callback Functions

The protractor provides comprehensive callback functions for real-time tracking of all interactive changes.

### onAngleChange

Called when the measurement arm angle changes.

```javascript
{
  onAngleChange: (angle) => {
    console.log(`Arm angle: ${angle.toFixed(1)}°`);
    // Real-time angle tracking
    // Validate angles
    // Update UI
  }
}
```

**Parameters:**
- `angle` (number): Current angle in degrees (0-360°)

**Triggered by:**
- Rotating the measurement arm
- Programmatic angle changes

### onArmExtend

Called when the arm length changes (requires `extendable: true`).

```javascript
{
  measurementArm: {
    extendable: true
  },
  onArmExtend: (length) => {
    console.log(`Arm length: ${length.toFixed(0)}px`);
    // Track extended measurements
    // Calculate distances
  }
}
```

**Parameters:**
- `length` (number): Current arm length in pixels

**Triggered by:**
- Dragging the arrowhead radially

### onProtractorRotate

Called when the entire protractor body rotates.

```javascript
{
  isProtractorRotatable: true,
  onProtractorRotate: (rotation) => {
    console.log(`Protractor rotation: ${rotation.toFixed(1)}°`);
    // Track orientation
    // Sync with other elements
  }
}
```

**Parameters:**
- `rotation` (number): Current rotation angle in degrees (0-360°)

**Triggered by:**
- Ctrl/Cmd + drag (desktop)
- Two-finger rotation (touch)
- Rotation handle drag

### onPositionChange

Called when the protractor moves to a new position.

```javascript
{
  isDraggable: true,
  onPositionChange: (position, snapPoint) => {
    console.log(`Position: (${position.x}, ${position.y})`);
    if (snapPoint) {
      console.log(`Snapped to: ${snapPoint.label}`);
    }
    // Save state
    // Update related elements
  }
}
```

**Parameters:**
- `position` (object): Current position `{x, y}` in pixels
- `snapPoint` (object|null): Snap point if snapped, or `null`

**Triggered by:**
- Dragging and dropping the protractor

### onSnapToPoint

Called specifically when the protractor snaps to a snap point.

```javascript
{
  snapMode: "hybrid",
  snapPoints: [
    { x: 300, y: 500, label: "Vertex A" }
  ],
  onSnapToPoint: (snapPoint) => {
    console.log(`Snapped to ${snapPoint.label}!`);
    // Highlight vertex
    // Provide feedback
  }
}
```

**Parameters:**
- `snapPoint` (object): The snap point `{x, y, label?}`

**Triggered by:**
- Snapping to a point in hybrid or fixed mode

### onClick

Called when the protractor is clicked.

```javascript
{
  onClick: (e) => {
    console.log('Protractor clicked');
    // Toggle selection
    // Show properties
  }
}
```

**Parameters:**
- `event` (object): The click event

**Triggered by:**
- Clicking on the protractor

### Complete Callback Example

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Enable all interactive features
  isDraggable: true,
  isRotatable: true,
  isProtractorRotatable: true,
  
  measurementArm: {
    show: true,
    extendable: true
  },
  
  snapPoints: [
    { x: 300, y: 500, label: "Vertex A" },
    { x: 600, y: 800, label: "Vertex B" }
  ],
  snapMode: "hybrid",
  
  // Track all changes
  onAngleChange: (angle) => {
    console.log(`📐 Angle: ${angle.toFixed(1)}°`);
  },
  
  onArmExtend: (length) => {
    console.log(`📏 Length: ${length.toFixed(0)}px`);
  },
  
  onProtractorRotate: (rotation) => {
    console.log(`🔄 Rotation: ${rotation.toFixed(1)}°`);
  },
  
  onPositionChange: (position, snapPoint) => {
    console.log(`📍 Position: (${position.x}, ${position.y})`);
    if (snapPoint) {
      console.log(`   ✨ Snapped to: ${snapPoint.label}`);
    }
  },
  
  onSnapToPoint: (snapPoint) => {
    console.log(`✨ Snap! ${snapPoint.label}`);
    highlightVertex(snapPoint.label);
  },
  
  onClick: (e) => {
    console.log('🖱️ Click!');
    showProperties();
  }
}
```

**See [PROTRACTOR-CALLBACKS.md](PROTRACTOR-CALLBACKS.md) for detailed callback documentation with practical examples.**

---

## Usage Examples

### Example 1: Basic Semicircular Protractor

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 800 },
  protractorType: "semicircular",
  radius: "100gc",
  mode: "interactive",
  isDraggable: true
}
```

### Example 2: Full Circular with Measurement

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  protractorType: "circular",
  radius: "120gc",
  measurementArm: {
    show: true,
    color: "#FF0000",
    startDeg: 0,
    extendable: true,
    angleDisplay: {
      show: true,
      size: "16gc",
      color: "#FF0000"
    }
  },
  isRotatable: true
}
```

### Example 3: Glass Effect with Baseline

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 500, col: 1000 },
  protractorType: "semicircular",
  radius: "100gc",
  backgroundColor: "rgba(200, 220, 255, 0.25)",
  color: "#1a5490",
  labelColor: "#0d3a6b",
  measurementArm: {
    show: true,
    color: "#FF0000",
    style: "dashed",
    startDeg: 45
  },
  baseline: {
    show: true,
    color: "#999999",
    style: "dashed"
  }
}
```

### Example 4: Snap-to-Vertices Mode

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 300, col: 500 },
  radius: "80gc",
  snapPoints: [
    { x: 300, y: 500, label: "Vertex A" },
    { x: 600, y: 500, label: "Vertex B" },
    { x: 600, y: 800, label: "Vertex C" },
    { x: 300, y: 800, label: "Vertex D" }
  ],
  snapMode: "hybrid",
  snapThreshold: 50,
  showSnapIndicators: true,
  highlightNearestSnap: true,
  isDraggable: true
}
```

### Example 5: Touch-Friendly with All Features

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Visual
  protractorType: "semicircular",
  radius: "100gc",
  backgroundColor: "rgba(200, 220, 255, 0.25)",
  labelColor: "#1a5490",
  labelFontSize: "14gc",
  majorTickLength: "18gc",
  minorTickLength: "10gc",
  
  // Interaction
  mode: "interactive",
  isDraggable: true,
  isRotatable: true,
  isProtractorRotatable: true,
  showProtractorRotationHandle: true,  // For touch/TV
  
  // Measurement Arm
  measurementArm: {
    show: true,
    color: "#FF0000",
    startDeg: 45,
    extendable: true,
    style: "dashed",
    zIndex: 10,
    angleDisplay: {
      show: true,
      size: "16gc",
      color: "#FF0000"
    }
  },
  
  // Baseline
  baseline: {
    show: true,
    color: "#999999",
    style: "dashed",
    width: 1
  },
  
  // Snap Points
  snapPoints: [
    { x: 300, y: 500 },
    { x: 600, y: 800 },
    { x: 900, y: 600 }
  ],
  snapMode: "hybrid",
  snapThreshold: 50,
  showSnapIndicators: true,
  highlightNearestSnap: true,
  
  // Precision
  anglePrecision: 1
}
```

### Example 6: Educational Setup

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 450, col: 800 },
  
  // Realistic protractor appearance
  protractorType: "semicircular",
  radius: "120gc",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#333",
  labelColor: "#000",
  
  // Large, readable labels
  labelFontSize: "14gc",
  labelInterval: 10,  // Label every 10 degrees
  
  // Clear tick marks
  majorTickLength: "18gc",
  minorTickLength: "10gc",
  majorTickWidth: "2gc",
  minorTickWidth: "1gc",
  
  // Interactive features
  isDraggable: true,
  isRotatable: true,
  
  // Measurement arm
  measurementArm: {
    show: true,
    color: "#FF0000",
    style: "solid",
    extendable: false,  // Fixed length for students
    angleDisplay: {
      show: true,
      size: "18gc",
      color: "#FF0000"
    }
  },
  
  // Baseline for reference
  baseline: {
    show: true,
    color: "#0000FF",
    style: "solid",
    width: 2
  },
  
  anglePrecision: 0  // Whole degrees only
}
```

---

## Platform-Specific Features

### Desktop Features

✅ **Ctrl+Drag Rotation**
- Hold Ctrl/Cmd and drag protractor face
- Precise control with mouse

✅ **Hover States**
- Cursor changes on interactive elements
- Visual feedback for clickable areas

✅ **Keyboard Modifiers**
- Ctrl/Cmd for protractor rotation
- (Future: Arrow keys for fine adjustment)

**Recommended Configuration:**
```javascript
{
  isProtractorRotatable: true,
  showProtractorRotationHandle: false,  // Ctrl+drag is efficient
  cursor: "move"
}
```

### Touch Device Features

✅ **Two-Finger Rotation**
- Natural rotation gesture
- Midpoint-based rotation

✅ **Touch-Friendly Sizes**
- Larger interactive areas
- Visible rotation handle

✅ **Gesture Support**
- Single-finger drag to move
- Two-finger rotation
- Pinch-to-zoom (future)

**Recommended Configuration:**
```javascript
{
  isProtractorRotatable: true,
  showProtractorRotationHandle: true,  // Visual affordance
  radius: "120gc",  // Larger size for touch
  measurementArm: {
    angleDisplay: {
      size: "16gc"  // Larger text
    }
  }
}
```

### TV Interface Features

✅ **Rotation Handle**
- Essential for rotation (no keyboard)
- Large, visible target

✅ **Remote Control Compatible**
- Drag with directional buttons
- Click to select

✅ **High Contrast**
- Visible from distance
- Clear labels

**Recommended Configuration:**
```javascript
{
  isProtractorRotatable: true,
  showProtractorRotationHandle: true,  // Essential
  radius: "150gc",  // Large size
  labelFontSize: "16gc",  // Large labels
  labelColor: "#000",  // High contrast
  measurementArm: {
    color: "#FF0000",  // Bright color
    angleDisplay: {
      size: "20gc",  // Very large
      color: "#FF0000"
    }
  }
}
```

---

## Advanced Configurations

### Multiple Protractors

You can have multiple protractors on the same page:

```javascript
elements: [
  {
    componentType: "ProtractorComponent",
    centerPoint: { row: 300, col: 600 },
    measurementArm: { color: "#FF0000" }  // Red arm
  },
  {
    componentType: "ProtractorComponent",
    centerPoint: { row: 300, col: 1000 },
    measurementArm: { color: "#0000FF" }  // Blue arm
  }
]
```

### Dynamic Spawning

Spawn protractors programmatically (e.g., on angle arc click):

```javascript
// In angle-marker-component.js or custom code
window.spawnProtractorAtVertex(
  { row: 450, col: 800 },  // Position
  {
    radius: "100gc",
    mode: "rotatable",
    measurementArm: {
      startDeg: 45
    }
  }
);

// Remove all spawned protractors
window.removeAllProtractors();
```

### Responsive Sizing

Use GC units for all size properties to maintain proportions:

```javascript
{
  radius: "15%",  // 15% of viewport width (responsive)
  labelFontSize: "1.5%",
  majorTickLength: "2%",
  measurementArm: {
    angleDisplay: {
      size: "2%"
    }
  }
}
```

### Angle Constraints

Limit measurement arm rotation:

```javascript
{
  measurementArm: {
    angle: 45,
    // TODO: Add min/max angle props in future
  },
  snapToDegrees: 15  // Snap to 15° increments (0, 15, 30, 45...)
}
```

### Custom Callbacks

```javascript
{
  onClick: (e) => {
    console.log("Protractor clicked", e);
  },
  onAngleChange: (angle) => {
    console.log("Arm angle:", angle);
  }
}
```

### Integration with Quadrilaterals

Click angle arcs to spawn protractors:

```javascript
// In quadrilateral configuration
{
  componentType: "QuadrilateralComponent",
  // ... quad props
}

// Protractor spawns on angle arc click
// See CLICK-TO-SPAWN-PROTRACTOR.md for details
```

### Custom Styling

Override default styles via props:

```javascript
{
  // Custom glass effect
  backgroundColor: "linear-gradient(135deg, rgba(200,220,255,0.3), rgba(150,180,230,0.2))",
  
  // Custom colors for visual hierarchy
  color: "#1a5490",           // Primary (marks)
  labelColor: "#0d3a6b",      // Darker (labels)
  measurementArm: {
    color: "#FF4444"          // Accent (arm)
  },
  baseline: {
    color: "#AAAAAA"          // Subtle (baseline)
  }
}
```

---

## Best Practices

### 1. Choose the Right Type

- **Semicircular:** Most common, measures 0-180°, realistic
- **Circular:** Full 360°, good for full rotations

### 2. Use GC Units for Consistency

```javascript
radius: "100gc"        // ✅ Scales with grid
radius: 200            // ❌ Fixed pixels, may not scale
```

### 3. Enable Appropriate Features

Desktop:
```javascript
isDraggable: true
isRotatable: true
isProtractorRotatable: true
showProtractorRotationHandle: false  // Use Ctrl+drag
```

Touch/TV:
```javascript
isDraggable: true
isRotatable: true
isProtractorRotatable: true
showProtractorRotationHandle: true   // Visual handle
```

### 4. Optimize Performance

- Use `mode: "static"` for non-interactive protractors
- Limit number of protractors on screen
- Use reasonable `labelInterval` (e.g., 30 instead of 5)

### 5. Accessibility

- High contrast colors for visibility
- Larger sizes for touch devices
- Clear labels with readable font sizes
- Rotation handle for non-keyboard interfaces

### 6. Educational Use

```javascript
{
  // Realistic appearance
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  
  // Clear labels every 10°
  labelInterval: 10,
  labelFontSize: "14gc",
  
  // Show baseline for reference
  baseline: { show: true },
  
  // Large angle display
  measurementArm: {
    angleDisplay: {
      show: true,
      size: "18gc"
    }
  },
  
  // Whole degrees only
  anglePrecision: 0
}
```

---

## Troubleshooting

### Protractor Not Showing

- Check `centerPoint` or `coordinates` are valid
- Ensure `radius` is not too small
- Verify `opacity` is not 0
- Check `zIndex` is not blocked by other elements

### Can't Drag Protractor

- Set `mode: "interactive"` or `mode: "draggable"`
- Set `isDraggable: true`
- Check another element isn't blocking pointer events

### Can't Rotate Arm

- Set `isRotatable: true`
- Ensure arm is visible: `measurementArm: { show: true }`
- Try clicking directly on the arm line

### Can't Rotate Protractor Body

- Set `isProtractorRotatable: true`
- Desktop: Hold Ctrl/Cmd while dragging
- Touch: Use two fingers or enable rotation handle
- TV: Enable rotation handle

### Snap Points Not Working

- Verify `snapPoints` array has valid `{x, y}` objects
- Check `snapMode` is `"fixed"` or `"hybrid"` (not `"free"`)
- Ensure `snapThreshold` is reasonable (e.g., 50)
- Verify coordinates are in grid units

### Angle Display Not Showing

- Set `measurementArm.angleDisplay.show: true`
- Ensure `measurementArm.show: true`
- Check `angleDisplay.color` is visible against background

### Baseline Not Visible

- Set `baseline.show: true`
- Ensure `baseline.color` contrasts with background
- Check `baseline.width` is not too small

---

## API Summary

### Minimum Required Props

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 800 }
}
```

### All Props at a Glance

```javascript
{
  // Core
  id: "protractor-1",
  elementName: "mainProtractor",
  currentPage: 1,
  zIndex: 5000,
  
  // Position
  centerPoint: { row: 400, col: 800 },
  
  // Visual
  protractorType: "semicircular",
  radius: "100gc",
  color: "#333",
  backgroundColor: "rgba(255,255,255,0.9)",
  opacity: 1,
  labelColor: "#333",
  protractorRotation: 0,
  
  // Marks & Labels
  showDegreeMarks: true,
  showDegreeLabels: true,
  degreeInterval: 10,
  labelInterval: 30,
  labelFontSize: "12gc",
  majorTickLength: "15gc",
  minorTickLength: "8gc",
  majorTickWidth: "2gc",
  minorTickWidth: "1gc",
  
  // Interaction
  mode: "interactive",
  isDraggable: true,
  isRotatable: true,
  isProtractorRotatable: false,
  cursor: "move",
  onClick: null,
  
  // UI
  showRotationRing: true,
  showProtractorRotationHandle: false,
  
  // Measurement Arm
  measurementArm: {
    show: true,
    length: "auto",
    color: "#FF0000",
    angle: 0,
    startDeg: 0,
    style: "solid",
    extendable: false,
    zIndex: 10,
    angleDisplay: {
      show: true,
      size: "14gc",
      color: null
    }
  },
  
  // Baseline
  baseline: {
    show: false,
    color: "#999999",
    style: "dashed",
    width: 1
  },
  
  // Snap Points
  snapPoints: [],
  snapMode: "free",
  snapThreshold: 50,
  showSnapIndicators: true,
  highlightNearestSnap: true,
  
  // Precision
  snapToGrid: false,
  snapToDegrees: 0,
  anglePrecision: 1,
  
  // Integration
  attachToElement: null,
  measureMode: "single",
  
  // Callbacks
  onAngleChange: null,
  onArmExtend: null,
  onProtractorRotate: null,
  onPositionChange: null,
  onSnapToPoint: null,
  onClick: null
}
```

---

## See Also

- **PROTRACTOR-COMPONENT.md** - Original implementation documentation
- **PROTRACTOR-BODY-ROTATION.md** - Rotation feature details
- **PROTRACTOR-SNAP-POINTS.md** - Snap points feature details
- **MEASUREMENT-ARM-CONFIG.md** - Measurement arm configuration
- **CLICK-TO-SPAWN-PROTRACTOR.md** - Dynamic spawning guide
- **QUICK-START-PROTRACTOR.md** - Quick start guide

---

**Version:** 2.0  
**Last Updated:** November 2024  
**Component:** ProtractorComponent  
**File:** `js/components/protractor-component.js`

