import React from "react";
import frame from "../../assets/frame.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
const FrameImag = ({
  width = "80%"
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-container",
    style: {
      justifyContent: "center",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: frame,
    style: {
      width: "80%",
      background: "white"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "43.9 35.9 311.2 20.2",
    className: "length-line"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 57 38 L 44 48 L 57 56 V 50 L 340 48 V 55 L 355 45 L 340 36 V 43 L 57 45 Z",
    stroke: "white",
    "stroke-width": "0.1",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "43.9 35.9 311.2 20.2",
    className: "width-line"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 57 38 L 44 48 L 57 56 V 50 L 340 48 V 55 L 355 45 L 340 36 V 43 L 57 45 Z",
    stroke: "white",
    "stroke-width": "0.1",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("p", {
    className: "length"
  }, "120 cm"), /*#__PURE__*/React.createElement("p", {
    className: "width"
  }, "80 cm"));
};
export default FrameImag;