import React from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
import LengthDistanceTable from "./LengthDistanceTable";
import indonesiamap from "../../assets/indonesiamap.png";
import Keypad from "../Keypad";
const SceneThree = ({ goNext, goPrev }) => {
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
          <Keypad />
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
        <p
          style={{
            fontSize: "2.5vw",
          }}
        >
          {t("instructions.tapTheMap")}
        </p>
        <div>
          <button className="disabled">{t("buttons.next")}</button>
        </div>
      </div>
    </div>
  );
};

export default SceneThree;
