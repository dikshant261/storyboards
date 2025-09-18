const SceneThree = ({ question, onNext, onPrev }) => {
  const tap="assets/tap.gif";  
  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrevOne = () => {
    playClick();
    onPrev();
  };

  return React.createElement(
    "div",
    { className: "scene-container" },

    // Heading section
    React.createElement(
      "div",
      { className: "scene-container-heading" },
      React.createElement(
        "p",
        { style: { textAlign: "center" } },
        t("pages.common.letFindDivide"),
        " ",
        React.createElement(
          "span",
          { className: "fraction-inline-align" },
          React.createElement(
            "span",
            { className: "fraction-question" },
            React.createElement("span", null, question[0]),
            React.createElement("span", { className: "fraction-question-line" }),
            React.createElement("span", null, question[1])
          )
        ),
        " ",
        t("pages.common.toGet"),
        " ",
        React.createElement(
          "span",
          { className: "fraction-inline-align" },
          React.createElement(
            "span",
            { className: "fraction-question" },
            React.createElement("span", null, question[2]),
            React.createElement("span", { className: "fraction-question-line" }),
            React.createElement("span", null, question[3])
          )
        ),
        "."
      )
    ),

    // Main content
    React.createElement(
      "div",
      { className: "scene-container-main" },
      React.createElement(
        "div",
        { className: "question-align" },
        React.createElement(Fraction, { num: question[0], deno: question[1] }),
        React.createElement("p", null, "="),
        React.createElement(Fraction, { num: question[2], deno: question[3] })
      )
    ),

    // Footer section
    React.createElement(
      "div",
      { className: "scene-container-footer" },
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevOne },
        t("buttons.previous")
      ),
      React.createElement("p", null, t("pages.common.tapNext")),
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
          alt: "tap",
        })
      )
    )
  );
};
window.SceneThree=SceneThree;