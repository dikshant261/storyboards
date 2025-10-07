import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneSix = ({
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneSix.ohhJax")), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      top: "8%",
      left: "33%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#0000d6"
    }
  }, t("sceneSix.half"), ":"), " ", /*#__PURE__*/React.createElement("span", null, t("sceneSix.oneTwo"))), /*#__PURE__*/React.createElement("img", {
    src: images.caketwo,
    style: {
      width: "29vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `cut-line`,
    style: {
      border: "0.3vw solid black"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "half-cake"
  }), /*#__PURE__*/React.createElement("div", {
    className: "half-cake-right"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "31%",
      left: "46%",
      fontSize: "9vw",
      color: "white",
      transform: "rotate(45deg)"
    }
  }, "\u2193"), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      bottom: "23%",
      left: "37%",
      fontSize: "5vw",
      color: "black",
      backgroundColor: "#ffffffba",
      padding: "1vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneSix.half")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "31%",
      right: "35%",
      fontSize: "9vw",
      color: "white",
      transform: "rotate(-45deg)"
    }
  }, "\u2193"), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      bottom: "23%",
      fontSize: "5vw",
      color: "black",
      right: "25%",
      backgroundColor: "#ffffffba",
      padding: "1vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneSix.half"))), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "3vw"
    }
  }, t("sceneSix.tapContinue")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneSix;