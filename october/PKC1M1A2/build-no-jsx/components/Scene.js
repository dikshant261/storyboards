import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import { playClick, playOne, playTwo, playThree } from "./PlayAudio";
import speaker from "../assets/speaker.png";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
const Scene = () => {
  const {
    t
  } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false
  });
  const [start, setStart] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // prevent multiple plays

  const handleClick = (key, playFn) => {
    playFn();
    setClicked(prev => ({
      ...prev,
      [key]: true
    }));
  };
  const allClicked = clicked.one && clicked.two && clicked.three;
  const handleSpeakerClick = () => {
    if (isPlaying) return; // stop if already playing

    const randomFn = [playOne, playTwo, playThree][Math.floor(Math.random() * 3)];
    setIsPlaying(true);
    setStart(false);

    // Play chosen sound
    randomFn();

    // Assume each audio ~1.5s — adjust to your actual duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-heading"
  }, t("tapNumbers")), /*#__PURE__*/React.createElement("div", {
    className: "align-hand-image"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shout-loud"
  }, t("shoutLound")), /*#__PURE__*/React.createElement("img", {
    src: raisehandchild,
    className: "boy-hand"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "girl-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, start && /*#__PURE__*/React.createElement("p", null, t("tapSpeaker")), !start && /*#__PURE__*/React.createElement("p", null, t("tapTheNumbers")), /*#__PURE__*/React.createElement("div", {
    className: "align-triangle"
  }, "\u25BC")), /*#__PURE__*/React.createElement("img", {
    src: Mindy_Pointing_Up_Mid,
    className: "girl-image"
  })), /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement("div", {
    className: "speaker-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: speaker,
    className: `speaker ${isPlaying ? "disabled-speaker" : ""}`,
    onClick: handleSpeakerClick,
    style: {
      cursor: isPlaying ? "not-allowed" : "pointer"
    }
  }), start && /*#__PURE__*/React.createElement(Tap, {
    bottom: "-23%",
    left: "21%",
    width: "6vw"
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-next"
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.next"),
    width: "13vw",
    height: "10vh",
    fontSize: "4vw",
    showTap: false,
    showActive: false,
    onClick: () => {
      playClick();
      window.location.reload();
    },
    disabled: !allClicked
  })), /*#__PURE__*/React.createElement("img", {
    src: one,
    className: `image-one ${start ? "opacity" : ""}`,
    onClick: () => handleClick("one", playOne)
  }), /*#__PURE__*/React.createElement("img", {
    src: two,
    className: `image-two ${start ? "opacity" : ""}`,
    onClick: () => handleClick("two", playTwo)
  }), /*#__PURE__*/React.createElement("img", {
    src: three,
    className: `image-three ${start ? "opacity" : ""}`,
    onClick: () => handleClick("three", playThree)
  }))));
};
export default Scene;