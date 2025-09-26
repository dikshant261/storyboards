import React from "react";
import "./ActivityCompleted.css";
import ReusableButton from "./TapButton";
import { t } from "i18next";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";

const ActivityCompleted = () => {
  const { t } = useTranslation();
  return (
    <div className="activity-container">
      <div className="header">
        <h2>{t("activityCompleted.activity")}</h2>
      </div>

      <p className="description">{t("activityCompleted.description")}</p>

      <div className="equation-box">
        <p>
          <span className="highlight">{t("activityCompleted.numberOne")}</span>{" "}
          ÷{" "}
          <span className="highlight">{t("activityCompleted.numberTwo")}</span>
        </p>
        <p>
          ={" "}
          <span className="highlight">{t("activityCompleted.numberOne")}</span>{" "}
          × {t("activityCompleted.reciprocalOf")}
          <span className="highlight">{t("activityCompleted.numberTwo")}</span>
        </p>
        <p>
          ={" "}
          <span className="highlight">{t("activityCompleted.numberOne")}</span>{" "}
          ×{" "}
          <span className="fraction">
            <span>1</span>
            <span className="deno">{t("activityCompleted.numberOne")}</span>
          </span>
        </p>
      </div>

      <p className="restart-text">{t("activityCompleted.startOver")}</p>

      <ReusableButton
        label={t("buttons.startOver")}
        width="25vw"
        height="14vh"
        fontSize="3vw"
        onClick={() => {
          playClick();
          window.location.reload();
        }}
      />
    </div>
  );
};

export default ActivityCompleted;
