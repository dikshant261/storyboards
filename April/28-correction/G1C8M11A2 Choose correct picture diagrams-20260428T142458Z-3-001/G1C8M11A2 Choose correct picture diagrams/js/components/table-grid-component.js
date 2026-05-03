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
    headerBackgroundColor = 'transparent',
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
    equalRowHeights = false, // If true, all rows will have equal height
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
    cellModes = {}, // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
    dullDataRowIndices = null, // Optional 0-based data row indices to dull (page 3); e.g. [1,2,3] = body rows R2–R4
    countOverlayDataRowIndex = null, // Optional: show 1,2,… centered in black on each icon in this data row (e.g. page 3)
    countOverlayGreenGlow = false, // Optional: green drop-shadow on those icons (page 3 right panel)
    countOverlayFontSize = '28gc', // Optional: font size for star count overlays (supports gc/px)
    starCellHighlight = null, // Optional: { color, dataRowIndices } — bg only on star-grid cells (array of image paths) in those rows
    countOverlaySequentialInRows = null, // Optional: data row indices (e.g. [0,1,2,3]) — one running count 1…N across star cells in order
    sequentialStarCountLayoutRows = null, // Optional: same rows as above — keep star cell DOM/layout stable before counts appear (e.g. page 6)
    mergedRows = {}, // Object: {rowIndex: {colSpan: 2}} to merge cells across columns
    mergedHeaders = {}, // Object: {headerIndex: {colSpan: 2}} to merge header cells across columns
    rowStyles = {}, // Object: {rowIndex: {backgroundColor: '#fff', color: '#000', ...}} for custom row CSS
    dataColumnWidths = null, // Array/Object: body-only column widths (e.g. ['220gc','420gc'] or {0:'220gc',1:'420gc'})
    rowImageMaxWidth = '55gc', // Supports px or gc (e.g. '20gc') for row icon max width
    rowImageMaxHeight = '55gc', // Supports px or gc (e.g. '20gc') for row icon max height
    rowImageMargin = '0gc', // Supports px or gc for row icon margin
    headerImageMaxWidth = '50gc', // Supports px or gc for header image max width
    headerImageMaxHeight = '50gc', // Supports px or gc for header image max height
    headerImageMargin = '4gc' // Supports px or gc for header image margin
  } = props;

  // State for dynamic cell overrides (text, bg, font color, etc.)
  const [cellOverrides, setCellOverrides] = React.useState({});

  // State for dynamic cell modes (merged with prop cellModes)
  const [dynamicCellModes, setDynamicCellModes] = React.useState({});

  /** Persistent row: glow + 1,2,… counts (page 2 panels). glowTheme: red | green. Bounce stops after bounceDurationMs but highlight stays. */
  const [starHighlightRowIndex, setStarHighlightRowIndex] = React.useState(null);
  const [starHighlightBouncing, setStarHighlightBouncing] = React.useState(false);
  const [starHighlightGlow, setStarHighlightGlow] = React.useState('red');
  const bounceStarTimeoutRef = React.useRef(null);

  // Get component ID for unique cell IDs (use elementName from PageConfig, fallback to props.id or elementId)
  const componentId = elementName || props.id || elementId;

  React.useEffect(() => {
    const clearBounceTimer = () => {
      if (bounceStarTimeoutRef.current) {
        clearTimeout(bounceStarTimeoutRef.current);
        bounceStarTimeoutRef.current = null;
      }
    };

    const onBounce = (event) => {
      const d = event.detail || {};
      if (!d.tableElementName || d.tableElementName !== componentId) return;
      if (typeof d.dataRowIndex !== 'number') return;
      clearBounceTimer();
      setStarHighlightRowIndex(d.dataRowIndex);
      setStarHighlightGlow(d.glow === 'green' ? 'green' : 'red');
      setStarHighlightBouncing(true);
      const bounceMs =
        typeof d.bounceDurationMs === 'number'
          ? d.bounceDurationMs
          : typeof d.durationMs === 'number'
            ? d.durationMs
            : 2000;
      bounceStarTimeoutRef.current = setTimeout(() => {
        setStarHighlightBouncing(false);
        bounceStarTimeoutRef.current = null;
      }, bounceMs);
    };

    const onHighlightClear = (event) => {
      const d = event.detail || {};
      if (!d.tableElementName || d.tableElementName !== componentId) return;
      clearBounceTimer();
      setStarHighlightRowIndex(null);
      setStarHighlightBouncing(false);
    };

    window.addEventListener('tableGridStarRowBounce', onBounce);
    window.addEventListener('tableGridStarRowHighlightClear', onHighlightClear);
    return () => {
      window.removeEventListener('tableGridStarRowBounce', onBounce);
      window.removeEventListener('tableGridStarRowHighlightClear', onHighlightClear);
      clearBounceTimer();
    };
  }, [componentId]);

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

  const processGcValue = (value, cssProperty) => {
    if (typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, cssProperty);
    }
    return value;
  };

  const processedRowImageMaxWidth = processGcValue(rowImageMaxWidth, 'width');
  const processedRowImageMaxHeight = processGcValue(rowImageMaxHeight, 'height');
  const processedRowImageMargin = processGcValue(rowImageMargin, 'margin');
  const processedHeaderImageMaxWidth = processGcValue(headerImageMaxWidth, 'width');
  const processedHeaderImageMaxHeight = processGcValue(headerImageMaxHeight, 'height');
  const processedHeaderImageMargin = processGcValue(headerImageMargin, 'margin');
  const processedCountOverlayFontSize = processGcValue(countOverlayFontSize, 'fontSize');

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

  const isStarGridCell = (val) =>
    Array.isArray(val) &&
    val.length > 0 &&
    val.every((x) => typeof x === 'string');

  const countStarsInDataRow = (row) => {
    if (!row || !Array.isArray(row)) return 0;
    let n = 0;
    for (const c of row) {
      if (isStarGridCell(c)) n += c.length;
    }
    return n;
  };

  let sequentialStarCountOffsets = null;
  if (Array.isArray(countOverlaySequentialInRows) && countOverlaySequentialInRows.length > 0) {
    sequentialStarCountOffsets = {};
    const sorted = [...countOverlaySequentialInRows].sort((a, b) => a - b);
    let acc = 0;
    for (const r of sorted) {
      sequentialStarCountOffsets[r] = acc;
      acc += countStarsInDataRow(rows[r]);
    }
  }

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

  const getDataColumnWidth = (columnIndex) => {
    if (!dataColumnWidths) return null;

    let widthValue = null;
    if (Array.isArray(dataColumnWidths)) {
      widthValue = dataColumnWidths[columnIndex] || null;
    } else if (typeof dataColumnWidths === 'object') {
      widthValue = dataColumnWidths[columnIndex] || null;
    }

    if (!widthValue) return null;
    return processGcValue(widthValue, 'width');
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
  
  // Apply custom header row styles if provided
  if (rowStyles && rowStyles.header) {
    Object.assign(headerRowStyle, rowStyles.header);
  }

  const isHtmlLikeString = (value) => {
    return typeof value === 'string' && /<[^>]+>/.test(value);
  };

  const cssPropToJsProp = (prop) => {
    return prop.replace(/-([a-z])/g, (_, chr) => chr.toUpperCase());
  };

  const convertHtmlInlineGcUnits = (htmlString) => {
    if (typeof htmlString !== 'string' || !htmlString.includes('gc')) {
      return htmlString;
    }

    return htmlString.replace(/style\s*=\s*"([^"]*)"/gi, (fullMatch, styleContent) => {
      const convertedStyle = styleContent.replace(/([a-zA-Z-]+)\s*:\s*([^;]+)(;?)/g, (declMatch, propName, rawValue, semi) => {
        if (!rawValue.includes('gc')) {
          return declMatch;
        }

        const jsPropName = cssPropToJsProp(propName.trim());
        const convertedValue = rawValue.replace(/(-?\d*\.?\d+)gc\b/g, (unitMatch, numericPart) => {
          const gcToken = `${numericPart}gc`;
          if (window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
            return window.GridCellFontUtils.processGcProperty(gcToken, jsPropName);
          }
          return unitMatch;
        });

        return `${propName}: ${convertedValue}${semi}`;
      });

      return `style="${convertedStyle}"`;
    });
  };

  // Create header cells
  const headerCells = headers.map((header, index) => {
    const headerMergeConfig = mergedHeaders && mergedHeaders[index];
    const headerColSpan = headerMergeConfig ? headerMergeConfig.colSpan : 1;
    if (headerMergeConfig && index > 0) {
      return null;
    }

    const cellKey = `header-${index}`;
    // Get cell background color (isHeader=true ensures dataRow/dataColumn colors are not used)
    let headerBgColor = getCellBackgroundColor(-1, index, true); // Use -1 for header row index
    // Check for cell override
    headerBgColor = getCellOverride(cellKey, 'backgroundColor', headerBgColor);
    // Use column color if specified, otherwise use headerBackgroundColor
    const finalHeaderBgColor = (headerBgColor !== cellBackgroundColor) ? headerBgColor : headerBackgroundColor;

    // Get cell override values
    const overrideText = getCellOverride(cellKey, 'text', header);
    const overrideColor = getCellOverride(cellKey, 'color', textColor);
    const overrideFontSize = getCellOverride(cellKey, 'fontSize', processedHeaderFontSize);
    const overrideFontWeight = getCellOverride(cellKey, 'fontWeight', 'bold');

    // Process fontSize if it contains gc units
    let processedOverrideFontSize = overrideFontSize;
    if (overrideFontSize && typeof overrideFontSize === 'string' && overrideFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      processedOverrideFontSize = window.GridCellFontUtils.processGcProperty(overrideFontSize, 'fontSize');
    }

    // Get border color override
    const overrideBorderColor = getCellOverride(cellKey, 'borderColor', borderColor);

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

    // Add equal width if enabled
    if (equalColumnWidth) {
      headerStyle.width = equalColumnWidth;
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
      colSpan: headerColSpan
    }, Array.isArray(overrideText)
      ? overrideText.map((imgSrc, imgIndex) =>
        React.createElement('img', {
          key: imgIndex,
          src: imgSrc,
          style: {
            maxWidth: processedHeaderImageMaxWidth,
            maxHeight: processedHeaderImageMaxHeight,
            margin: processedHeaderImageMargin
          }
        })
      )
      : typeof overrideText === 'string'
        ? isHtmlLikeString(overrideText)
          ? React.createElement('span', {
            dangerouslySetInnerHTML: { __html: convertHtmlInlineGcUnits(overrideText) }
          })
          : overrideText
        : null
    );

  });

  // Create data rows
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = {};
    if (equalRowHeight) {
      rowStyle.height = equalRowHeight;
    }

    // Apply custom row styles if provided
    if (rowStyles && rowStyles[rowIndex]) {
      Object.assign(rowStyle, rowStyles[rowIndex]);
    }

    // Check if this row has merged cells
    const mergeConfig = mergedRows && mergedRows[rowIndex];
    const colSpan = mergeConfig ? mergeConfig.colSpan : 1;

    return React.createElement('tr', {
      key: `row-${rowIndex}`,
      style: rowStyle
    }, row.map((cell, cellIndex) => {
      // Skip rendering cells if this row is merged and we're not on the first cell
      if (mergeConfig && cellIndex > 0) {
        return null;
      }

      const cellKey = `${rowIndex}-${cellIndex}`;
      const starCellHighlightThisCell = Boolean(
        starCellHighlight &&
          starCellHighlight.color &&
          Array.isArray(starCellHighlight.dataRowIndices) &&
          starCellHighlight.dataRowIndices.includes(rowIndex) &&
          isStarGridCell(cell)
      );
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

      const cellStyle = {
        backgroundColor: cellBgColor,
        color: overrideColor,
        fontSize: processedOverrideFontSize,
        fontWeight: overrideFontWeight,
        padding: processedPadding,
        border: `${borderWidth} solid ${overrideBorderColor}`,
        borderRadius: processedCellBorderRadius,
        textAlign: 'left',
        boxSizing: 'border-box',
        overflow: 'hidden',
        wordBreak: 'break-word'
      };

      // Add equal width if enabled
      if (equalColumnWidth) {
        cellStyle.width = equalColumnWidth;
      }

      // Body-only per-column width override (does not style headers directly)
      const dataColumnWidth = getDataColumnWidth(cellIndex);
      if (dataColumnWidth) {
        cellStyle.width = dataColumnWidth;
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
      let finalCellStyle = modeStyles ? { ...cellStyle, ...modeStyles } : cellStyle;

      const isDullRow =
        Array.isArray(dullDataRowIndices) &&
        dullDataRowIndices.length > 0 &&
        dullDataRowIndices.includes(rowIndex);
      if (isDullRow) {
        finalCellStyle = {
          ...finalCellStyle,
          opacity: 0.42,
          pointerEvents: 'none',
          filter: 'grayscale(0.55)',
          userSelect: 'none',
          cursor: 'default'
        };
      }

      // Add mode-specific class for animations
      const modeClassName = cellMode === 'incorrect' ? 'table-cell-wiggle' :
        cellMode === 'focus' ? 'table-cell-focus-blink' : '';
      const finalClassName = [
        className,
        modeClassName,
        isDullRow ? 'table-grid-cell--dulled' : ''
      ].filter(Boolean).join(' ') || undefined;

      const starHighlightThisRow =
        starHighlightRowIndex !== null &&
        rowIndex === starHighlightRowIndex &&
        Array.isArray(overrideText) &&
        overrideText.every((x) => typeof x === 'string');

      const countOverlayThisRow =
        typeof countOverlayDataRowIndex === 'number' &&
        rowIndex === countOverlayDataRowIndex &&
        Array.isArray(overrideText) &&
        overrideText.every((x) => typeof x === 'string');

      const useSequentialStarCount =
        sequentialStarCountOffsets &&
        sequentialStarCountOffsets[rowIndex] !== undefined &&
        isStarGridCell(cell);

      const inSequentialLayoutRow =
        Array.isArray(sequentialStarCountLayoutRows) &&
        sequentialStarCountLayoutRows.includes(rowIndex) &&
        isStarGridCell(cell);

      let tdChildren;
      if (Array.isArray(overrideText)) {
        const imgNodes = overrideText.map((imgSrc, imgIndex) => {
            const imgStyleInline = {
              maxWidth: processedRowImageMaxWidth,
              maxHeight: processedRowImageMaxHeight,
              margin: processedRowImageMargin
            };
            if (
              !starHighlightThisRow &&
              !countOverlayThisRow &&
              !useSequentialStarCount &&
              !inSequentialLayoutRow
            ) {
              return React.createElement('img', {
                key: imgIndex,
                src: imgSrc,
                style: imgStyleInline
              });
            }
            const imgStyleInWrap = {
              ...imgStyleInline,
              display: 'block'
            };
            const overlayCount =
              useSequentialStarCount
                ? sequentialStarCountOffsets[rowIndex] + imgIndex + 1
                : imgIndex + 1;
            const wrapMargin = inSequentialLayoutRow ? '0' : '0 1px';
            const countOverlayEl =
              useSequentialStarCount || countOverlayThisRow || starHighlightThisRow
                ? React.createElement(
                    'span',
                    {
                      className: 'table-star-count-overlay',
                      style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: processedCountOverlayFontSize,
                        fontFamily: 'Arial, sans-serif'
                      }
                    },
                    String(overlayCount)
                  )
                : null;
            if (starHighlightThisRow) {
              const wrapClass = [
                'table-star-highlight-wrap',
                `table-star-highlight-wrap--${starHighlightGlow}`,
                starHighlightBouncing ? 'table-star-bounce-active' : ''
              ]
                .filter(Boolean)
                .join(' ');
              return React.createElement(
                'span',
                {
                  key: imgIndex,
                  className: wrapClass,
                  style: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    margin: wrapMargin
                  }
                },
                React.createElement('img', {
                  src: imgSrc,
                  style: imgStyleInWrap,
                  alt: ''
                }),
                countOverlayEl
              );
            }
            const countWrapClass = countOverlayGreenGlow
              ? 'table-star-highlight-wrap table-star-highlight-wrap--green'
              : 'table-shape-count-wrap';
            return React.createElement(
              'span',
              {
                key: imgIndex,
                className: countWrapClass,
                style: {
                  position: 'relative',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: wrapMargin
                }
              },
              React.createElement('img', {
                src: imgSrc,
                style: imgStyleInWrap,
                alt: ''
              }),
              countOverlayEl
            );
          });
        tdChildren = starCellHighlightThisCell
          ? React.createElement(
              'span',
              {
                className: 'table-grid-star-cluster-highlight',
                style: {
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  gap: '2px',
                  backgroundColor: starCellHighlight.color,
                  padding: '4px 6px',
                  borderRadius: '8px',
                  width: 'fit-content',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  verticalAlign: 'middle'
                }
              },
              ...imgNodes
            )
          : imgNodes;
      } else if (typeof overrideText === 'string') {
        tdChildren = isHtmlLikeString(overrideText)
          ? React.createElement('span', {
            dangerouslySetInnerHTML: { __html: convertHtmlInlineGcUnits(overrideText) }
          })
          : overrideText;
      } else {
        tdChildren = null;
      }

      return React.createElement('td', {
        key: `cell-${rowIndex}-${cellIndex}`,
        id: cellId,
        style: finalCellStyle,
        className: finalClassName,
        colSpan: mergeConfig ? colSpan : 1
      }, tdChildren);

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
      cellModes: {}, // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
      dullDataRowIndices: null,
      countOverlayDataRowIndex: null,
      countOverlayGreenGlow: false,
      starCellHighlight: null,
      countOverlaySequentialInRows: null,
      sequentialStarCountLayoutRows: null
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
