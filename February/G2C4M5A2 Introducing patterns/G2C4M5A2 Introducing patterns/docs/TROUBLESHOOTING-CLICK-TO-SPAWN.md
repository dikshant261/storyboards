# Troubleshooting: Click-to-Spawn Not Working

## Quick Test Steps

### 1. Reload the Page
Refresh your browser to load the updated code with debug logging.

### 2. Open Developer Console
Press **F12** to open DevTools, then go to the **Console** tab.

### 3. Click Any Orange Angle Arc
Click on one of the orange angle arcs at the vertices (A, B, C, or D).

### 4. Check Console Output

You should see one of these patterns:

#### Pattern A: ✅ Everything Working
```
🖱️ Arc clicked! Label: ∠A Vertex: {row: 0, col: 0}
   onArcClick prop: function
   onArcClick type: function
🎯 Invoking onArcClick for ∠A at vertex {row: 0, col: 0}
🎯 spawnProtractorAtVertex called!
   vertexGridCoords: {row: 0, col: 0}
   protractorConfig: {...}
   enableClickToSpawn: true
✅ Click-to-spawn enabled, proceeding...
🎯 Spawning protractor at vertex: {row: 0, col: 0}
📐 Spawning protractor at vertex (450, 800) 'protractor-1'
```
**If you see this:** Protractor should spawn! If it doesn't, the issue is in the protractor manager.

---

#### Pattern B: ⚠️ No onArcClick Callback
```
🖱️ Arc clicked! Label: ∠A Vertex: {row: 0, col: 0}
   onArcClick prop: undefined
   onArcClick type: undefined
⚠️ No onArcClick callback provided!
🔍 Checking window.spawnProtractorAtVertex: function
🎯 Angle arc clicked: ∠A at vertex {row: 0, col: 0}
```
**If you see this:** The `onArcClick` prop is not being passed from quadrilateral to angle marker.

**Fix:** Check that `protractorConfig.enableClickToSpawn: true` in PageConfig.js

---

#### Pattern C: ❌ No Spawn Function
```
🖱️ Arc clicked! Label: ∠A Vertex: {row: 0, col: 0}
   onArcClick prop: undefined
   onArcClick type: undefined
⚠️ No onArcClick callback provided!
🔍 Checking window.spawnProtractorAtVertex: undefined
❌ No protractor spawn function available!
💡 Enable protractorConfig.enableClickToSpawn in your quadrilateral
```
**If you see this:** Protractor manager is not loaded or initialized.

**Fix:** Check that `js/protractor-manager.js` is loaded in index.html

---

#### Pattern D: 🚫 No Console Output at All
**If nothing appears in console:** The click event is not reaching the handler.

**Possible causes:**
1. Arc is not clickable (check `pointerEvents: 'auto'`)
2. Another element is blocking clicks
3. Arc rendering is not creating the clickable div

---

## Common Issues and Solutions

### Issue 1: "enableClickToSpawn: undefined"
**Solution:**
```javascript
// In PageConfig.js, inside the quadrilateral props:
protractorConfig: {
  enableClickToSpawn: true,  // ← Make sure this is set!
  // ... other config
}
```

### Issue 2: Arc not clickable
**Check:** The angle arc should show a pointer cursor when you hover over it.

**If no pointer cursor:**
- The arc might not be rendering
- Check that `angleConfig.show` is not "none"
- Check that at least one angle config has `show: true`

### Issue 3: Protractor manager not loaded
**Check in Console:**
```javascript
console.log(typeof window.spawnProtractorAtVertex);
// Should output: "function"
// If "undefined", protractor-manager.js is not loaded
```

**Fix:** Verify in index.html:
```html
<script src="js/protractor-manager.js"></script>
```

### Issue 4: Click-to-spawn disabled
**Check in Console after clicking:**
```
⚠️ Click-to-spawn is disabled! Set protractorConfig.enableClickToSpawn: true
```

**Fix:** In PageConfig.js:
```javascript
protractorConfig: {
  enableClickToSpawn: true  // ← Set to true
}
```

---

## Manual Test in Console

If clicking doesn't work, try manually spawning a protractor:

```javascript
// Test if protractor manager works
window.spawnProtractorAtVertex(
  { row: 450, col: 800 },
  {
    radius: '100gc',
    protractorType: 'semicircular',
    mode: 'interactive'
  }
);
```

**Expected:** A protractor should appear on screen.

**If it works:** The issue is with the click handler connection.  
**If it doesn't work:** The issue is with the protractor manager or component.

---

## Check Current Config

Run this in the console to see your quadrilateral config:

```javascript
// Find the quadrilateral element
const quad = document.querySelector('[data-element-name="quadrilateral-demo"]');
console.log('Quadrilateral found:', quad);

// Check if PageConfig has protractorConfig
console.log('PageConfig:', window.PageConfig);
```

---

## What to Report Back

Please copy and paste the **console output** after clicking an angle arc.

This will help me identify exactly where the issue is:
1. ✅ Click detected?
2. ✅ onArcClick callback provided?
3. ✅ enableClickToSpawn enabled?
4. ✅ Spawn function called?
5. ✅ Protractor manager working?

---

## Quick Fixes to Try

### Fix 1: Verify Config
Check lines 335-370 in PageConfig.js:
```javascript
protractorConfig: {
  enableClickToSpawn: true,  // ← This line must exist and be true
  type: "semicircular",
  radius: "80gc",
  // ...
}
```

### Fix 2: Clear Cache
- Hard refresh: **Ctrl+Shift+R** (or Cmd+Shift+R on Mac)
- Or clear browser cache completely

### Fix 3: Check HTML Script Load Order
In index.html, make sure scripts are loaded in this order:
1. React
2. Components (including quadrilateral, angle-marker, protractor)
3. Protractor manager
4. PageConfig

---

## Expected Behavior

✅ **Before click:** No protractor visible, just quadrilateral  
✅ **Hover arc:** Cursor changes to pointer  
✅ **Click arc:** Console logs appear  
✅ **After click:** Protractor appears at clicked vertex  
✅ **Protractor:** Has snap points at all vertices + intersection  

---

## Next Steps

1. **Reload the page**
2. **Open Console (F12)**
3. **Click an orange angle arc**
4. **Copy the console output**
5. **Share the output so I can diagnose the issue**

The detailed logging will show exactly where the problem is! 🔍
