import React, { useEffect, useState } from "react";
import "./SceneOne.css";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import DesignTwo from "./DesignTwo";
import SentanceBox from "./SentanceBox";
const SceneFive = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [option, setOption] = useState(null);
  const [stepOne, setStepOne] = useState(true);
  const [showErrorTwo, setShowErrorTwo] = useState(false);
  const [beat, setBeat] = useState(true);
  const [boxCss, setBoxCss] = useState("");
  const [disabledKeypad, setDisabledKeypad] = useState(false);
  const boxStyle = { width: "8vw", height: "14vh" };
  useEffect(() => {
    const stored = sessionStorage.getItem("sceneFiveResult");
    if (stored) {
      const result = JSON.parse(stored);
      setShowErrorTwo(result.showError);
      setBeat(result.beat);
      setBoxCss(result.boxCss);
      setStepOne(result.stepOne);
      setNext(result.next);
      setDisabledKeypad(result.disabledKeypad);
      setOption(result.option);
    }
  }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleResponse = (num) => {
    playClick();
    setShowErrorTwo(false);
    setBoxCss("");
    setOption(num);
  };
  const handleCheck = () => {
    if (option === 4) {
      playCorrect();
      setShowErrorTwo(true);
      setBeat(false);
      setBoxCss("green-box");
      setStepOne(false);
      setNext(true);
      setDisabledKeypad(true);
      sessionStorage.setItem(
        "sceneFiveResult",
        JSON.stringify({
          showError: true,
          beat: false,
          boxCss: "green-box",
          stepOne: false,
          next: true,
          disabledKeypad: true,
          option,
        })
      );
    } else {
      playWrong();
      setShowErrorTwo(true);
      setBoxCss("salmon-box");
    }
  };

  const handlePrev = () => {
    playClick();
    onPrev();
  };
  return (
    <div className="scene-container">
      <div className="scene-container-left">
        <p>{t("sideHeading.completeFirst")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-ballon">
          <div className="balloon-set">
            <DesignTwo total={7} red={4} blue={3} a={"A"} b={"B"} />
          </div>
          <div className="sentance-align">
            <div style={{ opacity: "0.4" }}>
              <SentanceBox num={4} result={3} />
            </div>
            <div>
              <SentanceBox
                num={3}
                beat={beat}
                boxCss={boxCss}
                option={option}
                style={boxStyle}
              />
            </div>
          </div>
        </div>

        <div className="scene-container-right-option-keypad">
          <Keypad
            onNumberClick={handleResponse}
            option={option}
            onCheck={handleCheck}
            showErrorTwo={showErrorTwo}
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

export default SceneFive;
