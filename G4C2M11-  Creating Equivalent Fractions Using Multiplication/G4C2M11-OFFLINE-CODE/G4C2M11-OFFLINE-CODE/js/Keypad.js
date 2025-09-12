const Keypad = ({ response, checkHandle, stepOne }) => {
  const tap="assets/tap.gif";  
  const handleNumber = (num) => {
    response(num);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },

    // Keypad grid
    React.createElement(
      "div",
      { className: "keypad-grid" },
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) =>
        React.createElement(
          "button",
          {
            key: num,
            onClick: () => handleNumber(num),
            disabled: !stepOne,
            style: { opacity: !stepOne ? "0.6" : "1" },
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
          className: "check-btn",
          onClick: checkHandle,
          disabled: !stepOne,
          style: { opacity: !stepOne ? "0.6" : "1" },
        },
        t("buttons.check")
      ),
      stepOne &&
        React.createElement("img", {
          src: tap,
          className: "tap-gif-keypad",
        })
    )
  );
};
window.Keypad=Keypad;