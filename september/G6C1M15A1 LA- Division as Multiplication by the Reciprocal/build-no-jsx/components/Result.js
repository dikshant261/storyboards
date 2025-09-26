import React from "react";
import "./result.css";
import { useTranslation } from "react-i18next";
const Result = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "result-container"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 25",
    style: {
      position: "fixed",
      right: "7%",
      top: "45%",
      width: "6vw"
    }
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "white"
    },
    d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
  })), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 25",
    style: {
      position: "fixed",
      right: "10%",
      top: "45%",
      width: "9vw",
      height: "14vh"
    }
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "white"
    },
    d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
  })), /*#__PURE__*/React.createElement("div", {
    className: "result-row"
  }, /*#__PURE__*/React.createElement("span", null, t("result"))), /*#__PURE__*/React.createElement("div", {
    className: "result-row"
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", null, "\xF7"), /*#__PURE__*/React.createElement("span", null, "3")), /*#__PURE__*/React.createElement("div", {
    className: "result-row"
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", null, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, 1), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: "0.2vw solid white",
      width: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("span", null, 3))));
};
export default Result;