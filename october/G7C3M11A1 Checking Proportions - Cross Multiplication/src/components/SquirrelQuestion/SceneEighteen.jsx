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
const SceneEighteen = ({ goNext, goPrev }) => {
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
    t("sceneFive.findProduct", { num1: "1.2", num2: "2.4" })
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
      if (boxOneValue === "2.88") {
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
                bottom: "-7%",
                width: "30%",
                zIndex: "1",
                transform: "rotate(-30deg)",
              }}
            >
              <path
                d="M18 18L6 6M6 6V8M6 6H8"
                stroke="gray"
                strokeWidth="0.4"
                fill="none"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="5.9 5.9 12.2 12.2"
              style={{
                position: "absolute",
                bottom: "-9%",
                width: "30%",
                zIndex: "1",
                transform: "rotate(121deg)",
                
              }}
            >
              <path
                d="M18 18L6 6M6 6V8M6 6H8"
                stroke="white"
                strokeWidth="0.4"
                fill="none"
              />
            </svg>
            <div className="image-1">
              <p>{t("paintA")}</p>
              <FrameImagTwoL width="10vw" redml={"1.5"} blueml={"2.4"} />
              <LenghtBox
                boxOneValue={"1.5"}
                boxTwoValue={"2.4"}
                color={"rgba(2, 2, 63, 0.758)"}
                success={true}
                value={1}
                numberColor="gray"
              />
            </div>
            <div className="image-2">
              <p>{t("paintB")}</p>
              <FrameImagTwoL width="8vw" redml={"1.2"} blueml={"1.8"} />
              <div>
                <LenghtBox
                  boxOneValue={"1.2"}
                  boxTwoValue={"1.8"}
                  color={"rgba(2, 2, 63, 0.758)"}
                  success={true}
                  value={2}
                  numberColor="gray"
                />
              </div>
            </div>
          </div>
          <div className="cross-box">
            <div>
              <LenghtBoxTwo
                boxOneValue={"2.7"}
                success={true}
                color={"rgba(2, 2, 63, 0.758)"}
                num={1}
              />
            </div>
            <div>
              <LenghtBoxTwo
                beatOne={beatOne}
                boxOneValue={boxOneValue}
                success={success}
                boxCss={boxCss}
                num={2}
              />
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
              num1={"1.2"}
              num2={"2.4"}
              errorShow={errorShow}
              boxOneValue={boxOneValue}
              disabled={disabled}
              message={message}
              ans={"2.88"}
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
        {next && <p>{t("navigation.tapCheckRatio")}</p>}
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

export default SceneEighteen;
