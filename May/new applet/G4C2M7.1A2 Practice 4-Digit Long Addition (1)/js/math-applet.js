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
  useState, useEffect, useLayoutEffect, useCallback, useMemo, useContext, createContext,
  useRef, useId, useDeferredValue, useTransition, startTransition
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

const longArithmeticLayoutSignature = (componentTypeMarker, element) => {
  const p = element.props || {};
  const scriptLen = Array.isArray(p.script) ? p.script.length : 0;
  const scriptSig = Array.isArray(p.script)
    ? p.script.map((s, i) => `${i}:${(s && s.action && s.action.type) || ''}:${s && s.advance && s.advance.type || ''}`).join('|').slice(0, 200)
    : '';
  return `${componentTypeMarker}|${element.name}|typ:${String(p.type ?? 'auto')}|ecg:${String(p.expandedColumnGap ?? '')}|cg:${String(p.columnGap ?? '')}|rg:${String(p.rowGap ?? '')}|g:${String(p.gap ?? '')}|v:${String(p.variant ?? '')}|lb:${String(p.leftBlock ?? '')}|rb:${String(p.rightBlock ?? '')}|mb:${String(p.middleBlock ?? '')}|dpl:${String(p.debugPanelLayout ?? '')}|spb:${String(p.showPanelBorders ?? '')}|spgl:${String(p.showPanelGridLines ?? '')}|sl:${scriptLen}|gim:${String(p.guidedInputMode ?? '')}|gv:${String(p.guidedValidation ?? '')}|ssig:${scriptSig}`;
};

/** Forces ElementRenderer remount when LongAddition / LongSubtraction layout props change (same element ref would otherwise keep stale useCallback output). */
const elementRendererListKey = (element) => {
  if (element?.type !== 'custom' || !element?.props?.componentType) return element.name;
  const ct = element.props.componentType;
  if (ct === 'LongAdditionComponent') return longArithmeticLayoutSignature('LA', element);
  if (ct === 'LongSubtractionComponent') return longArithmeticLayoutSignature('LS', element);
  return element.name;
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

      // Calculate coordinates and position (use a copy so config is never mutated and each page gets correct values)
      let coordinates = element.coordinates?.length === 4
        ? [...element.coordinates]
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
      
      // Process styles (same helper as dialog tail / teacher note — prefer window global)
      const gcfu =
        typeof window !== 'undefined' && window.GridCellFontUtils
          ? window.GridCellFontUtils
          : typeof GridCellFontUtils !== 'undefined'
            ? GridCellFontUtils
            : null;
      const processedStyles = gcfu
        ? gcfu.processGcStyles(elementProps)
        : elementProps;

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
          // When page5/page7/page11 state is protractor (initial/reset), use a different key so protractor remounts and is in original state
          const isProtractorPageReset = typeof window !== 'undefined' && (
            (element.id === 'page5-protractor' && window.page5PartState === 'protractor') ||
            (element.id === 'page7-protractor' && window.page7PartState === 'protractor') ||
            (element.id === 'page11-protractor' && window.page11PartState === 'protractor')
          );
          const customKey = isProtractorPageReset ? (element.id + '-protractor') : (element.id || element.name);
          return React.createElement(ElementsUtils.createCustomElement, {
            key: customKey, // Use id so each page's instance remounts (e.g. page4-shape-display vs page3-shape-display)
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
  }, [element, element?.props, currentPage, totalPages, tileStyles, onNavigate]);

  return renderElement();
};

/**
 * Same gc → px rules as TeacherNoteComponent / SectionHeader (explicit processGcProperty),
 * so elements that are not routed through createCustomElement still match those components.
 */
