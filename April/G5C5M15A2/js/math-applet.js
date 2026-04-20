/**
 * Math Learning Applet - Simplified Architecture
 * 
 * This simplified version provides:
 * - Modular component structure
 * - Simplified state management
 * - Error handling
 * - Performance optimizations
 */

const { 
  useState, useEffect, useCallback, useMemo, useContext, createContext,
  useId, useDeferredValue, useTransition, startTransition
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
    // Check if this is a React removeChild error (common during page transitions)
    // These are usually harmless cleanup issues and shouldn't reset the page
    const isRemoveChildError = error?.message?.includes('removeChild') || 
                              error?.name === 'NotFoundError' ||
                              error?.stack?.includes('removeChild');
    
    if (isRemoveChildError) {
      // Log but don't reset the page for removeChild errors
      console.warn('⚠️ [ErrorBoundary] Caught removeChild error (likely harmless cleanup issue):', error.message);
      // Don't set error state, allowing the app to continue
      return;
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('❌ [ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return React.createElement('div', { 
        className: 'error-boundary'
      }, [
        React.createElement('h1', { key: 'title' }, '⚠️ Something went wrong'),
        React.createElement('p', { key: 'message' }, this.state.error?.message || 'An unexpected error occurred'),
        React.createElement('details', { 
          key: 'details'
        }, [
          React.createElement('summary', { key: 'summary' }, 'Error Details'),
          React.createElement('pre', { 
            key: 'stack'
          }, this.state.error?.stack || 'No stack trace available')
        ])
      ]);
    }

    return this.props.children;
  }
}

// ===== REACT 18 COMPONENTS =====


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
      backgroundColor: deferredFeedback.backgroundColor || 'transparent',
      color: deferredFeedback.color || 'black',
      border: deferredFeedback.border || 'none',
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
    'data-element-type': 'page-indicator'
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
// ProgressDotsComponent is now imported from progress-components.js
// Use it directly from window.ProgressComponents.ProgressDotsComponent

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
  const [page5RenderTick, setPage5RenderTick] = React.useState(0);
  React.useEffect(() => {
    if (
      currentPage !== 5 &&
      currentPage !== 8 &&
      currentPage !== 9 &&
      currentPage !== 10 &&
      currentPage !== 11 &&
      currentPage !== 12 &&
      currentPage !== 13 &&
      currentPage !== 14 &&
      currentPage !== 15 &&
      currentPage !== 16 &&
      currentPage !== 17 &&
      currentPage !== 18
    )
      return undefined;
    const bump = () => setPage5RenderTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('page18InteractionStateChange', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('page18InteractionStateChange', bump);
    };
  }, [currentPage]);

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
          className: 'element-error'
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
              ...position.css,
              zIndex: element.zIndex || 402
            },
            'data-element-name': element.name
          }, React.createElement(window.ProgressComponents?.ProgressDotsComponent, {
            currentPage,
            totalPages,
            ...elementProps,
            ...processedStyles,
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

        case 'custom':
          // Add coordinates to position object for components that need them (e.g., FillBlanksComponent)
          const positionWithCoords = {
            ...position,
            coordinates: coordinates
          };
          return React.createElement(ElementsUtils.createCustomElement, {
            key: element.name,
            ...elementProps,
            id: element.id, // Pass element id to components
            elementName: element.name, // Pass element name for unique cell IDs (e.g., "page2-map-table")
            position: positionWithCoords,
            processedStyles: processedStyles,
            elementZIndex: element.zIndex || 402
          });

        case ELEMENT_TYPES.BUTTON:
          // Use specialized button components for next/previous buttons
          if (element.name === 'next-button' || element.name === 'next-button-page2') {
            return React.createElement(window.InteractionComponents?.NextButtonComponent, {
              key: element.name,
              ...elementProps,
              id: element.id,
              // Pass positioning and styling through props
              position: position,
              processedStyles: processedStyles,
              elementZIndex: element.zIndex || 402
            });
          } else if (element.name === 'previous-button' || element.name === 'previous-button-page2') {
            return React.createElement(window.InteractionComponents?.PreviousButtonComponent, {
              key: element.name,
              ...elementProps,
              id: element.id,
              // Pass positioning and styling through props
              position: position,
              processedStyles: processedStyles,
              elementZIndex: element.zIndex || 402
            });
          }
          // Fall through to generic element renderer for other buttons
          return renderGenericElement(element, position, processedStyles, elementProps, tileStyles);

        default:
          return renderGenericElement(element, position, processedStyles, elementProps, tileStyles);
      }
    } catch (error) {
      console.error('❌ Error rendering element:', element?.name, error);
      return React.createElement('div', {
        className: 'element-render-error'
      }, `Error: ${element?.name || 'Unknown'}`);
    }
  }, [element, currentPage, totalPages, tileStyles, onNavigate, page5RenderTick]);

  return renderElement();
};

