import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
import FrameImag from "./SquirrelQuestion/FrameImage";
const StartPage = ({
  goNext
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "fraction-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "title"
  }, t("startPage.checkProportionality")), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "circle"
  }, /*#__PURE__*/React.createElement(FrameImag, {
    width: "63%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("p", {
    className: "line-height"
  }, t("startPage.getPurple")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "3vw"
    }
  }, t("startPage.mixGiven"))), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "13vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
export default StartPage;