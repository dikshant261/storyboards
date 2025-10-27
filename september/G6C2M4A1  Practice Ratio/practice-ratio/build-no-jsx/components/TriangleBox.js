import React from "react";
import "./TriangleImage.css";
import { useTranslation } from "react-i18next";
const TriangleBox = ({
  beat,
  beatOne,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "triangle-box-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "triangle-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: `triangle-box ${beat ? "active" : ""} ${boxOneCss}`
  }, boxResultOne), /*#__PURE__*/React.createElement("p", null, t("ratio_of_triangles"))), /*#__PURE__*/React.createElement("div", {
    className: "triangle-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: `triangle-box ${beatOne ? "active" : ""} ${boxTwoCss}`
  }, boxResultTwo, /*#__PURE__*/React.createElement("p", null, t("ratio_of_pentagons")))));
};
export default TriangleBox;