const SentanceBox = function (props) {
  const { beat, boxCss, option, num, style, result } = props;

  if (option === null || option === undefined) {
    return React.createElement(
      "div",
      { className: "box-container" },

      // First box with 7
      React.createElement("div", { className: "box", style: style }, "7"),

      // Minus line
      React.createElement("div", { className: "minus-line" }),

      // Second box with num
      React.createElement("div", { className: "box", style: style }, num),

      // Equal-to structure
      React.createElement(
        "div",
        { className: "equal-to" },
        React.createElement("div", { className: "minus-line" }),
        React.createElement("div", { className: "minus-line" })
      ),

      // Third box with just result
      React.createElement(
        "div",
        { className: `box ${beat ? "active" : ""} ${boxCss}`, style: style },
        result || ""
      )
    );
  }

  return React.createElement(
    "div",
    { className: "box-container" },

    // First box with 7
    React.createElement("div", { className: "box", style: style }, "7"),

    // Minus line
    React.createElement("div", { className: "minus-line" }),

    // Second box with num
    React.createElement("div", { className: "box", style: style }, num),

    // Equal-to structure
    React.createElement(
      "div",
      { className: "equal-to" },
      React.createElement("div", { className: "minus-line" }),
      React.createElement("div", { className: "minus-line" })
    ),

    // Third box with option/result
    React.createElement(
      "div",
      { className: `box ${beat ? "active" : ""} ${boxCss}`, style: style },
      option + " " + (result || "")
    )
  );
};

window.SentanceBox = SentanceBox;
