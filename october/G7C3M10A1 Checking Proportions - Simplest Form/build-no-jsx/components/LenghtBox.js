import React from "react";
import "./lengthbox.css";
import { playClick } from "./PlayAudio";
const LenghtBox = ({
  beatOne,
  beatTwo,
  boxOneValue,
  boxTwoValue,
  boxCss,
  success,
  value,
  color
}) => {
  return /*#__PURE__*/React.createElement("div", null, !success && /*#__PURE__*/React.createElement("div", {
    className: "box-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "1%",
      left: "7%",
      fontSize: "1vw",
      color: "white"
    }
  }, value === 1 ? "Lenght:Width" : "Simplest Form"), /*#__PURE__*/React.createElement("div", {
    className: `box ${beatOne ? "active" : ""} ${beatOne ? boxCss : ""}`
  }, boxOneValue), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "3vw",
      color: "white"
    }
  }, ":"), /*#__PURE__*/React.createElement("div", {
    className: `box ${beatTwo ? "active" : ""} ${beatTwo ? boxCss : ""}`
  }, boxTwoValue)), success && /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      background: color || "rgba(0, 128, 0, 0.735)",
      color: "white",
      fontSize: "5vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "1%",
      left: "7%",
      fontSize: "1vw",
      color: "white"
    }
  }, value === 1 ? "Length:Width" : "Simplest Form"), /*#__PURE__*/React.createElement("div", null, boxOneValue), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "4vw",
      color: "white"
    }
  }, ":"), /*#__PURE__*/React.createElement("div", null, boxTwoValue)));
};
export default LenghtBox;