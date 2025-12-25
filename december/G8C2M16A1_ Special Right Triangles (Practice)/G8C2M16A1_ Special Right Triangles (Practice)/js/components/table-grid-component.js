/**
 * Table Grid Component - React 18 Optimized
 * 
 * This file contains the table grid component for displaying structured data
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Table Grid Component with proper styling and data handling
 */
const TableGridComponent = React.memo((props) => {
  const elementId = React.useId();
  const { 
    position, 
    processedStyles, 
    elementZIndex, 
    tableData = { headers: [], rows: [] },
    borderColor = '#ffffff',
    headerBackgroundColor = '#2a3f5f',
    cellBackgroundColor = 'transparent',
    rowBackgroundColors = [], // Array of colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    columnBackgroundColors = [], // Array of colors for each column [color1, color2, ...] or object {0: color1, 2: color2}
    rowTextColors = [], // Array of text colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    rowOverrides = {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
    textColor = '#ffffff',
    fontSize = '28gc',
    headerFontSize = '32gc',
    padding = '15gc',
    borderRadius = '8gc',
    borderWidth = '2px',
    equalColumnWidths = false, // If true, all columns will have equal width
    equalRowHeights = false // If true, all rows will have equal height
  } = props;
  
  console.log('🔍 TableGridComponent RENDERED!');
  console.log('🔍 TableGridComponent props:', props);
  console.log('🔍 TableGridComponent tableData:', tableData);
  console.log('🔍 TableGridComponent position:', position);
  console.log('🔍 TableGridComponent processedStyles:', processedStyles);
  
  // Process gc properties
  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  let processedHeaderFontSize = headerFontSize;
  if (headerFontSize && headerFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderFontSize = window.GridCellFontUtils.processGcProperty(headerFontSize, 'fontSize');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  // Extract headers and rows from tableData
  const headers = tableData.headers || [];
  const rows = tableData.rows || [];
  
  // Helper function to get row background color
  const getRowBackgroundColor = (rowIndex) => {
    if (Array.isArray(rowBackgroundColors) && rowBackgroundColors.length > 0) {
      // If it's an array, use the index
      return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    } else if (typeof rowBackgroundColors === 'object' && rowBackgroundColors !== null) {
      // If it's an object, use it as a map
      return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    }
    return cellBackgroundColor;
  };
  
  // Helper function to get column background color
  const getColumnBackgroundColor = (columnIndex) => {
    if (Array.isArray(columnBackgroundColors) && columnBackgroundColors.length > 0) {
      // If it's an array, use the index
      return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    } else if (typeof columnBackgroundColors === 'object' && columnBackgroundColors !== null) {
      // If it's an object, use it as a map
      return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    }
    return cellBackgroundColor;
  };
  
  // Helper function to get row text color
  const getRowTextColor = (rowIndex) => {
    // Check rowOverrides first (takes precedence)
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].color !== undefined) {
      return rowOverrides[rowIndex].color;
    }
    
    if (Array.isArray(rowTextColors) && rowTextColors.length > 0) {
      // If it's an array, use the index
      return rowTextColors[rowIndex] || textColor;
    } else if (typeof rowTextColors === 'object' && rowTextColors !== null) {
      // If it's an object, use it as a map
      return rowTextColors[rowIndex] || textColor;
    }
    return textColor;
  };
  
  // Helper function to get row font size (including rowOverrides)
  const getRowFontSize = (rowIndex) => {
    // Check rowOverrides first (takes precedence)
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].fontSize !== undefined) {
      const overrideSize = rowOverrides[rowIndex].fontSize;
      // Process gc units if needed
      if (overrideSize && overrideSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        return window.GridCellFontUtils.processGcProperty(overrideSize, 'fontSize');
      }
      return overrideSize;
    }
    return processedFontSize;
  };
  
  // Helper function to get row font weight (including rowOverrides)
  const getRowFontWeight = (rowIndex) => {
    // Check rowOverrides first (takes precedence)
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].fontWeight !== undefined) {
      return rowOverrides[rowIndex].fontWeight;
    }
    return 'normal';
  };
  
  // Helper function to get cell background color (row takes precedence over column, rowOverrides take precedence over all)
  const getCellBackgroundColor = (rowIndex, columnIndex) => {
    // Check rowOverrides first (takes highest precedence)
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].backgroundColor !== undefined) {
      return rowOverrides[rowIndex].backgroundColor;
    }
    
    const rowColor = getRowBackgroundColor(rowIndex);
    const columnColor = getColumnBackgroundColor(columnIndex);
    
    // If row color is specified and not the default, use it
    if (rowColor !== cellBackgroundColor) {
      return rowColor;
    }
    // Otherwise use column color if specified
    if (columnColor !== cellBackgroundColor) {
      return columnColor;
    }
    // Fall back to default cell background color
    return cellBackgroundColor;
  };
  
  // Calculate equal column width percentage if needed
  const columnCount = headers.length;
  const equalColumnWidth = equalColumnWidths && columnCount > 0 ? `${100 / columnCount}%` : null;
  
  // Calculate equal row height if needed
  const rowCount = rows.length;
  const equalRowHeight = equalRowHeights && rowCount > 0 ? `${100 / (rowCount + 1)}%` : null; // +1 for header row
  
  // Create header row
  const headerRowStyle = {};
  if (equalRowHeight) {
    headerRowStyle.height = equalRowHeight;
  }
  
  // Create header cells
  const headerCells = headers.map((header, index) => {
    // Check if column has a specific background color for header
    const headerBgColor = getColumnBackgroundColor(index);
    // Use column color if specified, otherwise use headerBackgroundColor
    const finalHeaderBgColor = (headerBgColor !== cellBackgroundColor) ? headerBgColor : headerBackgroundColor;
    
    const headerStyle = {
      backgroundColor: finalHeaderBgColor,
      color: textColor,
      fontSize: processedHeaderFontSize,
      fontWeight: 'bold',
      padding: processedPadding,
      border: `${borderWidth} solid ${borderColor}`,
      textAlign: 'center',
      boxSizing: 'border-box',
      overflow: 'hidden',
      wordBreak: 'break-word'
    };
    
    // Add equal width if enabled
    if (equalColumnWidth) {
      headerStyle.width = equalColumnWidth;
    }
    
    return React.createElement('th', {
      key: `header-${index}`,
      style: headerStyle
    }, header);
  });

  // Create data rows
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = {};
    if (equalRowHeight) {
      rowStyle.height = equalRowHeight;
    }
    
    return React.createElement('tr', {
      key: `row-${rowIndex}`,
      style: rowStyle
    }, row.map((cell, cellIndex) => {
      const cellBgColor = getCellBackgroundColor(rowIndex, cellIndex);
      const cellTextColor = getRowTextColor(rowIndex);
      const cellFontSize = getRowFontSize(rowIndex);
      const cellFontWeight = getRowFontWeight(rowIndex);
      
      const cellStyle = {
        backgroundColor: cellBgColor,
        color: cellTextColor,
        fontSize: cellFontSize,
        fontWeight: cellFontWeight,
        padding: processedPadding,
        border: `${borderWidth} solid ${borderColor}`,
        textAlign: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        wordBreak: 'break-word'
      };
      
      // Add equal width if enabled
      if (equalColumnWidth) {
        cellStyle.width = equalColumnWidth;
      }
      
      return React.createElement('td', {
        key: `cell-${rowIndex}-${cellIndex}`,
        style: cellStyle
      }, cell);
    }));
  });

  // Debug position information
  console.log('🔍 TableGridComponent position object:', position);
  console.log('🔍 TableGridComponent position.css:', position?.css);
  console.log('🔍 TableGridComponent position.css.left:', position?.css?.left);
  console.log('🔍 TableGridComponent position.css.top:', position?.css?.top);
  console.log('🔍 TableGridComponent position.css.width:', position?.css?.width);
  console.log('🔍 TableGridComponent position.css.height:', position?.css?.height);
  console.log('🔍 TableGridComponent elementZIndex:', elementZIndex);
  console.log('🔍 TableGridComponent processedStyles:', processedStyles);
  
  // Create the container div with proper positioning (matching QuestionComponent pattern)
  const containerStyle = {
    // Apply grid positioning from the element renderer
    ...(position?.css || {}),
    // Apply processed styles (already processed by math-applet.js with gc units)
    ...(processedStyles || {}),
    // Apply z-index
    zIndex: elementZIndex
  };
  
  console.log('🔍 TableGridComponent containerStyle:', containerStyle);
  
  return React.createElement('div', {
    id: elementId,
    style: containerStyle
  }, 
    React.createElement('table', {
      style: {
        width: '100%',
        height: '100%',
        borderCollapse: 'collapse',
        borderRadius: processedBorderRadius,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        tableLayout: (equalColumnWidths || equalRowHeights) ? 'fixed' : 'auto'
      }
    }, [
      // Table header
      React.createElement('thead', {
        key: 'table-header'
      }, 
        React.createElement('tr', {
          key: 'header-row',
          style: headerRowStyle
        }, headerCells)
      ),
      // Table body
      React.createElement('tbody', {
        key: 'table-body'
      }, dataRows)
    ])
  );
});

