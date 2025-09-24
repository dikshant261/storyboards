import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const StartPage = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="startpage-container">
      <div className="startpage-heading">{t("title")}</div>
      <div className="startpage-content">
        {t("startPage.ratiosAndFraction")}
      </div>
      <div className="startpage-content">{t("startPage.fromTheIdentify")}</div>
      <div className="startpage-content">{t("startPage.tip")}</div>
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
