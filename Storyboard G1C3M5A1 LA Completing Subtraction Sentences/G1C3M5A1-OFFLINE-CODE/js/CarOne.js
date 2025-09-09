function CarOne({ totalCars = 5, crossCars = 4 }) {
  const car="assets/car.png";  
  // Make array of cars
  const carsArray = Array(totalCars).fill(0);

  return React.createElement(
    "div",
    { className: "car-grid" },
    carsArray.map((_, idx) => {
      const isCrossCar = idx >= totalCars - crossCars; // last N cars get cross
      return React.createElement(
        "div",
        {
          key: idx,
          style: {
            position: "relative",
            display: "inline-block",
            animationDelay: `${(idx + 1) * 0.3}s`,
          },
          className: "car-wrapper",
        },
        React.createElement("img", { src: car, alt: "car", className: "car" }),
        isCrossCar &&
          React.createElement(
            "div",
            { className: "cros-align" },
            React.createElement(CrossIcon, null)
          )
      );
    })
  );
}
window.CarOne=CarOne;