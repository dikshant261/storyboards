/**
 * Times Table Component - React 18 Optimized
 * 
 * A reusable component for generating multiplication tables with automatic cell height calculation
 * to fit within specified coordinates.
 * 
 * @fileoverview
 * This component generates multiplication tables (e.g., "4 × 1 = 4", "4 × 2 = 8", etc.)
 * with automatic cell height calculation to ensure all rows fit perfectly within the
 * provided coordinates. It wraps the TableGridComponent and provides a simplified API
 * specifically for multiplication tables.
 * 
 * @example
 * // Basic usage in PageConfig.js
 * {
 *   id: 'page3-multiplication-table',
 *   type: 'custom',
 *   coordinates: [1125, 120, 1565, 700],
 *   props: () => ({
 *     componentType: 'TimesTableComponent',
 *     multiplier: 4,
 *     rangeStart: 1,
 *     rangeEnd: 10,
 *     coordinates: [1125, 120, 1565, 700]
 *   })
 * }
 * 
 * @example
 * // With custom styling
 * {
 *   componentType: 'TimesTableComponent',
 *   multiplier: 6,
 *   rangeStart: 1,
 *   rangeEnd: 12,
 *   coordinates: [100, 50, 500, 600],
 *   fontSize: '28gc',
 *   textColor: '#333333',
 *   cellBackgroundColor: '#F0F0F0',
 *   rowGap: '10gc'
 * }
 * 
 * @example
 * // With header
 * {
 *   componentType: 'TimesTableComponent',
 *   multiplier: 5,
 *   showHeader: true,
 *   headerText: 'Multiplication Table of 5',
 *   coordinates: [100, 50, 500, 600]
 * }
 * 
 * @author Math Learning App
 * @version 1.0.0
 */

