import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick } from "./PlayAudio";
const SceneThree = ({
  onNext
}) => {
  const {
    t
  } = useTranslation();
  const handleNext = () => {
    playClick();
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-two"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneThree.DeeTee")), /*#__PURE__*/React.createElement("p", null, t("sceneThree.cutCakeHalf")), /*#__PURE__*/React.createElement("div", {
    className: "triangle",
    style: {}
  }, "\u25B6")), /*#__PURE__*/React.createElement("img", {
    src: images.girl,
    style: {
      width: "16vw",
      objectFit: "contain"
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.caketwo,
    style: {
      width: "29vw",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("sceneThree.tapKnows")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneThree;