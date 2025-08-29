const ErrorMessageThree = ({ question, number }) => {
  return React.createElement(
    "div",
    null,
    number === question[2]
      ? React.createElement(
          "p",
          { className: "success" },
          t("successThree")
        )
      : number > question[2]
      ? React.createElement(
          "p",
          { className: "error-2" },
          t("countErrorMessageBig")
        )
      : React.createElement(
          "p",
          { className: "error-2" },
          t("countErrorMessageSmall")
        )
  );
};

window.ErrorMessageThree = ErrorMessageThree;
