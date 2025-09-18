function AppleImage() {
    const yellowball="assets/yellowball.png";
    const greenball="assets/greenball.png";
  return React.createElement(
    "div",
    { className: "apple-container" },
    React.createElement(
      "div",
      { className: "apple-image" },

      React.createElement("img", { src: yellowball, alt: "Apple", className: "yellowball" }),
      React.createElement("img", { src: greenball, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: yellowball, alt: "Apple", className: "yellowball" }),
      React.createElement("img", { src: greenball, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: greenball, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: greenball, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: greenball, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: yellowball, alt: "Apple", className: "yellowball" })
    )
  );
}
window.AppleImage=AppleImage;