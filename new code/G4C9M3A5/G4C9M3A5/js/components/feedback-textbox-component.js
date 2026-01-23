/**
 * Feedback Textbox Component - React 18 Optimized
 * 
 * A textbox component with four modes for displaying feedback:
 * - normal: transparent background, white text, no border
 * - correct: green background, white text, dashed border
 * - incorrect: salmon background, white text, dashed border
 * - summary: #70ACC7 background, black text, white dashed border
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Feedback Textbox Component
 */
const FeedbackTextboxComponent = React.memo((props) => {
  const elementId = React.useId();
  const { 
    position, 
    processedStyles: processedStylesProp, 
    elementZIndex,
    text: textProp = '',
    mode: modeProp = 'normal',
    allowHTML = false,
    ...otherProps 
  } = props;
  
  // Read from global state if available (for pageN-feedback-textbox)
  // Use props.id first (from PageConfig), then fallback to elementId
  const componentId = props.id || props.elementId || elementId;
  
  console.log(`🔵 [FeedbackTextboxComponent] RENDERING:`, {
    componentId,
    elementId,
    propsId: props.id,
    textProp,
    modeProp,
    hasPosition: !!position,
    hasProcessedStyles: !!processedStylesProp,
    elementZIndex
  });
  
  // Extract page number from component ID (e.g., 'page6-feedback-textbox' -> 'page6')
  const pageMatch = componentId.match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : null;
  const isPageFeedback = pageId && componentId === `${pageId}-feedback-textbox`;
  const feedbackStateKey = pageId ? `${pageId}FeedbackState` : null;
  const feedbackEventName = pageId ? `${pageId}FeedbackUpdate` : null;
  
  console.log(`🔵 [FeedbackTextboxComponent] IDENTIFICATION:`, {
    componentId,
    pageMatch: pageMatch ? pageMatch[0] : null,
    pageId,
    isPageFeedback,
    feedbackStateKey,
    feedbackEventName
  });
  
  // Debug: Log component ID
  React.useEffect(() => {
    console.log(`🏷️ [FeedbackTextboxComponent] MOUNTED:`, {
      componentId,
      isPageFeedback,
      feedbackEventName,
      feedbackStateKey,
      hasGlobalState: feedbackStateKey ? !!window[feedbackStateKey] : false
    });
  }, [componentId, isPageFeedback, feedbackEventName, feedbackStateKey]);
  
  const [feedbackState, setFeedbackState] = React.useState(() => {
    const initialState = isPageFeedback && feedbackStateKey && window[feedbackStateKey]
      ? {
          text: window[feedbackStateKey].text || textProp,
          mode: window[feedbackStateKey].mode || modeProp
        }
      : {
          text: textProp,
          mode: modeProp
        };
    
    console.log(`🔵 [FeedbackTextboxComponent] INITIAL STATE:`, {
      componentId,
      isPageFeedback,
      initialState,
      globalState: feedbackStateKey ? window[feedbackStateKey] : null
    });
    
    return initialState;
  });
  
  // Listen for feedback updates (for pageN-feedback-textbox)
  React.useEffect(() => {
    console.log(`🔵 [FeedbackTextboxComponent] SETUP EVENT LISTENER:`, {
      componentId,
      isPageFeedback,
      feedbackEventName,
      feedbackStateKey
    });
    
    if (isPageFeedback && feedbackEventName) {
      const handleFeedbackUpdate = (event) => {
        console.log(`📬 [FeedbackTextboxComponent] ${componentId} RECEIVED EVENT:`, {
          eventName: feedbackEventName,
          detail: event.detail,
          eventType: event.type,
          timestamp: new Date().toISOString()
        });
        
        const newState = {
          text: event.detail.text || '',
          mode: event.detail.mode || 'normal'
        };
        
        console.log(`🔄 [FeedbackTextboxComponent] ${componentId} UPDATING STATE:`, {
          oldState: feedbackState,
          newState
        });
        
        setFeedbackState(newState);
        
        console.log(`✅ [FeedbackTextboxComponent] ${componentId} STATE UPDATED:`, newState);
      };
      
      // Also check global state on mount
      if (feedbackStateKey && window[feedbackStateKey]) {
        console.log(`📋 [FeedbackTextboxComponent] ${componentId} FOUND EXISTING GLOBAL STATE:`, window[feedbackStateKey]);
        setFeedbackState({
          text: window[feedbackStateKey].text || textProp,
          mode: window[feedbackStateKey].mode || modeProp
        });
      } else {
        console.log(`📋 [FeedbackTextboxComponent] ${componentId} NO GLOBAL STATE FOUND:`, {
          feedbackStateKey,
          exists: feedbackStateKey ? !!window[feedbackStateKey] : false
        });
      }
      
      console.log(`🎧 [FeedbackTextboxComponent] ${componentId} ADDING EVENT LISTENER:`, feedbackEventName);
      window.addEventListener(feedbackEventName, handleFeedbackUpdate);
      
      return () => {
        console.log(`🎧 [FeedbackTextboxComponent] ${componentId} REMOVING EVENT LISTENER:`, feedbackEventName);
        window.removeEventListener(feedbackEventName, handleFeedbackUpdate);
      };
    } else {
      console.log(`⚠️ [FeedbackTextboxComponent] ${componentId} NOT SETTING UP EVENT LISTENER:`, {
        isPageFeedback,
        feedbackEventName
      });
    }
  }, [isPageFeedback, feedbackEventName, feedbackStateKey, componentId, textProp, modeProp]);
  
  // Use feedback state if this is pageN-feedback-textbox, otherwise use props
  const currentText = isPageFeedback ? feedbackState.text : textProp;
  const currentMode = isPageFeedback ? feedbackState.mode : modeProp;
  
  console.log(`🔵 [FeedbackTextboxComponent] CURRENT VALUES:`, {
    componentId,
    isPageFeedback,
    currentText,
    currentMode,
    feedbackState,
    textProp,
    modeProp
  });
  
  const [isPending, startTransition] = React.useTransition();
  const deferredText = React.useDeferredValue(currentText);
  const deferredMode = React.useDeferredValue(currentMode);
  
  console.log(`🔵 [FeedbackTextboxComponent] DEFERRED VALUES:`, {
    componentId,
    deferredText,
    deferredMode,
    isPending
  });
  
  // Handle text change callback
  const handleTextChange = React.useCallback((newText) => {
    if (props.onTextChange) {
      startTransition(() => {
        props.onTextChange(newText);
      });
    }
  }, [props.onTextChange]);
  
  // Handle mode change callback
  const handleModeChange = React.useCallback((newMode) => {
    if (props.onModeChange) {
      startTransition(() => {
        props.onModeChange(newMode);
      });
    }
  }, [props.onModeChange]);
  
  // Memoize mode-based styles
  const modeStyles = React.useMemo(() => {
    const borderRadius = props.borderRadius || '12gc';
    const borderWidth = '4gc';
    
    switch (deferredMode) {
      case 'correct':
        return {
          color: 'white',
          backgroundColor: 'var(--color-green)',
          borderWidth: borderWidth,
          borderStyle: 'dashed',
          borderColor: 'var(--color-green-dark)',
          borderRadius: borderRadius
        };
      case 'incorrect':
        return {
          color: 'white',
          backgroundColor: 'var(--color-salmon)',
          borderWidth: borderWidth,
          borderStyle: 'dashed',
          borderColor: 'var(--color-salmon-dark)',
          borderRadius: borderRadius
        };
      case 'summary':
        return {
          color: '#000000',
          backgroundColor: '#70ACC7',
          borderWidth: borderWidth,
          borderStyle: 'dashed',
          borderColor: '#ffffff',
          borderRadius: borderRadius
        };
      case 'normal':
      default:
        return {
          color: 'white',
          backgroundColor: 'transparent',
          borderWidth: '0gc',
          borderStyle: 'none',
          borderColor: 'transparent',
          borderRadius: borderRadius
        };
    }
  }, [deferredMode, props.borderRadius]);
  
  // Combine all styles and process GC units
  const processedStyles = React.useMemo(() => {
    const combinedStyles = {
      ...modeStyles,
      fontSize: props.fontSize || '32gc',
      ...otherProps
    };
    
    // Ensure visibility when there's text, especially in incorrect/correct/summary modes
    // Always render the element, but hide it when empty
    if (deferredText && deferredText.trim()) {
      combinedStyles.opacity = 1;
      combinedStyles.visibility = 'visible';
      combinedStyles.display = combinedStyles.display || 'flex'; // Ensure display is set
    } else {
      // No text - hide it but keep it in DOM
      combinedStyles.opacity = 0;
      combinedStyles.visibility = 'hidden';
      combinedStyles.pointerEvents = 'none';
    }
    
    return GridCellFontUtils.processGcStyles(combinedStyles);
  }, [modeStyles, props.fontSize, otherProps, deferredText, deferredMode]);
  
  // Debug: Log when element should be visible
  React.useEffect(() => {
    if (isPageFeedback) {
      const element = document.getElementById(componentId || elementId);
      console.log(`🔍 [FeedbackTextboxComponent] ${componentId} DOM check:`, {
        elementExists: !!element,
        text: deferredText,
        mode: deferredMode,
        hasText: !!(deferredText && deferredText.trim()),
        elementInDOM: element ? 'YES' : 'NO'
      });
    }
  }, [componentId, elementId, isPageFeedback, deferredText, deferredMode]);
  
  // Combine position CSS with processed styles
  const containerStyle = {
    ...(position?.css || {}),
    ...processedStyles,
    zIndex: elementZIndex || props.zIndex || 402,
    position: 'absolute'
  };
  
  // Check if text contains HTML tags
  const containsHTML = allowHTML || (typeof deferredText === 'string' && /<[^>]+>/.test(deferredText));
  
  // Debug logging
  React.useEffect(() => {
    if (isPageFeedback) {
      console.log(`🔍 [FeedbackTextboxComponent] ${componentId} render:`, {
        text: deferredText,
        mode: deferredMode,
        hasText: !!deferredText,
        textLength: deferredText?.length || 0
      });
    }
  }, [deferredText, deferredMode, isPageFeedback, componentId]);
  
  const divProps = {
    id: componentId || elementId, // Use componentId if available (for page2-feedback-textbox)
    className: `feedback-textbox-container feedback-textbox-${deferredMode}${isPending ? ' pending' : ''}`,
    style: containerStyle,
    'data-element-type': 'feedback-textbox',
    'data-mode': deferredMode
  };
  
  // Use dangerouslySetInnerHTML if HTML is detected, otherwise render as text
  // Wrap HTML content in inline span to prevent flex container from splitting text
  if (containsHTML) {
    const wrappedText = `<span style="display: inline;">${deferredText}</span>`;
    divProps.dangerouslySetInnerHTML = { __html: wrappedText };
  }
  
  return React.createElement('div', divProps, containsHTML ? null : deferredText);
});

