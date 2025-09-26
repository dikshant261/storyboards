import React, { useState } from "react";
import "./main.css";
import { useTranslation } from "react-i18next";
import DogAndCatOption from "./DogAndCatOption";
import ResultBox from "./ResultBox";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import FooterButtons from "./FooterButtons";
import AppleImage from "./AppleImage";
import TriangleImage from "./TriangleImage";
import CircleImage from "./CircleImage";
const Main = ({ onNext, options, correctOption, onPrev, boxContent, flag }) => {
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
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [beatThree, setBeatThree] = useState(false);
  const [prevButton, setPrevButton] = useState(false);
  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
      setBeatOne(false);
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
    setBeatTwo(true);
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
      setBeatTwo(false);
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
    setShowErrorThree(false);
    setPrevButton(true);
    setStepThree(true);
    setBeatThree(true);
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
      setBeatThree(false);
      setPrevButton(false);
      setTapProceed(true);
      setShowErrorThree(true);
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
  };
  const handlePrevTwo = () => {
    playClick();
    setStepTwo(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
    setBeatOne(true);
    setBeatTwo(false);
    setNextOne(false);
    setBoxTwoCss("");
    setBoxResultTwo("");
    setDisabledNext(true);
    setTapRatio(true);
  };
  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setStepTwo(true);
    setBoxResultTwo("");
    setBoxTwoCss("");
    setBeatThree(false);
    setNextTwo(false);
    setBeatTwo(true);
    setBoxThreeCss("");
    setBoxResultThree("");
    setDisabledNext(true);
    setTapRatio(true);
    setPrevButton(false);
  };
  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setTapRatio(false);
    setStepThree(true);
    setBeatThree(true);
    setBoxThreeCss("");
    setBoxResultThree("");
    setDisabledNext(true);
    setTapRatio(true);
    setShowErrorThree(false);
    setPrevButton(true);
  };
  return (
    <div className="main">
      <div className="main-heading">{t("main.representingRation")}</div>
      <div className="main-content">
        <div className="image-container">
          <div className="image-box">
            {flag === 0 && <AppleImage />}
            {flag === 1 && <TriangleImage />}
            {flag ===2 && <CircleImage/>}
            {flag===3 && <p>{t("chitraContent.question")}</p>}
          </div>
          <div className="answer-box">
            <ResultBox
              stepOne={stepOne}
              stepTwo={stepTwo}
              stepThree={stepThree}
              beatOne={beatOne}
              beatTwo={beatTwo}
              beatThree={beatThree}
              boxResultOne={boxResultOne}
              boxOneCss={boxOneCss}
              boxResultTwo={boxResultTwo}
              boxTwoCss={boxTwoCss}
              boxResultThree={boxResultThree}
              boxThreeCss={boxThreeCss}
              boxContent={boxContent}
            />
          </div>
        </div>
        <div className="option-box">
          <DogAndCatOption
            options={options}
            correctOption={correctOption}
            flag={flag}
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
      {tapRatio && (
        <div className="footer-heading">{t("main.tapTheRatios")}</div>
      )}
      {nextOne && <div className="footer-heading">{t("main.tapContinue")}</div>}
      {nextTwo && <div className="footer-heading">{t("main.tapContinue")}</div>}
      {tapProceed && (
        <div className="footer-heading">{t("main.tapProceed")}</div>
      )}
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
        handlePrevFour={handlePrevFour}
        prevButton={prevButton}
      />
    </div>
  );
};

export default Main;
