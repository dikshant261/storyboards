import React from "react";
import "./Keypad.css";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
const Keypad = ({ onInput, response, checkHandle, disabled }) => {
  const { t } = useTranslation();
  const handleNumber = (num) => {
    onInput(num);
  };
  return (
    <div className="keypad-container">
      <div className="feedback-box"></div>
      <div className="keypad-grid">
        <button
          onClick={() => handleNumber(1)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          1
        </button>
        <button
          onClick={() => handleNumber(2)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          2
        </button>
        <button
          onClick={() => handleNumber(3)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          3
        </button>
        <button
          onClick={() => handleNumber(4)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          4
        </button>
        <button
          onClick={() => handleNumber(5)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          5
        </button>
        <button
          onClick={() => handleNumber(6)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          6
        </button>
        <button
          onClick={() => handleNumber(7)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          7
        </button>
        <button
          onClick={() => handleNumber(8)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          8
        </button>
        <button
          onClick={() => handleNumber(9)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          9
        </button>
        <button
          onClick={() => handleNumber("*")}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          <i className="fas fa-backspace"></i>
        </button>
        <button
          onClick={() => handleNumber(0)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          0
        </button>
        <button
          onClick={() => handleNumber("x")}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ position: "relative" }}>
        <button
          className="check-btn"
          onClick={checkHandle}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          {t("check")}
        </button>

        {disabled && <Tap bottom={0} onClick={checkHandle} />}
      </div>
    </div>
  );
};

export default Keypad;
