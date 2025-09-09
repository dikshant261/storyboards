const Keypad = ({
  onNumberClick,
  checkNumber,
  numbers,
  erroShow,
  setErrorShow,
  correctNumber,
  keypadShow,
}) => {
  const [hintMessage, setHintMessage] = React.useState(false);
  
  const hint="assets/hint.png";
  const tap="assets/tap.gif";
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto";

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const handleHint = () => {
    clickHandle();
    setHintMessage(true);
  };

  const handleHintClosed = () => {
    clickHandle();
    setHintMessage(false);
  };

  const handleNumber = (num) => {
    clickHandle();
    setHintMessage(false);
    setErrorShow();
    onNumberClick(num);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },

    // Show/Hide Hint button
    keypadShow &&
      React.createElement(
        "div",
        null,
        !hintMessage
          ? React.createElement(
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
            )
          : React.createElement(
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

    // Message Box
    React.createElement(
      "div",
      { className: "message-box" },
      hintMessage &&
        React.createElement("p", { className: "hint-message" }, t("hintMessage")),
      erroShow &&
        React.createElement(ErrorMessage, {
          numbers: numbers,
          correctNumber: correctNumber,
        })
    ),

    // Keypad Grid
    keypadShow &&
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
          "0"
        )
      ),

    // Check Button + Tap Icon
    keypadShow &&
      React.createElement(
        "div",
        { style: { position: "relative" } },
        React.createElement(
          "button",
          { className: "check-btn", onClick: () => checkNumber() },
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
};
window.Keypad=Keypad;