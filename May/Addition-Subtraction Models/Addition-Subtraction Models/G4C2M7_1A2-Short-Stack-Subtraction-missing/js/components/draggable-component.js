/**
 * Reusable Draggable Component
 * 
 * A generic draggable component that can be used for click-and-drag functionality.
 * Based on the DraggableImage pattern from drag-drop-component.js
 */

// Dependencies: React should be loaded before this file

/**
 * Draggable Component
 * Generic draggable wrapper that can wrap any content
 */
const Draggable = React.memo(({ 
  children,
  onDragStart,
  onDragEnd,
  onDragMove,
  isAnimating = false,
  isDisabled = false,
  isAnyDragging = false,
  currentDraggingId = null,
  draggableId,
  style: externalStyle = {},
  className = '',
  dragThreshold = 5, // Minimum pixels to move before starting drag
  centerOnMouse = false, // NEW: If true, always center element on mouse pointer
  dragPositionOverride = null, // When set (e.g. { x, y } in viewport px), use this for left/top during drag (for snap)
  elementZIndex, // Filter out - not a DOM prop
  componentType, // Filter out - not a DOM prop
  processedStyles, // Filter out - not a DOM prop
  ...props
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragPosition, setDragPosition] = React.useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = React.useState({ width: 0, height: 0 });
  const elementRef = React.useRef(null);
  const dragStartOffset = React.useRef({ x: 0, y: 0 });
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const hasMoved = React.useRef(false);

  const handleMouseDown = React.useCallback((e) => {
    // Prevent dragging if disabled, animating, or if another element is being dragged
    if (isDisabled || isAnimating || (isAnyDragging && currentDraggingId !== draggableId)) return;
    
    e.preventDefault();
    const rect = elementRef.current.getBoundingClientRect();
    
    // Store original size - prefer explicit width/height from style if available
    // This ensures elements with transforms maintain their correct size
    const computedStyle = window.getComputedStyle(elementRef.current);
    const styleWidth = externalStyle.width || computedStyle.width;
    const styleHeight = externalStyle.height || computedStyle.height;
    
    // Parse pixel values from style
    const widthPx = styleWidth && typeof styleWidth === 'string' && styleWidth.includes('px') 
      ? parseFloat(styleWidth) 
      : rect.width;
    const heightPx = styleHeight && typeof styleHeight === 'string' && styleHeight.includes('px')
      ? parseFloat(styleHeight)
      : rect.height;
    
    setOriginalSize({ 
      width: widthPx || rect.width, 
      height: heightPx || rect.height 
    });
    
    // Store where inside the element the user clicked
    // If centerOnMouse is true, set offset to 0 so mouse position = left/top directly
    // (The element's transform: translate(-50%, -50%) will center it on that position)
    if (centerOnMouse) {
      dragStartOffset.current = {
        x: 0,
        y: 0
      };
      console.log('🎯 Center-on-mouse enabled. Setting offset to (0, 0) to work with transform: translate(-50%, -50%)');
    } else {
      dragStartOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    
    // Store initial mouse position for threshold check
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY
    };
    
    // Set initial position to current position to prevent jump
    setDragPosition({
      x: rect.left,
      y: rect.top
    });
    
    hasMoved.current = false;
    setIsDragging(true);
    onDragStart?.(draggableId, { x: e.clientX, y: e.clientY });
  }, [draggableId, onDragStart, isAnimating, isDisabled, isAnyDragging, currentDraggingId, centerOnMouse, externalStyle]);

  const handleMouseMove = React.useCallback((e) => {
    if (!isDragging) return;
    
    // Check if we've moved enough to start dragging
    const distance = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.current.x, 2) + 
      Math.pow(e.clientY - dragStartPos.current.y, 2)
    );
    
    if (distance < dragThreshold && !hasMoved.current) {
      return; // Don't start dragging until threshold is met
    }
    
    hasMoved.current = true;
    
    // Calculate new position based on mouse movement
    const newPos = {
      x: e.clientX - dragStartOffset.current.x,
      y: e.clientY - dragStartOffset.current.y
    };
    
    if (centerOnMouse && !hasMoved.current) {
      console.log('🎯 Mouse move - Mouse:', e.clientX, e.clientY, 'Offset:', dragStartOffset.current, 'New pos:', newPos);
    }
    
    setDragPosition(newPos);
    
    // Call onDragMove if provided
    onDragMove?.(draggableId, { x: e.clientX, y: e.clientY });
  }, [isDragging, draggableId, onDragMove, dragThreshold, centerOnMouse]);

  const handleMouseUp = React.useCallback((e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    hasMoved.current = false;
    onDragEnd?.(draggableId, { x: e.clientX, y: e.clientY });
  }, [isDragging, draggableId, onDragEnd]);

  // Touch event handlers for mobile support
  const handleTouchStart = React.useCallback((e) => {
    // Prevent dragging if disabled, animating, or if another element is being dragged
    if (isDisabled || isAnimating || (isAnyDragging && currentDraggingId !== draggableId)) return;
    
    const touch = e.touches[0];
    const rect = elementRef.current.getBoundingClientRect();
    
    // Store original size - prefer explicit width/height from style if available
    // This ensures elements with transforms maintain their correct size
    const computedStyle = window.getComputedStyle(elementRef.current);
    const styleWidth = externalStyle.width || computedStyle.width;
    const styleHeight = externalStyle.height || computedStyle.height;
    
    // Parse pixel values from style
    const widthPx = styleWidth && typeof styleWidth === 'string' && styleWidth.includes('px') 
      ? parseFloat(styleWidth) 
      : rect.width;
    const heightPx = styleHeight && typeof styleHeight === 'string' && styleHeight.includes('px')
      ? parseFloat(styleHeight)
      : rect.height;
    
    setOriginalSize({ 
      width: widthPx || rect.width, 
      height: heightPx || rect.height 
    });
    
    // Store where inside the element the user touched
    // If centerOnMouse is true, set offset to 0 so touch position = left/top directly
    // (The element's transform: translate(-50%, -50%) will center it on that position)
    if (centerOnMouse) {
      dragStartOffset.current = {
        x: 0,
        y: 0
      };
    } else {
      dragStartOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    
    // Store initial touch position for threshold check
    dragStartPos.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    
    // Set initial position to current position to prevent jump
    setDragPosition({
      x: rect.left,
      y: rect.top
    });
    
    hasMoved.current = false;
    setIsDragging(true);
    onDragStart?.(draggableId, { x: touch.clientX, y: touch.clientY });
  }, [draggableId, onDragStart, isAnimating, isDisabled, isAnyDragging, currentDraggingId, centerOnMouse, externalStyle]);

  const handleTouchMove = React.useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    
    // Check if we've moved enough to start dragging
    const distance = Math.sqrt(
      Math.pow(touch.clientX - dragStartPos.current.x, 2) + 
      Math.pow(touch.clientY - dragStartPos.current.y, 2)
    );
    
    if (distance < dragThreshold && !hasMoved.current) {
      return; // Don't start dragging until threshold is met
    }
    
    hasMoved.current = true;
    
    setDragPosition({
      x: touch.clientX - dragStartOffset.current.x,
      y: touch.clientY - dragStartOffset.current.y
    });
    
    // Call onDragMove if provided
    onDragMove?.(draggableId, { x: touch.clientX, y: touch.clientY });
  }, [isDragging, draggableId, onDragMove, dragThreshold]);

  const handleTouchEnd = React.useCallback((e) => {
    if (!isDragging) return;
    
    const touch = e.changedTouches[0];
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    hasMoved.current = false;
    onDragEnd?.(draggableId, { x: touch.clientX, y: touch.clientY });
  }, [isDragging, draggableId, onDragEnd]);

  // Global mouse and touch listeners
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

  const effectiveDragPos = (dragPositionOverride && typeof dragPositionOverride.x === 'number' && typeof dragPositionOverride.y === 'number')
    ? dragPositionOverride
    : dragPosition;
  const elementStyle = {
    ...externalStyle,
    position: isDragging && hasMoved.current ? 'fixed' : (externalStyle.position || 'relative'),
    left: isDragging && hasMoved.current ? `${effectiveDragPos.x}px` : (externalStyle.left || 'auto'),
    top: isDragging && hasMoved.current ? `${effectiveDragPos.y}px` : (externalStyle.top || 'auto'),
    width: isDragging && hasMoved.current ? `${originalSize.width}px` : (externalStyle.width || 'auto'),
    height: isDragging && hasMoved.current ? `${originalSize.height}px` : (externalStyle.height || 'auto'),
    // Preserve transform during drag (important for centered elements)
    transform: externalStyle.transform || 'none',
    opacity: isDragging && hasMoved.current ? 0.8 : ((isAnyDragging && currentDraggingId !== draggableId) ? 0.5 : (externalStyle.opacity || 1)),
    cursor: isAnimating ? 'not-allowed' : ((isAnyDragging && currentDraggingId !== draggableId) ? 'not-allowed' : (isDragging && hasMoved.current ? 'grabbing' : (isDisabled ? 'not-allowed' : 'grab'))),
    transition: (isDragging && hasMoved.current) ? 'none' : (externalStyle.transition || 'all 0.3s ease'),
    zIndex: (isDragging && hasMoved.current) ? 999999 : (externalStyle.zIndex || 'auto'),
    pointerEvents: isAnimating || isDisabled ? 'none' : ((isAnyDragging && currentDraggingId !== draggableId) ? 'none' : 'auto'),
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none'
  };

  // Handle children - wrap string children in a div for proper styling
  const renderChildren = () => {
    if (typeof children === 'string') {
      return React.createElement('div', {
        style: {
          pointerEvents: 'none',
          userSelect: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, children);
    }
    return children;
  };

  return React.createElement('div', {
    ref: elementRef,
    className: `draggable-component ${isDragging && hasMoved.current ? 'dragging' : ''} ${className}`,
    style: elementStyle,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    'data-draggable-id': draggableId,
    ...props
  }, renderChildren());
});

// Export component
window.DraggableComponent = {
  Draggable
};

console.log('✅ Draggable component loaded successfully');

