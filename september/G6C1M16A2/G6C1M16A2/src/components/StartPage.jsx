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
      <div className="startpage-content">{t("startpage.weHaveLearned")}</div>
      <div className="startpage-content">{t("startpage.letPractice")}</div>
      <div className="startpage-content">{t("startpage.tapStart")}</div>
      <div style={{marginTop:"8vw"}}>
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
    </div>
  );
};

export default StartPage;
