import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
const SceneOne = ({
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneOne.contentHeading"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-main"
  }, /*#__PURE__*/React.createElement(Question, {
    divisor: 2,
    dividend: 3,
    style: {
      fontSize: "19vw",
      gap: "2vw"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-footer-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext"))), /*#__PURE__*/React.createElement("div", {
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
export default SceneOne;