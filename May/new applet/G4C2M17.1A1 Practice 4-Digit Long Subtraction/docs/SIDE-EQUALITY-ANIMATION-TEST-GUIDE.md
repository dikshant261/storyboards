# Side Equality Animation - Test Guide

## Quick Test Instructions

### 1. Open the Application
Open `index.html` in your browser

### 2. Navigate to Page 1
The quadrilateral component with side equality animation configuration should be on Page 1

### 3. Open Browser Console
Press `F12` or `Ctrl+Shift+I` (Chrome/Edge) to open Developer Tools

### 4. Run Test Commands

#### Test 1: Animate Sides Around Vertex B
```javascript
// Get the quadrilateral element
const quad = document.getElementById('page1-quadrilateral-demo');

// Animate sides AB and BC around vertex B (index 1)
quad.animateSideEquality(1);
```

**Expected Result:**
- Orange dashed line appears matching side AB
- Line rotates smoothly around vertex B
- Line superimposes on side BC
- Waits 1 second
- Rotates back to AB
- Waits 1 second
- Repeats for 3 cycles (per default config)
- Message "Adjacent sides are equal!" displays above vertex B
- Message blinks

#### Test 2: Animate Different Vertex
```javascript
// Animate sides BC and CD around vertex C (index 2)
quad.animateSideEquality(2);
```

#### Test 3: Stop Animation
```javascript
// Stop the currently running animation
quad.stopSideEqualityAnimation();
```

#### Test 4: Using Global Registry
```javascript
// Alternative way to trigger animation
window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSideEquality(1);
```

#### Test 5: Using Global Function
```javascript
// Using auto-generated global function (hyphens replaced with underscores)
window.animateSideEquality_page1_quadrilateral_demo(1);
```

### 5. Test All Vertices

```javascript
// Test all four vertices sequentially
const quad = document.getElementById('page1-quadrilateral-demo');

async function testAllVertices() {
  for (let i = 0; i < 4; i++) {
    console.log(`Testing vertex ${i} (${['A', 'B', 'C', 'D'][i]})`);
    quad.animateSideEquality(i);
    
    // Wait for animation to complete (3 cycles * 4 seconds per cycle)
    await new Promise(resolve => setTimeout(resolve, 13000));
    quad.stopSideEqualityAnimation();
    
    // Brief pause before next test
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log('All tests complete!');
}

testAllVertices();
```

## Visual Checklist

### Animation Quality
- [ ] Line rotates smoothly (no jerkiness)
- [ ] Dashed pattern is clearly visible
- [ ] Blinking effect works (orange ↔ yellow)
- [ ] Line length matches side lengths
- [ ] Line thickness matches quadrilateral sides
- [ ] Rotation is centered on common vertex

### Positioning
- [ ] Line starts at correct position (first side)
- [ ] Line ends at correct position (second side)
- [ ] Line perfectly superimposes on target side
- [ ] No offset or misalignment

### Message Display
- [ ] Message appears when animation starts
- [ ] Message is readable and well-positioned
- [ ] Message has proper styling (background, border, etc.)
- [ ] Message blinks correctly
- [ ] Message position adjusts with viewport size

### Animation Behavior
- [ ] Wait time is correct at each position
- [ ] Animation completes specified number of cycles
- [ ] Animation stops automatically after cycles complete
- [ ] Stop function works immediately
- [ ] Multiple animations don't conflict

### Console Output
Look for these console messages:
```
✅ Side equality animation available:
   - Helper method: element.animateSideEquality(commonVertexIndex)
   - Stop method: element.stopSideEqualityAnimation()
   - Global function: window.animateSideEquality_page1_quadrilateral_demo(commonVertexIndex)
   - Registry: window.quadrilateralAnimations['page1-quadrilateral-demo'].animateSideEquality(commonVertexIndex)
```

## Configuration Testing

### Test Different Durations

Edit `js/PageConfig.js` and change:
```javascript
sideEqualityAnimationConfig: {
  duration: 500,  // Try: 500, 1000, 2000, 3000
  // ... rest of config
}
```

