/**
 * Page Configuration - Optimized
 * 
 * This optimized version provides:
 * - Custom hooks for sound management and state updates
 * - Memoized components and callbacks for better performance
 * - Centralized state management with Context API
 * - Modern async patterns and cleanup
 */

// ===== REACT IMPORTS =====
// Note: Using React. prefix to avoid conflicts with other modules

// ===== SOUND MANAGEMENT CONTEXT =====
const SoundContext = React.createContext(null);

/**
 * Sound Manager Hook - Optimized
 */
const useSoundManager = () => {
  const [audioCache, setAudioCache] = React.useState(new Map());
  
  // Preload audio files
  React.useEffect(() => {
    const preloadAudio = async () => {
      const soundFiles = ['correct.mp3', 'wrong.mp3', 'click.mp3'];
      const cache = new Map();
      
      for (const file of soundFiles) {
        try {
          const audio = new Audio(`assets/${file}`);
          audio.preload = 'auto';
          cache.set(file, audio);
    } catch (error) {
          console.warn(`🔊 Failed to preload ${file}:`, error);
        }
      }
      
      setAudioCache(cache);
    };
    
    preloadAudio();
  }, []);
  
  const playSound = React.useCallback((soundType, options = {}) => {
      try {
        const { volume = 0.5, carNumber } = options;
        let soundFile = '';
        
        switch (soundType) {
          case 'correct':
            soundFile = 'correct.mp3';
            break;
          case 'wrong':
            soundFile = 'wrong.mp3';
            break;
          case 'click':
            soundFile = 'click.mp3';
            break;
          default:
            console.warn(`🔊 Unknown sound type: ${soundType}`);
            return;
        }
        
        // Try cached audio first
        let audio = audioCache.get(soundFile);
        if (!audio) {
          // Fallback to new Audio instance
          audio = new Audio(`assets/${soundFile}`);
        }
        
        audio.volume = volume;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
            const logMessage = carNumber 
              ? `🔊 Car ${carNumber} ${soundType} sound played successfully`
              : `🔊 ${soundType} sound played successfully`;
            console.log(logMessage);
            }).catch(error => {
            const errorMessage = carNumber
              ? `🔊 Car ${carNumber} ${soundType} sound failed: ${error}`
              : `🔊 ${soundType} sound failed: ${error}`;
            console.warn(errorMessage);
            });
        }
    } catch (error) {
        console.warn(`🔊 Sound creation error for ${soundType}:`, error);
      }
  }, [audioCache]);
  
  return { playSound };
};

/**
 * Sound Provider Component
 */
const SoundProvider = React.memo(({ children }) => {
  const soundManager = useSoundManager();
  
  return React.createElement(SoundContext.Provider, {
    value: soundManager
  }, children);
});

/**
 * Hook to use sound context
 */
const useSound = () => {
  const context = React.useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
};

// ===== PAGE STATE MANAGEMENT CONTEXT =====
const PageStateContext = React.createContext(null);

/**
 * Page State Manager Hook
 */
const usePageStateManager = () => {
  const [pageStates, setPageStates] = React.useState({
    page1complete: false,
    page2complete: false,
    objectsremoved: 0,
    answerPage2: '',
    birdcountpage2: 0,
    birdsflown: 0,
    currentQuestionIndex: 0
  });
  
  const updatePageState = React.useCallback((updates) => {
      setPageStates(prev => ({ ...prev, ...updates }));
  }, []);
  
  const resetPageStates = React.useCallback(() => {
      setPageStates(prev => ({
        ...prev,
        page1complete: false,
        page2complete: false,
        objectsremoved: 0,
        answerPage2: '',
        birdcountpage2: 0
      }));
  }, []);
  
  // Sync with window object for backward compatibility
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      Object.assign(window, pageStates);
    }
  }, [pageStates]);
  
  return {
    pageStates,
    updatePageState,
    resetPageStates
  };
};

/**
 * Page State Provider Component
 */
const PageStateProvider = React.memo(({ children }) => {
  const pageStateManager = usePageStateManager();
  
  return React.createElement(PageStateContext.Provider, {
    value: pageStateManager
  }, children);
});

/**
 * Hook to use page state context
 */
const usePageState = () => {
  const context = React.useContext(PageStateContext);
  if (!context) {
    throw new Error('usePageState must be used within PageStateProvider');
  }
  return context;
};

// ===== WEB AUDIO API SOUND GENERATION =====
/**
 * Web Audio Context Hook
 */
const useWebAudio = () => {
  const [audioContext, setAudioContext] = React.useState(null);
  
  React.useEffect(() => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      
      return () => {
        if (context.state !== 'closed') {
          context.close();
        }
      };
    } catch (error) {
        console.warn('🔊 Web Audio API not supported:', error);
    }
  }, []);
  
  const playTone = React.useCallback((frequency, duration, type = 'sine') => {
    if (!audioContext) return;
    
      try {
        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
        gainNode.gain.linearRampToValueAtTime(0.08, now + duration * 0.8);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
        
        console.log(`🔊 Playing tone: ${frequency}Hz for ${duration}s`);
      } catch (error) {
        console.warn('🔊 Tone generation error:', error);
      }
  }, [audioContext]);
  
  const playStartSound = React.useCallback(() => {
        if (!audioContext) return;

      try {
        const now = audioContext.currentTime;
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator1.frequency.setValueAtTime(523.25, now); // C5
        oscillator1.type = 'sine';
        oscillator2.frequency.setValueAtTime(659.25, now); // E5
        oscillator2.type = 'sine';

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.5);

        oscillator1.start(now);
        oscillator2.start(now);
        oscillator1.stop(now + 0.5);
        oscillator2.stop(now + 0.5);

        console.log('🔊 Playing start sound (ascending chime)');
    } catch (error) {
        console.warn('🔊 Start sound generation error:', error);
    }
  }, [audioContext]);
  
  const playNextSound = React.useCallback(() => {
    playTone(783.99, 0.25); // G5
  }, [playTone]);
  
  return { playTone, playStartSound, playNextSound, audioContext };
};

// ===== OPTIMIZED UI UPDATE HOOKS =====
/**
 * Dialog Box Update Hook
 */
const useDialogBoxUpdater = () => {
  const { pageStates } = usePageState();
  
  const updateDialogBox = React.useCallback(() => {
    console.log('🔍 updateDialogBox called');
      
    const dialogElement = document.querySelector('[data-element-name="dialog-bubble-page2"]');
    console.log('🔍 Dialog element found:', !!dialogElement);
    
    if (dialogElement) {
        const birdCount = pageStates.birdcountpage2 || 0;
        const birdCountStr = String(birdCount);
        
        const plainText = typeof i18n !== 'undefined' ? 
            i18n.t('dialogs.page2.character', { birdCount: birdCountStr }) : 
            `There are total ${birdCountStr} birds on the tree.`;
        
        const styledText = plainText.replace(
            birdCountStr, 
            `<span style="font-size: 135%; font-weight: 700; color: #FFAB40; display: inline; text-shadow: 1px 1px 0 #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000;">${birdCountStr}</span>`
        );
        
        const wrappedText = `<div style="text-align: center; width: 100%;">${styledText}</div>`;
        const textContainer = dialogElement.querySelector('.dialog-text') || dialogElement;
        
        textContainer.innerHTML = '';
        textContainer.innerHTML = wrappedText;
        
        dialogElement.style.display = 'flex';
        dialogElement.style.alignItems = 'center';
        dialogElement.style.justifyContent = 'center';
        dialogElement.style.whiteSpace = 'normal';
        
        console.log(`📝 Dialog updated with bird count: ${birdCount}`);
      }
  }, [pageStates.birdcountpage2]);
  
  return { updateDialogBox };
};

/**
 * Answer Container Update Hook for Page 2
 */
const useAnswerContainerUpdater = () => {
  const { pageStates } = usePageState();
  
  const updateAnswerContainerPage2 = React.useCallback(() => {
    console.log('🔄 [Page 2] updateAnswerContainerPage2 called');
    
    const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
    if (!answerContainer) {
        console.warn('⚠️ [Page 2] Answer container not found');
        return;
    }
    
      const currentIndex = pageStates.currentQuestionIndex || 0;
      const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex].minuend : 5;
      const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex].subtrahend : 3;
      const userAnswer = (typeof window !== 'undefined' && window.answerPage2) || pageStates.answerPage2 || '';
      
    let displayText = '';
      const tileWidth = Math.round(60 * 1.15);
      const tileHeight = Math.round(60 * 1.15);
      const fontSize = Math.round(35 * 1.15);
      const lineHeight = tileHeight - 6;
    
    if (userAnswer === '') {
        displayText = `Subtracting ${subtrahend} from ${minuend} gives <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #F5F5F5; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px;"></span>`;
        } else {
        displayText = `Subtracting ${subtrahend} from ${minuend} gives <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #FFFFFF; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px; font-weight: bold; color: #000000;">${userAnswer}</span>`;
    }
    
    answerContainer.innerHTML = displayText;
    console.log('📝 [Page 2] Answer container updated:', displayText);
  }, [pageStates.answerPage2, pageStates.currentQuestionIndex]);

  const updateAnswerTileColor = React.useCallback((isCorrect) => {
    console.log('🎨 [Page 2] updateAnswerTileColor called, isCorrect:', isCorrect);
    
    const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
      if (!answerContainer) return;
    
    const tileSpan = answerContainer.querySelector('span');
      if (!tileSpan) return;
    
    if (isCorrect) {
        tileSpan.style.backgroundColor = '#4CAF50';
        tileSpan.style.color = '#ffffff';
        tileSpan.style.border = '3px solid #2E7D32';
        console.log('✅ [Page 2] Answer tile colored green (correct)');
        } else {
        tileSpan.style.backgroundColor = '#F44336';
        tileSpan.style.color = '#ffffff';
        tileSpan.style.border = '3px solid #C62828';
        console.log('❌ [Page 2] Answer tile colored red (incorrect)');
    }
  }, []);
  
  return { updateAnswerContainerPage2, updateAnswerTileColor };
};

/**
 * Button State Manager Hook - Enhanced with Zustand Store Integration
 */
