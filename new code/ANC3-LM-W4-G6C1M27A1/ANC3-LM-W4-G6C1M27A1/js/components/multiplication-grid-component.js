/**
 * Multiplication Grid Component
 * 
 * A fully interactive React component for visualizing and solving long multiplication
 * with carries, partial products, and step-by-step validation.
 */

(function() {
  'use strict';
  
  // Check if React is available
  if (typeof React === 'undefined') {
    console.error('❌ MultiplicationGrid: React is not loaded. Please load React before this component.');
    return;
  }
  
  console.log('🔍 [MultiplicationGrid] Component file loading - VERSION 2.0 - Using React.useState directly');
  
  // Use React hooks directly to avoid conflicts with other files
  // const { useState, useEffect, useCallback, useRef } = React;
  
  // ===== HELPER FUNCTIONS =====
  
  /**
   * Convert a number to an array of digits (right-to-left for calculation)
   */
  const numberToDigits = (num) => {
    return String(Math.abs(num)).split('').map(Number);
  };
  
  /**
   * Calculate partial product for a multiplier digit
   * Returns { digits: [], carries: [] }
   */
  const calculatePartialProduct = (multiplicand, multiplierDigit, shift = 0) => {
    const multiplicandDigits = numberToDigits(multiplicand);
    const result = [];
    const carries = [];
    let carry = 0;
    
    // Multiply each digit from right to left
    for (let i = multiplicandDigits.length - 1; i >= 0; i--) {
      const product = multiplicandDigits[i] * multiplierDigit + carry;
      result.unshift(product % 10);
      carries.unshift(Math.floor(product / 10));
      carry = Math.floor(product / 10);
    }
    
    // Add final carry if present
    if (carry > 0) {
      result.unshift(carry);
      carries.unshift(0);
    }
    
    // Add null for positional shift (will be rendered as blank spaces)
    for (let i = 0; i < shift; i++) {
      result.push(null);
      carries.push(null);
    }
    
    return { digits: result, carries };
  };
  
  /**
   * Calculate the final sum of all partial products
   */
  const calculateSum = (partialProducts) => {
    const maxLength = Math.max(...partialProducts.map(pp => pp.length));
    const result = [];
    const carries = [];
    let carry = 0;
    
    // Add from right to left
    for (let col = maxLength - 1; col >= 0; col--) {
      let sum = carry;
      
      partialProducts.forEach(pp => {
        const index = pp.length - (maxLength - col);
        if (index >= 0) {
          sum += pp[index];
        }
      });
      
      result.unshift(sum % 10);
      carries.unshift(Math.floor(sum / 10));
      carry = Math.floor(sum / 10);
    }
    
    // Add final carry if present
    if (carry > 0) {
      result.unshift(carry);
      carries.unshift(0);
    }
    
    return { digits: result, carries };
  };
  
  /**
   * Calculate all multiplication data
   */
  const calculateMultiplication = (multiplicand, multiplier) => {
    const multiplierDigits = numberToDigits(multiplier);
    const partialProducts = [];
    const partialProductCarries = [];
    
    // Calculate each partial product
    // Process from right to left (units digit first)
    for (let i = multiplierDigits.length - 1; i >= 0; i--) {
      const digit = multiplierDigits[i];
      const shift = multiplierDigits.length - 1 - i;
      const pp = calculatePartialProduct(multiplicand, digit, shift);
      partialProducts.push(pp.digits);
      partialProductCarries.push(pp.carries);
    }
    
    // Calculate final sum
    const sum = calculateSum(partialProducts);
    
    // Calculate total columns needed
    const totalColumns = Math.max(
      numberToDigits(multiplicand).length,
      sum.digits.length
    );
    
    return {
      multiplicandDigits: numberToDigits(multiplicand),
      multiplierDigits: numberToDigits(multiplier),
      partialProducts,
      partialProductCarries,
      sumDigits: sum.digits,
      sumCarries: sum.carries,
      totalColumns,
      finalAnswer: multiplicand * multiplier
    };
  };
  
  // ===== MAIN COMPONENT =====
  
  const MultiplicationGrid = ({
    multiplicand = 23,
    multiplier = 47,
    showCarries = true,
    interactive = false,
    onComplete = null,
    cellSize = '30gc',
    showStepHighlight = true,
    backgroundColor = '#f9f9f9',
    fontSize = '24gc',
    cellBackgroundColor = 'white',
    containerBorder = '2px solid #ddd',
    // Separator line styling
    lineColor = 'white',
    lineThickness = '4gc',
    // Cell border styling
    cellBorderColor = '#ddd',
    cellBorderWidth = '1px',
    cellBorderStyle = 'solid',
    // Multiplication symbol position
    multiplicationSymbolPosition = 'default', // 'default' or 'indonesia'
    // Grid alignment
    gridAlignment = 'center', // 'left', 'center', or 'right'
    // Incorrect values
    incorrectCount = 0, // Number of cells to make incorrect
    // Spot incorrect mode
    mode = 'default', // 'default', 'spotIncorrect', or 'input'
    onCheck = null,   // Callback when check is triggered externally
    onReset = null,   // Callback when reset is triggered externally
    onSelectionChange = null, // Callback with current selection state
    // Input mode - cells that should be input tiles
    inputCells = [], // Array of cell keys that should be input tiles, e.g., ['partial-0-0', 'partial-1-1', 'sum-0']
    onInputChange = null, // Callback when input values change
    onInputValidation = null, // Callback for input validation results
    // Hint text for default mode
    hintText = '', // Optional hint text shown in default mode
    // Theme system
    theme = 'coloured-theme', // 'coloured-theme', 'white-theme', 'button-theme', 'input-theme', 'override-theme'
    // Button theme disabled state
    disabled = false, // When true, all buttons are disabled (button-theme only)
    // Minimal mode - disable all borders and backgrounds
    minimalMode = false, // When true, removes all borders and backgrounds for clean appearance
    // Input mode - cells to hide (make transparent)
    hiddenCells = [], // Array of cell keys to hide, e.g., ['partial-0-0', 'partial-1-1', 'sum-0']
    // Grouped styling for each section (only used when theme = 'override-theme')
    carryStyle = {},
    multiplicandStyle = {},
    multiplierStyle = {},
    partialProductStyle = {},
    answerStyle = {},
    operatorStyle = {}
  }) => {
    
    // Debug props received
    console.log('🔍 [MultiplicationGrid] Component created with props:', {
      theme,
      hiddenCells,
      multiplicand,
      multiplier,
      mode
    });
    console.log('🔍 [MultiplicationGrid] Global state at component creation:', {
      multiplicationGridInputAllCorrect: window.multiplicationGridInputAllCorrect,
      multiplicationGridFeedbackState: window.multiplicationGridFeedbackState
    });
    
    // Convert gc units to pixels if needed
    const convertGc = (value) => {
      if (typeof value === 'string' && value.includes('gc')) {
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPixels) {
          return GridCellFontUtils.convertGcToPixels(value);
        }
        // Fallback conversion
        const gcValue = parseFloat(value);
        const rowHeight = typeof window !== 'undefined' ? window.innerHeight / 900 : 1;
        return `${gcValue * rowHeight}px`;
      }
      return typeof value === 'number' ? `${value}px` : value;
    };
    
    const [carryVisible, setCarryVisible] = React.useState(showCarries);
    const [userInputs, setUserInputs] = React.useState({});
    const [currentStep, setCurrentStep] = React.useState({ row: 0, col: 0, type: 'partial' });
    const [completedSteps, setCompletedSteps] = React.useState(new Set());
    const [incorrectCells, setIncorrectCells] = React.useState(new Set());
    
    // Input mode state
      const [inputValues, setInputValues] = React.useState({});
      const [inputValidation, setInputValidation] = React.useState({});
      const [focusedCell, setFocusedCell] = React.useState(null); // Track which cell is currently focused
      const [relatedCells, setRelatedCells] = React.useState(new Set()); // Track related multiplicand/multiplier cells to highlight
      const [checkPerformed, setCheckPerformed] = React.useState(false); // Track if check has been performed
    
    // Spot incorrect mode state
    const [selectedCells, setSelectedCells] = React.useState(new Set());
    const [checkResult, setCheckResult] = React.useState(null);
    const [allCorrect, setAllCorrect] = React.useState(() => {
      // Initialize from global state if available
      return window.multiplicationGridAllCorrect || false;
    });
    // Use global state to persist theme changes across component recreations
    const [currentTheme, setCurrentTheme] = React.useState(() => {
      // For input mode, always use the theme prop, ignore global state
      if (mode === 'input') {
        return theme;
      }
      // For spotIncorrect mode, check global state but fallback to theme prop
      return window.multiplicationGridCurrentTheme || theme;
    });
    
    // Debug theme initialization
    console.log('🎨 [MultiplicationGrid] Theme initialization:', {
      originalTheme: theme,
      currentTheme: currentTheme,
      allCorrect: allCorrect,
      globalTheme: window.multiplicationGridCurrentTheme
    });
    
    // Calculate multiplication data
    const data = calculateMultiplication(multiplicand, multiplier);
    
    // Calculate total number of rows for dynamic sizing (excluding separator lines)
    const calculateTotalRows = () => {
      let totalRows = 2; // multiplicand + multiplier
      
      // Add carry rows if visible
      if (carryVisible) {
        totalRows += data.partialProductCarries.length;
      }
      
      // Add partial product rows if multiplier has more than one digit
      if (data.multiplierDigits.length > 1) {
        totalRows += data.partialProducts.length;
      }
      
      // Add sum row
      totalRows += 1;
      
      return totalRows;
    };
    
    const totalRows = calculateTotalRows();
    
    // Dynamic sizing based on number of rows using configuration table
    const calculateDynamicSizing = () => {
      // Use the configuration table from constants.js
      if (typeof window !== 'undefined' && window.DYNAMIC_SIZING_CONFIG) {
        const sizing = window.DYNAMIC_SIZING_CONFIG.getSizingForRows(totalRows);
        return {
          cellSize: sizing.cellSize,
          fontSize: sizing.fontSize
        };
      }
      
      // Fallback to simple calculation if config not available
      const baseCellSize = 60; // Base cell size in gc
      const baseFontSize = 40; // Base font size in gc
      const maxRows = 7; // Maximum rows for reference
      
      const scaleFactor = Math.min(1, maxRows / totalRows);
      const dynamicCellSize = Math.max(30, baseCellSize * scaleFactor);
      const dynamicFontSize = Math.max(20, baseFontSize * scaleFactor);
      
      return {
        cellSize: `${dynamicCellSize}gc`,
        fontSize: `${dynamicFontSize}gc`
      };
    };
    
    const dynamicSizing = calculateDynamicSizing();
    
    // Override cellSize and fontSize with dynamic values if not explicitly set
    const finalCellSize = cellSize === '30gc' ? dynamicSizing.cellSize : cellSize;
    const finalFontSize = fontSize === '24gc' ? dynamicSizing.fontSize : fontSize;
    
    
    // Theme-based styling
    const getThemeStyles = () => {
      console.log('🎨 [getThemeStyles] Called with currentTheme:', currentTheme);
      const baseStyles = {
        carry: { color: '#FF6B6B', backgroundColor: 'white', borderColor: '#ddd', borderWidth: '1px', borderStyle: 'solid' },
        multiplicand: { color: '#333', backgroundColor: 'white', borderColor: '#ddd', borderWidth: '1px', borderStyle: 'solid' },
        multiplier: { color: '#333', backgroundColor: 'white', borderColor: '#ddd', borderWidth: '1px', borderStyle: 'solid' },
        partial: { color: '#333', backgroundColor: 'white', borderColor: '#ddd', borderWidth: '1px', borderStyle: 'solid' },
        answer: { color: '#333', backgroundColor: 'white', borderColor: '#ddd', borderWidth: '1px', borderStyle: 'solid' },
        operator: { color: 'white', fontSize: finalFontSize }
      };
      
      switch (currentTheme) {
        case 'coloured-theme':
          console.log('🎨 [getThemeStyles] Applying coloured-theme');
          return {
            carry: { 
              ...baseStyles.carry, 
              color: '#FF6B6B', 
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderColor: '#FF6B6B',
              borderWidth: '2px',
              borderStyle: 'dashed'
            },
            multiplicand: { 
              ...baseStyles.multiplicand, 
              color: '#4ECDC4',
              backgroundColor: 'rgba(78, 205, 196, 0.1)',
              borderColor: '#4ECDC4',
              borderWidth: '2px',
              borderStyle: 'solid'
            },
            multiplier: { 
              ...baseStyles.multiplier, 
              color: '#45B7D1',
              backgroundColor: 'rgba(69, 183, 209, 0.1)',
              borderColor: '#45B7D1',
              borderWidth: '2px',
              borderStyle: 'solid'
            },
            partial: { 
              ...baseStyles.partial, 
              color: '#96CEB4',
              backgroundColor: 'rgba(150, 206, 180, 0.1)',
              borderColor: '#96CEB4',
              borderWidth: '2px',
              borderStyle: 'solid'
            },
            answer: { 
              ...baseStyles.answer, 
              color: '#2E7D32',
              backgroundColor: 'rgba(46, 125, 50, 0.15)',
              borderColor: '#2E7D32',
              borderWidth: '2px',
              borderStyle: 'solid',
              fontWeight: 'bold'
            },
            operator: { 
              ...baseStyles.operator, 
              color: 'white',
              fontSize: finalFontSize
            }
          };
          
        case 'white-theme':
          return {
            carry: { ...baseStyles.carry, color: 'black', borderColor: 'white' },
            multiplicand: { ...baseStyles.multiplicand, color: 'black', borderColor: 'white' },
            multiplier: { ...baseStyles.multiplier, color: 'black', borderColor: 'white' },
            partial: { ...baseStyles.partial, color: 'black', borderColor: 'white' },
            answer: { ...baseStyles.answer, color: 'black', borderColor: 'white', fontWeight: 'bold' },
            operator: { ...baseStyles.operator, color: 'white', fontSize: finalFontSize }
          };
          
        case 'button-theme':
          return {
            carry: { 
              ...baseStyles.carry, 
              color: '#CC0000',  // Darker red for contrast
              cursor: 'pointer' 
            },
            multiplicand: { 
              ...baseStyles.multiplicand, 
              color: '#1B5E20',  // Darker green for contrast
              cursor: 'pointer' 
            },
            multiplier: { 
              ...baseStyles.multiplier, 
              color: '#0D47A1',  // Darker blue for contrast
              cursor: 'pointer' 
            },
            partial: { 
              ...baseStyles.partial, 
              color: '#4A148C',  // Darker purple for contrast
              cursor: 'pointer' 
            },
            answer: { 
              ...baseStyles.answer, 
              color: '#1B5E20',  // Darker green for contrast
              cursor: 'pointer', 
              fontWeight: 'bold' 
            },
            operator: { 
              ...baseStyles.operator, 
              color: 'white',
              fontSize: finalFontSize
            }
          };
          
        case 'input-theme':
          console.log('🎨 [getThemeStyles] Applying input-theme');
          return {
            carry: { 
              ...baseStyles.carry, 
              color: '#FF6B6B',  // Same as coloured theme
              backgroundColor: 'white',
              borderColor: '#FF6B6B',
              borderWidth: '2gc',
              borderStyle: 'dashed'
            },
            multiplicand: { 
              ...baseStyles.multiplicand, 
              color: '#4ECDC4',  // Same as coloured theme
              backgroundColor: 'white',
              borderColor: '#4ECDC4',
              borderWidth: '2gc',
              borderStyle: 'solid'
            },
            multiplier: { 
              ...baseStyles.multiplier, 
              color: '#45B7D1',  // Same as coloured theme
              backgroundColor: 'white',
              borderColor: '#45B7D1',
              borderWidth: '2gc',
              borderStyle: 'solid'
            },
            partial: { 
              ...baseStyles.partial, 
              color: '#96CEB4',  // Same as coloured theme
              backgroundColor: 'white',
              borderColor: '#96CEB4',
              borderWidth: '2gc',
              borderStyle: 'solid'
            },
            answer: { 
              ...baseStyles.answer, 
              color: '#2E7D32',  // Same as coloured theme
              backgroundColor: 'white',
              borderColor: '#2E7D32',
              borderWidth: '2gc',
              borderStyle: 'solid',
              fontWeight: 'bold'
            },
            operator: { 
              ...baseStyles.operator, 
              color: 'white',
              fontSize: finalFontSize
            }
          };
          
        case 'override-theme':
          return {
            carry: { ...baseStyles.carry, ...carryStyle },
            multiplicand: { ...baseStyles.multiplicand, ...multiplicandStyle },
            multiplier: { ...baseStyles.multiplier, ...multiplierStyle },
            partial: { ...baseStyles.partial, ...partialProductStyle },
            answer: { ...baseStyles.answer, ...answerStyle },
            operator: { ...baseStyles.operator, ...operatorStyle }
          };
          
        default:
          console.log('🎨 [getThemeStyles] Applying default theme for:', currentTheme);
          return baseStyles;
      }
    };
    
    const themeStyles = getThemeStyles();
    
    // Debug theme state changes
    console.log('🎨 [MultiplicationGrid] Component render with theme state:', {
      currentTheme: currentTheme,
      allCorrect: allCorrect,
      themeStylesApplied: Object.keys(themeStyles)
    });
    
    
    // Debug hidden cells for input theme
    if (currentTheme === 'input-theme') {
      console.log('🔍 [Input Theme] Hidden cells:', hiddenCells);
      console.log('🔍 [Input Theme] Theme:', currentTheme);
      console.log('🔍 [Input Theme] Hidden cells type:', typeof hiddenCells, 'Array?', Array.isArray(hiddenCells));
    }
    
    const cellSizePx = convertGc(finalCellSize);
    const fontSizePx = convertGc(finalFontSize);
    
    // Apply defaults to grouped styles
    const carry = {
      color: '#888',
      bgColor: '#f5f5f5',
      borderColor: cellBorderColor,
      borderWidth: cellBorderWidth,
      borderStyle: cellBorderStyle,
      ...carryStyle
    };
    
    const multiplicandStyling = {
      color: '#000',
      bgColor: 'white',
      borderColor: cellBorderColor,
      borderWidth: cellBorderWidth,
      borderStyle: cellBorderStyle,
      ...multiplicandStyle
    };
    
    const multiplierStyling = {
      color: '#000',
      bgColor: 'white',
      borderColor: cellBorderColor,
      borderWidth: cellBorderWidth,
      borderStyle: cellBorderStyle,
      ...multiplierStyle
    };
    
    const partialProduct = {
      color: '#000',
      bgColor: 'white',
      borderColor: cellBorderColor,
      borderWidth: cellBorderWidth,
      borderStyle: cellBorderStyle,
      ...partialProductStyle
    };
    
    const answer = {
      color: '#000',
      bgColor: '#fff3cd',
      borderColor: cellBorderColor,
      borderWidth: cellBorderWidth,
      borderStyle: cellBorderStyle,
      ...answerStyle
    };
    
    const operator = {
      color: themeStyles.operator.color || '#333',
      fontSize: themeStyles.operator.fontSize || finalFontSize,
      ...operatorStyle
    };
    
    // Generate incorrect values if incorrectCount > 0
    const [incorrectValues] = React.useState(() => {
      if (incorrectCount <= 0) return {};
      
      const incorrectMap = {};
      const allRows = [];
      
      // Store question info for debugging
      const questionInfo = {
        multiplicand,
        multiplier,
        incorrectCount,
        timestamp: new Date().toISOString()
      };
      
      // Collect all available cells (carry, multiplicand, multiplier, partial products, and sum)
      // Each row type with its data
      
      // Add carry rows (use same order as rendering - reversed)
      data.partialProductCarries.slice().reverse().forEach((carryRow, carryRowIdx) => {
        // Create padded carries array for this specific partial product (same as rendering logic)
        const paddedCarries = new Array(data.totalColumns).fill(null);
        
        // Process carries for this partial product (same as rendering logic)
        carryRow.forEach((carry, idx) => {
          if (carry > 0 && carry !== null) {
            // Shift carry one position to the LEFT
            const basePosition = data.totalColumns - carryRow.length + idx;
            const shiftedPosition = basePosition - 1;
            
            // Only place carry if position is valid (>= 0)
            if (shiftedPosition >= 0) {
              paddedCarries[shiftedPosition] = carry;
            }
          }
        });
        
        // Now add to allRows using the padded data (same as rendering)
        paddedCarries.forEach((carry, colIdx) => {
          if (carry !== null) { // Skip blank cells - hard constraint
            allRows.push({
              type: 'carry',
              rowIdx: carryRowIdx, // Use carryRowIdx from reversed array
              colIdx,
              correctValue: carry,
              rowId: `carry-${carryRowIdx}`
            });
          }
        });
      });
      
      // Add multiplicand row
      data.multiplicandDigits.forEach((digit, colIdx) => {
        if (digit !== null) { // Skip blank cells - hard constraint
          allRows.push({
            type: 'multiplicand',
            rowIdx: 0,
            colIdx,
            correctValue: digit,
            rowId: 'multiplicand-0'
          });
        }
      });
      
      // Add multiplier row
      data.multiplierDigits.forEach((digit, colIdx) => {
        if (digit !== null) { // Skip blank cells - hard constraint
          allRows.push({
            type: 'multiplier',
            rowIdx: 0,
            colIdx,
            correctValue: digit,
            rowId: 'multiplier-0'
          });
        }
      });
      
      if (data.multiplierDigits.length > 1) {
        // Only include partial products for multi-digit multipliers
        data.partialProducts.forEach((pp, rowIdx) => {
          pp.forEach((digit, colIdx) => {
            if (digit !== null) { // Skip blank cells - hard constraint
              allRows.push({
                type: 'partial',
                rowIdx,
                colIdx,
                correctValue: digit,
                rowId: `partial-${rowIdx}`
              });
            }
          });
        });
      }
      
      data.sumDigits.forEach((digit, colIdx) => {
        if (digit !== null) { // Skip blank cells - hard constraint
          allRows.push({
            type: 'sum',
            rowIdx: 0,
            colIdx,
            correctValue: digit,
            rowId: 'sum-0'
          });
        }
      });
      
      // Strategy: Distribute errors across rows
      // Count all available rows: carry rows + multiplicand + multiplier + partial products + sum
      let totalRows = 0;
      totalRows += data.partialProductCarries.length; // carry rows
      totalRows += 1; // multiplicand row
      totalRows += 1; // multiplier row
      if (data.multiplierDigits.length > 1) {
        totalRows += data.partialProducts.length; // partial product rows
      }
      totalRows += 1; // sum row
      
      const cellsPerRow = Math.floor(incorrectCount / totalRows);
      const remainingCells = incorrectCount % totalRows;
      
      // Group cells by row
      const rowGroups = {};
      allRows.forEach(cell => {
        if (!rowGroups[cell.rowId]) {
          rowGroups[cell.rowId] = [];
        }
        rowGroups[cell.rowId].push(cell);
      });
      
      const selectedCells = [];
      const rowIds = Object.keys(rowGroups);
      
      // First pass: Select cellsPerRow from each row
      if (cellsPerRow > 0) {
        rowIds.forEach(rowId => {
          const rowCells = rowGroups[rowId];
          const shuffled = [...rowCells].sort(() => Math.random() - 0.5);
          const toSelect = Math.min(cellsPerRow, shuffled.length);
          selectedCells.push(...shuffled.slice(0, toSelect));
        });
      }
      
      // Second pass: Select remaining cells
      if (remainingCells > 0) {
        const remaining = allRows.filter(cell => 
          !selectedCells.some(sc => 
            sc.type === cell.type && sc.rowIdx === cell.rowIdx && sc.colIdx === cell.colIdx
          )
        );
        const shuffled = remaining.sort(() => Math.random() - 0.5);
        selectedCells.push(...shuffled.slice(0, remainingCells));
      }
      
      // Limit to incorrectCount
      const finalSelection = selectedCells.slice(0, incorrectCount);
      
      // Generate incorrect values
      console.log('🔴 [Multiplication Grid] Generating incorrect values:');
      console.log('🔴 [Multiplication Grid] Total cells available:', allRows.length);
      console.log('🔴 [Multiplication Grid] Incorrect count requested:', incorrectCount);
      console.log('🔴 [Multiplication Grid] Final selection count:', finalSelection.length);
      console.log('🔴 [Multiplication Grid] Selected cells:', finalSelection.map(c => `${c.type}-${c.rowIdx}-${c.colIdx}`));
      
      finalSelection.forEach(cell => {
        const key = `${cell.type}-${cell.rowIdx}-${cell.colIdx}`;
        
        // Generate a different wrong digit (0-9, but not the correct one)
        let wrongValue;
        do {
          wrongValue = Math.floor(Math.random() * 10);
        } while (wrongValue === cell.correctValue);
        
        incorrectMap[key] = wrongValue;
        
        console.log(`  Cell: ${key}`);
        console.log(`    Correct Answer: ${cell.correctValue}`);
        console.log(`    Wrong Answer: ${wrongValue}`);
      });
      
      console.log('🔴 [Multiplication Grid] Final incorrect map:', incorrectMap);
      
      // Store incorrect cells with their correct values for this question
      const incorrectCellsWithCorrectValues = {};
      finalSelection.forEach(cell => {
        const key = `${cell.type}-${cell.rowIdx}-${cell.colIdx}`;
        incorrectCellsWithCorrectValues[key] = {
          correctValue: cell.correctValue,
          incorrectValue: incorrectMap[key],
          cellType: cell.type,
          rowIndex: cell.rowIdx,
          colIndex: cell.colIdx
        };
      });
      
      // Store in global scope for persistence across questions
      if (typeof window !== 'undefined') {
        if (!window.questionIncorrectCells) {
          window.questionIncorrectCells = {};
        }
        const questionKey = `${multiplicand}x${multiplier}`;
        window.questionIncorrectCells[questionKey] = {
          questionInfo,
          incorrectCells: incorrectCellsWithCorrectValues,
          totalIncorrect: finalSelection.length
        };
        
        // Display on console
        console.log('📊 [Question Data] Incorrect cells for this question:');
        console.log('📊 [Question Data] Question:', questionKey);
        console.log('📊 [Question Data] Incorrect Count:', incorrectCount);
        console.log('📊 [Question Data] Incorrect Cells with Correct Values:', incorrectCellsWithCorrectValues);
        console.log('📊 [Question Data] All Questions Data:', window.questionIncorrectCells);
      }
      
      return incorrectMap;
    });
    
    // Debug incorrect values state
    console.log('🔍 [MultiplicationGrid] Incorrect values state:', {
      incorrectValues,
      incorrectValuesKeys: Object.keys(incorrectValues),
      incorrectCount
    });
    
    // Initialize refs for input focus management
    const inputRefs = React.useRef({});
    
    // Display question data on component mount
    React.useEffect(() => {
      if (typeof window !== 'undefined' && window.questionIncorrectCells) {
        const questionKey = `${multiplicand}x${multiplier}`;
        const questionData = window.questionIncorrectCells[questionKey];
        
        if (questionData) {
          console.log('📊 [Question Load] Displaying data for question:', questionKey);
          console.log('📊 [Question Load] Question Info:', questionData.questionInfo);
          console.log('📊 [Question Load] Incorrect Cells:', questionData.incorrectCells);
          console.log('📊 [Question Load] Total Incorrect:', questionData.totalIncorrect);
        }
      }
    }, [multiplicand, multiplier]);
    
    /**
     * Handle check in spot incorrect mode - Two-phase validation
     */
    const handleCheck = React.useCallback(() => {
      const results = {};
      selectedCells.forEach(key => {
        results[key] = incorrectValues[key] !== undefined;
      });
      setCheckResult(results);
      
      // Update global feedback state
      const hasSelections = selectedCells.size > 0;
      const totalIncorrectCells = Object.keys(incorrectValues).length;
      const selectedIncorrectCells = Object.values(results).filter(v => v === true).length;
      const selectedCorrectCells = Object.values(results).filter(v => v === false).length;
      
      console.log('🔍 [MultiplicationGrid] Page 1 Check logic:', {
        hasSelections,
        selectedCellsSize: selectedCells.size,
        totalIncorrectCells,
        selectedIncorrectCells,
        selectedCorrectCells,
        resultsKeys: Object.keys(results),
        resultsValues: Object.values(results)
      });
      
      // Phase 1: Check if all incorrect cells are selected
      if (selectedCells.size < totalIncorrectCells) {
        console.log('⚠️ [MultiplicationGrid] Not all incorrect cells selected - incomplete phase');
        window.multiplicationGridFeedbackState = 'incorrect';
        window.multiplicationGridCorrectnessPhase = false; // Incomplete phase
        window.multiplicationGridCheckResult = results;
        window.multiplicationGridTotalIncorrectCells = totalIncorrectCells;
        window.multiplicationGridSelectedCells = selectedCells;
        return;
      }
      
      // Phase 2: All incorrect cells are selected, check correctness
      console.log('✅ [MultiplicationGrid] All incorrect cells selected, checking correctness...');
      window.multiplicationGridCorrectnessPhase = true; // Correctness phase
      
      const allCorrect = hasSelections && selectedIncorrectCells === totalIncorrectCells && selectedCorrectCells === 0;
      const hasIncorrect = Object.values(results).some(v => v === false);
      
      if (allCorrect) {
        console.log('✅ [MultiplicationGrid] Setting feedback state to: correct');
        console.log('🎨 [MultiplicationGrid] Keeping current theme:', {
          currentTheme: currentTheme,
          allCorrect: allCorrect,
          originalTheme: theme
        });
        setAllCorrect(true);
        // Keep current theme - do not change to coloured-theme
        window.multiplicationGridFeedbackState = 'correct';
        console.log('🌍 [MultiplicationGrid] Setting global allCorrect to true');
        window.multiplicationGridAllCorrect = true;
        
        // Trigger re-render for page 1 next button
        window.multiplicationGridAllCorrectTrigger = (window.multiplicationGridAllCorrectTrigger || 0) + 1;
        console.log('🔄 [MultiplicationGrid] Triggered page 1 re-render:', window.multiplicationGridAllCorrectTrigger);
      } else if (hasIncorrect) {
        console.log('❌ [MultiplicationGrid] Setting feedback state to: incorrect (has incorrect)');
        window.multiplicationGridFeedbackState = 'incorrect';
      } else if (hasSelections) {
        // Has selections but not all correct (some might be correct, some wrong)
        console.log('❌ [MultiplicationGrid] Setting feedback state to: incorrect (has selections but not all correct)');
        window.multiplicationGridFeedbackState = 'incorrect';
      } else {
        // No selections made - show as incorrect mode
        console.log('⚠️ [MultiplicationGrid] Setting feedback state to: incorrect (no selections)');
        window.multiplicationGridFeedbackState = 'incorrect';
      }
      
      // Set up global state for feedback textbox
      window.multiplicationGridCheckResult = results;
      window.multiplicationGridTotalIncorrectCells = totalIncorrectCells;
      window.multiplicationGridSelectedCells = selectedCells;
      
      console.log('🔍 [MultiplicationGrid] Final feedback state:', window.multiplicationGridFeedbackState);
      
      if (onCheck) {
        onCheck(results);
      }
    }, [selectedCells, incorrectValues, onCheck]);
    
    /**
     * Handle reset in spot incorrect mode
     */
    const handleReset = React.useCallback(() => {
      console.log('🔄 [MultiplicationGrid] Reset called:', {
        currentTheme: currentTheme,
        originalTheme: theme,
        allCorrect: allCorrect
      });
      setSelectedCells(new Set());
      setCheckResult(null);
      setAllCorrect(false);
      setCurrentTheme(theme); // Reset to original theme
      window.multiplicationGridCurrentTheme = theme; // Reset global state
      console.log('🎨 [MultiplicationGrid] Theme reset to original:', theme);
      
      // Reset global feedback state
      window.multiplicationGridFeedbackState = 'default';
      console.log('🌍 [MultiplicationGrid] Setting global allCorrect to false');
      window.multiplicationGridAllCorrect = false;
      
      // Reset input mode states
      window.multiplicationGridInputAllCorrect = false;
      window.multiplicationGridCorrectnessPhase = 'input';
      window.multiplicationGridInputAllCorrectTrigger = 0;
      window.multiplicationGridNumberPadInput = {};
      window.multiplicationGridFocusedCell = null;
      window.multiplicationGridCheckInputs = false;
      
      if (onReset) {
        onReset();
      }
    }, [onReset, theme]);
    
    /**
     * Check input mode - validate all input cells and return detailed results
     */
    const checkInputMode = React.useCallback(() => {
      console.log('🔍 [Input Check] Starting input validation...');
      
      if (inputCells.length === 0) {
        console.log('⚠️ [Input Check] No input cells specified');
        return {
          allCorrect: true,
          totalCells: 0,
          correctCells: 0,
          incorrectCells: 0,
          emptyCells: 0,
          results: {},
          message: 'No input cells to validate'
        };
      }
      
      const results = {};
      let correctCount = 0;
      let incorrectCount = 0;
      let emptyCount = 0;
      
      // Check each input cell
      inputCells.forEach(key => {
        const validation = inputValidation[key];
        const inputValue = inputValues[key];
        
        if (!validation && inputValue === undefined) {
          // Empty cell
          results[key] = {
            status: 'empty',
            userValue: undefined,
            correctValue: null,
            isCorrect: false
          };
          emptyCount++;
        } else if (validation) {
          // Cell has been validated
          results[key] = {
            status: validation.isCorrect ? 'correct' : 'incorrect',
            userValue: validation.userValue,
            correctValue: validation.correctValue,
            isCorrect: validation.isCorrect
          };
          
          if (validation.isCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }
        } else {
          // Cell has input but no validation (shouldn't happen)
          results[key] = {
            status: 'invalid',
            userValue: inputValue,
            correctValue: null,
            isCorrect: false
          };
          incorrectCount++;
        }
      });
      
      const allCorrect = correctCount === inputCells.length && emptyCount === 0;
      
      const checkResult = {
        allCorrect,
        totalCells: inputCells.length,
        correctCells: correctCount,
        incorrectCells: incorrectCount,
        emptyCells: emptyCount,
        results,
        message: allCorrect 
          ? `🎉 All ${correctCount} input cells are correct!`
          : `❌ ${correctCount} correct, ${incorrectCount} incorrect, ${emptyCount} empty out of ${inputCells.length} total cells`
      };
      
      console.log('✅ [Input Check] Results:', checkResult);
      
      // Update global state for external access
      window.multiplicationGridInputCheckResult = checkResult;
      window.multiplicationGridInputAllCorrect = allCorrect;
      
      // Call external callback if provided
      if (onInputValidation) {
        onInputValidation('check', checkResult);
      }
      
      return checkResult;
    }, [inputCells, inputValidation, inputValues, onInputValidation]);
    
    /**
     * Check if all input cells are filled and correct
     */
    const checkInputCompletion = React.useCallback(() => {
      if (inputCells.length === 0) return true;
      
      return inputCells.every(key => {
        const validation = inputValidation[key];
        return validation && validation.isCorrect;
      });
    }, [inputCells, inputValidation]);

    
    // Initialize global theme state on mount - only for spotIncorrect mode
    React.useEffect(() => {
      if (mode === 'spotIncorrect') {
        window.multiplicationGridCurrentTheme = currentTheme;
        console.log('🎨 [MultiplicationGrid] Global theme state initialized to:', currentTheme);
      }
    }, [currentTheme, mode]);
    
    // Cleanup global state on unmount
    React.useEffect(() => {
      return () => {
        console.log('🧹 [MultiplicationGrid] Component unmounting, clearing global state');
        // Clear global state when component unmounts
        window.multiplicationGridAllCorrect = null;
        window.multiplicationGridCurrentTheme = null;
        window.multiplicationGridFeedbackState = null;
        window.multiplicationGridSelectedCells = null;
        window.multiplicationGridCheckResult = null;
        window.multiplicationGridTotalIncorrectCells = null;
      };
    }, []);
    
    // Note: Removed problematic sync effect that was overriding global state
    // The global state is now managed directly in handleCheck and handleReset
    
    /**
     * Get cell key for tracking
     */
    const getCellKey = (type, row, col) => `${type}-${row}-${col}`;
    
    /**
     * Handle user input
     */
    const handleInput = React.useCallback((type, row, col, value) => {
      const key = getCellKey(type, row, col);
      const numValue = parseInt(value, 10);
      
      if (isNaN(numValue) || value === '') {
        const newInputs = { ...userInputs };
        delete newInputs[key];
        setUserInputs(newInputs);
        return;
      }
      
      // Get correct value for validation
      let correctValue;
      if (type === 'partial-carry') {
        correctValue = data.partialProductCarries[row][col];
      } else if (type === 'partial') {
        correctValue = data.partialProducts[row][col];
      } else if (type === 'sum-carry') {
        correctValue = data.sumCarries[col];
      } else if (type === 'sum') {
        correctValue = data.sumDigits[col];
      }
      
      // Update inputs
      setUserInputs(prev => ({ ...prev, [key]: numValue }));
      
      // Validate
      if (numValue === correctValue) {
        setCompletedSteps(prev => new Set([...prev, key]));
        setIncorrectCells(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        
        // Check if all completed
        checkCompletion();
      } else {
        setIncorrectCells(prev => new Set([...prev, key]));
      }
    }, [userInputs, data]);
    
    /**
     * Check if multiplication is complete
     */
    const checkCompletion = React.useCallback(() => {
      // Count required cells
      let requiredCells = 0;
      let filledCorrectly = 0;
      
      // Partial products
      data.partialProducts.forEach((pp, rowIdx) => {
        pp.forEach((digit, colIdx) => {
          requiredCells++;
          const key = getCellKey('partial', rowIdx, colIdx);
          if (completedSteps.has(key)) filledCorrectly++;
        });
      });
      
      // Sum
      data.sumDigits.forEach((digit, colIdx) => {
        requiredCells++;
        const key = getCellKey('sum', 0, colIdx);
        if (completedSteps.has(key)) filledCorrectly++;
      });
      
      if (filledCorrectly === requiredCells && onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    }, [completedSteps, data, onComplete]);
    
    /**
     * Handle input value change for input mode
     */
    const handleInputValueChange = React.useCallback((key, value) => {
      const numValue = parseInt(value, 10);
      
      if (isNaN(numValue) || value === '') {
        // Clear the input
        setInputValues(prev => {
          const newValues = { ...prev };
          delete newValues[key];
          return newValues;
        });
        setInputValidation(prev => {
          const newValidation = { ...prev };
          delete newValidation[key];
          return newValidation;
        });
        return;
      }
      
      // Validate single digit
      if (numValue < 0 || numValue > 9) {
        return; // Invalid input, ignore
      }
      
      // Update input value (no validation yet - that happens on check)
      setInputValues(prev => ({
        ...prev,
        [key]: numValue
      }));
      
      // Reset check performed state when new value is entered after check
      if (checkPerformed) {
        setCheckPerformed(false);
        window.multiplicationGridInputAllCorrect = false; // Re-enable number pad when new values are entered
        // Clear validation state when user starts editing
        setInputValidation(prev => {
          const newValidation = { ...prev };
          delete newValidation[key];
          return newValidation;
        });
      }
      
      // Call input change callback (without validation)
      if (onInputChange) {
        onInputChange(key, numValue, null, null);
      }
    }, [data, onInputChange, onInputValidation, inputCells, focusedCell]);

    /**
     * Get the correct value for a given cell key
     */
    const getCorrectValueForCell = React.useCallback((key) => {
      const [type, rowStr, colStr] = key.split('-');
      const row = parseInt(rowStr, 10);
      const col = parseInt(colStr, 10);
      
      if (type === 'carry') {
        // Find the correct carry value from the padded carries
        const paddedCarries = new Array(data.totalColumns).fill(null);
        const carryRow = data.partialProductCarries[data.partialProductCarries.length - 1 - row];
        carryRow.forEach((carry, idx) => {
          if (carry > 0 && carry !== null) {
            const basePosition = data.totalColumns - carryRow.length + idx;
            const shiftedPosition = basePosition - 1;
            if (shiftedPosition >= 0) {
              paddedCarries[shiftedPosition] = carry;
            }
          }
        });
        return paddedCarries[col];
      } else if (type === 'multiplicand') {
        return data.multiplicandDigits[col];
      } else if (type === 'multiplier') {
        return data.multiplierDigits[col];
      } else if (type === 'partial') {
        return data.partialProducts[row][col];
      } else if (type === 'sum') {
        return data.sumDigits[col];
      }
      
      return null;
    }, [data]);

    /**
     * Handle number pad input for focused cell
     */
    const handleNumberPadInput = React.useCallback((number) => {
      if (focusedCell && inputCells.includes(focusedCell)) {
        console.log('🔢 [NumberPad Input] Updating focused cell:', { focusedCell, number });
        // Clear previous feedback and validation when user starts typing new input
        if (checkPerformed) {
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback('', 'default');
          }
        }
        handleInputValueChange(focusedCell, number.toString());
      } else {
        console.log('⚠️ [NumberPad Input] No focused cell or cell not in inputCells:', { focusedCell, inputCells });
      }
    }, [focusedCell, inputCells, handleInputValueChange, checkPerformed]);

    /**
     * Handle backspace for focused cell - clears the cell value
     */
    const handleNumberPadBackspace = React.useCallback(() => {
      if (focusedCell && inputCells.includes(focusedCell)) {
        console.log('⌫ [NumberPad Backspace] Clearing focused cell:', { focusedCell });
        handleInputValueChange(focusedCell, '');
      } else {
        console.log('⚠️ [NumberPad Backspace] No focused cell or cell not in inputCells:', { focusedCell, inputCells });
      }
    }, [focusedCell, inputCells, handleInputValueChange]);

    /**
     * Handle clear all - clears all input cell values
     */
    const handleNumberPadClear = React.useCallback(() => {
      console.log('🗑️ [NumberPad Clear] Clearing all input cells');
      inputCells.forEach(cellKey => {
        handleInputValueChange(cellKey, '');
      });
      // Reset check state
      setCheckPerformed(false);
      window.multiplicationGridFeedbackState = 'default';
    }, [inputCells, handleInputValueChange]);

    /**
     * Check the currently focused input cell and provide feedback
     */
    const checkInputs = React.useCallback(() => {
      console.log('🔍 [Check Inputs] Starting validation for focused cell...');
      
      // Check if there's a focused cell
      if (!focusedCell || !inputCells.includes(focusedCell)) {
        console.log('⚠️ [Check Inputs] No focused cell to check');
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback('Please click on a cell to enter a digit.', 'incorrect');
        }
        return false;
      }
      
      // Check if the focused cell has a value
      const userValue = inputValues[focusedCell];
      if (userValue === undefined || userValue === '?' || userValue === '') {
        console.log('❌ [Check Inputs] Focused cell is empty:', focusedCell);
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback('Please enter a digit first.', 'incorrect');
        }
        return false;
      }
      
      // Validate only the focused cell
      const correctValue = getCorrectValueForCell(focusedCell);
      const isCorrect = userValue === correctValue;
      
      console.log(`🔍 [Check Inputs] Cell ${focusedCell}: user=${userValue}, correct=${correctValue}, isCorrect=${isCorrect}`);
      
      // Create updated validation state including current cell
      const updatedValidation = {
        ...inputValidation,
        [focusedCell]: {
          isCorrect,
          correctValue,
          userValue
        }
      };
      
      // Update validation state for this cell only
      setInputValidation(updatedValidation);
      
      // Mark that check has been performed (this will enable validation colors)
      setCheckPerformed(true);
      
      // Call validation callback for this cell
      if (onInputValidation) {
        onInputValidation(focusedCell, isCorrect, correctValue, userValue);
      }
      
      // Provide feedback and handle auto-advance
      if (isCorrect) {
        console.log('✅ [Check Inputs] Correct answer!');
        window.multiplicationGridFeedbackState = 'correct';
        
        // Auto-advance focus to next cell (leftward, since we enter right-to-left)
        const currentIndex = inputCells.indexOf(focusedCell);
        
        // Check if all input cells are correct (using updated validation state)
        const allCellsCorrect = inputCells.every(cellKey => {
          const validation = cellKey === focusedCell 
            ? { isCorrect, correctValue, userValue } // Use current validation
            : updatedValidation[cellKey]; // Use existing validation
          return validation && validation.isCorrect === true;
        });
        
        console.log('🔍 [Check Inputs] Checking completion:', {
          currentIndex,
          totalCells: inputCells.length,
          allCellsCorrect,
          validations: inputCells.map(key => ({
            key,
            validated: !!updatedValidation[key],
            isCorrect: updatedValidation[key]?.isCorrect
          }))
        });
        
        if (currentIndex > 0) {
          // Not the last cell - move to next
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback('Correct! Moving to the next digit.', 'correct');
          }
          
          // Move to the previous cell (leftward)
          const nextCell = inputCells[currentIndex - 1];
          setTimeout(() => {
            setFocusedCell(nextCell);
            window.multiplicationGridFocusedCell = nextCell;
            console.log('➡️ [MultiplicationGrid] Correct answer confirmed, moving focus to next cell:', nextCell);
            // Clear feedback after a moment to prepare for next input
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
                window.updateNumberPadFeedback('', 'default');
              }
            }, 1500);
          }, 500); // Delay for visual feedback
        } else {
          // Last cell completed
          console.log('🎉 [Check Inputs] Last cell completed!');
          
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback('Excellent! All digits are correct!', 'correct');
          }
        }
        
        // If all cells are correct, disable number pad and dispatch event
        if (allCellsCorrect) {
          console.log('✅ [Check Inputs] All input cells are correct! Disabling number pad and dispatching quizCompleted event.');
          
          // Disable the number pad
          if (typeof window !== 'undefined') {
            window.multiplicationGridInputAllCorrect = true;
            window.multiplicationGridNumberPadDisabled = true;
            console.log('🔒 [MultiplicationGrid] Number pad disabled, flag set to:', window.multiplicationGridNumberPadDisabled);
            
            // Dispatch a custom event to notify number pad to update
            const numberPadDisabledEvent = new CustomEvent('numberPadDisabled', {
              detail: { disabled: true }
            });
            window.dispatchEvent(numberPadDisabledEvent);
            console.log('🔔 [MultiplicationGrid] Dispatched numberPadDisabled event');
            
            // Dispatch quizCompleted event to enable next button
            const quizCompletedEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentId: `multiplication-grid-${multiplicand}-${multiplier}`,
                componentType: 'MultiplicationGrid',
                mode: 'input',
                pageNumber: window.getCurrentPage?.() || null,
                allCorrect: true
              }
            });
            window.dispatchEvent(quizCompletedEvent);
            console.log('✅ [MultiplicationGrid] Dispatched quizCompleted event');
            
            // Update concept summary for page 7 with "12 x 3 = 36"
            const currentPage = window.getCurrentPage?.() || null;
            if (currentPage === 7 || currentPage === '7') {
              const result = multiplicand * multiplier;
              const formulaText = `${multiplicand} × ${multiplier} = ${result}`;
              
              const updateEvent = new CustomEvent('updateConceptSummary', {
                detail: {
                  pageNumber: '7',
                  keyConcepts: [],
                  impFormulae: [{ text: formulaText, color: '#70ACC7' }]
                }
              });
              window.dispatchEvent(updateEvent);
              console.log('✅ [MultiplicationGrid] Dispatched updateConceptSummary event with:', formulaText);
            }
          }
        } else {
          console.log('⚠️ [Check Inputs] Not all cells are correct yet. Some cells may need to be checked again.');
        }
        
        return true;
      } else {
        // Incorrect answer
        console.log('❌ [Check Inputs] Incorrect answer');
        window.multiplicationGridFeedbackState = 'incorrect';
        
        // Provide feedback to number pad
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback('Incorrect. Try again!', 'incorrect');
        }
        
        return false;
      }
    }, [inputCells, inputValues, getCorrectValueForCell, focusedCell, onInputValidation, inputValidation, multiplicand, multiplier, setInputValidation]);

    /**
     * Expose check and reset functions globally when in spotIncorrect mode
     */
    React.useEffect(() => {
      if (mode === 'spotIncorrect') {
        window.multiplicationGridCheck = handleCheck;
        window.multiplicationGridReset = handleReset;
        window.multiplicationGridSelectedCells = selectedCells;
        window.multiplicationGridCheckResult = checkResult;
        window.multiplicationGridAllCorrect = allCorrect;
        window.multiplicationGridTotalIncorrectCells = Object.keys(incorrectValues).length;
      } else if (mode === 'input') {
        window.multiplicationGridInputCheck = checkInputMode;
        window.multiplicationGridInputValues = inputValues;
        window.multiplicationGridInputValidation = inputValidation;
        // Only set to false if not already true (don't override successful completion)
        console.log('🔍 [useEffect] Checking global state before setting:', {
          currentValue: window.multiplicationGridInputAllCorrect,
          willSetToFalse: window.multiplicationGridInputAllCorrect !== true
        });
        
        // Use a more robust check - check both the global state and the local state
        const isCurrentlySuccessful = window.multiplicationGridInputAllCorrect === true || 
                                    window.multiplicationGridFeedbackState === 'correct';
        
        if (!isCurrentlySuccessful) {
          window.multiplicationGridInputAllCorrect = false; // Only set to true after check button confirms
          console.log('🔧 [useEffect] Set window.multiplicationGridInputAllCorrect = false');
        } else {
          console.log('✅ [useEffect] Preserving successful state - not setting to false');
        }
        window.multiplicationGridInputCheckResult = window.multiplicationGridInputCheckResult || null;
        window.multiplicationGridNumberPadInput = handleNumberPadInput;
        window.multiplicationGridNumberPadBackspace = handleNumberPadBackspace;
        window.multiplicationGridNumberPadClear = handleNumberPadClear;
        window.multiplicationGridFocusedCell = focusedCell;
        window.multiplicationGridCheckInputs = checkInputs;
      }
      return () => {
        if (mode === 'spotIncorrect') {
          window.multiplicationGridCheck = null;
          window.multiplicationGridReset = null;
          window.multiplicationGridSelectedCells = null;
          window.multiplicationGridCheckResult = null;
          window.multiplicationGridAllCorrect = null;
          window.multiplicationGridTotalIncorrectCells = null;
        } else if (mode === 'input') {
          window.multiplicationGridInputCheck = null;
          window.multiplicationGridInputValues = null;
          window.multiplicationGridInputValidation = null;
          // Don't reset successful completion state during cleanup
          if (window.multiplicationGridInputAllCorrect !== true) {
            window.multiplicationGridInputAllCorrect = null;
          }
          window.multiplicationGridInputCheckResult = null;
          window.multiplicationGridNumberPadInput = null;
          window.multiplicationGridNumberPadBackspace = null;
          window.multiplicationGridNumberPadClear = null;
          window.multiplicationGridFocusedCell = null;
          window.multiplicationGridCheckInputs = null;
        }
      };
    }, [mode, handleCheck, handleReset, selectedCells, checkResult, allCorrect, incorrectValues, checkInputMode, inputValues, inputValidation, checkInputCompletion, handleNumberPadInput, handleNumberPadBackspace, handleNumberPadClear, focusedCell, checkInputs]);
    
    /**
     * Auto-focus the last input cell when in input mode (rightmost digit for multiplication)
     */
    React.useEffect(() => {
      if (mode === 'input' && inputCells.length > 0 && !focusedCell) {
        // Small delay to ensure component is fully rendered
        const timer = setTimeout(() => {
          // Focus the last cell (rightmost digit) since multiplication is entered right-to-left
          const lastCell = inputCells[inputCells.length - 1];
          setFocusedCell(lastCell);
          window.multiplicationGridFocusedCell = lastCell;
          console.log('🎯 [MultiplicationGrid] Auto-focused last input cell (units digit):', lastCell);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [mode, inputCells, focusedCell]);
    
    /**
     * Calculate which multiplicand and multiplier cells should be highlighted
     * when a sum input cell is focused
     */
    React.useEffect(() => {
      if (mode === 'input' && focusedCell && focusedCell.startsWith('sum-')) {
        // Parse the sum cell key: sum-{row}-{col}
        const parts = focusedCell.split('-');
        if (parts.length === 3) {
          const sumCol = parseInt(parts[2], 10);
          const related = new Set();
          
          // Calculate multiplicand and multiplier digits (same as data calculation)
          const multiplicandDigits = String(Math.abs(multiplicand)).split('').map(Number);
          const multiplierDigits = String(Math.abs(multiplier)).split('').map(Number);
          
          // For single-digit multiplier, each sum column corresponds to one multiplicand column
          // Highlight the multiplicand digit at the same column position
          if (sumCol < multiplicandDigits.length) {
            const multiplicandKey = `multiplicand-0-${sumCol}`;
            related.add(multiplicandKey);
          }
          
          // Always highlight the multiplier (single digit at column 0)
          if (multiplierDigits.length === 1) {
            related.add('multiplier-0-0');
          } else {
            // For multi-digit multipliers, we'd need to calculate which multiplier digit
            // contributes to this sum position - for now, just highlight all multiplier digits
            multiplierDigits.forEach((_, idx) => {
              related.add(`multiplier-0-${idx}`);
            });
          }
          
          setRelatedCells(related);
          console.log('🔍 [MultiplicationGrid] Related cells for', focusedCell, ':', Array.from(related));
        }
      } else {
        setRelatedCells(new Set());
      }
    }, [mode, focusedCell, multiplicand, multiplier]);
    
    /**
     * Render a single cell
     */
    const renderCell = (value, key, type, isEditable = false) => {
      // Check if this cell should display an incorrect value
      const displayValue = incorrectValues[key] !== undefined ? incorrectValues[key] : value;
      
      // If displayValue is null, render as empty cell
      if (displayValue === null) {
        return React.createElement('div', {
          key,
          className: 'mult-cell mult-cell-empty',
          style: { width: cellSizePx, height: cellSizePx }
        });
      }
      
      // Debug logging for incorrect values
      if (key === 'partial-0-1' || key === 'carry-1-0' || key === 'carry-0-2') {
        console.log('🔍 [renderCell] Debug incorrect values:', {
          key,
          originalValue: value,
          incorrectValue: incorrectValues[key],
          displayValue,
          incorrectValuesKeys: Object.keys(incorrectValues),
          incorrectValuesMap: incorrectValues
        });
      }
      
      const isCompleted = completedSteps.has(key);
      const isIncorrect = incorrectCells.has(key);
      const userValue = userInputs[key];
      
      // Spot incorrect mode state
      const isSelected = selectedCells.has(key);
      const feedbackState = checkResult?.[key];
      
      // Handle cell click for spot incorrect mode
      const handleCellClick = () => {
        if (mode !== 'spotIncorrect') return;
        if (value === null) return; // Skip empty cells
        if (disabled || allCorrect) return; // Skip if disabled or all correct
        
        // If there was a previous check result (incorrect), clear it when new cell is clicked
        if (checkResult !== null) {
          console.log('🔄 [MultiplicationGrid] Clearing previous check result and selections for fresh start');
          setCheckResult(null);
          window.multiplicationGridCheckResult = null;
          window.multiplicationGridFeedbackState = 'default';
          
          // Clear all previous selections and start fresh with just this cell
          const newSelection = new Set([key]);
          setSelectedCells(newSelection);
          if (onSelectionChange) {
            onSelectionChange(Array.from(newSelection));
          }
          return;
        }
        
        // Normal selection toggle when no previous check result
        setSelectedCells(prev => {
          const newSet = new Set(prev);
          if (newSet.has(key)) {
            newSet.delete(key);
          } else {
            newSet.add(key);
          }
          if (onSelectionChange) {
            onSelectionChange(Array.from(newSet));
          }
          return newSet;
        });
      };
      
      // Check if this cell is related to the focused sum cell (for blinking border)
      const isRelated = relatedCells.has(key);
      
      const cellClasses = [
        'mult-cell',
        type === 'carry' || type.includes('carry') ? 'mult-carry' : '',
        isEditable && showStepHighlight ? 'mult-cell-editable' : '',
        isCompleted ? 'mult-cell-correct' : '',
        isIncorrect ? 'mult-cell-incorrect' : '',
        feedbackState === false ? 'mult-cell-wiggle' : '',
        // Add blinking border class for related cells
        isRelated && mode === 'input' && focusedCell ? 'mult-cell-border-blink' : '',
        // Add 3D button theme classes (only if not in minimal mode)
        currentTheme === 'button-theme' && !minimalMode ? 'mult-cell-button-theme' : '',
        currentTheme === 'button-theme' && !minimalMode && isSelected ? 'selected' : '',
        currentTheme === 'button-theme' && !minimalMode && feedbackState === true ? 'correct' : '',
        currentTheme === 'button-theme' && !minimalMode && feedbackState === false ? 'incorrect' : '',
        // Don't add disabled class for button theme - keep original appearance
      ].filter(Boolean).join(' ');
      
      // Debug cell classes
      if (key === 'multiplicand-0-0' || key === 'partial-1-1') {
        console.log('🎨 [Cell Classes Debug]', {
          key,
          currentTheme,
          cellClasses,
          type
        });
      }
      
      // Get theme-based styling for this cell type
      let cellThemeStyle = {};
      if (type === 'carry' || type.includes('carry')) {
        cellThemeStyle = themeStyles.carry;
      } else if (type === 'multiplicand') {
        cellThemeStyle = themeStyles.multiplicand;
      } else if (type === 'multiplier') {
        cellThemeStyle = themeStyles.multiplier;
      } else if (type === 'partial') {
        cellThemeStyle = themeStyles.partial;
      } else if (type === 'sum') {
        cellThemeStyle = themeStyles.answer;
      }
      
      // Extract styling properties
      let color = cellThemeStyle.color || '#000';
      let bgColor = cellThemeStyle.backgroundColor || 'white';
      let borderColor = cellThemeStyle.borderColor || '#ddd';
      let borderWidth = cellThemeStyle.borderWidth || '1px';
      let borderStyle = cellThemeStyle.borderStyle || 'solid';
      let cursor = 'default';
      if (mode === 'spotIncorrect' && !disabled && !allCorrect) {
        cursor = 'pointer';
      } else if (disabled || allCorrect) {
        cursor = 'not-allowed';
      } else {
        cursor = cellThemeStyle.cursor || 'default';
      }
      
      // Check if this cell should be hidden (input-theme only)
      if (currentTheme === 'input-theme') {
        console.log('🔍 [Input Theme] Checking cell:', key, 'Value:', value, 'Hidden cells:', hiddenCells);
        if (hiddenCells.includes(key)) {
          console.log('🔍 [Input Theme] Hiding cell:', key, 'Value:', value);
          color = 'transparent';  // Hide the number by making text transparent
        }
      }
      
      // Debug cell styling
      if (key === 'multiplicand-0-0' || key === 'partial-1-1') {
        console.log('🎨 [Cell Debug]', {
          key,
          currentTheme,
          cellThemeStyle,
          color,
          bgColor,
          borderColor,
          type
        });
      }
      
      // Apply spot incorrect mode styling (only if not in minimal mode)
      if (mode === 'spotIncorrect' && isSelected && !minimalMode) {
        if (feedbackState === true) {
          bgColor = 'var(--color-green, #4CAF50)';
        } else if (feedbackState === false) {
          bgColor = 'salmon';
        } else {
          // Selected but not checked yet
          bgColor = 'rgba(255, 215, 0, 0.3)'; // Light gold
        }
      }
      
      // Check if this cell is related to the focused sum cell (should be highlighted)
      // Apply this AFTER other styling so it takes precedence
      // Note: isRelated is already checked above for cellClasses
      if (isRelated && mode === 'input' && focusedCell) {
        // Apply highlight styling for related multiplicand/multiplier cells with blinking border
        // Don't set border inline - let CSS animation handle it via mult-cell-border-blink class
        bgColor = 'rgba(255, 171, 64, 0.2)'; // Light orange background
        // Blinking border animation is handled via CSS class 'mult-cell-border-blink'
        // Skip setting border inline to allow CSS animation to work
      }
      
      // Make carry row font size 10% smaller than the rest and top-aligned
      const isCarryCell = type === 'carry' || type.includes('carry');
      
      // Calculate carry font size (10% smaller)
      let cellFontSize = fontSizePx;
      if (isCarryCell) {
        // Handle both string (e.g., "24px") and number cases
        if (typeof fontSizePx === 'string') {
          const numericValue = parseFloat(fontSizePx);
          if (!isNaN(numericValue)) {
            cellFontSize = `${numericValue * 0.8}px`;
          }
        } else if (typeof fontSizePx === 'number') {
          cellFontSize = fontSizePx * 0.8;
        }
      }
      
      const cellStyle = {
        width: cellSizePx,
        height: cellSizePx,
        fontSize: cellFontSize,
        color: color,
        cursor: cursor
      };
      
      // Top-align carry cells
      if (isCarryCell) {
        cellStyle.display = 'flex'; // Ensure flex display
        cellStyle.alignItems = 'flex-start'; // Top align
        cellStyle.justifyContent = 'center'; // Keep horizontal centering
        cellStyle.paddingTop = '2px'; // Small padding from top
        cellStyle.lineHeight = '1'; // Tight line height to prevent extra space
      }
      
      // Apply background and border styles based on theme and minimal mode
      if (minimalMode) {
        // Minimal mode: transparent background, no borders
        cellStyle.backgroundColor = 'transparent';
        cellStyle.border = 'none';
      } else if (currentTheme !== 'button-theme') {
        // Normal mode: apply theme-based styling
        cellStyle.backgroundColor = bgColor;
        // Don't set border inline for related cells - CSS animation will handle it
        const shouldSkipBorder = isRelated && mode === 'input' && focusedCell;
        if (shouldSkipBorder) {
          // Debug: Log when we're skipping border for related cells
          if (key === 'multiplicand-0-1' || key === 'multiplier-0-0') {
            console.log('🎯 [Border Skip] Skipping inline border for related cell:', key, { isRelated, mode, focusedCell });
          }
          // Explicitly remove border from style object - CSS will handle it via mult-cell-border-blink class
          delete cellStyle.border;
        } else {
          cellStyle.border = `${borderWidth} ${borderStyle} ${borderColor}`;
        }
        // For related cells, border is handled by CSS class mult-cell-border-blink
      }
      
      // Override cursor for spot incorrect mode clickable cells
      if (mode === 'spotIncorrect' && displayValue !== null) {
        if (disabled || allCorrect) {
          cellStyle.cursor = 'not-allowed';
        } else {
          cellStyle.cursor = 'pointer';
        }
      }
      
      // Final check: Remove border for any cell with mult-cell-border-blink class
      // This ensures the CSS animation can control the border
      if (cellClasses.includes('mult-cell-border-blink') && cellStyle.border) {
        delete cellStyle.border;
        console.log('🗑️ [Final Check] Removed border from cell with blink class:', key);
      }
      
      // Debug final cell style
      if (key === 'multiplicand-0-0' || key === 'partial-1-1') {
        console.log('🎨 [Final Cell Style Debug]', {
          key,
          currentTheme,
          cellStyle,
          type
        });
      }
      
      // Input mode - render input field for specified cells
      if (mode === 'input' && inputCells.includes(key)) {
        const inputValue = inputValues[key] !== undefined ? inputValues[key] : '?';
        const validation = inputValidation[key];
        const isSelected = focusedCell === key; // Check if this cell is focused
        
        // Apply input-specific styling
        const inputStyle = {
          ...cellStyle,
          backgroundColor: isSelected ? '#FFEB3B' : 'white', // Yellow background when focused
          border: '2px solid #FFC107', // Yellow/amber border
          color: '#000',
          textAlign: 'center',
          cursor: 'pointer', // Pointer cursor instead of text cursor
          outline: 'none',
          caretColor: 'transparent', // Hide text cursor
          userSelect: 'none', // Disable text selection
          boxShadow: isSelected ? '0 0 10px rgba(255, 235, 59, 0.6)' : 'none',
          animation: isSelected ? 'inputBlink 1s ease-in-out infinite' : 'none', // Blinking animation when focused
          transition: 'background-color 0.3s ease, border-color 0.3s ease' // Smooth transitions
        };
        
        // Apply validation-based background colors only after check is performed
        if (checkPerformed && validation) {
          if (validation.isCorrect) {
            inputStyle.backgroundColor = 'var(--color-green, #4CAF50)';
            inputStyle.color = 'white';
            inputStyle.animation = 'none'; // Stop blinking when validated
          } else if (validation.userValue !== undefined) {
            inputStyle.backgroundColor = 'var(--color-salmon, #FF6B6B)';
            inputStyle.color = 'white';
            inputStyle.animation = 'none'; // Stop blinking when validated
          }
        }
        
        return React.createElement('input', {
          key,
          type: 'text',
          className: cellClasses,
          style: inputStyle,
          maxLength: 1,
          value: inputValue,
          onChange: (e) => {
            // Handle normal input changes
            const newValue = e.target.value;
            // Only allow single digit numbers
            if (newValue === '' || (newValue.length === 1 && /[0-9]/.test(newValue))) {
              handleInputValueChange(key, newValue === '' ? '?' : newValue);
            }
          },
          onFocus: (e) => {
            // Focus without showing cursor
            e.target.blur(); // Immediately blur to hide cursor
            // Set this cell as focused
            setFocusedCell(key);
            console.log('🔢 [Input Cell] Focused cell set to:', key);
          },
          onClick: (e) => {
            e.preventDefault();
            // Set this cell as focused
            setFocusedCell(key);
            console.log('🔢 [Input Cell] Clicked and focused cell set to:', key);
            // Focus the input
            e.target.focus();
            // Immediately blur to hide cursor but keep visual focus
            setTimeout(() => e.target.blur(), 0);
          },
          placeholder: '?',
          autoComplete: 'off',
          inputMode: 'numeric',
          pattern: '[0-9]',
          tabIndex: 0 // Allow tab navigation
        });
      }
      
      if (isEditable && interactive) {
        return React.createElement('input', {
          key,
          type: 'text',
          className: cellClasses,
          style: cellStyle,
          maxLength: 1,
          value: userValue !== undefined ? userValue : '',
          onChange: (e) => {
            const match = key.match(/^(.+)-(\d+)-(\d+)$/);
            if (match) {
              handleInput(match[1], parseInt(match[2]), parseInt(match[3]), e.target.value);
            }
          },
          ref: el => inputRefs.current[key] = el
        });
      }
      
      // Display mode or non-editable cell
      return React.createElement('div', {
        key,
        className: cellClasses,
        style: cellStyle,
        onClick: handleCellClick
      }, displayValue !== null && displayValue !== undefined ? displayValue : '');
    };
    
    /**
     * Render a row with proper alignment
     */
    const renderRow = (digits, rowType, rowIndex = 0, showOperator = false, operatorSymbol = '') => {
      const cells = [];
      const isIndonesiaMode = multiplicationSymbolPosition === 'indonesia';
      
      // Calculate padding needed for alignment
      // In Indonesia mode, all rows need space for the extra operator column
      const paddingNeeded = data.totalColumns - digits.length;
      
      // Convert operator font size
      const operatorFontSize = convertGc(operator.fontSize);
      
      // Default mode: Add operator in padding (before digits)
      if (!isIndonesiaMode) {
        for (let i = 0; i < paddingNeeded; i++) {
          if (showOperator && i === paddingNeeded - 1) {
            cells.push(
              React.createElement('div', {
                key: `op-${rowIndex}`,
                className: 'mult-cell mult-operator',
                style: { 
                  width: cellSizePx, 
                  height: cellSizePx, 
                  fontSize: operatorFontSize,
                  color: operator.color
                }
              }, operatorSymbol)
            );
          } else {
            cells.push(
              React.createElement('div', {
                key: `pad-${i}`,
                className: 'mult-cell mult-cell-empty',
                style: { width: cellSizePx, height: cellSizePx }
              })
            );
          }
        }
      } else {
        // Indonesia mode: Just add padding (no operator in padding)
        for (let i = 0; i < paddingNeeded; i++) {
          cells.push(
            React.createElement('div', {
              key: `pad-${i}`,
              className: 'mult-cell mult-cell-empty',
              style: { width: cellSizePx, height: cellSizePx }
            })
          );
        }
      }
      
      // Add digit cells
      digits.forEach((digit, idx) => {
        const key = getCellKey(rowType, rowIndex, idx);
        console.log('🔍 [MultiplicationGrid] Creating cell:', { rowType, rowIndex, idx, key, digit });
        const isEditable = interactive && (
          rowType === 'partial' || 
          rowType === 'sum' ||
          (rowType.includes('carry') && carryVisible)
        );
        cells.push(renderCell(digit, key, rowType, isEditable));
      });
      
      // Indonesia mode: Add operator or empty cell to keep alignment
      if (isIndonesiaMode) {
        if (showOperator) {
          // Add operator cell for multiplier row
          cells.push(
            React.createElement('div', {
              key: `op-${rowIndex}`,
              className: 'mult-cell mult-operator',
              style: { 
                width: cellSizePx, 
                height: cellSizePx, 
                fontSize: operatorFontSize,
                color: operator.color
              }
            }, operatorSymbol)
          );
        } else {
          // Add empty cell for other rows to maintain alignment
          cells.push(
            React.createElement('div', {
              key: `empty-end-${rowIndex}`,
              className: 'mult-cell mult-cell-empty',
              style: { width: cellSizePx, height: cellSizePx }
            })
          );
        }
      }
      
      return React.createElement('div', {
        className: 'mult-row',
        key: `${rowType}-${rowIndex}`
      }, cells);
    };
    
    /**
     * Render horizontal line
     */
    const renderLine = (key) => {
      const cellSizeNum = parseFloat(cellSizePx);
      const lineThicknessPx = convertGc(lineThickness);
      
      // Line should only span the digit columns, not the operator column
      // So we always use data.totalColumns regardless of mode
      const totalColumnsForLine = data.totalColumns;
      
      return React.createElement('div', {
        key,
        className: 'mult-line',
        style: { 
          width: `${totalColumnsForLine * cellSizeNum}px`,
          height: lineThicknessPx,
          backgroundColor: lineColor,
          border: 'none'
        }
      });
    };
    
    // ===== RENDER =====
    
    const rows = [];
    
    // Carry rows (show separate carry row for each partial product)
    // Order: highest place value digit (top) to units digit (bottom)
    console.log('🔍 [MultiplicationGrid] Carry rendering check:', {
      carryVisible,
      partialProductCarries: data.partialProductCarries,
      partialProductCarriesLength: data.partialProductCarries.length
    });
    
    if (carryVisible) {
      data.partialProductCarries.slice().reverse().forEach((carries, carryRowIdx) => {
        console.log('🔍 [MultiplicationGrid] Rendering carry row:', {
          carryRowIdx,
          carries,
          carriesLength: carries.length
        });
        // Create padded carries array for this specific partial product
        const paddedCarries = new Array(data.totalColumns).fill(null);
        
        // Process carries for this partial product
        carries.forEach((carry, idx) => {
          if (carry > 0 && carry !== null) {
            // Shift carry one position to the LEFT
            // The carry at index idx should be displayed at idx-1 position
            const basePosition = data.totalColumns - carries.length + idx;
            const shiftedPosition = basePosition - 1;
            
            // Only place carry if position is valid (>= 0)
            if (shiftedPosition >= 0) {
              paddedCarries[shiftedPosition] = carry;
            }
          }
        });
        
        const carryCells = paddedCarries.map((val, idx) => {
          console.log('🔍 [MultiplicationGrid] Creating carry cell:', {
            val,
            idx,
            key: `carry-${carryRowIdx}-${idx}`,
            carryRowIdx
          });
          const cell = renderCell(val, `carry-${carryRowIdx}-${idx}`, 'carry', false);
          // Clone element and add key
          return React.cloneElement(cell, { key: `carry-cell-${carryRowIdx}-${idx}` });
        });
        
        // In Indonesia mode, add an extra empty cell at the end for alignment
        if (multiplicationSymbolPosition === 'indonesia') {
          carryCells.push(
            React.createElement('div', {
              key: `carry-empty-end-${carryRowIdx}`,
              className: 'mult-cell mult-cell-empty',
              style: { width: cellSizePx, height: cellSizePx }
            })
          );
        }
        
        rows.push(
          React.createElement('div', {
            key: `carry-row-${carryRowIdx}`,
            className: 'mult-row mult-carry-row'
          }, carryCells)
        );
      });
    }
    
    // Multiplicand row
    rows.push(renderRow(data.multiplicandDigits, 'multiplicand', 0, false));
    
    // Multiplier row (with × operator)
    rows.push(renderRow(data.multiplierDigits, 'multiplier', 0, true, '×'));
    
    // Line separator
    rows.push(renderLine('line-1'));
    
    // Partial product rows (only show if multiplier has more than one digit)
    // Order: units digit (top) to highest place value digit (bottom)
    if (data.multiplierDigits.length > 1) {
      console.log('🔍 [MultiplicationGrid] Rendering partial products:', data.partialProducts);
      data.partialProducts.forEach((pp, idx) => {
        console.log('🔍 [MultiplicationGrid] Rendering partial product row', idx, 'with digits:', pp);
        rows.push(renderRow(pp, 'partial', idx, false));
      });
      
      // Second line separator (only show if there are partial products)
      rows.push(renderLine('line-2'));
    }
    
    // Sum row
    rows.push(renderRow(data.sumDigits, 'sum', 0, false));
    
    // Control buttons
    const controls = React.createElement('div', {
      key: 'controls',
      className: 'mult-controls',
      style: { marginTop: '20px', display: 'none' }
    }, [
      interactive && React.createElement('button', {
        key: 'reset',
        onClick: () => {
          setUserInputs({});
          setCompletedSteps(new Set());
          setIncorrectCells(new Set());
        },
        className: 'mult-control-btn'
      }, 'Reset')
    ]);
    
    // Determine alignment styles
    const getAlignmentStyle = () => {
      switch(gridAlignment) {
        case 'left':
          return 'flex-start';
        case 'right':
          return 'flex-end';
        case 'center':
        default:
          return 'center';
      }
    };
    
    // Main container
    return React.createElement('div', {
      className: 'multiplication-grid',
      'data-component-type': 'MultiplicationGrid',
      style: { 
        display: 'block',
        width: '100%',
        height: '100%',
        padding: minimalMode ? '0px' : '20px',
        fontFamily: 'monospace',
        backgroundColor: minimalMode ? 'transparent' : backgroundColor,
        borderRadius: minimalMode ? '0px' : '8px',
        boxShadow: minimalMode ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: 'none', // Remove border for all themes
        boxSizing: 'border-box',
        overflow: 'auto'
      }
    }, [
      React.createElement('div', {
        key: 'grid-container',
        className: 'mult-grid-container',
        style: {
          alignItems: getAlignmentStyle()
        }
      }, rows),
      controls
    ]);
  };
  
  // ===== EXPORT =====
  
  // Export to global scope
  if (typeof window !== 'undefined') {
    window.MultiplicationGrid = MultiplicationGrid;
    window.MultiplicationGridUtils = {
      numberToDigits,
      calculatePartialProduct,
      calculateSum,
      calculateMultiplication
    };
    console.log('✅ MultiplicationGrid component loaded');
    console.log('🔍 [MultiplicationGrid] Exported to window.MultiplicationGrid');
    console.log('🔍 [MultiplicationGrid] Component type:', typeof MultiplicationGrid);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      MultiplicationGrid,
      MultiplicationGridUtils: {
        numberToDigits,
        calculatePartialProduct,
        calculateSum,
        calculateMultiplication
      }
    };
  }
  
})();

