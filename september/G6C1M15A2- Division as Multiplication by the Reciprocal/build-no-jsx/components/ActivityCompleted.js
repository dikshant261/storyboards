import React from "react";
import ReusableButton from "./ReusableButton";
import { t } from "i18next";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import "./ActivityCompleted.css";
import "./HintSlide.css";
const ActivityCompleted = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "activity-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hint-title"
  }, t("activityComplete")), /*#__PURE__*/React.createElement("p", {
    className: "hint-description"
  }, t("hint.description")), /*#__PURE__*/React.createElement("div", {
    className: "hint-box"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xF7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "= ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.reciprocal"), " ", t("hint.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "= ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "numerator"
  }, "1"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, t("hint.numberOne"))))), /*#__PURE__*/React.createElement("p", {
    className: "hint-description"
  }, t("tapStartOver")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "22vw",
    height: "13vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
export default ActivityCompleted;