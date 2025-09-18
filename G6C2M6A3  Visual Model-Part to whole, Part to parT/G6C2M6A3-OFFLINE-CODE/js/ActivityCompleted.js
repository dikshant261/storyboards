function ActivityComplete() {
  return React.createElement(
    "div",
    { className: "start-page-container-complete" },

    // Top heading
    React.createElement(
      "div",
      { className: "top-heading" },
      t("startEndPage.activityCompleted")
    ),

    // Sub-heading one
    React.createElement(
      "div",
      { className: "sub-heading-one" },
      t("startEndPage.youHaveLearned")
    ),

    // Sub-heading two
    React.createElement(
      "div",
      { className: "sub-heading-one" },
      t("startEndPage.nowYouCan")
    ),

    React.createElement(
      "div",
      { className: "sub-heading-one" },
      t("startEndPage.toGoStartOver")
    ),

    // ReusableButton
    React.createElement(ReusableButton, {
      label: t("buttons.startOver"),
      width: "28vw",
      height: "10vh",
      fontSize: "3.5vw",
      onClick: () => window.location.reload(),
    })
  );
}
window.ActivityComplete = ActivityComplete;
