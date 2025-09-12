const Fraction = ({ num, deno, fontSize }) => {
  return React.createElement(
    "div",
    { className: "fraction-conatiner" },
    React.createElement(
      "div",
      { className: "fraction", style: { fontSize: fontSize } },
      React.createElement("span", null, num),
      React.createElement("span", { className: "fraction-line" }),
      React.createElement("span", null, deno)
    )
  );
};
window.Fraction=Fraction;