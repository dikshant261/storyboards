import React from "react";
import "./Keypad.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  onInput,
  checkHandle,
  flag,
  frame,
  num1,
  num2,
  errorShow,
  boxOneValue,
  boxTwoValue,
  disabled = true,
  ratio,
  message,
  ans,
}) => {
  const { t } = useTranslation();
  const handleNumber = (num) => {
    onInput(num);
  };

  return (
    <div className="keypad-container">
      <div className="feedback-box">
        {errorShow ? (
          <ErrorMessage
            frame={frame}
            num1={num1}
            num2={num2}
            flag={flag}
            response={boxOneValue}
            responseTwo={boxTwoValue}
            ratio={ratio}
            ans={ans}
          />
        ) : (
          <p
            style={{
              fontSize: "2.5vw",
              color: "white",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
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
          ×
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
          onClick={() => handleNumber(".")}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          ÷
        </button>
        <button
          onClick={() => handleNumber("*")}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          {t("buttons.clear")}
        </button>
        <button
          onClick={() => handleNumber(0)}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
            fontSize: "3vw",
          }}
        >
          .
        </button>
        <button
          onClick={() => handleNumber(".")}
          disabled={!disabled}
          style={{
            opacity: !disabled ? "0.6" : "1",
          }}
        >
          {t("buttons.check")}
        </button>
      </div>
    </div>
  );
};

export default Keypad;
