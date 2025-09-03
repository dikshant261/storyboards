const Outlet = () => {
  const [first, setFirst] = React.useState(true);
  const [frameOne, setFrameOne] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [frameTwo, setFrameTwo] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [frameThree, setFrameThree] = React.useState(false);

  const handleFirst = () => {
    setFirst(false);
    setFrameOne(true);
  };
  const handlePrev = () => {
    setFrameOne(false);
    setFirst(true);
  };
  const handlePrevOne = () => {
    setFrameTwo(false);
    setSecond(true);
  };
  const handlePrevTwo = () => {
    setFrameThree(false);
    setThird(true);
  };
  const handleFrameOne = () => {
    setFrameOne(false);
    setSecond(true);
  };
  const handleSecond = () => {
    setSecond(false);
    setFrameTwo(true);
  };
  const handleFrameTwo = () => {
    setFrameTwo(false);
    setThird(true);
  };
  const handleThird = () => {
    setThird(false);
    setFrameThree(true);
  };

  return React.createElement(
    "div",
    { className: "outlet" },
    first &&
      React.createElement(FirstPage, {
        onClose: handleFirst,
        imageSrc: "assets/imageone.png",
        number: [6, 2, 4],
      }),
    frameOne &&
      React.createElement(FrameOne, {
        onNext: handleFrameOne,
        onPrev: handlePrev,
        imageSrc: "assets/imageone.png",
        number: [6, 2, 4],
        storyTextKey: "storyOneText",
        optionKeys: [
          [
            "storyOne.optionOne",
            "storyOne.optionTwo",
            "storyOne.optionThree",
            "storyOne.optionFour",
          ],
          [
            "storyOne.optionFive",
            "storyOne.optionSix",
            "storyOne.optionSeven",
            "storyOne.optionEight",
          ],
          [
            "storyOne.optionNine",
            "storyOne.optionTen",
            "storyOne.optionEleven",
            "storyOne.optionTweleve",
          ],
        ],
        width:"30vw",
        gap:"2vw"
      }),
    second &&
      React.createElement(FirstPage, {
        onClose: handleSecond,
        imageSrc: "assets/imagetwo.png",
        number: [6, 4, 2],
      }),
    frameTwo &&
      React.createElement(FrameOne, {
        onNext: handleFrameTwo,
        imageSrc: "assets/imagetwo.png",
        onPrev: handlePrevOne,
        number: [6, 4, 2],
        storyTextKey: "storyTwoText",
        optionKeys: [
          [
            "storyTwo.optionOne",
            "storyTwo.optionTwo",
            "storyTwo.optionThree",
            "storyTwo.optionFour",
          ],
          [
            "storyTwo.optionFive",
            "storyTwo.optionSix",
            "storyTwo.optionSeven",
            "storyTwo.optionEight",
          ],
          [
            "storyTwo.optionNine",
            "storyTwo.optionTen",
            "storyTwo.optionEleven",
            "storyTwo.optionTweleve",
          ],
        ],
        width: "34vw",
        gap: "1vw",
      }),
    third &&
      React.createElement(FirstPage, {
        onClose: handleThird,
        imageSrc: "assets/imagethree.png",
        number: [6, 1, 5],
      }),
    frameThree &&
      React.createElement(FrameOne, {
        imageSrc: "assets/imagethree.png",
        onPrev: handlePrevTwo,
        number: [6, 1, 5],
        storyTextKey: "storyThreeText",
        optionKeys: [
          [
            "storyThree.optionOne",
            "storyThree.optionTwo",
            "storyThree.optionThree",
            "storyThree.optionFour",
          ],
          [
            "storyThree.optionFive",
            "storyThree.optionSix",
            "storyThree.optionSeven",
            "storyThree.optionEight",
          ],
          [
            "storyThree.optionNine",
            "storyThree.optionTen",
            "storyThree.optionEleven",
            "storyThree.optionTweleve",
          ],
        ],
        width: "30vw",
        gap: "3vw",
        flag: "true",
      })
  );
};
window.Outlet = Outlet;
