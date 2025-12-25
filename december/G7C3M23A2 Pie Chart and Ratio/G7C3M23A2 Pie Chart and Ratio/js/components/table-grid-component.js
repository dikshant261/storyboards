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
    rowBackgroundColors = [],
    columnBackgroundColors = [],
    rowTextColors = [],
    rowOverrides = {},
    textColor = '#ffffff',
    fontSize = '28gc',
    headerFontSize = '32gc',
    padding = '15gc',
    borderRadius = '8gc',
    borderWidth = '2px',
    equalColumnWidths = false,
    equalRowHeights = false
  } = props;

  // Process gc properties
  let processedFontSize = fontSize;
  if (fontSize?.includes('gc') && window.GridCellFontUtils) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  let processedHeaderFontSize = headerFontSize;
  if (headerFontSize?.includes('gc') && window.GridCellFontUtils) {
    processedHeaderFontSize = window.GridCellFontUtils.processGcProperty(headerFontSize, 'fontSize');
  }

  let processedPadding = padding;
  if (padding?.includes('gc') && window.GridCellFontUtils) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedBorderRadius = borderRadius;
  if (borderRadius?.includes('gc') && window.GridCellFontUtils) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  const headers = tableData.headers || [];
  const rows = tableData.rows || [];

  const getRowBackgroundColor = (rowIndex) => {
    if (Array.isArray(rowBackgroundColors)) return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    if (typeof rowBackgroundColors === 'object') return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    return cellBackgroundColor;
  };

  const getColumnBackgroundColor = (columnIndex) => {
    if (Array.isArray(columnBackgroundColors)) return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    if (typeof columnBackgroundColors === 'object') return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    return cellBackgroundColor;
  };

  const getRowTextColor = (rowIndex) => {
    if (rowOverrides[rowIndex]?.color) return rowOverrides[rowIndex].color;
    if (Array.isArray(rowTextColors)) return rowTextColors[rowIndex] || textColor;
    if (typeof rowTextColors === 'object') return rowTextColors[rowIndex] || textColor;
    return textColor;
  };

  const getRowFontSize = (rowIndex) => {
    if (rowOverrides[rowIndex]?.fontSize) {
      const size = rowOverrides[rowIndex].fontSize;
      return size.includes("gc")
        ? window.GridCellFontUtils.processGcProperty(size, "fontSize")
        : size;
    }
    return processedFontSize;
  };

  const getRowFontWeight = (rowIndex) => {
    return rowOverrides[rowIndex]?.fontWeight || "normal";
  };

  const getCellBackgroundColor = (rowIndex, colIndex) => {
    if (rowOverrides[rowIndex]?.backgroundColor) return rowOverrides[rowIndex].backgroundColor;

    const rowColor = getRowBackgroundColor(rowIndex);
    const colColor = getColumnBackgroundColor(colIndex);

    if (rowColor !== cellBackgroundColor) return rowColor;
    if (colColor !== cellBackgroundColor) return colColor;

    return cellBackgroundColor;
  };

  const columnCount = headers.length;
  const equalColumnWidth = equalColumnWidths && columnCount > 0 ? `${100 / columnCount}%` : null;

  const rowCount = rows.length;
  const equalRowHeight = equalRowHeights && rowCount > 0 ? `${100 / (rowCount + 1)}%` : null;

  // ---------- HEADER CELLS (UPDATED FOR HTML SUPPORT) ----------
  const headerCells = headers.map((header, index) => {
    const colBgColor = getColumnBackgroundColor(index);
    const finalHeaderBgColor = colBgColor !== cellBackgroundColor ? colBgColor : headerBackgroundColor;

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

    if (equalColumnWidth) {
      headerStyle.width = equalColumnWidth;
    }

    return React.createElement("th", {
      key: `header-${index}`,
      style: headerStyle,
      dangerouslySetInnerHTML: { __html: header }  // ⬅ ENABLE HTML
    });
  });

  // ---------- ROW CELLS (UPDATED FOR HTML SUPPORT) ----------
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = {};
    if (equalRowHeight) rowStyle.height = equalRowHeight;

    return React.createElement(
      "tr",
      { key: `row-${rowIndex}`, style: rowStyle },
      row.map((cell, colIndex) => {
        const bgColor = getCellBackgroundColor(rowIndex, colIndex);
        const txtColor = getRowTextColor(rowIndex);
        const fSize = getRowFontSize(rowIndex);
        const fWeight = getRowFontWeight(rowIndex);

        const cellStyle = {
          backgroundColor: bgColor,
          color: txtColor,
          fontSize: fSize,
          fontWeight: fWeight,
          padding: processedPadding,
          border: `${borderWidth} solid ${borderColor}`,
          textAlign: "center",
          boxSizing: "border-box",
          overflow: "hidden",
          wordBreak: "break-word"
        };

        if (equalColumnWidth) {
          cellStyle.width = equalColumnWidth;
        }

        return React.createElement("td", {
          key: `cell-${rowIndex}-${colIndex}`,
          style: cellStyle,
          dangerouslySetInnerHTML: { __html: cell }  // ⬅ ENABLE HTML
        });
      })
    );
  });

  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex
  };

  return React.createElement(
    "div",
    { id: elementId, style: containerStyle },
    React.createElement(
      "table",
      {
        style: {
          width: "100%",
          height: "100%",
          borderCollapse: "collapse",
          borderRadius: processedBorderRadius,
          overflow: "hidden",
          backgroundColor: "transparent",
          tableLayout: equalColumnWidths || equalRowHeights ? "fixed" : "auto"
        }
      },
      [
        React.createElement("thead", { key: "table-header" },
          React.createElement("tr", { key: "header-row" }, headerCells)
        ),

        React.createElement("tbody", { key: "table-body" }, dataRows)
      ]
    )
  );
});

// -----------------------------------------------------------
// Table Grid Element Definition
// -----------------------------------------------------------

const TableGridElement = {
  tableGrid: {
    type: 'table-grid',
    coordinates: [400, 250, 1200, 450],
    zIndex: 'var(--z-content)',
    props: {
      tableData: {
        headers: [
          "Total<br/>Students",
          "Passed<br/>(60%)",
          "Failed<br/>(40%)",
          "Ratio in<br/>Simplest Form"
        ],
        rows: [
          ["40", "24<br/><small>(Boys: 14, Girls: 10)</small>", "16", "3:2"]
        ]
      }
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory(
      "table-grid",
      (props, elementId) => React.createElement(TableGridComponent, props)
    )
  }
};

// Export
window.TableGridComponent = {
  TableGridComponent,
  TableGridElement
};

console.log("✅ Table Grid component with HTML support loaded successfully");
