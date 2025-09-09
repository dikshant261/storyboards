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
import TriangleImage from "./TriangleImage";
import TriangleBox from "./TriangleBox";

const MainFive = ({
  onNext,
  options,
  correctOption,
  question,
  questionHeading,
  flag,
  onPrev,
}) => {
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
    console.log("option", option);
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setTapProceed(true);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
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
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
  };
  return (
    <div className="main">
      <div className="main-heading">{t(questionHeading)}</div>
      <div className="main-content">
        <div className="image-container">
          <div className="image-box">
            <TriangleImage />
          </div>
          <div className="answer-box">
            <TriangleBox
              stepOne={stepOne}
              stepTwo={stepTwo}
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
        handleProceed={handleProceed}
        handlePrevOne={handlePrevOne}
        handlePrevTwo={handlePrevTwo}
      />
    </div>
  );
};

export default MainFive;
