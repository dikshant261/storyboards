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
    elementName, // Component name/id from PageConfig (e.g., "page2-map-table") 
    tableData = { headers: [], rows: [] },
    borderColor = '#ffffff',
    headerBackgroundColor = '#2a3f5f',
    headerTextColor = null, // If null, uses textColor
    cellBackgroundColor = 'transparent',
    rowBackgroundColors = [], // Array of colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    columnBackgroundColors = [], // Array of colors for each column [color1, color2, ...] or object {0: color1, 2: color2}
    dataRowBackgroundColors = [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
    dataColumnBackgroundColors = [], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
    rowTextColors = [], // Array of text colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    rowOverrides = {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
    textColor = '#ffffff',
    fontSize = '28gc',
    headerFontSize = '32gc',
    padding = '15gc',
    borderRadius = '8gc',
    borderWidth = '2px',
    equalColumnWidths = false, // If true, all columns will have equal width
    columnWidths = [], // Array of column widths: ['30%', '70%'] - overrides equalColumnWidths
    equalRowHeights = false, // If true, all rows will have equal height
    cellHeight = null, // Fixed height for all cells (e.g., '80gc' or '60px') - prevents cells from resizing when content changes
    rowGap = '0gc', // Gap between rows (in gc units)
    columnGap = '0gc', // Gap between columns (in gc units)
    cellBorderRadius = '0gc', // Border radius for individual cells (in gc units)
    onCellUpdate, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
    blinkBgCells = [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
    blinkBgRows = [], // Array of row indices to blink background: [0, 1] (data rows only)
    blinkBgColumns = [], // Array of column indices to blink background: [0, 1]
    blinkBorderCells = [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
    blinkBorderRows = [], // Array of row indices to blink border: [0, 1] (data rows only)
    blinkBorderColumns = [], // Array of column indices to blink border: [0, 1]
    cellModes = {} // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
  } = props;
  
  // State for dynamic cell overrides (text, bg, font color, etc.)
  const [cellOverrides, setCellOverrides] = React.useState({});
  
  // State for dynamic cell modes (merged with prop cellModes)
  const [dynamicCellModes, setDynamicCellModes] = React.useState({});
  
  // Get component ID for unique cell IDs (use elementName from PageConfig, fallback to props.id or elementId)
  const componentId = elementName || props.id || elementId;
  
  // Reset cell overrides when tableData changes (page navigation)
  React.useEffect(() => {
    console.log('📊 [TableGrid] Table data changed, resetting cell overrides for', componentId);
    setCellOverrides({});
  }, [tableData, componentId]);
  
  // Also reset cell overrides when page changes
  React.useEffect(() => {
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
      
      // Only reset if we're on a different page
      if (newPage !== currentPage) {
        console.log('📊 [TableGrid] Page changed, resetting cell overrides for', componentId);
        setCellOverrides({});
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', handlePageChange);
      return () => {
        window.removeEventListener('pageChanged', handlePageChange);
      };
    }
  }, [componentId]);
  
  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      // Replace LaTeX commands with their symbols
      let finalContent = convertedContent.replace(/\\times/g, '×');
      finalContent = finalContent.replace(/\\cdot/g, '·');
      return finalContent; // Return without the $ delimiters
    });
    
    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });
    
    return result;
  };
  
  // Merge prop cellModes with dynamic cell modes (dynamic takes precedence)
  const mergedCellModes = React.useMemo(() => {
    return { ...cellModes, ...dynamicCellModes };
  }, [cellModes, dynamicCellModes]);
  
  // Expose callback function to parent via window object or callback prop
  React.useEffect(() => {
    // Use the same ID logic as componentId to ensure consistency
    const callbackComponentId = elementName || props.id || elementId;
    const updateCell = (cellKey, updates) => {
      setCellOverrides(prev => ({
        ...prev,
        [cellKey]: {
          ...prev[cellKey],
          ...updates
        }
      }));
    };
    
    // Function to update cell mode by cell ID
    const updateCellMode = (cellId, mode) => {
      setDynamicCellModes(prev => ({
        ...prev,
        [cellId]: mode
      }));
      console.log(`✅ [TableGrid] Updated cell mode: ${cellId} -> ${mode}`);
    };
    
    // Store update function globally for external access
    if (!window.tableGridCallbacks) {
      window.tableGridCallbacks = {};
    }
    window.tableGridCallbacks[callbackComponentId] = updateCell;
    
    // Store cell mode update function globally
    if (!window.tableGridModeCallbacks) {
      window.tableGridModeCallbacks = {};
    }
    window.tableGridModeCallbacks[callbackComponentId] = updateCellMode;
    
    // Also call the onCellUpdate prop if provided
    if (onCellUpdate) {
      window.tableGridCallbacks[callbackComponentId] = (cellKey, updates) => {
        updateCell(cellKey, updates);
        onCellUpdate(cellKey, updates);
      };
    }
    
    return () => {
      // Cleanup on unmount
      if (window.tableGridCallbacks) {
        delete window.tableGridCallbacks[callbackComponentId];
      }
      if (window.tableGridModeCallbacks) {
        delete window.tableGridModeCallbacks[callbackComponentId];
      }
    };
  }, [elementId, elementName, props.id, onCellUpdate]);
  
  // Listen for calculation step changes to update table cells
  React.useEffect(() => {
    const handleStepChange = (event) => {
      const { currentStepIndex, pageNumber, componentId: stepComponentId } = event.detail || {};
      
      console.log('📊 [TableGrid] Received calculationStepChanged event:', {
        currentStepIndex,
        pageNumber,
        stepComponentId,
        thisComponentId: componentId,
        elementName,
        propsId: props.id,
        elementId
      });
      
      // Check if this is page 3, 4, 5, or 6 and the calculation steps component
      if ((pageNumber === 3 || pageNumber === 4 || pageNumber === 5 || pageNumber === 6) && stepComponentId && (stepComponentId.includes('page3-calculation-steps') || stepComponentId.includes('page4-calculation-steps') || stepComponentId.includes('page5-calculation-steps') || stepComponentId.includes('page6-calculation-steps'))) {
        // Check if this is the question table (check elementName which should be 'question-table')
        const isQuestionTable = elementName === 'question-table' || 
                                (elementName && elementName.includes('question-table')) ||
                                (componentId && componentId.includes('question-table')) ||
                                (props.id && (props.id.includes('page3-question-table') || props.id.includes('page4-question-table') || props.id.includes('page5-question-table') || props.id.includes('page6-question-table')));
        
        console.log('📊 [TableGrid] Checking if this is question table:', {
          isQuestionTable,
          elementName,
          componentId,
          propsId: props.id,
          currentStepIndex
        });
        
        if (isQuestionTable) {
          // Handle step 1 (index 1) - update row 1 (step 0 is formula, step 1 is p, q, r values)
          if (currentStepIndex === 1) {
            console.log('📊 [TableGrid] Step 1 revealed, updating table row 1 for', componentId || elementName || props.id);
            // Get table update values from i18n
            const getTableUpdateValue = (pageNum, step, key) => {
              const pageKey = `pages.page${pageNum}.tableUpdates.${step}.${key}`;
              return (typeof i18n !== 'undefined' && i18n.t) 
                ? i18n.t(pageKey, '') 
                : '';
            };
            
            const step1Values = {
              col1: getTableUpdateValue(pageNumber, 'step1', 'col1') || '',
              col2: getTableUpdateValue(pageNumber, 'step1', 'col2') || ''
            };
            setCellOverrides(prev => ({
              ...prev,
              '0-0': {
                ...prev['0-0'],
                text: step1Values.col1
              },
              '0-1': {
                ...prev['0-1'],
                text: step1Values.col2
              }
            }));
            console.log('📊 [TableGrid] Updated cell overrides for step 1');
          }
          
          // Handle step 2 (index 2) - update rows 2 and 3 (calculation step)
          if (currentStepIndex === 2) {
            console.log('📊 [TableGrid] Step 2 revealed, updating table rows 2 and 3 for', componentId || elementName || props.id);
            // Get step 2 values from i18n
            const getStep2Value = (pageNum, key) => {
              const pageKey = `pages.page${pageNum}.tableUpdates.step2.${key}`;
              return (typeof i18n !== 'undefined' && i18n.t) 
                ? i18n.t(pageKey, '') 
                : '';
            };
            
            const step2Values = {
              r2: getStep2Value(pageNumber, 'r2') || '',
              p2q2: getStep2Value(pageNumber, 'p2q2') || '',
              p2plusq2: getStep2Value(pageNumber, 'p2plusq2') || ''
            };
            setCellOverrides(prev => ({
              ...prev,
              // Row 2 (index 1): col1: r², col2: p², q²
              '1-0': {
                ...prev['1-0'],
                text: step2Values.r2
              },
              '1-1': {
                ...prev['1-1'],
                text: step2Values.p2q2
              },
              // Row 3 (index 2): col1: empty, col2: p²+q²
              '2-0': {
                ...prev['2-0'],
                text: ''
              },
              '2-1': {
                ...prev['2-1'],
                text: step2Values.p2plusq2
              }
            }));
            console.log('📊 [TableGrid] Updated cell overrides for step 2');
          }
          
          // Handle step 3 (index 3) - update row 4 (comparison step)
          if (currentStepIndex === 3) {
            console.log('📊 [TableGrid] Step 3 revealed, updating table row 4 for', componentId || elementName || props.id);
            // Get step 3 value from i18n
            const getStep3Value = (pageNum) => {
              const pageKey = `pages.page${pageNum}.tableUpdates.step3.text`;
              return (typeof i18n !== 'undefined' && i18n.t) 
                ? i18n.t(pageKey, '') 
                : '';
            };
            
            const step3Text = getStep3Value(pageNumber) || '';
            setCellOverrides(prev => ({
              ...prev,
              // Row 4 (index 3): single cell spanning both columns
              '3-0': {
                ...prev['3-0'],
                text: step3Text
              }
            }));
            console.log('📊 [TableGrid] Updated cell overrides for step 3');
          }
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('calculationStepChanged', handleStepChange);
      console.log('📊 [TableGrid] Added calculationStepChanged event listener for', componentId || elementName);
      return () => {
        window.removeEventListener('calculationStepChanged', handleStepChange);
      };
    }
  }, [componentId, elementName, props.id, elementId]);
  
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

  // Process rowGap and columnGap if they contain gc units
  let processedRowGap = rowGap;
  if (rowGap && rowGap.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedRowGap = window.GridCellFontUtils.processGcProperty(rowGap, 'marginTop');
  }

  let processedColumnGap = columnGap;
  if (columnGap && columnGap.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedColumnGap = window.GridCellFontUtils.processGcProperty(columnGap, 'marginLeft');
  }

  // Process cellBorderRadius if it contains gc units
  let processedCellBorderRadius = cellBorderRadius;
  if (cellBorderRadius && cellBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCellBorderRadius = window.GridCellFontUtils.processGcProperty(cellBorderRadius, 'borderRadius');
  }

  // Process cellHeight if it contains gc units
  let processedCellHeight = cellHeight;
  if (cellHeight && typeof cellHeight === 'string' && cellHeight.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCellHeight = window.GridCellFontUtils.processGcProperty(cellHeight, 'height');
  }

  // Determine if we need to use border spacing (when gaps are specified)
  // Check if gaps are non-zero (handles '0gc', '0', 0, null, undefined)
  const rowGapValue = String(rowGap || '0').replace('gc', '').trim();
  const columnGapValue = String(columnGap || '0').replace('gc', '').trim();
  const hasGaps = (parseFloat(rowGapValue) > 0) || (parseFloat(columnGapValue) > 0);
  const borderCollapseValue = hasGaps ? 'separate' : 'collapse';
  const borderSpacingValue = hasGaps ? `${processedColumnGap} ${processedRowGap}` : '0';

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

  // Helper function to get data row background color (excluding header)
  const getDataRowBackgroundColor = (rowIndex) => {
    if (Array.isArray(dataRowBackgroundColors) && dataRowBackgroundColors.length > 0) {
      // If it's an array, use the index
      return dataRowBackgroundColors[rowIndex] || null;
    } else if (typeof dataRowBackgroundColors === 'object' && dataRowBackgroundColors !== null) {
      // If it's an object, use it as a map
      return dataRowBackgroundColors[rowIndex] || null;
    }
    return null;
  };

  // Helper function to get data column background color (excluding header)
  const getDataColumnBackgroundColor = (columnIndex) => {
    if (Array.isArray(dataColumnBackgroundColors) && dataColumnBackgroundColors.length > 0) {
      // If it's an array, use the index
      return dataColumnBackgroundColors[columnIndex] || null;
    } else if (typeof dataColumnBackgroundColors === 'object' && dataColumnBackgroundColors !== null) {
      // If it's an object, use it as a map
      return dataColumnBackgroundColors[columnIndex] || null;
    }
    return null;
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
  const getCellBackgroundColor = (rowIndex, columnIndex, isHeader = false) => {
    // Check rowOverrides first (takes highest precedence)
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].backgroundColor !== undefined) {
      return rowOverrides[rowIndex].backgroundColor;
    }
    
    // For data cells only (not headers), check dataRowBackgroundColors and dataColumnBackgroundColors
    // Whichever is defined first (row checked first) has precedence
    if (!isHeader && rowIndex >= 0) {
      const dataRowColor = getDataRowBackgroundColor(rowIndex);
      const dataColumnColor = getDataColumnBackgroundColor(columnIndex);
      
      // Check row first (row has precedence if both are defined)
      if (dataRowColor !== null) {
        return dataRowColor;
      }
      // Then check column
      if (dataColumnColor !== null) {
        return dataColumnColor;
      }
    }
    
    // Fall back to original row/column background colors (these apply to all cells including headers)
    // For headers, rowIndex will be -1, so getRowBackgroundColor will return default
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
  
  // Helper function to check if a cell should blink background
  const shouldBlinkBg = (rowIndex, columnIndex, isHeader = false) => {
    const cellKey = isHeader ? `header-${columnIndex}` : `${rowIndex}-${columnIndex}`;
    // Check specific cell
    if (blinkBgCells.includes(cellKey)) return true;
    // Check row (data rows only)
    if (!isHeader && blinkBgRows.includes(rowIndex)) return true;
    // Check column
    if (blinkBgColumns.includes(columnIndex)) return true;
    return false;
  };
  
  // Helper function to check if a cell should blink border
  const shouldBlinkBorder = (rowIndex, columnIndex, isHeader = false) => {
    const cellKey = isHeader ? `header-${columnIndex}` : `${rowIndex}-${columnIndex}`;
    // Check specific cell
    if (blinkBorderCells.includes(cellKey)) return true;
    // Check row (data rows only)
    if (!isHeader && blinkBorderRows.includes(rowIndex)) return true;
    // Check column
    if (blinkBorderColumns.includes(columnIndex)) return true;
    return false;
  };
  
  // Helper function to get cell override value
  const getCellOverride = (cellKey, property, defaultValue) => {
    if (cellOverrides[cellKey] && cellOverrides[cellKey][property] !== undefined) {
      return cellOverrides[cellKey][property];
    }
    return defaultValue;
  };
  
  // Helper function to get cell mode based on cell ID
  const getCellMode = (cellId) => {
    if (mergedCellModes && mergedCellModes[cellId]) {
      return mergedCellModes[cellId];
    }
    return 'normal';
  };
  
  // Helper function to get mode-specific styles
  const getModeStyles = (mode) => {
    switch (mode) {
      case 'incorrect':
        return {
          backgroundColor: '#FA8072', // salmon
          border: `${borderWidth} solid #E9967A`, // salmon-dark border
          color: '#FFFFFF' // white
        };
      case 'correct':
        return {
          backgroundColor: '#4CAF50', // green
          border: `${borderWidth} solid #45a049`, // green-dark border
          color: '#FFFFFF' // white
        };
      case 'focus':
        return {
          backgroundColor: '#FFEB3B', // yellow
          border: `${borderWidth} solid #FFFFFF`, // white border
          color: '#000000' // black
        };
      case 'normal':
      default:
        return null; // No override, use default styles
    }
  };
  
  // Calculate equal column width percentage if needed
  const columnCount = headers.length;
  const equalColumnWidth = equalColumnWidths && columnCount > 0 && (!columnWidths || columnWidths.length === 0) ? `${100 / columnCount}%` : null;
  
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
    const cellKey = `header-${index}`;
    // Get cell background color (isHeader=true ensures dataRow/dataColumn colors are not used)
    let headerBgColor = getCellBackgroundColor(-1, index, true); // Use -1 for header row index
    // Check for cell override
    headerBgColor = getCellOverride(cellKey, 'backgroundColor', headerBgColor);
    // Use column color if specified, otherwise use headerBackgroundColor
    const finalHeaderBgColor = (headerBgColor !== cellBackgroundColor) ? headerBgColor : headerBackgroundColor;
    
    // Get cell override values
    const overrideText = getCellOverride(cellKey, 'text', header);
    const defaultHeaderColor = headerTextColor !== null ? headerTextColor : textColor;
    const overrideColor = getCellOverride(cellKey, 'color', defaultHeaderColor);
    const overrideFontSize = getCellOverride(cellKey, 'fontSize', processedHeaderFontSize);
    const overrideFontWeight = getCellOverride(cellKey, 'fontWeight', 'bold');
    
    // Process fontSize if it contains gc units
    let processedOverrideFontSize = overrideFontSize;
    if (overrideFontSize && typeof overrideFontSize === 'string' && overrideFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      processedOverrideFontSize = window.GridCellFontUtils.processGcProperty(overrideFontSize, 'fontSize');
    }
    
    // Get border color override
    const overrideBorderColor = getCellOverride(cellKey, 'borderColor', borderColor);
    
    // Convert LaTeX fractions to HTML
    const convertedHeaderText = convertLatexFractions(overrideText);
    // Check if text contains HTML (fractions or other HTML tags)
    const headerContainsHTML = convertedHeaderText !== overrideText || /<[^>]+>/.test(convertedHeaderText);
    
    const headerStyle = {
      backgroundColor: finalHeaderBgColor,
      color: overrideColor,
      fontSize: processedOverrideFontSize,
      fontWeight: overrideFontWeight,
      padding: processedPadding,
      border: `${borderWidth} solid ${overrideBorderColor}`,
      borderRadius: processedCellBorderRadius,
      textAlign: 'center',
      boxSizing: 'border-box',
      overflow: 'hidden',
      wordBreak: 'break-word'
    };
    
    // Add column width if specified, otherwise use equal width if enabled
    if (columnWidths && columnWidths.length > index) {
      headerStyle.width = columnWidths[index];
    } else if (equalColumnWidth) {
      headerStyle.width = equalColumnWidth;
    }
    
    // Add fixed cell height if specified (prevents cells from resizing when content changes)
    if (processedCellHeight) {
      headerStyle.height = processedCellHeight;
      headerStyle.minHeight = processedCellHeight;
      headerStyle.maxHeight = processedCellHeight;
    }
    
    // Add blink classes
    const className = [
      shouldBlinkBg(-1, index, true) ? 'table-cell-blink-bg' : '',
      shouldBlinkBorder(-1, index, true) ? 'table-cell-blink-border' : ''
    ].filter(Boolean).join(' ') || undefined;
    
    // Generate unique ID: componentId-R0C<columnIndex>
    const cellId = `${componentId}-R0C${index}`;
    
    // Get cell mode and apply mode-specific styles
    const cellMode = getCellMode(cellId);
    const modeStyles = getModeStyles(cellMode);
    
    // Merge mode styles with existing header style
    // Mode styles already include the full border property, so no special handling needed
    const finalHeaderStyle = modeStyles ? { ...headerStyle, ...modeStyles } : headerStyle;
    
    // Add mode-specific class for animations
    const modeClassName = cellMode === 'incorrect' ? 'table-cell-wiggle' : 
                         cellMode === 'focus' ? 'table-cell-focus-blink' : '';
    const finalClassName = [className, modeClassName].filter(Boolean).join(' ') || undefined;
    
    return React.createElement('th', {
      key: `header-${index}`,
      id: cellId,
      style: finalHeaderStyle,
      className: finalClassName,
      ...(headerContainsHTML ? { dangerouslySetInnerHTML: { __html: convertedHeaderText } } : {})
    }, headerContainsHTML ? null : convertedHeaderText);
  });

  // Create data rows
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = {};
    if (equalRowHeight) {
      rowStyle.height = equalRowHeight;
    }
    
    // Check if row has fewer cells than headers - if so, first cell should span all columns
    const shouldSpanColumns = row.length < headers.length && row.length === 1;
    const colspan = shouldSpanColumns ? headers.length : undefined;
    
    return React.createElement('tr', {
      key: `row-${rowIndex}`,
      style: rowStyle
    }, row.map((cell, cellIndex) => {
      const cellKey = `${rowIndex}-${cellIndex}`;
      let cellBgColor = getCellBackgroundColor(rowIndex, cellIndex, false);
      // Check for cell override
      cellBgColor = getCellOverride(cellKey, 'backgroundColor', cellBgColor);
      
      // Get cell override values
      const overrideText = getCellOverride(cellKey, 'text', cell);
      const overrideColor = getCellOverride(cellKey, 'color', getRowTextColor(rowIndex));
      const overrideFontSize = getCellOverride(cellKey, 'fontSize', getRowFontSize(rowIndex));
      const overrideFontWeight = getCellOverride(cellKey, 'fontWeight', getRowFontWeight(rowIndex));
      
      // Process fontSize if it contains gc units
      let processedOverrideFontSize = overrideFontSize;
      if (overrideFontSize && typeof overrideFontSize === 'string' && overrideFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        processedOverrideFontSize = window.GridCellFontUtils.processGcProperty(overrideFontSize, 'fontSize');
      }
      
      // Get border color override
      const overrideBorderColor = getCellOverride(cellKey, 'borderColor', borderColor);
      
      // Convert LaTeX fractions to HTML
      const convertedCellText = convertLatexFractions(overrideText);
      // Check if text contains HTML (fractions or other HTML tags)
      const cellContainsHTML = convertedCellText !== overrideText || /<[^>]+>/.test(convertedCellText);
      
      const cellStyle = {
        backgroundColor: cellBgColor,
        color: overrideColor,
        fontSize: processedOverrideFontSize,
        fontWeight: overrideFontWeight,
        padding: processedPadding,
        border: `${borderWidth} solid ${overrideBorderColor}`,
        borderRadius: processedCellBorderRadius,
        textAlign: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        wordBreak: 'break-word'
      };
      
      // Add column width if specified, otherwise use equal width if enabled
      if (columnWidths && columnWidths.length > cellIndex) {
        cellStyle.width = columnWidths[cellIndex];
      } else if (equalColumnWidth) {
        cellStyle.width = equalColumnWidth;
      }
      
      // Add fixed cell height if specified (prevents cells from resizing when content changes)
      if (processedCellHeight) {
        cellStyle.height = processedCellHeight;
        cellStyle.minHeight = processedCellHeight;
        cellStyle.maxHeight = processedCellHeight;
      }
      
      // Add blink classes
      const className = [
        shouldBlinkBg(rowIndex, cellIndex, false) ? 'table-cell-blink-bg' : '',
        shouldBlinkBorder(rowIndex, cellIndex, false) ? 'table-cell-blink-border' : ''
      ].filter(Boolean).join(' ') || undefined;
      
      // Generate unique ID: componentId-R<rowIndex+1>C<columnIndex>
      // rowIndex+1 because header is row 0, first data row is row 1
      const cellId = `${componentId}-R${rowIndex + 1}C${cellIndex}`;
      
      // Get cell mode and apply mode-specific styles
      const cellMode = getCellMode(cellId);
      const modeStyles = getModeStyles(cellMode);
      
      // Merge mode styles with existing cell style
      // Mode styles already include the full border property, so no special handling needed
      const finalCellStyle = modeStyles ? { ...cellStyle, ...modeStyles } : cellStyle;
      
      // Add mode-specific class for animations
      const modeClassName = cellMode === 'incorrect' ? 'table-cell-wiggle' : 
                             cellMode === 'focus' ? 'table-cell-focus-blink' : '';
      const finalClassName = [className, modeClassName].filter(Boolean).join(' ') || undefined;
      
      return React.createElement('td', {
        key: `cell-${rowIndex}-${cellIndex}`,
        id: cellId,
        style: finalCellStyle,
        className: finalClassName,
        colSpan: (cellIndex === 0 && colspan) ? colspan : undefined,
        ...(cellContainsHTML ? { dangerouslySetInnerHTML: { __html: convertedCellText } } : {})
      }, cellContainsHTML ? null : convertedCellText);
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
        borderCollapse: borderCollapseValue,
        borderSpacing: borderSpacingValue,
        borderRadius: processedBorderRadius,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        tableLayout: (equalColumnWidths || equalRowHeights || processedCellHeight) ? 'fixed' : 'auto'
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
      headerTextColor: null, // If null, uses textColor
      cellBackgroundColor: 'transparent',
      rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
      columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
      dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
      dataColumnBackgroundColors: [], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
      rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
      rowOverrides: {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
      textColor: '#ffffff',
      fontSize: '28gc',
      headerFontSize: '32gc',
      padding: '15gc',
      borderRadius: '8gc',
      borderWidth: '2px',
      cellHeight: null, // Fixed height for all cells (e.g., '80gc' or '60px') - prevents cells from resizing when content changes
      rowGap: '0gc', // Gap between rows (in gc units)
      columnGap: '0gc', // Gap between columns (in gc units)
      cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
      onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
      blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
      blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
      blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
      blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
      blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
      blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
      cellModes: {} // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
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
