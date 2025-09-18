const ErrorMessage = ({ result, flag, correctOption }) => {
  return React.createElement(
    "div",
    null,

    // Flag 0 -> Car to Bus
    flag === 0
      ? result === correctOption
        ? React.createElement("p", { className: "success-message" }, t("carToBus.success"))
        : result === "7:19"
        ? React.createElement("p", { className: "error-message" }, t("carToBus.errorThree"))
        : result === "12:19"
        ? React.createElement("p", { className: "error-message" }, t("carToBus.errorTwo"))
        : React.createElement("p", { className: "error-message" }, t("carToBus.errorOne"))
      : null,

    // Flag 1 -> Car to Walk
    flag === 1
      ? result === correctOption
        ? React.createElement("p", { className: "success-message" }, t("carToWalk.success"))
        : result === "7:17"
        ? React.createElement("p", { className: "error-message" }, t("carToWalk.errorOne"))
        : result === "17:12"
        ? React.createElement("p", { className: "error-message" }, t("carToWalk.errorTwo"))
        : React.createElement("p", { className: "error-message" }, t("carToWalk.errorThree"))
      : null,

    // Flag 2 -> Walk to Total
    flag === 2
      ? result === correctOption
        ? React.createElement("p", { className: "success-message" }, t("walkToTotal.success"))
        : result === "17:26"
        ? React.createElement("p", { className: "error-message" }, t("walkToTotal.errorOne"))
        : result === "7:36"
        ? React.createElement("p", { className: "error-message" }, t("walkToTotal.errorTwo"))
        : React.createElement("p", { className: "error-message" }, t("walkToTotal.errorThree"))
      : null,

    // Flag 3 -> Bus to Total
    flag === 3
      ? result === correctOption
        ? React.createElement("p", { className: "success-message" }, t("busToTotal.success"))
        : result === "36:12"
        ? React.createElement("p", { className: "error-message" }, t("busToTotal.errorOne"))
        : result === "17:36"
        ? React.createElement("p", { className: "error-message" }, t("busToTotal.errorTwo"))
        : React.createElement("p", { className: "error-message" }, t("busToTotal.errorThree"))
      : null
  );
};
window.ErrorMessage=ErrorMessage;