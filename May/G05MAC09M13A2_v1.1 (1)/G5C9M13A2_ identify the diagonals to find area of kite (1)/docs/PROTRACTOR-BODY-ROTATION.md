# Protractor Body Rotation Feature

## Overview

The entire protractor body can now be rotated interactively using:
- **Desktop:** Ctrl+Drag (Windows/Linux) or Cmd+Drag (Mac)
- **Touch/TV:** Two-finger rotation gesture OR drag the rotation handle

## How to Enable

Set the `isProtractorRotatable` prop to `true`, and optionally show the rotation handle:

```javascript
{
  componentType: "ProtractorComponent",
  isProtractorRotatable: true,           // Enable protractor rotation
  showProtractorRotationHandle: true,    // Show visible rotation handle (recommended for touch/TV)
  // ... other props
}
```

## How to Use

### Desktop: Rotate with Keyboard Modifier

1. **Hold Ctrl** (Windows/Linux) or **Cmd** (Mac)
2. **Click on the protractor face**
3. **Drag** to rotate the entire protractor around its center
4. **Release** to set the rotation

### Touch/TV: Two Methods

#### Method 1: Two-Finger Rotation
1. **Place two fingers** on the protractor face
2. **Rotate** by moving your fingers in a circular motion
3. **Lift fingers** to set the rotation

#### Method 2: Rotation Handle
1. **Tap and drag the blue rotation handle** (appears above protractor)
2. **Drag** to rotate the protractor
3. **Release** to set the rotation

### Three Rotation Actions

| Element | Desktop | Touch/TV | What Rotates |
|---------|---------|----------|--------------|
| **Protractor Face** | Ctrl/Cmd + Drag | Two fingers OR rotation handle | Entire protractor body |
| **Measurement Arm Line** | Drag | Drag | Measurement arm only |
| **Arrowhead** | Drag | Drag | Measurement arm (angle & length) |

## Rotation Handle

### Visual Design
- **Blue circular button** with rotation icon
- Appears **above the protractor center**
- **Always on top** (z-index 20)
- **Touch-friendly** size (40×40px)

### When to Show It
- **Always show for touch interfaces** (`showProtractorRotationHandle: true`)
- **Optional for desktop** (Ctrl+drag works without it)
- **Essential for TV interfaces** (no keyboard available)

### Handle Icon
The handle displays a circular arrow icon (⟲) to indicate rotation functionality.

## Visual Feedback

- **Smooth rotation** as you drag
- **Transition animation** when you release
- **Measurement arm rotates with protractor** (maintains relative angle)
- **Handle cursor changes** to `grab` on hover

## Use Cases

### 1. Align Protractor with Lines

```javascript
isProtractorRotatable: true,
showProtractorRotationHandle: true  // For touch users
```

**Use:** Rotate the protractor body to align its 0° mark with a line or edge

### 2. Match Angle Orientation

**Use:** Rotate the protractor to match the orientation of an angle you're measuring

### 3. Educational Demonstrations

**Use:** Show students that angle measurements are relative to the protractor's orientation

### 4. Custom Reference Baseline

**Use:** Align the protractor's baseline with a specific direction in your diagram

### 5. Touch/TV Applications

**Use:** Enable rotation handle for interfaces without keyboard access

## Configuration Example

```javascript
{
  componentType: "ProtractorComponent",
  centerPoint: { row: 400, col: 1200 },
  
  // Enable all interactive features
  mode: "interactive",
  isDraggable: true,                   // Drag to move
  isRotatable: true,                   // Rotate measurement arm
  isProtractorRotatable: true,         // Rotate entire protractor
  showProtractorRotationHandle: true,  // Show rotation handle (for touch/TV)
  
  measurementArm: {
    show: true,
    startDeg: 0,
    extendable: true
  },
  
  baseline: {
    show: true  // Baseline rotates with protractor
  }
}
```

## Interface-Specific Recommendations

| Interface | `isProtractorRotatable` | `showProtractorRotationHandle` | Reason |
|-----------|------------------------|--------------------------------|--------|
| **Desktop** | `true` | `false` | Ctrl+drag is efficient |
| **Tablet** | `true` | `true` | Two-finger gesture + handle for convenience |
| **Phone** | `true` | `true` | Handle is easier on small screens |
| **TV** | `true` | `true` | No keyboard, handle is essential |

## Keyboard/Touch Shortcuts

