/**
 * Step Ordering Game Logic
 * 
 * Manages the game state for the step ordering challenge
 * where users must arrange Step1 → Step2 → Step3 in correct order
 */

// ===== GAME CONFIGURATION =====

const CORRECT_ORDER_ASC = ['step1-image-text', 'step2-image-text', 'step3-image-text'];
const CORRECT_ORDER_DSC = ['step3-image-text', 'step2-image-text', 'step1-image-text'];

// All possible incorrect starting orders - ensuring NO steps are in correct positions
const INCORRECT_ORDERS = [
  ['step3-image-text', 'step1-image-text', 'step2-image-text'], // Step3 → Step1 → Step2 (all wrong)
  ['step2-image-text', 'step3-image-text', 'step1-image-text'], // Step2 → Step3 → Step1 (all wrong)
  ['step3-image-text', 'step2-image-text', 'step1-image-text']  // Step3 → Step2 → Step1 (all wrong)
];

// Fixed coordinate positions for the three steps
const STEP_POSITIONS = [
  [343, 392, 605, 900],  // Position 0 (left)
  [660, 392, 922, 900],  // Position 1 (middle)
  [960, 392, 1235, 900]  // Position 2 (right)
];

// ===== GAME STATE =====

// Initialize game state
const createGameState = () => {
  return {
    currentOrder: null,
    isComplete: false,
    feedbackState: 'none', // 'none', 'checking', 'correct', 'incorrect'
    attemptCount: 0,
    revealedSteps: {}, // Track which steps have been revealed
    /** After a wrong Check: maps step id → 'correct' | 'incorrect' for which feedback image to show */
    checkPlacementHints: null
  };
};

// Global game state
if (typeof window !== 'undefined') {
  window.stepOrderingGame = createGameState();
}

// ===== GAME LOGIC FUNCTIONS =====

/**
 * Get current question data from Question array
 * @returns {Object} Current question object with step fractions and feedback
 */
const getCurrentQuestion = () => {
  // Use the question counter to get the current question
  const currentIndex = window.questionCounter || 0;
  return window.Question ? window.Question(currentIndex) : window.Question(0);
};

const clearCheckPlacementHints = () => {
  if (window.stepOrderingGame) {
    window.stepOrderingGame.checkPlacementHints = null;
  }
};

/**
 * After Check when the order is not fully correct: every card shows its step*Incorrect art.
 * step*Correct is reserved for a fully correct order (see revealed + isComplete in getResolvedStepContentPath).
 */
const setCheckPlacementHintsAfterIncorrectCheck = () => {
  const order = window.stepOrderingGame?.currentOrder;
  if (!order) return;
  const correctOrder = getCorrectOrder();
  const fullyCorrect = order.length === correctOrder.length &&
    order.every((stepName, i) => correctOrder[i] === stepName);
  if (fullyCorrect) {
    clearCheckPlacementHints();
    return;
  }
  const hints = {};
  order.forEach((stepName) => {
    hints[stepName] = 'incorrect';
  });
  window.stepOrderingGame.checkPlacementHints = hints;
};

/**
 * Which asset path to show on a step: puzzle (step1/2/3), all step*Incorrect after a failed Check,
 * or step*Correct only after success when that step is revealed and the round is complete.
 * @param {object} question - Current question from data.js
 * @param {string} stepName - e.g. 'step1-image-text'
 * @returns {string}
 */
const getResolvedStepContentPath = (question, stepName) => {
  if (!question || !stepName) return '';
  const m = stepName.match(/^step(\d)-image-text$/);
  if (!m) return '';
  const n = m[1];
  const game = window.stepOrderingGame;
  const baseKey = `step${n}`;
  const revealed = game?.revealedSteps?.[stepName];
  if (revealed && game?.isComplete && question[`${baseKey}Correct`]) {
    return question[`${baseKey}Correct`];
  }
  const hint = game?.checkPlacementHints?.[stepName];
  if (hint === 'incorrect' && question[`${baseKey}Incorrect`]) {
    return question[`${baseKey}Incorrect`];
  }
  return question[baseKey] || '';
};

/** Display scale for step1/2/3Correct fruit images on step cards */
const CORRECT_STEP_FEEDBACK_IMAGE_SCALE = 0.65;

/**
 * True when path matches the current question's step*Correct asset.
 */
const isCorrectFeedbackImagePath = (path) => {
  if (typeof path !== 'string') return false;
  const q = getCurrentQuestion();
  if (!q) return false;
  return path === q.step1Correct || path === q.step2Correct || path === q.step3Correct;
};

/**
 * Get the correct order based on current question type
 * @returns {string[]} Array of step names in correct order
 */
const getCorrectOrder = () => {
  const currentQuestion = getCurrentQuestion();
  const questionType = currentQuestion?.type || 'ASC';
  
  if (questionType === 'DSC') {
    console.log('📊 Question type: DSC (descending) - Correct order: step3 → step2 → step1');
    return CORRECT_ORDER_DSC;
  } else {
    console.log('📊 Question type: ASC (ascending) - Correct order: step1 → step2 → step3');
    return CORRECT_ORDER_ASC;
  }
};

/**
 * Get total number of questions available
 * @returns {number} Total number of questions
 */
const getTotalQuestions = () => {
  console.log('🔍 Getting total questions...');
  
  // Method 1: Try to count questions by testing the getQuestionData function
  if (window.i18n && typeof window.i18n.getQuestionData === 'function') {
    let questionCount = 0;
    let index = 0;
    
    // Count questions by trying to get each one until we get null
    while (true) {
      const question = window.i18n.getQuestionData(index);
      if (question) {
        questionCount++;
        index++;
      } else {
        break;
      }
    }
    
    if (questionCount > 0) {
      console.log(`✅ Total questions found by counting: ${questionCount}`);
      return questionCount;
    }
  }
  
  // Method 2: Try to access AppData directly (if it's global)
  if (typeof AppData !== 'undefined' && AppData.translations) {
    const lang = AppData.currentLanguage || 'en';
    const questions = AppData.translations[lang]?.questions;
    console.log(`🔍 AppData - Questions found for ${lang}:`, questions ? questions.length : 'none');
    
    if (questions && Array.isArray(questions)) {
      console.log(`✅ Total questions (AppData): ${questions.length}`);
      return questions.length;
    }
  }
  
  // Method 3: Try to access window.AppData (if it's on window)
  if (window.AppData && window.AppData.translations) {
    const lang = window.AppData.currentLanguage || 'en';
    const questions = window.AppData.translations[lang]?.questions;
    console.log(`🔍 window.AppData - Questions found for ${lang}:`, questions ? questions.length : 'none');
    
    if (questions && Array.isArray(questions)) {
      console.log(`✅ Total questions (window.AppData): ${questions.length}`);
      return questions.length;
    }
  }
  
  console.warn('⚠️ Could not determine total questions, using default of 15');
  return 15; // Default to 15 since we have 15 questions in data.js
};

