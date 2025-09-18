const End = ({ onClose }) => {
  return React.createElement(
    "div",
    { className: "start-page-container" },
    React.createElement("div", { className: "top-heading" }, t("pages.common.equivalentFractions")),
    React.createElement("div", { className: "sub-heading-one" }, t("pages.common.greatYouHaveLearned")),
    React.createElement(
      "div",
      { className: "top-margin" },
      React.createElement(ReusableButton, {
        label: t("buttons.startOver"),
        width: "16vw",
        height: "12vh",
        fontSize: "3vw",
        onClick: () => {
          playClick();
          window.location.reload();
        },
      })
    )
  );
};
window.End=End;