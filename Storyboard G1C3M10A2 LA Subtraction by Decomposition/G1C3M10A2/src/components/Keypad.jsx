// Keypad.js
import React, { useState } from "react";
import "./Keypad.css";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  onNumberClick,
  onCheck,
  showErrorfirst,
  showError,
  option,
  showErrorTwo,
  disabledKeypad,
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [showHint, setShowHint] = useState();
  const handleShowHint = () => {
    playClick();
    setShowHint(true);
  };
  const handleCloseHint = () => {
    playClick();
    setShowHint(false);
  };
  const { t } = useTranslation();
  return (
    <div className="keypad-container">
      <div className="keypad-container-inside">
        <div className="keypad-align">
          <div className="keypad-grid">
            {numbers.map((num) => (
              <button
                key={num}
                className="keypad-btn"
                onClick={() => onNumberClick(num)}
                disabled={disabledKeypad}
                style={{ opacity: disabledKeypad ? "0.5" : "1" }}
              >
                {num}
              </button>
            ))}
          </div>
          <div>
            <button
              className="keypad-check"
              onClick={onCheck}
              disabled={disabledKeypad}
              style={{ opacity: disabledKeypad ? "0.5" : "1" }}
            >
              {t("buttons.check")}
            </button>
            {!disabledKeypad && <img src={tap} className="tap-gif" />}
          </div>
        </div>
        {showErrorfirst && <ErrorMessage option={option} flag={0} />}
        {showError && <ErrorMessage option={option} flag={1} />}
        {showErrorTwo && <ErrorMessage option={option} flag={2} />}
      </div>
      {/* {!showHint && (
        <button className="keypad-hint" onClick={handleShowHint}>
          {t("buttons.show")} 💡
        </button>
      )}
      {showHint && (
        <button className="keypad-hint" onClick={handleCloseHint}>
          Hide 💡
        </button>
      )} */}
    </div>
  );
};

export default Keypad;
