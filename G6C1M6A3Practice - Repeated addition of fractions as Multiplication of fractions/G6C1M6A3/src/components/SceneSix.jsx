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
import OpttionThree from "./OptionThree";
import BoxThree from "./BoxThree";
import FractionMultiply from "./FractionMultiply";
import ErrorMessageTwo from "./ErrorMessageTwo";
import OptionFour from "./OptionFour";
import BoxFour from "./BoxFour";
import FractionOption from "./FractionOption";
import ErrorMessageThree from "./ErrorMessageThree";
const SceneSix = ({ question, onNext, flag,onPrev }) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = useState(true);
  const [answer, setAnswer] = useState({
    num: null,
    deno: null,
  });
  const [red, setRed] = useState("");
  const [showAns, setShowAns] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const checkResponse = (num, deno) => {
    if (num === question[2] * question[0] && deno === question[1]) {
      playCorrect();
      setAnswer({ num, deno });
      setShowAns(true);
      setStepOne(false);
      setShowError(true);
    } else {
      playWrong();
      setAnswer({ num, deno });
      setRed("wrong");
      setShowError(true);
    }
  };
  console.log(answer);
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
        <p>{t("What is the result?")}</p>
      </div>
      <div className="scenethree-container-main">
        <div className="scenethree-container-main-question">
          <ConvertFraction question={question} answer={answer} />
          <div className="box-align">
            <p>{question[2]}</p>
            <p>X</p>
            <FractionNuber question={question} />
            <p>=</p>
            <div className="box-fraction" style={{ fontSize: "6vw" }}>
              <span className="top">
                {question[2]} x {question[0]}
              </span>
              <span className="line"></span>
              <span className="bottom">{question[1]}</span>
            </div>
            <p>=</p>
            {stepOne && (
              <BoxFour
                stepOne={stepOne}
                answer={answer}
                question={question}
                red={red}
              />
            )}
            {showAns && (
              <FractionOption
                numerator={question[2] * question[0]}
                denominator={question[1]}
                fontSize={"6vw"}
              />
            )}
          </div>
        </div>
        <div className="scenethree-container-main-option">
          <OptionFour
            question={question}
            response={checkResponse}
            answer={answer}
          />
          {stepOne && (
            <img src={tap} style={{ width: "4vw", objectFit: "contain" }} />
          )}
          {errorShow && <ErrorMessageThree answer={answer} question={question} />}
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

export default SceneSix;
