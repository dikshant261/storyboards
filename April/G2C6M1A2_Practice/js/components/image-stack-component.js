/**
 * Image Stack Component - React 18 Optimized
 * 
 * A component that layers multiple images on top of each other with individual
 * control over visual properties like blink, glow, hidden, opacity, and more.
 * First element in array is bottom-most, last element is top-most.
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions should be loaded before this file

/**
 * Image Stack Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name from PageConfig
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - [x1, y1, x2, y2] coordinates
 * @param {number|string} props.zIndex - Z-index value (base z-index for the stack)
 * @param {Array<Object>} props.images - Array of image layer objects:
 *   - src: string - Image path (e.g., "assets/cup.png")
 *   - blink: boolean - Enable opacity blink animation (default: false)
 *   - glow: boolean - Enable alpha glow animation (default: false)
 *   - hidden: boolean - Hide layer (default: false)
 *   - opacity: number - Layer opacity 0-1 (default: 1.0)
 *   - blinkDuration: string - Blink speed (default: "1s")
 *   - glowDuration: string - Glow speed (default: "2s")
 *   - offsetX: string - Horizontal offset (default: "0")
 *   - offsetY: string - Vertical offset (default: "0")
 *   - scale: number - Size multiplier (default: 1.0)
 *   - transitionDuration: string - Smooth transitions (default: "0.3s")
 *   - border: string - CSS border property (default: "none")
 *   - borderRadius: string - CSS border-radius property (default: "0")
 *   - layerCoordinates: Array<number> - Optional [x1, y1, x2, y2] grid coordinates to override container position for this layer
 *   - onClick: function - Click handler for this layer
 *   - className: string - Optional custom CSS classes
 * Note: Layer IDs are automatically assigned as numbers in chronological order (0, 1, 2, ...)
 * @param {Function} props.onBlinkChange - Callback (layerIndex, value)
 * @param {Function} props.onGlowChange - Callback (layerIndex, value)
 * @param {Function} props.onHiddenChange - Callback (layerIndex, value)
 * @param {Function} props.onOpacityChange - Callback (layerIndex, value)
 * @param {Function} props.onLayerPropChange - General callback (layerIndex, propertyName, value)
 */
const ImageStackComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    zIndex = 1000,
    elementZIndex, // Accept elementZIndex from parent if provided
    images = [],
    onBlinkChange,
    onGlowChange,
    onHiddenChange,
    onOpacityChange,
    onLayerPropChange,
    onQuizComplete, // New prop for quiz completion callback
    hideImageOnQuizComplete = true, // Hide first image on quiz completion
    showImageOnQuizComplete = [] // Array of image indices to show on quiz completion
  } = props;

  // State for dynamic images (can be updated by events)
  const [dynamicImages, setDynamicImages] = React.useState(images);
  // Page 2 stacks use questionArray[page2CurrentIndex] via getter; resync when src or fade transition (opacity/length) changes
  const isPage2Stack = id === 'page2-school-bag-image' || elementName === 'page2-school-bag-image' || id === 'page2-eraser-image' || elementName === 'page2-eraser-image';
  const page2ImageSrc = isPage2Stack && images && images[0] ? images[0].src : null;
  const page2FadeKey = isPage2Stack && images ? `${images.length}-${(images[0] && images[0].opacity)}-${(images[1] && images[1].opacity)}` : null;
  const isPage2DeeTeeStack = id === 'page2-dee-tee-image' || elementName === 'page2-dee-tee-image';
  const page2DeeTeeSrc = isPage2DeeTeeStack && images && images[0] ? images[0].src : null;
  // Page 3 stacks use questionArray2[page3CurrentIndex] via getter; resync when src or fade/sprite state changes
  const isPage3Stack = id === 'page3-image-1' || elementName === 'page3-image-1' || id === 'page3-image-2' || elementName === 'page3-image-2';
  const page3ImageSrc = isPage3Stack && images && images[0] ? images[0].src : null;
  const page3FadeKey = isPage3Stack && images ? `${images.length}-${(images[0] && images[0].opacity)}-${(images[1] && images[1].opacity)}` : null;
  const isPage3DeeTeeStack = id === 'page3-dee-tee-image' || elementName === 'page3-dee-tee-image';
  const page3DeeTeeSrc = isPage3DeeTeeStack && images && images[0] ? images[0].src : null;
  // Page 4 stacks (replica of page 3)
  const isPage4Stack = id === 'page4-image-1' || elementName === 'page4-image-1' || id === 'page4-image-2' || elementName === 'page4-image-2';
  const page4ImageSrc = isPage4Stack && images && images[0] ? images[0].src : null;
  const page4FadeKey = isPage4Stack && images ? `${images.length}-${(images[0] && images[0].opacity)}-${(images[1] && images[1].opacity)}` : null;
  const isPage4DeeTeeStack = id === 'page4-dee-tee-image' || elementName === 'page4-dee-tee-image';
  const page4DeeTeeSrc = isPage4DeeTeeStack && images && images[0] ? images[0].src : null;
  // Page 5 stacks (replica of page 4)
  const isPage5Stack = id === 'page5-image-1' || elementName === 'page5-image-1' || id === 'page5-image-2' || elementName === 'page5-image-2';
  const page5ImageSrc = isPage5Stack && images && images[0] ? images[0].src : null;
  const page5FadeKey = isPage5Stack && images ? `${images.length}-${(images[0] && images[0].opacity)}-${(images[1] && images[1].opacity)}` : null;
  const isPage5DeeTeeStack = id === 'page5-dee-tee-image' || elementName === 'page5-dee-tee-image';
  const page5DeeTeeSrc = isPage5DeeTeeStack && images && images[0] ? images[0].src : null;
  // Page 6 stacks (replica of page 5)
  const isPage6Stack = id === 'page6-image-1' || elementName === 'page6-image-1' || id === 'page6-image-2' || elementName === 'page6-image-2';
  const page6ImageSrc = isPage6Stack && images && images[0] ? images[0].src : null;
  const page6FadeKey = isPage6Stack && images ? `${images.length}-${(images[0] && images[0].opacity)}-${(images[1] && images[1].opacity)}` : null;
  const isPage6DeeTeeStack = id === 'page6-dee-tee-image' || elementName === 'page6-dee-tee-image';
  const page6DeeTeeSrc = isPage6DeeTeeStack && images && images[0] ? images[0].src : null;
  React.useEffect(() => {
    // Only resync when the *page changes* (or, for page 2/3/4/5/6 stacks, when image src or fade state changes).
    // Resyncing on every `images` reference change can undo event-driven updates on re-render.
    setDynamicImages(images);
  }, [currentPage, page2ImageSrc, page2FadeKey, page2DeeTeeSrc, page3ImageSrc, page3FadeKey, page3DeeTeeSrc, page4ImageSrc, page4FadeKey, page4DeeTeeSrc, page5ImageSrc, page5FadeKey, page5DeeTeeSrc, page6ImageSrc, page6FadeKey, page6DeeTeeSrc]);

  // Handle page-specific "lift" actions (page5 + page8) in a simple, robust way.
  // We deliberately ignore `pageNumber` here and target by stack id/name only,
  // because currentPage can be wrong when elements are first created.
  React.useEffect(() => {
    const handler = (event) => {
      const { action } = event.detail || {};
      const stackKey = id || elementName || '';

      // Page 5
      if (action === 'liftBag' && stackKey === 'page5-school-bag-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }
      if (action === 'liftEraser' && stackKey === 'page5-eraser-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }

      // Page 8
      if (action === 'liftFeather' && stackKey === 'page8-feather-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }
      if (action === 'liftWatermelon' && stackKey === 'page8-watermelon-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }

      // Page 11
      if (action === 'liftStone' && stackKey === 'page11-stone-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }
      if (action === 'liftPencil' && stackKey === 'page11-pencil-image') {
        setDynamicImages((prev) =>
          prev.map((img, i) =>
            i === 0 ? { ...img, hidden: true } :
            i === 1 ? { ...img, hidden: false } :
            img
          )
        );
        return;
      }
    };

    window.addEventListener('pageActionCompleted', handler);
    return () => window.removeEventListener('pageActionCompleted', handler);
  }, [id, elementName]);




  // Use dynamic images if available, otherwise use props images
  const displayImages = dynamicImages.length > 0 ? dynamicImages : images;

  // Get position from gridPositions if coordinates are provided
  const position = React.useMemo(() => {
    if (coordinates && typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
      // Use convertToCSS to create position from coordinates
      return gridPositions.convertToCSS(coordinates, elementName || id, 'page', 'custom');
    }
    return null;
  }, [coordinates, elementName, id, currentPage]);

  // Process GC units for styling
  const processGcProperty = (value) => {
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      return GridCellFontUtils.processGcProperty(value, position?.coordinates || coordinates || [0, 0, 100, 100]);
    }
    return value;
  };

  // Build container style (positioned absolutely at coordinates)
  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      position: 'absolute',
      display: 'block',
      pointerEvents: 'none', // Container doesn't block clicks
      zIndex: zIndex
    };

    // Apply position if available
    if (position?.css) {
      Object.assign(baseStyle, position.css);
    }

    return baseStyle;
  }, [position, zIndex]);

  // Create a handler for layer clicks
  const handleLayerClick = React.useCallback((layerIndex, onClick) => (e) => {
    e.stopPropagation();

    // Call the layer's specific onClick if provided
    if (onClick) {
      onClick(e, layerIndex);
    }

    // Play click sound if available
    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('image-stack-layer');
    }
  }, []);

  // Render individual image layer
  const renderImageLayer = React.useCallback((imageData, layerIndex) => {
    const {
      src,
      blink = false,
      glow = false,
      hidden = false,
      opacity = 1.0,
      blinkDuration = '1s',
      glowDuration = '2s',
      offsetX = '0',
      offsetY = '0',
      scale = 1.0,
      transitionDuration = '0.3s',
      border = 'none',
      borderRadius = '0',
      layerCoordinates = null, // Optional per-layer coordinate override
      onClick,
      className = ''
    } = imageData;

    // Layer ID is the numeric index in chronological order
    const layerId = layerIndex;

    // Skip rendering if hidden
    if (hidden) {
      return null;
    }

    // Build animation classes
    const animationClasses = [];
    if (blink) {
      animationClasses.push('image-stack-blink');
    }
    if (glow) {
      animationClasses.push('image-stack-glow');
    }

    // Process border properties (support GC units)
    const processedBorder = processGcProperty(border);
    const processedBorderRadius = processGcProperty(borderRadius);

    // Calculate layer position - use layerCoordinates if provided, otherwise use container-relative positioning
    let layerPositionStyle = {};
    if (layerCoordinates && Array.isArray(layerCoordinates) && layerCoordinates.length === 4) {
      // Use grid coordinates to position this layer absolutely relative to the page
      // This ensures it follows the same screen precision grid as the container
      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
        const layerPosition = gridPositions.convertToCSS(layerCoordinates, `${elementName}-layer-${layerId}`, 'page', 'custom');
        if (layerPosition?.css) {
          // Position absolutely relative to the page container (same as container coordinates)
          // Both container and layer use the same grid precision system
          layerPositionStyle = {
            position: 'absolute', // Absolute positioning relative to page container
            ...layerPosition.css
          };
        } else {
          // Fallback: manual calculation using grid precision (same as convertToCSS logic)
          const [x1, y1, x2, y2] = layerCoordinates;
          const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision]?.rows : 900;
          const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision]?.cols : 1600;

          if (gridRows && gridCols) {
            // Use same calculation as convertToCSS: ((x1 - 1) / cols) * 100
            const left = ((x1 - 1) / gridCols) * 100;
            const top = ((y1 - 1) / gridRows) * 100;
            const width = ((x2 - x1) / gridCols) * 100; // Note: x2 - x1 (not +1) to match convertToCSS
            const height = ((y2 - y1) / gridRows) * 100; // Note: y2 - y1 (not +1) to match convertToCSS

            layerPositionStyle = {
              position: 'absolute',
              left: `${left.toFixed(2)}%`,
              top: `${top.toFixed(2)}%`,
              width: `${width.toFixed(2)}%`,
              height: `${height.toFixed(2)}%`
            };
          }
        }
      }
    } else {
      // Use container-relative positioning with offsets
      layerPositionStyle = {
        position: 'absolute',
        top: offsetY,
        left: offsetX,
        width: '100%',
        height: '100%'
      };
    }

    // Build layer style
    const layerStyle = {
      ...layerPositionStyle,
      opacity: opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      transition: `opacity ${transitionDuration}, transform ${transitionDuration}`,
      border: processedBorder !== 'none' ? processedBorder : 'none',
      borderRadius: processedBorderRadius !== '0' ? processedBorderRadius : '0',
      pointerEvents: onClick ? 'auto' : 'none', // Enable clicks only if onClick is provided
      cursor: onClick ? 'pointer' : 'default',
      zIndex: (elementZIndex || zIndex || 1000) + layerIndex, // Higher index = higher z-index
      objectFit: 'contain', // Ensure images fit within their container
      boxSizing: 'border-box' // Include border in width/height calculations
    };

    // Add animation durations as CSS variables
    const animationStyle = {
      '--blink-duration': blinkDuration,
      '--glow-duration': glowDuration
    };

    // Combine styles
    const finalStyle = { ...layerStyle, ...animationStyle };

    // Build class name
    const finalClassName = ['image-stack-layer', ...animationClasses, className]
      .filter(Boolean)
      .join(' ') || undefined;

    return React.createElement('img', {
      key: `layer-${layerId}`,
      id: `${elementName}-layer-${layerId}`,
      src: src,
      className: finalClassName,
      style: finalStyle,
      alt: `Layer ${layerId}`,
      onClick: onClick ? handleLayerClick(layerIndex, onClick) : undefined,
      draggable: false,
      'data-layer-id': layerId,
      'data-layer-index': layerIndex,
      'data-element-name': elementName,
      'data-page': currentPage
    });
  }, [elementName, currentPage, handleLayerClick, processGcProperty, elementZIndex, zIndex]);

  // Render all image layers
  // Separate layers with layerCoordinates (absolute positioning) from container-relative layers
  const { absoluteLayers, relativeLayers } = React.useMemo(() => {
    const absolute = [];
    const relative = [];

    displayImages.forEach((imageData, index) => {
      const hasLayerCoordinates = imageData.layerCoordinates &&
        Array.isArray(imageData.layerCoordinates) &&
        imageData.layerCoordinates.length === 4;

      if (hasLayerCoordinates) {
        absolute.push(renderImageLayer(imageData, index));
      } else {
        relative.push(renderImageLayer(imageData, index));
      }
    });

    return { absoluteLayers: absolute, relativeLayers: relative };
  }, [displayImages, renderImageLayer]);

  // Render container with relative layers, and absolute layers as siblings
  return React.createElement(React.Fragment, {}, [
    React.createElement('div', {
      key: 'image-stack-container',
      id: id || `${elementName}-${currentPage}`,
      className: 'image-stack-container',
      style: containerStyle,
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-component-type': 'image-stack'
    }, relativeLayers),
    ...absoluteLayers // Render absolute layers as siblings outside the container
  ]);
});

// Image Stack Element Configuration
const ImageStackElement = {
  imageStack: {
    type: 'imageStack',
    coordinates: [0, 0, 100, 100],
    zIndex: 1000,
    props: {
      images: []
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('imageStack', (props, elementId) => {
      return React.createElement(ImageStackComponent, props);
    })
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.ImageStackComponent = {
    ImageStackComponent,
    ImageStackElement
  };
}

console.log('✅ Image Stack Component loaded successfully');

