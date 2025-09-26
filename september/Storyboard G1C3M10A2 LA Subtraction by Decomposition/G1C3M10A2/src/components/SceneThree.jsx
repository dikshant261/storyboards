import React, { useEffect, useState } from "react";
import "./SceneOne.css";
import { useTranslation } from "react-i18next";
import Balloon from "./Balloon";
import Design from "./Design";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Keypad from "./Keypad";
import DesignTwo from "./DesignTwo";
import DesignOption from "./DesignOption";
const SceneThree = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [option, setOption] = useState(null);
  const [stepOne, setStepOne] = useState(true);
  const [allDisabled, setAllDisabled] = useState(false);
  const [current, setCurrent] = useState([]);
  const [number, setNumber] = useState([]);
  useEffect(() => {
    const stored = sessionStorage.getItem("sceneThreeResult");
    if (stored) {
      const result = JSON.parse(stored);
      setAllDisabled(result.disabled);
      setNumber(result.number);
      setStepOne(result.stepOne);
      setNext(result.next);
    }
  }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleClick = (num) => {
    if (num === 1 || num === 3) {
      playCorrect();
      setAllDisabled(true);
      setNumber([4, 3]);
      setStepOne(false);
      setNext(true);
      sessionStorage.setItem(
        "sceneThreeResult",
        JSON.stringify({
          disabled: true,
          stepOne: false,
          next: true,
          number: [4, 3],
        })
      );
    } else {
      playWrong();
      setCurrent([...current, num]);
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
        <p style={{ color: "lightgreen" }}>{t("steps.stepTwo")}✅</p>
        <p>{t("steps.stepThree")}</p>
        <p>{t("sideHeading.numberPair")}</p>
      </div>
      <div className="scene-container-right">
        <div className="scene-container-right-ballon">
          <div className="balloon-set">
            <Balloon />
          </div>
          <DesignTwo option={option} total={7} number={number} />
        </div>

        <div
          className="scene-container-right-option-keypad"
          style={{
            justifyContent: "center",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              pointerEvents: allDisabled ? "none" : "auto",
              backgroundColor: allDisabled ? "#90ee90a1" : "#ffffff61",
              borderRadius: "0.9vw",
            }}
            onClick={() => handleClick(1)}
          >
            <DesignOption
              total={7}
              red={3}
              blue={4}
              style={{ borderColor: allDisabled ? "darkgreen" : "" }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
              pointerEvents:
                allDisabled || current.includes(2) ? "none" : "auto",
              backgroundColor:
                allDisabled || current.includes(2) ? "#fa8072ab" : "#ffffff61",
              borderRadius: "0.9vw",
            }}
            onClick={() => handleClick(2)}
          >
            <DesignOption
              total={7}
              red={6}
              blue={1}
              style={{
                borderColor:
                  allDisabled || current.includes(2) ? "darksalmon" : "",
              }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
              pointerEvents: allDisabled ? "none" : "auto",
              backgroundColor: allDisabled ? "#90ee90a1" : "#ffffff61",
              borderRadius: "0.9vw",
            }}
            onClick={() => handleClick(3)}
          >
            <DesignOption
              total={7}
              red={4}
              blue={3}
              style={{ borderColor: allDisabled ? "darkgreen" : "" }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
              pointerEvents:
                allDisabled || current.includes(4) ? "none" : "auto",
              backgroundColor:
                allDisabled || current.includes(4) ? "#fa8072ab" : "#ffffff61",
              borderRadius: "0.9vw",
            }}
            onClick={() => handleClick(4)}
          >
            <DesignOption
              total={7}
              red={4}
              blue={7}
              style={{
                borderColor:
                  allDisabled || current.includes(4) ? "darksalmon" : "",
              }}
            />
          </div>
        </div>
        <div className="scene-container-right-footer">
          <button onClick={handlePrev}>{t("buttons.previous")}</button>
          {stepOne && (
            <p style={{ fontSize: "2.7vw" }}>
              {t("navigation.tapCorrectOption")}
            </p>
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

export default SceneThree;
