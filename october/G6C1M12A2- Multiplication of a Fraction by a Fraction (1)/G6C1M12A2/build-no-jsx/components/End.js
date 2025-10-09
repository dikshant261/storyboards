import React, { useTransition } from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import EndTwo from "./EndTwo";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const End = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("activity")), /*#__PURE__*/React.createElement(EndTwo, null), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "20vw",
    height: "11vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
export default End;