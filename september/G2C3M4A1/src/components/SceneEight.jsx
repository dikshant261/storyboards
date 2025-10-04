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
  const [pulse, setPulse] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledOne, setDisabledOne] = useState(false);
  const [black, setBlack] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
    setPulse(true);
    setDisabled(false);
  };
  const handleCutter = () => {
    playCorrect();
    setCutting(true);
    setPulse(false);

    // ⏱ After 60% of 3s animation → around 1.8s
    setTimeout(() => {
      setBlack(true);
    }, 1800); // <-- trigger at 60%

    // ⏱ After full animation (3s), reset cutter animation
    setTimeout(() => {
      setBeforeCut(false);
      setAfterCut(true);
      setNext(true);
      setCutting(false);
      setDisabledOne(true);
    }, 3000);
  };

  console.log("next", next, afterCut);
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
              style={{
                border: black ? "0.3vw solid black" : "",
                pointerEvents: disabled ? "auto" : "none",
                cursor: disabled ? "pointer" : "not-allowed",
              }}
            ></div>
          </div>
          <div className="cutter-box">
            <img
              src={images.cutter}
              style={{
                width: "10vw",
                objectFit: "contain",
                pointerEvents: disabledOne ? "none" : "auto",
                cursor: disabledOne ? "not-allowed" : "pointer",
                opacity: disabledOne ? "0.5" : "1",
              }}
              onClick={handleCutter}
              className={`${pulse ? "cutter-pulse" : ""} ${
                cutting ? "cutting-animate-diagonally" : ""
              }`}
            />
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          {beforeCut && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              {t("sceneEight.tapCutting")}
              <span>
                <img
                  src={images.cutter}
                  style={{ width: "4vw", objectFit: "contain" }}
                />
              </span>
            </p>
          )}
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
