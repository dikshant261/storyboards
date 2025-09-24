const ActivityCompleted = () => {
  const restartActivity = () => {
    playClick();
    window.location.href = window.location.href; // reload page
  };

  // Handle keyboard input (laptop + TV remote)
  const handleKey = (e) => {
    if (
      e.key === "Enter" ||
      e.code === "Enter" ||
      e.key === "OK" || // TV remote "OK"
      e.keyCode === 13 ||
      e.key === " " // Space key
    ) {
      e.preventDefault();
      restartActivity();
    }
  };

  return /*#__PURE__*/ React.createElement(
    "div",
    { className: "activity-container" },

    /*#__PURE__*/ React.createElement(
      "div",
      { className: "header" },
      /*#__PURE__*/ React.createElement(
        "h2",
        null,
        t("activityCompleted.activity")
      )
    ),

    /*#__PURE__*/ React.createElement(
      "p",
      { className: "description" },
      t("activityCompleted.description")
    ),

    /*#__PURE__*/ React.createElement(
      "div",
      { className: "equation-box" },
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "highlight" },
          t("activityCompleted.numberOne")
        ),
        " ÷ ",
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "highlight" },
          t("activityCompleted.numberTwo")
        )
      ),
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        "= ",
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "highlight" },
          t("activityCompleted.numberOne")
        ),
        " × ",
        t("activityCompleted.reciprocalOf"),
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "highlight" },
          t("activityCompleted.numberTwo")
        )
      ),
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        "= ",
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "highlight" },
          t("activityCompleted.numberOne")
        ),
        " × ",
        /*#__PURE__*/ React.createElement(
          "span",
          { className: "fraction" },
          /*#__PURE__*/ React.createElement("span", null, "1"),
          /*#__PURE__*/ React.createElement(
            "span",
            { className: "deno" },
            t("activityCompleted.numberOne")
          )
        )
      )
    ),

    /*#__PURE__*/ React.createElement(
      "p",
      { className: "restart-text" },
      t("activityCompleted.startOver")
    ),

    /*#__PURE__*/ React.createElement(
      "div",
      { style: { marginTop: "1vw" } },
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.startOver"),
        width: "20vw",
        height: "11vh",
        fontSize: "3vw",
        tabIndex: 0,
        onClick: restartActivity,
        onKeyDown: handleKey,
      })
    )
  );
};

window.ActivityCompleted = ActivityCompleted;
