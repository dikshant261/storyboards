import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";
import FrameImageSlide from "./FrameImageSlide";

const SceneTwelve = ({ goNext, goPrev }) => {
  const { t } = useTranslation();

  const [next, setNext] = useState(false);

  const handleClick = () => {
    playClick();
    goNext();
  };

  return (
    <div className="scenetwo-container">
      <div className="heading">
        <p style={{ fontSize: "2.6vw" }}>
          <span>{t("sceneTwelve.letsFind")} </span>
        </p>
      </div>

      <div className="main">
        <div
          className="main-content"
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "1vh 1vw",
          }}
        >
          <p style={{ color: "white" }}>{t("sceneThree.given")}</p>
          <div className="align-row">
            <p style={{ color: "white" }}>{t("sceneThree.lengthOfFrame")}</p>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={"120 cm"}
              style={{
                border: "none",
                background: "none",
                color: "white",
              }}
            />
          </div>
          <div className="align-row">
            <p style={{ color: "white" }}>{t("sceneThree.widthOfFrame")}</p>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={"80 cm"}
              style={{
                border: "none",
                background: "none",
                color: "white",
              }}
            />
          </div>
          <div className="align-row">
            <p style={{ color: "white", textAlign: "left" }}>
              {t("sceneFive.ratioOfLengthWidth")}
            </p>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={
                <Fraction numerator={120} denominator={80} fontSize="2.5vw" />
              }
              style={{
                height: "13vh",
                background: "none",
                color: "white",
                border: "none",
              }}
            />
            <p style={{ color: "white" }}>=</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "0.5vh",
                position: "relative",
              }}
            >
              {<div className="cross-line-top"></div>}
              {<div className="cross-line-bottom"></div>}
              <Box
                value={"12 × 10"}
                style={{
                  height: "7vh",
                  fontSize: "2vw",
                  border: "none",
                  background: "none",
                  color: "white",
                }}
              />
              <div
                style={{ width: "8vw", height: "0.5vh", background: "white" }}
              ></div>
              <div>
                <Box
                  value={"8 × 10"}
                  style={{
                    height: "7vh",
                    fontSize: "2vw",
                    border: "none",
                    background: "none",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={
                <Fraction numerator={12} denominator={8} fontSize="2.5vw" />
              }
              style={{
                height: "13vh",
                border: "none",
                background: "none",
                color: "white",
                width: "6vw",
              }}
            />
          </div>
          <div
            className="align-row"
            style={{
              gridTemplateColumns:
                "minmax(18vw, 1fr) 2.5vw 10.2vw 3vw 10vw 1.5vw 5vw",
            }}
          >
            <p style={{ color: "white" }}>{t("sceneTen.simplestForm")}</p>
            <p style={{ color: "white" }}>=</p>
            <div className="fraction-wrapper">
              <div className="fraction-row">
                <p style={{ color: "white" }}>12 ÷</p>
                <Box
                  value={4}
                  style={{
                    border: "none",
                    background: "none",
                    color: "white",
                    width: "4vw",
                  }}
                />
              </div>
              <div className="fraction-divider"></div>
              <div className="fraction-row">
                <p style={{ color: "white" }}>8 ÷</p>
                <Box
                  value={4}
                  style={{
                    border: "none",
                    background: "none",
                    color: "white",
                    width: "4vw",
                  }}
                />
              </div>
            </div>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={
                <Fraction numerator={3} denominator={2} fontSize="2.5vw" />
              }
              style={{
                height: "13vh",
                width: "7vw",
                border: "none",
                background: "none",
                color: "white",
              }}
            />
          </div>

          <div
            className="align-row"
            style={{
              gridTemplateColumns:
                "minmax(18vw, 1fr) 2.5vw 9.2vw 0vw 6vw 1.5vw 5vw",
            }}
          >
            <p style={{ color: "white" }}>{t("sceneEleven.lengthWidth")}</p>
            <p style={{ color: "white" }}>=</p>
            <p style={{ color: "white" }}>3 : 2</p>
          </div>
          {next && (
            <div
              style={{
                position: "absolute",
                width: "60vw",
                height: "76vh",
                background: "rgba(0, 0, 0, 0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1.3vw",
                top: "0%",
                left: "0%",
              }}
            >
              <p style={{ fontSize: "3vw", textAlign: "center" }}>
                {t("sceneTwelve.theSmallerFrame")}
              </p>
            </div>
          )}
        </div>

        <div className="keypad">
          <FrameImageSlide setNext={setNext} />
        </div>
      </div>

      <div className="footer">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        {!next && <p>{t("navigation.slideToMove")}</p>}
        {next && <p>{t("navigation.tapContinue")}</p>}
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button onClick={handleClick}>{t("buttons.next")}</button>
            <Tap onClick={handleClick} bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneTwelve;
