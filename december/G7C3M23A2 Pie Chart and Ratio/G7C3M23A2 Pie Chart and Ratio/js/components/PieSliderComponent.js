/**
 * Pie Slider Component - React 18 Optimized
 *
 * A two-part pie chart with a draggable pointer on the circle.
 * User adjusts the pink/green portions and presses "Check".
 * - Correct answer can be pink OR green (configurable)
 * - Supports separate initial and correct values for each color
 * - If value == correct → show correct feedback & dispatch quizCompleted.
 * - Else → show incorrect feedback.
 *
 * Integration:
 * - Uses global feedback state: `${pageId}FeedbackState` + `${pageId}FeedbackUpdate`
 * - Dispatches `quizCompleted` event (like FillBlanksComponent)
 * - Has createOptimized factory + element config: PieSliderElement
 *
 * Dependencies:
 * - React (global)
 * - Chart.js (global as window.Chart)
 * - Optional: window.GridCellFontUtils.processGcProperty for "gc" units
 * - Optional: window.SharedUtilities.createOptimizedElementFactory
 */

// Pie Slider Component
const PieSliderComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;

  // Extract page number from component ID (e.g., 'page6-pie-slider' -> 'page6')
  const pageMatch = componentId.match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : 'page6'; // Default to page6 for backward compatibility
  const feedbackStateKey = `${pageId}FeedbackState`;
  const feedbackEventName = `${pageId}FeedbackUpdate`;

  const {
    position,
    processedStyles,
    elementZIndex,

    // Slice colors
    pinkColor = '#ff79c6',
    greenColor = '#b2ff66',

    // Initial percentages (can be different for pink and green)
    initialPinkPercent = 32,
    initialGreenPercent = null, // If null, calculated as 100 - initialPinkPercent

    // Correct answer specification
    // correctType can be 'pink' or 'green' to specify which color is correct
    // If 'pink', user must match correctPinkPercent
    // If 'green', user must match correctGreenPercent
    correctType = 'pink', // 'pink' or 'green'
    correctPinkPercent = 30,
    correctGreenPercent = null, // If null, calculated as 100 - correctPinkPercent

    // Slice label font
    sliceLabelFontSize = '28gc',
    sliceLabelFontColor = '#000000',

    // Pointer styling
    pointerColor = '#ffa500',
    pointerBorderColor = '#ffffff',
    pointerBorderWidth = '4gc',
    pointerSize = '22gc',

    // Pie border
    pieBorderColor = '#000000',
    pieBorderWidth = '2gc',

    // Chart dimensions
    chartSize = 300, // in px

    // Check button styling (applet-button style)
    checkButtonText = 'Check',
    checkButtonFontSize = '24gc',
    checkButtonFontColor = '#ffffff',
    checkButtonColor = '#2a3f5f',

    // Feedback messages
    correctFeedback = 'Correct!',
    incorrectFeedback = 'Try again.',

    // Concept summary integration (optional)
    keyConcepts = [],
    impFormulae = []
  } = props;

  console.log('🔍 PieSliderComponent RENDERED!');
  console.log('🔍 PieSliderComponent props:', props);
  console.log('🔍 [PieSlider] correctType:', correctType, 'correctPinkPercent:', correctPinkPercent, 'correctGreenPercent:', correctGreenPercent);

  // Initialize global state store for pie slider if it doesn't exist
  if (typeof window !== 'undefined' && !window.pieSliderStateStore) {
    window.pieSliderStateStore = {};
  }

  // Helper to process "gc" properties (like FillBlanksComponent)
  const processGcProperty = (value, propertyType) => {
    if (
      value &&
      typeof value === 'string' &&
      value.includes('gc') &&
      window.GridCellFontUtils &&
      window.GridCellFontUtils.processGcProperty
    ) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  };

  const processedSliceLabelFontSize = processGcProperty(sliceLabelFontSize, 'fontSize');
  const processedPointerSize = processGcProperty(pointerSize, 'width'); // approximate
  const processedPointerBorderWidth = processGcProperty(pointerBorderWidth, 'borderWidth');
  const processedPieBorderWidth = processGcProperty(pieBorderWidth, 'borderWidth');
  const processedCheckButtonFontSize = processGcProperty(checkButtonFontSize, 'fontSize');

  // Calculate effective initial and correct values
  const effectiveInitialGreen = initialGreenPercent !== null ? initialGreenPercent : (100 - initialPinkPercent);
  const effectiveCorrectGreen = correctGreenPercent !== null ? correctGreenPercent : (100 - correctPinkPercent);

  // Local state
  const [pinkPercent, setPinkPercent] = React.useState(initialPinkPercent);
  const [feedbackState, setFeedbackState] = React.useState(null); // 'correct' | 'incorrect' | null
  const [feedbackText, setFeedbackText] = React.useState('');
  const [hasSubmittedCorrect, setHasSubmittedCorrect] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const pointerRef = React.useRef(null);

  // Restore or initialize state when componentId changes
  React.useEffect(() => {
    const stateKey = componentId;
    const savedState = window.pieSliderStateStore?.[stateKey];

    if (savedState) {
      console.log('🔄 [PieSlider] Component ID changed to:', componentId, '- Restoring saved state');
      setPinkPercent(
        typeof savedState.pinkPercent === 'number' ? savedState.pinkPercent : initialPinkPercent
      );
      setFeedbackState(savedState.feedbackState || null);
      setFeedbackText(savedState.feedbackText || '');
      setHasSubmittedCorrect(!!savedState.hasSubmittedCorrect);
    } else {
      console.log('🔄 [PieSlider] Component ID changed to:', componentId, '- Initializing fresh state');
      setPinkPercent(initialPinkPercent);
      setFeedbackState(null);
      setFeedbackText('');
      setHasSubmittedCorrect(false);
    }
  }, [componentId, initialPinkPercent]);

  // Save state whenever it changes
  React.useEffect(() => {
    const stateKey = componentId;
    if (!window.pieSliderStateStore) {
      window.pieSliderStateStore = {};
    }

    window.pieSliderStateStore[stateKey] = {
      pinkPercent,
      feedbackState,
      feedbackText,
      hasSubmittedCorrect
    };

    console.log('💾 [PieSlider] Saved state for', stateKey);
  }, [componentId, pinkPercent, feedbackState, feedbackText, hasSubmittedCorrect]);

  // Chart.js plugin for labels inside slices
  const sliceLabelPlugin = React.useMemo(
    () => ({
      id: 'sliceLabels',
      afterDraw(chart) {
        const { ctx } = chart;
        const dataset = chart.data.datasets[0].data;
        const meta = chart.getDatasetMeta(0);

        ctx.save();
        ctx.font = `bold ${processedSliceLabelFontSize || '20px'} Arial`;
        ctx.fillStyle = sliceLabelFontColor || '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        dataset.forEach((value, i) => {
          const arc = meta.data[i];
          if (!arc) return;
          const midAngle = (arc.startAngle + arc.endAngle) / 2;
          const radius = (arc.outerRadius + arc.innerRadius) / 2;
          const x = arc.x + radius * Math.cos(midAngle);
          const y = arc.y + radius * Math.sin(midAngle);
          ctx.fillText(value + '%', x, y);
        });

        ctx.restore();
      }
    }),
    [processedSliceLabelFontSize, sliceLabelFontColor]
  );

  // Initialize Chart.js pie chart
  React.useEffect(() => {
    if (!canvasRef.current) return;
    if (typeof window === 'undefined' || !window.Chart) {
      console.warn('⚠️ [PieSlider] Chart.js not found on window. Please ensure it is loaded.');
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    const pink = pinkPercent;
    const green = 100 - pink;

    const chart = new window.Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Green', 'Pink'],
        datasets: [
          {
            data: [green, pink],
            backgroundColor: [greenColor, pinkColor],
            borderColor: [pieBorderColor, pieBorderColor],
            borderWidth: parseFloat(processedPieBorderWidth) || 2
          }
        ]
      },
      options: {
        responsive: false,
        animation: false,
        plugins: {
          legend: { display: false }
        }
      },
      plugins: [sliceLabelPlugin]
    });

    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [
    pinkPercent,
    greenColor,
    pinkColor,
    pieBorderColor,
    processedPieBorderWidth,
    sliceLabelPlugin
  ]);

  // Update chart when pinkPercent changes
  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const pink = pinkPercent;
    const green = 100 - pink;

    chart.data.datasets[0].data = [green, pink];
    chart.update();
  }, [pinkPercent]);

  // Helper: Update pointer position based on greenPercent (like previous HTML example)
  const updatePointerPosition = React.useCallback(
    (greenPercent) => {
      if (!pointerRef.current || !canvasRef.current) return;

      const pointerEl = pointerRef.current;
      const canvas = canvasRef.current;

      const R = chartSize / 2 + 10; // radius slightly outside pie
      const cx = chartSize / 2;
      const cy = chartSize / 2;

      const angle = (greenPercent / 100) * 360 - 90; // start at top
      const rad = (angle * Math.PI) / 180;

      const x = cx + R * Math.cos(rad);
      const y = cy + R * Math.sin(rad);

      pointerEl.style.left = x + 'px';
      pointerEl.style.top = y + 'px';
    },
    [chartSize]
  );

  // Position pointer when pinkPercent or chartSize changes
  React.useEffect(() => {
    const green = 100 - pinkPercent;
    updatePointerPosition(green);
  }, [pinkPercent, updatePointerPosition]);

  // Drag logic for pointer
  React.useEffect(() => {
    const pointerEl = pointerRef.current;
    const canvas = canvasRef.current;
    if (!pointerEl || !canvas) return;

    const handleMouseDown = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + chartSize / 2;
      const cy = rect.top + chartSize / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      angle = angle + 90;
      if (angle < 0) angle += 360;

      let greenPercent = Math.round((angle / 360) * 100);
      if (greenPercent < 0) greenPercent = 0;
      if (greenPercent > 100) greenPercent = 100;

      const newPink = 100 - greenPercent;
      setPinkPercent(newPink);
    };

    pointerEl.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      pointerEl.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [chartSize, isDragging]);

  // Concept summary update (simple version)
  const updateConceptSummaryPanel = React.useCallback(() => {
    const pageMatchLocal = componentId.match(/page(\d+)-/);
    if (!pageMatchLocal) {
      console.log('🔍 [PieSlider] Could not extract page number from componentId:', componentId);
      return;
    }
    const pageNumber = pageMatchLocal[1];

    if ((keyConcepts && keyConcepts.length > 0) || (impFormulae && impFormulae.length > 0)) {
      const updateEvent = new CustomEvent('updateConceptSummary', {
        detail: {
          pageNumber: pageNumber,
          keyConcepts: keyConcepts || [],
          impFormulae: impFormulae || []
        }
      });
      window.dispatchEvent(updateEvent);
      console.log('🔍 [PieSlider] Dispatched updateConceptSummary event:', updateEvent.detail);
    }
  }, [componentId, keyConcepts, impFormulae]);

  // Handle Check button click
  const handleCheckClick = () => {
    const greenPercent = 100 - pinkPercent;

    // Determine if answer is correct based on correctType
    let isCorrect = false;
    if (correctType === 'pink') {
      isCorrect = pinkPercent === correctPinkPercent;
    } else if (correctType === 'green') {
      isCorrect = greenPercent === effectiveCorrectGreen;
    }

    console.log('🔍 [PieSlider] Check clicked: correctType=', correctType, 'pinkPercent=', pinkPercent, 'greenPercent=', greenPercent, 'isCorrect=', isCorrect);

    if (isCorrect) {
      setFeedbackState('correct');
      setFeedbackText(correctFeedback || 'Correct!');
      setHasSubmittedCorrect(true);

      // Play correct sound if available
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('correct');
      }

      // Dispatch quizCompleted event (like FillBlanksComponent)
      if (typeof window !== 'undefined') {
        const enableNextEvent = new CustomEvent('quizCompleted', {
          detail: {
            componentId: componentId,
            componentType: 'PieSliderComponent',
            pageNumber: window.getCurrentPage?.() || null
          }
        });
        window.dispatchEvent(enableNextEvent);
        console.log('🔍 [PieSlider] Dispatched quizCompleted event for componentId:', componentId);
      }

      // Update concept summary (optional)
      updateConceptSummaryPanel();
    } else {
      setFeedbackState('incorrect');
      setFeedbackText(incorrectFeedback || 'Try again.');
      setHasSubmittedCorrect(false);

      // Play wrong sound if available
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('wrong');
      }
    }
  };

  // Global feedback state for FeedbackComponent (same pattern as FillBlanksComponent)
  React.useEffect(() => {
    if (!window[feedbackStateKey]) {
      window[feedbackStateKey] = {
        text: '',
        mode: 'normal'
      };
    }

    const existingState = window[feedbackStateKey];
    if (existingState && existingState.mode === 'summary' && existingState.text) {
      return; // preserve summary state
    }

    if (feedbackText && feedbackState) {
      window[feedbackStateKey].text = feedbackText;
      window[feedbackStateKey].mode = feedbackState === 'correct' ? 'correct' : 'incorrect';
    } else {
      if (existingState && existingState.mode !== 'summary') {
        window[feedbackStateKey].text = '';
        window[feedbackStateKey].mode = 'normal';
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(feedbackEventName, {
          detail: {
            text: window[feedbackStateKey].text,
            mode: window[feedbackStateKey].mode
          }
        })
      );
    }
  }, [feedbackState, feedbackText, feedbackStateKey, feedbackEventName]);

  // Container style (like FillBlanks)
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Pointer size styles
  const pointerSizePx = parseFloat(processedPointerSize) || 22;
  const pointerBorderWidthPx = parseFloat(processedPointerBorderWidth) || 4;

  // Check button disabled after correct (optional)
  const isCheckDisabled = hasSubmittedCorrect;

  // Build Check button (applet-button style: container -> frame -> content)
  const checkButton = React.createElement(
    'div',
    {
      className:
        'applet-button-container pie-slider-check-button' +
        (isCheckDisabled ? ' disabled' : ''),
      onClick: !isCheckDisabled ? handleCheckClick : undefined,
      style: {
        marginTop: '100px',
        backgroundColor: checkButtonColor,
        borderRadius: 'var(--border-radius-xl)',
        border: 'none',
        cursor: isCheckDisabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isCheckDisabled ? 0.8 : 1,
        pointerEvents: isCheckDisabled ? 'none' : 'auto',
        minWidth: '120px',
        minHeight: '40px',
        position: 'relative',
        boxSizing: 'border-box',
        padding: '46px 69px'
      }
    },
    [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame pie-slider-check-frame',
        style: {
          position: 'absolute',
          top: '3px',
          bottom: '3px',
          left: '6px',
          right: '6px',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)',
          boxShadow:
            'inset 0 1px 3px rgba(255,255,255,0.3), inset 0 -1px 3px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)'
        }
      }),
      // Content layer
      React.createElement(
        'div',
        {
          key: 'content',
          className: 'applet-button-content pie-slider-check-content',
          style: {
            position: 'relative',
            zIndex: 2,
            padding: '6px 18px',
            fontSize: processedCheckButtonFontSize || '18px',
            color: checkButtonFontColor,
            fontWeight: 'bold',
            textAlign: 'center',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }
        },
        checkButtonText
      )
    ]
  );

  // Chart + pointer container
  const chartContainer = React.createElement(
    'div',
    {
      style: {
        position: 'relative',
        width: chartSize + 'px',
        height: chartSize + 'px'
      }
    },
    [
      React.createElement('canvas', {
        key: 'canvas',
        ref: canvasRef,
        width: chartSize,
        height: chartSize,
        style: {
          display: 'block'
        }
      }),
      React.createElement('div', {
        key: 'pointer',
        ref: pointerRef,
        style: {
          width: pointerSizePx + 'px',
          height: pointerSizePx + 'px',
          backgroundColor: pointerColor,
          border: pointerBorderWidthPx + 'px solid ' + pointerBorderColor,
          borderRadius: '50%',
          position: 'absolute',
          boxShadow: '0 0 6px rgba(0,0,0,0.4)',
          transform: 'translate(-50%, -50%)',
          cursor: 'grab'
        }
      })
    ]
  );

  return React.createElement(
    'div',
    {
      id: elementId,
      'data-component-type': 'PieSliderComponent',
      'data-component-id': componentId,
      style: containerStyle
    },
    [chartContainer, checkButton]
  );
});

