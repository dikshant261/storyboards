/**
 * ElementsUtils - React 18 Optimized Helper Functions for UI Elements
 * 
 * This React 18 optimized version provides:
 * - Concurrent features for better performance
 * - Suspense boundaries for graceful loading
 * - useDeferredValue for non-urgent updates
 * - useId for stable unique IDs
 * - Enhanced error boundaries with recovery
 * - Better memory management and performance
 * - Automatic batching for state updates
 */

// Dependencies: GridPositionUtils, gridPositions, GridCellFontUtils, StandardElements, TableFactory
// These should be loaded before this file

// React 18 hooks for optimization (using global React object)
// Note: React hooks are destructured in math-applet.js to avoid conflicts

// ===== REACT 18 OPTIMIZED ELEMENT CREATION UTILITIES =====

/**
 * Enhanced Error Boundary for Element Creation
 */
const ElementErrorBoundary = React.memo(({ children, elementName, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const errorId = React.useId();
  
  React.useEffect(() => {
    if (hasError) {
      console.error(`❌ [ElementErrorBoundary] Error in ${elementName}:`, error);
    }
  }, [hasError, error, elementName]);
  
  const retry = React.useCallback(() => {
    if (retryCount < 3) {
      startTransition(() => {
        setHasError(false);
        setError(null);
        setRetryCount(prev => prev + 1);
      });
    }
  }, [retryCount]);
  
  if (hasError) {
    return fallback || React.createElement('div', {
      id: errorId,
      className: 'element-error-boundary',
      style: {
        padding: '10px',
        border: '2px solid #ff6b6b',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        color: '#d63031',
        fontSize: '14px',
        textAlign: 'center'
      }
    }, [
      React.createElement('div', { key: 'title' }, `Error in ${elementName}`),
      retryCount < 3 && React.createElement('button', {
        key: 'retry',
        onClick: retry,
        style: {
          marginTop: '8px',
          padding: '4px 8px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }
      }, `Retry (${3 - retryCount} attempts left)`)
    ]);
  }
  
  return children;
});

/**
 * Creates a memoized element creation function with React 18 optimizations
 * @param {string} elementType - Type of element being created
 * @param {Function} createFn - Element creation function
 * @returns {Function} Optimized element creator
 */
const createOptimizedElementCreator = (elementType, createFn) => {
  return React.memo((props) => {
    const elementId = React.useId();
    const [isPending, startTransition] = React.useTransition();
    const deferredProps = React.useDeferredValue(props);
    
    // Memoize the element creation to prevent unnecessary re-renders
    const element = React.useMemo(() => {
      try {
        return createFn(deferredProps, elementId);
      } catch (error) {
        console.error(`❌ [${elementType}] Creation error:`, error);
        return null;
      }
    }, [deferredProps, elementId]);
    
    return React.createElement(ElementErrorBoundary, {
      elementName: elementType,
      key: elementId
    }, element);
  });
};

/**
 * Suspense wrapper for heavy element creation
 */
const SuspenseElementWrapper = React.memo(({ children, elementType, fallback }) => {
  const loadingFallback = fallback || React.createElement('div', {
    className: 'element-suspense-fallback',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontSize: '14px',
      color: '#666',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      border: '1px dashed rgba(255, 255, 255, 0.2)'
    }
  }, [
    React.createElement('div', {
      key: 'spinner',
      style: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '8px'
      }
    }),
    React.createElement('span', { key: 'text' }, `Loading ${elementType}...`)
  ]);
  
  return React.createElement(React.Suspense, { fallback: loadingFallback }, children);
});

/**
 * Creates a dialog element with configurable position, content, and styling - React 18 Optimized
 * @param {number} currentPage - Current page number
 * @returns {Object|null} React element or null if dialog not found
 */
const createDialogElement = createOptimizedElementCreator('dialog', (props, elementId) => {
  const { currentPage } = props;
  const deferredCurrentPage = React.useDeferredValue(currentPage);
  
  console.log('🎯 [createDialogElement] Creating dialog for page', deferredCurrentPage);
  
  // Get dialog-bubble configuration from page elements
  let pageElement = GridPositionUtils.getPageElement(deferredCurrentPage, 'dialog-bubble');
  
  if (!pageElement && deferredCurrentPage > 1) {
    pageElement = GridPositionUtils.getPageElement(deferredCurrentPage, `dialog-bubble-page${deferredCurrentPage}`);
  }
  
  if (!pageElement) {
    console.log(`💬 DialogComponent: No dialog bubble defined for page ${deferredCurrentPage}`);
    return null;
  }
  
  // Memoize position calculation
  const position = React.useMemo(() => {
    return gridPositions.convertToCSS(pageElement.coordinates, pageElement.name, 'page', 'textbox');
  }, [pageElement.coordinates, pageElement.name]);
  
  if (!position) {
    console.warn('❌ DialogComponent: position could not be calculated');
    return null;
  }
  
  const processedOptions = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(pageElement.props.options || {}),
    [pageElement.props.options]
  );
  
  const showTail = processedOptions.showTail !== false;
  const tailDirection = processedOptions.tailDirection || 'south';
  const tailPlacement = processedOptions.tailPlacement || 'middle';
  const tailSizeRaw = processedOptions.tailSize || '25gc';
  const tailSizeProcessed = GridCellFontUtils.processGcStyles({ width: tailSizeRaw });
  const tailSize = tailSizeProcessed.width;
  
  // Memoize tail style calculation
  const tailStyle = React.useMemo(() => {
    if (!showTail) return { display: 'none' };
    
    const baseStyle = {
      position: 'absolute',
      width: '0',
      height: '0',
      zIndex: '10'
    };
    
    const tailColor = processedOptions.backgroundColor || '#ffffff';
    
    switch (tailDirection) {
      case 'south':
        return {
          ...baseStyle,
          bottom: `-${tailSize}`,
          left: tailPlacement === 'middle' ? '50%' : 
                tailPlacement === 'left' ? '20%' : '80%',
          transform: 'translateX(-50%)',
          borderLeft: `${tailSize} solid transparent`,
          borderRight: `${tailSize} solid transparent`,
          borderTop: `${tailSize} solid ${tailColor}`
        };
      case 'north':
        return {
          ...baseStyle,
          top: `-${tailSize}`,
          left: tailPlacement === 'middle' ? '50%' : 
                tailPlacement === 'left' ? '20%' : '80%',
          transform: 'translateX(-50%)',
          borderLeft: `${tailSize} solid transparent`,
          borderRight: `${tailSize} solid transparent`,
          borderBottom: `${tailSize} solid ${tailColor}`
        };
      default:
        return baseStyle;
    }
  }, [showTail, tailDirection, tailPlacement, tailSize, processedOptions.backgroundColor]);

  return React.createElement('div', {
    id: elementId,
    className: 'dialog-container math-app-dialog-container',
    'data-element-name': pageElement.name,
    style: position.css,
    'data-grid-position': 'dialogBubble'
  }, React.createElement('div', {
    className: 'dialog-bubble math-app-dialog-bubble',
    style: GridCellFontUtils.processGcStyles(pageElement.props)
  }, [
    React.createElement('div', {
      key: 'tail',
      className: `dialog-tail math-app-dialog-tail math-app-dialog-tail-${tailDirection}`,
      style: tailStyle
    }),
    React.createElement('div', {
      key: 'text',
      className: 'dialog-text math-app-dialog-text',
      style: {
        textAlign: processedOptions.textAlign || 'center',
        width: '100%',
        height: '100%'
      }
    }, typeof pageElement.props.text === 'function' ? pageElement.props.text() : pageElement.props.text)
  ]));
});

