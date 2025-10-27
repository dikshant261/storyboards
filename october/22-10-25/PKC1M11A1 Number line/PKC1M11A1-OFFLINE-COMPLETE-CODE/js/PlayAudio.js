const clickAudio = new Audio("assets/click.mp3");
const correctAudio = new Audio("assets/correct.mp3");
const wrongAudio = new Audio("assets/wrong.mp3");

const oneAudio = new Audio(t("audio.One"));
const twoAudio = new Audio(t("audio.Two"));
const threeAudio = new Audio(t("audio.Three"));
const fourAudio = new Audio(t("audio.Four"));
const fiveAudio = new Audio(t("audio.Five"));
const sixAudio = new Audio(t("audio.Six"));
const sevenAudio = new Audio(t("audio.Seven"));
const eightAudio = new Audio(t("audio.Eight"));
const nineAudio = new Audio(t("audio.Nine"));
const tenAudio = new Audio(t("audio.Ten"));

// Ensure preloading
[
  clickAudio,
  correctAudio,
  wrongAudio,
  oneAudio,
  twoAudio,
  threeAudio,
  fourAudio,
  fiveAudio,
  sixAudio,
  sevenAudio,
  eightAudio,
  nineAudio,
  tenAudio,
].forEach((audio) => (audio.preload = "auto"));

// Functions
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

const playOne = () => {
  oneAudio.currentTime = 0;
  oneAudio.play();
};

const playTwo = () => {
  twoAudio.currentTime = 0;
  twoAudio.play();
};

const playThree = () => {
  threeAudio.currentTime = 0;
  threeAudio.play();
};

const playFour = () => {
  fourAudio.currentTime = 0;
  fourAudio.play();
};

const playFive = () => {
  fiveAudio.currentTime = 0;
  fiveAudio.play();
};

const playSix = () => {
  sixAudio.currentTime = 0;
  sixAudio.play();
};

const playSeven = () => {
  sevenAudio.currentTime = 0;
  sevenAudio.play();
};

const playEight = () => {
  eightAudio.currentTime = 0;
  eightAudio.play();
};

const playNine = () => {
  nineAudio.currentTime = 0;
  nineAudio.play();
};

const playTen = () => {
  tenAudio.currentTime = 0;
  tenAudio.play();
};

// Attach to window
window.playClick = playClick;
window.playCorrect = playCorrect;
window.playWrong = playWrong;
window.playOne = playOne;
window.playTwo = playTwo;
window.playThree = playThree;
window.playFour = playFour;
window.playFive = playFive;
window.playSix = playSix;
window.playSeven = playSeven;
window.playEight = playEight;
window.playNine = playNine;
window.playTen = playTen;
