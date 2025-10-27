const click = "assets/click.mp3";
const one = "assets/one_en.mp3";
const two = "assets/two_en.mp3";
const three = "assets/three_en.mp3";
// Preload audio objects
const clickAudio = new Audio(click);
const oneAudio = new Audio(one);
const twoAudio = new Audio(two);
const threeAudio = new Audio(three);

// Ensure preloading
clickAudio.preload = "auto";
oneAudio.preload = "auto";
twoAudio.preload = "auto";
threeAudio.preload = "auto";
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
