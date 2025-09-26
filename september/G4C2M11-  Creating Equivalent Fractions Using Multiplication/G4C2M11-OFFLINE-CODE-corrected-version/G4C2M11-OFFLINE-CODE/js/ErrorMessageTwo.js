const ErrorMessgaeTwo = ({ question, result }) => {
  return React.createElement(
    "div",
    null,
    question[0] / result === question[2] && question[1] / result === question[3]
      ? React.createElement(
          "p",
          { style: { textAlign: "center" }, className: "success-message" },
          t("pages.common.greatWorkDivide"),
          " ",
          // React.createElement(
          //   "span",
          //   { className: "fraction-inline-align" },
          //   React.createElement(
          //     "span",
          //     { className: "fraction-question-two" },
          //     React.createElement("span", null, question[0]),
          //     React.createElement("span", { className: "fraction-question-line" }),
          //     React.createElement("span", null, question[1])
          //   )
          // ),
          " ",
          t("pages.common.greatWorkDivideTwo", { count: result }),
          " ",
          React.createElement(
            "span",
            { className: "fraction-inline-align" },
            React.createElement(
              "span",
              { className: "fraction-question-two" },
              React.createElement("span", null, question[2]),
              React.createElement("span", {
                className: "fraction-question-line",
              }),
              React.createElement("span", null, question[3])
            )
          ),
          "."
        )
      : React.createElement(
          "p",
          { className: "error-message", style: { textAlign: "center" } },
          t("pages.common.divideError", {
            num: question[0],
            deno: question[1],
          })
        )
  );
};
window.ErrorMessgaeTwo = ErrorMessgaeTwo;
