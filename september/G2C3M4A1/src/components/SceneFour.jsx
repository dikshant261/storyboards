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
  const [cakePiece, setCakePiece] = useState(false);
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
    setCakePiece(true);
    setBeforeCut(false);
    setAfterCut(true);
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
              style={{ width: "10vw", objectFit: "contain", cursor: "pointer" }}
              onClick={handleCutter}
            />
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          {beforeCut && <p>{t("sceneFour.tapCut")}</p>}
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