/**
 * Generate a random incorrect starting order based on question type
 * @returns {string[]} Array of step names in random incorrect order
 */
const generateRandomIncorrectOrder = () => {
  const currentQuestion = getCurrentQuestion();
  const questionType = currentQuestion?.type || 'ASC';
  
  // Define incorrect orders that avoid the correct order for the current question type
  let availableIncorrectOrders;
  
  if (questionType === 'DSC') {
    // For DSC questions, avoid step3 → step2 → step1 (which is the correct DSC order)
    availableIncorrectOrders = [
      ['step3-image-text', 'step1-image-text', 'step2-image-text'], // Step3 → Step1 → Step2
      ['step2-image-text', 'step3-image-text', 'step1-image-text'], // Step2 → Step3 → Step1
      ['step1-image-text', 'step3-image-text', 'step2-image-text'], // Step1 → Step3 → Step2
      ['step1-image-text', 'step2-image-text', 'step3-image-text'], // Step1 → Step2 → Step3 (ASC order)
      ['step2-image-text', 'step1-image-text', 'step3-image-text']  // Step2 → Step1 → Step3
    ];
  } else {
    // For ASC questions, avoid step1 → step2 → step3 (which is the correct ASC order)
    availableIncorrectOrders = [
      ['step3-image-text', 'step1-image-text', 'step2-image-text'], // Step3 → Step1 → Step2
      ['step2-image-text', 'step3-image-text', 'step1-image-text'], // Step2 → Step3 → Step1
      ['step3-image-text', 'step2-image-text', 'step1-image-text'], // Step3 → Step2 → Step1 (DSC order)
      ['step1-image-text', 'step3-image-text', 'step2-image-text'], // Step1 → Step3 → Step2
      ['step2-image-text', 'step1-image-text', 'step3-image-text']  // Step2 → Step1 → Step3
    ];
  }
  
  const randomIndex = Math.floor(Math.random() * availableIncorrectOrders.length);
  const selectedOrder = [...availableIncorrectOrders[randomIndex]];
  console.log(`🎲 Generated random incorrect order for ${questionType}:`, selectedOrder);
  return selectedOrder;
};

/**
 * Validate if the current order is correct
 * @param {string[]} order - Array of step names in current order
 * @returns {boolean} True if order is correct, false otherwise
 */
const isOrderCorrect = (order) => {
  if (!order || order.length !== 3) return false;
  
  const correctOrder = getCorrectOrder();
  const isCorrect = order.every((step, index) => step === correctOrder[index]);
  console.log('✅ Order validation:', isCorrect ? 'CORRECT' : 'INCORRECT', order);
  return isCorrect;
};

/**
 * Initialize the game with a random incorrect order
 */
const initializeGame = () => {
  console.log('🎮 Initializing step ordering game...');
  
  if (typeof window !== 'undefined') {
    window.stepOrderingGame = createGameState();
    window.stepOrderingGame.currentOrder = generateRandomIncorrectOrder();
    window.stepOrderingGame.isComplete = false;
    window.stepOrderingGame.feedbackState = 'none';
    window.stepOrderingGame.attemptCount = 0;
    window.stepOrderingGame.revealedSteps = {}; // Reset revealed steps
    
    // Update book image based on current question
    updateBookImage();
    
    // Update button texts to current language with a delay to ensure language system is ready
    setTimeout(() => {
      updateButtonTexts();
    }, 100);
    
    console.log('🎮 Game initialized with order:', window.stepOrderingGame.currentOrder);
  }
};

/**
 * Trigger shatter animation for a specific step's overlay
 * @param {string} stepName - Name of the step to reveal
 */
const triggerShatterAnimation = (stepName) => {
  console.log(`🔨 Triggering shatter animation for ${stepName}`);
  
  // Find the overlay element for this step
  const stepElement = document.querySelector(`[data-step-name="${stepName}"]`);
  if (!stepElement) {
    console.warn(`⚠️ Step element not found: ${stepName}`);
    return;
  }
  
  const overlayElement = stepElement.querySelector('.step-overlay');
  if (!overlayElement) {
    console.warn(`⚠️ Overlay element not found for: ${stepName}`);
    return;
  }
  
  // Play shatter sound effect
  if (typeof window.playSound === 'function') {
    window.playSound('swoosh');
  }
  
  // Add shatter animation class
  overlayElement.classList.add('step-overlay-shatter');
  
  // Create glass fragments for dramatic effect
  for (let i = 1; i <= 8; i++) {
    const fragment = document.createElement('div');
    fragment.className = `step-overlay-fragment step-overlay-fragment-${i}`;
    overlayElement.appendChild(fragment);
  }
  
  // DON'T manually remove - let React handle it when state updates
  console.log(`✨ Shatter animation started for ${stepName}`);
};

/**
 * Update the game state with new order after a drag
 * @param {string[]} newOrder - The new order after drag and drop
 */
