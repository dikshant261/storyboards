import React, { useEffect, useState } from "react";
import "./division.css";
import DivideSvg from "./DivideSvg";
const DivisionOne = ({
  anime,
  quotient,
  num,
  deno
}) => {
  const [showAnime, setShowAnime] = useState(false);
  const [multiply, setMultiply] = useState(null);
  const [quotientAnimation, setQuotientAnimation] = useState(false);

  // Handle number flying animation
  useEffect(() => {
    if (anime) setShowAnime(true);
  }, [anime]);

  // Calculate multiplication only if quotient.option exists
  useEffect(() => {
    if (quotient?.option != null) {
      const mul = deno * quotient.option;
      setMultiply(mul);
    } else {
      setMultiply(null);
    }
  }, [quotient, deno]);

  // Trigger quotient fly animation when correct
  useEffect(() => {
    if (quotient.isCorrected) {
      setQuotientAnimation(false); // reset animation
      setTimeout(() => setQuotientAnimation(true), 50); // re-trigger
    }
  }, [quotient]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "division-container"
  }, /*#__PURE__*/React.createElement(DivideSvg, null), /*#__PURE__*/React.createElement("div", {
    className: "column-adjust num"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box",
    style: {
      backgroundColor: quotient.isCorrected ? "" : multiply === null ? "transparent" : "salmon",
      color: quotient.isCorrected ? "green" : "black",
      border: quotient.isCorrected ? "none" : "",
      position: "relative",
      overflow: "visible"
    }
  }, quotient.option, /*#__PURE__*/React.createElement("p", {
    className: `quotient-fly ${quotientAnimation ? "fly-three" : ""}`,
    style: {
      color: "green"
    }
  }, quotient.option))), showAnime && /*#__PURE__*/React.createElement("div", {
    className: `num ${showAnime ? "fly-two" : ""}`,
    style: {
      position: "absolute",
      top: "54%",
      left: "16%"
    }
  }, deno), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, deno), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, num), multiply !== null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "num column-adjust",
    style: {
      borderBottom: "0.6vh solid white",
      color: quotient.isCorrected ? "green" : "salmon"
    }
  }, multiply), quotient.isCorrected ? /*#__PURE__*/React.createElement("div", null) : deno * quotient.option > num ? /*#__PURE__*/React.createElement("div", {
    className: "num column-adjust",
    style: {
      color: quotient.isCorrected ? "green" : "salmon"
    }
  }, "x") : /*#__PURE__*/React.createElement("div", {
    className: "num column-adjust",
    style: {
      color: quotient.isCorrected ? "green" : "salmon"
    }
  }, num - multiply))));
};
export default DivisionOne;