const useButtonStateManager = () => {
  const { pageStates } = usePageState();
  
  // Initialize page1 store integration
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.page1Store) {
      // Subscribe to page1 store changes and sync with legacy pageStates
      const unsubscribe = window.page1Store.subscribe((state) => {
        // Update legacy window variables for backward compatibility
        window.page1complete = state.page1Complete;
        window.objectsremoved = state.objectsRemoved;
        
        console.log('🔄 [PageConfig] Synced page1Store state to legacy variables');
      });
      
      // Initialize store with current question context
      if (window.QUESTIONS && window.currentQuestionIndex !== undefined) {
        const currentQuestion = window.QUESTIONS[window.currentQuestionIndex];
        if (currentQuestion) {
          window.page1Store.updateQuestionContext(
            window.currentQuestionIndex,
            currentQuestion.subtrahend
          );
        }
      }
      
      return unsubscribe;
    }
  }, []);
  
  const updatePage1ButtonStates = React.useCallback(() => {
    // Use page1Store state if available, otherwise fall back to legacy state
      let isPage1Completed = pageStates.page1complete;
      
      if (typeof window !== 'undefined' && window.page1Store) {
        const storeState = window.page1Store.getState();
        isPage1Completed = storeState.page1Complete;
        
        console.log(`🔄 [Page 1] Using store state - page1complete: ${isPage1Completed}`);
        
        // The UI Manager will handle all visual updates automatically
        // This function is kept for backward compatibility
        return;
      }
      
      // Legacy fallback code (kept for compatibility)
    const checkButton = document.querySelector('[data-element-name="check-button"]');
    const tapAnimation = document.querySelector('[data-element-name="tap-animation-page1"]');
    const tapAnimationNext = document.querySelector('[data-element-name="tap-animation-next-page1"]');
    const nextButton = document.querySelector('[data-element-name="next-button"]');
    const feedbackElement = document.querySelector('[data-element-name="feedback-page1"]');
    
      console.log(`🔄 [Page 1] Legacy update - page1complete: ${isPage1Completed}`);
    
    if (isPage1Completed) {
        // Page completed logic
        if (checkButton) {
            const currentBgColor = checkButton.style.backgroundColor;
            const isGreen = currentBgColor === 'rgb(76, 175, 80)' || currentBgColor === '#4CAF50';
            
            if (!isGreen) {
                checkButton.style.opacity = '0.6';
                checkButton.style.backgroundColor = '#FFAB40';
                checkButton.style.border = '3px solid white';
            }
            
            checkButton.style.cursor = 'not-allowed';
            checkButton.disabled = true;
          checkButton.style.animation = '';
            checkButton.classList.remove('pulsating');
        }
        
        if (tapAnimation) tapAnimation.style.display = 'none';
        if (tapAnimationNext) tapAnimationNext.style.display = 'block';
        
        if (feedbackElement && feedbackElement.innerHTML.trim() !== '') {
            feedbackElement.style.display = 'flex';
        }
        
        if (nextButton) {
            nextButton.style.opacity = '1';
            nextButton.style.cursor = 'pointer';
            nextButton.disabled = false;
          nextButton.style.pointerEvents = 'auto';
            nextButton.style.animation = 'pulse 2s infinite';
            nextButton.classList.add('pulsating');
            nextButton.style.boxShadow = '0 0 20px rgba(255, 171, 64, 0.8), 0 0 40px rgba(255, 171, 64, 0.6)';
            nextButton.style.filter = 'brightness(1.2)';
        }
    } else {
        // Page not completed logic
        if (checkButton) {
            checkButton.style.opacity = '1';
            checkButton.style.cursor = 'pointer';
            checkButton.disabled = false;
            checkButton.style.animation = 'pulse 2s infinite';
            checkButton.classList.add('pulsating');
        }
        
        if (tapAnimation) tapAnimation.style.display = 'block';
        if (tapAnimationNext) tapAnimationNext.style.display = 'none';
        
        if (nextButton) {
            nextButton.style.opacity = '0.6';
            nextButton.style.cursor = 'not-allowed';
            nextButton.disabled = true;
          nextButton.style.pointerEvents = 'none';
          nextButton.style.animation = '';
            nextButton.classList.remove('pulsating');
            nextButton.style.boxShadow = '';
            nextButton.style.filter = '';
        }
      }
  }, [pageStates.page1complete]);
  
  const updatePage2CompletionState = React.useCallback(() => {
    console.log('🔄 [Page 2] updatePage2CompletionState called');
      console.log('🔍 [Page 2] Current pageStates.page2complete:', pageStates.page2complete);
      console.log('🔍 [Page 2] Current window.page2complete:', typeof window !== 'undefined' ? window.page2complete : 'undefined');
      
      const elements = {
        step1: document.querySelector('[data-element-name="step1-completed"]'),
        step2: document.querySelector('[data-element-name="step2-instruction"]'),
        step3: document.querySelector('[data-element-name="step3-page2"]'),
        step4line1: document.querySelector('[data-element-name="step4-line1-page2"]'),
        step4line2: document.querySelector('[data-element-name="step4-line2-page2"]'),
        step4line3: document.querySelector('[data-element-name="step4-line3-page2"]'),
        step5line1: document.querySelector('[data-element-name="step5-line1-page2"]'),
        step5line2: document.querySelector('[data-element-name="step5-line2-page2"]'),
        hint: document.querySelector('[data-element-name="hint-text-page2"]'),
        instruction: document.querySelector('[data-element-name="instruction-box-page2"]'),
        tapAnimation1: document.querySelector('[data-element-name="tap-animation-page2-1"]'),
        tapAnimation2: document.querySelector('[data-element-name="tap-animation-page2-2"]'),
        nextButton: document.querySelector('[data-element-name="next-button-page2"]')
      };
      
      if (pageStates.page2complete) {
        console.log('✅ [Page 2] Page completed - updating visibility');
        
        // Hide Step 1 and Step 2
        if (elements.step1) {
          elements.step1.style.display = 'none';
          console.log('🔄 [Page 2] Step 1 hidden');
        }
        if (elements.step2) {
          elements.step2.style.display = 'none';
          console.log('🔄 [Page 2] Step 2 hidden');
        }
        if (elements.hint) {
          elements.hint.style.display = 'none';
          console.log('🔄 [Page 2] Hint text hidden');
        }
        
        // Show Step 3, Step 4 lines, and Step 5 lines
        if (elements.step3) {
          elements.step3.style.display = 'flex';
          console.log('✅ [Page 2] Step 3 shown');
        }
        if (elements.step4line1) {
          elements.step4line1.style.display = 'flex';
          console.log('✅ [Page 2] Step 4 line 1 shown');
        }
        if (elements.step4line2) {
          elements.step4line2.style.display = 'flex';
          console.log('✅ [Page 2] Step 4 line 2 shown');
        }
        if (elements.step4line3) {
          elements.step4line3.style.display = 'flex';
          console.log('✅ [Page 2] Step 4 line 3 shown');
        }
        if (elements.step5line1) {
          elements.step5line1.style.display = 'flex';
          console.log('✅ [Page 2] Step 5 line 1 shown');
        }
        if (elements.step5line2) {
          elements.step5line2.style.display = 'flex';
          console.log('✅ [Page 2] Step 5 line 2 shown');
        }
        
        // Update instruction header text
        if (elements.instruction) {
          elements.instruction.innerHTML = typeof i18n !== 'undefined' ? 
            i18n.t('subtraction.page2.instructionHeaderCompleted') : 
            'Tap Next for the next challenge…';
          console.log('✅ [Page 2] Instruction header updated');
        }
        
        // Hide tap animation 1 and show tap animation 2
        if (elements.tapAnimation1) {
          elements.tapAnimation1.style.display = 'none';
          console.log('🔄 [Page 2] Tap animation 1 hidden');
        }
        if (elements.tapAnimation2) {
          elements.tapAnimation2.style.display = 'block';
          console.log('✅ [Page 2] Tap animation 2 shown');
        }
        
        // Enable and pulsate next button
        if (elements.nextButton) {
          // Clear any existing styles that might interfere
          elements.nextButton.style.removeProperty('animation');
          elements.nextButton.classList.remove('pulsating');
          
          // Apply new styles
          elements.nextButton.style.opacity = '1';
          elements.nextButton.style.cursor = 'pointer';
          elements.nextButton.disabled = false;
          elements.nextButton.style.pointerEvents = 'auto';
          
          // Force the animation with !important and multiple fallbacks
          elements.nextButton.style.setProperty('animation', 'nextButtonPulse 1.5s ease-in-out infinite', 'important');
          elements.nextButton.classList.add('pulsating');
          elements.nextButton.classList.add('math-app-pulse-animation');
          elements.nextButton.style.setProperty('box-shadow', '0 0 20px rgba(255, 171, 64, 0.8), 0 0 40px rgba(255, 171, 64, 0.6)', 'important');
          elements.nextButton.style.setProperty('filter', 'brightness(1.2)', 'important');
          
          // Also update the button text to reflect current state
          if (typeof window !== 'undefined' && window.getNextButtonText) {
            elements.nextButton.textContent = window.getNextButtonText();
          }
          
          console.log('✅ [Page 2] Next button enabled and pulsating');
          console.log('🔍 [Page 2] Button animation style:', elements.nextButton.style.animation);
          console.log('🔍 [Page 2] Button classes:', elements.nextButton.className);
        }
        
        // Disable the entire number pad
        const numberPadPanel = document.querySelector('[data-element-name="number-pad-panel-page2"]');
        if (numberPadPanel) {
          // Disable all buttons in the number pad
          const allButtons = numberPadPanel.querySelectorAll('button');
          allButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
          });
          
          // Also disable the text area if it exists
          const textArea = numberPadPanel.querySelector('textarea, input[type="text"]');
          if (textArea) {
            textArea.disabled = true;
            textArea.style.opacity = '0.5';
          }
          
          console.log('✅ [Page 2] Number pad completely disabled');
        }
        
      } else {
        console.log('🔄 [Page 2] Page not completed - maintaining initial state');
        
        // Show Step 1 and Step 2
        if (elements.step1) {
          elements.step1.style.display = 'flex';
        }
        if (elements.step2) {
          elements.step2.style.display = 'flex';
        }
        if (elements.hint) {
          elements.hint.style.display = 'flex';
        }
        
        // Hide Step 3 and Step 4
        if (elements.step3) {
          elements.step3.style.display = 'none';
        }
        if (elements.step4) {
          elements.step4.style.display = 'none';
        }
        
        // Show tap animation 1 and hide tap animation 2
        if (elements.tapAnimation1) {
          elements.tapAnimation1.style.display = 'block';
        }
        if (elements.tapAnimation2) {
          elements.tapAnimation2.style.display = 'none';
        }
        
        // Disable next button
        if (elements.nextButton) {
          elements.nextButton.style.opacity = '0.6';
          elements.nextButton.style.cursor = 'not-allowed';
          elements.nextButton.disabled = true;
          elements.nextButton.style.pointerEvents = 'none';
          elements.nextButton.style.animation = '';
          elements.nextButton.classList.remove('pulsating');
          elements.nextButton.style.boxShadow = '';
          elements.nextButton.style.filter = '';
          console.log('🔄 [Page 2] Next button disabled');
        }
      }
  }, [pageStates.page2complete]);
  
  return { 
    updatePage1ButtonStates, 
    updatePage2CompletionState
  };
};

/**
 * Question Management Hook
 */
