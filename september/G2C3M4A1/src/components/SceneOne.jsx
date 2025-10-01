import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import images from "../assets";
import { playClick } from "./PlayAudio";
const SceneOne = ({ onNext }) => {
  const { t } = useTranslation();

  const handleNext = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-conatiner">
      <div className="heading">
        <p>{t("sceneOne.look")}</p>
      </div>
      <div className="main-container" style={{ paddingLeft: "3vw" }}>
        <div className="imgae-align">
          <img src={images.cakeone} className="cake" loading="lazy" />
          <img src={images.boy} className="human" loading="lazy" />
        </div>
        <div
          className="imgae-align"
          style={{ gap: "0vw", paddingTop: "3vw", paddingLeft: "3vw" }}
        >
          <img
            src={images.caketwo}
            className="cake"
            style={{ width: "28vw" }}
            loading="lazy"
          />
          <img
            src={images.girl}
            className="human"
            style={{ width: "13vw", paddingTop: "4vw" }}
            loading="lazy"
          />
        </div>
        <div className="imgae-align">
          <img
            src={images.cakethree}
            className="cake"
            style={{ width: "32vw" }}
            loading="lazy"
          />
          <img
            src={images.man}
            className="human"
            style={{ width: "17vw" }}
            loading="lazy"
          />
        </div>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        <p>{t("sceneOne.tapToSee")}</p>
        <div>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <Tap bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneOne;
