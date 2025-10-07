import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneTwo = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneOne.whatIsStory")}</p>
      </div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p className="para">{t("sceneTwo.typeOfStory")} </p>
        <p className="para" style={{ textAlign: "left" }}>
          {t("sceneTwo.additionStory")}
        </p>
        <p className="para">{t("sceneTwo.subtraction")}</p>
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

export default SceneTwo;
