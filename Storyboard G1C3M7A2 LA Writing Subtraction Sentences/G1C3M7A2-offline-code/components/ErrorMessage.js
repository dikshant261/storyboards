// components/ErrorMessage.js (no imports, no JSX)

const ErrorMessage = ({ question, numbers }) => {
  return React.createElement(
    "div",
    null,
    numbers.number1 === question[0] &&
    numbers.number2 === question[1] &&
    numbers.number3 === question[2]
      ? React.createElement(
          "p",
          { className: "success" },
          t("successMessage")
        )
      : React.createElement(
          "p",
          { className: "error-2" },
          t("errorMessage")
        )
  );
};

window.ErrorMessage = ErrorMessage;
