/**
 * Simple Sound Manager
 * 
 * A lightweight sound manager that works without React context
 * for better compatibility with the existing codebase.
 */

const SimpleSoundManager = (() => {
  let audioCache = new Map();
  let loopingAudioCache = new Map();
  let isInitialized = false;

  // Preload audio files
  const preloadAudio = async () => {
    if (isInitialized) return;
    
    const soundFiles = ['correct.mp3', 'wrong.mp3', 'click.mp3', 'swoosh.mp3', 'confetti.mp3', 'gear.mp3'];
    console.log('🔊 [SimpleSoundManager] Preloading audio files...');
    
    for (const file of soundFiles) {
      try {
        const audio = new Audio(`assets/${file}`);
        audio.preload = 'auto';
        audioCache.set(file, audio);
        console.log(`🔊 [SimpleSoundManager] Preloaded: ${file}`);
      } catch (error) {
        console.warn(`🔊 [SimpleSoundManager] Failed to preload ${file}:`, error);
      }
    }
    
    isInitialized = true;
    console.log('✅ [SimpleSoundManager] Audio preloading complete');
  };

  // Play sound function
  const playSound = (soundType, options = {}) => {
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
        case 'swoosh':
          soundFile = 'swoosh.mp3';
          break;
        case 'confetti':
          soundFile = 'confetti.mp3';
          break;
        case 'gear':
          soundFile = 'gear.mp3';
          break;
        default:
          console.warn(`🔊 [SimpleSoundManager] Unknown sound type: ${soundType}`);
          return;
      }
      
      // Try cached audio first
      let audio = audioCache.get(soundFile);
      if (!audio) {
        // Fallback to new Audio instance
        audio = new Audio(`assets/${soundFile}`);
        console.log(`🔊 [SimpleSoundManager] Creating new audio instance for: ${soundFile}`);
      }
      
      // Reset audio to beginning
      audio.currentTime = 0;
      audio.volume = volume;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          const logMessage = carNumber 
            ? `🔊 [SimpleSoundManager] Car ${carNumber} ${soundType} sound played successfully`
            : `🔊 [SimpleSoundManager] ${soundType} sound played successfully`;
          console.log(logMessage);
        }).catch(error => {
          const errorMessage = carNumber
            ? `🔊 [SimpleSoundManager] Car ${carNumber} ${soundType} sound failed: ${error}`
            : `🔊 [SimpleSoundManager] ${soundType} sound failed: ${error}`;
          console.warn(errorMessage);
        });
      }
    } catch (error) {
      console.warn(`🔊 [SimpleSoundManager] Sound creation error for ${soundType}:`, error);
    }
  };

  const playLoopingSound = (soundType, options = {}) => {
    try {
      const { volume = 0.5 } = options;
      let soundFile = '';

      switch (soundType) {
        case 'gear':
          soundFile = 'gear.mp3';
          break;
        default:
          console.warn(`🔊 [SimpleSoundManager] Unknown looping sound type: ${soundType}`);
          return;
      }

      let audio = loopingAudioCache.get(soundFile);
      if (!audio) {
        audio = new Audio(`assets/${soundFile}`);
        audio.preload = 'auto';
        audio.loop = true;
        loopingAudioCache.set(soundFile, audio);
      }

      audio.volume = volume;
      if (!audio.paused) return;
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`🔊 [SimpleSoundManager] ${soundType} looping sound failed: ${error}`);
        });
      }
    } catch (error) {
      console.warn(`🔊 [SimpleSoundManager] Looping sound creation error for ${soundType}:`, error);
    }
  };

  const stopLoopingSound = (soundType) => {
    try {
      let soundFile = '';

      switch (soundType) {
        case 'gear':
          soundFile = 'gear.mp3';
          break;
        default:
          console.warn(`🔊 [SimpleSoundManager] Unknown looping sound type: ${soundType}`);
          return;
      }

      const audio = loopingAudioCache.get(soundFile);
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {
      console.warn(`🔊 [SimpleSoundManager] Failed to stop looping sound for ${soundType}:`, error);
    }
  };

  // Specific sound functions
  const playAnswerSound = (isCorrect) => {
    playSound(isCorrect ? 'correct' : 'wrong', { volume: 0.7 });
  };

  const playCorrectSound = () => {
    playAnswerSound(true);
  };

  const playWrongSound = () => {
    playAnswerSound(false);
  };

  const playCarClickSound = (soundType) => {
    // Support both car click sounds and answer sounds (correct/wrong)
    if (soundType === 'correct' || soundType === 'wrong') {
      playSound(soundType, { volume: 0.7 });
    } else if (soundType === 'next' || soundType === 'previous') {
      playSound('click', { volume: 0.8, carNumber: soundType });
    } else {
      // Default to click sound
      playSound('click', { volume: 0.8, carNumber: soundType });
    }
  };

  const playNextSound = () => {
    playSound('swoosh', { volume: 0.6 });
  };

  const playSuccessSound = () => {
    playSound('confetti', { volume: 0.8 });
  };

  // Initialize on DOM ready
  const initialize = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preloadAudio);
    } else {
      preloadAudio();
    }
  };

  // Public API
  return {
    initialize,
    playSound,
    playLoopingSound,
    stopLoopingSound,
    playAnswerSound,
    playCorrectSound,
    playWrongSound,
    playCarClickSound,
    playNextSound,
    playSuccessSound
  };
})();

// Auto-initialize
SimpleSoundManager.initialize();

// Make available globally
if (typeof window !== 'undefined') {
  window.SimpleSoundManager = SimpleSoundManager;
  
  // Expose individual functions for compatibility
  window.playSound = SimpleSoundManager.playSound;
  window.playLoopingSound = SimpleSoundManager.playLoopingSound;
  window.stopLoopingSound = SimpleSoundManager.stopLoopingSound;
  window.playAnswerSound = SimpleSoundManager.playAnswerSound;
  window.playCorrectSound = SimpleSoundManager.playCorrectSound;
  window.playWrongSound = SimpleSoundManager.playWrongSound;
  window.playCarClickSound = SimpleSoundManager.playCarClickSound;
  window.playNextSound = SimpleSoundManager.playNextSound;
  window.playSuccessSound = SimpleSoundManager.playSuccessSound;
  
  console.log('✅ SimpleSoundManager loaded and available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleSoundManager;
}
