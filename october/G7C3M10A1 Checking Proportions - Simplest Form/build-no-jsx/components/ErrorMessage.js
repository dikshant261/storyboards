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
  ratio
}) => {
  const {
    t
  } = useTranslation();
  console.log("frame:", frame);
  return /*#__PURE__*/React.createElement("div", null, flag === 1 && /*#__PURE__*/React.createElement("div", null, response === num1 ? /*#__PURE__*/React.createElement("p", null, "\"\"") : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorOne", {
    frame: frame
  }))), flag === 2 && /*#__PURE__*/React.createElement("div", null, responseTwo === num2 ? /*#__PURE__*/React.createElement("p", {
    className: "success"
  }, t("feedBack.success", {
    num1: num1,
    num2: num2,
    frame: frame
  })) : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorTwo", {
    frame: frame
  }))), flag === 3 && /*#__PURE__*/React.createElement("div", null, response === num1 ? /*#__PURE__*/React.createElement("p", null, "\"\"") : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorThree", {
    response: ratio[0],
    num1: ratio[0],
    num2: ratio[1]
  }))), flag === 4 && /*#__PURE__*/React.createElement("div", null, responseTwo === num2 ? /*#__PURE__*/React.createElement("p", {
    className: "success"
  }, t("feedBack.successTwo", {
    frame: frame,
    num1: num1,
    num2: num2
  })) : /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, t("feedBack.errorThree", {
    response: ratio[1],
    num1: ratio[0],
    num2: ratio[1]
  }))));
};
export default ErrorMessage;