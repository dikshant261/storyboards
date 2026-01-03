/**
 * Tile Component - React 18 Optimized
 * 
 * A flexible tile component with mode support (normal, incorrect, correct, focus)
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
 * @param {string} props.mode - Visual mode: 'normal', 'incorrect', 'correct', or 'focus'
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
    mode = 'normal',
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
    children
  } = props;
  
  // State to track text content for updates from numberpad
  const [displayText, setDisplayText] = React.useState(children || '');
  // State to track mode (can be updated dynamically via events)
  const [currentMode, setCurrentMode] = React.useState(mode);
  
  // Update mode when prop changes
  React.useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);
  
  // Listen for tile text updates from numberpad
  React.useEffect(() => {
    const elementId = id || `${elementName}-${currentPage}`;
    const handleTileUpdate = (event) => {
      if (event.detail) {
        const eventElementId = event.detail.elementId || event.detail.actualElementId;
        // Match exact ID or check if it matches our element name
        if (eventElementId === elementId || 
            eventElementId === id || 
            (elementName && eventElementId && eventElementId.includes(elementName))) {
          console.log(`🎯 [Tile] Received updateTileText event for ${elementId}, updating text to: "${event.detail.text}"`);
          setDisplayText(event.detail.text || '');
        }
      }
    };
    
    window.addEventListener('updateTileText', handleTileUpdate);
    return () => {
      window.removeEventListener('updateTileText', handleTileUpdate);
    };
  }, [id, elementName, currentPage]);
  
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
        // Don't set backgroundColor for focus mode - let the CSS animation handle it
        // The animation will animate from #FFEB3B to #FFF59D
        return {
          // backgroundColor is handled by CSS animation (.table-cell-focus-blink)
          border: `${borderWidth} solid #FFFFFF`, // white border
          color: '#000000' // black
        };
      case 'normal':
      default:
        return null; // No override, use default styles
    }
  };

  // Get mode-specific styles (use currentMode instead of mode prop)
  const modeStyles = getModeStyles(currentMode);

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
    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderStyle: borderStyle,
      borderRadius: processGcProperty(borderRadius),
      color: color,
      fontSize: processGcProperty(fontSize),
      fontWeight: fontWeight,
      padding: processGcProperty(padding),
      textAlign: textAlign,
      boxSizing: 'border-box',
      zIndex: zIndex || 1000
    };

    // Apply position if available
    if (position?.css) {
      Object.assign(baseStyle, position.css);
    }

    // Apply mode styles (override base styles)
    if (modeStyles) {
      Object.assign(baseStyle, modeStyles);
    }

    return baseStyle;
  }, [position, backgroundColor, borderColor, borderWidth, borderStyle, borderRadius, color, fontSize, fontWeight, padding, textAlign, zIndex, modeStyles, mode]);

  // Build className
  const className = ['tile-component', modeClassName].filter(Boolean).join(' ') || undefined;

  return React.createElement('div', {
    id: id || `${elementName}-${currentPage}`,
    className: className,
    style: containerStyle,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-mode': currentMode
  }, displayText || children);
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

