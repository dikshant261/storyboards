/**
 * Math Learning Applet - Refactored Architecture
 * 
 * This refactored version provides:
 * - Modular component structure
 * - Better state management
 * - Improved error handling
 * - Enhanced performance
 * - Type safety through JSDoc
 */

const { 
  useState, useEffect, useCallback, useMemo, useContext, createContext,
  useId, useDeferredValue, useTransition, Suspense, startTransition,
  useSyncExternalStore, useInsertionEffect
} = React;

// ===== CONSTANTS =====
const ELEMENT_TYPES = {
  CUSTOM: 'custom',
  TEXTBOX: 'textbox',
  BUTTON: 'button',
  CONTAINER: 'container',
  TABLE: 'table',
  TILE: 'tile',
  LINE: 'line',
  PARTITIONED_RECTANGLE: 'partitioned-rectangle',
  NUMBER_PAD_PANEL: 'number-pad-panel',
  PROGRESS: 'progress'
};

const PAGE_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2
};

const ANIMATION_TYPES = {
  GLOW: 'glow',
  PULSATE: 'pulsate',
  PULSATE_GLOW: 'pulsateGlow'
};

// ===== CONTEXT FOR STATE MANAGEMENT =====
/**
 * @typedef {Object} AppState
 * @property {number} currentPage - Current active page
 * @property {number[]} availablePages - Array of available page numbers
 * @property {number} totalPages - Total number of pages
 * @property {number} currentQuestionIndex - Current question index
 * @property {Object} questionCompletions - Completion status per page
 * @property {boolean} page2completed - Page 2 completion status
 * @property {Object} page2OptionStates - Page 2 option states
 * @property {string} page2FeedbackText - Page 2 feedback text
 */

const AppStateContext = createContext(null);

/**
 * Custom hook to use app state
 * @returns {AppState} App state and actions
 */
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

// ===== UTILITY FUNCTIONS =====
/**
 * Validates if required dependencies are available
 * @returns {Object} Validation result with missing dependencies
 */
const validateDependencies = () => {
  const missing = [];
  
  if (typeof gridPositions === 'undefined') missing.push('gridPositions');
  if (typeof GridPositionPages === 'undefined') missing.push('GridPositionPages');
  if (typeof ElementsUtils === 'undefined') missing.push('ElementsUtils');
  
  return {
    isValid: missing.length === 0,
    missing
  };
};

/**
 * Gets available pages from GridPositionPages
 * @returns {number[]} Array of available page numbers
 */
const getAvailablePages = () => {
  try {
    if (typeof window !== 'undefined' && window.GridPositionPages) {
      const allKeys = Object.keys(window.GridPositionPages);
      const numericKeys = allKeys.filter(key => !isNaN(Number(key)) && Number(key) > 0);
      const pages = numericKeys.map(Number).sort((a, b) => a - b);
      console.log('🔍 [getAvailablePages] All GridPositionPages keys:', allKeys);
      console.log('🔍 [getAvailablePages] Filtered numeric keys:', numericKeys);
      console.log('🔍 [getAvailablePages] Final pages:', pages);
      return pages;
    } else if (typeof PageUtils !== 'undefined' && PageUtils.getAvailablePages) {
      const pages = PageUtils.getAvailablePages();
      console.log('🔍 [getAvailablePages] Using PageUtils, found pages:', pages);
      return pages;
    }
    console.warn('⚠️ GridPositionPages not available, using fallback pages [1, 2]');
    return [1, 2];
  } catch (error) {
    console.warn('⚠️ Error getting available pages, using fallback [1, 2]:', error);
    return [1, 2];
  }
};

/**
 * Filters elements by type from page elements
 * @param {Array} pageElements - Array of page elements
 * @param {string[]} types - Array of element types to filter
 * @returns {Array} Filtered elements
 */
const filterElementsByType = (pageElements, types) => {
  if (!Array.isArray(pageElements)) return [];
  return pageElements.filter(element => types.includes(element.type));
};

