import React, { useEffect, useState } from "react";
import "./Scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import CarOne from "./Car";
import Tap from "./Tap";
import MarbleRender from "./MarbleRender";
const SceneSix = ({ onPrev, onNext }) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const stored = JSON.parse(
      sessionStorage.getItem("marbleSmallersubtractionOne")
    );
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
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
    if (result === 7) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      sessionStorage.setItem(
        "marbleSmallersubtractionOne",
        JSON.stringify({
          showError: true,
          boxCss: "correct",
          disabled: true,
          current: false,
          next: true,
          result: result,
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
        <p style={{ textAlign: "left" }}>{t("typeOne.typeTwoText")}</p>
        <p style={{ textAlign: "left" }}>{t("typeOne.enterNumbers")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-main">
          <div className="scene-container-right-heading-main">
            <div className="scene-container-right-heading">
              <p>{t("questionHading.solveSubtraction")}</p>
            </div>
            <div className="scene-container-right-content">
              <p>{t("questionTwo.question")}</p>
              <div
                className="align-total"
                style={{ transform: "translate(0vw, -1vw)", gap: "2vh" }}
              >
                <p>{t("questionTwo.malik")}</p>
                <MarbleRender limit={9} />
              </div>
              <div
                className="align-total"
                style={{ transform: "translate(-5vw, -2vw)", gap: "2vh" }}
              >
                <p>{t("questionTwo.andi")}</p>
                <MarbleRender limit={7} />
              </div>
              <div
                className="align-total"
                style={{ transform: "translate(-9vw, -2vw)" }}
              >
                <p>{t("questionTwo.larger")}</p>
                <div
                  className={`box`}
                  style={{
                    transform: "translateX(0.9vw)",
                    backgroundColor: "white",
                    border: "none",
                    color: "black",
                  }}
                >
                  {9}
                </div>
              </div>
              <div
                className="align-total"
                style={{
                  transform: "translate(-8.8vw,-2vw)",
                }}
              >
                <p>{t("questionTwo.smaller")}</p>
                <div className={`box ${boxCss}`}>{result}</div>
              </div>
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
              flag={5}
            />
          </div>
        </div>
        <div className="scene-container-right-footer-heading">
          {current && <p>{t("navigation.tapNumber")}</p>}
          {next && <p>{t("navigation.tapContinue")}</p>}
        </div>
        <div className="scene-container-right-footer-button">
          <button onClick={handlePrev}>{t("buttons.previous")}</button>
          {current && <button className="disabled">{t("buttons.next")}</button>}
          {next && (
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneSix;
