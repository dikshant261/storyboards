import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import images from "../assets";
import { playClick } from "./PlayAudio";
const SceneOne = ({
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
    className: "scene-conatiner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneOne.look"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container",
    style: {
      paddingLeft: "3vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "imgae-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cakeone,
    className: "cake",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("img", {
    src: images.boy,
    className: "human",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "imgae-align",
    style: {
      gap: "0vw",
      paddingTop: "3vw",
      paddingLeft: "3vw"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: images.caketwo,
    className: "cake",
    style: {
      width: "28vw"
    },
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("img", {
    src: images.girl,
    className: "human",
    style: {
      width: "13vw",
      paddingTop: "4vw"
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "imgae-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cakethree,
    className: "cake",
    style: {
      width: "32vw"
    },
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("img", {
    src: images.man,
    className: "human",
    style: {
      width: "17vw"
    },
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("sceneOne.tapToSee")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
export default SceneOne;