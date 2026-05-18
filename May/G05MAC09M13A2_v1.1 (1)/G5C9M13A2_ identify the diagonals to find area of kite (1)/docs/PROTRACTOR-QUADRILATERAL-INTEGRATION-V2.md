# Protractor-Quadrilateral Integration

## Overview

The protractor can now be fully integrated with quadrilateral components, providing automatic snap points at all vertices and the diagonal intersection point. This creates a seamless measurement experience for geometric angle analysis.

## Key Features

✅ **Automatic Snap Points** - All 4 vertices + diagonal intersection  
✅ **Fully Interactive** - Drag, rotate arm, rotate body, extend arm  
✅ **Touch & TV Support** - Two-finger gestures + rotation handle  
✅ **Smart Positioning** - Defaults to quadrilateral center  
✅ **Customizable** - Full control over appearance and behavior  
✅ **Callback Integration** - Track all measurements and interactions  

---

## Quick Start

### Enable Protractor Integration

Add `protractorConfig` to your quadrilateral:

```javascript
{
  componentType: "QuadrilateralComponent",
  quadType: "SQUARE",
  showDiagonals: true,  // Show diagonals for intersection snap point
  
  protractorConfig: {
    enabled: true  // That's it! Protractor with auto snap points
  }
}
```

This automatically creates snap points at:
- Vertex A
- Vertex B
- Vertex C
- Vertex D
- Diagonal Intersection (if `showDiagonals: true`)

---

## Configuration

### Basic Configuration

```javascript
protractorConfig: {
  enabled: true,          // Enable protractor
  type: "semicircular",   // "semicircular" or "circular"
  radius: "80gc",         // Size
  snapMode: "hybrid"      // Snap behavior
}
```

### Full Configuration

```javascript
protractorConfig: {
  enabled: true,
  
  // ===== VISUAL =====
  type: "semicircular",                      // "semicircular" or "circular"
  radius: "80gc",                            // Protractor size
  backgroundColor: "rgba(200,220,255,0.25)", // Glass effect
  color: "#1a5490",                          // Marks color
  labelColor: "#0d3a6b",                     // Labels color
  
  // ===== POSITION =====
  centerPoint: { row: 400, col: 500 },      // Optional (defaults to quad center)
  
  // ===== MEASUREMENT ARM =====
  showArm: true,                            // Show measurement arm
  armColor: "#FF0000",                      // Arm color
  armStartDeg: 0,                           // Initial angle (0-360°)
  armExtendable: true,                      // Allow dynamic extension
  armStyle: "dashed",                       // "solid" or "dashed"
  showAngleDisplay: true,                   // Show angle measurement
  angleDisplaySize: "14gc",                 // Angle text size
  angleDisplayColor: null,                  // null = use armColor
  
  // ===== BASELINE =====
  showBaseline: true,                       // Show baseline reference
  baselineColor: "#999999",                 // Baseline color
  baselineStyle: "dashed",                  // "solid" or "dashed"
  baselineWidth: 1,                         // Line width in pixels
  
  // ===== SNAP CONFIGURATION =====
  // Snap points are auto-generated (vertices + diagonal intersection)
  snapMode: "hybrid",                       // "free", "fixed", or "hybrid"
  snapThreshold: 50,                        // Snap distance in pixels
  showSnapIndicators: true,                 // Show snap point markers
  highlightNearestSnap: true,               // Highlight nearest point
  
  // ===== CALLBACKS =====
  onAngleChange: (angle) => {
    console.log(`Angle: ${angle}°`);
  },
  onArmExtend: (length) => {
    console.log(`Length: ${length}px`);
  },
  onProtractorRotate: (rotation) => {
    console.log(`Rotation: ${rotation}°`);
  },
  onPositionChange: (position, snapPoint) => {
    console.log(`Position: (${position.x}, ${position.y})`);
    if (snapPoint) console.log(`Snapped to: ${snapPoint.label}`);
  },
  onSnapToPoint: (snapPoint) => {
    console.log(`Snapped to ${snapPoint.label}!`);
  }
}
```

---

## Snap Points

### Automatic Generation

Snap points are automatically generated from the quadrilateral:

1. **Vertex A** - Top-left corner
2. **Vertex B** - Top-right corner
3. **Vertex C** - Bottom-right corner
4. **Vertex D** - Bottom-left corner
5. **Diagonal Intersection** - Where AC and BD intersect (only if `showDiagonals: true`)

### Snap Point Format

Each snap point has:
```javascript
{
  x: 300,                      // Grid X coordinate
  y: 500,                      // Grid Y coordinate
  label: "Vertex A"            // Descriptive label
}
```

### Snap Modes

#### Free Mode
```javascript
snapMode: "free"
```
- Protractor can be dropped anywhere
- Snap points are ignored
- No snapping behavior

