import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import AnimatedResultTwo from "./AnimatedResultTwo";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
const SceneTwo = ({
  onNext
}) => {
  const {
    t
  } = useTranslation();
  const [next, setNext] = useState(false);
  const [heading, setHeading] = useState(true);
  const [fadeOpacity, setFadeOpcity] = useState(false);
  const [startOver, setStartOver] = useState(false);
  const [paraOne, setParaOne] = useState(true);
  const [paraTwo, setParaTwo] = useState(false);
  const [shwoNext, setShowNext] = useState(true);
  const handleNext = () => {
    setHeading(false);
    setNext(true);
  };
  const handleOpacity = () => {
    playClick();
    setShowNext(false);
    setNext(false);
    setFadeOpcity(true);
    setParaOne(false);
    setParaTwo(true);
    setStartOver(true);
  };
  const handlestartOver = () => {
    playClick();
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first",
    style: {
      width: "98vw"
    }
  }, /*#__PURE__*/React.createElement(AnimatedResultTwo, {
    setNext: handleNext,
    fadeOpacity: fadeOpacity,
    paraOne: paraOne,
    paraTwo: paraTwo,
    next: next
  })), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), heading && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNextPart")), startOver && /*#__PURE__*/React.createElement("p", null, t("navigation.tapStartOver")), heading && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && shwoNext && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleOpacity
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })), startOver && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handlestartOver
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
export default SceneTwo;