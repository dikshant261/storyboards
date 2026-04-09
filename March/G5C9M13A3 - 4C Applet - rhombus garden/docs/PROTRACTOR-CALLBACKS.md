# Protractor Component - Callback Functions

## Overview

The protractor component provides comprehensive callback functions to track and respond to all interactive changes in real-time.

## Available Callbacks

### 1. `onAngleChange`

Called when the measurement arm angle changes.

**Signature:**
```javascript
onAngleChange: (angle) => void
```

**Parameters:**
- `angle` (number): The current angle in degrees (0-360°)

**Triggered by:**
- Rotating the measurement arm by dragging
- Programmatic angle changes

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    startDeg: 45
  },
  onAngleChange: (angle) => {
    console.log(`Arm angle changed to: ${angle}°`);
    // Update your application state
    // Display angle in UI
    // Save to database
  }
}
```

**Use Cases:**
- Real-time angle display
- Validate angle constraints
- Sync with other components
- Track measurement history
- Educational feedback

---

### 2. `onArmExtend`

Called when the measurement arm length changes (when `extendable: true`).

**Signature:**
```javascript
onArmExtend: (length) => void
```

**Parameters:**
- `length` (number): The current arm length in pixels

**Triggered by:**
- Dragging the arrowhead radially
- Dynamic arm extension

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  measurementArm: {
    show: true,
    extendable: true
  },
  onArmExtend: (length) => {
    console.log(`Arm length changed to: ${length}px`);
    // Calculate extended measurements
    // Update visual indicators
    // Provide feedback
  }
}
```

**Use Cases:**
- Track extended measurements
- Calculate distances
- Validate extension limits
- Provide visual feedback
- Educational demonstrations

---

### 3. `onProtractorRotate`

Called when the entire protractor body rotates.

**Signature:**
```javascript
onProtractorRotate: (rotation) => void
```

**Parameters:**
- `rotation` (number): The current rotation angle in degrees (0-360°)

**Triggered by:**
- Ctrl/Cmd + drag on protractor face (desktop)
- Two-finger rotation gesture (touch)
- Dragging rotation handle

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  isProtractorRotatable: true,
  showProtractorRotationHandle: true,
  onProtractorRotate: (rotation) => {
    console.log(`Protractor rotated to: ${rotation}°`);
    // Update orientation display
    // Sync with other elements
    // Save orientation state
  }
}
```

**Use Cases:**
- Track protractor orientation
- Align with other elements
- Save orientation preferences
- Educational demonstrations
- Multi-protractor synchronization

---

### 4. `onPositionChange`

Called when the protractor is dragged to a new position.

**Signature:**
```javascript
onPositionChange: (position, snapPoint) => void
```

**Parameters:**
- `position` (object): The current position `{x, y}` in pixels
- `snapPoint` (object|null): The snap point if snapped, or `null` if free drop
  - `{x, y, label?}` - Grid coordinates and optional label

**Triggered by:**
- Dragging the protractor
- Dropping the protractor (with or without snap)

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  isDraggable: true,
  snapPoints: [
    { x: 300, y: 500, label: "Point A" },
    { x: 600, y: 800, label: "Point B" }
  ],
  snapMode: "hybrid",
  onPositionChange: (position, snapPoint) => {
    console.log(`Protractor moved to: (${position.x}, ${position.y})`);
    if (snapPoint) {
      console.log(`Snapped to: ${snapPoint.label || 'unnamed point'}`);
    } else {
      console.log('Free placement');
    }
    // Update position tracking
    // Save position state
    // Sync with other elements
  }
}
```

**Use Cases:**
- Track protractor position
- Save position state
- Validate position constraints
- Update related elements
- Multi-protractor coordination

---

### 5. `onSnapToPoint`

Called specifically when the protractor snaps to a snap point.

**Signature:**
```javascript
onSnapToPoint: (snapPoint) => void
```

**Parameters:**
- `snapPoint` (object): The snap point that was snapped to
  - `{x, y, label?}` - Grid coordinates and optional label

**Triggered by:**
- Dropping protractor near a snap point (hybrid mode)
- Any drop in fixed mode

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  snapPoints: [
    { x: 300, y: 500, label: "Vertex A" },
    { x: 600, y: 800, label: "Vertex B" },
    { x: 900, y: 600, label: "Vertex C" }
  ],
  snapMode: "hybrid",
  snapThreshold: 50,
  onSnapToPoint: (snapPoint) => {
    console.log(`Snapped to: ${snapPoint.label}`);
    console.log(`Coordinates: (${snapPoint.x}, ${snapPoint.y})`);
    // Highlight the snapped vertex
    // Update measurement context
    // Provide audio/visual feedback
    // Track snap history
  }
}
```

**Use Cases:**
- Vertex highlighting
- Measurement context updates
- Audio/visual feedback
- Educational guidance
- Snap history tracking

---

### 6. `onClick`

Called when the protractor is clicked.

**Signature:**
```javascript
onClick: (event) => void
```

**Parameters:**
- `event` (object): The click event object

**Triggered by:**
- Clicking on the protractor

**Example:**
```javascript
{
  componentType: "ProtractorComponent",
  onClick: (e) => {
    console.log('Protractor clicked', e);
    // Toggle selection
    // Show properties panel
    // Context menu
  }
}
```

**Use Cases:**
- Selection handling
- Context menus
- Property editing
- Tool activation

---

## Complete Example with All Callbacks

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Visual
  protractorType: "semicircular",
  radius: "100gc",
  backgroundColor: "rgba(200, 220, 255, 0.25)",
  
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
    { x: 300, y: 500, label: "Vertex A" },
    { x: 600, y: 800, label: "Vertex B" },
    { x: 900, y: 600, label: "Vertex C" }
  ],
  snapMode: "hybrid",
  snapThreshold: 50,
  showSnapIndicators: true,
  highlightNearestSnap: true,
  
  // ============ CALLBACKS ============
  
  // Track arm angle changes
  onAngleChange: (angle) => {
    console.log(`📐 Angle: ${angle.toFixed(1)}°`);
    // Update angle display in your UI
    document.getElementById('angle-display').textContent = `${angle.toFixed(1)}°`;
  },
  
  // Track arm extension
  onArmExtend: (length) => {
    console.log(`📏 Arm length: ${length.toFixed(0)}px`);
    // Update length display
    document.getElementById('length-display').textContent = `${length.toFixed(0)}px`;
  },
  
  // Track protractor rotation
  onProtractorRotate: (rotation) => {
    console.log(`🔄 Protractor rotation: ${rotation.toFixed(1)}°`);
    // Update orientation display
    document.getElementById('rotation-display').textContent = `${rotation.toFixed(1)}°`;
  },
  
  // Track position changes
  onPositionChange: (position, snapPoint) => {
    console.log(`📍 Position: (${position.x.toFixed(0)}, ${position.y.toFixed(0)})`);
    if (snapPoint) {
      console.log(`   Snapped to: ${snapPoint.label || 'unnamed'}`);
      // Highlight the snapped point
      highlightVertex(snapPoint.label);
    } else {
      console.log('   Free placement');
      // Clear highlights
      clearHighlights();
    }
    // Save state
    saveProtractorState({
      position: position,
      snapPoint: snapPoint
    });
  },
  
  // Specific snap event
  onSnapToPoint: (snapPoint) => {
    console.log(`✨ Snapped to ${snapPoint.label}!`);
    // Play snap sound
    playSnapSound();
    // Show visual feedback
    showSnapAnimation(snapPoint);
    // Update measurement context
    updateMeasurementContext(snapPoint.label);
  },
  
  // Handle clicks
  onClick: (e) => {
    console.log('🖱️ Protractor clicked');
    // Toggle selection
    toggleProtractorSelection();
    // Show properties panel
    showPropertiesPanel();
  }
}
```

## Practical Use Cases

### 1. Real-Time Display Panel

Create a live display panel showing all protractor measurements:

```javascript
{
  onAngleChange: (angle) => {
    updateDisplay('angle', `${angle.toFixed(1)}°`);
  },
  onArmExtend: (length) => {
    updateDisplay('length', `${length.toFixed(0)}px`);
  },
  onProtractorRotate: (rotation) => {
    updateDisplay('orientation', `${rotation.toFixed(1)}°`);
  },
  onPositionChange: (position) => {
    updateDisplay('position', `(${position.x.toFixed(0)}, ${position.y.toFixed(0)})`);
  }
}
```

### 2. Educational Validation

Validate student measurements against expected values:

