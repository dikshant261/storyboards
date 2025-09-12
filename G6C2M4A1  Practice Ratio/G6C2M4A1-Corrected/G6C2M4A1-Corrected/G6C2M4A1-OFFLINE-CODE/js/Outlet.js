const Outlet = () => {
  const [start, setStart] = React.useState(true);
  const [main, setMain] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [fourth, setFourth] = React.useState(false);
  const [five, setFive] = React.useState(false);
  const [nextPart, setNextPart] = React.useState(false);
  const [seven, setSeven] = React.useState(false);
  const [six, setSix] = React.useState(false);
  const [eight, setEight] = React.useState(false);
  const [nine, setNine] = React.useState(false);
  const [ten, setTen] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const handleStartClose = () => { setStart(false); setMain(true); };
  const handlePrevOne = () => { setMain(false); setStart(true); };
  const handleNext = () => { setMain(false); setSecond(true); };
  const handlePrevTwo = () => { setSecond(false); setMain(true); };
  const handleNextTwo = () => { setSecond(false); setThird(true); };
  const handlePrevThree = () => { setThird(false); setSecond(true); };
  const handleNextThree = () => { setThird(false); setFourth(true); };
  const handlePrevFour = () => { setFourth(false); setThird(true); };
  const handleNextFour = () => { setFourth(false); setFive(true); };
  const handlePrevFive = () => { setFive(false); setFourth(true); };
  const handleNextFive = () => { setFive(false); setNextPart(true); };
  const handleNextSix = () => { setNextPart(false); setSix(true); };
  const handleNextSeven = () => { setSix(false); setSeven(true); };
  const handlePrevSix = () => { setSix(false); setNextPart(true); };
  const handleNextEight = () => { setSeven(false); setEight(true); };
  const handlePrevSeven = () => { setSeven(false); setSix(true); };
  const handleNextNine = () => { setEight(false); setNine(true); };
  const handlePrevEight = () => { setEight(false); setSeven(true); };
  const handleNextTen = () => { setNine(false); setTen(true); };
  const handlePrevNine = () => { setNine(false); setEight(true); };
  const handleNextEleven = () => { setTen(false); setEnd(true); };
  const handlePrevTen = () => { setTen(false); setNine(true); };

  return React.createElement(
    "div",
    { className: "outlet" },
    start && React.createElement(StartPage, { onClose: handleStartClose }),
    main && React.createElement(Main, {
      onNext: handleNext,
      onPrev: handlePrevOne,
      options: ["3:2", "3 to 2", "2 to 3", "3/2", "2/3", "2:3"],
      correctOption: ["3:2", "3 to 2", "3/2"]
    }),
    second && React.createElement(MainTwo, {
      onNext: handleNextTwo,
      onPrev: handlePrevTwo,
      options: ["6:2", "6 to 2", "2 to 6", "6/2", "2/6", "2:6"],
      correctOption: ["6:2", "6 to 2", "6/2"]
    }),
    third && React.createElement(MainThree, {
      onNext: handleNextThree,
      onPrev: handlePrevThree,
      questionHeading: t("emptyChairsHeading"),
      question: t("questionTwo"),
      options: ["6:2", "6 to 2", "2 to 6", "6/2", "2/6", "2:6"],
      correctOption: ["6:2", "6 to 2", "6/2"]
    }),
    fourth && React.createElement(MainThree, {
      onNext: handleNextFour,
      onPrev: handlePrevFour,
      questionHeading: t("questionThreeHeading"),
      question: t("questionThree"),
      options: ["9:7", "9 to 7", "7 to 9", "9/7", "7/9", "7:9"],
      correctOption: ["9:7", "9 to 7", "9/7"],
      flag: 1
    }),
    five && React.createElement(MainThree, {
      onNext: handleNextFive,
      onPrev: handlePrevFive,
      questionHeading: t("questionFourHeading"),
      question: t("questionFour"),
      options: ["7:9", "7 to 9", "9 to 7", "7/9", "9/7", "9:7"],
      correctOption: ["7:9", "7 to 9", "7/9"],
      flag: 2
    }),
    nextPart && React.createElement(RepersentinRatio, { onNext: handleNextSix }),
    six && React.createElement(MainFour, {
      onNext: handleNextSeven,
      onPrev: handlePrevSix,
      boxOneHeading: t("ratioApple"),
      boxTwoHeading: t("rationOrange"),
      questionHeading: t("repreSenting_ratios"),
      options: ["4:5", "5:10", "5:4", "4:10"],
      correctOption: ["5:4", "4:5"]
    }),
    seven && React.createElement(MainFive, {
      onNext: handleNextEight,
      onPrev: handlePrevSeven,
      questionHeading: t("repreSenting_ratios"),
      options: ["7:3", "3:10", "3:7", "7:10"],
      correctOption: ["3:7", "7:3"],
      flag: 1
    }),
    eight && React.createElement(MainSix, {
      onNext: handleNextNine,
      onPrev: handlePrevEight,
      question: t("questionFive"),
      boxOneHeading: t("ratioBoys"),
      boxTwoHeading: t("ratioGirl"),
      questionHeading: t("repreSenting_ratios"),
      options: ["9/14", "9/23", "14/9", "14/23"],
      correctOption: ["9/14", "14/9"],
      flag: 2
    }),
    nine && React.createElement(MainSix, {
      onNext: handleNextTen,
      onPrev: handlePrevNine,
      question: t("questionSix"),
      boxOneHeading: t("rationBanana"),
      boxTwoHeading: t("ratioOrange"),
      questionHeading: t("repreSenting_ratios"),
      options: ["16 to 19", "16 to 35", "19 to 16", "19 to 35"],
      correctOption: ["19 to 16", "16 to 19"],
      flag: 3
    }),
    ten && React.createElement(MainSix, {
      onNext: handleNextEleven,
      onPrev: handlePrevTen,
      question: t("questionSeven"),
      boxOneHeading: t("ratioStudent"),
      boxTwoHeading: t("ratioPlaground"),
      questionHeading: t("repreSenting_ratios"),
      options: ["32:25", "32:57", "25:32", "25:57"],
      correctOption: ["25:32", "32:25"],
      flag: 4
    }),
    end && React.createElement(ActivityComplete, null)
  );
};
window.Outlet=Outlet;