import React from "react";
import redBlueCircle from "../../assets/redBlueCircle.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
const FrameImag = ({
  width = "70%"
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: redBlueCircle,
    style: {
      width: "90%"
    }
  }));
};
export default FrameImag;