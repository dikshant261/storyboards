import React, { use, useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import Keypad from "../Keypad";
import LenghtBox from "../LenghtBox";
const SceneFive = ({ goNext, goPrev }) => {
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
  const handleKeypadInput = (value) => {
    playClick();
    setErrorShow(false);
    setBoxCss("");
    if (beatOne) {
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
      if (boxOneValue === "10") {
        playCorrect();
        setBeatOne(false);
        setBeatTwo(true);
        setFlag(2);
        setErrorShow(false);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
    } else if (beatTwo) {
      setErrorShow(true);
      if (boxTwoValue === "8") {
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
    <div className="scenetwo-container">
      <div className="heading">
        <p>
          {t("sceneThree.whatIs")}{" "}
          <span style={{ color: "white" }}>{t("sceneThree.lengthRatio")}</span>{" "}
          <span>{t("sceneThree.frameA", { frame: "B" })}</span>
        </p>
      </div>
      <div className="main">
        <div className="image-1 opacity">
          <p>{t("frameA")}</p>
          <FrameImagTwo width="18vw" length={10} breadth={6} />
          <div className="opacity">
            <LenghtBox
              success={true}
              value={1}
              boxOneValue={10}
              boxTwoValue={6}
              color={""}
            />
          </div>
          <div className="opacity">
            <LenghtBox
              success={true}
              boxOneValue={5}
              boxTwoValue={3}
              color={""}
              value={2}
            />
          </div>
        </div>
        <div className="image-2">
          <p>{t("frameB")}</p>
          <FrameImagTwo width="19vw" height={"33vh"} length={10} breadth={8} />
          <div>
            <LenghtBox
              beatOne={beatOne}
              beatTwo={beatTwo}
              boxOneValue={boxOneValue}
              boxTwoValue={boxTwoValue}
              boxCss={boxCss}
              success={success}
              value={1}
            />
          </div>
          <div style={{ opacity: "0.6" }}>
            <LenghtBox value={2} />
          </div>
        </div>
        <div className="image-3 opacity">
          <p>{t("frameC")}</p>
          <FrameImagTwo width="21vw" length={15} breadth={9} />
          <div className="opacity">
            <LenghtBox value={1} />
          </div>
          <div className="opacity">
            <LenghtBox value={2} />
          </div>
        </div>
        <div className="keypad">
          <p>
            <Keypad
              onInput={handleKeypadInput}
              checkHandle={handleCheck}
              flag={flag}
              frame={"B"}
              num1={"10"}
              num2={"8"}
              errorShow={errorShow}
              boxOneValue={boxOneValue}
              boxTwoValue={boxTwoValue}
              disabled={disabled}
            />
          </p>
        </div>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        {!next && <p>{t("navigation.enterEach")}</p>}
        {next && <p>{t("navigation.tapSimplify")}</p>}
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

export default SceneFive;
