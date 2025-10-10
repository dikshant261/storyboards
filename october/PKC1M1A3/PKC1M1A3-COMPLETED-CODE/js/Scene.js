const Scene = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [next, setNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);
  const handleNext = () => {
    playClick();
    if (currentIndex + 1 === Question.length) {
      window.location.reload();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setNext(false);
      setIsDisabled(true);
      setReset(true);
    }
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "heading",
      },
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        t(Question[currentIndex].instructionText)
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main-container",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "images",
        },
        /*#__PURE__*/ React.createElement(ImageGrid, {
          renderCount: Question[currentIndex].imageCount,
          imageName: Question[currentIndex].image,
          disabled: () => setIsDisabled(false),
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "option",
        },
        /*#__PURE__*/ React.createElement(Keypad, {
          Question: Question[currentIndex],
          isDisabled: isDisabled,
          setNext: setNext,
          reset: reset,
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
      !next &&
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          t("instruction.optionClick")
        ),
      next &&
        /*#__PURE__*/ React.createElement("p", null, t("instruction.tapNext")),
      !next &&
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
              onClick: handleNext,
            },
            t("buttons.next")
          ),
          /*#__PURE__*/ React.createElement(Tap, {
            bottom: 0,
            onClick: handleNext,
          })
        )
    )
  );
};
window.Scene=Scene;
