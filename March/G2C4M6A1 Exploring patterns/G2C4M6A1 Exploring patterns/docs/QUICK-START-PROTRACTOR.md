# Quick Start Guide - Protractor Component

Get started with the protractor component in 5 minutes!

## 1. Basic Setup (Already Done!)

The protractor component is already loaded in your HTML files:
- ✅ `index.html`
- ✅ `index-en.html`

No additional installation needed!

## 2. Add Your First Protractor

Add a protractor to any page in `PageConfig.js`:

```javascript
// In js/PageConfig.js, inside a page configuration
page1: {
  elements: {
    myProtractor: {
      type: 'protractor',
      coordinates: [800, 450, 800, 450], // Center position
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',  // or 'circular'
        mode: 'interactive',              // 'static', 'draggable', 'rotatable', 'interactive'
        radius: '100gc',
        showArm: true,
        armAngle: 0
      }
    }
  }
}
```

## 3. Common Configurations

### Display-Only Protractor

```javascript
displayProtractor: {
  type: 'protractor',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'semicircular',
    mode: 'static',
    radius: '100gc',
    showArm: false,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  }
}
```

### Interactive with Angle Tracking

```javascript
measureProtractor: {
  type: 'protractor',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'semicircular',
    mode: 'interactive',
    radius: '120gc',
    showArm: true,
    armAngle: 45,
    snapToDegrees: 5,          // Snap to 5° intervals
    armColor: '#FF0000',
    onAngleChange: (angle) => {
      console.log('Current angle:', angle);
      // Store or use the angle value
    }
  }
}
```

### Circular Protractor (360°)

```javascript
circularProtractor: {
  type: 'protractor',
  coordinates: [800, 450, 800, 450],
  zIndex: 5000,
  props: {
    componentType: 'ProtractorComponent',
    protractorType: 'circular',
    mode: 'interactive',
    radius: '150gc',
    showArm: true,
    armAngle: 0,
    degreeInterval: 10,
    labelInterval: 45
  }
}
```

## 4. Position the Protractor

### Using Coordinates

```javascript
coordinates: [800, 450, 800, 450]  // [x1, y1, x2, y2] - center at (800, 450)
```

### Using CenterPoint

```javascript
centerPoint: { row: 450, col: 800 }  // Alternative way to specify center
```

## 5. Customize Appearance

```javascript
props: {
  // ... other props ...
  
  // Colors
  color: '#0066CC',                          // Marks and labels
  backgroundColor: 'rgba(230, 240, 255, 0.95)',  // Background
  armColor: '#FF6600',                       // Measurement arm
  
  // Size
  radius: '150gc',                           // Protractor size
  armLength: 'auto',                         // Auto = 80% of radius
  
  // Marks
  showDegreeMarks: true,
  showDegreeLabels: true,
  degreeInterval: 10,                        // Minor marks every 10°
  labelInterval: 30                          // Labels every 30°
}
```

## 6. Enable/Disable Interaction

```javascript
// Static (no interaction)
mode: 'static'

// Draggable only
mode: 'draggable',
isDraggable: true,
isRotatable: false

// Rotatable arm only
mode: 'rotatable',
isDraggable: false,
isRotatable: true

// Full interaction
mode: 'interactive',
isDraggable: true,
isRotatable: true
```

## 7. Add Snapping

```javascript
props: {
  // ... other props ...
  snapToDegrees: 5,      // Snap arm to 5° intervals
  anglePrecision: 0      // Show whole numbers
}
```

## 8. Track Angle Changes

```javascript
props: {
  // ... other props ...
  onAngleChange: (angle) => {
    // This function is called when the arm rotates
    console.log('New angle:', angle);
    
    // Update UI
    document.getElementById('angleDisplay').textContent = angle + '°';
    
    // Check answer
    if (Math.abs(angle - 90) < 2) {
      console.log('Correct! That\'s a right angle!');
    }
  }
}
```

## 9. Complete Example

Here's a complete page with a protractor:

```javascript
page13: {
  elements: {
    // Title
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 150],
      props: {
        componentType: 'text',
        text: 'Measure the Angle',
        fontSize: '24gc',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    
    // Interactive protractor
    protractor: {
      type: 'protractor',
      coordinates: [800, 450, 800, 450],
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '120gc',
        showArm: true,
        armAngle: 65,
        snapToDegrees: 1,
        armColor: '#FF0000',
        onAngleChange: (angle) => {
          console.log('Measured angle:', angle);
        }
      }
    },
    
    // Instructions
    instructions: {
      type: 'text',
      coordinates: [200, 750, 1400, 850],
      props: {
        componentType: 'text',
        text: 'Drag the protractor to move it. Click and drag outside to rotate the red arm.',
        fontSize: '16gc',
        color: '#666',
        textAlign: 'center'
      }
    }
  }
}
```

## 10. Testing Your Protractor

1. Save your changes to `PageConfig.js`
2. Refresh your browser
3. Navigate to the page with your protractor
4. Try these interactions:
   - **Drag the protractor**: Click and drag anywhere on the protractor
   - **Rotate the arm**: Click and drag in the area around the protractor
   - **Check the console**: See angle changes logged

## Troubleshooting

### Protractor not showing?
- Check that `zIndex` is high enough (5000+)
- Verify coordinates are within viewport
- Ensure `componentType: 'ProtractorComponent'` is set

### Can't rotate the arm?
- Set `mode: 'interactive'` or `mode: 'rotatable'`
- Set `showArm: true`
- Set `isRotatable: true`

### Can't drag the protractor?
- Set `mode: 'interactive'` or `mode: 'draggable'`
- Set `isDraggable: true`

### Degree marks not showing?
- Set `showDegreeMarks: true`
- Set `showDegreeLabels: true`
- Adjust `degreeInterval` and `labelInterval`

## Next Steps

- Read the full documentation: `PROTRACTOR-COMPONENT.md`
- Check out integration examples in the documentation
- Experiment with different configurations
- Create educational activities using the protractor

## Quick Reference

### Essential Props
```javascript
{
  componentType: 'ProtractorComponent',
  protractorType: 'semicircular' | 'circular',
  mode: 'static' | 'draggable' | 'rotatable' | 'interactive',
  coordinates: [x1, y1, x2, y2],
  radius: '100gc',
  showArm: true,
  armAngle: 0,
  snapToDegrees: 5,
  onAngleChange: (angle) => {}
}
```

### Common Use Cases
1. **Static reference**: `mode: 'static', showArm: false`
2. **Angle measurement tool**: `mode: 'interactive', showArm: true, snapToDegrees: 1`
3. **Angle construction**: `mode: 'rotatable', showArm: true, onAngleChange: (angle) => {}`

## Need Help?

- 📖 Full documentation: `PROTRACTOR-COMPONENT.md`
- 📋 Implementation details: `PROTRACTOR-IMPLEMENTATION-SUMMARY.md`
- 💻 Code: `js/components/protractor-component.js`

Happy measuring! 🎯📐

