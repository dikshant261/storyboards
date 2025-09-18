const ErrorMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  return React.createElement(
    "div",
    null,

    // Question One (flag === 0)
    React.createElement(
      "div",
      null,
      flag === 0 && stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement("p", { className: "success-message" }, t("marblesSucces.succesOne"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 0 && stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement("p", { className: "success-message" }, t("marblesSucces.succesTwo"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 0 && stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement("p", { className: "success-message" }, t("marblesSucces.succesThree"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        )
    ),

    // Question Two (flag === 2)
    React.createElement(
      "div",
      null,
      flag === 2 && stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement("p", { className: "success-message" }, t("circleSuccess.succesOne"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 2 && stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement("p", { className: "success-message" }, t("circleSuccess.succesTwo"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 2 && stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement("p", { className: "success-message" }, t("circleSuccess.succesThree"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        )
    ),

    // Question Three (flag === 1)
    React.createElement(
      "div",
      null,
      flag === 1 && stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement("p", { className: "success-message" }, t("triangleContent.succesOne"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 1 && stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement("p", { className: "success-message" }, t("triangleContent.succesTwo"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 1 && stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement("p", { className: "success-message" }, t("triangleContent.succesThree"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        )
    ),

    // Question Four (flag === 3)
    React.createElement(
      "div",
      null,
      flag === 3 && stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement("p", { className: "success-message" }, t("chitraSuccess.succesOne"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 3 && stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement("p", { className: "success-message" }, t("chitraSuccess.succesTwo"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        ),
      flag === 3 && stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement("p", { className: "success-message" }, t("chitraSuccess.succesThree"))
            : React.createElement("p", { className: "error-message" }, t("error.tryAgain"))
        )
    )
  );
};
window.ErrorMessage=ErrorMessage;