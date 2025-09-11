function ErrorMessageTwo({ answer, question }) {
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
      : React.createElement("p", { className: "error-message" }, t("add_or_multiplyError"))
  );
}
window.ErrorMessageTwo=ErrorMessageTwo;