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
    borderColor = "#ffffff",
    headerBackgroundColor = "#2a3f5f",
    cellBackgroundColor = "transparent",
    rowBackgroundColors = [],
    columnBackgroundColors = [],
    rowTextColors = [],
    rowOverrides = {},
    textColor = "#ffffff",
    fontSize = "28gc",
    headerFontSize = "32gc",
    padding = "15gc",
    borderRadius = "8gc",
    borderWidth = "2px",
    equalColumnWidths = false,
    equalRowHeights = false,
  } = props;

  console.log("🔍 TableGridComponent RENDERED!");
  console.log("🔍 TableGridComponent props:", props);
  console.log("🔍 TableGridComponent tableData:", tableData);
  console.log("🔍 TableGridComponent position:", position);
  console.log("🔍 TableGridComponent processedStyles:", processedStyles);

  // ============================================================
  //  UNIVERSAL MIXED RENDERER (KaTeX + HTML + TEXT)
  // ============================================================
  const renderMixedContent = (text, color = "#ffffff") => {
    if (text == null) return { __html: "" };

    const fullText = String(text);

    const lines = fullText.split("\n");

    const processedLines = lines.map((line) => {
      const containsHTML = /<[^>]+>/i.test(line);

      let safeLine = line;
      if (!containsHTML) {
        safeLine = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      const segments = safeLine.split(
        /(\\frac\{.*?\}\{.*?\}|\\sqrt\{.*?\}|\\[a-zA-Z]+(?:\{.*?\})*)/g
      );

      const html = segments
        .map((seg) => {
          if (window.katex && /\\frac|\\sqrt|\\pi|\\[a-zA-Z]+/.test(seg)) {
            try {
              return window.katex.renderToString(seg, {
                throwOnError: false,
                displayMode: false,
              });
            } catch (err) {
              return `<span style="color:${color}">${seg}</span>`;
            }
          }
          return seg;
        })
        .join("");

      return `<span>${html}</span>`;
    });

    return { __html: processedLines.join("<br/>") };
  };
  // ============================================================
  //  END UNIVERSAL RENDERER
  // ============================================================

  // Process gc properties
  let processedFontSize = fontSize;
  if (
    fontSize &&
    fontSize.includes("gc") &&
    window.GridCellFontUtils &&
    window.GridCellFontUtils.processGcProperty
  ) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(
      fontSize,
      "fontSize"
    );
  }

  let processedHeaderFontSize = headerFontSize;
  if (
    headerFontSize &&
    headerFontSize.includes("gc") &&
    window.GridCellFontUtils &&
    window.GridCellFontUtils.processGcProperty
  ) {
    processedHeaderFontSize = window.GridCellFontUtils.processGcProperty(
      headerFontSize,
      "fontSize"
    );
  }

  let processedPadding = padding;
  if (
    padding &&
    padding.includes("gc") &&
    window.GridCellFontUtils &&
    window.GridCellFontUtils.processGcProperty
  ) {
    processedPadding = window.GridCellFontUtils.processGcProperty(
      padding,
      "padding"
    );
  }

  let processedBorderRadius = borderRadius;
  if (
    borderRadius &&
    borderRadius.includes("gc") &&
    window.GridCellFontUtils &&
    window.GridCellFontUtils.processGcProperty
  ) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(
      borderRadius,
      "borderRadius"
    );
  }

  // Extract headers and rows
  const headers = tableData.headers || [];
  const rows = tableData.rows || [];

  // Helpers for colors + overrides
  const getRowBackgroundColor = (rowIndex) => {
    if (Array.isArray(rowBackgroundColors) && rowBackgroundColors.length > 0) {
      return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    } else if (typeof rowBackgroundColors === "object") {
      return rowBackgroundColors[rowIndex] || cellBackgroundColor;
    }
    return cellBackgroundColor;
  };

  const getColumnBackgroundColor = (columnIndex) => {
    if (
      Array.isArray(columnBackgroundColors) &&
      columnBackgroundColors.length > 0
    ) {
      return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    } else if (typeof columnBackgroundColors === "object") {
      return columnBackgroundColors[columnIndex] || cellBackgroundColor;
    }
    return cellBackgroundColor;
  };

  const getRowTextColor = (rowIndex) => {
    if (rowOverrides[rowIndex] && rowOverrides[rowIndex].color !== undefined) {
      return rowOverrides[rowIndex].color;
    }
    if (Array.isArray(rowTextColors) && rowTextColors.length > 0) {
      return rowTextColors[rowIndex] || textColor;
    } else if (typeof rowTextColors === "object") {
      return rowTextColors[rowIndex] || textColor;
    }
    return textColor;
  };

  const getRowFontSize = (rowIndex) => {
    if (
      rowOverrides[rowIndex] &&
      rowOverrides[rowIndex].fontSize !== undefined
    ) {
      const overrideSize = rowOverrides[rowIndex].fontSize;
      if (overrideSize.includes("gc") && window.GridCellFontUtils) {
        return window.GridCellFontUtils.processGcProperty(
          overrideSize,
          "fontSize"
        );
      }
      return overrideSize;
    }
    return processedFontSize;
  };

  const getRowFontWeight = (rowIndex) => {
    if (
      rowOverrides[rowIndex] &&
      rowOverrides[rowIndex].fontWeight !== undefined
    ) {
      return rowOverrides[rowIndex].fontWeight;
    }
    return "normal";
  };

  const getCellBackgroundColor = (rowIndex, columnIndex) => {
    if (
      rowOverrides[rowIndex] &&
      rowOverrides[rowIndex].backgroundColor !== undefined
    ) {
      return rowOverrides[rowIndex].backgroundColor;
    }

    const rowColor = getRowBackgroundColor(rowIndex);
    const colColor = getColumnBackgroundColor(columnIndex);

    if (rowColor !== cellBackgroundColor) return rowColor;
    if (colColor !== cellBackgroundColor) return colColor;

    return cellBackgroundColor;
  };

  const columnCount = headers.length;
  const equalColumnWidth =
    equalColumnWidths && columnCount > 0 ? `${100 / columnCount}%` : null;

  const rowCount = rows.length;
  const equalRowHeight =
    equalRowHeights && rowCount > 0 ? `${100 / (rowCount + 1)}%` : null;

  const headerRowStyle = equalRowHeight ? { height: equalRowHeight } : {};

  // ============================================================
  //  HEADER RENDERING (WITH KATEX)
  // ============================================================
  const headerCells = headers.map((header, index) => {
    const headerBgColor = getColumnBackgroundColor(index);

    const finalHeaderBgColor =
      headerBgColor !== cellBackgroundColor
        ? headerBgColor
        : headerBackgroundColor;

    const headerStyle = {
      backgroundColor: finalHeaderBgColor,
      color: textColor,
      fontSize: processedHeaderFontSize,
      fontWeight: "bold",
      padding: processedPadding,
      border: `${borderWidth} solid ${borderColor}`,
      textAlign: "center",
      wordBreak: "break-word",
      boxSizing: "border-box",
    };

    if (equalColumnWidth) headerStyle.width = equalColumnWidth;

    return React.createElement(
      "th",
      { key: `header-${index}`, style: headerStyle },
      React.createElement("span", {
        dangerouslySetInnerHTML: renderMixedContent(header, textColor),
      })
    );
  });
  // ============================================================

  // ============================================================
  //  ROW RENDERING (WITH KATEX)
  // ============================================================
  const dataRows = rows.map((row, rowIndex) => {
    const rowStyle = equalRowHeight ? { height: equalRowHeight } : {};

    return React.createElement(
      "tr",
      { key: `row-${rowIndex}`, style: rowStyle },
      row.map((cell, cellIndex) => {
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
          textAlign: "center",
          boxSizing: "border-box",
          wordBreak: "break-word",
        };

        if (equalColumnWidth) cellStyle.width = equalColumnWidth;

        return React.createElement(
          "td",
          {
            key: `cell-${rowIndex}-${cellIndex}`,
            style: cellStyle,
          },
          React.createElement("span", {
            dangerouslySetInnerHTML: renderMixedContent(cell, cellTextColor),
          })
        );
      })
    );
  });
  // ============================================================

  console.log("🔍 TableGridComponent containerStyle:", position?.css);

  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
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
          tableLayout: equalColumnWidths || equalRowHeights ? "fixed" : "auto",
        },
      },
      [
        React.createElement(
          "thead",
          { key: "table-header" },
          React.createElement(
            "tr",
            { key: "header-row", style: headerRowStyle },
            headerCells
          )
        ),
        React.createElement("tbody", { key: "table-body" }, dataRows),
      ]
    )
  );
});

// Table Grid Element Configuration
const TableGridElement = {
  tableGrid: {
    type: "table-grid",
    coordinates: [400, 250, 1200, 450],
    zIndex: "var(--z-content)",
    props: {
      tableData: {
        headers: ["Ride", "Number of Visitors"],
        rows: [
          ["Roller coaster", "24"],
          ["Ferris wheel", "…"],
          ["Merry-go-round", "18"],
          ["Haunted house", "…"],
        ],
      },
      borderColor: "#ffffff",
      headerBackgroundColor: "#2a3f5f",
      cellBackgroundColor: "transparent",
      rowBackgroundColors: [],
      columnBackgroundColors: [],
      rowTextColors: [],
      rowOverrides: {},
      textColor: "#ffffff",
      fontSize: "28gc",
      headerFontSize: "32gc",
      padding: "15gc",
      borderRadius: "8gc",
      borderWidth: "2px",
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory(
      "table-grid",
      (props, elementId) => React.createElement(TableGridComponent, props)
    ),
  },
};

// Export component and configuration
window.TableGridComponent = {
  TableGridComponent,
  TableGridElement,
};

console.log("✅ Table Grid component loaded successfully");
