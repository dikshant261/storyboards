const SceneNine = ({
  onPrev,
  onNext
}) => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [boxCss, setBoxCss] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [current, SetCurrrent] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("mangoRipesubtractionOne"));
    if (stored) {
      setResult(stored.result);
      setShowError(stored.showError);
      setBoxCss(stored.boxCss);
      setDisabled(stored.disabled);
      SetCurrrent(stored.current);
      setNext(stored.next);
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
    if (result === 2) {
      playCorrect();
      setShowError(true);
      setBoxCss("correct");
      setDisabled(true);
      SetCurrrent(false);
      setNext(true);
      sessionStorage.setItem("mangoRipesubtractionOne", JSON.stringify({
        showError: true,
        boxCss: "correct",
        disabled: true,
        current: false,
        next: true,
        result: result
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
  }, t("typeOne.typeThreeText")), /*#__PURE__*/React.createElement("p", {
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
  }, /*#__PURE__*/React.createElement("p", null, t("questionThree.question")), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "translateX(13vw)"
    }
  }, /*#__PURE__*/React.createElement(Design, null)), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-13vw, -4vw)"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("total")), /*#__PURE__*/React.createElement("div", {
    className: `box`,
    style: {
      transform: "translateX(7.5vw)",
      background: "white",
      color: "black",
      border: "none"
    }
  }, 6)), /*#__PURE__*/React.createElement("div", {
    className: "align-total",
    style: {
      transform: "translate(-9vw,-4vw)"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("questionThree.partA")), /*#__PURE__*/React.createElement("div", {
    className: `box ${boxCss}`
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
    flag: 8
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-heading"
  }, current && /*#__PURE__*/React.createElement("p", null, t("navigation.tapNumber")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), current && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
window.SceneNine=SceneNine;