const updateGameOrder = (newOrder) => {
  if (typeof window !== 'undefined') {
    console.log('🔄 Updating game order:', newOrder);
    
    window.stepOrderingGame.currentOrder = [...newOrder];
    window.stepOrderingGame.attemptCount += 1;
    
    // Check if order is correct
    const isCorrect = isOrderCorrect(newOrder);
    
    if (isCorrect) {
      clearCheckPlacementHints();
      window.stepOrderingGame.isComplete = true;
      window.stepOrderingGame.feedbackState = 'correct';
      console.log('🎉 Game complete! Order is correct!');
      
      // Trigger shatter animation for all steps with staggered delays
      // IMPORTANT: Don't mark as revealed yet, let animation complete first
      newOrder.forEach((stepName, index) => {
        setTimeout(() => {
          triggerShatterAnimation(stepName);
          
          // Mark as revealed after animation starts
          setTimeout(() => {
            window.stepOrderingGame.revealedSteps[stepName] = true;
            // Force re-render to remove overlay after animation
            if (typeof window.forceAppUpdate === 'function') {
              window.forceAppUpdate();
            }
          }, 1500); // Match animation duration
        }, index * 200); // 0ms, 200ms, 400ms delays
      });
      
      // Play success sound
      if (typeof window.playSound === 'function') {
        window.playSound('correct');
        setTimeout(() => {
          window.playSound('confetti');
        }, 200);
      }
      
      // Stop floating animations
      stopFloatingAnimations();
      
      // Update button visibility and feedback
      const feedbackElement = document.querySelector('[data-element-name="feedback-textbox"]');
      const checkButton = document.querySelector('[data-element-name="check-button"]') || 
                         document.querySelector('.check-button-container') ||
                         document.querySelector('.check-button-element');
      const nextQuestionButton = document.querySelector('[data-element-name="next-question-button"]') || 
                                document.querySelector('.next-question-button-container') ||
                                document.querySelector('.next-question-button-element');
      
      if (feedbackElement) {
        const currentQuestion = getCurrentQuestion();
        feedbackElement.textContent = currentQuestion.correctFeedback;
        feedbackElement.style.backgroundColor = '#d4edda';
        feedbackElement.style.color = '#155724';
        feedbackElement.style.border = '2px solid #c3e6cb';
      }
      
              // Hide Check button and tap animation (Next Question button will be shown after animation)
              if (checkButton) {
                console.log('🔘 Hiding check button (from updateGameOrder)');
                checkButton.style.display = 'none';
              } else {
                console.warn('⚠️ Check button not found (from updateGameOrder)');
              }
              
              // Hide tap animation when Check button is hidden
              const tapAnimation = document.querySelector('[data-element-name="tap-animation-2"]');
              if (tapAnimation) {
                console.log('🎬 Hiding tap animation (from updateGameOrder)');
                tapAnimation.style.display = 'none';
              }
      
      // Trigger dramatic success animation
      setTimeout(() => {
        triggerDramaticSuccessAnimation();
      }, 500);
      
      // Start character jump sequence after 2000ms
      setTimeout(() => {
        if (window.CharacterJumpAnimation && typeof window.CharacterJumpAnimation.startJumpSequence === 'function') {
          console.log('🎮 Triggering character jump sequence...');
          window.CharacterJumpAnimation.startJumpSequence();
        } else {
          console.warn('⚠️ CharacterJumpAnimation not available');
        }
      }, 2000);
    } else {
      clearCheckPlacementHints();
      window.stepOrderingGame.isComplete = false; // Ensure drag and drop remains enabled
      window.stepOrderingGame.feedbackState = 'none'; // Don't show incorrect feedback immediately
      console.log('❌ Order is incorrect, keep trying...');
      
      // Reset feedback to default instructions instead of showing incorrect feedback
      if (typeof window.StepOrderingGame?.resetFeedbackText === 'function') {
        window.StepOrderingGame.resetFeedbackText();
      }
    }
    
    // Trigger re-render if available
    if (typeof window.forceAppUpdate === 'function') {
      window.forceAppUpdate();
    }
  }
};

/**
 * Get the current position coordinates for a step based on its index
 * @param {number} index - The index of the step in the current order (0, 1, or 2)
 * @returns {number[]} Coordinates [x1, y1, x2, y2]
 */
const getStepPosition = (index) => {
  return STEP_POSITIONS[index] || STEP_POSITIONS[0];
};

/**
 * Reset the game to a new random incorrect order
 */
const resetGame = () => {
  console.log('🔄 Resetting game...');
  initializeGame();
};

/**
 * Get the current game state
 * @returns {object} Current game state
 */
const getGameState = () => {
  return typeof window !== 'undefined' ? window.stepOrderingGame : createGameState();
};

/**
 * Trigger dramatic success animation sequence
 */
const triggerDramaticSuccessAnimation = () => {
  console.log('🎬 Starting success animation...');
  
  // Get all step image containers
  const imageContainers = document.querySelectorAll('.draggable-step .image-text-container');
  
  if (imageContainers.length === 0) {
    console.warn('⚠️ No step elements found for animation');
    return;
  }
  
  // Add green glow to all steps (simplified, no scale/rotate/bounce)
  imageContainers.forEach((container) => {
    container.classList.add('success-animation-phase1');
  });
  
  // Phase 2: Intensify glow
  setTimeout(() => {
    imageContainers.forEach((container) => {
      container.classList.remove('success-animation-phase1');
      container.classList.add('success-animation-phase2');
    });
  }, 1000);
  
  // Phase 3: Final celebration - settle to permanent glow
  setTimeout(() => {
    imageContainers.forEach((container) => {
      container.classList.remove('success-animation-phase2');
      container.classList.add('permanent-success-glow');
    });
    console.log('🎉 Success animation completed!');
  }, 2000);
  
  // Create floating particles effect
  createFloatingParticles();
};

/**
 * Stop floating animations when game is complete
 */
const stopFloatingAnimations = () => {
  console.log('🛑 Stopping floating animations...');
  
  // Get all elements with floating animations
  const characterElement = document.querySelector('[data-element-name="jump00-image"]');
  const leftHoverElement = document.querySelector('[data-element-name="left-hover-image"]');
  const rightHoverElement = document.querySelector('[data-element-name="right-hover-image"]');
  
  // Stop animations by setting animation-play-state to paused
  if (characterElement) {
    characterElement.style.animationPlayState = 'paused';
    console.log('✅ Character animation paused');
  }
  
  if (leftHoverElement) {
    leftHoverElement.style.animationPlayState = 'paused';
    console.log('✅ Left hover animation paused');
  }
  
  if (rightHoverElement) {
    rightHoverElement.style.animationPlayState = 'paused';
    console.log('✅ Right hover animation paused');
  }
};

/**
 * Resume floating animations
 */
const resumeFloatingAnimations = () => {
  console.log('▶️ Resuming floating animations...');
  
  // Get all elements with floating animations
  const characterElement = document.querySelector('[data-element-name="jump00-image"]');
  const leftHoverElement = document.querySelector('[data-element-name="left-hover-image"]');
  const rightHoverElement = document.querySelector('[data-element-name="right-hover-image"]');
  
  // Resume animations by setting animation-play-state to running
  if (characterElement) {
    characterElement.style.animationPlayState = 'running';
    console.log('✅ Character animation resumed');
  }
  
  if (leftHoverElement) {
    leftHoverElement.style.animationPlayState = 'running';
    console.log('✅ Left hover animation resumed');
  }
  
  if (rightHoverElement) {
    rightHoverElement.style.animationPlayState = 'running';
    console.log('✅ Right hover animation resumed');
  }
};

