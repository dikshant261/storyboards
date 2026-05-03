/**
 * Fill Blanks Component - React 18 Optimized
 * 
 * This component provides a fill-in-the-blanks interface with blank tiles and option tiles
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Fill Blanks Component with blank tiles and option tiles
 */
const FillBlanksComponent = React.memo((props) => {
  // Debug: Log when component renders with opt4 coordinate
  if (props.options && Array.isArray(props.options)) {
    const opt4 = props.options.find(opt => opt.id === 'opt4');
    if (opt4) {
      console.log(`🔍 [FillBlanks] Component render - opt4 coordinate:`, opt4.coordinate);
    }
  }
  const elementId = React.useId();
  const componentId = props.id || elementId;
  // Extract page number from component ID (e.g., 'page6-fill-blanks' -> 'page6')
  const pageMatch = componentId.match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : 'page6'; // Default to page6 for backward compatibility
  const feedbackStateKey = `${pageId}FeedbackState`;
  const feedbackEventName = `${pageId}FeedbackUpdate`;

  const {
    position,
    processedStyles,
    elementZIndex,
    // Blank tile properties
    blanks = [], // Array of {id: "", coordinate: [x1, y1, x2, y2], image: "", text: "", bgColor: "", fontColor: "", borderColor: "", borderBlink: false, bgBlink: false, isDroppable: true} - text is default text to display, can be updated by option's blankID text. bgColor, fontColor, borderColor override global settings. borderBlink makes border blink between original color and contrast color. bgBlink makes background color blink between original color and contrast color. isDroppable controls whether options can be dropped on this blank (default: true).
    // Blank tile border properties
    blankBorderWidth = '2gc',
    blankBorderColor = '#ffffff',
    blankBorderType = 'solid', // solid or dashed
    blankBorderRadius = '0gc', // Border radius for blanks
    blankBackgroundColor = 'transparent',
    // Blank tile font properties
    blankFontSize = '24gc',
    blankFontColor = '#ffffff',
    // Options container properties
    optionsContainerCoordinates = [], // [x1, y1, x2, y2]
    optionsBorderWidth = '2gc',
    optionsBorderColor = '#ffffff',
    optionsBorderType = 'dashed', // dashed or solid
    optionsBackgroundColor = 'transparent',
    showOptionsContainer = true, // Toggle to show/hide options container
    showOptionsContainerBorder = true, // Toggle to show/hide options container border
    showOptionsRowBorders = false, // Toggle to show/hide borders between instruction row and option tray row
    optionContainerInstructionHeight = 15, // Height percentage for instruction row (default 15%)
    optionContainerInstructionText = '', // Text to display in instruction row
    optionContainerInstructionTextColor = '#ffffff', // Font color for instruction text (default white)
    // Option button styling
    optionButtonColor = '#2a3f5f', // Background color for option buttons
    optionButtonFontSize = '24gc', // Font size for option buttons (in gc)
    optionButtonFontColor = '#ffffff', // Font color for option buttons (in gc)
    // Options grid orientation
    optionsRows = 2, // Number of rows in options grid
    optionsColumns = 2, // Number of columns in options grid
    optionButtonLayoutMode = 'auto', // 'auto' (use grid with rows/columns) or 'manual' (use coordinate for each option)
    // Wiggle animation duration
    wiggleDuration = 1250, // Duration in milliseconds for incorrect drop wiggle animation
    // Highlight unfilled blanks on wrong click
    highlightUnfilledBlanksOnWrong = false, // If true, highlight all unfilled blanks with salmon bg and wiggle when wrong option is clicked
    unfilledBlankWiggleDuration = 1000, // Duration in milliseconds for unfilled blank wiggle animation
    showFeedback = true, // If false, disable feedback text display
    showIncorrectFeedback = true, // If false, suppress incorrect feedback text/mode
    hideOptionsOnCorrect = false, // If true, hide options container after correct feedback is shown
    // Interaction mode
    mode = 'DND', // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
    // When true, image-only option buttons and matching blank tiles use full area (padding 0, object-fit fill, rounded clip)
    optionImageFillsButton = true,
    // Options array
    options = [], // Array of {id: "", text: "", image: "", blankID: [] or "" or [{bid: "", text: ""}], feedbackText: ""} - blankID can be array of objects with bid and text, or array of strings, or single string
    // Retain option button style
    retainOptionButtonStyle = false, // If true, retain the option button's original style (buttonColor) when dropped into a blank
    // Keep option style when correctly placed
    keepOptionStyleWhenPlaced = false, // If true, when an option is correctly placed, disable drag but keep original button style
    // Allow multi-blank placement (deprecated - use maxDropsPerOption or option.maxDrops instead)
    allowMultiBlankPlacement = false, // If true, allow an option to be placed in multiple blanks; only disable when placed in all allowed blanks
    // Maximum number of drops per option (default: 1 for single drop, null means use option.maxDrops or allowMultiBlankPlacement logic)
    maxDropsPerOption = null, // Number of times an option can be dropped (null = use option.maxDrops or allowMultiBlankPlacement)
    // Panel update props (similar to QuizPanelComponent)
    keyConcepts = [], // Array of key concepts to update concept summary panel
    impFormulae = [] // Array of important formulae to update concept summary panel
  } = props;

  console.log('🔍 FillBlanksComponent RENDERED!');
  console.log('🔍 FillBlanksComponent props:', props);
  console.log('🔍 FillBlanksComponent mode:', mode);
  console.log('🔍 FillBlanksComponent blanks:', blanks);
  console.log('🔍 FillBlanksComponent options:', options);

  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;

    // First, handle fractions within $...$ blocks (may contain multiple fractions)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });

    return result;
  };

  // State for filled blanks and selected options
  const [filledBlanks, setFilledBlanks] = React.useState({});
  const [selectedOptions, setSelectedOptions] = React.useState(new Set());
  const [feedbackState, setFeedbackState] = React.useState(null); // null, 'correct', 'incorrect'
  const [feedbackText, setFeedbackText] = React.useState('');

  // State for drag and drop (using Draggable component)
  const [draggedOptionId, setDraggedOptionId] = React.useState(null);
  const [draggedOverBlankId, setDraggedOverBlankId] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false); // Track if any option is being dragged

  // State for correctly placed options (persistent until browser refresh)
  const [correctlyPlacedOptions, setCorrectlyPlacedOptions] = React.useState(new Set());

  // State for tracking which blanks each option has been placed in (for multi-blank placement)
  const [optionPlacements, setOptionPlacements] = React.useState({}); // { optionId: Set([blankId1, blankId2, ...]) }

  // State for incorrectly clicked options (blankID is null) - salmon background, disabled
  const [incorrectlyClickedOptions, setIncorrectlyClickedOptions] = React.useState(new Set());

  // State for incorrect wiggle animation
  const [wigglingOptions, setWigglingOptions] = React.useState(new Set());

  // State for unfilled blanks wiggle animation (when wrong option is clicked)
  const [wigglingUnfilledBlanks, setWigglingUnfilledBlanks] = React.useState(new Set());
  // Temporary wrong-drop preview: option snaps into wrong blank, wiggles, then returns
  const [wrongDropPreviewByBlank, setWrongDropPreviewByBlank] = React.useState({});
  const [wigglingWrongDropBlanks, setWigglingWrongDropBlanks] = React.useState(new Set());
  // Hide source option in tray during wrong-drop preview (prevents flicker)
  const [temporarilyHiddenOptions, setTemporarilyHiddenOptions] = React.useState(new Set());

  // Skip one persist after componentId restore so we do not write initial {} over saved filledBlanks
  const skipSaveAfterRestoreRef = React.useRef(false);

  // Initialize global state store if it doesn't exist
  if (typeof window !== 'undefined' && !window.fillBlanksStateStore) {
    window.fillBlanksStateStore = {};
  }

  // Restore or initialize state when componentId changes (page navigation)
  // This ensures each page has its own independent state that persists across navigation
  React.useEffect(() => {
    const stateKey = componentId;
    skipSaveAfterRestoreRef.current = true;
    const savedState = window.fillBlanksStateStore?.[stateKey];

    console.log('🔍 [FillBlanks] State restoration check:', {
      componentId,
      stateKey,
      hasSavedState: !!savedState,
      savedStateKeys: savedState ? Object.keys(savedState) : [],
      fillBlanksStateStore: window.fillBlanksStateStore ? Object.keys(window.fillBlanksStateStore) : []
    });

    if (savedState) {
      // Restore saved state
      console.log('🔄 [FillBlanks] Component ID changed to:', componentId, '- Restoring saved state');
      console.log('🔍 [FillBlanks] Saved state details:', {
        filledBlanks: savedState.filledBlanks,
        filledBlanksKeys: savedState.filledBlanks ? Object.keys(savedState.filledBlanks) : [],
        correctlyPlacedOptions: savedState.correctlyPlacedOptions
      });
      setFilledBlanks(savedState.filledBlanks || {});
      setSelectedOptions(new Set(savedState.selectedOptions || []));
      setFeedbackState(savedState.feedbackState || null);
      setFeedbackText(savedState.feedbackText || '');
      setDraggedOptionId(savedState.draggedOptionId || null);
      setDraggedOverBlankId(savedState.draggedOverBlankId || null);
      setCorrectlyPlacedOptions(new Set(savedState.correctlyPlacedOptions || []));
      // Restore optionPlacements from saved state
      const savedPlacements = savedState.optionPlacements || {};
      const restoredPlacements = {};
      Object.keys(savedPlacements).forEach(optId => {
        restoredPlacements[optId] = new Set(savedPlacements[optId] || []);
      });
      setOptionPlacements(restoredPlacements);
      setIncorrectlyClickedOptions(new Set(savedState.incorrectlyClickedOptions || []));
      setWigglingOptions(new Set(savedState.wigglingOptions || []));
      setWigglingUnfilledBlanks(new Set(savedState.wigglingUnfilledBlanks || []));
      setWrongDropPreviewByBlank({});
      setWigglingWrongDropBlanks(new Set());
      setTemporarilyHiddenOptions(new Set());
    } else {
      // Initialize fresh state
      console.log('🔄 [FillBlanks] Component ID changed to:', componentId, '- Initializing fresh state');
      setFilledBlanks({});
      setSelectedOptions(new Set());
      setFeedbackState(null);
      setFeedbackText('');
      setDraggedOptionId(null);
      setDraggedOverBlankId(null);
      setCorrectlyPlacedOptions(new Set());
      setOptionPlacements({});
      setIncorrectlyClickedOptions(new Set());
      setWigglingOptions(new Set());
      setWigglingUnfilledBlanks(new Set());
      setWrongDropPreviewByBlank({});
      setWigglingWrongDropBlanks(new Set());
      setTemporarilyHiddenOptions(new Set());
    }
  }, [componentId]);

  // Save state whenever it changes
  React.useEffect(() => {
    if (skipSaveAfterRestoreRef.current) {
      skipSaveAfterRestoreRef.current = false;
      return;
    }

    const stateKey = componentId;
    if (!window.fillBlanksStateStore) {
      window.fillBlanksStateStore = {};
    }

    // Convert optionPlacements Sets to arrays for storage
    const optionPlacementsForStorage = {};
    Object.keys(optionPlacements).forEach(optId => {
      optionPlacementsForStorage[optId] = Array.from(optionPlacements[optId]);
    });

    window.fillBlanksStateStore[stateKey] = {
      filledBlanks,
      selectedOptions: Array.from(selectedOptions),
      feedbackState,
      feedbackText,
      draggedOptionId,
      draggedOverBlankId,
      correctlyPlacedOptions: Array.from(correctlyPlacedOptions),
      optionPlacements: optionPlacementsForStorage,
      incorrectlyClickedOptions: Array.from(incorrectlyClickedOptions),
      wigglingOptions: Array.from(wigglingOptions),
      wigglingUnfilledBlanks: Array.from(wigglingUnfilledBlanks)
    };

    console.log('💾 [FillBlanks] Saved state for', stateKey, {
      filledBlanksKeys: Object.keys(filledBlanks),
      filledBlanks: filledBlanks,
      correctlyPlacedOptionsCount: correctlyPlacedOptions.size,
      correctlyPlacedOptions: Array.from(correctlyPlacedOptions)
    });

    // Also save to page7FillBlanksState for page 7 specific state access
    if (componentId === 'page7-fill-blanks') {
      window.page7FillBlanksState = {
        filledBlanks,
        selectedOptions: Array.from(selectedOptions),
        correctlyPlacedOptions: Array.from(correctlyPlacedOptions)
      };

      // Dispatch custom event to trigger re-render of TeacherNoteComponents
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('page7FillBlanksStateUpdate', {
          detail: { filledBlanks, correctlyPlacedOptions: Array.from(correctlyPlacedOptions) }
        }));
      }
    }
  }, [componentId, filledBlanks, selectedOptions, feedbackState, feedbackText, draggedOptionId, draggedOverBlankId, correctlyPlacedOptions, optionPlacements, incorrectlyClickedOptions, wigglingOptions, wigglingUnfilledBlanks]);

  // Process gc properties
  const processGcProperty = (value, propertyType) => {
    if (value && typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  };

  const processedBlankFontSize = processGcProperty(blankFontSize, 'fontSize');
  const processedBlankBorderWidth = processGcProperty(blankBorderWidth, 'borderWidth');
  const processedBlankBorderRadius = processGcProperty(blankBorderRadius, 'borderRadius');
  const processedOptionsBorderWidth = processGcProperty(optionsBorderWidth, 'borderWidth');
  const processedOptionButtonFontSize = processGcProperty(optionButtonFontSize, 'fontSize');

  // Process spacing properties for responsive sizing
  const processedOptionPadding = processGcProperty('2gc', 'padding');
  const processedOptionMargin = processGcProperty('0gc', 'margin');
  const processedOptionGap = processGcProperty('2gc', 'gap');
  const processedOptionMinHeight = processGcProperty('8gc', 'minHeight');
  const processedFrameGap = processGcProperty('1gc', 'padding');
  const processedOptionBorderRadius = processGcProperty('1gc', 'borderRadius');

  // Helper function to normalize blankID to array of objects with bid and text
  // Supports both old format (string or array of strings) and new format (array of objects with bid and text)
  const normalizeBlankID = (blankID) => {
    if (blankID === null || blankID === undefined) {
      return [];
    }

    // If it's already an array of objects with bid property, return as is
    if (Array.isArray(blankID) && blankID.length > 0 && typeof blankID[0] === 'object' && blankID[0].bid !== undefined) {
      return blankID;
    }

    // If it's a single string, convert to array
    const blankIDArray = Array.isArray(blankID) ? blankID : [blankID];

    // Convert array of strings to array of objects with bid and empty text
    return blankIDArray
      .filter(id => id !== null && id !== undefined)
      .map(id => ({
        bid: id,
        text: '' // Empty text for old format
      }));
  };

  // True when every option's placement rules are satisfied (supports OR targets: multiple bids + maxDrops 1 = any one blank)
  const isQuizActivityComplete = React.useCallback((filledMap) => {
    if (!Array.isArray(options) || options.length === 0) return false;
    return options.every((option) => {
      const blankIDArray = normalizeBlankID(option.blankID);
      const bids = blankIDArray.map((o) => o.bid).filter(Boolean);
      if (bids.length === 0) return true;

      const optionMaxDrops = option.maxDrops !== undefined ? option.maxDrops :
        (maxDropsPerOption !== null ? maxDropsPerOption :
          (allowMultiBlankPlacement ? null : 1));

      if (bids.length > 1 && optionMaxDrops === 1) {
        return bids.some((bid) => filledMap[bid] === option.id);
      }
      if (optionMaxDrops === 1) {
        return !!filledMap[bids[0]] && filledMap[bids[0]] === option.id;
      }
      if (allowMultiBlankPlacement && optionMaxDrops === null) {
        return bids.every((bid) => filledMap[bid] === option.id);
      }
      return bids.every((bid) => filledMap[bid] === option.id);
    });
  }, [options, maxDropsPerOption, allowMultiBlankPlacement]);

  // Helper function to get all fillable blank IDs from options array
  // Only blanks that are referenced in options' blankID are considered fillable
  const getFillableBlankIds = React.useMemo(() => {
    const fillableIds = new Set();
    // Ensure options is an array before iterating
    if (Array.isArray(options)) {
      options.forEach(option => {
        const blankIDArray = normalizeBlankID(option.blankID);
        blankIDArray.forEach(blankIDObj => {
          if (blankIDObj.bid) {
            fillableIds.add(blankIDObj.bid);
          }
        });
      });
    }
    return Array.from(fillableIds);
  }, [options]);

  // Check if all blanks were already filled when state is restored (on page load)
  React.useEffect(() => {
    console.log('🔍 [FillBlanks] Completion check useEffect running:', {
      componentId,
      getFillableBlankIdsLength: getFillableBlankIds.length,
      getFillableBlankIds: getFillableBlankIds,
      filledBlanksKeys: Object.keys(filledBlanks),
      filledBlanks: filledBlanks,
      filledBlanksNotEmpty: Object.keys(filledBlanks).length > 0
    });

    // Only check if we have fillable blanks and filledBlanks is not empty (meaning state was restored)
    if (getFillableBlankIds.length > 0 && Object.keys(filledBlanks).length > 0) {
      console.log('🔍 [FillBlanks] Checking if all blanks are filled...');
      const allFilled = isQuizActivityComplete(filledBlanks);

      console.log('🔍 [FillBlanks] All blanks filled check result:', allFilled);

      if (allFilled) {
        console.log('✅ [FillBlanks] All blanks were already filled on page load, dispatching quizCompleted event');

        const pageNumber = window.getCurrentPage?.() || null;

        // Mark page as completed in PageCompletionManager
        if (pageNumber && window.PageCompletionManager) {
          window.PageCompletionManager.markPageCompleted(pageNumber);
          console.log(`✅ [FillBlanks] Marked page ${pageNumber} as completed in PageCompletionManager`);
        }

        // Dispatch quizCompleted event to enable next button and hide tap animations
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            const enableNextEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentId: componentId,
                componentType: 'FillBlanksComponent',
                pageNumber: pageNumber
              }
            });
            window.dispatchEvent(enableNextEvent);
            console.log('🔍 [FillBlanks] Dispatched quizCompleted event on page load for componentId:', componentId);
          }
        }, 0);
      } else {
        console.log('⚠️ [FillBlanks] Not all blanks are filled:', {
          expectedBlanks: getFillableBlankIds,
          filledBlanks: Object.keys(filledBlanks),
          missingBlanks: getFillableBlankIds.filter(id => !filledBlanks[id])
        });
      }
    } else {
      console.log('⚠️ [FillBlanks] Skipping completion check:', {
        reason: getFillableBlankIds.length === 0 ? 'No fillable blanks' : 'No filled blanks (fresh state)',
        getFillableBlankIdsLength: getFillableBlankIds.length,
        filledBlanksLength: Object.keys(filledBlanks).length
      });
    }
  }, [componentId, getFillableBlankIds, filledBlanks, isQuizActivityComplete]);

  // Calculate options container position (relative to FillBlanksComponent container)
  const getOptionsContainerPosition = () => {
    if (optionsContainerCoordinates && optionsContainerCoordinates.length === 4 && position?.css) {
      const [optX1, optY1, optX2, optY2] = optionsContainerCoordinates;

      // Get component container coordinates from position
      const componentCoords = position.coordinates || [];
      if (componentCoords.length === 4) {
        const [compX1, compY1, compX2, compY2] = componentCoords;

        // Convert to relative coordinates within component container
        const relativeX1 = optX1 - compX1;
        const relativeY1 = optY1 - compY1;
        const relativeX2 = optX2 - compX1;
        const relativeY2 = optY2 - compY1;

        // Calculate component container dimensions
        const compWidth = compX2 - compX1;
        const compHeight = compY2 - compY1;

        // Convert to percentages relative to component container
        const left = (relativeX1 / compWidth) * 100;
        const top = (relativeY1 / compHeight) * 100;
        const width = ((relativeX2 - relativeX1) / compWidth) * 100;
        const height = ((relativeY2 - relativeY1) / compHeight) * 100;

        return {
          position: 'absolute',
          left: `${left.toFixed(2)}%`,
          top: `${top.toFixed(2)}%`,
          width: `${width.toFixed(2)}%`,
          height: `${height.toFixed(2)}%`
        };
      }
    }

    // Fallback to page coordinates if position coordinates not available
    if (optionsContainerCoordinates && optionsContainerCoordinates.length === 4) {
      const [x1, y1, x2, y2] = optionsContainerCoordinates;
      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
        const cssPosition = gridPositions.convertToCSS(optionsContainerCoordinates, 'fill-blanks-options', 'page', 'custom');
        return cssPosition.css || cssPosition;
      }
      // Fallback calculation - matches convertToCSS format (x2-x1 without +1)
      if (typeof GridPrecisionConfig !== 'undefined') {
        const config = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        const left = ((x1 - 1) / config.cols) * 100;
        const top = ((y1 - 1) / config.rows) * 100;
        const width = ((x2 - x1) / config.cols) * 100;
        const height = ((y2 - y1) / config.rows) * 100;
        return {
          position: 'absolute',
          left: `${left.toFixed(2)}%`,
          top: `${top.toFixed(2)}%`,
          width: `${width.toFixed(2)}%`,
          height: `${height.toFixed(2)}%`
        };
      }
    }
    return null;
  };

  // Calculate blank tile position (relative to FillBlanksComponent container)
  const getBlankTilePosition = (coordinate) => {
    if (coordinate && coordinate.length === 4 && position?.css) {
      const [blankX1, blankY1, blankX2, blankY2] = coordinate;

      // Get component container coordinates from position
      const componentCoords = position.coordinates || [];
      if (componentCoords.length === 4) {
        const [compX1, compY1, compX2, compY2] = componentCoords;

        // Convert to relative coordinates within component container
        const relativeX1 = blankX1 - compX1;
        const relativeY1 = blankY1 - compY1;
        const relativeX2 = blankX2 - compX1;
        const relativeY2 = blankY2 - compY1;

        // Calculate component container dimensions
        const compWidth = compX2 - compX1;
        const compHeight = compY2 - compY1;

        // Convert to percentages relative to component container
        const left = (relativeX1 / compWidth) * 100;
        const top = (relativeY1 / compHeight) * 100;
        const width = ((relativeX2 - relativeX1) / compWidth) * 100;
        const height = ((relativeY2 - relativeY1) / compHeight) * 100;

        return {
          position: 'absolute',
          left: `${left.toFixed(2)}%`,
          top: `${top.toFixed(2)}%`,
          width: `${width.toFixed(2)}%`,
          height: `${height.toFixed(2)}%`
        };
      }
    }

    // Fallback to page coordinates if position coordinates not available
    if (coordinate && coordinate.length === 4) {
      const [x1, y1, x2, y2] = coordinate;
      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
        const cssPosition = gridPositions.convertToCSS(coordinate, 'fill-blanks-blank', 'page', 'custom');
        return cssPosition.css || cssPosition;
      }
      // Fallback calculation - matches convertToCSS format (x2-x1 without +1)
      if (typeof GridPrecisionConfig !== 'undefined') {
        const config = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        const left = ((x1 - 1) / config.cols) * 100;
        const top = ((y1 - 1) / config.rows) * 100;
        const width = ((x2 - x1) / config.cols) * 100;
        const height = ((y2 - y1) / config.rows) * 100;
        return {
          position: 'absolute',
          left: `${left.toFixed(2)}%`,
          top: `${top.toFixed(2)}%`,
          width: `${width.toFixed(2)}%`,
          height: `${height.toFixed(2)}%`
        };
      }
    }
    return null;
  };

  // Handle option click
  const handleOptionClick = (optionId, optionData) => {
    // Quiz done: each option satisfied (includes OR-blanks when one option lists multiple bids with maxDrops 1)
    const allFillableBlanksFilled = isQuizActivityComplete(filledBlanks);

    // Don't allow interaction with correctly placed or incorrectly clicked options, or if all fillable blanks are filled
    // Check based on maxDrops
    const optionMaxDrops = optionData?.maxDrops !== undefined ? optionData.maxDrops :
      (maxDropsPerOption !== null ? maxDropsPerOption :
        (allowMultiBlankPlacement ? null : 1));

    let shouldDisable = false;
    if (optionMaxDrops !== null) {
      // Use number-based drop count
      const placedBlanks = optionPlacements[optionId] || new Set();
      const dropCount = placedBlanks.size;
      shouldDisable = dropCount >= optionMaxDrops || incorrectlyClickedOptions.has(optionId);
    } else if (allowMultiBlankPlacement) {
      // Legacy behavior: check if placed in all allowed blanks
      const blankIDArray = normalizeBlankID(optionData?.blankID);
      const allowedBlankIds = blankIDArray.map(obj => obj.bid);
      const placedBlanks = optionPlacements[optionId] || new Set();
      const allAllowedBlanksFilled = allowedBlankIds.length > 0 &&
        allowedBlankIds.every(blankId => placedBlanks.has(blankId));
      shouldDisable = allAllowedBlanksFilled || incorrectlyClickedOptions.has(optionId);
    } else {
      shouldDisable = correctlyPlacedOptions.has(optionId) || incorrectlyClickedOptions.has(optionId) || allFillableBlanksFilled;
    }

    if (shouldDisable) {
      return;
    }

    // Clear previous feedback when a new option is clicked (to show new feedback)
    // This ensures feedback persists until next click or drop
    if (feedbackState === 'incorrect' || feedbackState === 'correct') {
      setFeedbackState(null);
      setFeedbackText('');
    }

    if (mode === 'MCQ') {
      // MCQ mode: Click directly fills the blank
      const option = Array.isArray(options) ? options.find(opt => opt.id === optionId) : null;

      // Normalize blankID to array of objects with bid and text
      const blankIDArray = normalizeBlankID(option?.blankID);

      if (blankIDArray.length > 0) {
        // Find all available blanks for this option (that are not already filled)
        // In MCQ mode, we allow filling non-droppable blanks via click (they just can't be dropped on in DND mode)
        const availableBlanks = blankIDArray
          .map(blankIDObj => blanks.find(blank => blank.id === blankIDObj.bid))
          .filter(blank => blank && !filledBlanks[blank.id]); // Allow all blanks in MCQ mode, regardless of isDroppable

        if (availableBlanks.length > 0) {
          // Fill all available blanks
          setSelectedOptions(prev => new Set(prev).add(optionId));

          const newFilledBlanks = { ...filledBlanks };
          const newPlacements = new Set(optionPlacements[optionId] || []);

          availableBlanks.forEach(blank => {
            newFilledBlanks[blank.id] = optionId;
            newPlacements.add(blank.id);
          });
          setFilledBlanks(newFilledBlanks);

          // Track placements for drop count support
          setOptionPlacements(prev => ({
            ...prev,
            [optionId]: newPlacements
          }));

          // Check if option has reached its max drops
          const optionMaxDrops = option.maxDrops !== undefined ? option.maxDrops :
            (maxDropsPerOption !== null ? maxDropsPerOption :
              (allowMultiBlankPlacement ? null : 1));

          if (optionMaxDrops !== null) {
            // Use number-based drop count
            const dropCount = newPlacements.size;
            if (dropCount >= optionMaxDrops) {
              setCorrectlyPlacedOptions(prev => new Set(prev).add(optionId));
            }
          } else if (allowMultiBlankPlacement) {
            // Legacy behavior: check if placed in all allowed blanks
            const allowedBlankIds = blankIDArray.map(obj => obj.bid);
            const allAllowedBlanksFilled = allowedBlankIds.length > 0 &&
              allowedBlankIds.every(bId => newPlacements.has(bId));

            if (allAllowedBlanksFilled) {
              setCorrectlyPlacedOptions(prev => new Set(prev).add(optionId));
            }
          } else {
            // Original behavior: mark as correctly placed immediately
            setCorrectlyPlacedOptions(prev => new Set(prev).add(optionId));
          }

          // Set feedback from option
          if (showFeedback) {
            setFeedbackState('correct');
            if (option && option.feedbackText) {
              setFeedbackText(option.feedbackText);
            } else {
              setFeedbackText('Correct!');
            }
          }

          // Dispatch event to update calculation steps for pages 11 and 12
          if (pageId === 'page11' || pageId === 'page12') {
            const updateStepEvent = new CustomEvent('updateCalculationStep', {
              detail: {
                stepIndex: 1,
                newText: '<span style="white-space: nowrap; display: inline-block;">\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">112 ÷ \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</span><span style="display: block; padding: 0 2px;">20 ÷ \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</span></span> = $\\frac{28}{5}$</span>'
              }
            });
            window.dispatchEvent(updateStepEvent);
            console.log('🔍 [FillBlanks] Dispatched updateCalculationStep event for', pageId);
          }

          // Check if all blanks are filled correctly
          checkAnswers(newFilledBlanks);

          // Play correct sound if available
          if (typeof window !== 'undefined' && window.playAnswerSound) {
            window.playAnswerSound(true);
          }

          // Check if all fillable blanks are now filled and dispatch quizCompleted if so
          const allFillableBlanksFilledNow = isQuizActivityComplete(newFilledBlanks);
          if (allFillableBlanksFilledNow) {
            // Dispatch quizCompleted event to enable next button
            const enableNextEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentId: componentId,
                componentType: 'FillBlanksComponent',
                pageNumber: window.getCurrentPage?.() || null
              }
            });
            window.dispatchEvent(enableNextEvent);
            console.log('🔍 [FillBlanks] Dispatched quizCompleted event for componentId:', componentId);
          }

          // Update concept summary panel when correct answer is clicked (even if not all blanks are filled)
          // This allows pages where not all blanks need to be filled to still update the concept summary
          updateConceptSummaryPanel();

          // Correct feedback persists for the page (no setTimeout)
        } else {
          // All blanks are already filled or not found - still mark as correctly placed (green, disabled)
          if (showFeedback) {
            setFeedbackState('correct');
            if (option.feedbackText) {
              setFeedbackText(option.feedbackText);
            } else {
              setFeedbackText('Correct!');
            }
          }

          // Play correct sound if available
          if (typeof window !== 'undefined' && window.playAnswerSound) {
            window.playAnswerSound(true);
          }

          // Correct feedback persists for the page (no setTimeout)
        }
      } else {
        // Option has no correct blank (blankID is null) - salmon background, disabled
        setIncorrectlyClickedOptions(prev => new Set(prev).add(optionId));

        if (showFeedback && showIncorrectFeedback) {
          setFeedbackState('incorrect');
          if (option && option.feedbackText) {
            setFeedbackText(option.feedbackText);
          } else {
            setFeedbackText('This option cannot be placed.');
          }
        }

        // If highlightUnfilledBlanksOnWrong is true, highlight all unfilled blanks
        if (highlightUnfilledBlanksOnWrong) {
          const unfilledBlanks = blanks.filter(blank => !filledBlanks[blank.id]);
          const unfilledBlankIds = new Set(unfilledBlanks.map(blank => blank.id));

          // Set wiggling state for unfilled blanks
          setWigglingUnfilledBlanks(unfilledBlankIds);

          // Remove wiggle animation after unfilledBlankWiggleDuration
          setTimeout(() => {
            setWigglingUnfilledBlanks(new Set());
          }, unfilledBlankWiggleDuration);
        }

        // Play wrong sound if available
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(false);
        }

        // Incorrect feedback persists until next click (no setTimeout)
      }
    } else {
      // DND mode: Click selects/deselects option for drag and drop
      if (selectedOptions.has(optionId)) {
        // Deselect option
        setSelectedOptions(prev => {
          const newSet = new Set(prev);
          newSet.delete(optionId);
          return newSet;
        });

        // Remove from filled blanks
        setFilledBlanks(prev => {
          const newFilled = { ...prev };
          Object.keys(newFilled).forEach(blankId => {
            if (newFilled[blankId] === optionId) {
              delete newFilled[blankId];
            }
          });
          return newFilled;
        });

        setFeedbackState(null);
        setFeedbackText('');
      } else {
        // Select option for drag and drop
        setSelectedOptions(prev => new Set(prev).add(optionId));
      }
    }
  };

  // Handle blank click to remove filled content
  const handleBlankClick = (blankId) => {
    if (filledBlanks[blankId]) {
      const optionId = filledBlanks[blankId];

      // Don't allow removing correctly placed options (persistent state)
      if (correctlyPlacedOptions.has(optionId)) {
        return; // Can't remove correctly placed options
      }

      setFilledBlanks(prev => {
        const newFilled = { ...prev };
        delete newFilled[blankId];
        return newFilled;
      });

      setSelectedOptions(prev => {
        const newSet = new Set(prev);
        newSet.delete(optionId);
        return newSet;
      });

      setFeedbackState(null);
      setFeedbackText('');
    }
  };

  // Store refs for option elements
  const optionRefs = React.useRef({});

  // Update isDragging state when draggedOptionId changes
  React.useEffect(() => {
    setIsDragging(draggedOptionId !== null);
  }, [draggedOptionId]);


  // Function to update concept summary panel (same pattern as QuizPanelComponent)
  const updateConceptSummaryPanel = React.useCallback(() => {
    // Extract page number from componentId (e.g., "page6-fill-blanks" -> "6")
    const pageMatch = componentId.match(/page(\d+)-/);
    if (!pageMatch) {
      console.log('🔍 [FillBlanks] Could not extract page number from componentId:', componentId);
      return;
    }

    const pageNumber = pageMatch[1];

    // Prepare impFormulae array - add page-specific formulae when all blanks are filled
    let finalImpFormulae = [...(impFormulae || [])];

    // Page 7: add concept-summary line when activity is complete (text from i18n only)
    if (pageNumber === '7') {
      const allFilled = isQuizActivityComplete(filledBlanks);
      if (allFilled) {
        const formulaText =
          typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function'
            ? window.i18n.t('pages.page7.conceptSummary.completionText', {})
            : '';
        if (formulaText && !finalImpFormulae.some((f) => f.text === formulaText)) {
          finalImpFormulae.push({ text: formulaText, color: '#70ACC7' });
        }
      }
    }

    // Dispatch updateConceptSummary event (same as QuizPanelComponent)
    if ((keyConcepts && keyConcepts.length > 0) || (finalImpFormulae && finalImpFormulae.length > 0)) {
      const updateEvent = new CustomEvent('updateConceptSummary', {
        detail: {
          pageNumber: pageNumber,
          keyConcepts: keyConcepts || [],
          impFormulae: finalImpFormulae || []
        }
      });
      window.dispatchEvent(updateEvent);
      console.log('🔍 [FillBlanks] Dispatched updateConceptSummary event:', updateEvent.detail);
    }
  }, [componentId, keyConcepts, impFormulae, filledBlanks, isQuizActivityComplete]);

  const checkAnswers = (filledBlanksToCheck = filledBlanks) => {
    const allFillableBlanksFilled = isQuizActivityComplete(filledBlanksToCheck);
    if (allFillableBlanksFilled) {
      const allCorrect = true;

      if (allCorrect) {
        // Find the first option that is placed and has feedback text
        const firstCorrectOption = Array.isArray(options)
          ? options.find((opt) => {
            const blankIDArray = normalizeBlankID(opt.blankID);
            const bids = blankIDArray.map((o) => o.bid).filter(Boolean);
            const placedOnAny = bids.some((bid) => filledBlanksToCheck[bid] === opt.id);
            return placedOnAny && opt.feedbackText;
          })
          : null;

        if (showFeedback) {
          setFeedbackState('correct');
          if (firstCorrectOption && firstCorrectOption.feedbackText) {
            setFeedbackText(firstCorrectOption.feedbackText);
          } else {
            setFeedbackText('Correct! All blanks filled correctly.');
          }
        }
        // Play correct sound if available
        if (typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('correct');
        }

        // Dispatch quizCompleted event to enable next button
        if (typeof window !== 'undefined') {
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              componentId: componentId,
              componentType: 'FillBlanksComponent',
              pageNumber: window.getCurrentPage?.() || null
            }
          });
          window.dispatchEvent(enableNextEvent);
          console.log('🔍 [FillBlanks] Dispatched quizCompleted event for componentId:', componentId);
        }

        // Update concept summary panel (same as QuizPanelComponent)
        updateConceptSummaryPanel();
      } else {
        if (showFeedback && showIncorrectFeedback) {
          setFeedbackState('incorrect');
        }
        // Find incorrect blanks and show their feedback
        const incorrectBlanks = blanks.filter(blank => {
          const optionId = filledBlanksToCheck[blank.id];
          const option = Array.isArray(options) ? options.find(opt => opt.id === optionId) : null;
          if (!option) return false;

          // Normalize blankID to array of objects with bid and text
          const blankIDArray = normalizeBlankID(option.blankID);

          // Check if option doesn't match (blankID array doesn't have bid matching blank.id) and has feedback
          return blankIDArray.length === 0 || !blankIDArray.some(obj => obj.bid === blank.id);
        });

        if (incorrectBlanks.length > 0) {
          // Use the first incorrect option's feedback text
          const firstIncorrectBlank = incorrectBlanks[0];
          const optionId = filledBlanksToCheck[firstIncorrectBlank.id];
          const option = Array.isArray(options) ? options.find(opt => opt.id === optionId) : null;
          if (showFeedback && showIncorrectFeedback) {
            if (option && option.feedbackText) {
              setFeedbackText(option.feedbackText);
            } else {
              const feedbackMessages = incorrectBlanks.map(blank => {
                const optId = filledBlanksToCheck[blank.id];
                const opt = Array.isArray(options) ? options.find(o => o.id === optId) : null;
                return opt?.feedbackText;
              }).filter(Boolean);

              setFeedbackText(feedbackMessages.join(' ') || 'Not quite right. Please try again.');
            }
          }
        } else {
          if (showFeedback && showIncorrectFeedback) {
            setFeedbackText('Not quite right. Please try again.');
          }
        }

        // Play wrong sound if available
        if (typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('wrong');
        }
      }
    }
  };

  // Helper function to get i18n text
  const getI18nText = (key, fallback) => {
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key, {}) || fallback;
    }
    return fallback;
  };

  // Render blank tiles
  const renderBlankTiles = () => {
    // Add wiggle animation keyframes if any blanks are wiggling
    const hasWigglingBlanks = wigglingUnfilledBlanks.size > 0;
    const hasWigglingWrongDropBlanks = wigglingWrongDropBlanks.size > 0;
    const wiggleKeyframes = hasWigglingBlanks ? `
      @keyframes wiggle-blank {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    ` : '';
    const wrongDropWiggleKeyframes = hasWigglingWrongDropBlanks ? `
      @keyframes wiggle-wrong-drop-blank {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    ` : '';

    // Check if any blank has borderBlink or bgBlink enabled
    const hasBlinkingBorders = blanks.some(blank => blank.borderBlink === true);
    const hasBlinkingBackgrounds = blanks.some(blank => blank.bgBlink === true);
    const blinkBorderKeyframes = hasBlinkingBorders ? `
      @keyframes blink-border {
        0%, 100% { border-color: var(--blink-border-start, #ffffff); }
        50% { border-color: var(--blink-border-end, #ff0000); }
      }
    ` : '';
    const blinkBgKeyframes = hasBlinkingBackgrounds ? `
      @keyframes blink-bg {
        0%, 100% { background-color: var(--blink-bg-start, #ffffff); }
        50% { background-color: var(--blink-bg-end, #ff0000); }
      }
    ` : '';

    const blankTiles = blanks.map(blank => {
      const blankPosition = getBlankTilePosition(blank.coordinate);
      const filledOptionId = filledBlanks[blank.id];
      const wrongDropOptionId = wrongDropPreviewByBlank[blank.id];
      const displayOptionId = filledOptionId || wrongDropOptionId;
      const hasTemporaryWrongPreview = Boolean(wrongDropOptionId && !filledOptionId);
      const filledOption = (displayOptionId && Array.isArray(options)) ? options.find(opt => opt.id === displayOptionId) : null;
      const isDragOver = draggedOverBlankId === blank.id;
      const isUnfilled = !filledBlanks[blank.id];
      const isWiggling = wigglingUnfilledBlanks.has(blank.id);
      const isWrongDropWiggling = wigglingWrongDropBlanks.has(blank.id);

      // Debug: Log blank text for troubleshooting
      if (blank.id === 'blank1') {
        console.log('🔍 Blank1 debug:', {
          blankId: blank.id,
          blankText: blank.text,
          hasText: blank.text !== undefined && blank.text !== null && blank.text !== '',
          isUnfilled: isUnfilled,
          filledOptionId: filledOptionId
        });
      }

      // Check if the filled option is correct for this blank
      // Normalize blankID to array of objects with bid and text
      const blankIDArray = filledOption ? normalizeBlankID(filledOption.blankID) : [];
      const matchingBlankIDObj = blankIDArray.find(obj => obj.bid === blank.id);
      const isCorrectlyFilled = filledOption && matchingBlankIDObj !== undefined;

      // Resolve image for any filled blank (not only when isCorrectlyFilled) so styling stays after navigation
      const filledImageSrc = filledOption
        ? ((matchingBlankIDObj && matchingBlankIDObj.image) || filledOption.image || '')
        : '';
      const imageOnlyFillBlank = optionImageFillsButton &&
        !!filledBlanks[blank.id] &&
        !!filledOption &&
        !!filledImageSrc &&
        !(filledOption.text && String(filledOption.text).trim()) &&
        !(matchingBlankIDObj?.text && String(matchingBlankIDObj.text).trim());

      // Prefilled blank.image (no user fill yet): match image-only stretch when options use fill-in-tray styling
      const hasNoDefaultText = blank.text === undefined || blank.text === null || blank.text === '';
      const prefilledImageFillBlank = optionImageFillsButton &&
        isUnfilled &&
        !!blank.image &&
        hasNoDefaultText;

      const blankCellImageFill = imageOnlyFillBlank || prefilledImageFillBlank;

      // Check if blank is droppable - filled blanks are not droppable
      const isDroppable = !filledBlanks[blank.id] && blank.isDroppable !== false; // Default to true if not specified, but filled blanks are not droppable

      // Use per-blank border color if provided, otherwise use global
      const finalBlankBorderColor = blank.borderColor || blankBorderColor;
      const hasImagePath = Boolean(blank.image || filledImageSrc);
      const blankBorderStyle = isCorrectlyFilled
        ? `solid ${processedBlankBorderWidth} #10b981`
        : `${hasImagePath ? 'solid' : blankBorderType} ${processedBlankBorderWidth} ${finalBlankBorderColor}`;

      // Determine background color - use per-blank bgColor if provided
      let backgroundColor = blank.bgColor || blank.backgroundColor || blankBackgroundColor;
      let backgroundStyle = {}; // For gradients
      if (mode === 'DND' && isDragOver && isDroppable) {
        backgroundColor = 'rgba(255, 255, 255, 0.2)';
      } else if (isCorrectlyFilled) {
        // If retainOptionButtonStyle is true, use the option's buttonColor
        if (retainOptionButtonStyle && filledOption?.buttonColor) {
          const optionColor = filledOption.buttonColor;
          // Check if it's a gradient
          const isGradient = typeof optionColor === 'string' && optionColor.includes('gradient');
          if (isGradient) {
            backgroundStyle = { background: optionColor };
            backgroundColor = undefined; // Don't set backgroundColor for gradients
          } else {
            backgroundColor = optionColor;
          }
        } else {
          backgroundColor = '#10b981'; // Green background when correctly filled
        }
      } else if (isUnfilled && isWiggling) {
        backgroundColor = '#fa8072'; // Salmon background for wiggling unfilled blanks
      } else if (!isDroppable && !(blank.bgColor || blank.backgroundColor)) {
        // Only apply gray background for non-droppable blanks if they don't have a custom bgColor
        backgroundColor = 'rgba(128, 128, 128, 0.3)'; // Gray background for non-droppable blanks
      }

      // Determine what to display
      let displayContent = null;

      if (filledOption && (filledBlanks[blank.id] || hasTemporaryWrongPreview)) {
        // Filled blank: show image whenever we can resolve a URL (correct or restored state)
        if (filledImageSrc) {
          displayContent = React.createElement('img', {
            src: filledImageSrc,
            alt: filledOption.text || '',
            style: imageOnlyFillBlank
              ? {
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'fill',
                marginBottom: '0',
                pointerEvents: 'none',
                userSelect: 'none',
                flex: '1 1 auto',
                minHeight: 0
              }
              : {
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }
          });
        } else {
          // Text fallback for both correct and temporary wrong-drop preview
          const textToDisplay = (isCorrectlyFilled ? matchingBlankIDObj?.text : null) || filledOption.text || '';
          const convertedText = convertLatexFractions(textToDisplay);
          const containsHTML = convertedText !== textToDisplay || /<[^>]+>/.test(convertedText);

          displayContent = containsHTML
            ? React.createElement('span', {
              dangerouslySetInnerHTML: { __html: convertedText },
              style: { textAlign: 'center', width: '100%' }
            })
            : React.createElement('span', {
              style: { textAlign: 'center', width: '100%' }
            }, convertedText);
        }
      }
      else if (mode === 'DND' && isDragOver) {
        // Show "Drop here" when dragging over in DND mode
        displayContent = getI18nText('common.labels.dropHere');
      } else if (isUnfilled) {
        // If not filled, check for default text or image
        if (blank.text !== undefined && blank.text !== null && blank.text !== '') {
          // Display default text - convert LaTeX fractions to HTML if needed
          const defaultText = blank.text;
          let convertedText = convertLatexFractions(defaultText);
          const containsHTML = convertedText !== defaultText || /<[^>]+>/.test(convertedText);
          const textColor = blank.fontColor || blank.color || blankFontColor;

          if (containsHTML) {
            // Remove any inline color/styles from HTML content to ensure our color is used
            let finalText = convertedText;
            // Remove color from style attributes
            finalText = finalText.replace(/style="([^"]*)"/gi, (match, styleContent) => {
              const cleanedStyle = styleContent.replace(/color\s*:\s*[^;]+;?/gi, '').trim();
              return cleanedStyle ? `style="${cleanedStyle}"` : '';
            });
            finalText = finalText.replace(/style='([^']*)'/gi, (match, styleContent) => {
              const cleanedStyle = styleContent.replace(/color\s*:\s*[^;]+;?/gi, '').trim();
              return cleanedStyle ? `style="${cleanedStyle}"` : '';
            });
            // Wrap content in a span with our color style
            finalText = `<span style="color: ${textColor} !important;">${finalText}</span>`;
            // Render HTML content using dangerouslySetInnerHTML
            displayContent = React.createElement('span', {
              style: {
                color: textColor,
                textAlign: 'center',
                display: 'block',
                width: '100%'
              },
              dangerouslySetInnerHTML: { __html: finalText }
            });
          } else {
            // Render plain text
            displayContent = convertedText;
          }
        } else if (blank.image) {
          // Display default image (same full-cell stretch as dropped image when optionImageFillsButton)
          displayContent = React.createElement('img', {
            src: blank.image,
            alt: blank.text || '',
            style: prefilledImageFillBlank
              ? {
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'fill',
                marginBottom: '0',
                pointerEvents: 'none',
                userSelect: 'none',
                flex: '1 1 auto',
                minHeight: 0
              }
              : {
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }
          });
        }
      }
      // Otherwise show nothing

      // Add wiggle animation style if wiggling (use longhand properties to avoid React warnings)
      const wiggleStyle = isWiggling ? {
        animationName: 'wiggle-blank',
        animationDuration: `${unfilledBlankWiggleDuration}ms`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 1
      } : {};
      const wrongDropWiggleStyle = isWrongDropWiggling ? {
        animationName: 'wiggle-wrong-drop-blank',
        animationDuration: '0.45s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 2
      } : {};

      // Use per-blank font color if provided, otherwise use global
      const finalBlankFontColor = blank.fontColor || blank.color || blankFontColor;

      // Add border blink animation if enabled
      // When blinking, we need to use borderColor instead of border to allow animation
      // Use longhand properties to avoid React warnings
      const borderBlinkStyle = blank.borderBlink === true ? {
        animationName: 'blink-border',
        animationDuration: '1s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        '--blink-border-start': finalBlankBorderColor,
        '--blink-border-end': finalBlankBorderColor === '#ffffff' ? '#ff0000' : '#ffffff',
        borderStyle: blankBorderType,
        borderWidth: processedBlankBorderWidth,
        borderColor: finalBlankBorderColor
      } : {};

      // Add background blink animation if enabled
      // Use longhand properties to avoid React warnings
      const bgBlinkStyle = blank.bgBlink === true ? {
        animationName: 'blink-bg',
        animationDuration: '1s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        '--blink-bg-start': backgroundColor,
        '--blink-bg-end': backgroundColor === '#ffffff' || backgroundColor === 'transparent' ? '#ff0000' : '#ffffff'
      } : {};

      // Highlight wrong-drop target blank border while wiggle preview runs.
      const wrongDropBorderStyle = isWrongDropWiggling ? {
        borderColor: '#fa8072'
      } : {};

      // If retainOptionButtonStyle is true and blank is correctly filled, remove blank styling
      const shouldRemoveBlankStyle = retainOptionButtonStyle && isCorrectlyFilled && filledOption?.buttonColor;

      const blankBorderRadiusValue = shouldRemoveBlankStyle || blankCellImageFill
        ? 'var(--border-radius-xl)'
        : '13px';

      return React.createElement('div', {
        key: `blank-${blank.id}`,
        'data-blank-id': blank.id, // Add for mouse-based drag detection
        onClick: () => handleBlankClick(blank.id),
        style: {
          ...blankPosition,
          // Remove border if retaining option button style
          ...(shouldRemoveBlankStyle ? { border: 'none' } : (blank.borderBlink === true ? {} : { border: blankBorderStyle })),
          // Use option button background if retaining style, otherwise use blank background
          ...(blank.bgBlink === true ? {} : (backgroundStyle.background ? backgroundStyle : { backgroundColor: backgroundColor })),
          borderRadius: blankBorderRadiusValue,
          display: 'flex',
          alignItems: blankCellImageFill ? 'stretch' : 'center',
          justifyContent: blankCellImageFill ? 'stretch' : 'center',
          cursor: !isDroppable ? 'not-allowed' : (isCorrectlyFilled ? 'pointer' : (mode === 'DND' && draggedOptionId ? 'copy' : 'default')),
          fontSize: processedBlankFontSize,
          color: finalBlankFontColor,
          boxSizing: 'border-box',
          padding: blankCellImageFill ? 0 : processedOptionMargin,
          ...(blankCellImageFill ? { overflow: 'hidden', minHeight: 0 } : {}),
          transition: 'background-color 0.2s ease',
          opacity: mode === 'DND' && isDragOver ? 0.8 : 1,
          transform: mode === 'DND' && isDragOver ? 'scale(1.05)' : 'scale(1)',
          ...wiggleStyle,
          ...wrongDropWiggleStyle,
          ...borderBlinkStyle,
          ...bgBlinkStyle,
          ...wrongDropBorderStyle
        }
      }, displayContent);
    });

    // Return blank tiles with animation styles if needed
    const animationStyles = [];
    if (hasWigglingBlanks && wiggleKeyframes) {
      animationStyles.push(
        React.createElement('style', {
          key: 'wiggle-blank-keyframes',
          dangerouslySetInnerHTML: { __html: wiggleKeyframes }
        })
      );
    }
    if (hasWigglingWrongDropBlanks && wrongDropWiggleKeyframes) {
      animationStyles.push(
        React.createElement('style', {
          key: 'wiggle-wrong-drop-blank-keyframes',
          dangerouslySetInnerHTML: { __html: wrongDropWiggleKeyframes }
        })
      );
    }
    if (hasBlinkingBorders && blinkBorderKeyframes) {
      animationStyles.push(
        React.createElement('style', {
          key: 'blink-border-keyframes',
          dangerouslySetInnerHTML: { __html: blinkBorderKeyframes }
        })
      );
    }
    if (hasBlinkingBackgrounds && blinkBgKeyframes) {
      animationStyles.push(
        React.createElement('style', {
          key: 'blink-bg-keyframes',
          dangerouslySetInnerHTML: { __html: blinkBgKeyframes }
        })
      );
    }

    if (animationStyles.length > 0) {
      return [...animationStyles, ...blankTiles];
    }

    return blankTiles;
  };

  // Render option tiles as buttons in a grid
  const renderOptionTiles = () => {
    const optionsContainerPos = getOptionsContainerPosition();
    if (!optionsContainerPos) return null;

    // Build border style based on showOptionsContainerBorder prop
    const optionBorderStyle = showOptionsContainerBorder
      ? `${optionsBorderType} ${processedOptionsBorderWidth} ${optionsBorderColor}`
      : 'none';

    const optionTrayPadding = optionImageFillsButton ? 0 : processedOptionPadding;
    const optionTrayGap = optionImageFillsButton ? 0 : processedOptionGap;
    const optionFrameGap = optionImageFillsButton ? '0px' : processedFrameGap;

    // Check if manual layout mode is enabled
    const isManualLayout = optionButtonLayoutMode === 'manual';

    // Calculate total grid cells needed (only for auto mode)
    const totalGridCells = isManualLayout ? 0 : optionsRows * optionsColumns;

    // Create grid cells - fill with options first, then empty cells
    const gridCells = [];

    // Add options to grid cells
    if (Array.isArray(options)) {
      options.forEach((option, index) => {
        if (isManualLayout || index < totalGridCells) {
          const isInWrongDropPreview = Object.values(wrongDropPreviewByBlank).includes(option.id) || temporarilyHiddenOptions.has(option.id);
          // Hard-hide source option during wrong-drop preview to prevent tray flicker.
          if (isInWrongDropPreview) {
            return;
          }
          const isSelected = selectedOptions.has(option.id);
          const isDragging = draggedOptionId === option.id;
          const isIncorrectlyClicked = incorrectlyClickedOptions.has(option.id);
          const isWiggling = wigglingOptions.has(option.id);

          // Check if option is correctly placed based on maxDrops
          let isCorrectlyPlaced = false;
          let isDisabled = false;

          // Determine max drops for this option: option.maxDrops > maxDropsPerOption > allowMultiBlankPlacement > default (1)
          const optionMaxDrops = option.maxDrops !== undefined ? option.maxDrops :
            (maxDropsPerOption !== null ? maxDropsPerOption :
              (allowMultiBlankPlacement ? null : 1));

          if (optionMaxDrops !== null) {
            // Use number-based drop count
            const placedBlanks = optionPlacements[option.id] || new Set();
            const dropCount = placedBlanks.size;
            const hasReachedMaxDrops = dropCount >= optionMaxDrops;

            isCorrectlyPlaced = hasReachedMaxDrops;
            isDisabled = hasReachedMaxDrops || isIncorrectlyClicked;
          } else if (allowMultiBlankPlacement) {
            // Legacy behavior: check if placed in all allowed blanks
            const blankIDArray = normalizeBlankID(option.blankID);
            const allowedBlankIds = blankIDArray.map(obj => obj.bid);
            const placedBlanks = optionPlacements[option.id] || new Set();
            const allAllowedBlanksFilled = allowedBlankIds.length > 0 &&
              allowedBlankIds.every(blankId => placedBlanks.has(blankId));

            isCorrectlyPlaced = allAllowedBlanksFilled;
            isDisabled = allAllowedBlanksFilled || isIncorrectlyClicked;
          } else {
            // Original behavior: disabled after first correct placement
            isCorrectlyPlaced = correctlyPlacedOptions.has(option.id);
            const allFillableBlanksFilled = isQuizActivityComplete(filledBlanks);
            isDisabled = isCorrectlyPlaced || isIncorrectlyClicked || allFillableBlanksFilled;
          }

          // Determine background color
          // Use option.buttonColor if available, otherwise fall back to optionButtonColor prop
          let backgroundColor = option.buttonColor || optionButtonColor;
          if (isCorrectlyPlaced) {
            // If keepOptionStyleWhenPlaced is true, keep original style; otherwise use default placed color
            if (!keepOptionStyleWhenPlaced) {
              backgroundColor = '#4a5568'; // Same as selected/clicked state
            }
            // If keepOptionStyleWhenPlaced is true, backgroundColor remains as the original option.buttonColor
          } else if (isIncorrectlyClicked) {
            backgroundColor = '#fa8072'; // salmon
          } else if (isWiggling) {
            backgroundColor = '#fa8072'; // salmon
          } else if (isSelected) {
            backgroundColor = '#4a5568';
          } else if (isDragging) {
            backgroundColor = '#3a4f6f';
          }

          // Check if backgroundColor is a gradient (needs to use 'background' property instead of 'backgroundColor')
          const isGradient = typeof backgroundColor === 'string' && backgroundColor.includes('gradient');
          const backgroundStyle = isGradient ? { background: backgroundColor } : { backgroundColor: backgroundColor };

          // Wiggle animation keyframes
          const wiggleKeyframes = `
          @keyframes wiggle-${option.id} {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `;

          // Add wiggle animation style if wiggling
          // Animation iteration is 0.5s (500ms), so calculate iterations based on wiggleDuration
          // Use longhand properties to avoid React warnings
          const animationIterations = (wiggleDuration / 500).toFixed(1);
          const wiggleAnimation = isWiggling ? {
            animationName: `wiggle-${option.id}`,
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: animationIterations
          } : {};

          // Determine if this option should be draggable
          const shouldBeDraggable = mode === 'DND' && !isDisabled;
          console.log(`🎯 [FillBlanks] Option ${option.id}: mode=${mode}, isCorrectlyPlaced=${isCorrectlyPlaced}, isIncorrectlyClicked=${isIncorrectlyClicked}, shouldBeDraggable=${shouldBeDraggable}`);

          // Create option button element - use 3-layer structure for MCQ mode, simple div for DND mode
          let optionElement;

          const optionHasImage = !!(option.image && String(option.image).trim() !== '');
          const optionHasText = !!(option.text && String(option.text).trim() !== '');
          const useFullButtonImage = optionImageFillsButton && optionHasImage && !optionHasText;
          const optionImageStyle = useFullButtonImage
            ? {
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'fill',
              marginBottom: '0',
              pointerEvents: 'none',
              userSelect: 'none',
              flex: '1 1 auto',
              minHeight: 0
            }
            : {
              maxWidth: '80%',
              maxHeight: '60%',
              objectFit: 'contain',
              marginBottom: option.text ? processedOptionMargin : '0',
              pointerEvents: 'none',
              userSelect: 'none'
            };

          if (mode === 'MCQ') {
            // MCQ mode: Use 3-layer button structure like Next button

            optionElement = React.createElement('div', {
              key: `option-${option.id}`,
              ref: (element) => {
                if (element) {
                  optionRefs.current[option.id] = element;
                } else {
                  delete optionRefs.current[option.id];
                }
              },
              className: `applet-button-container fill-blank-option-container ${option.id}-container${isDisabled ? ' disabled' : ''}`,
              'data-option-id': option.id,
              'data-mode': mode,
              onClick: !isDisabled ? () => handleOptionClick(option.id, option) : undefined,
              style: {
                ...backgroundStyle,
                borderRadius: 'var(--border-radius-xl)',
                border: 'none', // No border for MCQ buttons
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isDisabled ? 0.8 : 1,
                pointerEvents: isDisabled ? 'none' : 'auto',
                width: '100%',
                height: '100%',
                minHeight: processedOptionMinHeight,
                boxSizing: 'border-box',
                transition: 'all 0.2s ease',
                position: 'relative',
                ...(useFullButtonImage ? { overflow: 'hidden' } : {}),
                ...wiggleAnimation
              }
            }, [
              // Frame layer
              React.createElement('div', {
                key: 'frame',
                className: `applet-button-frame ${option.id}-frame`,
                style: {
                  position: 'absolute',
                  top: optionFrameGap,
                  left: optionFrameGap,
                  right: optionFrameGap,
                  bottom: optionFrameGap,
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: 1,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%)',
                  boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.3), inset 0 -1px 3px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }
              }),
              // Content layer
              React.createElement('div', {
                key: 'content',
                className: `applet-button-content ${option.id}-content`,
                style: {
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: processedOptionButtonFontSize,
                  color: optionButtonFontColor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  width: '100%',
                  height: '100%',
                  padding: useFullButtonImage ? 0 : processedOptionPadding,
                boxSizing: 'border-box',
                minHeight: useFullButtonImage ? 0 : undefined
              }
            }, [
                option.image && React.createElement('img', {
                  key: `option-image-${option.id}`,
                  src: option.image,
                  alt: option.text || '',
                  style: optionImageStyle
                }),
                option.text && (() => {
                  // Convert LaTeX fractions to HTML
                  const convertedText = convertLatexFractions(option.text);
                  // Check if text contains HTML (fractions or other HTML tags)
                  const containsHTML = convertedText !== option.text || /<[^>]+>/.test(convertedText);

                  return React.createElement('span', {
                    key: `option-text-${option.id}`,
                    style: {
                      pointerEvents: 'none',
                      userSelect: 'none'
                    },
                    ...(containsHTML ? { dangerouslySetInnerHTML: { __html: convertedText } } : {})
                  }, containsHTML ? null : convertedText);
                })()
              ])
            ]);
          } else {
            // DND mode: Use Draggable component with same UI structure as MCQ mode
            const Draggable = window.DraggableComponent?.Draggable;

            if (!Draggable) {
              console.warn('⚠️ [FillBlanks] Draggable component not found, falling back to div');
              const convertedText = convertLatexFractions(option.text || '');
              const containsHTML = convertedText !== (option.text || '') || /<[^>]+>/.test(convertedText);
              optionElement = React.createElement('div', {
                key: `option-${option.id}`,
                style: {
                  border: `${blankBorderType} ${processedBlankBorderWidth} ${blankBorderColor}`,
                  backgroundColor: backgroundColor,
                  borderRadius: processedOptionBorderRadius,
                  padding: processedOptionPadding,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: processedOptionButtonFontSize,
                  color: optionButtonFontColor
                },
                ...(containsHTML ? { dangerouslySetInnerHTML: { __html: convertedText } } : {})
              }, containsHTML ? null : convertedText);
            } else {
              // Check if option should be disabled from dragging
              // Use the isDisabled calculated earlier (which handles multi-blank placement)
              const shouldBeDisabled = isDisabled;

              // Use Draggable component with same UI structure as MCQ mode
              optionElement = React.createElement(Draggable, {
                key: `option-${option.id}`,
                draggableId: option.id,
                isDisabled: shouldBeDisabled,
                isAnimating: isWiggling,
                isAnyDragging: isDragging,
                currentDraggingId: draggedOptionId,
                onDragStart: (id, position) => {
                  // Clear previous feedback when drag starts (to show new feedback on drop)
                  if (feedbackState === 'incorrect' || feedbackState === 'correct') {
                    setFeedbackState(null);
                    setFeedbackText('');
                  }
                  setDraggedOptionId(id);
                  console.log('🚀 [FillBlanks] Drag started via Draggable:', id);
                },
                onDragMove: (id, position) => {
                  // Detect which blank is under cursor
                  const elementsAtPoint = document.elementsFromPoint(position.x, position.y);
                  let foundBlank = null;

                  for (const elem of elementsAtPoint) {
                    const blankId = elem.getAttribute('data-blank-id');
                    if (blankId) {
                      // Check if this blank is droppable
                      const blank = blanks.find(b => b.id === blankId);
                      const isDroppable = blank?.isDroppable !== false; // Default to true if not specified
                      if (isDroppable) {
                        foundBlank = blankId;
                        break;
                      }
                    }
                  }

                  setDraggedOverBlankId(foundBlank);
                },
                onDragEnd: (id, position) => {
                  const blankId = draggedOverBlankId;
                  const resetDragState = () => {
                    setDraggedOptionId(null);
                    setDraggedOverBlankId(null);
                  };

                  // Handle drop if over a blank
                  if (blankId) {
                    const option = Array.isArray(options) ? options.find(opt => opt.id === id) : null;
                    const blank = blanks.find(b => b.id === blankId);

                    // Check if blank is already filled - if so, disable it as a drop zone
                    // Don't allow placing the same option in the same blank twice (maxDrops counts unique blanks)
                    if (filledBlanks[blankId]) {
                      // If blank is already filled with this option, don't allow placing again (maxDrops counts unique blanks)
                      if (filledBlanks[blankId] === id) {
                        resetDragState();
                        return;
                      }
                      // If blank is filled with a different option, don't allow
                      resetDragState();
                      return;
                    }

                    // Check if blank is droppable
                    const isDroppable = blank?.isDroppable !== false; // Default to true if not specified
                    if (!isDroppable) {
                      // Blank is not droppable, do nothing
                      resetDragState();
                      return;
                    }

                    // Check if this is the correct blank for this option
                    const blankIDArray = normalizeBlankID(option?.blankID);
                    const isCorrect = option && blankIDArray.length > 0 && blankIDArray.some(obj => obj.bid === blankId);

                    if (isCorrect && blank) {
                      // Correct drop - fill blank, mark option as correctly placed
                      setFilledBlanks(prev => {
                        const newFilled = { ...prev };
                        // Check if option can be placed multiple times
                        const optionMaxDrops = option?.maxDrops !== undefined ? option.maxDrops :
                          (maxDropsPerOption !== null ? maxDropsPerOption :
                            (allowMultiBlankPlacement ? null : 1));

                        // Remove from any blank that has this option only if maxDrops is 1 (single drop)
                        if (optionMaxDrops === 1) {
                          Object.keys(newFilled).forEach(bId => {
                            if (newFilled[bId] === id) {
                              delete newFilled[bId];
                            }
                          });
                        }
                        // Add to current blank (allows multiple blanks for same option if maxDrops > 1)
                        newFilled[blankId] = id;

                        // Check if activity is complete using the updated state
                        const allFilled = isQuizActivityComplete(newFilled);

                        if (allFilled) {
                          // Dispatch quizCompleted event to enable next button
                          setTimeout(() => {
                            if (typeof window !== 'undefined') {
                              const enableNextEvent = new CustomEvent('quizCompleted', {
                                detail: {
                                  componentId: componentId,
                                  componentType: 'FillBlanksComponent',
                                  pageNumber: window.getCurrentPage?.() || null
                                }
                              });
                              window.dispatchEvent(enableNextEvent);
                              console.log('🔍 [FillBlanks] Dispatched quizCompleted event for componentId:', componentId);
                            }

                            // Update concept summary panel
                            updateConceptSummaryPanel();
                          }, 0);
                        }

                        return newFilled;
                      });

                      // Track placement for drop count support
                      setOptionPlacements(prev => {
                        const newPlacements = { ...prev };
                        if (!newPlacements[id]) {
                          newPlacements[id] = new Set();
                        }
                        newPlacements[id].add(blankId);
                        return newPlacements;
                      });

                      // Check if option has reached its max drops
                      const optionMaxDrops = option.maxDrops !== undefined ? option.maxDrops :
                        (maxDropsPerOption !== null ? maxDropsPerOption :
                          (allowMultiBlankPlacement ? null : 1));

                      if (optionMaxDrops !== null) {
                        // Use number-based drop count
                        const currentPlacements = optionPlacements[id] || new Set();
                        const newPlacements = new Set(currentPlacements);
                        newPlacements.add(blankId);
                        const dropCount = newPlacements.size;

                        if (dropCount >= optionMaxDrops) {
                          setCorrectlyPlacedOptions(prev => new Set(prev).add(id));
                        }
                      } else if (allowMultiBlankPlacement) {
                        // Legacy behavior: check if placed in all allowed blanks
                        const blankIDArray = normalizeBlankID(option?.blankID);
                        const allowedBlankIds = blankIDArray.map(obj => obj.bid);
                        const currentPlacements = optionPlacements[id] || new Set();
                        const newPlacements = new Set(currentPlacements);
                        newPlacements.add(blankId);
                        const allAllowedBlanksFilled = allowedBlankIds.length > 0 &&
                          allowedBlankIds.every(bId => newPlacements.has(bId));

                        if (allAllowedBlanksFilled) {
                          setCorrectlyPlacedOptions(prev => new Set(prev).add(id));
                        }
                      } else {
                        // Original behavior: mark as correctly placed immediately
                        setCorrectlyPlacedOptions(prev => new Set(prev).add(id));
                      }

                      const feedbackMessage = option.feedbackText || 'Correct!';
                      if (showFeedback) {
                        setFeedbackText(feedbackMessage);
                        setFeedbackState('correct');
                      }

                      // Dispatch event to update calculation steps for pages 11 and 12
                      if (pageId === 'page11' || pageId === 'page12') {
                        const updateStepEvent = new CustomEvent('updateCalculationStep', {
                          detail: {
                            stepIndex: 1,
                            newText: '<span style="white-space: nowrap; display: inline-block;">\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">112 ÷ \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</span><span style="display: block; padding: 0 2px;">20 ÷ \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</span></span> = $\\frac{28}{5}$</span>'
                          }
                        });
                        window.dispatchEvent(updateStepEvent);
                        console.log('🔍 [FillBlanks] Dispatched updateCalculationStep event for', pageId);
                      }

                      if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('correct');
                      }

                      // Check if all blanks are filled (using current state for event dispatch)
                      const currentFilledBlanks = { ...filledBlanks };
                      // Remove from any blank that has this option
                      Object.keys(currentFilledBlanks).forEach(bId => {
                        if (currentFilledBlanks[bId] === id) {
                          delete currentFilledBlanks[bId];
                        }
                      });
                      // Add to current blank
                      currentFilledBlanks[blankId] = id;
                      const allFilled = isQuizActivityComplete(currentFilledBlanks);

                      // Don't override feedback text when all blanks are filled
                      // Just show the option's feedback text
                      // The quizCompleted event will still be dispatched in the state update function

                      // Feedback persists until next event (no setTimeout)
                    } else {
                      // Incorrect drop - wiggle only inside wrong blank preview
                      // Snap option into wrong blank briefly, wiggle 3-4 times, then return to tray.
                      // Apply preview state before resetting drag state to avoid tray flicker.
                      setTemporarilyHiddenOptions(prev => new Set(prev).add(id));
                      setWrongDropPreviewByBlank(prev => ({ ...prev, [blankId]: id }));
                      setWigglingWrongDropBlanks(prev => new Set(prev).add(blankId));
                      // Defer drag-state reset by one frame so hidden state commits first.
                      requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                          resetDragState();
                        });
                      });
                      // Keep preview only for the wiggle duration, then return immediately.
                      const wrongDropPreviewDuration = 900; // 0.45s * 2 iterations
                      setTimeout(() => {
                        setWigglingWrongDropBlanks(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(blankId);
                          return newSet;
                        });
                        setWrongDropPreviewByBlank(prev => {
                          const next = { ...prev };
                          delete next[blankId];
                          return next;
                        });
                        setTemporarilyHiddenOptions(prev => {
                          const next = new Set(prev);
                          next.delete(id);
                          return next;
                        });
                      }, wrongDropPreviewDuration);

                      // Use option's feedbackText if available, otherwise use default
                      const feedbackMessage = option && option.feedbackText ? option.incorrectFeedback : 'Try a different blank';
                      if (showFeedback && showIncorrectFeedback) {
                        setFeedbackText(feedbackMessage);
                        setFeedbackState('incorrect');
                      }

                      if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('wrong');
                      }

                      // Feedback persists until next event (no setTimeout)
                    }
                    if (isCorrect) {
                      resetDragState();
                    }
                  }
                  if (!blankId) {
                    resetDragState();
                  }
                },
                className: `applet-button-container fill-blank-option-container ${option.id}-container${shouldBeDisabled ? ' disabled' : ''}`,
                'data-option-id': option.id,
                'data-mode': mode,
                style: {
                  ...backgroundStyle,
                  borderRadius: 'var(--border-radius-xl)',
                  border: 'none', // Same as MCQ mode
                  cursor: shouldBeDisabled ? 'not-allowed' : (isDragging && draggedOptionId === option.id ? 'grabbing' : 'grab'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: shouldBeDisabled ? 0.8 : 1,
                  pointerEvents: shouldBeDisabled ? 'none' : 'auto',
                  ...(useFullButtonImage ? { width: '100%', height: '100%', overflow: 'hidden' } : {}),
                  minHeight: processedOptionMinHeight,
                  boxSizing: 'border-box',
                  transition: isWiggling ? 'none' : 'all 0.2s ease',
                  position: 'relative',
                  ...wiggleAnimation
                }
              }, [
                // Frame layer (same as MCQ mode)
                React.createElement('div', {
                  key: 'frame',
                  className: `applet-button-frame ${option.id}-frame`,
                  style: {
                    position: 'absolute',
                    top: optionFrameGap,
                    left: optionFrameGap,
                    right: optionFrameGap,
                    bottom: optionFrameGap,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 1,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%)',
                    boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.3), inset 0 -1px 3px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease'
                  }
                }),
                // Content layer (same as MCQ mode)
                React.createElement('div', {
                  key: 'content',
                  className: `applet-button-content ${option.id}-content`,
                  style: {
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: processedOptionButtonFontSize,
                    color: optionButtonFontColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    ...(useFullButtonImage ? { width: '100%', height: '100%', minHeight: 0 } : {}),
                    padding: useFullButtonImage ? 0 : processedOptionPadding,
                    boxSizing: 'border-box'
                  }
                }, [
                  option.image && React.createElement('img', {
                    key: `option-image-${option.id}`,
                    src: option.image,
                    alt: option.text || '',
                    draggable: false,
                    onDragStart: (e) => e.preventDefault(),
                    style: optionImageStyle
                  }),
                  option.text && (() => {
                    // Convert LaTeX fractions to HTML
                    const convertedText = convertLatexFractions(option.text);
                    // Check if text contains HTML (fractions or other HTML tags)
                    const containsHTML = convertedText !== option.text || /<[^>]+>/.test(convertedText);

                    return React.createElement('span', {
                      key: `option-text-${option.id}`,
                      draggable: false,
                      onDragStart: (e) => e.preventDefault(),
                      style: {
                        pointerEvents: 'none',
                        userSelect: 'none'
                      },
                      ...(containsHTML ? { dangerouslySetInnerHTML: { __html: convertedText } } : {})
                    }, containsHTML ? null : convertedText);
                  })()
                ])
              ]);
            }
          }

          // In manual layout mode, wrap option element with absolute positioning
          let finalOptionElement = optionElement;
          if (isManualLayout && option.coordinate && Array.isArray(option.coordinate) && option.coordinate.length === 4) {
            const [x1, y1, x2, y2] = option.coordinate;

            // Debug: Log coordinate for all options to verify it's being read
            if (option.id === 'opt4') {
              console.log(`🔍 [FillBlanks] opt4 - Reading coordinate:`, option.coordinate, 'Full option:', option);
            }

            // Button coordinates are relative to the options container, not the page
            // Convert to percentages relative to the options container
            if (optionsContainerCoordinates && optionsContainerCoordinates.length === 4) {
              const [containerX1, containerY1, containerX2, containerY2] = optionsContainerCoordinates;

              // Calculate container dimensions
              const containerWidth = containerX2 - containerX1;
              const containerHeight = containerY2 - containerY1;

              // Convert button coordinates to be relative to container
              const relativeX1 = x1 - containerX1;
              const relativeY1 = y1 - containerY1;
              const relativeX2 = x2 - containerX1;
              const relativeY2 = y2 - containerY1;

              // Convert to percentages within the container
              // Coordinates are absolute page coordinates, so we convert them relative to the container
              const left = (relativeX1 / containerWidth) * 100;
              const top = (relativeY1 / containerHeight) * 100;
              const width = ((relativeX2 - relativeX1) / containerWidth) * 100;
              const height = ((relativeY2 - relativeY1) / containerHeight) * 100;

              // Debug logging for opt4
              if (option.id === 'opt4') {
                console.log(`🔍 [FillBlanks] opt4 coordinate transformation:`, {
                  original: [x1, y1, x2, y2],
                  container: [containerX1, containerY1, containerX2, containerY2],
                  containerDimensions: { width: containerWidth, height: containerHeight },
                  relative: [relativeX1, relativeY1, relativeX2, relativeY2],
                  percentages: {
                    left: `${left.toFixed(2)}%`,
                    top: `${top.toFixed(2)}%`,
                    width: `${width.toFixed(2)}%`,
                    height: `${height.toFixed(2)}%`
                  },
                  calculatedWidth: `${((relativeX2 - relativeX1) / containerWidth) * 100}%`,
                  calculatedHeight: `${((relativeY2 - relativeY1) / containerHeight) * 100}%`
                });
              }

              // Wrap option element in absolutely positioned container
              // Include coordinate in key to force re-render when coordinates change
              const coordinateKey = option.coordinate.join(',');
              const wrapperStyle = {
                position: 'absolute',
                left: `${left.toFixed(2)}%`,
                top: `${top.toFixed(2)}%`,
                width: `${width.toFixed(2)}%`,
                height: `${height.toFixed(2)}%`,
                zIndex: isDragging ? 1000 : 'auto',
                boxSizing: 'border-box'
              };

              // Debug logging for opt4
              if (option.id === 'opt4') {
                console.log(`🔍 [FillBlanks] opt4 wrapper style:`, wrapperStyle);
              }

              finalOptionElement = React.createElement('div', {
                key: `manual-wrapper-${option.id}-${coordinateKey}`,
                style: wrapperStyle
              }, optionElement);
            }
          }

          // Add wiggle style and option element to grid cells
          if (isWiggling) {
            gridCells.push(
              React.createElement('style', {
                key: `wiggle-style-${option.id}`,
                dangerouslySetInnerHTML: { __html: wiggleKeyframes }
              }),
              finalOptionElement
            );
          } else {
            // In DND mode, if this option is being dragged, add a placeholder to maintain grid layout
            if (mode === 'DND' && isDragging && draggedOptionId === option.id && !isManualLayout) {
              // Add placeholder to maintain grid position while dragging (only in auto mode)
              gridCells.push(
                React.createElement('div', {
                  key: `placeholder-${option.id}`,
                  style: {
                    width: '100%',
                    height: '100%',
                    opacity: 0, // Invisible placeholder
                    pointerEvents: 'none',
                    minHeight: processedOptionMinHeight
                  }
                }),
                finalOptionElement // The actual draggable element (position: fixed)
              );
            } else {
              gridCells.push(finalOptionElement);
            }
          }
        }
      });
    }

    // Fill remaining grid cells with empty divs to maintain grid structure (only in auto mode)
    if (!isManualLayout) {
      const optionsLength = Array.isArray(options) ? options.length : 0;
      for (let i = optionsLength; i < totalGridCells; i++) {
        gridCells.push(
          React.createElement('div', {
            key: `empty-cell-${i}`,
            style: {
              width: '100%',
              height: '100%'
            }
          })
        );
      }
    }

    // Calculate height percentages
    const instructionRowHeight = `${optionContainerInstructionHeight}%`;
    const optionTrayRowHeight = `${100 - optionContainerInstructionHeight}%`;

    // Create instruction row
    const instructionRow = React.createElement('div', {
      key: 'instruction-row',
      style: {
        width: '100%',
        height: instructionRowHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5%',
        boxSizing: 'border-box',
        borderBottom: showOptionsRowBorders
          ? `${optionsBorderType} ${processedOptionsBorderWidth} ${optionsBorderColor}`
          : 'none',
        fontSize: processedOptionButtonFontSize || '18px',
        color: optionContainerInstructionTextColor || '#ffffff',
        textAlign: 'center',
        fontWeight: '500'
      }
    }, optionContainerInstructionText);

    // Create option tray row with the existing grid or absolute positioning
    const optionTrayRow = React.createElement('div', {
      key: 'option-tray-row',
      style: {
        width: '100%',
        height: optionTrayRowHeight,
        ...(isManualLayout ? {
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'visible'
        } : {
          display: 'grid',
          gridTemplateRows: `repeat(${optionsRows}, 1fr)`,
          gridTemplateColumns: `repeat(${optionsColumns}, 1fr)`,
          gap: optionTrayGap,
          padding: optionTrayPadding,
          boxSizing: 'border-box',
          overflow: 'hidden',
          ...(optionImageFillsButton ? { borderRadius: 'var(--border-radius-xl)' } : {})
        })
      }
    }, gridCells);

    // Return container with two rows
    return React.createElement('div', {
      key: 'options-container',
      style: {
        ...optionsContainerPos,
        border: optionBorderStyle,
        backgroundColor: optionsBackgroundColor,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        ...(optionImageFillsButton ? {
          borderRadius: 'var(--border-radius-xl)',
          overflow: 'hidden'
        } : {})
      }
    }, [instructionRow, optionTrayRow]);
  };

  // Update global feedback state for feedback textbox component
  React.useEffect(() => {
    // Initialize global feedback state if it doesn't exist
    if (!window[feedbackStateKey]) {
      window[feedbackStateKey] = {
        text: '',
        mode: 'normal'
      };
    }

    // Don't override if state is already in summary mode (preserve initial summary state)
    const existingState = window[feedbackStateKey];
    if (existingState && existingState.mode === 'summary' && existingState.text) {
      // Preserve summary state - don't override with empty/normal
      return;
    }

    // Update global feedback state
    if (feedbackText && feedbackState) {
      window[feedbackStateKey].text = feedbackText;
      window[feedbackStateKey].mode = feedbackState === 'correct' ? 'correct' : 'incorrect';
    } else {
      // Only set to normal if not already in summary mode
      if (existingState && existingState.mode !== 'summary') {
        window[feedbackStateKey].text = '';
        window[feedbackStateKey].mode = 'normal';
      }
    }

    // Dispatch custom event to notify feedback textbox
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(feedbackEventName, {
        detail: {
          text: window[feedbackStateKey].text,
          mode: window[feedbackStateKey].mode
        }
      }));
    }
  }, [feedbackState, feedbackText, feedbackStateKey, feedbackEventName]);

  // Container style
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    position: 'absolute'
  };

  return React.createElement('div', {
    id: elementId,
    'data-component-type': 'FillBlanksComponent',
    'data-component-id': componentId,
    style: containerStyle
  }, [
    ...renderBlankTiles(),
    (showOptionsContainer && !(hideOptionsOnCorrect && feedbackState === 'correct')) ? renderOptionTiles() : null
  ]);
});

