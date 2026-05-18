/**
 * Sprite Animation Component - React 18 Optimized
 *
 * Reusable frame-by-frame image animation using an array of images.
 * Designed to fit the same setup pattern as `image-stack-component.js`,
 * while remaining a separate component.
 *
 * Uses `anime.min.js` for animated frame transitions.
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions, anime.min.js

const SpriteAnimationComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage = 1,
    coordinates,
    position,
    zIndex = 1000,
    elementZIndex,
    images = [],
    frameDuration = 300,
    autoplay = true,
    loop = true,
    alternate = false,
    initialFrame = 0,
    objectFit = 'contain',
    backgroundColor = 'transparent',
    border = 'none',
    borderRadius = '0',
    style: customStyle = {},
    onFrameChange,
    moveDirection = 'none',
    moveDistance = 0,
    moveDuration = 2000,
    moveLoop = false,
    moveAlternate = false,
    moveEasing = 'linear',
    // Bounce motion props - creatures swim forward and bounce off boundaries
    bounceMotion = false,
    bounceBounds = null, // [x1, y1, x2, y2] grid coordinates for movement bounds
    bounceSpeed = 50, // pixels per second
    bounceSpeedVariation = 20, // random variation in speed
    removeOnClick = false,
    removalGroup = '',
    dispatchOnAllRemoved = false,
    dispatchEventName = 'quizCompleted',
    dispatchEventDetail = {},
    onRemove,
    onSpriteClick,
    disableOnEvent = '',
    disableOnEventFilter = null
  } = props;

  const containerRef = React.useRef(null);
  const motionRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const timeoutRef = React.useRef(null);
  const animeRef = React.useRef(null);
  const movementAnimeRef = React.useRef(null);
  const directionRef = React.useRef(1);

  const normalizedFrames = React.useMemo(() => {
    if (!Array.isArray(images)) return [];

    return images
      .map((item, index) => {
        if (typeof item === 'string') {
          return {
            src: item,
            alt: `frame-${index}`,
            duration: frameDuration,
            opacity: 1,
            scale: 1
          };
        }

        if (item && typeof item === 'object' && item.src) {
          return {
            alt: `frame-${index}`,
            duration: frameDuration,
            opacity: 1,
            scale: 1,
            ...item
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [images, frameDuration]);

  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(() => {
    if (!normalizedFrames.length) return 0;
    return Math.max(0, Math.min(initialFrame, normalizedFrames.length - 1));
  });
  const [isRemoved, setIsRemoved] = React.useState(false);
  const [isInteractionDisabled, setIsInteractionDisabled] = React.useState(false);
  const removalId = id || elementName || `sprite-animation-${currentPage}`;

  React.useEffect(() => {
    directionRef.current = 1;
    setCurrentFrameIndex(
      normalizedFrames.length
        ? Math.max(0, Math.min(initialFrame, normalizedFrames.length - 1))
        : 0
    );
  }, [initialFrame, normalizedFrames.length]);

  React.useEffect(() => {
    const resetAnimation = () => {
      directionRef.current = 1;
      setCurrentFrameIndex(
        normalizedFrames.length
          ? Math.max(0, Math.min(initialFrame, normalizedFrames.length - 1))
          : 0
      );
      setIsRemoved(false);
      setIsInteractionDisabled(false);

      if (removeOnClick && typeof window !== 'undefined' && removalGroup) {
        const group = window.spriteRemovalGroups?.[removalGroup];
        if (group) {
          group.removedIds.delete(removalId);
          group.dispatched = false;
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('questionChanged', resetAnimation);
      return () => window.removeEventListener('questionChanged', resetAnimation);
    }
  }, [initialFrame, normalizedFrames.length, removeOnClick, removalGroup, removalId]);

  const currentFrame = normalizedFrames[currentFrameIndex] || null;

  const doesEventMatchFilter = React.useCallback((detail = {}) => {
    if (!disableOnEventFilter || typeof disableOnEventFilter !== 'object') {
      return true;
    }

    return Object.entries(disableOnEventFilter).every(([key, value]) => detail?.[key] === value);
  }, [disableOnEventFilter]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !disableOnEvent) {
      return undefined;
    }

    const handleDisableEvent = (event) => {
      if (doesEventMatchFilter(event?.detail || {})) {
        setIsInteractionDisabled(true);
      }
    };

    window.addEventListener(disableOnEvent, handleDisableEvent);
    return () => window.removeEventListener(disableOnEvent, handleDisableEvent);
  }, [disableOnEvent, doesEventMatchFilter]);

  const isClickable = !isInteractionDisabled && (removeOnClick || typeof onSpriteClick === 'function');

  const resolvedPosition = React.useMemo(() => {
    if (position?.css) return position;

    if (
      coordinates &&
      typeof gridPositions !== 'undefined' &&
      gridPositions.convertToCSS
    ) {
      return gridPositions.convertToCSS(
        coordinates,
        elementName || id,
        'page',
        'custom'
      );
    }

    return null;
  }, [position, coordinates, elementName, id, currentPage]);

  const processGcProperty = React.useCallback(
    (value, property = 'width') => {
      if (
        typeof value === 'string' &&
        value.includes('gc') &&
        typeof GridCellFontUtils !== 'undefined' &&
        GridCellFontUtils.processGcProperty
      ) {
        return GridCellFontUtils.processGcProperty(value, property);
      }
      return value;
    },
    []
  );

  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: bounceMotion ? 'visible' : 'hidden',
      pointerEvents: isClickable ? 'auto' : 'none',
      cursor: isClickable ? 'pointer' : 'default',
      userSelect: 'none',
      backgroundColor,
      border: processGcProperty(border, 'borderWidth'),
      borderRadius: processGcProperty(borderRadius, 'borderRadius'),
      zIndex: elementZIndex || zIndex,
      ...customStyle
    };

    if (resolvedPosition?.css) {
      Object.assign(baseStyle, resolvedPosition.css);
    }

    return baseStyle;
  }, [
    resolvedPosition,
    backgroundColor,
    border,
    borderRadius,
    processGcProperty,
    elementZIndex,
    zIndex,
    customStyle,
    isClickable,
    bounceMotion
  ]);

  const getNextFrameIndex = React.useCallback(
    (prev) => {
      const len = normalizedFrames.length;
      if (len <= 1) return prev;

      if (alternate) {
        let next = prev + directionRef.current;

        if (next >= len || next < 0) {
          if (!loop) {
            return prev;
          }
          directionRef.current *= -1;
          next = prev + directionRef.current;
        }

        return Math.max(0, Math.min(next, len - 1));
      }

      if (loop) {
        return (prev + 1) % len;
      }

      return Math.min(prev + 1, len - 1);
    },
    [normalizedFrames.length, alternate, loop]
  );

  const getMovementConfig = React.useCallback(() => {
    const distance = Number(moveDistance) || 0;

    if (!distance || moveDirection === 'none') {
      return null;
    }

    switch (moveDirection) {
      case 'bottomToTop':
        return { translateX: [0, 0], translateY: [distance, -distance] };
      case 'topToBottom':
        return { translateX: [0, 0], translateY: [-distance, distance] };
      case 'leftToRight':
        return { translateX: [-distance, distance], translateY: [0, 0] };
      case 'rightToLeft':
        return { translateX: [distance, -distance], translateY: [0, 0] };
      case 'diagonal':
      case 'diagonalBottomLeftToTopRight':
        return { translateX: [-distance, distance], translateY: [distance, -distance] };
      case 'diagonalTopLeftToBottomRight':
        return { translateX: [-distance, distance], translateY: [-distance, distance] };
      case 'diagonalBottomRightToTopLeft':
        return { translateX: [distance, -distance], translateY: [distance, -distance] };
      case 'diagonalTopRightToBottomLeft':
        return { translateX: [distance, -distance], translateY: [-distance, distance] };
      default:
        return null;
    }
  }, [moveDirection, moveDistance]);

  // Bounce motion state - tracks current position and velocity
  const bounceStateRef = React.useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    facingRight: true
  });
  const bounceAnimationRef = React.useRef(null);
  const [facingDirection, setFacingDirection] = React.useState(1); // 1 = right, -1 = left

  // Start bounce motion animation loop
  React.useEffect(() => {
    if (!bounceMotion || !bounceBounds || typeof window === 'undefined') {
      return undefined;
    }
    
    const target = motionRef.current;
    if (!target) return undefined;
    
    const [bx1, by1, bx2, by2] = bounceBounds;
    const [cx1, cy1, cx2, cy2] = coordinates || [0, 0, 100, 100];
    
    // Get grid dimensions
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision]?.cols : 1600;
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision]?.rows : 900;
    
    // Calculate sprite dimensions in grid units
    const spriteWidth = cx2 - cx1;
    const spriteHeight = cy2 - cy1;
    
    // Calculate how far the sprite can move from its starting position
    // minX: how far left it can go (from start position to left bound)
    // maxX: how far right it can go (from start position to right bound minus sprite width)
    const minX = bx1 - cx1; // negative value = can move left
    const maxX = bx2 - cx2; // positive value = can move right
    const minY = by1 - cy1; // negative value = can move up
    const maxY = by2 - cy2; // positive value = can move down
    
    // Convert grid units to pixels for movement
    const pxPerGridX = window.innerWidth / gridCols;
    const pxPerGridY = window.innerHeight / gridRows;
    
    const minXPx = minX * pxPerGridX;
    const maxXPx = maxX * pxPerGridX;
    const minYPx = minY * pxPerGridY;
    const maxYPx = maxY * pxPerGridY;
    
    // Calculate actual speed with variation (in pixels per second)
    const actualSpeed = bounceSpeed + (Math.random() - 0.5) * 2 * bounceSpeedVariation;
    
    // Random initial direction (angle between -30 and 30 degrees for mostly horizontal movement)
    const angle = (Math.random() - 0.5) * Math.PI / 3;
    const shouldStartForward = removalGroup === 'page2-sea-fish';
    const direction = shouldStartForward ? 1 : (Math.random() > 0.5 ? 1 : -1);
    
    const initialVx = Math.cos(angle) * actualSpeed * direction;
    const initialVy = Math.sin(angle) * actualSpeed;
    
    // Initialize state with a random starting offset within bounds
    const startX = minXPx + Math.random() * (maxXPx - minXPx);
    const startY = minYPx + Math.random() * (maxYPx - minYPx);
    
    bounceStateRef.current = {
      x: startX,
      y: startY,
      vx: initialVx,
      vy: initialVy,
      facingRight: initialVx >= 0
    };
    
    // Update facing direction for sprite flip
    setFacingDirection(initialVx >= 0 ? 1 : -1);
    
    // Apply initial position
    target.style.transform = `translate(${startX}px, ${startY}px)`;
    
    let lastTime = performance.now();
    let animationId = null;
    
    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap at 100ms to prevent huge jumps
      lastTime = currentTime;
      
      const state = bounceStateRef.current;
      
      // Update position
      let newX = state.x + state.vx * deltaTime;
      let newY = state.y + state.vy * deltaTime;
      let newVx = state.vx;
      let newVy = state.vy;
      let horizontalBounce = false;
      
      // Bounce off horizontal boundaries
      if (newX <= minXPx) {
        newX = minXPx;
        newVx = Math.abs(newVx); // Bounce right
        horizontalBounce = true;
      } else if (newX >= maxXPx) {
        newX = maxXPx;
        newVx = -Math.abs(newVx); // Bounce left
        horizontalBounce = true;
      }
      
      // Bounce off vertical boundaries
      if (newY <= minYPx) {
        newY = minYPx;
        newVy = Math.abs(newVy); // Bounce down
      } else if (newY >= maxYPx) {
        newY = maxYPx;
        newVy = -Math.abs(newVy); // Bounce up
      }
      
      // Add slight random variation to direction on horizontal bounce for more natural movement
      if (horizontalBounce) {
        const angleVariation = (Math.random() - 0.5) * 0.4; // Small angle change
        const currentAngle = Math.atan2(newVy, newVx);
        const newAngle = currentAngle + angleVariation;
        const currentSpeed = Math.sqrt(newVx * newVx + newVy * newVy);
        newVx = Math.cos(newAngle) * currentSpeed;
        newVy = Math.sin(newAngle) * currentSpeed;

        // Keep horizontal velocity consistent with the bounce side after angle variation.
        if (newX <= minXPx) {
          newVx = Math.abs(newVx);
        } else if (newX >= maxXPx) {
          newVx = -Math.abs(newVx);
        }
        
        // Update facing direction when horizontal direction changes
        const newFacingRight = newVx >= 0;
        if (newFacingRight !== state.facingRight) {
          setFacingDirection(newFacingRight ? 1 : -1);
        }
        state.facingRight = newFacingRight;
      }
      
      // Update state
      state.x = newX;
      state.y = newY;
      state.vx = newVx;
      state.vy = newVy;

      // Keep sprite facing aligned with actual horizontal movement direction.
      const movingRight = newVx >= 0;
      if (movingRight !== state.facingRight) {
        state.facingRight = movingRight;
        setFacingDirection(movingRight ? 1 : -1);
      }
      
      // Apply transform
      target.style.transform = `translate(${newX}px, ${newY}px)`;
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Start with a small random delay so sprites don't all start at once
    const startDelay = Math.random() * 500;
    const timeoutId = setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }, startDelay);
    
    bounceAnimationRef.current = animationId;
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (target) {
        target.style.transform = 'translate(0px, 0px)';
      }
    };
  }, [bounceMotion, bounceBounds, coordinates, bounceSpeed, bounceSpeedVariation, removalGroup]);

  React.useEffect(() => {
    if (!removeOnClick || !removalGroup || typeof window === 'undefined') {
      return undefined;
    }

    window.spriteRemovalGroups = window.spriteRemovalGroups || {};
    const groups = window.spriteRemovalGroups;
    const group = groups[removalGroup] || {
      allIds: new Set(),
      removedIds: new Set(),
      dispatched: false
    };

    groups[removalGroup] = group;
    group.allIds.add(removalId);

    return () => {
      group.allIds.delete(removalId);
      group.removedIds.delete(removalId);

      if (group.allIds.size === 0) {
        delete groups[removalGroup];
      } else {
        group.dispatched = false;
      }
    };
  }, [removeOnClick, removalGroup, removalId]);

  const handleSpriteClick = React.useCallback((event) => {
    if (isRemoved || isInteractionDisabled) {
      return;
    }

    let didRemove = false;
    let isAllRemoved = false;
    let group = null;

    if (removeOnClick) {
      setIsRemoved(true);
      didRemove = true;

      if (typeof window !== 'undefined' && removalGroup) {
        window.spriteRemovalGroups = window.spriteRemovalGroups || {};
        const groups = window.spriteRemovalGroups;
        group = groups[removalGroup] || {
          allIds: new Set(),
          removedIds: new Set(),
          dispatched: false
        };

        groups[removalGroup] = group;
        group.allIds.add(removalId);
        group.removedIds.add(removalId);

        isAllRemoved = group.allIds.size > 0 && group.removedIds.size >= group.allIds.size;
      }
    }

    if (typeof onSpriteClick === 'function') {
      onSpriteClick({
        event,
        id,
        elementName,
        currentPage,
        removalGroup,
        removed: didRemove,
        isAllRemoved
      });
    }

    if (didRemove && typeof onRemove === 'function') {
      onRemove({ id, elementName, currentPage, removalGroup, isAllRemoved });
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('spriteInteraction', {
        detail: {
          id,
          elementName,
          currentPage,
          removalGroup,
          removed: didRemove,
          isAllRemoved
        }
      }));
    }

    if (
      didRemove &&
      group &&
      dispatchOnAllRemoved &&
      !group.dispatched &&
      isAllRemoved &&
      typeof window !== 'undefined'
    ) {
      group.dispatched = true;
      window.dispatchEvent(new CustomEvent(dispatchEventName, {
        detail: {
          removalGroup,
          pageNumber: currentPage,
          ...dispatchEventDetail
        }
      }));
    }
  }, [
    isRemoved,
    isInteractionDisabled,
    removeOnClick,
    onSpriteClick,
    onRemove,
    id,
    elementName,
    currentPage,
    removalGroup,
    removalId,
    dispatchOnAllRemoved,
    dispatchEventName,
    dispatchEventDetail
  ]);

  React.useEffect(() => {
    if (typeof onFrameChange === 'function' && currentFrame) {
      onFrameChange(currentFrameIndex, currentFrame);
    }
  }, [currentFrameIndex, currentFrame, onFrameChange]);

  React.useEffect(() => {
    // Skip linear motion if bounce motion is enabled
    if (bounceMotion && bounceBounds) {
      return undefined;
    }
    
    const target = motionRef.current;
    const animeLib = typeof window !== 'undefined' ? window.anime : null;
    const movement = getMovementConfig();

    if (movementAnimeRef.current && typeof movementAnimeRef.current.pause === 'function') {
      movementAnimeRef.current.pause();
      movementAnimeRef.current = null;
    }

    if (target) {
      target.style.transform = 'translate(0px, 0px)';
    }

    if (!target || !animeLib || !movement) {
      return undefined;
    }

    movementAnimeRef.current = animeLib({
      targets: target,
      translateX: movement.translateX,
      translateY: movement.translateY,
      easing: moveEasing,
      duration: Math.max(100, Number(moveDuration) || 2000),
      loop: moveLoop,
      direction: moveAlternate ? 'alternate' : 'normal',
      autoplay: true
    });

    return () => {
      if (movementAnimeRef.current && typeof movementAnimeRef.current.pause === 'function') {
        movementAnimeRef.current.pause();
        movementAnimeRef.current = null;
      }
      if (target) {
        target.style.transform = 'translate(0px, 0px)';
      }
    };
  }, [getMovementConfig, moveDuration, moveLoop, moveAlternate, moveEasing, bounceMotion, bounceBounds]);

  React.useEffect(() => {
    if (!currentFrame || !imgRef.current) return;

    const animeLib = typeof window !== 'undefined' ? window.anime : null;
    const duration = Number(currentFrame.duration) > 0
      ? Number(currentFrame.duration)
      : frameDuration;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (animeRef.current && typeof animeRef.current.pause === 'function') {
      animeRef.current.pause();
    }

    if (!autoplay || normalizedFrames.length <= 1) {
      if (imgRef.current) {
        imgRef.current.style.opacity = String(currentFrame.opacity ?? 1);
        imgRef.current.style.transform = `scale(${currentFrame.scale ?? 1})`;
      }
      return;
    }

    if (animeLib && imgRef.current) {
      animeRef.current = animeLib({
        targets: imgRef.current,
        opacity: [currentFrame.opacity ?? 1, currentFrame.opacity ?? 1],
        scale: [currentFrame.scale ?? 1, currentFrame.scale ?? 1],
        easing: 'linear',
        duration: Math.max(60, Math.floor(duration * 0.15)),
        complete: () => {
          timeoutRef.current = window.setTimeout(() => {
            setCurrentFrameIndex((prev) => getNextFrameIndex(prev));
          }, Math.max(0, duration - Math.max(60, Math.floor(duration * 0.15))));
        }
      });
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setCurrentFrameIndex((prev) => getNextFrameIndex(prev));
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (animeRef.current && typeof animeRef.current.pause === 'function') {
        animeRef.current.pause();
      }
    };
  }, [currentFrame, currentFrameIndex, autoplay, normalizedFrames.length, frameDuration, getNextFrameIndex]);

  if (!currentFrame || isRemoved) {
    return null;
  }

  return React.createElement('div', {
    ref: containerRef,
    id: id || `${elementName || 'sprite-animation'}-${currentPage}`,
    className: 'sprite-animation-container',
    style: containerStyle,
    onClick: handleSpriteClick,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-component-type': 'sprite-animation',
    'data-move-direction': moveDirection,
    'data-removable': removeOnClick ? 'true' : 'false'
  },
    React.createElement('div', {
      ref: motionRef,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(0px, 0px)'
      }
    },
      React.createElement('div', {
        style: {
          width: '100%',
          height: '100%',
          transform: bounceMotion && facingDirection === -1 ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: 'center center'
        }
      },
        React.createElement('img', {
          ref: imgRef,
          src: currentFrame.src,
          alt: currentFrame.alt || 'sprite-frame',
          draggable: false,
          style: {
            width: '100%',
            height: '100%',
            objectFit,
            pointerEvents: isClickable ? 'auto' : 'none',
            cursor: isClickable ? 'pointer' : 'default',
            opacity: currentFrame.opacity ?? 1,
            transform: `scale(${currentFrame.scale ?? 1})`,
            transition: 'none'
          }
        })
      )
    )
  );
});

const SpriteAnimationElement = {
  spriteAnimation: {
    type: 'sprite-animation',
    coordinates: [0, 0, 100, 100],
    zIndex: 1000,
    props: {
      images: [],
      frameDuration: 300,
      autoplay: true,
      loop: true,
      moveDirection: 'none',
      moveDistance: 0,
      moveDuration: 2000,
      moveLoop: false,
      moveAlternate: false
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('spriteAnimation', (props) => {
      return React.createElement(SpriteAnimationComponent, props);
    })
  }
};

if (typeof window !== 'undefined') {
  window.SpriteAnimationComponent = {
    SpriteAnimationComponent,
    SpriteAnimationElement
  };

  console.log('✅ SpriteAnimationComponent loaded');
}
