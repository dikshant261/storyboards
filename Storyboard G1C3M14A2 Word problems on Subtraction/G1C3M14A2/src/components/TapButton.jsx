// ReusableButton.jsx
import React from "react";
import "./ReusableButton.css";
import tap from '../assets/tap.gif';
const ReusableButton = ({
  label,
  onClick,
  width = "8vw",
  height = "6vh",
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
}) => {
  return (
    <div className="button-container">
      <button
        className="start-button"
        style={{
          width,
          height,
          fontSize,
          position:"relative"
        }}
        onClick={onClick}
      >
        {label}
      </button>

      {showTap  && (
        <div className="tap-gif">
          <img src={tap} alt="tap" className={tapClass} />
        </div>
      )}
    </div>
  );
};

export default ReusableButton;
