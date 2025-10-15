import React, { useEffect, useState } from "react";
import "./mixedfraction.css";
const MixedFractionTwo = ({
  whole,
  // e.g. 3
  numerator,
  // e.g. 1
  denominator,
  // e.g. 2
  style = {},
  // custom style object
  className = "",
  remainder,
  question
}) => {
  const [multiply, setMultiply] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [correctQuotient, setCorrectQuotient] = useState(null);
  console.log("question", question);
  useEffect(() => {
    if (!question) return;
    const correctedItem = question.quotient.find(item => item.isCorrected);
    if (correctedItem) {
      setCorrectQuotient(correctedItem.option);
    } else {
      setCorrectQuotient(null);
    }
  }, [question, denominator]);
  // Trigger quotient fly animation when correct
  useEffect(() => {
    if (remainder.isCorrected) {
      setAnimation(false); // reset animation
      setTimeout(() => setAnimation(true), 1000); // re-trigger
    }
  }, [remainder]);
  return /*#__PURE__*/React.createElement("div", {
    className: `mixed-fraction ${className}`,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2vh",
      fontSize: "8vw",
      ...style // allow user to override
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: "0.3vw",
      fontSize: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "box",
    style: {
      color: "green",
      border: "none"
    }
  }, correctQuotient)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      lineHeight: 1,
      fontSize: "8vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${animation ? "glow-three" : ""}`,
    style: {
      border: remainder.isCorrected ? "none" : "",
      borderColor: remainder.isCorrected ? "" : "salmon",
      color: remainder.isCorrected ? "orange" : "salmon"
    }
  }, remainder.option), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      height: "0.8vh",
      background: style.color || "white",
      margin: "0.3vh 0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {}
  }, denominator)));
};
export default MixedFractionTwo;