/**
 * Creates a character element with configurable position and image - React 18 Optimized
 * @param {number} currentPage - Current page number
 * @returns {Object|null} React element or null if character not found
 */
const createCharacterElement = createOptimizedElementCreator('character', (props, elementId) => {
  const { currentPage } = props;
  const deferredCurrentPage = React.useDeferredValue(currentPage);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  
  const pageElement = GridPositionUtils.getPageElement(deferredCurrentPage, 'character');
  
  if (!pageElement) {
    console.log(`🎭 Character: No character defined for page ${deferredCurrentPage}`);
    return null;
  }
  
  const position = useMemo(() => gridPositions.getScreenElement('characterArea'), []);
  
  if (!position) {
    console.warn('❌ Character: position not found for characterArea');
    return null;
  }
  
  const characterProps = pageElement.props || {};
  const imageSrc = characterProps.src || 'assets/character_excited.png';
  const imageAlt = characterProps.alt || 'Character';
  
  const handleImageLoad = React.useCallback(() => {
    startTransition(() => {
      setImageLoaded(true);
    });
  }, []);
  
  const handleImageError = React.useCallback(() => {
    console.warn('❌ Character image failed to load:', imageSrc);
    startTransition(() => {
      setImageLoaded(true); // Still set to true to hide loading state
    });
  }, [imageSrc]);
  
  return React.createElement('div', {
    id: elementId,
    className: 'character-container',
    style: {
      ...position.css,
      zIndex: '998'
    },
    'data-grid-position': 'characterArea'
  }, [
    !imageLoaded && React.createElement('div', {
      key: 'loading',
      className: 'character-loading',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px'
      }
    }, 'Loading character...'),
    React.createElement('img', {
      key: 'image',
      src: imageSrc,
      alt: imageAlt,
      className: 'character-image',
      onLoad: handleImageLoad,
      onError: handleImageError,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }
    })
  ]);
});

/**
 * Creates a header element with configurable position and styling - React 18 Optimized
 * @param {number} currentPage - Current page number
 * @returns {Object|null} React element or null if header not found
 */
const createHeaderElement = createOptimizedElementCreator('header', (props, elementId) => {
  const { currentPage } = props;
  const deferredCurrentPage = React.useDeferredValue(currentPage);
  
  console.log('🎯 [createHeaderElement] Starting header creation for page', deferredCurrentPage);
  
  const position = React.useMemo(() => {
    try {
      return gridPositions.getStandardElement('header');
    } catch (error) {
      console.error('❌ [createHeaderElement] Error getting position:', error);
      return null;
    }
  }, []);
  
  if (!position) {
    console.warn('❌ [createHeaderElement] position not found for header');
    return null;
  }
  
  // Memoize page element lookup
  const headerElement = React.useMemo(() => {
    const pageElement = GridPositionUtils.getPageElement(deferredCurrentPage, 'header');
    return pageElement || StandardElements.header;
  }, [deferredCurrentPage]);
  
  // Memoize header text calculation
  const headerText = React.useMemo(() => {
    if (headerElement.props && typeof headerElement.props.text === 'function') {
      return headerElement.props.text();
    } else if (headerElement.props && headerElement.props.text) {
      return headerElement.props.text;
    } else if (typeof i18n !== 'undefined') {
      return i18n.t('appInfo.title');
    }
    return 'Math Learning Platform';
  }, [headerElement]);
  
  const processedStyles = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(headerElement ? headerElement.props : {}),
    [headerElement]
  );
  
  return React.createElement('div', {
    id: elementId,
    className: 'header-container math-app-header',
    style: {
      ...position.css,
      ...processedStyles
    },
    'data-grid-position': 'header'
  }, React.createElement('div', {
    className: 'math-app-header-center'
  }, headerText));
});

/**
 * Creates navigation buttons with React 18 optimizations
 */
const createNextButtonElement = createOptimizedElementCreator('next-button', (props, elementId) => {
  const { currentPage, changePageAndNotify } = props;
  const [isPending, startTransition] = React.useTransition();
  
  const position = React.useMemo(() => gridPositions.getScreenElement('nextButton'), []);
  const pageElement = React.useMemo(() => 
    GridPositionUtils.getPageElement(currentPage, 'next-button') || StandardElements.nextButton,
    [currentPage]
  );
  
  if (!position) {
    console.warn('❌ NextButtonComponent: position not found for nextButton');
    return null;
  }
  
  const handleClick = React.useCallback(() => {
    startTransition(() => {
      console.log('🚨 Next button clicked!');
      if (typeof playNextSound === 'function') {
        playNextSound();
      }
      if (currentPage < 2) {
        changePageAndNotify(currentPage + 1);
      }
    });
  }, [currentPage, changePageAndNotify]);
  
  const processedStyles = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(pageElement.props),
    [pageElement.props]
  );
  
  return React.createElement('button', {
    id: elementId,
    className: 'next-button math-app-button math-app-button-next',
    style: {
      ...position.css,
      ...processedStyles,
      opacity: isPending ? 0.7 : 1,
      transform: isPending ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.2s ease'
    },
    onClick: handleClick,
    disabled: isPending,
    'data-grid-position': 'next-button'
  }, typeof i18n !== 'undefined' ? i18n.t('buttons.next') : '»');
});

