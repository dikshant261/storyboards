import React, { useEffect, useState } from "react";

import "./FrameOne.css";
import click from "../assets/click.mp3";
import Option from "./Option";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
const Frame = ({
  onNext,
  prev,
  imageSrc,
  number,
  storyTextKey,
  optionKeys,
  width,
  gap,
  flag = false,
}) => {
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [arrowAnimation, setArrowAnimation] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
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
    setDisabledNext(true);
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
    setDisabledNext(false);
    setStepFive(true);
  };
  const handleNext = () => {
    if (flag) {
      window.location.reload();
    }
    clickHandle();
    setStepFive(false);
    setArrowAnimation(false);
    onNext();
  };
  const handleStepPrev = () => {
    clickHandle();
    prev();
  };
  return (
    <div className="frame-contianer">
      <div className="frame-container-left">
        {sideHeadingOne && <p className="slide-left">{t("sideHeadingOne")}</p>}
        {stepOne && (
          <div>
            <p
              className="slide-left"
              style={{
                fontWeight: 900,
                marginBottom: "2vw",
              }}
            >
              {t("subtractionStoryFirst")}
            </p>
            <p>{t("sideHeadingOne")}</p>
          </div>
        )}
        {stepTwo && (
          <div className="slide-mid">
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
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
                color: "lightgreen",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
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
                color: "lightgreen",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
              }}
            >
              {t("stepTwo")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
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
                color: "lightgreen",
              }}
            >
              {t("stepOne")} ✅
            </p>
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
              }}
            >
              {t("stepTwo")}✅
            </p>
            <p
              style={{
                textAlign: "left",
                color: "lightgreen",
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
              <p>{t(storyTextKey)}</p>
            </div>
          )}
          <div className="frame-image-container">
            <img src={imageSrc} alt="image" className="frame-image scale-up" />
          </div>
        </div>
        <div className="frame-container-left-option">
          {stepOne && (
            <div
              className="option-align"
              style={{
                gap: gap,
              }}
            >
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[0][0])}
                  onClick={() => handleOptionOne(1)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[0][1])}
                  onClick={() => handleOptionOne(2)}
                  style={{
                    width: width,
                  }}
                />
              </div>
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[0][2])}
                  onClick={() => handleOptionOne(3)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[0][3])}
                  onClick={() => handleOptionOne(4)}
                  style={{
                    width: width,
                  }}
                />
              </div>
            </div>
          )}
          {stepTwo && (
            <div
              className="option-align"
              style={{
                gap: gap,
              }}
            >
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[1][0])}
                  onClick={() => handleOptionTwo(1)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[1][1])}
                  onClick={() => handleOptionTwo(2)}
                  style={{
                    width: width,
                  }}
                />
              </div>
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[1][2])}
                  onClick={() => handleOptionTwo(3)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[1][3])}
                  onClick={() => handleOptionTwo(4)}
                  style={{
                    width: width,
                  }}
                />
              </div>
            </div>
          )}
          {stepThree && (
            <div
              className="option-align"
              style={{
                gap: gap,
              }}
            >
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[2][0])}
                  onClick={() => handleOptionThree(1)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[2][1])}
                  onClick={() => handleOptionThree(2)}
                  style={{
                    width: width,
                  }}
                />
              </div>
              <div className="option-align-col show-in">
                <Option
                  content={t(optionKeys[2][2])}
                  onClick={() => handleOptionThree(3)}
                  style={{
                    width: width,
                  }}
                />
                <Option
                  content={t(optionKeys[2][3])}
                  onClick={() => handleOptionThree(4)}
                  style={{
                    width: width,
                  }}
                />
              </div>
            </div>
          )}
          {stepFour && (
            <div style={{ position: "relative" }}>
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
              {t("tapContinue")}
            </h2>
          )}
          <div>
            {sideHeadingOne && (
              <div style={{}}>
                <button className="next-button" onClick={handleStepOne}>
                  ▶
                </button>
                <div className="tap-gif-frame">
                  <img src={tap} alt="tap" className="tap-gif-width-frame" />
                </div>
              </div>
            )}
            <button className="next-button-left" onClick={handleStepPrev}>
              ◀
            </button>
            {stepOne && (
              <button
                className="next-button-left"
                onClick={() => {
                  clickHandle();
                  setStepOne(false);
                  setDisabledNext(false);
                  setSideHeadingOne(true);
                }}
              >
                ◀
              </button>
            )}
            {stepThree && (
              <button
                className="next-button-left"
                onClick={() => {
                  clickHandle();
                  setStepThree(false);
                  setStepTwo(true);
                }}
              >
                ◀
              </button>
            )}
            {stepTwo && (
              <button
                className="next-button-left"
                onClick={() => {
                  clickHandle();
                  setStepTwo(false);
                  setStepOne(true);
                }}
              >
                ◀
              </button>
            )}
            {stepFour && (
              <button
                className="next-button-left"
                onClick={() => {
                  clickHandle();
                  setStepFour(false);
                  setStepThree(true);
                }}
              >
                ◀
              </button>
            )}
            {stepFive && (
              <button
                className="next-button-left"
                onClick={() => {
                  clickHandle();
                  setStepFive(false);
                  setStepFour(true);
                }}
              >
                ◀
              </button>
            )}
            {disabledNext && (
              <button className="next-button-disabled">▶</button>
            )}
            {stepFive && (
              <div>
                <button className="next-button" onClick={handleNext}>
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

export default Frame;
