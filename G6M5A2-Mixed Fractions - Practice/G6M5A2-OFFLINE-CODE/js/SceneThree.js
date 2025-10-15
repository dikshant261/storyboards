const SceneThree = ({
  goNext,
  goPrev,
  goNextQuestion,
  question
}) => {
  const [showAnime, setShowAnime] = useState(true);
  const [showFractionDelay, setShowFractionDelay] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [disbaled, setDisabled] = useState(true);
  const [heading, setHeading] = useState(false);
  const [nextOne, setNextOne] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [remainder, setRemainder] = useState({
    option: null,
    isCorrected: Boolean
  });
  useEffect(() => {
    setShowAnime(true);
    setTimeout(() => {
      setShowFractionDelay(true);
    }, 1000);
  }, []);
  const handleClick = () => {
    setShowNext(false);
    setShowOption(false);
    setNextOne(true);
  };
  console.log("quoteient", remainder);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneTwo.divide", {
    dividend: question.dividend,
    divisor: question.divisor
  })), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, t("titles.imporoperFraction")), /*#__PURE__*/React.createElement(Fraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    fontSize: "9vw",
    lineHeight: "0.8vh",
    lineWidth: "9vw"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mid"
  }, /*#__PURE__*/React.createElement("p", null, t("titles.division")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DivisionTwo, {
    anime: showAnime,
    remainder: remainder,
    num: question.dividend,
    deno: question.divisor,
    question: question
  }))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, showFractionDelay && /*#__PURE__*/React.createElement(MixedFractionTwo, {
    numerator: question.dividend,
    denominator: question.divisor,
    remainder: remainder,
    question: question
  }))), /*#__PURE__*/React.createElement("div", {
    className: "option"
  }, showOption && /*#__PURE__*/React.createElement(OptionTwo, {
    response: setRemainder,
    setNext: setShowNext,
    setHeading: setHeading,
    setDisabled: setDisabled,
    question: question
  }), !showOption && /*#__PURE__*/React.createElement("p", null, t("sceneTwo.mixedNumber"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Fraction, {
    numerator: question.dividend,
    denominator: question.divisor,
    fontSize: "3vw"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer-two"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !heading && /*#__PURE__*/React.createElement("p", null, t("instruction.tapRemainder")), heading && /*#__PURE__*/React.createElement("p", null, t("instruction.next")), disbaled && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), showNext && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      handleClick();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })), nextOne && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNextQuestion();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
window.SceneThree=SceneThree;