#### Fixed Mode
```javascript
snapMode: "fixed"
```
- Protractor MUST snap to a point
- Cannot drop freely
- Always snaps to nearest vertex/intersection

#### Hybrid Mode (Recommended)
```javascript
snapMode: "hybrid"
```
- Snaps when near a point (within `snapThreshold`)
- Can drop freely if not near any point
- Best of both worlds

### Snap Threshold

Distance in pixels to trigger snapping:

```javascript
snapThreshold: 50   // Snap within 50 pixels
snapThreshold: 100  // More aggressive snapping
snapThreshold: 25   // Less aggressive snapping
```

---

## Interactive Features

### 1. Dragging

The protractor is fully draggable:
- **Click and drag** the protractor body
- **Snaps** to vertices and diagonal intersection
- **Smooth movement** with visual feedback

**Automatic behavior:** Always enabled when `protractorConfig.enabled: true`

### 2. Measurement Arm Rotation

Rotate the measurement arm to measure angles:
- **Click and drag** the arm line
- **Angle increases** counterclockwise (0° = right)
- **Live angle display** shows current measurement

**Automatic behavior:** Always enabled

### 3. Arm Extension

Extend the arm beyond the protractor edge:
- **Click and drag** the arrowhead radially
- **Min length:** 1x radius
- **Max length:** 3x radius
- **Default:** 1.5x radius

**Enable with:**
```javascript
armExtendable: true
```

### 4. Protractor Body Rotation

Rotate the entire protractor:

**Desktop:**
- Hold **Ctrl** (Windows/Linux) or **Cmd** (Mac)
- Drag protractor face

**Touch:**
- **Two-finger rotation** gesture
- OR drag the **rotation handle**

**TV:**
- Drag the **rotation handle**

**Automatic behavior:** Always enabled (rotation handle shown automatically)

---

## Use Cases

### 1. Measure Vertex Angles

```javascript
{
  componentType: "QuadrilateralComponent",
  quadType: "RECTANGLE",
  
  protractorConfig: {
    enabled: true,
    snapMode: "hybrid",
    
    onSnapToPoint: (snapPoint) => {
      if (snapPoint.label.includes("Vertex")) {
        console.log(`Measuring angle at ${snapPoint.label}`);
      }
    }
  }
}
```

**Workflow:**
1. Drag protractor to Vertex A
2. Protractor snaps automatically
3. Rotate arm to measure angle
4. Move to next vertex

### 2. Analyze Diagonal Properties

```javascript
{
  componentType: "QuadrilateralComponent",
  quadType: "RHOMBUS",
  showDiagonals: true,  // Show diagonals
  
  protractorConfig: {
    enabled: true,
    snapMode: "fixed",  // Must snap to points
    
    onSnapToPoint: (snapPoint) => {
      if (snapPoint.label === "Diagonal Intersection") {
        console.log("Measuring angles at diagonal intersection");
        // Diagonals of rhombus intersect at 90°
      }
    }
  }
}
```

**Workflow:**
1. Drag protractor to diagonal intersection
2. Measure angles formed by intersecting diagonals
3. Verify perpendicularity (90°)

### 3. Educational Exploration

```javascript
{
  componentType: "QuadrilateralComponent",
  quadType: "TRAPEZOID",
  
  protractorConfig: {
    enabled: true,
    snapMode: "hybrid",
    showSnapIndicators: true,
    
    onAngleChange: (angle) => {
      // Provide real-time feedback
      document.getElementById('angle-display').textContent = `${angle.toFixed(1)}°`;
    },
    
    onSnapToPoint: (snapPoint) => {
      // Guide students
      showInstructionFor(snapPoint.label);
    }
  }
}
```

**Educational benefits:**
- Visual snap points guide students to vertices
- Real-time angle feedback
- Explore angle properties interactively

### 4. Multi-Angle Comparison

```javascript
const measurements = [];

{
  componentType: "QuadrilateralComponent",
  quadType: "PARALLELOGRAM",
  
  protractorConfig: {
    enabled: true,
    
    onAngleChange: (angle) => {
      currentMeasurement = angle;
    },
    
    onSnapToPoint: (snapPoint) => {
      measurements.push({
        vertex: snapPoint.label,
        angle: currentMeasurement
      });
      
      // Check parallelogram property: opposite angles are equal
      if (measurements.length === 4) {
        verifyOppositeAnglesEqual(measurements);
      }
    }
  }
}
```

**Workflow:**
1. Measure angle at each vertex
2. Store measurements
3. Verify geometric properties
4. Display results

---

## Positioning

### Default Position (Center of Quadrilateral)

By default, the protractor is positioned at the center:

