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
const ElementRenderer = ({ element, currentPage, totalPages, tileStyles, onNavigate, page2State, setPage2State, page2ClockHandsClicked, setPage2ClockHandsClicked, page2LastHandClicked, setPage2LastHandClicked, dispatchPage2QuizComplete, page3IntroComplete, page3MinuteHandClicked, setPage3MinuteHandClicked, page3HourHandClicked, setPage3HourHandClicked, page4MinuteHandClicked, setPage4MinuteHandClicked, page4HourHandClicked, setPage4HourHandClicked, page4ClockClicked, setPage4ClockClicked, dispatchPage4QuizComplete, page5MinuteHandClicked, setPage5MinuteHandClicked, page5HourHandClicked, setPage5HourHandClicked, page5ClockClicked, setPage5ClockClicked, dispatchPage5QuizComplete }) => {
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
      let elementProps = element.props || (typeof element.props === 'function' ? element.props() : {});

      // Add onClick handler from element level to elementProps
      if (element.onClick && typeof element.onClick === 'function') {
        elementProps.onClick = element.onClick;
      }

      // Page 2 state: apply overrides BEFORE processGcStyles so instruction text is not overwritten
      let page2Hidden = false;
      if (currentPage === 2 && PAGE2_STATE_CONFIG && page2State && PAGE2_STATE_CONFIG[page2State]) {
        const config = PAGE2_STATE_CONFIG[page2State];
        if (page2State === 'clock' && page2ClockHandsClicked) {
          if (element.id === 'page2-label-long-hand' || element.id === 'page2-line-1') {
            page2Hidden = !page2ClockHandsClicked.minute;
          } else if (element.id === 'page2-label-short-hand' || element.id === 'page2-line-2') {
            page2Hidden = !page2ClockHandsClicked.hour;
          } else if (config.hiddenIds && config.hiddenIds.includes(element.id)) {
            page2Hidden = true;
          }
        } else if (config.hiddenIds && config.hiddenIds.includes(element.id)) {
          page2Hidden = true;
        }
        if (element.id === 'page2-instruction-text') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          const instructionText = (page2State === 'clock' && page2ClockHandsClicked?.minute && page2ClockHandsClicked?.hour)
            ? getT('pages.page2.instructionTapToContinue', '')
            : (config.instructionTextKey ? getT(config.instructionTextKey, '') : '');
          if (instructionText) {
            elementProps = { ...elementProps, text: instructionText };
          }
        }
        if ((element.id === 'page2-talk-text-box-black-background' || element.name === 'page2-talk-text-box-black-background')) {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page2State === PAGE2_DEFAULT_STATE) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page2.talkBoxText', ''),
              textColor: '#ffffff'
            };
          } else if (page2State === 'clockIntro' || page2State === 'clock') {
            const lastHand = page2LastHandClicked;
            let talkText = getT('pages.page2.talkBoxClockIntro', '');
            if (lastHand === 'hour') {
              talkText = getT('pages.page2.talkBoxShortHand', '');
            } else if (lastHand === 'minute') {
              talkText = getT('pages.page2.talkBoxLongHand', '');
            }
            elementProps = {
              ...elementProps,
              text: talkText,
              textColor: '#ffffff'
            };
          }
        }
        if (element.id === 'page2-label-clock' || element.name === 'page2-label-clock') {
          elementProps = {
            ...elementProps,
            className: [elementProps.className, page2State === 'clockIntro' ? 'page2-guide-blink-3' : ''].filter(Boolean).join(' ') || undefined
          };
        }
        if (element.id === 'page2-clock-tap-animation' || element.name === 'page2-clock-tap-animation') {
          elementProps = {
            ...elementProps,
            visible: page2State === PAGE2_DEFAULT_STATE
          };
        }
        if (element.id === 'page2-clock' && config.clock) {
          elementProps = { ...elementProps, ...config.clock };
          if (setPage2State && page2State === PAGE2_DEFAULT_STATE) {
            elementProps.onClockClick = () => {
              if (typeof window !== 'undefined' && window.page2ClockIntroTimer) {
                clearTimeout(window.page2ClockIntroTimer);
              }
              setPage2State('clockIntro');
              if (typeof window !== 'undefined') {
                window.page2ClockIntroTimer = setTimeout(() => {
                  setPage2State((prev) => prev === 'clockIntro' ? 'clock' : prev);
                  delete window.page2ClockIntroTimer;
                }, 2000);
              }
            };
          }
          if (page2State === 'clock') {
            elementProps.hourHandBlink = !page2ClockHandsClicked?.hour;
            elementProps.minuteHandBlink = !page2ClockHandsClicked?.minute;
            elementProps.handBlinkDuration = '0.6s';
          }
          if (page2State === 'clock' && setPage2ClockHandsClicked && setPage2LastHandClicked) {
            elementProps.handsClickable = false;
            elementProps.minuteHandClickable = !page2ClockHandsClicked?.minute;
            elementProps.hourHandClickable = !page2ClockHandsClicked?.hour;
            elementProps.onHandClick = (handType) => {
              setPage2LastHandClicked(handType);
              setPage2ClockHandsClicked(prev => {
                const next = {
                  ...prev,
                  ...(handType === 'minute' && { minute: true }),
                  ...(handType === 'hour' && { hour: true })
                };
                if (next.minute && next.hour && typeof dispatchPage2QuizComplete === 'function') {
                  setTimeout(() => dispatchPage2QuizComplete(), 0);
                }
                return next;
              });
            };
          }
        }
      }

      // Page 3: o'clock text and circle hidden until minute hand clicked; talk box text, instruction text, and clock onHandClick
      let page3Hidden = false;
      if (currentPage === 3) {
        if (element.id === 'page3-oclock-text' || element.name === 'page3-oclock-text') {
          page3Hidden = !page3MinuteHandClicked;
          if (page3HourHandClicked) {
            const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
            elementProps = {
              ...elementProps,
              text: getT('pages.page3.timeOnClockReveal', ''),
              textColor: '#ffffff'
            };
          }
        }
        if (element.id === 'page3-circle-12' || element.name === 'page3-circle-12') {
          page3Hidden = !page3MinuteHandClicked;
        }
        if (element.id === 'page3-circle-9' || element.name === 'page3-circle-9') {
          page3Hidden = !page3HourHandClicked;
        }
        if (element.id === 'page3-position-of-text' || element.name === 'page3-position-of-text') {
          elementProps = {
            ...elementProps,
            className: [elementProps.className, !page3IntroComplete && !page3MinuteHandClicked ? 'page2-guide-blink-3' : ''].filter(Boolean).join(' ') || undefined
          };
        }
        if (element.id === 'page3-tap-animation' || element.name === 'page3-tap-animation') {
          page3Hidden = !page3IntroComplete || page3MinuteHandClicked;
        }
        if (element.id === 'page3-tap-animation-2' || element.name === 'page3-tap-animation-2') {
          page3Hidden = page3HourHandClicked;
        }
        if (element.id === 'page3-instruction-text' || element.name === 'page3-instruction-text') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page3HourHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page3.instructionTapToReset', '') };
          } else if (page3MinuteHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page3.instructionTapShortHand', '') };
          }
        }
        if (element.id === 'page3-talk-text-box-black-background' || element.name === 'page3-talk-text-box-black-background') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page3HourHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page3.talkBoxWhen9Oclock', ''),
              textColor: '#ffffff'
            };
          } else if (page3MinuteHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page3.talkBoxLongHandAt12', ''),
              textColor: '#ffffff'
            };
          }
        }
        if (element.id === 'page3-clock' && setPage3MinuteHandClicked && setPage3HourHandClicked) {
          elementProps.onHandClick = (handType) => {
            if (handType === 'minute') {
              setPage3MinuteHandClicked(true);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('page3MinuteHandClicked', { detail: { pageNumber: 3 } }));
              }
            }
            if (handType === 'hour') setPage3HourHandClicked(true);
          };
          elementProps.minuteHandClickable = page3IntroComplete && !page3MinuteHandClicked;
          elementProps.hourHandClickable = page3MinuteHandClicked && !page3HourHandClicked;
        }
      }

      // Page 4: visibility and text when minute/hour hand clicked
      let page4Hidden = false;
      if (currentPage === 4) {
        if (element.id === 'page4-circle-12' || element.name === 'page4-circle-12') {
          page4Hidden = !page4MinuteHandClicked;
        }
        if (element.id === 'page4-circle-9' || element.name === 'page4-circle-9') {
          page4Hidden = !page4HourHandClicked;
        }
        if (element.id === 'page4-tap-animation' || element.name === 'page4-tap-animation') {
          page4Hidden = page4MinuteHandClicked;
        }
        if (element.id === 'page4-tap-animation-2' || element.name === 'page4-tap-animation-2') {
          page4Hidden = !page4MinuteHandClicked || page4HourHandClicked;
          if (page4MinuteHandClicked && !page4HourHandClicked) {
            elementProps = { ...elementProps, visible: true };
          }
        }
        if (element.id === 'page4-tap-animation-3' || element.name === 'page4-tap-animation-3') {
          page4Hidden = !page4HourHandClicked || page4ClockClicked;
          if (page4HourHandClicked && !page4ClockClicked) {
            elementProps = { ...elementProps, visible: true };
          }
        }
        if (element.id === 'page4-instruction-text' || element.name === 'page4-instruction-text') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page4ClockClicked) {
            elementProps = { ...elementProps, text: getT('pages.page4.instructionTapToReset', '') };
          } else if (page4HourHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page4.instructionTapClockReveal', '') };
          } else if (page4MinuteHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page4.instructionTapShortHand', '') };
          }
        }
        if (element.id === 'page4-time-On-Clock-text' || element.name === 'page4-time-On-Clock-text') {
          if (page4ClockClicked) {
            const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
            elementProps = {
              ...elementProps,
              text: getT('pages.page4.timeOnClockReveal7', ''),
              textColor: '#ffffff',
              className: [elementProps.className, 'circle-bg-blink', 'reveal-text-blink'].filter(Boolean).join(' '),
            };
          }
        }
        if (element.id === 'page4-talk-text-box-black-background' || element.name === 'page4-talk-text-box-black-background') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page4ClockClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page4.talkBoxWhen7Oclock', ''),
              textColor: '#ffffff'
            };
          } else if (page4HourHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page4.talkBoxWhatTime', ''),
              textColor: '#ffffff'
            };
          } else if (page4MinuteHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page4.talkBoxWhatNumberShortHand', ''),
              textColor: '#ffffff'
            };
          }
        }
        if (element.id === 'page4-clock' && setPage4MinuteHandClicked && setPage4HourHandClicked && dispatchPage4QuizComplete) {
          elementProps.onHandClick = (handType) => {
            if (handType === 'minute') {
              setPage4MinuteHandClicked(true);
              if (typeof window !== 'undefined') {
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('page4MinuteHandClicked', { detail: { pageNumber: 4 } }));
                }, 0);
              }
            }
            if (handType === 'hour') setPage4HourHandClicked(true);
          };
          elementProps.onClockClick = () => dispatchPage4QuizComplete();
          elementProps.clockClickable = page4HourHandClicked;
          elementProps.minuteHandClickable = !page4MinuteHandClicked;
          elementProps.hourHandClickable = page4MinuteHandClicked && !page4HourHandClicked;
        }
      }

      // Page 5: same as page 4 - visibility and text when minute/hour hand clicked
      let page5Hidden = false;
      if (currentPage === 5) {
        if (element.id === 'page5-circle-12' || element.name === 'page5-circle-12') {
          page5Hidden = !page5MinuteHandClicked;
        }
        if (element.id === 'page5-circle-9' || element.name === 'page5-circle-9') {
          page5Hidden = !page5HourHandClicked;
        }
        if (element.id === 'page5-tap-animation' || element.name === 'page5-tap-animation') {
          page5Hidden = page5MinuteHandClicked;
        }
        if (element.id === 'page5-tap-animation-2' || element.name === 'page5-tap-animation-2') {
          page5Hidden = !page5MinuteHandClicked || page5HourHandClicked;
          if (page5MinuteHandClicked && !page5HourHandClicked) {
            elementProps = { ...elementProps, visible: true };
          }
        }
        if (element.id === 'page5-tap-animation-3' || element.name === 'page5-tap-animation-3') {
          page5Hidden = !page5HourHandClicked || page5ClockClicked;
          if (page5HourHandClicked && !page5ClockClicked) {
            elementProps = { ...elementProps, visible: true };
          }
        }
        if (element.id === 'page5-instruction-text' || element.name === 'page5-instruction-text') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page5ClockClicked) {
            elementProps = { ...elementProps, text: getT('pages.page5.instructionTapToReset', '') };
          } else if (page5HourHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page5.instructionTapClockReveal', '') };
          } else if (page5MinuteHandClicked) {
            elementProps = { ...elementProps, text: getT('pages.page5.instructionTapShortHand', '') };
          }
        }
        if (element.id === 'page5-time-On-Clock-text' || element.name === 'page5-time-On-Clock-text') {
          if (page5ClockClicked) {
             const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
            elementProps = {
              ...elementProps,
              text: getT('pages.page5.timeOnClockReveal7', ''),
              textColor: '#ffffff',
              className: [elementProps.className, 'circle-bg-blink', 'reveal-text-blink'].filter(Boolean).join(' '),
            };
          }
        }
        if (element.id === 'page5-talk-text-box-black-background' || element.name === 'page5-talk-text-box-black-background') {
          const getT = typeof window !== 'undefined' && window.getI18nText ? window.getI18nText : () => '';
          if (page5ClockClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page5.talkBoxWhen7Oclock', ''),
              textColor: '#ffffff'
            };
          } else if (page5HourHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page5.talkBoxWhatTime', ''),
              textColor: '#ffffff'
            };
          } else if (page5MinuteHandClicked) {
            elementProps = {
              ...elementProps,
              text: getT('pages.page5.talkBoxWhatNumberShortHand', ''),
              textColor: '#ffffff'
            };
          }
        }
        if (element.id === 'page5-clock' && setPage5MinuteHandClicked && setPage5HourHandClicked && dispatchPage5QuizComplete) {
          elementProps.onHandClick = (handType) => {
            if (handType === 'minute') {
              setPage5MinuteHandClicked(true);
              if (typeof window !== 'undefined') {
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('page5MinuteHandClicked', { detail: { pageNumber: 5 } }));
                }, 0);
              }
            }
            if (handType === 'hour') setPage5HourHandClicked(true);
          };
          elementProps.onClockClick = () => dispatchPage5QuizComplete();
          elementProps.clockClickable = page5HourHandClicked;
          elementProps.minuteHandClickable = !page5MinuteHandClicked;
          elementProps.hourHandClickable = page5MinuteHandClicked && !page5HourHandClicked;
        }
      }

      // Process styles from gridpositions.js (after page 2 overrides so text stays correct)
      let processedStyles = typeof GridCellFontUtils !== 'undefined' ?
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
          // Key that includes page2/page3 state so talk box re-renders when hand is clicked
          let customKey = element.name;
          if (element.id === 'page2-talk-text-box-black-background' && currentPage === 2 && (page2ClockHandsClicked || page2LastHandClicked)) {
            customKey = `${element.name}-${page2LastHandClicked || ''}-${page2ClockHandsClicked?.minute}-${page2ClockHandsClicked?.hour}`;
          } else if ((element.id === 'page3-talk-text-box-black-background' || element.name === 'page3-talk-text-box-black-background') && currentPage === 3 && (page3MinuteHandClicked || page3HourHandClicked)) {
            customKey = `${element.name}-${page3MinuteHandClicked}-${page3HourHandClicked}`;
          } else if ((element.id === 'page4-talk-text-box-black-background' || element.name === 'page4-talk-text-box-black-background') && currentPage === 4 && (page4MinuteHandClicked || page4HourHandClicked || page4ClockClicked)) {
            customKey = `${element.name}-${page4MinuteHandClicked}-${page4HourHandClicked}-${page4ClockClicked}`;
          } else if ((element.id === 'page4-time-On-Clock-text' || element.name === 'page4-time-On-Clock-text') && currentPage === 4 && page4ClockClicked) {
            customKey = `${element.name}-${page4ClockClicked}`;
          } else if ((element.id === 'page4-clock' || element.name === 'page4-analog-clock') && currentPage === 4) {
            customKey = `${element.name}-${page4MinuteHandClicked}-${page4HourHandClicked}`;
          } else if ((element.id === 'page5-talk-text-box-black-background' || element.name === 'page5-talk-text-box-black-background') && currentPage === 5 && (page5MinuteHandClicked || page5HourHandClicked || page5ClockClicked)) {
            customKey = `${element.name}-${page5MinuteHandClicked}-${page5HourHandClicked}-${page5ClockClicked}`;
          } else if ((element.id === 'page5-time-On-Clock-text' || element.name === 'page5-time-On-Clock-text') && currentPage === 5 && page5ClockClicked) {
            customKey = `${element.name}-${page5ClockClicked}`;
          } else if ((element.id === 'page5-clock' || element.name === 'page5-analog-clock') && currentPage === 5) {
            customKey = `${element.name}-${page5MinuteHandClicked}-${page5HourHandClicked}`;
          }
          const customElement = React.createElement(ElementsUtils.createCustomElement, {
            key: customKey,
            ...elementProps,
            id: element.id, // Pass element id to components
            elementName: element.name, // Pass element name for unique cell IDs (e.g., "page2-map-table")
            position: positionWithCoords,
            processedStyles: processedStyles,
            elementZIndex: element.zIndex || 402
          });
          // Page 2: hide labels/lines via wrapper so inner component cannot override display
          if (page2Hidden) {
            return React.createElement('div', {
              key: element.name,
              style: {
                ...(position?.css || {}),
                display: 'none',
                zIndex: element.zIndex || 402,
                pointerEvents: 'none'
              },
              'data-element-name': element.name,
              'data-page2-hidden': 'true'
            }, customElement);
          }
          // Page 3: hide o'clock text until minute hand clicked
          if (page3Hidden) {
            return React.createElement('div', {
              key: element.name,
              style: {
                ...(position?.css || {}),
                display: 'none',
                zIndex: element.zIndex || 402,
                pointerEvents: 'none'
              },
              'data-element-name': element.name,
              'data-page3-hidden': 'true'
            }, customElement);
          }
          // Page 4: hide circle-12, circle-9, tap-animation-2 on page load
          if (page4Hidden) {
            return React.createElement('div', {
              key: element.name,
              style: {
                ...(position?.css || {}),
                display: 'none',
                zIndex: element.zIndex || 402,
                pointerEvents: 'none'
              },
              'data-element-name': element.name,
              'data-page4-hidden': 'true'
            }, customElement);
          }
          // Page 5: same as page 4 - hide circle-12, circle-9, tap-animation-2 on page load
          if (page5Hidden) {
            return React.createElement('div', {
              key: element.name,
              style: {
                ...(position?.css || {}),
                display: 'none',
                zIndex: element.zIndex || 402,
                pointerEvents: 'none'
              },
              'data-element-name': element.name,
              'data-page5-hidden': 'true'
            }, customElement);
          }
          return customElement;

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
  }, [element, currentPage, totalPages, tileStyles, onNavigate, page2State, setPage2State, page2ClockHandsClicked, setPage2ClockHandsClicked, page2LastHandClicked, setPage2LastHandClicked, dispatchPage2QuizComplete, page3IntroComplete, page3MinuteHandClicked, setPage3MinuteHandClicked, page3HourHandClicked, setPage3HourHandClicked, page4MinuteHandClicked, setPage4MinuteHandClicked, page4HourHandClicked, setPage4HourHandClicked, page4ClockClicked, setPage4ClockClicked, dispatchPage4QuizComplete, page5MinuteHandClicked, setPage5MinuteHandClicked, page5HourHandClicked, setPage5HourHandClicked, page5ClockClicked, setPage5ClockClicked, dispatchPage5QuizComplete]);

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
  const { navigateToPage, page2State, setPage2State, page2ClockHandsClicked, setPage2ClockHandsClicked, page2LastHandClicked, setPage2LastHandClicked, dispatchPage2QuizComplete, page3IntroComplete, page3MinuteHandClicked, setPage3MinuteHandClicked, page3HourHandClicked, setPage3HourHandClicked, page4MinuteHandClicked, setPage4MinuteHandClicked, page4HourHandClicked, setPage4HourHandClicked, page4ClockClicked, setPage4ClockClicked, dispatchPage4QuizComplete, page5MinuteHandClicked, setPage5MinuteHandClicked, page5HourHandClicked, setPage5HourHandClicked, page5ClockClicked, setPage5ClockClicked, dispatchPage5QuizComplete } = useAppState();
  
  const elements = useMemo(() => {
    const pageElements = GridPositionPages?.[currentPage];
    if (!pageElements) {
      console.warn('⚠️ No page elements found for page', currentPage);
      return [];
    }

    const supportedTypes = Object.values(ELEMENT_TYPES);
    return filterElementsByType(pageElements, supportedTypes);
  }, [currentPage, appUpdateTrigger, page2State, page2ClockHandsClicked, page3IntroComplete, page3MinuteHandClicked, page3HourHandClicked, page4MinuteHandClicked, page4HourHandClicked, page4ClockClicked, page5MinuteHandClicked, page5HourHandClicked, page5ClockClicked]);

  if (elements.length === 0) return null;

  return React.createElement(React.Fragment, {}, [
    ...elements.map(element => 
      React.createElement(ElementRenderer, {
        key: element.id || element.name,
        element,
        currentPage,
        totalPages,
        tileStyles,
        onNavigate: navigateToPage,
        page2State,
        setPage2State,
        page2ClockHandsClicked,
        setPage2ClockHandsClicked,
        page2LastHandClicked,
        setPage2LastHandClicked,
        dispatchPage2QuizComplete,
        page3IntroComplete,
        page3MinuteHandClicked,
        setPage3MinuteHandClicked,
        page3HourHandClicked,
        setPage3HourHandClicked,
        page4MinuteHandClicked,
        setPage4MinuteHandClicked,
        page4HourHandClicked,
        setPage4HourHandClicked,
        page4ClockClicked,
        setPage4ClockClicked,
        dispatchPage4QuizComplete,
        page5MinuteHandClicked,
        setPage5MinuteHandClicked,
        page5HourHandClicked,
        setPage5HourHandClicked,
        page5ClockClicked,
        setPage5ClockClicked,
        dispatchPage5QuizComplete
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
// Page 2 state config: visibility and interaction per state
const PAGE2_DEFAULT_STATE = 'initialState';
const PAGE2_STATE_CONFIG = {
  [PAGE2_DEFAULT_STATE]: {
    hiddenIds: ['page2-line-1', 'page2-line-2', 'page2-label-clock', 'page2-label-long-hand', 'page2-label-short-hand'],
    instructionTextKey: 'pages.page2.instructionText',
    clock: { clockClickable: true, handsClickable: false }
  },
  clockIntro: {
    hiddenIds: ['page2-line-1', 'page2-line-2', 'page2-label-long-hand', 'page2-label-short-hand'],
    instructionTextKey: 'pages.page2.instructionTapEachHand',
    clock: { clockClickable: false, handsClickable: false }
  },
  clock: {
    hiddenIds: [],
    instructionTextKey: 'pages.page2.instructionTapEachHand',
    clock: { clockClickable: false, handsClickable: true }
  }
};

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
  const [page2State, setPage2State] = useState(PAGE2_DEFAULT_STATE); // default state = initialState
  const [page2ClockHandsClicked, setPage2ClockHandsClicked] = useState({ minute: false, hour: false });
  const [page2LastHandClicked, setPage2LastHandClicked] = useState(null); // 'minute' | 'hour' | null – which hand was clicked last (for talk text)
  const page2QuizCompletedRef = React.useRef(false);
  const [page3IntroComplete, setPage3IntroComplete] = useState(false);
  const [page3MinuteHandClicked, setPage3MinuteHandClicked] = useState(false);
  const [page3HourHandClicked, setPage3HourHandClicked] = useState(false);
  const page3QuizCompletedRef = React.useRef(false);
  const page3IntroTimerRef = React.useRef(null);
  const [page4MinuteHandClicked, setPage4MinuteHandClicked] = useState(false);
  const [page4HourHandClicked, setPage4HourHandClicked] = useState(false);
  const [page4ClockClicked, setPage4ClockClicked] = useState(false);
  const [page5MinuteHandClicked, setPage5MinuteHandClicked] = useState(false);
  const [page5HourHandClicked, setPage5HourHandClicked] = useState(false);
  const [page5ClockClicked, setPage5ClockClicked] = useState(false);

  // When minuteHand and hourHand both are clicked, dispatch quiz completion event (once per page 2 visit)
  const dispatchPage2QuizComplete = React.useCallback(() => {
    if (page2QuizCompletedRef.current) return;
    page2QuizCompletedRef.current = true;
    if (typeof window !== 'undefined') {
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(2);
      }
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 2 } }));
    }
  }, []);

  React.useEffect(() => {
    if (page2State !== 'clock' || !page2ClockHandsClicked.minute || !page2ClockHandsClicked.hour) return;
    dispatchPage2QuizComplete();
  }, [page2State, page2ClockHandsClicked.minute, page2ClockHandsClicked.hour, dispatchPage2QuizComplete]);

  // Reset page 2 quiz completed ref when leaving page 2 or resetting to initialState
  React.useEffect(() => {
    if (currentPage !== 2) page2QuizCompletedRef.current = false;
  }, [currentPage]);
  React.useEffect(() => {
    if (page2State === PAGE2_DEFAULT_STATE) page2QuizCompletedRef.current = false;
  }, [page2State]);

  React.useEffect(() => {
    if (page3IntroTimerRef.current) {
      clearTimeout(page3IntroTimerRef.current);
      page3IntroTimerRef.current = null;
    }

    if (currentPage !== 3) {
      setPage3IntroComplete(false);
      return;
    }

    if (page3MinuteHandClicked) {
      setPage3IntroComplete(true);
      return;
    }

    setPage3IntroComplete(false);
    page3IntroTimerRef.current = setTimeout(() => {
      setPage3IntroComplete(true);
      page3IntroTimerRef.current = null;
    }, 1800);

    return () => {
      if (page3IntroTimerRef.current) {
        clearTimeout(page3IntroTimerRef.current);
        page3IntroTimerRef.current = null;
      }
    };
  }, [currentPage, page3MinuteHandClicked]);

  // When page 3 hour hand is clicked, dispatch quiz completion (once per page 3 visit)
  React.useEffect(() => {
    if (!page3HourHandClicked || page3QuizCompletedRef.current) return;
    page3QuizCompletedRef.current = true;
    if (typeof window !== 'undefined') {
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(3);
      }
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 3 } }));
    }
  }, [page3HourHandClicked]);
  React.useEffect(() => {
    if (currentPage !== 3) page3QuizCompletedRef.current = false;
  }, [currentPage]);

  const page4QuizCompletedRef = React.useRef(false);
  const dispatchPage4QuizComplete = React.useCallback(() => {
    setPage4ClockClicked(true);
    if (page4QuizCompletedRef.current) return;
    page4QuizCompletedRef.current = true;
    if (typeof window !== 'undefined') {
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(4);
      }
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 4 } }));
    }
  }, []);
  React.useEffect(() => {
    if (currentPage !== 4) page4QuizCompletedRef.current = false;
  }, [currentPage]);

  const page5QuizCompletedRef = React.useRef(false);
  const dispatchPage5QuizComplete = React.useCallback(() => {
    setPage5ClockClicked(true);
    if (page5QuizCompletedRef.current) return;
    page5QuizCompletedRef.current = true;
    if (typeof window !== 'undefined') {
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(5);
      }
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 5 } }));
    }
  }, []);
  React.useEffect(() => {
    if (currentPage !== 5) page5QuizCompletedRef.current = false;
  }, [currentPage]);

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
    
    setCurrentPage(pageNumber);
    if (pageNumber === 2) {
      if (typeof window !== 'undefined' && window.page2ClockIntroTimer) {
        clearTimeout(window.page2ClockIntroTimer);
        delete window.page2ClockIntroTimer;
      }
      setPage2State(PAGE2_DEFAULT_STATE);
      setPage2ClockHandsClicked({ minute: false, hour: false });
      setPage2LastHandClicked(null);
    }
    if (pageNumber === 3) {
      if (page3IntroTimerRef.current) {
        clearTimeout(page3IntroTimerRef.current);
        page3IntroTimerRef.current = null;
      }
      setPage3IntroComplete(false);
      setPage3MinuteHandClicked(false);
      setPage3HourHandClicked(false);
    }
    if (pageNumber === 4) {
      setPage4MinuteHandClicked(false);
      setPage4HourHandClicked(false);
      setPage4ClockClicked(false);
    }
    if (pageNumber === 5) {
      setPage5MinuteHandClicked(false);
      setPage5HourHandClicked(false);
      setPage5ClockClicked(false);
    }
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
    page2State,
    page2ClockHandsClicked,
    page2LastHandClicked,
    page3IntroComplete,
    page3MinuteHandClicked,
    page3HourHandClicked,
    page4MinuteHandClicked,
    page4HourHandClicked,
    page4ClockClicked,
    page5MinuteHandClicked,
    page5HourHandClicked,
    page5ClockClicked,

    // Actions
    setCurrentPage,
    setPage2State,
    setPage2ClockHandsClicked,
    setPage2LastHandClicked,
    setPage3MinuteHandClicked,
    setPage3HourHandClicked,
    setPage4MinuteHandClicked,
    setPage4HourHandClicked,
    setPage4ClockClicked,
    setPage5MinuteHandClicked,
    setPage5HourHandClicked,
    setPage5ClockClicked,
    dispatchPage2QuizComplete,
    dispatchPage4QuizComplete,
    dispatchPage5QuizComplete,
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
    feedbackText, tileStyles, appUpdateTrigger, page2State, page2ClockHandsClicked, page2LastHandClicked,     page3IntroComplete, page3MinuteHandClicked, page3HourHandClicked,     page4MinuteHandClicked, page4HourHandClicked, page4ClockClicked,     page5MinuteHandClicked, page5HourHandClicked, page5ClockClicked, dispatchPage4QuizComplete, dispatchPage5QuizComplete,
    dispatchPage2QuizComplete,
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
      const pageNumber = event.detail?.pageNumber || currentPage;
      if (window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(pageNumber);
      }
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);

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
  