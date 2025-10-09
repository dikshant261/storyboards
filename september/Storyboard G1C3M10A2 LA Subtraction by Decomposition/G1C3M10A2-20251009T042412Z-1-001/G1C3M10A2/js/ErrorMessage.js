const ErrorMessage = ({ option, flag }) => {
  // Flag === 0
  if (flag === 0) {
    return option === 7
      ? React.createElement("p", { className: "success-messaage" }, t("sceneTwo.success"))
      : option === 4
      ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.FourRedError"))
      : option === 3
      ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.ThreeBlueError"))
      : option > 7
      ? React.createElement("p", { className: "error-messaage" }, t("sceneTwo.largeNumberError"))
      : React.createElement("p", { className: "error-messaage" }, t("sceneTwo.smallerNumberError"));
  }

  // Flag === 1
  if (flag === 1) {
    return option === 3
      ? React.createElement("p", { className: "success-messaage" }, t("sentanceOneError.success"))
      : option === 4
      ? React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.partBError"))
      : option > 3
      ? React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.largerNUmberError"))
      : React.createElement("p", { className: "error-messaage" }, t("sentanceOneError.smallNumberError"));
  }

  // Flag === 2
  if (flag === 2) {
    return option === 4
      ? React.createElement("p", { className: "success-messaage" }, t("sentanceTwoError.success"))
      : option === 3
      ? React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.partAError"))
      : option > 4
      ? React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.largeNumberError"))
      : React.createElement("p", { className: "error-messaage" }, t("sentanceTwoError.smallNumberError"));
  }

  return null;
};
window.ErrorMessage=ErrorMessage;