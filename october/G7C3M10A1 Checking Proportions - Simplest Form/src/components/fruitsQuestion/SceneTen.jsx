import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
const SceneTen = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    playClick();
    goNext();
  };
  return (
    <div className="scenetwo-container">
      <div className="heading">{t("sceneTwo.heading")}</div>
      <div className="main">
        <div className="image-1">
          <p>{t("frameA")}</p>
          <FrameImagTwo width="21vw" height={"44vh"} length={10} breadth={6} />
        </div>
        <div className="image-2">
          <p>{t("frameB")}</p>
          <FrameImagTwo
            width="17vw"
            height={"30vh"}
            length={10}
            breadth={8}
            lineWidth={"79%"}
            left={"-27%"}
          />
        </div>
        <div className="image-3">
          <p>{t("frameC")}</p>
          <FrameImagTwo
            width="21vw"
            length={15}
            breadth={9}
            lineWidth={"85%"}
            left={"-31%"}
          />
        </div>
        <div className="keypad">
          <p className="para">{t("sceneTwo.keypadHeading")}</p>
        </div>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        <p>{t("navigation.tapStart")}</p>
        <div>
          <button onClick={handleClick}>{t("buttons.next")}</button>
          <Tap onClick={handleClick} bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneTen;
