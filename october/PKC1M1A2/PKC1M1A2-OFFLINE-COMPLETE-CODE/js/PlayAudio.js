const click = "assets/click.mp3";
// Note: Audio paths are now dynamically loaded from i18n.js questions array
// Keeping click audio for backward compatibility
const clickAudio = new Audio(click);

// Ensure preloading
clickAudio.preload = "auto";

const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};

// Generic PlayAudio function for dynamic audio paths
const PlayAudio = (audioPath) => {
  console.log("Attempting to play audio:", audioPath);
  const audio = new Audio(audioPath);
  audio.preload = "auto";
  audio.currentTime = 0;
  
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Audio playing successfully:", audioPath);
      })
      .catch((error) => {
        console.error("Error playing audio:", audioPath, error);
      });
  }
};

window.playClick = playClick;
window.PlayAudio = PlayAudio;
