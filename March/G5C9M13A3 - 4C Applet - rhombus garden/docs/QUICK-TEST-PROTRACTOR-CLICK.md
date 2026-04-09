# Quick Test Guide - Click to Spawn Protractor

## Step 1: Verify Files Are Loaded

1. Open your browser's Developer Console (F12)
2. Look for these messages when the page loads:

```
✅ Protractor component loaded successfully
✅ Protractor Manager script loaded
✅ Protractor Manager initialized
✅ window.spawnProtractorAtVertex is now available
```

If you DON'T see these messages, the files aren't loading. Check your HTML includes these scripts in this order:

```html
<script src="js/components/protractor-component.js"></script>
<script src="js/protractor-manager.js"></script>
```

## Step 2: Manual Test (Do this first!)

In the browser console, type:

```javascript
window.spawnProtractorAtVertex({row: 450, col: 800}, {radius: "100gc"})
```

**Expected Result**: A protractor should appear in the center of your screen with a close button (×).

**If this works**: The protractor system is working, the issue is with the angle arc clicks.

**If this doesn't work**: The protractor manager isn't loaded properly. Hard refresh (Ctrl+Shift+R).

## Step 3: Test Angle Arc Click

1. Make sure you have a quadrilateral with angle markers on the page:

```javascript
page1: {
  elements: {
    testQuad: {
      type: 'quadrilateral',
      coordinates: [200, 200, 1400, 700],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 300, col: 400 },
          { row: 300, col: 1000 },
          { row: 600, col: 1000 },
          { row: 600, col: 400 }
        ],
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        borderWidth: '3gc',
        showVertices: true,
        
        // CRITICAL: These must be set
        showAngleMarkers: true,
        angleMarkerType: 'arc'  // Must be 'arc', not 'none'
      }
    }
  }
}
```

2. **Hover over an angle arc** - Your cursor should change to a pointer (hand icon)
3. **Click the angle arc** - Check the console

**Expected console output:**
```
🖱️ Arc clicked! Label: Interior Angle Vertex: {row: 300, col: 400}
🔍 Checking window.spawnProtractorAtVertex: function
🎯 Angle arc clicked: Interior Angle at vertex {row: 300, col: 400}
📐 Spawning protractor at vertex (300, 400)
```

## Step 4: If Still Not Working

### Check A: Are angle markers visible?

Look at your quadrilateral. Do you see orange/colored arcs at the corners?

- **If NO**: Angle markers aren't showing. Check `showAngleMarkers: true` and `angleMarkerType: 'arc'`
- **If YES**: Continue to Check B

### Check B: What happens when you click an arc?

Open console and click an arc. What do you see?

**Scenario 1**: Nothing at all in console
- **Issue**: Click isn't being captured
- **Solution**: Hard refresh (Ctrl+Shift+R), clear cache

**Scenario 2**: `🖱️ Arc clicked!` appears but nothing else
- **Issue**: `window.spawnProtractorAtVertex` not available
- **Solution**: Check that `protractor-manager.js` is loaded

**Scenario 3**: `❌ window.spawnProtractorAtVertex not available!`
- **Issue**: Protractor manager didn't initialize
- **Solution**: Check script loading order in HTML

### Check C: Hard Refresh

Sometimes browser cache causes issues:

1. Clear browser cache completely
2. Hard refresh: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
3. Close and reopen the browser
4. Try again

### Check D: File Changes Saved?

Make sure these files are saved with the latest changes:

- `js/components/angle-marker-component.js` (has click handler)
- `js/protractor-manager.js` (exists and has the manager class)
- `index.html` (includes protractor-manager.js script)

## Step 5: Create a Test Page

Add this simple test page to your PageConfig.js:

```javascript
// Add to pageNavigation (around line 19-33):
const pageNavigation = {
  1: { prev: null, next: 2 },
  2: { prev: 1, next: 3 },
  3: { prev: 2, next: 4 },
  4: { prev: 3, next: 5 },
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: 14 },  // Update this
  14: { prev: 13, next: null }, // Add this
};

// Then add this test page to pageConfigurations:
const pageConfigurations = {
  // ... your existing pages ...
  
  // TEST PAGE
  page14: {
    elements: {
      title: {
        type: 'text',
        coordinates: [100, 50, 1500, 150],
        props: {
          componentType: 'text',
          text: 'Protractor Test - Click the Orange Arcs!',
          fontSize: '28gc',
          fontWeight: 'bold',
          color: '#E74C3C',
          textAlign: 'center'
        }
      },

      instructions: {
        type: 'text',
        coordinates: [200, 150, 1400, 220],
        props: {
          componentType: 'text',
          text: '👆 Click any orange arc at the corners to spawn a protractor',
          fontSize: '18gc',
          color: '#7F8C8D',
          textAlign: 'center'
        }
      },

      // Simple rectangle for testing
      testRect: {
        type: 'quadrilateral',
        coordinates: [300, 280, 1300, 750],
        zIndex: 1000,
        props: {
          componentType: 'QuadrilateralComponent',
          vertices: [
            { row: 350, col: 500 },
            { row: 350, col: 1100 },
            { row: 700, col: 1100 },
            { row: 700, col: 500 }
          ],
          fillColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: '#2980B9',
          borderWidth: '4gc',
          showVertices: true,
          vertexRadius: '12gc',
          vertexColor: '#E74C3C',
          
          // Enable angle markers - CLICKABLE!
          showAngleMarkers: true,
          angleMarkerType: 'arc',
          angleMarkerColor: '#E74C3C',
          angleMarkerSize: '2gc'
        }
      },

      console: {
        type: 'text',
        coordinates: [200, 780, 1400, 850],
        props: {
          componentType: 'text',
          text: 'Open browser console (F12) to see click logs',
          fontSize: '14gc',
          color: '#95A5A6',
          textAlign: 'center',
          fontStyle: 'italic'
        }
      }
    }
  }
};
```

## Expected Behavior on Test Page

1. Navigate to page 14
2. You should see a blue rectangle with red vertices
3. Orange arcs should appear at each corner
4. **Hover over an arc** → cursor changes to pointer
5. **Click an arc** → protractor appears at that corner
6. **× button appears** → click to remove protractor

## Console Commands to Debug

Try these in the browser console:

```javascript
// 1. Check if manager exists
console.log('Manager:', window.ProtractorManager);

// 2. Check if spawn function exists
console.log('Spawn function:', window.spawnProtractorAtVertex);

// 3. Try spawning manually at center
window.spawnProtractorAtVertex({row: 450, col: 800}, {radius: "100gc", color: "#FF0000"});

// 4. Check how many are active
console.log('Active protractors:', window.ProtractorManager.getCount());

// 5. Remove all
window.removeAllProtractors();

// 6. Check if angle marker component has click handler
// (Look at an angle arc element in inspector - should have onClick)
```

## Last Resort: Manual Verification

1. Open `js/components/angle-marker-component.js`
2. Find line 185 - should be:
   ```javascript
   pointerEvents: 'auto'  // Changed to 'auto' to allow clicks on arcs
   ```
   NOT `pointerEvents: 'none'`

3. Open `js/protractor-manager.js`
   - File should exist and be about 285 lines
   - Should have `class ProtractorManager`

4. Open `index.html`
   - Search for `protractor-manager.js`
   - Should appear AFTER `protractor-component.js`
   - Should appear BEFORE `elements-registry.js`

## Still Not Working?

Share the console output and I can help debug further. Specifically:

1. What messages appear in console when page loads?
2. What happens when you click an arc?
3. Does the manual spawn command work?
4. Are angle arcs visible on the quadrilateral?

---

**TIP**: The most common issue is browser cache. Try Ctrl+Shift+R first!