// Pie Slider Element Configuration
const PieSliderElement = {
  pieSlider: {
    type: 'pie-slider',
    coordinates: [0, 0, 1600, 900],
    zIndex: 'var(--z-content)',
    props: {
      pinkColor: '#ff79c6',
      greenColor: '#b2ff66',
      initialPinkPercent: 32,
      initialGreenPercent: null, // or set to 68 if you want explicit green value
      correctType: 'pink', // 'pink' or 'green'
      correctPinkPercent: 30,
      correctGreenPercent: null, // or set to 70 if you want explicit green value
      sliceLabelFontSize: '28gc',
      sliceLabelFontColor: '#000000',
      pointerColor: '#ffa500',
      pointerBorderColor: '#ffffff',
      pointerBorderWidth: '4gc',
      pointerSize: '22gc',
      pieBorderColor: '#000000',
      pieBorderWidth: '2gc',
      chartSize: 300,
      checkButtonText: 'Check',
      checkButtonFontSize: '24gc',
      checkButtonFontColor: '#ffffff',
      checkButtonColor: '#2a3f5f',
      correctFeedback: 'Correct!',
      incorrectFeedback: 'Try again.',
      keyConcepts: [],
      impFormulae: []
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory(
      'pie-slider',
      (props, elementId) => {
        return React.createElement(PieSliderComponent, props);
      }
    )
  }
};

// Export to window
window.PieSliderComponent = {
  PieSliderComponent,
  PieSliderElement
};

console.log('✅ Pie Slider component loaded successfully');