/**
 * Interaction Components - React 18 Optimized
 * 
 * This file contains all interaction-related components:
 * - Character
 * - Dialog Bubble
 * - Next Button
 * - Previous Button
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Character Component with image loading optimization
 */
const CharacterComponent = React.memo((props) => {
  const elementId = React.useId();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  
  const handleImageLoad = React.useCallback(() => {
    startTransition(() => {
      setImageLoaded(true);
    });
  }, []);
  
  return React.createElement('div', {
    id: elementId,
    className: 'character-container',
    style: GridCellFontUtils.processGcStyles(props.style || {}),
    'data-element-type': 'character'
  }, [
    !imageLoaded && React.createElement(window.SharedUtilities?.ElementLoadingFallback || 'div', {
      key: 'loading',
      elementType: 'image'
    }),
    React.createElement('img', {
      key: 'image',
      src: props.src,
      alt: props.alt,
      className: props.className || 'character-image',
      onLoad: handleImageLoad,
      style: {
        opacity: imageLoaded ? 1 : 0
      }
    })
  ]);
});

/**
 * Dialog Bubble Component
 */
const DialogBubbleComponent = React.memo((props) => {
  const elementId = React.useId();
  const deferredText = React.useDeferredValue(props.text);
  const processedOptions = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(props.options || {}), 
    [props.options]
  );
  
  return React.createElement('div', {
    id: elementId,
    className: 'dialog-bubble math-app-dialog-bubble',
    style: processedOptions,
    'data-element-type': 'dialog'
  }, deferredText);
});

/**
 * Next Button Component - Three Layer Structure
 */
const NextButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const deferredText = React.useDeferredValue(props.text);
  const deferredMode = React.useDeferredValue(props.mode || 'enabled');
  
  // Memoize mode-based styles
  const modeStyles = React.useMemo(() => {
    if (deferredMode === 'disabled') {
      return {
        backgroundColor: '#888888',
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.6
      };
    }
    // Enabled mode
    return {
      backgroundColor: props.backgroundColor || 'var(--color-gold)',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: 1
    };
  }, [deferredMode, props.backgroundColor]);
  
  const handleClick = React.useCallback(() => {
    // Only execute onClick if mode is enabled
    if (deferredMode === 'enabled') {
      startTransition(() => {
        props.onClick?.();
      });
    }
  }, [props.onClick, deferredMode]);
  
  // Handle mode change callback
  const handleModeChange = React.useCallback((newMode) => {
    if (props.onModeChange) {
      startTransition(() => {
        props.onModeChange(newMode);
      });
    }
  }, [props.onModeChange]);
  
  // Check if this is an applet button (3-layer system)
  const isAppletButton = props.className === 'applet-button' || 
    props.frameClassName === 'applet-button-frame' || 
    props.contentClassName === 'applet-button-content';
  
  
  if (isAppletButton) {
    // Three-layer button structure
    let frameGapPx = '5px';
    if (props.frameGap) {
      if (typeof props.frameGap === 'string' && props.frameGap.includes('gc')) {
        // Convert grid cell units to pixels using GridCellFontUtils if available
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPx) {
          frameGapPx = GridCellFontUtils.convertGcToPx(props.frameGap);
        } else {
          // Fallback conversion (approximate)
          const gcValue = parseFloat(props.frameGap.replace('gc', ''));
          frameGapPx = `${gcValue * 0.5}px`;
        }
      } else {
        frameGapPx = props.frameGap;
      }
    }
    
    return React.createElement('div', {
      id: elementId,
      className: `applet-button-container next-button-container next-button-${deferredMode}${isPending ? ' pending' : ''}`,
      style: {
        // Apply grid positioning from the element renderer
        ...(props.position?.css || {}),
        // Apply processed styles
        ...(props.processedStyles || {}),
        // Apply z-index
        zIndex: props.elementZIndex || 402,
        // Ensure proper display and alignment
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Process any remaining GC styles
        ...GridCellFontUtils.processGcStyles(props),
        // Apply mode-based styles (overrides other styles)
        ...modeStyles
      },
      onClick: handleClick,
      'data-element-type': 'next-button',
      'data-grid-position': 'next-button',
      'data-mode': deferredMode
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame next-button-frame',
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
        className: 'applet-button-content next-button-content',
        style: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apply font size from props to the content layer with higher specificity
          fontSize: props.fontSize || props.processedStyles?.fontSize || 'inherit',
          fontWeight: props.fontWeight || props.processedStyles?.fontWeight || 'inherit',
          color: props.color || props.processedStyles?.color || 'inherit'
        }
      }, deferredText)
    ]);
  }
  
  // Fallback to single-layer button for backward compatibility
  return React.createElement('button', {
    id: elementId,
    className: `next-button math-app-button next-button-${deferredMode}${isPending ? ' pending' : ''}`,
    style: {
      // Apply grid positioning from the element renderer
      ...(props.position?.css || {}),
      // Apply processed styles
      ...(props.processedStyles || {}),
      // Apply z-index
      zIndex: props.elementZIndex || 402,
      // Process any remaining GC styles
      ...GridCellFontUtils.processGcStyles(props),
      // Apply mode-based styles
      ...modeStyles
    },
    onClick: handleClick,
    disabled: isPending || deferredMode === 'disabled',
    'data-element-type': 'next-button',
    'data-mode': deferredMode
  }, deferredText);
});

/**
 * Previous Button Component - Three Layer Structure
 */
const PreviousButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const deferredText = React.useDeferredValue(props.text);
  const deferredMode = React.useDeferredValue(props.mode || 'enabled');
  
  // Memoize mode-based styles
  const modeStyles = React.useMemo(() => {
    if (deferredMode === 'disabled') {
      return {
        backgroundColor: '#888888',
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.6
      };
    }
    // Enabled mode
    return {
      backgroundColor: props.backgroundColor || 'var(--color-gold)',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: 1
    };
  }, [deferredMode, props.backgroundColor]);
  
  const handleClick = React.useCallback(() => {
    // Only execute onClick if mode is enabled
    if (deferredMode === 'enabled') {
      startTransition(() => {
        props.onClick?.();
      });
    }
  }, [props.onClick, deferredMode]);
  
  // Handle mode change callback
  const handleModeChange = React.useCallback((newMode) => {
    if (props.onModeChange) {
      startTransition(() => {
        props.onModeChange(newMode);
      });
    }
  }, [props.onModeChange]);
  
  // Check if this is an applet button (3-layer system)
  const isAppletButton = props.className === 'applet-button' || 
    props.frameClassName === 'applet-button-frame' || 
    props.contentClassName === 'applet-button-content';
  
  
  if (isAppletButton) {
    // Three-layer button structure
    let frameGapPx = '5px';
    if (props.frameGap) {
      if (typeof props.frameGap === 'string' && props.frameGap.includes('gc')) {
        // Convert grid cell units to pixels using GridCellFontUtils if available
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPx) {
          frameGapPx = GridCellFontUtils.convertGcToPx(props.frameGap);
        } else {
          // Fallback conversion (approximate)
          const gcValue = parseFloat(props.frameGap.replace('gc', ''));
          frameGapPx = `${gcValue * 0.5}px`;
        }
      } else {
        frameGapPx = props.frameGap;
      }
    }
    
    return React.createElement('div', {
      id: elementId,
      className: `applet-button-container previous-button-container previous-button-${deferredMode}${isPending ? ' pending' : ''}`,
      style: {
        // Apply grid positioning from the element renderer
        ...(props.position?.css || {}),
        // Apply processed styles
        ...(props.processedStyles || {}),
        // Apply z-index
        zIndex: props.elementZIndex || 402,
        // Ensure proper display and alignment
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Process any remaining GC styles
        ...GridCellFontUtils.processGcStyles(props),
        // Apply mode-based styles (overrides other styles)
        ...modeStyles
      },
      onClick: handleClick,
      'data-element-type': 'previous-button',
      'data-grid-position': 'previous-button',
      'data-mode': deferredMode
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame previous-button-frame',
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
        className: 'applet-button-content previous-button-content',
        style: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apply font size from props to the content layer with higher specificity
          fontSize: props.fontSize || props.processedStyles?.fontSize || 'inherit',
          fontWeight: props.fontWeight || props.processedStyles?.fontWeight || 'inherit',
          color: props.color || props.processedStyles?.color || 'inherit'
        }
      }, deferredText)
    ]);
  }
  
  // Fallback to single-layer button for backward compatibility
  return React.createElement('button', {
    id: elementId,
    className: `previous-button math-app-button previous-button-${deferredMode}${isPending ? ' pending' : ''}`,
    style: {
      // Apply grid positioning from the element renderer
      ...(props.position?.css || {}),
      // Apply processed styles
      ...(props.processedStyles || {}),
      // Apply z-index
      zIndex: props.elementZIndex || 402,
      // Process any remaining GC styles
      ...GridCellFontUtils.processGcStyles(props),
      // Apply mode-based styles
      ...modeStyles
    },
    onClick: handleClick,
    disabled: isPending || deferredMode === 'disabled',
    'data-element-type': 'previous-button',
    'data-mode': deferredMode
  }, deferredText);
});

