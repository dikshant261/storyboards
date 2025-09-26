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
const SceneThree = ({ question,onNext,onPrev }) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [red, setRed] = useState("");
  const [showAns,setShowAns]=useState(false);
  const [errorShow,setShowError]=useState(false);
  const checkResponse = (num) => {
    if (num === `${question[0]}/${question[1]}`) {
      playCorrect();
      setAnswer(num);
      setShowAns(true);
      setStepOne(false);
      setShowError(true)
    } else {
      playWrong();
      setAnswer(num);
      setRed("wrong");
      setShowError(true);
    }
  };
  const handleNext=()=>{
    playClick();
    onNext();
  }
  const handlePrev=()=>{
    playClick();
    onPrev();
  }
  return (
    <div className="scenethree-container">
      <div className="scenethree-container-heading">
        {t("addesReapeatedly")}
      </div>
      <div className="scenethree-container-main">
        <div className="scenethree-container-main-question">
          <ConvertFraction question={question} />
          <div className="box-align">
            <SimpleBox />
            <p>X</p>
            {stepOne && (
              <BoxTwo
                stepOne={stepOne}
                answer={answer}
                question={question}
                red={red}
              />
            )}
            {showAns && <FractionNuber question={question}/>}
          </div>
        </div>
        <div className="scenethree-container-main-option">
          <Option question={question} response={checkResponse} answer={answer} />
          {stepOne && (
            <img src={tap} style={{ width: "4vw", objectFit: "contain" }} />
          )}
          {
            errorShow && <ErrorMessage answer={answer} question={question}/>
          }
        </div>
      </div>
      <div className="scenethree-container-footer">
        <button className="nxt-btn" onClick={handlePrev}>◀</button>
        {stepOne && <p>{t("tapAnswer")}</p>}
        {showAns && <p>{t("tapContinue")}</p>}
        <div>
          {stepOne && <button className="nxt-btn">▶</button>}
          {showAns && <div><button className="nxt-btn" onClick={handleNext}>▶</button>
             <img src={tap} alt="tap" className="tap"/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default SceneThree;
