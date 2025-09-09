const { useState } = React;

const number = [
  [5, 3],
  [8, 6],
  [6, 6],
  [4, 0],
  [7, 7],
  [3, 0],
  [7, 1],
];

function Outlet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [main, setMain] = useState(false);

  const handleStart = () => {
    setStart(false);
    setMain(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 === number.length) {
      window.location.reload();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setMain(false);
    setStart(true);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setMain(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setMain(false);
      setStart(true);
    }
  };

  return React.createElement(
    "div",
    { className: "outlet" },
    start &&
      React.createElement(StartPage, {
        onClose: handleStart,
        number: number[currentIndex],
      }),
    main &&
      React.createElement(MainPage, {
        number: number[currentIndex],
        onPrev: handlePrev,
        onNext: handleNext,
      })
  );
}
window.Outlet=Outlet;