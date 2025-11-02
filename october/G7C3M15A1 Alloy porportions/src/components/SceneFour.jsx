import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
import MetalRatio from "./MetalRatio";

const SceneFour = ({ goNext, goPrev }) => {
  const { t } = useTranslation();

  return (
    <div className="scene-container">
      <div className="heading">
        <p>
          <span>{t("sceneOne.aCertain")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.twoMetals")}</span>
          <span>{t("sceneOne.ifANew")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.sameAlloy")}</span>
          <span style={{ color: "#b6d7a8" }}>{t("sceneOne.howManyGrams")}</span>
        </p>
      </div>
      <div className="main">
        <div className="left">
          <p>{t("sceneFour.letAssume")}</p>
          <p style={{ color: "white" }}>{t("sceneFour.xGrams")}</p>
        </div>
        <div className="right">
          <MetalRatio />
        </div>
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
        <p>{t("instructions.tapToContinue")}</p>
        <div>
          <button
            onClick={() => {
              playClick();
              goNext();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap
            bottom={"0%"}
            onClick={() => {
              playClick();
              goNext();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneFour;
