/**
 * Drag and Drop Game Component - Equal/Unequal Parts Sorting
 * 
 * Interactive drag-and-drop game for sorting images into categories
 * with visual feedback and animations.
 */

// Dependencies: React, SharedUtilities should be loaded before this file

/**
 * DraggableImage Component
 * Individual draggable image with click-and-drag functionality
 */
const DraggableImage = React.memo(({ 
  imagePath, 
  category, 
  imageId, 
  onDragStart, 
  onDragEnd,
  isAnimating,
  animationType,
  isAnyImageDragging,
  currentDraggingId,
  style: externalStyle = {},
  // NEW: Support for React components
  componentType = null,
  componentProps = {}
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragPosition, setDragPosition] = React.useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = React.useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const [containerCoords, setContainerCoords] = React.useState(null);
  const [renderKey, setRenderKey] = React.useState(0);
  const imageRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const coordsCalculatedRef = React.useRef(false);
  
  // Measure container size and calculate coordinates (only once to avoid infinite loops)
  React.useEffect(() => {
    if (containerRef.current && componentType && !coordsCalculatedRef.current) {
      const calculateCoords = () => {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const newSize = { width: rect.width, height: rect.height };
          setContainerSize(newSize);
          
          // Calculate coordinates based on container position on page
          const gridCols = 1600;
          const gridRows = 900;
          const x1 = Math.max(0, Math.round((rect.left / window.innerWidth) * gridCols));
          const y1 = Math.max(0, Math.round((rect.top / window.innerHeight) * gridRows));
          const x2 = Math.min(gridCols, Math.round(((rect.left + rect.width) / window.innerWidth) * gridCols));
          const y2 = Math.min(gridRows, Math.round(((rect.top + rect.height) / window.innerHeight) * gridRows));
          const coords = [x1, y1, x2, y2];
          
          console.log(`📍 [DraggableImage] Calculated coordinates:`, coords, {
            rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
            viewport: { width: window.innerWidth, height: window.innerHeight }
          });
          
          setContainerCoords(coords);
          coordsCalculatedRef.current = true;
          setRenderKey(prev => prev + 1);
        }
      };
      
      // Initial measurement
      calculateCoords();
      // Also measure after a short delay to ensure parent is rendered
      const timeoutId = setTimeout(calculateCoords, 100);
      const resizeObserver = new ResizeObserver(() => {
        if (!coordsCalculatedRef.current) {
          calculateCoords();
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, [componentType, imageId]);

  const handleMouseDown = React.useCallback((e) => {
    console.log(`🖱️ [DraggableImage] MouseDown on image ${imageId}:`, {
      imageId,
      imagePath,
      category,
      isAnimating,
      isAnyImageDragging,
      currentDraggingId
    });
    
    // Prevent dragging if animating or if another image is being dragged
    if (isAnimating || (isAnyImageDragging && currentDraggingId !== imageId)) {
      console.log(`⚠️ [DraggableImage] Drag prevented for ${imageId}:`, {
        isAnimating,
        isAnyImageDragging,
        currentDraggingId
      });
      return;
    }
    
    e.preventDefault();
    const rect = imageRef.current.getBoundingClientRect();
    console.log(`📐 [DraggableImage] Image ${imageId} rect:`, rect);
    
    // Store original size
    setOriginalSize({ width: rect.width, height: rect.height });
    
    // Store where inside the image the user clicked
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Set initial position to current position to prevent jump
    setDragPosition({
      x: rect.left,
      y: rect.top
    });
    
    setIsDragging(true);
    onDragStart?.(imageId, { x: e.clientX, y: e.clientY });
  }, [imageId, onDragStart, isAnimating, isAnyImageDragging, currentDraggingId]);

  const handleMouseMove = React.useCallback((e) => {
    if (!isDragging) return;
    
    // Calculate new position based on mouse movement
    setDragPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    });
  }, [isDragging]);

  const handleMouseUp = React.useCallback((e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    onDragEnd?.(imageId, { x: e.clientX, y: e.clientY });
  }, [isDragging, imageId, onDragEnd]);

  // Touch event handlers for mobile support
  const handleTouchStart = React.useCallback((e) => {
    // Prevent dragging if animating or if another image is being dragged
    if (isAnimating || (isAnyImageDragging && currentDraggingId !== imageId)) return;
    
    const touch = e.touches[0];
    const rect = imageRef.current.getBoundingClientRect();
    
    // Store original size
    setOriginalSize({ width: rect.width, height: rect.height });
    
    // Store where inside the image the user touched
    dragStartPos.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
    // Set initial position to current position to prevent jump
    setDragPosition({
      x: rect.left,
      y: rect.top
    });
    
    setIsDragging(true);
    onDragStart?.(imageId, { x: touch.clientX, y: touch.clientY });
  }, [imageId, onDragStart, isAnimating, isAnyImageDragging, currentDraggingId]);

  const handleTouchMove = React.useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    setDragPosition({
      x: touch.clientX - dragStartPos.current.x,
      y: touch.clientY - dragStartPos.current.y
    });
  }, [isDragging]);

  const handleTouchEnd = React.useCallback((e) => {
    if (!isDragging) return;
    
    const touch = e.changedTouches[0];
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    onDragEnd?.(imageId, { x: touch.clientX, y: touch.clientY });
  }, [isDragging, imageId, onDragEnd]);

  // Global mouse move and up listeners
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const imageStyle = {
    ...externalStyle,
    position: isDragging ? 'fixed' : 'relative',
    left: isDragging ? `${dragPosition.x}px` : 'auto',
    top: isDragging ? `${dragPosition.y}px` : 'auto',
    width: isDragging ? `${originalSize.width}px` : '100%',
    height: isDragging ? `${originalSize.height}px` : '100%',
    minWidth: '50px', // Ensure minimum clickable area
    minHeight: '50px', // Ensure minimum clickable area
    opacity: isDragging ? 0.8 : ((isAnyImageDragging && currentDraggingId !== imageId) ? 0.5 : 1),
    transform: isDragging ? 'scale(1)' : 'scale(1)',
    cursor: isAnimating ? 'not-allowed' : ((isAnyImageDragging && currentDraggingId !== imageId) ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab')),
    transition: isDragging ? 'none' : 'all 0.3s ease',
    zIndex: isDragging ? 999999 : 'auto',
    pointerEvents: isAnimating ? 'none' : ((isAnyImageDragging && currentDraggingId !== imageId) ? 'none' : 'auto'),
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Add animation classes
  const animationClass = animationType === 'incorrect' ? 'wiggle-animation' : '';

  // Render content - either a React component or an image
  let content;
  if (componentType) {
    // Render a React component using elements registry
    try {
      if (window.ElementsUtils && window.ElementsUtils.createCustomElement) {
        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 3;
        
        // Use elements registry to create the component element
        // Use coordinates from componentProps if available (e.g., from PageConfig),
        // otherwise use calculated coordinates from container position
        const finalCoordinates = componentProps?.coordinates || containerCoords;
        const hasScreenCoordinates = !!componentProps?.coordinates; // Coordinates from PageConfig are screen-relative
        
        const elementConfig = {
          componentType: componentType,
          id: `draggable-${imageId}`,
          elementName: `draggable-${imageId}`,
          currentPage: currentPage,
          ...(finalCoordinates ? {
            coordinates: finalCoordinates,
            position: { coordinates: finalCoordinates }
          } : {}), // Provide coordinates for vertex position calculation
          ...componentProps,
          processedStyles: {
            // If coordinates are provided from componentProps, use fixed positioning (screen-relative)
            // Otherwise, fill the container (for calculated coordinates)
            ...(hasScreenCoordinates ? {
              // Use fixed positioning so component positions relative to viewport, not parent container
              position: 'fixed', // Fixed positioning relative to viewport
              pointerEvents: 'none',
              userSelect: 'none',
              boxSizing: 'border-box'
              // Note: left, top, width, height are calculated by QuadrilateralComponent from coordinates
            } : {
              // Fill container when using calculated coordinates
              position: 'absolute',
              inset: '0',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              userSelect: 'none',
              boxSizing: 'border-box'
            })
          }
        };
        console.log(`🔍 [DraggableImage] Creating component:`, {
          componentType,
          imageId,
          containerSize,
          hasCoordinates: !!finalCoordinates,
          coordinates: finalCoordinates,
          coordinatesSource: componentProps?.coordinates ? 'componentProps' : (containerCoords ? 'calculated' : 'none')
        });
        const element = window.ElementsUtils.createCustomElement(elementConfig);
        console.log(`🔍 [DraggableImage] Component element created:`, element);
        // createCustomElement returns a React element, use it directly
        if (element) {
          // Wrap component in a container that fills the draggable area
          // When using screen coordinates, don't use position: relative so component can position relative to screen
          const wrapperStyle = {
            position: hasScreenCoordinates ? 'static' : 'relative', // Use static for screen-relative positioning
            overflow: hasScreenCoordinates ? 'visible' : 'hidden', // Allow overflow for screen-relative positioning
            display: 'block',
            boxSizing: 'border-box',
            width: '100%', // Always use full width
            height: '100%', // Always use full height
            minWidth: '200px', // Minimum size
            minHeight: '200px' // Minimum size
          };
          
          console.log(`📐 [DraggableImage] Wrapper style:`, wrapperStyle);
          
          content = React.createElement('div', {
            key: `wrapper-${renderKey}`, // Force re-render when container size changes
            ref: containerRef,
            style: wrapperStyle
          }, element);
          console.log(`✅ [DraggableImage] Wrapped component in container for ${imageId}`, {
            wrapperStyle,
            containerSize,
            renderKey,
            hasElement: !!element,
            elementType: element?.type?.name || element?.type
          });
        } else {
          console.warn(`⚠️ [DraggableImage] createCustomElement returned null/undefined`);
          console.warn(`⚠️ [DraggableImage] elementConfig:`, elementConfig);
          console.warn(`⚠️ [DraggableImage] window.ElementsUtils:`, window.ElementsUtils);
          // Show a test div to verify the container is rendering
          content = React.createElement('div', {
            style: {
              width: '100%',
              height: '100%',
              minWidth: '200px',
              minHeight: '200px',
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '14px'
            }
          }, `Component ${componentType} failed to create`);
        }
      } else if (window.QuadrilateralComponent && componentType === 'QuadrilateralComponent') {
        // Direct access to QuadrilateralComponent (fallback)
        // Don't pass coordinates - component will fill its container
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 3;
        const componentElement = React.createElement(window.QuadrilateralComponent.QuadrilateralComponent, {
          id: `draggable-${imageId}`,
          elementName: `draggable-${imageId}`,
          currentPage: currentPage,
          // Don't pass coordinates - let component fill its container
          ...componentProps
        });
        // Wrap in container with relative positioning
        content = React.createElement('div', {
          style: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'block',
            boxSizing: 'border-box'
          }
        }, componentElement);
      } else {
        throw new Error(`Component type "${componentType}" not found`);
      }
    } catch (error) {
      console.error(`❌ [DraggableImage] Failed to render component "${componentType}":`, error);
      content = null;
    }
  } else {
    // Render an image (default behavior)
    content = React.createElement('img', {
      src: `assets/${imagePath}`,
      alt: `${category} parts`,
      draggable: false,
      onError: (e) => {
        console.error(`❌ [DraggableImage] Failed to load image: assets/${imagePath}`, e);
        e.target.style.display = 'none';
      },
      onLoad: () => {
        console.log(`✅ [DraggableImage] Image loaded successfully: assets/${imagePath}`);
      },
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
        userSelect: 'none'
      }
    });
  }

  return React.createElement('div', {
    ref: imageRef,
    className: `draggable-image ${animationClass} ${isDragging ? 'dragging' : ''}`,
    style: imageStyle,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    'data-image-id': imageId,
    'data-category': category
  }, content);
});

