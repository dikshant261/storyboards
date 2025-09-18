/**
 * Page 1 State Store using Zustand
 * 
 * This store manages the state for page 1 including:
 * - Check button state (pulsating/disabled)
 * - Tap animation visibility
 * - Car clickability
 * - Next/Previous button states
 * - Removed cars tracking
 * - State persistence on revisit
 */

// Simple Zustand-like store implementation for vanilla JS
const createPage1Store = () => {
  let state = {
    // Initial state values
    checkButtonPulsating: true,
    checkButtonDisabled: false,
    tapAnimationPage1Visible: true,
    tapAnimationNextPage1Hidden: true,
    carsClickable: true,
    nextButtonEnabled: true,
    nextButtonPulsating: false,
    prevButtonDisabled: true,
    objectsRemoved: 0,
    page1Complete: false,
    feedbackVisible: false,
    feedbackText: '',
    feedbackType: 'none', // 'success', 'error', 'none'
    
    // Car-specific state tracking
    crossedCars: new Set(), // Set of car numbers that are crossed out
    
    // Question-specific state
    currentQuestionIndex: 0,
    expectedSubtrahend: 3,
    
    // Persistence key
    _persistKey: 'page1-state-v1'
  };

  const listeners = new Set();
  
  // Load persisted state from sessionStorage (refreshes on browser refresh)
  const loadPersistedState = () => {
    try {
      const persistedData = sessionStorage.getItem(state._persistKey);
      if (persistedData) {
        const parsed = JSON.parse(persistedData);
        // Merge persisted state with current state, excluding functions
        Object.keys(parsed).forEach(key => {
          if (key !== '_persistKey' && typeof parsed[key] !== 'function') {
            if (key === 'crossedCars') {
              // Convert array back to Set
              state[key] = new Set(parsed[key] || []);
            } else {
              state[key] = parsed[key];
            }
          }
        });
        console.log('🔄 [Page1Store] Loaded persisted state from session:', parsed);
      }
    } catch (error) {
      console.warn('⚠️ [Page1Store] Failed to load persisted state:', error);
    }
  };

  // Save state to sessionStorage (will be cleared on browser refresh)
  const persistState = () => {
    try {
      const stateToPersist = { ...state };
      delete stateToPersist._persistKey; // Don't persist the key itself
      
      // Convert Set to Array for JSON serialization
      if (stateToPersist.crossedCars instanceof Set) {
        stateToPersist.crossedCars = Array.from(stateToPersist.crossedCars);
      }
      
      sessionStorage.setItem(state._persistKey, JSON.stringify(stateToPersist));
      console.log('💾 [Page1Store] State persisted to session');
    } catch (error) {
      console.warn('⚠️ [Page1Store] Failed to persist state:', error);
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
    
    console.log('🔄 [Page1Store] State updated:', updates);
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
    // Set initial state (when page loads fresh)
    setInitialState: () => {
      console.log('🔄 [Page1Store] Setting initial state');
      setState({
        checkButtonPulsating: true,
        checkButtonDisabled: false,
        tapAnimationPage1Visible: true,
        tapAnimationNextPage1Hidden: true,
        carsClickable: true,
        nextButtonEnabled: true,
        nextButtonPulsating: false,
        prevButtonDisabled: true,
        objectsRemoved: 0,
        crossedCars: new Set(),
        page1Complete: false,
        feedbackVisible: false,
        feedbackText: '',
        feedbackType: 'none'
      });
    },

    // Set correct answer state (when user gives correct answer)
    setCorrectAnswerState: () => {
      console.log('✅ [Page1Store] Setting correct answer state');
      setState({
        checkButtonPulsating: false,
        checkButtonDisabled: true,
        tapAnimationPage1Visible: false,
        tapAnimationNextPage1Hidden: false,
        carsClickable: false,
        nextButtonEnabled: true,
        nextButtonPulsating: true,
        prevButtonDisabled: true,
        page1Complete: true,
        feedbackVisible: true,
        feedbackType: 'success'
      });
    },

    // Update objects removed count
    updateObjectsRemoved: (count) => {
      console.log(`🚗 [Page1Store] Objects removed: ${count}`);
      setState({ objectsRemoved: count });
    },

    // Cross out a specific car
    crossOutCar: (carNumber) => {
      const newCrossedCars = new Set(state.crossedCars);
      newCrossedCars.add(carNumber);
      const newCount = newCrossedCars.size;
      
      console.log(`🚗❌ [Page1Store] Car ${carNumber} crossed out, total: ${newCount}`);
      setState({ 
        crossedCars: newCrossedCars,
        objectsRemoved: newCount
      });
    },

    // Un-cross a specific car
    unCrossOutCar: (carNumber) => {
      const newCrossedCars = new Set(state.crossedCars);
      newCrossedCars.delete(carNumber);
      const newCount = newCrossedCars.size;
      
      console.log(`🚗✅ [Page1Store] Car ${carNumber} un-crossed, total: ${newCount}`);
      setState({ 
        crossedCars: newCrossedCars,
        objectsRemoved: newCount
      });
    },

    // Check if a specific car is crossed out
    isCarCrossedOut: (carNumber) => {
      return state.crossedCars.has(carNumber);
    },

    // Get all crossed out car numbers
    getCrossedCars: () => {
      return Array.from(state.crossedCars);
    },

    // Set feedback
    setFeedback: (text, type = 'none') => {
      console.log(`💬 [Page1Store] Setting feedback: ${text} (${type})`);
      setState({
        feedbackText: text,
        feedbackType: type,
        feedbackVisible: text !== ''
      });
    },

    // Clear feedback
    clearFeedback: () => {
      console.log('🧹 [Page1Store] Clearing feedback');
      setState({
        feedbackText: '',
        feedbackType: 'none',
        feedbackVisible: false
      });
    },

    // Update question context
    updateQuestionContext: (questionIndex, expectedSubtrahend) => {
      console.log(`📝 [Page1Store] Question context updated: ${questionIndex}, expected: ${expectedSubtrahend}`);
      setState({
        currentQuestionIndex: questionIndex,
        expectedSubtrahend: expectedSubtrahend
      });
    },

    // Reset state for new question
    resetForNewQuestion: () => {
      console.log('🔄 [Page1Store] Resetting for new question');
      actions.setInitialState();
    },

    // Clear all persisted state
    clearPersistedState: () => {
      console.log('🧹 [Page1Store] Clearing persisted state');
      try {
        sessionStorage.removeItem(state._persistKey);
        actions.setInitialState();
      } catch (error) {
        console.warn('⚠️ [Page1Store] Failed to clear persisted state:', error);
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
const page1Store = createPage1Store();

// Make store available globally
if (typeof window !== 'undefined') {
  window.page1Store = page1Store;
  
  // Expose actions for easy access
  window.setPage1InitialState = page1Store.setInitialState;
  window.setPage1CorrectAnswerState = page1Store.setCorrectAnswerState;
  window.updatePage1ObjectsRemoved = page1Store.updateObjectsRemoved;
  window.crossOutCar = page1Store.crossOutCar;
  window.unCrossOutCar = page1Store.unCrossOutCar;
  window.isCarCrossedOut = page1Store.isCarCrossedOut;
  window.getCrossedCars = page1Store.getCrossedCars;
  window.setPage1Feedback = page1Store.setFeedback;
  window.clearPage1Feedback = page1Store.clearFeedback;
  window.updatePage1QuestionContext = page1Store.updateQuestionContext;
  window.resetPage1ForNewQuestion = page1Store.resetForNewQuestion;
  window.clearPage1PersistedState = page1Store.clearPersistedState;
  
  console.log('✅ Page 1 Store initialized and available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = page1Store;
}
