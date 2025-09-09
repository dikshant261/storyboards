const Frame = ({
  onNext,
  prev,
  imageSrc,
  number,
  storyTextKey,
  optionKeys,
  width,
  gap,
  flag = false,
}) => {
  const [sideHeadingOne, setSideHeadingOne] = React.useState(true);
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  const [stepFive, setStepFive] = React.useState(false);
  const [disabledNext, setDisabledNext] = React.useState(false);

  

  // audio setup
  const tap = "assets/tap.gif";
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto";
  const clickWrong = new Audio("assets/wrong.mp3");
  clickWrong.preload = "auto";
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

  // step handlers
  const handleStepOne = () => {
    clickHandle();
    setSideHeadingOne(false);
    setDisabledNext(true);
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
    setDisabledNext(false);
    setStepFive(true);
  };
  const handleNext = () => {
    if (flag) window.location.reload();
    clickHandle();
    setStepFive(false);
    onNext();
  };
  const handleStepPrev = () => {
    clickHandle();
    prev();
  };

  // --- UI ---
  return React.createElement(
    "div",
    { className: "frame-contianer" },

    // Left section
    React.createElement(
      "div",
      { className: "frame-container-left" },

      sideHeadingOne &&
        React.createElement(
          "p",
          { className: "slide-left" },
          t("sideHeadingOne")
        ),

      stepOne &&
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

      stepTwo &&
        React.createElement(
          "div",
          { className: "slide-mid" },
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepOne") + " ✅"
          ),
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
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepOne") + " ✅"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepTwo") + " ✅"
          ),
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
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepOne") + " ✅"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepTwo") + " ✅"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            React.createElement("b", null, t("stepThree") + " ✅")
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
          React.createElement(
            "p",
            { style: { textAlign: "left" } },
            t("rememberStep")
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepOne") + " ✅"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepTwo") + " ✅"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "left", color: "lightgreen" } },
            t("stepThree") + " ✅"
          )
        )
    ),

    // Right section
    React.createElement(
      "div",
      { className: "frame-container-right" },

      // Image + Story
      React.createElement(
        "div",
        { className: "frame-contianer-img-item" },
        stepFive &&
          React.createElement(
            "div",
            { className: "story scale-up" },
            React.createElement("p", null, t(storyTextKey))
          ),
        React.createElement(
          "div",
          { className: "frame-image-container" },
          React.createElement("img", {
            src: imageSrc,
            alt: "image",
            className: "frame-image scale-up",
          })
        )
      ),

      // Options Area
      React.createElement(
        "div",
        { className: "frame-container-left-option" },

        stepOne &&
          React.createElement(
            "div",
            { className: "option-align", style: { gap } },
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[0][0]),
                onClick: () => handleOptionOne(1),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[0][1]),
                onClick: () => handleOptionOne(2),
                style: { width },
              })
            ),
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[0][2]),
                onClick: () => handleOptionOne(3),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[0][3]),
                onClick: () => handleOptionOne(4),
                style: { width },
              })
            )
          ),

        stepTwo &&
          React.createElement(
            "div",
            { className: "option-align", style: { gap } },
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[1][0]),
                onClick: () => handleOptionTwo(1),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[1][1]),
                onClick: () => handleOptionTwo(2),
                style: { width },
              })
            ),
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[1][2]),
                onClick: () => handleOptionTwo(3),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[1][3]),
                onClick: () => handleOptionTwo(4),
                style: { width },
              })
            )
          ),

        stepThree &&
          React.createElement(
            "div",
            { className: "option-align", style: { gap } },
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[2][0]),
                onClick: () => handleOptionThree(1),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[2][1]),
                onClick: () => handleOptionThree(2),
                style: { width },
              })
            ),
            React.createElement(
              "div",
              { className: "option-align-col show-in" },
              React.createElement(Option, {
                content: t(optionKeys[2][2]),
                onClick: () => handleOptionThree(3),
                style: { width },
              }),
              React.createElement(Option, {
                content: t(optionKeys[2][3]),
                onClick: () => handleOptionThree(4),
                style: { width },
              })
            )
          ),

        stepFour &&
          React.createElement(
            "div",
            { style: { position: "relative" } },
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
            ),
            React.createElement(
              "div",
              { className: "tap-gif-frame" },
              React.createElement("img", {
                src: tap,
                alt: "tap",
                className: "tap-gif-width-frame",
              })
            )
          )
      ),

      // Footer navigation
      React.createElement(
        "div",
        {
          className: "frame-container-left-navigation",
          style: { position: "relative" },
        },

        sideHeadingOne &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-right" },
            t("tapContinue")
          ),
        stepOne &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-right" },
            t("tapCorrect")
          ),
        stepTwo &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-right" },
            t("tapCorrect")
          ),
        stepThree &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-right" },
            t("tapCorrect")
          ),
        stepFour &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-right" },
            t("tapStory")
          ),
        stepFive &&
          React.createElement(
            "h2",
            { className: "frame-footer-heading slide-left" },
            t("tapContinue")
          ),

        React.createElement(
          "div",
          null,

          sideHeadingOne &&
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { className: "next-button", onClick: handleStepOne },
                "▶"
              ),
              React.createElement(
                "div",
                { className: "tap-gif-frame" },
                React.createElement("img", {
                  src: tap,
                  alt: "tap",
                  className: "tap-gif-width-frame",
                })
              )
            ),

          React.createElement(
            "button",
            { className: "next-button-left", onClick: handleStepPrev },
            "◀"
          ),

          stepOne &&
            React.createElement(
              "button",
              {
                className: "next-button-left",
                onClick: () => {
                  clickHandle();
                  setStepOne(false);
                  setDisabledNext(false);
                  setSideHeadingOne(true);
                },
              },
              "◀"
            ),

          stepThree &&
            React.createElement(
              "button",
              {
                className: "next-button-left",
                onClick: () => {
                  clickHandle();
                  setStepThree(false);
                  setStepTwo(true);
                },
              },
              "◀"
            ),

          stepTwo &&
            React.createElement(
              "button",
              {
                className: "next-button-left",
                onClick: () => {
                  clickHandle();
                  setStepTwo(false);
                  setStepOne(true);
                },
              },
              "◀"
            ),

          stepFour &&
            React.createElement(
              "button",
              {
                className: "next-button-left",
                onClick: () => {
                  clickHandle();
                  setStepFour(false);
                  setStepThree(true);
                },
              },
              "◀"
            ),

          stepFive &&
            React.createElement(
              "button",
              {
                className: "next-button-left",
                onClick: () => {
                  clickHandle();
                  setStepFive(false);
                  setStepFour(true);
                },
              },
              "◀"
            ),

          disabledNext &&
            React.createElement(
              "button",
              { className: "next-button-disabled" },
              "▶"
            ),

          stepFive &&
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { className: "next-button", onClick: handleNext },
                "▶"
              ),
              React.createElement(
                "div",
                { className: "tap-gif-frame" },
                React.createElement("img", {
                  src: tap,
                  alt: "tap",
                  className: "tap-gif-width-frame",
                })
              )
            )
        )
      )
    )
  );
};
window.Frame = Frame;
