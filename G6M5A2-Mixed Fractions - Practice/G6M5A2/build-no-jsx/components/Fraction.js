import React, { useEffect, useState } from "react";
import "./Fraction.css";
const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "3vw",
  lineHeight = "0.2vh",
  showAnime
}) => {
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    if (showAnime) {
      setStartAnimation(true);
    }
  }, [showAnime]);
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
  }), startAnimation && /*#__PURE__*/React.createElement("span", {
    className: `line ${startAnimation ? "fly-in" : ""}`,
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