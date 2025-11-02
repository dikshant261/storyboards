const { useState, useEffect, useMemo } = React;
const Outlet = () => {
  const [start, setStart] = React.useState(true);
  const [main, setMain] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [fourth, setFourth] = React.useState(false);
  const [five, setFive] = React.useState(false);
  const [nextPart, setNextPart] = React.useState(false);
  const [seven, setSeven] = React.useState(false);
  const [six, setSix] = useState(false);
  const [eight, setEight] = useState(false);
  const [nine, setNine] = useState(false);
  const [ten, setTen] = useState(false);
  const [end, setEnd] = useState(false);

  const handleStartClose = () => {
    setStart(false);
    setMain(true);
  };
  const handlePrevOne = () => {
    setMain(false);
    setStart(true);
  };
  const handleNext = () => {
    setMain(false);
    setSecond(true);
  };
  const handlePrevTwo = () => {
    setSecond(false);
    setMain(true);
  };
  const handleNextTwo = () => {
    setSecond(false);
    setThird(true);
  };
  const handlePrevThree = () => {
    setThird(false);
    setSecond(true);
  };
  const handleNextThree = () => {
    setThird(false);
    setFourth(true);
  };
  const handlePrevFour = () => {
    setFourth(false);
    setThird(true);
  };
  const handleNextFour = () => {
    setFourth(false);
    setFive(true);
  };
  const handlePrevFive = () => {
    setFive(false);
    setFourth(true);
  };
  const handleNextFive = () => {
    setFive(false);
    setNextPart(true);
  };
  const handleNextSix = () => {
    setNextPart(false);
    setSix(true);
  };
  const handleNextSeven = () => {
    setSix(false);
    setSeven(true);
  };
  const handlePrevSix = () => {
    setSix(false);
    setNextPart(true);
  };
  const handleNextEight = () => {
    setSeven(false);
    setEight(true);
  };
  const handlePrevSeven = () => {
    setSeven(false);
    setSix(true);
  };
  const handleNextNine = () => {
    setEight(false);
    setNine(true);
  };
  const handlePrevEight = () => {
    setEight(false);
    setSeven(true);
  };
  const handleNextTen = () => {
    setNine(false);
    setTen(true);
  };
  const handlePrevNine = () => {
    setNine(false);
    setEight(true);
  };
  const handleNextEleven = () => {
    setTen(false);
    setEnd(true);
  };
  const handlePrevTen = () => {
    setTen(false);
    setNine(true);
  };

  return /*#__PURE__*/ React.createElement(
    "div",
    { className: "outlet" },

    // 1️⃣ Start Page
    start &&
      /*#__PURE__*/ React.createElement(StartPage, {
        onClose: handleStartClose,
      }),

    // 2️⃣ Main
    main &&
      /*#__PURE__*/ React.createElement(Main, {
        onNext: handleNext,
        onPrev: handlePrevOne,
        options: [
          "3 : 2",
          t("toOption", { num1: 3, num2: 2 }),
          t("toOption", { num1: 2, num2: 3 }),
          "3/2",
          "2/3",
          "2 : 3",
        ],
        correctOption: ["3 : 2", t("toOption", { num1: 3, num2: 2 }), "3/2"],
      }),

    // 3️⃣ Second
    second &&
      /*#__PURE__*/ React.createElement(MainTwo, {
        onNext: handleNextTwo,
        onPrev: handlePrevTwo,
        options: [
          "6 : 2",
          t("toOption", { num1: 6, num2: 2 }),
          t("toOption", { num1: 2, num2: 6 }),
          "6/2",
          "2/6",
          "2 : 6",
        ],
        correctOption: ["6 : 2", t("toOption", { num1: 6, num2: 2 }), "6/2"],
      }),

    // 4️⃣ Third
    third &&
      /*#__PURE__*/ React.createElement(MainThree, {
        onNext: handleNextThree,
        onPrev: handlePrevThree,
        questionHeading: t("emptyChairsHeading"),
        question: t("questionExtra"),
        extraHeading: t("extraHeading"),
        options: [
          "2 : 6",
          t("toOption", { num1: 2, num2: 6 }),
          t("toOption", { num1: 6, num2: 2 }),
          "2/6",
          "6/2",
          "6 : 2",
        ],
        correctOption: ["2 : 6", t("toOption", { num1: 2, num2: 6 }), "2/6"],
      }),

    // 5️⃣ Fourth
    fourth &&
      /*#__PURE__*/ React.createElement(MainThree, {
        onNext: handleNextFour,
        onPrev: handlePrevFour,
        questionHeading: t("emptyChairsHeading"),
        question: t("questionThree"),
        extraHeading: t("questionThreeHeading"),
        options: [
          "9 : 7",
          t("toOption", { num1: 9, num2: 7 }),
          t("toOption", { num1: 7, num2: 9 }),
          "9/7",
          "7/9",
          "7 : 9",
        ],
        correctOption: ["9 : 7", t("toOption", { num1: 9, num2: 7 }), "9/7"],
        flag: 1,
      }),

    // 6️⃣ Five
    five &&
      /*#__PURE__*/ React.createElement(MainThree, {
        onNext: handleNextFive,
        onPrev: handlePrevFive,
        questionHeading: t("emptyChairsHeading"),
        extraHeading: t("questionFourHeading"),
        question: t("questionFour"),
        options: [
          "7 : 9",
          t("toOption", { num1: 7, num2: 9 }),
          t("toOption", { num1: 9, num2: 7 }),
          "7/9",
          "9/7",
          "9 : 7",
        ],
        correctOption: ["7 : 9", t("toOption", { num1: 7, num2: 9 }), "7/9"],
        flag: 2,
      }),

    // 7️⃣ Next Part
    nextPart &&
      /*#__PURE__*/ React.createElement(RepersentinRatio, { onNext: handleNextSix }),

    // 8️⃣ Six
    six &&
      /*#__PURE__*/ React.createElement(MainFour, {
        onNext: handleNextSeven,
        onPrev: handlePrevSix,
        boxOneHeading: t("ratioApple"),
        boxTwoHeading: t("rationOrange"),
        questionHeading: t("repreSenting_ratios"),
        options: ["5 : 4", "5 : 10", "4 : 5", "4 : 10"],
        correctOption: ["4 : 5", "5 : 4"],
      }),

    // 9️⃣ Seven
    seven &&
      /*#__PURE__*/ React.createElement(MainFive, {
        onNext: handleNextEight,
        onPrev: handlePrevSeven,
        boxOneHeading: t("ratio_of_triangles"),
        boxTwoHeading: t("ratio_of_pentagons"),
        questionHeading: t("repreSenting_ratios"),
        options: ["7 : 3", "3 : 10", "3 : 7", "7 : 10"],
        correctOption: ["3 : 7", "7 : 3"],
        flag: 1,
      }),

    // 🔟 Eight
    eight &&
      /*#__PURE__*/ React.createElement(MainSix, {
        onNext: handleNextNine,
        onPrev: handlePrevEight,
        question: t("questionFive"),
        boxOneHeading: t("ratioBoys"),
        boxTwoHeading: t("ratioGirl"),
        questionHeading: t("repreSenting_ratios"),
        options: ["14/9", "9/23", "9/14", "14/23"],
        correctOption: ["9/14", "14/9"],
        flag: 2,
      }),

    // 1️⃣1️⃣ Nine
    nine &&
      /*#__PURE__*/ React.createElement(MainSix, {
        onNext: handleNextTen,
        onPrev: handlePrevNine,
        question: t("questionSix"),
        boxOneHeading: t("rationBanana"),
        boxTwoHeading: t("ratioOrange"),
        questionHeading: t("repreSenting_ratios"),
        options: [
          t("toOption", { num1: 16, num2: 19 }),
          "16/35",
          t("toOption", { num1: 19, num2: 16 }),
          "19/35",
        ],
        correctOption: [
          t("toOption", { num1: 19, num2: 16 }),
          t("toOption", { num1: 16, num2: 19 }),
        ],
        flag: 3,
      }),

    // 1️⃣2️⃣ Ten
    ten &&
      /*#__PURE__*/ React.createElement(MainSix, {
        onNext: handleNextEleven,
        onPrev: handlePrevTen,
        question: t("questionSeven"),
        boxOneHeading: t("ratioStudent"),
        boxTwoHeading: t("ratioPlaground"),
        questionHeading: t("repreSenting_ratios"),
        options: [
          "32 : 25",
          "32 : 57",
          "25 : 32",
          "25 : 57",
        ],
        correctOption: ["25 : 32", "32 : 25"],
        flag: 4,
      }),

    // ✅ End
    end && /*#__PURE__*/ React.createElement(ActivityComplete, null)
  );
};

window.Outlet = Outlet;
