function Outlet() {
  const [start, setStart] = React.useState(true);
  const [first, setFirst] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [four, setFour] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const handleStart = () => {
    setStart(false);
    setFirst(true);
  };
  const handleNext = () => {
    setFirst(false);
    setSecond(true);
  };
  const handlePrevOne = () => {
    setFirst(false);
    setStart(true);
  };
  const handleNextTwo = () => {
    setSecond(false);
    setThird(true);
  };
  const handlePreTwo = () => {
    setSecond(false);
    setFirst(true);
  };
  const handleNextThree = () => {
    setThird(false);
    setFour(true);
  };
  const handlePreThree = () => {
    setThird(false);
    setSecond(true);
  };
  const handlePreFour = () => {
    setFour(false);
    setThird(true);
  };
  const handleNextFour = () => {
    setFour(false);
    setEnd(true);
  };

  return React.createElement(
    "div",
    { className: "outlet" },

    start && React.createElement(StartPage, { onClose: handleStart }),

    first &&
      React.createElement(Main, {
        options: ["3:5", "5:3", "8:3", "3:8", "5:8", "8:5"],
        correctOption: ["3:5", "5:3", "3:8"],
        boxContent: [
          "marbleBoxesContent.yellowToGreen",
          "marbleBoxesContent.greenToYellow",
          "marbleBoxesContent.yellowToTotal",
        ],
        flag: 0,
        onNext: handleNext,
        onPrev: handlePrevOne,
      }),

    second &&
      React.createElement(Main, {
        options: ["4:10", "4:6", "6:4", "6:10", "10:4", "10:6"],
        correctOption: ["4:10", "4:6", "6:10"],
        boxContent: [
          "triangleBoxContent.squareToTotal",
          "triangleBoxContent.squareToTriangle",
          "triangleBoxContent.triangleToTotal",
        ],
        flag: 1,
        onNext: handleNextTwo,
        onPrev: handlePreTwo,
      }),

    third &&
      React.createElement(Main, {
        options: ["5:7", "7:12", "7:5", "5:12", "12:7", "12:5"],
        correctOption: ["5:7", "7:12", "5:12"],
        boxContent: [
          "circleBoxContent.rectanglesToCircles",
          "circleBoxContent.circleToShapes",
          "circleBoxContent.rectangleToShape",
        ],
        flag: 2,
        onNext: handleNextThree,
        onPrev: handlePreThree,
      }),

    four &&
      React.createElement(Main, {
        options: ["8:19", "11:19", "19:8", "11:8", "19:11", "8:11"],
        correctOption: ["8:19", "11:19", "11:8"],
        boxContent: [
          "chitraContent.pinkToTotal",
          "chitraContent.blueToTotal",
          "chitraContent.blueToPink",
        ],
        flag: 3,
        onNext: handleNextFour,
        onPrev: handlePreFour,
      }),

    end && React.createElement(ActivityComplete, null)
  );
}
window.Outlet=Outlet