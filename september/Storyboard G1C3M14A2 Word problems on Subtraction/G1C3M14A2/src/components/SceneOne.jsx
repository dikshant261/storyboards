import React from "react";
import "./Scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";
import ProgressBar from "./ProgressBar";
const SceneOne = ({ onSatrt }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p>{t("sideHeading.thereAre")}</p>
        <p>{t("wordProblems.one")}</p>
        <p>{t("wordProblems.two")}</p>
        <p>{t("wordProblems.three")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-main">
          <div className="scene-container-right-heading-main">
            <div className="scene-container-right-heading">
              <p>{t("questionHading.solveSubtraction")}</p>
            </div>
            <div className="scene-container-right-content"></div>
          </div>
          <div className="scene-container-right-option">
            <ReusableButton
              width="10vw"
              height="8vh"
              fontSize="2.6vw"
              label={t("buttons.start")}
              onClick={() => {
                playClick();
                onSatrt();
              }}
            />
          </div>
        </div>
        <div className="scene-container-right-footer-heading">
          <p>{t("navigation.tapStart")}</p>
        </div>
        <div className="scene-container-right-footer-button">
          <button className="disabled">{t("buttons.previous")}</button>
          <ProgressBar current={1}/>
          <button className="disabled">{t("buttons.next")}</button>
        </div>
      </div>
    </div>
  );
};

export default SceneOne;
