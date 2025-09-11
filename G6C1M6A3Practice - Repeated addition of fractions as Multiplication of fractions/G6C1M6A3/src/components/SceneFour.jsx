import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import ConvertFraction from "./ConvertFraction";
import Box from "./Box";
import BoxTwo from "./BoxTwo";
import Option from "./Option";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import SimpleBox from "./SimpleBox";
import FractionNuber from "./FractionNuber";
import ErrorMessage from "./ErrorMessage";
import OptionTwo from "./OpttionTwo";
import ConvertFractionTwo from "./ConvertFractionTwo";
const SceneFour = ({ question, onNext,flag,numberString,onPrev }) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [red, setRed] = useState("");
  const [showAns, setShowAns] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const checkResponse = (num) => {
    if (num === question[2]) {
      playCorrect();
      setAnswer(num);
      setShowAns(true);
      setStepOne(false);
      setShowError(true);
    } else {
      playWrong();
      setAnswer(num);
      setRed("wrong");
      setShowError(true);
    }
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev=()=>{
    playClick();
    onPrev()
  }
  return (
    <div className="scenethree-container">
      <div className="scenethree-container-heading">
        <div className="heading-align">
          <p>
            {t("how_many_times")}</p>
            <span className="heading-fraction">
              <span>{question[0]}</span>
              <span className="heading-fraction-line"></span>
              <span>{question[1]}</span>
            </span>
            {t("added")}
        </div>
      </div>
      <div className="scenethree-container-main">
        <div className="scenethree-container-main-question">
          <ConvertFractionTwo question={question} answer={answer}/>
          <div className="box-align">
            {stepOne && (
              <BoxTwo
                stepOne={stepOne}
                answer={answer}
                question={question}
                red={red}
              />
            )}
            {showAns && <p>{question[2]}</p>}
            <p>X</p>
            <FractionNuber question={question} />
          </div>
        </div>
        <div className="scenethree-container-main-option">
          <OptionTwo
            question={question}
            response={checkResponse}
            answer={answer}
          />
          {stepOne && (
            <img src={tap} style={{ width: "4vw", objectFit: "contain" }} />
          )}
          {errorShow && <ErrorMessage answer={answer} question={question} flag={flag} numberString={numberString}/>}
        </div>
      </div>
      <div className="scenethree-container-footer">
        <button className="nxt-btn" onClick={handlePrev}>◀</button>
        {stepOne && <p>{t("tapAnswer")}</p>}
        {showAns && <p>{t("tapContinue")}</p>}
        <div>
          {stepOne && <button className="nxt-btn" >▶</button>}
          {showAns && (
            <div>
              <button className="nxt-btn" onClick={handleNext}>
                ▶
              </button>
              <img src={tap} alt="tap" className="tap" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneFour;
