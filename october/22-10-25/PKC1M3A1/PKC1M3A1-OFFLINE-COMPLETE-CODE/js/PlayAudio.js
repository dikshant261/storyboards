const click = "assets/click.mp3";
const oneAudio = "assets/one_en.mp3";
const twoAudio = "assets/two_en.mp3";
const threeAudio = "assets/three_en.mp3";
// Preload audio objects
const clickAudio = new Audio(click);
const OneAudio = new Audio(oneAudio);
const TwoAudio = new Audio(twoAudio);
const ThreeAudio = new Audio(threeAudio);

// Ensure preloading
clickAudio.preload = "auto";
OneAudio.preload = "auto";
TwoAudio.preload = "auto";
ThreeAudio.preload = "auto";
const playOne = () => {
  oneAudio.currentTime = 0;
  oneAudio.play();
};
const playTwo = () => {
  twoAudio.currentTime = 0;
  oneAudio.play();
};
const playThree = () => {
  threeAudio.currentTime = 0;
  threeAudio.play();
};
const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};

window.playOne = playOne;
window.playTwo = playTwo;
window.playThree = playThree;
window.playClick = playClick;
