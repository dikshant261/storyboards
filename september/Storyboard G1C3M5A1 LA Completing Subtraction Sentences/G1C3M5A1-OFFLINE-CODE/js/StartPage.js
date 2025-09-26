function StartPage({ onClose, number }) {
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "container-left" },
      React.createElement("p", null, t("Complete_the_subtraction_sentence"))
    ),
    React.createElement(
      "div",
      { className: "container-right" },
      React.createElement(
        "div",
        { className: "container-right-main" },
        React.createElement(
          "div",
          { className: "container-right-car" },
          React.createElement(Box, {
            numberOne: number[0],
            numberTwo: number[1],
          }),
          React.createElement(CarOne, {
            totalCars: number[0],
            crossCars: number[1],
          })
        ),
        React.createElement(
          "div",
          { className: "container-right-keypad" },
          React.createElement(ReusableButton, {
            label: t("start"),
            width: "10vw",
            height: "9vh",
            fontSize: "2.5vw",
            onClick: () => {
              clickHandle();
              onClose();
            },
          })
        )
      ),
      React.createElement(
        "div",
        { className: "container-right-description-heading" },
        React.createElement("p", null, t("tapBegin"))
      ),
      React.createElement("div", { className: "container-right-button" })
    )
  );
}
window.StartPage=StartPage;