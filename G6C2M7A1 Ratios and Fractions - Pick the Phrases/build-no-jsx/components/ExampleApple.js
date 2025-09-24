import React, { useEffect, useState } from "react";
import "./scene.css";
import { playClick, playCorrect } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import AppleImage from "./AppleImage";
const ExampleApple = ({
  onNext,
  onPrev
}) => {
  const {
    t
  } = useTranslation();
  const [appleShow, setShowApple] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem("appleExample");
    if (result) {
      const parsed = JSON.parse(result);
      setShowApple(parsed.showApple);
      setNext(parsed.next);
    }
  }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleClick = () => {
    playCorrect();
    setShowApple(false);
    setNext(true);
    sessionStorage.setItem("appleExample", JSON.stringify({
      showApple: false,
      next: true
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("appleAndQuestion.oneThirdApple"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.ratio"),
    showTap: false,
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    backgroundColor: "#cfe2f3",
    disabled: true,
    showActive: false
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main-second"
  }, !appleShow && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("appleAndQuestion.onThirdAppleGreen")), /*#__PURE__*/React.createElement(AppleImage, null)), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.fraction"),
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    showTap: false,
    disabled: !appleShow,
    showActive: appleShow,
    backgroundColor: appleShow ? "#cfe2f3" : "#93c47d",
    onClick: handleClick
  }), appleShow && /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), appleShow && /*#__PURE__*/React.createElement("p", null, t("navigation.tapFraction")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), appleShow && /*#__PURE__*/React.createElement("button", {
    style: {
      backgroundColor: "gray",
      borderColor: "gray"
    }
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))));
};
export default ExampleApple;