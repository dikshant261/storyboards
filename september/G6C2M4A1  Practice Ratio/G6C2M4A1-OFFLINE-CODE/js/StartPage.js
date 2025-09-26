const StartPage = ({ onClose }) => {

  return React.createElement(
    "div",
    { className: "start-page-container" },
    React.createElement("div", { className: "top-heading" }, t("writingRatio")),
    React.createElement(
      "div",
      { className: "sub-heading" },
      t("get_ready_to_explore")
    ),
    React.createElement(
      "div",
      null,
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
window.StartPage = StartPage;