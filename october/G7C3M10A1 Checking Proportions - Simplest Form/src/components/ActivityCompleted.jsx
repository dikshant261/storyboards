import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const ActivityCompleted = () => {
  const { t } = useTranslation();
  return (
    <div className="startpage-container">
      <div className="startpage-heading">{t("startPage.simplestForm")}</div>
      <div className="startpage-content">{t("greatJob")}</div>
      <div style={{ marginTop: "8vw" }}>
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

export default ActivityCompleted;