const createPreviousButtonElement = createOptimizedElementCreator('previous-button', (props, elementId) => {
  const { currentPage, changePageAndNotify } = props;
  const [isPending, startTransition] = React.useTransition();
  
  const position = React.useMemo(() => gridPositions.getScreenElement('previousButton'), []);
  const pageElement = React.useMemo(() => 
    GridPositionUtils.getPageElement(currentPage, 'previous-button') || StandardElements.previousButton,
    [currentPage]
  );
  
  if (!position) {
    console.warn('❌ PreviousButtonComponent: position not found for previousButton');
    return null;
  }
  
  const handleClick = React.useCallback(() => {
    startTransition(() => {
      console.log('🚨 Previous button clicked!');
      if (typeof playStartSound === 'function') {
        playStartSound();
      }
      if (currentPage > 1) {
        changePageAndNotify(currentPage - 1);
      }
    });
  }, [currentPage, changePageAndNotify]);
  
  const processedStyles = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(pageElement.props),
    [pageElement.props]
  );
  
  return React.createElement('button', {
    id: elementId,
    className: 'previous-button math-app-button math-app-button-previous',
    style: {
      ...position.css,
      ...processedStyles,
      opacity: isPending ? 0.7 : 1,
      transform: isPending ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.2s ease'
    },
    onClick: handleClick,
    disabled: isPending,
    'data-grid-position': 'previous-button'
  }, typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : '«');
});

/**
 * Creates a progress dots element with React 18 concurrent features
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Object|null} React element or null if progress dots not found
 */
const createProgressDotsElement = createOptimizedElementCreator('progress-dots', (props, elementId) => {
  const { currentPage, totalPages } = props;
  const deferredCurrentPage = React.useDeferredValue(currentPage);
  const [isPending, startTransition] = React.useTransition();
  
  console.log('🔘 [createProgressDotsElement] Creating progress dots for page', deferredCurrentPage, 'of', totalPages);
  console.log('🔘 [createProgressDotsElement] Props received:', { currentPage, totalPages });
  
  const pageElement = React.useMemo(() => 
    GridPositionUtils.getPageElement(deferredCurrentPage, 'progressDots') || StandardElements.progressDots,
    [deferredCurrentPage]
  );
  
  const position = React.useMemo(() => gridPositions.getStandardElement('progressDots'), []);
  
  if (!position) {
    console.warn('❌ ProgressDots: position not found for progressDots');
    return null;
  }
  
  const processedStyles = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(pageElement.props),
    [pageElement.props]
  );
  
  const availablePages = React.useMemo(() => {
    const pages = typeof PageUtils !== 'undefined' && PageUtils.getAvailablePages ? 
      PageUtils.getAvailablePages() : Array.from({length: totalPages}, (_, i) => i + 1);
    console.log('🔘 [createProgressDotsElement] Available pages calculated:', pages);
    console.log('🔘 [createProgressDotsElement] PageUtils available:', typeof PageUtils !== 'undefined');
    console.log('🔘 [createProgressDotsElement] Using totalPages fallback:', totalPages);
    return pages;
  }, [totalPages]);
  
  const handleDotClick = React.useCallback((pageNumber) => {
    startTransition(() => {
      console.log(`🔘 Progress dot ${pageNumber} clicked`);
      if (typeof window !== 'undefined' && typeof window.navigateToPage === 'function') {
        window.navigateToPage(pageNumber);
      }
    });
  }, []);
  
  const dots = React.useMemo(() => {
    return availablePages.map(pageNumber => {
      const isActive = pageNumber === deferredCurrentPage;
      
      const dotStyles = GridCellFontUtils.processGcStyles({
        width: pageElement.props.dotSize,
        height: pageElement.props.dotSize,
        backgroundColor: isActive ? pageElement.props.activeDotColor : pageElement.props.inactiveDotColor,
        border: isActive ? pageElement.props.activeDotBorder : pageElement.props.inactiveDotBorder,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: pageElement.props.fontSize,
        fontWeight: pageElement.props.fontWeight,
        color: pageElement.props.color,
        textAlign: pageElement.props.textAlign,
        transition: pageElement.props.transition,
        cursor: 'pointer',
        boxSizing: 'border-box',
        opacity: isPending ? 0.7 : 1,
        transform: isPending ? 'scale(0.95)' : 'scale(1)'
      });
      
      return React.createElement('div', {
        key: `dot-${pageNumber}`,
        className: `progress-dot ${isActive ? 'active' : 'inactive'}`,
        style: dotStyles,
        onClick: () => handleDotClick(pageNumber),
        'data-page': pageNumber
      }, pageNumber.toString());
    });
  }, [availablePages, deferredCurrentPage, pageElement.props, isPending, handleDotClick]);
  
  return React.createElement('div', {
    id: elementId,
    className: 'progress-dots-container math-app-progress-dots',
    style: {
      ...position.css,
      ...processedStyles,
      zIndex: pageElement.zIndex || 'var(--z-notification)'
    },
    'data-grid-position': 'progressDots'
  }, ...dots);
});

/**
 * Creates a page indicator element - React 18 Optimized
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Object|null} React element or null if should not be shown
 */
const createPageIndicatorElement = createOptimizedElementCreator('page-indicator', (props, elementId) => {
  const { currentPage, totalPages } = props;
  
  console.log('📄 PageIndicatorComponent rendered');
  
  // Check if page progress indicator should be shown based on APP_CONFIG
  if (typeof window.APP_CONFIG !== 'undefined' && !window.APP_CONFIG.SHOW_PAGE_PROGRESS) {
    return null;
  }
  
  return React.createElement('div', {
    id: elementId,
    className: 'page-indicator math-app-page-indicator',
    'data-element-type': 'page-indicator'
  }, `Page ${currentPage} of ${totalPages}`);
});

/**
 * Creates heavy elements with Suspense boundaries
 */
const createTableElement = createOptimizedElementCreator('table', (props, elementId) => {
  const { currentPage } = props;
  
  return React.createElement(SuspenseElementWrapper, {
    elementType: 'table',
    fallback: React.createElement('div', {
      style: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        border: '2px dashed rgba(255, 255, 255, 0.3)'
      }
    }, 'Loading table...')
  }, React.createElement('div', {
    id: elementId,
    className: 'table-element-container',
    'data-element-type': 'table'
  }, 'Table content will be rendered here'));
});

