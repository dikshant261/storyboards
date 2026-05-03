/**
 * Reusable Draggable Component
 * 
 * A generic draggable component that can be used for click-and-drag functionality.
 * Based on the DraggableImage pattern from drag-drop-component.js
 * 
 * UX Design Principles:
 * - Dragged item morphs toward its future state (smaller, flatter)
 * - Drop moment should feel boring (minimal animation)
 * - Smooth transitions for non-dragging items
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
  imageSrc, // When set, render an image as content (for config-driven Draggable)
  imageAlt = '',
  style: externalStyle = {},
  className = '',
  dragThreshold = 5, // Minimum pixels to move before starting drag
  dragScale, // Optional scale when dragging (e.g. 1.2 for pulse)
  blinkOnEvent, // Optional { eventName: string, durationMs: number } - blink when event fires
  pulseOnEvent, // Optional { eventName: string, durationMs?: number } - pulse (scale 1->1.2->1) when event fires, e.g. after incorrect drop
  disableOnEvent, // Optional { eventName: string, pageNumber?: number } - when event fires (and detail.pageNumber matches), set disabled
  elementZIndex, // Filter out - not a DOM prop
  componentType, // Filter out - not a DOM prop
  processedStyles, // Filter out - not a DOM prop
  spawnCount, // Filter out - used by ElementRenderer for multi-instance spawn, not for DOM
  ...props
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isBlinking, setIsBlinking] = React.useState(false);
  const [isPulsing, setIsPulsing] = React.useState(false);
  const [disabledByEvent, setDisabledByEvent] = React.useState(false);
  const [dragPosition, setDragPosition] = React.useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = React.useState({ width: 0, height: 0 });
  const elementRef = React.useRef(null);
  const dragStartOffset = React.useRef({ x: 0, y: 0 });
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const hasMoved = React.useRef(false);
  // Use ref to track isDragging so it's always current in callbacks (avoids stale closures)
  const isDraggingRef = React.useRef(false);
  // Track if we need to call onDragEnd when component unmounts or drag stops
  const pendingDragEndRef = React.useRef(false);
  // Track if event listeners should stay attached (even if isDragging becomes false)
  const shouldKeepListenersRef = React.useRef(false);
  // Track if listeners are currently attached to prevent duplicate additions
  const listenersAttachedRef = React.useRef(false);
  // Use a unique ID to track this specific drag session
  const dragSessionIdRef = React.useRef(null);
  // Track if onDragEnd has already been called for this session (prevent duplicate calls)
  const dragEndCalledRef = React.useRef(false);

  const effectiveDisabled = isDisabled || disabledByEvent;

  const handleMouseDown = React.useCallback((e) => {
    console.log('🖱️ [Draggable] handleMouseDown called:', {
      draggableId,
      isDisabled: effectiveDisabled,
      isAnimating,
      isAnyDragging,
      currentDraggingId,
      canDrag: !effectiveDisabled && !isAnimating && (!isAnyDragging || currentDraggingId === draggableId)
    });
    
    // Prevent dragging if disabled, animating, or if another element is being dragged
    if (effectiveDisabled || isAnimating || (isAnyDragging && currentDraggingId !== draggableId)) {
      console.log('🚫 [Draggable] Drag prevented:', { isDisabled: effectiveDisabled, isAnimating, isAnyDragging, currentDraggingId });
      return;
    }
    
    e.preventDefault();
    console.log('✅ [Draggable] Starting drag preparation');
    const rect = elementRef.current.getBoundingClientRect();
    
    // Store original size
    setOriginalSize({ width: rect.width, height: rect.height });
    
    // Store where inside the element the user clicked
    dragStartOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
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
    // Generate unique session ID for this drag
    dragSessionIdRef.current = `${draggableId}-${Date.now()}-${Math.random()}`;
    // Reset dragEndCalled flag for new session
    dragEndCalledRef.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
    onDragStart?.(draggableId, { x: e.clientX, y: e.clientY });
    
    // Notify DragDropContext if available
    if (window.DragDropContext) {
      window.DragDropContext.notifyDragStart(draggableId);
    }
    
    console.log('🎯 [Draggable] Drag session started (mouse):', { dragSessionId: dragSessionIdRef.current });
  }, [draggableId, onDragStart, isAnimating, effectiveDisabled, isAnyDragging, currentDraggingId]);

  const handleMouseMove = React.useCallback((e) => {
    // Use ref to check drag state - avoids stale closure issues during re-renders
    // The drag should only stop when the user releases (mouseup)
    if (!isDraggingRef.current && !hasMoved.current) {
      return;
    }
    
    // Check if we've moved enough to start dragging
    const distance = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.current.x, 2) + 
      Math.pow(e.clientY - dragStartPos.current.y, 2)
    );
    
    if (distance < dragThreshold && !hasMoved.current) {
      console.log('📏 [Draggable] Distance below threshold:', { distance, dragThreshold });
      return; // Don't start dragging until threshold is met
    }
    
    if (!hasMoved.current) {
      console.log('🎯 [Draggable] Threshold exceeded, starting drag:', { distance, dragThreshold });
    }
    hasMoved.current = true;
    
    // Calculate new position based on mouse movement
    setDragPosition({
      x: e.clientX - dragStartOffset.current.x,
      y: e.clientY - dragStartOffset.current.y
    });

    // Call onDragMove if provided
    onDragMove?.(draggableId, { x: e.clientX, y: e.clientY });
    
    // Notify DragDropContext if available
    if (window.DragDropContext) {
      window.DragDropContext.notifyDragMove({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, draggableId, onDragMove, dragThreshold, effectiveDisabled, isAnyDragging, currentDraggingId]);

  const handleMouseUp = React.useCallback((e) => {
    console.log('🖱️ [Draggable] handleMouseUp called:', {
      draggableId,
      isDragging,
      hasMoved: hasMoved.current,
      shouldCallDragEnd: shouldCallDragEndRef.current
    });
    
    const wasMoved = hasMoved.current;
    const wasDragging = isDragging;
    
    // CRITICAL: Only call onDragEnd ONCE per drag session, and ONLY if user actually released
    if ((wasMoved || wasDragging) && !dragEndCalledRef.current) {
      console.log('✅ [Draggable] Calling onDragEnd (mouseup) - FIRST TIME ONLY');
      
      // Mark as called IMMEDIATELY to prevent any duplicate calls
      dragEndCalledRef.current = true;
      
      isDraggingRef.current = false;
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    hasMoved.current = false;
      shouldCallDragEndRef.current = false;
      pendingDragEndRef.current = false;
      shouldKeepListenersRef.current = false; // Allow cleanup to remove listeners
      listenersAttachedRef.current = false; // Mark listeners as removed
      
      console.log('📞 [Draggable] Actually calling onDragEnd now');
    onDragEnd?.(draggableId, { x: e.clientX, y: e.clientY });
      
      // Notify DragDropContext if available
      if (window.DragDropContext) {
        window.DragDropContext.notifyDragEnd(draggableId, { x: e.clientX, y: e.clientY });
      }
      
      console.log('✅ [Draggable] onDragEnd called (mouseup)');
    } else {
      console.log('⚠️ [Draggable] NOT calling onDragEnd:', {
        wasDragging,
        wasMoved,
        dragEndAlreadyCalled: dragEndCalledRef.current
      });
    }
  }, [isDragging, draggableId, onDragEnd]);

  // Touch event handlers for mobile support
  const handleTouchStart = React.useCallback((e) => {
    console.log('👆 [Draggable] handleTouchStart called:', {
      draggableId,
      isDisabled: effectiveDisabled,
      isAnimating,
      isAnyDragging,
      currentDraggingId,
      canDrag: !effectiveDisabled && !isAnimating && (!isAnyDragging || currentDraggingId === draggableId),
      touchCount: e.touches.length,
      cancelable: e.cancelable,
      defaultPrevented: e.defaultPrevented
    });
    
    // Prevent dragging if disabled, animating, or if another element is being dragged
    if (effectiveDisabled || isAnimating || (isAnyDragging && currentDraggingId !== draggableId)) {
      console.log('🚫 [Draggable] Touch drag prevented:', { isDisabled: effectiveDisabled, isAnimating, isAnyDragging, currentDraggingId });
      return;
    }
    
    // CRITICAL: Prevent default to stop browser from treating this as a scroll
    // Only if cancelable (React's synthetic events may be passive)
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🛑 [Draggable] preventDefault and stopPropagation called on touchstart (cancelable=true)');
    } else {
      console.log('⚠️ [Draggable] touchstart event not cancelable (passive listener), cannot preventDefault');
    }
    
    const touch = e.touches[0];
    console.log('✅ [Draggable] Starting touch drag preparation:', {
      touchX: touch.clientX,
      touchY: touch.clientY
    });
    const rect = elementRef.current.getBoundingClientRect();
    
    // Store original size
    setOriginalSize({ width: rect.width, height: rect.height });
    
    // Store where inside the element the user touched
    dragStartOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
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
    // Generate unique session ID for this drag
    dragSessionIdRef.current = `${draggableId}-${Date.now()}-${Math.random()}`;
    // Reset dragEndCalled flag for new session
    dragEndCalledRef.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
    onDragStart?.(draggableId, { x: touch.clientX, y: touch.clientY });
    
    // Notify DragDropContext if available
    if (window.DragDropContext) {
      window.DragDropContext.notifyDragStart(draggableId);
    }
    
    console.log('🎯 [Draggable] Drag session started:', { dragSessionId: dragSessionIdRef.current });
  }, [draggableId, onDragStart, isAnimating, effectiveDisabled, isAnyDragging, currentDraggingId]);

  const handleTouchMove = React.useCallback((e) => {
    console.log('👆 [Draggable] handleTouchMove called:', {
      draggableId,
      isDragging: isDraggingRef.current,
      hasMoved: hasMoved.current,
      touchCount: e.touches.length,
      cancelable: e.cancelable
    });
    
    // Use ref to check drag state - avoids stale closure issues during re-renders
    // Once we've moved, always continue processing (even if isDraggingRef is temporarily false during re-render)
    if (!hasMoved.current && !isDraggingRef.current) {
      console.log('⚠️ [Draggable] handleTouchMove: not dragging and hasn\'t moved, returning');
      return;
    }
    
    // If we've moved, ensure isDraggingRef is set (in case it got reset during re-render)
    if (hasMoved.current && !isDraggingRef.current) {
      console.log('⚠️ [Draggable] handleTouchMove: hasMoved but isDraggingRef is false, restoring drag state');
      isDraggingRef.current = true;
    }
    
    // NOTE: We intentionally do NOT check isDisabled here during an active drag.
    // The drag should only stop when the user releases (touchend/mouseup).
    // Checking isDisabled here would cause the drag to stop prematurely when
    // the visual order updates and React re-renders with temporarily wrong props.
    
    // CRITICAL: Prevent default to stop browser scrolling
    // Must be done even if cancelable is false (browser may ignore but we try)
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
      console.log('✅ [Draggable] preventDefault and stopPropagation called in handleTouchMove (cancelable=true)');
    } else {
      console.log('⚠️ [Draggable] Event not cancelable, but trying preventDefault anyway');
    e.preventDefault();
      e.stopPropagation();
    }
    
    const touch = e.touches[0];
    
    // Check if we've moved enough to start dragging
    const distance = Math.sqrt(
      Math.pow(touch.clientX - dragStartPos.current.x, 2) + 
      Math.pow(touch.clientY - dragStartPos.current.y, 2)
    );
    
    if (distance < dragThreshold && !hasMoved.current) {
      console.log('📏 [Draggable] Touch distance below threshold:', { distance, dragThreshold });
      return; // Don't start dragging until threshold is met
    }
    
    if (!hasMoved.current) {
      console.log('🎯 [Draggable] Touch threshold exceeded, starting drag:', { distance, dragThreshold });
    }
    hasMoved.current = true;
    
    setDragPosition({
      x: touch.clientX - dragStartOffset.current.x,
      y: touch.clientY - dragStartOffset.current.y
    });
    
    // Notify DragDropContext if available
    if (window.DragDropContext) {
      window.DragDropContext.notifyDragMove({ x: touch.clientX, y: touch.clientY });
    }
    
    onDragMove?.(draggableId, { x: touch.clientX, y: touch.clientY });
  }, [isDragging, draggableId, onDragMove, dragThreshold, effectiveDisabled, isAnyDragging, currentDraggingId]);

  const handleTouchEnd = React.useCallback((e) => {
    console.log('👆 [Draggable] handleTouchEnd called:', {
      draggableId,
      isDragging,
      hasMoved: hasMoved.current,
      type: e.type,
      touches: e.touches?.length || 0,
      changedTouches: e.changedTouches?.length || 0,
      timestamp: Date.now()
    });
    
    const wasMoved = hasMoved.current;
    const wasDragging = isDragging;
    
    if (!e.changedTouches || e.changedTouches.length === 0) {
      console.error('❌ [Draggable] No changedTouches in touchend event!');
      return;
    }
    
    const touch = e.changedTouches[0];
    console.log('👆 [Draggable] Touch end details:', {
      touchX: touch.clientX,
      touchY: touch.clientY,
      wasMoved,
      wasDragging,
      onDragEndExists: !!onDragEnd
    });
    
    // CRITICAL: Only call onDragEnd ONCE per drag session, and ONLY if user actually released
    // When touchend fires on document, it means the touch ended
    // Check if there are any remaining touches on the document
    // Note: document.touches might not be available in all browsers
    const documentTouches = (typeof document !== 'undefined' && document.touches) ? document.touches.length : null;
    const eventTouches = e.touches?.length || 0;
    
    // If touchend fires and:
    // 1. We have changedTouches (the touch that ended)
    // 2. document.touches is 0 (if available) OR document.touches is not available (trust the event)
    // 3. event.touches is 0 (no touches remaining on this event)
    const hasEndedTouch = e.changedTouches && e.changedTouches.length > 0;
    const fingerActuallyReleased = hasEndedTouch && 
                                   (documentTouches === null || documentTouches === 0) && 
                                   eventTouches === 0;
    
    console.log('🔍 [Draggable] Touch end validation:', {
      documentTouches,
      eventTouches,
      hasEndedTouch,
      fingerActuallyReleased,
      changedTouchesLength: e.changedTouches?.length || 0,
      wasMoved,
      wasDragging,
      dragEndAlreadyCalled: dragEndCalledRef.current
    });
    
    if ((wasMoved || wasDragging) && !dragEndCalledRef.current && fingerActuallyReleased) {
      console.log('✅ [Draggable] Calling onDragEnd (touch) - USER RELEASED');
      
      // Mark as called IMMEDIATELY to prevent any duplicate calls
      dragEndCalledRef.current = true;
      
      isDraggingRef.current = false;
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    hasMoved.current = false;
      pendingDragEndRef.current = false;
      shouldKeepListenersRef.current = false; // Allow cleanup to remove listeners
      listenersAttachedRef.current = false; // Mark listeners as removed
      dragSessionIdRef.current = null; // Clear session ID
      
      console.log('📞 [Draggable] Actually calling onDragEnd now (touch):', {
        draggableId,
        position: { x: touch.clientX, y: touch.clientY },
        onDragEndType: typeof onDragEnd
      });
      
      onDragEnd?.(draggableId, { x: touch.clientX, y: touch.clientY });
      
      // Notify DragDropContext if available
      if (window.DragDropContext) {
        window.DragDropContext.notifyDragEnd(draggableId, { x: touch.clientX, y: touch.clientY });
      }
    } else {
      console.log('⚠️ [Draggable] NOT calling onDragEnd - finger still on screen or already called:', {
        wasDragging,
        wasMoved,
        dragEndAlreadyCalled: dragEndCalledRef.current,
        fingerActuallyReleased,
        documentTouches,
        elementTouches: e.touches?.length || 0,
        changedTouchesLength: e.changedTouches?.length || 0
      });
    }
  }, [isDragging, draggableId, onDragEnd]);

  // Store stable references to handlers for event listeners
  const handlersRef = React.useRef({
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd
  });
  
  // Store current wrapper functions so cleanup can access them
  const currentWrappersRef = React.useRef({
    handleMouseMoveWrapper: null,
    handleMouseUpWrapper: null,
    handleTouchMoveWrapper: null,
    handleTouchEndWrapper: null,
    handleTouchCancelWrapper: null
  });
  
  // Update handlers ref when they change
  React.useEffect(() => {
    handlersRef.current = {
      handleMouseMove,
      handleMouseUp,
      handleTouchMove,
      handleTouchEnd
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
  
  // Create wrapper functions that always call the latest handlers from ref
  // These are stable and don't need to be recreated - they always use the latest handlers via ref
  const handleMouseMoveWrapper = React.useCallback((e) => {
    handlersRef.current.handleMouseMove(e);
  }, []);
  
  const handleMouseUpWrapper = React.useCallback((e) => {
    handlersRef.current.handleMouseUp(e);
  }, []);
  
  const handleTouchMoveWrapper = React.useCallback((e) => {
    // Always use the latest handler from ref - this ensures it works even after re-renders
    const handler = handlersRef.current?.handleTouchMove;
    if (handler) {
      handler(e);
    } else {
      console.error('❌ [Draggable] handleTouchMove not found in handlersRef!', {
        draggableId,
        handlersRefKeys: handlersRef.current ? Object.keys(handlersRef.current) : 'null',
        touchCount: e.touches?.length || 0
      });
    }
  }, []);
  
  const handleTouchEndWrapper = React.useCallback((e) => {
    console.log('👆 [Draggable] handleTouchEndWrapper called:', {
      draggableId,
      type: e.type,
      touches: e.touches?.length || 0,
      changedTouches: e.changedTouches?.length || 0,
      hasMoved: hasMoved.current,
      isDragging: isDragging,
      handlersRefExists: !!handlersRef.current,
      handleTouchEndExists: !!handlersRef.current?.handleTouchEnd,
      timestamp: Date.now(),
      eventPhase: e.eventPhase,
      bubbles: e.bubbles,
      cancelable: e.cancelable
    });
    
    if (!handlersRef.current || !handlersRef.current.handleTouchEnd) {
      console.error('❌ [Draggable] handlersRef or handleTouchEnd is missing!');
      return;
    }
    
    try {
      handlersRef.current.handleTouchEnd(e);
      console.log('✅ [Draggable] handleTouchEnd called successfully');
    } catch (error) {
      console.error('❌ [Draggable] Error calling handleTouchEnd:', error);
    }
  }, [draggableId, isDragging]);
  
  // Also handle touchcancel events (touch might be canceled)
  const handleTouchCancelWrapper = React.useCallback((e) => {
    console.log('🚫 [Draggable] handleTouchCancelWrapper called:', {
      draggableId,
      type: e.type,
      touches: e.touches?.length || 0,
      changedTouches: e.changedTouches?.length || 0,
      hasMoved: hasMoved.current,
      isDragging: isDraggingRef.current,
      timestamp: Date.now(),
      reason: e.cancelable ? 'cancelable' : 'not cancelable'
    });
    
    // If we've moved, the browser canceled the touch - this is likely due to DOM changes
    // Don't treat it as a drop - try to keep the drag going if possible
    if (hasMoved.current) {
      console.log('⚠️ [Draggable] Touch canceled during active drag - browser likely canceled due to DOM changes');
      // Don't call handleTouchEnd - let the user continue dragging if they're still touching
      // The touch might resume if the user continues moving
      return;
    }
    
    // Only treat touchcancel as touchend if we haven't moved yet
    if (handlersRef.current && handlersRef.current.handleTouchEnd) {
      try {
        handlersRef.current.handleTouchEnd(e);
        console.log('✅ [Draggable] handleTouchEnd called from touchcancel (no movement)');
      } catch (error) {
        console.error('❌ [Draggable] Error calling handleTouchEnd from touchcancel:', error);
      }
    }
  }, [draggableId]);

  // Global mouse and touch listeners
  // CRITICAL: Use document instead of window, and attach listeners in a way that survives re-renders
  // The root cause: React re-renders create new component instances, causing cleanup to run
  // before touchend fires. We need listeners that persist across component lifecycle.
  React.useEffect(() => {
    // If we've moved, we MUST keep listeners attached until drop happens
    const hasMovedValue = hasMoved.current;
    const shouldAttachListeners = isDragging || shouldKeepListenersRef.current || hasMovedValue;
    const currentSessionId = dragSessionIdRef.current;
    
    // Update wrappers ref
    const oldWrappers = currentWrappersRef.current;
    currentWrappersRef.current = {
      handleMouseMoveWrapper,
      handleMouseUpWrapper,
      handleTouchMoveWrapper,
      handleTouchEndWrapper,
      handleTouchCancelWrapper
    };
    
    if (shouldAttachListeners) {
      // If listeners are already attached, we need to update them with new wrappers
      // (this can happen during re-renders when wrappers are recreated)
      if (listenersAttachedRef.current && oldWrappers.handleTouchMoveWrapper) {
        console.log('🔄 [Draggable] Re-attaching event listeners with new wrappers:', draggableId);
        // Remove old listeners first
        document.removeEventListener('mousemove', oldWrappers.handleMouseMoveWrapper, true);
        document.removeEventListener('mouseup', oldWrappers.handleMouseUpWrapper, true);
        document.removeEventListener('touchmove', oldWrappers.handleTouchMoveWrapper, true);
        document.removeEventListener('touchend', oldWrappers.handleTouchEndWrapper, true);
        document.removeEventListener('touchcancel', oldWrappers.handleTouchCancelWrapper, true);
      }
      
      console.log('👂 [Draggable] Adding event listeners for:', draggableId, {
        isDragging,
        shouldKeepListeners: shouldKeepListenersRef.current,
        hasMoved: hasMovedValue,
        dragSessionId: currentSessionId,
        componentInstance: 'new',
        reattaching: listenersAttachedRef.current
      });
      pendingDragEndRef.current = true;
      listenersAttachedRef.current = true;
      
      // Use wrapper functions that always call the latest handlers
      console.log('📌 [Draggable] Attaching event listeners to document:', {
        draggableId,
        dragSessionId: currentSessionId,
        hasMouseMove: !!handleMouseMoveWrapper,
        hasMouseUp: !!handleMouseUpWrapper,
        hasTouchMove: !!handleTouchMoveWrapper,
        hasTouchEnd: !!handleTouchEndWrapper
      });
      
      // Use document instead of window for better event capture
      // Use capture phase to catch events before they bubble
      // CRITICAL: Use non-passive listeners to allow preventDefault
      document.addEventListener('mousemove', handleMouseMoveWrapper, true);
      document.addEventListener('mouseup', handleMouseUpWrapper, true);
      document.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false, capture: true });
      document.addEventListener('touchend', handleTouchEndWrapper, { passive: false, capture: true }); // Changed to non-passive!
      document.addEventListener('touchcancel', handleTouchCancelWrapper, { passive: false, capture: true }); // Changed to non-passive!
      
      // Only use document-level handlers - no window or element-level handlers
      // This prevents conflicts and ensures consistent behavior
      
      console.log('✅ [Draggable] Event listeners attached to document (capture phase):', {
        mousemove: true,
        mouseup: true,
        touchmove: true,
        touchend: true,
        touchcancel: true,
        dragSessionId: currentSessionId
      });
      
      return () => {
        // Check refs at cleanup time (they may have changed)
        const shouldKeep = shouldKeepListenersRef.current || hasMoved.current;
        const sessionStillActive = dragSessionIdRef.current === currentSessionId;
        
        console.log('🧹 [Draggable] Cleanup running:', {
          draggableId,
          currentSessionId,
          activeSessionId: dragSessionIdRef.current,
          sessionStillActive,
          shouldKeep,
          hasMoved: hasMoved.current,
          shouldKeepListeners: shouldKeepListenersRef.current,
          componentInstance: 'cleanup'
        });
        
        if (!shouldKeep || !sessionStillActive) {
          console.log('🧹 [Draggable] Removing event listeners for:', draggableId, {
            pendingDragEnd: pendingDragEndRef.current,
            hasMoved: hasMoved.current,
            shouldKeepListeners: shouldKeepListenersRef.current,
            sessionStillActive
          });
          listenersAttachedRef.current = false;
          document.removeEventListener('mousemove', handleMouseMoveWrapper, true);
          document.removeEventListener('mouseup', handleMouseUpWrapper, true);
          document.removeEventListener('touchmove', handleTouchMoveWrapper, true);
          document.removeEventListener('touchend', handleTouchEndWrapper, true);
          document.removeEventListener('touchcancel', handleTouchCancelWrapper, true);
        } else {
          console.log('🔒 [Draggable] Keeping listeners attached in cleanup, waiting for drop', {
            hasMoved: hasMoved.current,
            shouldKeepListeners: shouldKeepListenersRef.current,
            sessionStillActive,
            dragSessionId: currentSessionId
          });
        }
      };
    } else if (!shouldAttachListeners && listenersAttachedRef.current) {
      // Force remove if we shouldn't attach and they're still attached
      const shouldKeep = shouldKeepListenersRef.current || hasMoved.current;
      if (!shouldKeep) {
        console.log('🧹 [Draggable] Force removing listeners (shouldAttachListeners=false):', draggableId);
        document.removeEventListener('mousemove', handleMouseMoveWrapper, true);
        document.removeEventListener('mouseup', handleMouseUpWrapper, true);
        document.removeEventListener('touchmove', handleTouchMoveWrapper, true);
        document.removeEventListener('touchend', handleTouchEndWrapper, true);
        document.removeEventListener('touchcancel', handleTouchCancelWrapper, true);
        window.removeEventListener('mousemove', handleMouseMoveWrapper);
        window.removeEventListener('mouseup', handleMouseUpWrapper);
        window.removeEventListener('touchmove', handleTouchMoveWrapper);
        window.removeEventListener('touchend', handleTouchEndWrapper);
        window.removeEventListener('touchcancel', handleTouchCancelWrapper);
        listenersAttachedRef.current = false;
        pendingDragEndRef.current = false;
      }
    } else if (!shouldAttachListeners) {
      pendingDragEndRef.current = false;
    }
  }, [isDragging, draggableId]);
  // NOTE: We intentionally do NOT include wrapper functions in dependencies.
  // The wrappers are stable and use handlersRef.current which always points to the latest handlers.
  // Including them would cause unnecessary re-runs of this effect during re-renders.
  
  // Track if we need to call onDragEnd when stopping
  const shouldCallDragEndRef = React.useRef(false);
  
  // NOTE: We intentionally do NOT stop dragging when isDisabled changes.
  // During a drag operation, React re-renders may temporarily change props,
  // but the drag should only stop when the user actually releases (touchend/mouseup).
  // The event listeners (touchend/mouseup) will handle the drop correctly.

  // Subscribe to blinkOnEvent and set isBlinking for durationMs
  React.useEffect(() => {
    if (!blinkOnEvent || !blinkOnEvent.eventName || !blinkOnEvent.durationMs) return;
    const h = (e) => {
      const durationMs = (e.detail && e.detail.durationMs) || blinkOnEvent.durationMs;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), durationMs);
    };
    window.addEventListener(blinkOnEvent.eventName, h);
    return () => window.removeEventListener(blinkOnEvent.eventName, h);
  }, [blinkOnEvent?.eventName, blinkOnEvent?.durationMs]);

  // Subscribe to pulseOnEvent and run at-rest pulse animation (scale 1 -> 1.2 -> 1) for durationMs
  React.useEffect(() => {
    if (!pulseOnEvent || !pulseOnEvent.eventName) return;
    const durationMs = pulseOnEvent.durationMs != null ? pulseOnEvent.durationMs : 600;
    const h = () => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), durationMs);
    };
    window.addEventListener(pulseOnEvent.eventName, h);
    return () => window.removeEventListener(pulseOnEvent.eventName, h);
  }, [pulseOnEvent?.eventName, pulseOnEvent?.durationMs]);

  // Subscribe to disableOnEvent: when event fires (and detail.pageNumber matches if set), make non-draggable
  React.useEffect(() => {
    if (!disableOnEvent || !disableOnEvent.eventName) return;
    const pageNumber = disableOnEvent.pageNumber;
    const h = (e) => {
      const detailPage = e.detail && e.detail.pageNumber;
      if (pageNumber == null || detailPage === pageNumber) {
        setDisabledByEvent(true);
      }
    };
    window.addEventListener(disableOnEvent.eventName, h);
    return () => window.removeEventListener(disableOnEvent.eventName, h);
  }, [disableOnEvent?.eventName, disableOnEvent?.pageNumber]);

  // Determine if this item is being dragged and has moved
  const isActivelyDragging = isDragging && hasMoved.current;
  const isOtherDragging = isAnyDragging && currentDraggingId !== draggableId;

  const scaleTransform = (isActivelyDragging && dragScale != null) ? `scale(${Number(dragScale)})` : null;
  const usePulseAnimation = isActivelyDragging && dragScale != null;

  const elementStyle = {
    ...externalStyle,
    // When dragging, use fixed position for smooth movement
    position: isActivelyDragging ? 'fixed' : (externalStyle.position || 'relative'),
    left: isActivelyDragging ? `${dragPosition.x}px` : (externalStyle.left || 'auto'),
    top: isActivelyDragging ? `${dragPosition.y}px` : (externalStyle.top || 'auto'),
    width: isActivelyDragging ? `${originalSize.width}px` : (externalStyle.width || 'auto'),
    height: isActivelyDragging ? `${originalSize.height}px` : (externalStyle.height || 'auto'),
    ...(usePulseAnimation ? {
      animation: 'draggable-pulse 0.2s ease-out 1 forwards',
      transformOrigin: 'center center',
      '--drag-scale': String(Number(dragScale))
    } : isPulsing && pulseOnEvent ? {
      animation: 'draggable-pulse-at-rest 0.5s ease-in-out 1',
      transformOrigin: 'center center',
      '--drag-scale': String(Number(dragScale) || 1.2)
    } : scaleTransform ? { transform: externalStyle.transform ? `${externalStyle.transform} ${scaleTransform}` : scaleTransform } : {}),
    // Blink animation when isBlinking (optionally with pulse scale via blinkOnEvent.pulseScale)
    ...(isBlinking ? (blinkOnEvent && blinkOnEvent.pulseScale != null ? {
      animation: 'draggable-blink-pulse 0.25s ease-in-out 4',
      transformOrigin: 'center center',
      '--blink-pulse-scale': String(Number(blinkOnEvent.pulseScale))
    } : {
      animation: 'draggable-blink 0.25s ease-in-out 4'
    }) : {}),
    // Dragged item: slightly transparent, non-dragged items during drag: more faded
    opacity: isActivelyDragging ? 0.95 : (isOtherDragging ? 0.6 : (externalStyle.opacity != null ? externalStyle.opacity : (isBlinking ? undefined : 1))),
    // Cursor states
    cursor: isAnimating ? 'not-allowed' : (isOtherDragging ? 'not-allowed' : (isActivelyDragging ? 'grabbing' : (effectiveDisabled ? 'not-allowed' : 'grab'))),
    // No transition during drag for smooth movement, smooth transition otherwise
    transition: isActivelyDragging ? 'none' : (externalStyle.transition || 'all 150ms ease-out'),
    // High z-index when dragging
    zIndex: isActivelyDragging ? 999999 : (externalStyle.zIndex || 'auto'),
    // Disable pointer events for non-active items during drag
    pointerEvents: isAnimating || effectiveDisabled ? 'none' : (isOtherDragging ? 'none' : 'auto'),
    // Prevent text selection
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    // CRITICAL: Prevent browser from handling touch as scroll/pan
    touchAction: 'none',
    WebkitTouchAction: 'none'
  };

  // Handle children - imageSrc, string, or custom children
  const renderChildren = () => {
    if (imageSrc) {
      return React.createElement('img', {
        src: imageSrc,
        alt: imageAlt,
        draggable: false,
        style: {
          pointerEvents: 'none',
          userSelect: 'none',
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }
      });
    }
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

  // Attach touchstart directly to DOM element (non-passive) to allow preventDefault
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Use non-passive listener so we can call preventDefault
    const touchStartHandler = (e) => {
      // Call the React handler
      handleTouchStart(e);
    };
    
    element.addEventListener('touchstart', touchStartHandler, { passive: false });
    
    return () => {
      element.removeEventListener('touchstart', touchStartHandler);
    };
  }, [handleTouchStart]);

  const blinkKeyframes = blinkOnEvent ? React.createElement('style', {
    key: 'draggable-blink-keyframes',
    dangerouslySetInnerHTML: {
      __html: '@keyframes draggable-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }' +
        (blinkOnEvent.pulseScale != null ? ' @keyframes draggable-blink-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(var(--blink-pulse-scale, 1.2))} }' : '')
    }
  }) : null;

  const pulseKeyframes = dragScale != null ? React.createElement('style', {
    key: 'draggable-pulse-keyframes',
    dangerouslySetInnerHTML: { __html: '@keyframes draggable-pulse { 0%{transform:scale(1)} 100%{transform:scale(var(--drag-scale, 1.2))} }' }
  }) : null;

  const pulseAtRestKeyframes = pulseOnEvent ? React.createElement('style', {
    key: 'draggable-pulse-at-rest-keyframes',
    dangerouslySetInnerHTML: { __html: '@keyframes draggable-pulse-at-rest { 0%{transform:scale(1)} 50%{transform:scale(var(--drag-scale, 1.2))} 100%{transform:scale(1)} }' }
  }) : null;

  const styleFragments = [pulseKeyframes, pulseAtRestKeyframes, blinkKeyframes].filter(Boolean);
  const wrapper = React.createElement('div', {
    key: 'draggable-wrapper',
    ref: elementRef,
    className: `draggable-component ${isActivelyDragging ? 'dragging drag-item-dragging' : ''} ${isBlinking ? 'draggable-blinking' : ''} ${className}`,
    style: elementStyle,
    onMouseDown: handleMouseDown,
    // Don't use React's onTouchStart - we attach it directly to DOM for non-passive
    'data-draggable-id': draggableId,
    ...props
  }, renderChildren());

  return styleFragments.length > 0
    ? React.createElement(React.Fragment, null, [...styleFragments, wrapper])
    : wrapper;
});

// Export component
window.DraggableComponent = {
  Draggable
};

console.log('✅ Draggable component loaded successfully');
