const SceneFour = ({ onNext, onPrev }) => {
  const [value, setValue] = useState(null);
  const [showOption, setShowOption] = useState(true);
  const [showSummarise, setShowSummarise] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const tap = "assets/tap.gif";
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrvious = () => {
    playClick();
    onPrev();
  };
  const handleResponse = (num) => {
    setValue(num);
    if (num === 1) {
      playCorrect();
      setShowError(true);
      setShowOption(false);
      setShowSummarise(true);
    } else {
      playWrong();
      setShowError(true);
    }
  };
  console.log(value, "value");
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-conatainer",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "scene-conatainer-heading",
      },
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        t("sceneFourContent.topHeading")
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "scene-conatainer-main",
        style: {
          justifyContent: "flex-start",
        },
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "question-align",
        },
        /*#__PURE__*/ React.createElement(Question, {
          divisor: 2,
          dividend: 3,
          style: {
            fontSize: "6vw",
            gap: "1vw",
            border: "0.3vw solid white",
            backgroundColor: "#23496ebf",
            borderRadius: "1vw",
            padding: "1vh 1vw",
          },
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "box-align",
        },
        /*#__PURE__*/ React.createElement(BoxThree, {
          number: 1,
          divisor: 3,
          style: {
            backgroundColor: "#ff9c6a",
          },
        }),
        /*#__PURE__*/ React.createElement(BoxThree, {
          number: 2,
          divisor: 3,
          style: {
            backgroundColor: "#0097a7",
          },
        })
      ),
      showOption &&
        /*#__PURE__*/ React.createElement(Option, {
          optionNumber: handleResponse,
          value: value,
        }),
      showSummarise &&
        /*#__PURE__*/
        React.createElement(
          "div",
          {
            style: {
              position: "relative",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                marginTop: "1vw",
              },
            },
            /*#__PURE__*/ React.createElement(ReusableButton, {
              label: t("buttons.summarise"),
              width: "19vw",
              height: "8vh",
              fontSize: "3vw",
              showTap: false,
              onClick: handleNext,
            })
          ),
          React.createElement("img", {
            src: tap,
            style: {
              position: "absolute",
              width: "4vw",
              top: "43%",
              left: "37%",
            },
          })
        ),
      errorShow &&
        /*#__PURE__*/ React.createElement(ErrorMessage, {
          value: value,
          flag: 1,
        })
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "scene-conatainer-footer-heading",
      },
      showOption &&
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          t("navigation.chooseCorrectOption")
        ),
      showSummarise &&
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          t("navigation.tapSummarise")
        )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "scene-conatainer-footer-buttons",
      },
      /*#__PURE__*/ React.createElement(
        "button",
        {
          onClick: handlePrvious,
        },
        t("buttons.previous")
      ),
      React.createElement(ProgressBar, {
        current: 4,
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            position: "relative",
          },
        },
        /*#__PURE__*/ React.createElement(
          "button",
          {
            style: {
              backgroundColor: "gray",
              borderColor: "gray",
            },
          },
          t("buttons.next")
        )
      )
    )
  );
};
window.SceneFour = SceneFour;
