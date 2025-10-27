const AnimatedResult = ({
  question,
  setNext,
  setHeading,
  animationSet,
  freezeAnimation,
}) => {
  const curvedArrow = "assets/curvedArrow.svg";
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [showArrow, setShowArrow] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  const [stepFive, setStepFive] = React.useState(false);
  const [stepSix, setStepSix] = React.useState(false);
  const [stepSixHalf, setStepSixHalf] = React.useState(false);
  const [stepSeven, setStepSeven] = React.useState(false);
  const [stepEight, setStepEight] = React.useState(false);
  if (freezeAnimation) {
    useEffect(() => {
      if (freezeAnimation) {
        setStepOne(true);
        setStepTwo(true);
        setStepThree(true);
        setStepFive(true);
        setStepFour(true);
        setStepSix(true);
        setStepSixHalf(true);
        setStepSeven(true);
        setStepEight(true);
        setShowArrow(false);
      }
    }, [freezeAnimation]);
  } else {
    React.useEffect(() => {
      setStepOne(true);
      setTimeout(() => {
        setStepTwo(true);
        setShowArrow(true);
      }, 1500);
      setTimeout(() => {
        setStepThree(true);
      }, 3000);
      setTimeout(() => {
        setStepFour(true);
      }, 4000);
      setTimeout(() => {
        setShowArrow(false);
      }, 5000);
      setTimeout(() => {
        setStepFive(true);
      }, 6000);
      setTimeout(() => {
        setStepSix(true);
      }, 7500);
      setTimeout(() => {
        setStepSixHalf(true);
      }, 8500);
      setTimeout(() => {
        setStepSeven(true);
      }, 9500);
      setTimeout(() => {
        setStepEight(true);
        setNext(true);
      }, 10500);
    }, []);
  }
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "result-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      showArrow &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 25 25",
              style: {
                width: "8vw",
                height: "22vh",
                position: "fixed",
                top: "26%",
                left: "21.7%",
                opacity: stepTwo ? "" : "0",
              },
              className: `${stepTwo && showArrow ? "animate-result" : ""}`,
            },
            /*#__PURE__*/ React.createElement("path", {
              style: {
                fill: "white",
              },
              d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z",
            })
          ),
          /*#__PURE__*/ React.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 25 25",
              style: {
                width: "6vw",
                height: "18vh",
                position: "fixed",
                top: "26%",
                left: "28.7%",
                opacity: stepThree ? "" : "0",
              },
              className: `${stepThree && showArrow ? "animate-result" : ""}`,
            },
            /*#__PURE__*/ React.createElement("path", {
              style: {
                fill: "white",
              },
              d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z",
            })
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              style: {
                position: "fixed",
                top: "32%",
                left: "33%",
                color: "rgb(67, 213, 122)",
                fontSize: "2vw",
                opacity: stepThree ? "" : "0",
              },
              className: `${stepThree && showArrow ? "animate-result" : ""}`,
            },
            t("reciprocal", {
              count: question[2],
            })
          )
        ),
      /*#__PURE__*/ React.createElement("img", {
        src: curvedArrow,
        style: {
          width: "10vw",
          height: "18vh",
          position: "fixed",
          top: "29%",
          left: "21.7%",
          transform: "rotate(-25deg)",
          opacity: stepFive ? "" : "0",
        },
      }),
      /*#__PURE__*/ React.createElement("img", {
        src: curvedArrow,
        style: {
          width: "10vw",
          height: "18vh",
          position: "fixed",
          top: "53%",
          left: "21.7%",
          transform: "scaleY(-1) rotate(-32deg)",
          opacity: stepSeven ? "" : "0",
        },
      })
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "result-align",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "equal-align",
        },
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: `${stepOne ? "animate-result" : ""}`,
            style: {
              fontSize: "4vw",
            },
          },
          "="
        ),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: `${stepOne ? "animate-result" : ""} result`,
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "num",
            },
            question[0]
          ),
          /*#__PURE__*/ React.createElement("span", {
            className: "bar",
          }),
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "den",
            },
            question[1]
          )
        )
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: `${stepTwo ? "animate-result" : ""}`,
          style: {
            opacity: stepTwo ? "" : "0",
            color: "#11affc",
          },
        },
        "\xD7"
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: `${stepFour ? "animate-result" : ""} result`,
          style: {
            opacity: stepFour ? "" : "0",
            color: "#43d57a",
          },
        },
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "num",
          },
          "1"
        ),
        /*#__PURE__*/ React.createElement("span", {
          className: "bar",
        }),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "den",
          },
          question[2]
        )
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "equal-align",
        style: {
          paddingRight: "12vw",
        },
      },
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: `${stepSix ? "animate-result" : ""}`,
          style: {
            opacity: stepSix ? "" : "0",
            fontSize: "4vw",
          },
        },
        "="
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: `result`,
        },
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: `${stepSixHalf ? "animate-result" : ""}num`,
            style: {
              opacity: stepSixHalf ? "" : "0",
            },
          },
          question[0]
        ),
        /*#__PURE__*/ React.createElement("span", {
          className: `${stepEight ? "animate-result" : ""} bar`,
          style: {
            opacity: stepEight ? "" : "0",
          },
        }),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: `${stepEight ? "animate-result" : ""} den`,
            style: {
              opacity: stepEight ? "" : "0",
            },
          },
          question[1] * question[2]
        )
      )
    )
  );
};
window.AnimatedResult = AnimatedResult;
