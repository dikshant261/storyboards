import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const ActivityCompleted = () => {
  const { t } = useTranslation();
  return (
    <div
      className="startpage-container"
      style={{
        justifyContent: "flex-start",
      }}
    >
      <div className="startpage-heading">
        {t("activityComplete.activityComplete")}
      </div>
      <div
        className="startpage-content"
        style={{
          lineHeight: "4vw",
          paddingTop: "10vh",
        }}
      >
        {t("activityComplete.youCompleted")}
      </div>
      <div style={{ marginTop: "4vw" }}>
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
