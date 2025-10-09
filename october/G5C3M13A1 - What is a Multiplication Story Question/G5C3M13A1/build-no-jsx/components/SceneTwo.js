import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneTwo = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneOne.whatIsStory"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwo.typeOfStory"), " "), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      textAlign: "left"
    }
  }, t("sceneTwo.additionStory")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwo.subtraction"))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "next-btn",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
export default SceneTwo;