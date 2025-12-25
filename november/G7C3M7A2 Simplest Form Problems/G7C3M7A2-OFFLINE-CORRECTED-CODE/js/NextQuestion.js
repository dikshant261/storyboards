const NextQuestion = ({ goNext }) => {
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
      t("startPage.letWrite")
    ),
    /*#__PURE__*/ React.createElement(
      "p",
      {
        className: "startpage-content",
        style: {
          paddingTop: "5%",
        },
      },
      t("nextQuestion.motherBought")
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          paddingTop: "6%",
        },
      },
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
  );
};
window.NextQuestion = NextQuestion;
