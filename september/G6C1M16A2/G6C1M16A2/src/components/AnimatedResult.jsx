import React, { useEffect } from "react";
import "./AnimatedResult.css";
import { useTranslation } from "react-i18next";
import curvedArrow from "../assets/curvedArrow.svg";
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
  const [stepSixHalf, setStepSixHalf] = React.useState(false);
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
        setStepSixHalf(true);
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
      }, 5000);
      setTimeout(() => {
        setStepFive(true);
      }, 6000);
      setTimeout(() => {
        setStepSix(true);
      }, 7500);
      setTimeout(() => {
        setStepSixHalf(true);
      }, 8500);
      setTimeout(() => {
        setStepSeven(true);
      }, 9500);
      setTimeout(() => {
        setStepEight(true);
        setNext(true);
      }, 10500);
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
                opacity: stepThree ? "" : "0",
              }}
              className={`${stepThree && showArrow ? "animate-result" : ""}`}
            >
              {t("reciprocal", { count: question[2] })}
            </p>
          </div>
        )}
        <img
          src={curvedArrow}
          style={{
            width: "10vw",
            height: "18vh",
            position: "fixed",
            top: "29%",
            left: "21.7%",
            transform: "rotate(-25deg)",
            opacity: stepFive ? "" : "0",
          }}
        />
        <img
          src={curvedArrow}
          style={{
            width: "10vw",
            height: "18vh",
            position: "fixed",
            top: "53%",
            left: "21.7%",
            transform: "scaleY(-1) rotate(-32deg)",
            opacity: stepSeven ? "" : "0",
          }}
        />
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
          className={`${stepFour ? "animate-result" : ""} result`}
          style={{ opacity: stepFour ? "" : "0", color: "#43d57a" }}
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
            className={`${stepSixHalf ? "animate-result" : ""}num`}
            style={{ opacity: stepSixHalf ? "" : "0" }}
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
