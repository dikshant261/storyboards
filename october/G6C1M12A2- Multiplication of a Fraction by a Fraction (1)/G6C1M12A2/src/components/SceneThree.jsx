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

const SceneThree = ({ goNext, goPrev }) => {
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
    if (boxOneValue === "6" && boxTwoValue === "12" && attempt === 0) {
      playCorrect();
      setAnswer(false);
      setDisabled(false);
      setSuccessTrue(true);
      setNext(true);
    } else if (boxOneValue === "6" && boxTwoValue === "12" && attempt > 0) {
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
    "3-2": { color: "orange" },
  };
  const tables = [
    {
      rows: 4,
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
      },
      style: {
        width: "16vw",
      },
    },
    {
      rows: 1,
      cols: 3,
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
              num={3}
              deno={4}
              style={{ color: successTrue ? "orange" : "", fontSize: "7vw" }}
            />
            <p style={{ fontSize: "7vw" }}>✕</p>
            <Fraction
              num={2}
              deno={3}
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
                num={6}
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
                num={6}
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
              <DynamicTable rows={4} cols={3} coloredCells={coloredCells} />
              <Fraction
                num={6}
                deno={12}
                style={{
                  fontSize: "2vw",
                  color: "green",
                  position: "absolute",
                  bottom: "0%",
                  left: "-19%",
                }}
              />
              <Fraction
                num={3}
                deno={4}
                style={{
                  fontSize: "2vw",
                  color: "orange",
                  position: "absolute",
                  bottom: "0%",
                  right: "-10%",
                }}
              />
              <Fraction
                num={2}
                deno={3}
                style={{
                  fontSize: "2vw",
                  color: "cyan",
                  position: "absolute",
                  top: "-29%",
                  left: "11%",
                }}
              />
            </div>
          )}
          {(wrongOne || wrongTwo) && (
            <div
              className="box-align"
              style={{ flexDirection: "row", gap: "15vw" }}
            >
              <DynamicTableTwo tables={tables} />
              <div style={{ marginTop: "4vw" }}>
                <DynamicTable
                  rows={4}
                  cols={3}
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
                fontSize: "2vw",
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
                fontSize: "4vw",
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
                fontSize: "2vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "#fa8072b5",
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
                fontSize: "1.3vw",
                textAlign: "center",
                position: "fixed",
                bottom: "16%",
                background: "green",
                padding: "0.5vh 1vw",
                borderRadius: "1vw",
              }}
            >
              {t("sceneOne.successTwo", { count: 6, counttwo: 12 })}
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

export default SceneThree;
