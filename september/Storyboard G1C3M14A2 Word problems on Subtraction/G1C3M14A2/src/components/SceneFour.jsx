import React, { useEffect, useState } from "react";
import "./Scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import CarOne from "./Car";
import Tap from "./Tap";
import SentanceBox from "./SentanceBox";
import ProgressBar from "./ProgressBar";
const SceneFour = ({ onNext, onPrev }) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  const [beat,setBeat]=useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const stored = JSON.parse(
      sessionStorage.getItem("pencilSenetanceSubtractionOne")
    );
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
      setBeat(stored.beat)
    }
  }, []);
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleResponse = (num) => {
    playClick();
    setShowError(false);
    setBoxCss("");
    setResult(num);
  };
  const checkHandle = () => {
    if (result === 3) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      setBeat(false)
      sessionStorage.setItem(
        "pencilSenetanceSubtractionOne",
        JSON.stringify({
          showError: true,
          boxCss: "correct",
          disabled: true,
          current: false,
          next: true,
          result: result,
          beat:false
        })
      );
    } else {
      playWrong();
      setShowError(true);
      setBoxCss("wrong");
    }
  };
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p style={{ textAlign: "left" }}>{t("typeOne.typeOneText")}</p>
        <p style={{}}>{t("typeOne.subtractFrom")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-main">
          <div className="scene-container-right-heading-main">
            <div className="scene-container-right-heading">
              <p>{t("questionHading.solveSubtraction")}</p>
            </div>
            <div className="scene-container-right-content">
              <p>{t("questionOne.question")}</p>
              <CarOne totalCars={7} crossCars={4} />
              <div
                className="align-total"
              >
                <p>{t("total")}</p>
                <div
                  className={`box`}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    color: "black",
                  }}
                >
                  {7}
                </div>
              </div>
              <div
                className="align-total"
              >
                <p>{t("takenAway")}</p>
                <div
                  className={`box`}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    color: "black",
                  }}
                >
                  {4}
                </div>
              </div>
              <div style={{ transform: "translate(1vw,1vw)" }}>
                <SentanceBox
                  numOne={7}
                  numTwo={4}
                  boxCss={boxCss}
                  result={result}
                  beat={beat}
                />
              </div>
              {next && (
                <p style={{ transform: "translate(-9vw, 1vw)" }}>
                  {t("numberOfPencil")}{" "}
                  <span style={{ fontSize: "3vw", color: "orange" }}>
                    {result}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="scene-container-right-option">
            <Keypad
              response={handleResponse}
              result={result}
              showError={showError}
              setShowError={() => setShowError(false)}
              boxCss={boxCss}
              checkHandle={checkHandle}
              disabled={disabled}
              flag={3}
            />
          </div>
        </div>
        <div className="scene-container-right-footer-heading">
          {current && <p>{t("navigation.tapNumber")}</p>}
          {next && <p>{t("navigation.tapContinue")}</p>}
        </div>
        <div className="scene-container-right-footer-button">
          <button onClick={handlePrev}>{t("buttons.previous")}</button>
          <ProgressBar current={4} />
          {current && <button className="disabled">{t("buttons.next")}</button>}
          {next && (
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <Tap bottom={0} onClick={handleNext}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneFour;
