import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options
}) => {
  const {
    t
  } = useTranslation();
  // stepOne: for first box, stepTwo: for second box, stepThree: for third box
  return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", correctOption[0], " ", t("success", {
    word: "symbol"
  })) : boxResultOne === options[5] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrortwo")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "symbol :"
  }))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", correctOption[1], " ", t("success", {
    word: "word"
  })) : boxResultOne === options[2] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrortwo")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "word to"
  }))), stepThree && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[2] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", /*#__PURE__*/React.createElement("span", {
    className: "option-fraction-error"
  }, /*#__PURE__*/React.createElement("span", null, "3"), /*#__PURE__*/React.createElement("span", {
    className: "fraction-line-error"
  }), /*#__PURE__*/React.createElement("span", null, "2")), t("success", {
    word: "fraction"
  })) : boxResultOne === options[4] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorFraction")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "fraction form"
  }))));
};
export default ErrorMessage;