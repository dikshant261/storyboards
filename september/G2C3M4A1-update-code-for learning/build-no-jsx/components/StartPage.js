import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const StartPage = ({
  onStart
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "title"
  }, "What is Half?"), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "square-box"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, /*#__PURE__*/React.createElement("p", null, t("startPage.areReady")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: "4vw"
    }
  }, t("startPage.celebration")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "12vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      onStart();
    }
  }))));
};
export default StartPage;