import React, { use, useState } from "react";
import "./sceneThree.css";
import { useTranslation } from "react-i18next";
import FrameImagTwo from "./FrameImageTwo";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import Keypad from "../Keypad";
import LenghtBox from "../LenghtBox";
import LenghtBoxTwo from "../LengthBoxTwo";
import purple from "../../assets/purple.png";
const SceneSeven = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(3);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [buttonId, setButtonId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showPurple, setShowPurple] = useState(false);
  const [message, setMessage] = useState(
    t("sceneFive.findProduct", { num1: 50, num2: 15 })
  );
  const handleResult = (id) => {
    if (id === 1) {
      playCorrect();
      setErrorMessage(t("feedBack.yesSuccess"));
      setShowPurple(true);
      setButtonId(id);
      setNext(true);
      setDisabled(true);
    } else {
      playWrong();
      setErrorMessage(t("feedBack.yesError"));
      setButtonId(id);
      setShowPurple(true);
    }
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  return (
    <div className="scenethree-container">
      <div className="heading">
        <p style={{ fontSize: "2.8vw" }}>
          {t("sceneSeven.expressThe")}
          <span style={{ color: "white" }}>{t("sceneSeven.lengthRatio")}</span>
          <span>{t("sceneSeven.frameA")}</span>
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
                bottom: "-8%",
                width: "30%",
                zIndex: "1",
                transform: "rotate(121deg)",
              }}
            >
              <path
                d="M18 18L6 6M6 6V8M6 6H8"
                stroke="gray"
                strokeWidth="0.4"
                fill="none"
              />
            </svg>
            <div
              className="image-1"
              style={{
                gap: showPurple ? "4vh" : "",
              }}
            >
              <p>{t("paintA")}</p>
              {!showPurple && (
                <FrameImagTwo width="8vw" redml={25} blueml={15} />
              )}
              {showPurple && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    width: "34vw",
                    height: "20vh",
                  }}
                >
                  <img
                    src={purple}
                    style={{
                      width: "8vw",
                    }}
                  />
                </div>
              )}
              <LenghtBox
                boxOneValue={25}
                boxTwoValue={15}
                color={"rgba(2, 2, 63, 0.758)"}
                success={true}
                numberColor="gray"
                allGray={true}
              />
            </div>
            <div
              className="image-2"
              style={{
                gap: showPurple ? "4vh" : "",
              }}
            >
              <p>{t("paintB")}</p>
              {!showPurple && (
                <FrameImagTwo width="10vw" redml={50} blueml={20} />
              )}
              {showPurple && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    width: "34vw",
                    height: "20vh",
                  }}
                >
                  <img
                    src={purple}
                    style={{
                      width: "8vw",
                      opacity:'0.7'
                    }}
                  />
                </div>
              )}
              <div>
                <LenghtBox
                  boxOneValue={50}
                  boxTwoValue={20}
                  color={"rgba(2, 2, 63, 0.758)"}
                  success={true}
                  numberColor="gray"
                  allGray={true}
                />
              </div>
            </div>
          </div>
          <div className="cross-box">
            <div>
              <LenghtBoxTwo
                boxOneValue={500}
                success={true}
                color={
                  buttonId === null
                    ? "rgba(2, 2, 63, 0.758)"
                    : disabled
                    ? ""
                    : "#855250"
                }
                num={1}
              />
            </div>
            <div>
              <LenghtBoxTwo
                boxOneValue={750}
                success={true}
                color={
                  buttonId === null
                    ? "rgba(2, 2, 63, 0.758)"
                    : disabled
                    ? ""
                    : "#855250"
                }
                num={2}
              />
            </div>
          </div>
        </div>
        <div
          className="keypad"
          style={{
            justifyContent: "flex-start",
            gap: "3vh",
          }}
        >
          <p
            className="para"
            style={{
              fontSize: "2vw",
            }}
          >
            {t("sceneSeven.sideKeypadHeading")}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4vw",
            }}
          >
            <button
              className="yes-button"
              onClick={() => handleResult(2)}
              style={{
                backgroundColor: buttonId === 2 ? "#855250" : "",
                cursor: buttonId === 2 || disabled ? "not-allowed" : "pointer",
              }}
              disabled={buttonId === 2 || disabled}
            >
              {t("buttons.yes")}
            </button>
            <button
              className="yes-button"
              onClick={() => handleResult(1)}
              style={{
                backgroundColor: disabled ? "#5a7f5e" : "",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              disabled={disabled}
            >
              {t("buttons.no")}
            </button>
          </div>
          {errorMessage !== "" && (
            <p
              style={{
                fontSize: "2vw",
                color: "white",
                backgroundColor: disabled ? "#5a7f5e" : "#855250",
                border: disabled
                  ? "0.3vw dashed darkgreen"
                  : "0.3vw dashed darksalmon",
                width: "23vw",
                height: "38vh",
                borderRadius: "1.3vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {errorMessage}
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
        {!next && <p>{t("navigation.obServeCross")}</p>}
        {next && <p>{t("navigation.nextQuestion")}</p>}
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

export default SceneSeven;
