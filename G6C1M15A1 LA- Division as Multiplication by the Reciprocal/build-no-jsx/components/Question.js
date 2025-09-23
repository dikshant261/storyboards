import React from "react";
import "./question.css";
const Question = ({
  divisor,
  dividend,
  style
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "question-container",
    style: style
  }, /*#__PURE__*/React.createElement("div", null, divisor), /*#__PURE__*/React.createElement("div", null, "\xF7"), /*#__PURE__*/React.createElement("div", null, dividend));
};
export default Question;