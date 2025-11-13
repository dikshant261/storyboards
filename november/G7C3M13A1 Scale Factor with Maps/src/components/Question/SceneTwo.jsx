import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
import LengthDistanceTable from "./LengthDistanceTable";
import indonesiamap from "../../assets/indonesiamap.png";
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
          <span>{t("sceneTwo.observeTheMap")} </span>
        </p>
      </div>
      <div className="main">
        <div className="image-1">
          <LengthDistanceTable />
        </div>
        <div className="image-2">
          <img
            src={indonesiamap}
            alt="Map of Indonesia"
            style={{
              width: "27vw",
              borderRadius: "1.3vw",
            }}
          />
        </div>
        <div className="keypad">
          <p className="para">{t("sceneTwo.letSolve")}</p>
        </div>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        <p>{t("instructions.readThenTap")}</p>
        <div>
          <button onClick={handleClick}>{t("buttons.next")}</button>
          <Tap onClick={handleClick} bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
