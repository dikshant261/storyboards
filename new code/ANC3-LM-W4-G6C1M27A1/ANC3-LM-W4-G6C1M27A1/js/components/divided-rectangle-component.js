/**
 * Divided Rectangle Component - React 18 Optimized
 * 
 * This component renders a rectangle that can be divided into sections
 * based on a slider value. It listens to slider value changes and displays
 * vertical divider lines. On correct answer, sections animate to separate.
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Divided Rectangle Component
 */
const DividedRectangleComponent = React.memo((props) => {
  const elementId = React.useId();
  const [divisions, setDivisions] = React.useState(0);
  const [isIncorrect, setIsIncorrect] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [animationPhase, setAnimationPhase] = React.useState(0); // 0: normal, 1: separating, 2: separated, 3: grouped
  const sectionRefs = React.useRef({});
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 200, 300],
    zIndex = 55,
    backgroundColor = '#FF9900',
    borderColor = '#ffffff',
    borderWidth = '4gc',
    borderRadius = '10gc',
    sliderId,
    rectangleIndex = 1, // 1 for first rectangle, 2 for second
    position,
    processedStyles,
    elementZIndex,
    ...otherProps
  } = props;

  // Listen to slider value changes
  React.useEffect(() => {
    const handleSliderChange = (event) => {
      // Check both id and elementName in case they differ
      const eventId = event.detail.id || event.detail.elementName;
      if (eventId === sliderId || event.detail.id === sliderId) {
        setDivisions(event.detail.value);
        // Reset states when slider changes
        setIsIncorrect(false);
        setIsCorrect(false);
        setAnimationPhase(0);
      }
    };

    // Check window.sliderValues for initial value (with retry for timing)
    const checkInitialValue = () => {
      if (typeof window !== 'undefined' && window.sliderValues && sliderId) {
        const initialValue = window.sliderValues[sliderId] || 0;
        setDivisions(initialValue);
      }
    };

    // Check immediately
    checkInitialValue();

    // Also check after a short delay in case slider hasn't initialized yet
    const timeoutId = setTimeout(checkInitialValue, 100);

    if (typeof window !== 'undefined') {
      window.addEventListener('sliderValueChanged', handleSliderChange);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('sliderValueChanged', handleSliderChange);
      };
    }
  }, [sliderId]);

  // Listen to validation results
  React.useEffect(() => {
    const handleValidation = (event) => {
      // Check if this validation is for our slider
      if (event.detail.sliderId === sliderId) {
        const correct = event.detail.isCorrect;
        setIsIncorrect(!correct);
        setIsCorrect(correct);
        
        // If correct, trigger separation animation sequence
        if (correct) {
          // Phase 1: Start separating (sections get borders, gaps appear) - 1500ms duration
          setTimeout(() => setAnimationPhase(1), 300);
          // Phase 2: Fully separated (after 1500ms separation animation completes)
          setTimeout(() => setAnimationPhase(2), 1800);
          // Phase 3: Show grouping labels/borders (dispatch event for overlay)
          setTimeout(() => {
            setAnimationPhase(3);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('showGroupedSections', {
                detail: {
                  sliderId: sliderId,
                  divisions: event.detail.sliderValue
                }
              }));
            }
          }, 2300);
        }
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

  const processedBorderWidth = processGc(borderWidth, 'borderWidth');
  const processedBorderRadius = processGc(borderRadius, 'borderRadius');
  
  // Process font size for fraction text
  const processedFontSize = processGc('32gc', 'fontSize');

  // Determine border and divider color based on validation state
  const currentBorderColor = isIncorrect ? '#C94A40' : borderColor; // salmon-dark when incorrect

  // Calculate gap between sections based on animation phase (using gc units)
  const processedSectionGap = processGc('15gc', 'gap');
  const sectionGapValue = animationPhase >= 1 ? (processedSectionGap || '15px') : '0px';

  // Container style - changes based on animation phase
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: animationPhase >= 1 ? 'transparent' : backgroundColor,
    border: animationPhase >= 1 ? 'none' : `${processedBorderWidth || '4px'} solid ${currentBorderColor}`,
    borderRadius: processedBorderRadius || '10px',
    zIndex: elementZIndex || zIndex,
    overflow: 'visible',
    boxSizing: 'border-box',
    transition: 'all 1.5s ease', // 1500ms separation animation
    gap: sectionGapValue,
    // Keep rectangles visible - don't hide them
    opacity: 1,
    pointerEvents: animationPhase >= 3 ? 'none' : 'auto'
  };

  // Calculate section height - SAME height before and after animation
  // Use percentage of container height so sections maintain their size when separating
  // This ensures the animated sections have the same height as the slider-divided sections
  const sectionHeightPercent = divisions > 0 ? `${100 / divisions}%` : '100%';

  // Create divider elements (horizontal lines) - hidden when separating
  const dividers = [];
  if (animationPhase === 0) {
    for (let i = 1; i < divisions; i++) {
      dividers.push(
        React.createElement('div', {
          key: `divider-${i}`,
          className: 'divided-rectangle-divider',
          style: {
            position: 'absolute',
            top: `${(i / divisions) * 100}%`,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: currentBorderColor,
            zIndex: 1,
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
            transition: 'opacity 0.3s ease',
            opacity: animationPhase >= 1 ? 0 : 1
          }
        })
      );
    }
  }

  // Get current question to calculate fraction
  const getCurrentQuestion = () => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      return window.getCurrentQuestion();
    }
    return { dividend: 2, divisor: 3 }; // Default fallback
  };

  const question = getCurrentQuestion();
  const dividend = question.dividend || 2;
  const divisor = divisions > 0 ? divisions : 1;
  
  // Calculate fraction: 1/divisor (each section represents 1/divisor of the whole)
  // Use KaTeX to render the fraction
  const renderKaTeXFraction = (numerator, denominator) => {
    if (typeof window !== 'undefined' && window.katex) {
      try {
        const latex = `\\frac{${numerator}}{${denominator}}`;
        return window.katex.renderToString(latex, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        console.warn('KaTeX rendering error:', e);
        return `${numerator}/${denominator}`;
      }
    }
    // Fallback if KaTeX not loaded yet - use HTML fraction
    return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
      <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
      <span style="display: block; padding: 0 2px;">${denominator}</span>
    </span>`;
  };
  
  const fractionHTML = divisions > 0 ? renderKaTeXFraction(1, divisor) : '';
  
  // Text color: salmon-dark when incorrect, white otherwise
  const textColor = isIncorrect ? '#C94A40' : '#ffffff';

  // Update KaTeX element colors after render
  React.useEffect(() => {
    if (divisions > 0) {
      Object.keys(sectionRefs.current).forEach((key) => {
        const sectionEl = sectionRefs.current[key];
        if (sectionEl) {
          const katexEl = sectionEl.querySelector('.katex');
          if (katexEl) {
            katexEl.style.color = textColor;
            const allElements = katexEl.querySelectorAll('*');
            allElements.forEach((el) => {
              el.style.color = textColor;
            });
          }
        }
      });
    }
  }, [textColor, divisions]);

  // Process responsive border values for sections (outside loop for efficiency)
  const processedSectionBorder = processGc('2gc', 'borderWidth');
  const processedSectionBorderRadius = processGc('6gc', 'borderRadius');

  // Create sections - only if divisions > 0
  const sections = [];
  if (divisions > 0) {
    for (let i = 0; i < divisions; i++) {
      // Section style - SAME height before and after animation
      // Use flex: 1 to distribute height equally within container
      const sectionStyle = {
        flex: '1 1 auto', // Always use flex to maintain equal distribution
        width: '100%',
        minHeight: 0, // Allow flex to control height
        backgroundColor: backgroundColor,
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Add border and border-radius when separating
        border: animationPhase >= 1 ? `${processedSectionBorder || '2px'} solid #ffffff` : 'none',
        borderRadius: animationPhase >= 1 ? (processedSectionBorderRadius || '6px') : '0',
        // Add shadow when separating
        boxShadow: animationPhase >= 1 ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
        // Smooth transition - 1500ms for separation
        transition: 'all 1.5s ease',
        // Scale animation
        transform: animationPhase >= 2 ? 'scale(1)' : (animationPhase >= 1 ? 'scale(0.98)' : 'scale(1)')
      };

      sections.push(
        React.createElement('div', {
          key: `section-${i}`,
          ref: (el) => {
            if (el) sectionRefs.current[`section-${i}`] = el;
          },
          className: `divided-rectangle-section${animationPhase >= 1 ? ' section-separated' : ''}`,
          style: sectionStyle
        }, React.createElement('span', {
          className: 'katex-fraction',
          style: {
            color: textColor,
            fontSize: processedFontSize || '32px',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            transition: 'color 0.3s ease',
            zIndex: 2
          },
          'data-text-color': textColor,
          dangerouslySetInnerHTML: { __html: fractionHTML }
        }))
      );
    }
  } else {
    // No divisions - show as single rectangle
    sections.push(
      React.createElement('div', {
        key: 'section-0',
        className: 'divided-rectangle-section',
        style: {
          width: '100%',
          height: '100%',
          backgroundColor: backgroundColor,
          position: 'relative',
          boxSizing: 'border-box'
        }
      })
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'divided-rectangle-container',
    style: containerStyle,
    'data-element-type': 'divided-rectangle',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-divisions': divisions
  }, [
    ...sections,
    ...dividers
  ]);
});

