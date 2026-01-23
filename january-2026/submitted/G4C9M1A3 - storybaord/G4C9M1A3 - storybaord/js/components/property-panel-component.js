/**
 * Property Panel Component
 * 
 * Displays quadrilateral properties with visual indicators and text labels.
 * Shows checkmarks/icons for active properties.
 */

/**
 * PropertyPanel Component
 * @param {Object} props - Component props
 * @param {Object} props.properties - Detected properties object
 * @param {string} props.quadType - Type of quadrilateral (for title)
 * @param {string} props.displayMode - 'panel' or 'overlay'
 * @param {Array<number>} props.coordinates - Position for panel [x1, y1, x2, y2]
 * @param {number} props.zIndex - Z-index for layering
 * @param {string} props.backgroundColor - Background color (default: 'rgba(255, 255, 255, 0.95)')
 * @param {string} props.textColor - Text color (default: '#333')
 * @param {string} props.activeColor - Color for active properties (default: '#4CAF50')
 * @param {string} props.inactiveColor - Color for inactive properties (default: '#999')
 */
const PropertyPanelComponent = React.memo((props) => {
  const {
    properties,
    quadType,
    displayMode = 'panel',
    coordinates,
    zIndex = 200,
    backgroundColor = 'rgba(255, 255, 255, 0.95)',
    textColor = '#333',
    activeColor = '#4CAF50',
    inactiveColor = '#999'
  } = props;

  // Calculate position
  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      position: 'absolute',
      zIndex: zIndex,
      backgroundColor: backgroundColor,
      color: textColor,
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      minWidth: '250px',
      maxWidth: '400px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    };

    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      const [x1, y1, x2, y2] = coordinates;
      const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const left = ((x1 - 1) / gridSystemCols) * 100;
      const top = ((y1 - 1) / gridSystemRows) * 100;
      
      baseStyle.left = `${left.toFixed(2)}%`;
      baseStyle.top = `${top.toFixed(2)}%`;
    } else {
      // Default position
      baseStyle.right = '20px';
      baseStyle.top = '20px';
    }

    return baseStyle;
  }, [coordinates, zIndex, backgroundColor, textColor]);

  // Property definitions with labels
  const propertyDefinitions = React.useMemo(() => {
    if (!properties) return [];

    return [
      {
        key: 'parallelSides',
        label: 'Parallel Sides',
        value: properties.parallelSides,
        display: properties.parallelSides === 'two_pairs' ? 'Two pairs' :
                 properties.parallelSides === 'one_pair' ? 'One pair' : 'None',
        active: properties.parallelSides !== 'none'
      },
      {
        key: 'equalSides',
        label: 'Equal Sides',
        value: properties.equalSides,
        display: properties.equalSides === 'all_four' ? 'All four' :
                 properties.equalSides === 'two_opp_pairs' ? 'Two opposite pairs' :
                 properties.equalSides === 'one_opp_pair' ? 'One opposite pair' :
                 properties.equalSides === 'two_adj_pairs' ? 'Two adjacent pairs' : 'None',
        active: properties.equalSides !== 'none'
      },
      {
        key: 'oppositeAnglesEqual',
        label: 'Opposite Angles Equal',
        value: properties.oppositeAnglesEqual,
        display: properties.oppositeAnglesEqual ? 'Yes' : 'No',
        active: properties.oppositeAnglesEqual === true
      },
      {
        key: 'adjacentAnglesSupplementary',
        label: 'Adjacent Angles Supplementary',
        value: properties.adjacentAnglesSupplementary,
        display: properties.adjacentAnglesSupplementary ? 'Yes' : 'No',
        active: properties.adjacentAnglesSupplementary === true
      },
      {
        key: 'allRightAngles',
        label: 'All Right Angles',
        value: properties.allRightAngles,
        display: properties.allRightAngles ? 'Yes' : 'No',
        active: properties.allRightAngles === true
      },
      {
        key: 'diagonalsEqual',
        label: 'Diagonals Equal',
        value: properties.diagonalsEqual,
        display: properties.diagonalsEqual ? 'Yes' : 'No',
        active: properties.diagonalsEqual === true
      },
      {
        key: 'diagonalsBisecting',
        label: 'Diagonals Bisect Each Other',
        value: properties.diagonalsBisecting,
        display: properties.diagonalsBisecting ? 'Yes' : 'No',
        active: properties.diagonalsBisecting === true
      },
      {
        key: 'diagonalsPerpendicular',
        label: 'Diagonals Perpendicular',
        value: properties.diagonalsPerpendicular,
        display: properties.diagonalsPerpendicular ? 'Yes' : 'No',
        active: properties.diagonalsPerpendicular === true
      },
      {
        key: 'lineSymmetry',
        label: 'Line Symmetry',
        value: properties.lineSymmetry,
        display: properties.lineSymmetry > 0 ? `${properties.lineSymmetry} line${properties.lineSymmetry > 1 ? 's' : ''}` : 'None',
        active: properties.lineSymmetry > 0
      },
      {
        key: 'rotationalSymmetry',
        label: 'Rotational Symmetry',
        value: properties.rotationalSymmetry,
        display: properties.rotationalSymmetry > 1 ? `Order ${properties.rotationalSymmetry}` : 'None',
        active: properties.rotationalSymmetry > 1
      }
    ];
  }, [properties]);

  // Render checkmark or cross icon
  const renderIcon = (active) => {
    const iconStyle = {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      marginRight: '8px',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '16px',
      borderRadius: '50%',
      fontSize: '12px'
    };

    if (active) {
      return React.createElement('span', {
        key: 'icon',
        style: {
          ...iconStyle,
          color: activeColor,
          backgroundColor: `${activeColor}20`,
          border: `2px solid ${activeColor}`
        }
      }, '✓');
    } else {
      return React.createElement('span', {
        key: 'icon',
        style: {
          ...iconStyle,
          color: inactiveColor,
          backgroundColor: `${inactiveColor}10`,
          border: `2px solid ${inactiveColor}`
        }
      }, '×');
    }
  };

  // Render property row
  const renderPropertyRow = (prop) => {
    const rowStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    };

    const labelStyle = {
      flex: '1',
      fontWeight: '500',
      color: prop.active ? textColor : inactiveColor
    };

    const valueStyle = {
      marginLeft: '10px',
      fontWeight: 'bold',
      color: prop.active ? activeColor : inactiveColor
    };

    return React.createElement('div', {
      key: prop.key,
      className: `property-row property-${prop.key}`,
      style: rowStyle
    }, [
      renderIcon(prop.active),
      React.createElement('span', {
        key: 'label',
        style: labelStyle
      }, prop.label),
      React.createElement('span', {
        key: 'value',
        style: valueStyle
      }, prop.display)
    ]);
  };

  // Render title
  const renderTitle = () => {
    const titleStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '2px solid rgba(0,0,0,0.1)',
      color: textColor
    };

    const typeName = quadType ? 
      (window.QuadrilateralConfig?.types[quadType]?.name || quadType) : 
      'Quadrilateral';

    return React.createElement('div', {
      key: 'title',
      className: 'property-panel-title',
      style: titleStyle
    }, typeName + ' Properties');
  };

  // Render angle measurements
  const renderAngleMeasurements = () => {
    if (!properties || !properties.angles) return null;

    const sectionStyle = {
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '2px solid rgba(0,0,0,0.1)'
    };

    const sectionTitleStyle = {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: textColor
    };

    const anglesContainerStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px'
    };

    const angleBoxStyle = {
      padding: '6px',
      backgroundColor: 'rgba(0,0,0,0.03)',
      borderRadius: '4px',
      textAlign: 'center',
      fontSize: '12px'
    };

    return React.createElement('div', {
      key: 'angles',
      className: 'angle-measurements',
      style: sectionStyle
    }, [
      React.createElement('div', {
        key: 'title',
        style: sectionTitleStyle
      }, 'Angle Measurements'),
      React.createElement('div', {
        key: 'angles-grid',
        style: anglesContainerStyle
      }, properties.angles.map((angle, index) => 
        React.createElement('div', {
          key: `angle-${index}`,
          style: angleBoxStyle
        }, `∠${index + 1}: ${Math.round(angle)}°`)
      ))
    ]);
  };

  if (!properties) {
    return null;
  }

  return React.createElement('div', {
    className: 'property-panel-component',
    style: containerStyle,
    'data-display-mode': displayMode
  }, [
    renderTitle(),
    React.createElement('div', {
      key: 'properties',
      className: 'property-list'
    }, propertyDefinitions.map(renderPropertyRow)),
    renderAngleMeasurements()
  ]);
});