const useQuestionManager = () => {
  const { pageStates, updatePageState, resetPageStates } = usePageState();
  
  const advanceToNextQuestion = React.useCallback(() => {
    return new Promise((resolve) => {
      console.log('🔄 [Navigation] advanceToNextQuestion called');
        
        if (typeof window !== 'undefined' && window.QUESTIONS) {
          const totalQuestions = window.QUESTIONS.length;
          const currentIndex = pageStates.currentQuestionIndex || 0;
          
          console.log('📊 [Navigation] Current question:', currentIndex + 1, 'of', totalQuestions);
          
          let newIndex;
          if (currentIndex < totalQuestions - 1) {
            newIndex = currentIndex + 1;
            console.log('➡️ [Navigation] Advanced to question', newIndex + 1);
    } else {
            newIndex = 0;
            console.log('🔄 [Navigation] Starting over from question 1');
          }
          
          updatePageState({ currentQuestionIndex: newIndex });
          resetPageStates();
          
          // Reset page stores for new question
          if (window.page1Store) {
            window.page1Store.resetForNewQuestion();
            // Update question context
            const newQuestion = window.QUESTIONS[newIndex];
            if (newQuestion) {
              window.page1Store.updateQuestionContext(newIndex, newQuestion.subtrahend);
            }
          }
          
          if (window.page2Store) {
            window.page2Store.resetForNewQuestion();
            // Update question context
            const newQuestion = window.QUESTIONS[newIndex];
            if (newQuestion) {
              const expectedAnswer = newQuestion.minuend - newQuestion.subtrahend;
              window.page2Store.updateQuestionContext(newIndex, expectedAnswer);
            }
          }
          
          // Update UI elements that depend on current question
            setTimeout(() => {
            updateQuestionDependentElements();
            resolve(newIndex);
            }, 100);
        } else {
          resolve(0);
        }
      });
  }, [pageStates.currentQuestionIndex, updatePageState, resetPageStates]);
  
  const updateQuestionDependentElements = React.useCallback(() => {
    console.log('🔄 [UI] Updating question-dependent elements');
    
    setTimeout(() => {
      const carsContainer = document.querySelector('[data-element-name="center-container"]');
      if (carsContainer) {
        const existingCars = document.querySelectorAll('[data-element-name^="car-"]');
        const existingCrosses = document.querySelectorAll('[data-element-name^="cross-"]');
        
        existingCars.forEach(car => car.remove());
        existingCrosses.forEach(cross => cross.remove());
        
        console.log('🔄 [UI] Removed existing cars and crosses');
        
        // Regenerate cars with correct count for current question
        const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
          ? window.currentQuestionIndex : 0;
        const carCount = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
          ? window.QUESTIONS[currentIndex].minuend : 5;
        
        console.log(`🚗 [UI] Regenerating ${carCount} cars for question ${currentIndex + 1}`);
        console.log(`🔍 [UI] About to call window.generateCarsWithMemo(1, false)`);
        console.log(`🔍 [UI] window.generateCarsWithMemo available:`, typeof window.generateCarsWithMemo);
        
        // Generate new cars for the current question
        let newCars = [];
        if (typeof window.generateCarsWithMemo === 'function') {
          newCars = window.generateCarsWithMemo(1, true);
          console.log(`✅ [UI] Successfully called window.generateCarsWithMemo`);
        } else {
          console.error(`❌ [UI] window.generateCarsWithMemo not available, type: ${typeof window.generateCarsWithMemo}`);
          // Fallback: create cars manually with dynamic asset
          console.log(`🔄 [UI] Using fallback car generation for ${carCount} cars`);
          
          // Get dynamic asset image with car as fallback
          const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[window.currentQuestionIndex] 
              ? window.QUESTIONS[window.currentQuestionIndex] : null;
          
          // Function to get validated asset image (same logic as main generation)
          const getValidatedAssetImage = () => {
              if (!currentQuestion?.asset) {
                  return 'assets/car.png';
              }
              
              const assetPath = `assets/${currentQuestion.asset}.png`;
              
              // Check if we've already validated this asset
              if (typeof window.validatedAssets === 'undefined') {
                  window.validatedAssets = {};
              }
              
              // If we've already checked this asset, use cached result
              if (window.validatedAssets.hasOwnProperty(assetPath)) {
                  return window.validatedAssets[assetPath] ? assetPath : 'assets/car.png';
              }
              
              // Validate the asset exists
              const testImg = new Image();
              testImg.onload = () => {
                  window.validatedAssets[assetPath] = true;
                  console.log(`✅ [Fallback Asset Validation] ${assetPath} exists and loaded successfully`);
              };
              testImg.onerror = () => {
                  window.validatedAssets[assetPath] = false;
                  console.warn(`⚠️ [Fallback Asset Validation] ${assetPath} not found, using car.png fallback`);
              };
              testImg.src = assetPath;
              
              // Optimistically use the asset path (will be corrected if it fails)
              return assetPath;
          };
          
          const assetImage = getValidatedAssetImage();
          console.log(`🖼️ [UI] Using asset image: ${assetImage}`);
          
          for (let i = 1; i <= carCount; i++) {
            newCars.push({
              name: `car-${i}`,
              type: 'container',
              coordinates: [100 + (i-1) * 80, 200, 150 + (i-1) * 80, 280],
              zIndex: 'var(--z-elevated)',
              props: {
                backgroundImage: `url(${assetImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                cursor: 'default',
                pointerEvents: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none'
              }
            });
          }
        }
        
        console.log(`🔍 [UI] generateCarsWithMemo returned ${newCars.length} cars`);
        console.log(`🔍 [UI] First car config:`, newCars[0] ? {
          name: newCars[0].name,
          coordinates: newCars[0].coordinates,
          hasOnClick: typeof newCars[0].props?.onClick === 'function'
        } : 'No cars generated');
        
        // Add new cars to the DOM
        if (typeof window !== 'undefined' && window.addElementsToDOM) {
          window.addElementsToDOM(newCars);
          console.log(`✅ [UI] Added ${newCars.length} new cars to DOM`);
        } else {
          // Fallback: manually create and add car elements
          newCars.forEach(carConfig => {
            const carElement = document.createElement('div');
            carElement.setAttribute('data-element-name', carConfig.name);
            
            // Apply styles from carConfig.props
            Object.assign(carElement.style, {
              position: 'absolute',
              left: `${carConfig.coordinates[1]}px`,
              top: `${carConfig.coordinates[0]}px`,
              width: `${carConfig.coordinates[3] - carConfig.coordinates[1]}px`,
              height: `${carConfig.coordinates[2] - carConfig.coordinates[0]}px`,
              backgroundImage: carConfig.props.backgroundImage,
              backgroundSize: carConfig.props.backgroundSize,
              backgroundPosition: carConfig.props.backgroundPosition,
              backgroundRepeat: carConfig.props.backgroundRepeat,
              cursor: carConfig.props.cursor,
              zIndex: carConfig.zIndex
            });
            
            // Add click handler
            if (carConfig.props.onClick) {
              carElement.onclick = carConfig.props.onClick;
            }
            
            // Add to container
            carsContainer.appendChild(carElement);
          });
          console.log(`✅ [UI] Manually added ${newCars.length} new cars to DOM`);
        }
      }
      
      // Trigger updates for other components
      if (typeof window !== 'undefined') {
        if (window.updateAnswerContainerPage2) window.updateAnswerContainerPage2();
        if (window.updatePage1ButtonStates) window.updatePage1ButtonStates();
        if (window.updatePage2CompletionState) window.updatePage2CompletionState();
      }
      
      console.log('✅ [UI] Question-dependent elements updated');
    }, 100);
  }, []);
  
  const getNextButtonText = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.QUESTIONS && pageStates.currentQuestionIndex !== undefined) {
      const totalQuestions = window.QUESTIONS.length;
      const currentIndex = pageStates.currentQuestionIndex;
      
      if (currentIndex >= totalQuestions - 1) {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.startOver') : 'Start Over';
      } else {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.nextQuestion') : 'Next Question';
      }
    }
    return typeof i18n !== 'undefined' ? i18n.t('buttons.nextQuestion') : 'Next Question';
  }, [pageStates.currentQuestionIndex]);
  
  return {
    advanceToNextQuestion,
    updateQuestionDependentElements,
    getNextButtonText
  };
};

/**
 * Keyboard Navigation Hook for PageConfig
 */
const usePageConfigKeyboardNavigation = () => {
  const { playSound } = useSound();
  
  React.useEffect(() => {
    console.log('⌨️ Setting up keyboard navigation');
    
    const keyboardHandler = (event) => {
        if (event.key >= '1' && event.key <= '9') {
            const targetPage = parseInt(event.key);
            console.log(`⌨️ Keyboard navigation: Key ${event.key} pressed, navigating to page ${targetPage}`);
            
            event.preventDefault();
            
        // Play click sound with lower volume
        playSound('click', { volume: 0.3 });
            
            // Navigate to the target page
            if (typeof window !== 'undefined' && window.changePageAndNotify) {
                window.changePageAndNotify(targetPage);
            } else {
                console.warn('⌨️ changePageAndNotify not available for keyboard navigation');
            }
        }
    };
    
    document.addEventListener('keydown', keyboardHandler);
    console.log('⌨️ Keyboard navigation listener added');
    
    return () => {
      document.removeEventListener('keydown', keyboardHandler);
      console.log('⌨️ Keyboard navigation listener removed');
    };
  }, [playSound]);
};

// ===== MAIN PAGE CONFIG PROVIDER =====
/**
 * Page Config Provider - Combines all contexts and hooks
 */
const PageConfigProvider = React.memo(({ children }) => {
  return React.createElement(SoundProvider, {},
    React.createElement(PageStateProvider, {},
      children
    )
  );
});

/**
 * Main Page Config Hook - Provides all functionality
 */
const usePageConfig = () => {
  const sound = useSound();
  const pageState = usePageState();
  const webAudio = useWebAudio();
  const dialogUpdater = useDialogBoxUpdater();
  const answerUpdater = useAnswerContainerUpdater();
  const buttonManager = useButtonStateManager();
  const questionManager = useQuestionManager();
  
  // Setup keyboard navigation
  usePageConfigKeyboardNavigation();
  
  // Legacy compatibility - expose functions to window object
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.updateDialogBox = dialogUpdater.updateDialogBox;
      window.updateAnswerContainerPage2 = answerUpdater.updateAnswerContainerPage2;
      window.updateAnswerTileColor = answerUpdater.updateAnswerTileColor;
      window.updatePage2CompletionState = buttonManager.updatePage2CompletionState;
      window.updatePage1ButtonStates = buttonManager.updatePage1ButtonStates;
      // Debug: Check questionManager before assignment
      console.log('🔍 [PageConfig] questionManager object:', questionManager);
      console.log('🔍 [PageConfig] advanceToNextQuestion type:', typeof questionManager.advanceToNextQuestion);
      
      // Ensure functions are properly assigned
      if (typeof questionManager.advanceToNextQuestion === 'function') {
      window.advanceToNextQuestion = questionManager.advanceToNextQuestion;
        console.log('✅ [PageConfig] advanceToNextQuestion assigned successfully');
      } else {
        console.error('❌ [PageConfig] questionManager.advanceToNextQuestion is not a function:', typeof questionManager.advanceToNextQuestion);
      }
      
      if (typeof questionManager.updateQuestionDependentElements === 'function') {
      window.updateQuestionDependentElements = questionManager.updateQuestionDependentElements;
        console.log('✅ [PageConfig] updateQuestionDependentElements assigned successfully');
      } else {
        console.error('❌ [PageConfig] questionManager.updateQuestionDependentElements is not a function:', typeof questionManager.updateQuestionDependentElements);
      }
      
      if (typeof questionManager.getNextButtonText === 'function') {
      window.getNextButtonText = questionManager.getNextButtonText;
        console.log('✅ [PageConfig] getNextButtonText assigned successfully');
      } else {
        console.error('❌ [PageConfig] questionManager.getNextButtonText is not a function:', typeof questionManager.getNextButtonText);
      }
      
      // Debug: Verify assignment
      console.log('🔍 [PageConfig] Final window.advanceToNextQuestion type:', typeof window.advanceToNextQuestion);
      
      // Fallback: If advanceToNextQuestion is not properly assigned, create a basic version
      if (typeof window.advanceToNextQuestion !== 'function') {
        console.warn('⚠️ [PageConfig] advanceToNextQuestion not properly assigned, creating fallback');
        window.advanceToNextQuestion = () => {
          return new Promise((resolve) => {
            console.log('🔄 [Fallback] Using FALLBACK advanceToNextQuestion (React Hook)');
            
            if (typeof window !== 'undefined' && window.QUESTIONS && typeof window.currentQuestionIndex !== 'undefined') {
              const totalQuestions = window.QUESTIONS.length;
              const currentIndex = window.currentQuestionIndex || 0;
              
              let newIndex = (currentIndex < totalQuestions - 1) ? currentIndex + 1 : 0;
              window.currentQuestionIndex = newIndex;
              
              // Reset stores
              if (window.page1Store) {
                window.page1Store.resetForNewQuestion();
                const newQuestion = window.QUESTIONS[newIndex];
                if (newQuestion) {
                  window.page1Store.updateQuestionContext(newIndex, newQuestion.subtrahend);
                }
              }
              
              if (window.page2Store) {
                window.page2Store.resetForNewQuestion();
                const newQuestion = window.QUESTIONS[newIndex];
                if (newQuestion) {
                  const expectedAnswer = newQuestion.minuend - newQuestion.subtrahend;
                  window.page2Store.updateQuestionContext(newIndex, expectedAnswer);
                }
              }
              
              // Update React state
              if (typeof window.updatePageState === 'function') {
                window.updatePageState({ currentQuestionIndex: newIndex });
              }
              
              // Update UI elements
              setTimeout(() => {
                if (typeof window.updateQuestionDependentElements === 'function') {
                  window.updateQuestionDependentElements();
                }
                resolve(newIndex);
              }, 100);
            } else {
              resolve(0);
            }
          });
        };
        console.log('✅ [PageConfig] Fallback advanceToNextQuestion created');
      }
      
      console.log('✅ [PageConfig] Question manager functions exposed to window');
      window.updatePageState = pageState.updatePageState;
      window.playStartSound = webAudio.playStartSound;
      window.playNextSound = webAudio.playNextSound;
      
      // Legacy sound functions
      window.playAnswerSound = (isCorrect) => sound.playSound(isCorrect ? 'correct' : 'wrong', { volume: 0.7 });
      window.playCarClickSound = (carNumber) => sound.playSound('click', { volume: 0.8, carNumber });
      
      console.log('🔄 PageConfig React 18 - functions exposed to window object');
    }
  }, [
    dialogUpdater.updateDialogBox,
    answerUpdater.updateAnswerContainerPage2,
    answerUpdater.updateAnswerTileColor,
    buttonManager.updatePage2CompletionState,
    buttonManager.updatePage1ButtonStates,
    questionManager.advanceToNextQuestion,
    questionManager.updateQuestionDependentElements,
    questionManager.getNextButtonText,
    pageState.updatePageState,
    webAudio.playStartSound,
    webAudio.playNextSound,
    sound.playSound
  ]);
  
  // Expose generateCarsWithMemo to window for use in updateQuestionDependentElements
  const gridPages = createOptimizedGridPositionPages();
  if (typeof window !== 'undefined') {
    window.generateCarsWithMemo = gridPages.generateCarsWithMemo;
    console.log('✅ [PageConfig] generateCarsWithMemo exposed to window');
  }
  
  return {
    sound,
    pageState,
    webAudio,
    dialogUpdater,
    answerUpdater,
    buttonManager,
    questionManager,
    gridPages
  };
};

// ===== GRID POSITION PAGES (OPTIMIZED) =====
/**
 * Optimized Grid Position Pages with React 18 patterns
 */
const createOptimizedGridPositionPages = () => {
  // Car generation function optimized with React 18 patterns
  const generateCarsWithMemo = (pageNumber, shouldShowCrosses = false) => {
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                ? window.currentQuestionIndex : 0;
            const carCount = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                ? window.QUESTIONS[currentIndex].minuend 
        : 5;
      const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
        ? window.QUESTIONS[currentIndex].subtrahend 
        : 3;

        console.log(`🔍 [generateCarsWithMemo] Page ${pageNumber}, currentIndex: ${currentIndex}, carCount: ${carCount}, subtrahend: ${subtrahend}`);
            
            const cars = [];
            // REVERTED: Back to original pixel-based system that was working
            const carWidth = 150;
            const carHeight = 150;
            const maxCarsPerRow = 5;
      const horizontalSpacing = 25;
      const verticalSpacing = 25;
      
      // Container boundaries
      const containerMinX = 425;
      const containerMaxX = 1300;
      const containerMinY = 80;
      const containerMaxY = 680;
      const containerWidth = containerMaxX - containerMinX;
      const containerHeight = containerMaxY - containerMinY;
      const containerCenterX = containerMinX + (containerWidth / 2);
      const containerCenterY = containerMinY + (containerHeight / 2);
      
      // Layout calculations
            const totalRows = Math.ceil(carCount / maxCarsPerRow);
            const maxCarsInAnyRow = Math.min(carCount, maxCarsPerRow);
            const totalGridWidth = (maxCarsInAnyRow * carWidth) + ((maxCarsInAnyRow - 1) * horizontalSpacing);
            const totalGridHeight = (totalRows * carHeight) + ((totalRows - 1) * verticalSpacing);
            
            const gridStartX = Math.max(containerMinX, containerCenterX - (totalGridWidth / 2));
            const gridStartY = Math.max(containerMinY, containerCenterY - (totalGridHeight / 2));
            
            for (let i = 0; i < carCount; i++) {
                const carNumber = i + 1;
                const row = Math.floor(i / maxCarsPerRow);
                const col = i % maxCarsPerRow;
                
                const carsInCurrentRow = Math.min(maxCarsPerRow, carCount - (row * maxCarsPerRow));
                const rowWidth = (carsInCurrentRow * carWidth) + ((carsInCurrentRow - 1) * horizontalSpacing);
                const idealRowStartX = containerCenterX - (rowWidth / 2);
                const rowStartX = Math.max(containerMinX, Math.min(idealRowStartX, containerMaxX - rowWidth));
                
                const xPos = rowStartX + (col * (carWidth + horizontalSpacing));
                const yPos = gridStartY + (row * (carHeight + verticalSpacing));
                
                const finalXPos = Math.max(containerMinX, Math.min(xPos, containerMaxX - carWidth));
                const finalYPos = Math.max(containerMinY, Math.min(yPos, containerMaxY - carHeight));
                
                console.log(`🚗 [generateCarsWithMemo] Car ${carNumber} at pixel position [${finalYPos}, ${finalXPos}, ${finalYPos + carHeight}, ${finalXPos + carWidth}]`);
                
        // Determine if this car should have a cross
        // For page 1: Always show crosses on the last x cars where x = subtrahend
        // For page 2: Show crosses based on shouldShowCrosses parameter
        const shouldHaveCross = pageNumber === 1 ? i >= (carCount - subtrahend) : (shouldShowCrosses && i >= (carCount - subtrahend));
        const carOpacity = shouldHaveCross ? '0.3' : '1';
        
        console.log(`🚗 [generateCarsWithMemo] Car ${carNumber}: shouldHaveCross=${shouldHaveCross}, i=${i}, carCount=${carCount}, subtrahend=${subtrahend}, pageNumber=${pageNumber}`);
        
        // Get dynamic asset image with car as fallback
        const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
            ? window.QUESTIONS[currentIndex] : null;
        
        // Function to get validated asset image
        const getValidatedAssetImage = () => {
            if (!currentQuestion?.asset) {
                return 'assets/car.png';
            }
            
            const assetPath = `assets/${currentQuestion.asset}.png`;
            
            // Check if we've already validated this asset
            if (typeof window.validatedAssets === 'undefined') {
                window.validatedAssets = {};
            }
            
            // If we've already checked this asset, use cached result
            if (window.validatedAssets.hasOwnProperty(assetPath)) {
                return window.validatedAssets[assetPath] ? assetPath : 'assets/car.png';
            }
            
            // For first car, validate the asset exists
            if (carNumber === 1) {
                // Create a test image to check if asset exists
                const testImg = new Image();
                testImg.onload = () => {
                    window.validatedAssets[assetPath] = true;
                    console.log(`✅ [Asset Validation] ${assetPath} exists and loaded successfully`);
                };
                testImg.onerror = () => {
                    window.validatedAssets[assetPath] = false;
                    console.warn(`⚠️ [Asset Validation] ${assetPath} not found, will use car.png fallback`);
                    
                    // Update all existing cars with this asset to use fallback
                    setTimeout(() => {
                        const carsWithAsset = document.querySelectorAll(`[style*="${assetPath}"]`);
                        carsWithAsset.forEach(car => {
                            car.style.backgroundImage = 'url(assets/car.png)';
                            console.log(`🔄 [Asset Fallback] Updated car to use fallback image`);
                        });
                        
                        // Also update any cars with data attributes
                        const carElements = document.querySelectorAll('[data-element-name*="car-"]');
                        carElements.forEach(car => {
                            if (car.style.backgroundImage && car.style.backgroundImage.includes(currentQuestion.asset)) {
                                car.style.backgroundImage = 'url(assets/car.png)';
                                console.log(`🔄 [Asset Fallback] Updated car element to use fallback image`);
                            }
                        });
                    }, 100); // Small delay to ensure DOM is updated
                };
                testImg.src = assetPath;
                
                // For now, optimistically use the asset path (will be corrected if it fails)
                return assetPath;
            }
            
            // For subsequent cars, use the asset path (validation happens on first car)
            return assetPath;
        };
        
        const assetImage = getValidatedAssetImage();
        
        // Debug logging for asset usage
        if (carNumber === 1) { // Only log once per generation
            console.log(`🖼️ [generateCarsWithMemo] Using asset: ${assetImage} (question has asset: ${currentQuestion?.asset || 'none'})`);
        }
        
        // Car element with optimized onClick handler
                const carElement = {
          name: pageNumber === 1 ? `car-${carNumber}` : `car-page${pageNumber}-${carNumber}`,
          type: 'container',
                    coordinates: [finalYPos, finalXPos, finalYPos + carHeight, finalXPos + carWidth],
                    zIndex: 'var(--z-elevated)',
                    props: {
                        backgroundImage: `url(${assetImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'absolute',
                        display: 'block',
                        margin: '0',
                        padding: '0',
                        boxSizing: 'border-box',
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
            opacity: carOpacity,
            ...(pageNumber === 1 && {
              cursor: 'default',
              pointerEvents: 'none'
            })
                    }
                };
                
        // Cross overlay element
                const crossElement = {
          name: pageNumber === 1 ? `car-${carNumber}-cross` : `car-page${pageNumber}-${carNumber}-cross`,
                    type: 'textbox',
                    coordinates: [finalYPos, finalXPos, finalYPos + carHeight, finalXPos + carWidth],
                    zIndex: 'var(--z-overlay)',
                    props: {
                        text: '✕',
                        fontSize: '90gc',
                        textAlign: 'center',
                        color: '#ff0000',
                        backgroundColor: 'transparent',
            display: shouldHaveCross ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        pointerEvents: 'none',
                        position: 'absolute',
                        margin: '0',
                        padding: '0',
            boxSizing: 'border-box',
                        lineHeight: '1',
                        fontFamily: 'Arial, sans-serif'
                    }
                };
                
                cars.push(carElement, crossElement);
            }
            
            return cars;
    };
  
  // Return optimized GridPositionPages
  return {
    1: [
      // Center container
      {
        name: 'center-container',
        type: 'container',
        coordinates: [5, 405, 715, 1300],
        zIndex: 'var(--z-content)',
        props: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '20gc',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      },
      
      // Cars generated with optimization - will be updated dynamically
      ...generateCarsWithMemo(1, true),
      
      // Right container
        {
            name: 'right-container',
            type: 'container',
            coordinates: [5, 1305, 815, 1595],
            zIndex: 'var(--z-content)',
            props: {
                backgroundColor: 'transparent',
          borderRadius: '20gc'
            }
        },

      // Optimized Next button with React 18 patterns
        {
            name: 'next-button',
            type: 'button',
            coordinates: [820, 1450, 895, 1595],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : '»';
                },
                backgroundColor: '#FF9900',
                color: 'white',
                fontSize: '60gc',
                fontWeight: 'bold',
                borderRadius: '10gc',
                border: '3px solid white',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
          disabled: false,
          opacity: '1',
          pulsate: false,
                onClick: () => {
                    // Check completion status from store or legacy variable
                    let isCompleted = false;
                    
                    if (typeof window !== 'undefined' && window.page1Store) {
                        const storeState = window.page1Store.getState();
                        isCompleted = storeState.page1Complete;
                    } else if (typeof window !== 'undefined') {
                        isCompleted = window.page1complete;
                    }
                    
                    // Always allow navigation - next button is always enabled
                    console.log('🔄 [Next Button] Navigating to page 2 (always allowed)');
                    
                    console.log('🔄 [Next Button] Navigating to page 2');
                    
            // Use React 18 optimized sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 2
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(2);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(2);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                            console.log('📄 [Next Button] Dispatched page change event to page 2');
                        }
                    }
                }
            }
        },

      // Previous button
        {
            name: 'previous-button',
            type: 'button',
            coordinates: [820, 405, 895, 550],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : '«';
                },
                backgroundColor: '#6699CC',
                color: 'white',
                fontSize: '75gc',
                fontWeight: 'bold',
                borderRadius: '10gc',
                border: '3px solid white',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
          disabled: true,
                onClick: () => {
                    console.log('🔄 [Previous Button] Staying on page 1');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('previous');
            }
          }
        }
      },
      
      // Optimized Check button with React 18 patterns
        {
            name: 'check-button',
            type: 'button',
            coordinates: [400, 1350, 500, 1550],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('buttons.start') : 'START';
                },
          backgroundColor: '#FFAB40',
                color: 'white',
                fontSize: '40gc',
                fontWeight: 'bold',
                borderRadius: '10gc',
          border: '3px solid white',
          cursor: 'pointer',
          opacity: '1',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
          pulsate: true,
                onClick: () => {
                    console.log('🔄 [Start Button] Navigating to page 2');
                    
                    // Play click sound
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('start');
                    }
                    
                    // Navigate to page 2
                        if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(2);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(2);
                    } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                            console.log('📄 [Start Button] Dispatched page change event to page 2');
                        }
                    }
                }
            }
        },

      // Instruction header
        {
            name: 'instruction-header',
            type: 'textbox',
            coordinates: [720, 405, 810, 1595],
            zIndex: 'var(--z-notification)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('subtraction.page1.instructionHeader') : 'Tap cars to remove, then tap CHECK.';
                },
                fontSize: '40gc',
                textAlign: 'center',
                color: '#ffffff',
                opacity: 1.0,
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                userSelect: 'text',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        
      // Tap animations
        {
            name: 'tap-animation-page1',
            type: 'container',
            coordinates: [475, 1400, 525, 1500],
            zIndex: 'var(--z-overlay)',
            props: {
                backgroundImage: 'url(assets/tap.gif)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                get display() {
                    const isCompleted = typeof window !== 'undefined' && window.page1complete;
            return isCompleted ? 'none' : 'block';
                },
                pointerEvents: 'none',
          backgroundColor: 'transparent'
            }
        },

        {
            name: 'tap-animation-next-page1',
            type: 'container',
            coordinates: [840, 1450, 880, 1500],
            zIndex: 'var(--z-overlay)',
            props: {
                backgroundImage: 'url(assets/tap.gif)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                get display() {
                    const isCompleted = typeof window !== 'undefined' && window.page1complete;
            return isCompleted ? 'block' : 'none';
                },
                pointerEvents: 'none',
          backgroundColor: 'transparent'
            }
        },

      // Feedback textbox
        {
            name: 'feedback-page1',
            type: 'textbox',
            coordinates: [100, 1305, 350, 1595],
            zIndex: 'var(--z-elevated)',
            props: {
                text: "",
                fontSize: '28gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                borderRadius: '15gc',
                padding: '15gc',
                border: '3px solid transparent',
          display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                lineHeight: '1.2'
            }
        },

      // Subtraction definition
        {
            name: 'subtraction-definition',
            type: 'textbox',
            coordinates: [35, 50, 200, 380],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('subtraction.page1.definition') : "Subtraction is 'removing objects from a group.'";
                },
                fontSize: '50gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

      // Step 1 instruction
        {
            name: 'step1-instruction',
            type: 'textbox',
            coordinates: [200, 50, 700, 380],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].minuend : 5;
                    const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].subtrahend : 3;
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page1.stepInstruction', { subtrahend, minuend }) : 
                        `Step 1: Remove ${subtrahend} out of ${minuend} objects shown.`;
                },
                fontSize: '50gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

      // Subtraction equation tiles
        {
            name: 'minuend-tile-page1',
            type: 'textbox',
            coordinates: [75, 600, 175, 700],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex] : { minuend: 5, missing: 'subtrahend' };
                    
                    // Show blank if this is the missing value, otherwise show the number
                    if (currentQuestion.missing === 'minuend' || currentQuestion.missing === 'both') {
                        return '';
                    }
                    return currentQuestion.minuend.toString();
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'minus-sign-page1',
            type: 'textbox',
            coordinates: [75, 700, 175, 800],
            zIndex: 'var(--z-elevated)',
            props: {
                text: '−',
                fontSize: '50gc',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'subtrahend-tile-page1',
            type: 'textbox',
            coordinates: [75, 800, 175, 900],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex] : { subtrahend: 3, missing: 'minuend' };
                    
                    // Show blank if this is the missing value, otherwise show the number
                    if (currentQuestion.missing === 'subtrahend' || currentQuestion.missing === 'both') {
                        return '';
                    }
                    return currentQuestion.subtrahend.toString();
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'equal-sign-page1',
            type: 'textbox',
            coordinates: [75, 900, 175, 1000],
            zIndex: 'var(--z-elevated)',
            props: {
                text: '=',
                fontSize: '50gc',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'answer-tile-page1',
            type: 'textbox',
            coordinates: [75, 1000, 175, 1100],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    // Page 1 answer tile should be empty for user input
                    return '';
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

      // Progress dots
        {
            name: 'progressDots',
            type: 'progress',
            coordinates: [820, 505, 895, 1445],
            zIndex: 'var(--z-elevated)',
            props: {
                backgroundColor: 'transparent',
                borderRadius: '25gc',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15gc',
                padding: '25gc',
                dotSize: '20gc',
                activeDotColor: '#FFAB40',
                inactiveDotColor: '#888888',
                activeDotBorder: '3px solid #ffffff',
                inactiveDotBorder: '3px solid #ffffff',
                activeDotShadow: '0 0 10px rgba(255, 171, 64, 0.5)',
                fontSize: '14gc',
                fontWeight: 'bold',
                color: 'transparent',
                textAlign: 'center'
            }
        }
    ],

    2: [
      // Page 2 elements with React 18 optimizations
        {
            name: 'center-container-page2',
            type: 'container',
            coordinates: [5, 405, 715, 1300],
            zIndex: 'var(--z-content)',
            props: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '20gc',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
        },

      // Cars with crosses for page 2
      ...generateCarsWithMemo(2, true),
      
      // Step elements with React 18 optimizations
        {
            name: 'step1-completed',
            type: 'textbox',
            coordinates: [150, 25, 400, 390],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].minuend : 5;
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.step1Text', { minuend }) : 
                        `There are total ${minuend} cars in picture. Some of the cars are crossed showing subtraction.`;
                },
                fontSize: '42gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                allowHTML: true,
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            }
        },

        {
            name: 'step2-instruction',
            type: 'textbox',
            coordinates: [400, 25, 800, 390],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('subtraction.page2.step2Text') : 'Count and complete the subtraction expression given along with the picture.';
                },
                fontSize: '42gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                allowHTML: true,
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            }
        },

        // Step 3 textbox (hidden by default)
        {
            name: 'step3-page2',
            type: 'textbox',
            coordinates: [75, 25, 350, 390],   
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].minuend : 5;
                    const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].subtrahend : 3;
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.step3Text', { subtrahend, minuend }) : 
                        `If ${subtrahend} objects are crossed out of ${minuend}, we say that`;
                },
                fontSize: '38gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'none', // Hidden by default
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                allowHTML: true,
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            }
        },

        // Step 4 textbox with multiline content (hidden by default)
        {
            name: 'step4-page2',
            type: 'textbox',
            coordinates: [250, 25, 400, 390],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].minuend : 5;
                    const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].subtrahend : 3;
                    const answer = minuend - subtrahend;
                    
                    // Use internationalized text from data.js
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.step4Text', { minuend, subtrahend, answer }) : 
                        `• There are ${minuend} cars in total.<br/>• ${subtrahend} car is removed/crossed.<br/>• Then, ${answer} cars remain.`;
                },
                fontSize: '32gc',
                textAlign: 'left',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'none', // Hidden by default
                alignItems: 'flex-start',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                padding: '20gc',
                lineHeight: '1.4',
                allowHTML: true
            }
        },

        // Step 5 textbox with multiline content (hidden by default)
        {
            name: 'step5-page2',
            type: 'textbox',
            coordinates: [600, 25, 700, 390],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const minuend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].minuend : 5;
                    const subtrahend = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex].subtrahend : 3;
                    const answer = minuend - subtrahend;
                    
                    // Use internationalized text from data.js
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.step5Text', { minuend, subtrahend, answer }) : 
                        `We write this as,<br/>${minuend} - ${subtrahend} = ${answer}`;
                },
                fontSize: '40gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'none', // Hidden by default
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                padding: '20gc',
                lineHeight: '1.4',
                allowHTML: true
            }
        },

        // Number pad panel for Page 2
        {
            name: 'number-pad-panel-page2',
            type: 'number-pad-panel',
            coordinates: [5, 1305, 715, 1595],
            zIndex: 'var(--z-elevated)',
            props: {
                // Panel styling
                backgroundColor: 'transparent',
                borderRadius: '15gc',
                border: '4px solid #FFAB40',
                padding: '15gc',
                
                // Number buttons configuration
                numberButtons: {
                    backgroundColor: '#FFAB40',
                    color: '#000000',
                    fontSize: '30gc',
                    fontWeight: 'bold',
                    borderRadius: '6gc',
                    border: '2px solid #FF9900',
                    width: '50gc',
                    height: '50gc',
                    margin: '3gc'
                },
                
                // Check button configuration
                checkButton: {
                    backgroundColor: '#FF8C00',
                    color: '#000000',
                    fontSize: '25gc',
                    fontWeight: 'bold',
                    borderRadius: '8gc',
                    border: '3px solid #FF6347',
                    get text() {
                        return typeof i18n !== 'undefined' ? i18n.t('buttons.check') : 'CHECK';
                    },
                    height: '60gc',
                    marginTop: '10gc'
                },
                
                // Event handlers optimized
                onNumberClick: (number) => {
                    console.log('🔢 [Page 2] Number clicked:', number);
                        
                        // Play click sound for number pad
                        if (typeof window !== 'undefined' && window.playCarClickSound) {
                            window.playCarClickSound('numberpad');
                        }
                        
                        // Update the answer state - use focus management for all cases
                        if (typeof window !== 'undefined') {
                            const currentIndex = window.currentQuestionIndex || 0;
                            const currentQuestion = window.QUESTIONS && window.QUESTIONS[currentIndex] 
                                ? window.QUESTIONS[currentIndex] : { missing: 'subtrahend' };
                            
                            // Use the new focus management system for all cases
                            const currentActiveTile = window.page2Store ? window.page2Store.getState().currentActiveTile : 'answer';
                            
                            if (currentQuestion.missing === 'both') {
                                // For 'both' case, update the currently active tile
                                window.page2Store.updateTileValue(currentActiveTile, number.toString());
                                console.log(`📝 [Page 2] Updated ${currentActiveTile} tile value:`, number.toString());
                            } else {
                                // For single missing cases, also use focus management
                                if (currentQuestion.missing === 'minuend' && currentActiveTile === 'minuend') {
                                    window.page2Store.updateTileValue('minuend', number.toString());
                                } else if (currentQuestion.missing === 'subtrahend' && currentActiveTile === 'subtrahend') {
                                    window.page2Store.updateTileValue('subtrahend', number.toString());
                                } else {
                                    // Default to answer tile and maintain backward compatibility
                                    window.page2Store.updateTileValue('answer', number.toString());
                                    window.answerPage2 = number.toString();
                                }
                                console.log(`📝 [Page 2] Updated ${currentActiveTile} tile value:`, number.toString());
                            }
                            
                            // Force re-render to show the updated tile
                            if (typeof window.forceAppUpdate === 'function') {
                                window.forceAppUpdate();
                            }
                            
                            // Force re-render of answer container by updating DOM directly
                            const answerContainer = document.querySelector('[data-element-name="answer-container-page2"]');
                            if (answerContainer) {
                                const currentIndex = window.currentQuestionIndex || 0;
                                const minuend = window.QUESTIONS && window.QUESTIONS[currentIndex] 
                                    ? window.QUESTIONS[currentIndex].minuend : 5;
                                const subtrahend = window.QUESTIONS && window.QUESTIONS[currentIndex] 
                                    ? window.QUESTIONS[currentIndex].subtrahend : 3;
                                const userAnswer = window.answerPage2 || '';
                                
                                // Create the display text with tile format (15% bigger)
                                const tileWidth = Math.round(60 * 1.15); // 69px
                                const tileHeight = Math.round(60 * 1.15); // 69px
                                const fontSize = Math.round(35 * 1.15); // 40px
                                const lineHeight = tileHeight - 6; // Adjust for border
                                
                                let displayText = '';
                                if (userAnswer === '') {
                                    // Show equation with empty answer box
                                    const equationText = typeof i18n !== 'undefined' ? 
                                        i18n.t('subtraction.page2.answerEquation', { subtrahend, minuend }) : 
                                        `Subtracting ${subtrahend} from ${minuend} gives`;
                                    displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #F5F5F5; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px;"></span>`;
                                } else {
                                    // Show equation with user's answer in the box
                                    const equationText = typeof i18n !== 'undefined' ? 
                                        i18n.t('subtraction.page2.answerEquation', { subtrahend, minuend }) : 
                                        `Subtracting ${subtrahend} from ${minuend} gives`;
                                    displayText = `${equationText} <span style="display: inline-block; width: ${tileWidth}px; height: ${tileHeight}px; border: 3px solid #2196F3; background-color: #FFFFFF; margin: 0 10px; vertical-align: middle; line-height: ${lineHeight}px; border-radius: 8px; font-size: ${fontSize}px; font-weight: bold; color: #000000;">${userAnswer}</span>`;
                                }
                                
                                answerContainer.innerHTML = displayText;
                                console.log('📝 [Page 2] Answer container updated directly:', displayText);
                            }
                            
                            // Trigger React re-render to update equation tiles
                            if (typeof window.forceAppUpdate === 'function') {
                                window.forceAppUpdate();
                                console.log('✅ [Page 2] Triggered React re-render for equation tiles');
                            }
                        }
                },
                
                onCheckClick: () => {
                    console.log('🔄 [Page 2] Check button clicked');
                        
                        // Play click sound
                        if (typeof window !== 'undefined' && window.playCarClickSound) {
                            window.playCarClickSound('check');
                        }
                        
                        // Get the user answer
                        const userAnswer = typeof window !== 'undefined' && window.answerPage2 ? parseInt(window.answerPage2) : 0;
                        
                        // Calculate expected answer (minuend - subtrahend)
                        const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                            ? window.currentQuestionIndex : 0;
                        const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                            ? window.QUESTIONS[currentIndex] 
                            : { minuend: 5, subtrahend: 3, missing: 'subtrahend' };
                        
                        // Expected answer is the missing value (not the subtraction result)
                        let expectedAnswer;
                        if (currentQuestion.missing === 'minuend') {
                            expectedAnswer = currentQuestion.minuend;
                        } else if (currentQuestion.missing === 'subtrahend') {
                            expectedAnswer = currentQuestion.subtrahend;
                        } else {
                            expectedAnswer = currentQuestion.subtrahend; // fallback
                        }
                        
                        console.log(`🔄 [Page 2] User answer: ${userAnswer}, Expected missing value: ${expectedAnswer} (${currentQuestion.missing})`);
                        
                        if (userAnswer < expectedAnswer) {
                            // Smaller number
                            const feedbackText = typeof i18n !== 'undefined' ? 
                                i18n.t('subtraction.page2.feedback.smaller') : 
                                `Oops! You have entered a smaller number…\nCount and Try again…`;
                            console.log('❌ [Page 2] Number too small');
                            
                            // Play error sound
                            if (typeof window !== 'undefined' && window.playAnswerSound) {
                                window.playAnswerSound(false);
                            }
                            
                            // Update feedback in number pad text area using new system
                            if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
                                window.updateNumberPadFeedback(feedbackText, 'incorrect');
                            }
                            
                            // Update answer tile color to red (incorrect)
                            if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
                                setTimeout(() => window.updateAnswerTileColor(false), 100);
                            }
                            
                        } else if (userAnswer > expectedAnswer) {
                            // Bigger number
                            const feedbackText = typeof i18n !== 'undefined' ? 
                                i18n.t('subtraction.page2.feedback.bigger') : 
                                `Oops! You have entered a bigger number…\nCount and Try again…`;
                            console.log('❌ [Page 2] Number too big');
                            
                            // Play error sound
                            if (typeof window !== 'undefined' && window.playAnswerSound) {
                                window.playAnswerSound(false);
                            }
                            
                            // Update feedback in number pad text area using new system
                            if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
                                window.updateNumberPadFeedback(feedbackText, 'incorrect');
                            }
                            
                            // Update answer tile color to red (incorrect)
                            if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
                                setTimeout(() => window.updateAnswerTileColor(false), 100);
                            }
                            
                        } else {
                            // Correct answer - user entered the missing value
                            const feedbackText = typeof i18n !== 'undefined' ? 
                                i18n.t('subtraction.page2.feedback.correct') : 
                                `Correct Answer!`;
                            console.log('✅ [Page 2] Correct answer - missing value found!');
                            
                            // Play success sound
                            if (typeof window !== 'undefined' && window.playAnswerSound) {
                                window.playAnswerSound(true);
                            }
                            
                            // Update feedback in number pad text area using new system
                            if (typeof window !== 'undefined' && window.updateNumberPadFeedback) {
                                window.updateNumberPadFeedback(feedbackText, 'correct');
                            }
                            
                            // Update answer tile color to green (correct) - increased timeout to ensure tile is created
                            if (typeof window !== 'undefined' && window.updateAnswerTileColor) {
                                setTimeout(() => window.updateAnswerTileColor(true), 300);
                            }
                            
                            // Mark page 2 as complete
                            if (typeof window !== 'undefined') {
                                window.page2complete = true;
                                console.log('✅ [Page 2] Marked as complete (window.page2complete = true)');
                                
                                // Also update React state for proper reactivity
                                if (window.updatePageState) {
                                    window.updatePageState({ page2complete: true });
                                    console.log('✅ [Page 2] React state updated (pageStates.page2complete = true)');
                                }
                            }
                            
                            // Update Page 2 completion state (show/hide elements)
                            if (typeof window !== 'undefined' && window.updatePage2CompletionState) {
                                setTimeout(() => window.updatePage2CompletionState(), 200);
                            }
                            
                            // Update button states
                            if (typeof window !== 'undefined' && window.updateButtonStates) {
                                setTimeout(() => window.updateButtonStates(), 100);
                            }
                        }
                },
                
                currentValue: '',
                maxDigits: 1,
                
                // Feedback text area configuration
                feedbackTextArea: {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '25gc',
                    fontWeight: 'bold',
                    borderRadius: '8gc',
                    border: '3px solid #FFAB40',
                    padding: '10gc',
                    textAlign: 'center',
                    display: 'none',
                    height: '60gc',
                    marginTop: '10gc'
                }
            }
        },

        // Instruction box for Page 2
        {
            name: 'instruction-box-page2',
            type: 'textbox',
            coordinates: [720, 405, 810, 1595],
            zIndex: 'var(--z-content)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('subtraction.page2.instructionHeader') : 'Tap the correct number and then tap check.';
                },
                fontSize: '35gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                padding: '10gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            }
        },

        // Tap animation 1 for Page 2
        {
            name: 'tap-animation-page2-1',
            type: 'container',
            coordinates: [675, 1400, 725, 1500],
            zIndex: 'var(--z-overlay)',
            props: {
                backgroundImage: 'url(assets/tap.gif)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'block',
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }
        },

        // Tap animation 2 for Page 2
        {
            name: 'tap-animation-page2-2',
            type: 'container',
            coordinates: [840, 1300, 880, 1350],
            zIndex: 'var(--z-overlay)',
            props: {
                backgroundImage: 'url(assets/tap.gif)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'none',
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }
        },

        // Next button for Page 2
        {
            name: 'next-button-page2',
            type: 'button',
            coordinates: [820, 1300, 895, 1595],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    // Dynamic text based on current question
                    if (typeof window !== 'undefined' && window.getNextButtonText) {
                        return window.getNextButtonText();
                    }
                    return typeof i18n !== 'undefined' ? i18n.t('buttons.nextQuestion') : 'Next Question';
                },
                backgroundColor: '#FF9900',
                color: 'white',
                fontSize: '30gc',
                fontWeight: 'bold',
                borderRadius: '10gc',
                border: '3px solid white',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                disabled: true,
                opacity: '0.6',
                pulsate: false,
                onClick: () => {
                    console.log('🔄 [Page 2] Next button clicked');
                    
                    // Check if page 2 is completed
                    if (typeof window !== 'undefined' && !window.page2complete) {
                        console.log('🚫 [Page 2] Navigation blocked - page 2 not completed');
                        return;
                    }
                    
                    // Play click sound
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('next');
                    }
                    
                    // Advance to next question and go back to page 1
                    if (typeof window !== 'undefined' && window.advanceToNextQuestion) {
                        window.advanceToNextQuestion().then((newQuestionIndex) => {
                            console.log('➡️ [Navigation] Advanced to question index:', newQuestionIndex);
                            
                            // Navigate back to page 1 with new question
                            setTimeout(() => {
                                if (typeof window !== 'undefined' && window.changePageAndNotify) {
                                    window.changePageAndNotify(1);
                                    console.log('🔄 [Navigation] Returned to page 1 with new question');
                                }
                            }, 300);
                        }).catch((error) => {
                            console.error('❌ [Navigation] Error advancing to next question:', error);
                        });
                    }
                }
            }
        },

        // Previous button for Page 2
        {
            name: 'previous-button-page2',
            type: 'button',
            coordinates: [820, 405, 895, 700],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : '«';
                },
                backgroundColor: '#6699CC',
                color: 'white',
                fontSize: '60gc',
                fontWeight: 'bold',
                borderRadius: '10gc',
                border: '3px solid white',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                onClick: () => {
                    console.log('🔄 [Page 2] Previous button clicked');
                    
                    // Play click sound
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('previous');
                    }
                    
                    if (typeof window !== 'undefined' && window.changePageAndNotify) {
                        window.changePageAndNotify(1);
                    }
                }
            }
        },

        // Progress dots for Page 2
        {
            name: 'progressDots-page2',
            type: 'progress',
            coordinates: [820, 505, 895, 1445],
            zIndex: 'var(--z-elevated)',
            props: {
                backgroundColor: 'transparent',
                borderRadius: '25gc',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15gc',
                padding: '25gc',
                dotSize: '20gc',
                activeDotColor: '#FFAB40',
                inactiveDotColor: '#888888',
                activeDotBorder: '3px solid #ffffff',
                inactiveDotBorder: '3px solid #ffffff',
                activeDotShadow: '0 0 10px rgba(255, 171, 64, 0.5)',
                fontSize: '14gc',
                fontWeight: 'bold',
                color: 'transparent',
                textAlign: 'center'
            }
        },

        // Label text boxes for Page 2
        {
            name: 'total-cars-label-page2',
            type: 'textbox',
            coordinates: [5, 550, 75, 750],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.totalCarsLabel') : 
                        '(Total Cars)';
                },
                fontSize: '28gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'crossed-cars-label-page2',
            type: 'textbox',
            coordinates: [5, 745, 75, 950],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    return typeof i18n !== 'undefined' ? 
                        i18n.t('subtraction.page2.crossedCarsLabel') : 
                        '(Crossed Cars)';
                },
                fontSize: '28gc',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },        

        {
          name: 'remaining-cars-label-page2',
          type: 'textbox',
          coordinates: [5, 925, 75, 1175],
          zIndex: 'var(--z-elevated)',
          props: {
              get text() {
                  return typeof i18n !== 'undefined' ? 
                      i18n.t('subtraction.page2.remainingCarsLabel') : 
                      '(Crossed Cars)';
              },
              fontSize: '28gc',
              textAlign: 'center',
              color: '#ffffff',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxSizing: 'border-box'
          }
      },

        // Subtraction equation tiles for Page 2
        {
            name: 'minuend-tile-page2',
            type: 'textbox',
            coordinates: [75, 600, 175, 700],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex] : { minuend: 5, missing: 'subtrahend' };
                    
                    // Show user input if this is the missing value, otherwise show the number
                    if (currentQuestion.missing === 'minuend' || currentQuestion.missing === 'both') {
                        // For 'both' case, use minuendValue from store, for 'minuend' case use answerPage2
                        if (currentQuestion.missing === 'both') {
                            const minuendValue = typeof window !== 'undefined' && window.page2Store 
                                ? window.page2Store.getState().minuendValue : '';
                            return minuendValue;
                        } else {
                            const userAnswer = typeof window !== 'undefined' && window.answerPage2 ? window.answerPage2 : '';
                            return userAnswer;
                        }
                    }
                    return currentQuestion.minuend.toString();
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                cursor: 'pointer'
            },
            onClick: () => {
                console.log('👆 [Page 2] Minuend tile clicked');
                
                // Play click sound
                if (typeof window !== 'undefined' && window.playCarClickSound) {
                    window.playCarClickSound('tile');
                }
                
                // Set focus to minuend tile (works for all cases)
                if (typeof window !== 'undefined' && window.setPage2TileFocus) {
                    window.setPage2TileFocus('minuend');
                    
                    // Force UI update to ensure visual changes are applied
                    if (window.Page2UIManager && typeof window.Page2UIManager.forceUpdate === 'function') {
                        setTimeout(() => window.Page2UIManager.forceUpdate(), 10);
                    }
                }
            }
        },

        {
            name: 'minus-sign-page2',
            type: 'textbox',
            coordinates: [75, 700, 175, 800],
            zIndex: 'var(--z-elevated)',
            props: {
                text: '−',
                fontSize: '50gc',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'subtrahend-tile-page2',
            type: 'textbox',
            coordinates: [75, 800, 175, 900],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex] : { subtrahend: 3, missing: 'minuend' };
                    
                    // Show user input if this is the missing value, otherwise show the number
                    if (currentQuestion.missing === 'subtrahend' || currentQuestion.missing === 'both') {
                        // For 'both' case, use subtrahendValue from store, for 'subtrahend' case use answerPage2
                        if (currentQuestion.missing === 'both') {
                            const subtrahendValue = typeof window !== 'undefined' && window.page2Store 
                                ? window.page2Store.getState().subtrahendValue : '';
                            return subtrahendValue;
                        } else {
                            const userAnswer = typeof window !== 'undefined' && window.answerPage2 ? window.answerPage2 : '';
                            return userAnswer;
                        }
                    }
                    return currentQuestion.subtrahend.toString();
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                cursor: 'pointer'
            },
            onClick: () => {
                console.log('👆 [Page 2] Subtrahend tile clicked');
                
                // Play click sound
                if (typeof window !== 'undefined' && window.playCarClickSound) {
                    window.playCarClickSound('tile');
                }
                
                // Set focus to subtrahend tile (works for all cases)
                if (typeof window !== 'undefined' && window.setPage2TileFocus) {
                    window.setPage2TileFocus('subtrahend');
                    
                    // Force UI update to ensure visual changes are applied
                    if (window.Page2UIManager && typeof window.Page2UIManager.forceUpdate === 'function') {
                        setTimeout(() => window.Page2UIManager.forceUpdate(), 10);
                    }
                }
            }
        },

        {
            name: 'equal-sign-page2',
            type: 'textbox',
            coordinates: [75, 900, 175, 1000],
            zIndex: 'var(--z-elevated)',
            props: {
                text: '=',
                fontSize: '50gc',
                textAlign: 'center',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box'
            }
        },

        {
            name: 'answer-tile-page2',
            type: 'textbox',
            coordinates: [75, 1000, 175, 1100],
            zIndex: 'var(--z-elevated)',
            props: {
                get text() {
                    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
                        ? window.currentQuestionIndex : 0;
                    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
                        ? window.QUESTIONS[currentIndex] : { minuend: 5, subtrahend: 3 };
                    
                    // For 'both' case, show user input from store
                    if (currentQuestion.missing === 'both') {
                        const answerValue = typeof window !== 'undefined' && window.page2Store 
                            ? window.page2Store.getState().answerValue : '';
                        return answerValue;
                    } else {
                        // For single missing cases, this tile should remain empty for user input
                        const userAnswer = typeof window !== 'undefined' && window.answerPage2 ? window.answerPage2 : '';
                        return userAnswer;
                    }
                },
                fontSize: '48gc',
                textAlign: 'center',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '3gc solid #2196F3',
                borderRadius: '8gc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                cursor: 'pointer'
            },
            onClick: () => {
                console.log('👆 [Page 2] Answer tile clicked');
                
                // Play click sound
                if (typeof window !== 'undefined' && window.playCarClickSound) {
                    window.playCarClickSound('tile');
                }
                
                // Set focus to answer tile (works for all cases)
                if (typeof window !== 'undefined' && window.setPage2TileFocus) {
                    window.setPage2TileFocus('answer');
                    
                    // Force UI update to ensure visual changes are applied
                    if (window.Page2UIManager && typeof window.Page2UIManager.forceUpdate === 'function') {
                        setTimeout(() => window.Page2UIManager.forceUpdate(), 10);
                    }
                }
            }
        }
    ],
    generateCarsWithMemo // Expose the function for use in updateQuestionDependentElements
  };
};