/**
 * Create floating particles effect
 */
const createFloatingParticles = () => {
  const container = document.querySelector('.droppable-steps-container');
  if (!container) return;
  
  // Create particle elements
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'success-particle';
    particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: linear-gradient(45deg, #4caf50, #81c784);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    container.appendChild(particle);
    
    // Animate particle
    anime({
      targets: particle,
      translateY: [0, -100],
      translateX: [0, (Math.random() - 0.5) * 200],
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      duration: 2000,
      delay: Math.random() * 500,
      easing: 'easeOutQuart',
      complete: () => {
        particle.remove();
      }
    });
  }
};

/**
 * Trigger book animation (spin, move to center, grow, show message and button)
 */
const triggerBookAnimation = () => {
  console.log('📖 Starting book animation...');
  
  if (typeof anime === 'undefined') {
    console.warn('⚠️ anime.js not available for book animation');
    return;
  }
  
  // Play magic sound for book animation
  if (typeof window.playMagicSound === 'function') {
    window.playMagicSound();
  }
  
  // Wait for book element to be available
  waitForBookElement((bookElement) => {
    performBookAnimation(bookElement);
  });
};

const performBookAnimation = (bookElement) => {
  
  // Debug: Log book element dimensions and position
  const rect = bookElement.getBoundingClientRect();
  console.log('📖 Book element before animation:', {
    width: rect.width,
    height: rect.height,
    left: rect.left,
    top: rect.top,
    transformOrigin: bookElement.style.transformOrigin
  });
  
  // Start animation sequence
  const timeline = anime.timeline({
    easing: 'easeInOutQuad'
  });
  
  // Set transform origin to center for proper scaling
  bookElement.style.transformOrigin = 'center center';
  
  // Phase 1: Spin in place (2 seconds)
  timeline.add({
    targets: bookElement,
    rotate: [0, 720], // Two full rotations
    duration: 2000,
    easing: 'easeInOutCubic'
  })
  // Phase 2: Grow to 1.3x (1 second)
  .add({
    targets: bookElement,
    scale: [1, 1.3],
    duration: 1000,
    easing: 'easeOutElastic(1, 0.6)'
  });
  
  // Show message and Next Question button after animation completes
  setTimeout(() => {
    // Debug: Log book element after animation
    const rectAfter = bookElement.getBoundingClientRect();
    console.log('📖 Book element after animation:', {
      width: rectAfter.width,
      height: rectAfter.height,
      left: rectAfter.left,
      top: rectAfter.top,
      transform: bookElement.style.transform,
      transformOrigin: bookElement.style.transformOrigin
    });
    
    // Add yellow glow effect to the book
    bookElement.style.filter = 'drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 40px #FFD700) drop-shadow(0 0 60px #FFA500)';
    bookElement.style.transition = 'filter 0.5s ease-in-out';
    
    showSuccessMessage();
    showNextQuestionButton();
  }, 3000); // 2s + 1s
};

/**
 * Show success message overlay
 */
const showSuccessMessage = () => {
  console.log('💬 Showing success message...');
  
  // Get the pre-defined success message element
  const messageElement = document.querySelector('[data-element-name="success-message"]');
  if (!messageElement) {
    console.warn('⚠️ Success message element not found');
    console.log('Available elements with data-element-name:', 
      Array.from(document.querySelectorAll('[data-element-name]')).map(el => el.getAttribute('data-element-name'))
    );
    return;
  }
  
  console.log('✅ Found success message element:', messageElement);
  
  // Get current question index and book data using question counter
  const currentIndex = window.questionCounter || 0;
  const bookData = window.bookName ? window.bookName(currentIndex + 1) : null;
  
  // Update the message text based on current book
  if (bookData && bookData.message) {
    messageElement.textContent = `🎉 ${bookData.message}`;
    console.log(`📖 Updated success message for book ${currentIndex + 1}: ${bookData.message}`);
  } else {
    // Fallback to default message
    messageElement.textContent = '🎉 You have now collected the Book of Eden!';
    console.log('📖 Using fallback success message');
  }
  
  // Show the element
  messageElement.style.display = 'block';
  messageElement.style.opacity = '0';
  
  // Fade in animation
  if (typeof anime !== 'undefined') {
    anime({
      targets: messageElement,
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad'
    });
  } else {
    messageElement.style.opacity = '1';
  }
};

/**
 * Show "Next Question" button or final success screen
 */
const showNextQuestionButton = () => {
  console.log('➡️ Checking if should show next question button or final success...');
  
  // Check if this is the last question
  const currentIndex = window.questionCounter || 0;
  const totalQuestions = getTotalQuestions();
  
  console.log(`🔍 Current question: ${currentIndex + 1} of ${totalQuestions}`);
  
  if (currentIndex + 1 >= totalQuestions) {
    // This is the last question - show final success screen instead
    console.log('🎉 Last question completed! Showing final success screen...');
    showFinalSuccessScreen();
    return;
  }
  
  // Not the last question - show Next Question button
  console.log('➡️ Showing next question button...');
  
  const button = document.querySelector('[data-element-name="next-question-button"]') || 
                 document.querySelector('.next-question-button-container') ||
                 document.querySelector('.next-question-button-element');
  if (!button) {
    console.warn('⚠️ Next question button not found');
    return;
  }
  
  // Show button with animation and center alignment
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.opacity = '0';
  
  // Update button text to current language
  const nextQuestionText = window.i18n && typeof window.i18n.t === 'function' 
    ? window.i18n.t('buttons.nextQuestion', 'Next Question')
    : 'Next Question';
  button.textContent = nextQuestionText;
  console.log(`🔄 Next Question button text updated to: "${nextQuestionText}"`);
  
  // Show tap animation when Next Question button is made visible
  const tapAnimation = document.querySelector('[data-element-name="tap-animation-2"]');
  if (tapAnimation) {
    console.log('🎬 Showing tap animation with Next Question button');
    tapAnimation.style.display = 'block';
    tapAnimation.style.opacity = '0';
  }
  
  if (typeof anime !== 'undefined') {
    anime({
      targets: button,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: 500
    });
    
    // Animate tap animation as well
    if (tapAnimation) {
      anime({
        targets: tapAnimation,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutCubic',
        delay: 500
      });
    }
  } else {
    button.style.opacity = '1';
    if (tapAnimation) {
      tapAnimation.style.opacity = '1';
    }
  }
};

