const Main = ({ onNext,question }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);

  const [numberOne, setNumberOne] = React.useState(null);
  const [numberTwo, setNumberTwo] = React.useState(null);
  const [numberThree, setNumberThree] = React.useState(null);

  const [boxBoundaryOne, setBoxBoundaryOne] = React.useState("normal-box");
  const [boxBoundaryTwo, setBoxBoundaryTwo] = React.useState("normal-box");
  const [boxBoundaryThree, setBoxBoundaryThree] = React.useState("normal-box");

  const [nextButtonOne, setNextButtonOne] = React.useState(false);
  const [nextButtonTwo, setNextButtonTwo] = React.useState(false);

  const [erroShowOne, setErrorShowOne] = React.useState(false);
  const [erroShowTwo, setErrorShowTwo] = React.useState(false);
  const [erroShowthree, setErrorShowThree] = React.useState(false);

  const [showNext, setShowNext] = React.useState(false);

  const clickAudio = new Audio("assets/click.mp3");
  const correctAudio = new Audio("assets/correct.mp3");
  const wrongAudio = new Audio("assets/wrong.mp3");
  clickAudio.preload = "auto";
  correctAudio.preload = "auto";
  wrongAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };
  const correctHandle = () => {
    correctAudio.currentTime = 0;
    correctAudio.play();
  };
  const wrongHandle = () => {
    wrongAudio.currentTime = 0;
    wrongAudio.play();
  };

  const handleNumberOne = (num) => {
    setErrorShowOne(false);
    setBoxBoundaryOne("normal-box");
    setNumberOne(num);
  };

  const checkOne = () => {
    if(numberOne===null) return;

    if (numberOne === question[0]) {
      correctHandle();
      setStepOne(false);
      setErrorShowOne(true);
      setBoxBoundaryOne("correct");
      setNextButtonOne(true);
    } else {
      wrongHandle();
      setErrorShowOne(true);
      setBoxBoundaryOne("wrong");
    }
  };

  const handleNextOne = () => {
    clickHandle();
    setNextButtonOne(false);
    setErrorShowOne(false);
    setStepTwo(true);
  };

  const handleNumberTwo = (num) => {
    setErrorShowTwo(false);
    setBoxBoundaryTwo("normal-box");
    setNumberTwo(num);
  };

  const checkTwo = () => {
    if(numberTwo===null) return;
    if (numberTwo === question[1]) {
      correctHandle();
      setStepTwo(false);
      setErrorShowTwo(true);
      setBoxBoundaryTwo("correct");
      setNextButtonTwo(true);
    } else {
      wrongHandle();
      setErrorShowTwo(true);
      setBoxBoundaryTwo("wrong");
    }
  };

  const handleNextTwo = () => {
    clickHandle();
    setErrorShowTwo(false);
    setStepThree(true);
    setNextButtonTwo(false);
  };

  const handleNumberThree = (num) => {
    setErrorShowThree(false);
    setBoxBoundaryThree("normal-box");
    setNumberThree(num);
  };

  const checkThree = () => {
    if(numberThree===null) return;
    if (numberThree === question[2]) {
      correctHandle();
      setStepThree(false);
      setErrorShowThree(true);
      setBoxBoundaryThree("correct");
      setShowNext(true);
    } else {
      wrongHandle();
      setErrorShowThree(true);
      setBoxBoundaryThree("wrong");
    }
  };

  const handleNext = () => {
    clickHandle();
    setErrorShowThree(false);
    setShowNext(false);
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
    setNumberOne(null);
    setNumberTwo(null);
    setNumberThree(null);
    onNext();
  };

  return React.createElement(
    "div",
    { className: "main-container" },
    // Left Section
    React.createElement(
      "div",
      { className: "main-container-left" },
      stepOne &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { style: { fontWeight: 800 }, className: "slide-left" }, t("stepOne")),
          React.createElement("p", { style: { marginBottom: "0" }, className: "slide-right" }, t("stepOneProcess")),
          React.createElement("p", null, t("countTotal"))
        ),
      nextButtonOne &&
        React.createElement("p", { className: "slide-up" }, t("stepOne"), " ✔"),
      stepTwo &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "slide-right" }, t("stepOne"), "✔"),
          React.createElement("p", { style: { fontWeight: 800 }, className: "slide-left" }, t("stepTwo")),
          React.createElement("p", { className: "slide-up" }, t("countCross"))
        ),
      nextButtonTwo &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "slide-right" }, t("stepOne"), " ✔"),
          React.createElement("p", { className: "slide-left" }, t("stepTwo"), " ✔")
        ),
      stepThree &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "slide-right" }, t("stepOne"), " ✔"),
          React.createElement("p", { className: "slide-right" }, t("stepTwo"), " ✔"),
          React.createElement("p", { className: "slide-right" }, t("stepThree")),
          React.createElement("p", { className: "slide-left" }, t("countDifference"))
        ),
      showNext &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "slide-right" }, t("stepOne"), " ✔"),
          React.createElement("p", { className: "slide-left" }, t("stepTwo"), " ✔"),
          React.createElement("p", { className: "slide-left" }, t("stepThree"), " ✔")
        )
    ),

    // Right Section
    React.createElement(
      "div",
      { className: "main-container-right" },
      React.createElement(
        "div",
        { className: "main-container-right-main" },
        React.createElement(
          "div",
          { className: "main-container-right-main-car" },
          React.createElement(
            "div",
            { className: "subtraction-align-box slide-right" },
            React.createElement(
              "div",
              { className: "subtraction-align-box slide-right" },
              React.createElement("div", { className: `${boxBoundaryOne} subtraction-image-box` }, numberOne),
              React.createElement("div", { className: "subtraction-minus-line" }),
              React.createElement("div", { className: `${boxBoundaryTwo} subtraction-image-box` }, numberTwo),
              React.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", gap: "0.5vw" } },
                React.createElement("div", { className: "subtraction-minus-line" }),
                React.createElement("div", { className: "subtraction-minus-line" })
              ),
              React.createElement("div", { className: `${boxBoundaryThree} subtraction-image-box` }, numberThree)
            )
          ),
          React.createElement(CarOne, {
            totalCars: parseInt(question[0]),
            crossCars: parseInt(question[1])
          })
        ),
        React.createElement(
          "div",
          { className: "main-container-right-main-keypad" },
          erroShowOne && React.createElement("div", { className: "show-in" }, React.createElement(ErrorMessage, { question, number: numberOne })),
          erroShowTwo && React.createElement("div", { className: "show-in" }, React.createElement(ErrorMessageTwo, { question, number: numberTwo })),
          erroShowthree && React.createElement("div", null, React.createElement(ErrorMessageThree, { question, number: numberThree })),
          stepOne && React.createElement(Keypad, { number: handleNumberOne, check: checkOne, stepOne }),
          stepTwo && React.createElement(Keypad, { number: handleNumberTwo, check: checkTwo, stepTwo }),
          stepThree && React.createElement(Keypad, { number: handleNumberThree, check: checkThree, stepThree })
        )
      ),
      React.createElement(
        "div",
        { className: "main-container-right-footer" },
        stepOne && React.createElement("h3", null, t("tapNumber")),
        nextButtonOne && React.createElement("h3", null, t("nextBox")),
        showNext && React.createElement("h3", null, t("nextQuestion")),
        stepTwo && React.createElement("h3", null, t("tapNumber")),
        nextButtonTwo && React.createElement("h3", null, t("nextBox")),
        stepThree && React.createElement("h3", null, t("tapNumber"))
      ),
      React.createElement(
        "div",
        { className: "main-container-right-footer-2" },
        nextButtonOne && React.createElement("button", { className: "next-button", onClick: handleNextOne }, "▶"),
        nextButtonTwo && React.createElement("button", { className: "next-button", onClick: handleNextTwo }, "▶"),
        showNext && React.createElement("button", { className: "next-button", onClick: handleNext }, "▶")
      )
    )
  );
};

// expose globally
window.Main = Main;