// Interaction Elements Configuration
const InteractionElements = {
  character: {
    type: 'image',
    coordinates: [2, 34, 28, 72],
    zIndex: 'var(--z-content)',
    props: {
      src: 'assets/character_excited.png',
      alt: 'Excited Character',
      className: 'character-image'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('image', (props, elementId) => {
      return React.createElement(CharacterComponent, props);
    })
  },

  dialogBubble: {
    type: 'textbox',
    coordinates: [2, 6, 28, 33],
    zIndex: 'var(--z-elevated)',
    props: {
      // Common default options for all dialog bubbles with React 18 optimizations
      getOptions(overrides = {}) {
        const defaultOptions = {
          fontSize: '300gc',
          lineHeight: '500gc',
          textAlign: "left",
          textJustify: "auto",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          borderRadius: '75gc',
          padding: '200gc',
          showTail: true,
          tailBorder: "bottom",
          tailPlacement: "middle",
          tailDirection: "south"
        };
        
        // Merge overrides with defaults
        const mergedOptions = { ...defaultOptions, ...overrides };
        return GridCellFontUtils.processGcStyles(mergedOptions);
      },
      
      // Default options getter (for backward compatibility)
      get options() {
        return this.getOptions();
      }
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('dialog', (props, elementId) => {
      return React.createElement(DialogBubbleComponent, props);
    })
  },

  nextButton: {
    type: 'button',
    coordinates: [110, 64, 125, 68],
    zIndex: 'var(--z-button)',
    props: {
      get text() {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
      },
      mode: 'enabled', // 'enabled' or 'disabled'
      backgroundColor: '#FF9900',
      color: 'white',
      fontSize: '375gc',
      fontWeight: 'bold',
      borderRadius: '50gc',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center'
    },
    
    generateProps: (targetPage) => {
      return {
        get text() {
          return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
        },
        backgroundColor: '#FF9900',
        color: 'white',
        fontSize: '375gc',
        fontWeight: 'bold',
        borderRadius: '50gc',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        onClick: () => {
          console.log(`🔄 [Next Button] Navigating to page ${targetPage}`);
          if (typeof window !== 'undefined' && window.changePageAndNotify) {
            window.changePageAndNotify(targetPage);
          }
        }
      };
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('button', (props, elementId) => {
      return React.createElement(NextButtonComponent, props);
    })
  },
  
  previousButton: {
    type: 'button',
    coordinates: [4, 64, 19, 68],
    zIndex: 'var(--z-button)',
    props: {
      get text() {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : 'Previous';
      },
      mode: 'enabled', // 'enabled' or 'disabled'
      backgroundColor: '#6699CC',
      color: 'white',
      fontSize: '375gc',
      fontWeight: 'bold',
      borderRadius: '50gc',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center'
    },
    
    generateProps: (targetPage) => {
      return {
        get text() {
          return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : 'Previous';
        },
        backgroundColor: '#6699CC',
        color: 'white',
        fontSize: '375gc',
        fontWeight: 'bold',
        borderRadius: '50gc',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        onClick: () => {
          console.log(`🔄 [Previous Button] Navigating to page ${targetPage}`);
          if (typeof window !== 'undefined' && window.changePageAndNotify) {
            window.changePageAndNotify(targetPage);
          }
        }
      };
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('button', (props, elementId) => {
      return React.createElement(PreviousButtonComponent, props);
    })
  }
};

// Export components and configuration
window.InteractionComponents = {
  CharacterComponent,
  DialogBubbleComponent,
  NextButtonComponent,
  PreviousButtonComponent,
  InteractionElements
};

console.log('✅ Interaction components loaded successfully');
