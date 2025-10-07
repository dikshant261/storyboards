import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick } from "./PlayAudio";
const SceneThree = ({ onNext }) => {
  const { t } = useTranslation();
  const handleNext = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-conatiner-two">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneThree.DeeTee")}</p>
          <p>{t("sceneThree.cutCakeHalf")}</p>
          <div className="triangle" style={{}}>
            ▶
          </div>
        </div>
        <img
          src={images.girl}
          style={{ width: "16vw", objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="right">
        <div className="main-container">
          <img
            src={images.caketwo}
            style={{ width: "29vw", objectFit: "contain" }}
          />
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          <p>{t("sceneThree.tapKnows")}</p>
          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneThree;
