import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneEight = ({ onNext }) => {
  const { t } = useTranslation();
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [next, setNext] = useState(false);
  const [nextTwo, setNextTwo] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
  };
  const handleCutter = () => {
    playCorrect();
    setBeforeCut(false);
    setAfterCut(true);
    setNext(true);
  };
  console.log("next",next,afterCut)
  const handleNextTwo = () => {
    playClick();
    setNext(false);
    setNextTwo(true);
  };
  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          {beforeCut && <p>{t("sceneEight.whyNot")}</p>}
          {next && <p>{t("sceneEight.wowTwo")}</p>}
          {nextTwo && <p>{t("sceneEight.wowPerfect")}</p>}
          <div className="triangle">▶</div>
        </div>
        {beforeCut && (
          <img
            src={images.manhand}
            style={{ width: "21.3vw", objectFit: "contain" }}
            loading="lazy"
          />
        )}
        {afterCut && (
          <img
            src={images.girl}
            style={{ width: "16vw", objectFit: "contain" }}
            loading="lazy"
          />
        )}
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <img
              src={images.cakethree}
              style={{ width: "37vw", objectFit: "contain" }}
            />
            <div
              className={`${cut ? "cut-line-black" : "cut-line-diagonal"}`}
              onClick={handleLine}
            ></div>
          </div>
          <div className="cutter-box">
            <img
              src={images.cutter}
              style={{ width: "10vw", objectFit: "contain", cursor: "pointer" }}
              onClick={handleCutter}
            />
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          {beforeCut && <p>{t("sceneEight.tapCutting")}</p>}
          {afterCut && <p>{t("sceneEight.tapKnow")}</p>}
          {beforeCut && (
            <button className="disabled">{t("buttons.next")}</button>
          )}
          {next && (
            <div>
              <button onClick={handleNextTwo}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
          )}
          {nextTwo && (
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneEight;
