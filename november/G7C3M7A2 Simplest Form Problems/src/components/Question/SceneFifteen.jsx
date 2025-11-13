import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";

const SceneFifteen = ({ goNext, goPrev }) => {
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
      setShowFeedback(t("sceneFourteen.success"));
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
      setShowFeedback(t("sceneFifteen.error"));

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
          <span>{t("sceneFourteen.convertEach")} </span>
        </p>
      </div>

      <div className="main">
        <div
          className="main-content"
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "3vh 3vw",
            gap:'4vh'
          }}
        >
          <div
            className="align-row"
            style={{
              gridTemplateColumns:
                "minmax(26vw, 1fr) 3.5vw 10.2vw 3vw 10vw 1.5vw 5vw",
            }}
          >
            <p style={{ color: "white" }}>
              {t("sceneThirteen.ratioOfMangoesOranges")}
            </p>
            <p style={{ color: "white", fontSize: "3vw" }}>=</p>
            <Box
              value={"2.8 : 4.2"}
              style={{
                width: "12vw",
                height: "10vh",
                border: "none",
                background: "#ffffffbd",
              }}
            />
          </div>
          <div
            className="align-row"
            style={{
              gridTemplateColumns:
                "minmax(30.3vw, 1fr) 8.5vw 1.2vw 3vw 10vw 1.5vw 5vw",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "3vw",
                paddingRight: "3vh",
                textAlign: "right",
              }}
            >
              ={" "}
            </p>
            <Box
              value={
                <Fraction
                  numerator={28}
                  denominator={10}
                  color="black"
                  fontSize="2.5"
                />
              }
              style={{
                width: "8vw",
                height: "14vh",
                border: "none",
                background: "#ffffffbd",
              }}
            />
            <p style={{ color: "white", fontSize: "3vw" }}> : </p>
            <Box
              value={optionValue}
              beat={beat}
              boxCss={boxCss}
              style={{
                width: "8vw",
                height: "14vh",
              }}
            />
          </div>
        </div>

        <div className="keypad">
          <p className="para">{t("sceneFifteen.whatIsWidth")}</p>
          <div className="align-buttons">
            <button
              type="button"
              className={btnClass(1)}
              onClick={() => {
                setOptionValue(
                  <Fraction
                    numerator={42}
                    denominator={10}
                    color="black"
                    fontSize="2.5"
                  />
                );
                handleOption(1);
              }}
              style={{
                height: "12vh",
              }}
              disabled={isBtnDisabled(1)}
            >
              <Fraction
                numerator={42}
                denominator={10}
                color="black"
                fontSize="2.5"
              />
            </button>

            <button
              type="button"
              className={btnClass(2)}
              onClick={() => {
                setOptionValue(
                  <Fraction
                    numerator={42}
                    denominator={100}
                    color="black"
                    fontSize="2.5"
                  />
                );
                handleOption(2);
              }}
              style={{
                height: "12vh",
              }}
              disabled={isBtnDisabled(2)}
            >
              <Fraction
                numerator={42}
                denominator={100}
                color="black"
                fontSize="2.5"
              />
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

export default SceneFifteen;
