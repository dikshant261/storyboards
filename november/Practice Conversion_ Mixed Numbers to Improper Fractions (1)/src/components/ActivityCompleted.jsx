import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const ActivityCompleted = () => {
  const { t } = useTranslation();

  return (
    <div className="startpage-fraction-container">
      <h2 className="title">{t("activityCompleted.activityCompleted")}</h2>
      <p className="startpage-content">
        <span style={{ color: "var(--secondary-color)" }}>
          {t("activityCompleted.mixedNumbers")}
        </span>
        <span> {t("activityCompleted.and")}</span>
        <span style={{ color: "var(--secondary-color)" }}>
          {t("activityCompleted.improperFractions")}
        </span>
        <span>{t("activityCompleted.areUsed")}</span>
        <span>{t("activityCompleted.toDenote")}</span>
        <span style={{ color: "var(--secondary-color)" }}>
          {t("activityCompleted.greaterThanOne")}
        </span>
        <span>{t("activityCompleted.fromAMixedFraction")}</span>
      </p>
      <div style={{ paddingTop: "8vh" }}>
        <ReusableButton
          label={t("buttons.startOver")}
          padding={"2vh 1vw"}
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
