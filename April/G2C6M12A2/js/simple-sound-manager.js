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
    
    const soundFiles = ['correct.mp3', 'wrong.mp3', 'click.mp3', 'swoosh.mp3', 'confetti.mp3', 'jump.mp3', 'magic.mp3', 'bg-sfx.mp3'];
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
        case 'jump':
          soundFile = 'jump.mp3';
          break;
        case 'magic':
          soundFile = 'magic.mp3';
          break;
        case 'bg-sfx':
          soundFile = 'bg-sfx.mp3';
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

  // Specific sound functions
  const playAnswerSound = (isCorrect) => {
    playSound(isCorrect ? 'correct' : 'wrong', { volume: 0.7 });
  };

  const playCarClickSound = (carNumber) => {
    playSound('click', { volume: 0.8, carNumber });
  };

  const playNextSound = () => {
    playSound('swoosh', { volume: 0.6 });
  };

  const playSuccessSound = () => {
    playSound('confetti', { volume: 0.8 });
  };

  const playJumpSound = () => {
    playSound('jump', { volume: 0.6 });
  };

  const playMagicSound = () => {
    playSound('magic', { volume: 0.7 });
  };

  const playBackgroundMusic = () => {
    // Convert 30 dB to volume (0-1 scale)
    // 30 dB = 10^(30/20) ≈ 31.6, but we need to normalize to 0-1
    // For background music, 30 dB is quite low, so we'll use a small volume
    const volume30dB = 0.3; // Approximately 30 dB on a 0-1 scale
    
    // Get or create background music audio
    let bgAudio = audioCache.get('bg-sfx.mp3');
    if (!bgAudio) {
      bgAudio = new Audio('assets/bg-sfx.mp3');
      audioCache.set('bg-sfx.mp3', bgAudio);
    }
    
    // Configure for continuous background music
    bgAudio.volume = volume30dB;
    bgAudio.loop = true;
    bgAudio.currentTime = 0;
    
    // Play the background music
    bgAudio.play().catch(error => {
      console.warn('🔊 [SimpleSoundManager] Background music play failed:', error);
      console.log('🔊 [SimpleSoundManager] Will retry after user interaction');
      
      // Set up to play after first user interaction
      const playAfterInteraction = () => {
        bgAudio.play().then(() => {
          console.log('🎵 [SimpleSoundManager] Background music started after user interaction');
          // Remove the event listeners after successful play
          document.removeEventListener('click', playAfterInteraction);
          document.removeEventListener('keydown', playAfterInteraction);
          document.removeEventListener('touchstart', playAfterInteraction);
        }).catch(err => {
          console.warn('🔊 [SimpleSoundManager] Background music still failed after interaction:', err);
        });
      };
      
      // Add event listeners for user interaction
      document.addEventListener('click', playAfterInteraction, { once: true });
      document.addEventListener('keydown', playAfterInteraction, { once: true });
      document.addEventListener('touchstart', playAfterInteraction, { once: true });
    });
    
    console.log('🎵 [SimpleSoundManager] Background music started at 30 dB');
  };

  const stopBackgroundMusic = () => {
    const bgAudio = audioCache.get('bg-sfx.mp3');
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      console.log('🎵 [SimpleSoundManager] Background music stopped');
    }
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
    playSuccessSound,
    playJumpSound,
    playMagicSound,
    playBackgroundMusic,
    stopBackgroundMusic
  };
})();

// Auto-initialize
SimpleSoundManager.initialize();

// Make available globally
if (typeof window !== 'undefined') {
  window.SimpleSoundManager = SimpleSoundManager;
  
  // Expose individual functions for compatibility
  window.playSound = SimpleSoundManager.playSound;
  window.playAnswerSound = SimpleSoundManager.playAnswerSound;
  window.playCarClickSound = SimpleSoundManager.playCarClickSound;
  window.playNextSound = SimpleSoundManager.playNextSound;
  window.playSuccessSound = SimpleSoundManager.playSuccessSound;
  window.playJumpSound = SimpleSoundManager.playJumpSound;
  window.playMagicSound = SimpleSoundManager.playMagicSound;
  window.playBackgroundMusic = SimpleSoundManager.playBackgroundMusic;
  window.stopBackgroundMusic = SimpleSoundManager.stopBackgroundMusic;
  
  console.log('✅ SimpleSoundManager loaded and available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleSoundManager;
}
