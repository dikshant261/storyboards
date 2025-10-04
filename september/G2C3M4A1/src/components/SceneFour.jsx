import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneFour = ({ onNext }) => {
  const { t } = useTranslation();
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [cakePiece, setCakePiece] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [blackLine, setBalckLine] = useState(false);
  const [disabledOne, setDisabledOne] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
    setPulse(true);
    setDisabledOne(true);
    setDisabled(false);
  };
  const handleCutter = () => {
    playCorrect();
    setCutting(true);
    setPulse(false);

    // ⏱ After 60% of 3s animation → around 1.8s
    setTimeout(() => {
      setCakePiece(true);
      setBeforeCut(false);
      setAfterCut(true);
      setBalckLine(true);
    }, 1800); // <-- trigger at 60%

    // ⏱ After full animation (3s), reset cutter animation
    setTimeout(() => {
      setDisabledOne(false);
      setCutting(false);
      setOpacity(true);
    }, 3000);
  };

  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          {beforeCut && <p>{t("sceneFour.offCourse")}</p>}
          {afterCut && <p>{t("sceneFour.happyBirthday")}</p>}
          <div className="triangle">▶</div>
        </div>
        {beforeCut && (
          <img
            src={images.rightman}
            style={{ width: "25vw", objectFit: "contain" }}
            loading="lazy"
          />
        )}
        {afterCut && (
          <img
            src={images.manhand}
            style={{ width: "21.3vw", objectFit: "contain" }}
            loading="lazy"
          />
        )}
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <img
              src={images.caketwo}
              style={{ width: "29vw", objectFit: "contain" }}
            />
            <div
              className={`${cut ? "cut-line" : "line"}`}
              style={{
                border: blackLine ? "0.4vw solid black" : "",
                cursor: disabled ? "not-allowed" : "pointer", // 👈 feedback
                pointerEvents: disabled ? "none" : "auto",
              }}
              onClick={handleLine}
            ></div>
            {cakePiece && (
              <div>
                <div className="half-cake"></div>
                <div className="half-cake-right"></div>
              </div>
            )}
          </div>
          <div className="cutter-box">
            <img
              src={images.cutter}
              style={{
                width: "10vw",
                objectFit: "contain",
                cursor: disabledOne ? "pointer" : "not-allowed", // 👈 feedback
                pointerEvents: disabledOne ? "auto" : "none",
                opacity: opacity ? "0.5" : "1",
              }}
              onClick={handleCutter}
              className={`${pulse ? "cutter-pulse" : ""} ${
                cutting ? "cutting-animate" : ""
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
                alignItems: "center",
                justifyContent: "center",
                gap: "1vw",
              }}
            >
              {t("sceneFour.tapCut")}{" "}
              <span>
                <img src={images.cutter} style={{ width: "4vw" }} />
              </span>
            </p>
          )}
          {afterCut && <p>{t("sceneFour.tapMoveStory")}</p>}
          {beforeCut && (
            <button className="disabled">{t("buttons.next")}</button>
          )}
          {afterCut && (
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

export default SceneFour;