/**
 * Grouped Sections Overlay Component
 * Shows group labels AND dashed yellow borders around each row of sections.
 * The original rectangles remain visible with their sections animated apart.
 * This overlay adds "Group X" labels on the left and dashed borders spanning across both rectangles.
 */
/**
 * Grouped Sections Overlay Component (Animated version for page 4)
 * Shows group labels with dashed borders spanning across label and rectangles
 * Labels animate in when showGroupedSections event is triggered
 */
const GroupedSectionsOverlay = React.memo((props) => {
  const elementId = React.useId();
  const [isVisible, setIsVisible] = React.useState(false);
  const [divisions, setDivisions] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState(0); // 0: hidden, 1: fading in, 2: fully visible
  
  const {
    sliderId,
    position,
    processedStyles,
    elementZIndex,
    zIndex = 100,
    sectionGapGc = '15gc',
    labelWidthGc = '100gc', // Increased from 70gc to 100gc
    labelOffsetGc = '58gc',
    ...otherProps
  } = props;

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  // Listen for showGroupedSections event
  React.useEffect(() => {
    const handleShowGrouped = (event) => {
      if (event.detail.sliderId === sliderId) {
        setDivisions(event.detail.divisions);
        setIsVisible(true);
        setTimeout(() => setAnimationPhase(1), 100);
        setTimeout(() => setAnimationPhase(2), 600);
      }
    };

    const handleSliderChange = (event) => {
      const eventId = event.detail.id || event.detail.elementName;
      if (eventId === sliderId || event.detail.id === sliderId) {
        setIsVisible(false);
        setAnimationPhase(0);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('showGroupedSections', handleShowGrouped);
      window.addEventListener('sliderValueChanged', handleSliderChange);
      return () => {
        window.removeEventListener('showGroupedSections', handleShowGrouped);
        window.removeEventListener('sliderValueChanged', handleSliderChange);
      };
    }
  }, [sliderId]);

  // State to store measured values in GC units (responsive) - MUST be before early return
  const [measuredSectionOffsetGc, setMeasuredSectionOffsetGc] = React.useState(null);
  const [sectionHeightGc, setSectionHeightGc] = React.useState(null);
  const [measuredGapGc, setMeasuredGapGc] = React.useState(null);
  
  // Helper to convert px to gc (based on viewport height, 900gc = 100vh)
  const pxToGc = (px) => {
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight || 900;
      return (px / viewportHeight) * 900;
    }
    return px; // Fallback
  };
  
  // Measure actual section position, height, and gap from DOM and convert to gc
  // MUST be before early return to maintain hook order
  React.useEffect(() => {
    if (typeof window !== 'undefined' && divisions > 0 && isVisible && window.GridCellFontUtils) {
      const measureSections = () => {
        // Find the main rectangle container for page 4
        const mainRectContainer = document.querySelector('[data-element-type="dynamic-divided-rectangles"]') ||
                             document.querySelector('[id*="dynamic-rectangles"]');
        
        if (!mainRectContainer) {
          setTimeout(measureSections, 100);
          return;
        }
        
        // Find the first rectangle's section container
        const firstRectWrapper = mainRectContainer.querySelector('div[style*="flex-direction: column"]');
        const firstRectContainer = firstRectWrapper ? firstRectWrapper.querySelector('.divided-rectangle-container') : null;
        const sections = firstRectContainer ? firstRectContainer.querySelectorAll('.divided-rectangle-section') : null;
        const firstSection = sections && sections.length > 0 ? sections[0] : null;
        const secondSection = sections && sections.length > 1 ? sections[1] : null;
        
        if (firstSection && mainRectContainer) {
          // Get bounding rects
          const mainContainerRect = mainRectContainer.getBoundingClientRect();
          const firstSectionRect = firstSection.getBoundingClientRect();
          
          // The offset from the main container top to the first section
          const sectionOffsetFromMainContainerPx = firstSectionRect.top - mainContainerRect.top;
          const sectionHeightPx = firstSectionRect.height;
          
          // Measure gap between first and second section
          let gapBetweenSectionsPx = 9; // Default
          if (secondSection) {
            const secondSectionRect = secondSection.getBoundingClientRect();
            gapBetweenSectionsPx = secondSectionRect.top - firstSectionRect.bottom;
          }
          
          if (sectionOffsetFromMainContainerPx >= 0 && sectionHeightPx > 10) {
            // Convert all measurements to gc units for responsiveness
            const offsetGc = pxToGc(sectionOffsetFromMainContainerPx);
            const heightGc = pxToGc(sectionHeightPx);
            const gapGc = pxToGc(gapBetweenSectionsPx);
            
            setMeasuredSectionOffsetGc(offsetGc);
            setSectionHeightGc(heightGc);
            setMeasuredGapGc(gapGc);
            
            console.log('📏 [GroupedSectionsOverlay] Measured (gc units):', {
              sectionOffsetFromMainContainer: `${offsetGc.toFixed(2)}gc (${sectionOffsetFromMainContainerPx.toFixed(2)}px)`,
              sectionHeight: `${heightGc.toFixed(2)}gc (${sectionHeightPx.toFixed(2)}px)`,
              gapBetweenSections: `${gapGc.toFixed(2)}gc (${gapBetweenSectionsPx.toFixed(2)}px)`
            });
          } else {
            setTimeout(measureSections, 100);
          }
        } else {
          setTimeout(measureSections, 100);
        }
      };
      
      // Measure after animation phase 1 (when sections are separated)
      if (animationPhase >= 1) {
        setTimeout(measureSections, 200);
      }
    }
  }, [divisions, isVisible, animationPhase]);

  if (!isVisible || divisions <= 0) {
    return null;
  }

  const processedLabelFontSize = processGc('18gc', 'fontSize');
  const processedSectionGap = processGc(sectionGapGc, 'gap');
  const processedLabelWidth = processGc(labelWidthGc, 'width');
  const processedLabelOffset = processGc(labelOffsetGc, 'paddingTop');
  const processedBorderWidth = processGc('2gc', 'borderWidth');
  const processedBorderRadius = processGc('8gc', 'borderRadius');

  // Calculate row height and gap based on measured values (all in gc units for responsiveness)
  // Use EXACT measurements from the sections - no scaling
  const rowHeightGc = sectionHeightGc; // Exact match, no scaling
  
  // Use exact measured gap - no adjustment
  const defaultGapGc = 15; // Default 15gc gap
  const sectionGapGcValue = measuredGapGc || defaultGapGc;
  
  // Process gc values to responsive units
  const processedRowGap = processGc(`${sectionGapGcValue}gc`, 'gap');
  const processedRowHeight = rowHeightGc ? processGc(`${rowHeightGc}gc`, 'height') : null;
  
  // Use measured offset for paddingTop (in gc), fallback to processedLabelOffset
  const actualPaddingTop = measuredSectionOffsetGc 
    ? processGc(`${measuredSectionOffsetGc}gc`, 'paddingTop') 
    : processedLabelOffset;

  // Container style - full width to contain dashed borders
  // Use measured values for gap and paddingTop to match sections exactly
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: processedRowGap || processedSectionGap || '15px',
    zIndex: elementZIndex || zIndex,
    transition: 'opacity 0.5s ease',
    opacity: animationPhase >= 1 ? 1 : 0,
    paddingTop: actualPaddingTop || '58px',
    boxSizing: 'border-box',
    pointerEvents: 'none'
  };

  // Get internationalized "Group" text
  const getGroupText = (index) => {
    if (typeof window !== 'undefined' && window.i18n && window.i18n.t) {
      const groupText = window.i18n.t('common.labels.group');
      return groupText !== 'common.labels.group' ? `${groupText} ${index + 1}` : `Group ${index + 1}`;
    }
    return `Group ${index + 1}`;
  };
  
  const groupRows = [];
  for (let i = 0; i < divisions; i++) {
    const rowStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      ...(processedRowHeight ? { height: processedRowHeight, flex: '0 0 auto' } : { flex: '1 1 auto' }), // Use explicit height in gc units if measured, otherwise flex
      minHeight: 0,
      width: '100%',
      boxSizing: 'border-box',
      border: `${processedBorderWidth || '2px'} dashed #FFD700`,
      borderRadius: processedBorderRadius || '8px',
      paddingLeft: '8px',
      opacity: animationPhase >= 2 ? 1 : (animationPhase >= 1 ? 0.5 : 0),
      transform: animationPhase >= 1 ? 'scale(1)' : 'scale(0.98)',
      transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`
    };

    const labelStyle = {
      color: '#FFD700',
      fontSize: processedLabelFontSize || '18px',
      fontWeight: 'bold',
      textAlign: 'left',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
      whiteSpace: 'nowrap',
      width: processedLabelWidth || '100px', // Updated to match 100gc label width
      flexShrink: 0
    };

    groupRows.push(
      React.createElement('div', {
        key: `group-row-${i}`,
        className: 'group-row-with-border',
        style: rowStyle
      }, 
        React.createElement('span', {
          key: 'label',
          className: 'group-label',
          style: labelStyle
        }, getGroupText(i))
      )
    );
  }

  console.log(`📏 [GroupLabels] [Page 4] Divisions: ${divisions}, Visible: ${isVisible}`);

  return React.createElement('div', {
    id: elementId,
    className: 'group-labels-container',
    style: containerStyle,
    'data-element-type': 'group-labels',
    'data-divisions': divisions
  }, groupRows);
});

/**
 * Static Separated Rectangle Component
 * Shows rectangles in their final separated state (for page 5)
 * No animation - immediately shows sections separated with borders
 */
const StaticSeparatedRectangleComponent = React.memo((props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 200, 300],
    zIndex = 55,
    backgroundColor = '#FF9900',
    position,
    processedStyles,
    elementZIndex,
    initialAnimationPhase = 3,
    ...otherProps
  } = props;

  // Get current question for divisions
  const getCurrentQuestion = () => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      return window.getCurrentQuestion();
    }
    return { dividend: 2, divisor: 3 };
  };

  const question = getCurrentQuestion();
  const divisions = question.divisor || 3;
  const divisor = divisions;

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedSectionGap = processGc('15gc', 'gap');
  const processedSectionBorder = processGc('2gc', 'borderWidth');
  const processedSectionBorderRadius = processGc('6gc', 'borderRadius');
  const processedFontSize = processGc('32gc', 'fontSize');

  // Container style - transparent with gaps (already separated)
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    border: 'none',
    zIndex: elementZIndex || zIndex,
    overflow: 'visible',
    boxSizing: 'border-box',
    gap: processedSectionGap || '15px',
    opacity: 1,
    pointerEvents: 'none'
  };

  // Render KaTeX fraction
  const renderKaTeXFraction = (numerator, denominator) => {
    if (typeof window !== 'undefined' && window.katex) {
      try {
        const latex = `\\frac{${numerator}}{${denominator}}`;
        return window.katex.renderToString(latex, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        return `${numerator}/${denominator}`;
      }
    }
    return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
      <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
      <span style="display: block; padding: 0 2px;">${denominator}</span>
    </span>`;
  };

  const fractionHTML = renderKaTeXFraction(1, divisor);

  // Create sections - already separated
  const sections = [];
  for (let i = 0; i < divisions; i++) {
    const sectionStyle = {
      flex: '1 1 auto',
      width: '100%',
      minHeight: 0,
      backgroundColor: backgroundColor,
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${processedSectionBorder || '2px'} solid #ffffff`,
      borderRadius: processedSectionBorderRadius || '6px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    };

    sections.push(
      React.createElement('div', {
        key: `section-${i}`,
        className: 'divided-rectangle-section section-separated',
        style: sectionStyle
      }, React.createElement('span', {
        className: 'katex-fraction',
        style: {
          color: '#ffffff',
          fontSize: processedFontSize || '32px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          zIndex: 2
        },
        dangerouslySetInnerHTML: { __html: fractionHTML }
      }))
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'divided-rectangle-container static-separated',
    style: containerStyle,
    'data-element-type': 'divided-rectangle-static',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-divisions': divisions
  }, sections);
});

