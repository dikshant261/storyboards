const Box = function() {
  return React.createElement(
    "div",
    { className: "box-container" },
    React.createElement("div", { className: "box" }),
    React.createElement("p", null, "X"),
    React.createElement("div", { className: "box" })
  );
};
window.Box=Box;