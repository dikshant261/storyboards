import React, { useEffect, useState } from "react";
import "./FractionMatch.css";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
function Fraction({
  value
}) {
  // value: "1/5"
  const [numerator, denominator] = value.split("/");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      textAlign: "center",
      marginRight: "1vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      lineHeight: "1"
    }
  }, numerator), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: "0.3vw solid",
      display: "block",
      lineHeight: "1"
    }
  }, denominator));
}
const FractionMatch = ({
  setShowError,
  setShowSuccess,
  setFinal
}) => {
  const upperArrayInit = [{
    id: 1,
    upper: "1/5 of 20",
    answer: 4
  }, {
    id: 2,
    upper: "4/6 of 30",
    answer: 20
  }, {
    id: 3,
    upper: "2/3 of 12",
    answer: 8
  }, {
    id: 4,
    upper: "5/6 of 36",
    answer: 30
  }, {
    id: 5,
    upper: "3/4 of 16",
    answer: 12
  }];
  const lowerArrayInit = [{
    id: 1,
    lower: 30
  }, {
    id: 2,
    lower: 4
  }, {
    id: 3,
    lower: 12
  }, {
    id: 4,
    lower: 20
  }, {
    id: 5,
    lower: 8
  }];
  const [upperArray] = useState(upperArrayInit);
  const [lowerArray] = useState(lowerArrayInit);
  const [selectedUpper, setSelectedUpper] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]); // [{upperId, lowerId}]
  const [wrongPair, setWrongPair] = useState(null);
  useEffect(() => {
    if (matchedPairs.length === upperArray.length) {
      setFinal(true);
    }
  }, [matchedPairs, upperArray.length, setFinal]);
  const handleUpperClick = item => {
    if (matchedPairs.find(pair => pair.upperId === item.id)) return;
    setSelectedUpper(item);
    if (wrongPair) setWrongPair(null);
    playClick();
    setShowError(false);
    setShowSuccess(false);
  };
  const handleLowerClick = lowerItem => {
    if (!selectedUpper) return;
    if (matchedPairs.find(pair => pair.upperId === selectedUpper.id)) return;
    if (selectedUpper.answer === lowerItem.lower) {
      setMatchedPairs(prev => [...prev, {
        upperId: selectedUpper.id,
        lowerId: lowerItem.id
      }]);
      setSelectedUpper(null);
      setWrongPair(null);
      playCorrect();
      setShowSuccess(true);
    } else {
      setWrongPair({
        upperId: selectedUpper.id,
        lowerId: lowerItem.id
      });
      setSelectedUpper(null);
      playWrong();
      setShowError(true);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "game-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-row"
  }, [
  // Matched cards in order of matching
  ...matchedPairs.map(pair => upperArray.find(u => u.id === pair.upperId)),
  // Unmatched cards in their original order
  ...upperArray.filter(item => !matchedPairs.some(pair => pair.upperId === item.id))].map(item => {
    const isMatched = matchedPairs.some(p => p.upperId === item.id);
    const isWrong = wrongPair && wrongPair.upperId === item.id;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: `card upper${selectedUpper?.id === item.id ? " selected" : ""}${isMatched ? " matched" : ""}${isWrong ? " wrong" : ""}`,
      onClick: () => handleUpperClick(item),
      style: isMatched ? {
        transform: "translateX(0)",
        animation: "moveLeft 0.8s ease forwards",
        pointerEvents: "none"
      } : {}
    }, isMatched && /*#__PURE__*/React.createElement("span", {
      className: "check-icon",
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        color: "white",
        fontSize: "1.5em",
        fontWeight: "bold",
        zIndex: "2",
        background: "rgb(0, 0, 0, 0.5)",
        width: "15vw",
        height: "21vh",
        borderRadius: "1vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }, "\u2713"), item.upper.match(/^(\d+)\/(\d+) of (.+)$/) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Fraction, {
      value: item.upper.match(/^(\d+)\/(\d+)/)[0]
    }), " of", " ", item.upper.match(/^(\d+)\/(\d+) of (.+)$/)[3]) : item.upper);
  })), /*#__PURE__*/React.createElement("div", {
    className: "card-row"
  }, [
  // Matched cards in order of matching
  ...matchedPairs.map(pair => lowerArray.find(l => l.id === pair.lowerId)),
  // Unmatched cards in their original order
  ...lowerArray.filter(item => !matchedPairs.some(pair => pair.lowerId === item.id))].map(item => {
    const isMatched = matchedPairs.some(pair => pair.lowerId === item.id);
    const isWrong = wrongPair && wrongPair.lowerId === item.id;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: `card lower${isMatched ? " matched" : ""}${isWrong ? " wrong" : ""}`,
      onClick: () => isMatched ? undefined : handleLowerClick(item),
      style: isMatched ? {
        transform: "translateX(0)",
        animation: "moveLeft 0.8s ease forwards",
        pointerEvents: "none"
      } : {}
    }, isMatched && /*#__PURE__*/React.createElement("span", {
      className: "check-icon",
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        color: "white",
        fontSize: "1.5em",
        fontWeight: "bold",
        zIndex: "2",
        background: "rgb(0, 0, 0, 0.5)",
        width: "15vw",
        height: "21vh",
        borderRadius: "1vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }, "\u2713"), item.lower);
  })));
};
export default FractionMatch;