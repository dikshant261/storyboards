import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick } from "./PlayAudio";
import ProgressBar from "./ProgressBar";
const SceneOne = ({ onNext, onPrev }) => {
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
        <p>{t("sceneOne.contentHeading")}</p>
      </div>
      <div className="scene-conatainer-main">
        <Question
          divisor={2}
          dividend={3}
          style={{
            fontSize: "19vw",
            gap: "2vw",
          }}
        />
      </div>
      <div className="scene-conatainer-footer-heading">
        <p>{t("navigation.tapNext")}</p>
      </div>
      <div className="scene-conatainer-footer-buttons">
        <button onClick={handlePrvious}>{t("buttons.previous")}</button>
        <ProgressBar current={1}/>
        <div style={{ position: "relative" }}>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <img src={tap} className="tap" />
        </div>
      </div>
    </div>
  );
};

export default SceneOne;
