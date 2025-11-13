const ActivityCompleted = () => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "startpage-container",
      style: {
        justifyContent: "flex-start",
      },
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "startpage-heading",
      },
      t("activityComplete.activityComplete")
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "startpage-content",
        style: {
          lineHeight: "4vw",
          paddingTop: "10vh",
        },
      },
      t("activityComplete.whenRatio")
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          marginTop: "4vw",
        },
      },
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.startOver"),
        width: "25vw",
        height: "13vh",
        fontSize: "3vw",
        onClick: () => {
          playClick();
          window.location.reload();
        },
      })
    )
  );
};
window.ActivityCompleted = ActivityCompleted;
