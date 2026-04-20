# Interactive Angle Measurement - Click to Spawn Protractor

## Feature Overview

Click on any angle arc to spawn a protractor at that vertex for precise angle measurement!

## How It Works

When you click on an angle arc marker on a quadrilateral:
1. 🎯 A protractor automatically appears at that vertex
2. 📐 The protractor is in **rotatable mode** (arm can rotate, protractor stays in place)
3. 🎨 The protractor color matches the angle arc color
4. ✖️ A close button appears to remove the protractor when done

## Quick Start

### Enable on Existing Quadrilaterals

Simply add angle markers to your quadrilateral - they're already clickable!

```javascript
myQuad: {
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
    
    // Enable angle markers - they're automatically clickable!
    showAngleMarkers: true,
    angleMarkerType: 'arc',
    angleMarkerColor: '#FF6600'
  }
}
```

**That's it!** Now when students click on any angle arc, a protractor will spawn.

## Complete Example

```javascript
page14: {
  elements: {
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 150],
      props: {
        componentType: 'text',
        text: 'Click on any angle arc to measure it!',
        fontSize: '28gc',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }
    },

    instructions: {
      type: 'text',
      coordinates: [200, 150, 1400, 220],
      props: {
        componentType: 'text',
        text: '👆 Click the orange arcs at each corner to spawn protractors',
        fontSize: '18gc',
        color: '#666',
        textAlign: 'center'
      }
    },

    interactiveQuad: {
      type: 'quadrilateral',
      coordinates: [200, 250, 1400, 750],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        
        vertices: [
          { row: 300, col: 400 },
          { row: 350, col: 1000 },
          { row: 650, col: 950 },
          { row: 600, col: 350 }
        ],
        
        fillColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: '#2980B9',
        borderWidth: '3gc',
        
        // Show vertices
        showVertices: true,
        vertexRadius: '10gc',
        vertexColor: '#E74C3C',
        
        // Enable angle markers - automatically clickable!
        showAngleMarkers: true,
        angleMarkerType: 'arc',
        angleMarkerColor: '#FF6600',
        angleMarkerSize: '1.5gc'
      }
    }
  }
}
```

## User Experience

### When student clicks an angle arc:

1. **Protractor spawns** at the vertex
2. **Close button (×)** appears next to protractor
3. **Arm can be rotated** to measure the angle
4. **Angle value** is shown in real-time
5. **Multiple protractors** can be active at once

### Closing protractors:

- Click the **× button** next to any protractor
- Or programmatically: `window.removeAllProtractors()`

## Advanced Configuration

### Custom Protractor Options

You can customize the spawned protractors globally or per-angle:

```javascript
// In your page initialization or custom script
window.addEventListener('pageChanged', (event) => {
  if (event.detail.page === 14) {
    // Override default protractor options
    const originalSpawn = window.spawnProtractorAtVertex;
    window.spawnProtractorAtVertex = (vertex, options) => {
      // Customize options
      const customOptions = {
        ...options,
        radius: '100gc',  // Larger protractor
        snapToDegrees: 5, // Snap to 5° intervals
        onAngleChange: (angle) => {
          console.log('Measured:', angle + '°');
          // Custom logic here
        }
      };
      return originalSpawn(vertex, customOptions);
    };
  }
});
```

### Per-Vertex Color Matching

The protractor automatically matches the color of the angle arc that was clicked:

```javascript
props: {
  // Different colors for different angles
  angleA: {
    interiorAngle: {
      show: true,
      color: '#FF0000'  // Red - protractor will be red
    }
  },
  angleB: {
    interiorAngle: {
      show: true,
      color: '#00AA00'  // Green - protractor will be green
    }
  },
  angleC: {
    interiorAngle: {
      show: true,
      color: '#0000FF'  // Blue - protractor will be blue
    }
  },
  angleD: {
    interiorAngle: {
      show: true,
      color: '#FF6600'  // Orange - protractor will be orange
    }
  }
}
```

