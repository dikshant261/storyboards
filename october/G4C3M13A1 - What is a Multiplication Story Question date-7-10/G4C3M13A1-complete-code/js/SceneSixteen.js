const SceneSixteen = ({ goNext, goPrev }) => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-container",
    },
    /*#__PURE__*/ React.createElement("div", {
      className: "heading",
    }),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main-container ",
        style: {
          flexDirection: "column",
          background: "none",
        },
      },
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "para",
        },
        t("sceneSixteen.letSeeSome"),
        " "
      ),
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.startOver"),
        width: "25vw",
        height: "10vh",
        fontSize: "3vw",
        onClick: () => {
          playClick();
          window.location.reload();
        },
      })
    )
  );
};
window.SceneSixteen = SceneSixteen;
