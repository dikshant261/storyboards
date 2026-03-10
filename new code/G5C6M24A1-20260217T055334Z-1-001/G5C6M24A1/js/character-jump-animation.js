/**
 * Character Jump Animation Module
 * 
 * Handles the sprite-based jump animation sequence where the character jumps
 * from original position → step1 → step2 → step3 → right hover
 * using 12 sprite frames along a bezier curve path
 */

(function() {
  'use strict';

  // ===== CONFIGURATION =====

  const JUMP_DURATION = 3000; // 3 seconds per jump for smoother motion
  const PAUSE_BETWEEN_JUMPS = 200; // 200ms pause between jumps for more fluid sequence
  const SPRITE_COUNT = 8; // Use 8 frames instead of 12 for smoother transitions
  const MAX_ELEVATION_GC = 100; // Max elevation above starting position
  
  // Character container dimensions (from original position [25, 415, 300, 750])
  const CHARACTER_CONTAINER_WIDTH = 275; // 300 - 25
  const CHARACTER_CONTAINER_HEIGHT = 335; // 750 - 415

  // Utility to extract URL from background-image: url("...")
  const extractUrl = (bgImage) => {
    if (!bgImage) return null;
    const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  };

  // Cache for natural image sizes
  const naturalSizeCache = {};

  const getNaturalSizeSync = (url) => {
    if (!url) return null;
    if (naturalSizeCache[url]) return naturalSizeCache[url];
    const img = new Image();
    img.src = url;
    if (img.complete && img.naturalWidth > 0) {
      naturalSizeCache[url] = { width: img.naturalWidth, height: img.naturalHeight };
      return naturalSizeCache[url];
    }
    return null;
  };

  // Offset from the top of the container to avoid landing exactly on the edge
  let TARGET_TOP_OFFSET = 0.02; // 2% of container height (mutable via setter)

  // Per-target fine-tune Y offsets as percentage of container height (positive = lower, negative = higher)
  // Based on 3840×2160 screen: step1 needs ~290px down, step3 needs ~350px up
  // Container height is ~1218px, so: 290/1218 ≈ 23.8%, 350/1218 ≈ 28.7%
  const TARGET_Y_OFFSET_PERCENT = {
    'step1-image-text': 23.8,    // Move down by ~23.8% of container height
    'step2-image-text': 0,        // Perfect position
    'step3-image-text': -28.7,   // Move up by ~28.7% of container height
    'right-hover-image': 38    // Adjust after testing
  };

  // Per-target fine-tune X offsets as percentage of container width (positive = right, negative = left)
  const TARGET_X_OFFSET_PERCENT = {
    'step1-image-text': 0,
    'step2-image-text': 0,
    'step3-image-text': 0,
    'right-hover-image': 34.5       // Adjust after testing with placeAtTarget('right-hover-image')
  };

  // Compute the top center of the target container using a fixed top offset
  const getElementTopCenterByName = (elementName) => {
    const appContainer = getAppContainer();
    const el = document.querySelector(`[data-element-name="${elementName}"]`);
    if (!el || !appContainer) return null;

    const rect = el.getBoundingClientRect();
    const appRect = appContainer.getBoundingClientRect();
    
    // Calculate base center position
    let centerX = rect.left + rect.width / 2;
    let topY = rect.top + rect.height * TARGET_TOP_OFFSET;
    
    // Apply per-target X offset (percentage of container width)
    const appliedXOffsetPercent = Object.prototype.hasOwnProperty.call(TARGET_X_OFFSET_PERCENT, elementName) ? (TARGET_X_OFFSET_PERCENT[elementName] || 0) : 0;
    const appliedXOffsetPx = (appliedXOffsetPercent / 100) * rect.width;
    centerX += appliedXOffsetPx;
    
    // Apply per-target Y offset (percentage of container height)
    const appliedYOffsetPercent = Object.prototype.hasOwnProperty.call(TARGET_Y_OFFSET_PERCENT, elementName) ? (TARGET_Y_OFFSET_PERCENT[elementName] || 0) : 0;
    const appliedYOffsetPx = (appliedYOffsetPercent / 100) * rect.height;
    topY += appliedYOffsetPx;

    // Debug log target computation
    console.log('🎯 Target compute', {
      elementName,
      containerTop: rect.top,
      containerLeft: rect.left,
      containerWidth: rect.width,
      containerHeight: rect.height,
      topPercentOffset: TARGET_TOP_OFFSET,
      perTargetXOffsetPercent: appliedXOffsetPercent,
      perTargetXOffsetPx: appliedXOffsetPx,
      perTargetYOffsetPercent: appliedYOffsetPercent,
      perTargetYOffsetPx: appliedYOffsetPx,
      finalCenterX: centerX,
      finalTopY: topY
    });

    return { x: centerX - appRect.left, y: topY - appRect.top, name: elementName };
  };

  const getJumpTargets = () => {
    // Get current question type to determine jump sequence
    const getCurrentQuestionType = () => {
      // Try to use step ordering game's function first
      if (window.StepOrderingGame && typeof window.StepOrderingGame.getCurrentQuestion === 'function') {
        const currentQuestion = window.StepOrderingGame.getCurrentQuestion();
        console.log('🔍 Using StepOrderingGame.getCurrentQuestion():', currentQuestion);
        return currentQuestion?.type || 'ASC';
      }
      
      // Fallback to direct access
      const currentIndex = window.questionCounter || 0;
      const currentQuestion = window.Question ? window.Question(currentIndex) : window.Question(0);
      console.log('🔍 Direct question access:', { currentIndex, currentQuestion });
      return currentQuestion?.type || 'ASC';
    };
    
    const questionType = getCurrentQuestionType();
    console.log(`🎯 Jump sequence for question type: ${questionType} (question index: ${window.questionCounter || 0})`);
    
    if (questionType === 'DSC') {
      // DSC: left hover → step3 → step2 → step1 → right hover
      return [
        // getElementTopCenterByName('left-hover-image'),
        getElementTopCenterByName('step3-image-text'),
        getElementTopCenterByName('step2-image-text'),
        getElementTopCenterByName('step1-image-text'),
        getElementTopCenterByName('right-hover-image')
      ].filter(Boolean);
    } else {
      // ASC: right hover → step1 → step2 → step3 → left hover
      return [
        // getElementTopCenterByName('right-hover-image'),
        getElementTopCenterByName('step1-image-text'),
        getElementTopCenterByName('step2-image-text'),
        getElementTopCenterByName('step3-image-text'),
        getElementTopCenterByName('right-hover-image'),
        // getElementTopCenterByName('left-hover-image')
      ].filter(Boolean);
    }
  };

  // Resolve the app container to keep coordinates consistent with the grid
  const getAppContainer = () => {
    return document.querySelector('.main-container.math-app-container') || document.body;
  };

  // Compute the original character's visual center within the app container
  const getOriginalCenter = () => {
    const originalCharacter = document.getElementById('jump-character') || document.querySelector('[data-element-name="jump00-image"]');
    const appContainer = getAppContainer();
    if (!originalCharacter || !appContainer) {
      return { x: 162.5, y: 582.5 }; // fallback to nominal center
    }

    const charRect = originalCharacter.getBoundingClientRect();
    const containerRect = appContainer.getBoundingClientRect();

    const centerX = charRect.left - containerRect.left + charRect.width / 2;
    const centerY = charRect.top - containerRect.top + charRect.height / 2;
    return { x: centerX, y: centerY };
  };

  // ===== STATE =====
  
  let jumpElement = null;
  let currentSpriteIndex = 0;
  let isJumping = false;

  // ===== HELPER FUNCTIONS =====

  /**
   * Create the jumping character element
   */
  const createJumpElement = () => {
    // Get the original character element to copy its exact styles
    const originalCharacter = document.getElementById('jump-character') || document.querySelector('[data-element-name="jump00-image"]');
    const appContainer = getAppContainer();
    
    const element = document.createElement('div');
    element.className = 'character-jumping';
    
    // Copy exact dimensions and styles from the original character
    if (originalCharacter) {
      const computedStyle = window.getComputedStyle(originalCharacter);
      element.style.width = computedStyle.width;
      element.style.height = computedStyle.height;
      element.style.backgroundSize = computedStyle.backgroundSize;
      element.style.backgroundPosition = computedStyle.backgroundPosition;
      element.style.backgroundRepeat = computedStyle.backgroundRepeat;
      
      console.log('📏 Original character dimensions:', {
        width: computedStyle.width,
        height: computedStyle.height,
        backgroundSize: computedStyle.backgroundSize
      });
    } else {
      // Fallback to calculated dimensions
      element.style.width = `${CHARACTER_CONTAINER_WIDTH}px`;
      element.style.height = `${CHARACTER_CONTAINER_HEIGHT}px`;
      element.style.backgroundSize = 'contain';
      element.style.backgroundPosition = 'center';
      element.style.backgroundRepeat = 'no-repeat';
    }
    // Place inside the app container so coordinates align with the grid
    (appContainer || document.body).appendChild(element);

    // Position at the exact visual center of the original element
    const startCenter = getOriginalCenter();
    const elemRect = element.getBoundingClientRect();
    const containerRect = (appContainer || document.body).getBoundingClientRect();
    const halfW = elemRect.width / 2;
    const halfH = elemRect.height / 2;
    const leftPx = startCenter.x - halfW;
    const topPx = startCenter.y - halfH;
    element.style.left = `${leftPx}px`;
    element.style.top = `${topPx}px`;
    element.style.backgroundImage = 'url(assets/Jump/Jump00.png)';
    return element;
  };

  /**
   * Update sprite frame - using 8 optimized frames for smoother animation
   */
  const updateSpriteFrame = (frameIndex) => {
    if (!jumpElement) return;
    
    // Use 8 optimized frames: 00, 02, 04, 06, 08, 10, 11 (Jump12 doesn't exist)
    const optimizedFrames = [0, 2, 4, 6, 8, 10, 11, 11];
    const actualFrame = optimizedFrames[frameIndex] || 0;
    const paddedIndex = String(actualFrame).padStart(2, '0');
    const newImageUrl = `url(assets/Jump/Jump${paddedIndex}.png)`;
    
    // Only update if the image URL is different to prevent unnecessary flickering
    if (jumpElement.style.backgroundImage !== newImageUrl) {
      jumpElement.style.backgroundImage = newImageUrl;
    }
  };

  /**
   * Calculate bezier curve control points
   */
  const calculateBezierControlPoints = (start, end, maxElevation) => {
    const midX = (start.x + end.x) / 2;
    const elevationY = Math.min(start.y, end.y) - maxElevation;
    
    // Control points at 25% and 75% of horizontal distance
    const cp1X = start.x + (end.x - start.x) * 0.25;
    const cp2X = start.x + (end.x - start.x) * 0.75;
    
    return {
      cp1: { x: cp1X, y: elevationY },
      cp2: { x: cp2X, y: elevationY }
    };
  };

  /**
   * Animate a single jump
   */
  const animateJump = (fromPos, toPos, onComplete) => {
    if (!jumpElement || typeof anime === 'undefined') {
      console.error('❌ Jump animation failed: missing element or anime.js');
      if (onComplete) onComplete();
      return;
    }

    console.log(`🦘 Jumping from (${fromPos.x}, ${fromPos.y}) to (${toPos.x}, ${toPos.y})`);

    // Calculate control points for bezier curve
    const { cp1, cp2 } = calculateBezierControlPoints(fromPos, toPos, MAX_ELEVATION_GC);

    // Sprite animation using requestAnimationFrame for smoother animation
    const frameInterval = JUMP_DURATION / SPRITE_COUNT;
    let currentFrame = 0;
    let lastFrameTime = 0;
    let animationId = null;
    
    const animateSprites = (currentTime) => {
      if (currentTime - lastFrameTime >= frameInterval) {
        if (currentFrame < SPRITE_COUNT) {
          updateSpriteFrame(currentFrame);
          currentFrame++;
          lastFrameTime = currentTime;
        } else {
          // Animation complete
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
          return;
        }
      }
      animationId = requestAnimationFrame(animateSprites);
    };
    
    // Start sprite animation
    animationId = requestAnimationFrame(animateSprites);

    // Create custom easing path for bezier curve
    // We'll animate along a bezier curve by calculating intermediate points
    const bezierEasing = (t) => {
      // Cubic bezier formula: B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
      const oneMinusT = 1 - t;
      const oneMinusT2 = oneMinusT * oneMinusT;
      const oneMinusT3 = oneMinusT2 * oneMinusT;
      const t2 = t * t;
      const t3 = t2 * t;
      
      return {
        x: oneMinusT3 * fromPos.x + 
           3 * oneMinusT2 * t * cp1.x + 
           3 * oneMinusT * t2 * cp2.x + 
           t3 * toPos.x,
        y: oneMinusT3 * fromPos.y + 
           3 * oneMinusT2 * t * cp1.y + 
           3 * oneMinusT * t2 * cp2.y + 
           t3 * toPos.y
      };
    };

    // Animate using custom update function
     anime({
       targets: { progress: 0 },
       progress: 1,
       duration: JUMP_DURATION,
       easing: 'easeInOutCubic',
      update: function(anim) {
        const t = anim.animations[0].currentValue;
        const pos = bezierEasing(t);
        
        // Position relative to app container coordinate system
        const elemRect = jumpElement.getBoundingClientRect();
        const halfW = elemRect.width / 2;
        const halfH = elemRect.height / 2;
        jumpElement.style.left = `${pos.x - halfW}px`;
        jumpElement.style.top = `${pos.y - halfH}px`;
      },
      complete: () => {
        // Clean up sprite animation
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        console.log(`✅ Jump completed to ${toPos.name || 'target'}`);
        if (onComplete) onComplete();
      }
    });
  };

  /**
   * Execute the full jump sequence
   */
  const executeJumpSequence = (currentIndex, currentPos) => {
    const targets = getJumpTargets();
    if (currentIndex >= targets.length) {
      console.log('🎉 Jump sequence completed!');
      isJumping = false;
      
      // Trigger book animation after jump sequence completes
      if (window.StepOrderingGame && typeof window.StepOrderingGame.triggerBookAnimation === 'function') {
        console.log('📖 Triggering book animation...');
        window.StepOrderingGame.triggerBookAnimation();
      }
      return;
    }

    const target = targets[currentIndex];
    
    // Wait before next jump
    setTimeout(() => {
      // Play jump sound for each jump
      if (typeof window.playJumpSound === 'function') {
        window.playJumpSound();
      }
      
      animateJump(currentPos, target, () => {
        // Continue to next jump
        executeJumpSequence(currentIndex + 1, target);
      });
    }, currentIndex === 0 ? 0 : PAUSE_BETWEEN_JUMPS);
  };

  /**
   * Start the complete jump sequence
   */
  const startJumpSequence = () => {
    if (isJumping) {
      console.warn('⚠️ Jump sequence already in progress');
      return;
    }

    console.log('🎬 Starting character jump sequence...');
    isJumping = true;

    // Hide original character
    const originalCharacter = document.getElementById('jump-character') || document.querySelector('[data-element-name="jump00-image"]');
    if (originalCharacter) {
      originalCharacter.style.opacity = '0';
      console.log('👻 Original character hidden');
    }

    // Create jump element
    jumpElement = createJumpElement();

    // Start jump sequence from the exact current visual position
    const startPos = getOriginalCenter();
    executeJumpSequence(0, startPos);
  };

  /**
   * Reset jump animation
   */
  const resetJumpAnimation = () => {
    if (jumpElement && jumpElement.parentNode) {
      jumpElement.parentNode.removeChild(jumpElement);
      jumpElement = null;
    }

    const originalCharacter = document.querySelector('[data-element-name="jump00-image"]');
    if (originalCharacter) {
      originalCharacter.style.opacity = '1';
    }

    isJumping = false;
    currentSpriteIndex = 0;
    console.log('🔄 Jump animation reset');
  };

  /**
   * Test function for console - triggers jump sequence immediately
   */
  const testJumpSequence = () => {
    console.log('🧪 TEST MODE: Starting character jump sequence...');
    startJumpSequence();
  };

  // ===== TEST/DEBUG HELPERS =====
  const ensureJumpElement = () => {
    if (jumpElement) return jumpElement;
    // Hide original character if visible
    const originalCharacter = document.getElementById('jump-character') || document.querySelector('[data-element-name="jump00-image"]');
    if (originalCharacter) {
      originalCharacter.style.opacity = '0';
    }
    jumpElement = createJumpElement();
    return jumpElement;
  };

  const placeAtTarget = (target) => {
    const appContainer = getAppContainer();
    if (!appContainer) {
      console.warn('⚠️ App container not found');
      return null;
    }

    const element = ensureJumpElement();
    const targets = getJumpTargets();
    if (!targets || targets.length === 0) {
      console.warn('⚠️ No targets available');
      return null;
    }

    let chosen;
    if (typeof target === 'number') {
      chosen = targets[Math.max(0, Math.min(targets.length - 1, target))];
    } else if (typeof target === 'string') {
      if (target === 'final') {
        chosen = targets[targets.length - 1];
      } else {
        chosen = targets.find(t => t.name === target);
      }
    }
    if (!chosen) {
      chosen = targets[targets.length - 1];
    }

    const elemRect = element.getBoundingClientRect();
    const halfW = elemRect.width / 2;
    const halfH = elemRect.height / 2;

    element.style.left = `${chosen.x - halfW}px`;
    element.style.top = `${chosen.y - halfH}px`;

    console.log('🧪 Placed character at target:', chosen);
    return chosen;
  };

  const testPlaceAtFinal = () => {
    console.log('🧪 TEST MODE: Placing character at final destination...');
    return placeAtTarget('final');
  };

  // Console helper to adjust per-target Y offset (as percentage of container height)
  const setTargetYOffset = (name, percentValue) => {
    if (typeof name !== 'string' || typeof percentValue !== 'number') {
      console.warn('setTargetYOffset(name, percentValue) requires (string, number)');
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(TARGET_Y_OFFSET_PERCENT, name)) {
      console.warn('Unknown target name for Y offset:', name);
      return undefined;
    }
    TARGET_Y_OFFSET_PERCENT[name] = percentValue;
    console.log(`⚙️ Y offset for ${name} set to ${percentValue}% of container height`);
    return percentValue;
  };

  // Console helper to adjust per-target X offset (as percentage of container width)
  const setTargetXOffset = (name, percentValue) => {
    if (typeof name !== 'string' || typeof percentValue !== 'number') {
      console.warn('setTargetXOffset(name, percentValue) requires (string, number)');
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(TARGET_X_OFFSET_PERCENT, name)) {
      console.warn('Unknown target name for X offset:', name);
      return undefined;
    }
    TARGET_X_OFFSET_PERCENT[name] = percentValue;
    console.log(`⚙️ X offset for ${name} set to ${percentValue}% of container width`);
    return percentValue;
  };

  // Console helper to set both X and Y offsets at once
  const setTargetOffset = (name, xPercent, yPercent) => {
    if (typeof name !== 'string' || typeof xPercent !== 'number' || typeof yPercent !== 'number') {
      console.warn('setTargetOffset(name, xPercent, yPercent) requires (string, number, number)');
      return undefined;
    }
    setTargetXOffset(name, xPercent);
    setTargetYOffset(name, yPercent);
    return { x: xPercent, y: yPercent };
  };

  const setGlobalTopOffsetPercent = (percent) => {
    if (typeof percent !== 'number') {
      console.warn('setGlobalTopOffsetPercent(percent) requires a number');
      return undefined;
    }
    TARGET_TOP_OFFSET = percent / 100;
    console.log(`⚙️ Global top offset set to ${percent}%`);
    return TARGET_TOP_OFFSET;
  };

  // ===== EXPORTS =====

  if (typeof window !== 'undefined') {
    window.CharacterJumpAnimation = {
      startJumpSequence,
      resetJumpAnimation,
      isJumping: () => isJumping,
      testJump: testJumpSequence, // Test function for console
      testPlaceAtFinal,
      placeAtTarget,
      setTargetYOffset,
      setTargetXOffset,
      setTargetOffset,
      setGlobalTopOffsetPercent
    };

    console.log('✅ Character jump animation module loaded');
    console.log('💡 Test jump animation by running: CharacterJumpAnimation.testJump()');
  }
})();

