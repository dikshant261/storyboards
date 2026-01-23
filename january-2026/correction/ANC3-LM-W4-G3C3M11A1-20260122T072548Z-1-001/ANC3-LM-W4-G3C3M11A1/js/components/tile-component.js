/**
 * Tile Component - React 18 Optimized
 * 
 * A flexible tile component with mode support (normal, incorrect, correct, focus, out-of-focus, filled)
 * Supports standard styling props and coordinates-based positioning
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions should be loaded before this file

/**
 * Tile Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name from PageConfig
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - [x1, y1, x2, y2] coordinates
 * @param {number|string} props.zIndex - Z-index value
 * @param {string} props.mode - Visual mode: 'normal', 'incorrect', 'correct', 'focus', 'out-of-focus', or 'filled'
 * @param {string} props.backgroundColor - Background color (default: 'transparent')
 * @param {string} props.borderColor - Border color
 * @param {string} props.borderWidth - Border width (default: '2px')
 * @param {string} props.borderStyle - Border style: 'solid' or 'dashed' (default: 'solid')
 * @param {string} props.borderRadius - Border radius (supports gc units)
 * @param {string} props.color - Text color
 * @param {string} props.fontSize - Font size (supports gc units)
 * @param {string} props.fontWeight - Font weight
 * @param {string} props.padding - Padding (supports gc units)
 * @param {string} props.textAlign - Text alignment
 * @param {React.ReactNode} props.children - Child elements
 */
