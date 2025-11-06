import React from "react";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwoL = ({
  width = "8vw",
  redml,
  blueml
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-two-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: red,
    style: {
      width: width
    }
  }), /*#__PURE__*/React.createElement("p", null, redml, " ", t("l"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: blue,
    style: {
      width: width
    }
  }), /*#__PURE__*/React.createElement("p", null, blueml, " ", t("l"))));
};
export default FrameImagTwoL;