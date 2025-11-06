import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
import FrameImag from "./FrameImage";
const SceneTwo = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    playClick();
    goNext();
  };
  return (
    <div className="scenetwo-container">
      <div className="heading">
        <p>
          <span>{t("sceneTwo.aFrameMeasure")} </span>
          <span
            style={{
              color: "white",
            }}
          >
            {t("sceneTwo.measurement")}{" "}
          </span>
          <span> {t("sceneTwo.whatIs")}</span>
        </p>
      </div>
      <div className="main">
        <div className="main-content">
          <p style={{textAlign:'center'}}>{t("sceneTwo.showsTheMeasurement")}</p>
        </div>
        <div className="keypad" style={{
          padding:"2vh"
        }}>
          <FrameImag />
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
        <p>{t("navigation.tapContinue")}</p>
        <div>
          <button onClick={handleClick}>{t("buttons.next")}</button>
          <Tap onClick={handleClick} bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
