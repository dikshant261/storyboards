import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";

const SceneThree = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [beat, setBeat] = useState(true);
  const [showFeedback, setShowFeedback] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [boxCss, setBoxCss] = useState("");
  const [allDisabled, setAllDisabled] = useState(false); // disables all buttons after correct
  const [disabledButtons, setDisabledButtons] = useState([]); // individually disabled wrong buttons
  const [correctId, setCorrectId] = useState(null);
  const [wrongIds, setWrongIds] = useState([]); // track wrong buttons to permanently style them
  const [next, setNext] = useState(false);
  const handleOption = (id) => {
    // if correct
    if (id === 1) {
      playCorrect();
      setBoxCss("correct");
      setBeat(false);
      setShowFeedback(t("sceneThree.success"));
      setNext(true);
      setCorrectId(1);
      // mark every other button as wrong
      const otherWrong = [2, 3].filter((i) => i !== 1);
      setWrongIds(otherWrong);
      // disable all buttons
      setAllDisabled(true);
      // also disable individual ones to be safe
      setDisabledButtons([1, 2, 3]);
    } else {
      // wrong click
      playWrong();
      setBoxCss("wrong");
      setShowFeedback(t("sceneThree.error"));

      // permanently mark this button wrong
      setWrongIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      // disable only this button so user can try other options
      setDisabledButtons((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleClick = () => {
    playClick();
    goNext();
  };

  const isBtnDisabled = (id) => {
    return allDisabled || disabledButtons.includes(id);
  };

  const btnClass = (id) => {
    if (correctId === id) return "correct";
    if (wrongIds.includes(id)) return "wrong";
  };

  return (
    <div className="scenetwo-container">
      <div className="heading">
        <p>
          <span>{t("sceneTwo.aFrameMeasure")} </span>
          <span style={{ color: "white" }}>{t("sceneTwo.measurement")}</span>
          <span> {t("sceneTwo.whatIs")}</span>
        </p>
      </div>

      <div className="main">
        <div
          className="main-content"
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "1vh 2vw",
          }}
        >
          <p style={{ color: "white" }}>{t("sceneThree.given")}</p>
          <div className="align-row">
            <p style={{ color: "white" }}>{t("sceneThree.lengthOfFrame")}</p>
            <p style={{ color: "white" }}>=</p>
            <Box beat={beat} boxCss={boxCss} value={optionValue} />
          </div>
          <div className="align-row">
            <p style={{ color: "white" }}>{t("sceneThree.widthOfFrame")}</p>
            <p style={{ color: "white" }}>=</p>
            <div style={{
              opacity:'0.4'
            }}>
            <Box />
            </div>
          </div>
        </div>

        <div className="keypad">
          <p className="para">{t("sceneThree.whatIsLength")}</p>
          <div className="align-buttons">
            <button
              type="button"
              className={btnClass(1)}
              onClick={() => {
                setOptionValue("120 cm");
                handleOption(1);
              }}
              disabled={isBtnDisabled(1)}
            >
              120 cm
            </button>

            <button
              type="button"
              className={btnClass(2)}
              onClick={() => {
                setOptionValue("80 cm");
                handleOption(2);
              }}
              disabled={isBtnDisabled(2)}
            >
              80 cm
            </button>

            <button
              type="button"
              className={btnClass(3)}
              onClick={() => {
                setOptionValue("200 cm");
                handleOption(3);
              }}
              disabled={isBtnDisabled(3)}
            >
              200 cm
            </button>
          </div>
          {showFeedback !== "" && (
            <p className={`${allDisabled ? "frame-success" : "frame-error"}`}>
              {showFeedback}
            </p>
          )}
        </div>
      </div>

      <div className="footer">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        {!next && <p>{t("navigation.tapCorrectOption")}</p>}
        {next && <p>{t("navigation.tapProceed")}</p>}
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button onClick={handleClick}>{t("buttons.next")}</button>
            <Tap onClick={handleClick} bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneThree;