// ===== ERROR BOUNDARY COMPONENT =====
/**
 * Error Boundary Component for handling React errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('❌ [ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return React.createElement('div', { 
        className: 'error-boundary',
        style: {
          width: '100vw',
          height: '100vh',
          background: '#ffebee',
          color: '#c62828',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif'
        }
      }, [
        React.createElement('h1', { key: 'title' }, '⚠️ Something went wrong'),
        React.createElement('p', { key: 'message' }, this.state.error?.message || 'An unexpected error occurred'),
        React.createElement('details', { 
          key: 'details',
          style: { marginTop: '20px', maxWidth: '80%' }
        }, [
          React.createElement('summary', { key: 'summary' }, 'Error Details'),
          React.createElement('pre', { 
            key: 'stack',
            style: { 
              fontSize: '12px', 
              marginTop: '10px',
              overflow: 'auto',
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px'
            }
          }, this.state.error?.stack || 'No stack trace available')
        ])
      ]);
    }

    return this.props.children;
  }
}

// ===== REACT 18 COMPONENTS =====

/**
 * Loading Fallback Component for Suspense
 */
const LoadingFallback = ({ message = 'Loading...' }) => {
  const loadingId = useId();
  
  return React.createElement('div', {
    className: 'loading-fallback',
    'aria-labelledby': loadingId,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontSize: '16px',
      color: '#666'
    }
  }, [
    React.createElement('div', {
      key: 'spinner',
      style: {
        width: '20px',
        height: '20px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '10px'
      }
    }),
    React.createElement('span', { 
      key: 'message',
      id: loadingId 
    }, message)
  ]);
};

// ===== SPECIALIZED COMPONENTS =====

/**
 * Enhanced Feedback Text Component
 * @param {Object} props - Component props
 * @param {Object} props.feedbackText - Feedback text configuration
 */
const FeedbackTextComponent = ({ feedbackText }) => {
  const feedbackId = useId();
  const deferredFeedback = useDeferredValue(feedbackText);
  
  if (!deferredFeedback?.visible) return null;
  
  return React.createElement('div', {
    id: feedbackId,
    'data-element-name': 'container21-textbox',
    className: 'feedback-text-component',
    role: 'alert',
    'aria-live': 'polite',
            style: {
      position: 'absolute',
      left: '37.5%',
      top: '34.38%',
      width: '31.25%',
      height: '31.25%',
      padding: '12px',
      boxSizing: 'border-box',
      backgroundColor: deferredFeedback.backgroundColor || 'transparent',
      color: deferredFeedback.color || 'black',
      border: deferredFeedback.border || 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      zIndex: 'var(--z-content, 1000)',
      transition: 'all 0.3s ease',
      transform: deferredFeedback.visible ? 'scale(1)' : 'scale(0.95)',
      opacity: deferredFeedback.visible ? 1 : 0
    }
  }, deferredFeedback.content);
};

/**
 * Page Indicator Component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 */
const PageIndicatorComponent = ({ currentPage, totalPages }) => {
  const pageIndicatorId = useId();
  
  // Check if page progress indicator should be shown based on APP_CONFIG
  if (typeof window.APP_CONFIG !== 'undefined' && !window.APP_CONFIG.SHOW_PAGE_PROGRESS) {
    return null;
  }
  
  console.log('📄 PageIndicatorComponent rendered');
  
  return React.createElement('div', {
    id: pageIndicatorId,
    className: 'page-indicator math-app-page-indicator',
    'data-element-type': 'page-indicator',
    style: { 
      padding: '10px', 
      textAlign: 'center',
      fontSize: '14px',
      color: '#666'
    }
  }, `Page ${currentPage} of ${totalPages}`);
};

/**
 * Progress Dots Component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Object} props.elementProps - Element properties
 * @param {Function} props.onNavigate - Navigation callback
 */
const ProgressDotsComponent = ({ currentPage, totalPages, elementProps, onNavigate }) => {
  const [isPending, startTransition] = useTransition();
  const progressId = useId();
  
  const handleNavigate = useCallback((pageNumber) => {
    startTransition(() => {
      onNavigate?.(pageNumber);
    });
  }, [onNavigate]);

  const dots = useMemo(() => {
    const dotsArray = [];
    
        for (let i = 1; i <= totalPages; i++) {
          const isActive = i === currentPage;
          
          // Use element props for styling or fallback to defaults
          const dotSize = elementProps?.dotSize || '20gc';
          const activeDotColor = elementProps?.activeDotColor || '#FFAB40';
          const inactiveDotColor = elementProps?.inactiveDotColor || '#888888';
          const activeDotBorder = elementProps?.activeDotBorder || '3px solid #ffffff';
          const inactiveDotBorder = elementProps?.inactiveDotBorder || '3px solid #ffffff';
          
          // Process gc styles if available
          const processedDotSize = typeof GridCellFontUtils !== 'undefined' ? 
            GridCellFontUtils.processGcStyles({ width: dotSize, height: dotSize }) : 
            { width: dotSize, height: dotSize };
          
      dotsArray.push(React.createElement('button', {
            key: `dot-${i}`,
        className: `progress-dot ${isActive ? 'active' : 'inactive'}`,
            'aria-label': `Go to page ${i}`,
            'aria-current': isActive ? 'page' : undefined,
            disabled: isPending,
            style: {
              ...processedDotSize,
              borderRadius: '50%',
              backgroundColor: isActive ? activeDotColor : inactiveDotColor,
              border: isActive ? activeDotBorder : inactiveDotBorder,
              margin: '0 5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: isPending ? 'wait' : 'pointer',
              fontSize: elementProps?.fontSize || '16px',
              fontWeight: elementProps?.fontWeight || 'bold',
              color: elementProps?.color || 'white',
              textAlign: 'center',
              boxSizing: 'border-box',
              opacity: isPending ? 0.7 : 1,
              ...(isActive && elementProps?.activeDotShadow ? {
                boxShadow: elementProps.activeDotShadow
              } : {})
            },
        onClick: () => handleNavigate(i),
            'data-page': i
          }, i.toString()));
        }
        
    return dotsArray;
  }, [currentPage, totalPages, elementProps, handleNavigate, isPending]);
  
  return React.createElement('div', {
    className: 'progress-dots-container',
    role: 'navigation',
    'aria-label': 'Page navigation',
    'aria-describedby': progressId,
          style: {
            display: 'flex',
            flexDirection: elementProps?.flexDirection || 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: elementProps?.gap || '10px',
            padding: elementProps?.padding || '10px'
          }
        }, [
    React.createElement('span', {
      key: 'sr-description',
      id: progressId,
      className: 'sr-only',
      style: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }
    }, `Page ${currentPage} of ${totalPages}`),
    ...dots
  ]);
};

/**
 * Element Renderer Component - Handles different element types
 * @param {Object} props - Component props
 * @param {Object} props.element - Element configuration
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Map} props.tileStyles - Dynamic tile styles
 * @param {Function} props.onNavigate - Navigation callback
 */
const ElementRenderer = ({ element, currentPage, totalPages, tileStyles, onNavigate }) => {
  const renderElement = useCallback(() => {
    try {
      // Validate element
      if (!element || !element.type || !element.name) {
        console.warn('⚠️ Invalid element:', element);
        return null;
      }

      // Calculate coordinates and position
      let coordinates = element.coordinates?.length === 4
        ? element.coordinates
        : [element.coordinates?.[0] || 0, element.coordinates?.[1] || 0, 
           element.coordinates?.[0] || 0, element.coordinates?.[1] || 0];

      // Check if gridPositions is available
      if (typeof gridPositions === 'undefined') {
        console.error('❌ gridPositions not available for element:', element.name);
        return React.createElement('div', { 
          className: 'element-error',
          style: { color: 'red', padding: '10px', border: '1px solid red' } 
        }, `Error: gridPositions not available for ${element.name}`);
      }

      const position = gridPositions.convertToCSS(coordinates, element.name, 'page', 'custom');
      const elementProps = element.props || (typeof element.props === 'function' ? element.props() : {});
      
      // Add onClick handler from element level to elementProps
      if (element.onClick && typeof element.onClick === 'function') {
        elementProps.onClick = element.onClick;
      }
      
      // Process styles from gridpositions.js
      const processedStyles = typeof GridCellFontUtils !== 'undefined' ? 
        GridCellFontUtils.processGcStyles(elementProps) : elementProps;

      // Handle different element types
      switch (element.type) {
        case ELEMENT_TYPES.PROGRESS:
          return React.createElement('div', {
            key: element.name,
            className: `progress-element progress-element-${element.name}`,
            style: {
              position: 'absolute',
              ...position.css,
              zIndex: element.zIndex || 402
            },
            'data-element-name': element.name
          }, React.createElement(ProgressDotsComponent, {
            currentPage,
            totalPages,
            elementProps,
            onNavigate
          }));

        case ELEMENT_TYPES.TABLE:
        return ElementsUtils.createTableElement(currentPage);
      
        case ELEMENT_TYPES.LINE:
        return ElementsUtils.createLineElement(currentPage, element.name, coordinates, elementProps, element.zIndex);
      
        case ELEMENT_TYPES.PARTITIONED_RECTANGLE:
        return ElementsUtils.createPartitionedRectangleElement(currentPage, element.name, coordinates, elementProps, element.zIndex);

        case ELEMENT_TYPES.NUMBER_PAD_PANEL:
        return React.createElement(ElementsUtils.createNumberPadPanelElement, {
          currentPage,
          elementName: element.name,
          coordinates,
          elementProps,
          zIndex: element.zIndex
        });

        default:
          return renderGenericElement(element, position, processedStyles, elementProps, tileStyles);
      }
    } catch (error) {
      console.error('❌ Error rendering element:', element?.name, error);
      return React.createElement('div', {
        className: 'element-render-error',
        style: { color: 'red', fontSize: '12px', padding: '5px' }
      }, `Error: ${element?.name || 'Unknown'}`);
    }
  }, [element, currentPage, totalPages, tileStyles, onNavigate]);

  return renderElement();
};

