const Scene = () => {
  const raisehandchild = "assets/raisehandchild.png";
  const Mindy_Pointing_Up_Mid = "assets/Mindy_Pointing_Up_Mid.png";
  const speaker = "assets/speaker.png";
  const [start, setStart] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false); // prevent multiple plays
  const [disabledOptions, setDisabledOptions] = React.useState([]); // Array of disabled option indices
  const [feedback, setFeedback] = React.useState("");

  const handleSpeakerClick = (audioPath) => {
    console.log("Speaker clicked! Audio path:", audioPath);
    if (isPlaying) {
      console.log("Already playing, returning...");
      return; // stop if already playing
    }

    setIsPlaying(true);
    setStart(false);

    // Play the question audio
    PlayAudio(audioPath);

    // Assume each audio ~1.5s — adjust to your actual duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };
  return /*#__PURE__*/ React.createElement(
    QuestionHandler,
    null,
    ({
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
        return /*#__PURE__*/ React.createElement(
          "div",
          { className: "scene-container" },
          "Loading questions..."
        );
      }

      console.log("Current Question:", currentQuestion);
      console.log("Current Question Index:", index);

      return /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "scene-container",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "top",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "top-heading",
            },
            t("tapNumbers")
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "align-hand-image",
            },
            /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "shout-loud",
              },
              t("shoutLound")
            ),
            /*#__PURE__*/ React.createElement("img", {
              src: raisehandchild,
              className: "boy-hand",
            })
          )
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "main",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "girl-container",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "box",
              },
              start &&
                /*#__PURE__*/ React.createElement("p", null, t("tapSpeaker")),
              !start &&
                /*#__PURE__*/ React.createElement(
                  "p",
                  null,
                  t("tapTheNumbers")
                ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "align-triangle",
                },
                "\u25BC"
              )
            ),
            /*#__PURE__*/ React.createElement("img", {
              src: Mindy_Pointing_Up_Mid,
              className: "girl-image",
            })
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "one",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "speaker-align",
              },
              /*#__PURE__*/ React.createElement("img", {
                src: speaker,
                className: `speaker ${isPlaying ? "disabled-speaker" : ""}`,
                onClick: () => handleSpeakerClick(currentQuestion.audio),
                style: {
                  cursor: isPlaying ? "not-allowed" : "pointer",
                },
              }),
              start &&
                /*#__PURE__*/ React.createElement(Tap, {
                  bottom: "-23%",
                  left: "21%",
                  width: "6vw",
                })
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "align-next",
              },
              /*#__PURE__*/ React.createElement(ReusableButton, {
                label: isLastQuestion
                  ? t("buttons.startOver")
                  : t("buttons.Next"),
                fontSize: "3vw",
                padding: "1vh 5vw",
                showTap: false,
                showActive: false,
                onClick: () => {
                  playClick();
                  handleNext();
                  // Reset local state
                  setStart(true);
                  setDisabledOptions([]); // Reset disabled options for new question
                  setFeedback("");
                },
                disabled: isNextDisabled,
              })
            ),
            // Dynamically render options from currentQuestion
            currentQuestion.options.map((option, idx) => {
              console.log(`Rendering option ${idx}:`, option);
              const imageClass =
                idx === 0
                  ? "image-one"
                  : idx === 1
                  ? "image-two"
                  : "image-three";
              const imageSrc = `assets/${option.image}`;
              console.log(`Image ${idx} src:`, imageSrc);
              return /*#__PURE__*/ React.createElement("img", {
                key: idx,
                src: imageSrc,
                className: `grid-image-wrapper ${start ? "opacity" : ""} ${
                  disabledOptions.includes(idx) ? "selected" : ""
                }`,
                onClick: () => {
                  // Allow click only if not at start, option not already disabled, and not completed
                  if (
                    !start &&
                    !disabledOptions.includes(idx) &&
                    !isCompleted
                  ) {
                    const result = handleOptionClick(option);
                    setFeedback(result.feedback);
                    PlayAudio("assets/click.mp3");

                    // If incorrect, only disable this option
                    if (!result.success) {
                      setDisabledOptions([...disabledOptions, idx]);
                    }
                    // If correct, handleOptionClick already sets isCompleted to true
                    // which will disable all options through isCompleted check
                  }
                },
                style: {
                  cursor:
                    start || disabledOptions.includes(idx) || isCompleted
                      ? "not-allowed"
                      : "pointer",
                },
              });
            })
          )
        ),
        // Display feedback if available
        feedback &&
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "feedback-message",
              style: {
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
              },
            },
            feedback
          )
      );
    }
  );
};
window.Scene = Scene;
