import React from "react";
import "./Keypad.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  onInput,
  checkHandle,
  flag,
  frame,
  num1,
  num2,
  errorShow,
  boxOneValue,
  boxTwoValue,
  disabled = true,
  ratio
}) => {
  const {
    t
  } = useTranslation();
  const handleNumber = num => {
    onInput(num);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "keypad-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feedback-box"
  }, errorShow && /*#__PURE__*/React.createElement(ErrorMessage, {
    frame: frame,
    num1: num1,
    num2: num2,
    flag: flag,
    response: boxOneValue,
    responseTwo: boxTwoValue,
    ratio: ratio
  })), /*#__PURE__*/React.createElement("div", {
    className: "keypad-grid"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(1),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(2),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "2"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(3),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "3"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(4),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "4"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(5),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "5"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(6),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "6"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(7),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "7"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(8),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "8"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(9),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "9"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber("*"),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-backspace"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(0),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "0"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber("x"),
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "check-btn",
    onClick: checkHandle,
    disabled: !disabled,
    style: {
      opacity: !disabled ? "0.6" : "1"
    }
  }, t("buttons.check")), disabled && /*#__PURE__*/React.createElement(Tap, {
    bottom: "-3vw",
    onClick: checkHandle
  })));
};
export default Keypad;