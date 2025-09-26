function CircleImage() {
  const rectangle="assets/rectangle.png";
  const circle="assets/circle.png";  
  return React.createElement(
    "div",
    { className: "circle-container" },

    React.createElement("img", { src: rectangle, className: "rectangle" }),
    React.createElement("img", { src: rectangle, className: "rectangle" }),

    React.createElement(
      "div",
      { className: "circle-align" },
      React.createElement("img", { src: circle, className: "circle" }),
      React.createElement("img", { src: circle, className: "circle" })
    ),

    React.createElement("img", { src: rectangle, className: "rectangle" }),
    React.createElement("img", { src: circle, className: "circle" }),
    React.createElement("img", { src: rectangle, className: "rectangle" }),

    React.createElement(
      "div",
      { className: "circle-align" },
      React.createElement("img", { src: circle, className: "circle" }),
      React.createElement("img", { src: circle, className: "circle" })
    ),

    React.createElement("img", { src: rectangle, className: "rectangle" }),

    React.createElement(
      "div",
      { className: "circle-align" },
      React.createElement("img", { src: circle, className: "circle" }),
      React.createElement("img", { src: circle, className: "circle" })
    )
  );
}
window.CircleImage=CircleImage;