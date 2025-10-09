const SceneOne = ({ onNext, onPrev }) => {
  const [next, setNext] = React.useState(false);
  const [option, setOption] = React.useState(null);
  const [disabledOpt, setDisabledOpt] = React.useState(false);
  const [stepOne, setStepOne] = React.useState(true);
  const tap="assets/tap.gif";

  // Restore previous response from session storage
  React.useEffect(() => {
    const stored = sessionStorage.getItem("sceneOneResult");
    if (stored) {
      const result = JSON.parse(stored);
      setOption(result.selectedOption);
      setNext(result.next);
      setDisabledOpt(result.disabledOpt);
      setStepOne(result.stepOne);
    }
  }, []);

  const handleOption = (selectedOption) => {
    setOption(selectedOption);
    if (selectedOption === 2) {
      playCorrect();
      setStepOne(false);
      setNext(true);
      setDisabledOpt(true);
      sessionStorage.setItem(
        "sceneOneResult",
        JSON.stringify({
          selectedOption,
          correct: true,
          stepOne: false,
          next: true,
          disabledOpt: true,
        })
      );
    } else {
      playWrong();
      setDisabledOpt(true);
    }
  };

  const handleNext = () => {
    playClick();
    onNext();
  };

  return React.createElement(
    "div",
    { className: "scene-container" },

    // Left container
    React.createElement(
      "div",
      { className: "scene-container-left" },
      React.createElement("p", { style: { fontWeight: "bold" } }, t("sideHeading.represent")),
      React.createElement("p", null, t("steps.stepOne")),
      React.createElement("p", null, t("sideHeading.tapCorrect"))
    ),

    // Right container
    React.createElement(
      "div",
      { className: "scene-container-right" },

      // Balloon & Design
      React.createElement(
        "div",
        { className: "scene-container-right-ballon" },
        React.createElement("div", { className: "balloon-set" }, React.createElement(Balloon)),
        React.createElement(Design)
      ),

      // Options
      React.createElement(
        "div",
        { className: "scene-container-right-option" },

        // Option 1
        React.createElement(
          "div",
          {
            className: "option",
            onClick: () => handleOption(1),
            style: {
              background: disabledOpt ? "salmon" : "",
              pointerEvents: disabledOpt ? "none" : "auto",
              opacity: option !== null && option !== 1 ? 0.5 : 1,
            },
          },
          t("optionsSceneOne.someBalloonRedAndYellow")
        ),

        // Option 2
        React.createElement(
          "div",
          {
            className: "option",
            onClick: () => handleOption(2),
            style: {
              background: option === 2 ? "green" : "",
              pointerEvents: option === 2 ? "none" : "auto",
            },
          },
          t("optionsSceneOne.someBalloonRebAndBlue")
        )
      ),

      // Footer
      React.createElement(
        "div",
        { className: "scene-container-right-footer" },

        // Previous Button (always disabled)
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: "gray",
              borderColor: "gray",
              cursor: "not-allowed",
            },
          },
          t("buttons.previous")
        ),

        stepOne && React.createElement("p", null, t("navigation.tapCorrectOption")),
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
            React.createElement("button", { onClick: handleNext }, t("buttons.next")),
            React.createElement("img", { src: tap, className: "tap-gif" })
          )
      )
    )
  );
};
window.SceneOne=SceneOne;