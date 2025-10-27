import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import QuestionHandler from "./QuestionHandler";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import { PlayAudio, playClick } from "./PlayAudio";
import "./scene.css";

const Scene = () => {
  const { t } = useTranslation();

  const raisehandchild = "assets/raisehandchild.png";
  const Mindy_Pointing_Up_Mid = "assets/Mindy_Pointing_Up_Mid.png";
  const speaker = "assets/speaker.png";

  const [start, setStart] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [feedback, setFeedback] = useState("");

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

        console.log("Current Question:", currentQuestion);
        console.log("Current Question Index:", index);

        return (
          <div className="scene-container">
            {/* Top Section */}
            <div className="top">
              <div className="top-heading">{t("tapNumbers")}</div>
              <div className="align-hand-image">
                <p className="shout-loud">{t("shoutLound")}</p>
                <img src={raisehandchild} className="boy-hand" alt="Boy hand" />
              </div>
            </div>

            {/* Main Section */}
            <div className="main">
              {/* Girl Section */}
              <div className="girl-container">
                <div className="box">
                  {start ? (
                    <p>{t("tapSpeaker")}</p>
                  ) : (
                    <p>{t("tapTheNumbers")}</p>
                  )}
                  <div className="align-triangle">▼</div>
                </div>
                <img
                  src={Mindy_Pointing_Up_Mid}
                  className="girl-image"
                  alt="Girl"
                />
              </div>

              {/* Question + Options */}
              <div className="one">
                <div className="speaker-align">
                  <img
                    src={speaker}
                    className={`speaker ${isPlaying ? "disabled-speaker" : ""}`}
                    onClick={() => handleSpeakerClick(currentQuestion.audio)}
                    style={{
                      cursor: isPlaying ? "not-allowed" : "pointer",
                    }}
                    alt="Speaker"
                  />
                  {start && <Tap bottom="-23%" left="21%" width="6vw" />}
                </div>

                <div className="align-next">
                  <ReusableButton
                    label={
                      isLastQuestion
                        ? t("buttons.startOver")
                        : t("buttons.Next")
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

                {/* Render options */}
                {currentQuestion.options.map((option, idx) => {
                  console.log(`Rendering option ${idx}:`, option);
                  const imageClass =
                    idx === 0
                      ? "image-one"
                      : idx === 1
                      ? "image-two"
                      : "image-three";
                  const imageSrc = `assets/${option.image}`;
                  console.log(`Image ${idx} src:`, imageSrc);

                  return (
                    <img
                      key={idx}
                      src={imageSrc}
                      className={`grid-image-wrapper ${imageClass} ${
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
              </div>
            </div>

            {/* Feedback Message */}
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
        );
      }}
    </QuestionHandler>
  );
};

export default Scene;