// Fill Blanks Element Configuration
const FillBlanksElement = {
  fillBlanks: {
    type: 'fill-blanks',
    coordinates: [0, 0, 1600, 900],
    zIndex: 'var(--z-content)',
    props: {
      blanks: [
        { id: 'blank1', coordinate: [100, 100, 200, 200], text: "", image: "" },
        { id: 'blank2', coordinate: [300, 100, 400, 200], text: "", image: "" }
      ],
      blankBorderWidth: '2gc',
      blankBorderColor: '#ffffff',
      blankBorderType: 'solid',
      blankBackgroundColor: 'transparent',
      blankFontSize: '24gc',
      blankFontColor: '#ffffff',
      optionsContainerCoordinates: [500, 100, 1000, 400],
      optionsBorderWidth: '2gc',
      optionsBorderColor: '#ffffff',
      optionsBorderType: 'dashed',
      optionsBackgroundColor: 'transparent',
      showOptionsContainer: true,
      optionButtonColor: '#2a3f5f',
      optionButtonFontSize: '24gc',
      optionButtonFontColor: '#ffffff',
      optionsRows: 2,
      optionsColumns: 2,
      options: [
        { id: 'opt1', text: 'Option 1', image: '', blankID: 'blank1', feedbackText: 'Correct!' },
        { id: 'opt2', text: 'Option 2', image: '', blankID: null, feedbackText: 'Try again.' }
      ]
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('fill-blanks', (props, elementId) => {
      return React.createElement(FillBlanksComponent, props);
    })
  }
};

// Export component and configuration
window.FillBlanksComponent = {
  FillBlanksComponent,
  FillBlanksElement
};

console.log('✅ Fill Blanks component loaded successfully');
