import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";

const SceneEleven = ({ goNext, goPrev }) => {
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
      setShowFeedback(
        `t("sceneEleven.correct") ${(
          <Fraction numerator={3} denominator={2} />
        )} t("sceneEleven.success")`
      );
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
      setShowFeedback(t("sceneEleven.error"));

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
          <span>{t("sceneEight.letsFind")} </span>
        </p>
      </div>

      <div className="main">
        <div
          className="main-content"
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "1vh 1vw",
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
                position: "relative",
              }}
            >
              {<div className="cross-line-top"></div>}
              {<div className="cross-line-bottom"></div>}
              <Box
                value={"12 × 10"}
                style={{
                  height: "7vh",
                  fontSize: "2vw",
                  background: "#ffffffbd",
                  border: "none",
                }}
              />
              <div
                style={{ width: "8vw", height: "0.5vh", background: "white" }}
              ></div>
              <div>
                <Box
                  value={"8 × 10"}
                  style={{
                    height: "7vh",
                    fontSize: "2vw",
                    background: "#ffffffbd",
                    border: "none",
                  }}
                />
              </div>
            </div>
            <p style={{ color: "white" }}>=</p>
            <Box
              value={
                <Fraction
                  numerator={12}
                  denominator={8}
                  fontSize="2.5vw"
                  color="black"
                />
              }
              style={{
                height: "13vh",
                background: "#ffffffbd",
                border: "none",
                width: "5vw",
              }}
            />
          </div>
          <div
            className="align-row"
            style={{
              gridTemplateColumns:
                "minmax(18vw, 1fr) 2.5vw 10.2vw 3vw 10vw 1.5vw 5vw",
            }}
          >
            <p style={{ color: "white" }}>{t("sceneTen.simplestForm")}</p>
            <p style={{ color: "white" }}>=</p>
            <div className="fraction-wrapper">
              <div className="fraction-row">
                <p style={{ color: "white" }}>12 ÷</p>
                <Box
                  value={4}
                  style={{
                    background: "#ffffffbd",
                    border: "none",
                    width: "4vw",
                  }}
                />
              </div>
              <div className="fraction-divider"></div>
              <div className="fraction-row">
                <p style={{ color: "white" }}>8 ÷</p>
                <Box
                  value={4}
                  style={{
                    background: "#ffffffbd",
                    border: "none",
                    width: "4vw",
                  }}
                />
              </div>
            </div>
            <p style={{ color: "white" }}>=</p>
            <Box beat={beat} value={optionValue} boxCss={boxCss} style={{height:"13vh",width:"7vw"}}/>
          </div>
          {allDisabled && (
            <div className="align-row" style={{
                gridTemplateColumns: 'minmax(18vw, 1fr) 2.5vw 10.2vw 3vw 10vw 1.5vw 5vw'
            }}>
              <p style={{ color: "white" }}>{t("sceneEleven.lengthWidth")}</p>
              <p style={{ color: "white" }}>=</p>
              <p style={{ color: "white" }}>3 : 2</p>
            </div>
          )}
        </div>

        <div className="keypad">
          <p className="para">{t("sceneEleven.whatIsWidth")}</p>
          <div className="align-buttons">
            <button
              type="button"
              className={btnClass(1)}
              onClick={() => {
                setOptionValue(
                  <Fraction
                    numerator={3}
                    denominator={2}
                    fontSize="2.5vw"
                    color="black"
                  />
                );
                handleOption(1);
              }}
              disabled={isBtnDisabled(1)}
              style={{
                height: "13vh",
              }}
            >
              <Fraction
                numerator={3}
                denominator={2}
                fontSize="2.5vw"
                color="black"
              />
            </button>

            <button
              type="button"
              className={btnClass(2)}
              onClick={() => {
                setOptionValue(
                  <Fraction
                    numerator={2}
                    denominator={3}
                    fontSize="2.5vw"
                    color="black"
                  />
                );
                handleOption(2);
              }}
              style={{
                height: "13vh",
              }}
              disabled={isBtnDisabled(2)}
            >
              <Fraction
                numerator={2}
                denominator={3}
                fontSize="2.5vw"
                color="black"
              />
            </button>
          </div>
          {showFeedback !== "" && (
            <p className={`${allDisabled ? "frame-success" : "frame-error"}`}>
              {!allDisabled && showFeedback}
              {allDisabled && (
                <p style={{ fontSize: "2vw" }}>
                  {t("sceneEleven.correct")}{" "}
                  <Fraction numerator={3} denominator={2} lineWidth="3vw" />{" "}
                  {t("sceneEleven.success")}
                </p>
              )}
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

export default SceneEleven;
