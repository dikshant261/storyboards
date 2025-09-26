const SceneOne = ({
  onPrev,
  onNext,
  question,
  setHintSlide
}) => {
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [showBox, setShowBox] = React.useState(true);
  const [boxCss, setBoxCss] = React.useState("");
  const [buttonReset, setButtonReset] = useState(false);
  const [animationShow, setAnimationShow] = useState(false);
  const [heading, setHeading] = useState(true);
  const [next, setNext] = useState(false);
  React.useEffect(() => {
    if (isCorrect) {
      setShowBox(false);
    } else {
      setBoxCss("wrong");
    }
  }, [isCorrect]);
  const handlePrev = () => {
    playClick();
    setButtonReset(true);
    setAnimationShow(true);
    setSelectedLabel(null);
    setIsCorrect(false);
    setNext(false);
    setHeading(true);
    setShowBox(true);
    setBoxCss("");
    onPrev();
  };
  const handleNext = () => {
    playClick();
    setButtonReset(true);
    setAnimationShow(true);
    setSelectedLabel(null);
    setIsCorrect(false);
    setNext(false);
    setHeading(true);
    setShowBox(true);
    setBoxCss("");
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("mainHeading"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, /*#__PURE__*/React.createElement(Division, {
    numerator: question[0],
    denominator: question[1],
    fontSize: "7vw",
    color: "white",
    gap: "3vw"
  }), showBox && /*#__PURE__*/React.createElement(Box, {
    content: selectedLabel,
    boxCss: boxCss
  }), isCorrect && /*#__PURE__*/React.createElement(AnimatedResult, {
    question: question,
    animationShow: animationShow,
    setNext: () => setNext(true),
    setHeading: () => setHeading(false),
    animationSet: () => setAnimationShow(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: "scene-main-second"
  }, /*#__PURE__*/React.createElement(OptionsPanel, {
    question: question,
    onSelect: ({
      selectedLabel,
      isCorrect
    }) => {
      setSelectedLabel(selectedLabel);
      setIsCorrect(isCorrect);
    },
    setHintSlide: setHintSlide,
    buttonReset: buttonReset,
    buttonSet: () => setButtonReset(false)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), !isCorrect && /*#__PURE__*/React.createElement("p", null, t("navigation.tapOption")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), !isCorrect && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))));
};
window.SceneOne=SceneOne;