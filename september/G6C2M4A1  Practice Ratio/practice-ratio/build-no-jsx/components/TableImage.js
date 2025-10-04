import React from 'react';
import "./TableImage.css";
import table from "../assets/table.png";
import { useTranslation } from 'react-i18next';
const TableImage = () => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: table,
    alt: "Table",
    className: "table-image"
  }), /*#__PURE__*/React.createElement("p", {
    className: "table-text"
  }, t("questionOne")));
};
export default TableImage;