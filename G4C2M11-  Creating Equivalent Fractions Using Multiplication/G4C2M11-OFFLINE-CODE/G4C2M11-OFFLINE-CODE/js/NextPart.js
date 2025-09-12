const NextPart = ({ onClose }) => {
  return React.createElement(
    "div",
    { className: "start-page-container" },

    // Top heading
    React.createElement("div", { className: "top-heading" }, t("pages.common.equivalentFractions")),

    // Sub heading
    React.createElement("div", { className: "sub-heading-one" }, t("pages.common.nowItTime")),

    // Button container
    React.createElement(
      "div",
      { className: "top-margin" },
      React.createElement(ReusableButton, {
        label: t("buttons.next_btn"),
        width: "17vw",
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
window.NextPart=NextPart;