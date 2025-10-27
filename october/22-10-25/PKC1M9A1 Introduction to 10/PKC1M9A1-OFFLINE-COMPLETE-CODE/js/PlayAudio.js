const click = "assets/click.mp3";
const One = "assets/one_en.mp3";
const Two = "assets/two_en.mp3";
const Three = "assets/three_en.mp3";
const Four = "assets/four_en.mp3";
const Five = "assets/five_en.mp3";
const Six = "assets/six_en.mp3";
const Seven = "assets/seven_en.mp3";
const Eight = "assets/eight_en.mp3";
const Nine = "assets/nine_en.mp3";
// Preload audio objects
const clickAudio = new Audio(click);
const oneAudio = new Audio(One);
const twoAudio = new Audio(Two);
const threeAudio = new Audio(Three);
const fourAudio = new Audio(Four);
const fiveAudio = new Audio(Five);
const sixAudio = new Audio(Six);
const sevenAudio = new Audio(Seven);
const eightAudio = new Audio(Eight);
const nineAudio = new Audio(Nine);
// Ensure preloading
clickAudio.preload = "auto";
oneAudio.preload = "auto";
twoAudio.preload = "auto";
threeAudio.preload = "auto";
fourAudio.preload = "auto";
fiveAudio.preload = "auto";
sixAudio.preload = "auto";
sevenAudio.preload = "auto";
eightAudio.preload = "auto";
nineAudio.preload = "auto";
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
const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};
window.playOne = playOne();
window.playTwo = playTwo();
window.playThree = playThree();
window.playFour = playFour();
window.playFive = playFive();
window.playSix = playSix();
window.playSeven = playSeven();
window.playEight = playEight();
window.playNine = playNine();
window.playClick = playClick();