/**
 * Renders generic elements (textbox, button, container, tile, custom)
 */
const renderGenericElement = (element, position, processedStyles, elementProps, tileStyles) => {
  // Handle text content
  let textContent = null;
  let htmlContent = null;
  if ((element.type === ELEMENT_TYPES.TEXTBOX || element.type === ELEMENT_TYPES.BUTTON) && elementProps?.text) {
    const text = typeof elementProps.text === 'function' ? elementProps.text() : elementProps.text;
    
    // Check if HTML rendering is allowed and content contains HTML tags
    if (elementProps.allowHTML && text && text.includes('<')) {
      htmlContent = { __html: text };
    } else {
      textContent = text;
    }
  }

  // Handle tile content with animations
  let tileContent = null;
  if (element.type === ELEMENT_TYPES.TILE && elementProps) {
    const tileText = typeof elementProps.text === 'function' ? elementProps.text() : (elementProps.text || 'Tile');
        const borderAnimation = elementProps.borderAnimation || 'none';
        
        let animationStyles = {};
    if (borderAnimation === ANIMATION_TYPES.GLOW) {
          animationStyles = {
            animation: 'glow 2s ease-in-out infinite alternate',
            boxShadow: '0 0 10px currentColor'
          };
    } else if (borderAnimation === ANIMATION_TYPES.PULSATE) {
          animationStyles = {
            animation: 'pulsate 1.5s ease-in-out infinite'
          };
    } else if (borderAnimation === ANIMATION_TYPES.PULSATE_GLOW) {
          animationStyles = {
            animation: 'pulsateGlow 2s ease-in-out infinite'
          };
        }
        
        tileContent = React.createElement('div', {
      className: 'tile-content',
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            wordWrap: 'break-word',
            overflow: 'hidden',
            ...animationStyles
          }
        }, tileText);
      }
      
  // Handle button properties
      const buttonProps = {};
  if (element.type === ELEMENT_TYPES.BUTTON && elementProps) {
        if (elementProps.disabled !== undefined) {
      buttonProps.disabled = elementProps.disabled === true;
    }
  }

  // Get dynamic tile styles
  const dynamicTileStyle = tileStyles?.get(element.name) || {};

  // Create element
  const elementType = element.type === ELEMENT_TYPES.BUTTON ? 'button' : 'div';

      // Debug logging for onClick handlers
      if (element.name && (element.name.includes('tile-page2') || element.name.includes('minuend') || element.name.includes('subtrahend') || element.name.includes('answer'))) {
        console.log(`🔍 [ElementRenderer] Rendering ${element.name}:`, {
          type: element.type,
          hasOnClick: typeof elementProps?.onClick === 'function',
          elementProps: elementProps ? Object.keys(elementProps) : 'none',
          cursor: elementProps?.cursor
        });
      }

      // Prepare element properties
      const elementReactProps = {
        key: element.name,
        className: `${element.type}-element ${element.type}-element-${element.name}${processedStyles.className ? ' ' + processedStyles.className : ''}`,
        style: {
          position: 'absolute',
          ...position.css,
          ...processedStyles,
      ...dynamicTileStyle,
          zIndex: element.zIndex || 402,
          // Add pulsate animation if specified
      ...(elementProps?.pulsate ? {
            animation: 'pulsate 1.5s ease-in-out infinite'
          } : {}),
          // Add disabled styling
      ...(elementProps?.disabled === true ? {
            opacity: 0.5,
            cursor: 'not-allowed',
            pointerEvents: 'none'
          } : {})
        },
        'data-element-name': element.name,
        'data-grid-position': element.name,
    onClick: elementProps?.onClick || null,
        ...buttonProps
      };

      // Add HTML content if available
      if (htmlContent) {
        elementReactProps.dangerouslySetInnerHTML = htmlContent;
      }

      return React.createElement(elementType, elementReactProps, htmlContent ? null : (tileContent || textContent));
};

