import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneSix = ({ onNext }) => {
  const { t } = useTranslation();
  const handleNext = () => {
    playClick();
    onNext();
  };

  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneSix.ohhJax")}</p>
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
            <p style={{ position: "fixed", top: "8%", left: "33%" }}>
              <span style={{color:"#0000d6"}}>{t("sceneSix.half")}:</span>{" "}
              <span>{t("sceneSix.oneTwo")}</span>
            </p>
            <img
              src={images.caketwo}
              style={{ width: "29vw", objectFit: "contain" }}
            />
            <div className={`cut-line`}></div>

            <div>
              <div className="half-cake"></div>
              <div className="half-cake-right"></div>
            </div>
            <div
              style={{
                position: "fixed",
                bottom: "31%",
                left: "46%",
                fontSize: "9vw",
                color: "white",
                transform: "rotate(45deg)",
              }}
            >
              ↓
            </div>
            <p
              style={{
                position: "fixed",
                bottom: "23%",
                left: "37%",
                fontSize: "5vw",
                color: "black",
                backgroundColor: "#ffffffba",
                padding: "1vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneSix.half")}
            </p>
            <div
              style={{
                position: "fixed",
                bottom: "31%",
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
                bottom: "23%",
                fontSize: "5vw",
                color: "black",
                right: "25%",
                backgroundColor: "#ffffffba",
                padding: "1vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneSix.half")}
            </p>
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
          <p style={{ fontSize: "3vw" }}>{t("sceneSix.tapContinue")}</p>

          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneSix;
