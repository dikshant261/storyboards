const ErrorMessgae = ({ question, result }) => {
  return React.createElement(
    "div",
    null,
    result * question[0] === question[2] && result * question[1] === question[3]
      ? React.createElement(
          "p",
          { style: { textAlign: "center" }, className: "success-message" },
          t("pages.common.greatWork"),
          " ",
          React.createElement(
            "span",
            { className: "fraction-inline-align" },
            React.createElement(
              "span",
              { className: "fraction-question-two" },
              React.createElement("span", null, question[0]),
              React.createElement("span", { className: "fraction-question-line" }),
              React.createElement("span", null, question[1])
            )
          ),
          " ",
          t("pages.common.givesIt", { count: result }),
          " ",
          React.createElement(
            "span",
            { className: "fraction-inline-align" },
            React.createElement(
              "span",
              { className: "fraction-question-two" },
              React.createElement("span", null, question[2]),
              React.createElement("span", { className: "fraction-question-line" }),
              React.createElement("span", null, question[3])
            )
          ),
          "."
        )
      : React.createElement(
          "p",
          { className: "error-message" },
          t("errors.errorMessage", {
            num: question[0],
            result: result,
            result_one:result,
            multiply: question[0] * result,
            num_result: question[2],
            deno: question[1],
            multiplyTwo: question[1] * result,
            deno_result: question[3],
          })
        )
  );
};
window.ErrorMessgae=ErrorMessgae;