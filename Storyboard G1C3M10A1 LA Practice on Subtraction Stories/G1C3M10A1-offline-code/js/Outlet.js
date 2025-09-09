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
  const imageone="assets/imageone.png"
  const imagetwo="assets/imagetwo.png"
  const imagethree="assets/imagethree.png"
  const handleFirst = () => { setFirst(false); setFrameOne(true); };
  const handleFrameOne = () => { setFrameOne(false); setSentanceOne(true); };
  const handleSentanceOne = () => { setSentanceOne(false); setSecond(true); };
  const handleSecond = () => { setSecond(false); setFrameTwo(true); };
  const handleFrameTwo = () => { setFrameTwo(false); setSentanceTwo(true); };
  const handleSentanceTwo = () => { setSentanceTwo(false); setThird(true); };
  const handleThird = () => { setThird(false); setFrameThree(true); };
  const handleFrameThird = () => { setFrameThree(false); setSentanceThree(true); };
  const handlePrevFramOne = () => { setFrameOne(false); setFirst(true); };
  const handlePrevFramTwo = () => { setFrameTwo(false); setSecond(true); };
  const handlePrevFramThree = () => { setFrameThree(false); setThird(true); };
  const handlePrevOne = () => { setSentanceOne(false); setFrameOne(true); };
  const handlePrevTwo = () => { setSentanceTwo(false); setFrameTwo(true); };
  const handlePrevThree = () => { setSentanceThree(false); setFrameThree(true); };

  return React.createElement(
    "div",
    { className: "outlet" },
    // first question
    first && React.createElement(Page, { onClose: handleFirst, imageSrc: imageone }),
    frameOne && React.createElement(Frame, {
      onNext: handleFrameOne,
      prev: handlePrevFramOne,
      imageSrc: imageone,
      number: [6, 2, 4],
      storyTextKey: "storyOneText",
      optionKeys: [
        ["storyOne.optionOne","storyOne.optionTwo","storyOne.optionThree","storyOne.optionFour"],
        ["storyOne.optionFive","storyOne.optionSix","storyOne.optionSeven","storyOne.optionEight"],
        ["storyOne.optionNine","storyOne.optionTen","storyOne.optionEleven","storyOne.optionTweleve"],
      ],
      width:"30vw",
      gap:"2vw"
    }),
    sentanceOne && React.createElement(SubtractionSentanceOne, {
      onNext: handleSentanceOne,
      correctNumber: ["6","2","4"],
      imageSrc: imageone,
      storyTextKey: "storyOneText",
      prev: handlePrevOne,
    }),

    // second question
    second && React.createElement(Page, { onClose: handleSecond, imageSrc: imagetwo }),
    frameTwo && React.createElement(Frame, {
      onNext: handleFrameTwo,
      prev: handlePrevFramTwo,
      imageSrc: imagetwo,
      storyTextKey: "storyTwoText",
      optionKeys: [
        ["storyTwo.optionOne","storyTwo.optionTwo","storyTwo.optionThree","storyTwo.optionFour"],
        ["storyTwo.optionFive","storyTwo.optionSix","storyTwo.optionSeven","storyTwo.optionEight"],
        ["storyTwo.optionNine","storyTwo.optionTen","storyTwo.optionEleven","storyTwo.optionTweleve"],
      ],
      width: "34vw",
      gap: "1vw",
    }),
    sentanceTwo && React.createElement(SubtractionSentanceOne, {
      onNext: handleSentanceTwo,
      prev: handlePrevTwo,
      correctNumber: ["6","4","2"],
      imageSrc: imagetwo,
      storyTextKey: "storyTwoText",
    }),

    // third question
    third && React.createElement(Page, { onClose: handleThird, imageSrc: imagethree }),
    frameThree && React.createElement(Frame, {
      onNext: handleFrameThird,
      prev: handlePrevFramThree,
      imageSrc: imagethree,
      storyTextKey: "storyThreeText",
      optionKeys: [
        ["storyThree.optionOne","storyThree.optionTwo","storyThree.optionThree","storyThree.optionFour"],
        ["storyThree.optionFive","storyThree.optionSix","storyThree.optionSeven","storyThree.optionEight"],
        ["storyThree.optionNine","storyThree.optionTen","storyThree.optionEleven","storyThree.optionTweleve"],
      ],
      width: "30vw",
      gap: "3vw",
    }),
    sentanceThree && React.createElement(SubtractionSentanceOne, {
      correctNumber: ["6","1","5"],
      prev: handlePrevThree,
      imageSrc: imagethree,
      storyTextKey: "storyThreeText",
      flag: "true",
    })
  );
};
window.Outlet=Outlet;
