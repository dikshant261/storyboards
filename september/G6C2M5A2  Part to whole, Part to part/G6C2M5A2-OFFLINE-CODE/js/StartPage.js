const StartPage = ({ onClose }) => {
  return React.createElement(
    "div",
    { className: "start-page-container" },

    React.createElement("div", { className: "top-heading" }, t("startEndPage.ExploringRatios")),
    React.createElement("div", { className: "sub-heading" }, t("startEndPage.LetPracticeFinding")),
    React.createElement("div", { className: "sub-heading" }, t("startEndPage.clickStart")),

    React.createElement(
      "div",
      null,
      React.createElement(ReusableButton, {
        label: t("buttons.start"),
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

window.StartPage = StartPage;
