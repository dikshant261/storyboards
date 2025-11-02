import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
const SceneOne = ({
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
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneOne.aCertain")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.twoMetals")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.ifANew")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.sameAlloy")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.howManyGrams")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneOne.letFind")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneOne.crossMultiplication"))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "given"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "left"
    }
  }, t("given"))), /*#__PURE__*/React.createElement("div", {
    className: "tofind"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#b6d7a8",
      textAlign: "left"
    }
  }, t("toFind"))))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("instructions.tapComphrehend")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%",
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
export default SceneOne;