/**
 * DropZone Component
 * Container for dropped images with visual feedback
 */
const DropZone = React.memo(({ 
  category, 
  label, 
  images, 
  isHovered,
  coordinates,
  zIndex,
  borderColor = 'rgba(255, 255, 255, 0.3)',
  borderWidth = '4gc',
  borderRadius = '12gc',
  borderStyle = 'dashed',
  padding = '2.5%',
  columns = 2,
  rows = 2
}) => {
  // Convert gc units to pixels (assuming 1gc = 1px for consistency)
  const convertGcToPx = (value) => {
    if (typeof value === 'string' && value.endsWith('gc')) {
      return value.replace('gc', 'px');
    }
    return value;
  };
  
  const borderWidthPx = convertGcToPx(borderWidth);
  const borderRadiusPx = convertGcToPx(borderRadius);
  
  const dropZoneStyle = {
    border: isHovered ? `4px solid #4A90E2` : `${borderWidthPx} ${borderStyle} ${borderColor}`,
    backgroundColor: isHovered ? 'rgba(74, 144, 226, 0.1)' : 'rgba(0, 0, 0, 0.2)',
    borderRadius: borderRadiusPx,
    transition: 'all 0.3s ease',
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: '10px',
    padding: padding,
    alignContent: 'stretch',
    boxSizing: 'border-box',
    minHeight: '200px',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };

  return React.createElement('div', {
    className: `drop-zone drop-zone-${category} ${isHovered ? 'hovered' : ''}`,
    style: dropZoneStyle,
    'data-zone-category': category
  }, images.length === 0 ? React.createElement('div', {
    style: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '18px',
      padding: '40px 20px'
    }
  }, 'Drag images here') : images.map(img => 
    React.createElement('div', {
      key: img.id,
      style: {
        width: '100%',
        height: '100%',
        aspectRatio: '1',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement('img', {
      src: `assets/${img.imagePath}`,
      alt: `${img.category} parts`,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    }))
  ));
});

/**
 * UnsortedContainer Component
 * Displays unsorted images in a grid
 */
const UnsortedContainer = React.memo(({ 
  images, 
  onDragStart, 
  onDragEnd,
  animatingImages,
  borderColor = 'rgba(255, 255, 255, 0.2)',
  borderWidth = '4gc',
  borderRadius = '12gc',
  borderStyle = 'solid',
  backgroundColor = 'transparent',
  columns = 2,
  rows = 2,
  gravitate = 'up',
  isAnyImageDragging = false,
  currentDraggingId = null
}) => {
  // Convert gc units to pixels (assuming 1gc = 1px for consistency)
  const convertGcToPx = (value) => {
    if (typeof value === 'string' && value.endsWith('gc')) {
      return value.replace('gc', 'px');
    }
    return value;
  };
  
  // Map gravitate prop to CSS alignContent value
  const getAlignContent = () => {
    switch(gravitate) {
      case 'up':
        return 'start';
      case 'down':
        return 'end';
      case 'no':
        return 'start'; // Keep in place by maintaining grid structure
      default:
        return 'start';
    }
  };
  
  const borderWidthPx = convertGcToPx(borderWidth);
  const borderRadiusPx = convertGcToPx(borderRadius);
  
  return React.createElement('div', {
    className: 'unsorted-container',
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: '15px',
      padding: '15px',
      backgroundColor: backgroundColor,
      borderRadius: borderRadiusPx,
      border: `${borderWidthPx} ${borderStyle} ${borderColor}`,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      alignContent: getAlignContent()
    }
  }, images.length === 0 ? React.createElement('div', {
    key: 'empty-message',
    style: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '18px',
      padding: '40px 20px'
    }
  }, 'No images to sort') : images.map((img, index) => {
    console.log('🔍 [UnsortedContainer] Rendering image:', img);
    // Calculate grid position based on gravitate setting
    let gridPosition = {};
    
    if (gravitate === 'no') {
      // Keep in original position
      const originalIndex = parseInt(img.id.replace('img', '')) - 1;
      const row = Math.floor(originalIndex / columns) + 1;
      const col = (originalIndex % columns) + 1;
      gridPosition = {
        gridRow: row,
        gridColumn: col
      };
    } else if (gravitate === 'down') {
      // Stack from bottom - calculate position from the end
      const totalCells = rows * columns;
      const numImages = images.length;
      const startPosition = totalCells - numImages;
      const currentPosition = startPosition + index;
      const row = Math.floor(currentPosition / columns) + 1;
      const col = (currentPosition % columns) + 1;
      gridPosition = {
        gridRow: row,
        gridColumn: col
      };
    }
    // If gravitate === 'up', don't set gridPosition (use auto-placement)
    
    return React.createElement(DraggableImage, {
      key: img.id,
      imagePath: img.imagePath,
      category: img.category,
      imageId: img.id,
      onDragStart,
      onDragEnd,
      isAnimating: animatingImages.has(img.id),
      animationType: animatingImages.get(img.id),
      isAnyImageDragging: isAnyImageDragging,
      currentDraggingId: currentDraggingId,
      style: gridPosition,
      componentType: img.componentType, // NEW: Support for React components
      componentProps: img.componentProps || {} // NEW: Component props
    });
  }));
});

