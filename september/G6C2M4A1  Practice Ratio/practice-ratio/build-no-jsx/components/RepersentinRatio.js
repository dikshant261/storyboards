import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";
const RepersentinRatio = ({
  onNext
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "start-page-container-part"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-heading"
  }, t("writingRatio")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading-one"
  }, t("practiceStart")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading-one"
  }, t("getReady")), /*#__PURE__*/React.createElement("div", {
    className: "sub-heading-one"
  }, t("nextContinue")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("next"),
    width: "12vw",
    height: "10vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      onNext();
    }
  }));
};
export default RepersentinRatio;