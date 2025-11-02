import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
import MetalRatio from "./MetalRatio";

const SceneSeven = ({ goNext, goPrev }) => {
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
          <p>
            {t("sceneSeven.soThe")}
            <span style={{ color: "white" }}>{t("sceneSeven.metalA")}</span>
            <span>{t("sceneSeven.metalB")}</span>
          </p>
        </div>
        <div
          className="right"
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MetalRatio xValue="112.5" />
          <p
            style={{
              fontSize: "3vw",
              textAlign: "center",
              color: "white",
            }}
          >
            {t("sceneSeven.isPerportional")}
          </p>
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
        <p>{t("instructions.tapToStartOver")}</p>
        <div>
          <button
            onClick={() => {
              playClick();
              window.location.reload();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap
            bottom={"0%"}
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

export default SceneSeven;