| Action | Desktop | Touch Device |
|--------|---------|--------------|
| **Rotate Protractor** | Ctrl/Cmd + Drag face | Two fingers OR drag handle |
| **Drag Protractor** | Drag face | Drag face (one finger) |
| **Rotate Arm** | Drag arm line | Drag arm line |
| **Extend Arm** | Drag arrowhead | Drag arrowhead |

## Technical Details

### Implementation

- Rotation is applied via CSS `transform: rotate()` on the protractor face wrapper
- Rotation state is tracked separately from arm angle
- Uses the same angle calculation utility as the measurement arm
- Smooth transitions when not actively rotating
- Touch events support multi-touch detection

### Two-Finger Touch Detection

```javascript
// Detects two-finger touch
if (e.touches && e.touches.length === 2) {
  // Calculate midpoint between two fingers
  const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
  const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
  // Rotate around center based on midpoint
}
```

### Z-Index Layering

All elements rotate together as a unit:
```
Layer 20: Rotation Handle     } Separate (drag to rotate)
Layer 10: Measurement Arm     } All rotate together
Layer 5:  Protractor Face     } when protractor rotates
Layer 1:  Rotation Ring       }
```

### Modifier Key Detection

```javascript
// Desktop: Check if Ctrl (Windows/Linux) or Cmd (Mac) is pressed
if (!e.touches && (e.ctrlKey || e.metaKey)) {
  // Rotate protractor
}

// Touch: Check for two fingers
if (e.touches && e.touches.length === 2) {
  // Rotate protractor
}
```

## Complete Interaction Matrix

| Action | Desktop | Touch | TV | Result |
|--------|---------|-------|-----|--------|
| **Move Protractor** | Drag face | Drag face (1 finger) | Drag face | Drags entire protractor |
| **Rotate Protractor** | Ctrl/Cmd + Drag face | 2 fingers OR handle | Handle | Rotates entire protractor |
| **Rotate Arm** | Drag arm line | Drag arm line | Drag arm line | Rotates arm only |
| **Rotate & Extend Arm** | Drag arrowhead | Drag arrowhead | Drag arrowhead | Rotates and extends arm |

## Benefits

✅ **Multi-Platform Support**
- Desktop: Keyboard modifier (Ctrl/Cmd+drag)
- Touch: Two-finger gesture + rotation handle
- TV: Rotation handle (no keyboard needed)

✅ **Four Independent Actions**
- Move protractor
- Rotate protractor body
- Rotate measurement arm
- Extend measurement arm

✅ **Intuitive Controls**
- Ctrl/Cmd modifier clearly distinguishes rotation from dragging
- Two-finger gesture feels natural on touch devices
- Rotation handle provides clear visual affordance

✅ **Flexible Measurement**
- Align protractor to any orientation
- Measure angles from any reference direction

✅ **Educational Value**
- Teaches that angles are relative
- Shows how protractor orientation affects measurements

✅ **Accessibility**
- Works on devices without keyboards
- Touch-friendly interface
- Clear visual indicators

## Current Configuration

In `PageConfig.js`, the protractor now has:

```javascript
isDraggable: true,                    // Drag to move ✅
isRotatable: true,                    // Rotate arm ✅
isProtractorRotatable: true,          // Rotate body ✅
showProtractorRotationHandle: true,   // Show handle ✅
```

## Test It

**Reload the page** and try:

### Desktop
1. **Drag protractor** (no modifier key) → Moves protractor ✅
2. **Hold Ctrl and drag protractor face** → Rotates entire protractor! 🔄
3. **Drag arm line** → Rotates arm only
4. **Drag arrowhead** → Rotates and extends arm

### Touch Device
1. **One-finger drag on protractor** → Moves protractor ✅
2. **Two-finger gesture on protractor** → Rotates protractor! 🔄
3. **Drag the blue rotation handle** → Rotates protractor! 🔄
4. **Drag arm line** → Rotates arm only
5. **Drag arrowhead** → Rotates and extends arm

All actions working independently across all platforms! 🎯✨

## Tips

- **Ctrl+Drag** (desktop) makes the protractor rotate smoothly around its center
- **Two-finger rotation** (touch) feels natural and intuitive
- **Rotation handle** is always accessible for any interface
- The baseline, degree marks, and measurement arm all rotate together
- You can rotate to any angle (0-360°)
- Release to lock the rotation in place