```javascript
protractorConfig: {
  enabled: true
  // centerPoint not specified - uses quad center
}
```

**Calculated as:**
```javascript
centerRow = (A.row + B.row + C.row + D.row) / 4
centerCol = (A.col + B.col + C.col + D.col) / 4
```

### Custom Position

Specify a custom starting position:

```javascript
protractorConfig: {
  enabled: true,
  centerPoint: { row: 300, col: 500 }  // Custom position in grid coordinates
}
```

**Note:** Grid coordinates are in the quadrilateral's local grid system (e.g., 10x10).

---

## Appearance Customization

### Glass Effect

Create a realistic glass protractor:

```javascript
protractorConfig: {
  enabled: true,
  backgroundColor: "rgba(200, 220, 255, 0.25)",  // Semi-transparent blue
  color: "#1a5490",                              // Darker blue marks
  labelColor: "#0d3a6b"                          // Even darker labels
}
```

### Contrast Theme

High-contrast for visibility:

```javascript
protractorConfig: {
  enabled: true,
  backgroundColor: "rgba(255, 255, 255, 0.9)",  // Solid white
  color: "#000000",                             // Black marks
  labelColor: "#000000",                        // Black labels
  armColor: "#FF0000"                           // Red arm
}
```

### Subtle Theme

Low-key appearance:

```javascript
protractorConfig: {
  enabled: true,
  backgroundColor: "rgba(240, 240, 240, 0.5)",  // Light gray transparent
  color: "#666666",                             // Gray marks
  labelColor: "#333333",                        // Dark gray labels
  armColor: "#0066CC"                           // Blue arm
}
```

---

## Callbacks and Events

### onAngleChange

Track measurement arm angle changes:

```javascript
onAngleChange: (angle) => {
  // Real-time angle tracking (0-360°)
  updateAngleDisplay(angle);
  
  // Validate angles
  if (angle === 90) {
    highlightRightAngle();
  }
}
```

### onArmExtend

Track arm length changes:

```javascript
onArmExtend: (length) => {
  // Track extended measurements
  console.log(`Arm length: ${length}px`);
  
  // Calculate extended distance
  updateDistanceCalculation(length);
}
```

### onProtractorRotate

Track protractor body rotation:

```javascript
onProtractorRotate: (rotation) => {
  // Track orientation
  console.log(`Protractor rotated to: ${rotation}°`);
  
  // Sync with other elements
  alignBaselineWithSide(rotation);
}
```

### onPositionChange

Track all position changes:

```javascript
onPositionChange: (position, snapPoint) => {
  console.log(`Position: (${position.x}, ${position.y})`);
  
  if (snapPoint) {
    // Snapped to a vertex/intersection
    console.log(`Snapped to: ${snapPoint.label}`);
    highlightVertex(snapPoint.label);
  } else {
    // Free placement
    console.log('Free placement');
    clearHighlights();
  }
}
```

### onSnapToPoint

Specific snap event handler:

```javascript
onSnapToPoint: (snapPoint) => {
  // Called specifically when snapping occurs
  console.log(`Snapped to ${snapPoint.label}!`);
  
  // Play snap sound
  playSnapSound();
  
  // Show visual feedback
  showSnapAnimation(snapPoint);
  
  // Update context
  if (snapPoint.label.includes("Vertex")) {
    showVertexMeasurementUI();
  } else if (snapPoint.label === "Diagonal Intersection") {
    showIntersectionMeasurementUI();
  }
}
```

---

## Complete Example