/**
 * Times Table Component
 * 
 * Generates a multiplication table for a given multiplier and range.
 * Automatically calculates cell heights to fit within the provided coordinates.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.multiplier=1] - The number to multiply (e.g., 4 for "4 × 1 = 4", "4 × 2 = 8")
 * @param {number} [props.rangeStart=1] - Starting value for the multiplier range (inclusive)
 * @param {number} [props.rangeEnd=10] - Ending value for the multiplier range (inclusive)
 * @param {boolean} [props.showHeader=false] - Whether to display a header row above the table
 * @param {string} [props.headerText] - Custom header text. If not provided and showHeader is true,
 *                                      defaults to "Table of {multiplier}"
 * @param {string} [props.headerFontSize] - Header text font size. If not provided, uses fontSize prop.
 * @param {string} [props.headerTextColor] - Header text color. If not provided, uses textColor prop.
 * @param {Array<number>} props.coordinates - Required. Array of 4 numbers [x1, y1, x2, y2] defining
 *                                           the container boundaries in grid coordinates. Used as the base
 *                                           for calculating actual table boundaries. Format: [left, top, right, bottom]
 * @param {number} [props.usableWidth] - Optional. Percentage of container width to use (0-100).
 *                                     If provided, calculates actual width as: containerWidth × (usableWidth / 100).
 *                                     Table is centered horizontally within container.
 * @param {number} [props.usableHeight] - Optional. Percentage of container height to use (0-100).
 *                                      If provided, calculates actual height as: containerHeight × (usableHeight / 100).
 *                                      Table starts from container top (y1).
 * @param {string} [props.rowGap='8gc'] - Gap between rows in grid coordinates (gc) or pixels (px).
 *                                       Format: "8gc" or "8px". Used in cell height calculation.
 * @param {string} [props.fontSize='32gc'] - Font size for table text. Supports gc units or px.
 * @param {string} [props.textColor='#000000'] - Text color in hex format (e.g., '#000000' for black)
 * @param {string} [props.cellBackgroundColor='#E0E0E0'] - Background color for all cells in hex format
 * @param {string} [props.cellBorderRadius='8gc'] - Border radius for individual cells
 * @param {string} [props.padding='10gc'] - Padding inside each cell
 * @param {string} [props.borderWidth='0px'] - Border width for cells (default: no border)
 * @param {string} [props.textAlign='center'] - Text alignment within cells ('left', 'center', 'right')
 * @param {string} [props.fontWeight='normal'] - Font weight ('normal', 'bold', '100', '200', etc.)
 * @param {boolean} [props.equalColumnWidths=true] - Whether all columns should have equal width
 * @param {boolean} [props.equalRowHeights=true] - Whether all rows should have equal height
 * @param {string} [props.backgroundColor='transparent'] - Background color for the entire table
 * @param {string} [props.columnGap='0gc'] - Gap between columns
 * @param {number} [props.buttonHeightPercent=90] - Button height as percentage of row height (0-100)
 * @param {number} [props.buttonWidthPercent=100] - Button width as percentage of row/cell width (0-100). 
 *                                                   Controls what percentage of the row width the button should occupy.
 *                                                   Default 100% to fill available space. Set to lower values (e.g., 70, 80) 
 *                                                   to make buttons narrower than the row width.
 * @param {string} [props.buttonBackgroundColor] - Button background color (defaults to cellBackgroundColor)
 * @param {string} [props.buttonTextColor] - Button text color (defaults to textColor)
 * @param {string} [props.buttonBorderRadius] - Button border radius (defaults to cellBorderRadius)
 * @param {string} [props.buttonBorderWidth='2px'] - Button border width
 * @param {string} [props.buttonBorderColor='#969696'] - Button border color
 * @param {string} [props.rowBorderWidth='2px'] - Border width for table rows
 * @param {string} [props.rowBorderColor='#ff0000'] - Border color for table rows (default: red)
 * @param {string} [props.containerBorderWidth] - Border width for container wrapper (default: no border)
 * @param {string} [props.containerBorderColor] - Border color for container wrapper
 * @param {string} [props.containerBorderRadius] - Border radius for container wrapper
 * @param {string} [props.containerBorderStyle='solid'] - Border style for container (solid, dashed, dotted, etc.)
 * @param {Function} [props.onButtonClick] - Callback function for button clicks: (multiplier, value, result) => void
 * @param {Object} [props.otherProps] - Any additional props to pass to the underlying TableGridComponent
 * 
 * @returns {React.ReactElement|null} The rendered multiplication table or null if TableGridComponent is not available
 * 
 * @description
 * ## Auto Cell Height Calculation
 * 
 * The component automatically calculates cell heights to ensure all rows fit within the coordinates:
 * 
 * ```
 * tableHeight = coordinates[3] - coordinates[1]  // y2 - y1
 * numDataRows = rangeEnd - rangeStart + 1
 * numRows = numDataRows + (showHeader ? 1 : 0)
 * totalRowGaps = (numRows - 1) × rowGapValue
 * availableHeight = tableHeight - totalRowGaps
 * cellHeight = floor(availableHeight / numRows)
 * ```
 * 
 * Example:
 * - Coordinates: [1125, 120, 1565, 700] → tableHeight = 580gc
 * - Range: 1-10 → numDataRows = 10
 * - Row gap: 8gc → totalRowGaps = 9 × 8 = 72gc
 * - Available height: 580 - 72 = 508gc
 * - Cell height: floor(508 / 10) = 50gc
 * 
 * @description
 * ## Generated Table Format
 * 
 * The component generates rows in the format: "{multiplier} × {i} = {result}"
 * 
 * Example for multiplier=4, rangeStart=1, rangeEnd=5:
 * - "4 × 1 = 4"
 * - "4 × 2 = 8"
 * - "4 × 3 = 12"
 * - "4 × 4 = 16"
 * - "4 × 5 = 20"
 * 
 * @description
 * ## Dependencies
 * 
 * - Requires `window.TableGridComponent.TableGridComponent` to be available
 * - Requires `window.SharedUtilities` for optimized element factory (optional)
 * 
 * @description
 * ## Performance
 * 
 * Uses React.memo for performance optimization. Row generation and cell height calculation
 * are memoized using React.useMemo to prevent unnecessary recalculations.
 * 
 * @description
 * ## Error Handling
 * 
 * - If coordinates are invalid or missing, falls back to default cell height of '40gc'
 * - If TableGridComponent is not available, returns null and logs an error
 * - Warns in console if coordinates format is invalid
 */
