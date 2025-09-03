const FrameThird = ({ onNext }) => {
  const [sideHeadingOne, setSideHeadingOne] = React.useState(true);
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  const [stepFive, setStepFive] = React.useState(false);
  const [arrowAnimation, setArrowAnimation] = React.useState(false);
  const imagethird="assets/imagethree.png";
  const click="assets/click.mp3";
  const correct="assets/correct.mp3";
  const wrong="assets/wrong.mp3";

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setArrowAnimation(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  //audio variables
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early

  //wrong audio variables
  const clickWrong = new Audio(wrong);
  clickWrong.preload = "auto";

  //right audio variable
  const clickRight = new Audio(correct);
  clickRight.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const wrongHandle = () => {
    clickWrong.currentTime = 0;
    clickWrong.play();
  };

  const rightHandle = () => {
    clickRight.currentTime = 0;
    clickRight.play();
  };

  const handleStepOne = () => {
    clickHandle();
    setSideHeadingOne(false);
    setStepOne(true);
  };

  const handleOptionOne = (num) => {
    if (num === 1) {
      rightHandle();
      setStepOne(false);
      setStepTwo(true);
    } else {
      wrongHandle();
    }
  };

  const handleOptionTwo = (num) => {
    if (num === 3) {
      rightHandle();
      setStepTwo(false);
      setStepThree(true);
    } else {
      wrongHandle();
    }
  };

  const handleOptionThree = (num) => {
    if (num === 4) {
      rightHandle();
      setStepThree(false);
      setStepFour(true);
    } else {
      wrongHandle();
    }
  };

  const handleStory = () => {
    clickHandle();
    setStepFour(false);
    setStepFive(true);
  };

  const handleNext = () => {
    clickHandle();
    onNext();
  };

  return React.createElement(
    "div",
    { className: "frame-contianer" },
    // LEFT SIDE
    React.createElement(
      "div",
      { className: "frame-container-left" },
      sideHeadingOne &&
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            {
              className: "slide-left",
              style: { fontWeight: 900, marginBottom: "2vw" },
            },
            t("subtractionStoryFirst")
          ),
          React.createElement("p", null, t("sideHeadingOne"))
        ),
      stepOne &&
        React.createElement(
          "div",
          { className: "slide-right" },
          React.createElement(
            "p",
            {
              style: { fontWeight: 900, textAlign: "left", marginBottom: "1vw" },
            },
            t("stepOne")
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left" } },
            t("chooseOption")
          )
        ),
      stepTwo &&
        React.createElement(
          "div",
          { className: "slide-mid" },
          React.createElement("p", { style: { textAlign: "left" } }, t("stepOne"), " ✅"),
          React.createElement(
            "p",
            { style: { fontWeight: 900, textAlign: "left" } },
            t("stepTwo")
          ),
          React.createElement(
            "p",
            { style: { marginTop: "3vw", textAlign: "left" } },
            t("chooseOption")
          )
        ),
      stepThree &&
        React.createElement(
          "div",
          { className: "slide-left" },
          React.createElement("p", { style: { textAlign: "left" } }, t("stepOne"), " ✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepTwo"), " ✅"),
          React.createElement(
            "p",
            { style: { fontWeight: "900", textAlign: "left" } },
            t("stepThree")
          ),
          React.createElement(
            "p",
            { style: { marginTop: "2vw", textAlign: "left" } },
            t("chooseOption")
          )
        ),
      stepFour &&
        React.createElement(
          "div",
          { className: "slide-right" },
          React.createElement("p", { style: { textAlign: "left" } }, t("stepOne"), " ✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepTwo"), " ✅"),
          React.createElement("p", { style: { textAlign: "left" } }, React.createElement("b", null, t("stepThree"), " ✅")),
          React.createElement(
            "p",
            { style: { marginTop: "2vw", textAlign: "left" } },
            t("allStep")
          )
        ),
      stepFive &&
        React.createElement(
          "div",
          { className: "slide-mid" },
          React.createElement(
            "p",
            { style: { fontWeight: 800, textAlign: "left", marginBottom: "2vw" } },
            t("makeNote")
          ),
          React.createElement("p", { style: { textAlign: "left" } }, t("rememberStep")),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepOne"), " ✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepTwo"), "✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepThree"), "✅")
        )
    ),
    // RIGHT SIDE
    React.createElement(
      "div",
      { className: "frame-container-right" },
      React.createElement(
        "div",
        { className: "frame-contianer-img-item" },
        stepFive &&
          React.createElement("div", { className: "story scale-up" }, React.createElement("p", null, t("storyThreeText"))),
        React.createElement("div", { className: "frame-image-container" }, 
          React.createElement("img", { src: imagethird, alt: "image", className: "frame-image scale-up" })
        )
      ),
      // OPTIONS
      React.createElement(
        "div",
        { className: "frame-container-left-option" },
        stepOne &&
          React.createElement(
            "div",
            { className: "option-align", style: { gap: "8vw" } },
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(Option, { content: t("storyThree.optionOne"), onClick: () => handleOptionOne(1), style: { width: "31vw" } }),
              React.createElement(Option, { content: t("storyThree.optionTwo"), onClick: () => handleOptionOne(2), style: { width: "31vw" } })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(Option, { content: t("storyThree.optionThree"), onClick: () => handleOptionOne(3), style: { width: "31vw" } }),
              React.createElement(Option, { content: t("storyThree.optionFour"), onClick: () => handleOptionOne(4), style: { width: "31vw" } })
            )
          ),
        stepTwo &&
          React.createElement(
            "div",
            { className: "option-align" },
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(Option, { content: t("storyThree.optionFive"), onClick: () => handleOptionTwo(1) }),
              React.createElement(Option, { content: t("storyThree.optionSix"), onClick: () => handleOptionTwo(2) })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(Option, { content: t("storyThree.optionSeven"), onClick: () => handleOptionTwo(3) }),
              React.createElement(Option, { content: t("storyThree.optionEight"), onClick: () => handleOptionTwo(4) })
            )
          ),
        stepThree &&
          React.createElement(
            "div",
            { className: "option-align" },
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(Option, { content: t("storyThree.optionNine"), onClick: () => handleOptionThree(1) }),
              React.createElement(Option, { content: t("storyThree.optionTen"), onClick: () => handleOptionThree(2) })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(Option, { content: t("storyThree.optionEleven"), onClick: () => handleOptionThree(3) }),
              React.createElement(Option, { content: t("storyThree.optionTwelve"), onClick: () => handleOptionThree(4) })
            )
          ),
        stepFour &&
          React.createElement(
            "div",
            { className: "slide-mid" },
            React.createElement(
              "button",
              {
                className: "frame-start-button",
                style: {
                  width: "18vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "8vh",
                  fontWeight: "900",
                },
                onClick: handleStory,
              },
              t("makeStory")
            )
          )
      ),
      // FOOTER NAVIGATION
      React.createElement(
        "div",
        { className: "frame-container-left-navigation", style: { position: "relative" } },
        sideHeadingOne && React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapContinue")),
        stepOne && React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepTwo && React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepThree && React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepFour && React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapStory")),
        stepFive && React.createElement("h2", { className: "frame-footer-heading slide-left" }, t("tapContinue")),
        React.createElement(
          "div",
          null,
          sideHeadingOne && React.createElement("button", { className: "next-button slide-mid", onClick: handleStepOne }, "▶"),
          stepFive && React.createElement("button", { className: "next-button slide-mid", onClick: handleNext }, "▶")
        )
      )
    )
  );
};
window.FrameThird=FrameThird;