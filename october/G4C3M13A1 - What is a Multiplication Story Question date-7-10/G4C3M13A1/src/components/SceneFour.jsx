import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneFour = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneFour.whatMultiplicationGivesYou")}</p>
      </div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p className="para " style={{ color: "var(--secondary-color)" }}>
          {t("sceneFour.aMultiplicationStoryAlways")}{" "}
        </p>
        <p className="para" style={{ textAlign: "left" }}>
          {t("sceneFour.numberOne")}
        </p>
        <p className="para">{t("sceneFour.numberTwo")}</p>
        <br />
        <p className="para " style={{ color: "var(--secondary-color)" }}>
          {t("sceneFour.weUseAbove")}
        </p>
        <br />
        <p className="para">{t("sceneFour.totalNumber")}</p>
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

export default SceneFour;