// Table Grid Element Configuration
const TableGridElement = {
  tableGrid: {
    type: 'table-grid',
    coordinates: [400, 250, 1200, 450],
    zIndex: 'var(--z-content)',
    props: {
      tableData: {
        headers: ["Ride", "Number of Visitors"],
        rows: [
          ["Roller coaster", "24"],
          ["Ferris wheel", "…"],
          ["Merry-go-round", "18"],
          ["Haunted house", "…"]
        ]
      },
      borderColor: '#ffffff',
      headerBackgroundColor: '#2a3f5f',
      cellBackgroundColor: 'transparent',
      rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
      columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
      rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
      rowOverrides: {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
      textColor: '#ffffff',
      fontSize: '28gc',
      headerFontSize: '32gc',
      padding: '15gc',
      borderRadius: '8gc',
      borderWidth: '2px'
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('table-grid', (props, elementId) => {
      return React.createElement(TableGridComponent, props);
    })
  }
};

// Export component and configuration
window.TableGridComponent = {
  TableGridComponent,
  TableGridElement
};

console.log('✅ Table Grid component loaded successfully');
console.log('✅ TableGridComponent exported:', window.TableGridComponent);
console.log('✅ TableGridComponent.TableGridComponent:', window.TableGridComponent?.TableGridComponent);
