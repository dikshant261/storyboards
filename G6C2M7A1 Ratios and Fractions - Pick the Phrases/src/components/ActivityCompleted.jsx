import React from "react";
import "./ActivityCompleted.css";
import ReusableButton from "./ReusableButton";
import { t } from "i18next";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import "./startpage.css";
const ActivityCompleted = () => {
  const { t } = useTranslation();
  return (
    <div className="startpage-container">
      <div className="startpage-heading">{t("activityComplete")}</div>
      <div className="startpage-content">{t("ratioDifferent")}</div>
      <div className="startpage-content">{t("startOver")}</div>
      <ReusableButton
        label={t("buttons.startOver")}
        width="33vw"
        height="13vh"
        fontSize="4vw"
        onClick={() => {
          playClick();
          window.location.reload();
        }}
      />
    </div>
  );
};

export default ActivityCompleted;
