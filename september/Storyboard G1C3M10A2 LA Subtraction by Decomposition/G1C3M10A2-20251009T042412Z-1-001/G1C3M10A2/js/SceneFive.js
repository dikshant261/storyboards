const SceneFive = ({ onNext, onPrev }) => {
  const [next, setNext] = React.useState(false);
  const [option, setOption] = React.useState(null);
  const [stepOne, setStepOne] = React.useState(true);
  const [showErrorTwo, setShowErrorTwo] = React.useState(false);
  const [beat, setBeat] = React.useState(true);
  const [boxCss, setBoxCss] = React.useState("");
  const [disabledKeypad, setDisabledKeypad] = React.useState(false);

  const boxStyle = { width: "8vw", height: "14vh" };
  const tap = "assets/tap.gif";

  React.useEffect(() => {
    const stored = sessionStorage.getItem("sceneFiveResult");
    if (stored) {
      const result = JSON.parse(stored);
      setShowErrorTwo(result.showError);
      setBeat(result.beat);
      setBoxCss(result.boxCss);
      setStepOne(result.stepOne);
      setNext(result.next);
      setDisabledKeypad(result.disabledKeypad);
      setOption(result.option);
    }
  }, []);

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handleResponse = (num) => {
    playClick();
    setShowErrorTwo(false);
    setBoxCss("");
    setOption(num);
  };

  const handleCheck = () => {
    if (option === 4) {
      playCorrect();
      setShowErrorTwo(true);
      setBeat(false);
      setBoxCss("green-box");
      setStepOne(false);
      setNext(true);
      setDisabledKeypad(true);
      sessionStorage.setItem(
        "sceneFiveResult",
        JSON.stringify({
          showError: true,
          beat: false,
          boxCss: "green-box",
          stepOne: false,
          next: true,
          disabledKeypad: true,
          option,
        })
      );
    } else {
      playWrong();
      setShowErrorTwo(true);
      setBoxCss("salmon-box");
    }
  };

  const handlePrev = () => {
    playClick();
    onPrev();
  };

  return React.createElement(
    "div",
    { className: "scene-container" },

    // Left section
    React.createElement(
      "div",
      { className: "scene-container-left" },
      React.createElement("p", null, t("sideHeading.completeFirst"))
    ),

    // Right section
    React.createElement(
      "div",
      { className: "scene-container-right" },

      // Balloons + Sentence boxes
      React.createElement(
        "div",
        { className: "scene-container-right-ballon" },
        React.createElement(
          "div",
          { className: "balloon-set" },
          React.createElement(DesignTwo, {
            total: 7,
            red: 4,
            blue: 3,
            a: "A",
            b: "B",
          })
        ),
        React.createElement(
          "div",
          { className: "sentance-align" },
          React.createElement(
            "div",
            { style: { opacity: "0.4" } },
            React.createElement(SentanceBox, { num: 4, result: 3 })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(SentanceBox, {
              num: 3,
              beat: beat,
              boxCss: boxCss,
              option: option,
              style: boxStyle,
            })
          )
        )
      ),

      // Keypad
      React.createElement(
        "div",
        { className: "scene-container-right-option-keypad" },
        React.createElement(Keypad, {
          onNumberClick: handleResponse,
          option: option,
          onCheck: handleCheck,
          showErrorTwo: showErrorTwo,
          disabledKeypad: disabledKeypad,
        })
      ),

      // Footer
      React.createElement(
        "div",
        { className: "scene-container-right-footer" },

        React.createElement(
          "button",
          { onClick: handlePrev },
          t("buttons.previous")
        ),

        stepOne &&
          React.createElement(
            "p",
            { style: { fontSize: "2.7vw" } },
            t("navigation.tapNumber")
          ),
        next && React.createElement("p", null, t("navigation.tapToContinue")),

        stepOne &&
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: "gray",
                borderColor: "gray",
                cursor: "not-allowed",
              },
            },
            t("buttons.next")
          ),

        next &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: handleNext },
              t("buttons.next")
            ),
            React.createElement("img", { src: tap, className: "tap-gif" })
          )
      )
    )
  );
};
window.SceneFive = SceneFive;
