/**
 * Reusable Droppable Component
 * 
 * A generic droppable zone component that works with the Draggable component.
 * Provides visual feedback and validation for drag-and-drop interactions.
 * 
 * UX Design Principles:
 * - Clear visual feedback when hovering with valid/invalid draggables
 * - Smooth transitions between states
 * - Configurable acceptance rules for flexible drag-drop logic
 */

// Dependencies: React should be loaded before this file

/**
 * Global Drag-Drop Context
 * Provides coordination between Draggable and Droppable components
 */
if (!window.DragDropContext) {
  window.DragDropContext = {
    currentDraggingId: null,
    currentDragPosition: { x: 0, y: 0 },
    droppables: new Map(), // Map<droppableId, { element, config }>
    
    registerDroppable(droppableId, element, config) {
      this.droppables.set(droppableId, { element, config });
      console.log('📋 [DragDropContext] Registered droppable:', droppableId);
    },
    
    unregisterDroppable(droppableId) {
      this.droppables.delete(droppableId);
      console.log('📋 [DragDropContext] Unregistered droppable:', droppableId);
    },
    
    notifyDragStart(draggableId) {
      this.currentDraggingId = draggableId;
      console.log('🎯 [DragDropContext] Drag started:', draggableId);
      
      // Notify all droppables about drag start
      this.droppables.forEach(({ element, config }, droppableId) => {
        if (element && config.onDragStartGlobal) {
          config.onDragStartGlobal(draggableId);
        }
      });
    },
    
    notifyDragMove(position) {
      this.currentDragPosition = position;
      
      // Check which droppable is being hovered
      let hoveredDroppableId = null;
      this.droppables.forEach(({ element }, droppableId) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (position.x >= rect.left && position.x <= rect.right &&
              position.y >= rect.top && position.y <= rect.bottom) {
            hoveredDroppableId = droppableId;
          }
        }
      });
      
      // Notify droppables about hover state changes
      this.droppables.forEach(({ element, config }, droppableId) => {
        const isHovering = droppableId === hoveredDroppableId;
        if (element && config.onHoverChange) {
          config.onHoverChange(isHovering, this.currentDraggingId);
        }
      });
    },
    
    notifyDragEnd(draggableId, position) {
      // Find which droppable (if any) the draggable was dropped on
      let droppedOnId = null;
      this.droppables.forEach(({ element }, droppableId) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (position.x >= rect.left && position.x <= rect.right &&
              position.y >= rect.top && position.y <= rect.bottom) {
            droppedOnId = droppableId;
          }
        }
      });
      
      console.log('🎯 [DragDropContext] Drag ended:', draggableId, 'on:', droppedOnId);
      
      // Notify the droppable that received the drop
      if (droppedOnId) {
        const droppable = this.droppables.get(droppedOnId);
        if (droppable && droppable.config.onDropAttempt) {
          droppable.config.onDropAttempt(draggableId, position);
        }
      } else if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('dragDropEndedOutside', { detail: { draggableId } }));
      }
      
      // Reset state
      this.currentDraggingId = null;
      this.currentDragPosition = { x: 0, y: 0 };
      
      // Notify all droppables about drag end
      this.droppables.forEach(({ element, config }) => {
        if (element && config.onDragEndGlobal) {
          config.onDragEndGlobal(draggableId);
        }
      });
    }
  };
}

/**
 * Droppable Component
 * A zone that accepts draggable items with validation and visual feedback
 */
