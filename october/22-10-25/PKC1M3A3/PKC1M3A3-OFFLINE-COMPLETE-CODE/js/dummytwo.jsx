import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import {
  playOne,
  playTwo,
  playThree,
  playFour,
  playFive,
  playClick,
} from "./PlayAudio";
import "./scene.css";

const Scene = () => {
  const { t } = useTranslation();

  const raisehandchild = "assets/raisehandchild.png";
  const Onefinger = "assets/Onefinger.png";
  const Twofinger = "assets/Twofinger.png";
  const Threefinger = "assets/Threefinger.png";
  const fourfinger = "assets/fourfinger.png";
  const Fivefinger = "assets/Fivefinger.png";
  const speaker = "assets/speaker.png";

  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  const [start, setStart] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const allClicked =
    clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;

  const handleSpeakerClick = (audioPath) => {
    console.log("Speaker clicked! Audio path:", audioPath);
    if (isPlaying) {
      console.log("Already playing, returning...");
      return;
    }

    setIsPlaying(true);
    setStart(false);
    PlayAudio(audioPath);

    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };

  return (
    <QuestionHandler>
      {({
        index,
        isCompleted,
        currentQuestion,
        totalQuestions,
        handleOptionClick,
        handleNext,
        isNextDisabled,
        isLastQuestion,
      }) => {
        if (!currentQuestion) {
          return <div className="scene-container">Loading questions...</div>;
        }
        return (
          <div className="scene-container">
            {/* Top Section */}
            <div className="top">
              <div className="top-heading">{t("count")}</div>
              <div className="align-hand-image">
                <p className="shout-loud">{t("shout")}</p>
                <img
                  src={raisehandchild}
                  className="boy-hand"
                  alt="Raise hand"
                />
              </div>
            </div>

            {/* Main Section */}
            <div className="main">
              <div className="one">
                {currentQuestion.options.map((option, idx) => {
                  console.log(`Rendering option ${idx}:`, option);
                  const imageSrc = `assets/${option.image}`;
                  console.log(`Image ${idx} src:`, imageSrc);

                  return (
                    <img
                      key={idx}
                      src={imageSrc}
                      className={`grid-image-wrapper ${
                        start ? "opacity" : ""
                      } ${disabledOptions.includes(idx) ? "selected" : ""}`}
                      onClick={() => {
                        if (
                          !start &&
                          !disabledOptions.includes(idx) &&
                          !isCompleted
                        ) {
                          const result = handleOptionClick(option);
                          setFeedback(result.feedback);
                          PlayAudio("assets/click.mp3");

                          if (!result.success) {
                            setDisabledOptions([...disabledOptions, idx]);
                          }
                        }
                      }}
                      style={{
                        cursor:
                          start || disabledOptions.includes(idx) || isCompleted
                            ? "not-allowed"
                            : "pointer",
                      }}
                      alt={`Option ${idx + 1}`}
                    />
                  );
                })}
                <img
                  src={speaker}
                  className={`speaker ${isPlaying ? "disabled-speaker" : ""}`}
                  onClick={() => handleSpeakerClick(currentQuestion.audio)}
                  style={{
                    cursor: isPlaying ? "not-allowed" : "pointer",
                  }}
                  alt="Speaker"
                />
              </div>
              {feedback && (
                <div
                  className="feedback-message"
                  style={{
                    position: "fixed",
                    bottom: "1%",
                    left: "57%",
                    transform: "translateX(-50%)",
                    backgroundColor: isCompleted ? "#4CAF50" : "#f44336",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "8px",
                    fontSize: "1.5rem",
                    zIndex: 1000,
                  }}
                >
                  {feedback}
                </div>
              )}
            </div>

            {/* Footer Section */}
            <div className="footer">
              <p>{t("tap")}</p>
              <ReusableButton
                label={
                  isLastQuestion ? t("buttons.startOver") : t("buttons.Next")
                }
                fontSize="3vw"
                padding="1vh 5vw"
                showTap={false}
                showActive={false}
                onClick={() => {
                  playClick();
                  handleNext();
                  setStart(true);
                  setDisabledOptions([]);
                  setFeedback("");
                }}
                disabled={isNextDisabled}
              />
            </div>
          </div>
        );
      }}
    </QuestionHandler>
  );
};

export default Scene;
