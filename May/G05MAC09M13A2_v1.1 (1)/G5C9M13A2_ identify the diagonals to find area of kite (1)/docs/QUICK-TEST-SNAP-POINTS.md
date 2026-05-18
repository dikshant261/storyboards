# Quick Test Guide: Protractor Snap Points

## Test the Snap Points Feature in 3 Minutes! 🎯

### What You'll See

When you load **Page 1**, you'll see:
1. A **semicircular protractor** on the right side
2. **5 colored snap point indicators** (orange circles) positioned around the page
3. A **quadrilateral** on the left

### Test Steps

#### 1. **Test Hybrid Mode Snapping** (Current Configuration)

**Mode:** `hybrid` - Protractor can be dropped anywhere, but snaps when near points

**Steps:**
1. Click and **drag the protractor** (click on the protractor face, not the rotation ring)
2. Drag it **near any orange snap point**
3. **Watch the snap point turn GREEN** as you get close
4. **Release** near the snap point → Protractor snaps to it! 📍
5. Drag **away from all snap points** and release
6. Protractor stays where you dropped it (free placement allowed)

**What to Observe:**
- ✅ Snap points glow green when protractor is nearby
- ✅ Console shows: `📍 Snapped to: [Label]`
- ✅ Protractor smoothly aligns to the snap point
- ✅ You can still drop it anywhere else

---

#### 2. **Test Fixed Mode** (Modify PageConfig)

**Mode:** `fixed` - Protractor MUST snap to one of the snap points only

**Change in `PageConfig.js` (line ~377):**
```javascript
snapMode: "fixed", // Change from "hybrid"
```

**Test:**
1. Reload the page
2. Drag protractor **far away** from all snap points
3. Release it
4. **Protractor automatically snaps** to the nearest snap point! 🎯
5. You **cannot** drop it in arbitrary positions

**What to Observe:**
- ✅ No matter where you drop, it snaps to a point
- ✅ Console shows: `⚠️ Fixed mode: Snapping to nearest point`
- ✅ Protractor only exists at snap point locations

---

#### 3. **Test Free Mode** (No Snapping)

**Mode:** `free` - No snapping, complete freedom

**Change in `PageConfig.js` (line ~377):**
```javascript
snapMode: "free", // Change from "hybrid"
```

**Test:**
1. Reload the page
2. Drag protractor anywhere
3. **Snap indicators still visible** but inactive (orange)
4. Release anywhere → Protractor stays exactly there
5. No snapping occurs at all

**What to Observe:**
- ✅ Snap points don't turn green
- ✅ No console logs about snapping
- ✅ Protractor never auto-aligns

---

#### 4. **Test Snap Threshold**

**Adjust snap detection distance**

**Change in `PageConfig.js` (line ~378):**
```javascript
snapMode: "hybrid",
snapThreshold: 100, // Increased from 50 (snaps from farther away)
```

**Test:**
1. Reload the page
2. Drag protractor near a snap point
3. Notice it **turns green from farther away** now
4. Easier to trigger snaps

**Try a small threshold:**
```javascript
snapThreshold: 20, // Very small (harder to snap)
```

**What to Observe:**
- ✅ Larger threshold = easier snapping
- ✅ Smaller threshold = more precise snapping required

---

#### 5. **Hide Snap Indicators**

**Visual cleanup option**

**Change in `PageConfig.js` (line ~379):**
```javascript
showSnapIndicators: false, // Hide the orange/green circles
```

**Test:**
1. Reload the page
2. Snap indicators are **hidden**
3. Snapping still works! (hybrid/fixed modes)
4. Just no visual feedback

**What to Observe:**
- ✅ Clean interface without indicators
- ✅ Snapping behavior unchanged
- ✅ Console logs still show snaps

---

### Current Snap Points Configuration

The 5 snap points on Page 1 are:

```javascript
snapPoints: [
  { x: 800,  y: 300, label: "Top Left" },
  { x: 1200, y: 300, label: "Top Right" },
  { x: 800,  y: 500, label: "Bottom Left" },
  { x: 1200, y: 500, label: "Bottom Right" },
  { x: 1000, y: 400, label: "Center" }
]
```

These form a **grid pattern** around the middle of the screen.

---

### Quick Customization

#### Add More Snap Points

In `PageConfig.js`, find the `snapPoints` array and add:

```javascript
snapPoints: [
  { x: 800,  y: 300, label: "Top Left" },
  { x: 1200, y: 300, label: "Top Right" },
  { x: 800,  y: 500, label: "Bottom Left" },
  { x: 1200, y: 500, label: "Bottom Right" },
  { x: 1000, y: 400, label: "Center" },
  { x: 600,  y: 200, label: "New Point 1" },  // NEW
  { x: 1400, y: 600, label: "New Point 2" }   // NEW
]
```

#### Change Snap Point Labels

```javascript
{ x: 800, y: 300, label: "🎯 Point A" }
{ x: 1200, y: 300, label: "🎯 Point B" }
```

#### Remove Labels

```javascript
{ x: 800, y: 300 }  // No label property
```

---

### Console Commands for Testing

Open browser console and try:

```javascript
// Manually spawn a protractor with snap points
window.spawnProtractorAtVertex(
  { row: 450, col: 800 }, 
  { 
    radius: "100gc",
    snapMode: "hybrid",
    snapThreshold: 60,
    snapPoints: [
      { x: 700, y: 300, label: "Test 1" },
      { x: 900, y: 300, label: "Test 2" }
    ]
  }
);
```

---

### Expected Visual Behavior

| Snap Mode | Snap Point Color | Behavior on Drop |
|-----------|-----------------|------------------|
| **Free** | Orange (inactive) | Stays where dropped, no snapping |
| **Hybrid** | Orange → Green when near | Snaps if near, otherwise stays where dropped |
| **Fixed** | Orange → Green when near | Always snaps to nearest point |

---

### Troubleshooting

**Snap points not visible?**
- Check `showSnapIndicators: true` in PageConfig
- Check browser console for errors

**Snapping not working?**
- Ensure `snapMode` is `"hybrid"` or `"fixed"` (not `"free"`)
- Check that `snapPoints` array is not empty
- Verify `snapThreshold` is reasonable (40-80 pixels)

**Protractor not draggable?**
- Check `isDraggable: true` in props
- Check `mode: "interactive"` in props
- Click on the **protractor face**, not the rotation ring

**Can't find snap points?**
- They're positioned based on grid coordinates
- Current points are in middle-right area of screen
- Try dragging protractor around to find them

---

### Next Steps

1. ✅ Test all three snap modes
2. ✅ Adjust snap threshold to your preference
3. ✅ Try hiding/showing snap indicators
4. ✅ Add custom snap points at interesting locations
5. ✅ Combine with quadrilateral vertices for angle exercises

**Recommended Configuration:**
```javascript
snapMode: "hybrid",        // Best balance of flexibility and guidance
snapThreshold: 50,         // Good default distance
showSnapIndicators: true   // Helpful visual feedback
```

---

## Advanced: Quadrilateral Vertex Snapping

Want to snap protractor to the **quadrilateral vertices** automatically?

In `PageConfig.js`, update the protractor's snapPoints:

```javascript
snapPoints: [
  // Quad vertices (update these to match your quad's position)
  { x: 650, y: 250, label: "∠A" },
  { x: 850, y: 250, label: "∠B" },
  { x: 850, y: 450, label: "∠C" },
  { x: 650, y: 450, label: "∠D" }
]
```

Now you can **snap the protractor to each vertex** to measure angles! 📐✨

