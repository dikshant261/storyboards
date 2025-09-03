

const Keypad = ({
  onNumberClick,
  checkNumber,
  numbers,
  erroShow,
  setErrorShow,
  correctNumber,
  keypadShow,
}) => {
  const [hintMessage, setHintMessage] = useState(false);
  

  const clickAudio = new Audio("assets/click.mp3");
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
    setHintMessage(false);
    setErrorShow();
    onNumberClick(num);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },

    // ✅ Hint button
    keypadShow &&
      React.createElement(
        "button",
        { className: "hint-btn", onClick: handleHint },
        t("show"),
        React.createElement(
          "span",
          { className: "icon" },
          React.createElement("img", {
            src: "assets/hint.png",
            alt: "bulb",
            className: "bulb",
          })
        )
      ),

    // ✅ Hint message
    hintMessage &&
      React.createElement("p", { className: "hint-message" }, t("hintMessage")),

    // ✅ ErrorMessage
    erroShow &&
      React.createElement(window.ErrorMessage, {
        numbers: numbers,
        correctNumber: correctNumber,
      }),

    // ✅ Keypad numbers
    keypadShow &&
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

    // ✅ Check button
    keypadShow &&
      React.createElement(
        "button",
        { className: "check-btn", onClick: () => checkNumber() },
        t("check")
      )
  );
};

window.Keypad = Keypad;
