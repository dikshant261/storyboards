const BoxFour = function(props) {
  const { stepOne, answer, question, red } = props;

  console.log(answer);

  return React.createElement(
    "div",
    { className: "box-container" },
    React.createElement(
      "div",
      { className: `${red} box-two ${stepOne ? "active" : ""}` },
      React.createElement(FractionOption, {
        numerator: answer.num,
        denominator: answer.deno,
        fontSize: "5vw",
        add:answer.pluse
      })
    )
  );
};
window.BoxFour=BoxFour;