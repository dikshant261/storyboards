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
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [showNextOne, setShowNextOne] = useState(false);
  const [heading, setHeading] = useState(true);
  const [next, setNext] = useState(false);
  const [freezeButton, setFreezeButton] = useState(false);
  const [freezeAnimation, setFreezeAnimation] = useState(false);
  console.log("next", next);
  useEffect(() => {
    const result = sessionStorage.getItem(`reciprocal${question[2]}`);
    if (result) {
      const parsed = JSON.parse(result);
      setIsCorrect(parsed.isCorrect);
      setShowBox(parsed.show);
      setShowAnimation(parsed.showAnimate);
      setShowNextOne(parsed.showNextOne);
      setHeading(parsed.heading);
      setNext(parsed.next);
      setFreezeButton(parsed.freezeButton);
      setFreezeAnimation(parsed.freezeAnimation);
    }
  }, []);
  React.useEffect(() => {
    if (isCorrect) {
      setHeading(false);
      setShowNextOne(true);
    } else {
      setBoxCss("wrong");
    }
  }, [isCorrect]);
  const handleNextOne = () => {
    playClick();
    setShowBox(false);
    setShowAnimation(true);
    setShowNextOne(false);
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    sessionStorage.setItem(`reciprocal${question[2]}`, JSON.stringify({
      show: false,
      isCorrect: false,
      showAnimate: true,
      showNextOne: false,
      heading: false,
      next: true,
      freezeButton: true,
      freezeAnimation: true
    }));
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
  }), showAnimation && /*#__PURE__*/React.createElement(AnimatedResult, {
    question: question,
    setNext: () => setNext(true),
    freezeAnimation: freezeAnimation
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
    freezeButton: freezeButton
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), heading && /*#__PURE__*/React.createElement("p", null, t("navigation.tapOption")), showNextOne && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), heading && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), showNextOne && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNextOne
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  })), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))));
};
window.SceneOne=SceneOne;