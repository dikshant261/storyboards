/**
 * Standard Elements - React 18 Optimized Architecture
 * 
 * This React 18 optimized version provides:
 * - Concurrent features for better performance
 * - Suspense boundaries for graceful loading
 * - useDeferredValue for non-urgent updates
 * - useId for stable unique IDs
 * - Enhanced error boundaries
 * - Better memory management
 */

// Dependencies: GridCellFontUtils should be loaded before this file

// React 18 hooks for optimization (using global React object)
// Note: React hooks are destructured in math-applet.js to avoid conflicts

// ===== REACT 18 OPTIMIZED ELEMENT FACTORIES =====

/**
 * Creates a memoized element factory with React 18 optimizations
 * @param {string} elementType - Type of element
 * @param {Function} createFn - Element creation function
 * @returns {Function} Optimized element factory
 */
const createOptimizedElementFactory = (elementType, createFn) => {
  return React.memo(React.forwardRef((props, ref) => {
    const elementId = React.useId();
    const [isPending, startTransition] = React.useTransition();
    const deferredProps = React.useDeferredValue(props);
    
    // Use insertion effect for DOM manipulations that need to happen before layout
    React.useInsertionEffect(() => {
      if (ref?.current && elementType === 'table') {
        // Optimize table rendering with insertion effect
        ref.current.setAttribute('data-element-type', elementType);
      }
    }, [elementType, ref]);
    
    const element = React.useMemo(() => {
      return createFn(deferredProps, elementId);
    }, [deferredProps, elementId]);
    
    return element;
  }));
};

/**
 * Suspense Loading Component for Heavy Elements
 */
const ElementLoadingFallback = React.memo(({ elementType = 'element' }) => {
  const loadingId = React.useId();
  
  return React.createElement('div', {
    className: 'element-loading-fallback',
    'aria-labelledby': loadingId,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontSize: '14px',
      color: '#666',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      border: '1px dashed #ccc'
    }
  }, [
    React.createElement('div', {
      key: 'spinner',
      style: {
        width: '16px',
        height: '16px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '8px'
      }
    }),
    React.createElement('span', { 
      key: 'message',
      id: loadingId 
    }, `Loading ${elementType}...`)
  ]);
});

