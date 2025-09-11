const FractionNuber = ({ question }) => {
  return React.createElement(
    "div",
    { className: "fraction" },
    React.createElement("p", null, question[0]),
    React.createElement("p", { className: "fraction-line" }),
    React.createElement("p", null, question[1])
  );
};
window.FractionNuber=FractionNuber;