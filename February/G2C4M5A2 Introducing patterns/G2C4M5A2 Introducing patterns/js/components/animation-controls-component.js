/**
 * Animation Controls Component
 * 
 * A component that provides buttons to trigger quadrilateral animations:
 * - Equal angles
 * - Supplementary angles
 * - Equal adjacent sides
 * - Equal opposite sides
 * - Parallel lines
 * - Equal diagonals
 * - Diagonal bisection
 * - Perpendicular bisection
 * - Show Protractor
 * - Show Ruler
 * - Reset Screen (stops all animations, removes protractors, hides ruler)
 */

/**
 * Animation Controls Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - Container position [x1, y1, x2, y2]
 * @param {string} props.targetQuadId - ID of the quadrilateral component to control (default: 'page1-quadrilateral-demo')
 * @param {string} props.fontSize - Font size for buttons (default: '18gc')
 * @param {string} props.buttonColor - Button background color (default: '#4CAF50')
 * @param {string} props.buttonTextColor - Button text color (default: '#ffffff')
 */
const AnimationControlsComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    targetQuadId = 'page1-quadrilateral-demo',
    fontSize = '18gc',
    buttonColor = '#4CAF50',
    buttonTextColor = '#ffffff'
  } = props;

  // Drag state
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const dragStartOffset = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef(null);

  // Convert fontSize from gc units to pixels
  const fontSizePx = React.useCallback(() => {
    const gcMatch = fontSize.match(/(\d+(?:\.\d+)?)gc/);
    if (gcMatch) {
      const gcValue = parseFloat(gcMatch[1]);
      return `${gcValue}px`;
    }
    return fontSize;
  }, [fontSize]);

  // Handle drag start (on title bar)
  const handleDragStart = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    dragStartOffset.current = { ...dragOffset };
    setIsDragging(true);
  }, [dragOffset]);

  // Set up global mouse event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth || 1600;
        const viewportHeight = window.innerHeight || 900;
        
        // Calculate new position in viewport coordinates
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;
        
        // Get base position from coordinates
        let baseX, baseY;
        if (!coordinates || coordinates.length !== 4) {
          baseX = (viewportWidth * 0.5) - (rect.width / 2);
          baseY = viewportHeight * 0.15;
        } else {
          baseX = (coordinates[0] / 1600) * viewportWidth;
          baseY = (coordinates[1] / 900) * viewportHeight;
        }
        
        // Calculate offset from base position
        const offsetX = newX - baseX;
        const offsetY = newY - baseY;
        
        setDragOffset({
          x: (offsetX / viewportWidth) * 100,
          y: (offsetY / viewportHeight) * 100
        });
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, coordinates]);

  // Get quadrilateral element and its properties
  const getQuadElement = React.useCallback(() => {
    return document.getElementById(targetQuadId);
  }, [targetQuadId]);

  // Get analyzed properties from the quadrilateral
  const getQuadProperties = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement) return null;
    
    // Try to get properties from the element's data or query the property panel
    // For now, we'll trigger animations and let the quadrilateral handle validation
    return null;
  }, [getQuadElement]);

  // Trigger equal angles animation (opposite angles)
  const handleEqualAngles = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateAngleEquality) {
      console.warn('Quadrilateral element or animation method not found');
      return;
    }
    
    // Animate angle A to angle C (opposite angles)
    // If that doesn't work, try B to D
    try {
      quadElement.animateAngleEquality(0, 2); // A to C
    } catch (error) {
      console.error('Error animating equal angles:', error);
      try {
        quadElement.animateAngleEquality(1, 3); // B to D
      } catch (e) {
        console.error('Error animating equal angles (B to D):', e);
      }
    }
  }, [getQuadElement]);

  // Trigger supplementary angles animation (adjacent angles that sum to 180°)
  const handleSupplementaryAngles = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateAngleSum) {
      console.warn('Quadrilateral element or angle sum animation method not found');
      return;
    }
    
    // Animate adjacent angles A and B (they should sum to 180°)
    try {
      quadElement.animateAngleSum(0, 1); // A and B
    } catch (error) {
      console.error('Error animating supplementary angles:', error);
    }
  }, [getQuadElement]);

  // Trigger equal adjacent sides animation
  const handleEqualAdjacentSides = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateSideEquality) {
      console.warn('Quadrilateral element or side equality animation method not found');
      return;
    }
    
    // Animate sides around vertex A (sides AB and AD)
    try {
      quadElement.animateSideEquality(0); // Common vertex A
    } catch (error) {
      console.error('Error animating equal adjacent sides:', error);
      // Try vertex B if A doesn't work
      try {
        quadElement.animateSideEquality(1); // Common vertex B
      } catch (e) {
        console.error('Error animating equal adjacent sides (vertex B):', e);
      }
    }
  }, [getQuadElement]);

  // Trigger equal opposite sides animation
  const handleEqualOppositeSides = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateOppositeSideEquality) {
      console.warn('Quadrilateral element or opposite side equality animation method not found');
      return;
    }
    
    // Animate opposite sides (pair 0: AB and CD)
    try {
      quadElement.animateOppositeSideEquality(0); // AB and CD
    } catch (error) {
      console.error('Error animating equal opposite sides:', error);
      // Try pair 1 if pair 0 doesn't work
      try {
        quadElement.animateOppositeSideEquality(1); // BC and DA
      } catch (e) {
        console.error('Error animating equal opposite sides (pair 1):', e);
      }
    }
  }, [getQuadElement]);

  // Trigger parallel lines animation
  const handleParallelLines = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateParallelLines) {
      console.warn('Quadrilateral element or parallel lines animation method not found');
      return;
    }
    
    // Animate parallel sides (pair 0: AB and CD)
    try {
      quadElement.animateParallelLines(0); // AB and CD
    } catch (error) {
      console.error('Error animating parallel lines:', error);
      // Try pair 1 if pair 0 doesn't work
      try {
        quadElement.animateParallelLines(1); // BC and DA
      } catch (e) {
        console.error('Error animating parallel lines (pair 1):', e);
      }
    }
  }, [getQuadElement]);

  // Trigger diagonal equality animation
  const handleDiagonalEquality = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateDiagonalEquality) {
      console.warn('Quadrilateral element or diagonal equality animation method not found');
      return;
    }
    
    try {
      quadElement.animateDiagonalEquality();
    } catch (error) {
      console.error('Error animating diagonal equality:', error);
    }
  }, [getQuadElement]);

  // Trigger diagonal bisection animation
  const handleDiagonalBisection = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateDiagonalBisection) {
      console.warn('Quadrilateral element or diagonal bisection animation method not found');
      return;
    }
    
    try {
      quadElement.animateDiagonalBisection();
    } catch (error) {
      console.error('Error animating diagonal bisection:', error);
    }
  }, [getQuadElement]);

  // Trigger diagonal perpendicular bisection animation
  const handleDiagonalPerpendicularBisection = React.useCallback(() => {
    const quadElement = getQuadElement();
    if (!quadElement || !quadElement.animateDiagonalPerpendicularBisection) {
      console.warn('Quadrilateral element or diagonal perpendicular bisection animation method not found');
      return;
    }
    
    try {
      quadElement.animateDiagonalPerpendicularBisection();
    } catch (error) {
      console.error('Error animating diagonal perpendicular bisection:', error);
    }
  }, [getQuadElement]);

  // Show protractor
  const handleShowProtractor = React.useCallback(() => {
    // Spawn protractor at center of viewport
    if (typeof window !== 'undefined' && window.spawnProtractorAtVertex) {
      const viewportWidth = window.innerWidth || 1600;
      const viewportHeight = window.innerHeight || 900;
      const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      // Convert viewport center to grid row/col
      const gridRow = Math.round((viewportHeight / 2 / gridSystemRows) * 10);
      const gridCol = Math.round((viewportWidth / 2 / gridSystemCols) * 10);
      
      try {
        window.spawnProtractorAtVertex(
          { row: gridRow, col: gridCol },
          {
            protractorType: 'semicircular',
            radius: '150gc',
            mode: 'interactive',
            isDraggable: true,
            isRotatable: true,
            isProtractorRotatable: true,
            showProtractorRotationHandle: true,
            measurementArm: {
              show: true,
              color: '#FF0000',
              armStartDeg: 0,
              armExtendable: true
            }
          }
        );
        console.log('✅ Protractor spawned at center');
      } catch (error) {
        console.error('Error spawning protractor:', error);
      }
    } else {
      console.warn('Protractor spawn function not available. Make sure protractor-manager.js is loaded.');
    }
  }, []);

  // Helper function to find ruler element
  const findRulerElement = React.useCallback(() => {
    const rulerId = 'page1-ruler-metric';
    
    // Try direct ID lookup first
    let rulerElement = document.getElementById(rulerId);
    if (rulerElement) return rulerElement;
    
    // Try finding by data-draggable-id (ruler might be wrapped in draggable)
    const rulerByDraggableId = document.querySelector(`[data-draggable-id="${rulerId}"]`);
    if (rulerByDraggableId) return rulerByDraggableId;
    
    // Try finding by data-element-name (ruler might be wrapped in draggable)
    const rulerByName = document.querySelector(`[data-element-name="ruler-metric"]`);
    if (rulerByName) {
      // Check if this element or a parent/child has the ID
      const parentWithId = rulerByName.closest(`#${rulerId}`);
      const childWithId = rulerByName.querySelector(`#${rulerId}`);
      if (parentWithId) return parentWithId;
      if (childWithId) return childWithId;
      // If no ID found, return the element itself (might be draggable wrapper)
      return rulerByName;
    }
    
    // Try finding by data-ruler-type as fallback
    const rulersByType = document.querySelectorAll('[data-ruler-type]');
    if (rulersByType.length > 0) {
      // Return the first one found (assuming there's only one on page 1)
      return rulersByType[0];
    }
    
    return null;
  }, []);

  // Show ruler
  const handleShowRuler = React.useCallback(() => {
    const rulerElement = findRulerElement();
    
    if (rulerElement) {
      // Show the ruler element
      rulerElement.style.display = 'block';
      rulerElement.style.visibility = 'visible';
      console.log('✅ Ruler shown');
    } else {
      console.log('ℹ️ Ruler element not found. Make sure it exists in PageConfig with id "page1-ruler-metric".');
    }
  }, [findRulerElement]);

  // Reset screen - stop all animations, remove tools, hide ruler
  const handleReset = React.useCallback(() => {
    const quadElement = getQuadElement();
    
    // Stop all animations on the quadrilateral
    if (quadElement) {
      try {
        if (quadElement.stopAngleEqualityAnimation) quadElement.stopAngleEqualityAnimation();
        if (quadElement.stopAngleSumAnimation) quadElement.stopAngleSumAnimation();
        if (quadElement.stopSideEqualityAnimation) quadElement.stopSideEqualityAnimation();
        if (quadElement.stopOppositeSideAnimation) quadElement.stopOppositeSideAnimation();
        if (quadElement.stopParallelLinesAnimation) quadElement.stopParallelLinesAnimation();
        if (quadElement.stopDiagonalEqualityAnimation) quadElement.stopDiagonalEqualityAnimation();
        if (quadElement.stopDiagonalBisectionAnimation) quadElement.stopDiagonalBisectionAnimation();
        if (quadElement.stopDiagonalPerpendicularAnimation) quadElement.stopDiagonalPerpendicularAnimation();
        console.log('✅ All animations stopped');
      } catch (error) {
        console.error('Error stopping animations:', error);
      }
    }
    
    // Remove all protractors
    if (typeof window !== 'undefined' && window.removeAllProtractors) {
      try {
        window.removeAllProtractors();
        console.log('✅ All protractors removed');
      } catch (error) {
        console.error('Error removing protractors:', error);
      }
    }
    
    // Hide the ruler
    const rulerElement = findRulerElement();
    
    if (rulerElement) {
      rulerElement.style.display = 'none';
      rulerElement.style.visibility = 'hidden';
      console.log('✅ Ruler hidden');
    }
    
    console.log('🔄 Screen reset complete');
  }, [getQuadElement, findRulerElement]);

  // Calculate container style
  const containerStyle = React.useCallback(() => {
    let baseStyle = {};
    let baseTransform = '';
    
    if (!coordinates || coordinates.length !== 4) {
      baseStyle = {
        position: 'absolute',
        left: '50%',
        top: '15%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      };
      baseTransform = 'translate(-50%, 0)';
    } else {
      const [x1, y1, x2, y2] = coordinates;
      const left = (x1 / 1600) * 100;
      const top = (y1 / 900) * 100;
      const width = ((x2 - x1) / 1600) * 100;
      const height = ((y2 - y1) / 900) * 100;

      baseStyle = {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`,
        height: `${height.toFixed(2)}%`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      };
    }
    
    // Apply drag offset using transform
    if (dragOffset.x !== 0 || dragOffset.y !== 0) {
      const viewportWidth = window.innerWidth || 1600;
      const viewportHeight = window.innerHeight || 900;
      const offsetXPx = (dragOffset.x / 100) * viewportWidth;
      const offsetYPx = (dragOffset.y / 100) * viewportHeight;
      
      if (baseTransform) {
        baseStyle.transform = `${baseTransform} translate(${offsetXPx}px, ${offsetYPx}px)`;
      } else {
        baseStyle.transform = `translate(${offsetXPx}px, ${offsetYPx}px)`;
      }
    } else if (baseTransform) {
      baseStyle.transform = baseTransform;
    }
    
    // Add user-select none when dragging
    if (isDragging) {
      baseStyle.userSelect = 'none';
      baseStyle.cursor = 'grabbing';
    }
    
    return baseStyle;
  }, [coordinates, dragOffset, isDragging]);

  // Button style
  const buttonStyle = {
    padding: '12px 20px',
    fontSize: fontSizePx(),
    color: buttonTextColor,
    backgroundColor: buttonColor,
    border: '2px solid #333',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336', // Red color for reset button
    marginTop: '6px',
    borderTop: '2px solid #d32f2f'
  };

  const resetButtonHoverStyle = {
    backgroundColor: '#d32f2f',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  };

  return React.createElement('div', {
    ref: containerRef,
    id: id || `animation-controls-${elementName}-${currentPage}`,
    className: 'animation-controls-component',
    style: containerStyle(),
    'data-element-name': elementName,
    'data-page': currentPage
  }, [
    React.createElement('div', {
      key: 'title',
      onMouseDown: handleDragStart,
      style: {
        fontSize: fontSizePx(),
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#333',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        padding: '4px 8px',
        backgroundColor: isDragging ? '#f0f0f0' : 'transparent',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease'
      }
    }, 'Animation Controls:'),
    React.createElement('button', {
      key: 'equal-angles',
      onClick: handleEqualAngles,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Equal Angles'),
    React.createElement('button', {
      key: 'supplementary-angles',
      onClick: handleSupplementaryAngles,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Supplementary Angles'),
    React.createElement('button', {
      key: 'equal-adjacent-sides',
      onClick: handleEqualAdjacentSides,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Equal Adjacent Sides'),
    React.createElement('button', {
      key: 'equal-opposite-sides',
      onClick: handleEqualOppositeSides,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Equal Opposite Sides'),
    React.createElement('button', {
      key: 'parallel-lines',
      onClick: handleParallelLines,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Parallel Lines'),
    React.createElement('button', {
      key: 'diagonal-equality',
      onClick: handleDiagonalEquality,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Equal Diagonals'),
    React.createElement('button', {
      key: 'diagonal-bisection',
      onClick: handleDiagonalBisection,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Diagonal Bisection'),
    React.createElement('button', {
      key: 'diagonal-perpendicular',
      onClick: handleDiagonalPerpendicularBisection,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Perpendicular Bisection'),
    React.createElement('button', {
      key: 'show-protractor',
      onClick: handleShowProtractor,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Protractor'),
    React.createElement('button', {
      key: 'show-ruler',
      onClick: handleShowRuler,
      onMouseDown: (e) => e.stopPropagation(),
      style: buttonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, buttonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = buttonColor;
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Show Ruler'),
    React.createElement('button', {
      key: 'reset',
      onClick: handleReset,
      onMouseDown: (e) => e.stopPropagation(),
      style: resetButtonStyle,
      onMouseEnter: (e) => {
        Object.assign(e.target.style, resetButtonHoverStyle);
      },
      onMouseLeave: (e) => {
        e.target.style.backgroundColor = '#f44336';
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    }, 'Reset Screen')
  ]);
});

/**
 * Animation Controls Element Configuration
 */
const AnimationControlsElement = {
  animationControls: {
    type: 'animation-controls',
    coordinates: [1050, 200, 1400, 450], // Position below shape selector
    zIndex: 1000,
    props: {
      componentType: 'AnimationControlsComponent',
      targetQuadId: 'page1-quadrilateral-demo',
      fontSize: '18gc',
      buttonColor: '#4CAF50',
      buttonTextColor: '#ffffff'
    },
    
    createOptimized: typeof window !== 'undefined' && window.SharedUtilities?.createOptimizedElementFactory('animation-controls', (props, elementId) => {
      return React.createElement(AnimationControlsComponent, props);
    })
  }
};

// Export for use in elements-registry.js
if (typeof window !== 'undefined') {
  window.AnimationControlsComponent = {
    AnimationControlsComponent,
    AnimationControlsElement
  };
}

console.log('✅ Animation Controls Component loaded successfully');

