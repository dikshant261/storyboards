import React, { useState } from "react";
import "./Keypad.css";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  response,
  showError,
  result,
  setShowError,
  boxCss,
  checkHandle,
  disabled,
  flag,
}) => {
  const { t } = useTranslation();
  const [showHint, setShowHint] = useState(false);
  const handleHintShow = () => {
    playClick();
    setShowError();
    setShowHint(true);
  };
  const handleHintHide = () => {
    playClick();
    setShowError();
    setShowHint(false);
  };
  const handleNumber = (num) => {
    setShowHint(false);
    response(num);
  };
  return (
    <div className="keypad-container">
      {!showHint && (
        <button
          className="check-btn"
          onClick={handleHintShow}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          {t("buttons.hint")} 💡
        </button>
      )}
      {showHint && (
        <button
          className="check-btn"
          onClick={handleHintHide}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          {t("buttons.hide")} 💡
        </button>
      )}
      <div
        className={`hint-box ${boxCss}`}
        style={{ backgroundColor: showHint ? "white" : "" }}
      >
        {showHint && flag === 1 && (
          <p className="hint-message">{t("hintMessages.hintOne")}</p>
        )}
        {showHint && flag === 2 && (
          <p className="hint-message">{t("hintMessages.hintTwo")}</p>
        )}
        {showHint && flag === 3 && (
          <p className="hint-message">{t("hintMessages.hintThree")}</p>
        )}
        {showHint && flag === 4 && (
          <p className="hint-message">{t("marbleHint.hintOne")}</p>
        )}
        {showHint && flag === 5 && (
          <p className="hint-message">{t("marbleHint.hintTwo")}</p>
        )}
        {showHint && flag === 6 && (
          <p className="hint-message">{t("marbleHint.hintThree")}</p>
        )}
        {showHint && flag === 7 && (
          <p className="hint-message">{t("magoesHint.hintOne")}</p>
        )}
        {showHint && flag === 8 && (
          <p className="hint-message">{t("magoesHint.hintTwo")}</p>
        )}
        {showHint && flag === 9 && (
          <p className="hint-message">{t("magoesHint.hintThree")}</p>
        )}
        {showError && (
          <div
            className="hint-message"
            style={{ fontSize: "1.7vw", color: "white" }}
          >
            <ErrorMessage result={result} flag={flag} />
          </div>
        )}
      </div>
      <div className="keypad-grid">
        <button
          onClick={() => handleNumber(1)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          1
        </button>
        <button
          onClick={() => handleNumber(2)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          2
        </button>
        <button
          onClick={() => handleNumber(3)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          3
        </button>
        <button
          onClick={() => handleNumber(4)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          4
        </button>
        <button
          onClick={() => handleNumber(5)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          5
        </button>
        <button
          onClick={() => handleNumber(6)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          6
        </button>
        <button
          onClick={() => handleNumber(7)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          7
        </button>
        <button
          onClick={() => handleNumber(8)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          8
        </button>
        <button
          onClick={() => handleNumber(9)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          9
        </button>
        <button
          onClick={() => handleNumber(0)}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
            gridColumn: 2,
          }}
        >
          0
        </button>
      </div>
      <div>
        <button
          className="check-btn"
          onClick={checkHandle}
          disabled={disabled}
          style={{
            opacity: disabled ? "0.6" : "1",
          }}
        >
          {t("buttons.check")}
        </button>

        {!disabled && <img src={tap} className="tap-gif-keypad" />}
      </div>
    </div>
  );
};

export default Keypad;
