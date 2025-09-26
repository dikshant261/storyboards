const ActivityComplete = function(props) {
  const { onRestart } = props;

  return React.createElement(
    "div",
    { className: "activity-container" },
    React.createElement("h1", { className: "title" }, t("Activity Completed!")),

    React.createElement(
      "div",
      { className: "content" },
      React.createElement(
        "p",
        { className: "text" },
        t("For_any_addition_sentence"),
        React.createElement(
          "span",
          { style: { display: "inline-flex", alignItems: "center" } },
          React.createElement(
            "span",
            { className: "fraction-complete" },
            React.createElement("span", { className: "num" }, t("Numerator")),
            React.createElement("span", { className: "fraction-line-one" }),
            React.createElement("span", { className: "den" }, t("Denominator"))
          ),
          React.createElement("span", { style: { fontSize: "4vw" } }, "+")
        ),
        React.createElement(
          "span",
          { style: { display: "inline-flex", alignItems: "center" } },
          React.createElement(
            "span",
            { className: "fraction-complete" },
            React.createElement("span", { className: "num" }, t("Numerator")),
            React.createElement("span", { className: "fraction-line-one" }),
            React.createElement("span", { className: "den" }, t("Denominator"))
          ),
          React.createElement("span", { style: { fontSize: "4vw" } }, "+")
        ),
        React.createElement(
          "span",
          { className: "fraction-complete" },
          React.createElement("span", { className: "num" }, t("Numerator")),
          React.createElement("span", { className: "fraction-line-one" }),
          React.createElement("span", { className: "den" }, t("Denominator"))
        )
      ),

      React.createElement(
        "p",
        { className: "text" },
        t("Multiplication_sentences_can_be_written_as")
      ),

      React.createElement(
        "div",
        { className: "equation" },
        React.createElement(
          "span",
          { style: { display: "inline-flex", alignItems: "center", gap: "2vw" } },
          React.createElement("span", { className: "whole" }, t("Whole")),
          React.createElement("span", { style: { fontSize: "4vw" } }, "x"),
          React.createElement(
            "span",
            { className: "fraction-complete" },
            React.createElement("span", { className: "num" }, t("Numerator")),
            React.createElement("span", { className: "fraction-line-one" }),
            React.createElement("span", { className: "den" }, t("Denominator"))
          ),
          React.createElement("span", { style: { fontSize: "4vw" } }, "="),
          React.createElement(
            "span",
            { className: "fraction-complete" },
            React.createElement(
              "span",
              null,
              React.createElement("span", { className: "whole" }, t("Whole")),
              React.createElement("span", { style: { fontSize: "3vw" } }, "x"),
              React.createElement("span", { className: "num orange" }, t("Numerator"))
            ),
            React.createElement("span", { className: "fraction-line-one" }),
            React.createElement("span", { className: "den" }, t("Denominator"))
          )
        )
      )
    ),

    React.createElement("p", { className: "restart-text" }, t('Tap_Start_Over_to_restart_the_activity')),

    React.createElement(
      "div",
      { style: { marginTop: "3vw" } },
      React.createElement(ReusableButton, {
        label: t("Start_Over"),
        width: "15vw",
        height: "9vh",
        fontSize: "3vw",
        onClick: function() {
          playClick();
          window.location.reload();
        }
      })
    )
  );
};
window.ActivityComplete=ActivityComplete;