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
 *   - blinkDuration: string - Blink speed (default: "0.55s")
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
 * @param {boolean} props.rowLayout - If true, place each image in an equal-width horizontal slot (no overlap). Ignores per-layer offsetX for positioning.
 * @param {number|null|undefined} props.rowSlotCount - With rowLayout: number of columns to reserve (e.g. 10). Slot size is 100/rowSlotCount%; images use the first N slots. If omitted, uses images.length.
 * @param {string|null|undefined} props.glowOnQuizIncorrectQuizId - When set, all layers gain glow after an incorrect option click on this quizId; cleared on correct click or quizCompleted for that quiz.
 * @param {string|null|undefined} props.showSlotCountsOnCorrectQuizId - With rowLayout: show 1..N on each slot after a correct click on this quizId; if triangleRowId is set, only when the click matches that row.
 * @param {string|null|undefined} props.greenGlowOnCorrectQuizId - Green glow on correct for this quizId; cleared on incorrect. If triangleRowId is set, only the matching row glows (supports multiple correct rows per quiz).
 * @param {boolean} [props.greenGlowOnCorrectStatic] - If true with greenGlowOnCorrectQuizId, use a steady green drop-shadow (no pulsating animation).
 * @param {string|null|undefined} props.wrongOptionRowRevealQuizId - With triangleRowId: on incorrect option matching this row, red glow + slot counts like correct; clears on any later option click for this quiz.
 * @param {string|null|undefined} props.wrongRowBorderQuizId - With triangleRowId: react to wrong option matching this row (e.g. wrongAnswerMotionLayout).
 * @param {string|null|undefined} props.triangleRowId - Row id (e.g. hideSeek, marbles) matching optionData.triangleRowId from quiz.
 * @param {{ topRowY1: number, bottomRowY1: number }|null|undefined} props.wrongAnswerMotionLayout - Grid y1 of top and bottom triangle rows; triggers 8s motion on wrong match: full-opacity triangles stay put while a 65% opacity copy (higher z-index) moves to top, bottom, then home.
 * @param {string|null|undefined} props.dimAfterAnyQuizOptionClickQuizId - After any option click on this quizId (correct or incorrect), dim this stack (opacity + grayscale) until page change.
 * @param {string|null|undefined} props.strikeLeadingSlotsAfterQuizClickQuizId - After any option click on this quizId, draw a strike through the first N row slots (rowLayout).
 * @param {number} [props.strikeLeadingSlotsCount] - How many leading slots to strike (default 3).
 * @param {Function} props.onLayerPropChange - General callback (layerIndex, propertyName, value)
 */
const WRONG_ANSWER_MOTION_MS = 9000;
const WRONG_ANSWER_GHOST_OPACITY = 0.65;

// Global store for ImageStack visual states (persisted across page navigations)
if (typeof window !== 'undefined' && !window.imageStackVisualStateStore) {
  window.imageStackVisualStateStore = {};
}

const ImageStackComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    zIndex = 1000,
    elementZIndex, // Accept elementZIndex from parent if provided
    rowLayout = false,
    rowSlotCount = null,
    glowOnQuizIncorrectQuizId = null,
    showSlotCountsOnCorrectQuizId = null,
    greenGlowOnCorrectQuizId = null,
    greenGlowOnCorrectStatic = false,
    wrongOptionRowRevealQuizId = null,
    wrongRowBorderQuizId = null,
    triangleRowId = null,
    wrongAnswerMotionLayout = null,
    dimAfterAnyQuizOptionClickQuizId = null,
    strikeLeadingSlotsAfterQuizClickQuizId = null,
    strikeLeadingSlotsCount = 3,
    images = [],
    containerBorder, // Border for the container div
    containerBorderRadius, // Border radius for the container div
    onBlinkChange,
    onGlowChange,
    onHiddenChange,
    onOpacityChange,
    onLayerPropChange
  } = props;

  // Generate a unique key for this component's visual state
  const visualStateKey = React.useMemo(() => {
    // Use a combination of quiz IDs and triangleRowId to create a unique key
    const parts = [];
    if (showSlotCountsOnCorrectQuizId) parts.push(`slot:${showSlotCountsOnCorrectQuizId}`);
    if (greenGlowOnCorrectQuizId) parts.push(`glow:${greenGlowOnCorrectQuizId}`);
    if (dimAfterAnyQuizOptionClickQuizId) parts.push(`dim:${dimAfterAnyQuizOptionClickQuizId}`);
    if (strikeLeadingSlotsAfterQuizClickQuizId) parts.push(`strike:${strikeLeadingSlotsAfterQuizClickQuizId}`);
    if (triangleRowId) parts.push(`row:${triangleRowId}`);
    if (id) parts.push(`id:${id}`);
    return parts.join('|') || `imagestack-${id || elementName || 'unknown'}`;
  }, [showSlotCountsOnCorrectQuizId, greenGlowOnCorrectQuizId, dimAfterAnyQuizOptionClickQuizId, strikeLeadingSlotsAfterQuizClickQuizId, triangleRowId, id, elementName]);

  // Helper to get saved visual state
  const getSavedVisualState = React.useCallback(() => {
    if (typeof window === 'undefined' || !window.imageStackVisualStateStore) return null;
    return window.imageStackVisualStateStore[visualStateKey] || null;
  }, [visualStateKey]);

  // Helper to save visual state
  const saveVisualState = React.useCallback((updates) => {
    if (typeof window === 'undefined') return;
    if (!window.imageStackVisualStateStore) {
      window.imageStackVisualStateStore = {};
    }
    const current = window.imageStackVisualStateStore[visualStateKey] || {};
    const newState = { ...current, ...updates };
    window.imageStackVisualStateStore[visualStateKey] = newState;
    console.log('💾 [ImageStack] Saved visual state:', { visualStateKey, updates, newState });
  }, [visualStateKey]);

  // Initialize states from saved state on mount
  const savedState = getSavedVisualState();

  // Debug logging for state restoration
  React.useEffect(() => {
    console.log('🔷 [ImageStack] Component mounted/updated:', {
      id,
      visualStateKey,
      showSlotCountsOnCorrectQuizId,
      triangleRowId,
      savedState: window.imageStackVisualStateStore?.[visualStateKey],
      allSavedKeys: Object.keys(window.imageStackVisualStateStore || {})
    });
  }, [id, visualStateKey, showSlotCountsOnCorrectQuizId, triangleRowId]);

  const [quizIncorrectGlow, setQuizIncorrectGlow] = React.useState(savedState?.quizIncorrectGlow || false);

  React.useEffect(() => {
    if (!glowOnQuizIncorrectQuizId || typeof window === 'undefined') {
      return undefined;
    }
    const targetId = glowOnQuizIncorrectQuizId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== targetId) return;
      if (d.isCorrect === true) {
        setQuizIncorrectGlow(false);
      } else {
        setQuizIncorrectGlow(true);
      }
    };
    const onQuizCompleted = (e) => {
      const d = e.detail || {};
      if (d.quizId !== targetId) return;
      setQuizIncorrectGlow(false);
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    window.addEventListener('quizCompleted', onQuizCompleted);
    return () => {
      window.removeEventListener('quizOptionClicked', onQuizOption);
      window.removeEventListener('quizCompleted', onQuizCompleted);
    };
  }, [glowOnQuizIncorrectQuizId]);

  // Save quizIncorrectGlow state when it changes
  React.useEffect(() => {
    saveVisualState({ quizIncorrectGlow });
  }, [quizIncorrectGlow, saveVisualState]);

  const [quizCorrectSlotCountsVisible, setQuizCorrectSlotCountsVisible] = React.useState(savedState?.quizCorrectSlotCountsVisible || false);

  React.useEffect(() => {
    if (!showSlotCountsOnCorrectQuizId || typeof window === 'undefined') {
      return undefined;
    }
    const targetId = showSlotCountsOnCorrectQuizId;
    const rowId = triangleRowId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== targetId || d.isCorrect !== true) return;
      if (rowId != null && rowId !== '' && d.triangleRowId !== rowId) return;
      setQuizCorrectSlotCountsVisible(true);
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [showSlotCountsOnCorrectQuizId, triangleRowId]);

  // Save quizCorrectSlotCountsVisible state when it changes
  React.useEffect(() => {
    saveVisualState({ quizCorrectSlotCountsVisible });
  }, [quizCorrectSlotCountsVisible, saveVisualState]);

  const [quizCorrectGreenGlow, setQuizCorrectGreenGlow] = React.useState(savedState?.quizCorrectGreenGlow || false);

  React.useEffect(() => {
    if (!greenGlowOnCorrectQuizId || typeof window === 'undefined') {
      return undefined;
    }
    const targetId = greenGlowOnCorrectQuizId;
    const rowId = triangleRowId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== targetId) return;
      if (d.isCorrect === true) {
        if (rowId == null || rowId === '' || d.triangleRowId === rowId) {
          setQuizCorrectGreenGlow(true);
        }
      } else {
        setQuizCorrectGreenGlow(false);
      }
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [greenGlowOnCorrectQuizId, triangleRowId]);

  // Save quizCorrectGreenGlow state when it changes
  React.useEffect(() => {
    saveVisualState({ quizCorrectGreenGlow });
  }, [quizCorrectGreenGlow, saveVisualState]);

  const [dimAfterQuizClick, setDimAfterQuizClick] = React.useState(savedState?.dimAfterQuizClick || false);

  React.useEffect(() => {
    if (!dimAfterAnyQuizOptionClickQuizId || typeof window === 'undefined') {
      return undefined;
    }
    const qid = dimAfterAnyQuizOptionClickQuizId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== qid) return;
      setDimAfterQuizClick(true);
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [dimAfterAnyQuizOptionClickQuizId]);

  // Save dimAfterQuizClick state when it changes
  React.useEffect(() => {
    saveVisualState({ dimAfterQuizClick });
  }, [dimAfterQuizClick, saveVisualState]);

  const [strikeLeadingSlotsActive, setStrikeLeadingSlotsActive] = React.useState(savedState?.strikeLeadingSlotsActive || false);

  React.useEffect(() => {
    if (!strikeLeadingSlotsAfterQuizClickQuizId || typeof window === 'undefined') {
      return undefined;
    }
    const qid = strikeLeadingSlotsAfterQuizClickQuizId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== qid) return;
      setStrikeLeadingSlotsActive(true);
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [strikeLeadingSlotsAfterQuizClickQuizId]);

  // Save strikeLeadingSlotsActive state when it changes
  React.useEffect(() => {
    saveVisualState({ strikeLeadingSlotsActive });
  }, [strikeLeadingSlotsActive, saveVisualState]);

  const [wrongOptionRowRevealActive, setWrongOptionRowRevealActive] = React.useState(savedState?.wrongOptionRowRevealActive || false);

  React.useEffect(() => {
    if (!wrongOptionRowRevealQuizId || !triangleRowId || typeof window === 'undefined') {
      return undefined;
    }
    const qid = wrongOptionRowRevealQuizId;
    const rowId = triangleRowId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== qid) return;
      if (d.isCorrect === true) {
        setWrongOptionRowRevealActive(false);
        return;
      }
      if (d.triangleRowId === rowId) {
        setWrongOptionRowRevealActive(true);
      } else {
        setWrongOptionRowRevealActive(false);
      }
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [wrongOptionRowRevealQuizId, triangleRowId]);

  // Save wrongOptionRowRevealActive state when it changes
  React.useEffect(() => {
    saveVisualState({ wrongOptionRowRevealActive });
  }, [wrongOptionRowRevealActive, saveVisualState]);

  const [wrongTriangleRowActive, setWrongTriangleRowActive] = React.useState(false);

  React.useEffect(() => {
    if (!wrongRowBorderQuizId || !triangleRowId || typeof window === 'undefined') {
      return undefined;
    }
    const qid = wrongRowBorderQuizId;
    const rowId = triangleRowId;
    const onQuizOption = (e) => {
      const d = e.detail || {};
      if (d.quizId !== qid) return;
      if (d.isCorrect === true) {
        setWrongTriangleRowActive(false);
        return;
      }
      if (d.triangleRowId === rowId) {
        setWrongTriangleRowActive(true);
      } else {
        setWrongTriangleRowActive(false);
      }
    };
    window.addEventListener('quizOptionClicked', onQuizOption);
    return () => window.removeEventListener('quizOptionClicked', onQuizOption);
  }, [wrongRowBorderQuizId, triangleRowId]);

  const [wrongAnswerMotionPlaying, setWrongAnswerMotionPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!wrongTriangleRowActive || !wrongAnswerMotionLayout || typeof window === 'undefined') {
      setWrongAnswerMotionPlaying(false);
      return undefined;
    }
    setWrongAnswerMotionPlaying(true);
    const t = window.setTimeout(() => setWrongAnswerMotionPlaying(false), WRONG_ANSWER_MOTION_MS);
    return () => window.clearTimeout(t);
  }, [wrongTriangleRowActive, wrongAnswerMotionLayout]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !wrongRowBorderQuizId) {
      return undefined;
    }
    window.dispatchEvent(
      new CustomEvent('quizOptionsInteractionLock', {
        detail: {
          quizId: wrongRowBorderQuizId,
          locked: wrongAnswerMotionPlaying
        }
      })
    );
  }, [wrongAnswerMotionPlaying, wrongRowBorderQuizId]);

  const wrongAnswerMotionVars = React.useMemo(() => {
    if (!wrongAnswerMotionLayout || !coordinates || coordinates.length < 2) {
      return { '--stack-motion-dy-top': '0px', '--stack-motion-dy-bottom': '0px' };
    }
    const rows =
      typeof GridPrecisionConfig !== 'undefined' &&
      GridPrecisionConfig.precisionSettings &&
      GridPrecisionConfig.currentPrecision
        ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows
        : 900;
    const y1 = coordinates[1];
    let h = 900;
    if (typeof window !== 'undefined') {
      const main = document.querySelector('.main-container');
      h = main ? main.getBoundingClientRect().height : window.innerHeight;
    }
    const pxPerRow = h / rows;
    const dyTop = (wrongAnswerMotionLayout.topRowY1 - y1) * pxPerRow;
    const dyBottom = (wrongAnswerMotionLayout.bottomRowY1 - y1) * pxPerRow;
    return {
      '--stack-motion-dy-top': `${dyTop}px`,
      '--stack-motion-dy-bottom': `${dyBottom}px`
    };
  }, [wrongAnswerMotionLayout, coordinates, wrongAnswerMotionPlaying]);

  // If the wrong row is already at the "top" target, dyTop ≈ 0px.
  // In that case, the default keyframes appear to "wait" ~33% of the timeline.
  const wrongAnswerMotionSkipTop = React.useMemo(() => {
    const rawTop = wrongAnswerMotionVars['--stack-motion-dy-top'];
    if (!rawTop || typeof rawTop !== 'string') return false;
    const n = Number.parseFloat(rawTop);
    if (!Number.isFinite(n)) return false;
    return Math.abs(n) < 0.5;
  }, [wrongAnswerMotionVars]);

  // Same element name is reused across pages (ElementRenderer key).
  // When page changes, restore persisted visual state for this stack (counts/strike/dim/highlights),
  // but always reset transient motion-related state.
  React.useEffect(() => {
    const s = getSavedVisualState() || {};

    setQuizIncorrectGlow(!!s.quizIncorrectGlow);
    setQuizCorrectSlotCountsVisible(!!s.quizCorrectSlotCountsVisible);
    setQuizCorrectGreenGlow(!!s.quizCorrectGreenGlow);
    setWrongOptionRowRevealActive(!!s.wrongOptionRowRevealActive);
    setDimAfterQuizClick(!!s.dimAfterQuizClick);
    setStrikeLeadingSlotsActive(!!s.strikeLeadingSlotsActive);

    // Always transient
    setWrongTriangleRowActive(false);
    setWrongAnswerMotionPlaying(false);
  }, [currentPage, getSavedVisualState]);

  // Get position from gridPositions if coordinates are provided
  const position = React.useMemo(() => {
    if (coordinates && typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
      // Use convertToCSS to create position from coordinates
      return gridPositions.convertToCSS(coordinates, elementName || id, 'page', 'custom');
    }
    return null;
  }, [coordinates, elementName, id, currentPage]);

  // Process GC units for styling
  const processGcProperty = React.useCallback((value) => {
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      return GridCellFontUtils.processGcProperty(value, position?.coordinates || coordinates || [0, 0, 100, 100]);
    }
    return value;
  }, [position, coordinates]);

  // Build container style (positioned absolutely at coordinates)
  const containerStyle = React.useMemo(() => {
    const baseZ =
      wrongAnswerMotionPlaying && wrongAnswerMotionLayout
        ? Math.max(typeof zIndex === 'number' ? zIndex : 1000, 12000)
        : zIndex;
    const baseStyle = {
      position: 'absolute',
      display: 'block',
      pointerEvents: 'none', // Container doesn't block clicks
      zIndex: baseZ,
      overflow: 'visible' // Allow images to overflow the container
    };

    // Apply position if available
    if (position?.css) {
      Object.assign(baseStyle, position.css);
    }

    // Apply container border if provided
    if (containerBorder) {
      const processedContainerBorder = processGcProperty(containerBorder);
      if (processedContainerBorder !== 'none') {
        baseStyle.border = processedContainerBorder;
      }
    }

    // Apply container border radius if provided
    if (containerBorderRadius) {
      const processedContainerBorderRadius = processGcProperty(containerBorderRadius);
      if (processedContainerBorderRadius !== '0') {
        baseStyle.borderRadius = processedContainerBorderRadius;
      }
    }

    if (dimAfterQuizClick) {
      baseStyle.opacity = 0.22;
      baseStyle.filter = 'grayscale(0.88) brightness(0.72) contrast(0.92)';
      baseStyle.transition = 'opacity 0.35s ease, filter 0.35s ease';
    }

    return baseStyle;
  }, [
    position,
    zIndex,
    containerBorder,
    containerBorderRadius,
    processGcProperty,
    wrongAnswerMotionPlaying,
    wrongAnswerMotionLayout,
    dimAfterQuizClick
  ]);

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
  const renderImageLayer = React.useCallback((imageData, layerIndex, options = {}) => {
    const ghostDuplicate = options.ghostDuplicate === true;
    const {
      src,
      blink = false,
      glow = false,
      hidden = false,
      opacity = 1.0,
      blinkDuration = '0.55s',
      glowDuration = '2s',
      offsetX = '0',
      offsetY = '0',
      scale = 1.0,
      transitionDuration = '0.3s',
      border = 'none',
      borderRadius = '0',
      objectFit = 'contain', // Allow per-layer objectFit override
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

    // Build animation classes (ghost duplicate is static / low-opacity only)
    const animationClasses = [];
    if (!ghostDuplicate && blink) {
      animationClasses.push('image-stack-blink');
    }
    if (!ghostDuplicate && quizCorrectGreenGlow) {
      animationClasses.push(
        greenGlowOnCorrectStatic ? 'image-stack-glow-green-correct-static' : 'image-stack-glow-green-correct'
      );
    } else if (!ghostDuplicate && wrongOptionRowRevealActive && rowLayout) {
      animationClasses.push('image-stack-glow-red-row');
    } else {
      const layerGlow = ghostDuplicate ? false : glow || quizIncorrectGlow;
      if (layerGlow) {
        animationClasses.push('image-stack-glow');
      }
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
    } else if (rowLayout && images.length > 0) {
      const colCount =
        typeof rowSlotCount === 'number' && rowSlotCount > 0
          ? rowSlotCount
          : images.length;
      const slotPct = 100 / colCount;
      const topVal = typeof offsetY === 'number' ? `${offsetY}px` : offsetY;
      layerPositionStyle = {
        position: 'absolute',
        top: topVal,
        left: `${slotPct * layerIndex}%`,
        width: `${slotPct}%`,
        height: '100%',
        boxSizing: 'border-box'
      };
    } else {
      // Use container-relative positioning with offsets (layers share full box; offsets stack/overlap)
      layerPositionStyle = {
        position: 'absolute',
        top: offsetY,
        left: offsetX,
        width: '100%',
        height: '100%'
      };
    }

    const hasLayerCoords =
      layerCoordinates && Array.isArray(layerCoordinates) && layerCoordinates.length === 4;
    const strikeN =
      typeof strikeLeadingSlotsCount === 'number' && strikeLeadingSlotsCount > 0
        ? strikeLeadingSlotsCount
        : 3;
    const showStrikeOnLayer =
      strikeLeadingSlotsActive &&
      rowLayout &&
      images.length > 0 &&
      !hasLayerCoords &&
      !ghostDuplicate &&
      layerIndex < strikeN;

    // Correct + strike: no numbers on struck slots; only on remaining triangles (1..R). Wrong-row reveal: all slots numbered as before.
    const hideCorrectCountOnStruckSlot =
      quizCorrectSlotCountsVisible &&
      strikeLeadingSlotsActive &&
      layerIndex < strikeN;
    const showCountLabel =
      wrongOptionRowRevealActive ||
      (quizCorrectSlotCountsVisible && !hideCorrectCountOnStruckSlot);
    const slotCountText =
      quizCorrectSlotCountsVisible &&
      strikeLeadingSlotsActive &&
      layerIndex >= strikeN
        ? String(layerIndex - strikeN + 1)
        : String(layerIndex + 1);

    const useRowSlotWrapper =
      rowLayout && images.length > 0 && !hasLayerCoords && !ghostDuplicate &&
      (showStrikeOnLayer || showCountLabel);

    // Add animation durations as CSS variables
    const animationStyle = {
      '--blink-duration': blinkDuration,
      '--glow-duration': glowDuration
    };

    // Build class name
    const finalClassName = ['image-stack-layer', ...animationClasses, className]
      .filter(Boolean)
      .join(' ') || undefined;

    const layerZ = (elementZIndex || zIndex || 1000) + layerIndex;
    const effectiveOpacity = ghostDuplicate ? WRONG_ANSWER_GHOST_OPACITY : opacity;

    if (useRowSlotWrapper) {
      const processedSlotCountFontSize =
        typeof window !== 'undefined' &&
        window.GridCellFontUtils &&
        typeof window.GridCellFontUtils.processGcProperty === 'function'
          ? window.GridCellFontUtils.processGcProperty('28gc', 'fontSize')
          : '28px';

      const wrapperStyle = {
        ...layerPositionStyle,
        zIndex: layerZ,
        boxSizing: 'border-box',
        pointerEvents: 'none'
      };
      const imgStyle = {
        width: '100%',
        height: '100%',
        display: 'block',
        opacity: showStrikeOnLayer ? effectiveOpacity * 0.5 : effectiveOpacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        transition: `opacity ${transitionDuration}, transform ${transitionDuration}`,
        border: processedBorder !== 'none' ? processedBorder : 'none',
        borderRadius: processedBorderRadius !== '0' ? processedBorderRadius : '0',
        pointerEvents: onClick ? 'auto' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        objectFit,
        boxSizing: 'border-box',
        ...animationStyle
      };
      const countLabelStyle = {
        position: 'absolute',
        left: 0,
        top: '8%',
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: processedSlotCountFontSize,
        fontWeight: '700',
        color: '#000000',
        lineHeight: 1,
        pointerEvents: 'none',
        zIndex: 2,
        fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif'
      };

      const wrapChildren = [
        React.createElement('img', {
          key: 'img',
          id: ghostDuplicate ? `${elementName}-layer-${layerId}-ghost` : `${elementName}-layer-${layerId}`,
          src,
          className: finalClassName,
          style: imgStyle,
          alt: `Layer ${layerId}`,
          onClick: ghostDuplicate || !onClick ? undefined : handleLayerClick(layerIndex, onClick),
          draggable: false,
          'data-layer-id': layerId,
          'data-layer-index': layerIndex,
          'data-element-name': elementName,
          'data-page': currentPage
        })
      ];
      if (showCountLabel) {
        wrapChildren.push(
          React.createElement(
            'span',
            {
              key: 'count',
              className: 'image-stack-slot-count',
              style: countLabelStyle,
              'aria-hidden': true
            },
            slotCountText
          )
        );
      }
      if (showStrikeOnLayer) {
        wrapChildren.push(
          React.createElement('div', {
            key: 'strike',
            className: 'image-stack-slot-strike',
            'aria-hidden': true
          })
        );
      }

      return React.createElement(
        'div',
        {
          key: ghostDuplicate ? `layer-${layerId}-ghost` : `layer-${layerId}`,
          id: ghostDuplicate ? `${elementName}-layer-wrap-${layerId}-ghost` : `${elementName}-layer-wrap-${layerId}`,
          className: 'image-stack-slot-wrap',
          style: wrapperStyle,
          'data-element-name': elementName,
          'data-page': currentPage
        },
        wrapChildren
      );
    }

    const layerStyle = {
      ...layerPositionStyle,
      opacity: effectiveOpacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      transition: `opacity ${transitionDuration}, transform ${transitionDuration}`,
      border: processedBorder !== 'none' ? processedBorder : 'none',
      borderRadius: processedBorderRadius !== '0' ? processedBorderRadius : '0',
      pointerEvents: onClick ? 'auto' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      zIndex: layerZ,
      objectFit: objectFit,
      boxSizing: 'border-box'
    };

    const finalStyle = { ...layerStyle, ...animationStyle };

    return React.createElement('img', {
      key: ghostDuplicate ? `layer-${layerId}-ghost` : `layer-${layerId}`,
      id: ghostDuplicate ? `${elementName}-layer-${layerId}-ghost` : `${elementName}-layer-${layerId}`,
      src: src,
      className: finalClassName,
      style: finalStyle,
      alt: `Layer ${layerId}`,
      onClick: ghostDuplicate || !onClick ? undefined : handleLayerClick(layerIndex, onClick),
      draggable: false,
      'data-layer-id': layerId,
      'data-layer-index': layerIndex,
      'data-element-name': elementName,
      'data-page': currentPage
    });
  }, [
    elementName,
    currentPage,
    handleLayerClick,
    processGcProperty,
    elementZIndex,
    zIndex,
    rowLayout,
    rowSlotCount,
    images.length,
    quizIncorrectGlow,
    quizCorrectSlotCountsVisible,
    quizCorrectGreenGlow,
    wrongOptionRowRevealActive,
    greenGlowOnCorrectStatic,
    strikeLeadingSlotsActive,
    strikeLeadingSlotsCount
  ]);

  // Render all image layers
  // Separate layers with layerCoordinates (absolute positioning) from container-relative layers
  const { absoluteLayers, relativeLayers } = React.useMemo(() => {
    const absolute = [];
    const relative = [];
    
    images.forEach((imageData, index) => {
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
  }, [images, renderImageLayer]);

  // Low-opacity duplicate row for wrong-answer motion (same layout as relativeLayers, container-relative only)
  const ghostRelativeLayers = React.useMemo(() => {
    if (!wrongAnswerMotionLayout || !rowLayout) {
      return [];
    }
    return images
      .map((imageData, index) => {
        const hasLayerCoordinates =
          imageData.layerCoordinates &&
          Array.isArray(imageData.layerCoordinates) &&
          imageData.layerCoordinates.length === 4;
        if (hasLayerCoordinates) {
          return null;
        }
        return renderImageLayer(imageData, index, { ghostDuplicate: true });
      })
      .filter(Boolean);
  }, [images, renderImageLayer, wrongAnswerMotionLayout, rowLayout]);

  // Render container with relative layers, and absolute layers as siblings
  // Use a stable key based on elementName and currentPage to help React track the component
  const fragmentKey = `image-stack-${elementName}-${currentPage}`;

  const motionBundleStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 3,
    ...wrongAnswerMotionVars
  };

  const motionMainStaticStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none'
  };

  // When playing: only the ghost copy is inside the animated bundle; real triangles stay in a static overlay on top.
  const stackBody = wrongAnswerMotionLayout
    ? wrongAnswerMotionPlaying
      ? [
          React.createElement(
            'div',
            {
              key: 'image-stack-motion-bundle',
              className:
                'image-stack-motion-bundle image-stack-wrong-answer-motion-playing' +
                (wrongAnswerMotionSkipTop ? ' image-stack-wrong-answer-motion--skip-top' : ''),
              style: motionBundleStyle
            },
            ghostRelativeLayers
          ),
          React.createElement(
            'div',
            {
              key: 'image-stack-motion-main-static',
              className: 'image-stack-motion-main-static',
              style: motionMainStaticStyle
            },
            relativeLayers
          )
        ]
      : React.createElement(
          'div',
          {
            key: 'image-stack-motion-bundle',
            className: 'image-stack-motion-bundle',
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              ...wrongAnswerMotionVars
            }
          },
          relativeLayers
        )
    : relativeLayers;

  return React.createElement(React.Fragment, { key: fragmentKey }, [
    React.createElement(
      'div',
      {
        key: 'image-stack-container',
        id: id || `${elementName}-${currentPage}`,
        className: 'image-stack-container',
        style: containerStyle,
        'data-element-name': elementName,
        'data-page': currentPage,
        'data-component-type': 'image-stack'
      },
      stackBody
    ),
    ...absoluteLayers.map((layer, index) => {
      // Ensure each absolute layer has a stable key
      if (layer && layer.key) {
        return layer;
      }
      // If layer doesn't have a key, wrap it to add one
      return React.cloneElement(layer, { key: `absolute-layer-${index}-${fragmentKey}` });
    })
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

