import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const ActivityCompleted = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("startPage.simplestForm")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("greatJob")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "25vw",
    height: "13vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  })));
};
export default ActivityCompleted;