import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({
  flag,
  num1,
  num2,
  frame,
  response,
  responseTwo,
  ratio,
  ans
}) => {
  const {
    t
  } = useTranslation();
  console.log("frame:", frame);
  return /*#__PURE__*/React.createElement("div", null, flag === 1 && /*#__PURE__*/React.createElement("div", null, response === num1 ? /*#__PURE__*/React.createElement("p", null, "\"\"") : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorOne"))), flag === 2 && /*#__PURE__*/React.createElement("div", null, responseTwo === num2 ? /*#__PURE__*/React.createElement("p", {
    className: "success"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline"
    }
  }, t("feedBack.success", {
    frame: frame
  })), "\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      lineHeight: "1"
    }
  }, /*#__PURE__*/React.createElement("span", null, num1), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      height: "0.2vh",
      backgroundColor: "white"
    }
  }), /*#__PURE__*/React.createElement("span", null, num2)), ".") : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorTwo"))), flag === 3 && /*#__PURE__*/React.createElement("div", null, response === ans ? /*#__PURE__*/React.createElement("p", {
    className: "success"
  }, t("feedBack.crossSuccess", {
    num1: num1,
    num2: num2,
    ans: ans
  })) : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.crossError", {
    num1: num1,
    num2: num2,
    ans: response
  }))));
};
export default ErrorMessage;