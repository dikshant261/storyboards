const SceneFour = ({ question, onNext, flag, numberString, onPrev }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [answer, setAnswer] = React.useState(null);
  const [red, setRed] = React.useState("");
  const [showAns, setShowAns] = React.useState(false);
  const [errorShow, setShowError] = React.useState(false);
  const tap="assets/tap.gif"
  const checkResponse = (num) => {
    if (num === question[2]) {
      playCorrect();
      setAnswer(num);
      setShowAns(true);
      setStepOne(false);
      setShowError(true);
    } else {
      playWrong();
      setAnswer(num);
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
      React.createElement(
        "div",
        { className: "heading-align" },
        React.createElement("p", null, t("how_many_times")),
        React.createElement(
          "span",
          { className: "heading-fraction" },
          React.createElement("span", null, question[0]),
          React.createElement("span", { className: "heading-fraction-line" }),
          React.createElement("span", null, question[1])
        ),
        t("added")
      )
    ),

    // Main Section
    React.createElement(
      "div",
      { className: "scenethree-container-main" },
      // Question Part
      React.createElement(
        "div",
        { className: "scenethree-container-main-question" },
        React.createElement(ConvertFractionTwo, { question, answer }),
        React.createElement(
          "div",
          { className: "box-align" },
          stepOne &&
            React.createElement(BoxTwo, {
              stepOne,
              answer,
              question,
              red,
            }),
          showAns && React.createElement("p", null, question[2]),
          React.createElement("p", null, "×"),
          React.createElement(FractionNuber, { question })
        )
      ),

      // Options Part
      React.createElement(
        "div",
        { className: "scenethree-container-main-option" },
        React.createElement(OptionTwo, {
          question,
          response: checkResponse,
          answer,
        }),
        
        errorShow &&
          React.createElement(ErrorMessage, {
            answer,
            question,
            flag,
            numberString,
          })
      )
    ),

    // Footer Section
    React.createElement(
      "div",
      { className: "scenethree-container-footer" },
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrev },
        "«"
      ),
      stepOne && React.createElement("p", null, t("tapAnswer")),
      showAns && React.createElement("p", null, t("tapContinue")),
      React.createElement(
        "div",
        null,
        stepOne &&
          React.createElement(
            "button",
            { className: "nxt-btn" },
            "»"
          ),
        showAns &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "nxt-btn", onClick: handleNext },
              "»"
            ),
            React.createElement("img", { src: tap, alt: "tap", className: "tap" })
          )
      )
    )
  );
};
window.SceneFour=SceneFour;