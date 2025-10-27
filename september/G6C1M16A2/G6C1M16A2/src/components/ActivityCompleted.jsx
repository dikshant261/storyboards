import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const StartPage = () => {
  const { t } = useTranslation();
  return (
    <div className="startpage-container">
      <div className="startpage-heading">{t("activityComplete")}</div>
      <div className="startpage-content" style={{paddingTop:'4vh'}}>{t("wePractice")}</div>
      <div className="startpage-content" style={{paddingTop:'5vh'}}>{t("tapStartOver")}</div>
      <div style={{ marginTop: "6vw" }}>
        <ReusableButton
          label={t("buttons.startOver")}
          width="25vw"
          height="13vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
