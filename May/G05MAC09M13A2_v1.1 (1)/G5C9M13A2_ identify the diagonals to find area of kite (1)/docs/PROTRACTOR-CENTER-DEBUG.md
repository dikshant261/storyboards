# Protractor Center-on-Mouse - Debugging Guide

## Current Implementation

The protractor should center itself on the mouse pointer during dragging using the `centerOnMouse` prop.

## How to Test

1. **Reload the page** (Ctrl+R or F5) to load the updated JavaScript
2. **Open browser console** (F12 → Console tab)
3. **Click on the protractor** (on the face, not the rotation ring)
4. **Look for this console message:**
   ```
   🎯 Center-on-mouse enabled. Offset: {x: ..., y: ...}
   ```
5. **Drag the protractor around**
6. **Expected behavior:** Mouse pointer stays at the center of the protractor

## Debug Information

### What the Console Should Show

When you click the protractor:
```
🎯 Center-on-mouse enabled. Offset: {x: 187.5, y: 187.5}
```
(Numbers will vary based on protractor size)

### What Should Happen

- **Click anywhere on protractor** → It immediately jumps so mouse is at center
- **Drag** → Mouse stays at center throughout the drag
- **Release** → Protractor stays where you dropped it (or snaps if near a snap point)

## If It's Still Not Working

### Check 1: Is the updated code loaded?
**In console, type:**
```javascript
// Check if centerOnMouse prop exists
window.DraggableComponent.Draggable.toString().includes('centerOnMouse')
```
**Expected:** `true`

### Check 2: Is the protractor using centerOnMouse?
**In console, inspect the protractor element:**
```javascript
document.querySelector('.protractor-component').parentElement
```
**Look for:** `data-draggable-id` attribute

### Check 3: Manual test
**In console:**
```javascript
// Get protractor element
const protractor = document.querySelector('.protractor-component');
const rect = protractor.getBoundingClientRect();
console.log('Protractor rect:', rect);
console.log('Center would be:', rect.width/2, rect.height/2);
```

### Check 4: Verify transform is preserved
**After starting a drag, in console:**
```javascript
const protractor = document.querySelector('.protractor-component').parentElement;
console.log('Transform during drag:', window.getComputedStyle(protractor).transform);
```
**Expected:** Should show a matrix transformation, not "none"

## Possible Issues

### Issue 1: Transform Not Preserved
**Symptom:** Protractor jumps to a corner when you start dragging
**Cause:** The `transform: translate(-50%, -50%)` is being lost during drag
**Fix:** The `elementStyle` should preserve `transform` from `externalStyle`

### Issue 2: Offset Calculation Wrong
**Symptom:** Mouse is at edge, not center
**Cause:** `centerOnMouse` not being applied or offset calculation incorrect
**Fix:** `dragStartOffset` should be set to `{rect.width/2, rect.height/2}` when `centerOnMouse` is true

### Issue 3: Position Calculation
**Symptom:** Protractor doesn't follow mouse smoothly
**Cause:** The drag position formula `mouseX - offset.x` needs to account for the transform
**Fix:** Since transform is preserved, this should work correctly

## Expected Values (for debugging)

For a protractor with `radius: "150gc"`:
- Container size: ~375px × 375px (radius × 2.5)
- Center offset: ~187.5px, 187.5px
- Transform: `translate(-50%, -50%)`

When mouse is at (600, 400):
- Drag position should be: (600 - 187.5, 400 - 187.5) = (412.5, 212.5)
- With transform, visual center appears at: (600, 400) ✅

## Alternative: Manual Verification

If automatic centering still doesn't work, try this manual test:

```javascript
// Spawn a test protractor manually
window.spawnProtractorAtVertex(
  { row: 450, col: 800 }, 
  { 
    radius: "100gc",
    centerOnMouse: true  // This should be passed through
  }
);
```

Then drag it and see if it centers properly.