const TimesTableComponent = React.memo((props) => {
  const {
    multiplier = 1, // The number to multiply (e.g., 4 for "4 x 1 = 4")
    rangeStart = 1, // Starting multiplier value
    rangeEnd = 10, // Ending multiplier value
    showHeader = false, // Whether to show a header row
    headerText, // Custom header text (default: "Table of {multiplier}")
    headerFontSize, // Header text font size (defaults to fontSize if not specified)
    headerTextColor, // Header text color (defaults to textColor if not specified)
    coordinates, // [x1, y1, x2, y2] container boundaries for calculating actual table size
    usableWidth, // Optional: percentage of container width to use (0-100)
    usableHeight, // Optional: percentage of container height to use (0-100)
    rowGap = '8gc', // Gap between rows
    fontSize = '32gc', // Font size for table text
    textColor = '#000000', // Text color
    cellBackgroundColor = '#E0E0E0', // Background color for cells
    cellBorderRadius = '8gc', // Border radius for cells
    padding = '10gc', // Cell padding
    borderWidth = '0px', // Border width (default no border)
    textAlign = 'center', // Text alignment
    fontWeight = 'normal', // Font weight
    equalColumnWidths = true, // Equal column widths
    equalRowHeights = true, // Equal row heights
    backgroundColor = 'transparent', // Background color for table
    columnGap = '0gc', // Gap between columns
    buttonHeightPercent = 90, // Button height as percentage of row height (default 90%)
    buttonWidthPercent = 100, // Button width as percentage of row/cell width (default 100% to fill space). Controls what % of the row width the button should occupy.
    buttonBackgroundColor, // Button background color (defaults to cellBackgroundColor)
    buttonTextColor, // Button text color (defaults to textColor)
    buttonBorderRadius, // Button border radius (defaults to cellBorderRadius)
    buttonBorderWidth = '2px', // Button border width
    buttonBorderColor = '#969696', // Button border color
    rowBorderWidth = '2px', // Border width for table rows (default 2px)
    rowBorderColor = '#ff0000', // Border color for table rows (default red)
    containerBorderWidth, // Border width for container (default: no border)
    containerBorderColor, // Border color for container
    containerBorderRadius, // Border radius for container
    containerBorderStyle = 'solid', // Border style for container (solid, dashed, dotted, etc.)
    onButtonClick, // Callback function for button clicks: (multiplier, value, result) => void
    id, // Element ID (e.g., 'page4-multiplication-table')
    elementName, // Element name
    ...otherProps // Any other props to pass to TableGridComponent
  } = props;


  // Generate header row if showHeader is true
  // Default header text: "Table of {multiplier}" (e.g., "Table of 4")
  // Can be customized via headerText prop
  const headers = React.useMemo(() => {
    if (!showHeader) return [];
    const defaultHeaderText = `Table of ${multiplier}`;
    return [headerText || defaultHeaderText];
  }, [showHeader, headerText, multiplier]);

  /**
   * Calculate actual table coordinates based on container coordinates and usable percentages
   * 
   * If usableWidth or usableHeight are provided, calculates the actual table boundaries:
   * - usableWidth: Centers table horizontally, uses percentage of container width
   * - usableHeight: Starts from container top, uses percentage of container height
   */
  const actualCoordinates = React.useMemo(() => {
    if (!coordinates || coordinates.length !== 4) {
      return coordinates; // Return as-is if invalid, will be handled in cell height calculation
    }

    const [x1, y1, x2, y2] = coordinates;
    const containerWidth = x2 - x1;
    const containerHeight = y2 - y1;

    let actualX1 = x1;
    let actualY1 = y1;
    let actualX2 = x2;
    let actualY2 = y2;

    // Calculate width if usableWidth is provided
    if (usableWidth !== undefined && usableWidth !== null) {
      const percentage = Math.max(0, Math.min(100, usableWidth)) / 100; // Clamp to 0-100
      const actualWidth = containerWidth * percentage;
      const horizontalOffset = (containerWidth - actualWidth) / 2; // Center horizontally
      actualX1 = x1 + horizontalOffset;
      actualX2 = actualX1 + actualWidth;
    }

    // Calculate height if usableHeight is provided
    if (usableHeight !== undefined && usableHeight !== null) {
      const percentage = Math.max(0, Math.min(100, usableHeight)) / 100; // Clamp to 0-100
      const actualHeight = containerHeight * percentage;
      actualY1 = y1; // Start from container top
      actualY2 = actualY1 + actualHeight;
    }

    // Debug logging for coordinate calculation
    if (usableWidth !== undefined || usableHeight !== undefined) {
      console.log('📊 [TimesTable] Coordinate calculation:', {
        containerCoordinates: coordinates,
        containerWidth,
        containerHeight,
        usableWidth: usableWidth !== undefined ? `${usableWidth}%` : 'not set',
        usableHeight: usableHeight !== undefined ? `${usableHeight}%` : 'not set',
        actualCoordinates: [actualX1, actualY1, actualX2, actualY2],
        actualWidth: actualX2 - actualX1,
        actualHeight: actualY2 - actualY1
      });
    }

    return [actualX1, actualY1, actualX2, actualY2];
  }, [coordinates, usableWidth, usableHeight]);

  /**
   * Calculate cell height to fit within coordinates
   * 
   * This is the core feature: automatically calculates the optimal cell height
   * so that all rows (including header if present) fit perfectly within the
   * provided coordinate boundaries.
   * 
   * Calculation steps:
   * 1. Extract table height from coordinates (y2 - y1)
   * 2. Count total number of rows (data rows + header if shown)
   * 3. Calculate total space used by row gaps: (numRows - 1) × rowGap
   * 4. Subtract gaps from total height to get available space for cells
   * 5. Divide available space by number of rows to get cell height per row
   * 
   * Uses Math.floor to ensure cells don't overflow the container.
   */
  const cellHeight = React.useMemo(() => {
    // Use actualCoordinates (calculated from usableWidth/usableHeight if provided)
    const coords = actualCoordinates;
    
    // Validate coordinates format
    if (!coords || coords.length !== 4) {
      console.warn('⚠️ [TimesTable] Invalid coordinates, using default cell height');
      return '40gc';
    }

    const [x1, y1, x2, y2] = coords;
    const tableHeight = y2 - y1; // Total vertical space available
    const numDataRows = rangeEnd - rangeStart + 1; // Number of multiplication rows
    const numRows = numDataRows + (showHeader ? 1 : 0); // Total rows including header
    
    // Extract numeric value from rowGap string (e.g., "8gc" -> 8, "10px" -> 10)
    // Supports both gc (grid coordinates) and px (pixels) units
    const rowGapMatch = rowGap.match(/^(\d+(?:\.\d+)?)/);
    const rowGapValue = rowGapMatch ? parseFloat(rowGapMatch[1]) : 0;
    
    // Calculate spacing: (n rows) need (n-1) gaps between them
    const totalRowGaps = (numRows - 1) * rowGapValue;
    const availableHeight = tableHeight - totalRowGaps; // Space left for actual cells
    const calculatedCellHeight = Math.floor(availableHeight / numRows); // Height per cell
    
    // Debug logging (can be removed in production if desired)
    console.log('📊 [TimesTable] Cell height calculation:', {
      tableHeight,
      numDataRows,
      numRows,
      rowGapValue,
      totalRowGaps,
      availableHeight,
      calculatedCellHeight
    });
    
    return `${calculatedCellHeight}gc`; // Return as gc unit string
  }, [actualCoordinates, rangeStart, rangeEnd, showHeader, rowGap]);

  // Calculate row height in numeric value for button dimension calculations
  const rowHeightValue = React.useMemo(() => {
    const cellHeightMatch = cellHeight.match(/^(\d+(?:\.\d+)?)/);
    return cellHeightMatch ? parseFloat(cellHeightMatch[1]) : 50; // Default to 50gc if not calculated yet
  }, [cellHeight]);

  // Calculate button dimensions based on row height and percentages
  // Height: percentage of row height
  // Width: percentage of cell width (which is the full table width for single column)
  const buttonHeight = React.useMemo(() => {
    const heightPercent = Math.max(0, Math.min(100, buttonHeightPercent)) / 100;
    return `${Math.floor(rowHeightValue * heightPercent)}gc`;
  }, [rowHeightValue, buttonHeightPercent]);

  // Button width should use percentage of available cell width, not row height
  // For single column table, cell width = table width
  const buttonWidth = React.useMemo(() => {
    // Use percentage of cell width (100% by default, or buttonWidthPercent if specified)
    // Since we have 1 column, the cell takes full width
    const widthPercent = buttonWidthPercent !== undefined 
      ? Math.max(0, Math.min(100, buttonWidthPercent)) 
      : 100; // Default to 100% if not specified
    return `${widthPercent}%`;
  }, [buttonWidthPercent]);

  // Generate multiplication table rows with buttons
  // Each cell contains a button with the multiplication sentence
  // n rows where n = rangeEnd - rangeStart + 1, only 1 column
  const rows = React.useMemo(() => {
    const tableRows = [];
    const btnBgColor = buttonBackgroundColor || cellBackgroundColor;
    const btnTextColor = buttonTextColor || textColor;
    const btnBorderRadius = buttonBorderRadius || cellBorderRadius;
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const result = multiplier * i;
      const sentence = `${multiplier} × ${i} = ${result}`;
      const buttonId = `times-table-btn-${multiplier}-${i}`;
      
      // Create button HTML with inline styles
      // Button uses full cell width (100% or buttonWidthPercent) and height based on row height
      const buttonHTML = `
        <button 
          id="${buttonId}"
          style="
            width: ${buttonWidth};
            height: ${buttonHeight};
            max-width: 100%;
            background-color: ${btnBgColor};
            color: ${btnTextColor};
            border: ${buttonBorderWidth} solid ${buttonBorderColor};
            border-radius: ${btnBorderRadius};
            font-size: ${fontSize};
            font-weight: ${fontWeight};
            padding: 8gc 12gc;
            margin: 0 auto;
            cursor: pointer;
            display: block;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            text-align: center;
            transition: all 0.2s ease;
            opacity: 1;
            filter: none;
          "
          onmouseover="if(!this.disabled) this.style.opacity='0.8'"
          onmouseout="if(!this.disabled) this.style.opacity='1'"
        >
          ${sentence}
        </button>
      `;
      
      tableRows.push([buttonHTML]);
    }
    return tableRows;
  }, [multiplier, rangeStart, rangeEnd, buttonHeight, buttonWidth, buttonBackgroundColor, cellBackgroundColor, buttonTextColor, textColor, buttonBorderRadius, cellBorderRadius, buttonBorderWidth, buttonBorderColor, fontSize, fontWeight]);

  // Generate data row background colors array
  // All rows use the same cellBackgroundColor
  // This array is passed to TableGridComponent's dataRowBackgroundColors prop
  const dataRowBackgroundColors = React.useMemo(() => {
    const numDataRows = rangeEnd - rangeStart + 1;
    return Array(numDataRows).fill(cellBackgroundColor);
  }, [rangeEnd, rangeStart, cellBackgroundColor]);

  // Prepare table data structure for TableGridComponent
  // Format: { headers: string[], rows: string[][] }
  const tableData = React.useMemo(() => ({
    headers: headers,
    rows: rows
  }), [headers, rows]);

  // Calculate actual table width from coordinates for width constraint
  const tableWidth = React.useMemo(() => {
    if (!actualCoordinates || actualCoordinates.length !== 4) {
      return null;
    }
    const [x1, y1, x2, y2] = actualCoordinates;
    const width = x2 - x1;
    return `${width}gc`; // Return as gc unit string
  }, [actualCoordinates]);

  // Calculate horizontal offset for centering when usableWidth < 100%
  const horizontalOffset = React.useMemo(() => {
    if (!coordinates || coordinates.length !== 4 || usableWidth === undefined) {
      return null;
    }
    const [x1, y1, x2, y2] = coordinates;
    const containerWidth = x2 - x1;
    const percentage = Math.max(0, Math.min(100, usableWidth)) / 100;
    const actualWidth = containerWidth * percentage;
    const offset = (containerWidth - actualWidth) / 2;
    return `${offset}gc`;
  }, [coordinates, usableWidth]);

  // Merge all props for TableGridComponent
  // This component acts as a wrapper, transforming TimesTableComponent props
  // into TableGridComponent props format
  // When using buttons, make cell backgrounds transparent so buttons are visible
  const tableGridProps = {
    tableData, // Generated multiplication rows with buttons
    cellHeight, // Auto-calculated to fit coordinates
    padding: '0gc', // No padding when using buttons (buttons handle their own spacing)
    textAlign: 'center', // Center buttons in cells
    fontSize,
    fontWeight,
    textColor,
    headerFontSize: headerFontSize || fontSize, // Use headerFontSize if provided, otherwise use fontSize
    headerTextColor: headerTextColor || textColor, // Use headerTextColor if provided, otherwise use textColor
    cellBackgroundColor: 'transparent', // Transparent cells so buttons are visible
    cellBorderRadius: '0gc', // No border radius on cells (buttons have their own)
    borderWidth: rowBorderWidth, // Border width for rows (configurable via rowBorderWidth prop)
    borderColor: rowBorderColor, // Border color for rows (configurable via rowBorderColor prop)
    rowGap,
    columnGap,
    equalColumnWidths,
    equalRowHeights,
    backgroundColor,
    dataRowBackgroundColors: Array(rangeEnd - rangeStart + 1).fill('transparent'), // Transparent row backgrounds
    // Add width constraint when usableWidth is specified
    ...(tableWidth && usableWidth !== undefined && usableWidth !== null ? {
      style: {
        width: tableWidth,
        maxWidth: tableWidth,
        boxSizing: 'border-box'
      }
    } : {}),
    ...otherProps // Allow passing additional TableGridComponent props
  };

  // Set up click handlers for buttons after render
  React.useEffect(() => {
    if (!onButtonClick) return;
    
    // Attach click handlers to all buttons
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const buttonId = `times-table-btn-${multiplier}-${i}`;
      const button = document.getElementById(buttonId);
      if (button) {
        const result = multiplier * i;
        button.onclick = (e) => {
          e.preventDefault();
          onButtonClick(multiplier, i, result);
        };
      }
    }
    
    // For page 4: simulate correct button click on component mount
    // Check if this is page 4 by checking the element ID or name
    const isPage4 = (id && typeof id === 'string' && id.includes('page4')) || 
                    (elementName && typeof elementName === 'string' && elementName.includes('page4')) ||
                    (typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 4);
    
    console.log('🔍 [TimesTable] Checking page 4:', {
      id,
      elementName,
      isPage4,
      hasOnButtonClick: !!onButtonClick,
      multiplier
    });
    
    if (isPage4 && onButtonClick) {
      console.log('🎯 [TimesTable] Page 4 detected! Preparing to simulate button click', {
        id,
        elementName,
        multiplier,
        hasPage4Data: !!window.page4QuestionData,
        alreadySimulated: !!window.page4ButtonClickSimulated
      });
      
      // Get question data
      let divisor = 6; // Default
      let dividend = 24; // Default
      let quotient = 4; // Default
      
      if (window.page4QuestionData) {
        divisor = window.page4QuestionData.divisor;
        dividend = window.page4QuestionData.dividend;
        quotient = window.page4QuestionData.quotient || (dividend / divisor);
        console.log('🎯 [TimesTable] Using stored page4QuestionData:', { divisor, dividend, quotient });
      } else if (window.getCurrentDivisionQuestion) {
        const question = window.getCurrentDivisionQuestion();
        divisor = question?.divisor || 6;
        dividend = question?.dividend || 24;
        quotient = question?.quotient || (dividend / divisor);
        console.log('🎯 [TimesTable] Using getCurrentDivisionQuestion:', { divisor, dividend, quotient, question });
      }
      
      // The correct button is where multiplier × value = dividend
      // multiplier is the divisor, so: divisor × value = dividend
      // Therefore: value = dividend / divisor = quotient
      const correctValue = quotient;
      const correctResult = multiplier * quotient; // multiplier (divisor) × quotient = dividend
      
      console.log('🎯 [TimesTable] Calculated correct button:', {
        multiplier,
        correctValue,
        correctResult,
        dividend,
        matches: correctResult === dividend
      });
      
      // Wait for buttons to be fully set up, then simulate click
      const simulateClick = () => {
        if (window.page4ButtonClickSimulated) {
          console.log('⚠️ [TimesTable] Button click already simulated, skipping');
          return;
        }
        
        if (correctResult === dividend) {
          console.log('✅ [TimesTable] Simulating correct button click on page 4:', {
            multiplier,
            divisor: correctValue,
            result: correctResult,
            dividend
          });
          window.page4ButtonClickSimulated = true;
          // Pass skipSound=true as 4th parameter to avoid sound errors on automatic simulation
          // (no user interaction, so browser will block audio)
          onButtonClick(multiplier, correctValue, correctResult, true);
        } else {
          console.warn('⚠️ [TimesTable] Correct result does not match dividend:', {
            correctResult,
            dividend,
            multiplier,
            divisor: correctValue
          });
        }
      };
      
      // Try multiple times with increasing delays
      setTimeout(simulateClick, 500);
      setTimeout(simulateClick, 1000);
      setTimeout(simulateClick, 2000);
    }
    
    // Cleanup function to remove handlers
    return () => {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        const buttonId = `times-table-btn-${multiplier}-${i}`;
        const button = document.getElementById(buttonId);
        if (button) {
          button.onclick = null;
        }
      }
    };
  }, [multiplier, rangeStart, rangeEnd, onButtonClick]);

  // Debug logging (can be removed in production if desired)
  console.log('📊 [TimesTable] Rendering with props:', {
    multiplier,
    rangeStart,
    rangeEnd,
    showHeader,
    cellHeight,
    numRows: rows.length,
    buttonHeight,
    buttonWidth,
    usableWidth,
    usableHeight,
    tableWidth,
    actualCoordinates
  });

  // Get TableGridComponent from global window object
  // This component depends on TableGridComponent being loaded first
  const TableGridComponent = window.TableGridComponent?.TableGridComponent;
  
  // Error handling: return null if dependency is missing
  if (!TableGridComponent) {
    console.error('❌ [TimesTable] TableGridComponent not found! Make sure table-grid-component.js is loaded first.');
    return null;
  }

  // Build container style with optional border (applied to outer container for visibility)
  const containerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    boxSizing: 'border-box'
  };
  
  // Add border styles to outer container if container border props are provided
  if (containerBorderWidth) {
    containerStyle.borderWidth = containerBorderWidth;
    containerStyle.borderStyle = containerBorderStyle;
    if (containerBorderColor) {
      containerStyle.borderColor = containerBorderColor;
    }
    if (containerBorderRadius) {
      containerStyle.borderRadius = containerBorderRadius;
    }
    containerStyle.padding = '5gc'; // Add padding when border is present for better visibility
  }
  
  // If usableWidth is specified, wrap in a container div to constrain width and center
  // Apply wrapper when usableWidth is defined and less than 100%, or when explicitly set
  if (tableWidth && usableWidth !== undefined && usableWidth !== null) {
    containerStyle.justifyContent = usableWidth < 100 ? 'center' : 'flex-start'; // Center only if < 100%
    
    // Build inner container style
    const innerStyle = {
      width: tableWidth,
      maxWidth: tableWidth,
      boxSizing: 'border-box'
    };
    
    return React.createElement('div', {
      style: containerStyle
    }, React.createElement('div', {
      style: innerStyle
    }, React.createElement(TableGridComponent, tableGridProps)));
  }

  // If container border is specified but no usableWidth, wrap in container anyway
  if (containerBorderWidth) {
    return React.createElement('div', {
      style: containerStyle
    }, React.createElement(TableGridComponent, tableGridProps));
  }

  // Render the underlying TableGridComponent with transformed props (no width constraint)
  return React.createElement(TableGridComponent, tableGridProps);
});

