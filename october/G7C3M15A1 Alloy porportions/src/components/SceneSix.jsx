import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Fraction from "./Fraction";
import ReusableButton from "./ReusableButton";

const SceneSix = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [buttonId, setButtonId] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState([]); // track disabled buttons
  const [allDisabled, setAllDisabled] = useState(false); // disable all after correct
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(false);
  const handleClick = (id) => {
    if (id === 3) {
      playCorrect();
      setButtonId(3);
      setMessage(t("sceneSix.success"));
      setAllDisabled(true);
      setNext(true);
    } else if (id === 1) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorOne"));
      setDisabledButtons((prev) => [...prev, id]); // disable only wrong clicked button
    } else if (id === 2) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorTwo"));
      setDisabledButtons((prev) => [...prev, id]); // disable only wrong clicked button
    } else if (id === 4) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorThree"));
      setDisabledButtons((prev) => [...prev, id]); // disable only wrong clicked button
    }
  };

  const getButtonStyle = (id) => {
    // Correct and selected
    if (buttonId === 3 && id === 3) {
      return {
        backgroundColor: "#354b46",
        color: "white",
        border: "0.3vw dashed darkgreen",
        cursor: "not-allowed",
      };
    }
    // Wrong and clicked
    if (disabledButtons.includes(id)) {
      return {
        backgroundColor: "#8d6a68",
        color: "white",
        border: "0.3vw dashed darksalmon",
        cursor: "not-allowed",
      };
    }
    // After correct answer: make other buttons salmon
    if (allDisabled && id !== 3) {
      return {
        backgroundColor: "#8d6a68",
        color: "white",
        border: "0.3vw dashed darksalmon",
        cursor: "not-allowed",
      };
    }
    // Default
    return {
      backgroundColor: "var(--secondary-color)",
      color: "white",
      border: "0.3vw solid transparent",
    };
  };

  const isDisabled = (id) => {
    if (allDisabled) return true; // disable all after correct
    return disabledButtons.includes(id); // disable wrong clicked ones
  };

  return (
    <div className="scene-container">
      <div className="heading">
        <p>
          <span>{t("sceneOne.aCertain")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.twoMetals")}</span>
          <span>{t("sceneOne.ifANew")}</span>
          <span style={{ color: "white" }}>{t("sceneOne.sameAlloy")}</span>
          <span style={{ color: "#b6d7a8" }}>{t("sceneOne.howManyGrams")}</span>
        </p>
      </div>

      <div className="main">
        <div className="left">
          <p>
            <span>{t("sceneSix.sloveThis")}</span>
            <span style={{ color: "white" }}>{t("sceneSix.findTheValue")}</span>
          </p>
        </div>

        <div className="right">
          <div
            className="given"
            style={{
              alignItems: "center",
              gap: "7vh",
            }}
          >
            <p style={{ fontSize: "3vw" }}>{t("sceneFive.qs")}</p>
            <div className="align-fraction">
              <p>𝒳</p>
              <p>=</p>
              <Fraction
                numerator={"7.5 × 45"}
                denominator={3}
                fontSize={"4vw"}
                lineHeight={"0.5vh"}
              />
            </div>

            {message !== "" && (
              <p
                style={{
                  background: buttonId === 3 ? "#354b46" : "#8d6a68",
                  border:
                    buttonId === 3
                      ? "0.3vw dashed darkgreen"
                      : "0.3vw dashed darksalmon",
                  width: "28vw",
                  height: "18vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "1.3vw",
                }}
              >
                {message}
              </p>
            )}
          </div>

          <div className="tofind" style={{ alignItems: "center", gap: "5vh" }}>
            <p
              style={{
                fontSize: "2vw",
                textAlign: "center",
              }}
            >
              {t("sceneSix.findValueX")}
            </p>

            <ReusableButton
              label={"𝒳 = 18"}
              width={"15vw"}
              height={"9vh"}
              showActive={false}
              showTap={false}
              fontSize="3vw"
              onClick={() => handleClick(1)}
              disabled={isDisabled(1)}
              style={getButtonStyle(1)}
            />

            <ReusableButton
              label={"𝒳 = 202.5"}
              width={"15vw"}
              height={"9vh"}
              showActive={false}
              showTap={false}
              fontSize="3vw"
              onClick={() => handleClick(2)}
              disabled={isDisabled(2)}
              style={getButtonStyle(2)}
            />

            <ReusableButton
              label={"𝒳 = 112.5"}
              width={"15vw"}
              height={"9vh"}
              showActive={false}
              showTap={false}
              fontSize="3vw"
              onClick={() => handleClick(3)}
              disabled={isDisabled(3)}
              style={getButtonStyle(3)}
            />
            <ReusableButton
              label={"𝒳 = 1125"}
              width={"15vw"}
              height={"9vh"}
              showActive={false}
              showTap={false}
              fontSize="3vw"
              onClick={() => handleClick(4)}
              disabled={isDisabled(4)}
              style={getButtonStyle(4)}
            />
          </div>
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
        {!next && <p>{t("instructions.correctOption")}</p>}
        {next && <p>{t("instructions.tapToContinue")}</p>}
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
              bottom={"0%"}
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

export default SceneSix;
