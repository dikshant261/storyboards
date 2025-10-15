import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const ActivityComplete = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("activity.title")), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-section"
  }, t("activity.content"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    width: "20vw",
    height: "13vh",
    fontSize: "3vw",
    label: t("buttons.startOver"),
    onClick: () => {
      playClick();
      window.location.reload();
    }
  })));
};
export default ActivityComplete;