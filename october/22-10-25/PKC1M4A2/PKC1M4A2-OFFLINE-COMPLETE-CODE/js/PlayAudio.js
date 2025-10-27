const click = "assets/click.mp3";
const oneAudio = "assets/one_en.mp3";
const twoAudio = "assets/two_en.mp3";
const threeAudio = "assets/three_en.mp3";
const fourAudio = "assets/four_en.mp3";
const fiveAudio = "assets/five_en.mp3";

// Preload audio objects
const clickAudio = new Audio(click);
const OneAudio = new Audio(oneAudio);
const TwoAudio = new Audio(twoAudio);
const ThreeAudio = new Audio(threeAudio);
const FourAudio = new Audio(fourAudio);
const FiveAudio = new Audio(fiveAudio);
// Ensure preloading
clickAudio.preload = "auto";
OneAudio.preload = "auto";
TwoAudio.preload = "auto";
ThreeAudio.preload = "auto";
FourAudio.preload = "auto";
FiveAudio.preload = "auto";

const playOne = () => {
  OneAudio.currentTime = 0;
  OneAudio.play();
};
const playTwo = () => {
  ThreeAudio.currentTime = 0;
  TwoAudio.play();
};
const playThree = () => {
  ThreeAudio.currentTime = 0;
  ThreeAudio.play();
};
const playFour = () => {
  FourAudio.currentTime = 0;
  FourAudio.play();
};
const playFive = () => {
  FiveAudio.currentTime = 0;
  FiveAudio.play();
};
const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};
window.playClick = playClick;
window.playOne = playOne;
window.playTwo = playTwo;
window.playThree = playThree;
window.playFour = playFour;
window.playFive = playFive;
