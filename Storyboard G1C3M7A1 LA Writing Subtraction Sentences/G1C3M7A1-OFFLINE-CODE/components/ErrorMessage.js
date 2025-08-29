const ErrorMessage = ({ question, number }) => {
  return React.createElement(
    "div",
    null,
    number === question[0]
      ? React.createElement(
          "p",
          { className: "success" },
          t("successOne", { count: number })
        )
      : number > question[0]
      ? React.createElement(
          "p",
          { className: "error-2" },
          t("errorMessageBig")
        )
      : React.createElement(
          "p",
          { className: "error-2" },
          t("errorMessageSmall")
        )
  );
};

window.ErrorMessage = ErrorMessage;