const Droppable = React.memo(({
  // Identity
  droppableId,
  children,
  
  // Acceptance rules
  acceptIds = null, // Array of draggableIds this zone accepts (null = accept all)
  acceptValidator = null, // Function(draggableId) => boolean for custom validation
  isDisabled = false,
  
  // Callbacks
  onDragEnter,
  onDragLeave,
  onDrop,
  onDropRejected,
  
  // Visual feedback
  hoverBorderColor = 'rgba(0, 255, 0, 0.6)',
  hoverBackgroundColor = 'rgba(0, 255, 0, 0.1)',
  rejectBorderColor = 'rgba(255, 0, 0, 0.6)',
  rejectBackgroundColor = 'rgba(255, 0, 0, 0.1)',
  
  // Styling
  style: externalStyle = {},
  className = '',
  borderColor = 'rgba(255, 255, 255, 0.3)',
  borderWidth = '2px',
  borderRadius = '12px',
  borderStyle = 'dashed',
  backgroundColor = 'transparent',
  
  // Filter out non-DOM props
  elementZIndex,
  componentType,
  processedStyles,
  position,
  ...props
}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [isValidDrop, setIsValidDrop] = React.useState(false);
  const [currentDraggingId, setCurrentDraggingId] = React.useState(null);
  const elementRef = React.useRef(null);
  const previousHoveringRef = React.useRef(false);
  
  // Validate if a draggable is accepted by this droppable
  const validateDraggable = React.useCallback((draggableId) => {
    if (isDisabled) return false;
    
    // Custom validator takes precedence
    if (acceptValidator) {
      return acceptValidator(draggableId);
    }
    
    // Check acceptIds array
    if (acceptIds && Array.isArray(acceptIds)) {
      return acceptIds.includes(draggableId);
    }
    
    // Accept all if no restrictions
    return true;
  }, [acceptIds, acceptValidator, isDisabled]);
  
  // Handle hover state changes from DragDropContext
  const handleHoverChange = React.useCallback((hovering, draggableId) => {
    setIsHovering(hovering);
    setCurrentDraggingId(draggableId);
    
    if (hovering) {
      const valid = validateDraggable(draggableId);
      setIsValidDrop(valid);
      
      // Call onDragEnter if entering for the first time
      if (!previousHoveringRef.current) {
        if (valid && onDragEnter) {
          onDragEnter(draggableId, droppableId);
        }
      }
      previousHoveringRef.current = true;
    } else {
      // Call onDragLeave if leaving
      if (previousHoveringRef.current && onDragLeave) {
        onDragLeave(draggableId, droppableId);
      }
      previousHoveringRef.current = false;
      setIsValidDrop(false);
    }
  }, [validateDraggable, onDragEnter, onDragLeave, droppableId]);
  
  // Handle drop attempts
  const handleDropAttempt = React.useCallback((draggableId, position) => {
    const valid = validateDraggable(draggableId);
    
    if (valid && onDrop) {
      console.log('✅ [Droppable] Valid drop:', draggableId, 'on', droppableId);
      onDrop(draggableId, droppableId, position);
    } else if (!valid && onDropRejected) {
      console.log('❌ [Droppable] Rejected drop:', draggableId, 'on', droppableId);
      onDropRejected(draggableId, droppableId);
    }
    
    // Reset hover state
    setIsHovering(false);
    setIsValidDrop(false);
    setCurrentDraggingId(null);
    previousHoveringRef.current = false;
  }, [validateDraggable, onDrop, onDropRejected, droppableId]);
  
  // Handle global drag start
  const handleDragStartGlobal = React.useCallback((draggableId) => {
    setCurrentDraggingId(draggableId);
  }, []);
  
  // Handle global drag end
  const handleDragEndGlobal = React.useCallback((draggableId) => {
    setIsHovering(false);
    setIsValidDrop(false);
    setCurrentDraggingId(null);
    previousHoveringRef.current = false;
  }, []);
  
  // Register/unregister with DragDropContext
  React.useEffect(() => {
    if (!droppableId) {
      console.warn('⚠️ [Droppable] No droppableId provided');
      return;
    }
    
    const config = {
      onHoverChange: handleHoverChange,
      onDropAttempt: handleDropAttempt,
      onDragStartGlobal: handleDragStartGlobal,
      onDragEndGlobal: handleDragEndGlobal
    };
    
    window.DragDropContext.registerDroppable(droppableId, elementRef.current, config);
    
    return () => {
      window.DragDropContext.unregisterDroppable(droppableId);
    };
  }, [droppableId, handleHoverChange, handleDropAttempt, handleDragStartGlobal, handleDragEndGlobal]);
  
  // Update element reference when it changes
  React.useEffect(() => {
    if (elementRef.current && droppableId) {
      const droppable = window.DragDropContext.droppables.get(droppableId);
      if (droppable) {
        droppable.element = elementRef.current;
      }
    }
  });
  
  // Determine current visual state
  const getVisualState = () => {
    if (!currentDraggingId) {
      return 'default';
    }
    if (isHovering && isValidDrop) {
      return 'hoverValid';
    }
    if (isHovering && !isValidDrop) {
      return 'hoverInvalid';
    }
    return 'default';
  };
  
  const visualState = getVisualState();
  
  // Build style based on state
  const elementStyle = {
    ...externalStyle,
    borderColor: visualState === 'hoverValid' ? hoverBorderColor :
                 visualState === 'hoverInvalid' ? rejectBorderColor :
                 borderColor,
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    borderStyle: borderStyle,
    backgroundColor: visualState === 'hoverValid' ? hoverBackgroundColor :
                     visualState === 'hoverInvalid' ? rejectBackgroundColor :
                     backgroundColor,
    transition: 'all 200ms ease-out',
    boxSizing: 'border-box',
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'not-allowed' : 'default'
  };
  
  // Render children with appropriate wrapper
  const renderChildren = () => {
    if (typeof children === 'string') {
      return React.createElement('div', {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none'
        }
      }, children);
    }
    return children;
  };
  
  return React.createElement('div', {
    ref: elementRef,
    className: `droppable-component ${visualState} ${isDisabled ? 'disabled' : ''} ${className}`,
    style: elementStyle,
    'data-droppable-id': droppableId,
    'data-accepts-all': acceptIds === null,
    'data-is-disabled': isDisabled,
    ...props
  }, renderChildren());
});

// Export component
window.DroppableComponent = {
  Droppable
};

console.log('✅ Droppable component loaded successfully');