// ===== INITIALIZATION AND EXPORT =====
/**
 * Initialize Page 1 State Management
 */
const initializePage1StateManagement = () => {
  console.log('🚀 Initializing Page 1 State Management');
  
  if (typeof window !== 'undefined' && window.page1Store) {
    // Initialize store with current question context
    if (window.QUESTIONS && window.currentQuestionIndex !== undefined) {
      const currentQuestion = window.QUESTIONS[window.currentQuestionIndex];
      if (currentQuestion) {
        window.page1Store.updateQuestionContext(
          window.currentQuestionIndex,
          currentQuestion.subtrahend
        );
      }
    }
    
    // Always start with initial state on app load (since we're using sessionStorage)
    window.page1Store.setInitialState();
    console.log('🔄 [Page1] Set initial state for app load');
    
    // Check if we're on page 1 and force UI update
    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 1;
    if (currentPage === 1) {
      // Force UI update to match initial state
      if (window.Page1UIManager && typeof window.Page1UIManager.forceUpdate === 'function') {
        setTimeout(() => window.Page1UIManager.forceUpdate(), 100);
      }
      
      // CRITICAL: Generate initial cars for the current question (both pages)
      if (typeof window.updateQuestionDependentElements === 'function') {
        setTimeout(() => {
          console.log('🔄 [PageInit] Generating initial cars for current question on both pages');
          window.updateQuestionDependentElements();
        }, 200);
      }
    }
    
    // Add page change listener to handle state properly
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('pageChanged', (event) => {
        if (event.detail.page === 1) {
          // When navigating back to page 1, maintain current state
          const storeState = window.page1Store.getState();
          console.log('🔄 [Page1] Page changed to 1, current state:', storeState);
          
          // Force UI update to match current state
          if (window.Page1UIManager && typeof window.Page1UIManager.forceUpdate === 'function') {
            setTimeout(() => window.Page1UIManager.forceUpdate(), 100);
          }
        }
      });
    }
    
    console.log('✅ Page 1 State Management initialized');
  } else {
    console.warn('⚠️ Page 1 Store not available for initialization');
  }
};

