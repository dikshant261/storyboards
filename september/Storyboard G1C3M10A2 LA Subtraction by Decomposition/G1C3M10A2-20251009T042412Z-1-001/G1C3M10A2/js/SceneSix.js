const SceneSix = function (props) {
  const { onNext, onPrev } = props;

  const [stepOne, setStepOne] = React.useState(true);
       const tap = "assets/tap.gif";

  const handleNext = function () {
    playClick();
    onNext();
  };

  const handlePrev = function () {
    playClick();
    onPrev();
  };

  const handleClick = function () {
    playClick();
    sessionStorage.clear();
    window.location.reload();
  };

  return React.createElement(
    "div",
    { className: "scene-container" },
    React.createElement(
      "div",
      { className: "scene-container-left" },
      React.createElement("p", null, t("sideHeading.completeFirst"))
    ),
    React.createElement(
      "div",
      { className: "scene-container-right" },
      React.createElement(
        "div",
        { className: "scene-container-right-ballon" },
        React.createElement(
          "div",
          { className: "balloon-set" },
          React.createElement(DesignTwo, { total: 7, red: 4, blue: 3, a: "A", b: "B" })
        ),
        React.createElement(
          "div",
          { className: "sentance-align" },
          React.createElement(
            "div",
            null,
            React.createElement(SentanceBox, { num: 4, result: 3 })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(SentanceBox, { num: 3, result: 4 })
          )
        )
      ),
      React.createElement(
        "div",
        { className: "scene-container-right-option-keypad", style: { justifyContent: "center" } },
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { className: "start-over", onClick: handleClick },
            t("buttons.startOver")
          ),
          React.createElement("img", { src: tap, className: "tap-gif-three" })
        )
      ),
      React.createElement(
        "div",
        { className: "scene-container-right-footer" },
        React.createElement("button", { onClick: handlePrev }, t("buttons.previous")),
        stepOne && React.createElement("p", { style: { fontSize: "2.7vw" } }, t("navigation.starAgain")),
        stepOne &&
          React.createElement(
            "button",
            { style: { backgroundColor: "gray", borderColor: "gray", cursor: "not-allowed" } },
            t("buttons.next")
          )
      )
    )
  );
};

window.SceneSix = SceneSix;
