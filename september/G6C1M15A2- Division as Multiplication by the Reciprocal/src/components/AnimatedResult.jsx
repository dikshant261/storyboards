import React, { useEffect, useState } from "react";
import "./AnimatedResult.css";
import { useTranslation } from "react-i18next";
const AnimatedResult = ({ question, setNext, freezeAnimation }) => {
  const { t } = useTranslation();
  const [stepZero, setStepZero] = useState(false);
  const [stepOne, setStepOne] = React.useState(false);
  const [stepOneHalf, setStepOneHalf] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  if (freezeAnimation) {
    useEffect(() => {
      if (freezeAnimation) {
        setStepZero(true);
        setStepOne(true);
        setStepOneHalf(true);
        setStepTwo(true);
        setStepThree(true);
        setStepFour(true);
      }
    }, [freezeAnimation]);
  } else {
    React.useEffect(() => {
      setStepZero(true);
      setTimeout(() => {
        setStepOne(true);
      }, 1500);
      setTimeout(() => {
        setStepOneHalf(true);
      }, 3500);
      setTimeout(() => {
        setStepTwo(true);
      }, 5000);
      setTimeout(() => {
        setStepThree(true);
      }, 6500);
      setTimeout(() => {
        setStepFour(true);
        setNext(true);
      }, 7500);
    }, []);
  }
  return (
    <div className="result-container">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          style={{
            width: "15vw",
            height: "22vh",
            position: "fixed",
            top: "36%",
            left: "18.5%",
            opacity: stepOneHalf ? "" : "0",
          }}
          className={`${stepOneHalf ? "animate-result" : ""}`}
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
            width: "12vw",
            height: "18vh",
            position: "fixed",
            top: "32%",
            left: "27%",
            opacity: stepThree ? "" : "0",
          }}
          className={`${stepThree ? "animate-result" : ""}`}
        >
          <path
            style={{ fill: "white" }}
            d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
          />
        </svg>
        <p
          style={{
            position: "fixed",
            top: "36%",
            left: "35%",
            color: "rgb(67, 213, 122)",
            fontSize: "2vw",
            opacity: stepFour ? "" : "0",
          }}
          className={`${stepThree ? "animate-result" : ""}`}
        >
          {t("reciprocal", { count: question[1] })}
        </p>
      </div>
      <div className="equal-align">
        <span
          className={`${stepZero ? "animate-result" : ""}`}
          style={{ fontSize: "4vw" }}
        >
          =
        </span>
        <span
          className={`${stepOne ? "animate-result" : ""}`}
          style={{ opacity: stepOne ? "" : "0" }}
        >
          {question[0]}
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
        <span className="den">{question[1]}</span>
      </span>
    </div>
  );
};

export default AnimatedResult;
