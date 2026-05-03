/**
 * Number Pad Component - React 18 Optimized
 * 
 * This file contains the number pad panel component with all its functionality
 */

// Dependencies: SharedUtilities, GridCellFontUtils, gridPositions, GridPrecisionConfig should be loaded before this file

/**
 * Number Pad Panel Component with correct layout and positioning
 */
const NumberPadPanelComponent = React.memo((props) => {
  const { currentPage, elementName, coordinates, elementProps, zIndex } = props;

  // Use the elementProps passed from the ElementRenderer
  console.log('🔢 [NumberPad] Received props:', { currentPage, elementName, elementProps });

  // Use a persistent ref stored on window to track previous values across re-mounts
  // This ensures state persists even if component is unmounted and remounted
  const componentKey = `numberPad_${elementName || 'default'}_${currentPage}`;
  if (!window.numberPadInstanceRefs) {
    window.numberPadInstanceRefs = {};
  }
  if (!window.numberPadInstanceRefs[componentKey]) {
    window.numberPadInstanceRefs[componentKey] = {
      mountTime: Date.now(),
      prevPage: currentPage,
      prevDestinationsLength: elementProps?.destinations?.length,
      prevDestinationIndex: elementProps?.destinationIndex,
      initialized: false,
      /** Survives React remounts so keypad stays disabled/grayed after final correct CHECK */
      padLockedAfterFinalCorrect: false,
      /** Page 4: after first correct CHECK, pad stays off until user taps clock face 2 */
      padLockedAwaitingClockTap: false,
      /** Pages 4–5 circumference lesson: last destination index (survives remount) */
      circumferenceLessonPadDestinationIndex: undefined
    };
  }
  const instanceRef = window.numberPadInstanceRefs[componentKey];
  if (
    instanceRef.circumferenceLessonPadDestinationIndex === undefined &&
    typeof instanceRef.page4PadDestinationIndex === 'number'
  ) {
    instanceRef.circumferenceLessonPadDestinationIndex = instanceRef.page4PadDestinationIndex;
  }
  if (instanceRef.padLockedAfterFinalCorrect === undefined) {
    instanceRef.padLockedAfterFinalCorrect = false;
  }
  if (instanceRef.padLockedAwaitingClockTap === undefined) {
    instanceRef.padLockedAwaitingClockTap = false;
  }

  const defaultConfig = {
    backgroundColor: 'transparent',
    borderRadius: '15gc',
    border: '4px solid #FFAB40',
    padding: '15gc',
    layout: 'vertical',            // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
    buttonConfig: 1,               // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
    enableClickSound: true,        // Enable click sound for number pad buttons (default: true)
    inputMode: 'append',           // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
    maxNumber: null,               // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
    feedbackMode: 'feedback',       // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
    feedbackComponentId: null,     // ID of external feedback component to update when check is pressed (e.g., 'page2-feedback-textbox')
    setFocusOnLoad: false,         // If true, set destination cell to 'focus' mode on component load
    destinations: [],              // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
    destinationIndex: 0,           // Current index in destinations array (starts at 0)
    /** When current destination is circumference-step, limit how many digit characters are kept (e.g. 2 for minutes 0–59); null = no limit */
    circumferenceStepMaxInputDigits: null,
    /** When true (default), after CHECK is correct on the last destination, keypad + CHECK are disabled and grayed out */
    disablePadAfterFinalCorrect: true,
    // Height percentages for layout sections
    feedbackRowHeight: '35%',      // Height percentage for feedback text area
    buttonGridHeight: '51%',       // Height percentage for number pad grid
    checkButtonHeight: '10%',      // Height percentage for check button
    showButton: {
      backgroundColor: '#FFD700',
      color: '#000000',
      fontSize: '35gc',         // Hint button text size
      fontWeight: 'bold',
      get text() {
        return typeof i18n !== 'undefined'
          ? i18n.t('numberPad.showHintButton')
          : '';
      },
    },
    numberButtons: {
      backgroundColor: '#FFAB40',
      color: '#000000',
      fontSize: '30gc',          // Text size inside buttons
      fontWeight: 'bold',
      borderRadius: '6gc',
      border: '2px solid #FF9900',
      margin: '3gc',
      // New customizable props
      buttonSize: '50gc',        // Overall button size (width & height) - deprecated, use buttonWidthPercent/buttonHeightPercent
      buttonWidthPercent: '90%', // Width percentage of grid cell (default: 90%)
      buttonHeightPercent: '90%', // Height percentage of grid cell (default: 90%)
      rowGap: '3gc',            // Gap between button rows
      columnGap: '3gc'          // Gap between button columns
    },
    checkButton: {
      backgroundColor: '#FF8C00',
      color: '#000000',
      fontSize: '25gc',         // Check button font size
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '3px solid #FF6347',
      get text() {
        return typeof i18n !== 'undefined'
          ? i18n.t('numberPad.checkButton')
          : '';
      },
      height: '60gc',
      marginTop: '10gc'
    },
    feedbackTextArea: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      fontSize: '30gc',         // Feedback text size (increased by 20% from 25gc)
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '2px dashed #ffffff',
      padding: '10gc',
      textAlign: 'center',
      display: 'flex',
      height: '60gc',
      defaultText: ''           // Default text to display in feedback area
    }
  };

  // Merge defaultConfig with elementProps (elementProps takes precedence)
  const config = { ...defaultConfig, ...(elementProps || {}) };

  const padDomId = String(elementProps?.id || elementName || '');
  const isPage4NumberPad = padDomId === 'page4-number-pad';
  const circumferenceLessonPadMatch = padDomId.match(/^page(\d+)-number-pad$/);
  const circumferenceLessonPadPage =
    circumferenceLessonPadMatch != null ? Number(circumferenceLessonPadMatch[1]) : null;
  const isCircumferenceLessonPad =
    circumferenceLessonPadPage != null &&
    currentPage === circumferenceLessonPadPage &&
    (circumferenceLessonPadPage === 4 || circumferenceLessonPadPage === 8);

  const setPage4NextButtonEnabled = React.useCallback((nextHour, completedHour) => {
    if (!isPage4NumberPad || typeof window === 'undefined') return;
    if (typeof window.setPage4LessonPendingNextHour === 'function') {
      window.setPage4LessonPendingNextHour({ nextHour, completedHour });
    }
    window.dispatchEvent(
      new CustomEvent('page4LessonNextEnabled', {
        detail: { pageNumber: 4 },
      })
    );
  }, [isPage4NumberPad]);

  const setPage4NextButtonDisabled = React.useCallback(() => {
    if (!isPage4NumberPad || typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('page4LessonNextDisabled', {
        detail: { pageNumber: 4 },
      })
    );
  }, [isPage4NumberPad]);

  // Log initial config to debug destinationId
  React.useEffect(() => {
    console.log(`🔍 [NumberPad] Component initialized with config:`, {
      destinationId: config.destinationId,
      elementPropsDestinationId: elementProps?.destinationId,
      allConfigKeys: Object.keys(config || {}),
      elementPropsKeys: Object.keys(elementProps || {})
    });
  }, []);

  // State for user input value (what they're typing)
  const [inputValue, setInputValue] = React.useState('');
  // State for feedback message (shown when check is pressed)
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  // Default text to show when there's no feedback and no input
  const defaultFeedbackText = config.feedbackTextArea?.defaultText || '';
  // State for current destination index (starts at 0 on app load)
  const [currentDestinationIndex, setCurrentDestinationIndex] = React.useState(() => {
    const fromConfig = config.destinationIndex !== undefined ? config.destinationIndex : 0;
    if (
      isCircumferenceLessonPad &&
      typeof instanceRef.circumferenceLessonPadDestinationIndex === 'number' &&
      instanceRef.circumferenceLessonPadDestinationIndex >= 0
    ) {
      return instanceRef.circumferenceLessonPadDestinationIndex;
    }
    return fromConfig;
  });
  // State to track if last check was incorrect (used to set focus mode on next number click)
  const [lastCheckWasIncorrect, setLastCheckWasIncorrect] = React.useState(false);
  const [padLockedAfterCorrect, setPadLockedAfterCorrect] = React.useState(() =>
    Boolean(instanceRef.padLockedAfterFinalCorrect)
  );
  const [padLockedAwaitingClockTap, setPadLockedAwaitingClockTap] = React.useState(() =>
    Boolean(instanceRef.padLockedAwaitingClockTap)
  );

  React.useEffect(() => {
    if (!isCircumferenceLessonPad) return;
    instanceRef.circumferenceLessonPadDestinationIndex = currentDestinationIndex;
  }, [isCircumferenceLessonPad, currentDestinationIndex]);

  const padInteractionLocked =
    padLockedAwaitingClockTap ||
    (config.disablePadAfterFinalCorrect !== false && padLockedAfterCorrect);

  const padLockedVisualStyle = padInteractionLocked
    ? {
      opacity: 0.48,
      filter: 'grayscale(1)',
      pointerEvents: 'none',
      userSelect: 'none',
      transition: 'opacity 0.2s ease, filter 0.2s ease'
    }
    : {};

  // Helper function to update destination visual mode (table cells or tiles)
  const updateDestinationCellMode = React.useCallback((destinationId, mode) => {
    if (!destinationId) {
      console.warn(`⚠️ [NumberPad] No destinationId provided for cell mode update`);
      return;
    }

    try {
      // 0) Try treating destinationId as a tile id/name first, using window.updateTileStyle
      //    This supports tiles like 'page2-tile-1' without any special destinationType.
      if (typeof window !== 'undefined' && typeof window.updateTileStyle === 'function') {
        const tileElementById = document.getElementById(destinationId);
        const tileElementByName = tileElementById || document.querySelector(`[data-element-name="${destinationId}"]`);

        if (tileElementByName) {
          let tileStyles = {};
          switch (mode) {
            case 'focus':
              tileStyles = {
                backgroundColor: '#FFEB3B', // same as TileComponent focus
                borderColor: '#FFFFFF',
                color: '#000000'
              };
              break;
            case 'correct':
              tileStyles = {
                backgroundColor: '#4CAF50',
                borderColor: '#45a049',
                color: '#FFFFFF'
              };
              break;
            case 'incorrect':
              tileStyles = {
                backgroundColor: '#FA8072',
                borderColor: '#E9967A',
                color: '#FFFFFF'
              };
              break;
            default:
              tileStyles = {};
          }

          if (Object.keys(tileStyles).length > 0) {
            window.updateTileStyle(destinationId, tileStyles);
            console.log(`✅ [NumberPad] Updated tile styles for ${destinationId} to mode "${mode}"`, tileStyles);
          }
        }
      }

      // 1) Existing behaviour for table cells (IDs like page2-map-table-R1C1)
      // Extract table component ID from destinationId (e.g., 'page2-map-table-R1C1' -> 'page2-map-table')
      const cellIdMatch = destinationId.match(/^(.+?)-R\d+C\d+$/);
      const isNonTableDestinationOk =
        typeof destinationId === 'string' &&
        (/-clock$/i.test(destinationId) ||
          /^page\d+-clock$/i.test(destinationId) ||
          /-tile$/i.test(destinationId));
      if (!cellIdMatch) {
        if (!isNonTableDestinationOk) {
          console.warn(`⚠️ [NumberPad] Could not extract table component ID from destinationId (may be a tile): ${destinationId}`);
        }
        // For non-table IDs we still updated styles above (if possible), so just continue to DOM attribute update below.
      } else {
        const tableComponentId = cellIdMatch[1];
        console.log(`🔍 [NumberPad] Extracted table component ID: ${tableComponentId} from destinationId: ${destinationId}`);

        // Get the cell mode update callback for this table component
        if (typeof window !== 'undefined' && window.tableGridModeCallbacks && window.tableGridModeCallbacks[tableComponentId]) {
          window.tableGridModeCallbacks[tableComponentId](destinationId, mode);
          console.log(`✅ [NumberPad] Updated cell mode for ${destinationId} to ${mode}`);
        } else {
          console.warn(`⚠️ [NumberPad] No cell mode callback found for table component: ${tableComponentId}`);
          console.log(`🔍 [NumberPad] Available table mode callbacks:`, Object.keys(window.tableGridModeCallbacks || {}));
        }
      }

      // 2) Also update the destination element directly with data attribute
      try {
        let destinationElement = document.getElementById(destinationId);
        if (!destinationElement) {
          destinationElement = document.querySelector(
            `[data-element-name="${destinationId}"]`,
          );
        }
        if (destinationElement) {
          destinationElement.setAttribute('data-cell-mode', mode);
          console.log(`✅ [NumberPad] Set data-cell-mode="${mode}" on destination element ${destinationId}`);

          // Dispatch custom event to notify the destination element
          destinationElement.dispatchEvent(new CustomEvent('cellModeUpdated', {
            detail: { mode, destinationId },
            bubbles: true
          }));
          console.log(`✅ [NumberPad] Dispatched cellModeUpdated event to ${destinationId}`);
        } else {
          console.warn(`⚠️ [NumberPad] Destination element not found: ${destinationId}`);
        }
      } catch (domError) {
        console.error(`❌ [NumberPad] Error updating destination element ${destinationId}:`, domError);
      }
    } catch (error) {
      console.error(`❌ [NumberPad] Error updating cell mode for ${destinationId}:`, error);
    }
  }, []);

  // Page 4: tapping clock face re-enables pad and targets circumference step
  React.useEffect(() => {
    const padId = String(elementProps?.id ?? elementName ?? '');
    if (padId !== 'page4-number-pad' || currentPage !== 4) return;
    const handler = (e) => {
      if (e?.detail?.padId !== padId) return;
      instanceRef.padLockedAfterFinalCorrect = false;
      setPadLockedAfterCorrect(false);
      instanceRef.padLockedAwaitingClockTap = false;
      setPadLockedAwaitingClockTap(false);
      const dests = config.destinations || [];
      const th = e?.detail?.targetHour;
      const idx =
        typeof th === 'number' && th >= 1 ? Math.min(th - 1, Math.max(0, dests.length - 1)) : 0;
      setCurrentDestinationIndex(idx);
      setInputValue('');
      setFeedbackMessage('');
      setLastCheckWasIncorrect(false);
      const rootStyles = getComputedStyle(document.documentElement);
      setTextAreaColors({
        color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
        backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
        borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
      });
      const d = dests[idx];
      if (d?.destinationId) {
        try {
          updateDestinationCellMode(d.destinationId, 'focus');
        } catch (_) {
          /* optional visual focus */
        }
      }
    };
    window.addEventListener('numberPadCircumferenceActivateStep2', handler);
    return () => window.removeEventListener('numberPadCircumferenceActivateStep2', handler);
  }, [currentPage, elementName, elementProps?.id, config.destinations, updateDestinationCellMode]);

  // Set destination cell to focus mode on load if setFocusOnLoad is enabled
  React.useEffect(() => {
    if (config.setFocusOnLoad) {
      const destinations = config.destinations || [];
      if (destinations.length > 0) {
        const initialDestinationIndex = config.destinationIndex !== undefined ? config.destinationIndex : 0;
        const initialDestination = destinations[initialDestinationIndex];
        if (initialDestination?.destinationId) {
          // Small delay to ensure table component is ready
          setTimeout(() => {
            updateDestinationCellMode(initialDestination.destinationId, 'focus');
            console.log(`🎯 [NumberPad] Set destination cell to focus mode on load: ${initialDestination.destinationId}`);
          }, 100);
        }
      }
    }
  }, []); // Run only once on mount

  // Reset destination index when page changes or destinations array changes
  // Use window-stored instanceRef to track previous values (persists across re-mounts)
  React.useEffect(() => {
    // On first initialization, just set the refs and don't clear input
    if (!instanceRef.initialized) {
      instanceRef.initialized = true;
      instanceRef.prevPage = currentPage;
      instanceRef.prevDestinationsLength = config.destinations?.length;
      instanceRef.prevDestinationIndex = config.destinationIndex;
      console.log(`🔄 [NumberPad] Initial mount - Set refs:`, {
        page: currentPage,
        destinationsLength: config.destinations?.length,
        destinationIndex: config.destinationIndex
      });
      return; // Don't reset on initial mount
    }

    // Check if page, destinations length, or destinationIndex actually changed
    const pageChanged = instanceRef.prevPage !== currentPage;
    const destinationsLengthChanged = instanceRef.prevDestinationsLength !== config.destinations?.length;
    const destinationIndexChanged = instanceRef.prevDestinationIndex !== config.destinationIndex;

    if (pageChanged || destinationsLengthChanged || destinationIndexChanged) {
      const nextIdx = config.destinationIndex !== undefined ? config.destinationIndex : 0;
      setCurrentDestinationIndex(nextIdx);
      if (isCircumferenceLessonPad) {
        instanceRef.circumferenceLessonPadDestinationIndex = nextIdx;
      }
      setInputValue(''); // Clear input only when page/destinations actually change
      instanceRef.padLockedAfterFinalCorrect = false;
      setPadLockedAfterCorrect(false);
      instanceRef.padLockedAwaitingClockTap = false;
      setPadLockedAwaitingClockTap(false);
      console.log(`🔄 [NumberPad] Reset destination index to: ${config.destinationIndex !== undefined ? config.destinationIndex : 0}`, {
        pageChanged,
        destinationsLengthChanged,
        destinationIndexChanged,
        prevPage: instanceRef.prevPage,
        currentPage,
        prevDestinationsLength: instanceRef.prevDestinationsLength,
        currentDestinationsLength: config.destinations?.length
      });

      const nextDestination = config.destinations?.[nextIdx];
      if (nextDestination?.destinationId) {
        try {
          updateDestinationCellMode(nextDestination.destinationId, 'focus');
        } catch (_) {
          /* optional visual reset */
        }
      }

      // Update instance refs
      instanceRef.prevPage = currentPage;
      instanceRef.prevDestinationsLength = config.destinations?.length;
      instanceRef.prevDestinationIndex = config.destinationIndex;
    }
  }, [currentPage, config.destinationIndex, config.destinations?.length, isCircumferenceLessonPad]);
  const [textAreaColors, setTextAreaColors] = React.useState(() => {
    // Initialize with config colors if provided, otherwise use CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    return {
      color: config.feedbackTextArea?.color || rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
      backgroundColor: config.feedbackTextArea?.backgroundColor || rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
      borderColor: config.feedbackTextArea?.borderColor || rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
    };
  });

  // Handle number button clicks
  const handleNumberClick = (number) => {
    console.log(`🔢 [NumberPad] Number ${number} clicked`);

    if (padInteractionLocked) {
      return;
    }

    setPage4NextButtonDisabled();

    if (typeof window !== 'undefined' && isCircumferenceLessonPad) {
      const pn = window.getCurrentPage?.() ?? currentPage;
      window.dispatchEvent(new CustomEvent('numberPadCircumferenceDigitEntered', {
        detail: { pageNumber: pn, digit: number, padId: padDomId }
      }));
    }

    // Try multiple ways to call the number click handler
    if (elementProps?.onNumberClick) {
      elementProps.onNumberClick(number);
    } else if (config?.onNumberClick) {
      config.onNumberClick(number);
    } else {
      // Fallback: Call the PageConfig handler directly
      console.log('🔄 [NumberPad] Using fallback number click handler');

      // Play click sound for number pad (if enabled)
      if (config.enableClickSound !== false && typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('numberpad');
      }

      const recoveringFromIncorrect = lastCheckWasIncorrect;

      // If last check was incorrect, set destination cell mode to 'focus' when user starts typing again
      if (recoveringFromIncorrect) {
        const destinations = config.destinations || [];
        const currentDestination = destinations[currentDestinationIndex];
        if (currentDestination?.destinationId) {
          updateDestinationCellMode(currentDestination.destinationId, 'focus');
          console.log(`🎯 [NumberPad] Set destination cell to focus mode after incorrect check`);
        }
        setLastCheckWasIncorrect(false);
      }

      // Update input value with the number based on input mode (clear feedback message)
      setFeedbackMessage(''); // Clear any feedback message when user starts typing

      // Restore feedback textbox default look (CHECK incorrect leaves salmon/red styling on the area)
      if (recoveringFromIncorrect && (config.feedbackMode || 'feedback') === 'feedback') {
        const rootStyles = getComputedStyle(document.documentElement);
        setTextAreaColors({
          color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
          backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
          borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
        });
      }

      const inputMode = config.inputMode || 'append';
      const maxNumber = config.maxNumber;

      const destinationsForMode = config.destinations || [];
      const curDestForMode = destinationsForMode[currentDestinationIndex];
      const isCircumferenceStepForMode = curDestForMode?.destinationType === 'circumference-step';
      const isTileForMode = curDestForMode?.destinationType === 'tile';

      // Check maxNumber limit in append mode (after incorrect CHECK, next digit starts fresh for tile / circumference-step)
      if (inputMode === 'append' && maxNumber !== null && maxNumber !== undefined) {
        const currentText = typeof inputValue === 'string' ? inputValue : '';
        const probeText =
          recoveringFromIncorrect && (isCircumferenceStepForMode || isTileForMode)
            ? number.toString()
            : currentText + number.toString();
        const newNumber = parseFloat(probeText);

        // Check if the new number would exceed maxNumber
        if (!isNaN(newNumber) && newNumber > maxNumber) {
          console.log(`⚠️ [NumberPad] Number ${newNumber} exceeds maxNumber ${maxNumber}, preventing input`);

          // Play wrong sound
          if (typeof window !== 'undefined' && window.playAnswerSound) {
            window.playAnswerSound(false);
          }

          // Don't update input value
          return;
        }
      }

      setInputValue(prev => {
        const currentText = typeof prev === 'string' ? prev : '';
        const destinations = config.destinations || [];
        const curDest = destinations[currentDestinationIndex];
        const isCircumferenceStep = curDest?.destinationType === 'circumference-step';
        const isTileDest = curDest?.destinationType === 'tile';
        const maxCircDigitsRaw = config.circumferenceStepMaxInputDigits;
        const maxCircDigits =
          maxCircDigitsRaw != null && Number.isFinite(Number(maxCircDigitsRaw)) && Number(maxCircDigitsRaw) > 0
            ? Math.min(20, Math.floor(Number(maxCircDigitsRaw)))
            : null;

        let mode = inputMode;
        if (isCircumferenceStep && maxCircDigits != null && maxCircDigits > 1) {
          mode = 'append';
        }

        let newText;
        if (recoveringFromIncorrect && (isCircumferenceStep || isTileDest)) {
          newText = number.toString();
          console.log(
            `📝 [NumberPad] Reset after incorrect (${isCircumferenceStep ? 'circumference' : 'tile'}): "${currentText}" -> "${newText}"`
          );
        } else if (mode === 'replace') {
          newText = number.toString();
          console.log(`📝 [NumberPad] Replace mode: "${currentText}" -> "${newText}"`);
        } else {
          newText = currentText + number.toString();
          console.log(`📝 [NumberPad] Append mode: "${currentText}" -> "${newText}"`);
        }

        if (isCircumferenceStep && maxCircDigits != null) {
          const digitsOnly = newText.replace(/\D/g, '');
          newText = digitsOnly.slice(0, maxCircDigits);
        }

        return newText;
      });

      // Update the answer state - simplified without state management
      if (typeof window !== 'undefined') {
        const currentIndex = window.currentQuestionIndex || 0;
        const currentQuestion = { missing: 'subtrahend' };

        // State management removed - direct DOM updates only
        console.log(`📝 [NumberPad] Number ${number} entered for minuend`);

        // Update answer container by updating DOM directly (no re-render needed)
        const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
        if (answerContainer) {
          const currentIndex = window.currentQuestionIndex || 0;
          const minuend = 5;
          const subtrahend = 3;
          // Get user answer directly from DOM or use entered number
          const userAnswer = number.toString();

          // Create the display text with tile format (15% bigger)
          const tileWidth = Math.round(60 * 1.15); // 69px
          const tileHeight = Math.round(60 * 1.15); // 69px
          const fontSize = Math.round(35 * 1.15); // 40px
          const lineHeight = tileHeight - 6; // Adjust for border

          let displayText = '';
          const equationText = typeof i18n !== 'undefined' ?
            i18n.t('subtraction.page2.answerEquation', { subtrahend, minuend }) :
            `Subtracting ${subtrahend} from ${minuend} gives`;

          if (userAnswer === '') {
            // Show equation with empty answer box
            displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #F5F5F5; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px;"></span>`;
          } else {
            // Show equation with user's answer in the box
            displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #FFFFFF; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px; font-weight: bold; color: #000000;">${userAnswer}</span>`;
          }

          answerContainer.innerHTML = displayText;
          console.log('📝 [NumberPad] Answer container updated directly:', displayText);
        }

        // Single React re-render to update equation tiles (consolidated)
        if (typeof window.forceAppUpdate === 'function') {
          window.forceAppUpdate();
          console.log('✅ [NumberPad] Triggered single React re-render for equation tiles');
        }
      }
    }
  };
  const handleClearAll = () => {
    console.log('🧹 [NumberPad] Clear All clicked');

    if (padInteractionLocked) {
      return;
    }

    setPage4NextButtonDisabled();

    if (config.enableClickSound !== false && window.playCarClickSound) {
      window.playCarClickSound('numberpad');
    }

    setFeedbackMessage('');
    setInputValue('');

    // Reset destination text
    updateDestinationText('');
  };

  const handleBackspace = () => {
    console.log('⬅️ [NumberPad] Backspace clicked');

    if (padInteractionLocked) {
      return;
    }

    setPage4NextButtonDisabled();

    if (config.enableClickSound !== false && window.playCarClickSound) {
      window.playCarClickSound('numberpad');
    }

    setFeedbackMessage('');
    setInputValue(prev =>
      typeof prev === 'string' && prev.length > 0 ? prev.slice(0, -1) : prev
    );
  };

  // Handle check button click - Compare entered value with correctValue prop
  const handleCheckClick = () => {
    console.log('🔄 [NumberPad] Check button clicked');

    if (elementProps?.onCheckClick) {
      elementProps.onCheckClick();
    } else if (config?.onCheckClick) {
      config.onCheckClick();
    } else {
      // Fallback: Compare entered value with correctValue prop
      console.log('🔄 [NumberPad] Using correctValue comparison logic');

      if (padInteractionLocked) {
        return;
      }

      // Play click sound
      if (typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('check');
      }

      // Get user's entered value from input value (not feedback message)
      const userEnteredValue = inputValue?.trim() || '';

      // Get current destination from destinations array
      const destinations = config.destinations || [];
      if (destinations.length === 0) {
        console.warn('⚠️ [NumberPad] No destinations configured, skipping validation');
        return;
      }

      const currentDestination = destinations[currentDestinationIndex];
      if (!currentDestination) {
        console.warn(`⚠️ [NumberPad] No destination at index ${currentDestinationIndex}, skipping validation`);
        return;
      }

      const usesDerivedTickMinutes =
        currentDestination.destinationType === 'circumference-step' &&
        currentDestination.correctValueFromCircumferenceTick === true;
      let correctValue = currentDestination.correctValue;
      if (usesDerivedTickMinutes) {
        const h = Number(currentDestination.circumferenceClockHour);
        if (Number.isFinite(h) && h >= 1 && h <= 12) {
          correctValue = String((h % 12) * 5);
        }
      }
      const correctFeedback = currentDestination.correctFeedback || (typeof i18n !== 'undefined' ? i18n.t('numberPad.feedback.correct') : 'Correct! Well done!');
      const incorrectFeedback = currentDestination.incorrectFeedback || (typeof i18n !== 'undefined' ? i18n.t('numberPad.feedback.incorrect') : 'Incorrect. Please try again.');

      console.log(`🔍 [NumberPad] User entered: "${userEnteredValue}" (type: ${typeof userEnteredValue})`);
      console.log(`🔍 [NumberPad] Current destination index: ${currentDestinationIndex}`);
      console.log(`🔍 [NumberPad] Correct value: ${correctValue} (type: ${typeof correctValue})`);

      // If no correctValue is set, skip validation (derived tick minutes fills correctValue above)
      if (correctValue === null || correctValue === undefined) {
        console.warn(`⚠️ [NumberPad] No correctValue configured for destination at index ${currentDestinationIndex}, skipping validation`);
        return;
      }

      // If user hasn't entered anything, show error
      if (!userEnteredValue) {
        const feedbackText = typeof i18n !== 'undefined' ?
          i18n.t('numberPad.feedback.empty') :
          'Please enter a value';
        console.log('❌ [NumberPad] No value entered');

        // Play error sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(false);
        }

        // Update feedback in number pad text area only if feedbackMode is 'feedback'
        const feedbackMode = config.feedbackMode || 'feedback';
        if (feedbackMode === 'feedback' && typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(feedbackText, 'incorrect');
        }

        // Update external feedback component
        const feedbackComponentId = config.feedbackComponentId || elementProps?.feedbackComponentId;
        if (feedbackComponentId) {
          try {
            const pageMatch = feedbackComponentId.match(/page(\d+)/);
            const pageId = pageMatch ? `page${pageMatch[1]}` : null;

            if (pageId) {
              const feedbackStateKey = `${pageId}FeedbackState`;
              const feedbackEventName = `${pageId}FeedbackUpdate`;

              if (!window[feedbackStateKey]) {
                window[feedbackStateKey] = { text: '', mode: 'normal' };
              }

              window[feedbackStateKey].text = feedbackText;
              window[feedbackStateKey].mode = 'incorrect';

              window.dispatchEvent(new CustomEvent(feedbackEventName, {
                detail: { text: feedbackText, mode: 'incorrect' }
              }));

              console.log(`✅ [NumberPad] Updated external feedback component ${feedbackComponentId}:`, { text: feedbackText, mode: 'incorrect' });
            }
          } catch (error) {
            console.error(`❌ [NumberPad] Error updating external feedback component:`, error);
          }
        }

        return;
      }

      // Compare values (handle both string and number comparisons)
      let isCorrect = false;

      // Try numeric comparison first
      const userNum = parseFloat(userEnteredValue);
      const correctNum = parseFloat(correctValue);

      if (!isNaN(userNum) && !isNaN(correctNum)) {
        // Both are numbers - compare numerically
        isCorrect = userNum === correctNum;
        console.log(`🔍 [NumberPad] Numeric comparison: ${userNum} === ${correctNum} ? ${isCorrect}`);
      } else {
        // String comparison (case-insensitive, trimmed)
        isCorrect = String(userEnteredValue).trim().toLowerCase() === String(correctValue).trim().toLowerCase();
        console.log(`🔍 [NumberPad] String comparison: "${userEnteredValue}" === "${correctValue}" ? ${isCorrect}`);
      }
      // 🔔 Dispatch imageChange event
      if (typeof window !== 'undefined') {
        const imageChangeEvent = new CustomEvent('imageChange', {
          detail: {
            isCorrect: isCorrect,
            pageNumber: window.getCurrentPage?.() || null
          }
        });

        window.dispatchEvent(imageChangeEvent);

        if (isCorrect && currentDestination?.mirrorCorrectValueToCircumferenceStep) {
          const mirrorConfig = currentDestination.mirrorCorrectValueToCircumferenceStep;
          const clockId = mirrorConfig.clockId || currentDestination.destinationId;
          const mirrorValue = String(correctValue ?? userEnteredValue);
          if (typeof mirrorConfig.onCorrect === 'function') {
            mirrorConfig.onCorrect(mirrorValue);
          }
          const rawClockHour =
            typeof mirrorConfig.clockHour === 'function'
              ? mirrorConfig.clockHour()
              : mirrorConfig.clockHour;
          const clockHour = Number(rawClockHour);
          if (clockId && Number.isFinite(clockHour) && clockHour >= 1 && clockHour <= 12) {
            window.dispatchEvent(new CustomEvent('clockCircumferenceStepLabelSet', {
              detail: {
                clockId,
                clockHour,
                text: mirrorValue,
              }
            }));
          }
        }

        if (isCorrect && isCircumferenceLessonPad) {
          let nextFaceHour = null;
          const padKey = String(elementProps?.id ?? elementName ?? '');
          if (padKey === 'page4-number-pad' && currentDestinationIndex < destinations.length - 1) {
            const nextDest = destinations[currentDestinationIndex + 1];
            const nh = nextDest?.circumferenceClockHour;
            if (typeof nh === 'number' && nh >= 1) nextFaceHour = nh;
            else if (nh != null && !Number.isNaN(Number(nh))) nextFaceHour = Number(nh);
          }
          const ch = currentDestination?.circumferenceClockHour;
          const completedHour =
            typeof ch === 'number' ? ch : ch != null && !Number.isNaN(Number(ch)) ? Number(ch) : undefined;
          const pn = window.getCurrentPage?.() ?? currentPage;
          const clockId = currentDestination?.destinationId || `page${pn}-clock`;
          window.dispatchEvent(new CustomEvent('clockCircumferenceLessonCheckpoint', {
            detail: {
              clockId,
              pageNumber: pn,
              completedHour,
              nextFaceHour
            }
          }));
          if (padKey === 'page4-number-pad') {
            setPage4NextButtonEnabled(nextFaceHour, completedHour);
          }
        }
      }
      // Only update feedback message if feedbackMode is 'feedback'
      const feedbackMode = config.feedbackMode || 'feedback';

      // Helper function to update external feedback component
      const updateExternalFeedback = (text, mode) => {
        const feedbackComponentId = config.feedbackComponentId || elementProps?.feedbackComponentId;
        if (feedbackComponentId) {
          try {
            // Extract page number from feedbackComponentId (e.g., 'page2-feedback-textbox' -> 'page2')
            const pageMatch = feedbackComponentId.match(/page(\d+)/);
            const pageId = pageMatch ? `page${pageMatch[1]}` : null;

            if (pageId) {
              // Use the same pattern as FillBlanksComponent - update global state and dispatch event
              const feedbackStateKey = `${pageId}FeedbackState`;
              const feedbackEventName = `${pageId}FeedbackUpdate`;

              // Initialize or update global feedback state
              if (!window[feedbackStateKey]) {
                window[feedbackStateKey] = {
                  text: '',
                  mode: 'normal'
                };
              }

              window[feedbackStateKey].text = text;
              window[feedbackStateKey].mode = mode;

              // Dispatch custom event to notify feedback textbox
              window.dispatchEvent(new CustomEvent(feedbackEventName, {
                detail: {
                  text: text,
                  mode: mode
                }
              }));

              console.log(`✅ [NumberPad] Updated external feedback component ${feedbackComponentId}:`, { text, mode });
            } else {
              console.warn(`⚠️ [NumberPad] Could not extract page number from feedbackComponentId: ${feedbackComponentId}`);
            }
          } catch (error) {
            console.error(`❌ [NumberPad] Error updating external feedback component:`, error);
          }
        }
      };

      if (isCorrect) {
        // Correct answer
        console.log('✅ [NumberPad] Correct answer!');

        // Reset incorrect flag
        setLastCheckWasIncorrect(false);

        // Play success sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(true);
        }

        // Update feedback in number pad text area only if feedbackMode is 'feedback'
        if (feedbackMode === 'feedback' && typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(correctFeedback, 'correct');
        }

        // Update external feedback component
        updateExternalFeedback(correctFeedback, 'correct');

        // Update destination cell mode to 'correct'
        updateDestinationCellMode(currentDestination.destinationId, 'correct');

        // Move to next destination if available
        if (currentDestinationIndex < destinations.length - 1) {
          if (isCircumferenceLessonPad && destinations.length > 1) {
            instanceRef.padLockedAwaitingClockTap = true;
            setPadLockedAwaitingClockTap(true);
            console.log(`🔒 [NumberPad] Circumference lesson: pad locked until clock face tap`);
          }
          setCurrentDestinationIndex(prev => prev + 1);
          setInputValue(''); // Clear input for next destination
          console.log(`➡️ [NumberPad] Moving to next destination: index ${currentDestinationIndex + 1}`);
        } else {
          console.log(`✅ [NumberPad] All destinations completed!`);
          if (config.disablePadAfterFinalCorrect !== false) {
            instanceRef.padLockedAfterFinalCorrect = true;
            setPadLockedAfterCorrect(true);
          }
          if (typeof window !== 'undefined') {
            const nWin = Number(window.getCurrentPage?.());
            const nProp = Number(currentPage);
            const resolvedPage = Number.isFinite(nWin)
              ? nWin
              : Number.isFinite(nProp)
                ? nProp
                : NaN;
            const padPageMatch = String(padDomId).match(/^page(\d+)-number-pad$/i);
            const padPageFromId = padPageMatch ? Number(padPageMatch[1]) : NaN;
            const lessonPage = Number.isFinite(resolvedPage)
              ? resolvedPage
              : padPageFromId;
            const padMatchesLessonPage =
              (Number.isFinite(padPageFromId) && padPageFromId === lessonPage) ||
              String(elementName) === `page${lessonPage}-number-pad`;
            // Page 4 emits quizCompleted on every correct CHECK above; only page 8 (tile) here.
            const shouldDispatchQuizCompleted =
              Number.isFinite(lessonPage) &&
              lessonPage === 8 &&
              padMatchesLessonPage;

            if (shouldDispatchQuizCompleted) {
              const pn = lessonPage;
              if (pn === 8) {
                window.page9InstructionAfterPage8Check =
                  typeof window.getPage9InstructionFromMinuteHandIndex ===
                  'function'
                    ? window.getPage9InstructionFromMinuteHandIndex()
                    : typeof i18n !== 'undefined'
                      ? i18n.t('pages.page9.instructionAfterPage8Next')
                      : '';
              }
              window.dispatchEvent(
                new CustomEvent('quizCompleted', {
                  detail: {
                    pageNumber: pn,
                    quizId:
                      pn === 4
                        ? 'page4-circumference-lesson'
                        : 'page8-circumference-lesson',
                  },
                })
              );
              console.log(
                `✅ [NumberPad] Page ${pn} circumference lesson done — quizCompleted dispatched`
              );
            }
          }
        }
      } else {
        // Incorrect answer
        console.log('❌ [NumberPad] Incorrect answer');

        // Set flag to indicate last check was incorrect
        setLastCheckWasIncorrect(true);

        // Play error sound
        if (typeof window !== 'undefined' && window.playAnswerSound) {
          window.playAnswerSound(false);
        }

        // Update feedback in number pad text area only if feedbackMode is 'feedback'
        if (feedbackMode === 'feedback' && typeof window !== 'undefined' && window.updateNumberPadFeedback) {
          window.updateNumberPadFeedback(incorrectFeedback, 'incorrect');
        }

        // Update external feedback component
        updateExternalFeedback(incorrectFeedback, 'incorrect');

        // Update destination cell mode to 'incorrect'
        updateDestinationCellMode(currentDestination.destinationId, 'incorrect');
      }

      // Clock circumference step circle: green (correct) or salmon (incorrect)
      if (currentDestination.destinationType === 'circumference-step' && typeof window !== 'undefined') {
        const hid = Number(currentDestination.circumferenceClockHour);
        if (Number.isFinite(hid) && hid >= 1 && hid <= 12) {
          window.dispatchEvent(new CustomEvent('clockCircumferenceStepFeedback', {
            detail: {
              clockId: currentDestination.destinationId,
              clockHour: hid,
              outcome: isCorrect ? 'correct' : 'incorrect'
            }
          }));
        }
      }
    }
  };


  // Convert gc units to CSS using the grid positioning system
  const gcToCSS = (value) => {
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));

      // Use the existing grid positioning system to convert gc to CSS
      if (typeof gridPositions !== 'undefined') {
        // Create a mock coordinate that represents the gc size
        // For size values, we create a 1x1 grid cell at position [1,1] and scale it by gcValue
        const mockCoordinates = [1, 1, 1 + gcValue, 1 + gcValue];
        const result = gridPositions.convertToCSS(mockCoordinates, 'gc-conversion', 'custom', 'size');

        // Extract the width percentage (which equals height for square elements)
        const widthMatch = result.css.width.match(/(\d+\.?\d*)%/);
        const convertedValue = widthMatch ? widthMatch[1] + '%' : `${gcValue * 0.0625}%`; // fallback

        console.log(`🔢 [gcToCSS] Converting ${value}: gcValue=${gcValue}, mockCoords=${mockCoordinates}, result=${convertedValue}`);

        return convertedValue;
      } else {
        // Fallback if gridPositions is not available
        const currentPrecision = typeof GridPrecisionConfig !== 'undefined' ?
          GridPrecisionConfig.currentPrecision : 100;
        const precisionSettings = typeof GridPrecisionConfig !== 'undefined' ?
          GridPrecisionConfig.precisionSettings[currentPrecision] : { cols: 1600, rows: 900 };

        const widthPercent = (gcValue / precisionSettings.cols) * 100;
        const heightPercent = (gcValue / precisionSettings.rows) * 100;
        const percentValue = Math.min(widthPercent, heightPercent);

        console.log(`🔢 [gcToCSS] Fallback conversion ${value}: result=${percentValue}%`);
        return `${percentValue}%`;
      }
    }
    return value;
  };

  // Process styles to convert gc units using the existing grid system
  const processStyle = (styleObj) => {
    // Use the existing GridCellFontUtils.processGcStyles if available
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles) {
      return GridCellFontUtils.processGcStyles(styleObj);
    }

    // Fallback: manual processing
    const processed = {};
    for (const [key, value] of Object.entries(styleObj)) {
      // Only convert string values that contain 'gc', leave other values as-is
      if (typeof value === 'string' && value.includes('gc')) {
        // For font-related properties, we need pixel values, not percentages
        if (key === 'fontSize' || key === 'lineHeight' || key.includes('font')) {
          // Use GridCellFontUtils if available for font properties
          if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPixels) {
            processed[key] = GridCellFontUtils.convertGcToPixels(value, key);
          } else {
            processed[key] = gcToCSS(value); // fallback
          }
        } else {
          // For other properties, use percentage-based conversion
          processed[key] = gcToCSS(value);
        }
      } else {
        processed[key] = value;
      }
    }
    return processed;
  };

  // Calculate proper positioning using grid coordinate system
  const getPositionFromCoordinates = () => {
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      // Use the grid positioning utility if available
      if (typeof GridPositionUtils !== 'undefined' && GridPositionUtils.coordinatesToCSS) {
        return GridPositionUtils.coordinatesToCSS(coordinates);
      }

      // Fallback: manual calculation based on current grid system
      const [x1, y1, x2, y2] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 72;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 128;

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

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '290px',
      height: '290px'
    };
  };

  // Get container dimensions for percentage calculations
  const containerPosition = getPositionFromCoordinates();

  // Debug logging for number pad positioning
  console.log(`🔢 [NumberPad] Positioning for ${elementName}:`, {
    coordinates,
    containerPosition,
    gridRows: typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 72,
    gridCols: typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 128
  });


  // 2. Text area - use configurable height percentage
  const feedbackRowHeight = config.feedbackRowHeight || '35%';

  // Extract color-related props from feedbackTextArea to avoid conflicts
  const { defaultText, color: configColor, backgroundColor: configBgColor, borderColor: configBorderColor, ...feedbackTextAreaProps } = config.feedbackTextArea || {};

  const textAreaStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
    ? GridCellFontUtils.processGcStyles({
      ...feedbackTextAreaProps,
      width: '100%',
      height: feedbackRowHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3%',
      // Use textAreaColors state (which includes config colors if provided)
      color: textAreaColors.color,
      backgroundColor: textAreaColors.backgroundColor,
      borderColor: textAreaColors.borderColor
    })
    : processStyle({
      ...feedbackTextAreaProps,
      width: '100%',
      height: feedbackRowHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3%',
      // Use textAreaColors state (which includes config colors if provided)
      color: textAreaColors.color,
      backgroundColor: textAreaColors.backgroundColor,
      borderColor: textAreaColors.borderColor
    });

  // Get text area content - show feedback message if present, otherwise show default text
  // Never show input value in feedback area
  const getTextAreaContent = () => {
    if (feedbackMessage) {
      return feedbackMessage;
    }
    // Show default text when there's no feedback message
    return defaultFeedbackText;
  };

  // Helper function to update destination element text when number pad input changes
  const updateDestinationText = React.useCallback((text) => {
    const destinations = config.destinations || [];
    if (destinations.length === 0) {
      console.warn(`⚠️ [NumberPad] No destinations configured`);
      return;
    }

    const currentDestination = destinations[currentDestinationIndex];
    if (!currentDestination) {
      console.warn(`⚠️ [NumberPad] No destination at index ${currentDestinationIndex}`);
      return;
    }

    const destId = currentDestination.destinationId;
    const destType = currentDestination.destinationType || 'table-cell';

    console.log(`🔍 [NumberPad] updateDestinationText called:`, {
      text,
      destinationIndex: currentDestinationIndex,
      destinationId: destId,
      destinationType: destType,
      totalDestinations: destinations.length
    });

    if (!destId) {
      console.warn(`⚠️ [NumberPad] No destinationId in destination at index ${currentDestinationIndex}`);
      return;
    }

    // 0) Clock circumference step label — destinationId = clock container id (e.g. page4-clock); text is SVG <text> with id {id}-circumference-step-h{hour}
    if (destType === 'circumference-step') {
      try {
        const hour = Number(currentDestination.circumferenceClockHour);
        if (!Number.isFinite(hour) || hour < 1 || hour > 12) {
          console.warn(`⚠️ [NumberPad] circumference-step requires circumferenceClockHour 1–12`);
          return;
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('clockCircumferenceStepLabelSet', {
            detail: { clockId: destId, clockHour: hour, text }
          }));
          window.dispatchEvent(new CustomEvent('clockCircumferenceStepFeedback', {
            detail: { clockId: destId, clockHour: hour, outcome: 'reset' }
          }));
        }
        const textEl = document.getElementById(`${destId}-circumference-step-h${hour}`);
        if (textEl) textEl.textContent = text;
      } catch (error) {
        console.error(`❌ [NumberPad] Error updating circumference-step:`, error);
      }
      return;
    }

    // 1) Tile destinations – used by polygon pages (e.g., page2-tile-1)
    if (destType === 'tile') {
      try {
        // Try by id first (ElementRenderer sets id from element.id or element.name)
        let tileElement = document.getElementById(destId);

        // Fallback: search by data-element-name (ElementRenderer always sets this)
        if (!tileElement) {
          tileElement = document.querySelector(`[data-element-name="${destId}"]`);
        }

        if (tileElement) {
          tileElement.textContent = text;
          tileElement.innerText = text;
          console.log(`✅ [NumberPad] Updated tile ${destId} text to: "${text}"`);
        } else {
          console.warn(`⚠️ [NumberPad] Tile destination element not found (id or data-element-name): ${destId}`);
        }
      } catch (error) {
        console.error(`❌ [NumberPad] Error updating tile destination ${destId}:`, error);
      }
      return;
    }

    // 2) Default behaviour – table cell destinations (existing behaviour)
    try {
      // Extract table component ID and cell key from destinationId
      // Format: 'page2-map-table-R1C1' -> componentId: 'page2-map-table', cellKey: '0-0' (row 1 = index 0, col 1 = index 0)
      const cellIdMatch = destId.match(/^(.+?)-R(\d+)C(\d+)$/);
      if (cellIdMatch) {
        const tableComponentId = cellIdMatch[1];
        const rowNum = parseInt(cellIdMatch[2], 10);
        const colNum = parseInt(cellIdMatch[3], 10);

        // Convert cell ID format to cellKey format (R1C1 -> '0-0' for data rows, R0C0 -> 'header-0' for headers)
        let cellKey;
        if (rowNum === 0) {
          // Header row
          cellKey = `header-${colNum}`;
        } else {
          // Data row (rowNum is 1-indexed, cellKey is 0-indexed)
          cellKey = `${rowNum - 1}-${colNum}`;
        }

        console.log(`🔍 [NumberPad] Extracted table info:`, {
          tableComponentId,
          rowNum,
          colNum,
          cellKey
        });

        // Use table component's callback to update cell text via React state
        // Add retry mechanism in case callback isn't ready yet
        const maxRetries = 10;
        const retryDelay = 50; // ms

        const tryUpdateCell = (attempt = 0) => {
          if (typeof window !== 'undefined' && window.tableGridCallbacks && window.tableGridCallbacks[tableComponentId]) {
            try {
              window.tableGridCallbacks[tableComponentId](cellKey, { text });
              console.log(`✅ [NumberPad] Updated cell text via table callback: ${cellKey} -> "${text}"`);
              return true; // Success
            } catch (error) {
              console.error(`❌ [NumberPad] Error calling table callback:`, error);
              return false; // Failed
            }
          }
          return false; // Callback not available
        };

        // Try immediate update
        if (!tryUpdateCell(0)) {
          // Callback not ready - retry with delay
          console.warn(`⚠️ [NumberPad] Table callback not ready for ${tableComponentId}, retrying...`);
          let retryCount = 0;
          const retryInterval = setInterval(() => {
            retryCount++;
            if (tryUpdateCell(retryCount)) {
              clearInterval(retryInterval);
            } else if (retryCount >= maxRetries) {
              clearInterval(retryInterval);
              console.error(`❌ [NumberPad] Max retries reached. Table callback for ${tableComponentId} not available.`);
            }
          }, retryDelay);
        }
      } else {
        console.warn(`⚠️ [NumberPad] Could not parse destinationId format: ${destId}. Expected format: 'componentId-R<row>C<col>'`);
      }
    } catch (error) {
      console.error(`❌ [NumberPad] Error updating destination ${destId}:`, error);
    }
  }, [config.destinations, currentDestinationIndex]);

  // Update destination element whenever input value changes (not feedback message)
  React.useEffect(() => {
    console.log(`🔄 [NumberPad] inputValue changed:`, inputValue);
    updateDestinationText(inputValue);
  }, [inputValue, updateDestinationText]);


  // Store subscription removed - using React state only

  const textAreaRaw = getTextAreaContent();
  // Match real tags like <br>, <br/>, <div class="x"> — old /<[a-z][\s>/]/ failed on <br> (b then r).
  const useFeedbackHtml =
    typeof textAreaRaw === 'string' &&
    /<\/?[a-z][\w-]*(?:\s[^<>]*)?\s*\/?>/i.test(textAreaRaw);
  const textArea = React.createElement('div', {
    key: 'text-area',
    id: `${elementName}-text-area`,
    className: 'numberpad-text-area',
    style: {
      ...textAreaStyle,
      ...padLockedVisualStyle,
      ...(useFeedbackHtml ? { textAlign: 'center', whiteSpace: 'normal' } : {})
    },
    'data-feedback': 'area',
    ...(useFeedbackHtml
      ? { dangerouslySetInnerHTML: { __html: textAreaRaw } }
      : { children: textAreaRaw })
  });

  // Expose methods to update text area from external code
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const componentId = elementName || elementProps?.id || `numberpad-${currentPage}`;

      // Function to update feedback in the text area
      window.updateNumberPadFeedback = (message, type = 'default') => {
        setFeedbackMessage(message);

        // Get CSS variables for consistent styling
        const rootStyles = getComputedStyle(document.documentElement);

        switch (type) {
          case 'correct':
            setTextAreaColors({
              color: rootStyles.getPropertyValue('--textarea-correct-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-correct-bg').trim() || '#0B803D',
              borderColor: rootStyles.getPropertyValue('--textarea-correct-border').trim() || '#219150'
            });
            break;
          case 'error':
          case 'incorrect':
            setTextAreaColors({
              color: rootStyles.getPropertyValue('--textarea-incorrect-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-incorrect-bg').trim() || '#D9D9D9',
              borderColor: rootStyles.getPropertyValue('--textarea-incorrect-border').trim() || '#FF6B61'
            });
            break;
          case 'hint':
            setTextAreaColors({
              color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
              borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
            });
            break;
          default:
            setTextAreaColors({
              color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
              backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
              borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
            });
            break;
        }
      };

      // Function to clear feedback
      window.clearNumberPadFeedback = () => {
        setFeedbackMessage('');
        setInputValue('');
        const rootStyles = getComputedStyle(document.documentElement);
        setTextAreaColors({
          color: rootStyles.getPropertyValue('--textarea-hint-color').trim() || '#FFFFFF',
          backgroundColor: rootStyles.getPropertyValue('--textarea-hint-bg').trim() || 'transparent',
          borderColor: rootStyles.getPropertyValue('--textarea-hint-border').trim() || '#FFFFFF'
        });
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        const componentId = elementName || elementProps?.id || `numberpad-${currentPage}`;
        delete window.updateNumberPadFeedback;
        delete window.clearNumberPadFeedback;
      }
    };
  }, [elementName, currentPage, elementProps?.id]);

  // 3. Number pad - use configurable height percentage
  const buttonGridHeight = config.buttonGridHeight || '51%';
  const numberButtons = [];

  // Get button size percentages (default to 90% for both)
  const buttonWidthPercent = config.numberButtons?.buttonWidthPercent || '90%';
  const buttonHeightPercent = config.numberButtons?.buttonHeightPercent || '90%';

  // Legacy support: if buttonSize is provided but percentages are not, calculate approximate percentage
  // This is for backward compatibility
  const buttonSize = config.numberButtons?.buttonSize ? gcToCSS(config.numberButtons.buttonSize) : null;

  console.log('🔢 [NumberPad] Button sizing:', {
    buttonSize: config.numberButtons?.buttonSize,
    fontSize: config.numberButtons?.fontSize,
    rowGap: config.numberButtons?.rowGap,
    columnGap: config.numberButtons?.columnGap,
    calculatedButtonSize: buttonSize,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    gridCols: typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 'undefined',
    gridRows: typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 'undefined'
  });

  for (let i = 0; i <= 9; i++) {
    // Extract only button-specific properties, excluding grid properties and size properties
    const { rowGap, columnGap, buttonSize: configButtonSize, buttonWidthPercent: btnWidthPct, buttonHeightPercent: btnHeightPct, width, height, ...buttonProps } = config.numberButtons;

    // Use percentage-based sizing relative to grid cell
    const buttonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
      ? GridCellFontUtils.processGcStyles({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      })
      : processStyle({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      });

    if (i === 0) { // Only log for first button to avoid spam
      console.log('🔢 [NumberPad] First button style:', buttonStyle);
    }

    numberButtons.push(
      React.createElement('button', {
        key: `number-${i}`,
        className: `number-pad-button number-${i}`,
        style: buttonStyle,
        onClick: () => handleNumberClick(i),
        onMouseOver: (e) => {
          e.target.classList.add('hovered');
        },
        onMouseOut: (e) => {
          e.target.classList.remove('hovered');
        },
        'data-number': i
      }, i.toString())
    );
  }

  // Determine layout type
  const layoutType = config.layout || 'vertical';
  const buttonConfig = config.buttonConfig || 1;

  // Define button configurations
  // All configs: 0 and . are always in the middle column (column 2 of 3)
  // Config 1: Numbers 0-9, 4 rows × 3 cols, 0 in last row middle
  // Config 2: Numbers 0-9 + C + ⌫, 4 rows × 3 cols, 0 in last row middle
  // Config 3: Numbers 0-9 + + - . + C + ⌫, 5 rows × 3 cols, 0 and . in middle column
  // Config 4: Numbers 0-9 + × ÷ . + C + ⌫, 5 rows × 3 cols, 0 and . in middle column
  const getButtonLayout = (configNum) => {
    switch (configNum) {
      case 1:
        // Numbers only: 1,2,3 / 4,5,6 / 7,8,9 / null,0,null
        // 0 is at index 10 (row 4, column 2 - middle) ✓
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];
      case 2:
        // Numbers + C + ⌫: 1,2,3 / 4,5,6 / 7,8,9 / C,0,⌫
        // 0 is at index 10 (row 4, column 2 - middle) ✓
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'];
      case 3:
        // Numbers + + - . + C + ⌫: 1,2,3 / 4,5,6 / 7,8,9 / +,0,- / C,.,⌫
        // 0 is at index 10 (row 4, column 2 - middle) ✓
        // . is at index 13 (row 5, column 2 - middle) ✓
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '+', 0, '-', 'C', '.', '⌫'];
      case 4:
        // Numbers + × ÷ . + C + ⌫: 1,2,3 / 4,5,6 / 7,8,9 / ×,0,÷ / C,.,⌫
        // 0 is at index 10 (row 4, column 2 - middle) ✓
        // . is at index 13 (row 5, column 2 - middle) ✓
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '\u00D7', 0, '\u00F7', 'C', '.', '⌫'];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];
    }
  };

  const keypadLayout = getButtonLayout(buttonConfig);

  // Determine number of rows based on button config
  const getGridRows = (configNum) => {
    switch (configNum) {
      case 1:
      case 2:
        return 4; // 4 rows × 3 cols
      case 3:
      case 4:
        return 5; // 5 rows × 3 cols
      default:
        return 4;
    }
  };

  const gridRows = getGridRows(buttonConfig);

  // Create operator buttons (+, -, ×, ÷, .)
  const createOperatorButton = (operator, index) => {
    const { rowGap, columnGap, buttonSize: configButtonSize, buttonWidthPercent: btnWidthPct, buttonHeightPercent: btnHeightPct, width, height, ...buttonProps } = config.numberButtons;

    const buttonWidthPercent = btnWidthPct || config.numberButtons?.buttonWidthPercent || '90%';
    const buttonHeightPercent = btnHeightPct || config.numberButtons?.buttonHeightPercent || '90%';

    // Use percentage-based sizing relative to grid cell
    const buttonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
      ? GridCellFontUtils.processGcStyles({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      })
      : processStyle({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      });

    const handleOperatorClick = () => {
      console.log(`🔢 [NumberPad] Operator ${operator} clicked`);

      // Play click sound (if enabled)
      if (config.enableClickSound !== false && typeof window !== 'undefined' && window.playCarClickSound) {
        window.playCarClickSound('numberpad');
      }

      if (elementProps?.onOperatorClick) {
        elementProps.onOperatorClick(operator);
      } else {
        // Default behavior: append operator to text area
        setFeedbackMessage(''); // Clear any feedback message when user starts typing
        setInputValue(prev => {
          const currentText = typeof prev === 'string' ? prev : '';
          const inputMode = config.inputMode || 'append';

          // Operators typically append even in replace mode (for expressions like "5+3")
          // But if replace mode is active and there's no existing content, just set the operator
          if (inputMode === 'replace' && currentText === '') {
            return operator;
          } else {
            // Append mode or replace mode with existing content - append operator
            return currentText + operator;
          }
        });
      }
    };

    return React.createElement('button', {
      key: `operator-${operator}-${index}`,
      className: `number-pad-button operator-${operator}`,
      style: buttonStyle,
      onClick: handleOperatorClick,
      onMouseOver: (e) => {
        e.target.classList.add('hovered');
      },
      onMouseOut: (e) => {
        e.target.classList.remove('hovered');
      },
      'data-operator': operator
    }, operator);
  };

  // Create clear and backspace buttons if needed
  const createActionButton = (label, action, index) => {
    const { rowGap, columnGap, buttonSize: configButtonSize, buttonWidthPercent: btnWidthPct, buttonHeightPercent: btnHeightPct, width, height, ...buttonProps } = config.numberButtons;

    // Use percentage-based sizing relative to grid cell
    const buttonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
      ? GridCellFontUtils.processGcStyles({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      })
      : processStyle({
        ...buttonProps,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidthPercent,
        height: buttonHeightPercent
      });

    return React.createElement('button', {
      key: `action-${label}-${index}`,
      className: `number-pad-button action-${label}`,
      style: buttonStyle,
      onClick: action,
      onMouseOver: (e) => {
        e.target.classList.add('hovered');
      },
      onMouseOut: (e) => {
        e.target.classList.remove('hovered');
      },
      'data-action': label
    }, label);
  };

  const gridButtons = keypadLayout.map((item, index) => {
    // Handle null/empty cells - create empty placeholder div to maintain grid structure
    if (item === null || item === undefined) {
      return React.createElement('div', {
        key: `empty-${index}`,
        style: { display: 'block' } // Empty div to maintain grid cell
      });
    }

    // Handle numbers
    if (typeof item === 'number') {
      return numberButtons[item];
    }

    // Handle operators
    if (item === '+' || item === '-' || item === '\u00D7' || item === '\u00F7' || item === '.') {
      return createOperatorButton(item, index);
    }

    // Handle Clear button
    if (item === 'C') {
      return createActionButton('C', () => {
        console.log('🔢 [NumberPad] Clear button clicked');

        // Play click sound (if enabled)
        if (config.enableClickSound !== false && typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('numberpad');
        }

        if (elementProps?.onClear) {
          elementProps.onClear();
        } else {
          setFeedbackMessage(''); // Clear feedback when clearing input
          setInputValue('');
        }
      }, index);
    }

    // Handle Backspace button
    if (item === '⌫') {
      return createActionButton('⌫', () => {
        console.log('🔢 [NumberPad] Backspace button clicked');

        // Play click sound (if enabled)
        if (config.enableClickSound !== false && typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('numberpad');
        }

        if (elementProps?.onBackspace) {
          elementProps.onBackspace();
        } else {
          // Remove last character from text area
          setFeedbackMessage(''); // Clear feedback when backspacing
          setInputValue(prev => {
            if (typeof prev === 'string' && prev.length > 0) {
              return prev.slice(0, -1);
            }
            return prev;
          });
        }
      }, index);
    }

    // Fallback: return empty div
    return React.createElement('div', {
      key: `fallback-${index}`,
      style: { display: 'block' }
    });
  });

  const rowGapValue = gcToCSS(config.numberButtons?.rowGap || config.numberButtons?.margin || '3gc');
  const columnGapValue = gcToCSS(config.numberButtons?.columnGap || config.numberButtons?.margin || '3gc');

  console.log('🔢 [NumberPad] Grid gaps:', {
    rowGap: config.numberButtons?.rowGap,
    columnGap: config.numberButtons?.columnGap,
    margin: config.numberButtons?.margin,
    calculatedRowGap: rowGapValue,
    calculatedColumnGap: columnGapValue,
    gcToCSSTest: gcToCSS('3gc')
  });

  console.log('🔢 [NumberPad] Full config.numberButtons:', config.numberButtons);

  // Calculate rows for horizontal layout (count non-null items)
  const nonNullItems = keypadLayout.filter(item => item !== null && item !== undefined).length;
  const horizontalRows = Math.ceil(nonNullItems / 4);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: layoutType === 'horizontal' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',  // 4 cols (horizontal) or 3 cols (vertical)
    gridTemplateRows: layoutType === 'horizontal'
      ? `repeat(${horizontalRows}, 1fr)`  // Calculate rows for horizontal layout
      : `repeat(${gridRows}, 1fr)`,     // Dynamic rows based on buttonConfig for vertical layout
    rowGap: rowGapValue,
    columnGap: columnGapValue,
    width: '100%',
    height: buttonGridHeight,
    alignItems: 'center',
    justifyItems: 'center',
    marginBottom: '3%',
    ...padLockedVisualStyle
  };

  console.log('🔢 [NumberPad] Grid style object:', gridStyle);
  const actionRowStyle = {
    display: 'flex',
    gap: '5%',
    width: '100%',
    height: '10%',
    marginBottom: '2%',
    justifyContent: 'space-between'
  };

  const actionButtonStyle = typeof GridCellFontUtils !== 'undefined'
    ? GridCellFontUtils.processGcStyles({
      backgroundColor: '#FF7043',
      color: '#000',
      fontSize: '22gc',
      fontWeight: 'bold',
      borderRadius: '8gc',
      border: '3px solid #FF5722',
      cursor: 'pointer',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })
    : {
      backgroundColor: '#FF7043',
      color: '#000',
      fontSize: '22px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: '3px solid #FF5722',
      cursor: 'pointer',
      flex: 1
    };
  const actionButtonsRow = React.createElement(
    'div',
    { style: { ...actionRowStyle, ...padLockedVisualStyle } },

    React.createElement(
      'button',
      {
        style: { ...actionButtonStyle, ...(padInteractionLocked ? { cursor: 'default' } : {}) },
        onClick: handleClearAll,
        disabled: padInteractionLocked,
        'data-action': 'clear-all'
      },
      'C'
    ),

    React.createElement(
      'button',
      {
        style: { ...actionButtonStyle, ...(padInteractionLocked ? { cursor: 'default' } : {}) },
        onClick: handleBackspace,
        disabled: padInteractionLocked,
        'data-action': 'backspace'
      },
      '⌫'
    )
  );

  const numberPadGrid = React.createElement('div', {
    className: 'number-pad-grid',
    style: gridStyle
  }, ...gridButtons);

  // 4. Check button - use configurable height percentage
  const checkButtonHeight = config.checkButtonHeight || '10%';
  const checkButtonStyle = typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcStyles
    ? GridCellFontUtils.processGcStyles({
      ...config.checkButton,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      height: checkButtonHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })
    : processStyle({
      ...config.checkButton,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      height: checkButtonHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

  const checkButtonStyleResolved = {
    ...checkButtonStyle,
    ...padLockedVisualStyle,
    ...(padInteractionLocked ? { cursor: 'default' } : {})
  };

  const checkButton = React.createElement('button', {
    key: 'check-button',
    className: 'number-pad-check-button',
    type: 'button',
    disabled: padInteractionLocked,
    style: checkButtonStyleResolved,
    onClick: handleCheckClick,
    onMouseOver: (e) => {
      e.target.classList.add('hovered');
    },
    onMouseOut: (e) => {
      e.target.classList.remove('hovered');
    },
    'data-action': 'check'
  }, config.checkButton?.text ||
  (typeof i18n !== 'undefined' ? i18n.t('numberPad.checkButton') : ''));

  // Main container with proper grid positioning
  const containerStyle = {
    ...containerPosition,
    ...processStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: config.backgroundColor,
      borderRadius: config.borderRadius,
      border: config.border,
      padding: config.padding || '15px',
      boxSizing: 'border-box'
    }),
    zIndex: zIndex || 1000
  };

  // Layout order: text area -> number pad -> check (same flex children as before; lock styling applied per element)
  const children = [
    textArea,
    numberPadGrid,
    checkButton
  ];


  return React.createElement('div', {
    id: `${elementName}-${currentPage}`,
    className: 'number-pad-panel-container',
    style: containerStyle,
    'data-element-name': elementName,
    'data-page': currentPage
  }, ...children);
});

