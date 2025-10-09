const SceneEleven = ({ goNext, goPrev }) => {
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
      /*#__PURE__*/ React.createElement(
        "p",
        {
          style: {
            fontSize: "2.9vw",
          },
        },
        t("sceneSeven.goodJob")
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main-container ",
        style: {
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "13vw",
        },
      },
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "para",
          style: {
            textAlign: "left",
            marginTop: "2vw",
            lineHeight: "2",
            fontSize: "1.7",
          },
        },
        /*#__PURE__*/ React.createElement("span", null, "Q."),
        t("sceneTen.janaWant"),
        " ",
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          /*#__PURE__*/ React.createElement(
            "button",
            {
              className: "line-button",
              style: {
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              },
            },
            t("sceneTen.twoCupCake"),
            " ."
          )
        ),
        " ",
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          t("sceneTen.toHerBestFriend")
        ),
        " ",
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          /*#__PURE__*/ React.createElement(
            "button",
            {
              className: "line-button",
              style: {
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              },
            },
            t("sceneTen.threeBest")
          ),
          " "
        ),
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          /*#__PURE__*/ React.createElement(
            "button",
            {
              className: "line-button",
              style: {
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              },
            },
            t("sceneTen.howManyCupCakes")
          )
        ),
        " ",
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          t("sceneTen.sheMustBuy")
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "box-align",
          style: {
            flexDirection: "column",
            gap: "0.5vw",
            marginBottom: "0vw",
          },
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box-align",
            style: {
              gap: "1vw",
              textAlign: "center",
              marginBottom: "0vw",
            },
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "line-button",
              style: {
                width: "30vw",
                fontSize: "2vw",
              },
            },
            t("sceneTen.howManyCupCakes"),
            " "
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "para",
            },
            "="
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "line-button",
              style: {
                width: "30vw",
                fontSize: "2vw",
              },
            },
            t("sceneTen.threeBest"),
            " "
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "para",
            },
            "\xD7"
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "line-button",
              style: {
                width: "30vw",
                fontSize: "2vw",
              },
            },
            t("sceneTen.twoCupCake")
          )
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box-align",
            style: {
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "20vw",
            },
          },
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "para",
              style: {
                fontSize: "2vw",
                color: "#00b045",
              },
            },
            t("sceneSeven.totalItems")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "para",
              style: {
                fontSize: "2vw",
                color: "#00b045",
              },
            },
            t("sceneSeven.noOfGroups")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "para",
              style: {
                fontSize: "1.9vw",
                color: "#00b045",
              },
            },
            t("sceneSeven.itemInEachGroup")
          )
        )
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
window.SceneEleven = SceneEleven;