/**
 * DragDropGame Component
 * Main game container managing all state and interactions
 */
const DragDropGame = React.memo(({ 
  questionIndex = 0,
  onComplete,
  onImageDropped,
  onDragStart: externalOnDragStart,
  unsortedCoordinates,
  dropZone1Coordinates,
  dropZone2Coordinates,
  dropZone3Coordinates, // NEW: Third drop zone
  // Border style props for unsorted container
  unsortedBorderColor = 'rgba(255, 255, 255, 0.2)',
  unsortedBorderWidth = '4gc',
  unsortedBorderRadius = '12gc',
  unsortedBorderStyle = 'solid',
  unsortedBackgroundColor = 'transparent',
  // Layout props for unsorted container
  unsortedColumns = 2,
  unsortedRows = 2,
  unsortedGravitate = 'up',
  // Border style props for drop zone 1
  dropZone1BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone1BorderWidth = '4gc',
  dropZone1BorderRadius = '12gc',
  dropZone1BorderStyle = 'dashed',
  dropZone1Padding = '2.5%',
  dropZone1Columns = 2,
  dropZone1Rows = 2,
  dropZone1Category = 'equal', // Category for drop zone 1
  dropZone1Label = 'Equal Parts', // Label for drop zone 1
  dropZone1LabelCoordinates, // Label coordinates for drop zone 1
  dropZone1LabelBackground, // Label background for drop zone 1
  // Border style props for drop zone 2
  dropZone2BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone2BorderWidth = '4gc',
  dropZone2BorderRadius = '12gc',
  dropZone2BorderStyle = 'dashed',
  dropZone2Padding = '2.5%',
  dropZone2Columns = 2,
  dropZone2Rows = 2,
  dropZone2Category = 'unequal', // Category for drop zone 2
  dropZone2Label = 'Unequal Parts', // Label for drop zone 2
  dropZone2LabelCoordinates, // Label coordinates for drop zone 2
  dropZone2LabelBackground, // Label background for drop zone 2
  // Border style props for drop zone 3 (NEW)
  dropZone3BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone3BorderWidth = '4gc',
  dropZone3BorderRadius = '12gc',
  dropZone3BorderStyle = 'dashed',
  dropZone3Padding = '2.5%',
  dropZone3Columns = 2,
  dropZone3Rows = 2,
  dropZone3Category = 'obtuse', // Category for drop zone 3
  dropZone3Label = 'Obtuse Triangle', // Label for drop zone 3
  dropZone3LabelCoordinates, // Label coordinates for drop zone 3
  dropZone3LabelBackground, // Label background for drop zone 3
  // Empty message for drop zones
  dropZoneEmptyMessage = '',
  // Initial images in unsorted container (if not provided, loads from Questions)
  initialUnsortedImages = null
}) => {
  // Determine which categories to use based on whether dropZone3 is provided
  const hasThirdZone = !!dropZone3Coordinates;
  const category1 = dropZone1Category;
  const category2 = dropZone2Category;
  const category3 = hasThirdZone ? dropZone3Category : null;
  
  const [gameState, setGameState] = React.useState(() => {
    // If initialUnsortedImages is provided, use it (can be empty array)
    if (initialUnsortedImages !== null) {
      const unsortedImages = Array.isArray(initialUnsortedImages) ? initialUnsortedImages.map((img, idx) => ({
        ...img,
        id: img.id || `img${idx + 1}`
      })) : [];
      console.log('🔍 [DragDrop] Initial unsorted images:', unsortedImages);
      const state = {
        unsorted: unsortedImages
      };
      state[category1] = [];
      state[category2] = [];
      if (category3) state[category3] = [];
      console.log('🔍 [DragDrop] Initial game state:', state);
      return state;
    }
    
    // Default behavior: load from Questions
    const question = window.Questions?.[questionIndex];
    if (!question) {
      console.error('Question not found at index:', questionIndex);
      const initialState = { unsorted: [] };
      initialState[category1] = [];
      initialState[category2] = [];
      if (category3) initialState[category3] = [];
      return initialState;
    }
    
    const state = {
      unsorted: [
        { ...question.image1, id: 'img1' },
        { ...question.image2, id: 'img2' },
        { ...question.image3, id: 'img3' },
        { ...question.image4, id: 'img4' }
      ]
    };
    state[category1] = [];
    state[category2] = [];
    if (category3) state[category3] = [];
    return state;
  });

  const [draggedImage, setDraggedImage] = React.useState(null);
  const [hoverZone, setHoverZone] = React.useState(null);
  const [animatingImages, setAnimatingImages] = React.useState(new Map());
  const [draggingImageId, setDraggingImageId] = React.useState(null);
  const dropZonesRef = React.useRef({});

  // Reset game state when question index changes
  React.useEffect(() => {
    console.log('🔄 [DragDrop] Question index changed to:', questionIndex);
    
    // If initialUnsortedImages is provided, use it
    if (initialUnsortedImages !== null) {
      const state = {
        unsorted: Array.isArray(initialUnsortedImages) ? initialUnsortedImages.map((img, idx) => ({
          ...img,
          id: img.id || `img${idx + 1}`
        })) : []
      };
      state[category1] = [];
      state[category2] = [];
      if (category3) state[category3] = [];
      setGameState(state);
      return;
    }
    
    // Default behavior: load from Questions
    const question = window.Questions?.[questionIndex];
    if (!question) {
      console.error('Question not found at index:', questionIndex);
      return;
    }
    
    // Reset game state with new question data
    const state = {
      unsorted: [
        { ...question.image1, id: 'img1' },
        { ...question.image2, id: 'img2' },
        { ...question.image3, id: 'img3' },
        { ...question.image4, id: 'img4' }
      ]
    };
    state[category1] = [];
    state[category2] = [];
    if (category3) state[category3] = [];
    setGameState(state);
    
    // Reset other states
    setDraggedImage(null);
    setHoverZone(null);
    setAnimatingImages(new Map());
    setDraggingImageId(null);
    
    console.log('✅ [DragDrop] Game state reset for question:', questionIndex);
  }, [questionIndex, initialUnsortedImages, category1, category2, category3]);

  // Helper to convert coordinates to CSS positioning
  const coordinatesToStyle = React.useMemo(() => {
    return (coords) => {
      if (!coords || coords.length !== 4) return {};
      
      const [x1, y1, x2, y2] = coords;
      const left = ((x1 - 1) / 1600 * 100);
      const top = ((y1 - 1) / 900 * 100);
      const width = ((x2 - x1 + 1) / 1600 * 100);
      const height = ((y2 - y1 + 1) / 900 * 100);
      
      return {
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`
      };
    };
  }, []);

  // Track mouse position for hover detection
  const handleDragStart = React.useCallback((imageId, position) => {
    const image = gameState.unsorted.find(img => img.id === imageId);
    setDraggedImage(image);
    setDraggingImageId(imageId);
    console.log('🎯 Drag started:', imageId, image?.category);
    // Call external onDragStart callback if provided
    if (externalOnDragStart) {
      externalOnDragStart();
    }
  }, [gameState.unsorted, externalOnDragStart]);

  const checkHoverZone = React.useCallback((x, y) => {
    let hoveredZone = null;
    
    Object.entries(dropZonesRef.current).forEach(([zone, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          hoveredZone = zone;
        }
      }
    });
    
    setHoverZone(hoveredZone);
  }, []);

  const handleDragEnd = React.useCallback((imageId, position) => {
    console.log('🎯 Drag ended:', imageId, 'at zone:', hoverZone);
    
    if (!hoverZone || !draggedImage) {
      setDraggedImage(null);
      setHoverZone(null);
      setDraggingImageId(null);
      return;
    }

    // Validate drop
    const isCorrect = draggedImage.category === hoverZone;
    
    if (isCorrect) {
      // Correct drop - move to zone
      setGameState(prev => ({
        ...prev,
        unsorted: prev.unsorted.filter(img => img.id !== imageId),
        [hoverZone]: [...prev[hoverZone], draggedImage]
      }));
      
      onImageDropped?.(true, draggedImage.category);
      console.log('✅ Correct drop!');
      
      // Play correct sound
      if (typeof window !== 'undefined' && window.playCorrectSound) {
        window.playCorrectSound();
      }
    } else {
      // Incorrect drop - animate and return
      setAnimatingImages(prev => new Map(prev).set(imageId, 'incorrect'));
      
      setTimeout(() => {
        setAnimatingImages(prev => {
          const newMap = new Map(prev);
          newMap.delete(imageId);
          return newMap;
        });
      }, 1000);
      
      onImageDropped?.(false, draggedImage.category);
      console.log('❌ Incorrect drop!');
      
      // Play wrong sound
      if (typeof window !== 'undefined' && window.playWrongSound) {
        window.playWrongSound();
      }
    }
    
    setDraggedImage(null);
    setHoverZone(null);
    setDraggingImageId(null);
  }, [hoverZone, draggedImage, onImageDropped]);

  // Track mouse position globally during drag
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedImage) {
        checkHoverZone(e.clientX, e.clientY);
      }
    };
    
    const handleTouchMove = (e) => {
      if (draggedImage && e.touches[0]) {
        checkHoverZone(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    if (draggedImage) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [draggedImage, checkHoverZone]);

  // Check win condition
  React.useEffect(() => {
    const allSorted = gameState.unsorted.length === 0;
    const zone1HasItems = gameState[category1]?.length > 0;
    const zone2HasItems = gameState[category2]?.length > 0;
    const zone3HasItems = category3 ? (gameState[category3]?.length > 0) : true; // If no third zone, don't require it
    
    if (allSorted && zone1HasItems && zone2HasItems && zone3HasItems) {
      console.log('🎉 Game completed!');
      onComplete?.();
    }
  }, [gameState, category1, category2, category3, onComplete]);

  return React.createElement('div', {
    className: 'drag-drop-game',
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  }, [
    // Unsorted Container
    React.createElement('div', {
      key: 'unsorted-wrapper',
      className: 'unsorted-wrapper',
      style: coordinatesToStyle(unsortedCoordinates)
    }, React.createElement(UnsortedContainer, {
      images: gameState.unsorted,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      animatingImages,
      borderColor: unsortedBorderColor,
      borderWidth: unsortedBorderWidth,
      borderRadius: unsortedBorderRadius,
      borderStyle: unsortedBorderStyle,
      backgroundColor: unsortedBackgroundColor,
      columns: unsortedColumns,
      rows: unsortedRows,
      gravitate: unsortedGravitate,
      isAnyImageDragging: draggingImageId !== null,
      currentDraggingId: draggingImageId
    })),
    
    // Drop Zone 1 Label (if provided)
    dropZone1LabelCoordinates && React.createElement('div', {
      key: 'dropzone1-label',
      style: {
        ...coordinatesToStyle(dropZone1LabelCoordinates),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dropZone1LabelBackground || 'transparent',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 10,
        pointerEvents: 'none'
      }
    }, dropZone1Label),
    
    // Drop Zone 1
    React.createElement('div', {
      key: `${category1}-zone-wrapper`,
      ref: el => dropZonesRef.current[category1] = el,
      className: `drop-zone-wrapper ${category1}-zone-wrapper`,
      style: coordinatesToStyle(dropZone1Coordinates)
    }, React.createElement(DropZone, {
      category: category1,
      label: dropZone1Label,
      images: gameState[category1] || [],
      isHovered: hoverZone === category1,
      borderColor: dropZone1BorderColor,
      borderWidth: dropZone1BorderWidth,
      borderRadius: dropZone1BorderRadius,
      borderStyle: dropZone1BorderStyle,
      padding: dropZone1Padding,
      columns: dropZone1Columns,
      rows: dropZone1Rows
    })),
    
    // Drop Zone 2 Label (if provided)
    dropZone2LabelCoordinates && React.createElement('div', {
      key: 'dropzone2-label',
      style: {
        ...coordinatesToStyle(dropZone2LabelCoordinates),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dropZone2LabelBackground || 'transparent',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 10,
        pointerEvents: 'none'
      }
    }, dropZone2Label),
    
    // Drop Zone 2
    React.createElement('div', {
      key: `${category2}-zone-wrapper`,
      ref: el => dropZonesRef.current[category2] = el,
      className: `drop-zone-wrapper ${category2}-zone-wrapper`,
      style: coordinatesToStyle(dropZone2Coordinates)
    }, React.createElement(DropZone, {
      category: category2,
      label: dropZone2Label,
      images: gameState[category2] || [],
      isHovered: hoverZone === category2,
      borderColor: dropZone2BorderColor,
      borderWidth: dropZone2BorderWidth,
      borderRadius: dropZone2BorderRadius,
      borderStyle: dropZone2BorderStyle,
      padding: dropZone2Padding,
      columns: dropZone2Columns,
      rows: dropZone2Rows
    })),
    
    // Drop Zone 3 Label (if provided and dropZone3 exists)
    hasThirdZone && dropZone3LabelCoordinates && React.createElement('div', {
      key: 'dropzone3-label',
      style: {
        ...coordinatesToStyle(dropZone3LabelCoordinates),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dropZone3LabelBackground || 'transparent',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 10,
        pointerEvents: 'none'
      }
    }, dropZone3Label),
    
    // Drop Zone 3 (if provided)
    hasThirdZone && React.createElement('div', {
      key: `${category3}-zone-wrapper`,
      ref: el => dropZonesRef.current[category3] = el,
      className: `drop-zone-wrapper ${category3}-zone-wrapper`,
      style: coordinatesToStyle(dropZone3Coordinates)
    }, React.createElement(DropZone, {
      category: category3,
      label: dropZone3Label,
      images: gameState[category3] || [],
      isHovered: hoverZone === category3,
      borderColor: dropZone3BorderColor,
      borderWidth: dropZone3BorderWidth,
      borderRadius: dropZone3BorderRadius,
      borderStyle: dropZone3BorderStyle,
      padding: dropZone3Padding,
      columns: dropZone3Columns,
      rows: dropZone3Rows
    }))
  ]);
});

// Export components
window.DragDropComponents = {
  DraggableImage,
  DropZone,
  UnsortedContainer,
  DragDropGame
};

// Export for element registry
window.DragDropGameComponent = {
  DragDropGame,
  DragDropElement: {
    'drag-drop-game': {
      type: 'drag-drop-game',
      createOptimized: window.SharedUtilities?.createOptimizedElementFactory('drag-drop-game', (props) => {
        return React.createElement(DragDropGame, props);
      })
    }
  }
};

console.log('✅ Drag-and-drop game component loaded successfully');

