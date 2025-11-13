import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const NextQuestion = ({
  goNext
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "fraction-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "title"
  }, t("startPage.letWrite")), /*#__PURE__*/React.createElement("p", {
    className: "startpage-content",
    style: {
      paddingTop: "5%"
    }
  }, t("nextQuestion.motherBought")), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "6%"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "13vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      goNext();
    }
  })));
};
export default NextQuestion;