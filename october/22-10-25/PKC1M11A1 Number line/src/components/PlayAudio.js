import click from "../assets/click.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import One from "../assets/sound/en/one_en.mp3";
import Two from "../assets/sound/en/two_en.mp3";
import Three from "../assets/sound/en/three_en.mp3";
import Four from "../assets/sound/en/four_en.mp3";
import Five from "../assets/sound/en/five_en.mp3";
import Six from "../assets/sound/en/six_en.mp3";
import Seven from "../assets/sound/en/seven_en.mp3";
import Eight from "../assets/sound/en/eight_en.mp3";
import Nine from "../assets/sound/en/nine_en.mp3";
import Ten from "../assets/sound/en/ten_en.mp3";

// Preload audio objects
const clickAudio = new Audio(click);
const correctAudio = new Audio(correct);
const wrongAudio = new Audio(wrong);

const OneAudio = new Audio(One);
const TwoAudio = new Audio(Two);
const ThreeAudio = new Audio(Three);
const FourAudio = new Audio(Four);
const FiveAudio = new Audio(Five);
const SixAudio = new Audio(Six);
const SevenAudio = new Audio(Seven);
const EightAudio = new Audio(Eight);
const NineAudio = new Audio(Nine);
const TenAudio = new Audio(Ten);

// Ensure preloading
[
  clickAudio,
  correctAudio,
  wrongAudio,
  OneAudio,
  TwoAudio,
  ThreeAudio,
  FourAudio,
  FiveAudio,
  SixAudio,
  SevenAudio,
  EightAudio,
  NineAudio,
  TenAudio,
].forEach((audio) => (audio.preload = "auto"));

// Utility functions
export const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};

export const playCorrect = () => {
  correctAudio.currentTime = 0;
  correctAudio.play();
};

export const playWrong = () => {
  wrongAudio.currentTime = 0;
  wrongAudio.play();
};

// Number audios
export const playOne = () => {
  OneAudio.currentTime = 0;
  OneAudio.play();
};

export const playTwo = () => {
  TwoAudio.currentTime = 0;
  TwoAudio.play();
};

export const playThree = () => {
  ThreeAudio.currentTime = 0;
  ThreeAudio.play();
};

export const playFour = () => {
  FourAudio.currentTime = 0;
  FourAudio.play();
};

export const playFive = () => {
  FiveAudio.currentTime = 0;
  FiveAudio.play();
};

export const playSix = () => {
  SixAudio.currentTime = 0;
  SixAudio.play();
};

export const playSeven = () => {
  SevenAudio.currentTime = 0;
  SevenAudio.play();
};

export const playEight = () => {
  EightAudio.currentTime = 0;
  EightAudio.play();
};

export const playNine = () => {
  NineAudio.currentTime = 0;
  NineAudio.play();
};

export const playTen = () => {
  TenAudio.currentTime = 0;
  TenAudio.play();
};