Refresh browser and test. Verify rotation speed changes accordingly.

### Test Different Wait Times

```javascript
sideEqualityAnimationConfig: {
  duration: 1000,
  waitTime: 2000,  // Try: 500, 1000, 2000, 3000
  // ... rest of config
}
```

Verify the pause duration at each position.

### Test Different Cycle Counts

```javascript
sideEqualityAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 1,  // Try: 1, 2, 5, -1 (infinite)
  // ... rest of config
}
```

Verify animation stops after specified cycles (or runs forever for -1).

### Test Different Messages

```javascript
sideEqualityAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 3,
  message: 'AB = BC',  // Try different messages
  // ... rest of config
}
```

### Test Message Positioning

```javascript
sideEqualityAnimationConfig: {
  duration: 1000,
  waitTime: 1000,
  cycles: 3,
  message: 'Adjacent sides are equal!',
  messagePosition: {
    offsetX: 0,     // Try: -10, 0, 10
    offsetY: -20    // Try: -20, -10, -5, 0
  }
}
```

Or use absolute positioning:
```javascript
messagePosition: {
  left: 50,  // Center horizontally
  top: 10    // Near top of viewport
}
```

## Performance Testing

### Test Multiple Simultaneous Animations

```javascript
const quad = document.getElementById('page1-quadrilateral-demo');

// Start side animation
quad.animateSideEquality(1);

// Also start angle animation
quad.animateAngleEquality(0, 2);

// Verify both run smoothly without conflicts
```

### Test with Vertex Dragging

```javascript
// Start animation
quad.animateSideEquality(1);

// Then try dragging vertices
// Verify animation continues during drag
```

## Error Handling Testing

### Test Invalid Vertex Index

```javascript
quad.animateSideEquality(5);  // Should show warning in console
quad.animateSideEquality(-1); // Should show warning in console
```

Expected console output:
```
❌ Invalid vertex index for side animation
```

### Test on Non-existent Element

```javascript
const quad = document.getElementById('non-existent');
quad.animateSideEquality(1);  // Should throw error
```

Expected: TypeError (cannot read properties of null)

## Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome/Edge (primary)
- [ ] Firefox
- [ ] Safari (if available)

Check for:
- Animation smoothness
- Blinking effect consistency
- Message display correctness
- No console errors

## Cleanup Testing

### Test Memory Leaks

```javascript
// Start and stop multiple times
const quad = document.getElementById('page1-quadrilateral-demo');

for (let i = 0; i < 10; i++) {
  quad.animateSideEquality(1);
  setTimeout(() => quad.stopSideEqualityAnimation(), 100);
}

// Check browser DevTools Memory tab
// Memory should stabilize (no continuous growth)
```

### Test Component Unmount

Navigate to another page and back. Verify:
- [ ] No console errors
- [ ] Animation can be started again
- [ ] No zombie animations running

## Success Criteria

All tests should:
- ✅ Execute without errors
- ✅ Produce expected visual results
- ✅ Show appropriate console messages
- ✅ Handle edge cases gracefully
- ✅ Perform smoothly (60fps)
- ✅ Clean up properly

## Troubleshooting

### Animation doesn't start
1. Check console for errors
2. Verify element exists: `document.getElementById('page1-quadrilateral-demo')`
3. Verify config is loaded: check `PageConfig.js`
4. Try different vertex index: 0, 1, 2, or 3

### Animation is jerky
1. Check CPU usage (close other tabs)
2. Verify no infinite loops in console
3. Check for other running animations
4. Try increasing duration for slower animation

### Message not visible
1. Check message position config
2. Try absolute positioning
3. Verify z-index (should be high)
4. Check for CSS conflicts

### Colors not blinking
1. Check browser supports CSS animations
2. Verify keyframes are injected (check `<head>` in DevTools)
3. Check for CSS conflicts with animation property

## Reporting Issues

If you find issues, report with:
1. Browser and version
2. Console error messages (if any)
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshot or screen recording

