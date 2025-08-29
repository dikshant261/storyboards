const StartingPage = ({ question, onNext }) => {
  const click = "assets/click.mp3"; // path to your audio
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onNext();
  };

  return React.createElement(
    "div",
    { className: "page-container" },
    // Left Section
    React.createElement(
      "div",
      { className: "page-container-left" },
      React.createElement("p", { className: "slide-left" }, t("hey"))
    ),
    // Right Section
    React.createElement(
      "div",
      { className: "page-container-right" },
      React.createElement(
        "div",
        { className: "page-container-right-main" },
        // Car Section
        React.createElement(
          "div",
          { className: "page-container-right-main-car" },
          React.createElement(
            "div",
            { className: "subtraction-align-box slide-right" },
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box"
            }),
            React.createElement("div", { className: "subtraction-minus-line" }),
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box"
            }),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5vw"
                }
              },
              React.createElement("div", { className: "subtraction-minus-line" }),
              React.createElement("div", { className: "subtraction-minus-line" })
            ),
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box"
            })
          ),
          React.createElement(CarOne, {
            totalCars: parseInt(question[0]),
            crossCars: parseInt(question[1])
          })
        ),
        // Button Section
        React.createElement(
          "div",
          { className: "page-container-right-main-keypad" },
          React.createElement(
            "button",
            {
              className: "start-button show-in",
              onClick: handleStart
            },
            t("start")
          )
        )
      ),
      // Footer
      React.createElement(
        "div",
        { className: "page-container-right-footer" },
        React.createElement("h3", null, t("begin"))
      )
    )
  );
};

// expose globally
window.StartingPage = StartingPage;
