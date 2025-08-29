import React from "react";
import "./MixedNumbers.css";
import hand from '../assets/tap.gif';
const ActivityComplete = () => {
  const refreshPage = () => {
    window.location.reload(); // Reloads the current page
  };
  return (
    <div className="mixed-numbers-container">
      <h1 className="title">Activity Completed!</h1>
      <div className="content-size">
      <p className="highlight-text">
        <strong className="orange-text">Mixed Numbers</strong> and{" "}
        <strong className="orange-text">Improper Fractions</strong>
        are used
        <br /> to denote numbers that are <br />
        <span className="orange-text">greater than One Whole!</span>
      </p>

      <p className="normal-text">
        From a mixed number, we simply multiply the denominator
        <br /> with the whole number and add the numerator
        <br />
        to get the numerator of the improper fraction!
      </p>

      <p className="normal-text">
        Tap <span className="quote">“Start Over”</span> to repeat this activity…
      </p>
</div>
     <div className="hand-align">
      <button className="start-btn" onClick={refreshPage}>
        Start Over
      </button>
      <img src={hand} alt="hand" className="hand-img"/>
      </div>
    </div>
  );
};

export default ActivityComplete;
