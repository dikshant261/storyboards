/**
 * Slider Component - React 18 Optimized
 * 
 * This file contains:
 * - SliderComponent: A customizable slider with label
 * - CheckButtonComponent: A styled check/validate button
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Slider Component with real-time value display
 */
const SliderComponent = React.memo((props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 200, 100],
    zIndex = 60,
    min = 0,
    max = 10,
    step = 1,
    defaultValue = 0,
    label = 'Divisor',
    labelColor = '#ffffff',
    labelFontSize = '24gc',
    trackColor = '#4a5568',
    trackActiveColor = '#FF9900',
    thumbColor = '#FF9900',
    thumbSize = '24gc',
    onChange,
    position,
    processedStyles,
    elementZIndex,
    ...otherProps
  } = props;

  // State for slider value
  const [value, setValue] = React.useState(defaultValue);
  const [isDisabled, setIsDisabled] = React.useState(false);

  // Store value in window for access by other components
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sliderValues = window.sliderValues || {};
      window.sliderValues[id || elementName || 'default'] = value;
    }
  }, [value, id, elementName]);

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedLabelFontSize = processGc(labelFontSize, 'fontSize');
  const processedThumbSize = processGc(thumbSize, 'width');

  // Listen to validation results to disable when correct
  React.useEffect(() => {
    const handleValidation = (event) => {
      // Check if this validation is for our slider
      if (event.detail.sliderId === (id || elementName)) {
        setIsDisabled(event.detail.isCorrect);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('sliderValidated', handleValidation);
      return () => {
        window.removeEventListener('sliderValidated', handleValidation);
      };
    }
  }, [id, elementName]);

  // Handle slider change
  const handleChange = React.useCallback((e) => {
    if (isDisabled) return; // Don't allow changes when disabled
    
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    
    // Dispatch custom event for other components to listen
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sliderValueChanged', {
        detail: { id: id || elementName, value: newValue }
      }));
    }
    
    if (onChange) {
      onChange(newValue);
    }
  }, [id, elementName, onChange, isDisabled]);

  // Container style
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: elementZIndex || zIndex,
    gap: '8px'
  };

  // Slider wrapper style
  const sliderWrapperStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Custom slider styles using CSS variables
  const sliderStyle = {
    width: '100%',
    height: '8px',
    appearance: 'none',
    WebkitAppearance: 'none',
    background: `linear-gradient(to right, ${trackActiveColor} 0%, ${trackActiveColor} ${(value - min) / (max - min) * 100}%, ${trackColor} ${(value - min) / (max - min) * 100}%, ${trackColor} 100%)`,
    borderRadius: '4px',
    outline: 'none',
    cursor: 'pointer',
    '--thumb-color': thumbColor,
    '--thumb-size': processedThumbSize || '24px'
  };

  // Label style
  const labelStyle = {
    color: labelColor,
    fontSize: processedLabelFontSize || '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  };

  return React.createElement('div', {
    id: id || elementId,
    className: 'slider-component-container',
    style: containerStyle,
    'data-element-type': 'slider',
    'data-component-type': 'SliderComponent',
    'data-component': 'SliderComponent',
    'data-element-name': elementName,
    'data-page': currentPage
  }, [
    // Slider input
    React.createElement('div', {
      key: 'slider-wrapper',
      style: sliderWrapperStyle
    }, React.createElement('input', {
      key: 'slider-input',
      type: 'range',
      min: min,
      max: max,
      step: step,
      value: value,
      onChange: handleChange,
      disabled: isDisabled,
      className: `slider-input${isDisabled ? ' disabled' : ''}`,
      style: {
        ...sliderStyle,
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer'
      }
    })),
    // Label showing current value
    React.createElement('div', {
      key: 'slider-label',
      className: 'slider-label',
      style: labelStyle
    }, `${label} = ${value}`)
  ]);
});

/**
 * Check Button Component - Styled validation button
 */
const CheckButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const [isChecking, setIsChecking] = React.useState(false);

  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 150, 60],
    zIndex = 60,
    text = 'Check',
    className = 'applet-button',
    frameClassName = 'applet-button-frame',
    contentClassName = 'applet-button-content',
    frameGap = '6.25gc',
    backgroundColor = '#FF9900',
    hoverColor = '#9CA3AF',
    textColor = '#ffffff',
    fontSize = '28gc',
    fontWeight = 'bold',
    borderRadius = '15gc',
    disabled = false,
    onClick,
    validateSlider = true,
    sliderId,
    expectedValue,
    position,
    processedStyles,
    elementZIndex,
    ...otherProps
  } = props;

  // State to track if answer is correct (to disable button)
  const [isCorrect, setIsCorrect] = React.useState(false);

  // Listen to validation results to disable when correct
  React.useEffect(() => {
    const handleValidation = (event) => {
      // Check if this validation is for our slider
      if (event.detail.sliderId === sliderId) {
        setIsCorrect(event.detail.isCorrect);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('sliderValidated', handleValidation);
      return () => {
        window.removeEventListener('sliderValidated', handleValidation);
      };
    }
  }, [sliderId]);

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedFontSize = processGc(fontSize, 'fontSize');
  const processedBorderRadius = processGc(borderRadius, 'borderRadius');
  
  // Button is disabled if explicitly disabled OR if answer is correct
  const isButtonDisabled = disabled || isCorrect;

  // Handle click
  const handleClick = React.useCallback(() => {
    if (isButtonDisabled || isChecking) return;

    setIsChecking(true);

    startTransition(() => {
      let isCorrect = false;
      let sliderValue = 0;

      // Get slider value if validation is enabled
      if (validateSlider && typeof window !== 'undefined') {
        sliderValue = window.sliderValues?.[sliderId] ?? 0;
        
        // Get expected value (divisor from current question)
        let expected = expectedValue;
        if (expected === undefined && window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          expected = question?.divisor ?? 3;
        }

        isCorrect = sliderValue === expected;

        console.log('🔍 [CheckButton] Validation:', {
          sliderValue,
          expectedValue: expected,
          isCorrect
        });

        // Dispatch validation result event
        window.dispatchEvent(new CustomEvent('sliderValidated', {
          detail: {
            id: id || elementName,
            sliderId,
            sliderValue,
            expectedValue: expected,
            isCorrect
          }
        }));

        // If correct, mark page as complete and dispatch quizCompleted event
        if (isCorrect && window.PageCompletionManager) {
          const currentPageNum = window.getCurrentPage ? window.getCurrentPage() : currentPage;
          window.PageCompletionManager.setPageCompleted(currentPageNum, true);
          
          // Dispatch quizCompleted event to enable next button and tap animation
          if (typeof window !== 'undefined') {
            const quizCompletedEvent = new CustomEvent('quizCompleted', {
              detail: {
                pageNumber: currentPageNum,
                componentId: id || elementName,
                componentType: 'CheckButtonComponent'
              }
            });
            window.dispatchEvent(quizCompletedEvent);
            console.log('✅ [CheckButton] Dispatched quizCompleted event for page', currentPageNum);
          }
        }
      }

      // Call custom onClick handler
      if (onClick) {
        onClick({ isCorrect, sliderValue });
      }

      // Reset checking state after animation
      setTimeout(() => setIsChecking(false), 300);
    });
  }, [disabled, isChecking, validateSlider, sliderId, expectedValue, id, elementName, currentPage, onClick]);

  // Check if this is an applet button (3-layer system)
  const isAppletButton = className === 'applet-button' || 
    frameClassName === 'applet-button-frame' || 
    contentClassName === 'applet-button-content';

  const deferredText = React.useDeferredValue(text);

  // Handle click
  const clickHandler = isButtonDisabled || isChecking ? undefined : handleClick;

  if (isAppletButton) {
    // Three-layer button structure (same as NextButtonComponent)
    let frameGapPx = '5px';
    if (frameGap) {
      if (typeof frameGap === 'string' && frameGap.includes('gc')) {
        // Convert grid cell units to pixels using GridCellFontUtils if available
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPx) {
          frameGapPx = GridCellFontUtils.convertGcToPx(frameGap);
        } else {
          // Fallback conversion (approximate)
          const gcValue = parseFloat(frameGap.replace('gc', ''));
          frameGapPx = `${gcValue * 0.5}px`;
        }
      } else {
        frameGapPx = frameGap;
      }
    }
    
    const containerStyle = {
      // Apply grid positioning from the element renderer
      ...(position?.css || {}),
      // Apply processed styles but exclude backgroundColor to prevent color changes
      ...(processedStyles ? Object.fromEntries(
        Object.entries(processedStyles).filter(([key]) => key !== 'backgroundColor' && key !== 'background')
      ) : {}),
      // Apply z-index
      zIndex: elementZIndex || zIndex,
      // Apply default styles - always use orange, never change based on validation
      backgroundColor: backgroundColor,
      borderRadius: processedBorderRadius,
      cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isButtonDisabled ? '0.5' : '1',
      pointerEvents: isButtonDisabled ? 'none' : 'auto'
    };
    
    return React.createElement('div', {
      id: id || elementId,
      className: `applet-button-container check-button-container${isPending ? ' pending' : ''}${isButtonDisabled ? ' disabled' : ''}${isChecking ? ' checking' : ''}`,
      style: containerStyle,
      onClick: clickHandler,
      'data-element-type': 'check-button',
      'data-component-type': 'CheckButtonComponent',
      'data-component': 'CheckButtonComponent',
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-disabled': isButtonDisabled
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame check-button-frame',
        style: {
          position: 'absolute',
          top: frameGapPx,
          left: frameGapPx,
          right: frameGapPx,
          bottom: frameGapPx,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1
        }
      }),
      // Content layer
      React.createElement('div', {
        key: 'content',
        className: 'applet-button-content check-button-content',
        style: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apply other processed styles first, but exclude backgroundColor
          ...(processedStyles ? Object.fromEntries(
            Object.entries(processedStyles).filter(([key]) => key !== 'backgroundColor' && key !== 'background')
          ) : {}),
          // Apply our processed styles last to ensure they take precedence
          fontSize: processedFontSize || 'inherit',
          fontWeight: fontWeight || 'inherit',
          color: textColor || 'inherit',
          // Explicitly set background to transparent for content layer
          backgroundColor: 'transparent',
          background: 'transparent'
        }
      }, deferredText)
    ]);
  }
  
  // Fallback to single-layer button for backward compatibility
  const fallbackStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isButtonDisabled ? '#4B5563' : backgroundColor,
    borderRadius: processedBorderRadius || '8px',
    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
    opacity: isButtonDisabled ? 0.6 : 1,
    zIndex: elementZIndex || zIndex,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.2)'
  };

  return React.createElement('div', {
    id: elementId,
    className: `check-button-container${isPending ? ' pending' : ''}${isButtonDisabled ? ' disabled' : ''}${isChecking ? ' checking' : ''}`,
    style: fallbackStyle,
    onClick: clickHandler,
    'data-element-type': 'check-button',
    'data-element-name': elementName,
    'data-page': currentPage
  }, React.createElement('span', {
    className: 'check-button-content',
    style: {
      color: textColor,
      fontSize: processedFontSize || '24px',
      fontWeight: fontWeight,
      textAlign: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    }
  }, deferredText));
});

// Slider Element Configuration for elements-registry
const SliderElement = {
  slider: {
    type: 'custom',
    zIndex: 60,
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('slider', (props, elementId) => {
      return React.createElement(SliderComponent, { ...props, key: elementId });
    })
  }
};

// Check Button Element Configuration for elements-registry
const CheckButtonElement = {
  checkButton: {
    type: 'custom',
    zIndex: 60,
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('check-button', (props, elementId) => {
      return React.createElement(CheckButtonComponent, { ...props, key: elementId });
    })
  }
};

// Export components and configuration
window.SliderComponent = {
  SliderComponent,
  CheckButtonComponent,
  SliderElement,
  CheckButtonElement
};

console.log('✅ Slider components loaded successfully');

