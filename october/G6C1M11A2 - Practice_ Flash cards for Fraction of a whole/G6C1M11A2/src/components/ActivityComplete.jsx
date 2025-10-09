import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const ActivityComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="intro-container">
      <div className="title">{t("activity.title")}</div>
      <div className="content">
        <p className="text-section">{t("activity.content")}</p>
      </div>
      <div style={{ marginTop: "4vw" }}>
        <ReusableButton
          width="20vw"
          height="13vh"
          fontSize="3vw"
          label={t("buttons.startOver")}
          onClick={() => {
            playClick();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default ActivityComplete;
