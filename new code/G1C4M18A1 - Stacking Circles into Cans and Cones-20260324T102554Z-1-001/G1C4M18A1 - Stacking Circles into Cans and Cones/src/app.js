function app() {
  return React.createElement(
    "div",
    { className: "applet-container" },
    React.createElement(
      "div",
      { className: "header" },
      React.createElement("h1", null, t("header.title"))
    ),
    React.createElement(
      "div",
      { className: "main-layout" },

      React.createElement(
        "div",
        { className: "left-panel" },
        React.createElement(LeftContent)
      ),
      React.createElement(
        "div",
        { className: "right-panel" },
        React.createElement(RightContent)
      )
    ),
    React.createElement("div", { className: "footer" }, t("footer.note"))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(app));
});
