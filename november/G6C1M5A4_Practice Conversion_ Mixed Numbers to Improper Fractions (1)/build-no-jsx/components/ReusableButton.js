// ReusableButton.jsx
import React from "react";
import "./ReusableButton.css";
import tap from "../assets/tap.gif";
const ReusableButton = ({
  label,
  onClick,
  width,
  height,
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
  showActive = true,
  backgroundColor = "var(--secondary-color)",
  disabled = false,
  padding
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: `start-button ${showActive ? "pulse-active" : ""}`,
    style: {
      width,
      height,
      fontSize,
      backgroundColor,
      position: "relative",
      padding
    },
    onClick: onClick,
    disabled: disabled
  }, label), showTap && /*#__PURE__*/React.createElement("div", {
    className: "tap-gif"
  }, /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "tap",
    className: tapClass
  })));
};
export default ReusableButton;