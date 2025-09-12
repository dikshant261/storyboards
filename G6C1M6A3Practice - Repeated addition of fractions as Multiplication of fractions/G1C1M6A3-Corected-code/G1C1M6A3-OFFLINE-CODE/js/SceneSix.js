const SceneSix = ({ question, onNext, flag, onPrev }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [answer, setAnswer] = React.useState({
    num: null,
    deno: null,
  });
  const [red, setRed] = React.useState("");
  const [showAns, setShowAns] = React.useState(false);
  const [errorShow, setShowError] = React.useState(false);
  const tap="assets/tap.gif"
  const checkResponse = (num, deno) => {
    if (num === question[2] * question[0] && deno === question[1]) {
      playCorrect();
      setAnswer({ num, deno });
      setShowAns(true);
      setStepOne(false);
      setShowError(true);
    } else {
      playWrong();
      setAnswer({ num, deno });
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
      React.createElement("p", null, t("What is the result?"))
    ),

    // Main container
    React.createElement(
      "div",
      { className: "scenethree-container-main" },

      // Question section
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

          // Fraction box
          React.createElement(
            "div",
            { className: "box-fraction", style: { fontSize: "6vw" } },
            React.createElement(
              "span",
              { className: "top" },
              `${question[2]} x ${question[0]}`
            ),
            React.createElement("span", { className: "line" }),
            React.createElement("span", { className: "bottom" }, question[1])
          ),

          React.createElement("p", null, "="),

          stepOne
            ? React.createElement(BoxFour, {
                stepOne,
                answer,
                question,
                red,
              })
            : null,

          showAns
            ? React.createElement(FractionOption, {
                numerator: question[2] * question[0],
                denominator: question[1],
                fontSize: "6vw",
              })
            : null
        )
      ),

      // Options section
      React.createElement(
        "div",
        { className: "scenethree-container-main-option" },
        React.createElement(OptionFour, {
          question,
          response: checkResponse,
          answer,
        }),
        stepOne
          ? React.createElement("img", {
              src: tap,
              style: { width: "4vw", objectFit: "contain" },
            })
          : null,
        errorShow
          ? React.createElement(ErrorMessageThree, { answer, question })
          : null
      )
    ),

    // Footer
    React.createElement(
      "div",
      { className: "scenethree-container-footer" },
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrev },
        "«"
      ),
      stepOne ? React.createElement("p", null, t("tapAnswer")) : null,
      showAns ? React.createElement("p", null, t("tapContinue")) : null,
      React.createElement(
        "div",
        null,
        stepOne
          ? React.createElement("button", { className: "nxt-btn" }, "»")
          : null,
        showAns
          ? React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { className: "nxt-btn", onClick: handleNext },
                "»"
              ),
              React.createElement("img", {
                src: tap,
                alt: "tap",
                className: "tap",
              })
            )
          : null
      )
    )
  );
};
window.SceneSix=SceneSix;