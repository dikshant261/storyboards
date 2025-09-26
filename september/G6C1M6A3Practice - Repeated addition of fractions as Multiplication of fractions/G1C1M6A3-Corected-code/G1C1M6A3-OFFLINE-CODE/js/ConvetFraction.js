function ConvertFraction({ question }) {
  return React.createElement(
    "div",
    { className: "fraction-container" },
    Array(question[2])
      .fill()
      .map((_, key) =>
        React.createElement(
          "span",
          {
            key,
            style: { display: "inline-flex", alignItems: "center" },
          },
          React.createElement(
            "div",
            { className: "fraction" },
            React.createElement("p", null, question[0]),
            React.createElement("span", { className: "fraction-line" }),
            React.createElement("p", null, question[1])
          ),
          key !== question[2] - 1 &&
            React.createElement(
              "span",
              {
                style: {
                  margin: "0 2vw",
                  color: "white",
                  fontSize: "6vw",
                },
              },
              "+"
            )
        )
      )
  );
}
window.ConvertFraction=ConvertFraction;