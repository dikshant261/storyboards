import React, { useState } from "react";
import "./main.css";
import { useSSR, useTranslation } from "react-i18next";
import Catimage from "./Catimage";
import DogAndCatOption from "./DogAndCatOption";
import ResultBox from "./ResultBox";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import tap from "../assets/tap.gif";
import FooterButtons from "./FooterButtons";
import TableImage from "./TableImage";
import TableOption from "./TableOption";
import AppleImage from "./AppleImage";
import AppleOption from "./AppleOption";
import ResultBoxTwo from "./ResultBoxTwo";

const MainFour = ({
  onNext,
  options,
  correctOption,
  question,
  boxOneHeading,
  boxTwoHeading,
  questionHeading,
  flag,
  onPrev,
}) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = React.useState(true);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [boxResultOne, setBoxResultOne] = React.useState("");
  const [boxOneCss, setBoxOneCss] = React.useState("");
  const [showErrorOne, setShowErrorOne] = React.useState(false);
  const [boxResultTwo, setBoxResultTwo] = React.useState("");
  const [boxTwoCss, setBoxTwoCss] = React.useState("");
  const [showErrorTwo, setShowErrorTwo] = React.useState(false);
  const [boxResultThree, setBoxResultThree] = React.useState("");
  const [boxThreeCss, setBoxThreeCss] = React.useState("");
  const [showErrorThree, setShowErrorThree] = React.useState(false);
  const [tapProceed, setTapProceed] = React.useState(false);
  const [disabledNext, setDisabledNext] = React.useState(true);
  const [nextOne, setNextOne] = React.useState(false);
  const [nextTwo, setNextTwo] = React.useState(false);
  const [tapRatio, setTapRatio] = React.useState(true);
  const [beat, setBeat] = React.useState(true);
  const [beatOne, setBeatOne] = React.useState(false);
  const [btnTwo, setBtnTwo] = React.useState(false);
  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setBeat(false);
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
    setBeatOne(true);
    setDisabledNext(true);
    setTapRatio(true);
    setStepTwo(true);
    setBtnTwo(true);
  };

  const handleBoxResultTwo = (option) => {
    if (!stepTwo) return;
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setTapProceed(true);
      setBeatOne(false);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
      setBtnTwo(false);
    } else {
      playWrong();
      setBoxTwoCss("incorrect");
      setShowErrorTwo(true);
    }
  };

  const handleProceed = () => {
    playClick();
    setStepTwo(false);
    onNext();
  };

  const handlePrevOne = () => {
    playClick();
    onPrev();
  };

  const handlePrevTwo = () => {
    playClick();
    setStepTwo(false);
    setBtnTwo(false);
    setBeat(true);
    setBeatOne(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
    setBoxResultTwo("");
    setBoxTwoCss("");
    setNextOne(false);
    setShowErrorOne(false);
  };
  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setBtnTwo(true);
    setBoxTwoCss("");
    setShowErrorTwo(false);
    setBoxResultTwo("");
    setTapRatio(true);
    setStepTwo(true);
    setDisabledNext(true);
    setBeatOne(true);
  };
  return (
    <div className="main">
      <div className="main-heading">{t(questionHeading)}</div>
      <div className="main-content">
        <div className="image-container">
          <div className="image-box">
            <AppleImage />
          </div>
          <div className="answer-box">
            <ResultBoxTwo
              beat={beat}
              beatOne={beatOne}
              stepOne={stepOne}
              stepTwo={stepTwo}
              boxOneHeading={boxOneHeading}
              boxTwoHeading={boxTwoHeading}
              stepThree={stepThree}
              boxResultOne={boxResultOne}
              boxOneCss={boxOneCss}
              boxResultTwo={boxResultTwo}
              boxTwoCss={boxTwoCss}
              boxResultThree={boxResultThree}
              boxThreeCss={boxThreeCss}
              style={{ gap: "7vw" }}
            />
          </div>
        </div>
        <div className="option-box">
          <AppleOption
            options={options}
            correctOption={correctOption}
            flag={flag}
            boxResultSet={
              stepOne
                ? handleBoxResultOne
                : stepTwo
                ? handleBoxResultTwo
                : () => {}
            }
            stepOne={stepOne}
            stepTwo={stepTwo}
            boxResultOne={boxResultOne}
            boxResultTwo={boxResultTwo}
            showErrorOne={showErrorOne}
            showErrorTwo={showErrorTwo}
            style={{
             fontSize:"3vw" 
            }}
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
        stepTwo={btnTwo}
        stepThree={stepThree}
        tapProceed={tapProceed}
        handleNextOne={handleNextOne}
        handleProceed={handleProceed}
        handlePrevOne={handlePrevOne}
        handlePrevTwo={handlePrevTwo}
        handlePrevFour={handlePrevFour}
      />
    </div>
  );
};

export default MainFour;
