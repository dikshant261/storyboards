import React from "react";
import "./MixedNumbers.css";
import hand from '../assets/tap.gif';

const MixedNumbers = ({ onStart }) => {
  return (
    <div className="mixed-numbers-container">
      <h1 className="title">Mixed Numbers and Improper Fractions</h1>
      <div className="content-size">
        <p className="highlight-text">
          <strong className="orange-text">Mixed Numbers</strong> and{" "}
          <strong className="orange-text">Improper Fractions</strong> <br />
          are used to denote numbers that are <br />
          <span className="orange-text">greater than One Whole!</span>
        </p>

        <p className="normal-text">
          It is very useful to be able to convert
          <br /> such values from one form to another.
        </p>

        <p className="normal-text">
          Tap <span className="quote">“Start”</span> to try a few challenges
          <br /> on such conversion...
        </p>
      </div>
      <div className="hand-align">
            <button className="start-btn" onClick={() => onStart()}>
              Start
            </button>
            <img src={hand} alt="hand" className="hand-img"/>
            </div>
    </div>
  );
};

export default MixedNumbers;