```javascript
{
  onAngleChange: (angle) => {
    const expectedAngle = 45;
    const tolerance = 2;
    
    if (Math.abs(angle - expectedAngle) <= tolerance) {
      showFeedback('Correct! ✓', 'success');
      playSuccessSound();
    } else {
      showFeedback(`Close, but not quite. Expected ${expectedAngle}°`, 'hint');
    }
  },
  
  onSnapToPoint: (snapPoint) => {
    if (snapPoint.label === 'Vertex A') {
      showFeedback('Good! Now measure the angle at Vertex A', 'instruction');
    }
  }
}
```

### 3. Multi-Protractor Synchronization

Sync multiple protractors:

```javascript
// Protractor 1
{
  id: 'protractor-1',
  onProtractorRotate: (rotation) => {
    // Sync rotation to protractor 2
    syncProtractorRotation('protractor-2', rotation);
  }
}

// Protractor 2
{
  id: 'protractor-2',
  onAngleChange: (angle) => {
    // Mirror angle to protractor 1
    mirrorAngle('protractor-1', angle);
  }
}
```

### 4. State Management Integration

Integrate with Redux, Vuex, or other state managers:

```javascript
{
  onAngleChange: (angle) => {
    store.dispatch({
      type: 'PROTRACTOR_ANGLE_CHANGED',
      payload: { angle }
    });
  },
  
  onPositionChange: (position, snapPoint) => {
    store.dispatch({
      type: 'PROTRACTOR_MOVED',
      payload: { position, snapPoint }
    });
  },
  
  onSnapToPoint: (snapPoint) => {
    store.dispatch({
      type: 'PROTRACTOR_SNAPPED',
      payload: { snapPoint }
    });
  }
}
```

### 5. Analytics Tracking

Track user interactions for analytics:

```javascript
{
  onAngleChange: (angle) => {
    trackEvent('protractor', 'angle_change', angle);
  },
  
  onArmExtend: (length) => {
    trackEvent('protractor', 'arm_extend', length);
  },
  
  onProtractorRotate: (rotation) => {
    trackEvent('protractor', 'body_rotate', rotation);
  },
  
  onSnapToPoint: (snapPoint) => {
    trackEvent('protractor', 'snap', snapPoint.label);
  },
  
  onClick: () => {
    trackEvent('protractor', 'click');
  }
}
```

### 6. Undo/Redo System

Build an undo/redo system:

```javascript
const history = [];
let historyIndex = -1;

{
  onAngleChange: (angle) => {
    pushHistory({ type: 'angle', value: angle });
  },
  
  onProtractorRotate: (rotation) => {
    pushHistory({ type: 'rotation', value: rotation });
  },
  
  onPositionChange: (position, snapPoint) => {
    pushHistory({ type: 'position', position, snapPoint });
  }
}

function pushHistory(state) {
  history.splice(historyIndex + 1);
  history.push(state);
  historyIndex++;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    restoreState(history[historyIndex]);
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    restoreState(history[historyIndex]);
  }
}
```

### 7. Audio/Visual Feedback

Provide rich feedback for interactions:

```javascript
{
  onAngleChange: (angle) => {
    // Snap sound every 5 degrees
    if (angle % 5 === 0) {
      playTickSound();
    }
    
    // Highlight specific angles
    if ([0, 30, 45, 60, 90].includes(Math.round(angle))) {
      flashAngleHighlight(angle);
    }
  },
  
  onSnapToPoint: (snapPoint) => {
    // Magnetic snap sound
    playMagneticSound();
    
    // Ripple animation
    showRippleEffect(snapPoint);
    
    // Haptic feedback (mobile)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  },
  
  onArmExtend: (length) => {
    // Stretch sound based on length
    const pitch = mapRange(length, minLength, maxLength, 200, 800);
    playTone(pitch, 50);
  }
}
```

## Callback Combination Patterns

### Pattern 1: Complete State Tracking

Track all protractor state in one place:

```javascript
const protractorState = {
  angle: 0,
  armLength: 0,
  rotation: 0,
  position: null,
  snapPoint: null
};

{
  onAngleChange: (angle) => {
    protractorState.angle = angle;
    saveState(protractorState);
  },
  onArmExtend: (length) => {
    protractorState.armLength = length;
    saveState(protractorState);
  },
  onProtractorRotate: (rotation) => {
    protractorState.rotation = rotation;
    saveState(protractorState);
  },
  onPositionChange: (position, snapPoint) => {
    protractorState.position = position;
    protractorState.snapPoint = snapPoint;
    saveState(protractorState);
  }
}
```

