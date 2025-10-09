const DesignOption = ({ total, red, blue, style }) => {
  return React.createElement(
    "div",
    { className: "design-container-two" },

    // Left vertical lines
    React.createElement("div", { className: "line-one" }),
    React.createElement("div", { className: "line-two" }),

    // Left Section
    React.createElement(
      "div",
      { className: "left" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "big-circle", style: style },
          total
        )
      )
    ),

    // Right Section
    React.createElement(
      "div",
      { className: "right" },

      // First Circle (Blue)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "blue-circle", style: style },
          red
        )
      ),

      // Second Circle (Pink)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "pink-circle", style: style },
          blue
        )
      )
    )
  );
};
window.DesignOption=DesignOption;