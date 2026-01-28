/**
 * Feedback Textbox Component - React 18 Optimized
 * 
 * A textbox component with three modes for displaying feedback:
 * - normal: transparent background, white text, no border
 * - correct: green background, white text, dashed border
 * - incorrect: salmon background, white text, dashed border
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Feedback Textbox Component
 */
const FeedbackTextboxComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const deferredText = React.useDeferredValue(props.text || '');
  const deferredMode = React.useDeferredValue(props.mode || 'normal');
  
  // Handle text change callback
  const handleTextChange = React.useCallback((newText) => {
    if (props.onTextChange) {
      startTransition(() => {
        props.onTextChange(newText);
      });
    }
  }, [props.onTextChange]);
  
  // Handle mode change callback
  const handleModeChange = React.useCallback((newMode) => {
    if (props.onModeChange) {
      startTransition(() => {
        props.onModeChange(newMode);
      });
    }
  }, [props.onModeChange]);
  
  // State for text and mode
  const [feedbackText, setFeedbackText] = React.useState(props.text || '');
  const [feedbackMode, setFeedbackMode] = React.useState(props.mode || 'normal');
  
  // Check for pending feedback from global storage
  React.useEffect(() => {
    console.log('🎯 [Feedback] Component mounted, checking for pending feedback...');
    if (typeof window !== 'undefined' && window.pendingDragDropFeedback) {
      const pending = window.pendingDragDropFeedback;
      setFeedbackText(pending.text);
      setFeedbackMode(pending.mode);
      delete window.pendingDragDropFeedback;
      console.log('🎯 [Feedback] Applied pending feedback:', pending);
    } else {
      console.log('🎯 [Feedback] No pending feedback found');
    }
  }, []);
  
  // Memoize mode-based styles
  const modeStyles = React.useMemo(() => {
    const borderRadius = props.borderRadius || '12gc';
    const borderWidth = '4gc';
    
    switch (feedbackMode) {
      case 'correct':
        return {
          color: 'white',
          backgroundColor: 'var(--color-green)',
          border: `${borderWidth} dashed var(--color-green-dark)`,
          borderRadius: borderRadius
        };
      case 'incorrect':
        return {
          color: 'white',
          backgroundColor: 'var(--color-salmon)',
          border: `${borderWidth} dashed var(--color-salmon-dark)`,
          borderRadius: borderRadius
        };
      case 'normal':
      default:
        return {
          color: 'white',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: borderRadius
        };
    }
  }, [feedbackMode, props.borderRadius]);
  
  // Combine all styles and process GC units
  const processedStyles = React.useMemo(() => {
    // Filter out positioning-related props that should be handled by the coordinate system
    const { position, processedStyles: _, ...stylingProps } = props;
    
    const combinedStyles = {
      ...modeStyles,
      fontSize: props.fontSize || '32gc',
      ...stylingProps
    };
    
    return GridCellFontUtils.processGcStyles(combinedStyles);
  }, [modeStyles, props.fontSize, props]);
  
  // Expose global function to update feedback
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🎯 [Feedback] Setting up global functions in feedback textbox component');
      window.updateDragDropFeedback = (text, mode = 'normal') => {
        console.log('🎯 [Feedback] updateDragDropFeedback called with:', { text, mode });
        setFeedbackText(text);
        setFeedbackMode(mode);
        console.log('🎯 [Feedback] Updated drag-drop feedback via React state:', { text, mode });
      };
      
      window.clearDragDropFeedback = () => {
        setFeedbackText('');
        setFeedbackMode('normal');
        console.log('🎯 [Feedback] Cleared drag-drop feedback via React state');
      };
      
      console.log('✅ [Feedback] Global functions set up successfully - now using React state');
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        console.log('🧹 [Feedback] Cleaning up global functions');
        delete window.updateDragDropFeedback;
        delete window.clearDragDropFeedback;
      }
    };
  }, []);

  return React.createElement('div', {
    id: elementId,
    className: `feedback-textbox-container feedback-textbox-${feedbackMode}${isPending ? ' pending' : ''}`,
    style: {
      ...processedStyles,
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      wordWrap: 'break-word',
      whiteSpace: 'normal'
    },
    'data-element-type': 'feedback-textbox',
    'data-element-name': 'feedback-textbox-page2',
    'data-mode': feedbackMode
  }, feedbackText);
});

/**
 * Textbox Component (for backward compatibility with standard textbox type)
 */
const TextboxComponent = React.memo((props) => {
  const elementId = React.useId();
  const deferredText = React.useDeferredValue(props.text || '');
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  return React.createElement('div', {
    id: elementId,
    className: 'textbox-container',
    style: processedStyles,
    'data-element-type': 'textbox'
  }, deferredText);
});

/**
 * Container Component (for general purpose containers)
 */
const ContainerComponent = React.memo((props) => {
  const elementId = React.useId();
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  return React.createElement('div', {
    id: elementId,
    className: 'container-element',
    style: processedStyles,
    'data-element-type': 'container'
  }, props.children);
});

// Feedback Textbox Elements Configuration
const FeedbackTextboxElement = {
  'feedback-textbox': {
    type: 'feedback-textbox',
    coordinates: [1, 1, 128, 10],
    zIndex: 'var(--z-content)',
    props: {
      text: 'Feedback message',
      fontSize: '32gc',
      borderRadius: '12gc',
      mode: 'normal',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10gc',
      boxSizing: 'border-box'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('feedback-textbox', (props, elementId) => {
      return React.createElement(FeedbackTextboxComponent, props);
    })
  },
  
  // Also provide standard textbox and container if not already available
  textbox: {
    type: 'textbox',
    coordinates: [1, 1, 128, 10],
    zIndex: 'var(--z-content)',
    props: {
      text: 'Text content',
      fontSize: '32gc',
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('textbox', (props, elementId) => {
      return React.createElement(TextboxComponent, props);
    })
  },
  
  container: {
    type: 'container',
    coordinates: [1, 1, 128, 72],
    zIndex: 'var(--z-content)',
    props: {
      backgroundColor: 'transparent',
      borderRadius: '0gc'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(ContainerComponent, props);
    })
  }
};

// Export components and configuration
window.FeedbackTextboxComponent = {
  FeedbackTextboxComponent,
  TextboxComponent,
  ContainerComponent,
  FeedbackTextboxElement
};

console.log('✅ Feedback textbox component loaded successfully');