/**
 * Visual Property Indicators Component
 * Renders visual indicators directly on the quadrilateral
 */
const VisualPropertyIndicators = React.memo((props) => {
  const {
    vertices,
    properties,
    containerCoordinates,
    gridRows,
    gridCols,
    zIndex = 150,
    color = '#FF6600'
  } = props;

  if (!vertices || !properties || !containerCoordinates) {
    return null;
  }

  const indicators = [];

  // Helper to convert grid to page coordinates
  const gridToPagePercent = (vertex) => {
    const [x1, y1, x2, y2] = containerCoordinates;
    const containerWidth = x2 - x1 + 1;
    const containerHeight = y2 - y1 + 1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    const xPercent = (vertex.col / gridCols) * 100;
    const yPercent = (vertex.row / gridRows) * 100;
    
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = (containerWidth / gridSystemCols) * 100;
    const containerHeightPercent = (containerHeight / gridSystemRows) * 100;
    
    const left = containerLeft + (xPercent / 100) * containerWidthPercent;
    const top = containerTop + (yPercent / 100) * containerHeightPercent;
    
    return { left, top };
  };

  // Render parallel marks on sides
  if (properties.parallelSides !== 'none') {
    // Mark top and bottom if parallel
    if (properties.parallelSides === 'two_pairs' || properties.parallelSides === 'one_pair') {
      const pos1 = gridToPagePercent(vertices[0]);
      const pos2 = gridToPagePercent(vertices[1]);
      const midX = (pos1.left + pos2.left) / 2;
      const midY = (pos1.top + pos2.top) / 2;
      
      indicators.push(
        React.createElement('div', {
          key: 'parallel-top',
          style: {
            position: 'absolute',
            left: `${midX}%`,
            top: `${midY}%`,
            transform: 'translate(-50%, -50%)',
            color: color,
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: zIndex
          }
        }, '≫')
      );
    }
  }

  return React.createElement('div', {
    className: 'visual-property-indicators',
    style: { position: 'absolute', inset: 0, pointerEvents: 'none' }
  }, indicators);
});

// Export components
if (typeof window !== 'undefined') {
  window.PropertyPanelComponent = {
    PropertyPanelComponent,
    VisualPropertyIndicators
  };
}

console.log('✅ Property panel component loaded successfully');

