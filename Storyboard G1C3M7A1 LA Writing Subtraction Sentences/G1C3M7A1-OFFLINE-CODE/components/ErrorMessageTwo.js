const ErrorMessageTwo = ({ question, number }) => {
  return React.createElement(
    "div",
    null,
    number === question[1]
      ? React.createElement(
          "p",
          { className: "success" },
          t("successTwo", { count: number })
        )
      : number > question[1]
      ? React.createElement(
          "p",
          { className: "error-2" },
          t("errorCrossMessaageBig")
        )
      : React.createElement(
          "p",
          { className: "error-2" },
          t("errorCrossMessaageSmall")
        )
  );
};

window.ErrorMessageTwo = ErrorMessageTwo;
