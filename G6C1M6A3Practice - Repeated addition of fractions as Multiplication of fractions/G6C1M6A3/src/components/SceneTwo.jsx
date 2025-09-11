import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ConvertFraction from "./ConvertFraction";
import Box from "./Box";
import tap from '../assets/tap.gif';
import { playClick } from "./PlayAudio";
const SceneTwo = ({question,onNext,onPrev}) => {
  const { t } = useTranslation();
  const handleNext=()=>{
    playClick();
    onNext();
  }
  const handlePrev=()=>{
  playClick();
  onPrev();
  }
  return (
    <div className="scene-container">
      <div className="scene-container-heading">
        {t("let_write_multilpication")}
      </div>
      <div className="scene-container-question">
        <ConvertFraction question={question}/>
        <Box/>
      </div>
      <div className="scene-container-footer">
        <button className="nxt-btn" onClick={handlePrev}>◀</button>
        <p>{t("tap_proceed")}</p>
        <div>
        <button className="nxt-btn" onClick={handleNext}>▶</button>
        <img src={tap} alt="tap" className="tap"/>
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
