import React, { useEffect, useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import five from "../assets/five.png";
import { playClick, playFive, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import speaker from "../assets/speaker.png";
import Fivefinger from "../assets/Fivefinger.png";
import ReusableButton from "./ReusableButton";
import WhitePointer from "./WhitePointer";
const SceneSix = ({
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
      playFive();
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
    top: "17%",
    right: "23.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "12%",
    right: "30%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "35.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "26%",
    right: "40.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "44%",
    right: "18.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement("img", {
    src: five,
    className: "image-two",
    style: {
      width: "19vw"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Fivefinger,
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
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("button", {
    className: "align-Next",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.Next"))));
};
export default SceneSix;