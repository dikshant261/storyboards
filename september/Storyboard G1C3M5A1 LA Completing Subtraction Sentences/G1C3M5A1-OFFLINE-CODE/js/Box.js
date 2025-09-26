function Box({ numberOne, numberTwo, numberThree, flag = false, showGreen }) {
  return React.createElement(
    "div",
    { className: "box-container" },

    // First number
    React.createElement("div", { className: "box" }, numberOne),

    // Minus line
    React.createElement("div", { className: "minus-line" }),

    // Second number
    React.createElement("div", { className: "box" }, numberTwo),

    // Equal to (double lines)
    React.createElement(
      "div",
      { className: "equal-to" },
      React.createElement("div", { className: "minus-line" }),
      React.createElement("div", { className: "minus-line" })
    ),

    // Result number
    React.createElement(
      "div",
      {
        className: `box ${flag ? "box-pulse" : ""} ${showGreen}`,
      },
      numberThree
    )
  );
}
window.Box=Box;