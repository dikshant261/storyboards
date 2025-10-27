import React, { useEffect, useState } from "react";
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
import Twofinger from "../assets/Twofinger.png";
import ReusableButton from "./ReusableButton";
import WhitePointer from "./WhitePointer";
const SceneThree = ({
  goPrev,
  goNext
}) => {
  const {
    t
  } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false
  });
  useEffect(() => {
    setTimeout(() => {
      playTwo();
    }, 1000);
  }, []);
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
  }, /*#__PURE__*/React.createElement("p", {
    className: "top-heading"
  }, t("count")), /*#__PURE__*/React.createElement("div", {
    className: "align-hand-image"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shout-loud"
  }, t("shout")), /*#__PURE__*/React.createElement("img", {
    src: raisehandchild,
    className: "boy-hand"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(WhitePointer, {
    top: "13%",
    right: "31.8%"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "41.8%"
  }), /*#__PURE__*/React.createElement("img", {
    src: two,
    className: "image-two"
  }), /*#__PURE__*/React.createElement("img", {
    src: Twofinger,
    style: {
      width: "27vw",
      transform: "translateY(2.4vw)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "align-previous",
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("div", {
    className: "align-Next",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.Next"))));
};
export default SceneThree;