/**
 * Custom Elements Container Component
 * @param {Object} props - Component props
 */
const CustomElementsContainer = ({ currentPage, totalPages, appUpdateTrigger, feedbackText, tileStyles }) => {
  const { navigateToPage } = useAppState();
  
  const elements = useMemo(() => {
    const pageElements = GridPositionPages?.[currentPage];
    if (!pageElements) {
      console.warn('⚠️ No page elements found for page', currentPage);
      return [];
    }

    const supportedTypes = Object.values(ELEMENT_TYPES);
    return filterElementsByType(pageElements, supportedTypes);
  }, [currentPage, appUpdateTrigger]);

  if (elements.length === 0) return null;

  return React.createElement(React.Fragment, {}, [
    ...elements.map(element => 
      React.createElement(ElementRenderer, {
        key: element.name,
        element,
        currentPage,
        totalPages,
        tileStyles,
        onNavigate: navigateToPage
      })
    ),
    React.createElement(FeedbackTextComponent, {
      key: 'feedback-text',
      feedbackText
    })
  ]);
};

// Continue in next part due to length...
// ===== STATE MANAGEMENT PROVIDER =====
/**
 * App State Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
const AppStateProvider = ({ children }) => {
  // Core state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [appUpdateTrigger, setAppUpdateTrigger] = useState(0);
  
  // Page-specific state
  const [questionCompletions, setQuestionCompletions] = useState({
    page1: 0,
    page2: 0
  });
  const [page2completed, setPage2completed] = useState(false);
  const [page2OptionStates, setPage2OptionStates] = useState({});
  const [page2FeedbackText, setPage2FeedbackText] = useState('');
  const [page1Status, setPage1Status] = useState(0);
  
  // UI state
  const [screenSize, setScreenSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const [currentHighlightFocus, setCurrentHighlightFocus] = useState('');
  const [feedbackText, setFeedbackText] = useState({
    content: '',
    backgroundColor: '',
    color: '',
    border: '',
    visible: false
  });
  const [tileStyles, setTileStyles] = useState(new Map());
  const [tableBorders, setTableBorders] = useState(new Map());

  // Computed values
  const availablePages = useMemo(() => getAvailablePages(), []);
  const totalPages = availablePages.length;
  console.log('🔍 [MathApp] Calculated totalPages:', totalPages, 'from availablePages:', availablePages);

  // Actions
  const forceUpdate = useCallback(() => {
    setAppUpdateTrigger(prev => prev + 1);
  }, []);

  const navigateToPage = useCallback((pageNumber) => {
    if (!availablePages.includes(pageNumber)) {
      console.warn(`⚠️ Cannot navigate to page ${pageNumber} - not available`);
      return;
    }

    // Clear visual elements for page 1
    if (pageNumber === 1 && typeof window !== 'undefined') {
      const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
      clearFunctions.forEach(fn => window[fn]?.());
    }
    
    setCurrentPage(pageNumber);
    forceUpdate();

    // Dispatch page change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: pageNumber } }));
    }
    
    console.log(`📄 Navigated to page ${pageNumber}`);
  }, [availablePages, forceUpdate]);

  const resetAllPageStates = useCallback(() => {
    setCurrentHighlightFocus('');
    setPage1Status(0);
    setQuestionCompletions({ page1: 0, page2: 0 });

    // Reset window variables and clear visual states
    if (typeof window !== 'undefined') {
      const questions = window.QUESTIONS || [];
      questions.forEach((question) => {
        question.isPage2Completed = false;
      });

      // Clear stored states for specific elements
      const clearStateFunctions = [
        { fn: 'clearBorderState', target: 'visual-rep-table' },
        { fn: 'clearTextState', target: 'container21-textbox' },
        { fn: 'clearStoredColumnNumbers', target: 'visual-rep-table' },
        { fn: 'clearStoredCellNumbers', target: 'visual-rep-table' }
      ];
      clearStateFunctions.forEach(({ fn, target }) => window[fn]?.(target));
    }
  }, []);

  const handleQuestionChange = useCallback((questionIndex) => {
    // Update window.currentQuestionIndex immediately
    if (typeof window !== 'undefined') {
      window.currentQuestionIndex = questionIndex;
    }
    
    setCurrentQuestionIndex(questionIndex);
    setCurrentHighlightFocus('');
    resetAllPageStates();
    
    // Force PageConfig components to re-evaluate
    if (typeof window !== 'undefined') {
      window.buttonStateUpdateTime = Date.now();
    }
    
    forceUpdate();
    setCurrentPage(1);
    console.log(`🔄 Question changed to: ${questionIndex + 1}`);
  }, [resetAllPageStates, forceUpdate]);

  const updateTileStyle = useCallback((tileId, styles) => {
    setTileStyles(prev => {
      const newStyles = new Map(prev);
      const currentStyle = newStyles.get(tileId) || {};
      newStyles.set(tileId, { ...currentStyle, ...styles });
      return newStyles;
    });
  }, []);

  const clearTileStyle = useCallback((tileId, properties = []) => {
    setTileStyles(prev => {
      const newStyles = new Map(prev);
      if (properties.length === 0) {
        newStyles.delete(tileId);
      } else {
        const currentStyle = newStyles.get(tileId) || {};
        properties.forEach(prop => delete currentStyle[prop]);
        newStyles.set(tileId, currentStyle);
      }
      return newStyles;
    });
  }, []);

  const updateFeedbackText = useCallback((content, backgroundColor = '', color = 'black', border = '2px dashed white') => {
    setFeedbackText({
      content,
      backgroundColor,
      color,
      border,
      visible: content !== ''
    });
  }, []);

  const clearFeedbackText = useCallback(() => {
    setFeedbackText({
      content: '',
      backgroundColor: '',
      color: '',
      border: '',
      visible: false
    });
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    // State
    currentPage,
    availablePages,
    totalPages,
    currentQuestionIndex,
    questionCompletions,
    page2completed,
    page2OptionStates,
    page2FeedbackText,
    page1Status,
    screenSize,
    currentHighlightFocus,
    feedbackText,
    tileStyles,
    tableBorders,
    appUpdateTrigger,

    // Actions
    setCurrentPage,
    setCurrentQuestionIndex,
    setQuestionCompletions,
    setPage2completed,
    setPage2OptionStates,
    setPage2FeedbackText,
    setPage1Status,
    setScreenSize,
    setCurrentHighlightFocus,
    setFeedbackText,
    setTileStyles,
    setTableBorders,
    forceUpdate,
    navigateToPage,
    resetAllPageStates,
    handleQuestionChange,
    updateTileStyle,
    clearTileStyle,
    updateFeedbackText,
    clearFeedbackText
  }), [
    currentPage, availablePages, totalPages, currentQuestionIndex, questionCompletions,
    page2completed, page2OptionStates, page2FeedbackText, page1Status, screenSize,
    currentHighlightFocus, feedbackText, tileStyles, tableBorders, appUpdateTrigger,
    forceUpdate, navigateToPage, resetAllPageStates, handleQuestionChange,
    updateTileStyle, clearTileStyle, updateFeedbackText, clearFeedbackText
  ]);

  return React.createElement(AppStateContext.Provider, {
    value: contextValue
  }, children);
};

// ===== CUSTOM HOOKS =====
/**
 * Hook for window function exposure and event handling
 */
