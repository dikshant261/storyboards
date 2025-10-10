import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import FractionMatch from "./FractionMatch";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneOne = ({
  goNext,
  close
}) => {
  const {
    t
  } = useTranslation();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [final, setFinal] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneOne.heading"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement(FractionMatch, {
    setShowError: setShowError,
    setShowSuccess: setShowSuccess,
    setFinal: setFinal
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.hint"),
    showTap: false,
    showActive: false,
    fontSize: "3vw",
    width: "10vw",
    height: "9vh",
    onClick: () => {
      playClick();
      close();
    }
  }), showSuccess && /*#__PURE__*/React.createElement("p", {
    style: {
      background: "#849939",
      padding: "1vh 2vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.success")), showError && /*#__PURE__*/React.createElement("p", {
    style: {
      background: "#c75a4e",
      padding: "1vh 2vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.error"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-two"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !final && /*#__PURE__*/React.createElement("p", null, t("navigation.tapFraction")), final && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), !final && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), final && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
export default SceneOne;