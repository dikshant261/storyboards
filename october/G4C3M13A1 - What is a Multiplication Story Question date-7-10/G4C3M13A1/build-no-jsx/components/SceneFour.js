import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneFour = ({
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneFour.whatMultiplicationGivesYou"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para ",
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sceneFour.aMultiplicationStoryAlways"), " "), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      textAlign: "left"
    }
  }, t("sceneFour.numberOne")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneFour.numberTwo")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", {
    className: "para ",
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sceneFour.weUseAbove")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneFour.totalNumber"))), /*#__PURE__*/React.createElement("div", {
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
export default SceneFour;