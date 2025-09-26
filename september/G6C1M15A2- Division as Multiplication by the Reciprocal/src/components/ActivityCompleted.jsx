import React from "react";
import ReusableButton from "./ReusableButton";
import { t } from "i18next";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import "./ActivityCompleted.css";
import "./HintSlide.css";
const ActivityCompleted = () => {
  const { t } = useTranslation();
  return (
    <div className="activity-container">
      <div className="hint-title">{t("activityComplete")}</div>
      <p className="hint-description">{t("hint.description")}</p>

      <div className="hint-box">
        <p>
          <span className="highlight-yellow">{t("hint.numberOne")}</span> ÷{" "}
          <span className="highlight-blue">{t("hint.numberTwo")}</span>
        </p>
        <p>
          = <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
          <span className="highlight-blue">
            {t("hint.reciprocal")} {t("hint.numberTwo")}
          </span>
        </p>
        <p>
          = <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
          <span className="fraction">
            <span className="numerator">1</span>
            <br />
            <span className="denominator">{t("hint.numberOne")}</span>
          </span>
        </p>
      </div>
      <p className="hint-description">{t("tapStartOver")}</p>
      <ReusableButton
        label={t("buttons.startOver")}
        width="22vw"
        height="13vh"
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