/**
 * Times Table Element Configuration
 * 
 * Element configuration object for registering with StandardElements.
 * This allows the component to be used via the StandardElements API.
 * 
 * @type {Object}
 * @property {string} name - Element name identifier: 'times-table'
 * @property {string} type - Element type: 'custom'
 * @property {Object} defaultProps - Default property values for the component
 * @property {Function} createOptimized - Factory function for creating optimized element instances
 */
const TimesTableElement = {
  name: 'times-table',
  type: 'custom',
  defaultProps: {
    multiplier: 1,
    rangeStart: 1,
    rangeEnd: 10,
    showHeader: false,
    rowGap: '8gc',
    fontSize: '32gc',
    textColor: '#000000',
    cellBackgroundColor: '#E0E0E0',
    cellBorderRadius: '8gc',
    padding: '10gc',
    borderWidth: '0px',
    textAlign: 'center',
    fontWeight: 'normal',
    equalColumnWidths: true,
    equalRowHeights: true,
    backgroundColor: 'transparent',
    columnGap: '0gc'
  },
  
  createOptimized: window.SharedUtilities?.createOptimizedElementFactory('times-table', (props, elementId) => {
    return React.createElement(TimesTableComponent, props);
  })
};

/**
 * Export component and configuration to global window object
 * 
 * Makes the component available globally for use in:
 * - PageConfig.js (via componentType: 'TimesTableComponent')
 * - elements-registry.js (for StandardElements registration)
 * - Direct React.createElement calls
 * 
 * @namespace window.TimesTableComponent
 * @property {React.Component} TimesTableComponent - The main React component
 * @property {Object} TimesTableElement - Element configuration for StandardElements
 * 
 * @example
 * // Access the component directly
 * const Component = window.TimesTableComponent.TimesTableComponent;
 * React.createElement(Component, { multiplier: 5, coordinates: [100, 50, 500, 600] });
 * 
 * @example
 * // Use via PageConfig (recommended)
 * {
 *   componentType: 'TimesTableComponent',
 *   multiplier: 5,
 *   coordinates: [100, 50, 500, 600]
 * }
 */
window.TimesTableComponent = {
  TimesTableComponent,
  TimesTableElement
};

console.log('✅ Times Table component loaded successfully');
console.log('✅ TimesTableComponent exported:', window.TimesTableComponent);
console.log('✅ TimesTableComponent.TimesTableComponent:', window.TimesTableComponent?.TimesTableComponent);