/**
 * Textbox Component (for backward compatibility with standard textbox type)
 */
const TextboxComponent = React.memo((props) => {
  // Use props.id if provided, otherwise generate a unique ID
  const generatedId = React.useId();
  const elementId = props.id || props.elementId || generatedId;
  const textProp = props.text || '';
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  const allowHTML = props.allowHTML || false;
  
  // State to hold dynamic text updates
  const [dynamicText, setDynamicText] = React.useState(null);
  // Track text version to force re-renders
  const [textVersion, setTextVersion] = React.useState(0);
  
  // Special handling for page8-grid-3-header: read from page8AnimationState
  const isPage8Header = elementId === 'page8-grid-3-header';
  const [page8AnimationState, setPage8AnimationState] = React.useState(() => {
    if (isPage8Header && typeof window !== 'undefined') {
      return window.page8AnimationState || 'WIP';
    }
    return null;
  });
  
  // Listen for page8 animation state updates
  React.useEffect(() => {
    if (!isPage8Header || typeof window === 'undefined') return;
    
    const handlePage8StateUpdate = (event) => {
      const newState = event.detail?.state || window.page8AnimationState || 'WIP';
      console.log(`📥 [TextboxComponent] Received page8AnimationStateUpdate event:`, {
        eventState: event.detail?.state,
        windowState: window.page8AnimationState,
        newState,
        elementId
      });
      setPage8AnimationState(newState);
      setTextVersion(prev => prev + 1);
      console.log(`✅ [TextboxComponent] Page8 animation state updated to: "${newState}" for ${elementId}`);
    };
    
    // Check initial state
    if (window.page8AnimationState) {
      setPage8AnimationState(window.page8AnimationState);
    } else {
      // Initialize to WIP if not set
      window.page8AnimationState = 'WIP';
      setPage8AnimationState('WIP');
    }
    
    window.addEventListener('page8AnimationStateUpdate', handlePage8StateUpdate);
    
    // Also poll the window state periodically to catch updates (fallback)
    const pollInterval = setInterval(() => {
      const currentWindowState = window.page8AnimationState || 'WIP';
      if (currentWindowState !== page8AnimationState) {
        console.log(`🔄 [TextboxComponent] Polling detected state change: ${page8AnimationState} -> ${currentWindowState}`);
        setPage8AnimationState(currentWindowState);
        setTextVersion(prev => prev + 1);
      }
    }, 50); // Check every 50ms for faster updates
    
    return () => {
      window.removeEventListener('page8AnimationStateUpdate', handlePage8StateUpdate);
      clearInterval(pollInterval);
    };
  }, [isPage8Header, page8AnimationState]);
  
  // Determine display text: for page8-header, use animation state; otherwise use dynamic/prop text
  // For page8-header, always read directly from window to get latest state
  let displayText;
  if (isPage8Header) {
    const currentState = typeof window !== 'undefined' ? (window.page8AnimationState || 'WIP') : (page8AnimationState || 'WIP');
    displayText = currentState === 'Completed' ? 'Kite = Rhombus' : 'Kite';
    console.log(`🔍 [TextboxComponent] Computing displayText for ${elementId}:`, {
      windowState: typeof window !== 'undefined' ? window.page8AnimationState : 'N/A',
      localState: page8AnimationState,
      currentState,
      displayText
    });
  } else {
    displayText = dynamicText !== null ? dynamicText : textProp;
  }
  // Don't defer for page8-header to ensure immediate updates
  const deferredText = isPage8Header ? displayText : React.useDeferredValue(displayText);
  
  // Immediate cleanup effect - runs on every render to clear React's content
  React.useEffect(() => {
    if (!isPage8Header) return;
    
    const element = document.getElementById(elementId);
    if (element) {
      // Immediately clear all content that React might have added
      const beforeClear = (element.textContent || element.innerText || '').trim();
      const beforeChildCount = element.childNodes.length;
      
      if (beforeChildCount > 0 || beforeClear) {
        console.log(`🚨 [TextboxComponent] IMMEDIATE CLEANUP: Clearing React content:`, {
          beforeText: beforeClear,
          beforeChildCount,
          windowState: window.page8AnimationState
        });
        
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        
        // Set the correct text based on current state
        const expectedText = typeof window !== 'undefined' && window.page8AnimationState === 'Completed' 
          ? 'Kite = Rhombus' 
          : 'Kite';
        element.textContent = expectedText;
        
        console.log(`✅ [TextboxComponent] IMMEDIATE CLEANUP: Set text to "${expectedText}"`);
      }
    }
  });
  
  // Aggressive cleanup for page8-header to prevent text overlap
  React.useEffect(() => {
    if (!isPage8Header) return;
    
    console.log(`🔍 [TextboxComponent] Setting up cleanup for ${elementId}, page8AnimationState: ${page8AnimationState}`);
    
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`⚠️ [TextboxComponent] Element ${elementId} not found`);
      return;
    }
    
    // Function to force correct text
    const forceCorrectText = (source) => {
      const expectedText = typeof window !== 'undefined' && window.page8AnimationState === 'Completed' 
        ? 'Kite = Rhombus' 
        : 'Kite';
      
      const beforeText = (element.textContent || element.innerText || '').trim();
      const childCount = element.childNodes.length;
      
      console.log(`🔧 [TextboxComponent] forceCorrectText called from ${source}:`, {
        beforeText,
        expectedText,
        childCount,
        windowState: window.page8AnimationState
      });
      
      // Completely clear all content
      let removedCount = 0;
      while (element.firstChild) {
        element.removeChild(element.firstChild);
        removedCount++;
      }
      
      if (removedCount > 0) {
        console.log(`🧹 [TextboxComponent] Removed ${removedCount} child node(s)`);
      }
      
      // Set only the correct text
      element.textContent = expectedText;
      
      const afterText = (element.textContent || element.innerText || '').trim();
      const afterChildCount = element.childNodes.length;
      
      console.log(`✅ [TextboxComponent] After forceCorrectText:`, {
        afterText,
        expectedText,
        afterChildCount,
        match: afterText === expectedText
      });
    };
    
    // MutationObserver to aggressively clean up duplicate text
    const observer = new MutationObserver((mutations) => {
      console.log(`👁️ [TextboxComponent] MutationObserver detected ${mutations.length} mutation(s):`, {
        mutations: mutations.map(m => ({
          type: m.type,
          addedNodes: m.addedNodes.length,
          removedNodes: m.removedNodes.length,
          target: m.target.nodeName
        }))
      });
      
      // Check current state before fixing
      const beforeText = (element.textContent || element.innerText || '').trim();
      const childCount = element.childNodes.length;
      const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
      
      console.log(`📊 [TextboxComponent] Before MutationObserver fix:`, {
        beforeText,
        childCount,
        textNodeCount: textNodes.length,
        textNodeContents: textNodes.map(n => n.textContent)
      });
      
      // Immediately clear and set correct text on any change
      forceCorrectText('MutationObserver');
    });
    
    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    console.log(`👁️ [TextboxComponent] MutationObserver attached to ${elementId}`);
    
    // Set initial text directly
    forceCorrectText('Initial');
    
    // Also run a frequent interval to ensure text stays correct
    const intervalId = setInterval(() => {
      const expectedText = typeof window !== 'undefined' && window.page8AnimationState === 'Completed' 
        ? 'Kite = Rhombus' 
        : 'Kite';
      const currentText = (element.textContent || element.innerText || '').trim();
      const childCount = element.childNodes.length;
      const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
      
      if (currentText !== expectedText || childCount > 1 || textNodes.length > 1) {
        console.log(`🔄 [TextboxComponent] Interval check found issue:`, {
          currentText,
          expectedText,
          childCount,
          textNodeCount: textNodes.length,
          textNodeContents: textNodes.map(n => n.textContent),
          windowState: window.page8AnimationState
        });
        forceCorrectText('Interval');
      }
    }, 50); // Check every 50ms
    
    console.log(`⏰ [TextboxComponent] Interval started for ${elementId}`);
    
    return () => {
      console.log(`🧹 [TextboxComponent] Cleaning up observers for ${elementId}`);
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [isPage8Header, elementId, page8AnimationState]);
  
  // Listen for instruction text update events
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleInstructionUpdate = (event) => {
      console.log(`📥 [TextboxComponent] Received instructionTextUpdate event:`, {
        eventInstructionId: event.detail?.instructionId,
        componentElementId: elementId,
        match: event.detail?.instructionId === elementId,
        text: event.detail?.text
      });
      
      if (event.detail?.instructionId === elementId) {
        console.log(`✅ [TextboxComponent] Matched! Updating text for ${elementId} to: "${event.detail.text}"`);
        setDynamicText(event.detail.text);
        setTextVersion(prev => prev + 1); // Force re-render
      } else {
        console.log(`⏭️ [TextboxComponent] Skipped - elementId mismatch (expected ${elementId}, got ${event.detail?.instructionId})`);
      }
    };
    
    // Also check global state on mount
    if (window.instructionTextUpdates && window.instructionTextUpdates[elementId]) {
      setDynamicText(window.instructionTextUpdates[elementId]);
      setTextVersion(prev => prev + 1);
    }
    
    window.addEventListener('instructionTextUpdate', handleInstructionUpdate);
    
    return () => {
      window.removeEventListener('instructionTextUpdate', handleInstructionUpdate);
    };
  }, [elementId]);
  
  // Listen for page reset events and restore text from props
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handlePageReset = (event) => {
      // Reset dynamic text on page reset
      setDynamicText(null);
      
      // Reset page8 animation state to WIP
      if (isPage8Header && typeof window !== 'undefined') {
        window.page8AnimationState = 'WIP';
        setPage8AnimationState('WIP');
        setTextVersion(prev => prev + 1);
      }
      
      // Restore text from props if the DOM was cleared
      const element = document.getElementById(elementId);
      if (element && textProp && !element.textContent && !element.innerHTML) {
        // DOM was cleared, restore from props
        if (allowHTML || (typeof textProp === 'string' && /<[^>]+>/.test(textProp))) {
          element.innerHTML = `<span style="display: inline;">${textProp}</span>`;
        } else {
          element.textContent = textProp;
        }
      }
    };
    
    window.addEventListener('pageStateReset', handlePageReset);
    window.addEventListener('globalPageReset', handlePageReset);
    
    return () => {
      window.removeEventListener('pageStateReset', handlePageReset);
      window.removeEventListener('globalPageReset', handlePageReset);
    };
  }, [elementId, textProp, allowHTML, isPage8Header]);
  
  // Check if text contains HTML tags
  const containsHTML = allowHTML || (typeof deferredText === 'string' && /<[^>]+>/.test(deferredText));
  
  // Use a unique key to force complete re-mount when text changes
  // For page8-header, include animation state in key
  const uniqueKey = isPage8Header 
    ? `textbox-${elementId}-v${textVersion}-${page8AnimationState || 'WIP'}`
    : `textbox-${elementId}-v${textVersion}`;
  
  const divProps = {
    id: elementId,
    className: `textbox-element textbox-element-${elementId}`,
    style: processedStyles,
    'data-element-type': 'textbox',
    'data-element-name': props.elementName || elementId,
    key: uniqueKey // Force re-render when text changes
  };
  
  // For page8-header, don't render text via React - we manage it directly via DOM
  if (isPage8Header) {
    console.log(`🎨 [TextboxComponent] RENDERING page8-header ${elementId}:`, {
      page8AnimationState,
      textVersion,
      uniqueKey,
      windowState: typeof window !== 'undefined' ? window.page8AnimationState : 'N/A',
      willRenderChildren: false,
      deferredText
    });
    
    // Use dangerouslySetInnerHTML with empty string to prevent React from rendering any content
    divProps.dangerouslySetInnerHTML = { __html: '' };
    
    // Don't set any text content - let the MutationObserver handle it
    const rendered = React.createElement('div', divProps);
    
    // Log after a short delay to see what React actually rendered
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const actualText = (element.textContent || element.innerText || '').trim();
        const childCount = element.childNodes.length;
        const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        console.log(`🔍 [TextboxComponent] After React render for ${elementId}:`, {
          actualText,
          childCount,
          textNodeCount: textNodes.length,
          textNodeContents: textNodes.map(n => n.textContent)
        });
      }
    }, 20);
    
    return rendered;
  }
  
  // Use dangerouslySetInnerHTML if HTML is detected, otherwise render as text
  // CRITICAL: Never set both dangerouslySetInnerHTML and children
  if (containsHTML) {
    const wrappedText = `<span style="display: inline;">${deferredText}</span>`;
    divProps.dangerouslySetInnerHTML = { __html: wrappedText };
    // Explicitly don't pass children when using innerHTML
    return React.createElement('div', divProps, null);
  } else {
    // Explicitly don't set dangerouslySetInnerHTML when rendering as text
    // Only pass text as children
    return React.createElement('div', divProps, deferredText || '');
  }
});

