import React from "react";
import "./lengthbox.css";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const LenghtBoxTwo = ({
  beatOne,
  boxOneValue,
  boxCss,
  success = false,
  value,
  color,
  num
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, !success && /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      width: "19vw",
      height: "17vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "3%",
      left: "3%",
      fontSize: "1.3vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("crossProduct"), " ", num)), /*#__PURE__*/React.createElement("div", {
    className: `box ${beatOne ? "active" : ""} ${beatOne ? boxCss : ""}`,
    style: {
      width: "10vw",
      height: "9vh"
    }
  }, boxOneValue)), success && /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      background: color || "#5a7f5e",
      color: "white",
      fontSize: "4vw",
      width: "19vw",
      height: "17vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "3%",
      left: "3%",
      fontSize: "1.3vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("crossProduct"), " ", num)), /*#__PURE__*/React.createElement("div", null, boxOneValue)));
};
export default LenghtBoxTwo;