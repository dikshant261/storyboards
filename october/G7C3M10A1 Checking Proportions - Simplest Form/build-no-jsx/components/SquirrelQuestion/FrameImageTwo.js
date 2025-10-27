import React from "react";
import frameA from "../../assets/frameA.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwo = ({
  width = "70vw",
  length,
  breadth,
  height = "auto"
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-two-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: frameA,
    style: {
      width: width,
      height: height
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "length-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "width-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "length"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, length, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "cm"))), /*#__PURE__*/React.createElement("div", {
    className: "width"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, breadth, " cm")));
};
export default FrameImagTwo;