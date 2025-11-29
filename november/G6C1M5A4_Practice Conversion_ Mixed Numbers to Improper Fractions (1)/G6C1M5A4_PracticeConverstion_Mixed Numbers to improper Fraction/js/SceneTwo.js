const SceneTwo = ({ goNext, goPrev, questions, current }) => {
  const [showDisabledButton, setShowDisabledButton] = useState(true);
  const [tapOption, setTapOption] = useState(true);
  const [showAnimationHeading, setShowAnimationHeading] = useState(false);
  const [next, setNext] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [showReplybutton, setShowReplybutton] = useState(false);
  const [showError, setShowError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [optionValue, setOptionValue] = useState({
    num: null,
    den: null,
  });
  const [animationStarted, setAnimationStarted] = useState(false);
  useEffect(() => {
    setShowDisabledButton(true);
    setTapOption(true);
    setShowAnimationHeading(false);
    setNext(false);
    setAnimationPlayed(false);
    setShowOption(true);
    setShowReplybutton(false);
    setShowError(null);
    setOptionValue({
      num: null,
      den: null,
    });
    setAnimationStarted(false);
  }, [questions]);
  const handleAnimation = () => {
    setShowAnimationHeading(false);
    setShowDisabledButton(true);
    setAnimationPlayed(true);
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  console.log("Render SceneTwo:", showDisabledButton);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scenetwo-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "heading",
      },
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          t("sceneTwo.expressTheGiven"),
          " "
        )
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "main-content",
          style: {
            color: "white",
            fontSize: "7vw",
            textAlign: "center",
            position: "relative",
            zIndex: 20,
          },
        },
        !animationPlayed &&
          /*#__PURE__*/ React.createElement(BlockMath, {
            math: `${questions.wholeNumber}\\frac{${questions.numerator}}{${questions.denominator}}`,
          }),
        animationPlayed &&
          /*#__PURE__*/ React.createElement(FractionAnimation, {
            key: animationKey, // ✅ ensures remount on each reply
            wholeNumber: questions.wholeNumber,
            numerator: questions.numerator,
            denominator: questions.denominator,
            setNext: () => setNext(true),
            setShowDisabledButton: setShowDisabledButton,
            setShowReplybutton: () => setShowReplybutton(true),
            setShowOption: () => setShowOption(false),
            showAniButton: animationStarted,
          })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "keypad",
          style: {
            padding: "2vh",
          },
        },
        showOption &&
          /*#__PURE__*/ React.createElement(Option, {
            setTapOption: setTapOption,
            setShowDisabledButton: setShowDisabledButton,
            setShowAnimationHeading: setShowAnimationHeading,
            setShowError: setShowError,
            setOptionValue: setOptionValue,
            question: questions,
          }),
        showReplybutton &&
          /*#__PURE__*/ React.createElement(ReusableButton, {
            label: t("buttons.replyButton"),
            padding: "1vh 1vw",
            fontSize: "2.5vw",
            onClick: () => {
              playClick();
              setAnimationKey((prev) => prev + 1); // ✅ increment key to remount
              setAnimationStarted(true);
            },
          }),
        showError !== null &&
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            showError === 1
              ? /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className: "frame-success",
                  },
                  t("feedback.success")
                )
              : showError === 3
              ? /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className: "frame-error",
                  },
                  /*#__PURE__*/ React.createElement(
                    "span",
                    null,
                    t("feedback.opps"),
                    /*#__PURE__*/ React.createElement(InlineMath, {
                      math: `\\frac{${optionValue.num}}{${optionValue.den}}`,
                    })
                  ),
                  /*#__PURE__*/ React.createElement(
                    "span",
                    null,
                    t("feedback.isProper")
                  )
                )
              : showError === 2
              ? /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className: "frame-error",
                  },
                  t("feedback.opps"),
                  /*#__PURE__*/ React.createElement(
                    "span",
                    null,
                    /*#__PURE__*/ React.createElement(InlineMath, {
                      math: `\\frac{${optionValue.num}}{${optionValue.den}}`,
                    }),
                    /*#__PURE__*/ React.createElement(
                      "span",
                      null,
                      t("feedback.is")
                    ),
                    /*#__PURE__*/ React.createElement(
                      "span",
                      {
                        style: {
                          fontSize: "3vw",
                        },
                      },
                      /*#__PURE__*/ React.createElement(InlineMath, {
                        math: `${parseInt(
                          optionValue.num / optionValue.den
                        )}\\frac{${optionValue.num % optionValue.den}}{${
                          optionValue.den
                        }}`,
                      })
                    )
                  )
                )
              : /*#__PURE__*/ React.createElement("p", null)
          )
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "footer-heading",
      },
      tapOption &&
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          t("navigation.tapCorrectOption")
        ),
      showAnimationHeading &&
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          t("navigation.tapShowAnimation")
        ),
      next &&
        /*#__PURE__*/ React.createElement("p", null, t("navigation.tapNext"))
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "footer",
      },
      /*#__PURE__*/ React.createElement(
        "button",
        {
          onClick: () => {
            playClick();
            goPrev();
          },
        },
        t("buttons.previous")
      ),
      /*#__PURE__*/ React.createElement(ProgressBar, {
        total: 6,
        current: current,
      }),
      showDisabledButton &&
        /*#__PURE__*/ React.createElement(
          "button",
          {
            className: "disabled",
          },
          t("buttons.next")
        ),
      showAnimationHeading &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: handleAnimation,
            },
            t("buttons.next")
          ),
          /*#__PURE__*/ React.createElement(Tap, {
            onClick: handleClick,
            bottom: 0,
          })
        ),
      next &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: handleClick,
            },
            t("buttons.next")
          ),
          /*#__PURE__*/ React.createElement(Tap, {
            onClick: handleClick,
            bottom: 0,
          })
        )
    )
  );
};
window.SceneTwo = SceneTwo;
