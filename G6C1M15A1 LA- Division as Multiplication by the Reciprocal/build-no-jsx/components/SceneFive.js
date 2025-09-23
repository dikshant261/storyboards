import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import BoxFour from "./BoxFour";
import Result from "./Result";
const SceneFive = ({
  onNext,
  onPrev
}) => {
  const {
    t
  } = useTranslation();
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrvious = () => {
    playClick();
    onPrev();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneFiveHeading"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-main",
    style: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "2vh 2vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "box-align"
  }, /*#__PURE__*/React.createElement(BoxFour, {
    number: 1,
    divisor: 3,
    style: {
      backgroundColor: "#ff9c6a"
    }
  }), /*#__PURE__*/React.createElement(BoxFour, {
    number: 2,
    divisor: 3,
    style: {
      backgroundColor: "#0097a7"
    }
  })), /*#__PURE__*/React.createElement(Result, null)), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-footer-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("navigation.tapNextQuestion"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-footer-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrvious
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement("img", {
    src: tap,
    className: "tap"
  }))));
};
export default SceneFive;