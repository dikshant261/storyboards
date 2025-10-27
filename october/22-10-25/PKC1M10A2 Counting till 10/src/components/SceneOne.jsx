import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import { useTranslation } from "react-i18next";
import Fivefinger from "../assets/Fivefinger.png";
import Onefinger from "../assets/Onefinger.png";
import fourfinger from "../assets/fourfinger.png";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Tap from "./Tap";

const questions = [
  {
    imageOne: Onefinger,
    imageTwo: Fivefinger,
    correct: 6,
    options: [4, 5, 6, 8],
  },
  {
    imageOne: fourfinger,
    imageTwo: Fivefinger,
    correct: 9,
    options: [5, 7, 4, 9],
  },
];

const SceneOne = ({ goPrev, goNext }) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonStates, setButtonStates] = useState({});
  const [next, setNext] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Initialize button states dynamically for current question
  React.useEffect(() => {
    const initialStates = {};
    currentQuestion.options.forEach((opt) => {
      initialStates[opt] = { color: "", disabled: false };
    });
    setButtonStates(initialStates);
    setNext(false);
  }, [currentIndex]);

  const handleClick = (value) => {
    if (value === currentQuestion.correct) {
      // ✅ Correct answer
      playCorrect();
      setButtonStates((prev) => {
        const newStates = {};
        Object.keys(prev).forEach((key) => {
          newStates[key] = {
            color: key === String(value) ? "green" : "salmon",
            disabled: true,
          };
        });
        return newStates;
      });
      setNext(true);
    } else {
      // ❌ Wrong answer
      playWrong();
      setButtonStates((prev) => ({
        ...prev,
        [value]: { color: "salmon", disabled: true },
      }));
    }
  };

  const handleNext = () => {
    playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      window.location.reload();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Optionally goPrev() to previous scene
      playClick();
      goPrev && goPrev();
    }
  };

  return (
    <div className="scene-container">
      <div className="top">
        <p className="top-heading">{t("count")}</p>
        <div className="align-hand-image">
          <p className="shout-loud">{t("shout")}</p>
          <img src={raisehandchild} className="boy-hand" alt="child" />
        </div>
      </div>

      <div className="main">
        <div className="one">
          <div className="align-row">
            <img
              src={currentQuestion.imageOne}
              className="image-two"
              style={{ width: "20vw", transform: "scaleX(-1)" }}
              alt="one"
            />
            <img
              src={currentQuestion.imageTwo}
              style={{ width: "20vw" }}
              alt="five"
            />
          </div>

          {/* number buttons */}
          <div className="align-row" style={{ gap: "5vw", marginTop: "3vh" }}>
            {currentQuestion.options.map((num) => (
              <button
                key={num}
                className="number-option"
                disabled={buttonStates[num]?.disabled}
                onClick={() => handleClick(num)}
                style={{
                  color:
                    buttonStates[num]?.color === "green"
                      ? "green"
                      : buttonStates[num]?.color === "salmon"
                      ? "salmon"
                      : "white",
                  cursor: buttonStates[num]?.disabled
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Previous Button */}
        <button
          className="align-previous"
          onClick={handlePrev}
          style={{
            opacity: currentIndex === 0 ? "0.6" : "1",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
          disabled={currentIndex === 0}
        >
          {t("buttons.previous")}
        </button>

        {/* Next Button */}
        {!next ? (
          <button
            className="align-Next"
            style={{
              opacity: "0.6",
              cursor: "not-allowed",
            }}
            disabled
          >
            {t("buttons.Next")}
          </button>
        ) : (
          <div>
            <Tap bottom={"0vw"} right={"2%"} />
            <button className="align-Next" onClick={handleNext}>
              {t("buttons.Next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneOne;
