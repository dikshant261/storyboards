function MainPage({ number, onPrev, onNext }) {
  const [resultNumber, setResultNumber] = React.useState(null);
  const [sideHeading, setSideHeading] = React.useState(true);
  const [showGreen, setShowGreen] = React.useState("");
  const [nextQuestionHeading, setNextQuestionHeading] = React.useState(false);
  const [showKeypad, setShowKepad] = React.useState(true);
  const tap = "assets/tap.gif";
  const clickAudio = new Audio("assets/click.mp3");
  const wrongAudio = new Audio("assets/wrong.mp3");
  const correctAudio = new Audio("assets/correct.mp3");
  clickAudio.preload = "auto";
  wrongAudio.preload = "auto";
  correctAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const wrongHandle = () => {
    wrongAudio.currentTime = 0;
    wrongAudio.play();
  };

  const correctHandle = () => {
    correctAudio.currentTime = 0;
    correctAudio.play();
  };

  const handleNumber = (num) => {
    setShowGreen("");
    setResultNumber(num);
  };

  const handleError = () => {
    if (number[0] - number[1] === resultNumber) {
      correctHandle();
      setSideHeading(false);
      setShowGreen("correct");
      setShowKepad(false);
      setNextQuestionHeading(true);
    } else {
      wrongHandle();
      setShowGreen("wrong");
    }
  };

  const handlePrev = () => {
    clickHandle();
    setSideHeading(true);
    setShowGreen("");
    setNextQuestionHeading(false);
    onPrev();
  };

  const handleNext = () => {
    clickHandle();
    setSideHeading(true);
    setShowGreen("");
    setNextQuestionHeading(false);
    onNext();
  };

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "container-left" },
      sideHeading &&
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            null,
            t("There_are_total_cars_in_picture", {
              total: number[0],
              cross: number[1],
            })
          ),
          React.createElement("p", null, t("Count_and_complete_the"))
        ),
      nextQuestionHeading &&
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            null,
            t("sentanceOne", { cross: number[1], total: number[0] })
          ),
          React.createElement(
            "p",
            null,
            t("sentanceTwo", { cross: number[1], total: number[0] })
          ),
          React.createElement(
            "p",
            null,
            t("sentanceThree", { cross: number[1], total: number[0] })
          )
        )
    ),
    React.createElement(
      "div",
      { className: "container-right" },
      React.createElement(
        "div",
        { className: "container-right-main" },
        React.createElement(
          "div",
          { className: "container-right-car" },
          React.createElement(Box, {
            numberOne: number[0],
            numberTwo: number[1],
            numberThree: resultNumber,
            flag: "true",
            showGreen: showGreen,
          }),
          React.createElement(CarOne, {
            totalCars: number[0],
            crossCars: number[1],
          })
        ),
        React.createElement(
          "div",
          { className: "container-right-keypad" },
          React.createElement(Keypad, {
            onNumberClick: handleNumber,
            numbers: number,
            handleError: handleError,
            showKeypad: showKeypad,
          })
        )
      ),
      React.createElement(
        "div",
        { className: "container-right-description-heading" },
        sideHeading && React.createElement("p", null, t("tap_and_check")),
        nextQuestionHeading && React.createElement("p", null, t("nextQuestion"))
      ),
      React.createElement(
        "div",
        { className: "container-right-button" },
        React.createElement(
          "button",
          { className: "next-btn", onClick: handlePrev },
          "◀"
        ),
        nextQuestionHeading &&
          React.createElement(
            "div",
            { style: { position: "relative" } },
            React.createElement(
              "button",
              { className: "next-btn", onClick: handleNext },
              "▶"
            ),
            React.createElement("img", {
              src: tap,
              alt: "tap",
              style: {
                position: "absolute",
                top: 0,
                width: "3vw",
              },
            })
          )
      )
    )
  );
}
window.MainPage = MainPage;
