// components/Instruction.js (no imports, no JSX)

const Instruction = () => {
  return React.createElement(
    "div",
    null,
    // First arrow
    React.createElement(
      "div",
      null,
      React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "10.9 8.9 1.2 1.2",
          className: "arrow-align-one",
        },
        React.createElement("path", {
          d: "M 12 9 Q 11 9 11 10",
          stroke: "gold",
          strokeWidth: "0.06",
          fill: "none",
        })
      )
    ),

    // Second arrow
    React.createElement(
      "div",
      null,
      React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "10.9 8.9 1.2 1.2",
          className: "arrow-align-two",
        },
        React.createElement("path", {
          d: "M 12 9 Q 11 9 11 10",
          stroke: "gold",
          strokeWidth: "0.06",
          fill: "none",
        })
      )
    ),

    // Arrow line
    React.createElement(
      "div",
      null,
      React.createElement("div", {
        className: "arrow-line show-in",
      })
    ),

    // Labels
    React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        { className: "total-number show-in" },
        t("totalCars")
      ),
      React.createElement(
        "p",
        { className: "take-away show-in" },
        t("crossCars")
      ),
      React.createElement(
        "p",
        { className: "ramains show-in" },
        t("remainingCars")
      )
    )
  );
};

window.Instruction = Instruction;
