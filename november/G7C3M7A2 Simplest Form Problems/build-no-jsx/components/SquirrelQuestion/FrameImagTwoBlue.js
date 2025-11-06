import React from "react";
import blue from "../../assets/blue.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwoBlue = ({
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
    src: blue,
    style: {
      width: width,
      height: height
    }
  }));
};
export default FrameImagTwoBlue;