const TileComponent = React.memo((props) => {
  // Debug: Log props to see what's being passed
  if (props.id && props.id.includes('page2-tile')) {
    console.log(`🎨 [Tile] ${props.id} received props:`, {
      mode: props.mode,
      backgroundColor: props.backgroundColor,
      borderColor: props.borderColor,
      allProps: Object.keys(props)
    });
  }
  
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    position: positionProp,
    zIndex,
    mode = 'out-of-focus', // Default mode
    backgroundColor = 'transparent',
    borderColor = '#ffffff',
    borderWidth = '2px',
    borderStyle = 'solid',
    borderRadius = '0gc',
    color = '#ffffff',
    fontSize = '28gc',
    fontWeight = 'normal',
    padding = '15gc',
    textAlign = 'center',
    onClick,
    children
  } = props;
  
  // State to track text content for updates from numberpad
  const [displayText, setDisplayText] = React.useState(children !== undefined ? (children || '') : '');
  // State to track mode (can be updated dynamically via events)
  const [currentMode, setCurrentMode] = React.useState(mode);
  // Ref to track if mode was set via events (to prevent prop from overriding)
  const modeSetViaEventRef = React.useRef(false);
  // Ref to track initial mount
  const isInitialMountRef = React.useRef(true);
  
  // Update mode when prop changes, but only on initial mount or if not set via events
  React.useEffect(() => {
    // On initial mount, always use prop value
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      setCurrentMode(mode);
      return;
    }
    
    // After initial mount, only update from prop if:
    // 1. Mode wasn't set via events, AND
    // 2. The prop mode is different from current mode (checked via callback)
    if (!modeSetViaEventRef.current) {
      setCurrentMode(prevMode => {
        // Don't update if current mode is 'focus' (focus should persist)
        // Don't update if prop mode is same as current mode
        if (prevMode === 'focus' || prevMode === mode) {
          return prevMode;
        }
        return mode;
      });
    }
  }, [mode]); // Only depend on mode prop to avoid infinite loops
  
  // Auto-update mode based on content: if tile has value but not in focus, use 'filled' mode
  React.useEffect(() => {
    // Check data attribute to see if tile is in focus (more reliable than state)
    const elementId = id || `${elementName}-${currentPage}`;
    const element = document.getElementById(elementId);
    const dataMode = element?.getAttribute('data-tile-mode');
    
    // If in focus mode (from data attribute), don't auto-change
    if (dataMode === 'focus') {
      return; // Keep focus mode, don't auto-change
    }
    
    const hasValue = displayText && displayText.toString().trim().length > 0;
    const targetMode = hasValue ? 'filled' : 'out-of-focus';
    
    // Use functional update to check current mode without including it in dependencies
    setCurrentMode(prevMode => {
      // Don't change if in focus mode
      if (prevMode === 'focus') {
        return prevMode;
      }
      // Only update if mode needs to change
      if (prevMode !== targetMode) {
        return targetMode;
      }
      return prevMode;
    });
  }, [displayText, id, elementName, currentPage]); // Don't include currentMode to avoid loops
  
  // Listen for tile text updates from numberpad
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    const handleTileUpdate = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.elementId || event.detail.actualElementId;
        // Only match exact ID - be strict to prevent multiple tiles from updating
        const matches = eventElementId === elementId || eventElementId === id;
        
        if (matches) {
          console.log(`🎯 [Tile] Received updateTileText event for ${elementId}, updating text to: "${event.detail.text}"`);
          setDisplayText(event.detail.text || '');
        } else {
          // Debug: log when event is received but doesn't match
          if (eventElementId && (eventElementId.includes('tile-') || elementId.includes('tile-'))) {
            console.log(`🔍 [Tile] ${elementId} received updateTileText event for ${eventElementId} but IDs don't match - ignoring`);
          }
        }
      }
    };
    
    window.addEventListener('updateTileText', handleTileUpdate);
    return () => {
      window.removeEventListener('updateTileText', handleTileUpdate);
    };
  }, [id, elementName, currentPage]);
  
  // Listen for tile border updates (for check feedback)
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    const handleBorderUpdate = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.elementId;
        // Only match exact ID
        if (eventElementId === elementId || eventElementId === id) {
          const element = document.getElementById(elementId);
          if (element) {
            // Remove focus blink animation class if present (it might override border styles)
            element.classList.remove('table-cell-focus-blink');
            
            // Apply border styles with !important to override any CSS animations
            if (event.detail.borderWidth) {
              element.style.setProperty('border-width', event.detail.borderWidth, 'important');
            }
            if (event.detail.borderColor) {
              element.style.setProperty('border-color', event.detail.borderColor, 'important');
            }
            if (event.detail.borderStyle) {
              element.style.setProperty('border-style', event.detail.borderStyle, 'important');
            }
            // Stop any blinking animation
            element.style.setProperty('animation', 'none', 'important');
            
            console.log(`🎨 [Tile] Applied border update to ${elementId}:`, event.detail);
          }
        }
      }
    };
    
    const handleBorderReset = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.elementId;
        // Only match exact ID
        if (eventElementId === elementId || eventElementId === id) {
          const element = document.getElementById(elementId);
          if (element) {
            // Clear border styles - reset to default
            element.style.borderWidth = '';
            element.style.borderColor = '';
            element.style.borderStyle = '';
            
            // Reset mode based on content and focus state
            const hasValue = displayText && displayText.toString().trim().length > 0;
            const isFocused = currentMode === 'focus' || element.getAttribute('data-tile-mode') === 'focus';
            
            if (isFocused) {
              // Keep focus mode if currently focused
              setCurrentMode('focus');
            } else if (hasValue) {
              // Switch to filled mode if has value
              setCurrentMode('filled');
            } else {
              // Switch to out-of-focus mode if empty
              setCurrentMode('out-of-focus');
            }
            
            console.log(`🔄 [Tile] Reset border and mode for ${elementId}`);
          }
        }
      }
    };
    
    window.addEventListener('tileBorderUpdated', handleBorderUpdate);
    window.addEventListener('tileBorderReset', handleBorderReset);
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('tileBorderUpdated', handleBorderUpdate);
      element.addEventListener('tileBorderReset', handleBorderReset);
    }
    return () => {
      window.removeEventListener('tileBorderUpdated', handleBorderUpdate);
      window.removeEventListener('tileBorderReset', handleBorderReset);
      if (element) {
        element.removeEventListener('tileBorderUpdated', handleBorderUpdate);
        element.removeEventListener('tileBorderReset', handleBorderReset);
      }
    };
  }, [id, elementName, currentPage, displayText, currentMode]);
  
  // Listen for tile mode updates from numberpad
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    console.log(`🔍 [Tile] Setting up mode listener for: ${elementId} (id: ${id}, elementName: ${elementName}, currentPage: ${currentPage})`);
    
    const handleModeUpdate = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.destinationId;
        console.log(`🔍 [Tile] Received tileModeUpdated event:`, {
          eventElementId,
          elementId,
          id,
          elementName,
          mode: event.detail.mode
        });
        
        // Match exact ID or check if it matches our element name
        const matches = eventElementId === elementId || 
            eventElementId === id || 
            (elementName && eventElementId && eventElementId.includes(elementName)) ||
            (id && eventElementId && eventElementId === id);
        
        if (matches) {
          const newMode = event.detail.mode;
          console.log(`✅ [Tile] Mode update matched! Updating ${elementId} mode to: "${newMode}"`);
          // Mark that mode was set via event (for focus mode)
          // Reset ref when switching away from focus to allow auto-mode detection
          if (newMode === 'focus') {
            modeSetViaEventRef.current = true;
          } else {
            modeSetViaEventRef.current = false; // Allow auto-mode when not in focus
          }
          setCurrentMode(newMode);
        } else {
          console.log(`❌ [Tile] Mode update did not match for ${elementId}`);
        }
      }
    };
    
    // Also check data attribute on mount and periodically
    const checkDataAttribute = () => {
      const element = document.getElementById(elementId);
      if (element) {
        const dataMode = element.getAttribute('data-tile-mode') || element.getAttribute('data-cell-mode');
        if (dataMode && dataMode !== currentMode) {
          console.log(`🔍 [Tile] Found data attribute mode: ${dataMode} for ${elementId}`);
          // Mark that mode was set via data attribute (for focus mode)
          // Reset ref when switching away from focus to allow auto-mode detection
          if (dataMode === 'focus') {
            modeSetViaEventRef.current = true;
          } else {
            modeSetViaEventRef.current = false; // Allow auto-mode when not in focus
          }
          setCurrentMode(dataMode);
        }
      }
    };
    
    window.addEventListener('tileModeUpdated', handleModeUpdate);
    // Also listen on the element itself if it exists
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('tileModeUpdated', handleModeUpdate);
      console.log(`✅ [Tile] Added event listener to DOM element: ${elementId}`);
      // Check data attribute immediately
      checkDataAttribute();
    } else {
      console.log(`⚠️ [Tile] DOM element not found: ${elementId}, will retry`);
      // Retry finding element
      const retryInterval = setInterval(() => {
        const retryElement = document.getElementById(elementId);
        if (retryElement) {
          retryElement.addEventListener('tileModeUpdated', handleModeUpdate);
          checkDataAttribute();
          clearInterval(retryInterval);
        }
      }, 100);
      setTimeout(() => clearInterval(retryInterval), 5000); // Stop retrying after 5 seconds
    }
    
    // Check data attribute periodically
    const attributeCheckInterval = setInterval(checkDataAttribute, 500);
    
    return () => {
      window.removeEventListener('tileModeUpdated', handleModeUpdate);
      if (element) {
        element.removeEventListener('tileModeUpdated', handleModeUpdate);
      }
      clearInterval(attributeCheckInterval);
    };
  }, [id, elementName, currentPage, currentMode]);
  
  // Also listen for direct DOM updates (fallback)
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    const element = document.getElementById(elementId);
    if (element) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'characterData' || mutation.type === 'childList') {
            const newText = element.textContent || element.innerText || '';
            if (newText !== displayText) {
              setDisplayText(newText);
            }
          }
        });
      });
      
      observer.observe(element, {
        childList: true,
        characterData: true,
        subtree: true
      });
      
      return () => observer.disconnect();
    }
  }, [id, elementName, currentPage, displayText]);

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

  // Helper function to get mode-specific styles
  const getModeStyles = (mode) => {
    switch (mode) {
      case 'incorrect':
        return {
          backgroundColor: '#FA8072', // salmon
          border: `${borderWidth} solid #E9967A`, // dark salmon border
          color: '#FFFFFF' // white
        };
      case 'correct':
        return {
          backgroundColor: '#4CAF50', // green
          border: `${borderWidth} solid #45a049`, // dark green border
          color: '#FFFFFF' // white
        };
      case 'focus':
        // Orange border with blinking animation - CSS animation handles border color/width
        // Only set borderStyle, let CSS animation control borderColor and borderWidth
        return {
          backgroundColor: '#FFFFFF', // white background
          borderStyle: 'solid', // Keep border style
          color: '#000000' // black text
          // Note: borderColor and borderWidth are handled by CSS animation (.table-cell-focus-blink)
        };
      case 'out-of-focus':
        return {
          backgroundImage: 'radial-gradient(circle, rgba(200, 200, 200, 0.9) 0%, rgba(150, 150, 150, 0.95) 100%)', // gray gradient (lighter center, darker edges)
          background: 'radial-gradient(circle, rgba(200, 200, 200, 0.9) 0%, rgba(150, 150, 150, 0.95) 100%)', // also set background shorthand for compatibility
          backgroundColor: '#C8C8C8', // fallback gray
          borderColor: '#969696', // darker gray border
          borderWidth: borderWidth, // keep same width
          borderStyle: 'solid', // ensure solid style
          color: '#808080', // gray text
          opacity: 0.8,
          filter: 'blur(1px)' // slight blur effect
        };
      case 'filled':
        return {
          backgroundImage: 'radial-gradient(circle, rgba(255, 235, 59, 0.9) 0%, rgba(255, 193, 7, 0.95) 100%)', // yellow gradient (lighter center, darker edges)
          background: 'radial-gradient(circle, rgba(255, 235, 59, 0.9) 0%, rgba(255, 193, 7, 0.95) 100%)', // also set background shorthand for compatibility
          backgroundColor: '#FFEB3B', // fallback yellow
          borderColor: '#F9A825', // darker yellow/orange border
          borderWidth: borderWidth, // keep same width
          borderStyle: 'solid', // ensure solid style
          color: '#000000', // black text
          opacity: 0.8,
          filter: 'none' // No blur effect for filled mode
        };
      case 'normal':
      default:
        return null; // No override, use default styles
    }
  };

  // Get mode-specific styles (use currentMode instead of mode prop)
  const modeStyles = getModeStyles(currentMode);
  
  // Debug: Log mode for troubleshooting
  if (id && id.includes('page2-tile')) {
    console.log(`🎨 [Tile] ${id} - mode prop: ${mode}, currentMode state: ${currentMode}, modeStyles:`, modeStyles);
    if (currentMode === 'focus') {
      console.log(`✅ [Tile] ${id} - Focus mode active, styles:`, modeStyles);
    }
  }

  // Get mode-specific animation class
  const getModeClassName = (mode) => {
    switch (mode) {
      case 'incorrect':
        return 'table-cell-wiggle';
      case 'focus':
        return 'table-cell-focus-blink';
      default:
        return '';
    }
  };

  const modeClassName = getModeClassName(currentMode);

  // Build container style
  const containerStyle = React.useMemo(() => {
    // Start with base styles - but don't set colors if mode will override them
    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: processGcProperty(borderRadius),
      fontSize: processGcProperty(fontSize),
      fontWeight: fontWeight,
      padding: processGcProperty(padding),
      textAlign: textAlign,
      boxSizing: 'border-box',
      zIndex: zIndex || 1000
    };
    
    // Only set base colors/borders if mode styles don't override them
    if (!modeStyles || !modeStyles.backgroundColor) {
      baseStyle.backgroundColor = backgroundColor;
    }
    
    // For focus mode, don't set borderColor/borderWidth in inline styles - let CSS animation handle it
    if (currentMode !== 'focus') {
      if (!modeStyles || (!modeStyles.borderColor && !modeStyles.border)) {
        baseStyle.borderColor = borderColor;
        baseStyle.borderWidth = borderWidth;
        baseStyle.borderStyle = borderStyle;
      }
    } else {
      // Focus mode: only set borderStyle, CSS animation will handle color and width
      baseStyle.borderStyle = borderStyle || 'solid';
    }
    
    if (!modeStyles || !modeStyles.color) {
      baseStyle.color = color;
    }

    // Apply position if available
    if (position?.css) {
      Object.assign(baseStyle, position.css);
    }

    // Apply mode styles LAST to ensure they override base styles completely
    if (modeStyles) {
      // For focus mode, remove borderColor and borderWidth so CSS can control them
      // Also ensure backgroundImage, filter, and opacity are cleared (focus mode doesn't use these)
      if (currentMode === 'focus') {
        const { borderColor: _, borderWidth: __, backgroundImage: ___, background: ____, filter: _____, opacity: ______, ...modeStylesWithoutBorder } = modeStyles;
        Object.assign(baseStyle, modeStylesWithoutBorder);
      } else {
        Object.assign(baseStyle, modeStyles);
      }
    }
    
    // CRITICAL: For focus mode, explicitly clear out-of-focus properties AFTER all other assignments
    if (currentMode === 'focus') {
      baseStyle.backgroundImage = 'none';
      baseStyle.background = 'none';
      baseStyle.filter = 'none'; // No blur in focus mode
      baseStyle.opacity = 1; // Full opacity in focus mode
      // Ensure backgroundColor is set for focus mode
      if (!baseStyle.backgroundColor || baseStyle.backgroundColor === backgroundColor) {
        baseStyle.backgroundColor = '#FFFFFF'; // White background for focus
      }
    }
    
    // CRITICAL: For filled mode, explicitly ensure no blur is applied AFTER all other assignments
    if (currentMode === 'filled') {
      baseStyle.filter = 'none'; // No blur in filled mode - must be set after modeStyles are applied
      baseStyle.webkitFilter = 'none'; // Also clear webkit filter for browser compatibility
      baseStyle.backdropFilter = 'none'; // Clear backdrop filter
      baseStyle.WebkitBackdropFilter = 'none'; // Clear webkit backdrop filter
    }

    return baseStyle;
  }, [position, backgroundColor, borderColor, borderWidth, borderStyle, borderRadius, color, fontSize, fontWeight, padding, textAlign, zIndex, modeStyles, currentMode]);

  // Build className
  const className = ['tile-component', modeClassName].filter(Boolean).join(' ') || undefined;

  // Build final style object - ensure mode styles override everything
  const finalStyle = React.useMemo(() => {
    const style = {
      ...containerStyle
    };
    
    // CRITICAL: Apply mode styles LAST to ensure they override everything
    if (modeStyles) {
      Object.assign(style, modeStyles);
    }
    
    // For focus mode, explicitly clear out-of-focus properties and set white background
    if (currentMode === 'focus') {
      style.backgroundImage = 'none';
      style.background = '#FFFFFF'; // White background for focus
      style.filter = 'none';
      style.opacity = 1;
      style.backgroundColor = '#FFFFFF'; // Ensure white background
    }
    
    // CRITICAL: For filled mode, explicitly ensure no blur is applied AFTER all other assignments
    if (currentMode === 'filled') {
      style.filter = 'none'; // No blur in filled mode - must be set after modeStyles are applied
      style.webkitFilter = 'none'; // Also clear webkit filter for browser compatibility
      style.backdropFilter = 'none'; // Clear backdrop filter
      style.WebkitBackdropFilter = 'none'; // Clear webkit backdrop filter
    }
    
    // Set cursor AFTER mode styles to ensure it's always correct
    style.cursor = onClick ? 'pointer' : 'default';
    
    return style;
  }, [containerStyle, modeStyles, onClick, currentMode]);
  
  return React.createElement('div', {
    id: id || `${elementName}-${currentPage}`,
    className: className,
    style: finalStyle,
    onClick: onClick,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-mode': currentMode
  }, displayText !== undefined && displayText !== null ? displayText : (children !== undefined && children !== null ? children : ''));
});

// Tile Element Configuration
const TileElement = {
  tile: {
    type: 'tile',
    coordinates: [0, 0, 100, 100],
    zIndex: 1000,
    props: {
      mode: 'normal',
      backgroundColor: 'transparent',
      borderColor: '#ffffff',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '0gc',
      color: '#ffffff',
      fontSize: '28gc',
      fontWeight: 'normal',
      padding: '15gc',
      textAlign: 'center'
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('tile', (props, elementId) => {
      return React.createElement(TileComponent, props);
    })
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.TileComponent = {
    TileComponent,
    TileElement
  };
}

