import React from "react";
import "./HalfLesson.css";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";

const HalfLesson = () => {
  const { t } = useTranslation();

  return (
    <div className="lesson-container">
      <h2 className="lesson-title">{t("halfLesson.title")}</h2>
      <div className="lesson-box">
        <p
          className="lesson-subtitle"
          style={{
            fontSize: "3vw",
          }}
        >
          {t("halfLesson.weLearnt")}
        </p>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">{t("halfLesson.half")}</span> {t("halfLesson.equalParts")}
        </div>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">{t("halfLesson.notEqual")}</span> {t("halfLesson.notHalves")}
        </div>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">{t("halfLesson.twoHalves")}</span> {t("halfLesson.makeWhole")}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "3vw",
          }}
        >
          <ReusableButton
            label={t("buttons.startOver")}
            width="23vw"
            height="10vh"
            fontSize="3vw"
            onClick={() => {
              playClick();
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HalfLesson;
