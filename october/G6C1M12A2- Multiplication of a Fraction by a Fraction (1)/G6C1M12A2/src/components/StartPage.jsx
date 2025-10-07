import React from "react";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const StartPage = ({ gonext }) => {
    const { t } = useTranslation();
  return (
    <div className="intro-container">
      <div className="title">{t("startPage.title")}</div>
      <div className="text-section">{t("startPage.weHave")}</div>
      <div className="text-section">{t("startPage.nowIts")}</div>
      <div className="text-section">{t("startPage.tapStart")}</div>
      <ReusableButton
        label={t("buttons.start")}
        onClick={() => {
          playClick();
          gonext();
        }}
      />
    </div>
  );
};

export default StartPage;
