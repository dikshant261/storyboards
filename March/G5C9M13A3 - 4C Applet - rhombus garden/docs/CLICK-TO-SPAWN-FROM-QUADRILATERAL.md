# Click-to-Spawn Protractor from Quadrilateral

## Overview

You can now spawn protractors dynamically by clicking on angle arcs in a quadrilateral! The spawned protractor automatically includes snap points for all vertices and the diagonal intersection.

## How to Enable

Add `enableClickToSpawn: true` to your quadrilateral's `protractorConfig`:

```javascript
{
  componentType: "QuadrilateralComponent",
  showDiagonals: true,  // Enable diagonal intersection snap point
  
  protractorConfig: {
    enableClickToSpawn: true,  // ✅ Enable click-to-spawn!
    
    // All spawned protractors will use these settings:
    type: "semicircular",
    radius: "80gc",
    backgroundColor: "rgba(200, 220, 255, 0.25)",
    armColor: "#FF0000",
    armExtendable: true,
    snapMode: "hybrid",
    // ... more settings
  }
}
```

## How to Use

### Step 1: Click Any Angle Arc

Click on any angle arc (the orange curves at the vertices):
- Click at **Vertex A** → Protractor spawns at A
- Click at **Vertex B** → Protractor spawns at B
- Click at **Vertex C** → Protractor spawns at C
- Click at **Vertex D** → Protractor spawns at D

### Step 2: Protractor Appears

When you click, a protractor instantly appears at that vertex with:
- ✅ Position: At the clicked vertex
- ✅ Snap points: All 4 vertices + diagonal intersection
- ✅ Fully interactive: Drag, rotate, measure
- ✅ All features: As configured in `protractorConfig`

### Step 3: Use the Protractor

The spawned protractor is fully functional:

**Move it:**
- Drag to any vertex - it snaps automatically
- Orange circles show snap points
- Green circle shows nearest snap point

**Measure angle:**
- Drag the red measurement arm
- Angle displays in real-time

**Extend arm:**
- Drag the arrowhead to extend/retract

**Rotate protractor:**
- Desktop: Ctrl/Cmd + drag
- Touch: Two fingers or rotation handle

### Step 4: Spawn Multiple Protractors

You can spawn multiple protractors:
- Click different angle arcs
- Each spawns a new protractor
- All protractors are independent
- All share the same snap points

### Step 5: Remove Protractors (Optional)

To remove all spawned protractors, open console and run:
```javascript
window.removeAllProtractors();
```

## Configuration

### Required Config

```javascript
protractorConfig: {
  enableClickToSpawn: true  // Minimum requirement
}
```

### Recommended Config

```javascript
protractorConfig: {
  enableClickToSpawn: true,
  
  // Visual
  type: "semicircular",
  radius: "80gc",
  backgroundColor: "rgba(200, 220, 255, 0.25)",
  color: "#1a5490",
  labelColor: "#0d3a6b",
  
  // Measurement Arm
  showArm: true,
  armColor: "#FF0000",
  armStartDeg: 0,
  armExtendable: true,
  armStyle: "dashed",
  showAngleDisplay: true,
  angleDisplaySize: "14gc",
  
  // Baseline
  showBaseline: true,
  baselineColor: "#999999",
  baselineStyle: "dashed",
  
  // Snap Points (auto-generated)
  snapMode: "hybrid",
  snapThreshold: 50,
  showSnapIndicators: true,
  highlightNearestSnap: true
}
```

### Full Config Options

All protractor configuration options are supported:

| Option | Description | Default |
|--------|-------------|---------|
| `type` | "semicircular" or "circular" | "semicircular" |
| `radius` | Size in GC units | "80gc" |
| `backgroundColor` | Background color (rgba for glass effect) | "rgba(200,220,255,0.25)" |
| `color` | Marks color | "#1a5490" |
| `labelColor` | Label text color | "#0d3a6b" |
| `showArm` | Show measurement arm | true |
| `armColor` | Arm color | "#FF0000" |
| `armStartDeg` | Initial arm angle | 0 |
| `armExtendable` | Allow arm extension | true |
| `armStyle` | "solid" or "dashed" | "dashed" |
| `showAngleDisplay` | Show angle measurement | true |
| `angleDisplaySize` | Angle text size | "14gc" |
| `showBaseline` | Show baseline reference | true |
| `baselineColor` | Baseline color | "#999999" |
| `baselineStyle` | "solid" or "dashed" | "dashed" |
| `snapMode` | "free", "fixed", or "hybrid" | "hybrid" |
| `snapThreshold` | Snap distance in pixels | 50 |
| `showSnapIndicators` | Show snap point markers | true |
| `highlightNearestSnap` | Highlight nearest point | true |

## Snap Points

### Automatic Generation

All spawned protractors get the same snap points:

1. **Vertex A** - Labeled "Vertex A"
2. **Vertex B** - Labeled "Vertex B"
3. **Vertex C** - Labeled "Vertex C"
4. **Vertex D** - Labeled "Vertex D"
5. **Diagonal Intersection** - Only if `showDiagonals: true`

