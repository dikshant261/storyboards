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
  tapClass = "tap-gif-width"
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "start-button",
    style: {
      width,
      height,
      fontSize,
      position: "relative"
    },
    onClick: onClick
  }, label), showTap && /*#__PURE__*/React.createElement("div", {
    className: "tap-gif"
  }, /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "tap",
    className: tapClass
  })));
};
export default ReusableButton;