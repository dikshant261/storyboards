const SceneTwo = function (props) {
  const { onNext, onPrev } = props;

  const [next, setNext] = React.useState(false);
  const [option, setOption] = React.useState(null);
  const [stepOne, setStepOne] = React.useState(true);
  const [showErrorfirst, setShowError] = React.useState(false);
  const [beat, setBeat] = React.useState(true);
  const [circleCss, setCircleCss] = React.useState("");
  const [disabledKeypad, setDisabledKeypad] = React.useState(false);

  const tap = "assets/tap.gif";

  const handleNext = function () {
    playClick();
    onNext();
  };

  const handlePrev = function () {
    playClick();
    onPrev();
  };

  React.useEffect(function () {
    const stored = sessionStorage.getItem("sceneTwoResult");
    if (stored) {
      const result = JSON.parse(stored);
      setOption(result.option);
      setNext(result.next);
      setDisabledKeypad(result.disabledOpt);
      setStepOne(result.stepOne);
      setShowError(result.errorShow);
      setCircleCss(result.circleCss);
      setBeat(result.beat);
    }
  }, []);

  const handleResponse = function (num) {
    playClick();
    setShowError(false);
    setCircleCss("");
    setOption(num);
  };

  const handleCheck = function () {
    if (option === 7) {
      playCorrect();
      setShowError(true);
      setBeat(false);
      setCircleCss("green");
      setStepOne(false);
      setNext(true);
      setDisabledKeypad(true);
      sessionStorage.setItem(
        "sceneTwoResult",
        JSON.stringify({
          option: option,
          errorShow: true,
          beat: false,
          stepOne: false,
          circleCss: "green",
          next: true,
          disabledOpt: true,
        })
      );
    } else {
      playWrong();
      setShowError(true);
      setCircleCss("salmon");
    }
  };

  return React.createElement(
    "div",
    { className: "scene-container" },
    React.createElement(
      "div",
      { className: "scene-container-left" },
      React.createElement("p", { style: { fontWeight: "bold" } }, t("sideHeading.represent")),
      React.createElement("p", { style: { color: "lightgreen" } }, t("steps.stepOne") + "✅"),
      React.createElement("p", null, t("steps.stepTwo")),
      React.createElement("p", null, t("sideHeading.countRedandBlue"))
    ),
    React.createElement(
      "div",
      { className: "scene-container-right" },
      React.createElement(
        "div",
        { className: "scene-container-right-ballon" },
        React.createElement("div", { className: "balloon-set" }, React.createElement(Balloon, null)),
        React.createElement(DesignTwo, { option: option, beat: beat, circleCss: circleCss })
      ),
      React.createElement(
        "div",
        { className: "scene-container-right-option-keypad" },
        React.createElement(Keypad, {
          onNumberClick: handleResponse,
          option: option,
          onCheck: handleCheck,
          showErrorfirst: showErrorfirst,
          disabledKeypad: disabledKeypad,
        })
      ),
      React.createElement(
        "div",
        { className: "scene-container-right-footer" },
        React.createElement("button", { onClick: handlePrev }, t("buttons.previous")),
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
              style: { backgroundColor: "gray", borderColor: "gray", cursor: "not-allowed" },
            },
            t("buttons.next")
          ),
        next &&
          React.createElement(
            "div",
            null,
            React.createElement("button", { onClick: handleNext }, t("buttons.next")),
            React.createElement("img", { src: tap, className: "tap-gif" })
          )
      )
    )
  );
};

window.SceneTwo = SceneTwo;
