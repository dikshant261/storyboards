const Outlet = () => {
  const [first, setFirst] = React.useState(true);
  const [frameOne, setFrameOne] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [frameTwo, setFrameTwo] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [frameThree, setFrameThree] = React.useState(false);
  const [sentanceOne, setSentanceOne] = React.useState(false);
  const [sentanceTwo, setSentanceTwo] = React.useState(false);
  const [sentanceThree, setSentanceThree] = React.useState(false);

  const handleFirst = () => {
    setFirst(false);
    setFrameOne(true);
  };

  const handleFrameOne = () => {
    setFrameOne(false);
    setSentanceOne(true);
  };

  const handleSentanceOne = () => {
    setSentanceOne(false);
    setSecond(true);
  };

  const handleSecond = () => {
    setSecond(false);
    setFrameTwo(true);
  };

  const handleFrameTwo = () => {
    setFrameTwo(false);
    setSentanceTwo(true);
  };

  const handleSentanceTwo = () => {
    setSentanceTwo(false);
    setThird(true);
  };

  const handleThird = () => {
    setThird(false);
    setFrameThree(true);
  };

  const handleFrameThird = () => {
    setFrameThree(false);
    setSentanceThree(true);
  };

  return React.createElement(
    "div",
    { className: "outlet" },
    // first question
    first && React.createElement(window.FirstPage, { onClose: handleFirst }),
    frameOne && React.createElement(window.FrameOne, { onNext: handleFrameOne }),
    sentanceOne &&
      React.createElement(window.SubtractionSentanceOne, {
        onNext: handleSentanceOne,
      }),

    // second question
    second && React.createElement(window.SecondPage, { onClose: handleSecond }),
    frameTwo && React.createElement(window.FrameTwo, { onNext: handleFrameTwo }),
    sentanceTwo &&
      React.createElement(window.SubtractionSentanceTwo, {
        onNext: handleSentanceTwo,
      }),

    // third question
    third && React.createElement(window.ThirdPage, { onClose: handleThird }),
    frameThree &&
      React.createElement(window.FrameThird, { onNext: handleFrameThird }),
    sentanceThree && React.createElement(window.SubtractionSentanceThree, null)
  );
};

window.Outlet = Outlet;
