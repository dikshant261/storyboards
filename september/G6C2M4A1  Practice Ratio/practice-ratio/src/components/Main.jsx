import React, { useState } from "react";
import "./main.css";
import {  useTranslation } from "react-i18next";
import Catimage from "./Catimage";
import DogAndCatOption from "./DogAndCatOption";
import ResultBox from "./ResultBox";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import tap from "../assets/tap.gif";
import FooterButtons from "./FooterButtons";
const Main = ({ onNext, options, correctOption,onPrev }) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [boxResultOne, setBoxResultOne] = useState("");
  const [boxOneCss, setBoxOneCss] = useState("");
  const [showErrorOne, setShowErrorOne] = useState(false);
  const [boxResultTwo, setBoxResultTwo] = useState("");
  const [boxTwoCss, setBoxTwoCss] = useState("");
  const [showErrorTwo, setShowErrorTwo] = useState(false);
  const [boxResultThree, setBoxResultThree] = useState("");
  const [boxThreeCss, setBoxThreeCss] = useState("");
  const [showErrorThree, setShowErrorThree] = useState(false);
  const [tapProceed, setTapProceed] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);
  const [nextOne, setNextOne] = useState(false);
  const [nextTwo, setNextTwo] = useState(false);
  const [tapRatio, setTapRatio] = useState(true);
  
  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorOne(true);
    } else {
      playWrong();
      setBoxOneCss("incorrect");
      setShowErrorOne(true);
    }
  };
  const handleNextOne = () => {
    playClick();
    setNextOne(false);
    setShowErrorOne(false);
    setStepOne(false);
    setDisabledNext(true);
    setTapRatio(true);
    setStepTwo(true);
  };
  const handleBoxResultTwo = (option) => {
    if (!stepTwo) return;
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setNextTwo(true);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
    } else {
      playWrong();
      setBoxTwoCss("incorrect");
      setShowErrorTwo(true);
    }
  };

  const handleNextTwo = () => {
    playClick();
    setNextTwo(false);
    setShowErrorTwo(false);
    setStepThree(true);
    setStepTwo(false);
    setDisabledNext(true);
    setTapRatio(true);
  };

  const handleBoxResultThree = (option) => {
    if (!stepThree) return;
    setBoxResultThree(option);
    if (option === correctOption[2]) {
      playCorrect();
      setBoxThreeCss("correct");
      setTapRatio(false);
      setDisabledNext(false);
      setTapProceed(true);
      setShowErrorThree(true);
      setTapProceed(true);
    } else {
      playWrong();
      setBoxThreeCss("incorrect");
      setShowErrorThree(true);
    }
  };
  const handleProceed = () => {
    playClick();
    setStepThree(false);
    onNext();
  };
  const handlePrevOne = () => {
    playClick();
    onPrev();
  }
  const handlePrevTwo = () => {
    playClick();
    setStepTwo(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
  }
  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setStepTwo(true);
    setBoxResultTwo("");
    setBoxTwoCss("");
  }
 
  return (
    <div className="main">
      <div className="main-heading">{t("representingRatios")}</div>
      <div className="main-content">
        <div className="image-container">
          <div className="image-box">
            <Catimage />
          </div>
          <div className="answer-box">
            <ResultBox
              stepOne={stepOne}
              stepTwo={stepTwo}
              stepThree={stepThree}
              boxResultOne={boxResultOne}
              boxOneCss={boxOneCss}
              boxResultTwo={boxResultTwo}
              boxTwoCss={boxTwoCss}
              boxResultThree={boxResultThree}
              boxThreeCss={boxThreeCss}
            />
          </div>
        </div>
        <div className="option-box">
          <DogAndCatOption
            options={options}
            correctOption={correctOption}
            boxResultSet={
              stepOne
                ? handleBoxResultOne
                : stepTwo
                ? handleBoxResultTwo
                : stepThree
                ? handleBoxResultThree
                : () => {}
            }
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
            boxResultOne={boxResultOne}
            boxResultTwo={boxResultTwo}
            boxResultThree={boxResultThree}
            showErrorOne={showErrorOne}
            showErrorTwo={showErrorTwo}
            showErrorThree={showErrorThree}
          />
        </div>
      </div>
      {tapRatio && <div className="footer-heading">{t("tapRatio")}</div>}
      {nextOne && <div className="footer-heading">{t("tapNext")}</div>}
      {nextTwo && <div className="footer-heading">{t("tapNext")}</div>}
      {tapProceed && <div className="footer-heading">{t("proceed")}</div>}
      <FooterButtons
        disabledNext={disabledNext}
        nextOne={nextOne}
        nextTwo={nextTwo}
        stepOne={stepOne}
        stepTwo={stepTwo}
        stepThree={stepThree}
        tapProceed={tapProceed}
        handleNextOne={handleNextOne}
        handleNextTwo={handleNextTwo}
        handleProceed={handleProceed}
        handlePrevOne={handlePrevOne}
        handlePrevTwo={handlePrevTwo}
        handlePrevThree={handlePrevThree}
      
      />
    </div>
  );
};

export default Main;