const applyTeacherNoteGcConversions = (styles) => {
  const g =
    typeof window !== 'undefined' && window.GridCellFontUtils
      ? window.GridCellFontUtils
      : null;
  if (!g || !styles || typeof styles !== 'object') return { ...styles };
  const out = { ...styles };

  if (out.border && typeof out.border === 'string' && out.border.includes('gc')) {
    const borderParts = out.border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');
      if (width.includes('gc') && g.processGcProperty) {
        out.border = `${g.processGcProperty(width, 'borderWidth')} ${style} ${color}`;
      }
    }
  }

  if (out.borderRadius && String(out.borderRadius).includes('gc') && g.processGcProperty) {
    out.borderRadius = g.processGcProperty(out.borderRadius, 'borderRadius');
  }
  if (out.padding && String(out.padding).includes('gc') && g.processGcProperty) {
    out.padding = g.processGcProperty(out.padding, 'padding');
  }
  if (out.fontSize && String(out.fontSize).includes('gc') && g.processGcProperty) {
    out.fontSize = g.processGcProperty(out.fontSize, 'fontSize');
  }
  if (out.borderWidth && String(out.borderWidth).includes('gc') && g.processGcProperty) {
    out.borderWidth = g.processGcProperty(out.borderWidth, 'borderWidth');
  }
  if (out.lineHeight && String(out.lineHeight).includes('gc') && g.processGcProperty) {
    out.lineHeight = g.processGcProperty(out.lineHeight, 'lineHeight');
  }
  if (out.letterSpacing && String(out.letterSpacing).includes('gc') && g.processGcProperty) {
    out.letterSpacing = g.processGcProperty(out.letterSpacing, 'letterSpacing');
  }
  if (out.margin && String(out.margin).includes('gc') && g.processGcProperty) {
    out.margin = g.processGcProperty(out.margin, 'margin');
  }
  return out;
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

  // Speech-bubble textbox with tail (south = toward content below; north = toward content above)
  if (element.type === ELEMENT_TYPES.TEXTBOX && elementProps?.showTail) {
    const rawText = elementProps.text;
    const textVal = typeof rawText === 'function' ? rawText() : rawText;

    const DIALOG_NON_STYLE_KEYS = new Set([
      'text',
      'showTail',
      'tailDirection',
      'tailPlacement',
      'tailColor',
      'tailScale',
      'tailHalfGc',
      'tailHeightGc',
      'tailInsetGc',
      'allowHTML',
      'onClick',
      'className',
      'id',
      'name',
      'componentType',
    ]);
    // Same as page4-instruction: typography comes from processedStyles only (gc → px already
    // applied in ElementRenderer). Do not merge raw elementProps back in or gc strings win again.
    const bubblePropsForGc = {};
    for (const [k, v] of Object.entries(processedStyles || {})) {
      if (!DIALOG_NON_STYLE_KEYS.has(k) && k !== 'text') bubblePropsForGc[k] = v;
    }
    const gWin =
      typeof window !== 'undefined' && window.GridCellFontUtils
        ? window.GridCellFontUtils
        : typeof GridCellFontUtils !== 'undefined'
          ? GridCellFontUtils
          : null;
    const bubbleAfterProcessGc = gWin
      ? gWin.processGcStyles({ ...bubblePropsForGc })
      : { ...bubblePropsForGc };
    const bubbleProcessed = applyTeacherNoteGcConversions(bubbleAfterProcessGc);

    // Text inherits typography from bubble (explicit values, not 'inherit')
    const textInheritStyle = {
      flex: 1,
      minHeight: 0,
      width: '100%',
      fontSize: bubbleProcessed.fontSize || '16px',
      lineHeight: bubbleProcessed.lineHeight || '1.35',
      fontFamily: bubbleProcessed.fontFamily || 'Arial, sans-serif',
      fontWeight: bubbleProcessed.fontWeight || 'normal',
      color: bubbleProcessed.color || '#000',
      textAlign: bubbleProcessed.textAlign || 'left',
    };
    let textChild;
    if (elementProps.allowHTML && textVal && String(textVal).includes('<')) {
      textChild = React.createElement('div', {
        key: 'dlg-text',
        className: 'math-app-dialog-text',
        style: textInheritStyle,
        dangerouslySetInnerHTML: { __html: textVal },
      });
    } else {
      textChild = React.createElement('div', {
        key: 'dlg-text',
        className: 'math-app-dialog-text',
        style: textInheritStyle,
      }, textVal || '');
    }
    const parseCssPx = (val, fallback = 0) => {
      if (typeof val === 'number' && Number.isFinite(val)) return val;
      if (val == null || val === '') return fallback;
      const n = parseFloat(String(val));
      return Number.isFinite(n) ? n : fallback;
    };
    const gcToPx = (val, prop) => {
      const g = typeof window !== 'undefined' ? window.GridCellFontUtils : null;
      if (g && typeof val === 'string' && val.endsWith('gc')) {
        const px = g.convertGcToPixels(val, prop);
        const n = parseFloat(String(px));
        return Number.isFinite(n) ? n : null;
      }
      return null;
    };
    const bubbleBg = elementProps.backgroundColor || bubbleProcessed.backgroundColor || '#ffffff';
    const tailFill = elementProps.tailColor != null && elementProps.tailColor !== ''
      ? elementProps.tailColor
      : bubbleBg;
    const tailScale = typeof elementProps.tailScale === 'number' && elementProps.tailScale > 0
      ? elementProps.tailScale
      : 1;
    const fontPx = Math.max(10, parseCssPx(bubbleProcessed.fontSize, 16));
    const borderPx = parseCssPx(bubbleProcessed.borderWidth, 0);
    const halfFromGc = gcToPx(elementProps.tailHalfGc, 'width');
    const heightFromGc = gcToPx(elementProps.tailHeightGc, 'paddingTop');
    const insetFromGc = gcToPx(elementProps.tailInsetGc, 'paddingLeft');
    const ref =
      halfFromGc != null
        ? halfFromGc / tailScale
        : Math.max(10, Math.round(fontPx * 0.38 + borderPx * 1.25));
    const tailHalfBase = (halfFromGc != null ? halfFromGc : ref) * tailScale;
    const tailHeight =
      (heightFromGc != null ? heightFromGc : Math.round((14 / 12) * ref)) * tailScale;
    const tailInset =
      (insetFromGc != null ? insetFromGc : Math.round((18 / 12) * ref)) * tailScale;
    const tailDir = elementProps.tailDirection === 'north' ? 'north' : 'south';
    const tailPlacement = elementProps.tailPlacement === 'right' ? 'right' : elementProps.tailPlacement === 'left' ? 'left' : 'middle';
    const tailHorizontal =
      tailPlacement === 'left'
        ? { left: `${tailInset}px`, right: 'auto', transform: 'none' }
        : tailPlacement === 'right'
        ? { left: 'auto', right: `${tailInset}px`, transform: 'none' }
        : { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
    const tailStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      zIndex: 2,
      borderLeft: `${tailHalfBase}px solid transparent`,
      borderRight: `${tailHalfBase}px solid transparent`,
      pointerEvents: 'none',
      ...tailHorizontal,
      // South: tail hangs below bubble; flat base of triangle sits on bubble bottom (top: 100%).
      // North: tail sits above bubble; flat base on bubble top (bottom: 100%).
      ...(tailDir === 'south'
        ? {
            top: '100%',
            bottom: 'auto',
            marginTop: 0,
            borderTop: `${tailHeight}px solid ${tailFill}`,
            borderBottom: 'none',
          }
        : {
            bottom: '100%',
            top: 'auto',
            marginBottom: 0,
            borderBottom: `${tailHeight}px solid ${tailFill}`,
            borderTop: 'none',
          }),
    };
    const bubbleStyle = {
      ...bubbleProcessed,
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      overflow: 'visible',
    };
    return React.createElement('div', {
      key: element.name,
      id: element.id || element.name,
      className: `dialog-container math-app-dialog-container textbox-element textbox-element-${element.name}${elementProps?.className ? ' ' + elementProps.className : ''}`,
      style: {
        ...position.css,
        ...dynamicTileStyle,
        zIndex: element.zIndex || 402,
        boxSizing: 'border-box',
        overflow: 'visible',
      },
      'data-element-name': element.name,
      'data-grid-position': element.name,
    }, React.createElement('div', {
      className: 'dialog-bubble math-app-dialog-bubble',
      style: bubbleStyle,
    }, [
      textChild,
      React.createElement('div', {
        key: 'tail',
        className: `math-app-dialog-tail math-app-dialog-tail-${tailDir}`,
        style: tailStyle,
      }),
    ]));
  }

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
    
    // Build className with custom className from props if provided
    const containerClassName = `applet-button-container ${element.name}-container${elementProps?.className ? ' ' + elementProps.className : ''}${elementProps?.pulsate ? ' pulsate' : ''}${elementProps?.disabled === true ? ' disabled' : ''}`;
    
    return React.createElement('div', {
      key: element.name,
      className: containerClassName,
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
        imageContent = React.createElement('img', {
          key: 'container-image',
          src: elementProps.imageSrc,
          alt: elementProps.imageAlt || '',
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
          }
        });
      }

      // Prepare element properties
      // Check if container needs flex layout (for images or explicit flex props)
      const hasImageSrc = elementProps?.imageSrc;
      const hasFlexDisplay = elementProps?.display === 'flex' || processedStyles?.display === 'flex';
      const needsFlexLayout = hasImageSrc || 
        (element.type === ELEMENT_TYPES.CONTAINER && hasFlexDisplay);
      // Vertical center: wrap content in one div so flex centers it (works for both HTML and plain text)
      const verticalAlignCenter = elementProps?.verticalAlign === 'center' && (htmlContent || textContent);
      
      const elementReactProps = {
        key: element.name,
        id: element.id || element.name, // Use element.id if provided, otherwise use element.name
        className: `${element.type}-element ${element.type}-element-${element.name}${processedStyles.className ? ' ' + processedStyles.className : ''}${elementProps?.className ? ' ' + elementProps.className : ''}${elementProps?.pulsate ? ' pulsate' : ''}${elementProps?.disabled === true ? ' disabled' : ''}`,
        style: {
          ...position.css,
          ...processedStyles,
          ...dynamicTileStyle,
          zIndex: element.zIndex || 402,
          // Apply flex layout if needed (for images or explicit flex props)
          ...(needsFlexLayout ? {
            display: 'flex',
            alignItems: processedStyles?.alignItems || elementProps?.alignItems || 'center',
            justifyContent: processedStyles?.justifyContent || elementProps?.justifyContent || 'center'
          } : {}),
          // Vertical center for textbox with HTML: outer box is flex, single inner div holds all HTML
          // Do not override display when element is hidden (e.g. page 5 buttons 2–4 in protractor state)
          ...(verticalAlignCenter && processedStyles?.display !== 'none' ? {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          } : {})
        },
        'data-element-name': element.name,
        'data-grid-position': element.name,
    onClick: elementProps?.onClick || null,
        ...buttonProps
      };

      // Add HTML content if available (skip on outer when verticalAlignCenter - we put it in wrapper instead)
      if (htmlContent && !verticalAlignCenter) {
        elementReactProps.dangerouslySetInnerHTML = htmlContent;
      }

      // Determine children content
      let childrenContent = null;
      if (verticalAlignCenter && htmlContent) {
        // Single wrapper div so the whole HTML block is one flex child and stays vertically centered
        childrenContent = React.createElement('div', {
          key: 'html-content',
          style: { width: '100%', textAlign: elementProps?.textAlign || processedStyles?.textAlign || 'left' },
          dangerouslySetInnerHTML: htmlContent
        });
      } else if (verticalAlignCenter && textContent) {
        // Single wrapper div so plain text is one flex child and stays vertically centered
        childrenContent = React.createElement('div', {
          key: 'text-content',
          style: { width: '100%', textAlign: elementProps?.textAlign || processedStyles?.textAlign || 'left' }
        }, textContent);
      } else if (htmlContent) {
        childrenContent = null; // HTML content uses dangerouslySetInnerHTML on outer
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

  // When PageConfig re-runs (e.g. dev save), `window.GridPositionPages` is a new object; without
  // this dependency the memo keeps stale element references so props like expandedColumnGap never update.
  const gridPositionPagesRef =
    typeof window !== 'undefined' && window.GridPositionPages
      ? window.GridPositionPages
      : typeof GridPositionPages !== 'undefined'
        ? GridPositionPages
        : null;

  const elements = useMemo(() => {
    const pages =
      typeof window !== 'undefined' && window.GridPositionPages
        ? window.GridPositionPages
        : typeof GridPositionPages !== 'undefined'
          ? GridPositionPages
          : null;
    const pageElements = pages?.[currentPage];
    if (!pageElements) {
      console.warn('⚠️ No page elements found for page', currentPage);
      return [];
    }

    const supportedTypes = Object.values(ELEMENT_TYPES);
    return filterElementsByType(pageElements, supportedTypes);
  }, [currentPage, appUpdateTrigger, gridPositionPagesRef]);

  if (elements.length === 0) return null;

  return React.createElement(React.Fragment, {}, [
    ...elements.map(element => 
      React.createElement(ElementRenderer, {
        key: elementRendererListKey(element),
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

  const initialPage = getInitialPage();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [appUpdateTrigger, setAppUpdateTrigger] = useState(0);
  // Guard: when starting on a specific page (START_PAGE > 1), ignore nav to a lower page for a short time to avoid spurious jump to page 1
  const appLoadTimeRef = React.useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());
  
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

    // When app started on START_PAGE > 1, ignore navigation to a lower page for 800ms to avoid spurious jump to page 1
    const startPage = typeof window !== 'undefined' && window.APP_CONFIG ? parseInt(window.APP_CONFIG.START_PAGE, 10) : NaN;
    if (!isNaN(startPage) && startPage > 1 && pageNumber < startPage) {
      const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - appLoadTimeRef.current;
      if (elapsed < 800) {
        console.warn(`⚠️ Ignoring navigation to page ${pageNumber} (app started on page ${startPage}, ${elapsed.toFixed(0)}ms ago)`);
        return;
      }
    }

    // Clear visual elements for page 1
    if (pageNumber === 1 && typeof window !== 'undefined') {
      const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
      clearFunctions.forEach(fn => window[fn]?.());
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

    // When a page is loaded (initial or after navigation), reset its state to default so it always starts fresh
    if (typeof window.resetPageStates === 'function') {
      window.resetPageStates(currentPage, { skipDispatch: true });
    }

    // Listen for quizCompleted events and mark page as completed
    const handleQuizCompleted = (event) => {
      const pageNumber = event.detail?.pageNumber || currentPage;
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(pageNumber);
      }
      // Re-render so page-specific instruction getters (e.g. page 6) update
      if (typeof window.forceAppUpdate === 'function') window.forceAppUpdate();
    };

    // Page 3: when primary label animation cycle completes, advance state (alignVertex→alignBase, alignBase→alignMeasurementArm)
    const handlePrimaryLabelCycleComplete = () => {
      if (typeof window === 'undefined' || !window.forceAppUpdate) return;
      const s = window.page3PartState;
      if (s === 'alignVertex') {
        window.page3PartState = 'alignBase';
        window.page3ClockwiseAnimationStarted = false;
        window.dispatchEvent(new CustomEvent('page3PartStateChanged', { detail: { state: 'alignBase' } }));
      } else if (s === 'alignBase') {
        window.page3PartState = 'alignMeasurementArm';
        window.page3ClockwiseButtonClicked = false;
        window.page3AnticlockwiseAnimationStarted = false;
        window.dispatchEvent(new CustomEvent('page3PartStateChanged', { detail: { state: 'alignMeasurementArm' } }));
      }
      window.forceAppUpdate();
    };

    // Page 3: when secondary label animation cycle completes, set state to complete and notify
    const handleSecondaryLabelCycleComplete = () => {
      if (typeof window === 'undefined' || !window.forceAppUpdate) return;
      if (window.page3PartState === 'alignMeasurementArm') {
        window.page3PartState = 'complete';
        window.page3AnticlockwiseButtonClicked = false;
        window.forceAppUpdate();
        window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 3 } }));
      }
    };

    window.addEventListener('quizCompleted', handleQuizCompleted);
    window.addEventListener('page3PrimaryLabelCycleComplete', handlePrimaryLabelCycleComplete);
    window.addEventListener('page3SecondaryLabelCycleComplete', handleSecondaryLabelCycleComplete);

    // Initialize completion state for current page
    if (window.PageCompletionManager) {
      setTimeout(() => {
        window.PageCompletionManager.initializePage(currentPage);
      }, 100);
    }

    // Simplified question management - no longer needed since we have one static question

    // Simplified state management

    // Resize handler — also bump appUpdateTrigger so gc→px (fontSize, padding, etc.) recomputes
    // against .main-container after layout; otherwise first paint can stick with default 1080 height.
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      forceUpdate();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('quizCompleted', handleQuizCompleted);
      window.removeEventListener('page3PrimaryLabelCycleComplete', handlePrimaryLabelCycleComplete);
      window.removeEventListener('page3SecondaryLabelCycleComplete', handleSecondaryLabelCycleComplete);
      
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
        const hasActiveNumberPad = false;
        
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
    tileStyles,
    forceUpdate
  } = useAppState();

  const mainContainerRef = useRef(null);

  // After .main-container gets its real size, re-run ElementRenderer so gc→px matches layout
  // (first React pass often reads 1080 default or pre-layout rect → wrong dialog fontSize until refresh).
  useLayoutEffect(() => {
    const el = mainContainerRef.current;
    if (!el) return undefined;

    let raf = 0;
    const scheduleReflowGc = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        forceUpdate();
      });
    };

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => scheduleReflowGc());
      ro.observe(el);
      scheduleReflowGc();
      return () => {
        ro.disconnect();
        if (raf) cancelAnimationFrame(raf);
      };
    }

    scheduleReflowGc();
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [forceUpdate]);

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
      ref: mainContainerRef,
      className: 'main-container math-app-container',
      'data-current-page': currentPage
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
  