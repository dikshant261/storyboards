import React from "react";
import { useTranslation } from "react-i18next";
import "./CheckWordSection.css";
import check from "../assets/check.png"; // replace with your icon path

const CheckWordsSection = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "check-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left-description"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para-t"
  }, /*#__PURE__*/React.createElement("i", null, t("sceneFifteen.checkWords")), " ", t("sceneFifteen.checkWordsLine1"), /*#__PURE__*/React.createElement("span", {
    className: "bold"
  }, t("sceneFifteen.total")), "."), /*#__PURE__*/React.createElement("p", {
    className: "para-t"
  }, t("sceneFifteen.checkWordsLine2"))), /*#__PURE__*/React.createElement("div", {
    className: "middle-words"
  }, /*#__PURE__*/React.createElement("p", {
    className: "word"
  }, t("sceneFifteen.inAll")), /*#__PURE__*/React.createElement("p", {
    className: "word"
  }, t("sceneFifteen.howMany")), /*#__PURE__*/React.createElement("p", {
    className: "word"
  }, t("sceneFifteen.totalNumber")), /*#__PURE__*/React.createElement("p", {
    className: "word"
  }, t("sceneFifteen.findTotal"))), /*#__PURE__*/React.createElement("div", {
    className: "right-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: check,
    alt: "Check Icon",
    className: "icon"
  })));
};
export default CheckWordsSection;