const SceneTwo = ({ question, onNext, onPrev }) => {
  const [beat, setBeat] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [green, setGreen] = React.useState("");
  const [errorShow, setErrorShow] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [stepOne, setStepOne] = React.useState(true);
  const tap = "assets/tap.gif";
  const handleResponse = (num) => {
    playClick();
    setGreen("");
    setErrorShow(false);
    setResult(num);
  };

  const checkHandle = () => {
    if (
      result * question[0] === question[2] &&
      result * question[1] === question[3]
    ) {
      playCorrect();
      setGreen("correct");
      setErrorShow(true);
      setBeat(false);
      setNext(true);
      setStepOne(false);
    } else {
      playWrong();
      setGreen("wrong");
      setErrorShow(true);
    }
  };

  const handleNext = () => {
    playClick();
    setErrorShow(false);
    onNext();
  };

  const handlePrevOne = () => {
    playClick();
    onPrev();
  };

  return React.createElement(
    "div",
    { className: "scene-two-container" },

    // Heading
    React.createElement(
      "div",
      { className: "scene-two-container-heading" },
      React.createElement(
        "p",
        { style: { textAlign: "center" } },
        t("pages.common.whatNumberShould"),
        "",
        React.createElement(
          "br"
        ),
        React.createElement(
          "span",
          { className: "fraction-inline-align" },
          React.createElement(
            "span",
            { className: "fraction-question-two" },
            React.createElement("span", null, question[0]),
            React.createElement("span", {
              className: "fraction-question-line",
            }),
            React.createElement("span", null, question[1])
          )
        ),
        " ",
        t("pages.common.multipliedToGet"),
        " ",
        React.createElement(
          "span",
          { className: "fraction-inline-align" },
          React.createElement(
            "span",
            { className: "fraction-question-two" },
            React.createElement("span", null, question[2]),
            React.createElement("span", {
              className: "fraction-question-line",
            }),
            React.createElement("span", null, question[3])
          )
        ),
        "."
      )
    ),

    // Main content
    React.createElement(
      "div",
      { className: "scene-two-container-main" },

      // Fractions row
      React.createElement(
        "div",
        { className: "scene-two-container-main-question" },
        React.createElement(
          "div",
          { className: "question-align" },
          React.createElement(Fraction, {
            num: question[0],
            deno: question[1],
            fontSize: "7vw",
          }),
          React.createElement("p", null, "="),
          React.createElement(MultiplyFraction, {
            num: question[0],
            deno: question[1],
            result: result,
            green: green,
          }),
          React.createElement("p", null, "="),
          React.createElement(Fraction, {
            num: question[2],
            deno: question[3],
            fontSize: "7vw",
          })
        )
      ),

      // Options section
      React.createElement(
        "div",
        { className: "scene-two-container-main-question-option" },
        errorShow &&
          React.createElement(ErrorMessgae, {
            question: question,
            result: result,
          }),
        React.createElement(Keypad, {
          response: handleResponse,
          checkHandle: checkHandle,
          stepOne: stepOne,
        })
      )
    ),

    // Footer
    React.createElement(
      "div",
      { className: "scene-two-container-main-footer" },
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevOne },
        t("buttons.previous")
      ),
      stepOne && React.createElement("p", null, t("pages.common.tapNumber")),
      next && React.createElement("p", null, t("pages.common.nextContinue")),

      stepOne &&
        React.createElement(
          "button",
          { className: "nxt-btn disabled-btn" },
          t("buttons.next")
        ),

      next &&
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { className: "nxt-btn", onClick: handleNext },
            t("buttons.next")
          ),
          React.createElement("img", {
            src: tap,
            className: "tap-gif-one",
          })
        )
    )
  );
};
window.SceneTwo = SceneTwo;
