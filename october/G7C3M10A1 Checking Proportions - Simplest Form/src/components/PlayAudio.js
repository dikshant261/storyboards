import click from '../assets/click.mp3';
import correct from '../assets/correct.mp3';
import wrong from '../assets/wrong.mp3';

// Preload audio objects
const clickAudio = new Audio(click);
const correctAudio = new Audio(correct);
const wrongAudio = new Audio(wrong);

// Ensure preloading
clickAudio.preload = 'auto';
correctAudio.preload = 'auto';
wrongAudio.preload = 'auto';

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