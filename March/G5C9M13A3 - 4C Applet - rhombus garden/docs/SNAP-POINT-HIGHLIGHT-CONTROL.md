# Snap Point Highlighting Control

## New Prop: `highlightNearestSnap`

Added a new prop to control whether the nearest snap point gets highlighted (turns green) when the protractor is dragged nearby.

## Props Summary

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSnapIndicators` | Boolean | `true` | Show/hide ALL snap point visual indicators |
| `highlightNearestSnap` | Boolean | `true` | Highlight (turn green) the nearest snap point when nearby |

## Usage Examples

### Show All Snap Points, Highlight Nearest (Default)

```javascript
{
  showSnapIndicators: true,   // Show orange circles
  highlightNearestSnap: true,  // Turn green when near
  snapPoints: [
    { x: 800, y: 300, label: "A" },
    { x: 1200, y: 300, label: "B" }
  ]
}
```

**Behavior:**
- All snap points show as **orange circles**
- When you drag near a point, it turns **green**
- Provides clear visual feedback

---

### Show All Snap Points, No Highlighting

```javascript
{
  showSnapIndicators: true,    // Show orange circles
  highlightNearestSnap: false,  // Don't turn green
  snapPoints: [
    { x: 800, y: 300, label: "A" },
    { x: 1200, y: 300, label: "B" }
  ]
}
```

**Behavior:**
- All snap points show as **orange circles**
- Points stay **orange** even when you're near them
- Snapping still works, just no color change
- Cleaner look without the green highlighting

---

### Show ONLY Nearest Snap Point (Dynamic)

```javascript
{
  showSnapIndicators: false,   // Hide all by default
  highlightNearestSnap: true,  // Show only nearest (green)
  snapPoints: [
    { x: 800, y: 300, label: "A" },
    { x: 1200, y: 300, label: "B" }
  ]
}
```

**Behavior:**
- No snap points visible initially
- When you drag near a point, **only that point appears (green)**
- Dynamic "on-demand" visual feedback
- Clean UI with contextual hints

---

### Hide All Snap Points (No Visual Feedback)

```javascript
{
  showSnapIndicators: false,   // Hide all circles
  highlightNearestSnap: false, // Don't show nearest either
  snapPoints: [
    { x: 800, y: 300, label: "A" },
    { x: 1200, y: 300, label: "B" }
  ]
}
```

**Behavior:**
- No visual indicators shown at all
- Snapping still works (magnetic effect)
- Cleanest UI - no visual clutter

---

## Visual Comparison

### All Combinations

**`showSnapIndicators: true, highlightNearestSnap: true` (Default)**
```
When far from snap points:
🟠 Point A    🟠 Point B    🟠 Point C

When dragging near Point B:
🟠 Point A    🟢 Point B    🟠 Point C  ← Turns GREEN!
              ↑ Mouse here
```

**`showSnapIndicators: true, highlightNearestSnap: false`**
```
When far from snap points:
🟠 Point A    🟠 Point B    🟠 Point C

When dragging near Point B:
🟠 Point A    🟠 Point B    🟠 Point C  ← Stays ORANGE
              ↑ Mouse here
```

**`showSnapIndicators: false, highlightNearestSnap: true`**
```
When far from snap points:
(nothing visible)

When dragging near Point B:
              🟢 Point B              ← Only nearest appears!
              ↑ Mouse here
```

**`showSnapIndicators: false, highlightNearestSnap: false`**
```
When far from snap points:
(nothing visible)

When dragging near Point B:
(nothing visible)              ← Completely hidden
              ↑ Mouse here