/**
 * Divided Rectangle Static Component (for page 6)
 * Renders a rectangle divided into N sections (no gaps, sections together)
 * Each section shows 1/N fraction
 */
const DividedRectangleStaticComponent = React.memo((props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 200, 300],
    zIndex = 55,
    backgroundColor = '#FF9900',
    borderColor = '#ffffff',
    borderWidth = '3gc',
    position,
    processedStyles,
    elementZIndex,
    ...otherProps
  } = props;

  // Get current question for divisions
  const getCurrentQuestion = () => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      return window.getCurrentQuestion();
    }
    return { dividend: 2, divisor: 3 };
  };

  const question = getCurrentQuestion();
  const divisor = question.divisor || 3;
  const divisions = divisor;

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedBorderWidth = processGc(borderWidth, 'borderWidth');
  const processedBorderRadius = processGc('8gc', 'borderRadius');
  const processedFontSize = processGc('28gc', 'fontSize');

  // Container style - white border around whole rectangle
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    border: `${processedBorderWidth || '3px'} solid ${borderColor || '#ffffff'}`,
    borderRadius: processedBorderRadius || '8px',
    zIndex: (elementZIndex || zIndex) - 1,
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: 0
  };

  // Render KaTeX fraction
  const renderKaTeXFraction = (numerator, denominator) => {
    if (typeof window !== 'undefined' && window.katex) {
      try {
        const latex = `\\frac{${numerator}}{${denominator}}`;
        return window.katex.renderToString(latex, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        return `${numerator}/${denominator}`;
      }
    }
    return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
      <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
      <span style="display: block; padding: 0 2px;">${denominator}</span>
    </span>`;
  };

  const fractionHTML = renderKaTeXFraction(1, divisor);

  // Create sections - together (no gaps)
  const sections = [];
  for (let i = 0; i < divisions; i++) {
    const sectionStyle = {
      flex: '1 1 auto',
      width: '100%',
      minHeight: 0,
      backgroundColor: backgroundColor,
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.5)' : 'none',
      borderRadius: i === 0 ? `${processedBorderRadius || '8px'} ${processedBorderRadius || '8px'} 0 0` :
                   i === divisions - 1 ? `0 0 ${processedBorderRadius || '8px'} ${processedBorderRadius || '8px'}` :
                   '0',
      color: '#333333',
      fontSize: processedFontSize || '28px',
      fontWeight: 'bold',
      padding: '10px'
    };

    sections.push(
      React.createElement('div', {
        key: `section-${i}`,
        className: 'divided-rectangle-section static',
        style: sectionStyle,
        dangerouslySetInnerHTML: { __html: fractionHTML }
      })
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'divided-rectangle-container static-together',
    style: containerStyle,
    'data-element-type': 'divided-rectangle-static-together',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-divisions': divisions
  }, sections);
});

/**
 * Static Grouped Sections Overlay Component
 * Shows group labels with dashed borders spanning across label and rectangles
 * Labels are vertically centered with each section row
 */
const StaticGroupedSectionsOverlay = React.memo((props) => {
  const elementId = React.useId();
  
  const {
    divisions: propDivisions,
    position,
    processedStyles,
    elementZIndex,
    zIndex = 53,
    sectionGapGc = '15gc',
    labelWidthGc = '100gc', // Width for label column (increased from 70gc to 100gc)
    labelOffsetGc = '85gc', // Offset for the "1", "2" labels above rectangles (matches actual rectangle section offset ≈ 50.59px)
    ...otherProps
  } = props;

  // Get divisions from props or current question
  const getDivisions = () => {
    if (propDivisions) return propDivisions;
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.divisor || 3;
    }
    return 3;
  };

  const divisions = getDivisions();

  // State to store measured values in GC units (responsive)
  const [measuredSectionOffsetGc, setMeasuredSectionOffsetGc] = React.useState(null);
  const [sectionHeightGc, setSectionHeightGc] = React.useState(null);
  const [measuredGapGc, setMeasuredGapGc] = React.useState(null);
  
  // Helper to convert px to gc (based on viewport height, 900gc = 100vh)
  const pxToGc = (px) => {
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight || 900;
      return (px / viewportHeight) * 900;
    }
    return px; // Fallback
  };
  
  // Measure actual section position, height, and gap from DOM and convert to gc
  React.useEffect(() => {
    if (typeof window !== 'undefined' && divisions > 0 && elementId) {
      const measureSections = () => {
        // Find the main rectangle container (dynamic-static-separated-rectangles-container)
        const mainRectContainer = document.querySelector('[data-element-type="dynamic-static-separated-rectangles"]') ||
                             document.getElementById('page5-dynamic-rectangles');
        
        if (!mainRectContainer) {
          setTimeout(measureSections, 100);
          return;
        }
        
        // Find the first rectangle's section container (the .divided-rectangle-container)
        const firstRectWrapper = mainRectContainer.querySelector('div[style*="flex-direction: column"]');
        const firstRectContainer = firstRectWrapper ? firstRectWrapper.querySelector('.divided-rectangle-container') : null;
        const sections = firstRectContainer ? firstRectContainer.querySelectorAll('.divided-rectangle-section') : null;
        const firstSection = sections && sections.length > 0 ? sections[0] : null;
        const secondSection = sections && sections.length > 1 ? sections[1] : null;
        
        if (firstSection && firstRectContainer && mainRectContainer) {
          // Get bounding rects
          const mainContainerRect = mainRectContainer.getBoundingClientRect();
          const firstSectionRect = firstSection.getBoundingClientRect();
          
          // The offset should be from the TOP of the MAIN container (same top as group-labels-container)
          // to the TOP of the first section
          // Both containers have the same top (27.67%), so this offset is the paddingTop we need
          const sectionOffsetFromMainContainerPx = firstSectionRect.top - mainContainerRect.top;
          const sectionHeightPx = firstSectionRect.height;
          
          // Measure gap between first and second section
          let gapBetweenSectionsPx = 9; // Default
          if (secondSection) {
            const secondSectionRect = secondSection.getBoundingClientRect();
            gapBetweenSectionsPx = secondSectionRect.top - firstSectionRect.bottom;
          }
          
          if (sectionOffsetFromMainContainerPx >= 0 && sectionHeightPx > 10) {
            // Convert all measurements to gc units for responsiveness
            const offsetGc = pxToGc(sectionOffsetFromMainContainerPx);
            const heightGc = pxToGc(sectionHeightPx);
            const gapGc = pxToGc(gapBetweenSectionsPx);
            
            setMeasuredSectionOffsetGc(offsetGc);
            setSectionHeightGc(heightGc);
            setMeasuredGapGc(gapGc);
            
            console.log('📏 [StaticGroupedSectionsOverlay] Measured (gc units):', {
              sectionOffsetFromMainContainer: `${offsetGc.toFixed(2)}gc (${sectionOffsetFromMainContainerPx.toFixed(2)}px)`,
              sectionHeight: `${heightGc.toFixed(2)}gc (${sectionHeightPx.toFixed(2)}px)`,
              gapBetweenSections: `${gapGc.toFixed(2)}gc (${gapBetweenSectionsPx.toFixed(2)}px)`
            });
          } else {
            setTimeout(measureSections, 100);
          }
        } else {
          setTimeout(measureSections, 100);
        }
      };
      
      setTimeout(measureSections, 300);
    }
  }, [divisions, elementId]);

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedLabelFontSize = processGc('18gc', 'fontSize');
  const processedSectionGap = processGc(sectionGapGc, 'gap');
  const processedLabelWidth = processGc(labelWidthGc, 'width');
  // Calculate offset to match rectangle label height (48gc) + gap (10px)
  // Rectangles use 48gc font + 10px gap, so we need to match that exactly
  const rectangleLabelFontSize = processGc('48gc', 'fontSize') || '28px';
  // Convert to pixels if needed
  let labelHeightPx = 28; // default
  if (typeof rectangleLabelFontSize === 'string') {
    if (rectangleLabelFontSize.includes('px')) {
      labelHeightPx = parseFloat(rectangleLabelFontSize);
    } else if (rectangleLabelFontSize.includes('gc')) {
      // Approximate: 1gc ≈ 0.6px (varies by screen size, but this is a reasonable estimate)
      labelHeightPx = parseFloat(rectangleLabelFontSize) * 0.6;
    }
  }
  const gapPx = 10; // Fixed 10px gap between label and rectangle
  const calculatedOffsetPx = labelHeightPx + gapPx;
  // Use provided labelOffsetGc if available, otherwise use calculated offset
  const processedLabelOffset = labelOffsetGc 
    ? processGc(labelOffsetGc, 'paddingTop') 
    : `${calculatedOffsetPx}px`;
  const processedBorderWidth = processGc('2gc', 'borderWidth');
  const processedBorderRadius = processGc('8gc', 'borderRadius');

  // Calculate row height and gap based on measured values (all in gc units for responsiveness)
  // Use EXACT measurements from the sections - no scaling
  // The grouped rows should match the section height and gap exactly
  const rowHeightGc = sectionHeightGc; // Exact match, no scaling
  
  // Use exact measured gap - no adjustment
  const defaultGapGc = 15; // Default 15gc gap
  const sectionGapGcValue = measuredGapGc || defaultGapGc;
  
  // Process gc values to responsive units
  const processedRowGap = processGc(`${sectionGapGcValue}gc`, 'gap');
  const processedRowHeight = rowHeightGc ? processGc(`${rowHeightGc}gc`, 'height') : null;
  
  // Use measured offset for paddingTop (in gc), fallback to processedLabelOffset
  const actualPaddingTop = measuredSectionOffsetGc 
    ? processGc(`${measuredSectionOffsetGc}gc`, 'paddingTop') 
    : processedLabelOffset;

  // Debug logging for alignment
  console.log('🔍 [StaticGroupedSectionsOverlay] Alignment Debug:', {
    divisions,
    labelOffsetGc,
    measuredSectionOffsetGc: measuredSectionOffsetGc ? `${measuredSectionOffsetGc.toFixed(2)}gc` : null,
    actualPaddingTop,
    sectionHeightGc: sectionHeightGc ? `${sectionHeightGc.toFixed(2)}gc` : null,
    rowHeightGc: rowHeightGc ? `${rowHeightGc.toFixed(2)}gc (exact match)` : null,
    sectionGapGc: `${sectionGapGcValue.toFixed(2)}gc (exact match)`,
    processedRowHeight,
    processedRowGap,
    containerPosition: position ? {
      left: position.left,
      top: position.top,
      width: position.width || (position.right - position.left),
      height: position.height || (position.bottom - position.top)
    } : 'no position'
  });

  // Container style - full width to contain dashed borders spanning labels + rectangles
  // Use measured section offset for paddingTop to ensure perfect alignment
  // Use adjusted gap (5% smaller) to compensate for 5% bigger row height
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: processedRowGap || processedSectionGap || '15px',
    zIndex: elementZIndex || zIndex,
    opacity: 1,
    pointerEvents: 'none',
    paddingTop: actualPaddingTop,
    boxSizing: 'border-box'
  };

  // Get internationalized "Group" text
  const getGroupText = (index) => {
    if (typeof window !== 'undefined' && window.i18n && window.i18n.t) {
      const groupText = window.i18n.t('common.labels.group');
      return groupText !== 'common.labels.group' ? `${groupText} ${index + 1}` : `Group ${index + 1}`;
    }
    return `Group ${index + 1}`;
  };
  
  const groupRows = [];
  for (let i = 0; i < divisions; i++) {
    // Row with dashed border spanning full width
    // Use measured section height * 1.1 to make rows 1.1x the height of sections
    const rowStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center', // Vertically center contents
      justifyContent: 'flex-start',
      ...(processedRowHeight ? { height: processedRowHeight, flex: '0 0 auto' } : { flex: '1 1 auto' }), // Use explicit height if measured, otherwise flex
      width: '100%',
      boxSizing: 'border-box',
      border: `${processedBorderWidth || '2px'} dashed #FFD700`,
      borderRadius: processedBorderRadius || '8px',
      paddingLeft: '8px'
    };

    const labelStyle = {
      color: '#FFD700',
      fontSize: processedLabelFontSize || '18px',
      fontWeight: 'bold',
      textAlign: 'left',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
      whiteSpace: 'nowrap',
      width: processedLabelWidth || '100px', // Updated to match 100gc label width
      flexShrink: 0
    };

    groupRows.push(
      React.createElement('div', {
        key: `group-row-${i}`,
        className: 'group-row-with-border',
        style: rowStyle
      }, 
        React.createElement('span', {
          key: 'label',
          className: 'group-label',
          style: labelStyle
        }, getGroupText(i))
      )
    );
  }

  console.log(`📏 [GroupLabels] [Page 5] Divisions: ${divisions}, Label offset: ${labelOffsetGc}`);

  // Log actual DOM measurements after render
  React.useEffect(() => {
    if (typeof window !== 'undefined' && elementId) {
      setTimeout(() => {
        const container = document.getElementById(elementId);
        if (container) {
          const rect = container.getBoundingClientRect();
          const firstRow = container.querySelector('.group-row-with-border');
          const firstLabel = container.querySelector('.group-label');
          const computedStyle = window.getComputedStyle(container);
          
          // Find the rectangle container to compare - try multiple selectors
          const rectContainer = document.querySelector('[data-element-type="dynamic-static-separated-rectangles"]') ||
                               document.querySelector('[id*="dynamic-rectangles"]') ||
                               document.getElementById('page5-dynamic-rectangles');
          
          const firstRectSection = rectContainer ? (
            rectContainer.querySelector('[data-element-type="divided-rectangle-static-together"]') ||
            rectContainer.querySelector('.divided-rectangle-container') ||
            rectContainer.querySelector('[class*="divided-rectangle"]') ||
            Array.from(rectContainer.querySelectorAll('*')).find(el => 
              el.getAttribute('data-element-type')?.includes('divided-rectangle')
            )
          ) : null;
          
          const rowRect = firstRow ? firstRow.getBoundingClientRect() : null;
          const labelRect = firstLabel ? firstLabel.getBoundingClientRect() : null;
          const sectionRect = firstRectSection ? firstRectSection.getBoundingClientRect() : null;
          
          // Calculate key alignment values
          const paddingTopComputed = parseFloat(computedStyle.paddingTop) || 0;
          const rowTop = rowRect ? rowRect.top : 0;
          const rowCenter = rowRect ? (rowRect.top + rowRect.bottom) / 2 : 0;
          const sectionTop = sectionRect ? sectionRect.top : 0;
          const sectionCenter = sectionRect ? (sectionRect.top + sectionRect.bottom) / 2 : 0;
          const topDifference = rowRect && sectionRect ? rowRect.top - sectionRect.top : 0;
          const centerDifference = rowRect && sectionRect ? rowCenter - sectionCenter : 0;
          
          // Summary log with key values (always visible)
          console.log('🎯 [GroupedSections] Alignment Summary:', {
            paddingTop: computedStyle.paddingTop,
            paddingTopComputed: paddingTopComputed.toFixed(2) + 'px',
            rowTop: rowRect ? rowTop.toFixed(2) + 'px' : 'not found',
            sectionTop: sectionRect ? sectionTop.toFixed(2) + 'px' : 'not found',
            topDifference: rowRect && sectionRect ? topDifference.toFixed(2) + 'px' : 'cannot compare',
            centerDifference: rowRect && sectionRect ? centerDifference.toFixed(2) + 'px' : 'cannot compare',
            expectedPaddingTop: '~38px (64gc processed)'
          });
          
          console.log('📊 [StaticGroupedSectionsOverlay] Full DOM Measurements:', {
            containerTop: rect.top,
            containerLeft: rect.left,
            containerHeight: rect.height,
            containerWidth: rect.width,
            paddingTop: computedStyle.paddingTop,
            paddingTopComputed: parseFloat(computedStyle.paddingTop) || 0,
            rowFound: !!firstRow,
            rowTop: rowRect ? rowRect.top : 'not found',
            rowHeight: rowRect ? rowRect.height : 'not found',
            rowBottom: rowRect ? rowRect.bottom : 'not found',
            labelFound: !!firstLabel,
            labelTop: labelRect ? labelRect.top : 'not found',
            labelHeight: labelRect ? labelRect.height : 'not found',
            labelCenter: labelRect ? (labelRect.top + labelRect.bottom) / 2 : 'not found',
            comparison: {
              rectContainerFound: !!rectContainer,
              rectSectionFound: !!firstRectSection,
              rectSectionTop: sectionRect ? sectionRect.top : 'not found',
              rectSectionHeight: sectionRect ? sectionRect.height : 'not found',
              rectSectionBottom: sectionRect ? sectionRect.bottom : 'not found',
              rowTop: rowRect ? rowRect.top : 'not found',
              rowCenter: rowRect ? (rowRect.top + rowRect.bottom) / 2 : 'not found',
              difference: rowRect && sectionRect 
                ? rowRect.top - sectionRect.top 
                : 'cannot compare',
              verticalCenterDifference: rowRect && sectionRect
                ? (rowRect.top + rowRect.bottom) / 2 - (sectionRect.top + sectionRect.bottom) / 2
                : 'cannot compare'
            }
          });
        }
      }, 100);
    }
  }, [elementId, divisions]);

  return React.createElement('div', {
    id: elementId,
    className: 'group-labels-container',
    style: containerStyle,
    'data-element-type': 'group-labels',
    'data-divisions': divisions
  }, groupRows);
});