// Number Pad Element Configuration
const NumberPadElement = {
  numberPadPanel: {
    type: 'number-pad-panel',
    coordinates: [20, 20, 80, 80],
    zIndex: 'var(--z-elevated)',
    props: {
      backgroundColor: '#8B4513',
      borderRadius: '15gc',
      border: '4px solid #D2691E',
      padding: '20gc',
      layout: 'vertical',            // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
      buttonConfig: 1,               // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
      enableClickSound: true,        // Enable click sound for number pad buttons (default: true)
      inputMode: 'append',           // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
      circumferenceStepMaxInputDigits: null, // cap digit length for destinationType circumference-step (e.g. 2 for minutes)
      maxNumber: null,               // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
      feedbackMode: 'feedback',       // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
      feedbackComponentId: null,     // ID of external feedback component to update when check is pressed (e.g., 'page2-feedback-textbox')
      destinations: [],              // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
      destinationIndex: 0,           // Current index in destinations array (starts at 0)
      feedbackRowHeight: '35%',      // Height percentage for feedback text area
      buttonGridHeight: '51%',       // Height percentage for number pad grid
      checkButtonHeight: '10%',      // Height percentage for check button

      showButton: {
        backgroundColor: '#FFD700',
        color: '#000000',
        fontSize: '35gc',
        fontWeight: 'bold',
        get text() {
          return typeof i18n !== 'undefined'
            ? i18n.t('numberPad.showHintButton')
            : '';
        },
      },

      numberButtons: {
        backgroundColor: '#FFD700',
        color: '#000000',
        fontSize: '45gc',
        fontWeight: 'bold',
        buttonWidthPercent: '90%',  // Width percentage of grid cell
        buttonHeightPercent: '90%'  // Height percentage of grid cell
      },

      checkButton: {
        backgroundColor: '#FF8C00',
        color: '#000000',
        fontSize: '35gc',
        fontWeight: 'bold',
        get text() {
          return typeof i18n !== 'undefined'
            ? i18n.t('numberPad.checkButton')
            : '';
        },
      }
    },

    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('number-pad', (props, elementId) => {
      return React.createElement(NumberPadPanelComponent, props);
    })
  }
};

// Export component and configuration
window.NumberPadComponent = {
  NumberPadPanelComponent,
  NumberPadElement
};

console.log('✅ Number pad component loaded successfully');
