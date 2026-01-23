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
  
  // Debug: Log props to see what's being passed
  if (id && id.includes('page2-tile')) {
    console.log(`🎨 [Tile] ${id} received props:`, {
      mode: mode,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      text: props.text,
      textType: typeof props.text,
      textValue: props.text,
      children: children,
      childrenType: typeof children,
      childrenValue: children,
      childrenIsString: typeof children === 'string',
      childrenIsEmpty: children === '' || children === null || children === undefined,
      allProps: Object.keys(props)
    });
  }
  
  // State to track text content for updates from numberpad
  // Use children if available, otherwise fall back to text prop
  const initialDisplayText = React.useMemo(() => {
    if (children !== undefined && children !== null && children !== '') {
      if (id && id.includes('page2-tile')) {
        console.log(`🔍 [Tile] ${id} Using children for initialDisplayText:`, children, 'type:', typeof children);
      }
      return children;
    } else if (props.text !== undefined && props.text !== null && props.text !== '') {
      if (id && id.includes('page2-tile')) {
        console.log(`🔍 [Tile] ${id} Using text prop for initialDisplayText:`, props.text, 'type:', typeof props.text);
      }
      return props.text;
    } else {
      if (id && id.includes('page2-tile')) {
        console.log(`⚠️ [Tile] ${id} Both children and text prop are empty! children:`, children, 'text:', props.text);
      }
      return '';
    }
  }, [children, props.text, id]);
  
  const [displayText, setDisplayText] = React.useState(initialDisplayText);
  
  // State to track custom background color (overrides mode colors)
  const [customBackgroundColor, setCustomBackgroundColor] = React.useState(null);
  
  // Listen for background color updates
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    const handleBackgroundUpdate = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.elementId || event.detail.actualElementId;
        const matches = eventElementId === elementId || eventElementId === id;
        
        if (matches && event.detail.backgroundColor) {
          console.log(`🎨 [Tile] Received updateTileBackground event for ${elementId}, updating backgroundColor to: "${event.detail.backgroundColor}"`);
          setCustomBackgroundColor(event.detail.backgroundColor);
          // Also directly update the DOM element to ensure immediate visual feedback
          // Use setProperty with important flag to override any CSS rules
          const element = document.getElementById(elementId);
          if (element) {
            element.style.setProperty('background-color', event.detail.backgroundColor, 'important');
            element.style.setProperty('background-image', 'none', 'important');
            element.style.setProperty('background', 'none', 'important');
            element.style.setProperty('filter', 'none', 'important');
            element.style.setProperty('-webkit-filter', 'none', 'important');
            element.style.setProperty('opacity', '1', 'important');
            console.log(`🎨 [Tile] Directly applied backgroundColor to ${elementId}: "${event.detail.backgroundColor}" with !important`);
          }
        }
      }
    };
    
    window.addEventListener('updateTileBackground', handleBackgroundUpdate);
    return () => {
      window.removeEventListener('updateTileBackground', handleBackgroundUpdate);
    };
  }, [id, elementName, currentPage]);
  
  // Effect to apply customBackgroundColor directly to DOM element
  // This ensures the color is visible even if React's styles haven't updated yet
  React.useEffect(() => {
    if (customBackgroundColor) {
      const elementId = id || `${elementName}-${currentPage}`;
      // Use setTimeout to ensure this runs after React's render
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // Apply with !important to override React's inline styles
          element.style.setProperty('background-color', customBackgroundColor, 'important');
          element.style.setProperty('background', customBackgroundColor, 'important');
          element.style.setProperty('background-image', 'none', 'important');
          
          // Debug: check what React actually set
          const reactBg = element.style.backgroundColor;
          const reactBgShorthand = element.style.background;
          if (id && (id.includes('multiplicand') || id.includes('multiplier') || id.includes('tile-2'))) {
            console.log(`🎨 [Tile useEffect] ${elementId} - Applied !important styles. React's backgroundColor: "${reactBg}", React's background: "${reactBgShorthand}", Our customBackgroundColor: "${customBackgroundColor}"`);
          }
        }
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [customBackgroundColor, id, elementName, currentPage]);
  
  // Update displayText when children or text prop changes
  React.useEffect(() => {
    if (children !== undefined && children !== null && children !== '') {
      if (id && id.includes('page2-tile')) {
        console.log(`🔄 [Tile] ${id} Updating displayText from children:`, children);
      }
      setDisplayText(children);
    } else if (props.text !== undefined && props.text !== null && props.text !== '') {
      if (id && id.includes('page2-tile')) {
        console.log(`🔄 [Tile] ${id} Updating displayText from text prop:`, props.text);
      }
      setDisplayText(props.text);
    }
  }, [children, props.text, id]);
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
  // BUT: Don't auto-switch if customBackgroundColor is set (custom colors should persist)
  React.useEffect(() => {
    // If customBackgroundColor is set, don't auto-change mode (preserve current mode)
    if (customBackgroundColor) {
      return; // Keep current mode when custom color is set
    }
    
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
  }, [displayText, id, elementName, currentPage, customBackgroundColor]); // Include customBackgroundColor to prevent mode switching when it's set
  
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
  if (id && (id.includes('page2-tile') || id.includes('page4-tile-3'))) {
    console.log(`🎨 [Tile] ${id} - mode prop: ${mode}, currentMode state: ${currentMode}, modeStyles:`, modeStyles);
    if (currentMode === 'focus') {
      console.log(`✅ [Tile] ${id} - Focus mode active, styles:`, modeStyles);
      console.log(`🎯 [Tile] ${id} - Focus mode backgroundColor should be white:`, modeStyles?.backgroundColor);
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
    
    // Use custom background color if set (overrides mode and prop)
    // Otherwise, only set base colors/borders if mode styles don't override them
    if (customBackgroundColor) {
      baseStyle.backgroundColor = customBackgroundColor;
      // Also clear backgroundImage immediately when custom color is set
      baseStyle.backgroundImage = 'none';
      baseStyle.background = 'none';
    } else if (!modeStyles || !modeStyles.backgroundColor) {
      // Only set backgroundColor from prop if it's not transparent (to avoid overriding custom colors)
      if (backgroundColor && backgroundColor !== 'transparent') {
        baseStyle.backgroundColor = backgroundColor;
      }
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
    // BUT: preserve customBackgroundColor if it's set (it should override mode styles)
    if (modeStyles) {
      // For focus mode, remove borderColor and borderWidth so CSS can control them
      // Also ensure backgroundImage, filter, and opacity are cleared (focus mode doesn't use these)
      // BUT: Keep backgroundColor from modeStyles (white for focus mode)
      if (currentMode === 'focus') {
        const { borderColor: _, borderWidth: __, backgroundImage: ___, background: ____, filter: _____, opacity: ______, ...modeStylesWithoutBorder } = modeStyles;
        // Explicitly include backgroundColor from modeStyles (white for focus)
        if (modeStyles.backgroundColor) {
          modeStylesWithoutBorder.backgroundColor = modeStyles.backgroundColor;
        }
        Object.assign(baseStyle, modeStylesWithoutBorder);
      } else {
        Object.assign(baseStyle, modeStyles);
      }
    }
    
    // CRITICAL: For focus mode, explicitly clear out-of-focus properties AFTER all other assignments
    // BUT: only if customBackgroundColor is not set
    if (currentMode === 'focus' && !customBackgroundColor) {
      // Clear background image and filters first
      baseStyle.backgroundImage = 'none';
      baseStyle.filter = 'none'; // No blur in focus mode
      baseStyle.opacity = 1; // Full opacity in focus mode
      
      // IMPORTANT: Set backgroundColor BEFORE setting background shorthand
      // This ensures backgroundColor takes precedence
      baseStyle.backgroundColor = '#FFFFFF'; // White background for focus
      // Set background shorthand to the white color (not 'none' which makes it transparent)
      baseStyle.background = '#FFFFFF'; // White background for focus
      
      // Debug logging for focus mode
      if (id && id.includes('page4-tile-3')) {
        console.log(`🎯 [Tile] ${id} - Setting focus mode white background in containerStyle:`, {
          currentMode,
          customBackgroundColor,
          backgroundColor: baseStyle.backgroundColor,
          background: baseStyle.background
        });
      }
    }
    
    // CRITICAL: For filled mode, explicitly ensure no blur is applied AFTER all other assignments
    // BUT: only if customBackgroundColor is not set (custom color takes precedence)
    if (currentMode === 'filled' && !customBackgroundColor) {
      baseStyle.filter = 'none'; // No blur in filled mode - must be set after modeStyles are applied
      baseStyle.WebkitFilter = 'none'; // Also clear webkit filter for browser compatibility (capital W for React)
      baseStyle.backdropFilter = 'none'; // Clear backdrop filter
      baseStyle.WebkitBackdropFilter = 'none'; // Clear webkit backdrop filter
    }
    
    // CRITICAL: If customBackgroundColor is set, it should override ALL mode styles
    // This must be LAST in containerStyle to ensure it takes precedence
    if (customBackgroundColor) {
      baseStyle.backgroundColor = customBackgroundColor;
      // ALWAYS clear backgroundImage and background when custom color is set
      baseStyle.backgroundImage = 'none';
      baseStyle.background = 'none';
      // Also clear any filters that might affect the background
      baseStyle.filter = 'none';
      baseStyle.WebkitFilter = 'none';
      baseStyle.backdropFilter = 'none';
      baseStyle.WebkitBackdropFilter = 'none';
      // Ensure full opacity for custom background color
      baseStyle.opacity = 1;
      
      // Debug logging for custom background color
      if (id && (id.includes('multiplicand') || id.includes('multiplier') || id.includes('tile-2'))) {
        console.log(`🎨 [Tile ContainerStyle] ${id} - customBackgroundColor set to: "${customBackgroundColor}", baseStyle.backgroundColor: "${baseStyle.backgroundColor}", backgroundImage: "${baseStyle.backgroundImage}"`);
      }
    }

    return baseStyle;
  }, [position, backgroundColor, borderColor, borderWidth, borderStyle, borderRadius, color, fontSize, fontWeight, padding, textAlign, zIndex, modeStyles, currentMode, customBackgroundColor]);

  // Build className - include custom background class if customBackgroundColor is set
  const className = ['tile-component', modeClassName].filter(Boolean).join(' ') || undefined;
  
  // Add data attribute for custom background color (for CSS targeting)
  const dataAttributes = {};
  if (customBackgroundColor) {
    dataAttributes['data-custom-bg'] = customBackgroundColor;
  }

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
    // BUT: only if customBackgroundColor is not set
    if (currentMode === 'focus' && !customBackgroundColor) {
      style.backgroundImage = 'none';
      style.filter = 'none';
      style.opacity = 1;
      // IMPORTANT: Set backgroundColor BEFORE setting background shorthand
      style.backgroundColor = '#FFFFFF'; // White background for focus - ALWAYS override
      // Set background shorthand to the white color (not 'none' which makes it transparent)
      style.background = '#FFFFFF'; // White background for focus
      
      // Debug logging for focus mode
      if (id && id.includes('page4-tile-3')) {
        console.log(`🎯 [Tile] ${id} - Setting focus mode white background in finalStyle:`, {
          currentMode,
          customBackgroundColor,
          backgroundColor: style.backgroundColor,
          background: style.background
        });
      }
    }
    
    // CRITICAL: For filled mode, explicitly ensure no blur is applied AFTER all other assignments
    // BUT: only if customBackgroundColor is not set (custom color takes precedence)
    if (currentMode === 'filled' && !customBackgroundColor) {
      style.filter = 'none'; // No blur in filled mode - must be set after modeStyles are applied
      style.WebkitFilter = 'none'; // Also clear webkit filter for browser compatibility (capital W for React)
      style.backdropFilter = 'none'; // Clear backdrop filter
      style.WebkitBackdropFilter = 'none'; // Clear webkit backdrop filter
    }
    
    // CRITICAL: If customBackgroundColor is set, it should override ALL mode styles
    // This must be LAST to ensure it takes precedence over everything
    if (customBackgroundColor) {
      // Force set backgroundColor AND background shorthand - both must be set
      // Setting background to 'none' would override backgroundColor!
      style.backgroundColor = customBackgroundColor;
      style.background = customBackgroundColor; // Set background shorthand to the color, not 'none'!
      // ALWAYS clear backgroundImage when custom color is set
      style.backgroundImage = 'none';
      // Also clear any filters that might affect the background
      style.filter = 'none';
      style.WebkitFilter = 'none';
      style.backdropFilter = 'none';
      style.WebkitBackdropFilter = 'none';
      // Ensure full opacity for custom background color
      style.opacity = 1;
      
      // Remove any conflicting properties that might cause transparency
      delete style.backgroundClip;
      delete style.WebkitBackgroundClip;
      delete style.backgroundSize;
      delete style.backgroundPosition;
      delete style.backgroundRepeat;
      
      // Debug logging for custom background color
      if (id && (id.includes('multiplicand') || id.includes('multiplier') || id.includes('tile-2'))) {
        console.log(`🎨 [Tile FinalStyle] ${id} - customBackgroundColor set to: "${customBackgroundColor}", final style.backgroundColor: "${style.backgroundColor}", style.background: "${style.background}", backgroundImage: "${style.backgroundImage}"`);
      }
    }
    
    // Set cursor AFTER mode styles to ensure it's always correct
    style.cursor = onClick ? 'pointer' : 'default';
    
    return style;
  }, [containerStyle, modeStyles, onClick, currentMode, customBackgroundColor]);
  
  // Final render - log what we're rendering
  const finalRenderContent = displayText !== undefined && displayText !== null ? displayText : (children !== undefined && children !== null ? children : '');
  if (id && id.includes('page2-tile')) {
    console.log(`🎬 [Tile] ${id} Rendering with finalRenderContent:`, finalRenderContent, 'type:', typeof finalRenderContent, 'displayText:', displayText, 'children:', children);
  }
  
  // Merge data attributes
  const allDataAttributes = {
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-mode': currentMode,
    ...dataAttributes
  };
  
  return React.createElement('div', {
    id: id || `${elementName}-${currentPage}`,
    className: className,
    style: finalStyle,
    onClick: onClick,
    ...allDataAttributes
  }, finalRenderContent);
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

