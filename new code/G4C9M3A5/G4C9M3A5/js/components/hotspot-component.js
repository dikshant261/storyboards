/**
 * Hotspot Component - React 18 Optimized
 * 
 * A clickable circular hotspot component that indicates an area to click on.
 * Features pulse animation to draw attention and customizable styling.
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions should be loaded before this file

/**
 * Hotspot Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name from PageConfig
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - [x1, y1, x2, y2] coordinates
 * @param {Object} props.position - Position object with css property containing left, top, width, height percentages
 * @param {number|string} props.zIndex - Z-index value
 * @param {string} props.backgroundColor - Background color (default: 'rgba(255, 153, 0, 0.6)')
 * @param {string} props.borderColor - Border color (default: '#FF9900')
 * @param {string} props.borderWidth - Border width (default: '3px')
 * @param {string} props.size - Size of the hotspot (diameter) in gc units or pixels (default: '40gc')
 * @param {boolean} props.animated - Whether to show pulse animation (default: true)
 * @param {Function} props.onClick - Click handler function
 * @param {Function} props.onMouseDown - Mouse down handler function (for dragging)
 * @param {Function} props.onTouchStart - Touch start handler function (for dragging on touch devices)
 * @param {string} props.cursor - Cursor style (default: 'pointer')
 * @param {React.ReactNode} props.children - Optional content inside hotspot
 */
const HotspotComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    position,
    zIndex,
    backgroundColor = 'rgba(255, 153, 0, 0.6)',
    borderColor = '#FF9900',
    borderWidth = '3gc',
    size = '40gc',
    innerCircleSize = '5gc',
    animated = true,
    onClick,
    onMouseDown,
    onTouchStart,
    cursor = 'pointer',
    className: customClassName,
    children
  } = props;

  // Track render count for debugging (must be at top level)
  const renderCountRef = React.useRef(0);
  
  // Log when vertex marker component mounts/renders (must be at top level)
  React.useEffect(() => {
    renderCountRef.current += 1;
    if (id && id.includes('vertex')) {
      console.log(`🔄 [Hotspot] ${id} MOUNTED/RENDERED #${renderCountRef.current}:`, {
        coordinates: coordinates,
        position: position,
        timestamp: new Date().toISOString()
      });
      
      // For vertex marker, wait for geometry grid to be fully positioned, then align with angle marker
      if (id === 'page2-vertex-marker') {
        let verificationTimeoutId;
        let resizeObserver;
        let mutationObserver;
        let correctionApplied = false;
        
        const verifyAndAlign = () => {
          const element = document.getElementById(id);
          if (!element) return;
          
          const geometryGrid = document.querySelector('[data-element-name="page2-geometry-grid"]');
          if (!geometryGrid) {
            console.warn(`⚠️ [VertexMarker] Geometry grid not found`);
            return;
          }
          
          // Wait for geometry grid to have non-zero dimensions (fully rendered)
          const gridRect = geometryGrid.getBoundingClientRect();
          if (gridRect.width === 0 || gridRect.height === 0) {
            console.log(`⏳ [VertexMarker] Waiting for geometry grid to render...`);
            return;
          }
          
          // Try to find the angle marker SVG (which is at the intersection point)
          // The angle marker is rendered as an SVG with a viewBox (size varies based on arc size)
          // Look for SVG elements that are likely angle markers (have a reasonable viewBox size)
          const angleMarkerSvg = Array.from(geometryGrid.querySelectorAll('svg')).find(svg => {
            const viewBox = svg.getAttribute('viewBox') || '';
            if (!viewBox) return false;
            // Parse viewBox to get size (format: "x y width height")
            const parts = viewBox.split(/\s+/).map(Number);
            if (parts.length >= 4) {
              const width = parts[2];
              const height = parts[3];
              // Angle markers typically have viewBox sizes between 200-2000px
              // (for arc sizes from ~2gc to ~20gc)
              return width >= 200 && width <= 2000 && height >= 200 && height <= 2000;
            }
            return false;
          });
          
          if (!angleMarkerSvg) {
            console.log(`⏳ [VertexMarker] Waiting for angle marker to render...`);
            return;
          }
          
          const angleRect = angleMarkerSvg.getBoundingClientRect();
          if (angleRect.width === 0 || angleRect.height === 0) {
            console.log(`⏳ [VertexMarker] Waiting for angle marker to have dimensions...`);
            return;
          }
          
          // Angle marker center (this is the actual intersection point)
          const angleCenterX = angleRect.left + angleRect.width / 2;
          const angleCenterY = angleRect.top + angleRect.height / 2;
          
          // Current vertex marker center
          const rect = element.getBoundingClientRect();
          const markerCenterX = rect.left + rect.width / 2;
          const markerCenterY = rect.top + rect.height / 2;
          
          const offsetX = markerCenterX - angleCenterX;
          const offsetY = markerCenterY - angleCenterY;
          const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
          
          console.log(`📍 [VertexMarker] Position verification vs Angle Marker:`, {
            angleMarkerCenter: { x: angleCenterX.toFixed(2), y: angleCenterY.toFixed(2) },
            vertexMarkerCenter: { x: markerCenterX.toFixed(2), y: markerCenterY.toFixed(2) },
            offset: { x: offsetX.toFixed(2), y: offsetY.toFixed(2), distance: distance.toFixed(2) },
            gridRect: { left: gridRect.left.toFixed(2), top: gridRect.top.toFixed(2), width: gridRect.width.toFixed(2), height: gridRect.height.toFixed(2) },
            relativeToGrid: {
              angleCenter: { x: (angleCenterX - gridRect.left).toFixed(2), y: (angleCenterY - gridRect.top).toFixed(2) },
              vertexCenter: { x: (markerCenterX - gridRect.left).toFixed(2), y: (markerCenterY - gridRect.top).toFixed(2) }
            }
          });
          
          // If offset is significant (> 2px), correct it ONCE
          if (distance > 2 && !correctionApplied) {
            console.warn(`⚠️ [VertexMarker] Initial offset detected: ${distance.toFixed(2)}px - applying one-time correction`);
            
            // Calculate correction in percentage
            const correctionXPercent = (offsetX / window.innerWidth) * 100;
            const correctionYPercent = (offsetY / window.innerHeight) * 100;
            
            // Get current position from computed style (more reliable than inline style)
            const computedStyle = window.getComputedStyle(element);
            const currentLeftPercent = parseFloat(computedStyle.left) || 0;
            const currentTopPercent = parseFloat(computedStyle.top) || 0;
            
            const newLeftPercent = currentLeftPercent - correctionXPercent;
            const newTopPercent = currentTopPercent - correctionYPercent;
            
            console.log(`🔧 [VertexMarker] Applying one-time correction:`, {
              current: { left: currentLeftPercent.toFixed(4) + '%', top: currentTopPercent.toFixed(4) + '%' },
              correction: { x: correctionXPercent.toFixed(4) + '%', y: correctionYPercent.toFixed(4) + '%' },
              new: { left: newLeftPercent.toFixed(4) + '%', top: newTopPercent.toFixed(4) + '%' }
            });
            
            // Apply correction using transform to avoid layout recalculation issues
            // Preserve any existing transform (like scale for pulsation animation)
            const currentTransform = element.style.transform || '';
            const existingScale = currentTransform.match(/scale\([^)]+\)/);
            const scalePart = existingScale ? ' ' + existingScale[0] : '';
            element.style.transform = `translate(${-offsetX}px, ${-offsetY}px)${scalePart}`;
            correctionApplied = true;
            
            console.log(`✅ [VertexMarker] Correction applied: transform="${element.style.transform}"`);
          } else if (distance <= 2) {
            console.log(`✅ [VertexMarker] Position aligned (offset: ${distance.toFixed(2)}px)`);
          }
        };
        
        // Wait for geometry grid to be in DOM and have dimensions
        const waitForGrid = () => {
          const geometryGrid = document.querySelector('[data-element-name="page2-geometry-grid"]');
          if (geometryGrid) {
            const gridRect = geometryGrid.getBoundingClientRect();
            if (gridRect.width > 0 && gridRect.height > 0) {
              // Grid is ready, start verification immediately and then periodically
              verifyAndAlign(); // Try immediately
              verificationTimeoutId = setTimeout(verifyAndAlign, 50); // Try again after 50ms
              
              // Observe geometry grid for size/position changes
              if (typeof ResizeObserver !== 'undefined') {
                resizeObserver = new ResizeObserver(() => {
                  if (!correctionApplied) {
                    clearTimeout(verificationTimeoutId);
                    verificationTimeoutId = setTimeout(verifyAndAlign, 10); // Faster response
                  }
                });
                resizeObserver.observe(geometryGrid);
              }
              
              // Observe DOM changes to catch when angle marker is added
              if (typeof MutationObserver !== 'undefined') {
                mutationObserver = new MutationObserver(() => {
                  if (!correctionApplied) {
                    clearTimeout(verificationTimeoutId);
                    verificationTimeoutId = setTimeout(verifyAndAlign, 10); // Faster response
                  }
                });
                mutationObserver.observe(geometryGrid, {
                  childList: true,
                  subtree: true
                });
              }
              
              // Also try periodically until correction is applied
              const periodicCheck = setInterval(() => {
                if (correctionApplied) {
                  clearInterval(periodicCheck);
                } else {
                  verifyAndAlign();
                }
              }, 100);
              
              // Stop periodic check after 2 seconds
              setTimeout(() => clearInterval(periodicCheck), 2000);
            } else {
              // Grid not ready yet, check again
              setTimeout(waitForGrid, 25); // Check more frequently
            }
          } else {
            // Grid not in DOM yet, check again
            setTimeout(waitForGrid, 25); // Check more frequently
          }
        };
        
        // Start waiting for grid
        waitForGrid();
        
        return () => {
          clearTimeout(verificationTimeoutId);
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
          if (mutationObserver) {
            mutationObserver.disconnect();
          }
        };
      }
    }
  }, [id, coordinates, position]);

  // Calculate position from coordinates
  const getPositionFromCoordinates = React.useCallback(() => {
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      // Use the grid positioning utility if available
      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
        const cssPosition = gridPositions.convertToCSS(coordinates, elementName || id, 'page', 'custom');
        return cssPosition.css || cssPosition;
      }
      
      // Fallback: manual calculation based on current grid system
      const [x1, y1, x2, y2] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const left = ((x1 - 1) / gridCols) * 100;
      const top = ((y1 - 1) / gridRows) * 100;
      const width = ((x2 - x1 + 1) / gridCols) * 100;
      const height = ((y2 - y1 + 1) / gridRows) * 100;
      
      return {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`,
        height: `${height.toFixed(2)}%`
      };
    }
    
    return null;
  }, [coordinates, elementName, id]);

  const positionFromCoordinates = React.useMemo(() => {
    return getPositionFromCoordinates();
  }, [getPositionFromCoordinates]);

  // Process GC units for styling
  const processGcProperty = (value) => {
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      return GridCellFontUtils.processGcProperty(value, coordinates || [0, 0, 100, 100]);
    }
    return value;
  };

  // Handle click event
  const handleClick = React.useCallback((e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    // Play click sound if available
    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('hotspot');
    }
  }, [onClick]);

  // Handle mouse down event (for dragging)
  const handleMouseDown = React.useCallback((e) => {
    e.stopPropagation();
    if (onMouseDown) {
      onMouseDown(e);
    }
  }, [onMouseDown]);

  // Handle touch start event (for dragging on touch devices)
  const handleTouchStart = React.useCallback((e) => {
    e.stopPropagation();
    if (onTouchStart) {
      onTouchStart(e);
    }
  }, [onTouchStart]);

  // Build container style
  const containerStyle = React.useMemo(() => {
    // Debug: Log for vertex hotspots to verify position prop
    if (id && id.includes('vertex')) {
      console.log(`🔍 [Hotspot] ${id} containerStyle calculation:`, {
        hasPosition: !!position,
        position: position,
        hasCoordinates: !!coordinates,
        coordinates: coordinates,
        timestamp: new Date().toISOString()
      });
    }
    
    const processedSize = processGcProperty(size);
    const processedBorderWidth = processGcProperty(borderWidth);
    
    // Check if this is a vertex marker with pulsation - if so, start at 2.5x scale
    let initialScale = 1;
    if (customClassName && customClassName.includes('hotspot-pulse-vertex')) {
      initialScale = 2.5;
    }
    
    const baseStyle = {
      position: 'absolute',
      width: processedSize,
      height: processedSize,
      borderRadius: '50%', // Make it circular
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: processedBorderWidth,
      borderStyle: 'solid',
      cursor: cursor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      zIndex: zIndex || 1000,
      transition: 'transform 0.2s ease', // Only transition transform, not all properties
      touchAction: 'none', // Prevent default touch behaviors (scrolling, zooming) when dragging
      willChange: 'transform', // Optimize for transform animations
      transform: `translate(-50%, -50%) scale(${initialScale})`
    };

    // Apply position if available (prioritize prop over calculated)
    const positionToUse = position || positionFromCoordinates;
    
    if (positionToUse) {
      // Extract CSS values (handle both object with css property and direct object)
      const css = positionToUse.css || positionToUse;
      if (css) {
        const left = css.left ? parseFloat(css.left.replace('%', '')) : 0;
        const top = css.top ? parseFloat(css.top.replace('%', '')) : 0;
        const width = css.width ? parseFloat(css.width.replace('%', '')) : 0;
        const height = css.height ? parseFloat(css.height.replace('%', '')) : 0;
        
        // Center the hotspot on the coordinates
        const finalLeft = left + width / 2;
        const finalTop = top + height / 2;
        baseStyle.left = `${finalLeft}%`;
        baseStyle.top = `${finalTop}%`;
        // Preserve the scale if already set (for vertex pulsation)
        if (!baseStyle.transform || !baseStyle.transform.includes('scale')) {
          baseStyle.transform = 'translate(-50%, -50%)';
        }
        
        // Debug logging for vertex hotspots
        if (id && id.includes('vertex')) {
          console.log(`🎯 [Hotspot] ${id} position calculation:`, {
            receivedPosition: position,
            usingCalculated: !position && !!positionFromCoordinates,
            extractedCss: css,
            parsed: { left, top, width, height },
            final: { left: finalLeft, top: finalTop },
            style: { left: baseStyle.left, top: baseStyle.top },
            timestamp: new Date().toISOString()
          });
        }
      } else {
        if (id && id.includes('vertex')) {
          console.warn(`⚠️ [Hotspot] ${id} has position but no css:`, positionToUse);
        }
      }
    } else if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      // Fallback: calculate center directly from coordinates
      const [x1, y1, x2, y2] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const centerX = ((x1 + x2) / 2 - 1) / gridCols * 100;
      const centerY = ((y1 + y2) / 2 - 1) / gridRows * 100;
      
      baseStyle.left = `${centerX.toFixed(2)}%`;
      baseStyle.top = `${centerY.toFixed(2)}%`;
      // Preserve the scale if already set (for vertex pulsation)
      if (!baseStyle.transform || !baseStyle.transform.includes('scale')) {
        baseStyle.transform = 'translate(-50%, -50%)';
      }
      
      // Debug logging for vertex hotspots using fallback calculation
      if (id && id.includes('vertex')) {
        console.log(`⚠️ [Hotspot] ${id} Using fallback coordinate calculation:`, {
          coordinates: coordinates,
          gridRows: gridRows,
          gridCols: gridCols,
          calculated: { centerX, centerY },
          style: { left: baseStyle.left, top: baseStyle.top },
          timestamp: new Date().toISOString()
        });
      }
    } else {
      // Final fallback: center of screen
      // Debug: Log when position is not provided (for vertex hotspots)
      if (id && id.includes('vertex')) {
        console.warn(`⚠️ [Hotspot] ${id} NO POSITION PROVIDED! Using fallback (center).`, {
          hasPosition: !!position,
          hasCoordinates: !!coordinates,
          coordinates: coordinates
        });
      }
      baseStyle.left = '50%';
      baseStyle.top = '50%';
      baseStyle.transform = 'translate(-50%, -50%)';
    }

    return baseStyle;
  }, [position, positionFromCoordinates, coordinates, backgroundColor, borderColor, borderWidth, size, cursor, zIndex, id]);

  // Build className with animation
  const className = React.useMemo(() => {
    const classes = ['hotspot-component'];
    if (animated) {
      classes.push('hotspot-pulse');
    }
    // Merge with custom className if provided
    if (customClassName) {
      classes.push(customClassName);
    }
    return classes.join(' ') || undefined;
  }, [animated, customClassName]);

  // Handle hover effects
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  // Add hover style
  const finalStyle = React.useMemo(() => {
    const baseTransform = containerStyle.transform || 'translate(-50%, -50%)';
    if (isHovered) {
      return {
        ...containerStyle,
        transform: `${baseTransform} scale(1.1)`,
        boxShadow: `0 0 20px ${borderColor}`
      };
    }
    return containerStyle;
  }, [containerStyle, isHovered, borderColor]);

  // Inner circle style
  const processedInnerCircleSize = processGcProperty(innerCircleSize);
  const innerCircleColor = borderColor === 'transparent' ? '#000000' : borderColor;
  const innerCircleStyle = {
    width: processedInnerCircleSize,
    height: processedInnerCircleSize,
    borderRadius: '50%',
    backgroundColor: innerCircleColor,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none' // Don't interfere with click events
  };

  return React.createElement('div', {
    id: id || `${elementName}-${currentPage}`,
    className: className,
    style: finalStyle,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-hotspot': 'true',
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e);
      }
    },
    'aria-label': 'Clickable hotspot'
  }, [
    // Inner circle
    React.createElement('div', {
      key: 'inner-circle',
      className: 'hotspot-inner-circle',
      style: innerCircleStyle
    }),
    // Children (if any)
    ...(children ? (Array.isArray(children) ? children : [children]) : [])
  ]);
});

// Hotspot Element Configuration
const HotspotElement = {
  hotspot: {
    type: 'hotspot',
    coordinates: [0, 0, 100, 100],
    zIndex: 1000,
    props: {
      backgroundColor: 'rgba(255, 153, 0, 0.6)',
      borderColor: '#FF9900',
      borderWidth: '3gc',
      size: '40gc',
      innerCircleSize: '5gc',
      animated: true,
      cursor: 'pointer'
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('hotspot', (props, elementId) => {
      return React.createElement(HotspotComponent, props);
    })
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.HotspotComponent = {
    HotspotComponent,
    HotspotElement
  };
}

