const SceneEight = ({ onNext }) => {
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [next, setNext] = useState(false);
  const [nextTwo, setNextTwo] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledOne, setDisabledOne] = useState(false);
  const [black, setBlack] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
    setPulse(true);
    setDisabled(false);
  };
  const handleCutter = () => {
    playCorrect();
    setCutting(true);
    setPulse(false);

    // ⏱ After 60% of 3s animation → around 1.8s
    setTimeout(() => {
      setBlack(true);
    }, 1800); // <-- trigger at 60%

    // ⏱ After full animation (3s), reset cutter animation
    setTimeout(() => {
      setBeforeCut(false);
      setAfterCut(true);
      setNext(true);
      setCutting(false);
      setDisabledOne(true);
    }, 3000);
  };
  console.log("next", next, afterCut);
  const handleNextTwo = () => {
    playClick();
    setNext(false);
    setNextTwo(true);
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-conatiner-three",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "left",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "text-box",
        },
        beforeCut &&
          /*#__PURE__*/ React.createElement(
            "p",
            { style: { fontSize: "2.3vw" } },
            t("sceneEight.whyNot")
          ),
        next &&
          /*#__PURE__*/ React.createElement(
            "p",
            { style: { fontSize: "2.3vw" } },
            t("sceneEight.wowTwo")
          ),
        nextTwo &&
          /*#__PURE__*/ React.createElement(
            "p",
            { style: { fontSize: "2.3vw" } },
            t("sceneEight.wowPerfect")
          ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "triangle",
          },
          "\u25B6"
        )
      ),
      beforeCut &&
        /*#__PURE__*/ React.createElement("img", {
          src: images.manhand,
          style: {
            width: "21.3vw",
            objectFit: "contain",
          },
          loading: "lazy",
        }),
      afterCut &&
        /*#__PURE__*/ React.createElement("img", {
          src: images.girl,
          style: {
            width: "16vw",
            objectFit: "contain",
          },
          loading: "lazy",
        })
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "right",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "right-align",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "main-container",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: images.cakethree,
            style: {
              width: "37vw",
              objectFit: "contain",
            },
          }),
          /*#__PURE__*/ React.createElement("div", {
            className: `${cut ? "cut-line-black" : "cut-line-diagonal"}`,
            onClick: handleLine,
            style: {
              border: black ? "0.3vw solid black" : "",
              pointerEvents: disabled ? "auto" : "none",
              cursor: disabled ? "pointer" : "not-allowed",
            },
          })
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "cutter-box",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: images.cutter,
            style: {
              width: "10vw",
              objectFit: "contain",
              pointerEvents: disabledOne ? "none" : "auto",
              cursor: disabledOne ? "not-allowed" : "pointer",
              opacity: disabledOne ? "0.5" : "1",
            },
            onClick: handleCutter,
            className: `${pulse ? "cutter-pulse" : ""} ${
              cutting ? "cutting-animate-diagonally" : ""
            }`,
          })
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "footer",
        },
        /*#__PURE__*/ React.createElement(
          "button",
          {
            className: "disabled",
          },
          t("buttons.previous")
        ),
        beforeCut &&
          /*#__PURE__*/ React.createElement(
            "p",
            {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1vw",
              },
            },
            t("sceneEight.tapCutting"),
            /*#__PURE__*/ React.createElement(
              "span",
              null,
              /*#__PURE__*/ React.createElement("img", {
                src: images.cutter,
                style: {
                  width: "4vw",
                  objectFit: "contain",
                },
              })
            )
          ),
        afterCut &&
          /*#__PURE__*/ React.createElement(
            "p",
            { style: { fontSize: "2.3vw" } },
            t("sceneEight.tapKnow")
          ),
        beforeCut &&
          /*#__PURE__*/ React.createElement(
            "button",
            {
              className: "disabled",
            },
            t("buttons.next")
          ),
        next &&
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: handleNextTwo,
              },
              t("buttons.next")
            ),
            /*#__PURE__*/ React.createElement(Tap, {
              bottom: 0,
            })
          ),
        nextTwo &&
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: handleNext,
              },
              t("buttons.next")
            ),
            /*#__PURE__*/ React.createElement(Tap, {
              bottom: 0,
            })
          )
      )
    )
  );
};
window.SceneEight = SceneEight;
