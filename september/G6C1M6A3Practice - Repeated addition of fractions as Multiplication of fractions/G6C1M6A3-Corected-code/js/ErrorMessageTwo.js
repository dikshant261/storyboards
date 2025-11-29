function ErrorMessageTwo({ answer, question }) {
  console.log("error multiply :", answer, question)
  return React.createElement(
    "div",
    null,
    answer.num === question[2] &&
      answer.count === question[0] &&
      answer.pluse === "x"
      ? React.createElement("p", { className: "success-message" }, t("wholeNumberSuccess"))
      : answer.num === question[2] &&
        answer.count === question[2] &&
        answer.pluse === "x"
        ? React.createElement("p", { className: "error-message" }, t("wholeTwiceError"))
        : answer.pluse === "÷" ? React.createElement("p", { className: "error-message" }, t("add_or_divideError")) : React.createElement("p", { className: "error-message" }, t("add_or_multiplyError"))
  );
}
window.ErrorMessageTwo = ErrorMessageTwo;