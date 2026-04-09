/**
 * Shape Selector Dropdown Component
 * 
 * A dropdown component that allows users to select different quadrilateral shapes.
 * When a shape is selected, it updates a global state that the quadrilateral component can read.
 */

/**
 * Shape Selector Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - Container position [x1, y1, x2, y2]
 * @param {string} props.targetQuadId - ID of the quadrilateral component to update (default: 'page1-quadrilateral-demo')
 * @param {string} props.defaultShape - Default selected shape (default: 'SQUARE')
 * @param {string} props.fontSize - Font size for the dropdown (default: '20gc')
 * @param {string} props.color - Text color (default: '#000000')
 * @param {string} props.backgroundColor - Background color (default: '#ffffff')
 */
const ShapeSelectorComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    targetQuadId = 'page1-quadrilateral-demo',
    defaultShape = 'SQUARE',
    fontSize = '20gc',
    color = '#000000',
    backgroundColor = '#ffffff'
  } = props;

  // Available quadrilateral types
  const shapeOptions = [
    { value: 'SQUARE', label: 'Square' },
    { value: 'RECTANGLE', label: 'Rectangle' },
    { value: 'PARALLELOGRAM', label: 'Parallelogram' },
    { value: 'RHOMBUS', label: 'Rhombus' },
    { value: 'TRAPEZOID', label: 'Trapezoid' },
    { value: 'ISOSCELES_TRAPEZOID', label: 'Isosceles Trapezoid' },
    { value: 'RIGHT_TRAPEZOID', label: 'Right Trapezoid' },
    { value: 'KITE', label: 'Kite' },
    { value: 'IRREGULAR', label: 'Irregular Quadrilateral' }
  ];

  // Initialize global state if it doesn't exist
  if (typeof window !== 'undefined' && !window.shapeSelectorState) {
    window.shapeSelectorState = {
      selectedShape: defaultShape,
      listeners: []
    };
  }

  const [selectedShape, setSelectedShape] = React.useState(
    window.shapeSelectorState?.selectedShape || defaultShape
  );

  // Update global state when selection changes
  const handleChange = React.useCallback((event) => {
    const newShape = event.target.value;
    setSelectedShape(newShape);
    
    // Update global state
    if (window.shapeSelectorState) {
      window.shapeSelectorState.selectedShape = newShape;
      
      // Notify all listeners
      window.shapeSelectorState.listeners.forEach(listener => {
        try {
          listener(newShape);
        } catch (error) {
          console.error('Error in shape selector listener:', error);
        }
      });
    }

    // Update the quadrilateral component directly via DOM
    const quadElement = document.getElementById(targetQuadId);
    if (quadElement) {
      quadElement.setAttribute('data-quad-type', newShape);
      
      // Try to update the component's props if it has a method
      if (window.updateQuadrilateralShape) {
        window.updateQuadrilateralShape(targetQuadId, newShape);
      }
    }

    // Dispatch custom event for other components to listen
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('shapeChanged', {
        detail: {
          shape: newShape,
          targetId: targetQuadId
        }
      }));
    }

    console.log(`📐 Shape changed to: ${newShape}`);
  }, [targetQuadId]);

  // Calculate container style
  const containerStyle = React.useCallback(() => {
    if (!coordinates || coordinates.length !== 4) {
      return {
        position: 'absolute',
        left: '50%',
        top: '10%',
        transform: 'translate(-50%, 0)',
        zIndex: 1000
      };
    }

    const [x1, y1, x2, y2] = coordinates;
    const left = (x1 / 1600) * 100;
    const top = (y1 / 900) * 100;
    const width = ((x2 - x1) / 1600) * 100;
    const height = ((y2 - y1) / 900) * 100;

    return {
      position: 'absolute',
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      width: `${width.toFixed(2)}%`,
      height: `${height.toFixed(2)}%`,
      zIndex: 1000
    };
  }, [coordinates]);

  // Convert fontSize from gc units to pixels (approximate: 1gc ≈ 1px at 1600px width)
  const fontSizePx = React.useCallback(() => {
    const gcMatch = fontSize.match(/(\d+(?:\.\d+)?)gc/);
    if (gcMatch) {
      const gcValue = parseFloat(gcMatch[1]);
      // Approximate conversion: 1gc ≈ 1px at 1600px viewport width
      return `${gcValue}px`;
    }
    return fontSize;
  }, [fontSize]);

  return React.createElement('div', {
    id: id || `shape-selector-${elementName}-${currentPage}`,
    className: 'shape-selector-component',
    style: containerStyle(),
    'data-element-name': elementName,
    'data-page': currentPage
  }, [
    React.createElement('label', {
      key: 'label',
      style: {
        display: 'block',
        marginBottom: '8px',
        fontSize: fontSizePx(),
        color: color,
        fontWeight: 'bold'
      }
    }, 'Select Shape:'),
    React.createElement('select', {
      key: 'select',
      value: selectedShape,
      onChange: handleChange,
      style: {
        width: '100%',
        padding: '8px 12px',
        fontSize: fontSizePx(),
        color: color,
        backgroundColor: backgroundColor,
        border: '2px solid #333',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif'
      }
    }, shapeOptions.map(option =>
      React.createElement('option', {
        key: option.value,
        value: option.value
      }, option.label)
    ))
  ]);
});

/**
 * Shape Selector Element Configuration
 */
const ShapeSelectorElement = {
  shapeSelector: {
    type: 'shape-selector',
    coordinates: [1050, 50, 1400, 150], // Default position (top-right area)
    zIndex: 1000,
    props: {
      componentType: 'ShapeSelectorComponent',
      targetQuadId: 'page1-quadrilateral-demo',
      defaultShape: 'SQUARE',
      fontSize: '20gc',
      color: '#000000',
      backgroundColor: '#ffffff'
    },
    
    createOptimized: typeof window !== 'undefined' && window.SharedUtilities?.createOptimizedElementFactory('shape-selector', (props, elementId) => {
      return React.createElement(ShapeSelectorComponent, props);
    })
  }
};

// Export for use in elements-registry.js
if (typeof window !== 'undefined') {
  window.ShapeSelectorComponent = {
    ShapeSelectorComponent,
    ShapeSelectorElement
  };
}

console.log('✅ Shape Selector Component loaded successfully');

