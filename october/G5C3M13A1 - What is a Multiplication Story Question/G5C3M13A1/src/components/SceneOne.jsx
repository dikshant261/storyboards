import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneOne = ({ goNext }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneOne.whatIsStory")}</p>
      </div>
      <div className="main-container">
        <p className="para">
          {t("sceneOne.aStoryQuestion")}{" "}
          <span className="orange-color">{t("sceneOne.calculateNumbers")}</span>
        </p>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        <p className="para">{t("navigation.tapNext")}</p>
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

export default SceneOne;
