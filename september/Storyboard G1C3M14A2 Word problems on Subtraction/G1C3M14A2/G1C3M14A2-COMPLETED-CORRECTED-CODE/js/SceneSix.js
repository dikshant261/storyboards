const SceneSix = ({
  onPrev,
  onNext
}) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  const [beat, setBeat] = useState(true);
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("marbleSmallersubtractionOne"));
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
      setBeat(stored.beat);
    }
  }, []);
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleResponse = num => {
    playClick();
    setShowError(false);
    setBoxCss("");
    setResult(num);
  };
  const checkHandle = () => {
    if (result === 7) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      setBeat(false);
      sessionStorage.setItem("marbleSmallersubtractionOne", JSON.stringify({
        showError: true,
        boxCss: "correct",
        disabled: true,
        current: false,
        next: true,
        result: result,
        beat: false
      }));
    } else {
      playWrong();
      setShowError(true);
      setBoxCss("wrong");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-left"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "left"
    }
  }, t("typeOne.typeTwoText")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "left"
    }
  }, t("typeOne.enterNumbers"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("questionHading.solveSubtraction"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-content"
  }, /*#__PURE__*/React.createElement("p", null, t("questionTwo.question")), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(0vw, -1vw)",
      gap: "2vh"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionTwo.malik")), /*#__PURE__*/React.createElement(MarbleRender, {
    limit: 9
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-5vw, -2vw)",
      gap: "2vh"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionTwo.andi")), /*#__PURE__*/React.createElement(MarbleRender, {
    limit: 7
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-9vw, -2vw)"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionTwo.larger")), /*#__PURE__*/React.createElement("div", {
    className: `box`,
    style: {
      transform: "translateX(0.9vw)",
      backgroundColor: "white",
      border: "none",
      color: "black"
    }
  }, 9)), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-8.8vw,-2vw)"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionTwo.smaller")), /*#__PURE__*/React.createElement("div", {
    className: `box ${beat ? "active" : ""} ${boxCss}`
  }, result)))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-option"
  }, /*#__PURE__*/React.createElement(Keypad, {
    response: handleResponse,
    result: result,
    showError: showError,
    setShowError: () => setShowError(false),
    boxCss: boxCss,
    checkHandle: checkHandle,
    disabled: disabled,
    flag: 5
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-heading"
  }, current && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNumber")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), /*#__PURE__*/React.createElement(ProgressBar, {
    current: 6
  }), current && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0,
    onClick: handleNext
  })))));
};
window.SceneSix=SceneSix;