/**
 * Initialize Page 2 State Management
 */
const initializePage2StateManagement = () => {
  console.log('🚀 Initializing Page 2 State Management');
  
  if (typeof window !== 'undefined' && window.page2Store) {
    // Initialize store with current question context
    if (window.QUESTIONS && window.currentQuestionIndex !== undefined) {
      const currentQuestion = window.QUESTIONS[window.currentQuestionIndex];
      if (currentQuestion) {
        const expectedAnswer = currentQuestion.minuend - currentQuestion.subtrahend;
        window.page2Store.updateQuestionContext(
          window.currentQuestionIndex,
          expectedAnswer
        );
      }
    }
    
    // Always start with initial state on app load (since we're using sessionStorage)
    window.page2Store.setInitialState();
    console.log('🔄 [Page2] Set initial state for app load');
    
    // Initialize pulsating state based on question type (after initial state is set)
    setTimeout(() => {
      window.page2Store.initializePulsatingState();
      console.log('✨ [Page2] Initialized pulsating state for initial load');
    }, 50);
    
    // Ensure input tiles are properly initialized (colors will be restored from session via UI manager)
    setTimeout(() => {
      console.log('🔄 [Page2] Input tiles will be initialized with persisted colors via UI manager');
      
      // Force UI update to apply persisted tile colors
      if (window.Page2UIManager && typeof window.Page2UIManager.forceUpdate === 'function') {
        window.Page2UIManager.forceUpdate();
      }
    }, 200);
    
    // Ensure Page 2 UI Manager is properly initialized
    if (window.Page2UIManager) {
      if (typeof window.Page2UIManager.forceInitialize === 'function') {
        const initialized = window.Page2UIManager.forceInitialize();
        console.log('🔧 [Page2] Force initialized UI Manager:', initialized);
      }
      
      // Check if we're on page 2 and force UI update
      const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 1;
      if (currentPage === 2) {
        // Force UI update to match initial state and restore tile colors from session
        if (typeof window.Page2UIManager.forceUpdate === 'function') {
          setTimeout(() => {
            window.Page2UIManager.forceUpdate();
            console.log('🔄 [Page2] UI updated with persisted tile colors');
          }, 100);
        }
      }
    } else {
      console.warn('⚠️ [Page2] Page2UIManager not available during initialization');
    }
    
    // Add page change listener to handle state properly
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('pageChanged', (event) => {
        if (event.detail.page === 2) {
          // When navigating to page 2, ensure UI Manager is initialized
          if (window.Page2UIManager && typeof window.Page2UIManager.forceInitialize === 'function') {
            const initialized = window.Page2UIManager.forceInitialize();
            console.log('🔧 [Page2] UI Manager initialized on page change:', initialized);
          }
          
          // When navigating to page 2, maintain current state
          const storeState = window.page2Store.getState();
          console.log('🔄 [Page2] Page changed to 2, current state:', storeState);
          
          // Force UI update to match current state
          if (window.Page2UIManager && typeof window.Page2UIManager.forceUpdate === 'function') {
            setTimeout(() => window.Page2UIManager.forceUpdate(), 100);
          }
        }
      });
    }
    
    console.log('✅ Page 2 State Management initialized');
  } else {
    console.warn('⚠️ Page 2 Store not available for initialization');
  }
};

/**
 * Initialize Page Config with optimizations
 */
const initializePageConfig = () => {
  console.log('🚀 Initializing PageConfig with optimizations');
  
  // Create optimized GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();
  
  // Make available globally for compatibility
  if (typeof window !== 'undefined') {
    window.GridPositionPages = optimizedPages;
    window.gridPositions = optimizedPages;
    window.PageConfigProvider = PageConfigProvider;
    window.usePageConfig = usePageConfig;
    
    // CRITICAL: Manually initialize the functions that would normally be set by usePageConfig hook
    console.log('🔄 [PageConfig] Manually initializing window functions...');
    
    // Create mock implementations of the hooks to get the functions
    try {
      // Create a mock page state
      const mockPageState = {
        pageStates: { currentQuestionIndex: 0 },
        updatePageState: (newState) => {
          console.log('🔄 [Mock] updatePageState called:', newState);
          Object.assign(window, newState);
        },
        resetPageStates: () => console.log('🔄 [Mock] resetPageStates called')
      };
      
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
                      console.log('🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)');
          console.log('🔄 [Navigation] Treating as APP RELOAD with next question');
          
          if (typeof window !== 'undefined' && window.QUESTIONS) {
            const totalQuestions = window.QUESTIONS.length;
            const currentIndex = window.currentQuestionIndex || 0;
            
            console.log('📊 [Navigation] Current question:', currentIndex + 1, 'of', totalQuestions);
            
            let newIndex;
            if (currentIndex < totalQuestions - 1) {
              newIndex = currentIndex + 1;
              console.log('➡️ [Navigation] Advanced to question', newIndex + 1);
            } else {
              newIndex = 0;
              console.log('🔄 [Navigation] Starting over from question 1');
            }
            
            // CRITICAL: Update question index FIRST (before any store operations)
            window.currentQuestionIndex = newIndex;
            console.log('✅ [Navigation] Updated window.currentQuestionIndex to:', newIndex);
            
            // COMPLETE APP RESET - Clear all session storage
            console.log('🧹 [Navigation] Clearing all session storage for fresh start');
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.removeItem('page1Store');
              sessionStorage.removeItem('page2Store');
              console.log('✅ [Navigation] Session storage cleared');
            }
            
            // Reset ALL stores to initial state (as if app just loaded)
            if (window.page1Store) {
              console.log('🔄 [Navigation] Resetting Page 1 store to initial state');
              window.page1Store.clearPersistedState();
              window.page1Store.setInitialState();
              
              // Update question context with new question
              const newQuestion = window.QUESTIONS[newIndex];
              if (newQuestion) {
                window.page1Store.updateQuestionContext(newIndex, newQuestion.subtrahend);
                console.log('✅ [Navigation] Page 1 store updated with new question context');
              }
            }
            
            if (window.page2Store) {
              console.log('🔄 [Navigation] Resetting Page 2 store to initial state');
              window.page2Store.clearPersistedState();
              window.page2Store.setInitialState();
              
              // Update question context with new question
              const newQuestion = window.QUESTIONS[newIndex];
              if (newQuestion) {
                const expectedAnswer = newQuestion.minuend - newQuestion.subtrahend;
                window.page2Store.updateQuestionContext(newIndex, expectedAnswer);
                console.log('✅ [Navigation] Page 2 store updated with new question context');
              }
            }
            
            // Reset React state completely
            if (typeof window.updatePageState === 'function') {
              console.log('🔄 [Navigation] Resetting React state');
              window.updatePageState({ 
                currentQuestionIndex: newIndex,
                page1complete: false,
                page2complete: false,
                answerPage2: '',
                objectsremoved: 0
              });
            }
            
            // Reset global window variables (as if app just loaded)
            window.page1complete = false;
            window.page2complete = false;
            window.answerPage2 = '';
            window.objectsremoved = 0;
            
            console.log('✅ [Navigation] Complete app reset completed - ready for new question');
            resolve(newIndex);
          } else {
            resolve(0);
          }
        });
      };
      
      const updateQuestionDependentElements = () => {
        console.log('🔄 [UI] Updating question-dependent elements (USING SAME CONFIG SYSTEM FOR BOTH PAGES)');
        
        setTimeout(() => {
          console.log('🔍 [UI] setTimeout callback executing...');
          
          // Update Page 1 cars (with crosses for demonstration)
          let page1Cars = [];
          if (typeof window.generateCarsWithMemo === 'function') {
            page1Cars = window.generateCarsWithMemo(1, true);
            console.log(`✅ [UI] Generated ${page1Cars.length} Page 1 cars using same config system`);
          } else {
            console.error(`❌ [UI] window.generateCarsWithMemo not available`);
            return;
          }
          
          // Update Page 2 cars (with crosses)
          let page2Cars = [];
          if (typeof window.generateCarsWithMemo === 'function') {
            page2Cars = window.generateCarsWithMemo(2, true);
            console.log(`✅ [UI] Generated ${page2Cars.length} Page 2 cars using same config system`);
          }
          
          // Update GridPositionPages[1] to use the new cars
          if (typeof window !== 'undefined' && window.GridPositionPages && window.GridPositionPages[1]) {
            const nonCarElements = window.GridPositionPages[1].filter(element => 
              !element.name.startsWith('car-') && !element.name.includes('-cross')
            );
            
            window.GridPositionPages[1] = [
              ...nonCarElements,
              ...page1Cars
            ];
            
            console.log(`✅ [UI] Updated GridPositionPages[1] with ${page1Cars.length} new cars`);
          } else {
            console.error('❌ [UI] GridPositionPages[1] not available!');
          }
          
          // Update GridPositionPages[2] to use the new cars with crosses
          if (typeof window !== 'undefined' && window.GridPositionPages && window.GridPositionPages[2]) {
            const nonCarElements = window.GridPositionPages[2].filter(element => 
              !element.name.startsWith('car-') && !element.name.includes('-cross')
            );
            
            window.GridPositionPages[2] = [
              ...nonCarElements,
              ...page2Cars
            ];
            
            console.log(`✅ [UI] Updated GridPositionPages[2] with ${page2Cars.length} new cars with crosses`);
          } else {
            console.error('❌ [UI] GridPositionPages[2] not available!');
          }
          
          // Trigger React re-render by forcing app update
          if (typeof window.forceAppUpdate === 'function') {
            window.forceAppUpdate();
            console.log('✅ [UI] Triggered React re-render via forceAppUpdate for both pages');
          } else {
            console.warn('⚠️ [UI] forceAppUpdate not available, React may not re-render');
          }
          
          if (typeof window.updateAnswerContainerPage2 === 'function') {
            window.updateAnswerContainerPage2();
          }
          
          console.log('✅ [UI] updateQuestionDependentElements completed using same config system for both pages');
        }, 100);
      };
      
      const getNextButtonText = () => {
        if (typeof window !== 'undefined' && window.QUESTIONS && typeof window.currentQuestionIndex !== 'undefined') {
          const totalQuestions = window.QUESTIONS.length;
          const currentIndex = window.currentQuestionIndex || 0;
          
          if (currentIndex < totalQuestions - 1) {
            return typeof i18n !== 'undefined' ? i18n.t('buttons.nextQuestion') : 'Next Question';
          } else {
            return typeof i18n !== 'undefined' ? i18n.t('buttons.startOver') : 'Start Over';
          }
        }
        return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
      };
      
      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;
      window.generateCarsWithMemo = optimizedPages.generateCarsWithMemo;
      
      console.log('✅ [PageConfig] Direct function assignment completed');
      console.log('🔍 [PageConfig] window.advanceToNextQuestion type:', typeof window.advanceToNextQuestion);
      console.log('🔍 [PageConfig] window.updateQuestionDependentElements type:', typeof window.updateQuestionDependentElements);
      console.log('🔍 [PageConfig] window.generateCarsWithMemo type:', typeof window.generateCarsWithMemo);
      
    } catch (error) {
      console.error('❌ [PageConfig] Error in direct function assignment:', error);
    }
    
    // Initialize state management for all pages
    setTimeout(() => {
      initializePage1StateManagement();
      initializePage2StateManagement();
    }, 200);
    
    console.log('✅ PageConfig React 18 - optimized pages and providers available globally');
  }
  
  return optimizedPages;
};

// Initialize immediately
console.log('🔄 [PageConfig] About to call initializePageConfig...');
const OptimizedGridPositionPages = initializePageConfig();
console.log('🔄 [PageConfig] initializePageConfig completed, result:', typeof OptimizedGridPositionPages);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PageConfigProvider,
    usePageConfig,
    OptimizedGridPositionPages,
    useSoundManager,
    usePageStateManager,
    useWebAudio
  };
} else {
  // Browser global export
  window.PageConfigOptimized = {
    PageConfigProvider,
    usePageConfig,
    OptimizedGridPositionPages,
    useSoundManager,
    usePageStateManager,
    useWebAudio
  };
}

console.log('🎉 PageConfig optimization complete!');
