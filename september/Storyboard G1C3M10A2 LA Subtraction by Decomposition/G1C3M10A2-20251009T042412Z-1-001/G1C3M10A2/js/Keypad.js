const Keypad = ({
  onNumberClick,
  onCheck,
  showErrorfirst,
  showError,
  option,
  showErrorTwo,
  disabledKeypad,
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [showHint, setShowHint] = React.useState();
    const tap = "assets/tap.gif";

  const handleShowHint = () => {
    playClick();
    setShowHint(true);
  };

  const handleCloseHint = () => {
    playClick();
    setShowHint(false);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },

    // Left Column - Keypad
    React.createElement(
      "div",
      { className: "keypad-container-inside" },
      React.createElement(
        "div",
        { className: "keypad-align" },
        // Numbers
        React.createElement(
          "div",
          { className: "keypad-grid" },
          numbers.map((num) =>
            React.createElement(
              "button",
              {
                key: num,
                className: "keypad-btn",
                onClick: () => onNumberClick(num),
                disabled: disabledKeypad,
                style: { opacity: disabledKeypad ? "0.5" : "1" },
              },
              num
            )
          )
        ),
        // Check button + tap gif
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            {
              className: "keypad-check",
              onClick: onCheck,
              disabled: disabledKeypad,
              style: { opacity: disabledKeypad ? "0.5" : "1" },
            },
            t("buttons.check")
          ),
          !disabledKeypad &&
            React.createElement("img", { src: tap, className: "tap-gif-two" })
        )
      )
    ),

    // Right Column - Success/Error Messages
    React.createElement(
      "div",
      { className: "keypad-success-container" },
      // Error messages
      showErrorfirst && React.createElement(ErrorMessage, { option: option, flag: 0 }),
      showError && React.createElement(ErrorMessage, { option: option, flag: 1 }),
      showErrorTwo && React.createElement(ErrorMessage, { option: option, flag: 2 })
    )

    // Optional Hint Buttons (commented out, same as your code)
    // !showHint &&
    //   React.createElement(
    //     "button",
    //     { className: "keypad-hint", onClick: handleShowHint },
    //     t("buttons.show") + " 💡"
    //   ),
    // showHint &&
    //   React.createElement(
    //     "button",
    //     { className: "keypad-hint", onClick: handleCloseHint },
    //     "Hide 💡"
    //   )
  );
};
window.Keypad=Keypad;