import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import { playClick, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import speaker from "../assets/speaker.png";
const Scene = () => {
  const {
    t
  } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false
  });
  const handleClick = (key, playFn) => {
    playFn();
    setClicked(prev => {
      const updated = {
        ...prev,
        [key]: true
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three;
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-hand-image"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shout-loud"
  }, t("shoutLound")), /*#__PURE__*/React.createElement("img", {
    src: raisehandchild,
    className: "boy-hand"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(Tap, {
    bottom: "0",
    left: "19%",
    width: "6vw"
  }), /*#__PURE__*/React.createElement("div", {
    className: "speaker-image-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: one,
    className: "image-one",
    onClick: () => handleClick("one", playOne)
  }), /*#__PURE__*/React.createElement("img", {
    src: speaker,
    className: "speaker",
    onClick: () => handleClick("one", playOne)
  })), /*#__PURE__*/React.createElement("div", {
    className: "speaker-image-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: two,
    className: "image-two",
    onClick: () => handleClick("two", playTwo)
  }), /*#__PURE__*/React.createElement("img", {
    src: speaker,
    className: "speaker",
    onClick: () => handleClick("two", playTwo)
  })), /*#__PURE__*/React.createElement("div", {
    className: "speaker-image-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: three,
    className: "image-three",
    onClick: () => handleClick("three", playThree)
  }), /*#__PURE__*/React.createElement("img", {
    src: speaker,
    className: "speaker",
    onClick: () => handleClick("three", playThree)
  })))));
};
export default Scene;