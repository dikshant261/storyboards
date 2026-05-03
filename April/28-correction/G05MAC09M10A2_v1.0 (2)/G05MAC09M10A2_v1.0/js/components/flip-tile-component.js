/**
 * Flip Tile Component - React 18 Optimized
 * 
 * A clickable tile component that flips to reveal content on the back side.
 * Supports separate styling for front and back faces, three flip modes
 * (correct, incorrect, custom), and blinking animations.
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions should be loaded before this file

/**
 * Flip Tile Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name from PageConfig
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - [x1, y1, x2, y2] coordinates
 * @param {number|string} props.zIndex - Z-index value
 * 
 * Front Side Props:
 * @param {string} props.frontText - Text content for front side
 * @param {string} props.frontImage - Image URL for front side
 * @param {string} props.frontBackgroundColor - Background color for front side
 * @param {string} props.frontBorderColor - Border color for front side
 * @param {string} props.frontBorderWidth - Border width for front side
 * @param {string} props.frontBorderStyle - Border style for front side (solid, dashed, etc.)
 * @param {string} props.frontBorderRadius - Border radius for front side
 * @param {string} props.frontColor - Text color for front side
 * @param {string} props.frontFontSize - Font size for front side
 * @param {string} props.frontFontWeight - Font weight for front side
 * 
 * Back Side Props:
 * @param {string} props.backText - Text content for back side
 * @param {string} props.backHtml - HTML content for back side (takes precedence over backText)
 * @param {string} props.backImage - Image URL for back side
 * @param {string} props.flipMode - Flip mode: 'correct', 'incorrect', or 'custom'
 * @param {string} props.backBackgroundColor - Background color for back side (custom mode)
 * @param {string} props.backBorderColor - Border color for back side (custom mode)
 * @param {string} props.backBorderWidth - Border width for back side (custom mode)
 * @param {string} props.backBorderStyle - Border style for back side (custom mode)
 * @param {string} props.backBorderRadius - Border radius for back side (custom mode)
 * @param {string} props.backColor - Text color for back side (custom mode)
 * @param {string} props.backFontSize - Font size for back side (custom mode)
 * @param {string} props.backFontWeight - Font weight for back side (custom mode)
 * 
 * Animation Props:
 * @param {boolean} props.blinkBorder - Enable border blinking on front side
 * @param {boolean} props.blinkBackground - Enable background blinking on front side
 * @param {boolean} props.blinkText - Enable text blinking on front side
 * 
 * Behavior Props:
 * @param {boolean} props.isFlipped - Controlled flip state (optional)
 * @param {Function} props.onClick - Custom click handler
 * @param {string} props.onFlipChangeTargetId - ID of element to update when flipped (changes backgroundColor to rgba(74, 85, 104, 0.45))
 * @param {string} props.onFlipHideTargetId - ID of element to hide when flipped (sets display to 'none')
 * @param {boolean} props.flipBack - If true, allow infinite flips. If false, flip only once then disable (default: true)
 */
const FlipTileComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    position: positionProp,
    zIndex,

    // Front side props
    frontText = '',
    frontImage = '',
    frontBackgroundColor = 'transparent',
    frontBorderColor = '#ffffff',
    frontBorderWidth = '2px',
    frontBorderStyle = 'solid',
    frontBorderRadius = '0gc',
    frontColor = '#ffffff',
    frontFontSize = '28gc',
    frontFontWeight = 'normal',

    // Back side props
    backText = '',
    backHtml = '',
    backImage = '',
    flipMode = 'custom', // 'correct', 'incorrect', 'custom'
    backBackgroundColor = 'transparent',
    backBorderColor = '#ffffff',
    backBorderWidth = '2px',
    backBorderStyle = 'solid',
    backBorderRadius = '0gc',
    backColor = '#ffffff',
    backFontSize = '28gc',
    backFontWeight = 'normal',

    // Animation props
    blinkBorder = false,
    blinkBackground = false,
    blinkText = false,

    // Behavior props
    isFlipped: controlledFlipped,
    onClick,
    onFlipChangeTargetId,
    onFlipHideTargetId,
    flipBack = true, // Default: allow infinite flips
    children
  } = props;

  // Internal flip state (used when not controlled)
  const [internalFlipped, setInternalFlipped] = React.useState(false);

  // Track if tile has been flipped (for flipBack = false)
  const [hasFlipped, setHasFlipped] = React.useState(false);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledFlipped !== undefined;
  const isFlipped = isControlled ? controlledFlipped : internalFlipped;

  // Ensure flip state is reset when the page or tile id changes.
  // This prevents a tile from appearing flipped when navigating between pages
  // that both contain flip tiles, due to any potential React reuse of components.
  React.useLayoutEffect(() => {
    if (!isControlled) {
      setInternalFlipped(false);
      setHasFlipped(false);
    }
  }, [currentPage, id, isControlled]);

  // Track if hide target has been hidden (maintain state)
  const [hideTargetHidden, setHideTargetHidden] = React.useState(false);

  // Get position from props (passed from ElementRenderer) or construct from coordinates
  const position = React.useMemo(() => {
    // Use position prop if available (passed from ElementRenderer)
    if (positionProp) {
      return positionProp;
    }
    // Otherwise, construct position object from coordinates if available
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      // Use GridPositionUtils if available
      if (typeof GridPositionUtils !== 'undefined' && GridPositionUtils.coordinatesToCSS) {
        const css = GridPositionUtils.coordinatesToCSS(coordinates);
        return {
          coordinates: coordinates,
          css: css
        };
      }
      // Fallback: return coordinates for processGcProperty
      return {
        coordinates: coordinates,
        css: {}
      };
    }
    return null;
  }, [positionProp, coordinates]);

  // Process GC units for styling
  const processGcProperty = (value) => {
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      return GridCellFontUtils.processGcProperty(value, position?.coordinates || [0, 0, 100, 100]);
    }
    return value;
  };

  // Convert simple LaTeX values in the text (supports $\\frac{}{}$ and \\times)
  const convertLatexToHtml = React.useCallback((text) => {
    if (!text || typeof text !== 'string') return text;

    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Convert all \frac{num}{den} patterns inside inline block
      const converted = content.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (m, numerator, denominator) => {
        return `<span style="display:inline-block;vertical-align:middle;text-align:center;line-height:1.2;">` +
          `<span style="display:block;border-bottom:1px solid currentColor;padding:0 2px;">${numerator}</span>` +
          `<span style="display:block;padding:0 2px;">${denominator}</span>` +
          `</span>`;
      });

      return converted
        .replace(/\\times/g, '<span style="margin:0 6px;">×</span>')
        .replace(/\\cdot/g, '<span style="margin:0 6px;">·</span>');
    });

    // Also support old direct \frac usage outside $..$ for backward compatibility
    result = result.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (m, numerator, denominator) => {
      return `<span style="display:inline-block;vertical-align:middle;text-align:center;line-height:1.2;">` +
        `<span style="display:block;border-bottom:1px solid currentColor;padding:0 2px;">${numerator}</span>` +
        `<span style="display:block;padding:0 2px;">${denominator}</span>` +
        `</span>`;
    });
    result = result
      .replace(/\\times/g, '<span style="margin:0 6px;">×</span>')
      .replace(/\\cdot/g, '<span style="margin:0 6px;">·</span>');
    return result;
  }, []);

  // Handle click event
  const handleClick = React.useCallback((e) => {
    e.stopPropagation();

    // If flipBack is false and already flipped, don't allow flipping back
    if (!flipBack && isFlipped && hasFlipped) {
      console.log('🚫 [FlipTile] Flip back disabled, tile stays flipped');
      return;
    }

    // Toggle flip state if not controlled
    const newFlippedState = !isFlipped;
    if (!isControlled) {
      setInternalFlipped(prev => !prev);
    }

    // Mark as flipped if flipping to flipped state
    if (newFlippedState) {
      setHasFlipped(true);
    }

    // Update target element if specified and flipping to flipped state
    if (onFlipChangeTargetId && newFlippedState) {
      const targetElement = document.getElementById(onFlipChangeTargetId);
      if (targetElement) {
        targetElement.style.backgroundColor = 'rgba(74, 85, 104, 0.45)';
      }
    }

    // Hide target element if specified and flipping to flipped state
    if (onFlipHideTargetId && newFlippedState) {
      setHideTargetHidden(true);
      // Try to find and hide the element immediately
      const hideElement = () => {
        const targetElement = document.getElementById(onFlipHideTargetId);
        if (targetElement) {
          targetElement.style.display = 'none';
          console.log(`✅ [FlipTile] Hidden element: ${onFlipHideTargetId}`);
        } else {
          console.warn(`⚠️ [FlipTile] Element not found: ${onFlipHideTargetId}, will retry`);
          // Retry after a short delay in case element hasn't rendered yet
          setTimeout(() => {
            const retryElement = document.getElementById(onFlipHideTargetId);
            if (retryElement) {
              retryElement.style.display = 'none';
              console.log(`✅ [FlipTile] Hidden element on retry: ${onFlipHideTargetId}`);
            }
          }, 100);
        }
      };
      hideElement();
    }

    // Call custom onClick handler if provided
    if (onClick) {
      onClick(e, newFlippedState);
    }

    // Play click sound if available
    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('flip-tile');
    }
  }, [isControlled, isFlipped, flipBack, hasFlipped, onClick, onFlipChangeTargetId, onFlipHideTargetId]);

  // Maintain hide target visibility state using useEffect
  React.useEffect(() => {
    if (onFlipHideTargetId && isFlipped) {
      const hideElement = () => {
        const targetElement = document.getElementById(onFlipHideTargetId);
        if (targetElement) {
          targetElement.style.display = 'none';
          setHideTargetHidden(true);
          console.log(`✅ [FlipTile] useEffect: Hidden element: ${onFlipHideTargetId}`);
        } else {
          // Retry after a short delay
          setTimeout(() => {
            const retryElement = document.getElementById(onFlipHideTargetId);
            if (retryElement) {
              retryElement.style.display = 'none';
              setHideTargetHidden(true);
              console.log(`✅ [FlipTile] useEffect: Hidden element on retry: ${onFlipHideTargetId}`);
            } else {
              console.warn(`⚠️ [FlipTile] useEffect: Element not found: ${onFlipHideTargetId}`);
            }
          }, 100);
        }
      };
      hideElement();
    }
    // Note: Once hidden, it stays hidden (state is maintained)
  }, [isFlipped, onFlipHideTargetId]);

  // Check if all flip tiles on the current page are flipped and dispatch quizCompleted event
  React.useEffect(() => {
    if (isFlipped) {
      // Get current page number
      const getCurrentPage = () => {
        return typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : currentPage;
      };

      const pageNumber = getCurrentPage();

      // Function to check if all flip tiles on the page are flipped
      const checkAllFlipTilesFlipped = () => {
        // Find all flip tiles - check by component type and page
        const allFlipTiles = document.querySelectorAll(
          '[data-component-type="FlipTileComponent"], ' +
          '[data-component="FlipTileComponent"], ' +
          '.flip-tile-container'
        );

        if (allFlipTiles.length === 0) {
          return false; // No flip tiles found
        }

        // Filter flip tiles for current page
        const pageFlipTiles = Array.from(allFlipTiles).filter((tile) => {
          const tilePage = tile.getAttribute('data-page');
          const tileId = tile.id || '';
          // Check if tile belongs to current page by data-page attribute or ID pattern
          return tilePage === String(pageNumber) ||
            tileId.includes(`page${pageNumber}`) ||
            (tilePage === null && tileId.includes(`page${pageNumber}`));
        });

        if (pageFlipTiles.length === 0) {
          return false; // No flip tiles found for this page
        }

        // Check if all flip tiles are flipped
        let allFlipped = true;
        pageFlipTiles.forEach((tile) => {
          const flipped = tile.getAttribute('data-flipped') === 'true';
          if (!flipped) {
            allFlipped = false;
          }
        });

        console.log(`🔍 [FlipTile] Completion check: ${pageFlipTiles.length} tiles found, ${allFlipped ? 'all' : 'not all'} flipped`);
        return allFlipped;
      };

      // Check after a short delay to allow DOM to update
      const checkCompletion = () => {
        setTimeout(() => {
          if (checkAllFlipTilesFlipped()) {
            console.log(`✅ [FlipTile] All flip tiles on page ${pageNumber} are flipped, dispatching quizCompleted event`);
            // Dispatch quizCompleted event
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('quizCompleted', {
                detail: {
                  pageNumber: pageNumber,
                  source: 'FlipTileComponent',
                  timestamp: Date.now()
                }
              }));

              // Also mark page as completed if PageCompletionManager is available
              if (window.PageCompletionManager) {
                window.PageCompletionManager.markPageCompleted(pageNumber);
              }
            }
          }
        }, 150);
      };

      checkCompletion();
    }
  }, [isFlipped, currentPage]);

  // Get mode-specific styles for back side
  const getBackModeStyles = React.useCallback(() => {
    switch (flipMode) {
      case 'correct':
        return {
          backgroundColor: 'rgba(33, 145, 80, 0.45)', // Green with 45% opacity
          borderColor: 'var(--color-green-dark, #0B803D)',
          color: '#FFFFFF'
        };
      case 'incorrect':
        return {
          backgroundColor: 'var(--color-salmon, #FF6B61)',
          borderColor: 'var(--color-salmon-dark, #C94A40)',
          color: '#FFFFFF'
        };
      case 'custom':
      default:
        return {
          backgroundColor: backBackgroundColor,
          borderColor: backBorderColor,
          color: backColor
        };
    }
  }, [flipMode, backBackgroundColor, backBorderColor, backColor]);

  const backModeStyles = getBackModeStyles();

  // Build container style
  const containerStyle = React.useMemo(() => {
    // Disable cursor pointer if flipBack is false and already flipped
    const isClickable = flipBack || !isFlipped || !hasFlipped;
    const baseStyle = {
      position: 'absolute',
      perspective: '1000px',
      cursor: isClickable ? 'pointer' : 'default',
      boxSizing: 'border-box',
      zIndex: zIndex || 1000
    };

    // Apply position if available
    if (position?.css) {
      Object.assign(baseStyle, position.css);
    }

    return baseStyle;
  }, [position, zIndex, flipBack, isFlipped, hasFlipped]);

  // Build inner wrapper style (this rotates)
  const innerStyle = React.useMemo(() => {
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease-in-out',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
    };
  }, [isFlipped]);

  // Build front face style
  const frontStyle = React.useMemo(() => {
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: frontBackgroundColor,
      borderColor: frontBorderColor,
      borderWidth: frontBorderWidth,
      borderStyle: frontBorderStyle,
      borderRadius: processGcProperty(frontBorderRadius),
      color: frontColor,
      fontSize: processGcProperty(frontFontSize),
      fontWeight: frontFontWeight,
      boxSizing: 'border-box',
      overflow: 'hidden'
    };
  }, [frontBackgroundColor, frontBorderColor, frontBorderWidth, frontBorderStyle, frontBorderRadius, frontColor, frontFontSize, frontFontWeight]);

  // Build back face style
  const backStyle = React.useMemo(() => {
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: backModeStyles.backgroundColor,
      borderColor: backModeStyles.borderColor,
      borderWidth: flipMode === 'custom' ? backBorderWidth : '2px',
      borderStyle: flipMode === 'custom' ? backBorderStyle : 'solid',
      borderRadius: processGcProperty(flipMode === 'custom' ? backBorderRadius : frontBorderRadius),
      color: backModeStyles.color,
      fontSize: processGcProperty(backFontSize), // Always use backFontSize
      fontWeight: backFontWeight, // Always use backFontWeight
      boxSizing: 'border-box',
      overflow: 'hidden'
    };
  }, [backModeStyles, backBorderWidth, backBorderStyle, backBorderRadius, backFontSize, backFontWeight, flipMode, frontBorderRadius, frontFontSize, frontFontWeight]);

  // Build className for front face with blink animations
  const frontClassName = React.useMemo(() => {
    const classes = ['flip-tile-front'];
    if (blinkBorder) classes.push('flip-tile-blink-border');
    if (blinkBackground) classes.push('flip-tile-blink-bg');
    return classes.join(' ');
  }, [blinkBorder, blinkBackground]);

  // Build className for front text with blink animation
  const frontTextClassName = React.useMemo(() => {
    const classes = ['flip-tile-front-content'];
    if (blinkText) classes.push('flip-tile-blink-text');
    return classes.join(' ');
  }, [blinkText]);

  // Render front content
  const renderFrontContent = () => {
    if (frontImage) {
      return React.createElement('img', {
        src: frontImage,
        alt: frontText || 'Front image',
        style: {
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }
      });
    }
    const content = frontText || children || '';
    const converted = convertLatexToHtml(content);
    const isHtml = /<[^>]+>/.test(converted);

    return React.createElement('span', {
      className: frontTextClassName,
      style: {
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        overflow: 'hidden'
      },
      ...(isHtml ? { dangerouslySetInnerHTML: { __html: converted } } : {})
    }, isHtml ? null : converted);
  };

  // Render back content
  const renderBackContent = () => {
    if (backImage) {
      return React.createElement('img', {
        src: backImage,
        alt: backText || 'Back image',
        style: {
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }
      });
    }

    if (backHtml) {
      const renderedHtml = convertLatexToHtml(backHtml);
      return React.createElement('span', {
        className: 'flip-tile-back-content',
        style: {
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
          overflow: 'hidden'
        },
        dangerouslySetInnerHTML: { __html: renderedHtml }
      });
    }

    const converted = convertLatexToHtml(backText || '');
    const backIsHtml = /<[^>]+>/.test(converted);
    return React.createElement('span', {
      className: 'flip-tile-back-content',
      style: {
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        overflow: 'hidden'
      },
      ...(backIsHtml ? { dangerouslySetInnerHTML: { __html: converted } } : {})
    }, backIsHtml ? null : converted);
  };

  return React.createElement('div', {
    id: id || `${elementName}-${currentPage}`,
    className: 'flip-tile-container',
    style: containerStyle,
    onClick: handleClick,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-flipped': isFlipped,
    'data-flip-mode': flipMode,
    'data-component-type': 'FlipTileComponent',
    'data-component': 'FlipTileComponent',
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e);
      }
    },
    'aria-label': `Flip tile${frontText ? `: ${frontText}` : ''}`
  },
    // Inner wrapper that rotates
    React.createElement('div', {
      className: 'flip-tile-inner',
      style: innerStyle
    }, [
      // Front face
      React.createElement('div', {
        key: 'front',
        className: frontClassName,
        style: frontStyle
      }, renderFrontContent()),
      // Back face
      React.createElement('div', {
        key: 'back',
        className: 'flip-tile-back',
        style: backStyle
      }, renderBackContent())
    ])
  );
});

