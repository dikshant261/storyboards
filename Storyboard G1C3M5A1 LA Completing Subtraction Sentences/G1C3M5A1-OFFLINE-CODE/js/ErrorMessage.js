function ErrorMessage({ numbers, currentNumber }) {
  if (currentNumber === null) {
    return React.createElement(
      "p",
      { className: "error-2" },
      t("nullError", { cross: numbers[1] })
    );
  }

  return React.createElement(
    "div",
    null,
    numbers[0] - numbers[1] === currentNumber
      ? React.createElement(
          "p",
          { className: "success" },
          t("successMessage", {
            total: numbers[0],
            cross: numbers[1],
            left: currentNumber,
          })
        )
      : numbers[0] - numbers[1] < currentNumber
      ? React.createElement(
          "p",
          { className: "error-2" },
          t("greaterErrorMessage", { total: numbers[0], cross: numbers[1] })
        )
      : numbers[0] - numbers[1] > currentNumber
      ? React.createElement(
          "p",
          { className: "error-2" },
          t("biggerErrorMessage", {
            left: numbers[0] - numbers[1] - currentNumber,
          })
        )
      : React.createElement(
          "p",
          { className: "error-2" },
          t("nullError", { cross: numbers[1] })
        )
  );
}
window.ErrorMessage = ErrorMessage;