/**
 * Update book image based on current question
 */
const updateBookImage = () => {
  // Use the question counter to get the current question
  const currentIndex = window.questionCounter || 0;
  console.log(`🔍 Debug updateBookImage: currentIndex=${currentIndex}, window.bookName=${typeof window.bookName}`);
  
  const bookData = window.bookName ? window.bookName(currentIndex + 1) : null;
  console.log(`🔍 Debug bookData:`, bookData);
  
  const bookImage = bookData ? bookData.bookImage : 'book1.png'; // Use book1.png as fallback instead of Book.png
  
  // Wait for book element to be available
  waitForBookElement((bookElement) => {
    bookElement.style.backgroundImage = `url(assets/${bookImage})`;
    console.log(`📖 Updated book image to: ${bookImage} for question ${currentIndex + 1}`);
  });
};

/**
 * Update step content for new question without page reload
 */
const updateStepContent = () => {
  console.log('🔄 Updating step content for new question...');
  
  // Get current question data
  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    console.warn('⚠️ No current question data found');
    return;
  }
  
  // Find all step elements and update their content
  const stepElements = document.querySelectorAll('[data-element-name*="step"]');
  
  stepElements.forEach((element, index) => {
    const elementName = element.getAttribute('data-element-name');
    
    // Update step1-image-text
    if (elementName === 'step1-image-text') {
      const textElement = element.querySelector('.katex');
      if (textElement) {
        // Update the fraction text
        const newText = currentQuestion.step1;
        console.log('🔍 updateStepContent - step1 newText:', newText);
        
        // Parse mixed fraction properly - UPDATED v3
        let latexString;
        if (newText.includes(' ')) {
          console.log('🔍 Detected mixed fraction in step1');
          // Handle mixed fractions like "1 2/3" - display as proper mixed fraction
          const parts = newText.split(' ');
          const wholeNumber = parseInt(parts[0]);
          const fractionParts = parts[1].split('/');
          const numerator = parseInt(fractionParts[0]);
          const denominator = parseInt(fractionParts[1]);
          latexString = `${wholeNumber} \\frac{${numerator}}{${denominator}}`;
          console.log('🔍 step1 mixed fraction converted to:', latexString);
        } else {
          console.log('🔍 Detected regular fraction in step1');
          // Handle regular fractions like "2/3"
          latexString = `\\dfrac{${newText.split('/')[0]}}{${newText.split('/')[1]}}`;
          console.log('🔍 step1 regular fraction converted to:', latexString);
        }
        
        // Re-render KaTeX with proper LaTeX string
        if (typeof katex !== 'undefined') {
          katex.render(latexString, textElement, {
            displayMode: true,
            throwOnError: false
          });
        } else {
          // Fallback if KaTeX is not available
          textElement.textContent = newText;
        }
      }
    }
    
    // Update step2-image-text
    if (elementName === 'step2-image-text') {
      const textElement = element.querySelector('.katex');
      if (textElement) {
        // Update the fraction text
        const newText = currentQuestion.step2;
        
        // Parse mixed fraction properly - UPDATED v3
        let latexString;
        if (newText.includes(' ')) {
          // Handle mixed fractions like "1 2/3" - display as proper mixed fraction
          const parts = newText.split(' ');
          const wholeNumber = parseInt(parts[0]);
          const fractionParts = parts[1].split('/');
          const numerator = parseInt(fractionParts[0]);
          const denominator = parseInt(fractionParts[1]);
          latexString = `${wholeNumber} \\frac{${numerator}}{${denominator}}`;
        } else {
          // Handle regular fractions like "2/3"
          latexString = `\\dfrac{${newText.split('/')[0]}}{${newText.split('/')[1]}}`;
        }
        
        // Re-render KaTeX with proper LaTeX string
        if (typeof katex !== 'undefined') {
          katex.render(latexString, textElement, {
            displayMode: true,
            throwOnError: false
          });
        } else {
          // Fallback if KaTeX is not available
          textElement.textContent = newText;
        }
      }
    }
    
    // Update step3-image-text
    if (elementName === 'step3-image-text') {
      const textElement = element.querySelector('.katex');
      if (textElement) {
        // Update the fraction text
        const newText = currentQuestion.step3;
        
        // Parse mixed fraction properly - UPDATED v3
        let latexString;
        if (newText.includes(' ')) {
          // Handle mixed fractions like "1 2/3" - display as proper mixed fraction
          const parts = newText.split(' ');
          const wholeNumber = parseInt(parts[0]);
          const fractionParts = parts[1].split('/');
          const numerator = parseInt(fractionParts[0]);
          const denominator = parseInt(fractionParts[1]);
          latexString = `${wholeNumber} \\frac{${numerator}}{${denominator}}`;
        } else {
          // Handle regular fractions like "2/3"
          latexString = `\\dfrac{${newText.split('/')[0]}}{${newText.split('/')[1]}}`;
        }
        
        // Re-render KaTeX with proper LaTeX string
        if (typeof katex !== 'undefined') {
          katex.render(latexString, textElement, {
            displayMode: true,
            throwOnError: false
          });
        } else {
          // Fallback if KaTeX is not available
          textElement.textContent = newText;
        }
      }
    }
  });
  
  // Reset the game state for the new question
  if (window.stepOrderingGame) {
    window.stepOrderingGame.currentOrder = generateRandomIncorrectOrder();
    window.stepOrderingGame.isComplete = false;
    window.stepOrderingGame.attemptCount = 0;
    window.stepOrderingGame.feedbackState = 'none';
    window.stepOrderingGame.revealedSteps = {}; // Reset revealed steps for new question
  }
  
  // Reset character to original position
  resetCharacterPosition();
  
  // Reset book to normal state
  resetBookToNormalState();
  
  // Reset feedback text to default with a delay to ensure language system is ready
  setTimeout(() => {
    resetFeedbackText();
  }, 200);
  
  // Update button texts to maintain center alignment with a delay to ensure language system is ready
  setTimeout(() => {
    updateButtonTexts();
  }, 150);
  
  // Restart hover animations with a small delay to ensure DOM is ready
  setTimeout(() => {
    restartHoverAnimations();
  }, 100);
  
  // Reset steps to random incorrect order
  resetStepsToRandomOrder();
  
  console.log('✅ Step content updated for new question');
};

