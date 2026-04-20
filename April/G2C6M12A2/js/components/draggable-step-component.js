/**
 * Draggable Step Component - React 18 Optimized
 * 
 * Wraps ImageTextComponent with react-beautiful-dnd Draggable functionality
 * for the step ordering game
 */

/**
 * Draggable Step Component
 * @param {object} props - Component props
 * @param {string} props.stepName - Name of the step (e.g., 'step1-image-text')
 * @param {number} props.index - Current index in the order (0, 1, or 2)
 * @param {string} props.image - Image path
 * @param {string|function} props.text - Text content or function that returns text
 * @param {object} props.textStyle - Text styling
 * @param {number} props.textTop - Text top position percentage
 * @param {number} props.textLeft - Text left position percentage
 * @param {string} props.textSize - Text font size (e.g., '60gc')
 * @param {boolean} props.allowHTML - Whether to allow HTML in text
 * @param {number} props.zIndex - Z-index for the element
 * @param {boolean} props.isCorrectPosition - Whether step is in correct position
 * @param {boolean} props.showFeedback - Whether to show position feedback
 * @param {boolean} props.isRevealed - Whether overlay has been shattered/revealed
 */
const DraggableStepComponent = (props) => {
  const {
    stepName,
    index,
    image,
    text,
    textStyle,
    textTop,
    textLeft,
    textSize = '60gc',
    allowHTML,
    zIndex,
    isCorrectPosition,
    showFeedback,
    isGameComplete,
    isRevealed,
    renderKatexFraction
  } = props;

  // Get the Draggable component from react-beautiful-dnd
  const Draggable = window.ReactBeautifulDnd?.Draggable;
  
  if (!Draggable) {
    console.error('❌ react-beautiful-dnd not loaded! Draggable not available');
    return null;
  }

  return React.createElement(Draggable, {
    draggableId: stepName,
    index: index,
    key: stepName,
    isDragDisabled: isGameComplete
  }, (provided, snapshot) => {
    // Get position coordinates based on index
    const coordinates = window.StepOrderingGame?.getStepPosition(index) || [0, 0, 100, 100];
    const [x1, y1, x2, y2] = coordinates;
    
    // Calculate dimensions and position
    const gridWidth = 1600;
    const gridHeight = 900;
    const left = (x1 / gridWidth) * 100;
    const top = (y1 / gridHeight) * 100;
    const width = ((x2 - x1) / gridWidth) * 100;
    const height = ((y2 - y1) / gridHeight) * 100;
    
    // Debug positioning (can be removed in production)
    // console.log('📍 DraggableStep positioning:', { stepName, coordinates: [x1, y1, x2, y2] });
    
    // Build container style
    const containerStyle = {
      position: 'absolute',
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `${height}%`,
      zIndex: snapshot.isDragging ? 9999 : (zIndex || 'var(--z-content)'),
      transition: snapshot.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      // Apply draggable styles but override transform to prevent unwanted translations when not dragging
      ...provided.draggableProps.style,
      transform: snapshot.isDragging ? provided.draggableProps.style?.transform : undefined
    };
    
    // Build image-text props
    const imageTextProps = {
      image,
      imagePosition: 'center bottom',
      imageSize: 'contain',
      text,
      textTop,
      textLeft,
      allowHTML,
      textStyle: {
        fontSize: '60gc',
        color: '#ffffff',
        fontWeight: 'bold',
        ...textStyle
      },
      name: stepName,
      elementName: stepName,
      // Pass positioning to ImageTextComponent
      position: {
        css: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }
      },
      processedStyles: {
        width: '100%',
        height: '100%'
      },
      elementZIndex: zIndex
    };
    
    // Debug text positioning (can be removed in production)
    // console.log('📍 DraggableStep text positioning:', { stepName, textTop, textLeft });
    
    // Build visual feedback classes - only green glow for correct positions
    let feedbackClass = '';
    if (showFeedback && isCorrectPosition) {
      feedbackClass = 'step-correct-position';
    }
    
    const dragClass = snapshot.isDragging ? 'step-dragging' : '';
    const disabledClass = isGameComplete ? 'step-disabled' : '';
    const className = `draggable-step ${feedbackClass} ${dragClass} ${disabledClass}`.trim();
    
    // Process gc units for overlay text size
    const overlayTextStyle = window.GridCellFontUtils 
      ? window.GridCellFontUtils.processGcStyles({ fontSize: textSize })
      : { fontSize: textSize };
    
    const encodeAssetPathForUrl = (path) =>
      typeof path === 'string' ? path.split('/').map((seg) => encodeURIComponent(seg)).join('/') : path;

    // Get current overlay content (puzzle, Check feedback, or same as revealed card)
    const getCurrentOverlayText = () => {
      const currentQuestion = window.StepOrderingGame?.getCurrentQuestion();
      if (!currentQuestion) return text;
      const resolved = window.StepOrderingGame?.getResolvedStepContentPath?.(currentQuestion, stepName);
      if (resolved) return resolved;
      const stepMapping = {
        'step1-image-text': currentQuestion.step1,
        'step2-image-text': currentQuestion.step2,
        'step3-image-text': currentQuestion.step3
      };
      const fallback = stepMapping[stepName] ?? text;
      return typeof fallback === 'function' ? fallback() : fallback;
    };
    
    const currentOverlayText = getCurrentOverlayText();
    
    // Check if the content is an image path
    const isImagePath = (content) => {
      if (typeof content !== 'string') return false;
      return content.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i) !== null;
    };

    // Render overlay text with KaTeX if available, or image if path - UPDATED v5
    const renderOverlayText = () => {
      // Check if content is an image path
      if (isImagePath(currentOverlayText)) {
        const src = encodeAssetPathForUrl(currentOverlayText);
        const useCorrectScale = window.StepOrderingGame?.isCorrectFeedbackImagePath?.(currentOverlayText);
        const s = window.StepOrderingGame?.CORRECT_STEP_FEEDBACK_IMAGE_SCALE ?? 0.75;
        const scaleCss = useCorrectScale
          ? `transform:scale(${s});transform-origin:center center;`
          : '';
        return `<img src="${src}" alt="" draggable="false" style="width: 100%; height: 100%; object-fit: contain;${scaleCss}" />`;
      }
      
      if (renderKatexFraction && typeof currentOverlayText === 'string') {
        // Parse fraction and render with KaTeX (handles mixed fractions)
        if (currentOverlayText.includes(' ')) {
          // Handle mixed fractions like "1 2/3" - display as proper mixed fraction
          const parts = currentOverlayText.split(' ');
          const wholeNumber = parseInt(parts[0]);
          const fractionParts = parts[1].split('/');
          const numerator = parseInt(fractionParts[0]);
          const denominator = parseInt(fractionParts[1]);
          // Process LaTeX string through KaTeX
          const latexString = `${wholeNumber} \\frac{${numerator}}{${denominator}}`;
          if (typeof katex !== 'undefined') {
            try {
              return katex.renderToString(latexString, {
                throwOnError: false,
                displayMode: false
              });
            } catch (e) {
              console.warn('KaTeX rendering error for mixed fraction:', e);
              return currentOverlayText;
            }
          }
          return currentOverlayText;
        } else {
          // Handle regular fractions like "2/3"
          const parts = currentOverlayText.split('/');
          if (parts.length === 2) {
            const numerator = parseInt(parts[0]);
            const denominator = parseInt(parts[1]);
            return renderKatexFraction(numerator, denominator);
          }
        }
      }
      // Fallback to raw text
      return typeof currentOverlayText === 'function' ? currentOverlayText() : currentOverlayText;
    };
    
    // Handle click on step to reset feedback to default
    const handleStepClick = (event) => {
      console.log('🖱️ Step clicked:', stepName);
      
      // Reset feedback to default instructions when user clicks on a step
      if (window.StepOrderingGame?.resetFeedbackText) {
        window.StepOrderingGame.resetFeedbackText();
      }
    };

    return React.createElement('div', {
      ref: provided.innerRef,
      ...provided.draggableProps,
      ...provided.dragHandleProps,
      style: containerStyle,
      className: className,
      'data-step-name': stepName,
      'data-is-dragging': snapshot.isDragging,
      'data-is-correct': isCorrectPosition,
      'data-revealed': isRevealed,
      onClick: handleStepClick
    }, 
      React.createElement(window.LayoutComponents.ImageTextComponent, imageTextProps),
      // Add overlay element that covers the step image with text
      !isRevealed && React.createElement('div', {
        className: 'step-overlay',
        'data-step-name': `${stepName}-overlay`
      }, 
        // Render the current question's text content on the overlay with KaTeX
        React.createElement('div', {
          className: 'step-overlay-text',
          style: overlayTextStyle,
          dangerouslySetInnerHTML: { __html: renderOverlayText() }
        })
      )
    );
  });
};

// Export component
if (typeof window !== 'undefined') {
  if (!window.DraggableComponents) {
    window.DraggableComponents = {};
  }
  window.DraggableComponents.DraggableStepComponent = DraggableStepComponent;
  console.log('✅ Draggable step component loaded');
}

