import React from "react";
import "./Keypad.css";
import hint from "../assets/hint.png";
const Keypad = ({ hintMessage, setHintMessage, setNumber, handleCheckTwo }) => {
  const handleHint = () => {
    setHintMessage();
  };
  const handleNumber = (num) => {
    setNumber(num);
  };
  return (
    <div className="keypad-container">
      <button className="hint-btn" onClick={handleHint}>
        show{" "}
        <span className="icon">
          <img src={hint} alt="bulb" className="bulb" />
        </span>
      </button>
      {hintMessage && (
        <p className="hint-message">
          Count the
          <br /> number cars
          <br /> that are not
          <br /> crossed.
        </p>
      )}
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
        <button>+</button>
        <button>0</button>
        <button>-</button>
        <button>×</button>
        <button>=</button>
        <button>÷</button>
      </div>

      <button className="check-btn" onClick={() => handleCheckTwo()}>
        CHECK
      </button>
    </div>
  );
};

export default Keypad;
