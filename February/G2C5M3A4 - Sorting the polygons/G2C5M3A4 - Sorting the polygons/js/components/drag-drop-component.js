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
  style: externalStyle = {}
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragPosition, setDragPosition] = React.useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = React.useState({ width: 0, height: 0 });
  const imageRef = React.useRef(null);
  const dragStartPos = React.useRef({ x: 0, y: 0 });

  const handleMouseDown = React.useCallback((e) => {
    // Prevent dragging if animating or if another image is being dragged
    if (isAnimating || (isAnyImageDragging && currentDraggingId !== imageId)) return;

    e.preventDefault();
    const rect = imageRef.current.getBoundingClientRect();

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

    // Only prevent default if the event is cancelable
    // This prevents the browser warning about non-cancelable touchmove events
    if (e.cancelable) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    if (touch) {
      setDragPosition({
        x: touch.clientX - dragStartPos.current.x,
        y: touch.clientY - dragStartPos.current.y
      });
    }
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
    opacity: isDragging ? 0.8 : ((isAnyImageDragging && currentDraggingId !== imageId) ? 0.5 : 1),
    transform: isDragging ? 'scale(1)' : 'scale(1)',
    cursor: isAnimating ? 'not-allowed' : ((isAnyImageDragging && currentDraggingId !== imageId) ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab')),
    transition: isDragging ? 'none' : 'all 0.3s ease',
    zIndex: isDragging ? 999999 : 'auto',
    pointerEvents: isAnimating ? 'none' : ((isAnyImageDragging && currentDraggingId !== imageId) ? 'none' : 'auto'),
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none'
  };

  // Add animation classes
  const animationClass = animationType === 'incorrect' ? 'wiggle-animation' : '';

  return React.createElement('div', {
    ref: imageRef,
    className: `draggable-image ${animationClass} ${isDragging ? 'dragging' : ''}`,
    style: imageStyle,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    'data-image-id': imageId,
    'data-category': category
  }, React.createElement('img', {
    src: `assets/${imagePath}`,
    alt: `${category} parts`,
    draggable: false,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      userSelect: 'none'
    }
  }));
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
  rows = 2,
  emptyMessage = null
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
      gridRow: '1 / -1',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }
  }, emptyMessage || 'Drag images here') : images.map(img =>
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
  currentDraggingId = null,
  emptyMessage = null
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
    switch (gravitate) {
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
  }, images.length === 0 && emptyMessage ? React.createElement('div', {
    style: {
      gridColumn: '1 / -1',
      gridRow: '1 / -1',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }
  }, emptyMessage) : images.map((img, index) => {
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
      style: gridPosition
    });
  }));
});

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (does not mutate original)
 */
