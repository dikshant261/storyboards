import React from "react";
import "./ActivityCompleted.css";
import hand from '../assets/tap.gif';

const ActivityCompleted = () => {
  return (
    <div className="activity-container">
      <h1 className="title">Activity Completed!</h1>

      <p className="description">
        Improper Fractions and Mixed Numbers represents numbers that are greater
        than One Whole!
        <br />
        Every improper fraction can be converted to a mixed number using
        division:
      </p>

      <div className="formula">
        <p>
          <span className="highlight">Numerator</span> ÷{" "}
          <span className="highlight">Denominator</span> gives us,
        </p>
        <p>
          Mixed Number = Quotient{" "}
          <span className="fraction">
            <span className="remainder">Remainder</span>
            <span className="denominator">Denominator</span>
          </span>
        </p>
      </div>

      <p className="instruction">Tap “Start Over” to repeat this activity...</p>
      <div className="hand-align">
        <button
          className="start-over-btn"
          onClick={() => window.location.reload()}
        >
          Start Over
        </button>
        <img src={hand} alt="hand" className="hand-img" />
      </div>
    </div>
  );
};

export default ActivityCompleted;
