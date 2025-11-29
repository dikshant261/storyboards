const ActivityCompleted = () => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "startpage-fraction-container",
    },
    /*#__PURE__*/ React.createElement(
      "h2",
      {
        className: "title",
      },
      t("activityCompleted.activityCompleted")
    ),
    /*#__PURE__*/ React.createElement(
      "p",
      {
        className: "startpage-content",
      },
      /*#__PURE__*/ React.createElement(
        "span",
        {
          style: {
            color: "var(--secondary-color)",
          },
        },
        t("activityCompleted.mixedNumbers")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        null,
        " ",
        t("activityCompleted.and")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          style: {
            color: "var(--secondary-color)",
          },
        },
        t("activityCompleted.improperFractions")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        null,
        t("activityCompleted.areUsed")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        null,
        t("activityCompleted.toDenote")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          style: {
            color: "var(--secondary-color)",
          },
        },
        t("activityCompleted.greaterThanOne")
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        null,
        t("activityCompleted.fromAMixedFraction")
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          paddingTop: "8vh",
        },
      },
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.startOver"),
        padding: "2vh 1vw",
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
