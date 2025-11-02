const TableMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  if (flag === 1) {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      stepOne &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                correctOption[0],
                " ",
                t("success", {
                  word: t("symbol"),
                })
              )
            : boxResultOne === options[5]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("yellowMarble")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("symbolCode"),
                })
              )
        ),
      stepTwo &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                correctOption[1],
                " ",
                t("success", {
                  word: t("word"),
                })
              )
            : boxResultOne === options[2]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("yellowMarble")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("wordTo"),
                })
              )
        ),
      stepThree &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "option-fraction-error",
                  },
                  /*#__PURE__*/ React.createElement("span", null, "9"),
                  /*#__PURE__*/ React.createElement("span", {
                    className: "fraction-line-error",
                  }),
                  /*#__PURE__*/ React.createElement("span", null, "7")
                ),
                t("success", {
                  word: t("fraction"),
                })
              )
            : boxResultOne === options[4]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("yellowMarbleFraction")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("fractionForm"),
                })
              )
        )
    );
  }
  if (flag === 2) {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      stepOne &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                correctOption[0],
                " ",
                t("success", {
                  word: t("symbol"),
                })
              )
            : boxResultOne === options[5]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("blueMarbles")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("symbolCode"),
                })
              )
        ),
      stepTwo &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                correctOption[1],
                " ",
                t("success", {
                  word: t("word"),
                })
              )
            : boxResultOne === options[2]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("blueMarbles")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("wordTo"),
                })
              )
        ),
      stepThree &&
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "success-message",
                },
                t("great"),
                " ",
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "option-fraction-error",
                  },
                  /*#__PURE__*/ React.createElement("span", null, "7"),
                  /*#__PURE__*/ React.createElement("span", {
                    className: "fraction-line-error",
                  }),
                  /*#__PURE__*/ React.createElement("span", null, "9")
                ),
                t("success", {
                  word: t("fraction"),
                })
              )
            : boxResultOne === options[4]
            ? /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("blueMarblesFraction")
              )
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "error-message",
                },
                t("dogErrorone", {
                  word: t("fractionForm"),
                })
              )
        )
    );
  }
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    stepOne &&
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        boxResultOne === correctOption[0]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "success-message",
              },
              t("great"),
              " ",
              correctOption[0],
              " ",
              t("success", {
                word: t("symbol"),
              })
            )
          : boxResultOne === options[5]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("tableErrorSymbol")
            )
          : /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("dogErrorone", {
                word: t("symbolCode"),
              })
            )
      ),
    stepTwo &&
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        boxResultOne === correctOption[1]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "success-message",
              },
              t("great"),
              " ",
              correctOption[1],
              " ",
              t("success", {
                word: t("word"),
              })
            )
          : boxResultOne === options[2]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("tableErrorSymbol")
            )
          : /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("dogErrorone", {
                word: t("wordTo"),
              })
            )
      ),
    stepThree &&
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        boxResultOne === correctOption[2]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "success-message",
              },
              t("great"),
              " ",
              /*#__PURE__*/ React.createElement(
                "span",
                {
                  className: "option-fraction-error",
                },
                /*#__PURE__*/ React.createElement("span", null, "6"),
                /*#__PURE__*/ React.createElement("span", {
                  className: "fraction-line-error",
                }),
                /*#__PURE__*/ React.createElement("span", null, "2")
              ),
              t("success", {
                word: t("fraction"),
              })
            )
          : boxResultOne === options[4]
          ? /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("tableErrorFraction")
            )
          : /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "error-message",
              },
              t("dogErrorone", {
                word: t("fractionForm"),
              })
            )
      )
  );
};
window.TableMessage = TableMessage;
