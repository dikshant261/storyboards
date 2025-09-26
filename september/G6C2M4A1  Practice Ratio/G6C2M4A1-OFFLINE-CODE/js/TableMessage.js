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
    return React.createElement(
      "div",
      null,
      stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                correctOption[0],
                " ",
                t("success", { word: "symbol" })
              )
            : boxResultOne === options[5]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("yellowMarble")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "symbol :" })
              )
        ),
      stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                correctOption[1],
                " ",
                t("success", { word: "word" })
              )
            : boxResultOne === options[2]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("yellowMarble")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "word to" })
              )
        ),
      stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                React.createElement(
                  "span",
                  { className: "option-fraction-error" },
                  React.createElement("span", null, "9"),
                  React.createElement("span", {
                    className: "fraction-line-error",
                  }),
                  React.createElement("span", null, "7")
                ),
                t("success", { word: "fraction" })
              )
            : boxResultOne === options[4]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("yellowMarbleFraction")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "fraction form" })
              )
        )
    );
  }

  if (flag === 2) {
    return React.createElement(
      "div",
      null,
      stepOne &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[0]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                correctOption[0],
                " ",
                t("success", { word: "symbol" })
              )
            : boxResultOne === options[5]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("blueMarbles")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "symbol :" })
              )
        ),
      stepTwo &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[1]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                correctOption[1],
                " ",
                t("success", { word: "word" })
              )
            : boxResultOne === options[2]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("blueMarbles")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "word to" })
              )
        ),
      stepThree &&
        React.createElement(
          "div",
          null,
          boxResultOne === correctOption[2]
            ? React.createElement(
                "p",
                { className: "success-message" },
                t("great"),
                " ",
                React.createElement(
                  "span",
                  { className: "option-fraction-error" },
                  React.createElement("span", null, "6"),
                  React.createElement("span", {
                    className: "fraction-line-error",
                  }),
                  React.createElement("span", null, "2")
                ),
                t("success", { word: "fraction" })
              )
            : boxResultOne === options[4]
            ? React.createElement(
                "p",
                { className: "error-message" },
                t("blueMarblesFraction")
              )
            : React.createElement(
                "p",
                { className: "error-message" },
                t("dogErrorone", { word: "fraction form" })
              )
        )
    );
  }

  return React.createElement(
    "div",
    null,
    stepOne &&
      React.createElement(
        "div",
        null,
        boxResultOne === correctOption[0]
          ? React.createElement(
              "p",
              { className: "success-message" },
              t("great"),
              " ",
              correctOption[0],
              " ",
              t("success", { word: "symbol" })
            )
          : boxResultOne === options[5]
          ? React.createElement(
              "p",
              { className: "error-message" },
              t("tableErrorSymbol")
            )
          : React.createElement(
              "p",
              { className: "error-message" },
              t("dogErrorone", { word: "symbol :" })
            )
      ),
    stepTwo &&
      React.createElement(
        "div",
        null,
        boxResultOne === correctOption[1]
          ? React.createElement(
              "p",
              { className: "success-message" },
              t("great"),
              " ",
              correctOption[1],
              " ",
              t("success", { word: "word" })
            )
          : boxResultOne === options[2]
          ? React.createElement(
              "p",
              { className: "error-message" },
              t("tableErrorSymbol")
            )
          : React.createElement(
              "p",
              { className: "error-message" },
              t("dogErrorone", { word: "word to" })
            )
      ),
    stepThree &&
      React.createElement(
        "div",
        null,
        boxResultOne === correctOption[2]
          ? React.createElement(
              "p",
              { className: "success-message" },
              t("great"),
              " ",
              React.createElement(
                "span",
                { className: "option-fraction-error" },
                React.createElement("span", null, "6"),
                React.createElement("span", {
                  className: "fraction-line-error",
                }),
                React.createElement("span", null, "2")
              ),
              t("success", { word: "fraction" })
            )
          : boxResultOne === options[4]
          ? React.createElement(
              "p",
              { className: "error-message" },
              t("tableErrorFraction")
            )
          : React.createElement(
              "p",
              { className: "error-message" },
              t("dogErrorone", { word: "fraction form" })
            )
      )
  );
};
window.TableMessage=TableMessage;
