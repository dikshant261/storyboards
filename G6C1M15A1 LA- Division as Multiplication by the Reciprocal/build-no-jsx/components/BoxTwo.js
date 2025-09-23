import React, { useState } from "react";
import "./box.css";
import Fraction from "./Fraction";
const BoxTwo = ({
  divisor,
  style,
  number
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [design, setDesign] = useState();
  const fraction = divisor === "3" ? /*#__PURE__*/React.createElement(Fraction, {
    numerator: 1,
    denominator: 3
  }) : "";
  const height = 30 / divisor + "vh";
  console.log(divisor, "divisor");
  if (divisor === "3") {
    setInterval(() => {
      setShowAnimation(true);
      setDesign({
        border: "0.2vw dashed #aeb716",
        padding: "1vh 1vw 1vh 1vw",
        borderRadius: "0.8vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1vw"
      });
    }, 1500);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      flexDirection: "column",
      gap: "0"
    }
  }, /*#__PURE__*/React.createElement("p", null, number), Array.from({
    length: divisor
  }).map((_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    style: {
      ...design
    }
  }, showAnimation && /*#__PURE__*/React.createElement("p", null, "Group ", index + 1), /*#__PURE__*/React.createElement("div", {
    className: "box",
    style: {
      height: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "2vh",
      ...style
    }
  }, fraction))));
};
export default BoxTwo;