function FractionTwo({ value }) {
  const [numerator, denominator] = value.split("/");
  return /*#__PURE__*/ React.createElement(
    "span",
    {
      style: {
        display: "inline-block",
        textAlign: "center",
        verticalAlign: "middle",
        minWidth: "1.5em",
      },
    },
    /*#__PURE__*/ React.createElement(
      "span",
      {
        style: {
          display: "block",
          lineHeight: "1",
        },
      },
      numerator
    ),
    /*#__PURE__*/ React.createElement(
      "span",
      {
        style: {
          borderTop: "0.3vw solid",
          display: "block",
          lineHeight: "1",
        },
      },
      denominator
    )
  );
}
const HintSlide = ({ close }) => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "fraction-container",
    },
    /*#__PURE__*/ React.createElement(
      "h2",
      {
        className: "fraction-title",
      },
      t("multiplication_title")
    ),
    /*#__PURE__*/ React.createElement(
      "p",
      {
        className: "fraction-description",
      },
      t("multiply_fraction_rule")
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "fraction-main",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "fraction-left",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "fraction-heading",
          },
          t("multiplication_heading")
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "fraction-equation",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "fraction",
            },
            /*#__PURE__*/ React.createElement(FractionTwo, {
              value: "2/3",
            })
          ),
          " ",
          t("of"),
          " 6 =",
          " ",
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "fraction",
            },
            /*#__PURE__*/ React.createElement(FractionTwo, {
              value: "2/3",
            })
          ),
          " ",
          "\xD7 6"
        )
      ),
      /*#__PURE__*/ React.createElement(
        "p",
        {
          style: {
            fontSize: "4vw",
            fontWeight: "900",
          },
        },
        "="
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "fraction-right",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "fraction-formula",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "fraction-label",
            },
            /*#__PURE__*/ React.createElement(FractionTwo, {
              value: `${t("numerator_whole_over_denominator")}/${t(
                "denominator"
              )}`,
            })
          )
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "fraction-solution",
          },
          /*#__PURE__*/ React.createElement(FractionTwo, {
            value: "(2 × 6)/3",
          }),
          " = ",
          /*#__PURE__*/ React.createElement(FractionTwo, {
            value: "12/3",
          }),
          " ",
          "= 4"
        )
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.close"),
        width: "10vw",
        height: "9vh",
        fontSize: "3vw",
        onClick: () => {
          playClick();
          close();
        },
      })
    )
  );
};
window.HintSlide = HintSlide;
