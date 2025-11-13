import React, { use, useState } from "react";
import "./sceneThree.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import Keypad from "../Keypad";
import LenghtBox from "../LenghtBox";
import LenghtBoxTwo from "../LengthBoxTwo";
import FrameImagTwoL from "./FrameImageTwoL";
const SceneNine = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [flag, setFlag] = useState(1);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(t("sceneThree.termA", { paint: "A" }));
  const handleKeypadInput = (value) => {
    playClick();
    setErrorShow(false);
    setBoxCss("");
    if (beatOne) {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxOneValue((prev) => prev.slice(0, -1));
      } else if (boxOneValue.length < 4) {
        // Append the value if length is less than 2
        setBoxOneValue((prev) => prev + value);
      }
    } else if (beatTwo) {
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
  const handleCheck = () => {
    if (beatOne) {
      setErrorShow(true);
      if (boxOneValue === "1.5") {
        playCorrect();
        setBeatOne(false);
        setBeatTwo(true);
        setMessage(t("sceneThree.termB", { paint: "A" }));
        setFlag(2);
        setErrorShow(false);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
    } else if (beatTwo) {
      setErrorShow(true);
      if (boxTwoValue === "2") {
        playCorrect();
        setBeatTwo(false);
        setSuccess(true);
        setDisabled(false);
        setNext(true);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
    }
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  return (
    <div className="scenethree-container">
      <div className="heading">
        <p>
          {t("sceneThree.expressThe")}{" "}
          <span style={{ color: "white" }}>{t("sceneThree.lengthRatio")}</span>{" "}
          <span>{t("sceneThree.frameA", { paint: "A" })}</span>
        </p>
      </div>
      <div className="main">
        <div className="align-col">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1vw",
            }}
          >
            <div className="image-1">
              <p>{t("paintA")}</p>
              <FrameImagTwoL width="8vw" redml={"1.5"} blueml={"2"} />
              <LenghtBox
                beatOne={beatOne}
                beatTwo={beatTwo}
                boxOneValue={boxOneValue}
                boxTwoValue={boxTwoValue}
                boxCss={boxCss}
                success={success}
                
              />
            </div>
            <div className="image-2 opacity">
              <p>{t("paintB")}</p>
              <FrameImagTwoL width="10vw" redml={"2.25"} blueml={"3"} />
              <div className="opacity">
                <LenghtBox value={1} />
              </div>
            </div>
          </div>
          <div className="cross-box opacity">
            <div className="opacity">
              <LenghtBoxTwo num={1} />
            </div>
            <div className="opacity">
              <LenghtBoxTwo num={2} />
            </div>
          </div>
        </div>
        <div className="keypad">
          <p>
            <Keypad
              onInput={handleKeypadInput}
              checkHandle={handleCheck}
              flag={flag}
              frame={"A"}
              num1={"1.5"}
              num2={"2"}
              errorShow={errorShow}
              boxOneValue={boxOneValue}
              boxTwoValue={boxTwoValue}
              disabled={disabled}
              message={message}
            />
          </p>
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
        {!next && <p>{t("navigation.enterEach")}</p>}
        {next && <p>{t("navigation.tapRatioPaintB", { paint: "B" })}</p>}
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

export default SceneNine;
