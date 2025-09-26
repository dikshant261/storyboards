
const RepersentinRatio = ({ onNext }) => {

  return React.createElement(
    "div",
    { className: "start-page-container-part" },

    // Top heading
    React.createElement("div", { className: "top-heading" }, t("writingRatio")),

    // Sub headings
    React.createElement("div", { className: "sub-heading-one" }, t("practiceStart")),
    React.createElement("div", { className: "sub-heading-one" }, t("getReady")),
    React.createElement("div", { className: "sub-heading-one" }, t("nextContinue")),

    // Reusable button
    React.createElement(ReusableButton, {
      label: t("next"),
      width: "12vw",
      height: "10vh",
      fontSize: "3vw",
      onClick: () => {
        playClick();
        onNext();
      },
    })
  );
};

window.RepersentinRatio= RepersentinRatio;
