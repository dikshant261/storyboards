const StartPage = ({ onClose }) => {
  return React.createElement(
    "div",
    { className: "start-page-container" },

    // Top heading
    React.createElement("div", { className: "top-heading" }, t("pages.common.equivalentFractions")),

    // Sub headings
    React.createElement("div", { className: "sub-heading" }, t("pages.common.weMultiply")),
    React.createElement("div", { className: "sub-heading" }, t("pages.common.letFind")),

    // Button section
    React.createElement(
      "div",
      { className: "top-margin" },
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
window.StartPage=StartPage;