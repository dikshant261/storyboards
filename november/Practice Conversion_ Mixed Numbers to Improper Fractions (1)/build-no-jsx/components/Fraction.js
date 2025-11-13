import React from "react";
import "./Fraction.css";
const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "100%",
  lineHeight = "0.4vh"
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "question-fraction",
    style: {
      fontSize,
      color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "numerator"
  }, numerator), /*#__PURE__*/React.createElement("span", {
    className: "line",
    style: {
      width: lineWidth,
      height: lineHeight,
      backgroundColor: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, denominator));
};
export default Fraction;