const createPartitionedRectangleElement = createOptimizedElementCreator('partitioned-rectangle', (props, elementId) => {
  const { currentPage, elementName, coordinates, elementProps, zIndex } = props;
  
  return React.createElement(SuspenseElementWrapper, {
    elementType: 'partitioned rectangle'
  }, React.createElement('div', {
    id: elementId,
    className: 'partitioned-rectangle-container',
    'data-element-type': 'partitioned-rectangle'
  }, 'Partitioned rectangle content'));
});

// Number pad component with correct layout and positioning
const NumberPadPanelComponent = (props) => {
  const { currentPage, elementName, coordinates, elementProps, zIndex } = props;
  
  // Get the original configuration from PageConfig
  let pageElement = null;
  try {
    const pageElements = window.pageElements || {};
    pageElement = pageElements[currentPage]?.[elementName];
  } catch (error) {
    console.warn('NumberPad: Could not access page configuration', error);
  }
  
  // Fallback configuration matching the original design
  const config = pageElement?.props || {
    backgroundColor: 'transparent',
    borderRadius: '15gc',
    border: '4px solid #FFAB40',
    padding: '15gc',
    showButton: {
      backgroundColor: '#FFD700',
      color: '#000000',
      fontSize: '35gc',
      fontWeight: 'bold',
      text: 'show 💡'
    },
    numberButtons: {
      backgroundColor: '#FFAB40',
      color: '#000000',
      fontSize: '30gc',
      fontWeight: 'bold',
      borderRadius: '6gc',
      border: '2px solid #FF9900',
      width: '50gc',
      height: '50gc',
      margin: '3gc'
    },
    checkButton: {
      backgroundColor: '#FF8C00',
      color: '#000000',
      fontSize: '25gc',
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
      fontSize: '25gc',
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '2px dashed #ffffff',
      padding: '10gc',
      textAlign: 'center',
      display: 'flex',
      height: '60gc'
    }
  };
  
  // State for show/hide hint toggle and text area content
  const [showHint, setShowHint] = React.useState(false);
  const [textAreaContent, setTextAreaContent] = React.useState('');
  const [textAreaColors, setTextAreaColors] = React.useState({ color: '#ffffff' });
  
  // Handle number button clicks
  const handleNumberClick = (number) => {
    console.log(`🔢 [NumberPad] Number ${number} clicked`);
    
    // Try multiple ways to call the number click handler
    if (pageElement?.props?.onNumberClick) {
      pageElement.props.onNumberClick(number);
    } else {
      // Fallback: Call the PageConfig handler directly
      console.log('🔄 [NumberPad] Using fallback number click handler');
      
      // Play click sound for number pad
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('numberpad');
      }
      
             // Update the answer state - handle 'both' case
       if (typeof window !== 'undefined') {
         const currentIndex = window.currentQuestionIndex || 0;
         const currentQuestion = window.QUESTIONS && window.QUESTIONS[currentIndex] 
           ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
         
         // Use the new focus management system for all cases
         const currentActiveTile = window.page2Store ? window.page2Store.getState().currentActiveTile : 'answer';
         
         if (currentQuestion.missing === 'both') {
           // For 'both' case, update the currently active tile
           window.page2Store.updateTileValue(currentActiveTile, number.toString());
           console.log(`📝 [NumberPad] Updated ${currentActiveTile} tile value:`, number.toString());
         } else {
           // For single missing cases, also use the focus management system
           if (currentActiveTile === 'answer' || currentQuestion.missing === 'subtrahend' || currentQuestion.missing === 'minuend') {
             // Update the appropriate tile based on what's missing or currently active
             if (currentQuestion.missing === 'minuend' && currentActiveTile === 'minuend') {
               window.page2Store.updateTileValue('minuend', number.toString());
             } else if (currentQuestion.missing === 'subtrahend' && currentActiveTile === 'subtrahend') {
               window.page2Store.updateTileValue('subtrahend', number.toString());
             } else {
               // Default to answer tile for backward compatibility
               window.page2Store.updateTileValue('answer', number.toString());
               // Also update the global variable for backward compatibility
               window.answerPage2 = number.toString();
             }
             console.log(`📝 [NumberPad] Updated ${currentActiveTile} tile value:`, number.toString());
           }
           
           // Update Page 2 store with user answer for backward compatibility
           if (window.page2Store && currentActiveTile === 'answer') {
             window.page2Store.updateUserAnswer(number.toString());
           }
           
           // Reset input tile colors to default when user enters new number
           if (window.page2Store) {
             window.page2Store.updateInputTileColor('default');
           }
         }
         
         // Force re-render to show the updated tile
         if (typeof window.forceAppUpdate === 'function') {
           window.forceAppUpdate();
         }
        
        // Force re-render of answer container by updating DOM directly (only for single missing cases)
        if (currentQuestion.missing !== 'both') {
          const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
          if (answerContainer) {
            const currentIndex = window.currentQuestionIndex || 0;
            const minuend = window.QUESTIONS && window.QUESTIONS[currentIndex] 
              ? window.QUESTIONS[currentIndex].minuend : 5;
            const subtrahend = window.QUESTIONS && window.QUESTIONS[currentIndex] 
              ? window.QUESTIONS[currentIndex].subtrahend : 3;
            const userAnswer = window.answerPage2 || '';
            
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
            console.log('📝 [Page 2] Answer container updated directly:', displayText);
          }
        }
        
        // Trigger React re-render to update equation tiles
        if (typeof window.forceAppUpdate === 'function') {
          window.forceAppUpdate();
          console.log('✅ [Page 2] Triggered React re-render for equation tiles');
        }
      }
    }
  };
  
  // Handle check button click
  const handleCheckClick = () => {
    console.log('🔄 [NumberPad] Check button clicked');
    
    if (pageElement?.props?.onCheckClick) {
      pageElement.props.onCheckClick();
    } else {
      // Fallback: Call the PageConfig handler directly
      console.log('🔄 [NumberPad] Using fallback check click handler');
      
      // Play click sound
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('check');
      }
      
      // Get current question
      const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
        ? window.currentQuestionIndex : 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] 
        : { minuend: 5, subtrahend: 3, missing: 'subtrahend' };
      
      console.log(`🔄 [Page 2] Check button pressed for question type: ${currentQuestion.missing}`);
      
      // Handle different missing value cases
      if (currentQuestion.missing === 'both') {
        // For 'both' case, check if all three values are filled
        const allFilled = window.page2Store ? window.page2Store.areAllValuesFilled() : false;
        
        if (!allFilled) {
          // Show feedback asking to fill all values
          const feedbackText = typeof i18n !== 'undefined' ? 
            i18n.t('subtraction.page2.feedback.fillAll') : 
            'Please fill all values to check.';
          
          console.log('⚠️ [Page 2] All values not filled');
          
          // Update feedback in number pad text area
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback(feedbackText, 'incorrect');
          }
          
          // Update Page 2 store with feedback
          if (typeof window !== 'undefined' && window.page2Store) {
            window.page2Store.setFeedback(feedbackText, 'error');
            window.page2Store.updateNumberPadTextArea(feedbackText, 'incorrect');
          }
          
          return; // Exit early
        }
        
        // All values are filled, validate them
        const storeState = window.page2Store.getState();
        const minuendValue = parseInt(storeState.minuendValue) || 0;
        const subtrahendValue = parseInt(storeState.subtrahendValue) || 0;
        const answerValue = parseInt(storeState.answerValue) || 0;
        const expectedAnswer = currentQuestion.minuend - currentQuestion.subtrahend;
        
        const minuendCorrect = minuendValue === currentQuestion.minuend;
        const subtrahendCorrect = subtrahendValue === currentQuestion.subtrahend;
        const answerCorrect = answerValue === expectedAnswer;
        
        console.log(`🔄 [Page 2] All values case - Minuend: ${minuendValue}/${currentQuestion.minuend} (${minuendCorrect}), Subtrahend: ${subtrahendValue}/${currentQuestion.subtrahend} (${subtrahendCorrect}), Answer: ${answerValue}/${expectedAnswer} (${answerCorrect})`);
        
        if (minuendCorrect && subtrahendCorrect && answerCorrect) {
          // Both correct - success!
          const feedbackText = typeof i18n !== 'undefined' ? 
            i18n.t('subtraction.page2.feedback.correct') : 
            'Correct Answer!';
          
          console.log('✅ [Page 2] Both values correct!');
          
          // Play success sound
          if (typeof window !== 'undefined' && window.playAnswerSound) {
            window.playAnswerSound(true);
          }
          
          // Update feedback
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback(feedbackText, 'correct');
          }
          
          // Update Page 2 store with correct state
          if (window.page2Store) {
            window.page2Store.setCorrectAnswerState();
            window.page2Store.stopAllPulsating();
          }
          
          // Mark page 2 as complete
          if (typeof window !== 'undefined') {
            window.page2complete = true;
            console.log('✅ [Page 2] Marked as complete (both case)');
          }
          
          return; // Success path
        } else {
          // One or more incorrect - use general 'both' case message
          const feedbackText = typeof i18n !== 'undefined' ? 
            i18n.t('subtraction.page2.feedback.bothCaseIncorrect') : 
            'Oops! Count the total cars and cars that are crossed, then fill and check… Try again…';
          
          console.log('❌ [Page 2] One or more values incorrect');
          
          // Play error sound
          if (typeof window !== 'undefined' && window.playAnswerSound) {
            window.playAnswerSound(false);
          }
          
          // Update feedback
          if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
            window.updateNumberPadFeedback(feedbackText, 'incorrect');
          }
          
          // Update Page 2 store with incorrect state and specify which tiles are incorrect
          if (window.page2Store) {
            const incorrectTiles = {
              minuend: !minuendCorrect,
              subtrahend: !subtrahendCorrect,
              answer: !answerCorrect
            };
            window.page2Store.setIncorrectAnswerState(feedbackText, incorrectTiles);
          }
          
          return; // Error path
        }
      }
      
      // Handle single missing value cases (existing logic)
      const userAnswer = typeof window !== 'undefined' && window.answerPage2 ? parseInt(window.answerPage2) : 0;
      
      // Expected answer is the missing value (not the subtraction result)
      let expectedAnswer;
      if (currentQuestion.missing === 'minuend') {
        expectedAnswer = currentQuestion.minuend;
      } else if (currentQuestion.missing === 'subtrahend') {
        expectedAnswer = currentQuestion.subtrahend;
      } else {
        expectedAnswer = currentQuestion.subtrahend; // fallback
      }
      
      console.log(`🔄 [Page 2] Single case - User answer: ${userAnswer}, Expected: ${expectedAnswer} (${currentQuestion.missing})`);
      
                          if (userAnswer < expectedAnswer) {
        // Smaller number
        const feedbackText = typeof i18n !== 'undefined' ? 
         i18n.t('subtraction.page2.feedback.smaller') : 
         `Oops! You have entered a smaller number…\nCount and Try again…`;
         console.log('❌ [Page 2] Smaller number entered');
         
         // Update Page 2 store with incorrect answer state
         if (typeof window !== 'undefined' && window.page2Store) {
           window.page2Store.setIncorrectAnswerState(feedbackText);
           window.page2Store.updateAnswerTileColor('red');
         }
         
         // Play error sound
         if (typeof window !== 'undefined' && window.playAnswerSound) {
           window.playAnswerSound(false);
         }
         
         // Update feedback in number pad text area using new system
         if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
           window.updateNumberPadFeedback(feedbackText, 'incorrect');
         }
         
         // Update answer tile color to red (incorrect) - increased timeout to ensure tile is created
         if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
           setTimeout(() => window.updateAnswerTileColor(false), 300);
         } else {
           // Fallback: Direct DOM manipulation for tile color
           setTimeout(() => {
             const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
             if (answerContainer) {
               const tileSpan = answerContainer.querySelector('span');
               if (tileSpan) {
                 tileSpan.style.backgroundColor = '#F44336';
                 tileSpan.style.color = '#ffffff';
                 tileSpan.style.border = '3px solid #C62828';
                 console.log('❌ [NumberPad] Answer tile colored red (incorrect) - fallback');
               }
             }
           }, 300);
         }
         
         // Input tile color is already updated via store in setIncorrectAnswerState
         console.log('🎨 [NumberPad] Input tile color updated via store (incorrect)');
        
                          } else if (userAnswer > expectedAnswer) {
        // Bigger number
        const feedbackText = typeof i18n !== 'undefined' ? 
         i18n.t('subtraction.page2.feedback.bigger') : 
         `Oops! You have entered a bigger number…\nCount and Try again…`;
         console.log('❌ [Page 2] Bigger number entered');
         
         // Update Page 2 store with incorrect answer state
         if (typeof window !== 'undefined' && window.page2Store) {
           window.page2Store.setIncorrectAnswerState(feedbackText);
           window.page2Store.updateAnswerTileColor('red');
         }
         
         // Play error sound
         if (typeof window !== 'undefined' && window.playAnswerSound) {
           window.playAnswerSound(false);
         }
         
         // Update feedback in number pad text area using new system
         if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
           window.updateNumberPadFeedback(feedbackText, 'incorrect');
         }
         
         // Update answer tile color to red (incorrect) - increased timeout to ensure tile is created
         if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
           setTimeout(() => window.updateAnswerTileColor(false), 300);
         } else {
           // Fallback: Direct DOM manipulation for tile color
           setTimeout(() => {
             const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
             if (answerContainer) {
               const tileSpan = answerContainer.querySelector('span');
               if (tileSpan) {
                 tileSpan.style.backgroundColor = '#F44336';
                 tileSpan.style.color = '#ffffff';
                 tileSpan.style.border = '3px solid #C62828';
                 console.log('❌ [NumberPad] Answer tile colored red (incorrect) - fallback');
               }
             }
           }, 300);
         }
         
         // Input tile color is already updated via store in setIncorrectAnswerState
         console.log('🎨 [NumberPad] Input tile color updated via store (incorrect)');
        
             } else {
                 // Correct answer
        const feedbackText = typeof i18n !== 'undefined' ? 
         i18n.t('subtraction.page2.feedback.correct') : 
         `Correct Answer!`;
         console.log('✅ [Page 2] Correct answer!');
         
         // Play success sound
         if (typeof window !== 'undefined' && window.playAnswerSound) {
           window.playAnswerSound(true);
         }
         
         // Update feedback in number pad text area using new system
         if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
           window.updateNumberPadFeedback(feedbackText, 'correct');
         }
         
         // Update Page 2 store with visual states
         if (typeof window !== 'undefined' && window.page2Store) {
           window.page2Store.updateNumberPadTextArea(feedbackText, 'correct');
           window.page2Store.updateAnswerTileColor('green');
         }
         
         // Update answer tile color to green (correct)
         if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
           setTimeout(() => window.updateAnswerTileColor(true), 100);
         } else {
           // Fallback: Direct DOM manipulation for tile color
           setTimeout(() => {
             const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
             if (answerContainer) {
               const tileSpan = answerContainer.querySelector('span');
               if (tileSpan) {
                 tileSpan.style.backgroundColor = '#4CAF50';
                 tileSpan.style.color = '#ffffff';
                 tileSpan.style.border = '3px solid #2E7D32';
                 console.log('✅ [NumberPad] Answer tile colored green (correct) - fallback');
               }
             }
           }, 300);
         }
         
         // Input tile color is already updated via store in setCorrectAnswerState
         console.log('🎨 [NumberPad] Input tile color updated via store (correct)');
        
                 // Mark page 2 as complete using store
         if (typeof window !== 'undefined') {
           window.page2complete = true;
           console.log('✅ [Page 2] Marked as complete (window.page2complete = true)');
           
           // Update Page 2 store state
           if (window.page2Store) {
             window.page2Store.setCorrectAnswerState();
             console.log('✅ [Page 2] Store state updated to correct answer state');
           }
           
           // Also update React state for backward compatibility
           console.log('🔍 [Page 2] Checking window.updatePageState:', typeof window.updatePageState);
           if (window.updatePageState) {
             window.updatePageState({ page2complete: true });
             console.log('✅ [Page 2] React state updated (pageStates.page2complete = true)');
           } else {
             console.log('❌ [Page 2] window.updatePageState not available yet');
           }
         }
        
        // Update Page 2 completion state (show/hide elements)
        console.log('🔍 [Page 2] Checking window.updatePage2CompletionState:', typeof window.updatePage2CompletionState);
        if (typeof window !== 'undefined' && window.updatePage2CompletionState) {
          console.log('🔄 [Page 2] Calling updatePage2CompletionState in 200ms...');
          setTimeout(() => {
            console.log('🔄 [Page 2] Now calling updatePage2CompletionState');
            window.updatePage2CompletionState();
          }, 200);
        } else {
          // Fallback: Direct DOM manipulation for Page 2 completion state
          console.log('🔄 [Page 2] Using fallback completion state update');
          setTimeout(() => {
            console.log('🔄 [Page 2] Executing fallback completion state update');
            
            // Hide initial elements
            const elementsToHide = [
              'step1-completed',
              'step2-instruction', 
              'hint-text-page2',
              'tap-animation-page2-1'
            ];
            
            elementsToHide.forEach(elementName => {
              const element = document.querySelector(`[data-element-name="${elementName}"]`);
              if (element) {
                element.style.display = 'none';
                console.log(`🔄 [Page 2] ${elementName} hidden`);
              }
            });
            
            // Show completion elements
            const elementsToShow = [
              'step3-page2',
              'step4-page2',
              'step5-page2',
              'tap-animation-page2-2'
            ];
            
            elementsToShow.forEach(elementName => {
              const element = document.querySelector(`[data-element-name="${elementName}"]`);
              if (element) {
                element.style.display = 'block';
                console.log(`✅ [Page 2] ${elementName} shown`);
              }
            });
            
            // Enable and make Next button pulsate
            const nextButton = document.querySelector('[data-element-name="next-button-page2"]');
            if (nextButton) {
              // Clear any existing styles that might interfere
              nextButton.style.removeProperty('animation');
              nextButton.classList.remove('pulsating');
              
              // Apply new styles
              nextButton.disabled = false;
              nextButton.style.opacity = '1';
              nextButton.style.cursor = 'pointer';
              nextButton.style.pointerEvents = 'auto';
              
              // Force the animation with !important and multiple fallbacks
              nextButton.style.setProperty('animation', 'nextButtonPulse 1.5s ease-in-out infinite', 'important');
              nextButton.classList.add('pulsating');
              nextButton.classList.add('math-app-pulse-animation');
              nextButton.style.setProperty('box-shadow', '0 0 20px rgba(255, 171, 64, 0.8), 0 0 40px rgba(255, 171, 64, 0.6)', 'important');
              nextButton.style.setProperty('filter', 'brightness(1.2)', 'important');
              
              // Also update the button text to reflect current state
              if (typeof window !== 'undefined' && window.getNextButtonText) {
                nextButton.textContent = window.getNextButtonText();
              } else {
                // Fallback text logic
                if (typeof window !== 'undefined' && window.QUESTIONS && window.currentQuestionIndex !== undefined) {
                  const totalQuestions = window.QUESTIONS.length;
                  const currentIndex = window.currentQuestionIndex;
                  
                  if (currentIndex >= totalQuestions - 1) {
                    nextButton.textContent = 'Start Over';
                  } else {
                    nextButton.textContent = 'Next Question';
                  }
                } else {
                  nextButton.textContent = 'Next Question';
                }
              }
              
              console.log('✅ [Page 2] Next button enabled and pulsating');
              console.log('🔍 [Page 2] Button animation style:', nextButton.style.animation);
              console.log('🔍 [Page 2] Button text:', nextButton.textContent);
            }
            
            // Update instruction header text
            const instructionBox = document.querySelector('[data-element-name="instruction-box-page2"]');
            if (instructionBox) {
              const completedText = typeof i18n !== 'undefined' ? 
                i18n.t('subtraction.page2.instructionHeaderCompleted') : 
                'Tap Next for the next challenge…';
              instructionBox.innerHTML = completedText;
              console.log('✅ [Page 2] Instruction header updated to next challenge text');
            }
            
            // Disable the entire number pad
            const numberPadPanel = document.querySelector('[data-element-name="number-pad-panel-page2"]');
            if (numberPadPanel) {
              // Disable all buttons in the number pad
              const allButtons = numberPadPanel.querySelectorAll('button');
              allButtons.forEach(button => {
                button.disabled = true;
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
              });
              
              // Also disable the text area if it exists
              const textArea = numberPadPanel.querySelector('textarea, input[type="text"]');
              if (textArea) {
                textArea.disabled = true;
                textArea.style.opacity = '0.5';
              }
              
              console.log('✅ [Page 2] Number pad completely disabled');
            }
            
          }, 200);
        }
        
        // Update button states
        if (typeof window !== 'undefined' && window.updateButtonStates) {
          setTimeout(() => window.updateButtonStates(), 100);
        }
      }
    }
  };
  
  // Handle show/hide hint button click
  const handleShowHintClick = () => {
    console.log('💡 [NumberPad] Show/Hide hint clicked');
    const newShowHint = !showHint;
    setShowHint(newShowHint);
    
    if (newShowHint) {
      const hintText = typeof i18n !== 'undefined' ? 
        i18n.t('dialogs.numberPad.hint') : 
        'Count the number of cars LEFT.';
      setTextAreaContent(hintText);
      setTextAreaColors({ color: '#ffffff' });
    } else {
      setTextAreaContent('');
      setTextAreaColors({ color: '#ffffff' });
    }
  };
  
  // Convert gc units to pixels (assuming 1gc = 1px for now)
  const gcToPx = (value) => {
    if (typeof value === 'string' && value.includes('gc')) {
      return value.replace('gc', 'px');
    }
    return value;
  };
  
  // Process styles to convert gc units
  const processStyle = (styleObj) => {
    const processed = {};
    for (const [key, value] of Object.entries(styleObj)) {
      processed[key] = gcToPx(value);
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
      
      // Fallback: manual calculation based on grid system
      // Assuming 72 rows and 128 columns as standard grid
      const [topRow, topCol, bottomRow, bottomCol] = coordinates;
      const gridRows = 72;
      const gridCols = 128;
      
      const left = ((topCol - 1) / gridCols) * 100;
      const top = ((topRow - 1) / gridRows) * 100;
      const width = ((bottomCol - topCol + 1) / gridCols) * 100;
      const height = ((bottomRow - topRow + 1) / gridRows) * 100;
      
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
  
  // 1. Hint toggle button (9% of height, 10% smaller font)
  const showButtonFontSize = Math.floor(parseFloat(gcToPx(config.showButton?.fontSize || '35px')) * 0.9);
  const showButtonStyle = processStyle({
    ...config.showButton,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    height: '9%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '3px solid #FFB300',
    marginBottom: '2%',
    fontSize: `${showButtonFontSize}px`
  });
  
  const showButton = React.createElement('button', {
    key: 'show-button',
    className: 'number-pad-show-button',
    style: showButtonStyle,
    onClick: handleShowHintClick,
    onMouseOver: (e) => {
      e.target.style.transform = 'scale(1.02)';
      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    },
    onMouseOut: (e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = 'none';
    },
    'data-action': 'show-hint'
  }, showHint ? 
    (typeof i18n !== 'undefined' ? i18n.t('dialogs.numberPad.hideHint') : '🔆 Hide Hint') : 
    (typeof i18n !== 'undefined' ? i18n.t('dialogs.numberPad.showHint') : '💡 Show Hint'));
  
  // 2. Text area (26% of height) - shows hint or feedback
  const textAreaStyle = processStyle({
    ...config.feedbackTextArea,
    width: '100%',
    height: '26%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
    ...textAreaColors
  });
  
  const textArea = React.createElement('div', {
    key: 'text-area',
    id: `${elementName}-text-area`,
    className: 'numberpad-text-area',
    style: textAreaStyle,
    'data-feedback': 'area'
  }, textAreaContent);
  
  // Expose methods to update text area from external code
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Function to update feedback in the text area
      window.updateNumberPadFeedback = (message, type = 'default') => {
        setTextAreaContent(message);
        
        switch (type) {
          case 'correct':
            setTextAreaColors({ color: '#4CAF50' }); // Green
            break;
          case 'error':
          case 'incorrect':
            setTextAreaColors({ color: '#F44336' }); // Red
            break;
          case 'hint':
          default:
            setTextAreaColors({ color: '#ffffff' }); // White
            break;
        }
      };
      
      // Function to clear feedback
      window.clearNumberPadFeedback = () => {
        setTextAreaContent('');
        setTextAreaColors({ color: '#ffffff' });
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.updateNumberPadFeedback;
        delete window.clearNumberPadFeedback;
      }
    };
  }, []);
  
  // 3. Number pad (51% of height) - make buttons 15% bigger
  const numberButtons = [];
  const buttonSize = Math.floor(parseFloat(gcToPx(config.numberButtons?.fontSize || '30px')) * 1.15);
  const buttonWidth = Math.floor(parseFloat(gcToPx(config.numberButtons?.width || '50px')) * 1.15);
  const buttonHeight = Math.floor(parseFloat(gcToPx(config.numberButtons?.height || '50px')) * 1.15);
  
  for (let i = 0; i <= 9; i++) {
    const buttonStyle = processStyle({
      ...config.numberButtons,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${buttonSize}px`,
      width: `${buttonWidth}px`,
      height: `${buttonHeight}px`
    });
    
    numberButtons.push(
      React.createElement('button', {
        key: `number-${i}`,
        className: `number-pad-button number-${i}`,
        style: buttonStyle,
        onClick: () => handleNumberClick(i),
        onMouseOver: (e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        },
        onMouseOut: (e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
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
  
  const numberPadGrid = React.createElement('div', {
    className: 'number-pad-grid',
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: gcToPx(config.numberButtons?.margin || '3gc'),
      width: '100%',
      height: '51%',
      alignItems: 'center',
      justifyItems: 'center',
      marginBottom: '3%'
    }
  }, ...gridButtons);
  
  // 4. Check button (10% of height)
  const checkButtonStyle = processStyle({
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
      e.target.style.transform = 'scale(1.02)';
      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    },
    onMouseOut: (e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = 'none';
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
  
  // Layout order: hint toggle -> text area -> number pad -> check button
  const children = [
    showButton,    // 9% height
    textArea,      // 26% height  
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
};

const createNumberPadPanelElement = React.memo(NumberPadPanelComponent);

/**
 * Optimized cell manipulation functions with React 18 features
 */
const changeCellBorder = (cellIds, borderStyle) => {
  const ids = Array.isArray(cellIds) ? cellIds : [cellIds];
  
  // Use startTransition if available, otherwise execute immediately
  const executeUpdate = () => {
    ids.forEach(cellId => {
      const cell = document.getElementById(cellId);
      if (cell) {
        const processedStyle = typeof GridCellFontUtils !== 'undefined' ? 
          GridCellFontUtils.processGcStyles(borderStyle) : borderStyle;
        
        if (processedStyle.width) cell.style.borderWidth = processedStyle.width;
        if (processedStyle.style) cell.style.borderStyle = processedStyle.style;
        if (processedStyle.color) cell.style.borderColor = processedStyle.color;
        if (processedStyle.radius) cell.style.borderRadius = processedStyle.radius;
        
        console.log(`🔲 [CellHelper] Border updated for cell: ${cellId}`);
      } else {
        console.warn(`🔲 [CellHelper] Cell not found: ${cellId}`);
      }
    });
  };
  
  if (typeof startTransition !== 'undefined') {
    startTransition(executeUpdate);
  } else {
    executeUpdate();
  }
};

const changeCellBackground = (cellIds, background) => {
  const ids = Array.isArray(cellIds) ? cellIds : [cellIds];
  
  const executeUpdate = () => {
    ids.forEach(cellId => {
      const cell = document.getElementById(cellId);
      if (cell) {
        if (typeof background === 'string') {
          cell.style.backgroundColor = background;
        } else if (typeof background === 'object') {
          if (background.color) cell.style.backgroundColor = background.color;
          if (background.gradient) cell.style.background = background.gradient;
          if (background.image) cell.style.backgroundImage = background.image;
          if (background.size) cell.style.backgroundSize = background.size;
          if (background.position) cell.style.backgroundPosition = background.position;
          if (background.repeat) cell.style.backgroundRepeat = background.repeat;
        }
        
        console.log(`🔲 [CellHelper] Background updated for cell: ${cellId}`);
      } else {
        console.warn(`🔲 [CellHelper] Cell not found: ${cellId}`);
      }
    });
  };
  
  if (typeof startTransition !== 'undefined') {
    startTransition(executeUpdate);
  } else {
    executeUpdate();
  }
};

const changeCellText = (cellIds, content, textStyle = {}) => {
  const ids = Array.isArray(cellIds) ? cellIds : [cellIds];
  
  const executeUpdate = () => {
    ids.forEach(cellId => {
      const cell = document.getElementById(cellId);
      if (cell) {
        const textContent = typeof content === 'function' ? content(cellId) : content;
        cell.textContent = textContent;
        
        if (Object.keys(textStyle).length > 0) {
          const processedStyle = typeof GridCellFontUtils !== 'undefined' ? 
            GridCellFontUtils.processGcStyles(textStyle) : textStyle;
          
          Object.assign(cell.style, processedStyle);
        }
        
        console.log(`🔲 [CellHelper] Text updated for cell: ${cellId} -> "${textContent}"`);
      } else {
        console.warn(`🔲 [CellHelper] Cell not found: ${cellId}`);
      }
    });
  };
  
  if (typeof startTransition !== 'undefined') {
    startTransition(executeUpdate);
  } else {
    executeUpdate();
  }
};

// ===== BATCH OPERATIONS WITH REACT 18 CONCURRENT FEATURES =====

/**
 * Batch cell operations with automatic batching
 */
const batchCellOperations = (operations, delay = 0) => {
  return new Promise((resolve) => {
    const executeOperations = () => {
      let completed = 0;
      
      operations.forEach((operation, index) => {
        setTimeout(() => {
          const { cellIds, changes } = operation;
          
          // Use concurrent features for each operation
          if (changes.border) changeCellBorder(cellIds, changes.border);
          if (changes.background) changeCellBackground(cellIds, changes.background);
          if (changes.text !== undefined) changeCellText(cellIds, changes.text, changes.textStyle || {});
          
          completed++;
          if (completed === operations.length) {
            resolve();
          }
        }, index * delay);
      });
    };
    
    if (typeof startTransition !== 'undefined') {
      startTransition(executeOperations);
    } else {
      executeOperations();
    }
  });
};

// Make all functions globally available with React 18 optimizations
window.ElementsUtilsReact18 = {
  createDialogElement,
  createCharacterElement,
  createHeaderElement,
  createNextButtonElement,
  createPreviousButtonElement,
  createProgressDotsElement,
  createPageIndicatorElement,
  createTableElement,
  createPartitionedRectangleElement,
  createNumberPadPanelElement,
  ElementErrorBoundary,
  SuspenseElementWrapper
};

// Make cell manipulation functions globally available with React 18 optimizations
window.CellHelpersReact18 = {
  changeCellBorder,
  changeCellBackground,
  changeCellText,
  batchCellOperations
};

// Backward compatibility
window.ElementsUtils = window.ElementsUtilsReact18;
window.CellHelpers = window.CellHelpersReact18;

console.log('✅ React 18 optimized elementsUtils.js loaded successfully');
