# Protractor + Quadrilateral Integration Guide

Complete guide for using protractors with quadrilaterals to measure angles.

## Quick Example

Here's a complete page configuration showing a quadrilateral with protractors at each vertex:

```javascript
page14: {
  elements: {
    // Title
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 150],
      props: {
        componentType: 'text',
        text: 'Measure the Angles of the Quadrilateral',
        fontSize: '24gc',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }
    },

    // Quadrilateral
    myQuad: {
      type: 'quadrilateral',
      coordinates: [200, 200, 1400, 700],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        
        // Define vertices
        vertices: [
          { row: 250, col: 400 },  // Vertex A (top-left)
          { row: 250, col: 1000 }, // Vertex B (top-right)
          { row: 600, col: 1100 }, // Vertex C (bottom-right)
          { row: 550, col: 300 }   // Vertex D (bottom-left)
        ],
        
        // Styling
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        borderWidth: '3gc',
        
        // Show vertices
        showVertices: true,
        vertexRadius: '8gc',
        vertexColor: '#FF6600',
        
        // Hide angle markers (we'll use protractors instead)
        showAngleMarkers: false
      }
    },

    // Protractor at Vertex A (top-left)
    protractorA: {
      type: 'protractor',
      centerPoint: { row: 250, col: 400 }, // Same as vertex A
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        color: '#FF6600',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        showArm: true,
        armAngle: 0,
        armColor: '#FF0000',
        snapToDegrees: 1,
        anglePrecision: 0,
        degreeInterval: 10,
        labelInterval: 30,
        onAngleChange: (angle) => {
          console.log('Angle A:', angle);
          // Store or display the angle
          if (typeof window !== 'undefined') {
            window.angleA = angle;
          }
        }
      }
    },

    // Protractor at Vertex B (top-right)
    protractorB: {
      type: 'protractor',
      centerPoint: { row: 250, col: 1000 }, // Same as vertex B
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        color: '#00AA00',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        showArm: true,
        armAngle: 0,
        armColor: '#00DD00',
        snapToDegrees: 1,
        anglePrecision: 0,
        onAngleChange: (angle) => {
          console.log('Angle B:', angle);
          if (typeof window !== 'undefined') {
            window.angleB = angle;
          }
        }
      }
    },

    // Protractor at Vertex C (bottom-right)
    protractorC: {
      type: 'protractor',
      centerPoint: { row: 600, col: 1100 }, // Same as vertex C
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        color: '#AA00AA',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        showArm: true,
        armAngle: 0,
        armColor: '#DD00DD',
        snapToDegrees: 1,
        anglePrecision: 0,
        onAngleChange: (angle) => {
          console.log('Angle C:', angle);
          if (typeof window !== 'undefined') {
            window.angleC = angle;
          }
        }
      }
    },

    // Protractor at Vertex D (bottom-left)
    protractorD: {
      type: 'protractor',
      centerPoint: { row: 550, col: 300 }, // Same as vertex D
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        color: '#CCAA00',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        showArm: true,
        armAngle: 0,
        armColor: '#FFCC00',
        snapToDegrees: 1,
        anglePrecision: 0,
        onAngleChange: (angle) => {
          console.log('Angle D:', angle);
          if (typeof window !== 'undefined') {
            window.angleD = angle;
          }
        }
      }
    },

    // Instructions
    instructions: {
      type: 'text',
      coordinates: [200, 750, 1400, 820],
      props: {
        componentType: 'text',
        text: 'Drag each protractor to position it. Rotate the colored arms to measure each angle.',
        fontSize: '16gc',
        color: '#666',
        textAlign: 'center'
      }
    }
  }
}
```

## Pattern 1: Static Reference Protractors

Use static protractors as reference tools (non-interactive):

```javascript
page15: {
  elements: {
    quad: {
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
        showVertices: true
      }
    },
    
    // Static protractor for reference (doesn't move)
    referenceProtractor: {
      type: 'protractor',
      coordinates: [1200, 300, 1200, 300],
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'static',
        radius: '100gc',
        showArm: false,
        color: '#333',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }
    }
  }
}
```

## Pattern 2: One Movable Protractor

Single protractor that students can move to each vertex:

