function Fraction({ value }) {
  const [numerator, denominator] = value.split("/");
  return React.createElement(
    "span",
    {
      style: {
        display: "inline-block",
        textAlign: "center",
        marginRight: "1vw",
      },
    },
    React.createElement(
      "span",
      { style: { display: "block", lineHeight: "1" } },
      numerator
    ),
    React.createElement(
      "span",
      {
        style: { borderTop: "0.3vw solid", display: "block", lineHeight: "1" },
      },
      denominator
    )
  );
}

const FractionMatch = function ({ setShowError, setShowSuccess, setFinal }) {
  const upperArrayInit = [
    { id: 1, upper: "1/5 of 20", answer: 4 },
    { id: 2, upper: "4/6 of 30", answer: 20 },
    { id: 3, upper: "2/3 of 12", answer: 8 },
    { id: 4, upper: "5/6 of 36", answer: 30 },
    { id: 5, upper: "3/4 of 16", answer: 12 },
  ];

  const lowerArrayInit = [
    { id: 1, lower: 30 },
    { id: 2, lower: 4 },
    { id: 3, lower: 12 },
    { id: 4, lower: 20 },
    { id: 5, lower: 8 },
  ];

  const [upperArray] = useState(upperArrayInit);
  const [lowerArray] = useState(lowerArrayInit);
  const [selectedUpper, setSelectedUpper] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  useEffect(() => {
    if (matchedPairs.length === upperArray.length) setFinal(true);
  }, [matchedPairs, upperArray.length, setFinal]);

  const handleUpperClick = (item) => {
    if (matchedPairs.find((pair) => pair.upperId === item.id)) return;
    setSelectedUpper(item);
    if (wrongPair) setWrongPair(null);
    playClick();
    setShowError(false);
    setShowSuccess(false);
  };

  const handleLowerClick = (lowerItem) => {
    if (!selectedUpper) return;
    if (matchedPairs.find((pair) => pair.lowerId === lowerItem.id)) return;

    if (selectedUpper.answer === lowerItem.lower) {
      setMatchedPairs((prev) => [
        ...prev,
        { upperId: selectedUpper.id, lowerId: lowerItem.id },
      ]);
      setSelectedUpper(null);
      setWrongPair(null);
      playCorrect();
      setShowSuccess(true);
    } else {
      setWrongPair({ upperId: selectedUpper.id, lowerId: lowerItem.id });
      setSelectedUpper(null);
      playWrong();
      setShowError(true);
    }
  };

  const getMatchedLower = (upperId) => {
    const pair = matchedPairs.find((p) => p.upperId === upperId);
    if (!pair) return null;
    return lowerArray.find((l) => l.id === pair.lowerId);
  };

  // RENDER UPPER ROW
  const upperRow = React.createElement(
    "div",
    { className: "card-row upper-row" },
    upperArray.map((item) => {
      const isMatched = matchedPairs.some((p) => p.upperId === item.id);
      const isWrong = wrongPair && wrongPair.upperId === item.id;

      const children = [
        isMatched
          ? React.createElement(
              "span",
              { key: "check", className: "check-icon" },
              "✓"
            )
          : null,
        item.upper.match(/^(\d+)\/(\d+) of (.+)$/)
          ? [
              React.createElement(Fraction, {
                key: "fraction",
                value: item.upper.match(/^(\d+)\/(\d+)/)[0],
              }),
              " of ",
              item.upper.match(/^(\d+)\/(\d+) of (.+)$/)[3],
            ]
          : item.upper,
      ];

      return React.createElement(
        "div",
        {
          key: item.id,
          className: `card upper${
            selectedUpper?.id === item.id ? " selected" : ""
          }${isMatched ? " matched" : ""}${isWrong ? " wrong" : ""}`,
          onClick: () => handleUpperClick(item),
          style: {
            pointerEvents: isMatched ? "none" : "auto",
            order: isMatched ? -1 : item.id,
          },
        },
        children
      );
    })
  );

  // RENDER LOWER ROW
  const lowerRow = React.createElement(
    "div",
    { className: "card-row lower-row" },
    lowerArray.map((item) => {
      const isMatched = matchedPairs.some((p) => p.lowerId === item.id);
      const isWrong = wrongPair && wrongPair.lowerId === item.id;

      return React.createElement(
        "div",
        {
          key: item.id,
          className: `card lower${isMatched ? " matched" : ""}${
            isWrong ? " wrong" : ""
          }`,
          onClick: () => handleLowerClick(item),
          style: {
            pointerEvents: isMatched ? "none" : "auto",
            order: isMatched ? -1 : item.id,
          },
        },
        [
          item.lower,
          isMatched
            ? React.createElement(
                "span",
                { key: "check", className: "check-icon" },
                "✓"
              )
            : null,
        ]
      );
    })
  );

  return React.createElement(
    "div",
    { className: "game-container" },
    upperRow,
    lowerRow
  );
};

window.FractionMatch = FractionMatch;
