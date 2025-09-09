import React, { useState } from "react";
import "./StartPage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import wrong from "../assets/wrong.mp3";
import correct from "../assets/correct.mp3";
import click from "../assets/click.mp3";
import Box from "./Box";
import CarOne from "./Car";
import Keypad from "./Keypad";
import tap from "../assets/tap.gif";
const MainPage = ({ number, onPrev, onNext }) => {
  const { t } = useTranslation();
  const [resultNumber, setResultNumber] = useState(null);
  const [sideHeading, setSideHeading] = useState(true);
  const [showGreen, setShowGreen] = useState("");
  const [nextQuestionHeading, setNextQuestionHeading] = useState(false);
  const [showKeypad,setShowKepad]=useState(true);
  const clickAudio = new Audio(click);
  const wrongAudio = new Audio(wrong);
  const correctAudio = new Audio(correct);
  clickAudio.preload = "auto";
  wrongAudio.preload = "auto";
  correctAudio.preload = "auto";
  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };
  const wrongHandle = () => {
    wrongAudio.currentTime = 0; // reset to start
    wrongAudio.play();
  };
  const correctHandle = () => {
    correctAudio.currentTime = 0; // reset to start
    correctAudio.play();
  };
  const handleNumber = (num) => {
    setShowGreen("");
    setResultNumber(num);
  };
  const handleError = () => {
    if (number[0] - number[1] === resultNumber) {
      correctHandle();
      setSideHeading(false);
      setShowGreen("correct");
      setShowKepad(false);
      setNextQuestionHeading(true);
    } else {
      wrongHandle();
      setShowGreen("wrong");
    }
  };
  const handlePrev = () => {
    clickHandle();
    setSideHeading(true);
    setShowGreen("");
    setNextQuestionHeading(false);
    onPrev();
  };
  const handleNext = () => {
    clickHandle();
    setSideHeading(true);
    setShowGreen("");
    setNextQuestionHeading(false);
    onNext();
  };
  return (
    <div className="container">
      <div className="container-left">
        {sideHeading && (
          <div>
            {" "}
            <p>
              {t("There_are_total_cars_in_picture", {
                total: number[0],
                cross: number[1],
              })}
            </p>
            <p>{t("Count_and_complete_the")}</p>
          </div>
        )}
        {nextQuestionHeading && (
          <div>
            <p>{t("sentanceOne", { cross: number[1], total: number[0] })}</p>
            <p>{t("sentanceTwo", { cross: number[1], total: number[0] })}</p>
            <p>{t("sentanceThree", { cross: number[1], total: number[0] })}</p>
          </div>
        )}
      </div>
      <div className="container-right">
        <div className="container-right-main">
          <div className="container-right-car">
            <Box
              numberOne={number[0]}
              numberTwo={number[1]}
              numberThree={resultNumber}
              flag="true"
              showGreen={showGreen}
            />
            <CarOne totalCars={number[0]} crossCars={number[1]} />
          </div>
          <div className="container-right-keypad">
            <Keypad
              onNumberClick={handleNumber}
              numbers={number}
              handleError={handleError}
              showKeypad={showKeypad}
            />
          </div>
        </div>
        <div className="container-right-description-heading">
          {sideHeading && <p>{t("tap_and_check")}</p>}
          {nextQuestionHeading && <p>{t("nextQuestion")}</p>}
        </div>
        <div className="container-right-button">
          <button className="next-btn" onClick={handlePrev}>
            ◀
          </button>
          {/* <button  className="next-btn">▶</button>   */}
          {nextQuestionHeading && (
            <div
              style={{
                position: "relative",
              }}
            >
              {" "}
              <button className="next-btn" onClick={handleNext}>
                ▶
              </button>
              <img
                src={tap}
                alt="tap"
                style={{
                  position: "absolute",
                  top: 0,
                  width: "3vw",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
