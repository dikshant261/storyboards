import React, { useEffect, useState } from "react";
import "./SceneOne.css";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import DesignTwo from "./DesignTwo";
import SentanceBox from "./SentanceBox";
const SceneSix = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = useState(true);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleClick = () => {
    playClick();
    sessionStorage.clear();
    window.location.reload();
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p>{t("sideHeading.completeFirst")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-ballon">
          <div className="balloon-set">
            <DesignTwo total={7} red={4} blue={3} a={"A"} b={"B"} />
          </div>
          <div className="sentance-align">
            <div>
              <SentanceBox num={4} result={3} />
            </div>
            <div>
              <SentanceBox num={3} result={4} />
            </div>
          </div>
        </div>

        <div
          className="scene-container-right-option-keypad"
          style={{ justifyContent: "center" }}
        >
          <div>
            <button className="start-over" onClick={handleClick}>
              {t("buttons.startOver")}
            </button>
            <img src={tap} className="tap-gif" />
          </div>
        </div>
        <div className="scene-container-right-footer">
          <button onClick={handlePrev}>{t("buttons.previous")}</button>
          {stepOne && (
            <p style={{ fontSize: "2.7vw" }}>{t("navigation.starAgain")}</p>
          )}
          {stepOne && (
            <button
              style={{
                backgroundColor: "gray",
                borderColor: "gray",
                cursor: "not-allowed",
              }}
            >
              {t("buttons.next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneSix;