### Pattern 2: Conditional Actions

Perform different actions based on state:

```javascript
let isSnapMode = false;

{
  onPositionChange: (position, snapPoint) => {
    if (snapPoint) {
      // Snapped - enable precise angle measurement
      isSnapMode = true;
      enableAnglePrecision(0.1); // 0.1° precision
    } else {
      // Free - allow coarse adjustment
      isSnapMode = false;
      enableAnglePrecision(1); // 1° precision
    }
  },
  
  onAngleChange: (angle) => {
    const precision = isSnapMode ? 0.1 : 1;
    displayAngle(angle, precision);
  }
}
```

### Pattern 3: Event Chaining

Chain events for complex workflows:

```javascript
let workflow = {
  step: 0,
  snapPoints: ['Vertex A', 'Vertex B', 'Vertex C'],
  measurements: []
};

{
  onSnapToPoint: (snapPoint) => {
    if (snapPoint.label === workflow.snapPoints[workflow.step]) {
      showInstruction(`Good! Now measure the angle at ${snapPoint.label}`);
      workflow.step++;
    }
  },
  
  onAngleChange: (angle) => {
    if (workflow.step > 0 && workflow.step <= workflow.snapPoints.length) {
      const currentVertex = workflow.snapPoints[workflow.step - 1];
      workflow.measurements.push({
        vertex: currentVertex,
        angle: angle
      });
      
      if (workflow.step < workflow.snapPoints.length) {
        showInstruction(`Great! Now move to ${workflow.snapPoints[workflow.step]}`);
      } else {
        showResults(workflow.measurements);
      }
    }
  }
}
```

## Best Practices

### 1. Debouncing

For expensive operations, debounce callbacks:

```javascript
{
  onAngleChange: debounce((angle) => {
    // Expensive operation
    updateServerState({ angle });
  }, 300)
}
```

### 2. Error Handling

Always handle errors in callbacks:

```javascript
{
  onAngleChange: (angle) => {
    try {
      updateAngleDisplay(angle);
    } catch (error) {
      console.error('Failed to update angle display:', error);
    }
  }
}
```

### 3. Cleanup

Clean up resources when needed:

```javascript
let animationFrame;

{
  onAngleChange: (angle) => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    animationFrame = requestAnimationFrame(() => {
      updateVisualization(angle);
    });
  }
}
```

### 4. Performance

Avoid heavy computations in callbacks:

```javascript
// ❌ Bad - heavy computation on every change
{
  onAngleChange: (angle) => {
    recalculateEntireScene(); // Expensive!
  }
}

// ✅ Good - lightweight update, batch heavy work
{
  onAngleChange: (angle) => {
    updateAngleDisplay(angle); // Fast
    scheduleSceneUpdate(); // Batched
  }
}
```

## Summary

### Callback Overview

| Callback | Trigger | Use Case |
|----------|---------|----------|
| `onAngleChange` | Arm angle changes | Real-time angle tracking |
| `onArmExtend` | Arm length changes | Distance measurements |
| `onProtractorRotate` | Body rotates | Orientation tracking |
| `onPositionChange` | Position changes | Movement tracking |
| `onSnapToPoint` | Snaps to point | Vertex-specific actions |
| `onClick` | Protractor clicked | Selection/interaction |

### When to Use Each

- **onAngleChange**: Always use for angle-dependent features
- **onArmExtend**: Use when `extendable: true` and tracking length
- **onProtractorRotate**: Use when `isProtractorRotatable: true`
- **onPositionChange**: Use when `isDraggable: true`
- **onSnapToPoint**: Use with snap points for specific feedback
- **onClick**: Use for selection/editing workflows

---

## See Also

- **PROTRACTOR-COMPLETE-REFERENCE.md** - Complete props reference
- **PROTRACTOR-COMPONENT.md** - Component overview
- **PROTRACTOR-SNAP-POINTS.md** - Snap points details

---

**Version:** 2.0  
**Last Updated:** November 2024  
**Component:** ProtractorComponent  
**File:** `js/components/protractor-component.js`