### Snap Point Features

- **Orange circles** mark snap points
- **Green circle** highlights nearest point when nearby
- **Automatic snapping** in hybrid/fixed modes
- **Labels** show in tooltips

## Interactive Features

All spawned protractors have:

✅ **Draggable** - Move freely or snap to vertices  
✅ **Rotatable Arm** - Measure any angle  
✅ **Extendable Arm** - Dynamic length (1x to 3x)  
✅ **Rotatable Body** - Align protractor orientation  
✅ **Touch Support** - Two-finger gestures + rotation handle  
✅ **Snap Points** - All vertices + intersection  

## Console Logging

Spawned protractors log activity:

```
🖱️ Arc clicked! Label: ∠A Vertex: {row: 0, col: 0}
🎯 Invoking onArcClick for ∠A at vertex {row: 0, col: 0}
🎯 Spawning protractor at vertex: {row: 0, col: 0}
📐 Spawning protractor at vertex (450, 800) 'protractor-1'
```

## Use Cases

### 1. Measure All Vertex Angles

```javascript
// Click each angle arc in sequence
// 1. Click ∠A → Measure → Note angle
// 2. Click ∠B → Measure → Note angle
// 3. Click ∠C → Measure → Note angle
// 4. Click ∠D → Measure → Note angle
// Verify: Sum = 360°
```

### 2. Compare Opposite Angles

```javascript
// For parallelogram: opposite angles are equal
// Click ∠A → Measure (e.g., 60°)
// Click ∠C → Measure (should be 60°)
```

### 3. Analyze Diagonal Intersection

```javascript
{
  showDiagonals: true,  // Show diagonals
  protractorConfig: {
    enableClickToSpawn: true
  }
}

// Click any angle arc
// Drag protractor to diagonal intersection
// Measure angles formed by intersecting diagonals
```

### 4. Educational Exploration

```javascript
// Students can:
// 1. Click any angle to spawn protractor
// 2. Measure the angle
// 3. Drag to other vertices to compare
// 4. Verify geometric properties
```

## Troubleshooting

### No Protractor When Clicking Arc

**Check:**
```javascript
protractorConfig: {
  enableClickToSpawn: true  // Must be true!
}
```

### Console Error: "No protractor spawn function available"

**Solution:** Set `enableClickToSpawn: true` in quadrilateral config

### Protractor Appears But No Snap Points

**Check:**
```javascript
showSnapIndicators: true,     // Show markers
highlightNearestSnap: true,   // Highlight nearest
snapMode: "hybrid" or "fixed" // Not "free"
```

### Diagonal Intersection Missing

**Check:**
```javascript
showDiagonals: true  // Must be true for intersection snap point
```

## Comparison: Click-to-Spawn vs Integrated

| Feature | Click-to-Spawn | Integrated (`enabled: true`) |
|---------|----------------|------------------------------|
| **Trigger** | Click angle arc | Automatic on page load |
| **Position** | At clicked vertex | At quad center (or custom) |
| **Multiple** | Yes (spawn many) | No (one only) |
| **Remove** | `removeAllProtractors()` | Set `enabled: false` |
| **Use Case** | Dynamic exploration | Always-available tool |

## Complete Example

```javascript
{
  id: "page1-quadrilateral",
  name: "quadrilateral-demo",
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
    
    angleConfig: {
      show: "all",  // Show all angle arcs (clickable)
      markerColor: "#FF6600",
      showText: true
    },
    
    // ===== CLICK-TO-SPAWN CONFIGURATION =====
    protractorConfig: {
      enableClickToSpawn: true,  // ✅ Enable!
      
      // Visual
      type: "semicircular",
      radius: "80gc",
      backgroundColor: "rgba(200, 220, 255, 0.25)",
      color: "#1a5490",
      labelColor: "#0d3a6b",
      
      // Measurement Arm
      showArm: true,
      armColor: "#FF0000",
      armStartDeg: 0,
      armExtendable: true,
      armStyle: "dashed",
      showAngleDisplay: true,
      angleDisplaySize: "14gc",
      angleDisplayColor: null,
      
      // Baseline
      showBaseline: true,
      baselineColor: "#999999",
      baselineStyle: "dashed",
      baselineWidth: 1,
      
      // Snap Points (auto-generated)
      snapMode: "hybrid",
      snapThreshold: 50,
      showSnapIndicators: true,
      highlightNearestSnap: true
    }
  }
}
```

## Summary

✅ **Enable:** Set `enableClickToSpawn: true`  
✅ **Use:** Click any angle arc  
✅ **Features:** Full protractor with snap points  
✅ **Multiple:** Spawn as many as needed  
✅ **Remove:** `window.removeAllProtractors()`  

**Try it now:** Reload the page and click on any orange angle arc! 🎯✨

---

**See Also:**
- PROTRACTOR-COMPLETE-REFERENCE.md
- PROTRACTOR-QUADRILATERAL-INTEGRATION-V2.md
- PROTRACTOR-CALLBACKS.md

