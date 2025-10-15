import React, { useEffect, useState } from "react";
import "./division.css";
import DivideSvg from "./DivideSvg";
const Division = ({
  anime,
  quotient,
  question
}) => {
  const [showAnime, setShowAnime] = useState(false);
  useEffect(() => {
    if (anime) {
      setShowAnime(true);
    }
  }, [anime]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "division-container"
  }, /*#__PURE__*/React.createElement(DivideSvg, null), /*#__PURE__*/React.createElement("div", {
    className: "column-adjust num"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box"
  })), showAnime && /*#__PURE__*/React.createElement("div", {
    className: `num ${showAnime ? "fly-two" : ""}`,
    style: {
      position: "absolute",
      top: "54%",
      left: "16%"
    }
  }, question.divisor), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, question.divisor), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, question.dividend)));
};
export default Division;