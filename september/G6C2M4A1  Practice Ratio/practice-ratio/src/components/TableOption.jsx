import React from "react";
import "./option.css";
import ErrorMessage from "./ErrorMessage";
import { playClick } from "./PlayAudio";
import TableMessage from "./TableMessage";
const TableOption = ({
  options,
  correctOption,
  flag,
  boxResultSet,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxResultTwo,
  boxResultThree,
  showErrorOne,
  showErrorTwo,
  showErrorThree,
}) => {
  const handleOptionClick = (option) => {
    boxResultSet(option);
  };
  // Only enable buttons if stepOne, stepTwo, or stepThree is active
  const isDisabled = !(stepOne || stepTwo || stepThree);
  // Helper to render fraction if value is in a/b form
  const renderOption = (value) => {
    if (typeof value === "string" && value.match(/^\d+\/\d+$/)) {
      const [num, denom] = value.split("/");
      return (
        <span className="option-fraction">
          {num}
          <span className="fraction-line"></span>
          {denom}
        </span>
      );
    }
    return value;
  };
  return (
    <div className="option-container">
      <div
        className={`feedback-box ${
          (stepOne && boxResultOne === correctOption[0]) ||
          (stepTwo && boxResultTwo === correctOption[1]) ||
          (stepThree && boxResultThree === correctOption[2])
            ? "correct"
            : (stepOne && boxResultOne !== "") ||
              (stepTwo && boxResultTwo !== "") ||
              (stepThree && boxResultThree !== "")
            ? "wrong"
            : ""
        }`}
      >
        {showErrorOne && stepOne && (
          <TableMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
            boxResultOne={boxResultOne}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )}
        {showErrorTwo && stepTwo && (
          <TableMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
            boxResultOne={boxResultTwo}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )}
        {showErrorThree && stepThree && (
          <TableMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
            boxResultOne={boxResultThree}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )}
      </div>
      <div className="option-grid">
        <button
          className={`option-button${
            boxResultOne === correctOption[0] ? " option-correct-disabled" : ""
          }`}
          onClick={() => handleOptionClick(correctOption[0])}
          disabled={isDisabled || boxResultOne === correctOption[0]}
        >
          {renderOption(options[0])}
        </button>
        <button
          className={`option-button${
            boxResultTwo === correctOption[1] ? " option-correct-disabled" : ""
          }`}
          onClick={() => handleOptionClick(correctOption[1])}
          disabled={isDisabled || boxResultTwo === correctOption[1]}
        >
          {renderOption(options[1])}
        </button>
        <button
          className="option-button"
          onClick={() => handleOptionClick(options[2])}
          disabled={isDisabled}
        >
          {renderOption(options[2])}
        </button>
        <button
          className={`option-button${
            boxResultThree === correctOption[2]
              ? " option-correct-disabled"
              : ""
          }`}
          onClick={() => handleOptionClick(correctOption[2])}
          disabled={isDisabled || boxResultThree === correctOption[2]}
        >
          {renderOption(options[3])}
        </button>
        <button
          className="option-button"
          onClick={() => handleOptionClick(options[4])}
          disabled={isDisabled}
        >
          {renderOption(options[4])}
        </button>
        <button
          className="option-button"
          onClick={() => handleOptionClick(options[5])}
          disabled={isDisabled}
        >
          {renderOption(options[5])}
        </button>
      </div>
    </div>
  );
};

export default TableOption;
