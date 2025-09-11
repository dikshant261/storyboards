function ErrorMessage({ answer, question, flag, numberString }) {
  console.log(answer, flag);

  if (flag === 0) {
    return React.createElement(
      "div",
      null,
      answer === question[2]
        ? React.createElement(
            "p",
            { className: "success-message" },
            t("yes_we_added"),
            React.createElement(
              "span",
              { className: "option-fraction-error" },
              React.createElement("span", null, question[0]),
              React.createElement("span", { className: "fraction-line-error" }),
              React.createElement("span", null, question[1])
            ),
            t("three_times", { count: question[2] })
          )
        : React.createElement(
            "p",
            { className: "error-message" },
            t("two_fifith_error", { word: numberString })
          )
    );
  }

  return React.createElement(
    "div",
    null,
    answer === question[1]
      ? React.createElement(
          "p",
          { className: "error-message" },
          t("denominatorError")
        )
      : answer === question[2]
      ? React.createElement(
          "p",
          { className: "error-message" },
          t("countError", { count: question[2] })
        )
      : React.createElement(
          "p",
          { className: "success-message" },
          t("goodGoing"),
          React.createElement(
            "span",
            { className: "option-fraction-error" },
            React.createElement("span", null, question[0]),
            React.createElement("span", { className: "fraction-line-error" }),
            React.createElement("span", null, question[1])
          ),
          t("repeatedly")
        )
  );
}
window.ErrorMessage=ErrorMessage;