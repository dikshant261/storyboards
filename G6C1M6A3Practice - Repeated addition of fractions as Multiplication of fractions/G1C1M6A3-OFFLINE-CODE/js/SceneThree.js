const SceneThree = ({ question, onNext, onPrev }) => {
  const [stepOne, setStepOne] = React.useState(true);
  const [answer, setAnswer] = React.useState(null);
  const [red, setRed] = React.useState("");
  const [showAns, setShowAns] = React.useState(false);
  const [errorShow, setShowError] = React.useState(false);
  const tap="assets/tap.gif"
  const checkResponse = (num) => {
    if (num === `${question[0]}/${question[1]}`) {
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
      t("addesReapeatedly")
    ),

    // Main container
    React.createElement(
      "div",
      { className: "scenethree-container-main" },

      // Question section
      React.createElement(
        "div",
        { className: "scenethree-container-main-question" },
        React.createElement(ConvertFraction, { question }),
        React.createElement(
          "div",
          { className: "box-align" },
          React.createElement(SimpleBox, null),
          React.createElement("p", null, "X"),
          stepOne
            ? React.createElement(BoxTwo, {
                stepOne,
                answer,
                question,
                red,
              })
            : null,
          showAns ? React.createElement(FractionNuber, { question }) : null
        )
      ),

      // Options section
      React.createElement(
        "div",
        { className: "scenethree-container-main-option" },
        React.createElement(Option, {
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
          ? React.createElement(ErrorMessage, { answer, question })
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
        "◀"
      ),
      stepOne ? React.createElement("p", null, t("tapAnswer")) : null,
      showAns ? React.createElement("p", null, t("tapContinue")) : null,
      React.createElement(
        "div",
        null,
        stepOne
          ? React.createElement("button", { className: "nxt-btn" }, "▶")
          : null,
        showAns
          ? React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { className: "nxt-btn", onClick: handleNext },
                "▶"
              ),
              React.createElement("img", { src: tap, alt: "tap", className: "tap" })
            )
          : null
      )
    )
  );
};
window.SceneThree=SceneThree;