import React, { useState } from "react";
import "./Keypad.css";
import hint from "../assets/hint.png";
import click from "../assets/click.mp3";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  onNumberClick,
  checkNumber,
  numbers,
  erroShow,
  setErrorShow,
  correctNumber,
  keypadShow
}) => {
  const [hintMessage, setHintMessage] = useState(false);
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early
  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleHint = () => {
    clickHandle();
    setHintMessage(true);
  };
  const handleNumber = (num) => {
    clickHandle();
    setHintMessage(false);
    setErrorShow();
    onNumberClick(num);
  };
  return (
    <div className="keypad-container">
      {keypadShow && <button className="hint-btn" onClick={handleHint}>
        show{" "}
        <span className="icon">
          <img src={hint} alt="bulb" className="bulb" />
        </span>
      </button>}
      {hintMessage && (
        <p className="hint-message">
          Use numbers in
          <br /> the story to write
          <br /> a sentence in the
          <br /> form of “the
          <br /> whole – part
          <br /> taken away = part
          <br /> that is left”.
        </p>
      )}
      {
        erroShow && (
            <ErrorMessage numbers={numbers} correctNumber={correctNumber}/>
        )
      }
      {keypadShow &&
      <div className="keypad-grid">
        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>

        <button className="zero" onClick={() => handleNumber(0)}>
          0
        </button>
      </div>}

      {keypadShow && <button className="check-btn" onClick={() => checkNumber()}>
        CHECK
      </button>}
    </div>
  );
};

export default Keypad;
