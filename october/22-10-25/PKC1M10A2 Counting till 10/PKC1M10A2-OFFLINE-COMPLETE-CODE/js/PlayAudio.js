const click = "assets/click.mp3";
const correct = "assets/correct.mp3";
const wrong = "assets/wrong.mp3";
// Preload audio objects
const clickAudio = new Audio(click);
const correctAudio = new Audio(correct);
const wrongAudio = new Audio(wrong);
// Ensure preloading
clickAudio.preload = "auto";
correctAudio.preload = "auto";
wrongAudio.preload = "auto";
const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};
const playCorrect = () => {
  correctAudio.currentTime = 0;
  correctAudio.play();
};
const playWrong = () => {
  wrongAudio.currentTime = 0;
  wrongAudio.play();
};

window.playClick = playClick;
window.playWrong = playWrong;
window.playCorrect = playCorrect;