```javascript
page16: {
  elements: {
    quad: {
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
        showVertices: true,
        vertexColor: '#FF6600',
        vertexRadius: '10gc'
      }
    },
    
    // Single movable protractor - student moves it to measure each angle
    movableProtractor: {
      type: 'protractor',
      coordinates: [800, 450, 800, 450], // Start in center
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '100gc',
        showArm: true,
        armAngle: 0,
        armColor: '#FF0000',
        snapToDegrees: 1,
        color: '#333',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        opacity: 0.95,
        onAngleChange: (angle) => {
          console.log('Measured angle:', angle);
        }
      }
    },
    
    instructions: {
      type: 'text',
      coordinates: [200, 750, 1400, 820],
      props: {
        componentType: 'text',
        text: 'Drag the protractor to each orange vertex to measure all four angles.',
        fontSize: '18gc',
        color: '#333',
        textAlign: 'center'
      }
    }
  }
}
```

## Pattern 3: Protractor with Angle Validation

Measure angles and check if they're correct:

```javascript
page17: {
  elements: {
    quad: {
      type: 'quadrilateral',
      coordinates: [200, 200, 1400, 700],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 300, col: 500 },
          { row: 300, col: 900 },
          { row: 600, col: 900 },
          { row: 600, col: 500 }
        ],
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        showVertices: true
      }
    },
    
    protractor: {
      type: 'protractor',
      centerPoint: { row: 300, col: 500 }, // At first vertex
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'rotatable', // Can rotate arm but not move protractor
        radius: '90gc',
        showArm: true,
        armAngle: 0,
        armColor: '#FF0000',
        snapToDegrees: 1,
        onAngleChange: (angle) => {
          // Check if angle is close to 90° (it's a rectangle)
          const isCorrect = Math.abs(angle - 90) < 2;
          
          if (isCorrect) {
            console.log('✅ Correct! This is a right angle (90°)');
            // You could trigger a success animation or sound here
          } else {
            console.log('Measured:', angle + '° (Expected: 90°)');
          }
        }
      }
    },
    
    questionText: {
      type: 'text',
      coordinates: [200, 750, 1400, 820],
      props: {
        componentType: 'text',
        text: 'What is the angle at the top-left corner? Rotate the red arm to measure it.',
        fontSize: '18gc',
        color: '#333',
        textAlign: 'center'
      }
    }
  }
}
```

## Pattern 4: Compare Protractor vs Angle Markers

Show both for learning purposes:

```javascript
page18: {
  elements: {
    // Quadrilateral with automatic angle markers
    quadWithMarkers: {
      type: 'quadrilateral',
      coordinates: [200, 200, 700, 600],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 250, col: 300 },
          { row: 250, col: 600 },
          { row: 550, col: 600 },
          { row: 550, col: 300 }
        ],
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        showVertices: true,
        
        // Show angle markers (automatic calculation)
        showAngleMarkers: true,
        angleMarkerType: 'arc',
        angleMarkerColor: '#00AA00',
        angleMarkerSize: '1.5gc'
      }
    },
    
    labelLeft: {
      type: 'text',
      coordinates: [200, 620, 700, 680],
      props: {
        componentType: 'text',
        text: 'Automatic Angle Markers',
        fontSize: '16gc',
        fontWeight: 'bold',
        color: '#00AA00',
        textAlign: 'center'
      }
    },
    
    // Same quadrilateral with manual protractor
    quadWithProtractor: {
      type: 'quadrilateral',
      coordinates: [900, 200, 1400, 600],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 250, col: 1000 },
          { row: 250, col: 1300 },
          { row: 550, col: 1300 },
          { row: 550, col: 1000 }
        ],
        fillColor: 'rgba(255, 150, 100, 0.2)',
        borderColor: '#CC6600',
        showVertices: true,
        vertexColor: '#FF6600',
        
        // No angle markers - using protractor instead
        showAngleMarkers: false
      }
    },
    
    protractor: {
      type: 'protractor',
      centerPoint: { row: 250, col: 1000 },
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '70gc',
        showArm: true,
        armColor: '#FF6600',
        color: '#FF6600',
        snapToDegrees: 1
      }
    },
    
    labelRight: {
      type: 'text',
      coordinates: [900, 620, 1400, 680],
      props: {
        componentType: 'text',
        text: 'Manual Protractor Measurement',
        fontSize: '16gc',
        fontWeight: 'bold',
        color: '#FF6600',
        textAlign: 'center'
      }
    },
    
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 120],
      props: {
        componentType: 'text',
        text: 'Two Ways to Measure Angles',
        fontSize: '24gc',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }
    }
  }
}
```

## Pattern 5: Interactive Quiz with Validation

Complete quiz activity:

