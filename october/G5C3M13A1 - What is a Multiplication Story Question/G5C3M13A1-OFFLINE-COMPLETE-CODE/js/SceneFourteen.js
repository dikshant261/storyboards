const SceneFourteen = ({ goNext, goPrev }) => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "heading",
      },
      /*#__PURE__*/ React.createElement("p", null)
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main-container ",
        style: {
          flexDirection: "column",
        },
      },
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "para",
        },
        t("sceneTwo.confirmationKeyword")
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "footer",
      },
      /*#__PURE__*/ React.createElement(
        "button",
        {
          onClick: () => {
            playClick();
            goPrev();
          },
        },
        t("buttons.previous")
      ),
      /*#__PURE__*/ React.createElement("p", null, t("navigation.tapNext")),
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        /*#__PURE__*/ React.createElement(
          "button",
          {
            className: "next-btn",
            onClick: () => {
              playClick();
              goNext();
            },
          },
          t("buttons.next")
        ),
        /*#__PURE__*/ React.createElement(Tap, {
          bottom: 0,
        })
      )
    )
  );
};
window.SceneFourteen = SceneFourteen;
