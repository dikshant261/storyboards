import React, { useTransition } from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import EndTwo from "./EndTwo";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const End = () => {
  const { t } = useTranslation();
  return (
    <div className="intro-container">
      <div className="title">{t("activity")}</div>
      <EndTwo />
      <ReusableButton
        label={t("buttons.startOver")}
        width="20vw"
        height="11vh"
        fontSize="3vw"
        onClick={() => {
          playClick();
          window.location.reload();
        }}
      />
    </div>
  );
};

export default End;
