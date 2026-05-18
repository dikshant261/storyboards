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

  // Musical scale (C major) for label highlight tones - one note per label
  const LABEL_TONE_SCALE = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25]; // C4 to C5
  let labelToneAudioContext = null;

  // Map label index to scale index: low→high→low→high… (zigzag) instead of always ascending
  const labelIndexToScaleIndex = (index, scaleLength) => {
    const period = (scaleLength - 1) * 2; // e.g. 14 for 8 notes: 0..7 then 6..0
    const pos = index % period;
    return pos <= scaleLength - 1 ? pos : period - pos;
  };

  const playLabelHighlightTone = (index, total) => {
    try {
      if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return;
      if (!labelToneAudioContext) labelToneAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = labelToneAudioContext;
      if (ctx.state === 'suspended') ctx.resume();
      const scaleLen = LABEL_TONE_SCALE.length;
      const scaleIndex = labelIndexToScaleIndex(index, scaleLen);
      const freq = LABEL_TONE_SCALE[scaleIndex];
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('🔊 [SimpleSoundManager] Label tone error:', e);
    }
  };

  const handleProtractorLabelHighlighted = (event) => {
    const { index, total } = event.detail || {};
    if (typeof index !== 'number' || typeof total !== 'number') return;
    playLabelHighlightTone(index, total);
  };

  // Initialize on DOM ready
  const initialize = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadAudio();
        if (typeof window !== 'undefined') {
          window.addEventListener('protractorLabelHighlighted', handleProtractorLabelHighlighted);
        }
      });
    } else {
      preloadAudio();
      if (typeof window !== 'undefined') {
        window.addEventListener('protractorLabelHighlighted', handleProtractorLabelHighlighted);
      }
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
    playLabelHighlightTone
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
  
  console.log('✅ SimpleSoundManager loaded and available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleSoundManager;
}
