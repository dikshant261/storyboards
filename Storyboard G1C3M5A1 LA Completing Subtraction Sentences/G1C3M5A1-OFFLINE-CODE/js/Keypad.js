function Keypad({ onNumberClick, handleError, numbers, showKeypad }) {
  const [hintMessage, setHintMessage] = React.useState(false);
  const [currentNumber, setCurrentNumber] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  
  const tap="assets/tap.gif";
  const hint="assets/hint.png"
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const handleHint = () => {
    clickHandle();
    setShowError(false);
    setHintMessage(true);
  };

  const handleHintClosed = () => {
    clickHandle();
    setShowError(false);
    setHintMessage(false);
  };

  const handleNumber = (num) => {
    clickHandle();
    setHintMessage(false);
    onNumberClick(num);
    setShowError(false);
    setCurrentNumber(num);
  };

  const handleClick = () => {
    setHintMessage(false);
    setShowError(true);
    handleError();
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },

    // HINT BUTTONS
    showKeypad &&
      React.createElement(
        "div",
        null,
        !hintMessage &&
          React.createElement(
            "button",
            { className: "hint-btn", onClick: handleHint },
            t("show"),
            React.createElement(
              "span",
              { className: "icon" },
              React.createElement("img", {
                src: hint,
                alt: "bulb",
                className: "bulb",
              })
            )
          ),
        hintMessage &&
          React.createElement(
            "button",
            { className: "hint-btn", onClick: handleHintClosed },
            t("hide"),
            React.createElement(
              "span",
              { className: "icon" },
              React.createElement("img", {
                src: hint,
                alt: "bulb",
                className: "bulb",
              })
            )
          )
      ),

    // MESSAGE BOX
    React.createElement(
      "div",
      { className: "message-box" },
      hintMessage &&
        React.createElement("p", { className: "hint-message" }, t("hintMessage")),
      showError &&
        React.createElement(ErrorMessage, {
          numbers: numbers,
          currentNumber: currentNumber,
        })
    ),

    // KEYPAD GRID
    showKeypad &&
      React.createElement(
        "div",
        { className: "keypad-grid" },
        React.createElement(
          "button",
          { onClick: () => handleNumber(1) },
          "1"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(2) },
          "2"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(3) },
          "3"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(4) },
          "4"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(5) },
          "5"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(6) },
          "6"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(7) },
          "7"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(8) },
          "8"
        ),
        React.createElement(
          "button",
          { onClick: () => handleNumber(9) },
          "9"
        ),
        React.createElement(
          "button",
          { className: "zero", onClick: () => handleNumber(0) },
          "0"
        )
      ),

    // CHECK BUTTON
    showKeypad &&
      React.createElement(
        "div",
        { style: { position: "relative" } },
        React.createElement(
          "button",
          { className: "check-btn", onClick: () => handleClick() },
          t("check")
        ),
        React.createElement("img", {
          src: tap,
          alt: "tap",
          style: {
            position: "absolute",
            width: "4vw",
            bottom: "-34%",
            left: "34%",
          },
        })
      )
  );
}
window.Keypad=Keypad;