## Programmatic Control

### Spawn Protractor Manually

```javascript
// Spawn a protractor at any vertex
window.spawnProtractorAtVertex(
  { row: 300, col: 400 },  // Vertex position
  {
    mode: 'rotatable',
    radius: '90gc',
    color: '#FF6600',
    armColor: '#FF0000',
    initialAngle: 0,
    label: 'Angle A'
  }
);
```

### Remove Protractors

```javascript
// Remove a specific protractor
window.removeProtractor('protractor-1');

// Remove all protractors
window.removeAllProtractors();
```

### Check Active Protractors

```javascript
// Get count of active protractors
const count = window.ProtractorManager.getCount();
console.log(`${count} protractors active`);
```

## Educational Use Cases

### 1. Angle Discovery
Students click on angles they want to measure and compare results.

### 2. Quiz Mode
Show a quadrilateral, students measure all angles, then check if sum = 360°.

### 3. Angle Identification
Click to measure angles and identify acute, obtuse, right angles.

### 4. Comparison
Spawn protractors at multiple vertices to compare angles visually.

### 5. Self-Check
Students make predictions, then click to verify with protractor.

## Visual Feedback

- **Hover**: Angle arcs show hand cursor
- **Tooltip**: "Click to measure [angle name] with protractor"
- **Active**: Protractor appears with smooth animation
- **Close button**: Hover effect on × button

## Technical Details

### Components Involved

1. **AngleMarkerComponent**: Handles click events on arcs
2. **ProtractorManager**: Manages dynamic protractor spawning
3. **ProtractorComponent**: Renders the measurement tool

### Files Modified/Created

- ✅ `js/components/angle-marker-component.js` - Added click handling
- ✅ `js/protractor-manager.js` - New spawning system
- ✅ `index.html` & `index-en.html` - Added manager script

### Global Functions

```javascript
window.spawnProtractorAtVertex(vertex, options)
window.removeProtractor(protractorId)
window.removeAllProtractors()
window.ProtractorManager // Access the manager instance
```

## Browser Support

- ✅ Desktop: Chrome, Firefox, Safari, Edge
- ✅ Mobile: iOS Safari, Chrome Mobile
- ✅ Touch devices: Full support

## Troubleshooting

### Protractor doesn't spawn when clicking arc

**Check:**
1. Are angle markers visible? (`showAngleMarkers: true`)
2. Is the page fully loaded?
3. Check console for errors
4. Verify ProtractorManager is loaded: `window.ProtractorManager`

### Multiple protractors appear at same spot

**Solution:** Remove previous protractors first:
```javascript
window.removeAllProtractors();
```

### Protractor appears in wrong position

**Check:**
- Vertex coordinates are correct
- Grid configuration is correct
- No conflicting CSS transforms

### Close button not working

**Solution:** Ensure click isn't being blocked by other elements.

## Performance Notes

- ✅ Lightweight: Each protractor uses minimal resources
- ✅ Multiple instances: Can have many protractors simultaneously
- ✅ Clean cleanup: Protractors properly unmount when removed

## Future Enhancements

Possible additions:
- Double-click to spawn larger protractor
- Right-click for different protractor types
- Drag-and-drop protractors after spawning
- Save measured angles to state
- Automatic angle comparison mode
- Export measurements

## Examples

See working examples in:
- **Page 1**: Basic quadrilateral with angle markers
- **Page 14**: Interactive demo (if created)
- Check `PROTRACTOR-QUADRILATERAL-INTEGRATION.md` for more examples

## Summary

**What you need to do:**
1. Add `showAngleMarkers: true` to your quadrilateral
2. That's it! Angle arcs are automatically clickable

**What students can do:**
1. Click any angle arc
2. Protractor spawns automatically
3. Rotate arm to measure
4. Click × to remove

**Result:** Interactive, self-guided angle measurement! 🎯📐

---

**Status**: ✅ Fully implemented and ready to use!

