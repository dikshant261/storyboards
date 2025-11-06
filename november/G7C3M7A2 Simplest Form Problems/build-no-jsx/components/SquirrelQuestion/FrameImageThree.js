import React from "react";
import frame from "../../assets/frame.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImageThree = ({
  width = "70vw",
  height = "auto",
  onClick,
  beat
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-two-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: frame,
    style: {
      width: width,
      height: height,
      cursor: "pointer"
    },
    onClick: onClick,
    className: `${beat ? "beat" : ""}`
  }));
};
export default FrameImageThree;