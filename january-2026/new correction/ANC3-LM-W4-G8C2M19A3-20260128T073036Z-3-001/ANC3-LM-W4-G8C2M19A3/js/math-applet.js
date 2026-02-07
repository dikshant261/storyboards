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
    // Check if this is a removeChild error - don't set error state for these
    const isRemoveChildError = error?.message?.includes('removeChild') || 
                              error?.message?.includes('not a child') ||
                              error?.name === 'NotFoundError' ||
                              error?.stack?.includes('removeChild') ||
                              error?.stack?.includes('commitDeletionEffects');
    
    // For removeChild errors, don't set error state (return null)
    // This prevents the error UI from showing
    if (isRemoveChildError) {
      return null; // Don't set error state
    }
    
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Check if this is a React removeChild error (common during page transitions)
    // These are usually harmless cleanup issues and shouldn't reset the page
    const isRemoveChildError = error?.message?.includes('removeChild') || 
                              error?.message?.includes('not a child') ||
                              error?.name === 'NotFoundError' ||
                              error?.stack?.includes('removeChild') ||
                              error?.stack?.includes('commitDeletionEffects');
    
    if (isRemoveChildError) {
      // Silently suppress removeChild errors - they're harmless during page transitions
      // React is trying to clean up elements that have already been removed
      // This is expected behavior when we clean up dynamically created elements
      // Don't update state, just return to prevent error UI
      return;
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('❌ [ErrorBoundary] Caught error:', error, errorInfo);
  }
  
  render() {
    // Check if error is a removeChild error - if so, don't show error UI
    if (this.state.hasError && this.state.error) {
      const isRemoveChildError = this.state.error?.message?.includes('removeChild') || 
                                this.state.error?.message?.includes('not a child') ||
                                this.state.error?.name === 'NotFoundError' ||
                                this.state.error?.stack?.includes('removeChild') ||
                                this.state.error?.stack?.includes('commitDeletionEffects');
      
      if (isRemoveChildError) {
        // For removeChild errors, just render children normally
        // This prevents the error UI from showing
        return this.props.children;
      }
    }
    
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
      // Extract props - handle both object and function cases
      let elementProps = {};
      if (element.props) {
        if (typeof element.props === 'function') {
          elementProps = element.props();
        } else {
          // For objects with getters, we need to access all properties
          elementProps = { ...element.props };
          // Also copy any non-enumerable properties that might be getters
          Object.keys(element.props).forEach(key => {
            if (!(key in elementProps)) {
              try {
                elementProps[key] = element.props[key];
              } catch (e) {
                // Ignore getter errors
              }
            }
          });
        }
      }
      
      // Add onClick handler from element level to elementProps
      if (element.onClick && typeof element.onClick === 'function') {
        elementProps.onClick = element.onClick;
      }
      
      // Debug log for next button props
      if (element.name === 'next-button' && element.id && element.id.includes('page8')) {
        console.log('🔍 [ElementRenderer] Page 8 Next Button Props:', {
          initialEnabled: elementProps.initialEnabled,
          enableOnEvent: elementProps.enableOnEvent,
          enableOnEventFilter: elementProps.enableOnEventFilter,
          allProps: Object.keys(elementProps)
        });
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
          // Check if button has a custom componentType (e.g., NextButtonComponent)
          if (elementProps?.componentType === 'NextButtonComponent') {
            const NextButtonComponent = window.InteractionComponents?.NextButtonComponent;
            if (NextButtonComponent) {
              return React.createElement(NextButtonComponent, {
                key: element.name,
                id: element.id,
                ...elementProps,
                position: position,
                processedStyles: processedStyles,
                elementZIndex: element.zIndex || 402
              });
            }
          }
          // Use specialized button components for next/previous buttons
          if (element.name === 'next-button' || element.name === 'next-button-page2') {
            // Debug log for page 8 next button
            if (element.id && element.id.includes('page8')) {
              console.log('🔍 [ElementRenderer] Creating Page 8 NextButtonComponent with props:', {
                initialEnabled: elementProps.initialEnabled,
                enableOnEvent: elementProps.enableOnEvent,
                enableOnEventFilter: elementProps.enableOnEventFilter,
                text: elementProps.text,
                onClick: typeof elementProps.onClick,
                allKeys: Object.keys(elementProps)
              });
            }
            return React.createElement(window.InteractionComponents?.NextButtonComponent, {
              key: element.name,
              id: element.id, // Ensure id is passed
              ...elementProps,
              // Pass positioning and styling through props
              position: position,
              processedStyles: processedStyles,
              elementZIndex: element.zIndex || 402
            });
          } else if (element.name === 'previous-button' || element.name === 'previous-button-page2') {
            return React.createElement(window.InteractionComponents?.PreviousButtonComponent, {
              key: element.name,
              ...elementProps,
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
        const imageStyle = {
          width: '100%',
          height: '100%',
          objectFit: elementProps.objectFit || 'contain', // Use objectFit prop if provided, default to 'contain'
          display: 'block'
        };
        
        // Add scale transform if provided
        if (elementProps.scale !== undefined && elementProps.scale !== 1) {
          imageStyle.transform = `scale(${elementProps.scale})`;
          imageStyle.transformOrigin = 'center center';
        }
        
        imageContent = React.createElement('img', {
          key: 'container-image',
          src: elementProps.imageSrc,
          alt: elementProps.imageAlt || '',
          style: imageStyle
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
          ...(needsFlexLayout ? {
            display: 'flex',
            alignItems: processedStyles?.alignItems || elementProps?.alignItems || 'center',
            justifyContent: processedStyles?.justifyContent || elementProps?.justifyContent || 'center'
          } : {}),
          // Allow overflow if specified (for container elements with images that need to overflow)
          ...(element.type === ELEMENT_TYPES.CONTAINER && elementProps?.overflow ? {
            overflow: elementProps.overflow
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

  // Hide elements from other pages when page changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Use a small delay to ensure DOM is updated after React render
    const timeoutId = setTimeout(() => {
      // Find all elements with page-specific IDs or data attributes
      const allElements = document.querySelectorAll('[id^="page"], [data-element-name], [data-grid-position]');
      
      allElements.forEach(el => {
        const elementId = el.id || '';
        const dataElementName = el.getAttribute('data-element-name') || '';
        const dataGridPosition = el.getAttribute('data-grid-position') || '';
        
        // Extract page number from ID (e.g., "page2-header-text" -> 2)
        let elementPage = null;
        if (elementId) {
          const pageMatch = elementId.match(/^page(\d+)-/);
          if (pageMatch) {
            elementPage = parseInt(pageMatch[1], 10);
          }
        }
        
        // If we can't determine page from ID, try data attributes
        if (elementPage === null && (dataElementName || dataGridPosition)) {
          const nameMatch = (dataElementName || dataGridPosition).match(/^page(\d+)-/);
          if (nameMatch) {
            elementPage = parseInt(nameMatch[1], 10);
          }
        }
        
        // Hide element if it belongs to a different page
        if (elementPage !== null && elementPage !== currentPage) {
          // Store original display if not already stored
          if (!el.hasAttribute('data-original-display')) {
            const originalDisplay = window.getComputedStyle(el).display;
            if (originalDisplay !== 'none') {
              el.setAttribute('data-original-display', originalDisplay);
            }
          }
          el.style.display = 'none';
          el.style.visibility = 'hidden';
        } else if (elementPage === currentPage) {
          // Show element if it belongs to current page
          const originalDisplay = el.getAttribute('data-original-display');
          if (originalDisplay) {
            el.style.display = originalDisplay;
            el.removeAttribute('data-original-display');
          }
          el.style.visibility = '';
        }
      });
      
      console.log(`🔍 [CustomElementsContainer] Cleaned up elements for page change to ${currentPage}`);
    }, 50); // Small delay to ensure React has rendered
    
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  if (elements.length === 0) return null;

  return React.createElement(React.Fragment, {}, [
    ...elements.map(element => 
      React.createElement(ElementRenderer, {
        key: `page${currentPage}-${element.id || element.name}`,
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
  // Get starting page from APP_CONFIG, persisted state, or default to 1
  const getInitialPage = () => {
    // First, check if we have a persisted current page (for remount scenarios)
    if (typeof window !== 'undefined' && window.__persistedCurrentPage) {
      const persistedPage = parseInt(window.__persistedCurrentPage, 10);
      if (!isNaN(persistedPage) && persistedPage > 0) {
        console.log(`🔄 [AppState] Restoring persisted page ${persistedPage} after remount`);
        return persistedPage;
      }
    }
    
    // Then check APP_CONFIG
    if (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.START_PAGE) {
      const startPage = parseInt(window.APP_CONFIG.START_PAGE, 10);
      if (!isNaN(startPage) && startPage > 0) {
        // Only log on actual app initialization, not on re-renders
        if (!window.__appInitialized) {
          console.log(`🚀 Starting app on page ${startPage} (from APP_CONFIG.START_PAGE)`);
          window.__appInitialized = true;
        }
        return startPage;
      } else {
        if (!window.__appInitialized) {
          console.log(`⚠️ APP_CONFIG.START_PAGE is not a valid page number, defaulting to page 1`);
          window.__appInitialized = true;
        }
      }
    }
    if (!window.__appInitialized) {
      window.__appInitialized = true;
    }
    return 1;
  };
  
  const [currentPage, setCurrentPage] = useState(() => {
    const initialPage = getInitialPage();
    // Persist the initial page
    if (typeof window !== 'undefined') {
      window.__persistedCurrentPage = initialPage;
    }
    console.log(`🔵 [AppState] Initializing currentPage state to ${initialPage}`);
    return initialPage;
  });
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

  // Computed values
  const availablePages = useMemo(() => getAvailablePages(), []);
  // Total pages should be the highest page number (13), not the count of pages in navigation
  // This ensures "Page 13 of 13" is shown even though page 8 is skipped in navigation
  const totalPages = useMemo(() => {
    // Get the maximum page number from available pages (should be 13)
    const pagesInRange = availablePages.filter(p => p >= 1 && p <= 13);
    if (pagesInRange.length > 0) {
      const maxPage = Math.max(...pagesInRange);
      console.log('🔍 [MathApp] Calculated totalPages from max page:', maxPage, 'availablePages:', availablePages);
      return maxPage; // Should be 12
    }
    // Fallback: Try navigation-based count
    if (typeof window !== 'undefined' && window.getPageNumbers) {
      try {
        const navPages = window.getPageNumbers();
        if (navPages && navPages.length > 0) {
          const maxNavPage = Math.max(...navPages);
          console.log('🔍 [MathApp] Using max navigation page:', maxNavPage, 'pages:', navPages);
          return maxNavPage;
        }
      } catch (error) {
        console.warn('⚠️ [MathApp] Error getting navigation pages:', error);
      }
    }
    // Final fallback
    const count = availablePages.length;
    console.log('🔍 [MathApp] Fallback totalPages:', count, 'from availablePages:', availablePages);
    return count;
  }, [availablePages]);

  // Actions
  const forceUpdate = useCallback(() => {
    setAppUpdateTrigger(prev => prev + 1);
  }, []);

  const navigateToPage = useCallback((pageNumber) => {
    if (!availablePages.includes(pageNumber)) {
      console.warn(`⚠️ Cannot navigate to page ${pageNumber} - not available`);
      return;
    }

    // Comprehensive cleanup for ALL page changes (not just page 1)
    // Use setTimeout to let React finish unmounting first to avoid removeChild errors
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        console.log(`🧹 [Navigate] Starting cleanup for page ${pageNumber}`);
        
        // Clear all pending timeouts and intervals (store them globally if needed)
        // Note: This is a best-effort cleanup since we can't track all timeouts
        if (window.clearAllTimeouts) {
          window.clearAllTimeouts();
        }
        
        // Stop all CSS animations and transitions on page elements
        try {
          const pageElements = document.querySelectorAll('[id^="page"]');
          pageElements.forEach(el => {
            if (el && el.style) {
              // Only reset animations/transitions for elements not on the target page
              const pageMatch = el.id.match(/page(\d+)-/);
              if (!pageMatch || parseInt(pageMatch[1], 10) !== pageNumber) {
                el.style.animation = 'none';
                el.style.transition = 'none';
                // Force reflow to stop animations immediately
                void el.offsetHeight;
              }
            }
          });
        } catch (error) {
          console.log(`🧹 [Navigate] Error stopping animations:`, error.message);
        }
      
      // Remove dynamically created elements from page 2
      // These are created outside React and must be removed manually
      const dynamicElementIds = [
        'grid3-description-text',
        'page2-geometry-grid-3',
        'page2-vertical-line-3',
        'page2-horizontal-line-3',
        'page2-vertical-line-3-copy',
        'page2-horizontal-line-3-copy',
        'blink-keyframes'
      ];
      
        // Helper function to force remove dynamically created elements
        // These elements are created outside React and should always be removed
        const forceRemoveDynamic = (element, elementId) => {
          if (!element) return false;
          try {
            // Force remove - these are always dynamically created, not React-managed
            if (element.parentNode) {
              element.remove();
              console.log(`🧹 [Navigate] Force removed dynamically created element: ${elementId}`);
              return true;
            } else {
              // Already removed
              return false;
            }
          } catch (error) {
            // Try alternative removal method
            try {
              if (element.parentNode) {
                element.parentNode.removeChild(element);
                console.log(`🧹 [Navigate] Force removed dynamically created element (alt method): ${elementId}`);
                return true;
              }
            } catch (e2) {
              // Element might have been removed by React or another process
              console.log(`🧹 [Navigate] Could not remove ${elementId} (may already be removed)`);
            }
            return false;
          }
        };
        
        // Force remove all dynamically created elements
        dynamicElementIds.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            forceRemoveDynamic(element, id);
          }
        });
        
        // Helper function to safely remove other elements (not dynamically created)
        // Only removes elements that are NOT managed by React
        const safeRemove = (element, elementId) => {
          if (!element) return false;
          try {
            // For other elements, check if they're React-managed
            const reactRoot = document.getElementById('react-root');
            if (reactRoot && reactRoot.contains(element)) {
              // Check if this element is likely a React-managed element
              // React-managed elements usually have data-reactroot or are direct children of react-root
              const isReactManaged = element.hasAttribute('data-reactroot') ||
                                   element.closest('[data-reactroot]') ||
                                   (element.parentNode && element.parentNode.id === 'react-root');
              
              if (isReactManaged) {
                // Don't remove React-managed elements - let React handle cleanup
                return false;
              }
            }
            
            // Check if element has a parent before removing
            if (element.parentNode) {
              element.remove();
              console.log(`🧹 [Navigate] Removed element: ${elementId}`);
              return true;
            } else {
              // Element is already detached
              return false;
            }
          } catch (error) {
            // Element might have been removed by React or another process
            // Silently ignore - this is expected during page transitions
            return false;
          }
        };
      
      // Remove all grid3 point labels
      for (const pointId of ['C1', 'C2', 'B1', 'B2', 'A1', 'A2']) {
        const label = document.getElementById(`grid3-point-label-${pointId}`);
        safeRemove(label, `grid3-point-label-${pointId}`);
      }
      
      // Remove all tick marks
      for (let i = 1; i < 6; i++) {
        const verticalTick = document.getElementById(`vertical-line-tick-${i}`);
        const horizontalTick = document.getElementById(`horizontal-line-tick-${i}`);
        safeRemove(verticalTick, `vertical-line-tick-${i}`);
        safeRemove(horizontalTick, `horizontal-line-tick-${i}`);
      }
      
      // Remove all "0.5" labels
      for (let i = 1; i <= 6; i++) {
        const verticalLabel = document.getElementById(`vertical-line-label-${i}`);
        const horizontalLabel = document.getElementById(`horizontal-line-label-${i}`);
        const verticalLabelCopy = document.getElementById(`vertical-line-label-${i}-grid3-copy`);
        const horizontalLabelCopy = document.getElementById(`horizontal-line-label-${i}-grid3-copy`);
        safeRemove(verticalLabel, `vertical-line-label-${i}`);
        safeRemove(horizontalLabel, `horizontal-line-label-${i}`);
        safeRemove(verticalLabelCopy, `vertical-line-label-${i}-grid3-copy`);
        safeRemove(horizontalLabelCopy, `horizontal-line-label-${i}-grid3-copy`);
      }
      
      // Remove any elements with data attributes indicating they're dynamically created
      // Use a try-catch and check parentNode for each element
      try {
        const dynamicElements = document.querySelectorAll('[id^="grid3-"], [id*="-tick-"], [id*="-label-"]');
        dynamicElements.forEach(el => {
          if (el.id && (el.id.includes('grid3') || el.id.includes('tick') || el.id.includes('label'))) {
            safeRemove(el, el.id);
          }
        });
      } catch (error) {
        console.log(`🧹 [Navigate] Error querying dynamic elements:`, error.message);
      }
      
      // Reset transforms and styles on page 2 elements (if not navigating to page 2)
      if (pageNumber !== 2) {
        const page2Elements = [
          'page2-geometry-grid-2',
          'page2-horizontal-line-2',
          'page2-vertical-line-2',
          'page2-horizontal-text-2',
          'page2-vertical-text-2',
          'page2-measurement-button'
        ];
        
        page2Elements.forEach(id => {
          const element = document.getElementById(id);
          if (element && element.style) {
            element.style.transform = '';
            element.style.transition = '';
            element.style.opacity = '';
            element.style.visibility = '';
            element.style.filter = '';
            element.style.pointerEvents = '';
            // Re-enable button if it was disabled
            if (element.tagName === 'BUTTON') {
              element.disabled = false;
            } else {
              element.classList.remove('disabled');
              element.removeAttribute('data-disabled');
            }
          }
        });
      }
      
        // Clear any inline styles that might persist on elements from other pages
        try {
          const allPageElements = document.querySelectorAll('[id^="page"]');
          allPageElements.forEach(el => {
            if (el && el.style && el.id) {
              const pageMatch = el.id.match(/page(\d+)-/);
              if (pageMatch) {
                const elementPage = parseInt(pageMatch[1], 10);
                // Reset styles for elements from other pages
                if (elementPage !== pageNumber) {
                  el.style.transform = '';
                  el.style.transition = '';
                  el.style.animation = 'none';
                }
              }
            }
          });
        } catch (error) {
          console.log(`🧹 [Navigate] Error clearing page element styles:`, error.message);
        }
        
        // Reset page-specific state variables to default
        const pageStateFunctions = [
          'setPage5State',
          'setPage6State', 
          'setPage7State'
        ];
        
        pageStateFunctions.forEach(stateFn => {
          if (typeof window[stateFn] === 'function') {
            try {
              // Extract page number from function name
              const pageMatch = stateFn.match(/setPage(\d+)State/);
              if (pageMatch) {
                const statePage = parseInt(pageMatch[1], 10);
                // Reset state if not navigating to that page
                if (statePage !== pageNumber) {
                  window[stateFn]('default');
                  console.log(`🧹 [Navigate] Reset ${stateFn} to 'default'`);
                }
              }
            } catch (e) {
              console.warn(`⚠️ [Navigate] Error resetting ${stateFn}:`, e);
            }
          }
        });
        
        console.log(`🧹 [Navigate] Cleanup completed for page ${pageNumber}`);
      }, 200); // Delay to let React finish unmounting before cleanup
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
    }
    
    // Reset number pad disabled flags when navigating to a new page
    if (typeof window !== 'undefined') {
      // Only reset if navigating to a page that uses number pads
      if (pageNumber === 15 || pageNumber === 16 || pageNumber === 17 || pageNumber === 18 || pageNumber === 19) {
        window.fractionConversionDisabled = false;
        window.lcmInputDisabled = false;
        console.log(`🔄 [Navigate] Reset number pad disabled flags for page ${pageNumber}`);
      }
    }
    
    // Persist the page number before setting state (for remount scenarios)
    if (typeof window !== 'undefined') {
      window.__persistedCurrentPage = pageNumber;
    }
    
    // Set current page state - this triggers React re-render
    console.log(`📄 [Navigate] About to set currentPage from ${currentPage} to ${pageNumber}`);
    setCurrentPage(pageNumber);
    forceUpdate();
    
    // Verify the state was set correctly
    setTimeout(() => {
      const actualPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
      if (actualPage !== pageNumber) {
        console.error(`❌ [Navigate] State mismatch! Expected page ${pageNumber}, but getCurrentPage() returns ${actualPage}`);
        // If there's a mismatch, try to restore from persisted state
        if (typeof window !== 'undefined' && window.__persistedCurrentPage === pageNumber) {
          console.log(`🔄 [Navigate] Attempting to restore from persisted state...`);
          setCurrentPage(pageNumber);
          forceUpdate();
        }
      } else {
        console.log(`✅ [Navigate] Verified: currentPage is now ${pageNumber}`);
      }
    }, 50);
    
    console.log(`📄 [Navigate] Setting currentPage to ${pageNumber}, state updated`);

    // Initialize page completion state for the new page
    if (typeof window !== 'undefined' && window.PageCompletionManager) {
      // Use setTimeout to ensure DOM is ready for quiz detection
      setTimeout(() => {
        try {
          window.PageCompletionManager.initializePage(pageNumber);
          window.__pageCompletionInitialized = true;
          console.log(`📄 [Navigate] PageCompletionManager.initializePage(${pageNumber}) completed`);
        } catch (error) {
          console.error(`❌ [Navigate] Error in PageCompletionManager.initializePage:`, error);
        }
      }, 100);
    }

    // Dispatch page change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: pageNumber } }));
      console.log(`📄 [Navigate] Dispatched pageChanged event for page ${pageNumber}`);
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

  // Separate useEffect for window function exposure
  // Note: We update getCurrentPage on every currentPage change, but keep other functions stable
  useEffect(() => {
    // Update getCurrentPage to reflect current state
    window.getCurrentPage = () => currentPage;
  }, [currentPage]);

  // Expose stable functions to window (only once on mount, functions are stable via useCallback)
  useEffect(() => {
    window.getAvailablePages = () => availablePages;
    window.getTotalPages = () => totalPages;
    window.navigateToPage = navigateToPage;
    window.changePageAndNotify = navigateToPage; // Alias for compatibility
    window.forceAppUpdate = forceUpdate;
    window.updateTileStyle = updateTileStyle;
    window.clearTileStyle = clearTileStyle;

    // Cleanup
    return () => {
      // Clean up window functions
      const functionsToClean = [
        'getCurrentPage', 'getAvailablePages', 'getTotalPages', 'navigateToPage', 'changePageAndNotify',
        'forceAppUpdate', 'updateTileStyle', 'clearTileStyle'
      ];
      
      functionsToClean.forEach(fn => delete window[fn]);
    };
  }, [availablePages, totalPages, navigateToPage, forceUpdate, updateTileStyle, clearTileStyle]);

  // Separate useEffect for event listeners (runs once on mount)
  useEffect(() => {
    // Listen for quizCompleted events and mark page as completed
    const handleQuizCompleted = (event) => {
      const pageNumber = event.detail?.pageNumber || currentPage;
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(pageNumber);
      }
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);

    // Resize handler
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, [currentPage, setScreenSize]);
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

// Global error handler to suppress removeChild errors during page transitions
if (typeof window !== 'undefined') {
  const originalErrorHandler = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    // Check if this is a removeChild error
    const isRemoveChildError = (typeof message === 'string' && (
      message.includes('removeChild') ||
      message.includes('not a child') ||
      message.includes('NotFoundError')
    )) || (error && (
      error.message?.includes('removeChild') ||
      error.message?.includes('not a child') ||
      error.name === 'NotFoundError' ||
      error.stack?.includes('removeChild') ||
      error.stack?.includes('commitDeletionEffects')
    ));
    
    if (isRemoveChildError) {
      // Suppress removeChild errors - they're harmless during page transitions
      return true; // Prevent default error handling
    }
    
    // Call original error handler for other errors
    if (originalErrorHandler) {
      return originalErrorHandler(message, source, lineno, colno, error);
    }
    
    return false;
  };
  
  // Also handle unhandled promise rejections
  const originalUnhandledRejection = window.onunhandledrejection;
  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason;
    const isRemoveChildError = error?.message?.includes('removeChild') ||
                              error?.message?.includes('not a child') ||
                              error?.name === 'NotFoundError' ||
                              error?.stack?.includes('removeChild') ||
                              error?.stack?.includes('commitDeletionEffects');
    
    if (isRemoveChildError) {
      event.preventDefault(); // Suppress the error
      return;
    }
    
    if (originalUnhandledRejection) {
      originalUnhandledRejection(event);
    }
  });
}

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
  