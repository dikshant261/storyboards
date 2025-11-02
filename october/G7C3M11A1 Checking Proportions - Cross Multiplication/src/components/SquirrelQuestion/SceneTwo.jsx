import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
import FrameImagTwoBlue from "./FrameImagTwoBlue";
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
          <span>{t("sceneTwo.clickIf")} </span>
          <span
            style={{
              color: "white",
            }}
          >
            {t("sceneTwo.ratioOfRed")} </span>
          <span> {t("sceneTwo.inPaintA")}</span>
        </p>
      </div>
      <div className="main">
        <div className="image-1">
          <p>{t("paintA")}</p>
          <FrameImagTwo width="8vw" redml={25} blueml={15} />
        </div>
        <div className="image-2">
          <p>{t("paintB")}</p>
          <FrameImagTwo width="10vw" redml={50} blueml={20} />
        </div>
        <div className="keypad">
          <p className="para">{t("sceneTwo.keypadHeading")}</p>
        </div>
      </div>
      <div className="footer">
        <button onClick={()=>{
          playClick();
          goPrev();
        }}>{t("buttons.previous")}</button>
        <p>{t("navigation.tapStart")}</p>
        <div>
          <button onClick={handleClick}>{t("buttons.next")}</button>
          <Tap onClick={handleClick} bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
