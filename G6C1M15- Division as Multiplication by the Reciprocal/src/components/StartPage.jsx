import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";
const StartPage = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="startpage-container">
      <div className="startpage-heading">{t("startPageContent.title")}</div>
      <div className="startpage-content">{t("startPageContent.weLearned")}</div>
      <div className="startpage-content">
        {t("startPageContent.nowLetLearn")}
      </div>
      <div className="startpage-content">{t("startPageContent.tapStart")}</div>
      <ReusableButton
        label={t("buttons.start")}
        width="15vw"
        height="11vh"
        fontSize="4vw"
        onClick={() => {
          playClick();
          onClose();
        }}
      />
    </div>
  );
};

export default StartPage;
