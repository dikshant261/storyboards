function ActivityComplete() {
  return React.createElement(
    "div",
    { className: "start-page-container-complete" },
    React.createElement(
      "div",
      { className: "top-heading" },
      t("activityComplete")
    ),
    React.createElement(
      "div",
      { className: "sub-heading-one" },
      t("leraned_forms")
    ),
    React.createElement(
      "div",
      { className: "sub-heading-one" },
      t("startOver")
    ),
    React.createElement(ReusableButton, {
      label: t("buttonStartOver"),
      width: "16vw",
      height: "8vh",
      fontSize: "3vw",
      onClick: function () {
        playClick();
        window.location.reload();
      }
    })
  );
}
window.ActivityComplete=ActivityComplete;