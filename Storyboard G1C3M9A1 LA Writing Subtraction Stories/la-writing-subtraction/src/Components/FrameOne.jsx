import React, { useEffect, useState } from "react";

import "./FrameOne.css";
import imageone from "../assets/imageone.png";
import click from "../assets/click.mp3";
import Option from "./Option";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
const FrameOne = ({ onNext, onPrev }) => {
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [arrowAnimation, setArrowAnimation] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setArrowAnimation(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  //audio variables
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early

  //wrong audio variables
  const clickWrong = new Audio(wrong);
  clickWrong.preload = "auto";

  //right audio variable
  const clickRight = new Audio(right);
  clickRight.preload = "auto";
  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const wrongHandle = () => {
    clickWrong.currentTime = 0;
    clickWrong.play();
  };

  const rightHandle = () => {
    clickRight.currentTime = 0;
    clickRight.play();
  };
  const handleStepOne = () => {
    clickHandle();
    setSideHeadingOne(false);
    setStepOne(true);
  };

  const handleOptionOne = (num) => {
    if (num === 1) {
      rightHandle();
      setStepOne(false);
      setStepTwo(true);
    } else {
      wrongHandle();
    }
  };
  const handleOptionTwo = (num) => {
    if (num === 2) {
      rightHandle();
      setStepTwo(false);
      setStepThree(true);
    } else {
      wrongHandle();
    }
  };
  const handleOptionThree = (num) => {
    if (num === 1) {
      rightHandle();
      setStepThree(false);
      setStepFour(true);
    } else {
      wrongHandle();
    }
  };
  const handleStory = () => {
    clickHandle();
    setStepFour(false);
    setStepFive(true);
  };
  const handleNext = () => {
    clickHandle();
    setStepFive(false);
    setArrowAnimation(false);
    onNext();
  };
  const handleStepPrev = () => {
    onPrev();
  };
  return (
    <div className="frame-contianer">
      <div className="frame-container-left">
        {sideHeadingOne && <p className="slide-left">{t("sideHeadingOne")}</p>}
        {stepOne && (
          <div className="slide-right">
            <p
              style={{
                fontWeight: 900,
                textAlign: "left",
                marginBottom: "1vw",
              }}
            >
              {t("stepOne")}
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("chooseOption")}
            </p>
          </div>
        )}
        {stepTwo && (
          <div className="slide-mid">
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                fontWeight: 900,
                textAlign: "left",
              }}
            >
              {t("stepTwo")}
            </p>
            <p
              style={{
                marginTop: "3vw",
                textAlign: "left",
              }}
            >
              {t("chooseOption")}
            </p>
          </div>
        )}
        {stepThree && (
          <div className="slide-left">
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepTwo")} ✅
            </p>
            <p
              style={{
                fontWeight: "900",
                textAlign: "left",
              }}
            >
              {t("stepThree")}
            </p>
            <p
              style={{
                marginTop: "2vw",
                textAlign: "left",
              }}
            >
              {t("chooseOption")}
            </p>
          </div>
        )}
        {stepFour && (
          <div className="slide-right">
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepTwo")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              <b>{t("stepThree")} ✅</b>
            </p>
            <p
              style={{
                marginTop: "2vw",
                textAlign: "left",
              }}
            >
              {t("allStep")}
            </p>
          </div>
        )}
        {stepFive && (
          <div className="slide-mid">
            <p
              style={{
                fontWeight: 800,
                textAlign: "left",
                marginBottom: "2vw",
              }}
            >
              {t("makeNote")}
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("rememberStep")}
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepTwo")}✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {t("stepThree")}✅
            </p>
          </div>
        )}
      </div>
      <div className="frame-container-right">
        <div className="frame-contianer-img-item">
          {stepFive && (
            <div className="story scale-up">
              <p>{t("storyOneText")}</p>
            </div>
          )}
          <div className="frame-image-container">
            <img src={imageone} alt="image" className="frame-image scale-up" />
          </div>
          <div
            className="frame-align-box"
            style={{
              position: "relative",
            }}
          >
            <div className={`${stepOne ? "box-size" : ""} frame-image-box`}>
              6
            </div>
            <div className="frame-minus-line"></div>
            <div className={`${stepTwo ? "box-size" : ""} frame-image-box `}>
              2
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
              }}
            >
              <div className="frame-minus-line slide-up"></div>
              <div className="frame-minus-line slide-right"></div>
            </div>
            <div className={`${stepThree ? "box-size" : ""} frame-image-box `}>
              4
            </div>
            {sideHeadingOne && arrowAnimation && (
              <div>
                <div className={`${arrowAnimation ? "show-in" : ""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                    className="arrow-align-one"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.06"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className={`${arrowAnimation ? "show-in" : ""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                    className="arrow-align-two"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.06"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  {" "}
                  <div className="arrow-line show-in"></div>
                </div>
                <div
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  <p className="total-number show-in">{t("totalNumber")}</p>
                  <p className="take-away show-in">{t("takenAway")}</p>
                  <p className="ramains show-in">{t("remain")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="frame-container-left-option">
          {stepOne && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyOne.optionOne")}
                  onClick={() => handleOptionOne(1)}
                />
                <Option
                  content={t("storyOne.optionTwo")}
                  onClick={() => handleOptionOne(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyOne.optionThree")}
                  onClick={() => handleOptionOne(3)}
                />
                <Option
                  content={t("storyOne.optionFour")}
                  onClick={() => handleOptionOne(4)}
                />
              </div>
            </div>
          )}
          {stepTwo && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyOne.optionFive")}
                  onClick={() => handleOptionTwo(1)}
                />
                <Option
                  content={t("storyOne.optionSix")}
                  onClick={() => handleOptionTwo(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyOne.optionSeven")}
                  onClick={() => handleOptionTwo(3)}
                />
                <Option
                  content={t("storyOne.optionEight")}
                  onClick={() => handleOptionTwo(4)}
                />
              </div>
            </div>
          )}
          {stepThree && (
            <div className="option-align">
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyOne.optionNine")}
                  onClick={() => handleOptionThree(1)}
                />
                <Option
                  content={t("storyOne.optionTen")}
                  onClick={() => handleOptionThree(2)}
                />
              </div>
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyOne.optionEleven")}
                  onClick={() => handleOptionThree(3)}
                />
                <Option
                  content={t("storyOne.optionTweleve")}
                  onClick={() => handleOptionThree(4)}
                />
              </div>
            </div>
          )}
          {stepFour && (
            <div style={{position:"relative"}}>
              <button
                className="frame-start-button"
                style={{
                  width: "18vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "8vh",
                  fontWeight: "900",
                }}
                onClick={handleStory}
              >
                {t("makeStory")}
              </button>
              <div className="tap-gif-frame">
                  <img src={tap} alt="tap" className="tap-gif-width-frame" />
                </div>
            </div>
          )}
        </div>
        <div
          className="frame-container-left-navigation"
          style={{
            position: "relative",
          }}
        >
          {sideHeadingOne && (
            <h2 className="frame-footer-heading slide-right">
              {t("tapContinue")}
            </h2>
          )}
          {stepOne && (
            <h2 className="frame-footer-heading slide-right">
              {t("tapCorrect")}
            </h2>
          )}
          {stepTwo && (
            <h2 className="frame-footer-heading slide-right">
              {t("tapCorrect")}
            </h2>
          )}
          {stepThree && (
            <h2 className="frame-footer-heading slide-right">
              {t("tapCorrect")}
            </h2>
          )}
          {stepFour && (
            <h2 className="frame-footer-heading slide-right">
              {t("tapStory")}
            </h2>
          )}
          {stepFive && (
            <h2 className="frame-footer-heading slide-left">
              {t("tapNextQuestion")}
            </h2>
          )}
          <div>
            {sideHeadingOne && (
              <div style={{}}>
                <button
                  className="next-button slide-mid"
                  onClick={handleStepOne}
                >
                  ▶
                </button>
                <div className="tap-gif-frame">
                  <img src={tap} alt="tap" className="tap-gif-width-frame" />
                </div>
              </div>
            )}
            <button
              className="next-button-left slide-mid"
              onClick={handleStepPrev}
            >
              ◀
            </button>
            {stepFive && (
              <div>
                <button className="next-button slide-mid" onClick={handleNext}>
                  ▶
                </button>
                <div className="tap-gif-frame">
                  <img src={tap} alt="tap" className="tap-gif-width-frame" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameOne;
