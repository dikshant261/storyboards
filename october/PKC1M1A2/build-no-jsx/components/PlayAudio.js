import click from "../assets/click.mp3";
import one from "../assets/one_en.mp3";
import two from "../assets/two_en.mp3";
import three from "../assets/three_en.mp3";
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
export const playOne = () => {
  oneAudio.currentTime = 0;
  oneAudio.play();
};
export const playTwo = () => {
  twoAudio.currentTime = 0;
  oneAudio.play();
};
export const playThree = () => {
  threeAudio.currentTime = 0;
  threeAudio.play();
};
export const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};