/**
 * Reset character to original position
 */
const resetCharacterPosition = () => {
  console.log('🔄 Resetting character to original position...');
  
  // Hide any jump element if it exists
  const jumpElement = document.querySelector('.jump-character');
  if (jumpElement && jumpElement.parentNode) {
    jumpElement.parentNode.removeChild(jumpElement);
  }
  
  // Show original character
  const originalCharacter = document.querySelector('[data-element-name="jump00-image"]');
  if (originalCharacter) {
    originalCharacter.style.opacity = '1';
    originalCharacter.style.display = 'block';
  }
  
  // Reset character jump animation state
  if (window.CharacterJumpAnimation && typeof window.CharacterJumpAnimation.resetJumpAnimation === 'function') {
    window.CharacterJumpAnimation.resetJumpAnimation();
  }
  
  console.log('✅ Character reset to original position');
};

/**
 * Reset book to normal state (remove glow and scaling)
 */
const resetBookToNormalState = () => {
  console.log('🔄 Resetting book to normal state...');
  
  let bookElement = document.querySelector('[data-element-name="book-image"]');
  if (!bookElement) {
    bookElement = document.querySelector('#book-image') || document.querySelector('.book-image');
  }
  if (bookElement) {
    // Remove any transforms (scaling, rotation)
    bookElement.style.transform = 'none';
    
    // Remove glow effects
    bookElement.style.filter = 'none';
    
    // Remove any transitions that might interfere
    bookElement.style.transition = 'none';
    
    // Reset transform origin
    bookElement.style.transformOrigin = 'initial';
    
    console.log('🔄 Book reset to normal state (no glow, no scaling)');
  } else {
    console.warn('⚠️ Book element not found');
  }
  
  console.log('✅ Book reset to normal state');
};

/**
 * Wait for book element to be available in DOM
 */
const waitForBookElement = (callback, maxAttempts = 20) => {
  let attempts = 0;
  
  const checkForElement = () => {
    attempts++;
    let bookElement = document.querySelector('[data-element-name="book-image"]');
    if (!bookElement) {
      bookElement = document.querySelector('#book-image') || document.querySelector('.book-image');
    }
    // Also try to find it in containers
    if (!bookElement) {
      const containers = document.querySelectorAll('[data-element-name*="book"]');
      if (containers.length > 0) {
        bookElement = containers[0];
      }
    }
    
    if (bookElement) {
      console.log(`✅ Book element found after ${attempts} attempts`);
      callback(bookElement);
    } else if (attempts < maxAttempts) {
      console.log(`⏳ Book element not found, attempt ${attempts}/${maxAttempts}, retrying in 150ms...`);
      setTimeout(checkForElement, 150);
    } else {
      console.error(`❌ Book element not found after ${maxAttempts} attempts`);
      console.log('🔍 Available elements with "book" in name:', 
        Array.from(document.querySelectorAll('[data-element-name*="book"]')).map(el => el.getAttribute('data-element-name')));
      console.log('🔍 Available elements with "book" in class:', 
        Array.from(document.querySelectorAll('[class*="book"]')).map(el => el.className));
      console.log('🔍 All elements with data-element-name:', 
        Array.from(document.querySelectorAll('[data-element-name]')).map(el => el.getAttribute('data-element-name')));
    }
  };
  
  checkForElement();
};

/**
 * Update all button texts to use current language
 */
const updateButtonTexts = () => {
  console.log('🔄 Updating button texts to current language...');
  
  // Debug: Check current language
  const currentLang = window.i18n && typeof window.i18n.getCurrentLanguage === 'function' 
    ? window.i18n.getCurrentLanguage() 
    : 'unknown';
  console.log(`🌐 Current language detected: ${currentLang}`);
  
  // Update Check button
  const checkButton = document.querySelector('[data-element-name="check-button"]');
  if (checkButton) {
    const checkText = window.i18n && typeof window.i18n.t === 'function' 
      ? window.i18n.t('buttons.check', 'Check')
      : 'Check';
    
    // Update text and ensure center alignment is maintained
    checkButton.textContent = checkText;
    checkButton.style.display = 'flex';
    checkButton.style.alignItems = 'center';
    checkButton.style.justifyContent = 'center';
    
    console.log(`🔄 Check button text updated to: "${checkText}" with center alignment`);
  }
  
  // Update Next Question button only if it's currently visible
  const nextQuestionButton = document.querySelector('[data-element-name="next-question-button"]');
  if (nextQuestionButton) {
    const currentDisplay = getComputedStyle(nextQuestionButton).display;
    
    // Only update the text if the button is currently visible (not 'none')
    if (currentDisplay !== 'none') {
      const nextQuestionText = window.i18n && typeof window.i18n.t === 'function' 
        ? window.i18n.t('buttons.nextQuestion', 'Next Question')
        : 'Next Question';
      
      // Update text and ensure center alignment is maintained
      nextQuestionButton.textContent = nextQuestionText;
      nextQuestionButton.style.display = 'flex';
      nextQuestionButton.style.alignItems = 'center';
      nextQuestionButton.style.justifyContent = 'center';
      
      console.log(`🔄 Next Question button text updated to: "${nextQuestionText}" with center alignment (button is visible)`);
    } else {
      console.log(`🔄 Next Question button is hidden, skipping text update`);
    }
  }
  
  // Update Start Over button only if it's currently visible (not during initialization)
  const startOverButton = document.querySelector('[data-element-name="start-over-button"]');
  if (startOverButton) {
    const currentDisplay = getComputedStyle(startOverButton).display;
    
    // Only update the text if the button is currently visible (not 'none')
    if (currentDisplay !== 'none') {
      const startOverText = window.i18n && typeof window.i18n.t === 'function' 
        ? window.i18n.t('buttons.startOver', 'Start Over')
        : 'Start Over';
      
      startOverButton.textContent = startOverText;
      console.log(`🔄 Start Over button text updated to: "${startOverText}" (button is visible)`);
    } else {
      console.log(`🔄 Start Over button is hidden, skipping text update`);
    }
  }
  
  // Also update the feedback text with current question's instructions
  const feedbackElement = document.querySelector('[data-element-name="feedback-textbox"]');
  if (feedbackElement) {
    const currentQuestion = getCurrentQuestion();
    const instructionsText = currentQuestion?.instructions || 'Arrange the given fractions from smallest to largest.';
    feedbackElement.textContent = instructionsText;
    console.log(`🔄 Feedback text updated to: "${instructionsText}"`);
  }
  
  console.log('✅ Button texts and feedback text updated to current language');
};

