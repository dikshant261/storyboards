# Ruler Component - Browser Test Guide

## Pre-Test Checklist

Before opening the browser, verify:
- ✅ `js/components/ruler-component.js` exists
- ✅ Script tag added to `index.html`
- ✅ Ruler registered in `js/components/elements-registry.js`
- ✅ Example ruler added to Page 1 in `js/PageConfig.js`
- ✅ No linting errors

## Browser Testing Steps

### Step 1: Visual Appearance

**Open the application in browser and navigate to Page 1.**

Check:
- [ ] Ruler appears on screen
- [ ] Ruler has glass-like transparent appearance
- [ ] Tick marks are visible (major and minor)
- [ ] Numbers/labels are visible (0, 1, 2, ... 30 for 30cm ruler)
- [ ] Ruler has clear glass effect (more transparent than protractor)

**Expected Result:**
A 30cm metric ruler appears centered on the page with:
- Clear glass effect with gradient shine
- Black tick marks at 1mm intervals
- Major ticks at 10mm (1cm) intervals
- Numbers labeled every 10mm (showing 0, 1, 2, ... 30 for cm)

---

### Step 2: Dragging

**Click and drag the ruler.**

Check:
- [ ] Ruler moves with mouse/touch
- [ ] Ruler follows cursor smoothly
- [ ] Ruler can be moved anywhere on screen
- [ ] Release mouse button stops movement

**Expected Result:**
Ruler moves freely across the screen following the cursor.

---

### Step 3: Rotation

**Hold Ctrl (Windows/Linux) or Cmd (Mac) and drag the ruler.**

Check:
- [ ] Ruler rotates around its center
- [ ] Rotation follows mouse angle
- [ ] Rotation is smooth
- [ ] Release key + button stops rotation

**Expected Result:**
Ruler rotates to any angle while dragging with Ctrl/Cmd held.

**Console Check:**
Look for rotation angle logs: `"Ruler rotated to: [angle]"`

---

### Step 4: Adding Markers

**Click anywhere on the ruler body (not on existing markers).**

Check:
- [ ] Red triangle marker appears where you clicked
- [ ] Marker position snaps to nearest tick mark
- [ ] Vertical line extends from marker across ruler width
- [ ] Can add a second marker by clicking elsewhere
- [ ] Cannot add more than 2 markers

**Expected Result:**
Up to 2 red triangle markers can be placed on the ruler by clicking.

---

### Step 5: Dragging Markers

**Click and drag a marker along the ruler.**

Check:
- [ ] Marker moves along the ruler length only
- [ ] Marker constrained to ruler (can't move off)
- [ ] Marker snaps to tick marks during drag
- [ ] Marker position updates smoothly

**Expected Result:**
Markers can be repositioned by dragging them along the ruler.

---

### Step 6: Measuring Distance

**Add two markers on the ruler.**

Check:
- [ ] Dashed line connects the two markers
- [ ] Distance value displayed above ruler
- [ ] Distance updates when markers are moved
- [ ] Distance shown in correct units (cm or mm)

**Example:**
- Place marker 1 at 5cm mark
- Place marker 2 at 15cm mark
- Should display: "100mm" or "10.0cm"

**Console Check:**
Look for measurement logs: `"Ruler measurement: [distance][unit]"`

---

### Step 7: Removing Markers

**Click directly on a marker.**

Check:
- [ ] Marker disappears
- [ ] Distance display disappears (if < 2 markers)
- [ ] Can add new markers after removal

**Expected Result:**
Clicking a marker removes it from the ruler.

---

### Step 8: Multiple Interactions

**Test combined interactions:**

1. **Drag ruler while it has markers**
   - [ ] Markers stay attached to ruler
   - [ ] Distance measurement stays accurate
   
2. **Rotate ruler while it has markers**
   - [ ] Markers rotate with ruler
   - [ ] Markers stay in correct positions
   
3. **Add marker while ruler is rotated**
   - [ ] Marker still snaps to ticks correctly
   - [ ] Marker follows rotation

**Expected Result:**
All features work together seamlessly.

---

### Step 9: Console Testing

**Open browser console (F12) and check for:**

1. **Component Load:**
   ```
   ✅ Ruler component loaded successfully
   ```

2. **Component Registration:**
   ```
   🔍 Available components: { ..., RulerComponent: true }
   ```

3. **Measurement Callback:**
   ```
   Ruler measurement: 100mm
   ```

4. **No Errors:**
   - [ ] No JavaScript errors
   - [ ] No React warnings
   - [ ] No missing dependencies

---

### Step 10: Different Configurations (Manual Test)

**Modify PageConfig.js to test different configurations:**

#### Test A: Imperial Ruler
```javascript
rulerType: "imperial",
length: "12in",
majorTickInterval: 1,
minorTickInterval: 0.125
```

Expected: 12-inch ruler with 1/8" tick marks

#### Test B: Shorter Ruler
```javascript
rulerType: "metric",
length: "15cm"
```

Expected: 15cm ruler (half the default length)

#### Test C: Different Colors
```javascript
color: "#0066CC",
backgroundColor: "rgba(173, 216, 230, 0.7)",
measurementMarkers: {
  color: "#FF6600"
}
```

Expected: Blue ruler with orange markers

#### Test D: Static Mode
```javascript
mode: "static",
isDraggable: false,
isRotatable: false,
measurementMarkers: { enabled: false }
```

Expected: Non-interactive display-only ruler

---

## Troubleshooting

### Ruler doesn't appear
1. Check browser console for errors
2. Verify script loaded: `window.RulerComponent` should exist
3. Check coordinates are within visible area
4. Verify z-index isn't too low

### Can't rotate
1. Ensure holding Ctrl (Windows/Linux) or Cmd (Mac)
2. Check `isRotatable: true` in props
3. Verify `mode` is 'rotatable' or 'interactive'

### Markers not working
1. Check `measurementMarkers.enabled: true`
2. Verify `mode` is not 'static'
3. Check if clicks are blocked by other elements

### Distance not showing
1. Verify `measurementMarkers.showDistance: true`
2. Ensure 2 markers are placed
3. Check marker positions are different

### Glass effect not visible
1. Check browser supports SVG filters
2. Verify `backgroundColor` has opacity < 1
3. Try different background behind ruler

---

## Performance Checks

**Monitor performance while testing:**

- [ ] Smooth dragging (60fps)
- [ ] Smooth rotation (60fps)
- [ ] No lag when adding markers
- [ ] No lag when updating distance
- [ ] Multiple rulers don't slow down page

**Check browser performance tools:**
- CPU usage should be low
- No memory leaks
- No excessive re-renders

---

## Cross-Browser Testing

Test in multiple browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile Chrome (touch events)
- [ ] Mobile Safari (touch events)

---

## Accessibility Testing

- [ ] Ruler visible with high contrast mode
- [ ] Can interact with keyboard (tab, arrows)
- [ ] Screen reader announces ruler presence
- [ ] Zoom works correctly (Ctrl/Cmd +/-)

---

## Comparison with Protractor

**Test similarities with protractor component:**

- [ ] Glass effect style is similar but clearer
- [ ] Drag behavior is identical
- [ ] Rotation behavior is identical (Ctrl/Cmd + drag)
- [ ] Both use same grid positioning system
- [ ] Both integrate with DraggableComponent

---

## Expected Console Output

When everything works correctly, you should see:

```
✅ Ruler component loaded successfully
🔄 Aggregating components into StandardElements...
🔍 Available components: { ..., RulerComponent: true }
✅ StandardElements created with keys: [..., ruler]
[Ruler measurement when markers are used]: Ruler measurement: [X]mm [markers array]
```

---

## Test Results Template

**Copy and fill in:**

```
Date: ___________
Browser: ___________
OS: ___________

Visual Appearance:       [ ] Pass [ ] Fail
Dragging:               [ ] Pass [ ] Fail
Rotation:               [ ] Pass [ ] Fail
Adding Markers:         [ ] Pass [ ] Fail
Dragging Markers:       [ ] Pass [ ] Fail
Measuring Distance:     [ ] Pass [ ] Fail
Removing Markers:       [ ] Pass [ ] Fail
Multiple Interactions:  [ ] Pass [ ] Fail
Console Clean:          [ ] Pass [ ] Fail
Performance:            [ ] Pass [ ] Fail

Issues Found:
- ___________________________
- ___________________________
- ___________________________

Notes:
_________________________________
_________________________________
_________________________________
```

---

## Success Criteria

All tests pass when:
- ✅ Ruler renders with glass effect
- ✅ Dragging works smoothly
- ✅ Rotation works (Ctrl/Cmd + drag)
- ✅ Markers can be added (up to 2)
- ✅ Markers can be dragged along ruler
- ✅ Distance calculates and displays correctly
- ✅ Markers can be removed
- ✅ All interactions work together
- ✅ No console errors
- ✅ Good performance

---

## Next Steps After Testing

1. **If all tests pass:**
   - Document any minor issues
   - Add more example configurations
   - Create tutorial/demo page
   - Add to main documentation

2. **If tests fail:**
   - Document specific failures
   - Check implementation against protractor
   - Review console errors
   - Debug and fix issues
   - Re-test

3. **Additional enhancements:**
   - Add line drawing integration
   - Add multiple marker sets
   - Add measurement export
   - Add ruler presets

---

## Contact/Support

For issues or questions:
- Check RULER-COMPONENT.md for detailed documentation
- Check QUICK-START-RULER.md for quick reference
- Compare with protractor-component.js for similar patterns
- Review console logs for debugging info

