const StartPage = ({ onClose }) => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "fraction-container",
    },
    /*#__PURE__*/ React.createElement(
      "h2",
      {
        className: "title",
      },
      t("startPage.simplestForm")
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "align-row",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "circle",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "fraction",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "numerator",
            },
            "12"
          ),
          /*#__PURE__*/ React.createElement("span", {
            className: "line",
          }),
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "denominator",
            },
            "24"
          )
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "content",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "line-height",
            },
            t("startPage.keep")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              style: {
                marginTop: "3vw",
              },
            },
            t("startPage.tapStart")
          )
        ),
        /*#__PURE__*/ React.createElement(ReusableButton, {
          label: t("buttons.start"),
          width: "13vw",
          height: "9vh",
          fontSize: "3vw",
          onClick: () => {
            playClick();
            onClose();
          },
        })
      )
    )
  );
};
window.StartPage = StartPage;