```javascript
{
  id: "page1-quadrilateral",
  name: "main-quad",
  type: "custom",
  coordinates: [50, 50, 1000, 700],
  zIndex: 40,
  props: {
    componentType: "QuadrilateralComponent",
    quadType: "SQUARE",
    gridRows: 10,
    gridCols: 10,
    showGrid: true,
    showDiagonals: true,  // Enable diagonal intersection snap point
    
    // ===== PROTRACTOR INTEGRATION =====
    protractorConfig: {
      enabled: true,
      
      // Visual
      type: "semicircular",
      radius: "80gc",
      backgroundColor: "rgba(200, 220, 255, 0.25)",
      color: "#1a5490",
      labelColor: "#0d3a6b",
      
      // Position (optional - defaults to center)
      // centerPoint: { row: 5, col: 5 },
      
      // Measurement Arm
      showArm: true,
      armColor: "#FF0000",
      armStartDeg: 45,
      armExtendable: true,
      armStyle: "dashed",
      showAngleDisplay: true,
      angleDisplaySize: "16gc",
      angleDisplayColor: "#FF0000",
      
      // Baseline
      showBaseline: true,
      baselineColor: "#999999",
      baselineStyle: "dashed",
      baselineWidth: 1,
      
      // Snap Points (auto-generated)
      // - Vertex A, B, C, D
      // - Diagonal Intersection
      snapMode: "hybrid",
      snapThreshold: 50,
      showSnapIndicators: true,
      highlightNearestSnap: true,
      
      // Callbacks
      onAngleChange: (angle) => {
        console.log(`📐 Angle: ${angle.toFixed(1)}°`);
        updateAngleDisplay(angle);
      },
      
      onArmExtend: (length) => {
        console.log(`📏 Length: ${length.toFixed(0)}px`);
      },
      
      onProtractorRotate: (rotation) => {
        console.log(`🔄 Rotation: ${rotation.toFixed(1)}°`);
      },
      
      onPositionChange: (position, snapPoint) => {
        if (snapPoint) {
          console.log(`📍 Snapped to: ${snapPoint.label}`);
          highlightVertex(snapPoint.label);
        } else {
          console.log(`📍 Position: (${position.x}, ${position.y})`);
          clearHighlights();
        }
      },
      
      onSnapToPoint: (snapPoint) => {
        console.log(`✨ Snap! ${snapPoint.label}`);
        playSnapSound();
        showSnapAnimation(snapPoint);
        
        // Context-specific actions
        if (snapPoint.label.includes("Vertex")) {
          showVertexInstructions(snapPoint.label);
        } else if (snapPoint.label === "Diagonal Intersection") {
          showIntersectionInstructions();
        }
      }
    }
  }
}
```

---

## Best Practices

### 1. Enable Diagonals for Intersection Point

```javascript
{
  showDiagonals: true,  // Shows diagonals AND enables intersection snap point
  protractorConfig: {
    enabled: true
  }
}
```

### 2. Use Hybrid Snap Mode

```javascript
{
  protractorConfig: {
    snapMode: "hybrid"  // Best balance of guidance and flexibility
  }
}
```

### 3. Provide Visual Feedback

```javascript
{
  protractorConfig: {
    showSnapIndicators: true,      // Show snap points
    highlightNearestSnap: true,    // Highlight nearest
    onSnapToPoint: (snapPoint) => {
      // Add custom feedback
      flashVertex(snapPoint.label);
      playSound();
    }
  }
}
```

### 4. Start at Sensible Angle

```javascript
{
  protractorConfig: {
    armStartDeg: 0  // Start at 0° (horizontal right)
    // or 45, 90, etc. based on expected measurement
  }
}
```

### 5. Match Colors for Visual Cohesion

```javascript
{
  angleConfig: {
    markerColor: "#FF6600"  // Quad angle markers
  },
  protractorConfig: {
    armColor: "#FF6600"     // Match arm color
  }
}
```

---

## Coordinate Systems

### Understanding the Conversion

The integration handles three coordinate systems:

1. **Quadrilateral Grid** (e.g., 10x10)
   - Local to the quadrilateral
   - Vertex positions: `{row: 0-10, col: 0-10}`

2. **Precision Grid** (e.g., 900x1600)
   - Global application grid
   - Used by protractor snap points

3. **Viewport Pixels**
   - Screen coordinates
   - Used for rendering

**Automatic conversion:**
```javascript
// You provide vertices in quad grid:
{ row: 2, col: 3 }

// System converts to precision grid:
{ row: 180, col: 480 }  // For 900x1600 grid

// And renders at correct pixel position
```

---

## Troubleshooting

### Protractor Not Showing

**Check:**
```javascript
protractorConfig: {
  enabled: true  // Must be true
}
```

### Snap Points Not Working

**Check:**
1. `snapMode` is not `"free"`
2. `snapThreshold` is reasonable (e.g., 50)
3. Protractor is near a vertex/intersection

### Diagonal Intersection Not Appearing

**Check:**
```javascript
showDiagonals: true  // Must be true for intersection snap point
```

### Callbacks Not Firing

**Check:**
- Callbacks are defined in `protractorConfig`, not at top level
- Function syntax is correct: `onAngleChange: (angle) => {}`

---

## API Summary

### Required Props

```javascript
{
  protractorConfig: {
    enabled: true  // Minimum required
  }
}
```

### All Props

See full configuration section above for complete prop list.

---

## See Also

- **PROTRACTOR-COMPLETE-REFERENCE.md** - Complete protractor props reference
- **PROTRACTOR-CALLBACKS.md** - Detailed callback documentation
- **PROTRACTOR-SNAP-POINTS.md** - Snap points system details
- **PROTRACTOR-BODY-ROTATION.md** - Rotation features guide

---

**Version:** 2.0  
**Last Updated:** November 2024  
**Component:** QuadrilateralComponent + ProtractorComponent  
**Files:** 
- `js/components/quadrilateral-component.js`
- `js/components/protractor-component.js`