/**
 * Renders generic elements (textbox, button, container, tile, custom)
 */
const renderGenericElement = (element, position, processedStyles, elementProps, tileStyles) => {
  // Handle text content
  let textContent = null;
  let htmlContent = null;
  if ((element.type === ELEMENT_TYPES.TEXTBOX || element.type === ELEMENT_TYPES.BUTTON || element.type === ELEMENT_TYPES.CONTAINER) && elementProps?.text) {
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
      className: `tile-content ${borderAnimation === ANIMATION_TYPES.GLOW ? 'glow' : ''} ${borderAnimation === ANIMATION_TYPES.PULSATE ? 'pulsate' : ''} ${borderAnimation === ANIMATION_TYPES.PULSATE_GLOW ? 'pulsate-glow' : ''}`,
          style: animationStyles
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

  const page5St =
    typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
  const parcelHideSt =
    element.id && String(element.id).startsWith('page8-')
      ? typeof window !== 'undefined'
        ? window.page8InteractionState || 'default'
        : 'default'
      : element.id && String(element.id).startsWith('page13-')
        ? typeof window !== 'undefined'
          ? window.page13InteractionState || 'default'
          : 'default'
      : element.id && String(element.id).startsWith('page12-')
        ? typeof window !== 'undefined'
          ? window.page12InteractionState || 'default'
          : 'default'
      : element.id && String(element.id).startsWith('page11-')
        ? typeof window !== 'undefined'
          ? window.page11InteractionState || 'default'
          : 'default'
      : element.id &&
          (String(element.id).startsWith('page9-') ||
            String(element.id).startsWith('page10-') ||
            String(element.id).startsWith('page14-') ||
            String(element.id).startsWith('page15-') ||
            String(element.id).startsWith('page16-'))
        ? typeof window !== 'undefined'
          ? window.page9InteractionState || 'default'
          : 'default'
        : page5St;
  const hidePage5Container =
    element.type === ELEMENT_TYPES.CONTAINER &&
    ((Array.isArray(elementProps?.hideInPage5InteractionStates) &&
        elementProps.hideInPage5InteractionStates.includes(parcelHideSt)) ||
        (Array.isArray(elementProps?.hideInPage8InteractionStates) &&
          elementProps.hideInPage8InteractionStates.includes(parcelHideSt)) ||
        (Array.isArray(elementProps?.hideInPage9InteractionStates) &&
          elementProps.hideInPage9InteractionStates.includes(parcelHideSt)) ||
        (Array.isArray(elementProps?.hideInPage11InteractionStates) &&
          elementProps.hideInPage11InteractionStates.includes(parcelHideSt)) ||
        (Array.isArray(elementProps?.hideInPage12InteractionStates) &&
          elementProps.hideInPage12InteractionStates.includes(parcelHideSt)) ||
        (Array.isArray(elementProps?.hideInPage13InteractionStates) &&
          elementProps.hideInPage13InteractionStates.includes(parcelHideSt)));

  // Check if this is an applet button (3-layer system)
  const isAppletButton = element.type === ELEMENT_TYPES.BUTTON && 
    (elementProps?.className === 'applet-button' || 
     elementProps?.frameClassName === 'applet-button-frame' || 
     elementProps?.contentClassName === 'applet-button-content');

  if (isAppletButton) {
    // Three-layer button structure
    const frameGapPx = elementProps.frameGap ? 
      (typeof elementProps.frameGap === 'string' && elementProps.frameGap.includes('gc') ? 
        elementProps.frameGap : '5px') : '5px';
    
    return React.createElement('div', {
      key: element.name,
      className: `applet-button-container ${element.name}-container${elementProps?.pulsate ? ' pulsate' : ''}${elementProps?.disabled === true ? ' disabled' : ''}`,
      style: {
        ...position.css,
        ...processedStyles,
        ...dynamicTileStyle,
        zIndex: element.zIndex || 402
      },
      'data-element-name': element.name,
      'data-grid-position': element.name,
      onClick: elementProps?.onClick || null
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: `applet-button-frame ${element.name}-frame`,
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
        className: `applet-button-content ${element.name}-content`,
        style: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, textContent || htmlContent)
    ]);
  }

  // Create element for non-applet buttons
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

      // Handle container with image
      let imageContent = null;
      if (element.type === ELEMENT_TYPES.CONTAINER && elementProps?.imageSrc) {
        const qtyImgName = String(element.name || element.id || '');
        const page910BiscuitQtyScale =
          /page9-quantity-icon-biscuit|page10-quantity-icon-biscuit|page14-quantity-icon-biscuit|page15-quantity-icon-biscuit|page16-quantity-icon-biscuit|page11-quantity-icon-biscuit|page12-quantity-icon-biscuit|page13-quantity-icon-biscuit/.test(
            qtyImgName
          )
            ? 1.15
            : 1;
        imageContent = React.createElement('img', {
          key: 'container-image',
          src: elementProps.imageSrc,
          alt: elementProps.imageAlt || '',
          style: {
            width: page910BiscuitQtyScale > 1 ? `${100 * page910BiscuitQtyScale}%` : '100%',
            height: page910BiscuitQtyScale > 1 ? `${100 * page910BiscuitQtyScale}%` : '100%',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0
          }
        });
      }

      // Prepare element properties
      // Check if container needs flex layout (for images or explicit flex props)
      const hasImageSrc = elementProps?.imageSrc;
      const hasFlexDisplay = elementProps?.display === 'flex' || processedStyles?.display === 'flex';
      const needsFlexLayout = hasImageSrc || 
        (element.type === ELEMENT_TYPES.CONTAINER && hasFlexDisplay);
      
      const elementReactProps = {
        key: element.name,
        className: `${element.type}-element ${element.type}-element-${element.name}${processedStyles.className ? ' ' + processedStyles.className : ''}${elementProps?.pulsate ? ' pulsate' : ''}${elementProps?.disabled === true ? ' disabled' : ''}`,
        style: {
          ...position.css,
          ...processedStyles,
          ...dynamicTileStyle,
          zIndex: element.zIndex || 402,
          // Apply flex layout if needed (for images or explicit flex props)
          // Ensure flex properties are applied even if processedStyles has them
          ...(needsFlexLayout && !hidePage5Container
            ? {
                display: 'flex',
                alignItems: processedStyles?.alignItems || elementProps?.alignItems || 'center',
                justifyContent:
                  processedStyles?.justifyContent || elementProps?.justifyContent || 'center'
              }
            : {}),
          ...(hidePage5Container ? { display: 'none', visibility: 'hidden' } : {})
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

      // Determine children content
      let childrenContent = null;
      if (htmlContent) {
        childrenContent = null; // HTML content uses dangerouslySetInnerHTML
      } else if (imageContent) {
        childrenContent = imageContent;
      } else {
        childrenContent = tileContent || textContent;
      }

      return React.createElement(elementType, elementReactProps, childrenContent);
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
        // Unique per DOM element — shared names like "next-button" would otherwise reuse
        // React state across pages (wrong Next disabled/enabled after prev/next).
        key: element.id || `${currentPage}-${element.name}`,
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
  // Get starting page from APP_CONFIG or default to 1
  const getInitialPage = () => {
    if (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.START_PAGE) {
      const startPage = parseInt(window.APP_CONFIG.START_PAGE, 10);
      if (!isNaN(startPage) && startPage > 0) {
        console.log(`🚀 Starting app on page ${startPage} (from APP_CONFIG.START_PAGE)`);
        return startPage;
      } else {
        console.log(`⚠️ APP_CONFIG.START_PAGE is not a valid page number, defaulting to page 1`);
      }
    }
    return 1;
  };
  
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [appUpdateTrigger, setAppUpdateTrigger] = useState(0);
  
  // Page-specific state removed - simplified to basic page navigation only
  
  // UI state
  const [screenSize, setScreenSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  // Simplified interaction model
  const [feedbackText, setFeedbackText] = useState({
    content: '',
    backgroundColor: '',
    color: '',
    border: '',
    visible: false
  });
  const [tileStyles, setTileStyles] = useState(new Map());

  // PageConfig defaults page9 packing to state-4-def. Opening directly on page 10 (START_PAGE) still needs packets.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.APP_CONFIG && window.APP_CONFIG.START_PAGE;
    const sp = raw != null && raw !== '' ? parseInt(String(raw), 10) : NaN;
    if (sp === 10 && !Number.isNaN(sp)) {
      window.page9InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 11 && !Number.isNaN(sp)) {
      window.page11InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 12 && !Number.isNaN(sp)) {
      window.page12InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 13 && !Number.isNaN(sp)) {
      window.page13InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 14 && !Number.isNaN(sp)) {
      window.page9InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 15 && !Number.isNaN(sp)) {
      window.page9InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 16 && !Number.isNaN(sp)) {
      window.page9InteractionState = 'state-4-packets';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
      );
    }
    if (sp === 17 && !Number.isNaN(sp)) {
      window.page9InteractionState = 'state-6-def';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def' } })
      );
    }
  }, []);

  // Page 17 uses container 6 only: if global packing was left on axes 1–4 (e.g. PageConfig init), snap to state-6-def.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentPage !== 17) return;
    const st = window.page9InteractionState || 'default';
    if (
      st === 'default' ||
      st.startsWith('state-1') ||
      st.startsWith('state-2') ||
      st.startsWith('state-3') ||
      st.startsWith('state-4')
    ) {
      const from = st;
      window.page9InteractionState = 'state-6-def';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def', from } })
      );
    }
  }, [currentPage]);

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

    // Clear visual elements and all component states when navigating to page 1 (reset)
    if (pageNumber === 1 && typeof window !== 'undefined') {
      const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
      clearFunctions.forEach(fn => window[fn]?.());
      
      // Clear all component state stores on reset
      if (window.fillBlanksStateStore) {
        window.fillBlanksStateStore = {};
        console.log('🔄 [Navigate] Cleared fillBlanksStateStore on reset');
      }
      if (window.arrangeStepsStateStore) {
        window.arrangeStepsStateStore = {};
        console.log('🔄 [Navigate] Cleared arrangeStepsStateStore on reset');
      }
      if (window.calculationStepsStateStore) {
        window.calculationStepsStateStore = {};
        console.log('🔄 [Navigate] Cleared calculationStepsStateStore on reset');
      }
      if (window.quizPanelStateStore) {
        window.quizPanelStateStore = {};
        console.log('🔄 [Navigate] Cleared quizPanelStateStore on reset');
      }
      window.__page2InformationAnalysisSnapshot = null;
      console.log('🔄 [Navigate] Cleared page 2 information-analysis snapshot on reset');
      
      // Clear page completion states
      if (window.PageCompletionManager) {
        window.PageCompletionManager.init();
        if (window.pageCompletionState) {
          Object.keys(window.pageCompletionState).forEach(key => {
            delete window.pageCompletionState[key];
          });
          console.log('🔄 [Navigate] Cleared all page completion states on reset');
        }
      }
      
      // Clear any page-specific feedback states
      Object.keys(window).forEach(key => {
        if (key.includes('FillBlanksState') || key.includes('FeedbackState')) {
          delete window[key];
        }
      });
      console.log('🔄 [Navigate] Cleared page-specific feedback states on reset');

      // Reset interaction globals to cold-start defaults (Start Over / return to page 1)
      window.page5InteractionState = 'default';
      window.dispatchEvent(
        new CustomEvent('page5InteractionStateChange', { detail: { state: 'default' } })
      );
      window.page8InteractionState = 'state-3-def';
      window.dispatchEvent(
        new CustomEvent('page8InteractionStateChange', { detail: { state: 'state-3-def' } })
      );
      const resetStartRaw =
        typeof window.APP_CONFIG !== 'undefined' && window.APP_CONFIG != null
          ? window.APP_CONFIG.START_PAGE
          : null;
      const resetStartNum =
        resetStartRaw != null && resetStartRaw !== '' ? parseInt(String(resetStartRaw), 10) : NaN;
      if (resetStartNum === 17 && !Number.isNaN(resetStartNum)) {
        window.page9InteractionState = 'state-6-def';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def' } })
        );
      } else {
        window.page9InteractionState = 'state-4-def';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def' } })
        );
      }
      window.page11InteractionState = 'state-4-def';
      window.dispatchEvent(
        new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-4-def' } })
      );
      window.page12InteractionState = 'state-4-def';
      window.dispatchEvent(
        new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-4-def' } })
      );
      window.page13InteractionState = 'state-4-def';
      window.dispatchEvent(
        new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-4-def' } })
      );
      window.page18InteractionState = 'state-18-def';
      window.dispatchEvent(
        new CustomEvent('page18InteractionStateChange', { detail: { state: 'state-18-def' } })
      );
      window.fractionConversionDisabled = false;
      window.lcmInputDisabled = false;
      window.currentQuestionIndex = 0;
      window.page1complete = false;
      window.objectsremoved = 0;
      console.log('🔄 [Navigate] Reset all interaction states and session globals for page 1');
    }
    
    // Reset number pad disabled flags when navigating to a new page
    if (typeof window !== 'undefined') {
      // Only reset if navigating to a page that uses number pads
      if (pageNumber === 15 || pageNumber === 16 || pageNumber === 17 || pageNumber === 18 || pageNumber === 19) {
        window.fractionConversionDisabled = false;
        window.lcmInputDisabled = false;
        console.log(`🔄 [Navigate] Reset number pad disabled flags for page ${pageNumber}`);
      }
      // Page 5: only reset if returning fresh (not completed before)
      if (pageNumber === 5) {
        const p5AlreadyDone = window.page5InteractionState === 'state-2-packets';
        if (!p5AlreadyDone) {
          window.page5InteractionState = 'default';
          window.dispatchEvent(
            new CustomEvent('page5InteractionStateChange', { detail: { state: 'default' } })
          );
          if (window.PageCompletionManager) {
            window.PageCompletionManager.setPageCompleted(5, false);
          }
        } else {
          // Re-dispatch current state so UI syncs (tap-gif hide, Next enabled)
          window.dispatchEvent(
            new CustomEvent('page5InteractionStateChange', { detail: { state: window.page5InteractionState } })
          );
        }
      }
      // Page 8: only reset if returning fresh
      if (pageNumber === 8) {
        const p8AlreadyDone = window.page8InteractionState === 'state-3-packets';
        if (!p8AlreadyDone) {
          window.page8InteractionState = 'state-3-def';
          window.dispatchEvent(
            new CustomEvent('page8InteractionStateChange', { detail: { state: 'state-3-def' } })
          );
          if (window.PageCompletionManager) {
            window.PageCompletionManager.setPageCompleted(8, false);
          }
        } else {
          window.dispatchEvent(
            new CustomEvent('page8InteractionStateChange', { detail: { state: window.page8InteractionState } })
          );
        }
      }
      // Page 9: only reset if returning fresh
      if (pageNumber === 9) {
        const p9AlreadyDone = window.page9InteractionState === 'state-4-packets';
        if (!p9AlreadyDone) {
          window.page9InteractionState = 'state-4-def';
          window.dispatchEvent(
            new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def' } })
          );
          if (window.PageCompletionManager) {
            window.PageCompletionManager.setPageCompleted(9, false);
          }
        } else {
          window.dispatchEvent(
            new CustomEvent('page9InteractionStateChange', { detail: { state: window.page9InteractionState } })
          );
        }
      }
      if (pageNumber === 10) {
        window.page9InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      if (pageNumber === 14) {
        // Match page 11 on navigate: fully progressed packing (state-4-packets), not state-4-def
        window.page9InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      if (pageNumber === 15) {
        window.page9InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      if (pageNumber === 16) {
        window.page9InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      // Page 17: only reset if returning fresh
      if (pageNumber === 17) {
        const p17AlreadyDone = window.page9InteractionState === 'state-6-packets';
        if (!p17AlreadyDone) {
          window.page9InteractionState = 'state-6-def';
          window.dispatchEvent(
            new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def' } })
          );
          if (window.PageCompletionManager) {
            window.PageCompletionManager.setPageCompleted(17, false);
          }
        } else {
          window.dispatchEvent(
            new CustomEvent('page9InteractionStateChange', { detail: { state: window.page9InteractionState } })
          );
        }
      }
      // Page 18: only reset if returning fresh
      if (pageNumber === 18) {
        const p18AlreadyDone = window.page18InteractionState === 'state-18-max';
        if (!p18AlreadyDone) {
          window.page18InteractionState = 'state-18-def';
          window.dispatchEvent(
            new CustomEvent('page18InteractionStateChange', { detail: { state: 'state-18-def' } })
          );
        } else {
          window.dispatchEvent(
            new CustomEvent('page18InteractionStateChange', { detail: { state: window.page18InteractionState } })
          );
        }
      }
      if (pageNumber === 11) {
        window.page11InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      if (pageNumber === 12) {
        window.page12InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
      if (pageNumber === 13) {
        window.page13InteractionState = 'state-4-packets';
        window.dispatchEvent(
          new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-4-packets' } })
        );
      }
    }
    
    setCurrentPage(pageNumber);
    forceUpdate();

    // Initialize page completion state for the new page
    if (typeof window !== 'undefined' && window.PageCompletionManager) {
      // Use setTimeout to ensure DOM is ready for quiz detection
      setTimeout(() => {
        window.PageCompletionManager.initializePage(pageNumber);
      }, 100);
    }

    // Dispatch page change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: pageNumber } }));
    }
    
    console.log(`📄 Navigated to page ${pageNumber}`);
  }, [availablePages, forceUpdate]);

  const resetAllPageStates = useCallback(() => {
    // Simplified reset - just clear visual states
    if (typeof window !== 'undefined') {
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
    screenSize,
    feedbackText,
    tileStyles,
    appUpdateTrigger,

    // Actions
    setCurrentPage,
    setScreenSize,
    setFeedbackText,
    setTileStyles,
    forceUpdate,
    navigateToPage,
    resetAllPageStates,
    updateTileStyle,
    clearTileStyle,
    updateFeedbackText,
    clearFeedbackText
  }), [
    currentPage, availablePages, totalPages, screenSize,
    feedbackText, tileStyles, appUpdateTrigger,
    forceUpdate, navigateToPage, resetAllPageStates,
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
    navigateToPage,
    forceUpdate,
    updateTileStyle,
    clearTileStyle,
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

    // Listen for quizCompleted events and mark page as completed
    const handleQuizCompleted = (event) => {
      const pageNumber = event.detail?.pageNumber ?? currentPage;
      if (pageNumber === 11) return;
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(pageNumber);
      }
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);

    // Page 5: interaction “quiz” completes at two-parcel flow end (state-2-packets); third axis lives on page 8.
    const handlePage5InteractionStateChange = (event) => {
      if (event.detail?.state !== 'state-2-packets') return;
      window.dispatchEvent(
        new CustomEvent('quizCompleted', {
          detail: { pageNumber: 5, quizId: 'page5-interaction-quiz' }
        })
      );
    };
    window.addEventListener('page5InteractionStateChange', handlePage5InteractionStateChange);

    const handlePage8InteractionStateChange = (event) => {
      if (event.detail?.state !== 'state-3-packets') return;
      window.dispatchEvent(
        new CustomEvent('quizCompleted', {
          detail: { pageNumber: 8, quizId: 'page8-interaction-quiz' }
        })
      );
    };
    window.addEventListener('page8InteractionStateChange', handlePage8InteractionStateChange);

    const handlePage9InteractionStateChange = (event) => {
      if (event.detail?.state === 'state-4-packets') {
        window.dispatchEvent(
          new CustomEvent('quizCompleted', {
            detail: { pageNumber: 9, quizId: 'page9-interaction-quiz' }
          })
        );
      }
      if (event.detail?.state === 'state-6-packets') {
        window.dispatchEvent(
          new CustomEvent('quizCompleted', {
            detail: { pageNumber: 17, quizId: 'page17-interaction-quiz' }
          })
        );
      }
    };
    window.addEventListener('page9InteractionStateChange', handlePage9InteractionStateChange);

    // Initialize completion state for current page
    if (window.PageCompletionManager) {
      setTimeout(() => {
        window.PageCompletionManager.initializePage(currentPage);
      }, 100);
    }

    // Simplified question management - no longer needed since we have one static question

    // Simplified state management

    // Resize handler
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('quizCompleted', handleQuizCompleted);
      window.removeEventListener('page5InteractionStateChange', handlePage5InteractionStateChange);
      window.removeEventListener('page8InteractionStateChange', handlePage8InteractionStateChange);
      window.removeEventListener('page9InteractionStateChange', handlePage9InteractionStateChange);
      
      // Clean up window functions
      const functionsToClean = [
        'getCurrentPage', 'getAvailablePages', 'getTotalPages', 'navigateToPage', 'changePageAndNotify',
        'forceAppUpdate', 'updateTileStyle', 'clearTileStyle'
      ];
      
      functionsToClean.forEach(fn => delete window[fn]);
    };
  }, [
    currentPage, availablePages, totalPages, navigateToPage,
    forceUpdate, updateTileStyle, clearTileStyle, setScreenSize
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
        // Check if we're on a page with an active numberpad that should handle the key
        const currentPage = typeof window !== 'undefined' ? window.getCurrentPage?.() : 1;
        const hasActiveNumberPad = currentPage === 2;
        
        if (hasActiveNumberPad) {
          // Don't handle navigation on pages with active numberpads
          // Let the numberpad handle the key press instead
          console.log(`⌨️ Keyboard navigation: Key ${keyString} ignored on page ${currentPage} (active numberpad)`);
          return;
        }
        
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
      className: 'dependency-error'
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
  
  // PageConfig is automatically initialized when the script loads

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
      className: 'main-container math-app-container'
    }, [
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
    useId: typeof useId !== 'undefined' ? useId : null
  };
}
  