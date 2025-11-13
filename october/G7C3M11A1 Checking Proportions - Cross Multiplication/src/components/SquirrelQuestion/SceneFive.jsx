import React, { use, useState } from "react";
import "./sceneThree.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import Keypad from "../Keypad";
import LenghtBox from "../LenghtBox";
import LenghtBoxTwo from "../LengthBoxTwo";
const SceneFive = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [flag, setFlag] = useState(3);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(
    t("sceneFive.findProduct", { num1: 25, num2: 20 })
  );
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
    }
  };
  const handleCheck = () => {
    if (beatOne) {
      setErrorShow(true);
      if (boxOneValue === "500") {
        playCorrect();
        setBeatOne(false);
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
        <p>{t("sceneFive.letsDoCross")}</p>
      </div>
      <div className="main">
        <div className="align-col">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1vw",
              position: "relative",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="5.9 5.9 12.2 12.2"
              style={{
                position: "absolute",
                bottom: "-13%",
                width: "30%",
                zIndex: "1",
                transform: "rotate(-34deg)",
              }}
            >
              <path
                d="M18 18L6 6M6 6V7M6 6H7"
                stroke="white"
                stroke-width="0.1"
                fill="#fff"
              />
            </svg>
            <div className="image-1">
              <p>{t("paintA")}</p>
              <FrameImagTwo width="8vw" redml={25} blueml={15} />
              <LenghtBox
                boxOneValue={25}
                boxTwoValue={15}
                color={"rgba(2, 2, 63, 0.758)"}
                success={true}
                value={2}
                numberColor="gray"
              />
            </div>
            <div className="image-2">
              <p>{t("paintB")}</p>
              <FrameImagTwo width="10vw" redml={50} blueml={20} />
              <div>
                <LenghtBox
                  boxOneValue={50}
                  boxTwoValue={20}
                  color={"rgba(2, 2, 63, 0.758)"}
                  success={true}
                  value={1}
                  numberColor="gray"
                />
              </div>
            </div>
          </div>
          <div className="cross-box">
            <div>
              <LenghtBoxTwo
                beatOne={beatOne}
                boxOneValue={boxOneValue}
                success={success}
                boxCss={boxCss}
                num={1}
              />
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
              num1={"25"}
              num2={"20"}
              errorShow={errorShow}
              boxOneValue={boxOneValue}
              disabled={disabled}
              message={message}
              ans={"500"}
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
        {next && <p>{t("navigation.tapForNextPair")}</p>}
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