```javascript
page19: {
  elements: {
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 120],
      props: {
        componentType: 'text',
        text: 'Angle Measurement Quiz',
        fontSize: '24gc',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }
    },
    
    question: {
      type: 'text',
      coordinates: [200, 150, 1400, 200],
      props: {
        componentType: 'text',
        text: 'Measure angle A and check your answer:',
        fontSize: '18gc',
        color: '#333'
      }
    },
    
    quad: {
      type: 'quadrilateral',
      coordinates: [200, 250, 1400, 600],
      zIndex: 1000,
      props: {
        componentType: 'QuadrilateralComponent',
        vertices: [
          { row: 300, col: 400 },   // Vertex A
          { row: 300, col: 800 },
          { row: 550, col: 900 },
          { row: 550, col: 300 }
        ],
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        showVertices: true,
        vertexLabels: ['A', 'B', 'C', 'D'],
        showVertexLabels: true
      }
    },
    
    protractor: {
      type: 'protractor',
      centerPoint: { row: 300, col: 400 }, // At vertex A
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'circular', // Full 360° for any angle
        mode: 'rotatable',
        radius: '90gc',
        showArm: true,
        armAngle: 0,
        armColor: '#FF0000',
        snapToDegrees: 1,
        anglePrecision: 0,
        onAngleChange: (angle) => {
          if (typeof window !== 'undefined') {
            window.measuredAngle = angle;
            console.log('Current measurement:', angle + '°');
          }
        }
      }
    },
    
    // Button to check answer (you'd need to add this button component)
    instructions: {
      type: 'text',
      coordinates: [200, 650, 1400, 720],
      props: {
        componentType: 'text',
        text: 'Rotate the red arm to measure the angle, then click "Check Answer"',
        fontSize: '16gc',
        color: '#666',
        textAlign: 'center'
      }
    }
  }
}
```

## Key Integration Tips

### 1. **Positioning at Vertices**

Always use the same coordinates for protractor and vertex:

```javascript
// Quadrilateral vertex
vertices: [
  { row: 300, col: 500 }  // Vertex position
]

// Protractor at same position
centerPoint: { row: 300, col: 500 }  // Same coordinates!
```

### 2. **Z-Index Management**

```javascript
// Quadrilateral: Lower z-index (background)
zIndex: 1000

// Protractor: Higher z-index (foreground)
zIndex: 5000
```

### 3. **Color Coordination**

Use different colors for each protractor to match vertices:

```javascript
// Vertex A - Red
vertexColor: '#FF6600'
// Protractor A - Red
color: '#FF6600', armColor: '#FF0000'

// Vertex B - Green
vertexColor: '#00AA00'
// Protractor B - Green
color: '#00AA00', armColor: '#00DD00'
```

### 4. **Mode Selection**

- **Static + Quadrilateral**: Reference tool
- **Rotatable + Quadrilateral**: Measure angles at fixed positions
- **Interactive + Quadrilateral**: Full exploration mode
- **Draggable + Quadrilateral**: Move to different vertices

### 5. **Size Considerations**

Adjust protractor size based on quadrilateral size:

```javascript
// Small quadrilateral
radius: '60gc'

// Medium quadrilateral
radius: '80gc'

// Large quadrilateral
radius: '100gc'
```

## Complete Working Example for PageConfig.js

Here's a ready-to-use example you can paste into your PageConfig.js:

```javascript
// Add this to your pageConfigurations object:
page14: {
  elements: {
    title: {
      type: 'text',
      coordinates: [100, 50, 1500, 150],
      props: {
        componentType: 'text',
        text: 'Protractor + Quadrilateral Demo',
        fontSize: '28gc',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }
    },

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
        fillColor: 'rgba(100, 150, 255, 0.2)',
        borderColor: '#0066CC',
        borderWidth: '3gc',
        showVertices: true,
        vertexRadius: '8gc',
        vertexColor: '#FF6600'
      }
    },

    protractor1: {
      type: 'protractor',
      centerPoint: { row: 300, col: 400 },
      zIndex: 5000,
      props: {
        componentType: 'ProtractorComponent',
        protractorType: 'semicircular',
        mode: 'interactive',
        radius: '80gc',
        color: '#FF6600',
        armColor: '#FF0000',
        showArm: true,
        snapToDegrees: 1
      }
    }
  }
}
```

Then update your pageNavigation to include page 14:

```javascript
const pageNavigation = {
  // ... existing pages ...
  13: { prev: 12, next: 14 },
  14: { prev: 13, next: null },  // Add this
};
```

Now you can navigate to page 14 and see the protractor with the quadrilateral!