```

---

## When to Use Each Setting

### `showSnapIndicators: true, highlightNearestSnap: true` (Default)
**Show all, highlight nearest**
- **Educational contexts** - Students need clear feedback
- **Interactive tutorials** - Help users understand snap zones
- **First-time users** - Makes snapping behavior obvious
- **Debugging** - Easy to see all snap points and which is active

### `showSnapIndicators: true, highlightNearestSnap: false`
**Show all, no highlighting**
- **Professional/minimal UI** - Less visual distraction
- **Static reference** - Show all valid snap locations
- **Users familiar with snapping** - Don't need extra feedback
- **Aesthetic preference** - Consistent orange color

### `showSnapIndicators: false, highlightNearestSnap: true` ⭐ **RECOMMENDED**
**Show only nearest (dynamic)**
- **Best of both worlds** - Clean UI + contextual feedback
- **Reduced clutter** - Only show relevant snap point
- **Intuitive UX** - Appears right when you need it
- **Gaming/interactive apps** - Modern, dynamic feel

### `showSnapIndicators: false, highlightNearestSnap: false`
**Hidden (invisible)**
- **Advanced users** - Know where snap points are
- **Clean screenshots** - No UI elements visible
- **Assessment mode** - Hide hints from students
- **Subtle UX** - Magnetic snapping without visual indicators

---

## Implementation Details

When `highlightNearestSnap` is `false`:
- The `nearestSnapPoint` state is still calculated
- Snapping behavior is unchanged
- Only the visual highlight (green color) is disabled
- All snap points remain orange

### Code Logic

```javascript
// Only highlight if highlightNearestSnap is true
const isNearest = highlightNearestSnap && 
                  nearestSnapPoint && 
                  nearestSnapPoint.x === point.x && 
                  nearestSnapPoint.y === point.y;

// Color based on whether it's nearest
const color = isNearest ? '#00FF00' : '#FF6600';
```

---

## Examples

### Example 1: Learning Mode (Full Feedback)

```javascript
{
  componentType: "ProtractorComponent",
  snapMode: "hybrid",
  snapThreshold: 60,
  showSnapIndicators: true,   // Show circles
  highlightNearestSnap: true,  // Highlight when near
  snapPoints: [
    { x: 650, y: 250, label: "∠A" },
    { x: 850, y: 250, label: "∠B" },
    { x: 850, y: 450, label: "∠C" },
    { x: 650, y: 450, label: "∠D" }
  ]
}
```

### Example 2: Minimal UI (No Highlighting)

```javascript
{
  componentType: "ProtractorComponent",
  snapMode: "hybrid",
  snapThreshold: 60,
  showSnapIndicators: true,    // Show circles
  highlightNearestSnap: false,  // No green highlighting
  snapPoints: [
    { x: 650, y: 250 },
    { x: 850, y: 250 },
    { x: 850, y: 450 },
    { x: 650, y: 450 }
  ]
}
```

### Example 3: Hidden Snap Points

```javascript
{
  componentType: "ProtractorComponent",
  snapMode: "hybrid",
  snapThreshold: 60,
  showSnapIndicators: false,  // Hide all indicators
  snapPoints: [
    { x: 650, y: 250 },
    { x: 850, y: 250 },
    { x: 850, y: 450 },
    { x: 650, y: 450 }
  ]
}
```

---

## Quick Test

**In `PageConfig.js`, try these combinations:**

```javascript
// Test 1: Full feedback (default)
showSnapIndicators: true,
highlightNearestSnap: true,

// Test 2: No highlighting
showSnapIndicators: true,
highlightNearestSnap: false,

// Test 3: Hidden
showSnapIndicators: false,
highlightNearestSnap: false,  // Doesn't matter
```

Reload the page after each change to see the difference!

---

## Summary

The `highlightNearestSnap` prop gives you fine-grained control over snap point visual feedback:

- ✅ **Separate controls** for showing indicators vs highlighting
- ✅ **Flexible UX** - Choose the right feedback level
- ✅ **Snapping always works** - Visual feedback is independent
- ✅ **Performance optimized** - Memoized rendering

Use `highlightNearestSnap: true` for learning contexts, `false` for cleaner UI!

