const ErrorMessage = ({ option, flag }) => {
  return React.createElement(
    "div",
    null,

    // Flag === 0
    flag === 0 &&
      React.createElement(
        "div",
        null,
        option === 7
          ? React.createElement("p", { className: "success-messaage" }, t("sceneTwo.success"))
          : option === 4
          ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.FourRedError"))
          : option === 3
          ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.ThreeBlueError"))
          : option > 7
          ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.largeNumberError"))
          : React.createElement("p", { className: "error-messaage" }, t("sceneTwo.smallerNumberError"))
      ),

    // Flag === 1
    flag === 1 &&
      React.createElement(
        "div",
        null,
        option === 3
          ? React.createElement("p", { className: "success-messaage" }, t("sentanceOneError.success"))
          : option === 4
          ? React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.partBError"))
          : option > 3
          ? React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.largerNUmberError"))
          : React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.smallNumberError"))
      ),

    // Flag === 2
    flag === 2 &&
      React.createElement(
        "div",
        null,
        option === 4
          ? React.createElement("p", { className: "success-messaage" }, t("sentanceTwoError.success"))
          : option === 3
          ? React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.partAError"))
          : option > 4
          ? React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.largeNumberError"))
          : React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.smallNumberError"))
      )
  );
};
window.ErrorMessage=ErrorMessage;