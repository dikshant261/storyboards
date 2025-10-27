const Scene = () => {

  const raisehandchild = "assets/raisehandchild.png";
  const Onefinger = "assets/Onefinger.png";
  const Twofinger = "assets/Twofinger.png";
  const Threefinger = "assets/Threefinger.png";
  const fourfinger = "assets/fourfinger.png";
  const Fivefinger = "assets/Fivefinger.png";
  const speaker = "assets/speaker.png";

 
  const [start, setStart] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [disabledOptions, setDisabledOptions] = React.useState([]);
  const [feedback, setFeedback] = React.useState("");

  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => ({ ...prev, [key]: true }));
  };

  

  const handleSpeakerClick = (audioPath) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setStart(false);
    PlayAudio(audioPath);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return React.createElement(QuestionHandler, null, ({
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
      return React.createElement(
        "div",
        { className: "scene-container" },
        "Loading questions..."
      );
    }

    return React.createElement(
      "div",
      { className: "scene-container" },

      // Top section
      React.createElement(
        "div",
        { className: "top" },
        React.createElement("div", { className: "top-heading" }, t("count")),
        React.createElement(
          "div",
          { className: "align-hand-image" },
          React.createElement("p", { className: "shout-loud" }, t("shout")),
          React.createElement("img", {
            src: raisehandchild,
            className: "boy-hand",
            alt: "Raise hand",
          })
        )
      ),

      // Main section
      React.createElement(
        "div",
        { className: "main" },
        React.createElement(
          "div",
          { className: "one" },
          currentQuestion.options.map((option, idx) =>
            React.createElement("img", {
              key: idx,
              src: `assets/${option.image}`,
              className: `grid-image-wrapper ${start ? "opacity" : ""} ${
                disabledOptions.includes(idx) ? "selected" : ""
              }`,
              onClick: () => {
                if (!start && !disabledOptions.includes(idx) && !isCompleted) {
                  const result = handleOptionClick(option);
                  setFeedback(result.feedback);
                  PlayAudio("assets/click.mp3");

                  if (!result.success) {
                    setDisabledOptions([...disabledOptions, idx]);
                  }
                }
              },
              style: {
                cursor:
                  start || disabledOptions.includes(idx) || isCompleted
                    ? "not-allowed"
                    : "pointer",
              },
              alt: `Option ${idx + 1}`,
            })
          ),
          React.createElement("img", {
            src: speaker,
            className: `speaker ${isPlaying ? "disabled-speaker" : ""}`,
            onClick: () => handleSpeakerClick(currentQuestion.audio),
            style: { cursor: isPlaying ? "not-allowed" : "pointer" },
            alt: "Speaker",
          })
        ),
        feedback &&
          React.createElement(
            "div",
            {
              className: "feedback-message",
              style: {
                position: "fixed",
                bottom: "9%",
                left: "45%",
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
      ),

      // Footer section
      React.createElement(
        "div",
        { className: "footer" },
        React.createElement("p", null, t("tap")),
        React.createElement(ReusableButton, {
          label: isLastQuestion ? t("buttons.startOver") : t("buttons.Next"),
          fontSize: "3vw",
          padding: "1vh 5vw",
          showTap: false,
          showActive: false,
          onClick: () => {
            playClick();
            handleNext();
            setStart(true);
            setDisabledOptions([]);
            setFeedback("");
          },
          disabled: isNextDisabled,
        })
      )
    );
  });
};
window.Scene=Scene;