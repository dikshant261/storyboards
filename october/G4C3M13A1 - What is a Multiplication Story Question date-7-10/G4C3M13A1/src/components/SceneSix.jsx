import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneSix = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneSix.whatToLook")}</p>
      </div>
      <div
        className="main-container "
        style={{ flexDirection: "column", gap: "7vw" }}
      >
        <p className="para">
          {t("sceneSix.wordOfPharasGive")}{" "}
          <span style={{ color: "var(--secondary-color)" }}>
            {t("sceneSix.numberOfGroups")}
          </span>
        </p>
        <p className="para">
          {t("sceneSix.wordOfPharasTells")}{" "}
          <span style={{ color: "var(--secondary-color)" }}>
            {t("sceneSix.items")}
          </span>
        </p>
        <p className="para" style={{ color: "var(--secondary-color)" }}>
          {t("sceneSix.letUse")}
        </p>
      </div>
      <div className="footer">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        <p>{t("navigation.tapNext")}</p>
        <div>
          <button
            className="next-btn"
            onClick={() => {
              playClick();
              goNext();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneSix;
