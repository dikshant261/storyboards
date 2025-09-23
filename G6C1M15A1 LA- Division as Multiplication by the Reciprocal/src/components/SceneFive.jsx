import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import BoxFour from "./BoxFour";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
const SceneFive = ({ onNext, onPrev }) => {
  const { t } = useTranslation();

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrvious = () => {
    playClick();
    onPrev();
  };
  return (
    <div className="scene-conatainer">
      <div className="scene-conatainer-heading">
        <p>{t("sceneFiveHeading")}</p>
      </div>
      <div
        className="scene-conatainer-main"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "2vh 2vw",
        }}
      >
        <div className="box-align">
          <BoxFour
            number={1}
            divisor={3}
            style={{ backgroundColor: "#ff9c6a" }}
          />
          <BoxFour
            number={2}
            divisor={3}
            style={{ backgroundColor: "#0097a7" }}
          />
        </div>
        <Result />
        {/* <p>{t("weCanWrite")}</p> */}
      </div>
      <div className="scene-conatainer-footer-heading">
        <p>{t("navigation.tapNextQuestion")}</p>
      </div>
      <div className="scene-conatainer-footer-buttons">
        <button onClick={handlePrvious}>{t("buttons.previous")}</button>
        <ProgressBar current={5}/>
        <div style={{ position: "relative" }}>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <img src={tap} className="tap" />
        </div>
      </div>
    </div>
  );
};

export default SceneFive;
