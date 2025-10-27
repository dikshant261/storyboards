import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
const SceneTen = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  const handleClick = () => {
    playClick();
    goNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneTwo.heading")), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-1"
  }, /*#__PURE__*/React.createElement("p", null, t("frameA")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "21vw",
    height: "44vh",
    length: 10,
    breadth: 6
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2"
  }, /*#__PURE__*/React.createElement("p", null, t("frameB")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "17vw",
    height: "30vh",
    length: 10,
    breadth: 8,
    lineWidth: "79%",
    left: "-27%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-3"
  }, /*#__PURE__*/React.createElement("p", null, t("frameC")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "21vw",
    length: 15,
    breadth: 9,
    lineWidth: "85%",
    left: "-31%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwo.keypadHeading")))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapStart")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
export default SceneTen;