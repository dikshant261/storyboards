import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import five from "../assets/five.png";
import { playClick, playFive, playFour, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import ReusableButton from "./ReusableButton";
const Scene = () => {
  const {
    t
  } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false
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
  const allClicked = clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
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
    className: "girl-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, t("tap"), /*#__PURE__*/React.createElement("div", {
    className: "align-triangle"
  }, "\u25BC")), /*#__PURE__*/React.createElement("img", {
    src: Mindy_Pointing_Up_Mid,
    className: "girl-image"
  })), /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(Tap, {
    top: "48%",
    left: "12%",
    width: "6vw"
  }), /*#__PURE__*/React.createElement("div", {
    className: "align-next"
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.next"),
    padding: "2vh",
    fontSize: "3vw",
    showTap: false,
    showActive: false,
    onClick: () => {
      playClick();
      window.location.reload();
    },
    disabled: !allClicked // Enable when all images are clicked
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-num-col"
  }, /*#__PURE__*/React.createElement("img", {
    src: one,
    className: "image-one",
    onClick: () => handleClick("one", playOne)
  }), /*#__PURE__*/React.createElement("p", null, t("one"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: two,
    className: "image-two",
    onClick: () => handleClick("two", playTwo)
  }), /*#__PURE__*/React.createElement("p", null, t("two"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: three,
    className: "image-three",
    onClick: () => handleClick("three", playThree)
  }), /*#__PURE__*/React.createElement("p", null, t("three")))), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: four,
    className: "image-two",
    onClick: () => handleClick("four", playFour)
  }), /*#__PURE__*/React.createElement("p", null, t("four"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: five,
    className: "image-three",
    style: {
      width: "8vw"
    },
    onClick: () => handleClick("five", playFive)
  }), /*#__PURE__*/React.createElement("p", null, t("five")))))));
};
export default Scene;