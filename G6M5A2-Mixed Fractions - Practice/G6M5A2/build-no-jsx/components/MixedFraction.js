import React, { useEffect, useState } from "react";
import "./mixedfraction.css";
const MixedFraction = ({
  whole,
  // e.g. 3
  numerator,
  // e.g. 1
  denominator,
  // e.g. 2
  style = {},
  // custom style object
  className = "",
  quotient
}) => {
  const [multiply, setMultiply] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [remainder, setRemainder] = useState(null);
  useEffect(() => {
    if (quotient?.option != null) {
      const mul = denominator * quotient.option;
      setMultiply(mul);
    } else {
      setMultiply(null);
    }
  }, [quotient, denominator]);
  useEffect(() => {
    if (quotient.isCorrected) {
      setRemainder("");
    } else if (multiply === null) {
      setRemainder("");
    } else if (numerator < multiply) {
      setRemainder("X");
    } else {
      setRemainder(numerator - multiply);
    }
  }, [multiply, numerator, quotient]);

  // Trigger quotient fly animation when correct
  useEffect(() => {
    if (quotient.isCorrected) {
      setAnimation(false); // reset animation
      setTimeout(() => setAnimation(true), 1000); // re-trigger
    }
  }, [quotient]);
  console.log("mult:", multiply);
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
    className: `box ${animation ? "glow-two" : ""}`,
    style: {
      color: quotient.isCorrected ? "green" : "salmon",
      border: quotient.isCorrected ? "none" : "0.2vw dashed white",
      borderColor: quotient.isCorrected ? "green" : "salmon"
    }
  }, quotient.option)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      lineHeight: 1,
      fontSize: "8vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, remainder), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      height: "0.8vh",
      background: style.color || "white",
      margin: "0.3vh 0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "glow"
  }, denominator)));
};
export default MixedFraction;