const StartingPage = ({ question, onNext }) => {

  const click="assets/click.mp3"
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onNext();
  };

  console.log(question);

  return React.createElement(
    "div",
    { className: "page-container" },

    // Left side
    React.createElement(
      "div",
      { className: "page-container-left" },
      React.createElement("p", { className: "slide-left" }, t("hey")),
      React.createElement("p", { className: "slide-right" }, t("startHeading"))
    ),

    // Right side
    React.createElement(
      "div",
      { className: "page-container-right" },
      React.createElement(
        "div",
        { className: "page-container-right-main" },

        // Car & subtraction section
        React.createElement(
          "div",
          { className: "page-container-right-main-car" },
          React.createElement(
            "div",
            { className: "subtraction-align-box slide-right" },
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box",
            }),
            React.createElement("div", { className: "subtraction-minus-line" }),
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box",
            }),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5vw",
                },
              },
              React.createElement("div", { className: "subtraction-minus-line" }),
              React.createElement("div", { className: "subtraction-minus-line" })
            ),
            React.createElement("input", {
              type: "text",
              className: "subtraction-image-box",
            })
          ),
          React.createElement(CarOne, {
            totalCars: parseInt(question[0]),
            crossCars: parseInt(question[1]),
          })
        ),

        // Keypad section
        React.createElement(
          "div",
          { className: "page-container-right-main-keypad" },
          React.createElement(
            "button",
            { className: "start-button show-in", onClick: handleStart },
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

window.StartingPage = StartingPage;
