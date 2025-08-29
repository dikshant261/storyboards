import React, { useRef, useState } from "react";
import "./Main.css";
import { useTranslation } from "react-i18next";
import CarOne from "./Car";
import click from "../assets/click.mp3";
import wrong from "../assets/wrong.mp3";
import correct from "../assets/correct.mp3";
import Keypad from "./Keypad";
import ErrorMessage from "./ErrorMessageOne";
import ErrorMessageTwo from "./ErrorMessageTwo";
import ErrorMessageThree from "./ErrorMessageThree";
const Main = ({ onNext, question }) => {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [numberOne, setNumberOne] = useState(null);
  const [numberTwo, setNUmberTwo] = useState(null);
  const [numberThree, setNumberThree] = useState(null);
  const [boxBoundaryOne, setBoxBoundaryOne] = useState("normal-box");
  const [boxBoundaryTwo, setBoxBoundaryTwo] = useState("normal-box");
  const [boxBoundaryThree, setBoxBoundaryThree] = useState("normal-box");
  const [nextButtonOne, setNextButtonOne] = useState(false);
  const [nextButtonTwo, setNextButtonTwo] = useState(false);
  const [erroShowOne, setErrorShowOne] = useState(false);
  const [erroShowTwo, setErrorShowTwo] = useState(false);
  const [erroShowthree, setErrorShowThree] = useState(false);
  const [keypadShow, setKeypadShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const { t } = useTranslation();

  const clickAudio = new Audio(click);
  const correctAudio=new Audio(correct);
  const wrongAudio=new Audio(wrong);
    clickAudio.preload = "auto";
    correctAudio.preload="auto";
    wrongAudio.preload="auto";
    const clickHandle = () => {
      clickAudio.currentTime = 0; 
      clickAudio.play();
    };
    const correctHandle=()=>{
      correctAudio.currentTime=0;
      correctAudio.play();
    }
    const wrongHandle=()=>{
      wrongAudio.currentTime=0;
      wrongAudio.play();
    }

  const handleNumberOne = (num) => {
    setErrorShowOne(false);
    setBoxBoundaryOne("normal-box");
    setNumberOne(num);
  };

  const checkOne = () => {
    if (numberOne === question[0]) {
      correctHandle();
      setStepOne(false);
      setErrorShowOne(true);
      setBoxBoundaryOne("correct");
      setNextButtonOne(true);
    } else {
      wrongHandle();
      setErrorShowOne(true);
      setBoxBoundaryOne("wrong");
    }
  };
  const handleNextOne = () => {
    clickHandle();
    setNextButtonOne(false);
    setErrorShowOne(false);
    setStepTwo(true);
  };
  const handleNumberTwo = (num) => {
    setErrorShowTwo(false);
    setBoxBoundaryTwo("normal-box");
    setNUmberTwo(num);
  };

  const checkTwo = () => {
    if (numberTwo === question[1]) {
      correctHandle();
      setStepTwo(false);
      setErrorShowTwo(true);
      setBoxBoundaryTwo("correct");
      setNextButtonTwo(true);
    } else {
      wrongHandle();
      setErrorShowTwo(true);
      setBoxBoundaryTwo("wrong");
    }
  };
  const handleNextTwo = () => {
    clickHandle()
    setErrorShowTwo(false);
    setStepThree(true);
    setNextButtonTwo(false);
  };
  const handleNumberThree = (num) => {
    setErrorShowThree(false);
    setBoxBoundaryThree("normal-box");
    setNumberThree(num);
  };
  const checkThree = () => {
    if (numberThree === question[2]) {
      correctHandle();
      setStepThree(false);
      setErrorShowThree(true);
      setBoxBoundaryThree("correct");
      setShowNext(true);
    } else {
      wrongHandle();
      setErrorShowThree(true);
      setBoxBoundaryThree("wrong");
    }
  };
  const handleNext = () => {
    clickHandle();
    setErrorShowThree(false);
    setShowNext(false);
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
    setNumberOne(null);
    setNUmberTwo(null);
    setNumberThree(null);
    onNext();
  };

  console.log(question);
  return (
    <div className="main-container">
      <div className="main-container-left">
        {stepOne && (
          <div>
            <p style={{ fontWeight: 800 }} className="slide-left">
              {t("stepOne")}
            </p>
            <p style={{ marginBottom: "0" }} className="slide-right">
              {t("stepOneProcess")}
            </p>
            <p>{t("countTotal")}</p>
          </div>
        )}
        {nextButtonOne && <p className="slide-up">{t("stepOne")} ✔</p>}
        {stepTwo && (
          <div>
            <p className="slide-right">{t("stepOne")}✔</p>
            <p style={{ fontWeight: 800 }} className="slide-left">
              {t("stepTwo")}
            </p>
            <p className="slide-up">{t("countCross")}</p>
          </div>
        )}
        {nextButtonTwo && (
          <div>
            <p className="slide-right">{t("stepOne")} ✔</p>
            <p className="slide-left">{t("stepTwo")} ✔</p>
          </div>
        )}
        {stepThree && (
          <div>
            <p className="slide-right">{t("stepOne")} ✔</p>
            <p className="slide-right">{t("stepTwo")} ✔</p>
            <p className="slide-right">{t("stepThree")}</p>
            <p className="slide-left">{t("countDifference")}</p>
          </div>
        )}
        {showNext && (
          <div>
            <p className="slide-right">{t("stepOne")} ✔</p>
            <p className="slide-left">{t("stepTwo")} ✔</p>
            <p className="slide-left">{t("stepThree")} ✔</p>
          </div>
        )}
      </div>
      <div className="main-container-right">
        <div className="main-container-right-main">
          <div className="main-container-right-main-car">
            <div className="subtraction-align-box slide-right">
              <div className="subtraction-align-box slide-right">
                <div className={`${boxBoundaryOne} subtraction-image-box`}>
                  {numberOne}
                </div>
                <div className="subtraction-minus-line"></div>

                <div className={`${boxBoundaryTwo} subtraction-image-box`}>
                  {numberTwo}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5vw",
                  }}
                >
                  <div className="subtraction-minus-line"></div>
                  <div className="subtraction-minus-line"></div>
                </div>

                <div className={`${boxBoundaryThree} subtraction-image-box`}>
                  {numberThree}
                </div>
              </div>
            </div>
            <CarOne
              totalCars={parseInt(question[0])}
              crossCars={parseInt(question[1])}
            />
          </div>
          <div className="main-container-right-main-keypad">
            {erroShowOne && (
              <div className="show-in">
                <ErrorMessage question={question} number={numberOne} />
              </div>
            )}
            {erroShowTwo && (
              <div className="show-in">
                <ErrorMessageTwo question={question} number={numberTwo} />
              </div>
            )}
            {erroShowthree && (
              <div>
                <ErrorMessageThree question={question} number={numberThree} />
              </div>
            )}
            {stepOne && <Keypad number={handleNumberOne} check={checkOne} stepOne={stepOne}/>}
            {stepTwo && <Keypad number={handleNumberTwo} check={checkTwo} stepTwo={stepTwo}/>}
            {stepThree && (
              <Keypad number={handleNumberThree} check={checkThree} stepThree={stepThree}/>
            )}
          </div>
        </div>
        <div className="main-container-right-footer">
          {stepOne && <h3>{t("tapNumber")}</h3>}
          {nextButtonOne && <h3>{t("nextBox")}</h3>}
          {showNext && <h3>{t("nextQuestion")}</h3>}
          {stepTwo && <h3>{t("tapNumber")}</h3>}
          {nextButtonTwo && <h3>{t("nextBox")}</h3>}
          {stepThree && <h3>{t("tapNumber")}</h3>}
        </div>
        <div className="main-container-right-footer-2">
          {nextButtonOne && (
            <button className="next-button" onClick={handleNextOne}>
              ▶
            </button>
          )}
          {nextButtonTwo && (
            <button className="next-button" onClick={handleNextTwo}>
              ▶
            </button>
          )}
          {showNext && (
            <button className="next-button" onClick={handleNext}>
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
