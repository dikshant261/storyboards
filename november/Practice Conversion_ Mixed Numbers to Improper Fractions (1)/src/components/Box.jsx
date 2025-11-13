import React from "react";
import "./box.css";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const Box = ({ beat, value, boxCss, style }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`box ${beat ? "active" : ""} ${boxCss}`}
      style={{ ...style }}
    >
      {value}
    </div>
  );
};

export default Box;
