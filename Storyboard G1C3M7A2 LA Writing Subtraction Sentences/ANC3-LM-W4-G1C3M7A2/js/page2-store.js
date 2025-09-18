/**
 * Page 2 State Store using Zustand-like implementation
 * 
 * This store manages the state for page 2 including:
 * - Step visibility (step1, step2, step3, step4)
 * - Instruction header text
 * - Next button state (enabled/disabled, pulsating)
 * - Number pad state (enabled/disabled)
 * - Tap animation visibility
 * - User answer tracking
 * - State persistence on revisit
 */

// Simple Zustand-like store implementation for vanilla JS
const createPage2Store = () => {
  let state = {
    // Initial state values
    step1Visible: true,
    step2Visible: true,
    step3Visible: false,
    step4Visible: false,
    step5Visible: false,
    get instructionHeaderText() {
      return typeof i18n !== 'undefined' ? 
        i18n.t('subtraction.page2.instructionHeader') : 
        'Tap the correct number and then tap check.';
    },
    nextButtonEnabled: false,
    nextButtonPulsating: false,
    numberPadEnabled: true,
    tapAnimationPage21Visible: true,
    tapAnimationPage22Visible: false,
    page2Complete: false,
    
    // Answer tracking
    userAnswer: '',
    feedbackText: '',
    feedbackType: 'none', // 'success', 'error', 'none'
    
    // Visual state tracking
    answerTileColor: 'default', // 'default', 'green', 'red'
    numberPadTextAreaText: '',
    numberPadTextAreaType: 'default', // 'default', 'hint', 'correct', 'incorrect'
    
    // Input tile color tracking
    minuendTileColor: 'default', // 'default', 'green', 'red'
    subtrahendTileColor: 'default', // 'default', 'green', 'red'
    answerTilePageColor: 'default', // 'default', 'green', 'red' - for the new answer tile
    
    // Input tile state tracking for 'both' case
    minuendValue: '',
    subtrahendValue: '',
    answerValue: '',
    currentActiveTile: 'minuend', // 'minuend', 'subtrahend', 'answer' - which tile should pulsate
    minuendTilePulsating: false,
    subtrahendTilePulsating: false,
    answerTilePulsating: false,
    
    // Question-specific state
    currentQuestionIndex: 0,
    expectedAnswer: 2,
    
    // Persistence key
    _persistKey: 'page2-state-v1'
  };

  const listeners = new Set();
  
  // Load persisted state from sessionStorage (refreshes on browser refresh)
  const loadPersistedState = () => {
    try {
      const persistedData = sessionStorage.getItem(state._persistKey);
      if (persistedData) {
        const parsed = JSON.parse(persistedData);
        // Merge persisted state with current state, excluding functions and answer values
        Object.keys(parsed).forEach(key => {
          if (key !== '_persistKey' && 
              key !== 'answerValue' && // Always start with blank answer
              typeof parsed[key] !== 'function') {
            state[key] = parsed[key];
          }
        });
        console.log('🔄 [Page2Store] Loaded persisted state from session (excluding answerValue):', parsed);
      }
    } catch (error) {
      console.warn('⚠️ [Page2Store] Failed to load persisted state:', error);
    }
  };

  // Save state to sessionStorage (will be cleared on browser refresh)
  const persistState = () => {
    try {
      const stateToPersist = { ...state };
      delete stateToPersist._persistKey; // Don't persist the key itself
      
      sessionStorage.setItem(state._persistKey, JSON.stringify(stateToPersist));
      console.log('💾 [Page2Store] State persisted to session');
    } catch (error) {
      console.warn('⚠️ [Page2Store] Failed to persist state:', error);
    }
  };

  // Notify all listeners of state changes
  const notifyListeners = () => {
    listeners.forEach(listener => listener(state));
  };

  // Update state and persist
  const setState = (updates) => {
    const prevState = { ...state };
    
    if (typeof updates === 'function') {
      updates = updates(prevState);
    }
    
    state = { ...prevState, ...updates };
    
    // Persist state after update
    persistState();
    
    // Notify listeners
    notifyListeners();
    
    console.log('🔄 [Page2Store] State updated:', updates);
  };

  // Subscribe to state changes
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // Get current state
  const getState = () => state;

  // Action creators
  const actions = {
    // Set initial state (when page loads fresh or new question)
    setInitialState: () => {
      console.log('🔄 [Page2Store] Setting initial state');
      setState({
        step1Visible: true,
        step2Visible: true,
        step3Visible: false,
        step4Visible: false,
        step5Visible: false,
        instructionHeaderText: typeof i18n !== 'undefined' ? 
          i18n.t('subtraction.page2.instructionHeader') : 
          'Tap the correct number and then tap check.',
        nextButtonEnabled: false,
        nextButtonPulsating: false,
        numberPadEnabled: true,
        tapAnimationPage21Visible: true,
        tapAnimationPage22Visible: false,
        page2Complete: false,
        userAnswer: '',
        feedbackText: '',
        feedbackType: 'none',
        answerTileColor: 'default',
        numberPadTextAreaText: '',
        numberPadTextAreaType: 'default',
        minuendTileColor: 'default',
        subtrahendTileColor: 'default',
        answerTilePageColor: 'default',
        minuendValue: '',
        subtrahendValue: '',
        answerValue: '', // Always start blank
        currentActiveTile: 'minuend',
        minuendTilePulsating: false,
        subtrahendTilePulsating: false,
        answerTilePulsating: false
      });
    },

    // Set correct answer completed state
    setCorrectAnswerState: () => {
      console.log('✅ [Page2Store] Setting correct answer completed state');
      
      // Determine which tile(s) should be green based on missing value
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      let tileColors = {};
      if (currentQuestion.missing === 'both') {
        // For 'both' case, all tiles should be green
        tileColors = {
          minuendTileColor: 'green',
          subtrahendTileColor: 'green',
          answerTilePageColor: 'green'
        };
      } else {
        // For single missing value cases
        tileColors = {
          minuendTileColor: currentQuestion.missing === 'minuend' ? 'green' : 'default',
          subtrahendTileColor: currentQuestion.missing === 'subtrahend' ? 'green' : 'default',
          answerTilePageColor: 'green' // Answer tile is always filled by user
        };
      }
      
      setState({
        step1Visible: false,
        step2Visible: false,
        step3Visible: true,
        step4Visible: true,
        step5Visible: true,
        instructionHeaderText: typeof i18n !== 'undefined' ? 
          i18n.t('subtraction.page2.instructionHeaderCompleted') : 
          'Tap Next for the next challenge…',
        nextButtonEnabled: true,
        nextButtonPulsating: true,
        numberPadEnabled: false,
        tapAnimationPage21Visible: false,
        tapAnimationPage22Visible: true,
        page2Complete: true,
        feedbackType: 'success',
        answerTileColor: 'green',
        numberPadTextAreaType: 'correct',
        ...tileColors
      });
    },

    // Set incorrect answer state (keep working state but show feedback)
    setIncorrectAnswerState: (feedbackText, incorrectTiles = null) => {
      console.log(`❌ [Page2Store] Setting incorrect answer state: ${feedbackText}`);
      
      // Determine which tile(s) should be red based on missing value and specific incorrect tiles
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      let tileColors = {};
      let focusState = {};
      
      if (currentQuestion.missing === 'both') {
        // For 'both' case, determine which specific tiles are incorrect
        if (incorrectTiles) {
          tileColors = {
            minuendTileColor: incorrectTiles.minuend ? 'red' : state.minuendTileColor,
            subtrahendTileColor: incorrectTiles.subtrahend ? 'red' : state.subtrahendTileColor,
            answerTilePageColor: incorrectTiles.answer ? 'red' : state.answerTilePageColor
          };
        } else {
          // Default to all red if not specified
          tileColors = {
            minuendTileColor: 'red',
            subtrahendTileColor: 'red',
            answerTilePageColor: 'red'
          };
        }
        
        // Reset focus to minuend tile for 'both' case on incorrect answer
        focusState = {
          currentActiveTile: 'minuend',
          minuendTilePulsating: true,
          subtrahendTilePulsating: false,
          answerTilePulsating: false
        };
        console.log('🔄 [Page2Store] Reset focus to minuend tile after incorrect answer');
      } else {
        // For single missing value cases
        tileColors = {
          minuendTileColor: currentQuestion.missing === 'minuend' ? 'red' : state.minuendTileColor,
          subtrahendTileColor: currentQuestion.missing === 'subtrahend' ? 'red' : state.subtrahendTileColor,
          answerTilePageColor: 'red' // Answer tile is always filled by user
        };
      }
      
      setState({
        feedbackText: feedbackText,
        feedbackType: 'error',
        answerTileColor: 'red',
        numberPadTextAreaText: feedbackText,
        numberPadTextAreaType: 'incorrect',
        ...tileColors,
        ...focusState
        // Keep all other states the same - user can continue trying
      });
    },

    // Update user answer
    updateUserAnswer: (answer) => {
      console.log(`📝 [Page2Store] User answer updated: ${answer}`);
      setState({ userAnswer: answer.toString() });
    },

    // Clear user answer
    clearUserAnswer: () => {
      console.log('🧹 [Page2Store] User answer cleared');
      setState({ userAnswer: '' });
    },

    // Set feedback
    setFeedback: (text, type = 'none') => {
      console.log(`💬 [Page2Store] Setting feedback: ${text} (${type})`);
      setState({
        feedbackText: text,
        feedbackType: type
      });
    },

    // Clear feedback
    clearFeedback: () => {
      console.log('🧹 [Page2Store] Clearing feedback');
      setState({
        feedbackText: '',
        feedbackType: 'none',
        numberPadTextAreaText: '',
        numberPadTextAreaType: 'default'
      });
    },

    // Update answer tile color
    updateAnswerTileColor: (color) => {
      console.log(`🎨 [Page2Store] Answer tile color updated: ${color}`);
      setState({ answerTileColor: color });
    },

    // Update number pad text area
    updateNumberPadTextArea: (text, type = 'default') => {
      console.log(`📝 [Page2Store] Number pad text area updated: ${text} (${type})`);
      setState({
        numberPadTextAreaText: text,
        numberPadTextAreaType: type
      });
    },

    // Clear number pad text area
    clearNumberPadTextArea: () => {
      console.log('🧹 [Page2Store] Number pad text area cleared');
      setState({
        numberPadTextAreaText: '',
        numberPadTextAreaType: 'default'
      });
    },

    // Update question context
    updateQuestionContext: (questionIndex, expectedAnswer) => {
      console.log(`📝 [Page2Store] Question context updated: ${questionIndex}, expected: ${expectedAnswer}`);
      setState({
        currentQuestionIndex: questionIndex,
        expectedAnswer: expectedAnswer
      });
      
      // Initialize pulsating state for the new question after context is updated
      setTimeout(() => {
        actions.initializePulsatingState();
        console.log('✨ [Page2Store] Initialized pulsating state after question context update');
      }, 50);
    },

    // Update minuend tile color
    updateMinuendTileColor: (color) => {
      console.log(`🎨 [Page2Store] Minuend tile color updated: ${color}`);
      setState({ minuendTileColor: color });
    },

    // Update subtrahend tile color
    updateSubtrahendTileColor: (color) => {
      console.log(`🎨 [Page2Store] Subtrahend tile color updated: ${color}`);
      setState({ subtrahendTileColor: color });
    },

    // Update input tile color based on which is missing
    updateInputTileColor: (color) => {
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      if (currentQuestion.missing === 'minuend') {
        actions.updateMinuendTileColor(color);
      } else if (currentQuestion.missing === 'subtrahend') {
        actions.updateSubtrahendTileColor(color);
      } else if (currentQuestion.missing === 'both') {
        // For 'both' case, update the currently active tile
        if (state.currentActiveTile === 'minuend') {
          actions.updateMinuendTileColor(color);
        } else {
          actions.updateSubtrahendTileColor(color);
        }
      }
      console.log(`🎨 [Page2Store] Input tile (${currentQuestion.missing}) color updated: ${color}`);
    },

    // Initialize pulsating state based on question type
    initializePulsatingState: () => {
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      console.log(`🔍 [Page2Store] Initializing pulsating for question ${currentIndex + 1}, missing: ${currentQuestion.missing}`);
      
      if (currentQuestion.missing === 'both') {
        setState({
          currentActiveTile: 'minuend',
          minuendTilePulsating: true,
          subtrahendTilePulsating: false,
          answerTilePulsating: false
        });
        console.log('✨ [Page2Store] Initialized pulsating for both case - starting with minuend');
      } else if (currentQuestion.missing === 'minuend') {
        setState({
          currentActiveTile: 'minuend',
          minuendTilePulsating: true,
          subtrahendTilePulsating: false,
          answerTilePulsating: false
        });
        console.log('✨ [Page2Store] Initialized pulsating for minuend');
      } else if (currentQuestion.missing === 'subtrahend') {
        setState({
          currentActiveTile: 'subtrahend',
          minuendTilePulsating: false,
          subtrahendTilePulsating: true,
          answerTilePulsating: false
        });
        console.log('✨ [Page2Store] Initialized pulsating for subtrahend');
      } else {
        // Default case - focus on answer tile
        setState({
          currentActiveTile: 'answer',
          minuendTilePulsating: false,
          subtrahendTilePulsating: false,
          answerTilePulsating: true
        });
        console.log('✨ [Page2Store] Initialized pulsating for answer (default case)');
      }
    },

    // Update tile value and handle progression for all cases
    updateTileValue: (tileType, value) => {
      console.log(`📝 [Page2Store] Updating ${tileType} value: ${value}`);
      
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      if (tileType === 'minuend') {
        setState({ minuendValue: value });
        
        // If minuend is filled, move to next tile in sequence
        if (value !== '') {
          if (currentQuestion.missing === 'both') {
            // For 'both' case, move to subtrahend
            setState({
              currentActiveTile: 'subtrahend',
              minuendTilePulsating: false,
              subtrahendTilePulsating: true,
              answerTilePulsating: false
            });
            console.log('➡️ [Page2Store] Moved to subtrahend tile');
          } else {
            // For other cases, move to answer
            setState({
              currentActiveTile: 'answer',
              minuendTilePulsating: false,
              subtrahendTilePulsating: false,
              answerTilePulsating: true
            });
            console.log('➡️ [Page2Store] Moved to answer tile');
          }
        }
      } else if (tileType === 'subtrahend') {
        setState({ subtrahendValue: value });
        
        // If subtrahend is filled, move to answer tile
        if (value !== '') {
          setState({
            currentActiveTile: 'answer',
            minuendTilePulsating: false,
            subtrahendTilePulsating: false,
            answerTilePulsating: true
          });
          console.log('➡️ [Page2Store] Moved to answer tile');
        }
      } else if (tileType === 'answer') {
        setState({ answerValue: value });
        // Answer is the last tile, so no further progression needed
        if (value !== '') {
          console.log('✅ [Page2Store] Answer tile filled - sequence complete');
        }
      }
    },

    // Check if all values are filled (for 'both' case)
    areAllValuesFilled: () => {
      return state.minuendValue !== '' && state.subtrahendValue !== '' && state.answerValue !== '';
    },

    // Check if both values are filled (for 'both' case) - kept for backward compatibility
    areBothValuesFilled: () => {
      return state.minuendValue !== '' && state.subtrahendValue !== '';
    },

    // Stop all pulsating
    stopAllPulsating: () => {
      setState({
        minuendTilePulsating: false,
        subtrahendTilePulsating: false,
        answerTilePulsating: false
      });
      console.log('🛑 [Page2Store] Stopped all tile pulsating');
    },

    // Set focus to specific tile (for manual tile clicking)
    setTileFocus: (tileType) => {
      const currentIndex = state.currentQuestionIndex || 0;
      const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
      
      console.log(`👆 [Page2Store] Setting focus to ${tileType} tile for ${currentQuestion.missing} case`);
      console.log(`🔍 [Page2Store] Current state before focus change:`, {
        currentActiveTile: state.currentActiveTile,
        minuendPulsating: state.minuendTilePulsating,
        subtrahendPulsating: state.subtrahendTilePulsating,
        answerPulsating: state.answerTilePulsating
      });
      
      // Handle focus for all cases
      if (tileType === 'minuend') {
        setState({
          currentActiveTile: 'minuend',
          minuendTilePulsating: true,
          subtrahendTilePulsating: false,
          answerTilePulsating: false
        });
        console.log('👆 [Page2Store] Manual focus set to minuend tile');
      } else if (tileType === 'subtrahend') {
        setState({
          currentActiveTile: 'subtrahend',
          minuendTilePulsating: false,
          subtrahendTilePulsating: true,
          answerTilePulsating: false
        });
        console.log('👆 [Page2Store] Manual focus set to subtrahend tile');
      } else if (tileType === 'answer') {
        setState({
          currentActiveTile: 'answer',
          minuendTilePulsating: false,
          subtrahendTilePulsating: false,
          answerTilePulsating: true
        });
        console.log('👆 [Page2Store] Manual focus set to answer tile');
      }
      
      // Log the new state after setState completes
      setTimeout(() => {
        console.log(`✅ [Page2Store] Focus change completed. New state:`, {
          currentActiveTile: state.currentActiveTile,
          minuendPulsating: state.minuendTilePulsating,
          subtrahendPulsating: state.subtrahendTilePulsating,
          answerPulsating: state.answerTilePulsating
        });
      }, 0);
    },

    // Reset state for new question
    resetForNewQuestion: () => {
      console.log('🔄 [Page2Store] Resetting for new question');
      actions.setInitialState();
      // Note: Pulsating state will be initialized when updateQuestionContext is called
    },

    // Clear all persisted state
    clearPersistedState: () => {
      console.log('🧹 [Page2Store] Clearing persisted state');
      try {
        sessionStorage.removeItem(state._persistKey);
        actions.setInitialState();
      } catch (error) {
        console.warn('⚠️ [Page2Store] Failed to clear persisted state:', error);
      }
    }
  };

  // Load persisted state on initialization
  loadPersistedState();

  return {
    getState,
    setState,
    subscribe,
    ...actions
  };
};