/**
 * Calculate optimal rectangle width based on available space and number of rectangles
 * @param {number} rectangleCount - Number of rectangles to display
 * @param {number} totalWidth - Total available width (1075 - 325 = 750)
 * @param {number} gap - Gap between rectangles in gc units
 * @param {number} labelSpace - Space reserved for "Group X" labels in gc units
 * @param {string} context - Optional context string for debugging (e.g., "Page 3", "Page 4")
 * @returns {number} - Calculated rectangle width in gc units
 * 
 * Label space calculation:
 * - English: "Group 3" = ~7 chars × 12gc/char ≈ 84gc + padding = ~100gc
 * - Indonesian: "Kelompok 3" = ~11 chars × 12gc/char ≈ 132gc + padding = ~150gc
 * For safety, we use 150gc to accommodate the longer Indonesian text
 */
const calculateRectangleWidth = (rectangleCount, totalWidth = 750, gap = 50, labelSpace = 150, context = '') => {
  // Available width after accounting for label space
  const availableWidth = totalWidth - labelSpace;
  
  // Account for container margins/padding and buffer to prevent overflow
  // Reserve buffer: 3% of available width or minimum 15gc, whichever is larger
  // This accounts for container padding, borders, rounding errors, and flexbox spacing
  const bufferPercent = 0.03; // 3% buffer
  const minBuffer = 15;
  const containerBuffer = Math.max(availableWidth * bufferPercent, minBuffer);
  const usableWidth = availableWidth - containerBuffer;
  
  // Calculate width: (usableWidth - gaps) / rectangleCount
  const totalGaps = (rectangleCount - 1) * gap;
  const rectWidth = (usableWidth - totalGaps) / rectangleCount;
  const finalWidth = Math.floor(rectWidth);
  
  // Debug logging
  console.log(`📐 [RectangleWidth] ${context ? `[${context}] ` : ''}Calculation:`, {
    rectangleCount,
    totalWidth: `${totalWidth}gc`,
    gap: `${gap}gc`,
    labelSpace: `${labelSpace}gc`,
    availableWidth: `${availableWidth}gc`,
    containerBuffer: `${containerBuffer.toFixed(1)}gc`,
    usableWidth: `${usableWidth.toFixed(1)}gc`,
    totalGaps: `${totalGaps}gc`,
    calculatedWidth: `${rectWidth.toFixed(2)}gc`,
    finalWidth: `${finalWidth}gc`,
    formula: `(${usableWidth.toFixed(1)} - ${totalGaps}) / ${rectangleCount} = ${finalWidth}`
  });
  
  return finalWidth;
};

