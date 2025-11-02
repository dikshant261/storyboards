import React from "react";
import "./MetalRatio.css"; // CSS below handles grid and responsiveness
import { useTranslation } from "react-i18next";
const MetalRatio = ({
  xValue = "𝒳"
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "metal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metal-cell header"
  }, t("metalA")), /*#__PURE__*/React.createElement("div", {
    className: "metal-cell header"
  }, t("metalB")), /*#__PURE__*/React.createElement("div", {
    className: "metal-cell left-color"
  }, 7.5), /*#__PURE__*/React.createElement("div", {
    className: "metal-cell right-color"
  }, 3), /*#__PURE__*/React.createElement("div", {
    className: "metal-cell highlight left-color"
  }, xValue), /*#__PURE__*/React.createElement("div", {
    className: "metal-cell right-color"
  }, 45));
};
export default MetalRatio;