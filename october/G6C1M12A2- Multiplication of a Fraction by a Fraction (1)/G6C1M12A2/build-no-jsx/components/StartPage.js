import React from "react";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
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
    className: "text-section"
  }, t("startPage.weHave")), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, t("startPage.nowIts")), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, t("startPage.tapStart")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "14vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      goNext();
    }
  }));
};
export default StartPage;