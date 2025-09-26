import React from "react";
import "./option.css";
import ErrorMessage from "./ErrorMessage";
import { playClick } from "./PlayAudio";
import AppleMessage from "./AppleMessage";
const AppleOption = ({
  options,
  correctOption,
  boxResultSet,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxResultTwo,
  boxResultThree,
  showErrorOne,
  showErrorTwo,
  flag
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
          (stepTwo && boxResultTwo === correctOption[1]) 
            ? "correct"
            : (stepOne && boxResultOne !== "") ||
              (stepTwo && boxResultTwo !== "")
            ? "wrong"
            : ""
        }`}
      >
        {showErrorOne && stepOne && (
          <AppleMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            boxResultOne={boxResultOne}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )}
        {showErrorTwo && stepTwo && (
          <AppleMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            boxResultOne={boxResultTwo}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )}
      </div>
      <div className="option-grid">
        <button
          className={`option-button${
            boxResultTwo === correctOption[1] ? " option-correct-disabled" : ""
          }`}
          onClick={() => handleOptionClick(correctOption[1])}
          disabled={isDisabled || boxResultOne === correctOption[1]}
        >
          {renderOption(options[0])}
        </button>
        <button
          className="option-button"
          onClick={() => handleOptionClick(options[1])}
          disabled={isDisabled}
        >
          {renderOption(options[1])}
        </button>
        <button
          className={`option-button${
            boxResultOne === correctOption[0] ? " option-correct-disabled" : ""
          }`}
          onClick={() => handleOptionClick(correctOption[0])}
          disabled={isDisabled || boxResultOne === correctOption[0]}
        >
          {renderOption(options[2])}
        </button>
        <button
          className="option-button"
          onClick={() => handleOptionClick(options[3])}
          disabled={isDisabled}
        >
          {renderOption(options[3])}
        </button>
      </div>
    </div>
  );
};

export default AppleOption;
