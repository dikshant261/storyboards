import React from "react";
import fruitsA from "../../assets/fruitsA.png";
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
    src: fruitsA,
    style: {
      width: width
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "length-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "width-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "length"
  }, t("length")), /*#__PURE__*/React.createElement("div", {
    className: "width"
  }, t("width")));
};
export default FrameImag;