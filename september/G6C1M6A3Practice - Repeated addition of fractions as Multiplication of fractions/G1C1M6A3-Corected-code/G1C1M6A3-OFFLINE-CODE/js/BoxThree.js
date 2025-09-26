const BoxThree = function(props) {
  const { stepOne, answer, question, red } = props;

  return React.createElement(
    "div",
    { className: "box-container" },
    React.createElement(
      "div",
      { className: `${red} box-two ${stepOne ? "active" : ""}` },
      React.createElement(FractionMultiply, {
        numerator: answer.num,
        denominator: question[1],
        count: answer.count,
        fontSize: "4vw",
        add: answer.pluse
      })
    )
  );
};
window.BoxThree=BoxThree;