const shuffleArray = (array) => {
  const shuffled = [...array]; // Create a copy to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Extract all images from a question object dynamically
 * Finds all properties matching pattern "image" followed by digits (e.g., image1, image2, image10, etc.)
 * @param {Object} question - Question object containing image properties
 * @returns {Array} - Array of image objects with id property added
 */
const extractAllImagesFromQuestion = (question) => {
  if (!question) return [];

  const images = [];
  const imageKeys = Object.keys(question)
    .filter(key => /^image\d+$/.test(key))
    .sort((a, b) => {
      // Extract numeric part and compare
      const numA = parseInt(a.replace('image', ''), 10);
      const numB = parseInt(b.replace('image', ''), 10);
      return numA - numB;
    });

  imageKeys.forEach((key, index) => {
    if (question[key]) {
      const imageNumber = key.replace('image', '');
      images.push({ ...question[key], id: `img${imageNumber}` });
    }
  });

  return images;
};

/**
 * DragDropGame Component
 * Main game container managing all state and interactions
 */
const DragDropGame = React.memo(({
  showImages = "",
  questionIndex = 0,
  onComplete,
  onImageDropped,
  onDragStart: externalOnDragStart,
  unsortedCoordinates,
  dropZone1Coordinates,
  dropZone2Coordinates,
  // Category props for drop zones
  dropZone1Category = 'equal',
  dropZone2Category = 'unequal',
  dropZone1Label = 'Equal Parts',
  dropZone2Label = 'Unequal Parts',
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
  // Border style props for drop zone 2
  dropZone2BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone2BorderWidth = '4gc',
  dropZone2BorderRadius = '12gc',
  dropZone2BorderStyle = 'dashed',
  dropZone2Padding = '2.5%',
  dropZone2Columns = 2,
  dropZone2Rows = 2,
  // Label textbox props for drop zone 1
  dropZone1LabelCoordinates = null,
  dropZone1LabelFontSize = '28gc',
  dropZone1LabelFontWeight = 'bold',
  dropZone1LabelTextAlign = 'center',
  dropZone1LabelColor = '#000000',
  dropZone1LabelBackgroundColor = '#4A90E2',
  dropZone1LabelBorderRadius = '8gc',
  dropZone1LabelBorder = '2px solid #2C5AA0',
  dropZone1LabelBoxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)',
  dropZone1LabelBackground = 'linear-gradient(to bottom, #5BA0F2, #3A80D2)',
  // Label textbox props for drop zone 2
  dropZone2LabelCoordinates = null,
  dropZone2LabelFontSize = '28gc',
  dropZone2LabelFontWeight = 'bold',
  dropZone2LabelTextAlign = 'center',
  dropZone2LabelColor = '#000000',
  dropZone2LabelBackgroundColor = '#4A90E2',
  dropZone2LabelBorderRadius = '8gc',
  dropZone2LabelBorder = '2px solid #2C5AA0',
  dropZone2LabelBoxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)',
  dropZone2LabelBackground = 'linear-gradient(to bottom, #5BA0F2, #3A80D2)',
  // Drop zone 3 props (optional)
  dropZone3Coordinates = null,
  dropZone3Category = null,
  dropZone3Label = '',
  dropZone3BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone3BorderWidth = '4gc',
  dropZone3BorderRadius = '12gc',
  dropZone3BorderStyle = 'dashed',
  dropZone3Padding = '2.5%',
  dropZone3Columns = 2,
  dropZone3Rows = 2,
  dropZone3LabelCoordinates = null,
  dropZone3LabelFontSize = '28gc',
  dropZone3LabelFontWeight = 'bold',
  dropZone3LabelTextAlign = 'center',
  dropZone3LabelColor = '#000000',
  dropZone3LabelBackgroundColor = '#4A90E2',
  dropZone3LabelBorderRadius = '8gc',
  dropZone3LabelBorder = '2px solid #2C5AA0',
  dropZone3LabelBoxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)',
  dropZone3LabelBackground = 'linear-gradient(to bottom, #5BA0F2, #3A80D2)',
  // Drop zone 4 props (optional)
  dropZone4Coordinates = null,
  dropZone4Category = null,
  dropZone4Label = '',
  dropZone4BorderColor = 'rgba(255, 255, 255, 0.3)',
  dropZone4BorderWidth = '4gc',
  dropZone4BorderRadius = '12gc',
  dropZone4BorderStyle = 'dashed',
  dropZone4Padding = '2.5%',
  dropZone4Columns = 2,
  dropZone4Rows = 2,
  dropZone4LabelCoordinates = null,
  dropZone4LabelFontSize = '28gc',
  dropZone4LabelFontWeight = 'bold',
  dropZone4LabelTextAlign = 'center',
  dropZone4LabelColor = '#000000',
  dropZone4LabelBackgroundColor = '#4A90E2',
  dropZone4LabelBorderRadius = '8gc',
  dropZone4LabelBorder = '2px solid #2C5AA0',
  dropZone4LabelBoxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)',
  dropZone4LabelBackground = 'linear-gradient(to bottom, #5BA0F2, #3A80D2)',
  // Congratulatory message when unsorted zone is cleared
  unsortedEmptyMessage = null,
  // Empty message for drop zones
  dropZoneEmptyMessage = null
}) => {
  const [gameState, setGameState] = React.useState(() => {
    // Reset game completed state on initial mount
    if (typeof window !== 'undefined') {
      window.gameCompleted = false;
    }

    const question = showImages[questionIndex];
    if (!question) {
      console.error('Question not found at index:', questionIndex);
      const initialState = { unsorted: [], queue: [] };
      initialState[dropZone1Category] = [];
      initialState[dropZone2Category] = [];
      return initialState;
    }

    // Build unsorted array - dynamically extract all images
    const allImages = extractAllImagesFromQuestion(question);

    // Shuffle the images for random display order
    const shuffledImages = shuffleArray(allImages);

    // Calculate max visible slots in unsorted container
    const maxVisibleSlots = unsortedColumns * unsortedRows;

    // Split into visible and queue
    const visibleImages = shuffledImages.slice(0, maxVisibleSlots);
    const queueImages = shuffledImages.slice(maxVisibleSlots);

    console.log(`📊 [DragDrop] Total images: ${shuffledImages.length}, Visible: ${visibleImages.length}, Queue: ${queueImages.length}`);

    const initialState = {
      unsorted: visibleImages,
      queue: queueImages
    };
    initialState[dropZone1Category] = [];
    initialState[dropZone2Category] = [];
    if (dropZone3Category) initialState[dropZone3Category] = [];
    if (dropZone4Category) initialState[dropZone4Category] = [];
    return initialState;
  });

  const [draggedImage, setDraggedImage] = React.useState(null);
  const [hoverZone, setHoverZone] = React.useState(null);
  const [animatingImages, setAnimatingImages] = React.useState(new Map());
  const [draggingImageId, setDraggingImageId] = React.useState(null);
  const dropZonesRef = React.useRef({});

  // Reset game completed state on component mount
  React.useEffect(() => {
    console.log('🔄 [DragDrop] Component mounted, resetting gameCompleted to false');
    if (typeof window !== 'undefined') {
      window.gameCompleted = false;
      console.log('✅ [DragDrop] gameCompleted set to false');

      // Force re-render of buttons - try multiple times to ensure it works
      const forceUpdate = () => {
        if (typeof window.forceAppUpdate === 'function') {
          window.forceAppUpdate();
          console.log('🔄 [DragDrop] Called forceAppUpdate');
        }
        // Also try dispatching a custom event
        if (typeof window.dispatchEvent !== 'undefined') {
          window.dispatchEvent(new CustomEvent('gameStateChanged', { detail: { gameCompleted: false } }));
          console.log('🔄 [DragDrop] Dispatched gameStateChanged event');
        }
      };

      // Immediate update
      forceUpdate();

      // Also try after a small delay to ensure it happens after render
      setTimeout(forceUpdate, 0);
      setTimeout(forceUpdate, 10);
    }
  }, []); // Empty dependency array - runs only on mount

  // Reset game state when question index changes
  React.useEffect(() => {
    console.log('🔄 [DragDrop] Question index changed to:', questionIndex);

    const question = showImages[questionIndex];
    if (!question) {
      console.error('Question not found at index:', questionIndex);
      return;
    }

    // Build unsorted array - dynamically extract all images
    const allImages = extractAllImagesFromQuestion(question);

    // Shuffle the images for random display order
    const shuffledImages = shuffleArray(allImages);

    // Calculate max visible slots in unsorted container
    const maxVisibleSlots = unsortedColumns * unsortedRows;

    // Split into visible and queue
    const visibleImages = shuffledImages.slice(0, maxVisibleSlots);
    const queueImages = shuffledImages.slice(maxVisibleSlots);

    console.log(`📊 [DragDrop] Reset - Total: ${shuffledImages.length}, Visible: ${visibleImages.length}, Queue: ${queueImages.length}`);

    // Reset game state with new question data
    const newState = {
      unsorted: visibleImages,
      queue: queueImages
    };
    newState[dropZone1Category] = [];
    newState[dropZone2Category] = [];
    if (dropZone3Category) newState[dropZone3Category] = [];
    if (dropZone4Category) newState[dropZone4Category] = [];
    setGameState(newState);

    // Reset other states
    setDraggedImage(null);
    setHoverZone(null);
    setAnimatingImages(new Map());
    setDraggingImageId(null);

    // Reset game completed state
    if (typeof window !== 'undefined') {
      window.gameCompleted = false;
    }

    console.log('✅ [DragDrop] Game state reset for question:', questionIndex);
  }, [questionIndex, dropZone1Category, dropZone2Category, dropZone3Category, dropZone4Category, unsortedColumns, unsortedRows]);

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

  // Helper to convert gc units to pixels
  const convertGcToPx = React.useCallback((value) => {
    if (typeof value === 'string' && value.endsWith('gc')) {
      return value.replace('gc', 'px');
    }
    return value;
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
      // Correct drop - move to zone and pull from queue if available
      setGameState(prev => {
        const newUnsorted = prev.unsorted.filter(img => img.id !== imageId);
        const newQueue = [...prev.queue];

        // If queue has items, add one to unsorted
        if (newQueue.length > 0) {
          const nextImage = newQueue.shift();
          console.log(`🔄 [Queue] Adding image from queue: ${nextImage.id}, Remaining in queue: ${newQueue.length}`);
          newUnsorted.push(nextImage);
        }

        return {
          ...prev,
          unsorted: newUnsorted,
          queue: newQueue,
          [hoverZone]: [...prev[hoverZone], draggedImage]
        };
      });

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
    const question = showImages[questionIndex];
    if (!question) {
      console.warn('⚠️ [Win Condition] Question not found at index:', questionIndex);
      return;
    }

    // Determine which categories actually exist in the question data
    const categoriesInQuestion = new Set();
    const allImages = extractAllImagesFromQuestion(question);
    let totalItems = 0;
    allImages.forEach(image => {
      if (image && image.category) {
        categoriesInQuestion.add(image.category);
        totalItems++;
      }
    });

    const zone1Images = gameState[dropZone1Category] || [];
    const zone2Images = gameState[dropZone2Category] || [];
    const zone3Images = dropZone3Category ? (gameState[dropZone3Category] || []) : [];
    const zone4Images = dropZone4Category ? (gameState[dropZone4Category] || []) : [];

    // Count total sorted items
    const totalSorted = zone1Images.length + zone2Images.length + zone3Images.length + zone4Images.length;
    const unsortedCount = gameState.unsorted.length;

    // Only check zones that have corresponding categories in the question data
    const zone1Required = categoriesInQuestion.has(dropZone1Category);
    const zone2Required = categoriesInQuestion.has(dropZone2Category);
    const zone3Required = dropZone3Category && categoriesInQuestion.has(dropZone3Category);
    const zone4Required = dropZone4Category && categoriesInQuestion.has(dropZone4Category);

    const hasZone1Images = zone1Required ? zone1Images.length > 0 : true;
    const hasZone2Images = zone2Required ? zone2Images.length > 0 : true;
    const hasZone3Images = zone3Required ? zone3Images.length > 0 : true;
    const hasZone4Images = zone4Required ? zone4Images.length > 0 : true;

    const unsortedEmpty = unsortedCount === 0;
    const allZonesHaveImages = hasZone1Images && hasZone2Images && hasZone3Images && hasZone4Images;
    const allItemsSorted = totalSorted === totalItems && unsortedEmpty;

    console.log('🔍 [Win Condition] Checking:', {
      unsortedEmpty,
      unsortedCount,
      totalItems,
      totalSorted,
      allItemsSorted,
      hasZone1Images,
      hasZone2Images,
      hasZone3Images,
      hasZone4Images,
      allZonesHaveImages,
      zone1Count: zone1Images.length,
      zone2Count: zone2Images.length,
      zone3Count: zone3Images.length,
      zone4Count: zone4Images.length,
      zone1Category: dropZone1Category,
      zone2Category: dropZone2Category,
      zone3Category: dropZone3Category,
      zone4Category: dropZone4Category,
      zone1Required,
      zone2Required,
      zone3Required,
      zone4Required,
      categoriesInQuestion: Array.from(categoriesInQuestion)
    });

    if (unsortedEmpty && allZonesHaveImages && allItemsSorted) {
      console.log('🎉 Game completed! All conditions met!');
      onComplete?.();
    } else {
      console.log('⏳ [Win Condition] Not completed yet:', {
        unsortedEmpty,
        allZonesHaveImages,
        allItemsSorted
      });
    }
  }, [gameState, questionIndex, dropZone1Category, dropZone2Category, dropZone3Category, dropZone4Category, onComplete]);

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
      currentDraggingId: draggingImageId,
      emptyMessage: unsortedEmptyMessage
    })),

    // Drop Zone 1
    React.createElement('div', {
      key: `${dropZone1Category}-zone-wrapper`,
      ref: el => dropZonesRef.current[dropZone1Category] = el,
      className: `drop-zone-wrapper ${dropZone1Category}-zone-wrapper`,
      style: coordinatesToStyle(dropZone1Coordinates)
    }, React.createElement(DropZone, {
      category: dropZone1Category,
      label: dropZone1Label,
      images: gameState[dropZone1Category] || [],
      isHovered: hoverZone === dropZone1Category,
      borderColor: dropZone1BorderColor,
      borderWidth: dropZone1BorderWidth,
      borderRadius: dropZone1BorderRadius,
      borderStyle: dropZone1BorderStyle,
      padding: dropZone1Padding,
      columns: dropZone1Columns,
      rows: dropZone1Rows,
      emptyMessage: dropZoneEmptyMessage
    })),

    // Drop Zone 2
    React.createElement('div', {
      key: `${dropZone2Category}-zone-wrapper`,
      ref: el => dropZonesRef.current[dropZone2Category] = el,
      className: `drop-zone-wrapper ${dropZone2Category}-zone-wrapper`,
      style: coordinatesToStyle(dropZone2Coordinates)
    }, React.createElement(DropZone, {
      category: dropZone2Category,
      label: dropZone2Label,
      images: gameState[dropZone2Category] || [],
      isHovered: hoverZone === dropZone2Category,
      borderColor: dropZone2BorderColor,
      borderWidth: dropZone2BorderWidth,
      borderRadius: dropZone2BorderRadius,
      borderStyle: dropZone2BorderStyle,
      padding: dropZone2Padding,
      columns: dropZone2Columns,
      rows: dropZone2Rows,
      emptyMessage: dropZoneEmptyMessage
    })),

    // Drop Zone 1 Label Textbox
    dropZone1LabelCoordinates ? React.createElement('div', {
      key: 'dropzone1-label-textbox',
      id: 'dropzone1-label-textbox-id',
      className: 'dropzone-label-textbox dropzone1-label-textbox',
      style: {
        ...coordinatesToStyle(dropZone1LabelCoordinates),
        zIndex: 'var(--z-elevated)',
        fontSize: convertGcToPx(dropZone1LabelFontSize),
        fontWeight: dropZone1LabelFontWeight,
        textAlign: dropZone1LabelTextAlign,
        color: dropZone1LabelColor,
        backgroundColor: dropZone1LabelBackgroundColor,
        borderRadius: convertGcToPx(dropZone1LabelBorderRadius),
        border: dropZone1LabelBorder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: dropZone1LabelBoxShadow,
        background: dropZone1LabelBackground,
        pointerEvents: 'auto'
      },
      'data-element-name': 'dropzone1-label-textbox'
    }, dropZone1Label) : null,

    // Drop Zone 2 Label Textbox
    dropZone2LabelCoordinates ? React.createElement('div', {
      key: 'dropzone2-label-textbox',
      id: 'dropzone2-label-textbox-id',
      className: 'dropzone-label-textbox dropzone2-label-textbox',
      style: {
        ...coordinatesToStyle(dropZone2LabelCoordinates),
        zIndex: 'var(--z-elevated)',
        fontSize: convertGcToPx(dropZone2LabelFontSize),
        fontWeight: dropZone2LabelFontWeight,
        textAlign: dropZone2LabelTextAlign,
        color: dropZone2LabelColor,
        backgroundColor: dropZone2LabelBackgroundColor,
        borderRadius: convertGcToPx(dropZone2LabelBorderRadius),
        border: dropZone2LabelBorder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: dropZone2LabelBoxShadow,
        background: dropZone2LabelBackground,
        pointerEvents: 'auto'
      },
      'data-element-name': 'dropzone2-label-textbox'
    }, dropZone2Label) : null,

    // Drop Zone 3 (optional)
    dropZone3Coordinates && dropZone3Category ? React.createElement('div', {
      key: `${dropZone3Category}-zone-wrapper`,
      ref: el => dropZonesRef.current[dropZone3Category] = el,
      className: `drop-zone-wrapper ${dropZone3Category}-zone-wrapper`,
      style: coordinatesToStyle(dropZone3Coordinates)
    }, React.createElement(DropZone, {
      category: dropZone3Category,
      label: dropZone3Label,
      images: gameState[dropZone3Category] || [],
      isHovered: hoverZone === dropZone3Category,
      borderColor: dropZone3BorderColor,
      borderWidth: dropZone3BorderWidth,
      borderRadius: dropZone3BorderRadius,
      borderStyle: dropZone3BorderStyle,
      padding: dropZone3Padding,
      columns: dropZone3Columns,
      rows: dropZone3Rows,
      emptyMessage: dropZoneEmptyMessage
    })) : null,

    // Drop Zone 3 Label Textbox
    dropZone3LabelCoordinates && dropZone3Category ? React.createElement('div', {
      key: 'dropzone3-label-textbox',
      id: 'dropzone3-label-textbox-id',
      className: 'dropzone-label-textbox dropzone3-label-textbox',
      style: {
        ...coordinatesToStyle(dropZone3LabelCoordinates),
        zIndex: 'var(--z-elevated)',
        fontSize: convertGcToPx(dropZone3LabelFontSize),
        fontWeight: dropZone3LabelFontWeight,
        textAlign: dropZone3LabelTextAlign,
        color: dropZone3LabelColor,
        backgroundColor: dropZone3LabelBackgroundColor,
        borderRadius: convertGcToPx(dropZone3LabelBorderRadius),
        border: dropZone3LabelBorder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: dropZone3LabelBoxShadow,
        background: dropZone3LabelBackground,
        pointerEvents: 'auto'
      },
      'data-element-name': 'dropzone3-label-textbox'
    }, dropZone3Label) : null,

    // Drop Zone 4 (optional)
    dropZone4Coordinates && dropZone4Category ? React.createElement('div', {
      key: `${dropZone4Category}-zone-wrapper`,
      ref: el => dropZonesRef.current[dropZone4Category] = el,
      className: `drop-zone-wrapper ${dropZone4Category}-zone-wrapper`,
      style: coordinatesToStyle(dropZone4Coordinates)
    }, React.createElement(DropZone, {
      category: dropZone4Category,
      label: dropZone4Label,
      images: gameState[dropZone4Category] || [],
      isHovered: hoverZone === dropZone4Category,
      borderColor: dropZone4BorderColor,
      borderWidth: dropZone4BorderWidth,
      borderRadius: dropZone4BorderRadius,
      borderStyle: dropZone4BorderStyle,
      padding: dropZone4Padding,
      columns: dropZone4Columns,
      rows: dropZone4Rows,
      emptyMessage: dropZoneEmptyMessage
    })) : null,

    // Drop Zone 4 Label Textbox
    dropZone4LabelCoordinates && dropZone4Category ? React.createElement('div', {
      key: 'dropzone4-label-textbox',
      id: 'dropzone4-label-textbox-id',
      className: 'dropzone-label-textbox dropzone4-label-textbox',
      style: {
        ...coordinatesToStyle(dropZone4LabelCoordinates),
        zIndex: 'var(--z-elevated)',
        fontSize: convertGcToPx(dropZone4LabelFontSize),
        fontWeight: dropZone4LabelFontWeight,
        textAlign: dropZone4LabelTextAlign,
        color: dropZone4LabelColor,
        backgroundColor: dropZone4LabelBackgroundColor,
        borderRadius: convertGcToPx(dropZone4LabelBorderRadius),
        border: dropZone4LabelBorder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: dropZone4LabelBoxShadow,
        background: dropZone4LabelBackground,
        pointerEvents: 'auto'
      },
      'data-element-name': 'dropzone4-label-textbox'
    }, dropZone4Label) : null
  ].filter(Boolean)); // Filter out null values
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

