import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Fraction from "./Fraction";
import DivideSvg from "./DivideSvg";
import Division from "./Division";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneOne = ({
  goNext,
  goPrev,
  question
}) => {
  const {
    t
  } = useTranslation();
  const [showAnime, setShowAnime] = useState(false);
  const [showDivision, setShowDivision] = useState(false);
  const [showNext, setShowNext] = useState();
  const handleDivide = () => {
    playClick();
    setShowAnime(true);
  };
  useEffect(() => {
    if (showAnime) {
      setTimeout(() => {
        setShowDivision(true);
        setShowNext(true);
      }, 2000);
    }
  }, [showAnime]);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneOne.heading")), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, t("titles.imporoperFraction")), /*#__PURE__*/React.createElement(Fraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    fontSize: "9vw",
    lineHeight: "0.8vh",
    lineWidth: "9vw",
    showAnime: showAnime
  })), /*#__PURE__*/React.createElement("div", {
    className: "mid"
  }, showDivision && /*#__PURE__*/React.createElement("p", null, t("titles.division")), showDivision && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Division, {
    question: question
  }))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  })), /*#__PURE__*/React.createElement("div", {
    className: "option"
  }, !showNext && /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.divide"),
    height: "10vh",
    fontSize: "5vw",
    onClick: handleDivide
  }), showNext && /*#__PURE__*/React.createElement("p", null, t("sceneOne.tapFraction"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Fraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    fontSize: "3vw"
  })), /*#__PURE__*/React.createElement("span", null, t("sceneOne.means", {
    dividend: question.dividend,
    divisor: question.divisor
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer-two"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !showNext && /*#__PURE__*/React.createElement("p", null, t("instruction.tapNext")), showNext && /*#__PURE__*/React.createElement("p", null, t("instruction.tapProceed")), !showNext && /*#__PURE__*/React.createElement("button", {
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
export default SceneOne;