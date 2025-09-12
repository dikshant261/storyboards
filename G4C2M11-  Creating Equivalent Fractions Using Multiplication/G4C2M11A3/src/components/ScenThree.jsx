import React from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
import Fraction from "./Fraction";
import { playClick } from "./PlayAudio";
const SceneThree = ({ question,onNext,onPrev }) => {
  const { t } = useTranslation();

  const handleNext=()=>{
    playClick();
    onNext();
  }
  const handlePrevOne=()=>{
    playClick();
    onPrev();
  }
  return (
    <div className="scene-container">
      <div className="scene-container-heading">
        <p style={{ textAlign: "center" }}>
          {t("let_find_divide")} {" "}
          <span className="fraction-inline-align">
            <span className="fraction-question">
              <span>{question[0]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[1]}</span>
            </span>
          </span>{" "}
          {t("to_get")} {" "}
          <span className="fraction-inline-align">
            <span className="fraction-question">
              <span>{question[2]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[3]}</span>
            </span>
          </span>
          .
        </p>
      </div>
      <div className="scene-container-main">
        <div className="question-align">
          <Fraction num={question[0]} deno={question[1]} />
          <p>=</p>
          <Fraction num={question[2]} deno={question[3]} />
        </div>
      </div>
      <div className="scene-container-footer">
        <button className="nxt-btn" onClick={handlePrevOne}>◀</button>
        <p>{t("tapNext")}</p>
        <div>
          <button className="nxt-btn" onClick={handleNext}>▶</button>
          <img src={tap} className="tap-gif-one" alt="tap" />
        </div>
      </div>
    </div>
  );
};

export default SceneThree;
