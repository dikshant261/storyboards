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
    headerTextColor, // If set, used for header cell text color (defaults to textColor)
    cellBackgroundColor = 'transparent',
    rowBackgroundColors = [], // Array of colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    columnBackgroundColors = [], // Array of colors for each column [color1, color2, ...] or object {0: color1, 2: color2}
    dataRowBackgroundColors = [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
    dataColumnBackgroundColors = [], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
    rowTextColors = [], // Array of text colors for each row [color1, color2, ...] or object {0: color1, 2: color2}
    opacityRow = {}, // Object: {0: '0.6', 1: 1} - row opacity override (data rows only)
    rowOverrides = {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
    textColor = '#ffffff',
    fontSize = '28gc',
    headerFontSize = '32gc',
    padding = '15gc',
    borderRadius = '8gc',
    borderWidth = '2gc',
    equalColumnWidths = false, // If true, all columns will have equal width
    columnWidths = [], // Array of column widths, e.g. ['40%', '60%']. When set, overrides equalColumnWidths for those columns. Applied to header and data cells.
    equalRowHeights = false, // If true, all rows will have equal height
    rowGap = '0gc', // Gap between rows (in gc units)
    columnGap = '0gc', // Gap between columns (in gc units)
    cellBorderRadius = '12gc', // Border radius for individual cells (in gc units)
    onCellUpdate, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
    blinkBgCells = [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
    blinkBgRows = [], // Array of row indices to blink background: [0, 1] (data rows only)
    blinkBgColumns = [], // Array of column indices to blink background: [0, 1]
    blinkBorderCells = [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
    blinkBorderRows = [], // Array of row indices to blink border: [0, 1] (data rows only)
    blinkBorderColumns = [], // Array of column indices to blink border: [0, 1]
    cellModes = {}, // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
    dataColumnTextAlign = {}, // Object: { 0: 'left', 1: 'center' } - text alignment for data columns only (not header). Keys are column indices, values 'left' | 'center' | 'right'. Omitted columns default to 'center'.
    droppableCells = [], // Array of { rowIndex, colIndex, droppableId, name, enabled, maxItems, placementDirection, placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside, ...droppableProps }. name: optional label for the drop zone (e.g. 'Grapes'). placementDirection: 'horizontal' | 'vertical' — layout of multiple placed items (default 'horizontal'). enabled: drop zone on/off. maxItems: max number of items this cell can hold (default 1). placedItemDraggable: when true, placed item can be dragged again. placedItemTransferable: when true (default), placed item can be moved to another droppable cell. clearPlacementOnDropOutside: when true, dropping the placed item outside any droppable clears it from this cell.
    dropZonesEnabled = true, // When false, drop feature is off: droppable cells render as normal cells (no drop zones, no placed content). When true, droppableCells are active.
    placedContentByDraggableId = {}, // Map draggableId to { imageSrc } or { text } for what to show in the cell when that draggable is placed. Used with placements state.
    droppableCellMaxHeight = '5em', // Max height for cells that are drop zones, so placed content does not expand the row. Use e.g. '5em' or '80px'.
    placedItemDraggable = false, // When true, the placed item in a drop zone remains draggable (can be picked up and moved again). Can be overridden per cell in droppableCells[].placedItemDraggable.
    defaultImageDraggable = false,
    dropCallbacks = {}, // Callbacks for drop events: { onAddSuccess, onAddAllSuccess, onRemove, onIncorrectDropInCell, onIncorrectDropOutside }. Each: { componentId, callback: (text, mode) => void, text?, mode? }. Optional expectedPlacementCount for onAddAllSuccess. Also exposes window.tableGridDropQueries[elementName] = { getItemsInCell(droppableId) => draggableId[], getItemCountsByType(droppableId) => { [baseId]: number } }.
    tableBorder = true, // Toggle outer table container border
    tableBorderColor = '#0762a4b9', // Color for table container border
    tableBorderWidth = '2gc', // Stroke width for table container border
    tableBorderRadius = '8gc', // Border radius for table container
    tableBackground = 'transparent' // Background color for table container
  } = props;

  const toPlacementArray = (val) => (val == null ? [] : Array.isArray(val) ? val : [val]);
  const componentId = elementName || props.id || elementId;

  // Initialize global state store for table visual state persistence across navigation
  if (typeof window !== 'undefined' && !window.tableGridStateStore) {
    window.tableGridStateStore = {};
  }

  const savedTableState =
    (typeof window !== 'undefined' && window.tableGridStateStore && componentId)
      ? window.tableGridStateStore[componentId]
      : null;

  const [dynamicRowOpacity, setDynamicRowOpacity] = React.useState(savedTableState?.dynamicRowOpacity || {});
  // Helper to invoke drop callback: config is { componentId, callback, text?, mode?, getText?: (droppableId) => string }
  const invokeDropCallback = React.useCallback((key, text, mode, context = {}) => {
    const config = dropCallbacks[key];
    if (!config || !config.callback) return;
    let t = text;
    if (t === undefined && typeof config.getText === 'function' && context.droppableId != null) {
      try {
        t = config.getText(context.droppableId);
      } catch (err) {
        console.warn(`[TableGrid] dropCallbacks.${key}.getText error:`, err);
      }
    }
    t = t ?? config.text ?? '';
    const m = mode ?? config.mode ?? 'normal';
    try {
      config.callback(t, m);
    } catch (err) {
      console.warn(`[TableGrid] dropCallbacks.${key} error:`, err);
    }
  }, [dropCallbacks]);

  // Global placement store: when a draggable is dropped on a droppable cell, we record it so the table can show the placed content
  if (typeof window !== 'undefined' && !window.dragDropPlacements) {
    window.dragDropPlacements = {};
  }
  const [placements, setPlacements] = React.useState(() => ({ ...(window.dragDropPlacements || {}) }));
  React.useEffect(() => {
    const onPlacement = () => {
      if (typeof window !== 'undefined' && window.dragDropPlacements) {
        setPlacements({ ...window.dragDropPlacements });
      }
    };
    window.addEventListener('dragDropPlacement', onPlacement);
    return () => window.removeEventListener('dragDropPlacement', onPlacement);
  }, []);

  // Seed initial placements from droppableCells[].initialPlacementIds (only when cell is empty; count capped at maxItems)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.dragDropPlacements || !Array.isArray(droppableCells)) return;
    const callbackComponentId = elementName || props.id || elementId;
    let changed = false;
    droppableCells.forEach((cell) => {
      const initialIds = cell.initialPlacementIds;
      if (!initialIds || !Array.isArray(initialIds) || initialIds.length === 0) return;
      const droppableId = cell.droppableId || `${callbackComponentId}-drop-R${(cell.rowIndex ?? 0) + 1}C${cell.colIndex ?? 0}`;
      const maxItems = cell.maxItems != null && cell.maxItems > 0 ? cell.maxItems : 1;
      const current = window.dragDropPlacements[droppableId];
      const currentArr = current == null ? [] : (Array.isArray(current) ? current : [current]);
      if (currentArr.length > 0) return; // already has placements; don't overwrite
      const toPlace = initialIds.slice(0, maxItems);
      if (toPlace.length === 0) return;
      window.dragDropPlacements[droppableId] = toPlace.length === 1 ? toPlace[0] : toPlace;
      changed = true;
    });
    if (changed) {
      setPlacements({ ...window.dragDropPlacements });
      window.dispatchEvent(new CustomEvent('dragDropPlacement', { detail: {} }));
    }
  }, [droppableCells, elementName, props.id, elementId]);

  React.useEffect(() => {
    const toArr = (val) => (val == null ? [] : Array.isArray(val) ? val : [val]);
    const onDragEndedOutside = (e) => {
      const { draggableId } = e.detail || {};
      if (!draggableId || !Array.isArray(droppableCells)) return;
      const placementsMap = typeof window !== 'undefined' ? window.dragDropPlacements || {} : {};
      const sourceDroppableId = Object.keys(placementsMap).find((id) => {
        const v = placementsMap[id];
        return Array.isArray(v) ? v.includes(draggableId) : v === draggableId;
      });
      invokeDropCallback('onIncorrectDropOutside');
      if (!sourceDroppableId) return;
      const cellConfig = droppableCells.find((c) => c.
        droppableId === sourceDroppableId);
      if (!cellConfig || cellConfig.clearPlacementOnDropOutside !== true) return;
      invokeDropCallback('onRemove');
      if (typeof window !== 'undefined') {
        const arr = toArr(placementsMap[sourceDroppableId]).filter((id) => id !== draggableId);
        if (arr.length === 0) {
          delete window.dragDropPlacements[sourceDroppableId];
        } else {
          window.dragDropPlacements[sourceDroppableId] = arr.length === 1 ? arr[0] : arr;
        }
      }
      setPlacements(() => ({ ...(window.dragDropPlacements || {}) }));
      window.dispatchEvent(new CustomEvent('dragDropPlacement', { detail: { droppableId: sourceDroppableId, draggableId: null } }));
      const afterRemoveFromCell = dropCallbacks?.afterRemoveFromCell;
      if (typeof afterRemoveFromCell === 'object' && afterRemoveFromCell != null && typeof afterRemoveFromCell[sourceDroppableId] === 'function') {
        afterRemoveFromCell[sourceDroppableId]();
      }
    };
    window.addEventListener('dragDropEndedOutside', onDragEndedOutside);
    return () => window.removeEventListener('dragDropEndedOutside', onDragEndedOutside);
  }, [droppableCells, invokeDropCallback, dropCallbacks]);

  // State for dynamic cell overrides (text, bg, font color, etc.)
  const [cellOverrides, setCellOverrides] = React.useState(savedTableState?.cellOverrides || {});

  // State for dynamic cell modes (merged with prop cellModes)
  const [dynamicCellModes, setDynamicCellModes] = React.useState(savedTableState?.dynamicCellModes || {});

  // Restore table visual state on remount/navigation when available
  React.useEffect(() => {
    if (typeof window === 'undefined' || !componentId) return;
    const persisted = window.tableGridStateStore?.[componentId];
    if (!persisted) return;

    setDynamicRowOpacity(persisted.dynamicRowOpacity || {});
    setCellOverrides(persisted.cellOverrides || {});
    setDynamicCellModes(persisted.dynamicCellModes || {});
  }, [componentId]);

  // Persist table visual state (similar to QuizPanelComponent state store pattern)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !componentId) return;
    if (!window.tableGridStateStore) {
      window.tableGridStateStore = {};
    }

    window.tableGridStateStore[componentId] = {
      dynamicRowOpacity,
      cellOverrides,
      dynamicCellModes
    };
  }, [componentId, dynamicRowOpacity, cellOverrides, dynamicCellModes]);

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

    const updateMultipleCells = (cellsConfig) => {
      setCellOverrides(prev => {
        const updated = { ...prev };

        Object.entries(cellsConfig).forEach(([cellKey, updates]) => {
          updated[cellKey] = {
            ...updated[cellKey],
            ...updates
          };
        });

        return updated;
      });
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
    if (!window.tableGridMultipleCallbacks) {
      window.tableGridMultipleCallbacks = {};
    }

    window.tableGridMultipleCallbacks[callbackComponentId] = updateMultipleCells;
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
      if (window.tableGridMultipleCallbacks) {
        delete window.tableGridMultipleCallbacks[callbackComponentId];
      }
    };
  }, [elementId, elementName, props.id, onCellUpdate]);

  // Expose drop cell query functions: getItemsInCell(droppableId) and getItemCountsByType(droppableId)
  React.useEffect(() => {
    const callbackComponentId = elementName || props.id || elementId;
    const tableDroppableIds = new Set(
      droppableCells.map((c) => c.droppableId || `${callbackComponentId}-drop-R${(c.rowIndex ?? 0) + 1}C${c.colIndex ?? 0}`)
    );
    const getItemsInCell = (droppableId) => {
      if (!tableDroppableIds.has(droppableId)) return [];
      const placementsMap = typeof window !== 'undefined' ? window.dragDropPlacements || {} : {};
      const val = placementsMap[droppableId];
      return Array.isArray(val) ? val : (val != null ? [val] : []);
    };
    const getItemCountsByType = (droppableId) => {
      const items = getItemsInCell(droppableId);
      const counts = {};
      const getBaseId = typeof window !== 'undefined' && window.getDraggableBaseId
        ? window.getDraggableBaseId
        : (id) => id;
      items.forEach((draggableId) => {
        const baseId = getBaseId(draggableId) || draggableId;
        counts[baseId] = (counts[baseId] || 0) + 1;
      });
      return counts;
    };


    // Store globally
    if (!window.tableGridRowOpacityCallbacks) {
      window.tableGridRowOpacityCallbacks = {};
    }


    if (!window.tableGridDropQueries) {
      window.tableGridDropQueries = {};
    }
    window.tableGridDropQueries[callbackComponentId] = { getItemsInCell, getItemCountsByType };
    return () => {
      if (window.tableGridDropQueries) {
        delete window.tableGridDropQueries[callbackComponentId];
      }
    };
  }, [elementId, elementName, props.id, droppableCells]);
  React.useEffect(() => {
    const callbackComponentId = elementName || props.id;

    if (!callbackComponentId) return;

    const updateRowOpacity = (rowConfig) => {
      setDynamicRowOpacity(prev => ({
        ...prev,
        ...rowConfig
      }));
    };

    if (!window.tableGridRowOpacityCallbacks) {
      window.tableGridRowOpacityCallbacks = {};
    }

    window.tableGridRowOpacityCallbacks[callbackComponentId] = updateRowOpacity;

    return () => {
      if (window.tableGridRowOpacityCallbacks) {
        delete window.tableGridRowOpacityCallbacks[callbackComponentId];
      }
    };
  }, [elementName, props.id]); // ✅ ONLY THESE DEPENDENCIES
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

  // Process tableBorderRadius for table container
  let processedTableBorderRadius = tableBorderRadius;
  if (tableBorderRadius && tableBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedTableBorderRadius = window.GridCellFontUtils.processGcProperty(tableBorderRadius, 'borderRadius');
  }

  // Process borderWidth and tableBorderWidth if they contain gc units
  let processedBorderWidth = borderWidth;
  if (borderWidth && borderWidth.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderWidth = window.GridCellFontUtils.processGcProperty(borderWidth, 'borderWidth');
  }
  let processedTableBorderWidth = tableBorderWidth;
  if (tableBorderWidth && tableBorderWidth.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedTableBorderWidth = window.GridCellFontUtils.processGcProperty(tableBorderWidth, 'borderWidth');
  }

  // Determine if we need to use border spacing (when gaps are specified)
  // Check if gaps are non-zero (handles '0gc', '0', 0, null, undefined)
  const rowGapValue = String(rowGap || '0').replace('gc', '').trim();
  const columnGapValue = String(columnGap || '0').replace('gc', '').trim();
  const hasGaps = (parseFloat(rowGapValue) > 0) || (parseFloat(columnGapValue) > 0);
  // border-radius on cells requires border-collapse: separate (collapse prevents radius from rendering)
  const cellRadiusNum = parseFloat(String(cellBorderRadius || '0').replace(/\D/g, '') || '0');
  const hasRoundedCells = cellRadiusNum > 0;
  const useSeparate = hasGaps || hasRoundedCells;
  const borderCollapseValue = useSeparate ? 'separate' : 'collapse';
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
  // Helper function to get row opacity (default = 1)
  const getRowOpacity = (rowIndex) => {
    // Dynamic value takes priority
    if (dynamicRowOpacity[rowIndex] !== undefined) {
      return dynamicRowOpacity[rowIndex];
    }

    // Then fallback to prop
    if (typeof opacityRow === 'object' && opacityRow !== null) {
      return opacityRow[rowIndex] !== undefined
        ? opacityRow[rowIndex]
        : 1;
    }

    return 1;
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

  // Helper function to get row font style (e.g. italic) including rowOverrides
  const getRowFontStyle = (rowIndex) => {
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].fontStyle !== undefined) {
      return rowOverrides[rowIndex].fontStyle;
    }
    return 'normal';
  };

  // Helper function to get data column text alignment (data cells only, not header)
  const getDataColumnTextAlign = (columnIndex) => {
    if (typeof dataColumnTextAlign === 'object' && dataColumnTextAlign !== null && dataColumnTextAlign[columnIndex]) {
      return dataColumnTextAlign[columnIndex];
    }
    return 'center';
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
          border: `${processedBorderWidth} solid #E9967A`, // salmon-dark border
          color: '#FFFFFF' // white
        };
      case 'correct':
        return {
          backgroundColor: '#4CAF50', // green
          border: `${processedBorderWidth} solid #45a049`, // green-dark border
          color: '#FFFFFF' // white
        };
      case 'focus':
        return {
          backgroundColor: '#FFEB3B', // yellow
          border: `${processedBorderWidth} solid #FFFFFF`, // white border
          color: '#000000' // black
        };
      case 'normal':
      default:
        return null; // No override, use default styles
    }
  };

  // Calculate column count (accounting for colSpan in headers)
  const getHeaderText = (h) => (typeof h === 'object' && h !== null && 'text' in h) ? h.text : h;
  const getHeaderColSpan = (h) => (typeof h === 'object' && h !== null && h.colSpan) ? h.colSpan : 1;
  const columnCount = headers.reduce((sum, h) => sum + getHeaderColSpan(h), 0);
  const equalColumnWidth = equalColumnWidths && columnCount > 0 ? `${100 / columnCount}%` : null;
  const hasColumnWidths = Array.isArray(columnWidths) && columnWidths.length > 0;
  const getColumnWidth = (colIndex) => (hasColumnWidths && columnWidths[colIndex]) ? columnWidths[colIndex] : null;

  // Calculate equal row height if needed
  const rowCount = rows.length;
  const equalRowHeight = equalRowHeights && rowCount > 0 ? `${100 / (rowCount + 1)}%` : null; // +1 for header row

  // Create header row
  const headerRowStyle = {};
  if (equalRowHeight) {
    headerRowStyle.height = equalRowHeight;
  }

  // Create header cells (support colSpan: header can be string or { text, colSpan })
  const headerCells = [];
  let headerColIndex = 0;
  for (let hi = 0; hi < headers.length; hi++) {
    const header = headers[hi];
    const headerText = getCellOverride(`header-${hi}`, 'text', getHeaderText(header));
    const colSpan = getHeaderColSpan(header);
    const cellKey = `header-${hi}`;
    let headerBgColor = getCellBackgroundColor(-1, headerColIndex, true);
    headerBgColor = getCellOverride(cellKey, 'backgroundColor', headerBgColor);
    const finalHeaderBgColor = (headerBgColor !== cellBackgroundColor) ? headerBgColor : headerBackgroundColor;
    const overrideColor = getCellOverride(cellKey, 'color', headerTextColor !== undefined ? headerTextColor : textColor);
    const overrideFontSize = getCellOverride(cellKey, 'fontSize', processedHeaderFontSize);
    const overrideFontWeight = getCellOverride(cellKey, 'fontWeight', 'bold');
    let processedOverrideFontSize = overrideFontSize;
    if (overrideFontSize && typeof overrideFontSize === 'string' && overrideFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      processedOverrideFontSize = window.GridCellFontUtils.processGcProperty(overrideFontSize, 'fontSize');
    }
    const overrideBorderColor = getCellOverride(cellKey, 'borderColor', borderColor);
    const headerStyle = {
      backgroundColor: finalHeaderBgColor,
      color: overrideColor,
      fontSize: processedOverrideFontSize,
      fontWeight: overrideFontWeight,
      padding: processedPadding,
      border: `${processedBorderWidth} solid ${overrideBorderColor}`,
      borderRadius: processedCellBorderRadius,
      textAlign: 'center',
      boxSizing: 'border-box',
      overflow: 'hidden',
      wordBreak: 'break-word'
    };
    const colWidth = colSpan === 1 ? (getColumnWidth(headerColIndex) || (equalColumnWidth ? equalColumnWidth : null)) : null;
    if (colWidth) {
      headerStyle.width = colWidth;
    }
    const className = [
      shouldBlinkBg(-1, headerColIndex, true) ? 'table-cell-blink-bg' : '',
      shouldBlinkBorder(-1, headerColIndex, true) ? 'table-cell-blink-border' : ''
    ].filter(Boolean).join(' ') || undefined;
    const cellId = `${componentId}-R0C${headerColIndex}`;
    const cellMode = getCellMode(cellId);
    const modeStyles = getModeStyles(cellMode);
    const finalHeaderStyle = modeStyles ? { ...headerStyle, ...modeStyles } : headerStyle;
    const modeClassName = cellMode === 'incorrect' ? 'table-cell-wiggle' : cellMode === 'focus' ? 'table-cell-focus-blink' : '';
    const finalClassName = [className, modeClassName].filter(Boolean).join(' ') || undefined;
    const thProps = {
      key: `header-${hi}`,
      id: cellId,
      style: finalHeaderStyle,
      className: finalClassName
    };
    if (colSpan > 1) {
      thProps.colSpan = colSpan;
    }
    headerCells.push(React.createElement('th', thProps, headerText));
    headerColIndex += colSpan;
  }

  // Helper: get cell text and colSpan (cell can be string or { text, colSpan })
  const getCellText = (c) => (typeof c === 'object' && c !== null && 'text' in c) ? c.text : c;
  const getCellColSpan = (c) => (typeof c === 'object' && c !== null && c.colSpan) ? c.colSpan : 1;

  // Helper: get droppable config for a cell (rowIndex, colIndex) - data row and column indices
  const getDroppableCellConfig = (rowIndex, colIndex) => {
    if (!Array.isArray(droppableCells)) return null;
    return droppableCells.find(
      (c) => c.rowIndex === rowIndex && c.colIndex === colIndex
    ) || null;
  };

  // Create data rows (support colSpan in cells)
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = {
    };

    if (equalRowHeight) {
      rowStyle.height = equalRowHeight;
    }

    const cellElements = [];
    let colIndex = 0;
    for (let ci = 0; ci < row.length; ci++) {
      const cell = row[ci];
      const cellKey = `${rowIndex}-${ci}`;
      const cellText = getCellOverride(cellKey, 'text', getCellText(cell));
      const colSpan = getCellColSpan(cell);
      let cellBgColor = getCellBackgroundColor(rowIndex, colIndex, false);
      cellBgColor = getCellOverride(cellKey, 'backgroundColor', cellBgColor);
      const overrideColor = getCellOverride(cellKey, 'color', getRowTextColor(rowIndex));
      const overrideFontSize = getCellOverride(cellKey, 'fontSize', getRowFontSize(rowIndex));
      const overrideFontWeight = getCellOverride(cellKey, 'fontWeight', getRowFontWeight(rowIndex));
      const overrideFontStyle = getCellOverride(cellKey, 'fontStyle', getRowFontStyle(rowIndex));
      
      const defaultTextAlign = rowOverrides[rowIndex] && rowOverrides[rowIndex].textAlign !== undefined ? rowOverrides[rowIndex].textAlign : getDataColumnTextAlign(colIndex);
      const overrideTextAlign = getCellOverride(cellKey, 'textAlign', defaultTextAlign);
      let processedOverrideFontSize = overrideFontSize;
      if (overrideFontSize && typeof overrideFontSize === 'string' && overrideFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        processedOverrideFontSize = window.GridCellFontUtils.processGcProperty(overrideFontSize, 'fontSize');
      }
      const overrideBorderColor = getCellOverride(cellKey, 'borderColor', borderColor);
      const rowOpacity = getRowOpacity(rowIndex);
      const overrideBackgroundImage = getCellOverride(cellKey, 'backgroundImage');
      const cellStyle = {
        backgroundColor: cellBgColor,
        backgroundImage: overrideBackgroundImage,
        color: overrideColor,
        fontSize: processedOverrideFontSize,
        fontWeight: overrideFontWeight,
        fontStyle: overrideFontStyle,
        padding: processedPadding,
        border: `${processedBorderWidth} solid ${overrideBorderColor}`,
        borderRadius: processedCellBorderRadius,
        textAlign: overrideTextAlign,
        boxSizing: 'border-box',
        overflow: 'hidden',
        wordBreak: 'break-word',
        opacity: rowOpacity // ✅ APPLY HERE

      };
      const cellColWidth = colSpan === 1 ? (getColumnWidth(colIndex) || (equalColumnWidth ? equalColumnWidth : null)) : null;
      if (cellColWidth) {
        cellStyle.width = cellColWidth;
      }
      const className = [
        shouldBlinkBg(rowIndex, colIndex, false) ? 'table-cell-blink-bg' : '',
        shouldBlinkBorder(rowIndex, colIndex, false) ? 'table-cell-blink-border' : ''
      ].filter(Boolean).join(' ') || undefined;
      const cellId = `${componentId}-R${rowIndex + 1}C${colIndex}`;
      const cellMode = getCellMode(cellId);
      const modeStyles = getModeStyles(cellMode);
      const droppableConfig = getDroppableCellConfig(rowIndex, colIndex);

      // ✅ Always prepare default images (even if drop disabled)
      let defaultImageElements = null;

      if (droppableConfig?.imageSrc) {
        const defaultImages = Array.isArray(droppableConfig.imageSrc)
          ? droppableConfig.imageSrc
          : [droppableConfig.imageSrc];

        defaultImageElements = defaultImages
          .filter(Boolean)
          .map((src, index) =>
            React.createElement('img', {
              key: `default-img-${rowIndex}-${colIndex}-${index}`,
              src,
              draggable: false,
              style: {
                maxWidth: '35px',
                maxHeight: '31px',
                objectFit: 'contain'
              }
            })
          );
      }
      const cellDropEnabled = dropZonesEnabled && droppableConfig && (droppableConfig.enabled !== false);
      if (droppableConfig && cellDropEnabled) {
        cellStyle.overflow = 'hidden';
        cellStyle.position = 'relative';
        if (!equalRowHeight && droppableCellMaxHeight) {
          cellStyle.height = cellStyle.height || droppableCellMaxHeight;
          cellStyle.minHeight = cellStyle.minHeight || droppableCellMaxHeight;
          cellStyle.maxHeight = cellStyle.maxHeight || droppableCellMaxHeight;
        }
      }
      const finalCellStyle = modeStyles ? { ...cellStyle, ...modeStyles } : cellStyle;
      const modeClassName = cellMode === 'incorrect' ? 'table-cell-wiggle' : cellMode === 'focus' ? 'table-cell-focus-blink' : '';
      const finalClassName = [className, modeClassName].filter(Boolean).join(' ') || undefined;
      const tdProps = {
        key: `cell-${rowIndex}-${ci}`,
        id: cellId,
        style: finalCellStyle,
        className: finalClassName
      };
      if (colSpan > 1) {
        tdProps.colSpan = colSpan;
      }
      if (droppableConfig && droppableConfig.name) {
        tdProps['aria-label'] = droppableConfig.name;
      }
      const DroppableComponent = window.DroppableComponent?.Droppable;
      let cellContent = defaultImageElements
        ? React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              gap: '6px',
              width: '100%',
              height: '100%'
            }
          },
          defaultImageElements
        )
        : cellText;
      if (cellDropEnabled && DroppableComponent) {
        const { rowIndex: _ri, colIndex: _ci, droppableId, name: _cellName, maxItems: cellMaxItems = 1, placementDirection: cellPlacementDirection = 'horizontal', placedItemDraggable: cellPlacedItemDraggable, placedItemTransferable: cellPlacedItemTransferable, clearPlacementOnDropOutside: _clearOut, enabled: _en, onDrop: cellOnDrop, onDropRejected: cellOnDropRejected, acceptValidator: baseAcceptValidator, initialPlacementIds: _initialPlacementIds, ...droppableProps } = droppableConfig;
        const resolvedDroppableId = droppableId || `${componentId}-drop-R${rowIndex + 1}C${colIndex}`;
        const placedVal = placements[resolvedDroppableId];
        const placedIds = toPlacementArray(placedVal);
        const maxItemsValid = (draggableId) => {
          const placementsMap = typeof window !== 'undefined' ? (window.dragDropPlacements || {}) : placements;
          const sourceDroppableId = Object.keys(placementsMap).find((id) => {
            const v = placementsMap[id];
            return Array.isArray(v) ? v.includes(draggableId) : v === draggableId;
          });
          const isTransfer = !!sourceDroppableId && sourceDroppableId !== resolvedDroppableId;
          if (cellMaxItems <= 0) return true;
          const countAtCell = toPlacementArray(placementsMap[resolvedDroppableId]).length;
          const hasRoom = countAtCell < cellMaxItems || isTransfer;
          return hasRoom;
        };
        // Reject transfer when source cell has placedItemTransferable: false (so user sees invalid state + error on drop)
        const transferAllowedValidator = (draggableId) => {
          const placementsMap = typeof window !== 'undefined' ? (window.dragDropPlacements || {}) : placements;
          const sourceDroppableId = Object.keys(placementsMap).find((id) => {
            const v = placementsMap[id];
            return Array.isArray(v) ? v.includes(draggableId) : v === draggableId;
          });
          if (sourceDroppableId && sourceDroppableId !== resolvedDroppableId) {
            const srcConfig = droppableCells.find((c) => c.droppableId === sourceDroppableId);
            if (srcConfig && srcConfig.placedItemTransferable === false) return false;
          }
          return true;
        };
        const wrappedAcceptValidator = baseAcceptValidator
          ? (draggableId) => transferAllowedValidator(draggableId) && baseAcceptValidator(draggableId) && maxItemsValid(draggableId)
          : (draggableId) => transferAllowedValidator(draggableId) && maxItemsValid(draggableId);
        const allowPlacedDrag = cellPlacedItemDraggable !== undefined ? cellPlacedItemDraggable : placedItemDraggable;
        const wrappedOnDrop = (draggableId, targetDroppableId, position) => {
          const placementsMap = typeof window !== 'undefined' ? (window.dragDropPlacements || {}) : placements;
          const sourceDroppableId = Object.keys(placementsMap).find((id) => {
            const v = placementsMap[id];
            return Array.isArray(v) ? v.includes(draggableId) : v === draggableId;
          });
          const isTransfer = !!sourceDroppableId && sourceDroppableId !== targetDroppableId;
          if (sourceDroppableId && sourceDroppableId !== targetDroppableId) {
            const srcConfig = droppableCells.find((c) => c.droppableId === sourceDroppableId);
            const transferAllowed = srcConfig && srcConfig.placedItemTransferable !== false;
            if (!transferAllowed) {
              const sourceName = (srcConfig && srcConfig.name) || sourceDroppableId;
              const targetName = droppableConfig.name || targetDroppableId;
              const transferRejectedText =
                typeof window !== 'undefined' && window.i18n
                  ? window.i18n.t('messages.cannotDragBetweenCells', {
                    source: sourceName,
                    target: targetName
                  })
                  : `Cannot drag from ${sourceName} to ${targetName}`;
              invokeDropCallback('onIncorrectDropInCell', transferRejectedText, 'incorrect');
              return;
            }
          }
          const targetCount = toPlacementArray(placementsMap[targetDroppableId]).length;
          if (cellMaxItems > 0 && targetCount >= cellMaxItems && !isTransfer) return;
          if (cellOnDrop) cellOnDrop(draggableId, targetDroppableId, position);
          invokeDropCallback('onAddSuccess', undefined, undefined, { droppableId: targetDroppableId });
          const tableDroppableIds = droppableCells.map((c) => c.droppableId || `${componentId}-drop-R${(c.rowIndex ?? 0) + 1}C${c.colIndex ?? 0}`);
          const filledCount = tableDroppableIds.filter((id) => toPlacementArray(placementsMap[id]).length > 0).length;
          const expected = dropCallbacks.expectedPlacementCount;
          if (typeof expected === 'number' && filledCount >= expected) {
            invokeDropCallback('onAddAllSuccess');
          }
        };
        const wrappedOnDropRejected = (draggableId, targetDroppableId) => {
          if (cellOnDropRejected) cellOnDropRejected(draggableId, targetDroppableId);
          // When reject is due to transfer from a cell with placedItemTransferable: false, show specific message
          const placementsMapRej = typeof window !== 'undefined' ? (window.dragDropPlacements || {}) : placements;
          const sourceDroppableIdRej = Object.keys(placementsMapRej).find((id) => {
            const v = placementsMapRej[id];
            return Array.isArray(v) ? v.includes(draggableId) : v === draggableId;
          });
          if (sourceDroppableIdRej && sourceDroppableIdRej !== targetDroppableId) {
            const srcConfigRej = droppableCells.find((c) => c.droppableId === sourceDroppableIdRej);
            if (srcConfigRej && srcConfigRej.placedItemTransferable === false) {
              const sourceNameRej = srcConfigRej.name || sourceDroppableIdRej;
              const targetNameRej = droppableConfig.name || targetDroppableId;
              const rejText =
                typeof window !== 'undefined' && window.i18n
                  ? window.i18n.t('messages.cannotDragBetweenCells', {
                    source: sourceNameRej,
                    target: targetNameRej
                  })
                  : `Cannot drag from ${sourceNameRej} to ${targetNameRej}`;
              invokeDropCallback('onIncorrectDropInCell', rejText, 'incorrect');
              return;
            }
          }
          invokeDropCallback('onIncorrectDropInCell', undefined, undefined, {
            droppableId: targetDroppableId
          });
        };
        const isVertical = cellPlacementDirection === 'vertical';
        const placementGap = '8px';
        const slotCount = Math.max(1, cellMaxItems);
        const slotDim = slotCount <= 1 ? '100%' : `calc((100% - ${placementGap} * ${slotCount - 1}) / ${slotCount})`;
        const wrapperStyle = {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: placementGap,
          padding: processedPadding,
          boxSizing: 'border-box'
        };
        const slotStyle = slotCount <= 1
          ? { width: '100%', height: '100%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, minHeight: 0 }
          : (isVertical ? { height: slotDim, width: '100%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, minHeight: 0 } : { width: slotDim, height: '100%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, minHeight: 0 });
        // ✅ Support imageSrc inside droppableCells
        // const {
        //   imageSrc: defaultImages = []
        // } = droppableConfig;

        // // Normalize to array
        // const defaultImageArray = Array.isArray(defaultImages)
        //   ? defaultImages
        //   : [defaultImages];

        // const defaultImageElements = defaultImageArray
        //   .filter(Boolean)
        //   .map((src, index) => {

        //     // 🔥 If defaultImageDraggable is TRUE and Draggable exists
        //     if (defaultImageDraggable && window.DraggableComponent?.Draggable) {
        //       return React.createElement(
        //         window.DraggableComponent.Draggable,
        //         {
        //           key: `default-img-${index}`,
        //           draggableId: `${resolvedDroppableId}-default-${index}`,
        //           imageSrc: src,
        //           imageAlt: 'default-image',
        //           style: {
        //             maxWidth: '100%',
        //             maxHeight: '94%',
        //             objectFit: 'contain'
        //           }
        //         }
        //       );
        //     }

        //     // Otherwise normal image
        //     return React.createElement('img', {
        //       key: `default-img-${index}`,
        //       src,
        //       draggable: false,
        //       style: {
        //         maxWidth: '100%',
        //         maxHeight: '94%',
        //         objectFit: 'contain'
        //       }
        //     });
        //   });

        // Build dropped item slots
        const slots = [];
        for (let i = 0; i < slotCount; i++) {
          const placedDraggableId = placedIds[i];

          const slotContent = !placedDraggableId ? null : (() => {
            const placedContent =
              placedContentByDraggableId[placedDraggableId] ||
              (typeof window !== 'undefined' &&
                window.getDraggableBaseId &&
                placedContentByDraggableId[
                window.getDraggableBaseId(placedDraggableId)
                ]);

            if (!placedContent) return null;

            if (placedContent.text !== undefined) {
              return React.createElement('span', null, placedContent.text);
            }

            if (placedContent.imageSrc) {
              if (allowPlacedDrag && window.DraggableComponent?.Draggable) {
                return React.createElement(window.DraggableComponent.Draggable, {
                  draggableId: placedDraggableId,
                  imageSrc: placedContent.imageSrc,
                  imageAlt: placedContent.alt || '',
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }
                });
              }

              return React.createElement('img', {
                src: placedContent.imageSrc,
                alt: placedContent.alt || '',
                draggable: false,
                style: {
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }
              });
            }

            return null;
          })();

          slots.push(
            React.createElement(
              'div',
              {
                key: `slot-${i}`,
                style: slotStyle
              },
              slotContent
            )
          );
        }

        // Combine default images + dropped items
        const droppedItemsWrapper =
          placedIds.length > 0 || slotCount > 1
            ? React.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: isVertical ? 'column' : 'row',
                  gap: placementGap,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              },
              ...slots
            )
            : null;

        // Final droppable children
        const droppableChildren = React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'left',
              gap: '6px',
              padding: processedPadding,
              boxSizing: 'border-box'
            }
          },
          defaultImageElements,     // ✅ Image BEFORE drop
          droppedItemsWrapper       // ✅ Dropped items
        );
        cellContent = React.createElement(DroppableComponent, {
          droppableId: resolvedDroppableId,
          acceptValidator: wrappedAcceptValidator,
          borderStyle: 'none',
          borderWidth: 0,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          hoverBorderColor: 'transparent',
          rejectBorderColor: 'transparent',
          hoverBackgroundColor: 'transparent',
          rejectBackgroundColor: 'transparent',
          style: {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: getDataColumnTextAlign(colIndex) === 'left' ? 'flex-start' : getDataColumnTextAlign(colIndex) === 'right' ? 'flex-end' : 'center',
            boxSizing: 'border-box',
            padding: processedPadding
          },
          ...droppableProps,
          onDrop: wrappedOnDrop,
          onDropRejected: wrappedOnDropRejected
        }, droppableChildren);
      }
      cellElements.push(React.createElement('td', tdProps, cellContent));
      colIndex += colSpan;
    }
    return React.createElement('tr', {
      key: `row-${rowIndex}`,
      style: rowStyle
    }, cellElements);
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
  // Use longhand border properties to avoid React warning about mixing shorthand (border) and longhand (borderWidth)
  const containerStyle = {
    // Apply grid positioning from the element renderer
    ...(position?.css || {}),
    // Apply processed styles (already processed by math-applet.js with gc units)
    ...(processedStyles || {}),
    // Apply z-index
    zIndex: elementZIndex,
    // Table container styling
    backgroundColor: tableBackground,
    borderRadius: processedTableBorderRadius,
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...(tableBorder ? {
      borderWidth: processedTableBorderWidth,
      borderStyle: 'solid',
      borderColor: tableBorderColor
    } : {
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent'
    })
  };

  console.log('🔍 TableGridComponent containerStyle:', containerStyle);

  // When columnWidths is set, use colgroup so column widths apply (header row may have colSpan and not define columns)
  const colgroup = hasColumnWidths && columnCount > 0
    ? React.createElement('colgroup', { key: 'colgroup' },
      ...Array.from({ length: columnCount }, (_, i) =>
        React.createElement('col', {
          key: i,
          style: { width: columnWidths[i] || undefined }
        })
      )
    )
    : null;

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
        tableLayout: (equalColumnWidths || hasColumnWidths || equalRowHeights) ? 'fixed' : 'auto'
      }
    }, [colgroup,
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
    ].filter(Boolean))
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
      borderWidth: '2gc',
      rowGap: '0gc', // Gap between rows (in gc units)
      columnGap: '0gc', // Gap between columns (in gc units)
      cellBorderRadius: '12gc', // Border radius for individual cells (in gc units)
      tableBorder: true,
      tableBorderColor: '#0762a4b9',
      tableBorderWidth: '2gc',
      tableBorderRadius: '8gc',
      tableBackground: 'transparent',
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
