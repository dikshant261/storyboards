import React from "react";
import "./Keypad.css";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
const Keypad = ({ response, checkHandle, stepOne }) => {
  const {t}=useTranslation();
  const handleNumber = (num) => {
    response(num);
  };
  return (
    <div className="keypad-container">
      <div className="keypad-grid">
        <button
          onClick={() => handleNumber(1)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          1
        </button>
        <button
          onClick={() => handleNumber(2)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          2
        </button>
        <button
          onClick={() => handleNumber(3)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          3
        </button>
        <button
          onClick={() => handleNumber(4)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          4
        </button>
        <button
          onClick={() => handleNumber(5)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          5
        </button>
        <button
          onClick={() => handleNumber(6)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          6
        </button>
        <button
          onClick={() => handleNumber(7)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          7
        </button>
        <button
          onClick={() => handleNumber(8)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          8
        </button>
        <button
          onClick={() => handleNumber(9)}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          9
        </button>
      </div>
      <div>
        <button
          className="check-btn"
          onClick={checkHandle}
          disabled={!stepOne}
          style={{
            opacity: !stepOne ? "0.6" : "1",
          }}
        >
          {t("check")}
        </button>

        {stepOne && <img src={tap} className="tap-gif-keypad" />}
      </div>
    </div>
  );
};

export default Keypad;