/**
 * Force update all UI texts to current language (for testing)
 */
const forceUpdateAllTexts = () => {
  console.log('🔄 Force updating all UI texts to current language...');
  
  // Update button texts
  updateButtonTexts();
  
  // Force update feedback text multiple times to ensure it sticks
  const feedbackElement = document.querySelector('[data-element-name="feedback-textbox"]');
  if (feedbackElement && window.i18n && typeof window.i18n.t === 'function') {
    const feedbackText = window.i18n.t('messages.feedback.defaultInstruction', 'Arrange the given fractions from smallest to largest.');
    
    // Try multiple approaches to ensure the text is updated
    feedbackElement.textContent = feedbackText;
    feedbackElement.innerText = feedbackText;
    feedbackElement.innerHTML = feedbackText;
    
    console.log(`🔄 Force updated feedback text to: "${feedbackText}"`);
    console.log(`🔍 Current feedback element text: "${feedbackElement.textContent}"`);
  }
  
  console.log('✅ All UI texts force updated');
};

/**
 * Reset feedback text to default message and styling
 */
const resetFeedbackText = () => {
  console.log('🔄 Resetting feedback text to default...');
  clearCheckPlacementHints();
  
  // Debug: Check current language
  const currentLang = window.i18n && typeof window.i18n.getCurrentLanguage === 'function' 
    ? window.i18n.getCurrentLanguage() 
    : 'unknown';
  console.log(`🌐 Current language detected: ${currentLang}`);
  
  const feedbackElement = document.querySelector('[data-element-name="feedback-textbox"]');
  if (feedbackElement) {
    // Get current question's instructions
    const currentQuestion = getCurrentQuestion();
    const instructionsText = currentQuestion?.instructions || 'Arrange the given fractions from smallest to largest.';
    
    console.log(`📝 Setting feedback text to: "${instructionsText}"`);
    feedbackElement.textContent = instructionsText;
    
    // Reset styling to match original PageConfig.js styling
    feedbackElement.style.backgroundColor = 'rgba(245, 245, 245, 0.6)';
    feedbackElement.style.color = '#000000';
    feedbackElement.style.border = '2px solid #cccccc';
    feedbackElement.style.borderRadius = '10gc';
    feedbackElement.style.padding = '20gc';
    feedbackElement.style.fontSize = '36gc';
    feedbackElement.style.fontWeight = 'normal';
    feedbackElement.style.textAlign = 'center';
    feedbackElement.style.display = 'flex';
    feedbackElement.style.alignItems = 'center';
    feedbackElement.style.justifyContent = 'center';
    feedbackElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    feedbackElement.style.pointerEvents = 'none';
    
    console.log('🔄 Feedback text and styling reset to default');
  } else {
    console.warn('⚠️ Feedback textbox element not found');
  }
  
  console.log('✅ Feedback text and styling reset to default');
};

/**
 * Restart hover animations for new question
 */
const restartHoverAnimations = () => {
  console.log('🔄 Restarting hover animations...');
  
  // Reset LeftHover to original position (no animation)
  const leftHover = document.querySelector('[data-element-name="left-hover-image"]');
  if (leftHover) {
    // Remove any transform that might be applied from previous animations
    leftHover.style.transform = 'none';
    leftHover.style.animation = 'none';
    console.log('🔄 LeftHover reset to original position (no animation)');
  }
  
  // Reset RightHover to original position and restart animation
  const rightHover = document.querySelector('[data-element-name="right-hover-image"]');
  if (rightHover) {
    console.log('🔄 Found RightHover element, resetting animation...');
    
    // Remove any transform that might be applied from previous animations
    rightHover.style.transform = 'none';
    rightHover.style.animation = 'none';
    
    // Force a reflow to ensure the reset takes effect
    rightHover.offsetHeight;
    
    // Restart the animation with correct animation name
    rightHover.style.animation = 'floatingHover 3s ease-in-out infinite';
    console.log('🔄 RightHover animation set to:', rightHover.style.animation);
    console.log('🔄 RightHover reset to original position and animation restarted');
  } else {
    console.warn('⚠️ RightHover element not found!');
  }
  
  // Reset character to original position (no animation)
  const character = document.querySelector('[data-element-name="jump00-image"]');
  if (character) {
    // Remove any transform that might be applied from previous animations
    character.style.transform = 'none';
    character.style.animation = 'none';
    console.log('🔄 Character reset to original position (no animation)');
  }
  
  console.log('✅ Hover animations restarted with proper positioning');
};

/**
 * Reset steps to random incorrect order
 */
const resetStepsToRandomOrder = () => {
  console.log('🔄 Resetting steps to random incorrect order...');
  
  // Generate new random incorrect order
  const newOrder = generateRandomIncorrectOrder();
  console.log('🎲 New random order:', newOrder);
  
  // Get the droppable container - try multiple selectors
  let droppableContainer = document.querySelector('[data-element-name="draggable-steps-game"]');
  if (!droppableContainer) {
    // Try alternative selectors
    droppableContainer = document.querySelector('.droppable-steps-container');
  }
  if (!droppableContainer) {
    // Try finding by class name
    droppableContainer = document.querySelector('[class*="droppable-steps"]');
  }
  if (!droppableContainer) {
    console.warn('⚠️ Droppable container not found with any selector');
    console.log('Available elements:', document.querySelectorAll('[data-element-name]'));
    return;
  }
  
  // Get all step elements
  const stepElements = droppableContainer.querySelectorAll('[data-element-name*="step"]');
  
  // Remove any success glow classes
  stepElements.forEach(step => {
    const imageContainer = step.querySelector('.image-text-container');
    if (imageContainer) {
      imageContainer.classList.remove('permanent-success-glow', 'success-animation-phase1', 'success-animation-phase2');
    }
  });
  
  // Update the game state with new order
  if (window.stepOrderingGame) {
    window.stepOrderingGame.currentOrder = newOrder;
    window.stepOrderingGame.revealedSteps = {}; // Reset revealed steps for new question
  }
  
  // Force React to re-render with new order by triggering a state update
  // This will cause the droppable container to re-render with the new order
  if (window.forceAppUpdate && typeof window.forceAppUpdate === 'function') {
    window.forceAppUpdate();
  }
  
  console.log('✅ Steps reset to random incorrect order');
};

