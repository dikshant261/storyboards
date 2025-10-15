import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Fraction from "./Fraction";
import DivideSvg from "./DivideSvg";
import Division from "./Division";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
import MixedFraction from "./MixedFraction";
import Option from "./Option";
import DivisionOne from "./DivisionOne";
const SceneTwo = ({
  goNext,
  goPrev,
  question
}) => {
  const {
    t
  } = useTranslation();
  const [showAnime, setShowAnime] = useState(true);
  const [showFractionDelay, setShowFractionDelay] = useState(false);
  const [showNext, setShowNext] = useState();
  const [quotient, setQuotient] = useState({
    option: null,
    isCorrected: Boolean
  });
  useEffect(() => {
    setShowAnime(true);
    setTimeout(() => {
      setShowFractionDelay(true);
    }, 1000);
  }, []);
  console.log("quoteient", quotient);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneTwo.divide", {
    dividend: question.dividend,
    divisor: question.divisor
  })), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, t("titles.imporoperFraction")), /*#__PURE__*/React.createElement(Fraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    fontSize: "9vw",
    lineHeight: "0.8vh",
    lineWidth: "9vw"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mid"
  }, /*#__PURE__*/React.createElement("p", null, t("titles.division")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DivisionOne, {
    anime: showAnime,
    quotient: quotient,
    num: question.dividend,
    deno: question.divisor
  }))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, showFractionDelay && /*#__PURE__*/React.createElement(MixedFraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    quotient: quotient
  }))), /*#__PURE__*/React.createElement("div", {
    className: "option"
  }, /*#__PURE__*/React.createElement(Option, {
    response: setQuotient,
    setNext: setShowNext,
    question: question
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer-two"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !showNext && /*#__PURE__*/React.createElement("p", null, t("instruction.tapQuotient")), showNext && /*#__PURE__*/React.createElement("p", null, t("instruction.next")), !showNext && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), showNext && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
export default SceneTwo;