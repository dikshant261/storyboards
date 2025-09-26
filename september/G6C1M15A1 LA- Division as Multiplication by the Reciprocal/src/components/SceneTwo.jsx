import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import Boxes from "./Boxes";
import ProgressBar from "./ProgressBar";
const SceneTwo = ({ onNext, onPrev }) => {
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
        <p>{t("sceneTwo.question")}</p>
      </div>
      <div
        className="scene-conatainer-main"
        style={{ justifyContent: "flex-start" }}
      >
        <div className="question-align">
          <Question
            divisor={2}
            dividend={3}
            style={{
              fontSize: "6vw",
              gap: "1vw",
              border: "0.3vw solid white",
              backgroundColor: "#23496ebf",
              borderRadius: "1vw",
              padding: "1vh 1vw",
            }}
          />
        </div>
        <div className="box-align">
          <Boxes
            number={1}
            style={{
              backgroundColor: "#ff9c6a",
            }}
          />
          <Boxes
            number={2}
            style={{
              backgroundColor: "#0097a7",
            }}
          />
        </div>
      </div>
      <div className="scene-conatainer-footer-heading">
        <p>{t("navigation.tapNext")}</p>
      </div>
      <div className="scene-conatainer-footer-buttons">
        <button onClick={handlePrvious}>{t("buttons.previous")}</button>
        <ProgressBar current={2}/>
        <div style={{ position: "relative" }}>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <img src={tap} className="tap" />
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
