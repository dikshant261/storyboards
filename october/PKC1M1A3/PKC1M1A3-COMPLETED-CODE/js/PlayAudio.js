const clickAudio = new Audio("assets/click.mp3");
const correctAudio = new Audio("assets/correct.mp3");
const wrongAudio = new Audio("assets/wrong.mp3");

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
window.playCorrect = playCorrect;
window.playWrong = playWrong;