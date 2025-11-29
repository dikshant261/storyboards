import React from "react";
import "./box.css";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const Box = ({
  beat,
  value,
  boxCss,
  style
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: `box ${beat ? "active" : ""} ${boxCss}`,
    style: {
      ...style
    }
  }, value);
};
export default Box;