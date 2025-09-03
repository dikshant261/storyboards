import React, { useEffect, useState } from "react";

import "./FrameOne.css";
import imagethird from "../assets/imagethree.png";
import click from "../assets/click.mp3";
import Option from "./Option";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
import { useTranslation } from "react-i18next";
const FrameThird = ({ onNext }) => {
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
    if (num === 3) {
      rightHandle();
      setStepTwo(false);
      setStepThree(true);
    } else {
      wrongHandle();
    }
  };
  const handleOptionThree = (num) => {
    if (num === 4) {
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
    onNext();
  };
  return (
    <div className="frame-contianer">
      <div className="frame-container-left">
        {sideHeadingOne && (
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
              <p>{t("storyThreeText")}</p>
            </div>
          )}
          <div className="frame-image-container">
            <img
              src={imagethird}
              alt="image"
              className="frame-image scale-up"
            />
          </div>
        </div>
        <div className="frame-container-left-option">
          {stepOne && (
            <div
              className="option-align "
              style={{
                gap: "8vw",
              }}
            >
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyThree.optionOne")}
                  onClick={() => handleOptionOne(1)}
                  style={{
                    width: "31vw",
                  }}
                />
                <Option
                  content={t("storyThree.optionTwo")}
                  onClick={() => handleOptionOne(2)}
                  style={{
                    width: "31vw",
                  }}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyThree.optionThree")}
                  onClick={() => handleOptionOne(3)}
                  style={{
                    width: "31vw",
                  }}
                />
                <Option
                  content={t("storyThree.optionFour")}
                  onClick={() => handleOptionOne(4)}
                  style={{
                    width: "31vw",
                  }}
                />
              </div>
            </div>
          )}
          {stepTwo && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyThree.optionFive")}
                  onClick={() => handleOptionTwo(1)}
                />
                <Option
                  content={t("storyThree.optionSix")}
                  onClick={() => handleOptionTwo(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyThree.optionSeven")}
                  onClick={() => handleOptionTwo(3)}
                />
                <Option
                  content={t("storyThree.optionEight")}
                  onClick={() => handleOptionTwo(4)}
                />
              </div>
            </div>
          )}
          {stepThree && (
            <div className="option-align">
              <div className="option-align-col slide-left">
                <Option
                  content={t("storyThree.optionNine")}
                  onClick={() => handleOptionThree(1)}
                />
                <Option
                  content={t("storyThree.optionTen")}
                  onClick={() => handleOptionThree(2)}
                />
              </div>
              <div className="option-align-col slide-right">
                <Option
                  content={t("storyThree.optionEleven")}
                  onClick={() => handleOptionThree(3)}
                />
                <Option
                  content={t("storyThree.optionTwelve")}
                  onClick={() => handleOptionThree(4)}
                />
              </div>
            </div>
          )}
          {stepFour && (
            <div className="slide-mid">
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
              <button className="next-button slide-mid" onClick={handleStepOne}>
                ▶
              </button>
            )}
            {stepFive && (
              <button className="next-button slide-mid" onClick={handleNext}>
                ▶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameThird;