// Create the store instance
const page2Store = createPage2Store();

// Make store available globally
if (typeof window !== 'undefined') {
  window.page2Store = page2Store;
  
  // Expose actions for easy access
  window.setPage2InitialState = page2Store.setInitialState;
  window.setPage2CorrectAnswerState = page2Store.setCorrectAnswerState;
  window.setPage2IncorrectAnswerState = page2Store.setIncorrectAnswerState;
  window.updatePage2UserAnswer = page2Store.updateUserAnswer;
  window.clearPage2UserAnswer = page2Store.clearUserAnswer;
  window.setPage2Feedback = page2Store.setFeedback;
  window.clearPage2Feedback = page2Store.clearFeedback;
  window.updatePage2AnswerTileColor = page2Store.updateAnswerTileColor;
  window.updatePage2NumberPadTextArea = page2Store.updateNumberPadTextArea;
  window.clearPage2NumberPadTextArea = page2Store.clearNumberPadTextArea;
  window.updatePage2QuestionContext = page2Store.updateQuestionContext;
  window.resetPage2ForNewQuestion = page2Store.resetForNewQuestion;
  window.clearPage2PersistedState = page2Store.clearPersistedState;
  window.updatePage2MinuendTileColor = page2Store.updateMinuendTileColor;
  window.updatePage2SubtrahendTileColor = page2Store.updateSubtrahendTileColor;
  window.updatePage2InputTileColor = page2Store.updateInputTileColor;
  window.initializePage2PulsatingState = page2Store.initializePulsatingState;
  window.updatePage2TileValue = page2Store.updateTileValue;
  window.arePage2BothValuesFilled = page2Store.areBothValuesFilled;
  window.stopPage2AllPulsating = page2Store.stopAllPulsating;
  window.setPage2TileFocus = page2Store.setTileFocus;
  
  console.log('✅ Page 2 Store initialized and available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = page2Store;
}
