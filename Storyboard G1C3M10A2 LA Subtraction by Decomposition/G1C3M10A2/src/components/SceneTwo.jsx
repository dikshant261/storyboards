import React, { useEffect, useState } from "react";
import "./SceneOne.css";
import { useTranslation } from "react-i18next";
import Balloon from "./Balloon";
import Design from "./Design";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import DesignTwo from "./DesignTwo";
const SceneTwo = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [option, setOption] = useState(null);
  const [stepOne, setStepOne] = useState(true);
  const [showErrorfirst, setShowError] = useState(false);
  const [beat, setBeat] = useState(true);
  const [circleCss, setCircleCss] = useState("");
  const [disabledKeypad, setDisabledKeypad] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  useEffect(() => {
    const stored = sessionStorage.getItem("sceneTwoResult");
    if (stored) {
      const result = JSON.parse(stored);
      setOption(result.option);
      setNext(result.next);
      setDisabledKeypad(result.disabledOpt);
      setStepOne(result.stepOne);
      setShowError(result.errorShow);
      setCircleCss(result.circleCss);
      setBeat(result.beat);
    }
  }, []);
  const handleResponse = (num) => {
    playClick();
    setShowError(false);
    setCircleCss("");
    setOption(num);
  };
  const handleCheck = () => {
    if (option === 7) {
      playCorrect();
      setShowError(true);
      setBeat(false);
      setCircleCss("green");
      setStepOne(false);
      setNext(true);
      setDisabledKeypad(true);
      sessionStorage.setItem(
        "sceneTwoResult",
        JSON.stringify({
          option,
          errorShow: true,
          beat: false,
          stepOne: false,
          circleCss: "green",
          next: true,
          disabledOpt: true,
        })
      );
    } else {
      playWrong();
      setShowError(true);
      setCircleCss("salmon");
    }
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p style={{ fontWeight: "bold" }}>{t("sideHeading.represent")}</p>
        <p style={{ color: "lightgreen" }}>{t("steps.stepOne")}✅</p>
        <p>{t("steps.stepTwo")}</p>
        <p>{t("sideHeading.countRedandBlue")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-ballon">
          <div className="balloon-set">
            <Balloon />
          </div>
          <DesignTwo option={option} beat={beat} circleCss={circleCss} />
        </div>

        <div className="scene-container-right-option-keypad">
          <Keypad
            onNumberClick={handleResponse}
            option={option}
            onCheck={handleCheck}
            showErrorfirst={showErrorfirst}
            disabledKeypad={disabledKeypad}
          />
        </div>
        <div className="scene-container-right-footer">
          <button onClick={handlePrev}>{t("buttons.previous")}</button>
          {stepOne && (
            <p style={{ fontSize: "2.7vw" }}>{t("navigation.tapNumber")}</p>
          )}
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

export default SceneTwo;
