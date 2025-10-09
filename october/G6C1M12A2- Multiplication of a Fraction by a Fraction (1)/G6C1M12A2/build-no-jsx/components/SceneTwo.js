import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import FractionMultiplication from "./FractionMultiplication";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneTwo = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-two"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneTwo.whatResult"), /*#__PURE__*/React.createElement(Fraction, {
    num: 1,
    deno: 3,
    style: {
      fontSize: "2vw",
      color: "var(--secondary-color)"
    }
  }), t("sceneTwo.of"), /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 5,
    style: {
      fontSize: "2vw",
      color: "var(--secondary-color)"
    }
  }), /*#__PURE__*/React.createElement("span", null, " ?")), /*#__PURE__*/React.createElement("div", {
    className: "question-container",
    style: {
      gap: "15vh",
      padding: "7vh 2vw"
    }
  }, /*#__PURE__*/React.createElement(FractionMultiplication, {
    num1: 1,
    num2: 3,
    num3: 2,
    num4: 5,
    num5: 2,
    num6: 15
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.8vw"
    }
  }, t("sceneTwo.message"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("navigation.tryNext")), /*#__PURE__*/React.createElement("div", {
    className: "footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0,
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
export default SceneTwo;