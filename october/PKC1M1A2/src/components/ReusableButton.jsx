// ReusableButton.jsx
import React from "react";
import "./ReusableButton.css";
import tap from "../assets/tap.gif";
const ReusableButton = ({
  label,
  onClick,
  width = "8vw",
  height = "6vh",
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
  showActive = true,
  backgroundColor = "var(--secondary-color)",
  disabled=false
}) => {
  return (
    <div className="button-container">
      <button
        className={`start-button ${showActive ? "pulse-active" : ""}`}
        style={{
          width,
          height,
          fontSize,
          backgroundColor,
          position: "relative",
          opacity:disabled?'0.6':'1',
          cursor:disabled?'not-allowed':'pointer'
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>

      {showTap && (
        <div className="tap-gif">
          <img src={tap} alt="tap" className={tapClass} />
        </div>
      )}
    </div>
  );
};

export default ReusableButton;
