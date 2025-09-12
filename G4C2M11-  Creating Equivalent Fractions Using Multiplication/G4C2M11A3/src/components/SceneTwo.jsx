import React, { useState } from "react";
import "./scenetwo.css";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import MultiplyFraction from "./MultiplyFraction";
import Keypad from "./Keypad";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import ErrorMessgae from "./ErrorMessgae";
const SceneTwo = ({ question,onNext,onPrev }) => {
  const { t } = useTranslation();
  const [beat, setBeat] = useState(true);
  const [result, setResult] = useState(null);
  const [green, setGreen] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [next, setNext] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const handleResponse = (num) => {
    playClick();
    setGreen("");
    setErrorShow(false);
    setResult(num);
  };
  const checkHandle = () => {
    if (
      result * question[0] === question[2] &&
      result * question[1] === question[3]
    ) {
      playCorrect();
      setGreen("correct");
      setErrorShow(true);
      setBeat(false);
      setNext(true);
      setStepOne(false);
    } else {
      playWrong();
      setGreen("wrong");
      setErrorShow(true);
    }
  };
  const handleNext=()=>{
    playClick();
    setErrorShow(false);
    onNext()
  }
  const handlePrevOne=()=>{
    playClick();
    onPrev();
  }
  return (
    <div className="scene-two-container">
      <div className="scene-two-container-heading">
        <p style={{ textAlign: "center" }}>
          {t("what_number_should")}{" "}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[0]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[1]}</span>
            </span>
          </span>{" "}
          {t("multiplied_to_get")}{" "}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[2]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[3]}</span>
            </span>
          </span>
          .
        </p>
      </div>
      <div className="scene-two-container-main">
        <div className="scene-two-container-main-question">
          <div className="question-align">
            <Fraction num={question[0]} deno={question[1]} fontSize={"6vw"} />
            <p>=</p>
            <MultiplyFraction
              num={question[0]}
              deno={question[1]}
              beat={beat}
              result={result}
              green={green}
            />
            <p>=</p>
            <Fraction num={question[2]} deno={question[3]} fontSize={"6vw"} />
          </div>
        </div>
        <div className="scene-two-container-main-question-option">
          {errorShow && <ErrorMessgae question={question} result={result} />}
          <Keypad
            response={handleResponse}
            checkHandle={checkHandle}
            stepOne={stepOne}
          />
        </div>
      </div>
      <div className="scene-two-container-main-footer">
        <button className="nxt-btn" onClick={handlePrevOne}>◀</button>
        {stepOne && <p>{t("tap_number")}</p>}
        {next && <p>{t("nextContinue")}</p>}
        {stepOne && <button className="nxt-btn">▶</button>}
        {next && (
          <div>
            <button className="nxt-btn" onClick={handleNext}>
              ▶
            </button>
            <img src={tap} className="tap-gif-one" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneTwo;
