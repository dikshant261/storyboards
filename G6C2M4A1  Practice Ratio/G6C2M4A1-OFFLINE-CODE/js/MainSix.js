function MainSix({
  onNext,
  options,
  correctOption,
  question,
  boxOneHeading,
  boxTwoHeading,
  questionHeading,
  flag,
  onPrev,
}) {
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
    'div',
    { className: 'main' },
    React.createElement('div', { className: 'main-heading' }, t(questionHeading)),
    React.createElement(
      'div',
      { className: 'main-content' },
      React.createElement(
        'div',
        { className: 'image-container' },
        React.createElement(
          'div',
          { className: 'image-box' },
          React.createElement('p', null, t(question))
        ),
        React.createElement(
          'div',
          { className: 'answer-box' },
          React.createElement(ResultBoxTwo, {
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
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'option-box' },
        React.createElement(AppleOption, {
          options: options,
          correctOption: correctOption,
          flag: flag,
          boxResultSet:
            stepOne
              ? handleBoxResultOne
              : stepTwo
              ? handleBoxResultTwo
              : () => {},
          stepOne: stepOne,
          stepTwo: stepTwo,
          boxResultOne: boxResultOne,
          boxResultTwo: boxResultTwo,
          showErrorOne: showErrorOne,
          showErrorTwo: showErrorTwo
        })
      )
    ),
    tapRatio && React.createElement('div', { className: 'footer-heading' }, t('tapRatio')),
    nextOne && React.createElement('div', { className: 'footer-heading' }, t('tapNext')),
    nextTwo && React.createElement('div', { className: 'footer-heading' }, t('tapNext')),
    tapProceed && React.createElement('div', { className: 'footer-heading' }, t('proceed')),
    React.createElement(FooterButtons, {
      disabledNext: disabledNext,
      nextOne: nextOne,
      nextTwo: nextTwo,
      stepOne: stepOne,
      stepTwo: stepTwo,
      stepThree: stepThree,
      tapProceed: tapProceed,
      handleNextOne: handleNextOne,
      handleProceed: handleProceed,
      handlePrevOne: handlePrevOne,
      handlePrevTwo: handlePrevTwo
    })
  );
}
window.MainSix=MainSix;