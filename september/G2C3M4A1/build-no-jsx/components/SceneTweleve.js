import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const SceneTwelve = ({
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
    className: "scene-conatiner-three"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneTwelve.notEqual")), /*#__PURE__*/React.createElement("div", {
    className: "triangle"
  }, "\u25B6")), /*#__PURE__*/React.createElement("img", {
    src: images.man,
    style: {
      width: "21vw",
      objectFit: "contain"
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "right-align"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cakeone,
    style: {
      width: "37vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cut-line-two"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: "16%",
      left: "46%",
      fontSize: "9vw",
      color: "white",
      transform: "rotate(136deg)"
    }
  }, "\u2193"), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      top: "9%",
      left: "37%",
      fontSize: "5vw",
      color: "white"
    }
  }, t("sceneTwelve.smallerPart")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "25%",
      right: "35%",
      fontSize: "9vw",
      color: "white",
      transform: "rotate(-45deg)"
    }
  }, "\u2193"), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      bottom: "16%",
      fontSize: "5vw",
      color: "white",
      right: "21%"
    }
  }, t("sceneTwelve.biggerPart"))), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("sceneEleven.tapContinue")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneTwelve;