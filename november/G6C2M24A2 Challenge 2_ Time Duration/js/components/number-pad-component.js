/**
 * Number Pad Component - React 18 Optimized
 * 
 * This file contains the number pad panel component with all its functionality
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions, GridPrecisionConfig should be loaded before this file

/**
 * Number Pad Panel Component with correct layout and positioning
 */
const NumberPadPanelComponent = React.memo((props) => {
  const { currentPage, elementName, coordinates, elementProps, zIndex } = props;
  
  // Use the elementProps passed from the ElementRenderer
  console.log('🔢 [NumberPad] Received props:', { currentPage, elementName, elementProps });
  const config = elementProps || {
    backgroundColor: 'transparent',
    borderRadius: '15gc',
    border: '4px solid #FFAB40',
    padding: '15gc',
    showButton: {
      backgroundColor: '#FFD700',
      color: '#000000',
      fontSize: '35gc',         // Hint button text size
      fontWeight: 'bold',
      text: 'show 💡'
    },
    numberButtons: {
      backgroundColor: '#FFAB40',
      color: '#000000',
      fontSize: '30gc',          // Text size inside buttons
      fontWeight: 'bold',
      borderRadius: '6gc',
      border: '2px solid #FF9900',
      margin: '3gc',
      // New customizable props
      buttonSize: '50gc',        // Overall button size (width & height)
      rowGap: '3gc',            // Gap between button rows
      columnGap: '3gc'          // Gap between button columns
    },
    checkButton: {
      backgroundColor: '#FF8C00',
      color: '#000000',
      fontSize: '25gc',         // Check button font size
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '3px solid #FF6347',
      get text() {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.check') : 'CHECK';
      },
      height: '60gc',
      marginTop: '10gc'
    },
    feedbackTextArea: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      fontSize: '30gc',         // Feedback text size (increased by 20% from 25gc)
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '2px dashed #ffffff',
      padding: '10gc',
      textAlign: 'center',
      display: 'flex',
      height: '60gc'
    }
  };
  
  // State for text area content
  const [textAreaContent, setTextAreaContent] = React.useState('');
  const [textAreaColors, setTextAreaColors] = React.useState(() => {
    // Initialize with CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    return {
      color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
      backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
      borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
    };
  });
  
  // Handle number button clicks
  const handleNumberClick = (number) => {
    console.log(`🔢 [NumberPad] Number ${number} clicked`);
    
    // Try multiple ways to call the number click handler
    if (elementProps?.onNumberClick) {
      elementProps.onNumberClick(number);
    } else if (config?.onNumberClick) {
      config.onNumberClick(number);
    } else {
      // Fallback: Call the PageConfig handler directly
      console.log('🔄 [NumberPad] Using fallback number click handler');
      
      // Play click sound for number pad
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('numberpad');
      }
      
             // Update the answer state - simplified without state management
       if (typeof window !== 'undefined') {
         const currentIndex = window.currentQuestionIndex || 0;
         const currentQuestion = { missing: 'subtrahend' };
         
         // State management removed - direct DOM updates only
         console.log(`📝 [NumberPad] Number ${number} entered for minuend`);
         
         // Update answer container by updating DOM directly (no re-render needed)
         const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
         if (answerContainer) {
           const currentIndex = window.currentQuestionIndex || 0;
           const minuend = 5;
           const subtrahend = 3;
           // Get user answer directly from DOM or use entered number
           const userAnswer = number.toString();
           
           // Create the display text with tile format (15% bigger)
           const tileWidth = Math.round(60 * 1.15); // 69px
           const tileHeight = Math.round(60 * 1.15); // 69px
           const fontSize = Math.round(35 * 1.15); // 40px
           const lineHeight = tileHeight - 6; // Adjust for border
           
           let displayText = '';
           const equationText = typeof i18n !== 'undefined' ? 
             i18n.t('subtraction.page2.answerEquation', { subtrahend, minuend }) : 
             `Subtracting ${subtrahend} from ${minuend} gives`;
           
           if (userAnswer === '') {
             // Show equation with empty answer box
             displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #F5F5F5; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px;"></span>`;
           } else {
             // Show equation with user's answer in the box
             displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #FFFFFF; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px; font-weight: bold; color: #000000;">${userAnswer}</span>`;
           }
           
           answerContainer.innerHTML = displayText;
           console.log('📝 [NumberPad] Answer container updated directly:', displayText);
         }
         
         // Single React re-render to update equation tiles (consolidated)
         if (typeof window.forceAppUpdate === 'function') {
           window.forceAppUpdate();
           console.log('✅ [NumberPad] Triggered single React re-render for equation tiles');
         }
      }
    }
  };
  
  // Handle check button click - Simplified to only check minuend
  const handleCheckClick = () => {
    console.log('🔄 [NumberPad] Check button clicked');
    
    if (elementProps?.onCheckClick) {
      elementProps.onCheckClick();
    } else if (config?.onCheckClick) {
      config.onCheckClick();
    } else {
      // Fallback: Use simplified minuend-only check logic
      console.log('🔄 [NumberPad] Using simplified minuend-only check logic');
      
      // Play click sound
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('check');
      }
      
      // Get user answer from DOM or use a simple approach
      const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
      let userAnswer = 0;
      
      // Try to extract the number from the answer container
      if (answerContainer) {
        const textContent = answerContainer.textContent || answerContainer.innerHTML;
        const numberMatch = textContent.match(/\d+/);
        if (numberMatch) {
          userAnswer = parseInt(numberMatch[0]);
        }
      }
      
      console.log(`🔍 [NumberPad Debug] Final userAnswer: ${userAnswer}`);
      
      // Get current question to check against minuend
      const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
        ? window.currentQuestionIndex : 0;
      const currentQuestion = { minuend: 5, subtrahend: 3, missing: 'subtrahend' };
      
      // Expected answer is always the minuend (total number of objects)
      const expectedAnswer = currentQuestion.minuend;
      
      console.log(`🔄 [NumberPad] User answer: ${userAnswer} (type: ${typeof userAnswer}), Expected minuend: ${expectedAnswer} (type: ${typeof expectedAnswer})`);
      console.log(`🔍 [NumberPad Debug] Current question:`, currentQuestion);
      console.log(`🔍 [NumberPad Debug] Current question index: ${currentIndex}`);
      console.log(`🔍 [NumberPad Debug] Comparison: ${userAnswer} === ${expectedAnswer} ? ${userAnswer === expectedAnswer}`);
      
      if (userAnswer < expectedAnswer) {
        // Smaller number
        const feedbackText = typeof i18n !== 'undefined' ? 
          i18n.t('subtraction.page2.feedback.smaller') : 
          `Oops! Smaller number… Count the total number of objects, whether crossed or not…`;
        console.log('❌ [NumberPad] Number too small');
        
        // Play error sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(false);
        }
        
        // Update feedback in number pad text area using new system
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(feedbackText, 'incorrect');
        }
        
        // Update feedback directly - state management removed
        console.log('❌ [NumberPad] Feedback updated - state management removed');
        
      } else if (userAnswer > expectedAnswer) {
        // Bigger number
        const feedbackText = typeof i18n !== 'undefined' ? 
          i18n.t('subtraction.page2.feedback.bigger') : 
          `Oops! Larger number… Count the total number of objects, whether crossed or not…`;
        console.log('❌ [NumberPad] Number too big');
        
        // Play error sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(false);
        }
        
        // Update feedback in number pad text area using new system
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(feedbackText, 'incorrect');
        }
        
        // Update feedback directly - state management removed
        console.log('❌ [NumberPad] Feedback updated - state management removed');
        
      } else {
        // Correct answer - user entered the minuend correctly
        const feedbackText = typeof i18n !== 'undefined' ? 
          i18n.t('subtraction.page2.feedback.correct', { minuend: expectedAnswer }) : 
          `Well Done! There are ${expectedAnswer} objects in the picture… Now how many are crossed?`;
        console.log('✅ [NumberPad] Correct answer - minuend entered correctly!');
        
        // Play success sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(true);
        }
        
        // Update feedback in number pad text area using new system
        if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(feedbackText, 'correct');
        }
        
        // Update feedback directly - state management removed
        console.log('✅ [NumberPad] Correct answer - state management removed');
        
        // Hide step 2 and step 3, show step 4
        const step2Element = document.querySelector('[data-element-name="step2-instruction"]');
        const step3Element = document.querySelector('[data-element-name="step3-page2"]');
        const step4Element = document.querySelector('[data-element-name="step4-page2"]');
        if (step2Element) {
          step2Element.classList.add('hidden');
          console.log('✅ [NumberPad] Step 2 hidden');
        }
        if (step3Element) {
          step3Element.classList.add('hidden');
          console.log('✅ [NumberPad] Step 3 hidden');
        }
        if (step4Element) {
          step4Element.classList.remove('hidden');
          step4Element.classList.add('visible');
          console.log('✅ [NumberPad] Step 4 shown');
        }
        
        // Update all UI states directly - state management removed
        console.log('✅ [NumberPad] All UI states updated directly');
        
        // Tap animations are now handled by the store/UI manager
        
        // Update button states
        if (typeof window !== 'undefined' && window.updateButtonStates) {
          setTimeout(() => window.updateButtonStates(), 100);
        }
      }
    }
  };
  
  
  // Convert gc units to CSS using the grid positioning system
  const gcToCSS = (value) => {
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      
      // Use the existing grid positioning system to convert gc to CSS
      if (typeof gridPositions !== 'undefined') {
        // Create a mock coordinate that represents the gc size
        // For size values, we create a 1x1 grid cell at position [1,1] and scale it by gcValue
        const mockCoordinates = [1, 1, 1 + gcValue, 1 + gcValue];
        const result = gridPositions.convertToCSS(mockCoordinates, 'gc-conversion', 'custom', 'size');
        
        // Extract the width percentage (which equals height for square elements)
        const widthMatch = result.css.width.match(/(\d+\.?\d*)%/);
        const convertedValue = widthMatch ? widthMatch[1] + '%' : `${gcValue * 0.0625}%`; // fallback
        
        console.log(`🔢 [gcToCSS] Converting ${value}: gcValue=${gcValue}, mockCoords=${mockCoordinates}, result=${convertedValue}`);
        
        return convertedValue;
      } else {
        // Fallback if gridPositions is not available
        const currentPrecision = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.currentPrecision : 100;
        const precisionSettings = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[currentPrecision] : { cols: 1600, rows: 900 };
        
        const widthPercent = (gcValue / precisionSettings.cols) * 100;
        const heightPercent = (gcValue / precisionSettings.rows) * 100;
        const percentValue = Math.min(widthPercent, heightPercent);
        
        console.log(`🔢 [gcToCSS] Fallback conversion ${value}: result=${percentValue}%`);
        return `${percentValue}%`;
      }
    }
    return value;
  };
  
  // Process styles to convert gc units using the existing grid system
  const processStyle = (styleObj) => {
    // Use the existing GridCellFontUtils.processGcStyles if available
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles) {
      return GridCellFontUtils.processGcStyles(styleObj);
    }
    
    // Fallback: manual processing
    const processed = {};
    for (const [key, value] of Object.entries(styleObj)) {
      // Only convert string values that contain 'gc', leave other values as-is
      if (typeof value === 'string' && value.includes('gc')) {
        // For font-related properties, we need pixel values, not percentages
        if (key === 'fontSize' || key === 'lineHeight' || key.includes('font')) {
          // Use GridCellFontUtils if available for font properties
          if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPixels) {
            processed[key] = GridCellFontUtils.convertGcToPixels(value, key);
          } else {
            processed[key] = gcToCSS(value); // fallback
          }
        } else {
          // For other properties, use percentage-based conversion
          processed[key] = gcToCSS(value);
        }
      } else {
        processed[key] = value;
      }
    }
    return processed;
  };
  
  // Calculate proper positioning using grid coordinate system
  const getPositionFromCoordinates = () => {
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      // Use the grid positioning utility if available
      if (typeof GridPositionUtils !== 'undefined' && GridPositionUtils.coordinatesToCSS) {
        return GridPositionUtils.coordinatesToCSS(coordinates);
      }
      
      // Fallback: manual calculation based on current grid system
      const [x1, y1, x2, y2] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 72;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 128;
      
      const left = ((x1 - 1) / gridCols) * 100;
      const top = ((y1 - 1) / gridRows) * 100;
      const width = ((x2 - x1 + 1) / gridCols) * 100;
      const height = ((y2 - y1 + 1) / gridRows) * 100;
      
      return {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`,
        height: `${height.toFixed(2)}%`
      };
    }
    
    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '290px',
      height: '290px'
    };
  };
  
  // Get container dimensions for percentage calculations
  const containerPosition = getPositionFromCoordinates();
  
  // Debug logging for number pad positioning
  console.log(`🔢 [NumberPad] Positioning for ${elementName}:`, {
    coordinates,
    containerPosition,
    gridRows: typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 72,
    gridCols: typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 128
  });
  
  
  // 2. Text area (35% of height - extended from 26% + 9% from removed hint button) - use GridCellFontUtils for consistency
  const textAreaStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
    ? GridCellFontUtils.processGcStyles({
        ...config.feedbackTextArea,
        width: '100%',
        height: '35%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
        ...textAreaColors
      })
    : processStyle({
        ...config.feedbackTextArea,
        width: '100%',
        height: '35%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
        ...textAreaColors
      });
  
  // Get text area content from React state only
  const getTextAreaContent = () => {
    return textAreaContent;
  };


  // Store subscription removed - using React state only

  const textArea = React.createElement('div', {
    key: 'text-area',
    id: `${elementName}-text-area`,
    className: 'numberpad-text-area',
    style: textAreaStyle,
    'data-feedback': 'area'
  }, getTextAreaContent());
  
  // Expose methods to update text area from external code
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Function to update feedback in the text area
      window.updateNumberPadFeedback = (message, type = 'default') => {
        setTextAreaContent(message);
        
        // Get CSS variables for consistent styling
        const rootStyles = getComputedStyle(document.documentElement);
        
        switch (type) {
          case 'correct':
            setTextAreaColors({ 
              color: rootStyles.getPropertyValue('--textarea-correct-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-correct-bg').trim() || '#0B803D',
              borderColor: rootStyles.getPropertyValue('--textarea-correct-border').trim() || '#219150'
            });
            break;
          case 'error':
          case 'incorrect':
            setTextAreaColors({ 
              color: rootStyles.getPropertyValue('--textarea-incorrect-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-incorrect-bg').trim() || '#D9D9D9',
              borderColor: rootStyles.getPropertyValue('--textarea-incorrect-border').trim() || '#FF6B61'
            });
            break;
          case 'hint':
            setTextAreaColors({ 
              color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
              borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
            });
            break;
          default:
            setTextAreaColors({ 
              color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
              borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
            });
            break;
        }
      };
      
      // Function to clear feedback
      window.clearNumberPadFeedback = () => {
        setTextAreaContent('');
        const rootStyles = getComputedStyle(document.documentElement);
        setTextAreaColors({ 
          color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
          backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
          borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
        });
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.updateNumberPadFeedback;
        delete window.clearNumberPadFeedback;
      }
    };
  }, []);
  
  // 3. Number pad (51% of height) - use customizable button size
  const numberButtons = [];
  const buttonSize = gcToCSS(config.numberButtons?.buttonSize || '50gc');
  
  console.log('🔢 [NumberPad] Button sizing:', {
    buttonSize: config.numberButtons?.buttonSize,
    fontSize: config.numberButtons?.fontSize,
    rowGap: config.numberButtons?.rowGap,
    columnGap: config.numberButtons?.columnGap,
    calculatedButtonSize: buttonSize,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    gridCols: typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 'undefined',
    gridRows: typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 'undefined'
  });
  
  for (let i = 0; i <= 9; i++) {
    // Extract only button-specific properties, excluding grid properties and size properties
    const { rowGap, columnGap, buttonSize: configButtonSize, width, height, ...buttonProps } = config.numberButtons;
    
    // Use GridCellFontUtils for consistent styling
    const buttonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
      ? GridCellFontUtils.processGcStyles({
          ...buttonProps,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: buttonSize,
          height: buttonSize
        })
      : processStyle({
          ...buttonProps,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: buttonSize,
          height: buttonSize
        });
    
    if (i === 0) { // Only log for first button to avoid spam
      console.log('🔢 [NumberPad] First button style:', buttonStyle);
    }
    
    numberButtons.push(
      React.createElement('button', {
        key: `number-${i}`,
        className: `number-pad-button number-${i}`,
        style: buttonStyle,
        onClick: () => handleNumberClick(i),
        onMouseOver: (e) => {
          e.target.classList.add('hovered');
        },
        onMouseOut: (e) => {
          e.target.classList.remove('hovered');
        },
        'data-number': i
      }, i.toString())
    );
  }
  
  // Layout the number pad in a 3x4 grid (calculator layout)
  const keypadLayout = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];
  const gridButtons = keypadLayout.map((num, index) => {
    if (num === null) {
      return React.createElement('div', { key: `empty-${index}` }); // Empty cell
    }
    return numberButtons[num];
  });
  
  const rowGapValue = gcToCSS(config.numberButtons?.rowGap || config.numberButtons?.margin || '3gc');
  const columnGapValue = gcToCSS(config.numberButtons?.columnGap || config.numberButtons?.margin || '3gc');
  
  console.log('🔢 [NumberPad] Grid gaps:', {
    rowGap: config.numberButtons?.rowGap,
    columnGap: config.numberButtons?.columnGap,
    margin: config.numberButtons?.margin,
    calculatedRowGap: rowGapValue,
    calculatedColumnGap: columnGapValue,
    gcToCSSTest: gcToCSS('3gc')
  });
  
  console.log('🔢 [NumberPad] Full config.numberButtons:', config.numberButtons);
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: rowGapValue,
    columnGap: columnGapValue,
    width: '100%',
    height: '51%',
    alignItems: 'center',
    justifyItems: 'center',
    marginBottom: '3%'
  };
  
  console.log('🔢 [NumberPad] Grid style object:', gridStyle);
  
  const numberPadGrid = React.createElement('div', {
    className: 'number-pad-grid',
    style: gridStyle
  }, ...gridButtons);
  
  // 4. Check button (10% of height) - use GridCellFontUtils for consistency
  const checkButtonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
    ? GridCellFontUtils.processGcStyles({
        ...config.checkButton,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
    : processStyle({
        ...config.checkButton,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
  
  const checkButton = React.createElement('button', {
    key: 'check-button',
    className: 'number-pad-check-button',
    style: checkButtonStyle,
    onClick: handleCheckClick,
    onMouseOver: (e) => {
      e.target.classList.add('hovered');
    },
    onMouseOut: (e) => {
      e.target.classList.remove('hovered');
    },
    'data-action': 'check'
  }, config.checkButton?.text || 
    (typeof i18n !== 'undefined' ? i18n.t('dialogs.numberPad.check') : 'CHECK'));
  
  // Main container with proper grid positioning
  const containerStyle = {
    ...containerPosition,
    ...processStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: config.backgroundColor,
      borderRadius: config.borderRadius,
      border: config.border,
      padding: config.padding || '15px',
      boxSizing: 'border-box'
    }),
    zIndex: zIndex || 1000
  };
  
  // Layout order: text area -> number pad -> check button (hint button removed)
  const children = [
    textArea,      // 35% height (extended from 26% + 9% from removed hint button)
    numberPadGrid, // 51% height
    checkButton    // 10% height
  ];
  
  return React.createElement('div', {
    id: `${elementName}-${currentPage}`,
    className: 'number-pad-panel-container',
    style: containerStyle,
    'data-element-name': elementName,
    'data-page': currentPage
  }, ...children);
});

// Number Pad Element Configuration
const NumberPadElement = {
  numberPadPanel: {
    type: 'number-pad-panel',
    coordinates: [20, 20, 80, 80],
    zIndex: 'var(--z-elevated)',
    props: {
      backgroundColor: '#8B4513',
      borderRadius: '15gc',
      border: '4px solid #D2691E',
      padding: '20gc',
      
      showButton: {
        backgroundColor: '#FFD700',
        color: '#000000',
        fontSize: '35gc',
        fontWeight: 'bold',
        text: 'show 💡'
      },
      
      numberButtons: {
        backgroundColor: '#FFD700',
        color: '#000000',
        fontSize: '45gc',
        fontWeight: 'bold'
      },
      
      checkButton: {
        backgroundColor: '#FF8C00',
        color: '#000000',
        fontSize: '35gc',
        fontWeight: 'bold',
        text: 'CHECK'
      }
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('number-pad', (props, elementId) => {
      return React.createElement(NumberPadPanelComponent, props);
    })
  }
};

// Export component and configuration
window.NumberPadComponent = {
  NumberPadPanelComponent,
  NumberPadElement
};

console.log('✅ Number pad component loaded successfully');
