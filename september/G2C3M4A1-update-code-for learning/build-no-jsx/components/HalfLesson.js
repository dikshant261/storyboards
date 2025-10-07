import React from "react";
import "./HalfLesson.css";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const HalfLesson = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "lesson-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "lesson-title"
  }, t("halfLesson.title")), /*#__PURE__*/React.createElement("div", {
    className: "lesson-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lesson-subtitle",
    style: {
      fontSize: "3vw"
    }
  }, t("halfLesson.weLearnt")), /*#__PURE__*/React.createElement("div", {
    className: "lesson-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2714"), /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("halfLesson.half")), " ", t("halfLesson.equalParts")), /*#__PURE__*/React.createElement("div", {
    className: "lesson-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2714"), /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("halfLesson.notEqual")), " ", t("halfLesson.notHalves")), /*#__PURE__*/React.createElement("div", {
    className: "lesson-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2714"), /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("halfLesson.twoHalves")), " ", t("halfLesson.makeWhole")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "3vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "23vw",
    height: "10vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }))));
};
export default HalfLesson;