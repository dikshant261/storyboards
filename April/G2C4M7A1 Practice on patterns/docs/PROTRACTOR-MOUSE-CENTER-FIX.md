# Protractor Mouse-Center Alignment Fix

## Issue
Previously, when dragging the protractor, the mouse pointer and the center of the protractor were not aligned. The protractor would jump to where you clicked, maintaining that offset during the drag.

## Solution
Added a `centerOnMouse` prop to the `Draggable` component that forces the element to always center itself on the mouse pointer during dragging.

## Files Modified

### 1. `js/components/draggable-component.js`

**New Prop:**
```javascript
centerOnMouse = false  // If true, always center element on mouse pointer
```

**Implementation:**
When `centerOnMouse` is `true`, the drag offset is set to the center of the element instead of the click position:

```javascript
if (centerOnMouse) {
  dragStartOffset.current = {
    x: rect.width / 2,   // Center X
    y: rect.height / 2   // Center Y
  };
} else {
  dragStartOffset.current = {
    x: e.clientX - rect.left,  // Click offset X
    y: e.clientY - rect.top    // Click offset Y
  };
}
```

This applies to both mouse and touch events.

### 2. `js/components/protractor-component.js`

**Updated Draggable wrapper:**
```javascript
React.createElement(Draggable, {
  // ... other props
  centerOnMouse: true,  // NEW: Always center protractor on mouse pointer
  // ...
})
```

## Behavior

### Before Fix
- Click on protractor edge → Protractor maintains that offset during drag
- Mouse pointer could be anywhere on the protractor during drag
- Difficult to precisely position the protractor center

### After Fix
- Click anywhere on protractor → Center immediately aligns with mouse
- Mouse pointer is always at the protractor's center during drag
- Easy and intuitive positioning
- Perfect alignment for angle measurement

## Use Cases

The `centerOnMouse` prop is ideal for:
- **Circular/radial tools** (protractors, compasses)
- **Centered elements** that use `transform: translate(-50%, -50%)`
- **Tools where center position matters** (measuring instruments)
- **Precise placement scenarios**

For regular draggable elements (buttons, images, containers), keep `centerOnMouse: false` (default) to maintain the natural "grab where you click" behavior.

## Technical Details

The protractor uses `transform: translate(-50%, -50%)` to center itself on its position coordinates. Without `centerOnMouse`, the Draggable component didn't account for this transform, causing misalignment between the mouse pointer and the visual center.

By setting the drag offset to the element's center point, the protractor now follows the mouse perfectly, regardless of where you initially click on it.

## Testing

1. **Test Center Alignment:**
   - Click anywhere on the protractor
   - Drag it around
   - ✅ Mouse pointer should stay at the center of the protractor

2. **Test with Snap Points:**
   - Drag protractor near a snap point
   - ✅ Center aligns with snap point, not edge

3. **Test Rotation Ring:**
   - Click on the rotation ring (outer dashed circle)
   - ✅ Rotates the arm (doesn't drag the protractor)

4. **Test Protractor Face:**
   - Click on the protractor face
   - ✅ Drags the protractor with center on mouse

## Benefits

- ✅ **Intuitive UX** - Protractor follows mouse naturally
- ✅ **Precise positioning** - Easy to align center with targets
- ✅ **Snap point alignment** - Center snaps correctly, not edge
- ✅ **Professional feel** - Matches real-world protractor tools
- ✅ **No visual jump** - Smooth pickup and drag

## Backward Compatibility

This change is **fully backward compatible**:
- Default `centerOnMouse: false` maintains original behavior
- Only affects protractor component (explicitly set to `true`)
- Other draggable elements unchanged
- No breaking changes to existing code

