const Main = ({ option, correctOption, question, flag, onNext, onClose }) => {
  const [result, setResult] = React.useState("");
  const [errorShow, setErrorShow] = React.useState(false);
  const [boxCss, setBoxCss] = React.useState("");
  const [showTap, setTapShow] = React.useState(true);
  const [showNext, setShowNext] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const tap = "assets/tap.gif";
  const handleResponse = (opt) => {
    setReset(false);
    if (opt === correctOption) {
      playCorrect();
      setResult(opt);
      setErrorShow(true);
      setBoxCss("correct-box");
      setTapShow(false);
      setShowNext(true);
    } else {
      playWrong();
      setResult(opt);
      setErrorShow(true);
      setBoxCss("wrong-box");
    }
  };
  const handlePrevOne = () => {
    playClick();
    setShowNext(false);
    setTapShow(true);
    setErrorShow(false);
    setBoxCss("");
    setReset(true);
  };
  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrev = () => {
    playClick();
    onClose();
  };

  return React.createElement(
    "div",
    { className: "main-conatainer" },

    // Heading
    React.createElement(
      "div",
      { className: "main-heading" },
      React.createElement("p", null, t(question))
    ),

    // Content (Chart + Options)
    React.createElement(
      "div",
      { className: "main-content" },

      // Chart
      React.createElement(
        "div",
        { className: "main-content-chart" },
        React.createElement("p", null, t("chartHeading.surveyHeading")),
        React.createElement(PieChart, null)
      ),

      // Options
      React.createElement(
        "div",
        { className: "main-content-option" },
        React.createElement(Option, {
          option,
          correctOption,
          response: handleResponse,
          errorShow,
          result,
          flag,
          boxCss,
          reset,
        })
      )
    ),

    // Footer
    React.createElement(
      "div",
      { className: "main-conatainer-footer" },

      // Previous button
      showTap
        ? React.createElement(
            "button",
            { onClick: handlePrev },
            t("buttons.previous")
          )
        : null,
      showNext
        ? React.createElement(
            "button",
            { onClick: handlePrevOne },
            t("buttons.previous")
          )
        : null,
      // Tap message
      showTap
        ? React.createElement("p", null, t("navigations.tapTheRatios"))
        : null,

      // Tap continue message
      showNext
        ? React.createElement("p", null, t("navigations.tapContinue"))
        : null,

      // Next button (disabled version before answering)
      showTap ? React.createElement("button", null, t("buttons.next")) : null,

      // Next button (enabled version after answering + gif)
      showNext
        ? React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: handleNext },
              t("buttons.next")
            ),
            React.createElement("img", { src: tap, className: "tap-gif" })
          )
        : null
    )
  );
};
window.Main = Main;
