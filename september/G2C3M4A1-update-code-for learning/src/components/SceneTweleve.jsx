import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const SceneTwelve = ({ onNext }) => {
  const { t } = useTranslation();

  const handleNext = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneTwelve.notEqual")}</p>
          <div className="triangle">▶</div>
        </div>
        <img
          src={images.man}
          style={{ width: "21vw", objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={images.cakeOnehalf}
                style={{
                  width: "36.5vw",
                  objectFit: "contain",
                }}
              />
              <img
                src={images.cakeOnehalftwo}
                style={{
                  width: "37vw",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="cut-line-two"></div>
            <div
              style={{
                position: "fixed",
                top: "16%",
                left: "46%",
                fontSize: "9vw",
                color: "white",
                transform: "rotate(136deg)",
              }}
            >
              ↓
            </div>
            <p
              style={{
                position: "fixed",
                top: "9%",
                left: "37%",
                fontSize: "5vw",
                color: "white",
              }}
            >
              {t("sceneTwelve.smallerPart")}
            </p>
            <div
              style={{
                position: "fixed",
                bottom: "25%",
                right: "35%",
                fontSize: "9vw",
                color: "white",
                transform: "rotate(-45deg)",
              }}
            >
              ↓
            </div>
            <p
              style={{
                position: "fixed",
                bottom: "16%",
                fontSize: "5vw",
                color: "white",
                right: "21%",
              }}
            >
              {t("sceneTwelve.biggerPart")}
            </p>
          </div>

          <div className="cutter-box"></div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>

          <p>{t("sceneEleven.tapContinue")}</p>

          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneTwelve;
