const Main = ({ onNext, options, correctOption, onPrev, boxContent, flag }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [boxResultOne, setBoxResultOne] = React.useState("");
  const [boxOneCss, setBoxOneCss] = React.useState("");
  const [showErrorOne, setShowErrorOne] = React.useState(false);
  const [boxResultTwo, setBoxResultTwo] = React.useState("");
  const [boxTwoCss, setBoxTwoCss] = React.useState("");
  const [showErrorTwo, setShowErrorTwo] = React.useState(false);
  const [boxResultThree, setBoxResultThree] = React.useState("");
  const [boxThreeCss, setBoxThreeCss] = React.useState("");
  const [showErrorThree, setShowErrorThree] = React.useState(false);
  const [tapProceed, setTapProceed] = React.useState(false);
  const [disabledNext, setDisabledNext] = React.useState(true);
  const [nextOne, setNextOne] = React.useState(false);
  const [nextTwo, setNextTwo] = React.useState(false);
  const [tapRatio, setTapRatio] = React.useState(true);
  const [beatOne, setBeatOne] = React.useState(true);
  const [beatTwo, setBeatTwo] = React.useState(false);
  const [beatThree, setBeatThree] = React.useState(false);
  const [prevButton, setPrevButton] = React.useState(false);

  // --- Handlers ---
  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
      setBeatOne(false);
      setDisabledNext(false);
      setShowErrorOne(true);
    } else {
      playWrong();
      setBoxOneCss("incorrect");
      setShowErrorOne(true);
    }
  };

  const handleNextOne = () => {
    playClick();
    setNextOne(false);
    setShowErrorOne(false);
    setStepOne(false);
    setBeatTwo(true);
    setDisabledNext(true);
    setTapRatio(true);
    setStepTwo(true);
  };

  const handleBoxResultTwo = (option) => {
    if (!stepTwo) return;
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setNextTwo(true);
      setTapRatio(false);
      setBeatTwo(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
    } else {
      playWrong();
      setBoxTwoCss("incorrect");
      setShowErrorTwo(true);
    }
  };

  const handleNextTwo = () => {
    playClick();
    setNextTwo(false);
    setShowErrorTwo(false);
    setShowErrorThree(false);
    setPrevButton(true);
    setStepThree(true);
    setBeatThree(true);
    setStepTwo(false);
    setDisabledNext(true);
    setTapRatio(true);
  };

  const handleBoxResultThree = (option) => {
    if (!stepThree) return;
    setBoxResultThree(option);
    if (option === correctOption[2]) {
      playCorrect();
      setBoxThreeCss("correct");
      setTapRatio(false);
      setDisabledNext(false);
      setBeatThree(false);
      setPrevButton(false);
      setTapProceed(true);
      setShowErrorThree(true);
    } else {
      playWrong();
      setBoxThreeCss("incorrect");
      setShowErrorThree(true);
    }
  };

  const handleProceed = () => {
    playClick();
    setStepThree(false);
    onNext();
  };

  const handlePrevOne = () => {
    playClick();
    onPrev();
  };

  const handlePrevTwo = () => {
    playClick();
    setStepTwo(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
    setBeatOne(true);
    setBeatTwo(false);
    setNextOne(false);
    setBoxTwoCss("");
    setBoxResultTwo("");
    setDisabledNext(true);
    setTapRatio(true);
  };

  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setStepTwo(true);
    setBoxResultTwo("");
    setBoxTwoCss("");
    setBeatThree(false);
    setNextTwo(false);
    setBeatTwo(true);
    setBoxThreeCss("");
    setBoxResultThree("");
    setDisabledNext(true);
    setTapRatio(true);
    setPrevButton(false);
  };

  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setTapRatio(false);
    setStepThree(true);
    setBeatThree(true);
    setBoxThreeCss("");
    setBoxResultThree("");
    setDisabledNext(true);
    setTapRatio(true);
    setShowErrorThree(false);
    setPrevButton(true);
  };

  return React.createElement(
    "div",
    { className: "main" },
    // heading
    React.createElement("div", { className: "main-heading" }, t("main.representingRation")),

    // main content
    React.createElement(
      "div",
      { className: "main-content" },
      // images + answer
      React.createElement(
        "div",
        { className: "image-container" },
        React.createElement(
          "div",
          { className: "image-box" },
          flag === 0
            ? React.createElement(AppleImage)
            : flag === 1
            ? React.createElement(TriangleImage)
            : flag === 2
            ? React.createElement(CircleImage)
            : flag === 3
            ? React.createElement("p", null, t("chitraContent.question"))
            : null
        ),
        React.createElement(
          "div",
          { className: "answer-box" },
          React.createElement(ResultBox, {
            stepOne,
            stepTwo,
            stepThree,
            beatOne,
            beatTwo,
            beatThree,
            boxResultOne,
            boxOneCss,
            boxResultTwo,
            boxTwoCss,
            boxResultThree,
            boxThreeCss,
            boxContent,
          })
        )
      ),
      // options
      React.createElement("div", { className: "option-box" },
        React.createElement(DogAndCatOption, {
          options,
          correctOption,
          flag,
          boxResultSet:
            stepOne
              ? handleBoxResultOne
              : stepTwo
              ? handleBoxResultTwo
              : stepThree
              ? handleBoxResultThree
              : () => {},
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne,
          boxResultTwo,
          boxResultThree,
          showErrorOne,
          showErrorTwo,
          showErrorThree,
        })
      )
    ),

    // footers
    tapRatio && React.createElement("div", { className: "footer-heading" }, t("main.tapTheRatios")),
    nextOne && React.createElement("div", { className: "footer-heading" }, t("main.tapContinue")),
    nextTwo && React.createElement("div", { className: "footer-heading" }, t("main.tapContinue")),
    tapProceed && React.createElement("div", { className: "footer-heading" }, t("main.tapProceed")),

    // footer buttons
    React.createElement(FooterButtons, {
      disabledNext,
      nextOne,
      nextTwo,
      stepOne,
      stepTwo,
      stepThree,
      tapProceed,
      handleNextOne,
      handleNextTwo,
      handleProceed,
      handlePrevOne,
      handlePrevTwo,
      handlePrevThree,
      handlePrevFour,
      prevButton,
    })
  );
};
window.Main=Main;