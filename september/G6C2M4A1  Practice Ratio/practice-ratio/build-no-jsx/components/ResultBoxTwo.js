import React from "react";
import "./ResultBox.css";
import { useTranslation } from "react-i18next";
const ResultBoxTwo = ({
  beat,
  beatOne,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneHeading,
  boxTwoHeading,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
  style
}) => {
  const {
    t
  } = useTranslation();
  // Helper to render fraction if value is in a/b form
  const renderFraction = value => {
    if (typeof value === "string" && value.includes("/")) {
      const [num, denom] = value.split("/");
      if (!isNaN(num) && !isNaN(denom)) {
        return /*#__PURE__*/React.createElement("span", {
          className: "fraction-align"
        }, /*#__PURE__*/React.createElement("span", null, num), /*#__PURE__*/React.createElement("span", {
          className: "fraction-line-box"
        }), /*#__PURE__*/React.createElement("span", null, denom));
      }
    }
    return value;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "result-box",
    style: {
      ...style,
      gap: "7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `result-box-container ${beat ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${boxOneCss}`
  }, renderFraction(boxResultOne)), /*#__PURE__*/React.createElement("div", {
    className: "box-title"
  }, t(boxOneHeading))), /*#__PURE__*/React.createElement("div", {
    className: `result-box-container ${beatOne ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${boxTwoCss}`
  }, renderFraction(boxResultTwo)), /*#__PURE__*/React.createElement("div", {
    className: "box-title"
  }, t(boxTwoHeading))));
};
export default ResultBoxTwo;