const SceneTwo = ({ question, onNext, onPrev }) => {
  const tap="assets/tap.gif"  
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
    { className: "scene-container" },

    // Heading
    React.createElement(
      "div",
      { className: "scene-container-heading" },
      t("let_write_multilpication")
    ),

    // Question area
    React.createElement(
      "div",
      { className: "scene-container-question" },
      React.createElement(ConvertFraction, { question }),
      React.createElement(Box, null)
    ),

    // Footer
    React.createElement(
      "div",
      { className: "scene-container-footer" },
      React.createElement("button", { className: "nxt-btn", onClick: handlePrev }, "◀"),
      React.createElement("p", null, t("tap_proceed")),
      React.createElement(
        "div",
        null,
        React.createElement("button", { className: "nxt-btn", onClick: handleNext }, "▶"),
        React.createElement("img", { src: tap, alt: "tap", className: "tap" })
      )
    )
  );
};
window.SceneTwo=SceneTwo;