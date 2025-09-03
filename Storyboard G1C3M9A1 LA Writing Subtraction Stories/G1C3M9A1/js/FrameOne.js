const FrameOne = (props) => {
  const {
    onNext,
    onPrev,
    imageSrc,
    number,
    storyTextKey,
    optionKeys,
    width,
    gap,
    flag = false,
  } = props;

  const el = React.createElement;
  const { useEffect, useState } = React;
  

  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [arrowAnimation, setArrowAnimation] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArrowAnimation(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // audio variables
  const tap = "assets/tap.gif";
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto"; // ensures it's loaded early

  // wrong audio variables
  const clickWrong = new Audio("assets/wrong.mp3");
  clickWrong.preload = "auto";

  // right audio variable
  const clickRight = new Audio("assets/correct.mp3");
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
    if (flag) {
      window.location.reload();
    }
    clickHandle();
    setStepFive(false);
    setArrowAnimation(false);
    onNext();
  };

  const handleStepPrev = () => {
    clickHandle();
    onPrev();
  };

  // -------- Left Column (conditional blocks) --------
  const leftColumn = el(
    "div",
    { className: "frame-container-left" },
    sideHeadingOne
      ? el("p", { className: "slide-left" }, t("sideHeadingOne"))
      : null,

    stepOne
      ? el(
          "div",
          { className: "slide-right" },
          el("p", {
            style: { fontWeight: 900, textAlign: "left", marginBottom: "1vw" },
            children: t("stepOne"),
          }),
          el("p", {
            style: { textAlign: "left" },
            children: t("chooseOption"),
          })
        )
      : null,

    stepTwo
      ? el(
          "div",
          { className: "slide-mid" },
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepOne") + " ✅",
          }),
          el("p", {
            style: { fontWeight: 900, textAlign: "left" },
            children: t("stepTwo"),
          }),
          el("p", {
            style: { marginTop: "3vw", textAlign: "left" },
            children: t("chooseOption"),
          })
        )
      : null,

    stepThree
      ? el(
          "div",
          { className: "slide-left" },
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepOne") + " ✅",
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepTwo") + " ✅",
          }),
          el("p", {
            style: { fontWeight: "900", textAlign: "left" },
            children: t("stepThree"),
          }),
          el("p", {
            style: { marginTop: "2vw", textAlign: "left" },
            children: t("chooseOption"),
          })
        )
      : null,

    stepFour
      ? el(
          "div",
          { className: "slide-right" },
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepOne") + " ✅",
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepTwo") + " ✅",
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: el("b", null, t("stepThree") + " ✅"),
          }),
          el("p", {
            style: { marginTop: "2vw", textAlign: "left" },
            children: t("allStep"),
          })
        )
      : null,

    stepFive
      ? el(
          "div",
          { className: "slide-mid" },
          el("p", {
            style: { fontWeight: 800, textAlign: "left", marginBottom: "2vw" },
            children: t("makeNote"),
          }),
          el("p", {
            style: { textAlign: "left" },
            children: t("rememberStep"),
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepOne") + " ✅",
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepTwo") + "✅",
          }),
          el("p", {
            style: { textAlign: "left", color: "lightgreen" },
            children: t("stepThree") + "✅",
          })
        )
      : null
  );

  // -------- Right Column: top image & numbers --------
  const arrowsAndLabels =
    sideHeadingOne && arrowAnimation
      ? el(
          "div",
          null,
          el(
            "div",
            { className: arrowAnimation ? "show-in" : "" },
            el(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "10.9 8.9 1.2 1.2",
                className: "arrow-align-one",
              },
              el("path", {
                d: "M 12 9 Q 11 9 11 10",
                stroke: "gold",
                strokeWidth: "0.06",
                fill: "none",
              })
            )
          ),
          el(
            "div",
            { className: arrowAnimation ? "show-in" : "" },
            el(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "10.9 8.9 1.2 1.2",
                className: "arrow-align-two",
              },
              el("path", {
                d: "M 12 9 Q 11 9 11 10",
                stroke: "gold",
                strokeWidth: "0.06",
                fill: "none",
              })
            )
          ),
          el("div", null, el("div", { className: "arrow-line show-in" })),
          el(
            "div",
            { style: { whiteSpace: "pre-line" } },
            el("p", { className: "total-number show-in" }, t("totalNumber")),
            el("p", { className: "take-away show-in" }, t("takenAway")),
            el("p", { className: "ramains show-in" }, t("remain"))
          )
        )
      : null;

  const rightImageBlock = el(
    "div",
    { className: "frame-contianer-img-item" },
    stepFive
      ? el(
          "div",
          { className: "story scale-up" },
          el("p", null, t(storyTextKey))
        )
      : null,
    el(
      "div",
      { className: "frame-image-container" },
      el("img", {
        src: imageSrc,
        alt: "image",
        className: "frame-image scale-up",
      })
    ),
    el(
      "div",
      { className: "frame-align-box", style: { position: "relative" } },
      el(
        "div",
        { className: (stepOne ? "box-size " : "") + "frame-image-box" },
        number[0]
      ),
      el("div", { className: "frame-minus-line" }),
      el(
        "div",
        { className: (stepTwo ? "box-size " : "") + "frame-image-box " },
        number[1]
      ),
      el(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "0.5vw" } },
        el("div", { className: "frame-minus-line slide-up" }),
        el("div", { className: "frame-minus-line slide-right" })
      ),
      el(
        "div",
        { className: (stepThree ? "box-size " : "") + "frame-image-box " },
        number[2]
      ),
      arrowsAndLabels
    )
  );

  // -------- Options Area (stepOne/stepTwo/stepThree) --------
  const optionsArea = el(
    "div",
    { className: "frame-container-left-option" },

    // stepOne options
    stepOne
      ? el(
          "div",
          { className: "option-align", style: { gap: gap } },
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[0][0]),
              onClick: () => handleOptionOne(1),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[0][1]),
              onClick: () => handleOptionOne(2),
              style: { width: width },
            })
          ),
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[0][2]),
              onClick: () => handleOptionOne(3),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[0][4 - 1]), // original literal 4 -> keep same logic
              onClick: () => handleOptionOne(4),
              style: { width: width },
            })
          )
        )
      : null,

    // stepTwo options
    stepTwo
      ? el(
          "div",
          { className: "option-align", style: { gap: gap } },
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[1][0]),
              onClick: () => handleOptionTwo(1),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[1][1]),
              onClick: () => handleOptionTwo(2),
              style: { width: width },
            })
          ),
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[1][2]),
              onClick: () => handleOptionTwo(3),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[1][3]),
              onClick: () => handleOptionTwo(4),
              style: { width: width },
            })
          )
        )
      : null,

    // stepThree options
    stepThree
      ? el(
          "div",
          { className: "option-align", style: { gap: gap } },
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[2][0]),
              onClick: () => handleOptionThree(1),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[2][1]),
              onClick: () => handleOptionThree(2),
              style: { width: width },
            })
          ),
          el(
            "div",
            { className: "option-align-col show-in" },
            el(Option, {
              content: t(optionKeys[2][2]),
              onClick: () => handleOptionThree(3),
              style: { width: width },
            }),
            el(Option, {
              content: t(optionKeys[2][3]),
              onClick: () => handleOptionThree(4),
              style: { width: width },
            })
          )
        )
      : null,

    // stepFour "Make Story" button
    stepFour
      ? el(
          "div",
          { style: { position: "relative" } },
          el(
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
          el(
            "div",
            { className: "tap-gif-frame" },
            el("img", {
              src: tap,
              alt: "tap",
              className: "tap-gif-width-frame",
            })
          )
        )
      : null
  );

  // -------- Footer / Navigation --------
  const footerHeading = sideHeadingOne
    ? el(
        "h2",
        { className: "frame-footer-heading slide-right" },
        t("tapContinue")
      )
    : stepOne
    ? el(
        "h2",
        { className: "frame-footer-heading slide-right" },
        t("tapCorrect")
      )
    : stepTwo
    ? el(
        "h2",
        { className: "frame-footer-heading slide-right" },
        t("tapCorrect")
      )
    : stepThree
    ? el(
        "h2",
        { className: "frame-footer-heading slide-right" },
        t("tapCorrect")
      )
    : stepFour
    ? el("h2", { className: "frame-footer-heading slide-right" }, t("tapStory"))
    : stepFive
    ? el(
        "h2",
        { className: "frame-footer-heading slide-left" },
        t("tapNextQuestion")
      )
    : null;

  const navButtons = el(
    "div",
    null,
    sideHeadingOne
      ? el(
          "div",
          null,
          el(
            "button",
            { className: "next-button", onClick: handleStepOne },
            "▶"
          ),
          el(
            "div",
            { className: "tap-gif-frame" },
            el("img", {
              src: tap,
              alt: "tap",
              className: "tap-gif-width-frame",
            })
          )
        )
      : null,

    el(
      "button",
      { className: "next-button-left", onClick: handleStepPrev },
      "◀"
    ),

    stepOne
      ? el(
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
        )
      : null,

    stepThree
      ? el(
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
        )
      : null,

    stepTwo
      ? el(
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
        )
      : null,

    stepFour
      ? el(
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
        )
      : null,

    stepFive
      ? el(
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
        )
      : null,

    disabledNext
      ? el("button", { className: "next-button-disabled" }, "▶")
      : null,

    stepFive
      ? el(
          "div",
          null,
          el("button", { className: "next-button", onClick: handleNext }, "▶"),
          el(
            "div",
            { className: "tap-gif-frame" },
            el("img", {
              src: tap,
              alt: "tap",
              className: "tap-gif-width-frame",
            })
          )
        )
      : null
  );

  const navigation = el(
    "div",
    {
      className: "frame-container-left-navigation",
      style: { position: "relative" },
    },
    footerHeading,
    navButtons
  );

  // -------- Right Column wrapper --------
  const rightColumn = el(
    "div",
    { className: "frame-container-right" },
    rightImageBlock,
    optionsArea,
    navigation
  );

  // -------- Root wrapper --------
  return el("div", { className: "frame-contianer" }, leftColumn, rightColumn);
};
window.FrameOne = FrameOne;
