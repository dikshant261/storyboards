import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";

const SceneTwo = ({ goNext, goPrev }) => {
  const { t } = useTranslation();

  return (
    <div className="scene-container">
      <div className="heading">
        <p>
          <span>{t("sceneOne.aCertain")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.twoMetals")}</span>
          <span>{t("sceneOne.ifANew")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.sameAlloy")}</span>
          <span>{t("sceneOne.howManyGrams")}</span>
        </p>
      </div>
      <div className="main">
        <div className="left">
          <p>{t("sceneOne.letFind")}</p>
          <p style={{ color: "white" }}>{t("sceneOne.crossMultiplication")}</p>
        </div>
        <div className="right">
          <div className="given">
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("given")}
            </p>
            <ul>
              <li>{t("sceneTwo.inAnAlloy")}</li>
              <li>{t("sceneTwo.inSameAlloy")}</li>
            </ul>
          </div>
          <div className="tofind">
            <p
              style={{
                color: "#b6d7a8",
                textAlign: "left",
              }}
            >
              {t("toFind")}
            </p>
          </div>
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
        <p>{t("instructions.tapToUnderStand")}</p>
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

export default SceneTwo;
