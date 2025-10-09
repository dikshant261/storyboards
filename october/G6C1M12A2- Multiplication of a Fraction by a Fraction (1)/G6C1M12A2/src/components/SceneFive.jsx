import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import Keypad from "./Keypad";
import Box from "./Box";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import DynamicTable from "./DynamicTable";
import DynamicTableTwo from "./DynamicTableTwo";
import Tap from "./Tap";

const SceneFive = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [activeBox, setActiveBox] = useState("boxOne"); // Tracks which box is active
  const [boxOneValue, setBoxOneValue] = useState(""); // State for first box
  const [boxTwoValue, setBoxTwoValue] = useState(""); // State for second box
  const [successTrue, setSuccessTrue] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [answer, setAnswer] = useState(true);
  const [wrongOne, setWrongOne] = useState(false);
  const [gap, setGap] = useState(false);
  const [wrongTwo, setWrongTwo] = useState(false);
  const [successTwo, setSuccessTwo] = useState(false);
  const [next, setNext] = useState(false);
  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleKeypadInput = (value) => {
    playClick();
    if (activeBox === "boxOne") {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxOneValue((prev) => prev.slice(0, -1));
      } else if (value === "x") {
        // Clear the current result
        setBoxOneValue("");
      } else if (boxOneValue.length < 2) {
        // Append the value if length is less than 2
        setBoxOneValue((prev) => prev + value);
      }
    } else if (activeBox === "boxTwo") {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxTwoValue((prev) => prev.slice(0, -1));
      } else if (value === "x") {
        // Clear the current result
        setBoxTwoValue("");
      } else if (boxTwoValue.length < 2) {
        // Append the value if length is less than 2
        setBoxTwoValue((prev) => prev + value);
      }
    }
  };
  const checkHandle = () => {
    if (boxOneValue === "5" && boxTwoValue === "12" && attempt === 0) {
      playCorrect();
      setAnswer(false);
      setDisabled(false);
      setSuccessTrue(true);
      setNext(true);
    } else if (boxOneValue === "5" && boxTwoValue === "12" && attempt > 0) {
      playCorrect();
      setAnswer(false);
      setDisabled(false);
      setSuccessTwo(true);
      setErrorTwo(false);
      setErrorOne(false);
      setNext(true);
    } else if (attempt === 0) {
      playWrong();
      setAttempt(1);
      setErrorTwo(false);
      setWrongOne(true);
      setErrorOne(true);
      setGap(true);
    } else if (attempt > 0) {
      playWrong();
      setErrorOne(false);
      setErrorTwo(true);
      setWrongOne(false);
      setWrongTwo(true);
    }
  };
  const coloredCells = {
    "0-0": { color: "cyan" },
    "0-1": { color: "cyan" },
    "1-0": { color: "green", text: 1 },
    "1-1": { color: "green", text: 2 },
    "1-2": { color: "orange" },
    "2-0": { color: "green", text: 3 },
    "2-1": { color: "green", text: 4 },
    "2-2": { color: "orange" },
    "3-0": { color: "green", text: 5 },
    "3-1": { color: "green", text: 6 },
    "3-2": { color: "orange" },
    "4-0": { color: "green", text: 7 },
    "4-1": { color: "green", text: 8 },
    "5-0": { color: "green", text: 9 },
    "5-1": { color: "green", text: 10 },
  };
  const coloredCellsTwo = {
    "0-0": { color: "cyan" },
    "0-1": { color: "cyan" },
    "1-0": { color: "green" },
    "1-1": { color: "green" },
    "1-2": { color: "orange" },
    "2-0": { color: "green" },
    "2-1": { color: "green" },
    "2-2": { color: "orange" },
    "3-0": { color: "green" },
    "3-1": { color: "green" },
    "4-0": { color: "green" },
    "4-1": { color: "green" },
    "5-0": { color: "green" },
    "5-1": { color: "green" },
  };
  const tables = [
    {
      rows: 6,
      cols: 1,
      coloredCells: {
        "1-0": "orange",
        "1-1": "orange",
        "1-2": "orange",
        "2-0": "orange",
        "2-1": "orange",
        "2-2": "orange",
        "3-0": "orange",
        "3-1": "orange",
        "3-2": "orange",
        "4-0": "orange",
        "4-2": "orange",
        "5-0": "orange",
        "5-2": "orange",
      },
      style: {
        width: "16vw",
      },
    },
    {
      rows: 1,
      cols: 2,
      coloredCells: {
        "0-0": "cyan",
        "1-0": "cyan",
        "2-0": "cyan",
        "0-1": "cyan",
        "1-1": "cyan",
        "2-1": "cyan",
      },
      style: {
        height: "16vh",
      },
    },
  ];

  return (
    <div className="scene-conatiner">
      <div className="heading">{t("sceneOne.heading")}</div>
      <div className="main-content">
        <div className="question-container">
          <div
            className="question-align"
            style={{
              gap: gap ? "7vw" : "",
            }}
          >
            {wrongTwo && (
              <div
                style={{
                  position: "fixed",
                  top: "10%",
                  width: "21vw",
                  left: "14%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="3.9 -0.85 15.2 0.95"
                >
                  <path
                    d="M 4 0 C 9 -1 14 -1 19 0"
                    stroke="orange"
                    stroke-width="0.2"
                    fill="none"
                  />
                </svg>
              </div>
            )}
            {wrongTwo && (
              <div
                style={{
                  position: "fixed",
                  top: "36%",
                  width: "20vw",
                  left: "14.5%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="3.9 -0.1 15.2 1.355"
                >
                  <path
                    d="M 4 0 C 9 2 15 1 19 0"
                    stroke="orange"
                    stroke-width="0.2"
                    fill="none"
                  />
                </svg>
              </div>
            )}
            <Fraction
              num={5}
              deno={6}
              style={{ color: successTrue ? "orange" : "", fontSize: "7vw" }}
            />
            <p style={{ fontSize: "7vw" }}>✕</p>
            <Fraction
              num={1}
              deno={2}
              fontSize="7vw"
              style={{ color: successTrue ? "cyan" : "", fontSize: "7vw" }}
            />
            <p style={{ fontSize: "7vw" }}>=</p>
            {answer && (
              <div className="box-align">
                {/* box one */}
                <Box
                  beat={activeBox === "boxOne"}
                  value={boxOneValue}
                  onClick={() => setActiveBox("boxOne")}
                />
                <div className="box-line"></div>
                {/* box two */}
                <Box
                  beat={activeBox === "boxTwo"}
                  value={boxTwoValue}
                  onClick={() => setActiveBox("boxTwo")}
                />
              </div>
            )}
            {successTrue && (
              <Fraction
                num={5}
                deno={12}
                style={{
                  fontSize: "7vw",
                  background: "green",
                  padding: "1vh 1vw",
                  border: "0.2vw solid white",
                  borderRadius: "1vw",
                }}
              />
            )}
            {successTwo && (
              <Fraction
                num={5}
                deno={12}
                style={{
                  fontSize: "7vw",
                  color: "#1dbf1dd1",
                }}
              />
            )}
          </div>
          {successTrue && (
            <div style={{ position: "relative" }}>
              <DynamicTable
                rows={6}
                cols={2}
                coloredCells={coloredCells}
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
              <Fraction
                num={5}
                deno={12}
                style={{
                  fontSize: "2vw",
                  color: "green",
                  position: "absolute",
                  bottom: "3%",
                  left: "-43%",
                }}
              />
              <Fraction
                num={5}
                deno={6}
                style={{
                  fontSize: "2vw",
                  color: "orange",
                  position: "absolute",
                  bottom: "3%",
                  right: "-26%",
                }}
              />
              <Fraction
                num={1}
                deno={2}
                style={{
                  fontSize: "2vw",
                  color: "cyan",
                  position: "absolute",
                  top: "-7%",
                  left: "-29%",
                }}
              />
            </div>
          )}
          {(wrongOne || wrongTwo) && (
            <div
              className="box-align"
              style={{ flexDirection: "row", gap: "15vw" }}
            >
              <DynamicTableTwo tables={tables} style={{ marginTop: "1vw" }} />
              <div style={{ marginTop: "0vw" }}>
                <DynamicTable
                  rows={6}
                  cols={2}
                  coloredCells={coloredCellsTwo}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
            </div>
          )}

          {successTrue && (
            <p
              style={{
                fontSize: "1.5vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "green",
                padding: "0.5vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneOne.success")}
            </p>
          )}
          {errorOne && (
            <p
              style={{
                fontSize: "2vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "#fa8072b5",
                padding: "0.5vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneOne.error")}
            </p>
          )}
          {errorTwo && (
            <p
              style={{
                fontSize: "1.4vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "rgba(250, 128, 114, 0.71)",
                padding: "0.5vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneOne.errorTwo")}
            </p>
          )}
          {successTwo && (
            <p
              style={{
                fontSize: "1.1vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "green",
                padding: "0.5vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneOne.successTwo", { count: 5, counttwo: 12 })}
            </p>
          )}
        </div>
        <div className="option-container">
          <Keypad
            onInput={handleKeypadInput}
            checkHandle={checkHandle}
            disabled={disabled}
          />
        </div>
      </div>
      {!next && (
        <div className="footer-heading">{t("navigation.tapNumpad")}</div>
      )}
      {next && <div className="footer-heading">{t("navigation.tapNext")}</div>}
      <div className="footer-button">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button
              onClick={() => {
                playClick();
                goNext();
              }}
            >
              {t("buttons.next")}
            </button>
            <Tap
              bottom={0}
              onClick={() => {
                playClick();
                goNext();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneFive;