const useWindowIntegration = () => {
  const {
    currentPage,
    availablePages,
    totalPages,
    currentQuestionIndex,
    navigateToPage,
    handleQuestionChange,
    forceUpdate,
    updateTileStyle,
    clearTileStyle,
    page2completed,
    setPage2completed,
    page2OptionStates,
    setPage2OptionStates,
    page2FeedbackText,
    setPage2FeedbackText,
    page1Status,
    setPage1Status,
    setScreenSize
  } = useAppState();

  useEffect(() => {
    // Expose core functions to window
    window.getCurrentPage = () => currentPage;
    window.getAvailablePages = () => availablePages;
    window.getTotalPages = () => totalPages;
    window.navigateToPage = navigateToPage;
    window.changePageAndNotify = navigateToPage; // Alias for compatibility
    window.forceAppUpdate = forceUpdate;
    window.updateTileStyle = updateTileStyle;
    window.clearTileStyle = clearTileStyle;

    // Question management
    window.getCurrentQuestionIndex = () => currentQuestionIndex;
    window.setCurrentQuestionIndex = handleQuestionChange;
    window.nextQuestion = () => {
      const questions = window.QUESTIONS || [];
      if (questions.length > 0 && currentQuestionIndex < questions.length - 1) {
        handleQuestionChange(currentQuestionIndex + 1);
      }
    };
    window.startAgain = () => handleQuestionChange(0);

    // Page-specific state management
    window.page2completed = page2completed;
    window.setPage2completed = setPage2completed;
    window.page2OptionStates = page2OptionStates;
    window.setPage2OptionStates = setPage2OptionStates;
    window.page2FeedbackText = page2FeedbackText;
    window.setPage2FeedbackText = setPage2FeedbackText;
    window.page1Status = page1Status;
    window.setPage1Status = setPage1Status;

    // Resize handler
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up window functions
      const functionsToClean = [
        'getCurrentPage', 'getAvailablePages', 'getTotalPages', 'navigateToPage', 'changePageAndNotify',
        'forceAppUpdate', 'updateTileStyle', 'clearTileStyle', 'getCurrentQuestionIndex',
        'setCurrentQuestionIndex', 'nextQuestion', 'startAgain', 'page2completed',
        'setPage2completed', 'page2OptionStates', 'setPage2OptionStates',
        'page2FeedbackText', 'setPage2FeedbackText', 'page1Status', 'setPage1Status'
      ];
      
      functionsToClean.forEach(fn => delete window[fn]);
    };
  }, [
    currentPage, availablePages, totalPages, currentQuestionIndex, navigateToPage,
    handleQuestionChange, forceUpdate, updateTileStyle, clearTileStyle,
    page2completed, setPage2completed, page2OptionStates, setPage2OptionStates,
    page2FeedbackText, setPage2FeedbackText, page1Status, setPage1Status, setScreenSize
  ]);
};

