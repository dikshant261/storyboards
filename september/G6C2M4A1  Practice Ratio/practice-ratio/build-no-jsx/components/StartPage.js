import React from "react";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import "./startpage.css";
import { playClick } from "./PlayAudio";
const StartPage = ({
  onClose
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "start-page-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-heading"
  }, t("writingRatio")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading"
  }, t("get_ready_to_explore")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("start"),
    width: "12vw",
    height: "10vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      onClose();
    }
  })));
};
export default StartPage;