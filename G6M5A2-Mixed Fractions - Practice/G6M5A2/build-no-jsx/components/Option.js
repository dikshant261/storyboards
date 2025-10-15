import React, { useState } from "react";
import "./option.css";
import { playCorrect, playWrong } from "./PlayAudio";
const Option = ({
  response,
  setNext,
  question
}) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [wrongIndexes, setWrongIndexes] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedBack, setFeedback] = useState("");
  const handleClick = (item, index) => {
    if (isAnswered) return; // stop clicks after correct answer

    setFeedback(item.feedback);
    response({
      option: item.option,
      isCorrected: item.isCorrected
    });
    if (item.isCorrected) {
      // ✅ Correct answer
      playCorrect();
      setIsAnswered(true);
      setNext(true);
      setClickedIndex(index);
    } else {
      // ❌ Wrong answer
      playWrong();

      // turn previous wrong to gray, keep new one salmon
      setWrongIndexes(prev => {
        // add this wrong button index if not already
        const updated = [...prev, index];
        return updated;
      });
      setClickedIndex(index);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "option-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-align"
  }, question.quotient.map((item, index) => {
    let background = "var(--secondary-color)";
    let disabled = false;
    if (isAnswered) {
      // ✅ Correct answer clicked — disable all
      disabled = true;
      if (item.isCorrected) background = "green";else background = "salmon";
    } else {
      // Before correct answer found
      if (wrongIndexes.includes(index)) background = "gray"; // previous wrongs
      if (clickedIndex === index && !item.isCorrected) background = "salmon"; // last wrong
      if (item.isCorrected && clickedIndex === index) background = "green"; // correct
      disabled = wrongIndexes.includes(index); // disable wrong ones permanently
    }
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      onClick: () => handleClick(item, index),
      disabled: disabled,
      style: {
        backgroundColor: background,
        color: "#fff",
        border: "none",
        padding: "1vh 1.5vw",
        margin: "1vh",
        borderRadius: "0.5vw",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.3s ease"
      }
    }, item.option);
  })), feedBack && /*#__PURE__*/React.createElement("p", {
    className: "feedback",
    style: {
      background: isAnswered ? "green" : "salmon"
    }
  }, feedBack));
};
export default Option;