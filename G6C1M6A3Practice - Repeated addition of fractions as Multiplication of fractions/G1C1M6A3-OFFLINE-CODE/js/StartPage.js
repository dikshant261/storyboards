const StartPage = ({ onClose }) => {
  return React.createElement(
    "div",
    { className: "start-page-container" },
    React.createElement("div", { className: "top-heading" }, t("reapeatedAddition")),
    React.createElement("div", { className: "sub-heading" }, t("reapeatedAdditionHeadingOne")),
    React.createElement("div", { className: "sub-heading" }, t("reapeatedAdditionHeadingTwo")),
    React.createElement("div", { className: "sub-heading" }, t("startExplore")),
    React.createElement(
      "div",
      { className: "top-margin" },
      React.createElement(ReusableButton, {
        label: t("start"),
        width: "12vw",
        height: "10vh",
        fontSize: "3vw",
        onClick: () => {
          playClick();
          onClose();
        },
      })
    )
  );
};
window.StartPage=StartPage;