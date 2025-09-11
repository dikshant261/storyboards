function ConvertFractionTwo({ question, answer }) {
  const isSpecial = answer === question[0];

  return React.createElement(
    "div",
    { className: "fraction-container" },
    Array(question[2])
      .fill()
      .map((_, key) => {
        let fractionClass = "fraction";
        if (answer === null) {
          fractionClass += "";
        } else if (isSpecial) {
          if (key === question[2] - 1) {
            fractionClass += " fraction-salmon-dashed";
          } else {
            fractionClass += " fraction-blue-dashed";
          }
        } else {
          fractionClass += " fraction-blue-dashed";
        }

        return React.createElement(
          "span",
          {
            key,
            style: { display: "inline-flex", alignItems: "center" },
          },
          React.createElement(
            "div",
            { className: fractionClass },
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
        );
      })
  );
}
window.ConvertFractionTwo=ConvertFractionTwo;