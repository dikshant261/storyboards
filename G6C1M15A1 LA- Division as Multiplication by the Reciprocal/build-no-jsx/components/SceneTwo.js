import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import Boxes from "./Boxes";
const SceneTwo = ({
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneTwo.question"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-conatainer-main",
    style: {
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "question-align"
  }, /*#__PURE__*/React.createElement(Question, {
    divisor: 2,
    dividend: 3,
    style: {
      fontSize: "6vw",
      gap: "1vw",
      border: "0.3vw solid white",
      backgroundColor: "#23496ebf",
      borderRadius: "1vw",
      padding: "1vh 1vw"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "box-align"
  }, /*#__PURE__*/React.createElement(Boxes, {
    number: 1,
    style: {
      backgroundColor: "#ff9c6a"
    }
  }), /*#__PURE__*/React.createElement(Boxes, {
    number: 2,
    style: {
      backgroundColor: "#0097a7"
    }
  }))), /*#__PURE__*/React.createElement("div", {
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
export default SceneTwo;