/**
 * Dynamic Static Separated Rectangles Component (for page 5)
 * Renders N StaticSeparatedRectangleComponents based on dividend, with labels above
 * Shows rectangles already in separated state
 */
// Not using React.memo to allow re-renders when question changes
const DynamicStaticSeparatedRectanglesComponent = (props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 800, 400],
    zIndex = 55,
    position,
    processedStyles,
    elementZIndex,
    count: propCount,
    colors = ['#FF9900', '#1ABC9C'],
    showLabels = true,
    rectangleWidth: propRectWidth,
    rectangleHeight = 250,
    gap = 50,
    initialAnimationPhase = 3,
    ...otherProps
  } = props;

  // Track question index to force re-render when question changes
  const [questionIndex, setQuestionIndex] = React.useState(() => {
    return typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
      ? window.currentQuestionIndex 
      : 0;
  });

  // Also track the actual dividend to detect changes even if index doesn't change
  const [currentDividend, setCurrentDividend] = React.useState(() => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  });

  // Listen for question changes and page changes
  React.useEffect(() => {
    const handleQuestionChange = () => {
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    const handlePageChange = () => {
      // Re-check question index and dividend on page change
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('questionChanged', handleQuestionChange);
      window.addEventListener('pageChanged', handlePageChange);
      
      return () => {
        window.removeEventListener('questionChanged', handleQuestionChange);
        window.removeEventListener('pageChanged', handlePageChange);
      };
    }
  }, []);

  // Get count from props or current question - always read fresh
  const getCount = () => {
    if (propCount !== undefined) return propCount;
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  };

  // Always get fresh count - recalculate when questionIndex or dividend changes
  const count = React.useMemo(() => getCount(), [questionIndex, currentDividend, propCount]);

  // Log actual DOM measurements after render
  React.useEffect(() => {
    if (typeof window !== 'undefined' && elementId) {
      setTimeout(() => {
        const container = document.getElementById(elementId);
        if (container) {
          const rect = container.getBoundingClientRect();
          // Try multiple selectors to find the label
          const firstLabel = container.querySelector('span') || 
                            container.querySelector('[style*="fontSize"]') ||
                            Array.from(container.querySelectorAll('*')).find(el => 
                              el.tagName === 'SPAN' && window.getComputedStyle(el).fontSize
                            );
          // Try multiple selectors to find the rectangle
          const firstRect = container.querySelector('[data-element-type="divided-rectangle-static-together"]') ||
                           container.querySelector('[data-element-type="divided-rectangle"]') ||
                           container.querySelector('.divided-rectangle-container');
          
          const labelRect = firstLabel ? firstLabel.getBoundingClientRect() : null;
          const rectRect = firstRect ? firstRect.getBoundingClientRect() : null;
          
          // Calculate key alignment values
          const labelHeight = labelRect ? labelRect.height : 0;
          const labelTop = labelRect ? labelRect.top : 0;
          const labelBottom = labelRect ? labelRect.bottom : 0;
          const rectTop = rectRect ? rectRect.top : 0;
          const rectBottom = rectRect ? rectRect.bottom : 0;
          const gapBetweenLabelAndRect = labelRect && rectRect ? rectRect.top - labelRect.bottom : 0;
          const totalOffsetFromContainerTop = labelRect ? labelRect.top - rect.top : 0;
          const rectOffsetFromContainerTop = rectRect ? rectRect.top - rect.top : 0;
          
          // Summary log with key values (always visible)
          console.log('🎯 [Rectangles] Alignment Summary:', {
            labelHeight: labelHeight.toFixed(2) + 'px',
            gapBetweenLabelAndRect: gapBetweenLabelAndRect.toFixed(2) + 'px',
            totalOffsetFromContainerTop: totalOffsetFromContainerTop.toFixed(2) + 'px',
            rectOffsetFromContainerTop: rectOffsetFromContainerTop.toFixed(2) + 'px',
            expectedOffset: '~38-40px (48gc font + 10px gap)'
          });
          
          console.log('📊 [DynamicStaticSeparatedRectanglesComponent] Full DOM Measurements:', {
            containerTop: rect.top,
            containerLeft: rect.left,
            containerHeight: rect.height,
            containerWidth: rect.width,
            labelFound: !!firstLabel,
            labelHeight: labelRect ? labelRect.height : 'not found',
            labelTop: labelRect ? labelRect.top : 'not found',
            labelBottom: labelRect ? labelRect.bottom : 'not found',
            rectFound: !!firstRect,
            rectTop: rectRect ? rectRect.top : 'not found',
            rectBottom: rectRect ? rectRect.bottom : 'not found',
            gapBetweenLabelAndRect: labelRect && rectRect 
              ? rectRect.top - labelRect.bottom 
              : 'not found',
            totalOffsetFromContainerTop: labelRect 
              ? labelRect.top - rect.top 
              : 'not found',
            rectOffsetFromContainerTop: rectRect 
              ? rectRect.top - rect.top 
              : 'not found'
          });
        }
      }, 100);
    }
  }, [elementId, count, questionIndex, currentDividend]);
  
  // Calculate optimal rectangle width if not provided
  // Page 5: Labels are separate (100gc), gap (20gc), rectangles get 630gc (1075 - 445)
  // Recalculate when count, questionIndex, or dividend changes
  const rectangleWidth = React.useMemo(() => {
    if (propRectWidth) return propRectWidth;
    return calculateRectangleWidth(count, 630, gap, 0, 'Page 5 (DynamicStaticSeparatedRectanglesComponent)');
  }, [count, propRectWidth, gap, questionIndex, currentDividend]);
  
  if (propRectWidth) {
    console.log(`📐 [RectangleWidth] [Page 5] Using custom width: ${propRectWidth}gc (count: ${count}, bypassing calculation)`);
  } else {
    console.log(`📐 [RectangleWidth] [Page 5] Calculated width: ${rectangleWidth}gc (count: ${count}, questionIndex: ${questionIndex})`);
  }

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedRectWidth = processGc(`${rectangleWidth}gc`, 'width') || `${rectangleWidth}px`;
  const processedRectHeight = processGc(`${rectangleHeight}gc`, 'height') || `${rectangleHeight}px`;
  const processedGap = processGc(`${gap}gc`, 'gap') || `${gap}px`;
  const processedLabelFontSize = processGc('48gc', 'fontSize') || '48px';

  // Debug logging for rectangle labels and positions
  console.log('🔍 [DynamicStaticSeparatedRectanglesComponent] Alignment Debug:', {
    count,
    questionIndex,
    currentDividend,
    rectangleWidth: `${rectangleWidth}gc`,
    processedRectWidth,
    processedRectHeight,
    processedGap,
    processedLabelFontSize,
    labelGap: '10px',
    containerPosition: position ? {
      left: position.left,
      top: position.top,
      width: position.width || (position.right - position.left),
      height: position.height || (position.bottom - position.top)
    } : 'no position',
    wrapperGap: '10px' // Gap between label and rectangle
  });

  // Container style - centers the rectangles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: processedGap,
    zIndex: elementZIndex || zIndex,
    pointerEvents: 'none'
  };

  // Create rectangles with labels
  const rectangles = [];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    
    // Wrapper for each rectangle + label
    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      pointerEvents: 'auto'
    };

    // Label style
    const labelStyle = {
      color: '#ffffff',
      fontSize: processedLabelFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    };

    // Rectangle container style
    const rectContainerStyle = {
      width: processedRectWidth,
      height: processedRectHeight,
      position: 'relative'
    };

    rectangles.push(
      React.createElement('div', {
        key: `rect-wrapper-${i}`,
        style: wrapperStyle
      },
        // Label
        showLabels && React.createElement('span', {
          key: `label-${i}`,
          style: labelStyle
        }, `${i + 1}`),
        // Rectangle container with StaticSeparatedRectangleComponent
        React.createElement('div', {
          key: `rect-container-${i}`,
          style: rectContainerStyle
        },
          React.createElement(StaticSeparatedRectangleComponent, {
            key: `static-rect-${i}`,
            id: `${id}-rect-${i + 1}`,
            elementName: `${elementName}-rect-${i + 1}`,
            backgroundColor: color,
            initialAnimationPhase: initialAnimationPhase,
            position: { css: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 } }
          })
        )
      )
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'dynamic-static-separated-rectangles-container',
    style: containerStyle,
    'data-element-type': 'dynamic-static-separated-rectangles',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-count': count
  }, rectangles);
};

