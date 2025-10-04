import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
const ActivityComplete = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "start-page-container-complete"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-heading"
  }, t("activityComplete")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading-one"
  }, t("leraned_forms")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading-one"
  }, t("startOver")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttonStartOver"),
    width: "16vw",
    height: "8vh",
    fontSize: "3vw",
    onClick: () => window.location.reload()
  }));
};
export default ActivityComplete;