/**
 * Show "Go to the next challenge" button
 */
const showNextChallengeButton = () => {
  console.log('🔘 Showing next challenge button...');
  
  const button = document.querySelector('[data-element-name="start-over-button"]');
  if (!button) {
    console.warn('⚠️ Next challenge button not found');
    return;
  }
  
  // Show button with animation
  button.style.display = 'block';
  button.style.opacity = '0';
  
  if (typeof anime !== 'undefined') {
    anime({
      targets: button,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: 500
    });
  } else {
    button.style.opacity = '1';
  }
};

/**
 * Check if the current sequence is correct
 * @returns {boolean} True if the sequence is correct
 */
const checkSequence = () => {
  console.log('🔍 Checking sequence...');
  const currentOrder = window.stepOrderingGame?.currentOrder;
  if (!currentOrder) {
    console.warn('⚠️ No current order found');
    return false;
  }
  const isCorrect = isOrderCorrect(currentOrder);
  console.log(`📊 Sequence check result: ${isCorrect ? '✅ Correct' : '❌ Incorrect'}`);
  return isCorrect;
};

/**
 * Show final success screen when all questions are completed
 */
const showFinalSuccessScreen = () => {
  console.log('🏆 Showing final success screen...');
  
  // Show the screen overlay
  const screenOverlayElement = document.querySelector('[data-element-name="screen-overlay"]');
  if (screenOverlayElement) {
    screenOverlayElement.style.display = 'block';
    screenOverlayElement.style.opacity = '0';
    
    // Fade in animation
    if (typeof anime !== 'undefined') {
      anime({
        targets: screenOverlayElement,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad'
      });
    } else {
      screenOverlayElement.style.opacity = '1';
    }
  }
  
  // Show the overlay
  const overlayElement = document.querySelector('[data-element-name="overlay-container"]');
  if (overlayElement) {
    overlayElement.style.display = 'block';
    overlayElement.style.opacity = '0';
    
    // Fade in animation
    if (typeof anime !== 'undefined') {
      anime({
        targets: overlayElement,
        opacity: [0, 0.8],
        duration: 1000,
        easing: 'easeOutQuad'
      });
    } else {
      overlayElement.style.opacity = '0.8';
    }
  }
  
  // Update and show success message
  const messageElement = document.querySelector('[data-element-name="success-message"]');
  if (messageElement) {
    // Use internationalized final success message
    const finalMessage = window.i18n && typeof window.i18n.t === 'function' 
      ? window.i18n.t('messages.success.finalSuccess', '🎉 Congratulations! With this amazing collection of books you are the knowledgeable one')
      : '🎉 Congratulations! With this amazing collection of books you are the knowledgeable one';
    messageElement.textContent = finalMessage;
    messageElement.style.display = 'block';
    messageElement.style.opacity = '0';
    
    // Fade in animation
    if (typeof anime !== 'undefined') {
      anime({
        targets: messageElement,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 500 // Delay to show after overlay
      });
    } else {
      messageElement.style.opacity = '1';
    }
  }
  
  // Show Start Over button
  const startOverButton = document.querySelector('[data-element-name="start-over-button"]');
  if (startOverButton) {
    // Add center alignment properties when making the button visible
    startOverButton.style.display = 'flex';
    startOverButton.style.alignItems = 'center';
    startOverButton.style.justifyContent = 'center';
    startOverButton.style.opacity = '0';
    
    // Update button text to current language
    const startOverText = window.i18n && typeof window.i18n.t === 'function' 
      ? window.i18n.t('buttons.startOver', 'Start Over')
      : 'Start Over';
    startOverButton.textContent = startOverText;
    console.log(`🔄 Start Over button text updated to: "${startOverText}"`);
    
    // Fade in animation
    if (typeof anime !== 'undefined') {
      anime({
        targets: startOverButton,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 1000 // Delay to show after message
      });
    } else {
      startOverButton.style.opacity = '1';
    }
  }
  
  // Show tap animation
  const tapAnimation = document.querySelector('[data-element-name="tap-animation"]');
  if (tapAnimation) {
    tapAnimation.style.display = 'block';
    tapAnimation.style.opacity = '0';
    
    // Fade in animation
    if (typeof anime !== 'undefined') {
      anime({
        targets: tapAnimation,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 1500 // Delay to show after button
      });
    } else {
      tapAnimation.style.opacity = '1';
    }
  }
  
  // Hide Next Question button since we're done
  const nextQuestionButton = document.querySelector('[data-element-name="next-question-button"]');
  if (nextQuestionButton) {
    nextQuestionButton.style.display = 'none';
  }
  
  // Hide Check button
  const checkButton = document.querySelector('[data-element-name="check-button"]');
  if (checkButton) {
    checkButton.style.display = 'none';
  }
  
  // Hide tap-animation-2
  const tapAnimation2 = document.querySelector('[data-element-name="tap-animation-2"]');
  if (tapAnimation2) {
    tapAnimation2.style.display = 'none';
  }
  
  console.log('🏆 Final success screen displayed!');
};

// ===== EXPORTS =====

if (typeof window !== 'undefined') {
  window.StepOrderingGame = {
    initializeGame,
    updateGameOrder,
    getStepPosition,
    resetGame,
    getGameState,
    isOrderCorrect,
    checkSequence,
    getCurrentQuestion,
    getCorrectOrder,
    getResolvedStepContentPath,
    clearCheckPlacementHints,
    setCheckPlacementHintsAfterIncorrectCheck,
    isCorrectFeedbackImagePath,
    CORRECT_STEP_FEEDBACK_IMAGE_SCALE,
    getTotalQuestions,
    triggerDramaticSuccessAnimation,
    triggerShatterAnimation,
    createFloatingParticles,
    showSuccessMessage,
    showNextQuestionButton,
    showNextChallengeButton,
    stopFloatingAnimations,
    resumeFloatingAnimations,
    triggerBookAnimation,
    updateBookImage,
    updateStepContent,
    resetCharacterPosition,
    resetBookToNormalState,
    resetFeedbackText,
    updateButtonTexts,
    forceUpdateAllTexts,
    waitForBookElement,
    restartHoverAnimations,
    resetStepsToRandomOrder,
    showFinalSuccessScreen,
    CORRECT_ORDER_ASC,
    CORRECT_ORDER_DSC,
    STEP_POSITIONS
  };
  
  console.log('✅ Step ordering game module loaded');
}

