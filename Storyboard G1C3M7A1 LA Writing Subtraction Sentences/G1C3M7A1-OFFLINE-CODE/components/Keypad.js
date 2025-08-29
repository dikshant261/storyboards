const Keypad = ({ number, check, stepOne, stepTwo, stepThree }) => {
  const [hintMessage, setHintMessage] = React.useState(false);
  const clickAudio = new Audio("assets/click.mp3");
  const hint = "assets/hint.png";

  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleHint = () => {
    clickHandle();
    setHintMessage(true);
  };

  const handleNumber = (num) => {
    clickHandle();
    number(num);
    setHintMessage(false);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },
    // Hint Button
    React.createElement(
      "button",
      { className: "hint-btn", onClick: handleHint },
      t("show"),
      React.createElement(
        "span",
        { className: "icon" },
        React.createElement("img", { src: hint, alt: "bulb", className: "bulb" })
      )
    ),

    // Hint Message
    hintMessage &&
      React.createElement(
        "div",
        null,
        stepOne &&
          React.createElement("p", { className: "hint-message" }, t("hintMessageTotal")),
        stepTwo &&
          React.createElement("p", { className: "hint-message" }, t("hintMessageCross")),
        stepThree &&
          React.createElement("p", { className: "hint-message" }, t("hintMessageLeft"))
      ),

    // Keypad Grid
    React.createElement(
      "div",
      { className: "keypad-grid" },
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) =>
        React.createElement(
          "button",
          { key: num, onClick: () => handleNumber(num) },
          num
        )
      ),
      React.createElement(
        "button",
        { className: "zero", onClick: () => handleNumber(0) },
        0
      )
    ),

    // Check Button
    React.createElement(
      "button",
      { className: "check-btn", onClick: check },
      t("check")
    )
  );
};

window.Keypad = Keypad;
