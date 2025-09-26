const SceneThree = ({ onNext, onPrev }) => {
  const [value, setValue] = useState(null);
  const [showNormalBox, setShowNormalBox] = useState(true);
  const [showSpiltBox, setShowSplitBox] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const [showSlider, setShowSlider] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const tap = "assets/tap.gif";
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrvious = () => {
    playClick();
    onPrev();
  };
  const handleValue = (num) => {
    setShowSplitBox(false);
    setShowError(false);
    setShowNormalBox(true);
    setValue(num);
  };
  const handleCheck = () => {
    if (value === "3") {
      playCorrect();
      setShowError(true);
      setShowNormalBox(false);
      setShowSplitBox(true);
      setShowSlider(false);
      setShowNext(true);
    } else {
      playWrong();
      setShowError(true);
      setShowNormalBox(false);
      setShowSplitBox(true);
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
      /*#__PURE__*/ React.createElement("p", null, t("sceneThree.nowLetSplit"))
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
      showNormalBox &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box-align",
          },
          /*#__PURE__*/ React.createElement(Boxes, {
            number: 1,
            style: {
              backgroundColor: "#ff9c6a",
            },
          }),
          /*#__PURE__*/ React.createElement(Boxes, {
            number: 2,
            style: {
              backgroundColor: "#0097a7",
            },
          })
        ),
      showSpiltBox &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box-align",
          },
          /*#__PURE__*/ React.createElement(BoxTwo, {
            number: 1,
            divisor: value,
            style: {
              backgroundColor: "#ff9c6a",
            },
          }),
          /*#__PURE__*/ React.createElement(BoxTwo, {
            number: 2,
            divisor: value,
            style: {
              backgroundColor: "#0097a7",
            },
          })
        ),
      /*#__PURE__*/ React.createElement(Slider, {
        divisorValue: handleValue,
        onCheck: handleCheck,
        showSlider: showSlider,
      }),
      errorShow &&
        /*#__PURE__*/ React.createElement(ErrorMessage, {
          divisor: 3,
          value: value,
        })
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "scene-conatainer-footer-heading",
      },
      showSlider &&
        /*#__PURE__*/ React.createElement("p", null, t("navigation.slider")),
      showNext &&
        /*#__PURE__*/ React.createElement("p", null, t("navigation.tapNext"))
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
        current: 3,
      }),
      showSlider &&
        /*#__PURE__*/ React.createElement(
          "button",
          {
            style: {
              backgroundColor: "gray",
              borderColor: "gray",
            },
          },
          t("buttons.next")
        ),
      showNext &&
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
              onClick: handleNext,
            },
            t("buttons.next")
          ),
          /*#__PURE__*/ React.createElement("img", {
            src: tap,
            className: "tap",
          })
        )
    )
  );
};
window.SceneThree = SceneThree;
