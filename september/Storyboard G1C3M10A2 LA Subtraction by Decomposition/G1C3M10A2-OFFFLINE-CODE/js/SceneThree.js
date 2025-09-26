const SceneThree = ({ onNext, onPrev }) => {
  const [next, setNext] = React.useState(false);
  const [option, setOption] = React.useState(null);
  const [stepOne, setStepOne] = React.useState(true);
  const [allDisabled, setAllDisabled] = React.useState(false);
  const [current, setCurrent] = React.useState([]);
  const [number, setNumber] = React.useState([]);
  const tap = "assets/tap.gif";

  React.useEffect(() => {
    const stored = sessionStorage.getItem("sceneThreeResult");
    if (stored) {
      const result = JSON.parse(stored);
      setAllDisabled(result.disabled);
      setNumber(result.number);
      setStepOne(result.stepOne);
      setNext(result.next);
    }
  }, []);

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrev = () => {
    playClick();
    onPrev();
  };

  const handleClick = (num) => {
    if (num === 1 || num === 3) {
      playCorrect();
      setAllDisabled(true);
      setNumber([4, 3]);
      setStepOne(false);
      setNext(true);
      sessionStorage.setItem(
        "sceneThreeResult",
        JSON.stringify({
          disabled: true,
          stepOne: false,
          next: true,
          number: [4, 3],
        })
      );
    } else {
      playWrong();
      setCurrent([...current, num]);
    }
  };

  return React.createElement(
    "div",
    { className: "scene-container" },

    // Left side
    React.createElement(
      "div",
      { className: "scene-container-left" },
      React.createElement(
        "p",
        { style: { fontWeight: "bold" } },
        t("sideHeading.represent")
      ),
      React.createElement(
        "p",
        { style: { color: "lightgreen" } },
        t("steps.stepOne") + "✅"
      ),
      React.createElement(
        "p",
        { style: { color: "lightgreen" } },
        t("steps.stepTwo") + "✅"
      ),
      React.createElement("p", null, t("steps.stepThree")),
      React.createElement("p", null, t("sideHeading.numberPair"))
    ),

    // Right side
    React.createElement(
      "div",
      { className: "scene-container-right" },

      // Balloon and DesignTwo
      React.createElement(
        "div",
        { className: "scene-container-right-ballon" },
        React.createElement(
          "div",
          { className: "balloon-set" },
          React.createElement(Balloon, null)
        ),
        React.createElement(DesignTwo, {
          option: option,
          total: 7,
          number: number,
        })
      ),

      // Options keypad
      React.createElement(
        "div",
        {
          className: "scene-container-right-option-keypad",
          style: { justifyContent: "center" },
        },

        // Option 1
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              pointerEvents: allDisabled ? "none" : "auto",
              backgroundColor: allDisabled ? "#90ee90a1" : "#ffffff61",
              borderRadius: "0.9vw",
            },
            onClick: () => handleClick(1),
          },
          React.createElement(DesignOption, {
            total: 7,
            red: 3,
            blue: 4,
            style: { borderColor: allDisabled ? "darkgreen" : "" },
          })
        ),

        // Option 2
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              pointerEvents:
                allDisabled || current.includes(2) ? "none" : "auto",
              backgroundColor:
                allDisabled || current.includes(2) ? "#fa8072ab" : "#ffffff61",
              borderRadius: "0.9vw",
            },
            onClick: () => handleClick(2),
          },
          React.createElement(DesignOption, {
            total: 7,
            red: 6,
            blue: 1,
            style: {
              borderColor:
                allDisabled || current.includes(2) ? "darksalmon" : "",
            },
          })
        ),

        // Option 3
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              pointerEvents: allDisabled ? "none" : "auto",
              backgroundColor: allDisabled ? "#90ee90a1" : "#ffffff61",
              borderRadius: "0.9vw",
            },
            onClick: () => handleClick(3),
          },
          React.createElement(DesignOption, {
            total: 7,
            red: 4,
            blue: 3,
            style: { borderColor: allDisabled ? "darkgreen" : "" },
          })
        ),

        // Option 4
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              pointerEvents:
                allDisabled || current.includes(4) ? "none" : "auto",
              backgroundColor:
                allDisabled || current.includes(4) ? "#fa8072ab" : "#ffffff61",
              borderRadius: "0.9vw",
            },
            onClick: () => handleClick(4),
          },
          React.createElement(DesignOption, {
            total: 7,
            red: 4,
            blue: 7,
            style: {
              borderColor:
                allDisabled || current.includes(4) ? "darksalmon" : "",
            },
          })
        )
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
            t("navigation.tapCorrectOption")
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

window.SceneThree = SceneThree;
