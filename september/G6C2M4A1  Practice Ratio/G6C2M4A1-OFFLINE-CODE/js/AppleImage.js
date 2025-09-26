function AppleImage() {
  const apple='assets/apple.png';
  const orange= 'assets/orange.png';
  return React.createElement(
    "div",
    { className: "apple-container" },
    React.createElement(
      "div",
      { className: "apple-image" },
      React.createElement("img", { src: apple, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: apple, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: orange, alt: "Orange", className: "apple" }),
      React.createElement("img", { src: orange, alt: "Orange", className: "apple" })
    ),
    React.createElement(
      "div",
      { className: "apple-image" },
      React.createElement("img", { src: apple, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: apple, alt: "Apple", className: "apple" }),
      React.createElement("img", { src: orange, alt: "Orange", className: "apple" }),
      React.createElement("img", { src: orange, alt: "Orange", className: "apple" }),
      React.createElement("img", { src: orange, alt: "Orange", className: "apple" })
    )
  );
}
window.AppleImage=AppleImage;