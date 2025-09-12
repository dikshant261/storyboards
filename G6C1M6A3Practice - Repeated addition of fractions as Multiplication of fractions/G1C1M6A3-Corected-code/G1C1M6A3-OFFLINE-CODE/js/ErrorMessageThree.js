function ErrorMessageThree({ answer, question }) {
  return React.createElement(
    "div",
    null,
    answer.num === question[2] * question[0] && answer.deno === question[1]
      ? React.createElement(
          "p",
          { className: "success-message" },
          t("well_done"),
          React.createElement(
            "span",
            { className: "option-fraction-error" },
            React.createElement("span", null, question[0]),
            React.createElement("span", { className: "fraction-line-error" }),
            React.createElement("span", null, question[1])
          ),
          t("added_times_gives", { count: question[2] }),
          React.createElement(
            "span",
            { className: "option-fraction-error" },
            React.createElement("span", null, question[2] * question[0]),
            React.createElement("span", { className: "fraction-line-error" }),
            React.createElement("span", null, question[1])
          )
        )
      : React.createElement(
          "p",
          { className: "error-message" },
          t("the_numerator", {
            count: question[2],
            num: question[0],
            deno: answer.num,
          })
        )
  );
}
window.ErrorMessageThree=ErrorMessageThree;