import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const StartPage = ({
  onClose
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("title")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.ratiosAndFraction")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.fromTheIdentify")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.tip")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "15vw",
    height: "11vh",
    fontSize: "4vw",
    onClick: () => {
      playClick();
      onClose();
    }
  }));
};
export default StartPage;