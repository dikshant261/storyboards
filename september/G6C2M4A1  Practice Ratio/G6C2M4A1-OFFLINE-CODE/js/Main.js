const Main = ({ onNext, options, correctOption, onPrev }) => {
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

  const handleBoxResultOne = (option) => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
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
  };

  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setStepTwo(true);
    setBoxResultTwo("");
    setBoxTwoCss("");
  };

  return React.createElement(
    "div",
    { className: "main" },
    React.createElement("div", { className: "main-heading" }, t("representingRatios")),
    React.createElement(
      "div",
      { className: "main-content" },
      React.createElement(
        "div",
        { className: "image-container" },
        React.createElement(
          "div",
          { className: "image-box" },
          React.createElement(Catimage, null)
        ),
        React.createElement(
          "div",
          { className: "answer-box" },
          React.createElement(ResultBox, {
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
      React.createElement(
        "div",
        { className: "option-box" },
        React.createElement(DogAndCatOption, {
          options,
          correctOption,
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
    tapRatio &&
      React.createElement("div", { className: "footer-heading" }, t("tapRatio")),
    nextOne &&
      React.createElement("div", { className: "footer-heading" }, t("tapNext")),
    nextTwo &&
      React.createElement("div", { className: "footer-heading" }, t("tapNext")),
    tapProceed &&
      React.createElement("div", { className: "footer-heading" }, t("proceed")),
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
    })
  );
};
window.Main=Main;