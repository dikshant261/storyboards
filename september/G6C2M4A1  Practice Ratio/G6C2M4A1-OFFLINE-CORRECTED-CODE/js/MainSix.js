const MainSix = ({
  onNext,
  options,
  correctOption,
  question,
  boxOneHeading,
  boxTwoHeading,
  questionHeading,
  flag,
  onPrev
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
  const [beat, setBeat] = React.useState(true);
  const [beatOne, setBeatOne] = React.useState(false);
  const [btnTwo, setBtnTwo] = React.useState(false);
  const handleBoxResultOne = option => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setBeat(false);
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
    setBeatOne(true);
    setDisabledNext(true);
    setTapRatio(true);
    setStepTwo(true);
    setBtnTwo(true);
  };
  const handleBoxResultTwo = option => {
    if (!stepTwo) return;
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setTapProceed(true);
      setBeatOne(false);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
      setBtnTwo(false);
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
    setBtnTwo(false);
    setBeat(true);
    setBeatOne(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxOneCss("");
    setBoxResultTwo("");
    setBoxTwoCss("");
    setNextOne(false);
    setShowErrorOne(false);
  };
  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setBtnTwo(true);
    setBoxTwoCss("");
    setShowErrorTwo(false);
    setBoxResultTwo("");
    setTapRatio(true);
    setStepTwo(true);
    setDisabledNext(true);
    setBeatOne(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-heading"
  }, t(questionHeading)), /*#__PURE__*/React.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-box"
  }, /*#__PURE__*/React.createElement("p", null, t(question))), /*#__PURE__*/React.createElement("div", {
    className: "answer-box"
  }, /*#__PURE__*/React.createElement(ResultBoxTwo, {
    beat: beat,
    beatOne: beatOne,
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultOne,
    boxOneCss: boxOneCss,
    boxOneHeading: boxOneHeading,
    boxTwoHeading: boxTwoHeading,
    boxResultTwo: boxResultTwo,
    boxTwoCss: boxTwoCss,
    boxResultThree: boxResultThree,
    boxThreeCss: boxThreeCss
  }))), /*#__PURE__*/React.createElement("div", {
    className: "option-box"
  }, /*#__PURE__*/React.createElement(AppleOption, {
    options: options,
    correctOption: correctOption,
    flag: flag,
    boxResultSet: stepOne ? handleBoxResultOne : stepTwo ? handleBoxResultTwo : () => {},
    stepOne: stepOne,
    stepTwo: stepTwo,
    boxResultOne: boxResultOne,
    boxResultTwo: boxResultTwo,
    showErrorOne: showErrorOne,
    showErrorTwo: showErrorTwo
  }))), tapRatio && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapRatio")), nextOne && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapNext")), nextTwo && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapNext")), tapProceed && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("proceed")), /*#__PURE__*/React.createElement(FooterButtons, {
    disabledNext: disabledNext,
    nextOne: nextOne,
    nextTwo: nextTwo,
    stepOne: stepOne,
    stepTwo: btnTwo,
    stepThree: stepThree,
    tapProceed: tapProceed,
    handleNextOne: handleNextOne,
    handleProceed: handleProceed,
    handlePrevOne: handlePrevOne,
    handlePrevTwo: handlePrevTwo
  }));
};
window.MainSix=MainSix;