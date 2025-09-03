const FrameOne = ({ onNext }) => {
  const { useState, useEffect } = React;
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [arrowAnimation, setArrowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArrowAnimation(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // audio variables
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto"; // ensures it's loaded early

  // wrong audio variables
  const clickWrong = new Audio("assets/wrong.mp3");
  clickWrong.preload = "auto";

  // right audio variable
  const clickRight = new Audio("assets/correct.mp3");
  clickRight.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
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
    if (num === 2) {
      rightHandle();
      setStepTwo(false);
      setStepThree(true);
    } else {
      wrongHandle();
    }
  };

  const handleOptionThree = (num) => {
    if (num === 1) {
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
    setStepFive(false);
    setArrowAnimation(false);
    onNext();
  };

  return React.createElement(
    "div",
    { className: "frame-contianer" },
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
          React.createElement(
            "p",
            { style: { textAlign: "left" } },
            React.createElement("b", null, t("stepThree"), " ✅")
          ),
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
            {
              style: {
                fontWeight: 800,
                textAlign: "left",
                marginBottom: "2vw",
              },
            },
            t("makeNote")
          ),
          React.createElement("p", { style: { textAlign: "left" } }, t("rememberStep")),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepOne"), " ✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepTwo"), "✅"),
          React.createElement("p", { style: { textAlign: "left" } }, t("stepThree"), "✅")
        )
    ),
    React.createElement(
      "div",
      { className: "frame-container-right" },
      React.createElement(
        "div",
        { className: "frame-contianer-img-item" },
        stepFive &&
          React.createElement("div", { className: "story scale-up" }, React.createElement("p", null, t("storyOneText"))),
        React.createElement("div", { className: "frame-image-container" },
          React.createElement("img", {
            src: "assets/imageone.png",
            alt: "image",
            className: "frame-image scale-up",
          })
        )
      ),
      React.createElement(
        "div",
        { className: "frame-container-left-option" },
        stepOne &&
          React.createElement(
            "div",
            { className: "option-align" },
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(window.Option, { content: t("storyOne.optionOne"), onClick: () => handleOptionOne(1) }),
              React.createElement(window.Option, { content: t("storyOne.optionTwo"), onClick: () => handleOptionOne(2) })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(window.Option, { content: t("storyOne.optionThree"), onClick: () => handleOptionOne(3) }),
              React.createElement(window.Option, { content: t("storyOne.optionFour"), onClick: () => handleOptionOne(4) })
            )
          ),
        stepTwo &&
          React.createElement(
            "div",
            { className: "option-align" },
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(window.Option, { content: t("storyOne.optionFive"), onClick: () => handleOptionTwo(1) }),
              React.createElement(window.Option, { content: t("storyOne.optionSix"), onClick: () => handleOptionTwo(2) })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(window.Option, { content: t("storyOne.optionSeven"), onClick: () => handleOptionTwo(3) }),
              React.createElement(window.Option, { content: t("storyOne.optionEight"), onClick: () => handleOptionTwo(4) })
            )
          ),
        stepThree &&
          React.createElement(
            "div",
            { className: "option-align" },
            React.createElement(
              "div",
              { className: "option-align-col slide-left" },
              React.createElement(window.Option, { content: t("storyOne.optionNine"), onClick: () => handleOptionThree(1) }),
              React.createElement(window.Option, { content: t("storyOne.optionTen"), onClick: () => handleOptionThree(2) })
            ),
            React.createElement(
              "div",
              { className: "option-align-col slide-right" },
              React.createElement(window.Option, { content: t("storyOne.optionEleven"), onClick: () => handleOptionThree(3) }),
              React.createElement(window.Option, { content: t("storyOne.optionTwelve"), onClick: () => handleOptionThree(4) })
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
      React.createElement(
        "div",
        { className: "frame-container-left-navigation", style: { position: "relative" } },
        sideHeadingOne &&
          React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapContinue")),
        stepOne &&
          React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepTwo &&
          React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepThree &&
          React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapCorrect")),
        stepFour &&
          React.createElement("h2", { className: "frame-footer-heading slide-right" }, t("tapStory")),
        stepFive &&
          React.createElement("h2", { className: "frame-footer-heading slide-left" }, t("tapContinue")),
        React.createElement(
          "div",
          null,
          sideHeadingOne &&
            React.createElement("button", { className: "next-button slide-mid", onClick: handleStepOne }, "▶"),
          stepFive &&
            React.createElement("button", { className: "next-button slide-mid", onClick: handleNext }, "▶")
        )
      )
    )
  );
};

window.FrameOne = FrameOne;
