import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneSix = ({
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneSix.whatToLook"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      gap: "7vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneSix.wordOfPharasGive"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sceneSix.numberOfGroups"))), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneSix.wordOfPharasTells"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sceneSix.items"))), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sceneSix.letUse"))), /*#__PURE__*/React.createElement("div", {
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
export default SceneSix;