const SceneFive = ({ question, onNext, flag, onPrev }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [answer, setAnswer] = React.useState({
    num: null,
    count: null,
    pluse: "",
  });
  const [red, setRed] = React.useState("");
  const [showAns, setShowAns] = React.useState(false);
  const [errorShow, setShowError] = React.useState(false);
  const tap="assets/tap.gif"
  const checkResponse = (num, count, pluse) => {
    if (num === question[2] && count === question[0] && pluse === "x") {
      playCorrect();
      setAnswer({ num, count, pluse });
      setShowAns(true);
      setStepOne(false);
      setShowError(true);
    } else {
      playWrong();
      setAnswer({ num, count, pluse });
      setRed("wrong");
      setShowError(true);
    }
  };

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrev = () => {
    playClick();
    onPrev();
  };

  return React.createElement(
    "div",
    { className: "scenethree-container" },

    // Heading
    React.createElement(
      "div",
      { className: "scenethree-container-heading" },
      React.createElement("p", null, t("multiplicationSentance"))
    ),

    // Main Section
    React.createElement(
      "div",
      { className: "scenethree-container-main" },

      // Question Part
      React.createElement(
        "div",
        { className: "scenethree-container-main-question" },
        React.createElement(ConvertFraction, { question, answer }),
        React.createElement(
          "div",
          { className: "box-align" },
          React.createElement("p", null, question[2]),
          React.createElement("p", null, "X"),
          React.createElement(FractionNuber, { question }),
          React.createElement("p", null, "="),
          stepOne &&
            React.createElement(BoxThree, {
              stepOne,
              answer,
              question,
              red,
            }),
          showAns &&
            React.createElement(FractionMultiply, {
              numerator: question[2],
              denominator: question[1],
              count: question[0],
              fontSize: "6vw",
            })
        )
      ),

      // Options Part
      React.createElement(
        "div",
        { className: "scenethree-container-main-option" },
        React.createElement(OptionThree, {
          question,
          response: checkResponse,
          answer,
        }),
        stepOne &&
          React.createElement("img", {
            src: tap,
            style: { width: "4vw", objectFit: "contain" },
          }),
        errorShow &&
          React.createElement(ErrorMessageTwo, { answer, question })
      )
    ),

    // Footer Section
    React.createElement(
      "div",
      { className: "scenethree-container-footer" },
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrev },
        "◀"
      ),
      stepOne && React.createElement("p", null, t("tapAnswer")),
      showAns && React.createElement("p", null, t("tapContinue")),
      React.createElement(
        "div",
        null,
        stepOne &&
          React.createElement("button", { className: "nxt-btn" }, "▶"),
        showAns &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "nxt-btn", onClick: handleNext },
              "▶"
            ),
            React.createElement("img", { src: tap, alt: "tap", className: "tap" })
          )
      )
    )
  );
};
window.SceneFive=SceneFive;