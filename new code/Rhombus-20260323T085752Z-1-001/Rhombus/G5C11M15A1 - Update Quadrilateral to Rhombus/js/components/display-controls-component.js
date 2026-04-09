/**
 * Display Controls Component
 * 
 * A component that provides checkboxes to toggle various quadrilateral display properties:
 * - Vertex angle arcs
 * - Vertex angle text
 * - Grid display
 * - Diagonals
 * - Vertex labels
 * - Property panel
 */

/**
 * Display Controls Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - Container position [x1, y1, x2, y2]
 * @param {string} props.targetQuadId - ID of the quadrilateral component to control (default: 'page1-quadrilateral-demo')
 * @param {string} props.fontSize - Font size for labels (default: '16gc')
 * @param {string} props.textColor - Text color (default: '#333333')
 */
const DisplayControlsComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    targetQuadId = 'page1-quadrilateral-demo',
    fontSize = '16gc',
    textColor = '#333333'
  } = props;

  // Initialize global display state if it doesn't exist
  if (typeof window !== 'undefined' && !window.quadDisplayState) {
    window.quadDisplayState = {};
  }

  // Initialize state for this quadrilateral
  if (typeof window !== 'undefined' && !window.quadDisplayState[targetQuadId]) {
    window.quadDisplayState[targetQuadId] = {
      showAngleArcs: true,
      showAngleText: false,
      showGrid: true,
      showDiagonals: true,
      showVertexLabels: true,
      showPropertyPanel: true,
      draggable: true
    };
  }

  const displayState = window.quadDisplayState[targetQuadId];

  // Convert fontSize from gc units to pixels
  const fontSizePx = React.useCallback(() => {
    const gcMatch = fontSize.match(/(\d+(?:\.\d+)?)gc/);
    if (gcMatch) {
      const gcValue = parseFloat(gcMatch[1]);
      return `${gcValue}px`;
    }
    return fontSize;
  }, [fontSize]);

  // State for checkboxes
  const [showAngleArcs, setShowAngleArcs] = React.useState(displayState.showAngleArcs);
  const [showAngleText, setShowAngleText] = React.useState(displayState.showAngleText);
  const [showGrid, setShowGrid] = React.useState(displayState.showGrid);
  const [showDiagonals, setShowDiagonals] = React.useState(displayState.showDiagonals);
  const [showVertexLabels, setShowVertexLabels] = React.useState(displayState.showVertexLabels);
  const [showPropertyPanel, setShowPropertyPanel] = React.useState(displayState.showPropertyPanel);
  const [draggable, setDraggable] = React.useState(displayState.draggable);

  // Update global state and notify quadrilateral
  const updateProperty = React.useCallback((property, value) => {
    if (window.quadDisplayState[targetQuadId]) {
      window.quadDisplayState[targetQuadId][property] = value;
      
      // Dispatch custom event for quadrilateral to listen
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
          detail: {
            quadId: targetQuadId,
            property: property,
            value: value
          }
        }));
      }

      // Also update data attribute on the element
      const quadElement = document.getElementById(targetQuadId);
      if (quadElement) {
        quadElement.setAttribute(`data-${property}`, value);
      }
    }
  }, [targetQuadId]);

  // Handlers for each checkbox
  const handleAngleArcsChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowAngleArcs(value);
    updateProperty('showAngleArcs', value);
  }, [updateProperty]);

  const handleAngleTextChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowAngleText(value);
    updateProperty('showAngleText', value);
  }, [updateProperty]);

  const handleGridChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowGrid(value);
    updateProperty('showGrid', value);
  }, [updateProperty]);

  const handleDiagonalsChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowDiagonals(value);
    updateProperty('showDiagonals', value);
  }, [updateProperty]);

  const handleVertexLabelsChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowVertexLabels(value);
    updateProperty('showVertexLabels', value);
  }, [updateProperty]);

  const handlePropertyPanelChange = React.useCallback((e) => {
    const value = e.target.checked;
    setShowPropertyPanel(value);
    updateProperty('showPropertyPanel', value);
  }, [updateProperty]);

  const handleDraggableChange = React.useCallback((e) => {
    const value = e.target.checked;
    setDraggable(value);
    updateProperty('draggable', value);
  }, [updateProperty]);

  // Calculate container style
  const containerStyle = React.useCallback(() => {
    if (!coordinates || coordinates.length !== 4) {
      return {
        position: 'absolute',
        left: '50%',
        top: '20%',
        transform: 'translate(-50%, 0)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        overflowY: 'auto',
        overflowX: 'hidden',
        pointerEvents: 'auto'
      };
    }

    const [x1, y1, x2, y2] = coordinates;
    const left = (x1 / 1600) * 100;
    const top = (y1 / 900) * 100;
    const width = ((x2 - x1) / 1600) * 100;
    const height = ((y2 - y1) / 900) * 100;
    
    // Calculate height in pixels for better scrolling
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    const heightPx = ((y2 - y1) / 900) * viewportHeight;

    return {
      position: 'absolute',
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      width: `${width.toFixed(2)}%`,
      height: `${height.toFixed(2)}%`,
      maxHeight: `${heightPx}px`,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      overflowY: 'auto',
      overflowX: 'hidden',
      pointerEvents: 'auto',
      boxSizing: 'border-box',
      WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
    };
  }, [coordinates]);

  // Checkbox style
  const checkboxStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginRight: '8px',
    pointerEvents: 'auto',
    zIndex: 1001,
    position: 'relative'
  };

  const labelStyle = {
    fontSize: fontSizePx(),
    color: textColor,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    pointerEvents: 'auto',
    position: 'relative',
    zIndex: 1001
  };

  return React.createElement('div', {
    id: id || `display-controls-${elementName}-${currentPage}`,
    className: 'display-controls-component',
    style: containerStyle(),
    'data-element-name': elementName,
    'data-page': currentPage
  }, [
    React.createElement('div', {
      key: 'title',
      style: {
        fontSize: fontSizePx(),
        fontWeight: 'bold',
        marginBottom: '12px',
        color: textColor,
        borderBottom: '2px solid #ddd',
        paddingBottom: '8px'
      }
    }, 'Display Controls:'),
    
    React.createElement('label', {
      key: 'angle-arcs',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showAngleArcs,
        onChange: handleAngleArcsChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Vertex Angle Arcs'
    ]),
    
    React.createElement('label', {
      key: 'angle-text',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showAngleText,
        onChange: handleAngleTextChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Vertex Angle Text'
    ]),
    
    React.createElement('label', {
      key: 'grid',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showGrid,
        onChange: handleGridChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Grid'
    ]),
    
    React.createElement('label', {
      key: 'diagonals',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showDiagonals,
        onChange: handleDiagonalsChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Diagonals'
    ]),
    
    React.createElement('label', {
      key: 'vertex-labels',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showVertexLabels,
        onChange: handleVertexLabelsChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Vertex Labels (A, B, C, D)'
    ]),
    
    React.createElement('label', {
      key: 'property-panel',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: showPropertyPanel,
        onChange: handlePropertyPanelChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Show Property Panel'
    ]),
    
    React.createElement('label', {
      key: 'draggable',
      style: labelStyle
    }, [
      React.createElement('input', {
        key: 'checkbox',
        type: 'checkbox',
        checked: draggable,
        onChange: handleDraggableChange,
        onClick: (e) => e.stopPropagation(),
        style: checkboxStyle
      }),
      'Enable Vertex Dragging'
    ])
  ]);
});

/**
 * Display Controls Element Configuration
 */
const DisplayControlsElement = {
  displayControls: {
    type: 'display-controls',
    coordinates: [1050, 550, 1400, 800], // Position below animation controls
    zIndex: 1000,
    props: {
      componentType: 'DisplayControlsComponent',
      targetQuadId: 'page1-quadrilateral-demo',
      fontSize: '16gc',
      textColor: '#333333'
    },
    
    createOptimized: typeof window !== 'undefined' && window.SharedUtilities?.createOptimizedElementFactory('display-controls', (props, elementId) => {
      return React.createElement(DisplayControlsComponent, props);
    })
  }
};

// Export for use in elements-registry.js
if (typeof window !== 'undefined') {
  window.DisplayControlsComponent = {
    DisplayControlsComponent,
    DisplayControlsElement
  };
}

console.log('✅ Display Controls Component loaded successfully');

