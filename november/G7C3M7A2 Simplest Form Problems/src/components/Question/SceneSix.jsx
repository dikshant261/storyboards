import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";

const SceneSix = ({ goNext, goPrev }) => {
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
      setShowFeedback(t("sceneSix.success"));
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
      setShowFeedback(t("sceneSix.error"));

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
        <p style={{ fontSize: "2.6vw" }}>
          <span>{t("sceneSix.letsFind")} </span>
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
            <Box
              value={"120 cm"}
              style={{
                border: "none",
                background: "#ffffffbd",
              }}
            />
          </div>
          <div className="align-row">
            <p style={{ color: "white" }}>{t("sceneThree.widthOfFrame")}</p>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={"80 cm"}
              style={{
                border: "none",
                background: "#ffffffbd",
              }}
            />
          </div>
          <div className="align-row">
            <p style={{ color: "white", textAlign: "left" }}>
              {t("sceneFive.ratioOfLengthWidth")}
            </p>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={
                <Fraction
                  numerator={120}
                  denominator={80}
                  fontSize="2.5vw"
                  color="black"
                />
              }
              style={{
                height: "13vh",
                background: "#ffffffbd",
                border: "none",
              }}
            />
            <p style={{ color: "white" }}>=</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "0.5vh",
              }}
            >
              <Box
                style={{ height: "7vh", fontSize: "2vw" }}
                beat={beat}
                boxCss={boxCss}
                value={optionValue}
              />
              <div
                style={{ width: "8vw", height: "0.5vh", background: "white" }}
              ></div>
              <div style={{ opacity: "0.5" }}>
                <Box style={{ height: "7vh" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="keypad">
          <p className="para">{t("sceneSix.whatIsWidth")}</p>
          <div className="align-buttons">
            <button
              type="button"
              className={btnClass(2)}
              onClick={() => {
                setOptionValue("120 × 10");
                handleOption(2);
              }}
              disabled={isBtnDisabled(2)}
              style={{
                height: "9vh",
                width: "13vw",
              }}
            >
              120 × 10
            </button>

            <button
              type="button"
              className={btnClass(1)}
              onClick={() => {
                setOptionValue("12 × 10");
                handleOption(1);
              }}
              style={{
                height: "9vh",
                width: "13vw",
              }}
              disabled={isBtnDisabled(1)}
            >
              12 × 10
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

export default SceneSix;