// Flip Tile Element Configuration
const FlipTileElement = {
  flipTile: {
    type: 'flipTile',
    coordinates: [0, 0, 100, 100],
    zIndex: 1000,
    props: {
      // Front side defaults
      frontText: '',
      frontImage: '',
      frontBackgroundColor: 'transparent',
      frontBorderColor: '#ffffff',
      frontBorderWidth: '2px',
      frontBorderStyle: 'solid',
      frontBorderRadius: '0gc',
      frontColor: '#ffffff',
      frontFontSize: '28gc',
      frontFontWeight: 'normal',

      // Back side defaults
      backText: '',
      backImage: '',
      flipMode: 'custom',
      backBackgroundColor: 'transparent',
      backBorderColor: '#ffffff',
      backBorderWidth: '2px',
      backBorderStyle: 'solid',
      backBorderRadius: '0gc',
      backColor: '#ffffff',
      backFontSize: '28gc',
      backFontWeight: 'normal',

      // Animation defaults
      blinkBorder: false,
      blinkBackground: false,
      blinkText: false,

      // Behavior defaults
      flipBack: true // Allow infinite flips by default
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('flipTile', (props, elementId) => {
      return React.createElement(FlipTileComponent, props);
    })
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.FlipTileComponent = {
    FlipTileComponent,
    FlipTileElement
  };
}

