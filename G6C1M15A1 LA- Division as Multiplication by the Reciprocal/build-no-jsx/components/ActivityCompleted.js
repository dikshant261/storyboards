import React from "react";
import "./ActivityCompleted.css";
import ReusableButton from "./TapButton";
import { t } from "i18next";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const ActivityCompleted = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "activity-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("h2", null, t("activityCompleted.activity"))), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, t("activityCompleted.description")), /*#__PURE__*/React.createElement("div", {
    className: "equation-box"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xF7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "=", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xD7 ", t("activityCompleted.reciprocalOf"), /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "=", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", {
    className: "deno"
  }, t("activityCompleted.numberOne"))))), /*#__PURE__*/React.createElement("p", {
    className: "restart-text"
  }, t("activityCompleted.startOver")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "25vw",
    height: "14vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
export default ActivityCompleted;