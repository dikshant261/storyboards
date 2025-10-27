import click from "../assets/click.mp3";
import One from "../assets/one_en.mp3";
import Two from "../assets/two_en.mp3";
import Three from "../assets/three_en.mp3";
import Four from "../assets/four_en.mp3";
import Five from "../assets/five_en.mp3";
import Six from "../assets/six_en.mp3";
import Seven from "../assets/seven_en.mp3";
import Eight from "../assets/eight_en.mp3";
import Nine from "../assets/nine_en.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
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
const correctAudio= new Audio(correct);
const wrongAudio=new Audio(wrong);
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
correctAudio.preload="auto";
wrongAudio.preload="auto";
export const playOne = () => {
  oneAudio.currentTime = 0;
  oneAudio.play();
};

export const playTwo = () => {
  twoAudio.currentTime = 0;
  twoAudio.play();
};

export const playThree = () => {
  threeAudio.currentTime = 0;
  threeAudio.play();
};
export const playFour = () => {
  fourAudio.currentTime = 0;
  fourAudio.play();
};

export const playFive = () => {
  fiveAudio.currentTime = 0;
  fiveAudio.play();
};
export const playSix = () => {
  sixAudio.currentTime = 0;
  sixAudio.play();
};
export const playSeven = () => {
  sevenAudio.currentTime = 0;
  sevenAudio.play();
};
export const playEight = () => {
  eightAudio.currentTime = 0;
  eightAudio.play();
};
export const playNine = () => {
  nineAudio.currentTime = 0;
  nineAudio.play();
};
export const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};

export const playCorrect=()=>{
  correctAudio.currentTime=0;
  correctAudio.play();
}

export const playWrong=()=>{
  wrongAudio.currentTime=0;
  wrongAudio.play();
}
