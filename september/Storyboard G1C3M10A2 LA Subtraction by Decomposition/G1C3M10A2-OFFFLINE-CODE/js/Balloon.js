const Balloon = () => {
  const redballoon="assets/redballoon.png";
  const blueballoon="assets/blueballoon.png";  
  return React.createElement(
    "div",
    { className: "balloon-container" },

    // Red Balloons
    React.createElement(
      "div",
      { className: "ballon-align" },
      React.createElement("img", { src: redballoon, className: "red-balloon" }),
      React.createElement("img", { src: redballoon, className: "red-balloon" }),
      React.createElement("img", { src: redballoon, className: "red-balloon" }),
      React.createElement("img", { src: redballoon, className: "red-balloon" })
    ),

    // Blue Balloons
    React.createElement(
      "div",
      { className: "ballon-align" },
      React.createElement("img", { src: blueballoon, className: "blue-balloon" }),
      React.createElement("img", { src: blueballoon, className: "blue-balloon" }),
      React.createElement("img", { src: blueballoon, className: "blue-balloon" })
    )
  );
};
window.Balloon=Balloon;