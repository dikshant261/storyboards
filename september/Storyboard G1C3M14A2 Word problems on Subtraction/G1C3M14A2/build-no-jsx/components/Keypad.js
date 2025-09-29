import React, { useState } from "react";
import "./Keypad.css";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ErrorMessage from "./ErrorMessage";
const Keypad = ({
  response,
  showError,
  result,
  setShowError,
  boxCss,
  checkHandle,
  disabled,
  flag
}) => {
  const {
    t
  } = useTranslation();
  const [showHint, setShowHint] = useState(false);
  const handleHintShow = () => {
    playClick();
    setShowError();
    setShowHint(true);
  };
  const handleHintHide = () => {
    playClick();
    setShowError();
    setShowHint(false);
  };
  const handleNumber = num => {
    setShowHint(false);
    response(num);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "keypad-container"
  }, !showHint && /*#__PURE__*/React.createElement("button", {
    className: "check-btn",
    onClick: handleHintShow,
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, t("buttons.hint"), " \uD83D\uDCA1"), showHint && /*#__PURE__*/React.createElement("button", {
    className: "check-btn",
    onClick: handleHintHide,
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, t("buttons.hide"), " \uD83D\uDCA1"), /*#__PURE__*/React.createElement("div", {
    className: `hint-box ${boxCss}`,
    style: {
      backgroundColor: showHint ? "white" : ""
    }
  }, showHint && flag === 1 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("hintMessages.hintOne")), showHint && flag === 2 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("hintMessages.hintTwo")), showHint && flag === 3 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("hintMessages.hintThree")), showHint && flag === 4 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("marbleHint.hintOne")), showHint && flag === 5 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("marbleHint.hintTwo")), showHint && flag === 6 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("marbleHint.hintThree")), showHint && flag === 7 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("magoesHint.hintOne")), showHint && flag === 8 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("magoesHint.hintTwo")), showHint && flag === 9 && /*#__PURE__*/React.createElement("p", {
    className: "hint-message"
  }, t("magoesHint.hintThree")), showError && /*#__PURE__*/React.createElement("div", {
    className: "hint-message",
    style: {
      fontSize: "1.7vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement(ErrorMessage, {
    result: result,
    flag: flag
  }))), /*#__PURE__*/React.createElement("div", {
    className: "keypad-grid"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(1),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(2),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "2"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(3),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "3"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(4),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "4"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(5),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "5"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(6),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "6"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(7),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "7"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(8),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "8"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(9),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, "9"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleNumber(0),
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1",
      gridColumn: 2
    }
  }, "0")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "check-btn",
    onClick: checkHandle,
    disabled: disabled,
    style: {
      opacity: disabled ? "0.6" : "1"
    }
  }, t("buttons.check")), !disabled && /*#__PURE__*/React.createElement("img", {
    src: tap,
    className: "tap-gif-keypad"
  })));
};
export default Keypad;