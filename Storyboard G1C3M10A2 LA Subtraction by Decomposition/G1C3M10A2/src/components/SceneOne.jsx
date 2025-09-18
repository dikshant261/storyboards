import React, { useEffect, useState } from "react";
import "./SceneOne.css";
import { useTranslation } from "react-i18next";
import Balloon from "./Balloon";
import Design from "./Design";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const SceneOne = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [option, setOption] = useState(null);
  const [disabledOpt, setDisabledOpt] = useState(false);
  const [stepOne, setStepOne] = useState(true);

  // Restore previous response from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("sceneOneResult");
    if (stored) {
      const result = JSON.parse(stored);
      setOption(result.selectedOption);
      setNext(result.next);
      setDisabledOpt(result.disabledOpt);
      setStepOne(result.stepOne);
    }
  }, []);
  const handleOption = (selectedOption) => {
    setOption(selectedOption);
    if (selectedOption === 2) {
      playCorrect();
      setStepOne(false);
      setNext(true);
      setDisabledOpt(true);
      sessionStorage.setItem(
        "sceneOneResult",
        JSON.stringify({
          selectedOption,
          correct: true,
          stepOne: false,
          next: true,
          disabledOpt: true,
        })
      );
    } else {
      playWrong();
      setDisabledOpt(true);
    }
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p style={{ fontWeight: "bold", fontSize: "" }}>
          {t("sideHeading.represent")}
        </p>
        <p>{t("steps.stepOne")}</p>
        <p>{t("sideHeading.tapCorrect")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-ballon">
          <div className="balloon-set">
            <Balloon />
          </div>
          <Design />
        </div>

        <div className="scene-container-right-option">
          <div
            className="option"
            onClick={() => handleOption(1)}
            style={{
              background: disabledOpt ? "salmon" : "",
              pointerEvents: disabledOpt ? "none" : "auto",
              opacity: option !== null && option !== 1 ? 0.5 : 1,
            }}
          >
            {t("optionsSceneOne.someBalloonRedAndYellow")}
          </div>
          <div
            className="option"
            onClick={() => handleOption(2)}
            style={{
              background: option === 2 ? "green" : "",
              pointerEvents: option === 2 ? "none" : "auto",
            }}
          >
            {t("optionsSceneOne.someBalloonRebAndBlue")}
          </div>
        </div>
        <div className="scene-container-right-footer">
          <button
            style={{
              backgroundColor: "gray",
              borderColor: "gray",
              cursor: "not-allowed",
            }}
          >
            {t("buttons.previous")}
          </button>
          {stepOne && <p>{t("navigation.tapCorrectOption")}</p>}
          {next && <p>{t("navigation.tapToContinue")}</p>}
          {stepOne && (
            <button
              style={{
                backgroundColor: "gray",
                borderColor: "gray",
                cursor: "not-allowed",
              }}
            >
              {t("buttons.next")}
            </button>
          )}
          {next && (
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <img src={tap} className="tap-gif" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneOne;