/**
 * Hook for keyboard navigation
 */
const useKeyboardNavigation = () => {
  const { navigateToPage } = useAppState();

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyCode = event.keyCode || event.which;
      const keyString = String.fromCharCode(keyCode);
      
      if (/^[1-9]$/.test(keyString)) {
        const pageNumber = parseInt(keyString);
        
        if (window.GridPositionPages && window.GridPositionPages[pageNumber]) {
          navigateToPage(pageNumber);
          console.log(`⌨️ Navigated to page ${pageNumber} via keyboard`);
          } else {
          console.warn(`⌨️ Page ${pageNumber} does not exist`);
        }
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    console.log('⌨️ Keyboard navigation enabled');
    
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
      console.log('⌨️ Keyboard navigation disabled');
    };
  }, [navigateToPage]);
};

// ===== MAIN APP COMPONENT =====
/**
 * Main Math Learning App Component
 */
const MathLearningApp = () => {
  // Validate dependencies
  const dependencyCheck = useMemo(() => validateDependencies(), []);
  
  if (!dependencyCheck.isValid) {
    return React.createElement('div', {
      className: 'dependency-error',
      style: {
        width: '100vw',
        height: '100vh',
        background: '#fff3e0',
        color: '#e65100',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }, [
      React.createElement('h1', { key: 'title' }, '⚠️ Missing Dependencies'),
      React.createElement('p', { key: 'message' }, 'The following required dependencies are missing:'),
      React.createElement('ul', { key: 'list' }, 
        dependencyCheck.missing.map(dep => 
          React.createElement('li', { key: dep }, dep)
        )
      )
    ]);
  }

  return React.createElement(AppStateProvider, {}, 
    React.createElement(MathLearningAppContent, {})
  );
};

/**
 * Main App Content Component (wrapped by state provider)
 */
const MathLearningAppContent = () => {
  const {
    currentPage,
    totalPages,
    appUpdateTrigger,
    feedbackText,
    tileStyles
  } = useAppState();

  // Initialize hooks
  useWindowIntegration();
  useKeyboardNavigation();
  
  // CRITICAL: Call usePageConfig hook to initialize window functions
  // This needs to be called directly as a hook
  React.useEffect(() => {
    console.log('🔄 [MathApp] Checking for PageConfig initialization...');
    
    // Check if functions are already available
    if (typeof window.advanceToNextQuestion === 'function') {
      console.log('✅ [MathApp] advanceToNextQuestion already available');
    } else {
      console.warn('⚠️ [MathApp] advanceToNextQuestion not available - PageConfig hook may not have run');
    }
    
    if (typeof window.updateQuestionDependentElements === 'function') {
      console.log('✅ [MathApp] updateQuestionDependentElements already available');
    } else {
      console.warn('⚠️ [MathApp] updateQuestionDependentElements not available - PageConfig hook may not have run');
    }
  }, []);

  // Create components
  const components = useMemo(() => {
    const componentList = [];
    
    try {
      componentList.push(React.createElement(PageIndicatorComponent, {
        key: 'page-indicator',
        currentPage,
        totalPages
      }));
  } catch (error) {
      console.error('❌ PageIndicatorComponent failed:', error);
    }
    
    try {
      componentList.push(React.createElement(CustomElementsContainer, {
        key: 'custom-elements',
        currentPage,
        totalPages,
        appUpdateTrigger,
        feedbackText,
        tileStyles
      }));
  } catch (error) {
      console.error('❌ CustomElementsContainer failed:', error);
  }

    return componentList;
  }, [currentPage, totalPages, appUpdateTrigger, feedbackText, tileStyles]);
  
    return React.createElement('div', {
      className: 'main-container math-app-container',
      style: {
        width: '100vw',
        height: '100vh',
      backgroundColor: 'var(--background-color, #f5f5f5)',
        position: 'relative',
      overflow: 'hidden'
      }
    }, [
    // CSS Animations
      React.createElement('style', {
      key: 'animations',
        dangerouslySetInnerHTML: {
          __html: `
            @keyframes glow {
              from { box-shadow: 0 0 5px currentColor; }
              to { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
            }
            @keyframes pulsate {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes pulsateGlow {
              0% { transform: scale(1); box-shadow: 0 0 5px currentColor; }
              50% { transform: scale(1.05); box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
              100% { transform: scale(1); box-shadow: 0 0 5px currentColor; }
            }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .math-app-pulse-animation {
            animation: pulsate 1.5s ease-in-out infinite;
          }
          .feedback-text-component {
            transition: all 0.3s ease;
          }
          .progress-dot {
            transition: all 0.3s ease;
          }
          .progress-dot:hover {
            transform: scale(1.1);
          }
          .progress-dot:focus {
            outline: 2px solid #1976d2;
            outline-offset: 2px;
          }
          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
            }
          `
        }
      }),
      ...components
    ]);
};

// ===== APP INITIALIZATION =====
/**
 * Initialize the Math Learning App
 */
const initializeMathApp = () => {
  const root = document.getElementById('react-root');
  
  if (!root) {
    console.error('❌ React root element not found');
    return;
  }

  if (!ReactDOM) {
    console.error('❌ ReactDOM not available');
    return;
  }

  try {
    const reactRoot = ReactDOM.createRoot(root);
    
    // Render app with error boundary
    reactRoot.render(
      React.createElement(ErrorBoundary, {},
        React.createElement(MathLearningApp, {})
      )
    );
    
    console.log('✅ Math Learning App initialized successfully');
    } catch (error) {
    console.error('❌ Error during React initialization:', error);
    }
};

// Enhanced initialization with React 18 features
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMathApp);
  } else {
  // Use React 18's automatic batching for initialization
  if (typeof startTransition !== 'undefined') {
    startTransition(() => {
      initializeMathApp();
    });
  } else {
    initializeMathApp();
  }
}

// Expose React 18 features for debugging
if (typeof window !== 'undefined') {
  window.React18Features = {
    startTransition: typeof startTransition !== 'undefined' ? startTransition : null,
    useDeferredValue: typeof useDeferredValue !== 'undefined' ? useDeferredValue : null,
    useTransition: typeof useTransition !== 'undefined' ? useTransition : null,
    useId: typeof useId !== 'undefined' ? useId : null,
    Suspense: typeof Suspense !== 'undefined' ? Suspense : null
  };
}