/**
 * Container Component (for general purpose containers)
 */
const ContainerComponent = React.memo((props) => {
  const elementId = React.useId();
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  return React.createElement('div', {
    id: elementId,
    className: 'container-element',
    style: processedStyles,
    'data-element-type': 'container'
  }, props.children);
});

// Feedback Textbox Elements Configuration
const FeedbackTextboxElement = {
  'feedback-textbox': {
    type: 'feedback-textbox',
    coordinates: [1, 1, 128, 10],
    zIndex: 'var(--z-content)',
    props: {
      text: 'Feedback message',
      fontSize: '32gc',
      borderRadius: '12gc',
      mode: 'normal',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10gc',
      boxSizing: 'border-box'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('feedback-textbox', (props, elementId) => {
      return React.createElement(FeedbackTextboxComponent, props);
    })
  },
  
  // Also provide standard textbox and container if not already available
  textbox: {
    type: 'textbox',
    coordinates: [1, 1, 128, 10],
    zIndex: 'var(--z-content)',
    props: {
      text: 'Text content',
      fontSize: '32gc',
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('textbox', (props, elementId) => {
      return React.createElement(TextboxComponent, props);
    })
  },
  
  container: {
    type: 'container',
    coordinates: [1, 1, 128, 72],
    zIndex: 'var(--z-content)',
    props: {
      backgroundColor: 'transparent',
      borderRadius: '0gc'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(ContainerComponent, props);
    })
  }
};

// Export components and configuration
window.FeedbackTextboxComponent = {
  FeedbackTextboxComponent,
  TextboxComponent,
  ContainerComponent,
  FeedbackTextboxElement
};

/**
 * Times4 Textbox Component - React component that updates text on quiz completion
 * Listens to quizCompleted event for page 7 and updates text from "×?" to "×4" with blinking animation
 * On page 8, it starts with "×4" directly
 */
const Times4TextboxComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;
  
  // Extract page number from component ID (e.g., 'page7-times4-text' -> 7)
  const pageMatch = componentId.match(/page(\d+)/);
  const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : null;
  
  // Helper function to get i18n text
  const getI18nText = (key, fallback) => {
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key, {}) || fallback;
    }
    return fallback;
  };
  
  // Initialize text based on page: page 8, 10, and 11 start with "×4", others start with "×?"
  const initialText = (pageNumber === 8 || pageNumber === 10 || pageNumber === 11) 
    ? getI18nText('common.labels.times4', '×4')
    : getI18nText('common.labels.timesQuestion', '×?');
  
  // Initialize blinking: page 10 and 11 blink by default, others don't
  const initialBlinking = (pageNumber === 10 || pageNumber === 11) ? true : false;
  
  // State for text and blinking
  const [text, setText] = React.useState(initialText);
  const [isBlinking, setIsBlinking] = React.useState(initialBlinking);
  
  // Listen for quizCompleted event for page 7 and 8
  React.useEffect(() => {
    const handleQuizCompleted = (event) => {
      const eventPageNumber = event.detail?.pageNumber;
      if (eventPageNumber === 7 || eventPageNumber === 8) {
        console.log(`🔍 [Times4Textbox] Quiz completed for page ${eventPageNumber}, updating text to ×4`);
        setText(getI18nText('common.labels.times4', '×4'));
        setIsBlinking(true);
      }
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);
    
    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, []);
  
  // Process styles
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  // Extract position and elementZIndex from props (they should be in otherProps from elements-registry)
  const position = props.position;
  const elementZIndex = props.elementZIndex || props.zIndex || 54;
  
  // Add blinking animation style
  const blinkKeyframes = `
    @keyframes blink-text {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;
  
  const containerStyle = {
    ...processedStyles,
    ...(position?.css || {}),
    zIndex: elementZIndex,
    position: 'absolute',
    ...(isBlinking ? {
      animation: 'blink-text 1s ease-in-out infinite'
    } : {})
  };
  
  return React.createElement(React.Fragment, null,
    React.createElement('style', {
      key: 'blink-keyframes',
      dangerouslySetInnerHTML: { __html: blinkKeyframes }
    }),
    React.createElement('div', {
      key: 'times4-textbox',
      id: elementId,
      className: 'times4-textbox-container',
      style: containerStyle,
      'data-element-type': 'times4-textbox'
    }, text)
  );
});

// Export Times4TextboxComponent
window.FeedbackTextboxComponent.Times4TextboxComponent = Times4TextboxComponent;

console.log('✅ Feedback textbox component loaded successfully');

