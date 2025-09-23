const Result = () => {
  return React.createElement(
    "div",
    { className: "result-container" },
    // First SVG
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 25 25",
        style: {
          position: "fixed",
          right: "10%",
          top: "37%",
          width: "6vw",
        },
      },
      React.createElement("path", {
        style: { fill: "white" },
        d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z",
      })
    ),

    // Second SVG
    React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 25 25",
        style: {
          position: "fixed",
          right: "14%",
          top: "37%",
          width: "9vw",
          height: "14vh",
        },
      },
      React.createElement("path", {
        style: { fill: "white" },
        d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z",
      })
    ),

    // First Text
    React.createElement(
      "p",
      {
        style: {
          position: "fixed",
          top: "38%",
          right: "19%",
          color: "#5dbae7",
        },
      },
      t("changeSign")
    ),

    // Second Text
    React.createElement(
      "p",
      {
        style: {
          position: "fixed",
          top: "37%",
          right: "4%",
          color: "rgb(67, 213, 122)",
          fontSize: "1.7vw",
        },
      },
      t("reciprocal")
    ),

    // First Result block
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "result-row", style: { color: "#5dbae7" } },
        React.createElement("span", null, t("result"))
      ),
      React.createElement("br"),
      React.createElement(
        "div",
        { className: "result-row" },
        React.createElement("span", null, "2"),
        React.createElement("span", { style: { color: "#43d57a" } }, "÷"),
        React.createElement("span", { style: { color: "#43d57a" } }, "3")
      )
    ),

    // Second Result block
    React.createElement(
      "div",
      { className: "result-row" },
      React.createElement("span", null, "2"),
      React.createElement("span", { style: { color: "#5dbae7" } }, "×"),
      React.createElement(
        "span",
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#43d57a",
          },
        },

        React.createElement("span", null, 1),
        React.createElement("span", {
          style: {
            borderTop: "0.2vw solid white",
            width: "100%",
            display: "block",
          },
        }),
        React.createElement("span", null, 3)
      )
    )
  );
};
window.Result = Result;
