import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const StartPage = ({
  goNext
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("startPage.title")), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-section"
  }, t("startPage.content"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    width: "12vw",
    height: "10vh",
    fontSize: "3vw",
    label: t("buttons.start"),
    onClick: () => {
      playClick();
      goNext();
    }
  })));
};
export default StartPage;