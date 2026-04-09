/**
 * Simple Sound Manager
 * 
 * A lightweight sound manager that works without React context
 * for better compatibility with the existing codebase.
 */

const SimpleSoundManager = (() => {
  let audioCache = new Map();
  let isInitialized = false;

  // Preload audio files
  const preloadAudio = async () => {
    if (isInitialized) return;
    
    const soundFiles = ['correct.mp3', 'wrong.mp3', 'click.mp3', 'swoosh.mp3', 'confetti.mp3'];
    
    for (const file of soundFiles) {
      try {
        const audio = new Audio(`assets/${file}`);
        audio.preload = 'auto';
        audioCache.set(file, audio);
      } catch (error) {
        console.warn(`🔊 [SimpleSoundManager] Failed to preload ${file}:`, error);
      }
    }
    
    isInitialized = true;
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
        default:
          console.warn(`🔊 [SimpleSoundManager] Unknown sound type: ${soundType}`);
          return;
      }
      
      // Try cached audio first
      let audio = audioCache.get(soundFile);
      if (!audio) {
        audio = new Audio(`assets/${soundFile}`);
      }
      
      // Reset audio to beginning
      audio.currentTime = 0;
      audio.volume = volume;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {}).catch(error => {
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

  // Specific sound functions
  const playAnswerSound = (isCorrect) => {
    playSound(isCorrect ? 'correct' : 'wrong', { volume: 0.7 });
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
    playAnswerSound,
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
  window.playAnswerSound = SimpleSoundManager.playAnswerSound;
  window.playCarClickSound = SimpleSoundManager.playCarClickSound;
  window.playNextSound = SimpleSoundManager.playNextSound;
  window.playSuccessSound = SimpleSoundManager.playSuccessSound;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleSoundManager;
}
