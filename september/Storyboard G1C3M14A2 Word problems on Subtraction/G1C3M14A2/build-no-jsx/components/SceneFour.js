import React, { useEffect, useState } from "react";
import "./Scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import CarOne from "./Car";
import Tap from "./Tap";
import SentanceBox from "./SentanceBox";
const SceneFour = ({
  onNext,
  onPrev
}) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("pencilSenetanceSubtractionOne"));
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
    }
  }, []);
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleResponse = num => {
    playClick();
    setShowError(false);
    setBoxCss("");
    setResult(num);
  };
  const checkHandle = () => {
    if (result === 3) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      sessionStorage.setItem("pencilSenetanceSubtractionOne", JSON.stringify({
        showError: true,
        boxCss: "correct",
        disabled: true,
        current: false,
        next: true,
        result: result
      }));
    } else {
      playWrong();
      setShowError(true);
      setBoxCss("wrong");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-left"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "left"
    }
  }, t("typeOne.typeOneText")), /*#__PURE__*/React.createElement("p", {
    style: {}
  }, t("typeOne.subtractFrom"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("questionHading.solveSubtraction"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-content"
  }, /*#__PURE__*/React.createElement("p", null, t("questionOne.question")), /*#__PURE__*/React.createElement(CarOne, {
    totalCars: 7,
    crossCars: 4
  }), /*#__PURE__*/React.createElement("div", {
    className: "align-total"
  }, /*#__PURE__*/React.createElement("p", null, t("total")), /*#__PURE__*/React.createElement("div", {
    className: `box`,
    style: {
      transform: "translateX(8vw)",
      backgroundColor: "white",
      border: "none",
      color: "black"
    }
  }, 7)), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-8.8vw,1vw)"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("takenAway")), /*#__PURE__*/React.createElement("div", {
    className: `box`,
    style: {
      backgroundColor: "white",
      border: "none",
      color: "black"
    }
  }, 4)), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "translate(1vw,1vw)"
    }
  }, /*#__PURE__*/React.createElement(SentanceBox, {
    numOne: 7,
    numTwo: 4,
    boxCss: boxCss,
    result: result
  })), next && /*#__PURE__*/React.createElement("p", {
    style: {
      transform: "translate(-9vw, 1vw)"
    }
  }, t("numberOfPencil"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "3vw",
      color: "orange"
    }
  }, result)))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-option"
  }, /*#__PURE__*/React.createElement(Keypad, {
    response: handleResponse,
    result: result,
    showError: showError,
    setShowError: () => setShowError(false),
    boxCss: boxCss,
    checkHandle: checkHandle,
    disabled: disabled,
    flag: 3
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-heading"
  }, current && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNumber")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), current && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneFour;