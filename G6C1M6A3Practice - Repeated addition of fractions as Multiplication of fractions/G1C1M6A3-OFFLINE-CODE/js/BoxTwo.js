const BoxTwo = function(props) {
  const { stepOne, answer, question, red } = props;

  return React.createElement(
    "div",
    { className: "box-container" },
    React.createElement(
      "div",
      { className: `${red} box-two ${stepOne ? "active" : ""}` },
      answer === `${question[0]}/${question[1]}` 
        ? React.createElement(
            "span",
            { className: "box-fraction" },
            React.createElement("span", null, question[0]),
            React.createElement("span", { className: "box-fraction-line" }),
            React.createElement("span", null, question[1])
          )
        : answer
    )
  );
};
window.BoxTwo=BoxTwo;