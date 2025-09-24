import React, { useEffect, useState } from "react";
import "./scene.css";
import { playClick, playCorrect } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import AppleImage from "./AppleImage";
import Marble from "./Marble";
const MarbleExample = ({
  onNext,
  onPrev
}) => {
  const {
    t
  } = useTranslation();
  const [appleShow, setShowApple] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem("marbleExample");
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
    sessionStorage.setItem("marbleExample", JSON.stringify({
      showApple: false,
      next: true
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("appleAndQuestion.threeRedMArble"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, !appleShow && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("appleAndQuestion.forEvery")), /*#__PURE__*/React.createElement(Marble, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.ratio"),
    showTap: false,
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    backgroundColor: appleShow ? "#cfe2f3" : "#93c47d",
    disabled: !appleShow,
    showActive: appleShow,
    onClick: handleClick
  }), appleShow && /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main-second"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("appleAndQuestion.onThirdAppleGreen")), /*#__PURE__*/React.createElement(AppleImage, null)), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.fraction"),
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    showTap: false,
    showActive: false,
    disabled: true,
    backgroundColor: "#93c47d",
    onClick: handleClick
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), appleShow && /*#__PURE__*/React.createElement("p", null, t("navigation.tapRatio")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), appleShow && /*#__PURE__*/React.createElement("button", {
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
export default MarbleExample;