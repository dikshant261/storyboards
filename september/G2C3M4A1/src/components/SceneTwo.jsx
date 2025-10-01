import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick } from "./PlayAudio";
const SceneTwo = ({onNext}) => {
  const { t } = useTranslation();
  const handleNext=()=>{
    playClick();
    onNext();
  }
  return (
    <div className="scene-conatiner-two">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneTwo.janSpecial")}</p>
          <p>{t("sceneTwo.letCutCake")}</p>
          <div className="triangle">▶</div>
        </div>
        <img
            src={images.rightman}
            style={{ width: "25vw", objectFit: "contain" }}
            loading="lazy"
          />
      </div>
      <div className="right">
        <div className="main-container">
            <img src={images.caketwo} style={{width:"29vw", objectFit:"contain"}}/>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          <p>{t("sceneTwo.tapNext")}</p>
          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
