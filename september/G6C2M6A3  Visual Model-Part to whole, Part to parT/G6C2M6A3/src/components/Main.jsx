import React, { useState } from "react";
import "./main.css";
import { useTranslation } from "react-i18next";
import PieChart from "./PieChart";
import { Option } from "./Option";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const Main = ({ option, correctOption, question, flag, onNext, onClose }) => {
  const { t } = useTranslation();
  const [result, setResult] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [showTap, setTapShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const handleResponse = (opt) => {
    if (opt === correctOption) {
      playCorrect();
      setResult(opt);
      setErrorShow(true);
      setBoxCss("correct-box");
      setTapShow(false);
      setShowNext(true);
    } else {
      playWrong();
      setResult(opt);
      setErrorShow(true);
      setBoxCss("wrong-box");
    }
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev = () => {
    playClick();
    onClose();
  };
  return (
    <div className="main-conatainer">
      <div className="main-heading">
        <p>{t(question)}</p>
      </div>
      <div className="main-content">
        <div className="main-content-chart">
          <p>{t("chartHeading.surveyHeading")}</p>
          <PieChart />
        </div>
        <div className="main-content-option">
          <Option
            option={option}
            correctOption={correctOption}
            response={handleResponse}
            errorShow={errorShow}
            result={result}
            flag={flag}
            boxCss={boxCss}
          />
        </div>
      </div>
      <div className="main-conatainer-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        {showTap && <p>{t("navigations.tapTheRatios")}</p>}
        {showNext && <p>{t("navigations.tapContinue")}</p>}
        {showTap && <button>{t("buttons.next")}</button>}
        {showNext && (
          <div>
            {" "}
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <img src={tap} className="tap-gif" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
