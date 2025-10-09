import React from "react";
import "./FractionMultiplication.css";
import { useTranslation } from "react-i18next";
const FractionMultiplication = ({
  num1,
  num2,
  num3,
  num4,
  num5,
  num6
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "fraction-container-two"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, t("numerator1")), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), t("denominator1")), /*#__PURE__*/React.createElement("span", {
    className: "multiply-symbol"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, t("numerator2")), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), t("denominator2"))), /*#__PURE__*/React.createElement("div", {
    className: "fraction-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num green-color"
  }, num1), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "den green-color"
  }, num2)), /*#__PURE__*/React.createElement("span", {
    className: "multiply-symbol"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num orange-color"
  }, num3), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "den orange-color"
  }, num4)))), /*#__PURE__*/React.createElement("span", {
    className: "equal-symbol"
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "fraction-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-heading",
    style: {
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", null, t("numerator1"), " \xD7 ", t("numerator2")), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("div", null, t("denominator1"), " \xD7 ", t("denominator2"))), /*#__PURE__*/React.createElement("div", {
    className: "fraction-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num green-color"
  }, num1, " \xD7 ", num2), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "den green-color"
  }, num3, " \xD7 ", num4)), /*#__PURE__*/React.createElement("span", {
    className: "equal-symbol"
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num orange-color"
  }, num5), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "den orange-color"
  }, num6)))));
};
export default FractionMultiplication;