/**
 * Dynamic Divided Rectangles Component (for page 4)
 * Renders N DividedRectangleComponents based on dividend, with labels above
 * Each rectangle can be divided by the slider
 */
// Not using React.memo to allow re-renders when question changes
const DynamicDividedRectanglesComponent = (props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 800, 400],
    zIndex = 55,
    position,
    processedStyles,
    elementZIndex,
    count: propCount,
    colors = ['#FF9900', '#1ABC9C'],
    showLabels = true,
    rectangleWidth: propRectWidth,
    rectangleHeight = 250,
    gap = 50,
    sliderId,
    ...otherProps
  } = props;

  // Track question index to force re-render when question changes
  const [questionIndex, setQuestionIndex] = React.useState(() => {
    return typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
      ? window.currentQuestionIndex 
      : 0;
  });

  // Also track the actual dividend to detect changes even if index doesn't change
  const [currentDividend, setCurrentDividend] = React.useState(() => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  });

  // Listen for question changes and page changes
  React.useEffect(() => {
    const handleQuestionChange = () => {
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    const handlePageChange = () => {
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('questionChanged', handleQuestionChange);
      window.addEventListener('pageChanged', handlePageChange);
      
      return () => {
        window.removeEventListener('questionChanged', handleQuestionChange);
        window.removeEventListener('pageChanged', handlePageChange);
      };
    }
  }, []);

  // Get count from props or current question - always read fresh
  const getCount = () => {
    if (propCount !== undefined) return propCount;
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  };

  // Always get fresh count - recalculate when questionIndex or dividend changes
  const count = React.useMemo(() => getCount(), [questionIndex, currentDividend, propCount]);
  
  // Calculate optimal rectangle width if not provided
  // Page 4: Labels are separate (100gc), gap (20gc), rectangles get 630gc (1075 - 445)
  // Recalculate when count, questionIndex, or dividend changes
  const rectangleWidth = React.useMemo(() => {
    if (propRectWidth) return propRectWidth;
    return calculateRectangleWidth(count, 630, gap, 0, 'Page 4 (DynamicDividedRectanglesComponent)');
  }, [count, propRectWidth, gap, questionIndex, currentDividend]);
  
  if (propRectWidth) {
    console.log(`📐 [RectangleWidth] [Page 4] Using custom width: ${propRectWidth}gc (count: ${count}, bypassing calculation)`);
  } else {
    console.log(`📐 [RectangleWidth] [Page 4] Calculated width: ${rectangleWidth}gc (count: ${count}, questionIndex: ${questionIndex})`);
  }

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedRectWidth = processGc(`${rectangleWidth}gc`, 'width') || `${rectangleWidth}px`;
  const processedRectHeight = processGc(`${rectangleHeight}gc`, 'height') || `${rectangleHeight}px`;
  const processedGap = processGc(`${gap}gc`, 'gap') || `${gap}px`;
  const processedLabelFontSize = processGc('48gc', 'fontSize') || '48px';

  // Container style - centers the rectangles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: processedGap,
    zIndex: elementZIndex || zIndex,
    pointerEvents: 'none'
  };

  // Create rectangles with labels
  const rectangles = [];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    
    // Wrapper for each rectangle + label
    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      pointerEvents: 'auto'
    };

    // Label style
    const labelStyle = {
      color: '#ffffff',
      fontSize: processedLabelFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    };

    // Rectangle container style
    const rectContainerStyle = {
      width: processedRectWidth,
      height: processedRectHeight,
      position: 'relative'
    };

    rectangles.push(
      React.createElement('div', {
        key: `rect-wrapper-${i}`,
        style: wrapperStyle
      },
        // Label
        showLabels && React.createElement('span', {
          key: `label-${i}`,
          style: labelStyle
        }, `${i + 1}`),
        // Rectangle container with DividedRectangleComponent
        React.createElement('div', {
          key: `rect-container-${i}`,
          style: rectContainerStyle
        },
          React.createElement(DividedRectangleComponent, {
            key: `divided-rect-${i}`,
            id: `${id}-rect-${i + 1}`,
            elementName: `${elementName}-rect-${i + 1}`,
            backgroundColor: color,
            borderColor: '#ffffff',
            borderWidth: '4gc',
            borderRadius: '10gc',
            sliderId: sliderId,
            rectangleIndex: i + 1,
            position: { css: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 } }
          })
        )
      )
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'dynamic-divided-rectangles-container',
    style: containerStyle,
    'data-element-type': 'dynamic-divided-rectangles',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-count': count
  }, rectangles);
};

