/**
 * Solution Step Component - React 18 Optimized
 * 
 * This component displays a hierarchical list of solution steps with numbered main steps
 * and alphabetically labeled sub-steps. Supports highlighting current, past, and future steps.
 */

// Dependencies: React should be loaded before this file

/**
 * Solution Step Component
 */
const SolutionStepComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;
  
  // Extract page number from component ID for event listening
  const pageMatch = componentId.match(/page(\d+)/);
  const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : null;
  
  const {
    position,
    processedStyles,
    elementZIndex,
    // Steps array (correct order with optional subSteps)
    steps = [],
    // Current step/substep tracking (1-indexed)
    currentStep = 1,
    currentSubStep = null, // null means no sub-step is active
    // Header
    headerText = 'Steps to Solve',
    headerFontSize = '24gc',
    headerFontColor = '#ffffff',
    headerBackgroundColor = 'transparent', // Changed from rgba(0, 0, 0, 0.6) to transparent
    // Step styling
    stepFontSize = '18gc',
    stepFontColor = '#ffffff', // Changed to white for dark containers
    // State colors
    currentStepColor = '#2196F3', // Blue for current
    pastStepColor = '#4CAF50', // Green for completed
    futureStepColor = '#E0E0E0', // Light gray for future
    // Circle styling (legacy - kept for backwards compatibility)
    circleSize = '32gc',
    circleFontSize = '16gc',
    circleBackgroundColor = '#ffffff',
    circleBorderColor = '#333333',
    // NEW: Step number styling (without circle)
    showStepNumberCircle = false, // Whether to show circle around step number (default: false for new style)
    stepNumberColor = '#ffffff', // Color of step number text
    stepNumberFontSize = '32gc', // Font size for step numbers
    // NEW: Step container styling
    stepContainerBackgroundColor = 'rgba(0, 0, 0, 0.3)', // Background for each step row
    // NEW: Left accent border
    accentBorderColor = '#4DD0E1', // Left border accent color (cyan/blue)
    accentBorderWidth = '4gc', // Width of left accent border
    // Layout
    gap = '8gc',
    subStepIndent = '40gc',
    stepPadding = '12gc',
    stepBorderRadius = '8gc',
    // Collapsible behavior
    collapsible = true,
    subStepsCollapsible = true, // Whether sub-steps can be collapsed/expanded (default: true)
    subStepsDefaultExpanded = false, // Default state for sub-steps: true = expanded, false = collapsed (default: false)
    onSubStepExpand = null, // Callback when sub-step is expanded: (stepIndex, subStepIndex) => {}
    onSubStepCollapse = null, // Callback when sub-step is collapsed: (stepIndex, subStepIndex) => {}
    // Mode: show all steps and sub-steps as current
    showAllAsCurrent = false, // When true, all steps and sub-steps appear as current (default: false)
    // Container styling
    containerBackgroundColor = '#0A0A1A',
    containerBackgroundOpacity = 0.5,
    containerBorderWidth = '2gc',
    containerBorderColor = '#ffffff',
    containerBorderType = 'solid', // 'solid' or 'dashed'
    containerBorderRadius = '8gc',
    containerPadding = '16gc'
  } = props;
  
  // Process gc units using GridCellFontUtils
  const processGcProperty = (value, propertyType = 'fontSize') => {
    if (value && typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  };
  
  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = React.useCallback((text) => {
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
  }, []);
  
  // Process all gc properties
  const processedHeaderFontSize = processGcProperty(headerFontSize, 'fontSize');
  const processedStepFontSize = processGcProperty(stepFontSize, 'fontSize');
  const processedCircleSize = processGcProperty(circleSize, 'width');
  const processedCircleFontSize = processGcProperty(circleFontSize, 'fontSize');
  const processedStepNumberFontSize = processGcProperty(stepNumberFontSize, 'fontSize');
  const processedAccentBorderWidth = processGcProperty(accentBorderWidth, 'borderWidth');
  const processedGap = processGcProperty(gap, 'gap');
  const processedSubStepIndent = processGcProperty(subStepIndent, 'marginLeft');
  const processedStepPadding = processGcProperty(stepPadding, 'padding');
  const processedStepBorderRadius = processGcProperty(stepBorderRadius, 'borderRadius');
  const processedContainerBorderWidth = processGcProperty(containerBorderWidth, 'borderWidth');
  const processedContainerBorderRadius = processGcProperty(containerBorderRadius, 'borderRadius');
  const processedContainerPadding = processGcProperty(containerPadding, 'padding');
  const processedHeaderPaddingBottom = processGcProperty('8gc', 'padding');
  
  // State for expanded steps (when collapsible is true)
  const [expandedSteps, setExpandedSteps] = React.useState(() => {
    // Set initial expanded state based on subStepsDefaultExpanded prop or showAllAsCurrent mode
    const initial = {};
    steps.forEach((step, index) => {
      if (step.subSteps && step.subSteps.length > 0) {
        // If showAllAsCurrent is true, expand all sub-steps
        // Otherwise, use subStepsDefaultExpanded prop to determine initial state
        initial[index] = showAllAsCurrent ? true : subStepsDefaultExpanded; // false = collapsed, true = expanded
      }
    });
    return initial;
  });
  
  // State to override sub-steps collapsible and default expanded when quiz is completed (for page 10)
  const [subStepsCollapsibleOverride, setSubStepsCollapsibleOverride] = React.useState(null);
  const [subStepsDefaultExpandedOverride, setSubStepsDefaultExpandedOverride] = React.useState(null);
  
  // Use override values if set, otherwise use props
  const effectiveSubStepsCollapsible = subStepsCollapsibleOverride !== null ? subStepsCollapsibleOverride : subStepsCollapsible;
  const effectiveSubStepsDefaultExpanded = subStepsDefaultExpandedOverride !== null ? subStepsDefaultExpandedOverride : subStepsDefaultExpanded;
  
  // When showAllAsCurrent is true, ensure all sub-steps are expanded
  React.useEffect(() => {
    if (showAllAsCurrent) {
      setExpandedSteps(prev => {
        const updated = { ...prev };
        steps.forEach((step, index) => {
          if (step.subSteps && step.subSteps.length > 0) {
            updated[index] = true;
          }
        });
        return updated;
      });
    }
  }, [showAllAsCurrent, steps]);
  
  // Listen for quizCompleted event for page 10 to update sub-steps behavior
  React.useEffect(() => {
    if (pageNumber === 10) {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 10) {
          console.log('🔍 [SolutionStep] Quiz completed for page 10, enabling sub-steps collapsible and setting to expanded');
          setSubStepsCollapsibleOverride(true);
          setSubStepsDefaultExpandedOverride(true);
          // Also update expandedSteps state to expand all sub-steps
          setExpandedSteps(prev => {
            const updated = { ...prev };
            steps.forEach((step, index) => {
              if (step.subSteps && step.subSteps.length > 0) {
                updated[index] = true;
              }
            });
            return updated;
          });
    }
      };
      
      window.addEventListener('quizCompleted', handleQuizCompleted);
      
      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
  }, [pageNumber, steps]);
  
  // Toggle step expansion
  const toggleStep = React.useCallback((stepIndex) => {
    if (!collapsible || !effectiveSubStepsCollapsible) return;
    if (!steps[stepIndex]?.subSteps?.length) return;
    
    const wasExpanded = expandedSteps[stepIndex] || false;
    const willBeExpanded = !wasExpanded;
    
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
    
    // Call callbacks if provided
    if (willBeExpanded && onSubStepExpand) {
      onSubStepExpand(stepIndex, null); // null means all sub-steps for this step
    } else if (!willBeExpanded && onSubStepCollapse) {
      onSubStepCollapse(stepIndex, null); // null means all sub-steps for this step
    }
  }, [collapsible, effectiveSubStepsCollapsible, steps, expandedSteps, onSubStepExpand, onSubStepCollapse]);
  
  // Determine step state (past, current, future)
  const getStepState = React.useCallback((stepIndex) => {
    // If showAllAsCurrent mode is enabled, all steps appear as current
    if (showAllAsCurrent) return 'current';
    const stepNum = stepIndex + 1;
    if (stepNum < currentStep) return 'past';
    if (stepNum === currentStep) return 'current';
    return 'future';
  }, [currentStep, showAllAsCurrent]);
  
  // Determine sub-step state
  const getSubStepState = React.useCallback((stepIndex, subStepIndex) => {
    // If showAllAsCurrent mode is enabled, all sub-steps appear as current
    if (showAllAsCurrent) return 'current';
    const stepNum = stepIndex + 1;
    const subStepNum = subStepIndex + 1;
    
    if (stepNum < currentStep) return 'past';
    if (stepNum > currentStep) return 'future';
    
    // We're in the current step
    if (currentSubStep === null) {
      // No sub-step active, all sub-steps are future within current step
      return 'future';
    }
    
    if (subStepNum < currentSubStep) return 'past';
    if (subStepNum === currentSubStep) return 'current';
    return 'future';
  }, [currentStep, currentSubStep, showAllAsCurrent]);
  
  // Get background color based on state
  const getBackgroundColor = React.useCallback((state) => {
    switch (state) {
      case 'past': return pastStepColor;
      case 'current': return currentStepColor;
      case 'future': return futureStepColor;
      default: return futureStepColor;
    }
  }, [pastStepColor, currentStepColor, futureStepColor]);
  
  // Convert number to letter (0 -> 'a', 1 -> 'b', etc.)
  const numberToLetter = (num) => String.fromCharCode(97 + num);
  
  // Helper function to convert hex to rgba (same as InformationAnalysisComponent)
  const hexToRgba = (hex, opacity) => {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
      return hex; // Return as-is if not a hex color
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Container styles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    zIndex: elementZIndex || 1,
    backgroundColor: hexToRgba(containerBackgroundColor, containerBackgroundOpacity),
    border: 'none', // Remove border around component
    borderRadius: processedContainerBorderRadius,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'inherit'
  };
  
  // Header styles
  const headerStyle = {
    backgroundColor: headerBackgroundColor,
    color: accentBorderColor, // Use accent border color for header text
    fontSize: processedHeaderFontSize,
    fontWeight: 'bold',
    paddingTop: processedContainerPadding,
    paddingLeft: processedContainerPadding,
    paddingRight: processedContainerPadding,
    paddingBottom: processedHeaderPaddingBottom, // Reduced bottom padding to reduce gap
    margin: 0,
    marginBottom: '0' // No margin bottom
  };
  
  // Steps container styles
  const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: processedGap,
    paddingTop: '0', // No top padding to reduce gap from header
    paddingLeft: processedContainerPadding,
    paddingRight: processedContainerPadding,
    paddingBottom: processedContainerPadding,
    marginTop: '0' // No top margin
  };
  
  // Get accent border color based on state
  const getAccentBorderColor = React.useCallback((state) => {
    switch (state) {
      case 'past': return '#4CAF50'; // Bright green for past/completed
      case 'current': return '#00E5FF'; // Very bright cyan for current (more prominent)
      case 'future': return '#888888'; // Darker gray for future
      default: return accentBorderColor;
    }
  }, [accentBorderColor]);
  
  // Get container background opacity based on state
  const getContainerBackgroundOpacity = React.useCallback((state) => {
    switch (state) {
      case 'past': return 0.5; // Higher opacity for past (more visible)
      case 'current': return 0.7; // Much higher opacity for current (very prominent)
      case 'future': return 0.15; // Lower opacity for future (more dimmed)
      default: return 0.3;
    }
  }, []);
  
  // Step row styles - NEW: with left accent border and state-based styling
  const getStepRowStyle = (state) => {
    // Parse the base background color to adjust opacity
    const baseColor = stepContainerBackgroundColor;
    let backgroundColor = baseColor;
    
    // For current step, use a subtle color of the accent border color
    if (state === 'current') {
      const accentColor = getAccentBorderColor(state); // #00E5FF (bright cyan)
      backgroundColor = hexToRgba(accentColor, 0.15); // Subtle cyan tint for current step background
    } else {
      // For past and future steps, use the base color with adjusted opacity
      if (baseColor.startsWith('rgba')) {
        const match = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      } else if (baseColor.startsWith('rgb')) {
        // Convert rgb to rgba with state-based opacity
        const match = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      }
    }
    
    // Add box shadow for current step to make it stand out
    const boxShadow = state === 'current' ? '0 4px 8px rgba(0, 229, 255, 0.3)' : 'none';
    
    return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: processedStepPadding,
      backgroundColor: backgroundColor,
    borderRadius: processedStepBorderRadius,
      borderLeft: `${processedAccentBorderWidth} solid ${getAccentBorderColor(state)}`, // State-based accent border
      boxShadow: boxShadow, // Glow effect for current step
      cursor: (collapsible && effectiveSubStepsCollapsible) ? 'pointer' : 'default',
      transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
      userSelect: 'none',
      opacity: state === 'future' ? 0.6 : 1 // More dimmed future steps for better contrast
    };
  };
  
  // Sub-step row styles - NEW: with left accent border and state-based styling
  const getSubStepRowStyle = (state) => {
    // Parse the base background color to adjust opacity
    const baseColor = stepContainerBackgroundColor;
    let backgroundColor = baseColor;
    
    // For current sub-step, use a subtle color of the accent border color
    if (state === 'current') {
      const accentColor = getAccentBorderColor(state); // #00E5FF (bright cyan)
      backgroundColor = hexToRgba(accentColor, 0.15); // Subtle cyan tint for current sub-step background
    } else {
      // For past and future sub-steps, use the base color with adjusted opacity
      if (baseColor.startsWith('rgba')) {
        const match = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      } else if (baseColor.startsWith('rgb')) {
        // Convert rgb to rgba with state-based opacity
        const match = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      }
    }
    
    // Add box shadow for current sub-step to make it stand out
    const boxShadow = state === 'current' ? '0 4px 8px rgba(0, 229, 255, 0.3)' : 'none';
    
    return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: processedStepPadding,
    marginLeft: processedSubStepIndent,
      backgroundColor: backgroundColor,
    borderRadius: processedStepBorderRadius,
      borderLeft: `${processedAccentBorderWidth} solid ${getAccentBorderColor(state)}`, // State-based accent border
      boxShadow: boxShadow, // Glow effect for current sub-step
      transition: 'background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      opacity: state === 'future' ? 0.6 : 1 // More dimmed future steps for better contrast
    };
  };
  
  // Circle styles (legacy - used when showStepNumberCircle is true)
  const circleStyle = {
    width: processedCircleSize,
    height: processedCircleSize,
    minWidth: processedCircleSize,
    minHeight: processedCircleSize,
    borderRadius: '50%',
    backgroundColor: circleBackgroundColor,
    border: `2px solid ${circleBorderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: processedCircleFontSize,
    fontWeight: 'bold',
    color: '#333333',
    flexShrink: 0
  };
  
  // Get text color based on state - use accent border color with subtle opacity for past steps
  const getTextColor = React.useCallback((state) => {
    if (state === 'past') {
      // For past steps, use a subtle opacity version of the accent border color (green)
      const accentColor = getAccentBorderColor(state); // #4CAF50
      return hexToRgba(accentColor, 0.7); // Subtle green tint for past step text
    }
    // For current and future steps, use the default stepFontColor
    return stepFontColor;
  }, [stepFontColor, getAccentBorderColor]);
  
  // Get text opacity based on state
  const getTextOpacity = React.useCallback((state) => {
    switch (state) {
      case 'past': return 1; // Full opacity for past (more visible)
      case 'current': return 1; // Full opacity for current
      case 'future': return 0.5; // More dimmed for future (more contrast)
      default: return 1;
    }
  }, []);
  
  // NEW: Step number text style (without circle) - state-aware
  const getStepNumberTextStyle = React.useCallback((state) => {
    // For past steps, use subtle opacity version of accent color
    let numberColor = stepNumberColor;
    if (state === 'past') {
      const accentColor = getAccentBorderColor(state); // #4CAF50
      numberColor = hexToRgba(accentColor, 0.7); // Subtle green tint for past step number
    }
    
    return {
      fontSize: processedStepNumberFontSize,
      fontWeight: 'bold',
      color: numberColor,
      opacity: getTextOpacity(state), // Apply state-based opacity
      minWidth: processedCircleSize, // Keep same min width for alignment
      textAlign: 'center',
      flexShrink: 0
    };
  }, [processedStepNumberFontSize, stepNumberColor, processedCircleSize, getTextOpacity, getAccentBorderColor]);
  
  // Step text styles
  const getStepTextStyle = React.useCallback((state) => ({
    fontSize: processedStepFontSize,
    color: getTextColor(state),
    opacity: getTextOpacity(state),
    flex: 1,
    lineHeight: 1.4
  }), [processedStepFontSize, getTextColor, getTextOpacity]);
  
  // Sub-steps container styles (for animation)
  const getSubStepsContainerStyle = (isExpanded) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: processedGap,
    overflow: 'hidden',
    maxHeight: isExpanded ? '1000px' : '0',
    opacity: isExpanded ? 1 : 0,
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    marginTop: isExpanded ? processedGap : '0'
  });
  
  return React.createElement('div', {
    style: containerStyle,
    'data-component-id': componentId
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: headerStyle
    }, headerText),
    
    // Steps container
    React.createElement('div', {
      key: 'steps-container',
      style: stepsContainerStyle
    }, steps.map((step, stepIndex) => {
      const stepState = getStepState(stepIndex);
      const hasSubSteps = step.subSteps && step.subSteps.length > 0;
      const isExpanded = expandedSteps[stepIndex] || false;
      
      return React.createElement('div', {
        key: `step-${stepIndex}`,
        style: { display: 'flex', flexDirection: 'column' }
      }, [
        // Main step row
        React.createElement('div', {
          key: `step-row-${stepIndex}`,
          style: getStepRowStyle(stepState),
          onClick: () => {
            if (effectiveSubStepsCollapsible) {
              toggleStep(stepIndex);
            }
          },
          onMouseEnter: (e) => {
            if (collapsible && hasSubSteps && effectiveSubStepsCollapsible) {
              e.currentTarget.style.transform = 'scale(1.01)';
            }
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }, [
          // Step number - either circle (legacy) or plain text (new style)
          showStepNumberCircle ? 
          React.createElement('div', {
            key: `circle-${stepIndex}`,
            style: circleStyle
            }, stepIndex + 1) :
            React.createElement('div', {
              key: `number-${stepIndex}`,
              style: getStepNumberTextStyle(stepState)
          }, stepIndex + 1),
          
          // Step text (support HTML if contains tags, and convert LaTeX fractions)
          (() => {
            const stepText = step.text;
            const containsHTML = /<[^>]+>/.test(stepText);
            const containsLaTeX = /\$/.test(stepText);
            let processedText = stepText;
            
            // Convert LaTeX fractions if present
            if (containsLaTeX) {
              processedText = convertLatexFractions(stepText);
            }
            
            return React.createElement('div', {
              key: `text-${stepIndex}`,
              style: getStepTextStyle(stepState),
              ...((containsHTML || containsLaTeX) ? { dangerouslySetInnerHTML: { __html: processedText } } : {})
            }, (containsHTML || containsLaTeX) ? null : processedText);
          })(),
          
          // Expand/collapse indicator (if has sub-steps and collapsible)
          hasSubSteps && collapsible && effectiveSubStepsCollapsible ? React.createElement('div', {
            key: `indicator-${stepIndex}`,
            style: {
              fontSize: '16px',
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: stepFontColor // Match text color
            }
          }, '▼') : null
        ]),
        
        // Sub-steps container
        hasSubSteps ? React.createElement('div', {
          key: `substeps-container-${stepIndex}`,
          style: getSubStepsContainerStyle(isExpanded)
        }, step.subSteps.map((subStep, subStepIndex) => {
          const subStepState = getSubStepState(stepIndex, subStepIndex);
          
          return React.createElement('div', {
            key: `substep-${stepIndex}-${subStepIndex}`,
            style: getSubStepRowStyle(subStepState)
          }, [
            // Letter - either circle (legacy) or plain text (new style)
            showStepNumberCircle ?
            React.createElement('div', {
              key: `subcircle-${stepIndex}-${subStepIndex}`,
              style: {
                ...circleStyle,
                width: `calc(${processedCircleSize} * 0.85)`,
                height: `calc(${processedCircleSize} * 0.85)`,
                minWidth: `calc(${processedCircleSize} * 0.85)`,
                minHeight: `calc(${processedCircleSize} * 0.85)`,
                fontSize: `calc(${processedCircleFontSize} * 0.9)`
              }
              }, numberToLetter(subStepIndex)) :
              React.createElement('div', {
                key: `subletter-${stepIndex}-${subStepIndex}`,
                style: {
                  ...getStepNumberTextStyle(subStepState),
                  fontSize: `calc(${processedStepNumberFontSize} * 0.85)`
                }
              }, `${numberToLetter(subStepIndex)})`),
            
            // Sub-step text (support HTML if contains tags)
            (() => {
              const subStepText = subStep.text;
              const containsHTML = /<[^>]+>/.test(subStepText);
              
              return React.createElement('div', {
                key: `subtext-${stepIndex}-${subStepIndex}`,
                style: {
                  ...getStepTextStyle(subStepState),
                  fontSize: `calc(${processedStepFontSize} * 0.9)`
                },
                ...(containsHTML ? { dangerouslySetInnerHTML: { __html: subStepText } } : {})
              }, containsHTML ? null : subStepText);
            })()
          ]);
        })) : null
      ]);
    }))
  ]);
});

// Set display name for debugging
SolutionStepComponent.displayName = 'SolutionStepComponent';

// Export to window for global access
if (typeof window !== 'undefined') {
  window.SolutionStepComponent = {
    SolutionStepComponent: SolutionStepComponent
  };
  console.log('✅ SolutionStepComponent loaded and exported to window.SolutionStepComponent');
}

