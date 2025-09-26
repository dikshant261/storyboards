
const MainFive = ({
  onNext,
  options,
  correctOption,
  question,
  questionHeading,
  flag,
  onPrev,
}) => {
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
      setTapProceed(true);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
    } else {
      playWrong();
      setBoxTwoCss("incorrect");
      setShowErrorTwo(true);
    }
  };

  const handleProceed = () => {
    playClick();
    setStepTwo(false);
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

  return React.createElement(
    "div",
    { className: "main" },
    React.createElement("div", { className: "main-heading" }, t(questionHeading)),
    React.createElement(
      "div",
      { className: "main-content" },
      React.createElement(
        "div",
        { className: "image-container" },
        React.createElement(
          "div",
          { className: "image-box" },
          React.createElement(TriangleImage, null)
        ),
        React.createElement(
          "div",
          { className: "answer-box" },
          React.createElement(TriangleBox, {
            stepOne,
            stepTwo,
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
        React.createElement(AppleOption, {
          options,
          correctOption,
          flag,
          boxResultSet: stepOne
            ? handleBoxResultOne
            : stepTwo
            ? handleBoxResultTwo
            : () => {},
          stepOne,
          stepTwo,
          boxResultOne,
          boxResultTwo,
          showErrorOne,
          showErrorTwo,
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
      handleProceed,
      handlePrevOne,
      handlePrevTwo,
    })
  );
};

window.MainFive= MainFive;
