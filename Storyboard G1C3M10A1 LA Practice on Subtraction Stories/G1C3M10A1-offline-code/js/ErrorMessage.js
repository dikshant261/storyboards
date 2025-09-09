const ErrorMessage = ({ numbers, correctNumber }) => {
  

  const isCorrect =
    numbers.number1 === correctNumber[0] &&
    numbers.number2 === correctNumber[1] &&
    numbers.number3 === correctNumber[2];

  return React.createElement(
    "div",
    null,
    isCorrect
      ? React.createElement("p", { className: "success" }, t("successMeassage"))
      : React.createElement("p", { className: "error-2" }, t("errorMessage"))
  );
};
