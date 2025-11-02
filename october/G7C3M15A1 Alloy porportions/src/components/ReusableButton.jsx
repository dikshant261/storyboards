// ReusableButton.jsx
import React from "react";
import "./ReusableButton.css";
import tap from "../assets/tap.gif";
const ReusableButton = ({
  label,
  onClick,
  padding,
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
  showActive = true,
  backgroundColor = "var(--secondary-color)",
  disabled = false,
  height,
  width,
  style,
}) => {
  return (
    <div className="button-container">
      <button
        className={`start-button ${showActive ? "pulse-active" : ""}`}
        style={{
          padding,
          fontSize,
          backgroundColor,
          position: "relative",
          padding,
          height,
          width,
          ...style,
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
