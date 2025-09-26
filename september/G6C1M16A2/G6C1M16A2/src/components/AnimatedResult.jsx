import React, { useEffect } from "react";
import "./AnimatedResult.css";
import { useTranslation } from "react-i18next";
const AnimatedResult = ({
  question,
  setNext,
  setHeading,
  animationSet,
  freezeAnimation,
}) => {
  const { t } = useTranslation();
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [showArrow, setShowArrow] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  const [stepFive, setStepFive] = React.useState(false);
  const [stepSix, setStepSix] = React.useState(false);
  const [stepSeven, setStepSeven] = React.useState(false);
  const [stepEight, setStepEight] = React.useState(false);
  if (freezeAnimation) {
    useEffect(() => {
      if (freezeAnimation) {
        setStepOne(true);
        setStepTwo(true);
        setStepThree(true);
        setStepFive(true);
        setStepFour(true);
        setStepSix(true);
        setStepSeven(true);
        setStepEight(true);
        setShowArrow(false);
      }
    }, [freezeAnimation]);
  } else {
    React.useEffect(() => {
      setStepOne(true);
      setTimeout(() => {
        setStepTwo(true);
        setShowArrow(true);
      }, 1500);
      setTimeout(() => {
        setStepThree(true);
      }, 3000);
      setTimeout(() => {
        setStepFour(true);
      }, 4000);
      setTimeout(() => {
        setShowArrow(false);
      }, 4500);
      setTimeout(() => {
        setStepFive(true);
      }, 5500);
      setTimeout(() => {
        setStepSix(true);
      }, 6500);
      setTimeout(() => {
        setStepSeven(true);
      }, 7500);
      setTimeout(() => {
        setStepEight(true);
        setNext(true);
      }, 8500);
    }, []);
  }
  return (
    <div className="result-container">
      <div>
        {showArrow && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              style={{
                width: "8vw",
                height: "22vh",
                position: "fixed",
                top: "26%",
                left: "21.7%",
                opacity: stepTwo ? "" : "0",
              }}
              className={`${stepTwo && showArrow ? "animate-result" : ""}`}
            >
              <path
                style={{ fill: "white" }}
                d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              style={{
                width: "6vw",
                height: "18vh",
                position: "fixed",
                top: "26%",
                left: "28.7%",
                opacity: stepThree ? "" : "0",
              }}
              className={`${stepThree && showArrow ? "animate-result" : ""}`}
            >
              <path
                style={{ fill: "white" }}
                d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
              />
            </svg>
            <p
              style={{
                position: "fixed",
                top: "32%",
                left: "33%",
                color: "rgb(67, 213, 122)",
                fontSize: "2vw",
                opacity: stepFour ? "" : "0",
              }}
              className={`${stepFour && showArrow ? "animate-result" : ""}`}
            >
              {t("reciprocal", { count: question[2] })}
            </p>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.9 -0.85 4.2 0.95"
          style={{
            width: "11vw",
            height: "18vh",
            position: "fixed",
            top: "29%",
            left: "20.7%",
            opacity: stepFive ? "" : "0",
          }}
        >
          <path
            d="M 1 0 C 2 -1 4 -1 5 0"
            stroke="#fff"
            stroke-width="0.1"
            fill="none"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.9 -0.1 4.2 1.089"
          style={{
            width: "11vw",
            height: "18vh",
            position: "fixed",
            top: "53%",
            left: "20.7%",
            opacity: stepSeven ? "" : "0",
          }}
        >
          <path
            d="M 1 0 C 3 2 5 0 5 0"
            stroke="#fff"
            stroke-width="0.1"
            fill="none"
          />
        </svg>
      </div>
      <div className="result-align">
        <div className="equal-align">
          <span
            className={`${stepOne ? "animate-result" : ""}`}
            style={{ fontSize: "4vw" }}
          >
            =
          </span>
          <span className={`${stepOne ? "animate-result" : ""} result`}>
            <span className="num">{question[0]}</span>
            <span className="bar"></span>
            <span className="den">{question[1]}</span>
          </span>
        </div>
        <span
          className={`${stepTwo ? "animate-result" : ""}`}
          style={{ opacity: stepTwo ? "" : "0", color: "#11affc" }}
        >
          ×
        </span>
        <span
          className={`${stepThree ? "animate-result" : ""} result`}
          style={{ opacity: stepThree ? "" : "0", color: "#43d57a" }}
        >
          <span className="num">1</span>
          <span className="bar"></span>
          <span className="den">{question[2]}</span>
        </span>
      </div>

      <div className="equal-align" style={{ paddingRight: "12vw" }}>
        <span
          className={`${stepSix ? "animate-result" : ""}`}
          style={{ opacity: stepSix ? "" : "0", fontSize: "4vw" }}
        >
          =
        </span>

        <span className={`result`}>
          <span
            className={`${stepSix ? "animate-result" : ""}num`}
            style={{ opacity: stepSix ? "" : "0" }}
          >
            {question[0]}
          </span>
          <span
            className={`${stepEight ? "animate-result" : ""} bar`}
            style={{ opacity: stepEight ? "" : "0" }}
          ></span>
          <span
            className={`${stepEight ? "animate-result" : ""} den`}
            style={{ opacity: stepEight ? "" : "0" }}
          >
            {question[1] * question[2]}
          </span>
        </span>
      </div>
    </div>
  );
};

export default AnimatedResult;
