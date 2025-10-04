import React from "react";
import "./option.css";
import { useTranslation } from "react-i18next";
import AppleMessage from "./AppleMessage";

const AppleOption = ({
  options,
  correctOption,
  boxResultSet,
  stepOne,
  stepTwo,
  boxResultOne,
  boxResultTwo,
  showErrorOne,
  showErrorTwo,
  flag,
  style,
}) => {
  const { t } = useTranslation();
  const isStepActive = stepOne || stepTwo;

  const handleOptionClick = (option) => {
    boxResultSet(option);
  };

  // render fraction if "a/b"
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

  // lock correct answers from previous steps
  const isLockedFromPreviousStep = (opt) => {
    if (boxResultOne === correctOption[0] && !stepOne && opt === correctOption[0])
      return true;
    if (boxResultTwo === correctOption[1] && !stepTwo && opt === correctOption[1])
      return true;
    return false;
  };

  const getButtonProps = (opt) => {
    let className = "option-button";
    let disabled = !isStepActive;

    // lock if correct from earlier step
    if (isLockedFromPreviousStep(opt)) {
      className += " option-locked";
      disabled = true;
      return { className, disabled };
    }

    // STEP ONE
    if (stepOne) {
      if (boxResultOne) {
        if (boxResultOne === correctOption[0]) {
          disabled = true;
          if (opt === correctOption[0]) className += " option-correct";
        } else {
          if (opt === boxResultOne) {
            disabled = true;
            className += " option-wrong";
          } else {
            disabled = false;
          }
        }
      } else {
        disabled = false;
      }
      return { className, disabled };
    }

    // STEP TWO
    if (stepTwo) {
      if (boxResultTwo) {
        if (boxResultTwo === correctOption[1]) {
          disabled = true;
          if (opt === correctOption[1]) className += " option-correct";
        } else {
          if (opt === boxResultTwo) {
            disabled = true;
            className += " option-wrong";
          } else {
            disabled = false;
          }
        }
      } else {
        disabled = false;
      }
      return { className, disabled };
    }

    return { className, disabled };
  };

  return (
    <div className="option-container">
      {/* Feedback */}
      <div
        className={`feedback-box ${
          (stepOne && boxResultOne === correctOption[0]) ||
          (stepTwo && boxResultTwo === correctOption[1])
            ? "correct"
            : (stepOne && boxResultOne) || (stepTwo && boxResultTwo)
            ? "wrong"
            : ""
        }`}
        style={{ marginBottom: "4vw" }}
      >
        {!showErrorOne && !showErrorTwo && (
          <p className="para">{t("selectCorrect")}</p>
        )}

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

      {/* Options */}
      <div className="option-grid">
        {options.map((opt, idx) => {
          const props = getButtonProps(opt);
          return (
            <button
              key={idx}
              className={props.className}
              disabled={props.disabled}
              style={style}
              onClick={() => handleOptionClick(opt)}
            >
              {renderOption(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppleOption;
