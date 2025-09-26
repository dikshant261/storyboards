import React from "react";
import "./option.css";
const Option = ({ question, response, answer }) => {
  const correct = `${question[0]}/${question[1]}`;

  const isCorrect = answer === correct;

  const getOptionClass = (val) => {
    if (!answer) return "option-button";
    if (isCorrect) {
      if (val === correct) return "option-button option-correct";
      return "option-button option-disabled";
    }
    if (val === answer) return "option-button option-wrong option-disabled";
    return "option-button";
  };

  // Track which wrong options have been clicked (permanently disable them)
  const [disabledOptions, setDisabledOptions] = React.useState([]);

  React.useEffect(() => {
    if (answer && answer !== correct && !disabledOptions.includes(answer)) {
      setDisabledOptions((prev) => [...prev, answer]);
    }
    // Reset on new question
    if (!answer) setDisabledOptions([]);
    // eslint-disable-next-line
  }, [answer, correct]);

  const isOptionDisabled = (val) => {
    if (isCorrect) return true;
    if (disabledOptions.includes(val)) return true;
    return false;
  };

  const handleClick = (num) => {
    if (!isOptionDisabled(num)) response(num);
  };

  return (
    <div className="option-container">
      <div
        className={getOptionClass(question[1])}
        onClick={() =>
          !isOptionDisabled(question[1]) && handleClick(question[1])
        }
        style={isOptionDisabled(question[1]) ? { pointerEvents: "none" } : {}}
      >
        {question[1]}
      </div>
      <div
        className={getOptionClass(correct)}
        onClick={() => !isOptionDisabled(correct) && handleClick(correct)}
        style={isOptionDisabled(correct) ? { pointerEvents: "none" } : {}}
      >
        <span className="option-fraction">
          <span>{question[0]}</span>
          <span className="option-fraction-line"></span>
          <span>{question[1]}</span>
        </span>
      </div>
      <div
        className={getOptionClass(question[2])}
        onClick={() =>
          !isOptionDisabled(question[2]) && handleClick(question[2])
        }
        style={isOptionDisabled(question[2]) ? { pointerEvents: "none" } : {}}
      >
        {question[2]}
      </div>
    </div>
  );
};

export default Option;
