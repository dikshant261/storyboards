const MainThree = ({ onNext, options, correctOption, question, questionHeading, flag, onPrev }) => {
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
  const [beat,setBeat]=React.useState(true);
  const [beatOne,setBeatOne]=React.useState(false);
  const [beatTwo,setBeatTwo]=React.useState(false);
  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
      setBeat(false);
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
    setBeatOne(true);
    setStepOne(false);
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
      setBeatOne(false);
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
    setStepThree(true);
    setBeatTwo(true);
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
      setBeatTwo(false);
      setDisabledNext(false);
      setTapProceed(true);
      setStepThree(false);
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
    setBeat(true);
    setBeatOne(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxResultTwo("");
    setBoxOneCss("");
    setBoxTwoCss("");
    setNextOne(false);
  };

  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setBeatOne(true);
    setBeatTwo(false);
    setStepTwo(true);
    setBoxResultTwo("");
    setBoxTwoCss("");
    setBoxResultThree("");
    setBoxThreeCss("");
    setNextTwo(false);
  };
  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setBoxThreeCss("");
    setBoxResultThree("");
    setBeatTwo(true);
    setStepThree(true);
    setDisabledNext(true);
    setTapRatio(true);
  };

  return React.createElement(
    "div",
    { className: "main" },

    // Heading
    React.createElement("div", { className: "main-heading" }, t(questionHeading)),

    // Main content
    React.createElement(
      "div",
      { className: "main-content" },

      // Image + Answer box
      React.createElement(
        "div",
        { className: "image-container" },
        React.createElement("div", { className: "image-box" }, React.createElement("p", null, t(question))),
        React.createElement(
          "div",
          { className: "answer-box" },
          React.createElement(ResultBox, {
            beat,
            beatOne,
            beatTwo,
            stepOne,
            stepTwo,
            stepThree,
            boxResultOne,
            boxOneCss,
            boxResultTwo,
            boxTwoCss,
            boxResultThree,
            boxThreeCss,
          })
        )
      ),

      // Options
      React.createElement(
        "div",
        { className: "option-box" },
        React.createElement(TableOption, {
          options,
          correctOption,
          flag,
          boxResultSet: stepOne
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

    // Conditional footers
    tapRatio && React.createElement("div", { className: "footer-heading" }, t("tapRatio")),
    nextOne && React.createElement("div", { className: "footer-heading" }, t("tapNext")),
    nextTwo && React.createElement("div", { className: "footer-heading" }, t("tapNext")),
    tapProceed && React.createElement("div", { className: "footer-heading" }, t("proceed")),

    // Footer buttons
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
      handlePrevFour
    })
  );
};
window.MainThree=MainThree;