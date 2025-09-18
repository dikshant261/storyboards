const Box = function() {
  return React.createElement(
    "div",
    { className: "box-container" },
    React.createElement("div", { className: "box" }),
    React.createElement("p", null, "×"),
    React.createElement("div", { className: "box" })
  );
};
window.Box=Box;