import React, { useEffect, useState } from "react";
import "./Scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import CarOne from "./Car";
import Tap from "./Tap";
import MarbleRender from "./MarbleRender";
import Design from "./Design";
import ProgressBar from "./ProgressBar";
const SceneEight = ({
  onPrev,
  onNext
}) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  const [beat, setBeat] = useState(true);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("mangosubtractionOne"));
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
      setBeat(stored.beat);
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
    if (result === 6) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      setBeat(false);
      sessionStorage.setItem("mangosubtractionOne", JSON.stringify({
        showError: true,
        boxCss: "correct",
        disabled: true,
        current: false,
        next: true,
        result: result,
        beat: false
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
  }, t("typeOne.typeThreeText")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "left"
    }
  }, t("typeOne.enterNumbers"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("questionHading.solveSubtraction"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-content"
  }, /*#__PURE__*/React.createElement("p", null, t("questionThree.question")), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "translate(14vw,-3vw)"
    }
  }, /*#__PURE__*/React.createElement(Design, {
    mangoes: 6,
    ripe: 2
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-9.5vw, -8vw)",
      gap: "14vw"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("total")), /*#__PURE__*/React.createElement("div", {
    className: `box ${beat ? "active" : ""} ${boxCss}`,
    style: {}
  }, result)), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-9vw,-8vw)",
      border: "none",
      opacity: "0.7"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionThree.partA")), /*#__PURE__*/React.createElement("div", {
    className: "box"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-option"
  }, /*#__PURE__*/React.createElement(Keypad, {
    response: handleResponse,
    result: result,
    showError: showError,
    setShowError: () => setShowError(false),
    boxCss: boxCss,
    checkHandle: checkHandle,
    disabled: disabled,
    flag: 7
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-heading"
  }, current && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNumber")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), /*#__PURE__*/React.createElement(ProgressBar, {
    current: 8
  }), current && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0,
    onClick: handleNext
  })))));
};
export default SceneEight;