/**
 * Dynamic Rectangles Component (for page 3)
 * Renders N rectangles based on dividend, with labels above
 */
// Not using React.memo to allow re-renders when question changes
const DynamicRectanglesComponent = (props) => {
  const elementId = React.useId();
  
  const {
    id,
    elementName,
    currentPage,
    coordinates = [0, 0, 800, 400],
    zIndex = 55,
    position,
    processedStyles,
    elementZIndex,
    count: propCount,
    colors = ['#FF9900', '#1ABC9C'],
    showLabels = true,
    rectangleWidth: propRectWidth,
    rectangleHeight = 250,
    gap = 50,
    ...otherProps
  } = props;

  // Track question index to force re-render when question changes
  const [questionIndex, setQuestionIndex] = React.useState(() => {
    return typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
      ? window.currentQuestionIndex 
      : 0;
  });

  // Also track the actual dividend to detect changes even if index doesn't change
  const [currentDividend, setCurrentDividend] = React.useState(() => {
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  });

  // Listen for question changes and page changes
  React.useEffect(() => {
    const handleQuestionChange = () => {
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    const handlePageChange = () => {
      if (typeof window !== 'undefined') {
        if (window.currentQuestionIndex !== undefined) {
          setQuestionIndex(window.currentQuestionIndex);
        }
        if (window.getCurrentQuestion) {
          const question = window.getCurrentQuestion();
          setCurrentDividend(question.dividend || 2);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('questionChanged', handleQuestionChange);
      window.addEventListener('pageChanged', handlePageChange);
      
      return () => {
        window.removeEventListener('questionChanged', handleQuestionChange);
        window.removeEventListener('pageChanged', handlePageChange);
      };
    }
  }, []);

  // Get count from props or current question - always read fresh
  const getCount = () => {
    if (propCount !== undefined) return propCount;
    if (typeof window !== 'undefined' && window.getCurrentQuestion) {
      const question = window.getCurrentQuestion();
      return question.dividend || 2;
    }
    return 2;
  };

  // Always get fresh count - recalculate when questionIndex or dividend changes
  const count = React.useMemo(() => getCount(), [questionIndex, currentDividend, propCount]);
  
  // Calculate optimal rectangle width if not provided
  // Page 3: Same width as page 4/5 for consistency (630gc)
  // Recalculate when count, questionIndex, or dividend changes
  const rectangleWidth = React.useMemo(() => {
    if (propRectWidth) return propRectWidth;
    return calculateRectangleWidth(count, 630, gap, 0, 'Page 3 (DynamicRectanglesComponent)');
  }, [count, propRectWidth, gap, questionIndex, currentDividend]);
  
  if (propRectWidth) {
    console.log(`📐 [RectangleWidth] [Page 3] Using custom width: ${propRectWidth}gc (count: ${count}, bypassing calculation)`);
  } else {
    console.log(`📐 [RectangleWidth] [Page 3] Calculated width: ${rectangleWidth}gc (count: ${count}, questionIndex: ${questionIndex})`);
  }

  // Process gc units
  const processGc = (val, prop) => {
    if (val && typeof val === 'string' && val.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(val, prop);
    }
    return val;
  };

  const processedRectWidth = processGc(`${rectangleWidth}gc`, 'width') || `${rectangleWidth}px`;
  const processedRectHeight = processGc(`${rectangleHeight}gc`, 'height') || `${rectangleHeight}px`;
  const processedGap = processGc(`${gap}gc`, 'gap') || `${gap}px`;
  const processedLabelFontSize = processGc('48gc', 'fontSize') || '48px';
  const processedBorderWidth = processGc('4gc', 'borderWidth') || '4px';
  const processedBorderRadius = processGc('10gc', 'borderRadius') || '10px';

  // Container style - centers the rectangles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: processedGap,
    zIndex: elementZIndex || zIndex,
    pointerEvents: 'none'
  };

  // Create rectangles with labels
  const rectangles = [];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    
    // Wrapper for each rectangle + label
    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    };

    // Label style
    const labelStyle = {
      color: '#ffffff',
      fontSize: processedLabelFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    };

    // Rectangle style
    const rectStyle = {
      width: processedRectWidth,
      height: processedRectHeight,
      backgroundColor: color,
      border: `${processedBorderWidth} solid #ffffff`,
      borderRadius: processedBorderRadius,
      boxSizing: 'border-box'
    };

    rectangles.push(
      React.createElement('div', {
        key: `rect-wrapper-${i}`,
        style: wrapperStyle
      },
        // Label
        showLabels && React.createElement('span', {
          key: `label-${i}`,
          style: labelStyle
        }, `${i + 1}`),
        // Rectangle
        React.createElement('div', {
          key: `rect-${i}`,
          style: rectStyle
        })
      )
    );
  }

  return React.createElement('div', {
    id: elementId,
    className: 'dynamic-rectangles-container',
    style: containerStyle,
    'data-element-type': 'dynamic-rectangles',
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-count': count
  }, rectangles);
};

// Divided Rectangle Element Configuration for elements-registry
const DividedRectangleElement = {
  dividedRectangle: {
    type: 'custom',
    zIndex: 55,
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('divided-rectangle', (props, elementId) => {
      return React.createElement(DividedRectangleComponent, { ...props, key: elementId });
    })
  }
};

// Export components and configuration
window.DividedRectangleComponent = {
  DividedRectangleComponent,
  DividedRectangleElement,
  GroupedSectionsOverlay,
  StaticSeparatedRectangleComponent,
  StaticGroupedSectionsOverlay,
  DividedRectangleStaticComponent,
  DynamicRectanglesComponent,
  DynamicDividedRectanglesComponent,
  DynamicStaticSeparatedRectanglesComponent
};

// Also expose components globally for use in PageConfig
window.GroupedSectionsOverlay = GroupedSectionsOverlay;
window.StaticSeparatedRectangleComponent = StaticSeparatedRectangleComponent;
window.StaticGroupedSectionsOverlay = StaticGroupedSectionsOverlay;
window.DividedRectangleStaticComponent = DividedRectangleStaticComponent;
window.DynamicRectanglesComponent = DynamicRectanglesComponent;
window.DynamicDividedRectanglesComponent = DynamicDividedRectanglesComponent;
window.DynamicStaticSeparatedRectanglesComponent = DynamicStaticSeparatedRectanglesComponent;

console.log('✅ Divided rectangle component (including static versions) loaded successfully');