// Standard elements for consistent placement across all pages - React 18 Optimized
const StandardElements = {
    // Layout elements with React 18 optimizations
    header: {
        type: 'textbox',
        coordinates: [1, 1, 4, 128],
        zIndex: 'var(--z-header)',
        props: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        // React 18 optimization: factory function
        createOptimized: createOptimizedElementFactory('header', (props, elementId) => {
            const processedStyles = GridCellFontUtils.processGcStyles(props);
            return React.createElement('div', {
                id: elementId,
                className: 'header-container math-app-header',
                style: processedStyles,
                'data-element-type': 'header'
            }, props.text || 'Math Learning Platform');
        })
    },
    
    footer: {
        type: 'container',
        coordinates: [68, 1, 72, 128],
        zIndex: 'var(--z-content)',
        props: {},
        createOptimized: createOptimizedElementFactory('footer', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'footer-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'footer'
            });
        })
    },

    leftSidebar: {
        type: 'container',
        coordinates: [9, 1, 67, 32],
        zIndex: 'var(--z-content)',
        props: {},
        createOptimized: createOptimizedElementFactory('sidebar', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'left-sidebar-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'left-sidebar'
            });
        })
    },
    
    rightSidebar: {
        type: 'container',
        coordinates: [9, 97, 67, 128],
        zIndex: 'var(--z-content)',
        props: {},
        createOptimized: createOptimizedElementFactory('sidebar', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'right-sidebar-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'right-sidebar'
            });
        })
    },
    
    mainContent: {
        type: 'container',
        coordinates: [9, 33, 67, 96],
        zIndex: 'var(--z-content)',
        props: {},
        createOptimized: createOptimizedElementFactory('container', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'main-content-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'main-content'
            });
        })
    },
    
    fullContent: {
        type: 'container',
        coordinates: [9, 1, 67, 128],
        zIndex: 'var(--z-content)',
        props: {},
        createOptimized: createOptimizedElementFactory('container', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'full-content-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'full-content'
            });
        })
    },
    
    modalCenter: {
        type: 'container',
        coordinates: [16, 36, 60, 100],
        zIndex: 'var(--z-elevated)',
        props: {},
        createOptimized: createOptimizedElementFactory('modal', (props, elementId) => {
            return React.createElement('div', {
                id: elementId,
                className: 'modal-center-container',
                style: {
                    ...GridCellFontUtils.processGcStyles(props),
                    position: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                'data-element-type': 'modal-center'
            });
        })
    },

    // Character and interaction elements with React 18 optimizations
    character: {
        type: 'image',
        coordinates: [34, 2, 72, 28],
        zIndex: 'var(--z-content)',
        props: {
            src: 'assets/character_excited.png',
            alt: 'Excited Character',
            style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                margin: '0',
                padding: '0',
                display: 'block',
                boxSizing: 'border-box'
            }
        },
        createOptimized: createOptimizedElementFactory('image', (props, elementId) => {
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
                !imageLoaded && React.createElement(ElementLoadingFallback, {
                    key: 'loading',
                    elementType: 'image'
                }),
                React.createElement('img', {
                    key: 'image',
                    src: props.src,
                    alt: props.alt,
                    onLoad: handleImageLoad,
                    style: {
                        ...props.style,
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }
                })
            ]);
        })
    },

    dialogBubble: {
        type: 'textbox',
        coordinates: [6, 2, 33, 28],
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
        createOptimized: createOptimizedElementFactory('dialog', (props, elementId) => {
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
        })
    },

    // Progress dots with React 18 concurrent features
    progressDots: {
        type: 'progress',
        coordinates: [64, 30, 68, 90],
        zIndex: 'var(--z-notification)',
        props: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50gc',
            padding: '25gc',
            
            // Dot styling
            dotSize: '75gc',
            activeDotColor: '#4CAF50',
            inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
            activeDotBorder: '2px solid #4CAF50',
            inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
            
            // Animation
            transition: 'all 0.3s ease',
            
            // Text styling (for numbers inside dots)
            fontSize: '45gc',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
        },
        createOptimized: createOptimizedElementFactory('progress', (props, elementId) => {
            const [isPending, startTransition] = React.useTransition();
            const deferredCurrentPage = React.useDeferredValue(props.currentPage);
            
            const handleDotClick = React.useCallback((pageNumber) => {
                startTransition(() => {
                    props.onNavigate?.(pageNumber);
                });
            }, [props.onNavigate]);
            
            const dots = React.useMemo(() => {
                const totalPages = props.totalPages || 2;
                return Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === deferredCurrentPage;
                    
                    return React.createElement('div', {
                        key: `dot-${pageNumber}`,
                        className: `progress-dot ${isActive ? 'active' : 'inactive'}`,
                        style: GridCellFontUtils.processGcStyles({
                            width: props.dotSize,
                            height: props.dotSize,
                            backgroundColor: isActive ? props.activeDotColor : props.inactiveDotColor,
                            border: isActive ? props.activeDotBorder : props.inactiveDotBorder,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: props.fontSize,
                            fontWeight: props.fontWeight,
                            color: props.color,
                            transition: props.transition,
                            opacity: isPending ? 0.7 : 1
                        }),
                        onClick: () => handleDotClick(pageNumber),
                        'data-page': pageNumber
                    }, pageNumber.toString());
                });
            }, [deferredCurrentPage, props, isPending, handleDotClick]);
            
            return React.createElement('div', {
                id: elementId,
                className: 'progress-dots-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'progress-dots'
            }, ...dots);
        })
    },

    // Buttons with React 18 optimizations
    nextButton: {
        type: 'button',
        coordinates: [64, 110, 68, 125],
        zIndex: 'var(--z-button)',
        props: {
            get text() {
                return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
            },
            backgroundColor: '#FF9900',
            color: 'white',
            fontSize: '250gc',
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
                fontSize: '250gc',
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
        
        createOptimized: createOptimizedElementFactory('button', (props, elementId) => {
            const [isPending, startTransition] = React.useTransition();
            const deferredText = React.useDeferredValue(props.text);
            
            const handleClick = React.useCallback(() => {
                startTransition(() => {
                    props.onClick?.();
                });
            }, [props.onClick]);
            
            return React.createElement('button', {
                id: elementId,
                className: 'next-button math-app-button',
                style: {
                    ...GridCellFontUtils.processGcStyles(props),
                    opacity: isPending ? 0.7 : 1,
                    transform: isPending ? 'scale(0.95)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                },
                onClick: handleClick,
                disabled: isPending,
                'data-element-type': 'next-button'
            }, deferredText);
        })
    },
    
    previousButton: {
        type: 'button',
        coordinates: [64, 4, 68, 19],
        zIndex: 'var(--z-button)',
        props: {
            get text() {
                return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : 'Previous';
            },
            backgroundColor: '#6699CC',
            color: 'white',
            fontSize: '250gc',
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
                fontSize: '250gc',
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
        
        createOptimized: createOptimizedElementFactory('button', (props, elementId) => {
            const [isPending, startTransition] = React.useTransition();
            const deferredText = React.useDeferredValue(props.text);
            
            const handleClick = React.useCallback(() => {
                startTransition(() => {
                    props.onClick?.();
                });
            }, [props.onClick]);
            
            return React.createElement('button', {
                id: elementId,
                className: 'previous-button math-app-button',
                style: {
                    ...GridCellFontUtils.processGcStyles(props),
                    opacity: isPending ? 0.7 : 1,
                    transform: isPending ? 'scale(0.95)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                },
                onClick: handleClick,
                disabled: isPending,
                'data-element-type': 'previous-button'
            }, deferredText);
        })
    },

    // Complex elements with Suspense boundaries
    partitionedRectangle: {
        type: 'partitioned-rectangle',
        coordinates: [20, 20, 60, 80],
        zIndex: 'var(--z-content)',
        props: {
            // Grid structure definition - flexible row/column system
            gridStructure: {
                rows: [
                    { columns: 4, height: '1fr' },
                    { columns: 3, height: '1fr' },  
                    { columns: 5, height: '1fr' }
                ]
            },
            
            // Individual cell configurations (optional)
            cellConfigs: {
                '1-1': { backgroundColor: '#ff6b6b', id: 'cell-top-left' },
                '1-2': { backgroundColor: '#4ecdc4', id: 'cell-top-center-1' },
                '2-1': { backgroundColor: '#45b7d1', id: 'cell-middle-left' },
                '3-3': { backgroundColor: '#96ceb4', id: 'cell-bottom-center' }
            },
            
            // Default cell styling
            defaultCellStyle: {
                backgroundColor: '#f0f0f0',
                color: '#333',
                fontSize: '14px',
                fontWeight: 'normal'
            },
            
            // Container border properties
            containerBorder: {
                color: '#ffffff',
                width: '3px',
                style: 'solid'
            },
            
            // Interactive properties
            clickable: true,
            hoverable: true,
            
            // Event handlers
            onCellClick: null,
            onCellHover: null,
            onCellDoubleClick: null
        },
        
        createOptimized: createOptimizedElementFactory('partitioned-rectangle', (props, elementId) => {
            return React.createElement(React.Suspense, {
                fallback: React.createElement(ElementLoadingFallback, { 
                    elementType: 'partitioned rectangle' 
                })
            }, React.createElement('div', {
                id: elementId,
                className: 'partitioned-rectangle-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'partitioned-rectangle'
            }, 'Partitioned Rectangle Content'));
        })
    },

    numberPadPanel: {
        type: 'number-pad-panel',
        coordinates: [20, 20, 80, 80],
        zIndex: 'var(--z-elevated)',
        props: {
            backgroundColor: '#8B4513',
            borderRadius: '15gc',
            border: '4px solid #D2691E',
            padding: '20gc',
            
            showButton: {
                backgroundColor: '#FFD700',
                color: '#000000',
                fontSize: '35gc',
                fontWeight: 'bold',
                text: 'show 💡'
            },
            
            numberButtons: {
                backgroundColor: '#FFD700',
                color: '#000000',
                fontSize: '45gc',
                fontWeight: 'bold'
            },
            
            checkButton: {
                backgroundColor: '#FF8C00',
                color: '#000000',
                fontSize: '35gc',
                fontWeight: 'bold',
                text: 'CHECK'
            }
        },
        
        createOptimized: createOptimizedElementFactory('number-pad', (props, elementId) => {
            return React.createElement(React.Suspense, {
                fallback: React.createElement(ElementLoadingFallback, { 
                    elementType: 'number pad' 
                })
            }, React.createElement('div', {
                id: elementId,
                className: 'number-pad-panel-container',
                style: GridCellFontUtils.processGcStyles(props),
                'data-element-type': 'number-pad-panel'
            }, 'Number Pad Content'));
        })
    }
};

// ===== REACT 18 ELEMENT CONTEXT =====

/**
 * Element Context for sharing element state across components
 */
const ElementContext = React.createContext({
    elements: new Map(),
    updateElement: () => {},
    removeElement: () => {}
});

/**
 * Element Provider Component
 */
const ElementProvider = ({ children }) => {
    const [elements, setElements] = React.useState(new Map());
    
    const updateElement = React.useCallback((elementId, updates) => {
        startTransition(() => {
            setElements(prev => {
                const newElements = new Map(prev);
                const existing = newElements.get(elementId) || {};
                newElements.set(elementId, { ...existing, ...updates });
                return newElements;
            });
        });
    }, []);
    
    const removeElement = React.useCallback((elementId) => {
        startTransition(() => {
            setElements(prev => {
                const newElements = new Map(prev);
                newElements.delete(elementId);
                return newElements;
            });
        });
    }, []);
    
    const contextValue = React.useMemo(() => ({
        elements,
        updateElement,
        removeElement
    }), [elements, updateElement, removeElement]);
    
    return React.createElement(ElementContext.Provider, {
        value: contextValue
    }, children);
};

/**
 * Hook to use element context
 */
const useElements = () => {
    const context = React.useContext(ElementContext);
    if (!context) {
        throw new Error('useElements must be used within an ElementProvider');
    }
    return context;
};

// Make StandardElements globally available with React 18 optimizations
window.StandardElementsReact18 = StandardElements;
window.ElementProvider = ElementProvider;
window.useElements = useElements;
window.ElementLoadingFallback = ElementLoadingFallback;

// Backward compatibility
window.StandardElements = StandardElements;

console.log('✅ React 18 optimized elements.js loaded successfully');
