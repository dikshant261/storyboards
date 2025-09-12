const MultiplyFraction = ({ num, deno, beat, result, green, sign = "" }) => {
  return React.createElement(
    "div",
    { className: "fraction-conatiner" },
    React.createElement(
      "div",
      { className: "multiply-fraction" },

      // Numerator row
      React.createElement(
        "span",
        { className: "box-align" },
        React.createElement("span", null, num),
        React.createElement("span", null, sign === "÷" ? "÷" : "x"),
        React.createElement(
          "span",
          { className: `box ${beat ? "active" : ""} ${green}` },
          result
        )
      ),

      // Fraction line
      React.createElement("span", { className: "fraction-line" }),

      // Denominator row
      React.createElement(
        "span",
        { className: "box-align" },
        React.createElement("span", null, deno),
        React.createElement("span", null, sign === "÷" ? "÷" : "x"),
        React.createElement(
          "span",
          { className: `box ${beat ? "active" : ""} ${green}` },
          result
        )
      )
    )
  );
};
window.MultiplyFraction=MultiplyFraction;