import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneFive = ({ onNext }) => {
  const { t } = useTranslation();
  const handleNext = () => {
    playClick();
    onNext();
  };

  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneFive.equalParts")}</p>
          <div className="triangle">▶</div>
        </div>

        <img
          src={images.thinkboy}
          style={{ width: "16vw", objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <img
              src={images.caketwo}
              style={{ width: "29vw", objectFit: "contain" }}
            />
            <div
              className={`cut-line`}
              style={{
                border: "0.3vw solid black",
              }}
            ></div>
            <div>
              <div className="half-cake"></div>
              <div className="half-cake-right"></div>
            </div>
          </div>
          <div className="cutter-box">
            {/* <img
              src={images.cutter}
              style={{ width: "10vw", objectFit: "contain", cursor: "pointer" }}
              onClick={handleCutter}
            /> */}
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          <p style={{ fontSize: "2.5vw" }}>{t("sceneFive.tapToKnow")}</p>

          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneFive;
