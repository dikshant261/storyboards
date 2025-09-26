import React, { useState } from "react";
import "./Keypad.css";
import hint from "../assets/hint.png";
import click from "../assets/click.mp3";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
const Keypad = ({ onNumberClick, handleError, numbers, showKeypad}) => {
  const [hintMessage, setHintMessage] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early
  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleHint = () => {
    clickHandle();
    setShowError(false);
    setHintMessage(true);
  };
  const handleHintClosed = () => {
    clickHandle();
    setShowError(false);
    setHintMessage(false);
  };
  const handleNumber = (num) => {
    clickHandle();
    setHintMessage(false);
    onNumberClick(num);
    setShowError(false);
    setCurrentNumber(num);
  };
  const handleClick = () => {
    setHintMessage(false);
    setShowError(true);
    handleError();
  };
  return (
    <div className="keypad-container">
      {showKeypad && (
        <div>
          {!hintMessage && (
            <button className="hint-btn" onClick={handleHint}>
              {t("show")}
              <span className="icon">
                <img src={hint} alt="bulb" className="bulb" />
              </span>
            </button>
          )}
          {hintMessage && (
            <button className="hint-btn" onClick={handleHintClosed}>
              {t("hide")}
              <span className="icon">
                <img src={hint} alt="bulb" className="bulb" />
              </span>
            </button>
          )}
        </div>
      )}

      <div className="message-box">
        {hintMessage && <p className="hint-message">{t("hintMessage")}</p>}
        {showError && (
          <ErrorMessage numbers={numbers} currentNumber={currentNumber} />
        )}
      </div>
      {showKeypad && (
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
        </div>
      )}

      {showKeypad && (
        <div
          style={{
            position: "relative",
          }}
        >
          <button className="check-btn" onClick={() => handleClick()}>
            {t("check")}
          </button>
          <img
            src={tap}
            alt="tap"
            style={{
              position: "absolute",
              width: "4vw",
              bottom: "-34%",
              left: "34%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Keypad;
