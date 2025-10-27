const StartPage = ({ goNext }) => {
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
      t("startPage.findingFrames")
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
        /*#__PURE__*/ React.createElement(FrameImag, {
          width: "63%",
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "content",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          null,
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "line-height",
            },
            t("startPage.picture")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              style: {
                marginTop: "3vw",
              },
            },
            t("startPage.verticalside")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            t("startPage.letFind"),
            " ",
            /*#__PURE__*/ React.createElement(
              "span",
              {
                style: {
                  color: "#dfff41",
                },
              },
              t("startPage.length")
            ),
            " ",
            /*#__PURE__*/ React.createElement(
              "span",
              null,
              t("startPage.andCheck")
            )
          )
        ),
        /*#__PURE__*/ React.createElement(ReusableButton, {
          label: t("buttons.start"),
          width: "13vw",
          height: "9vh",
          fontSize: "3vw",
          onClick: () => {
            playClick();
            goNext();
          },
        })
      )
    )
  );
};
window.StartPage = StartPage;
