import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneFourteen = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t()}</p>
      </div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
        }}
      >
        <p className="para">{t("sceneTwo.confirmationKeyword")}</p>
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

export default SceneFourteen;
